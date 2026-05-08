#!/usr/bin/env python3
"""
Rename PascalCase files/folders to snake_case in src/, and update all import paths.
Usage: python rename_to_snake.py [--dry-run]
"""
import os
import re
import subprocess
import sys

SRC_DIR = r"c:\Users\Andy\Desktop\前端相關\partsSample\src"
REPO_DIR = r"c:\Users\Andy\Desktop\前端相關\partsSample"
DRY_RUN = '--dry-run' in sys.argv


def is_pure_ascii(s):
    return all(ord(c) < 128 for c in s)


def to_snake_case(base):
    """PascalCase/UpperCase → snake_case"""
    s1 = re.sub(r'([A-Z]+)([A-Z][a-z])', r'\1_\2', base)
    s2 = re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', s1)
    return s2.lower()


def name_needs_rename(name):
    """Check if a file/folder name needs renaming (PascalCase, ASCII only)."""
    clean = name.lstrip('_')
    base = clean.split('.')[0]
    if not base:
        return False
    if not is_pure_ascii(base):
        return False
    return base[0].isupper() and base[0].isalpha()


def convert_name(name):
    """Convert a PascalCase file/folder name to snake_case, preserving _ prefix."""
    prefix = ''
    rest = name
    while rest.startswith('_'):
        prefix += '_'
        rest = rest[1:]

    dot_idx = rest.find('.')
    if dot_idx == -1:
        base, ext = rest, ''
    else:
        base, ext = rest[:dot_idx], rest[dot_idx:]

    if not (base and is_pure_ascii(base) and base[0].isupper() and base[0].isalpha()):
        return name

    return prefix + to_snake_case(base) + ext


def run_git_mv(old_rel, new_rel):
    cmd = ['git', 'mv', old_rel, new_rel]
    print(f"  git mv '{old_rel}' '{new_rel}'")
    if not DRY_RUN:
        result = subprocess.run(
            cmd, cwd=REPO_DIR, capture_output=True, text=True, encoding='utf-8'
        )
        if result.returncode != 0:
            print(f"    ERROR: {result.stderr.strip()}")
            return False
    return True


# --- COLLECT RENAME OPERATIONS ---
file_renames = []    # (old_abs, new_abs)
folder_renames = []  # (old_abs, new_abs, depth)

for root, dirs, files in os.walk(SRC_DIR):
    for fname in files:
        if name_needs_rename(fname):
            new_fname = convert_name(fname)
            if new_fname != fname:
                file_renames.append((
                    os.path.join(root, fname),
                    os.path.join(root, new_fname)
                ))

    for dname in dirs:
        if name_needs_rename(dname):
            new_dname = convert_name(dname)
            if new_dname != dname:
                old_abs = os.path.join(root, dname)
                folder_renames.append((
                    old_abs,
                    os.path.join(root, new_dname),
                    old_abs.count(os.sep)
                ))

folder_renames.sort(key=lambda x: x[2], reverse=True)

print(f"Files to rename:   {len(file_renames)}")
print(f"Folders to rename: {len(folder_renames)}")
print()

print("=== FILE RENAMES ===")
for old, new in file_renames:
    print(f"  {os.path.relpath(old, SRC_DIR)}  →  {os.path.relpath(new, SRC_DIR)}")

print()
print("=== FOLDER RENAMES (deepest first) ===")
for old, new, _ in folder_renames:
    print(f"  {os.path.relpath(old, SRC_DIR)}  →  {os.path.relpath(new, SRC_DIR)}")

if DRY_RUN:
    print("\n[DRY RUN – no changes made]")
    sys.exit(0)

# --- EXECUTE FILE RENAMES ---
print("\n=== Executing file renames ===")
for old_abs, new_abs in file_renames:
    old_rel = os.path.relpath(old_abs, REPO_DIR).replace('\\', '/')
    new_rel = os.path.relpath(new_abs, REPO_DIR).replace('\\', '/')
    run_git_mv(old_rel, new_rel)

# --- EXECUTE FOLDER RENAMES (deepest first) ---
print("\n=== Executing folder renames ===")
for old_abs, new_abs, _ in folder_renames:
    old_rel = os.path.relpath(old_abs, REPO_DIR).replace('\\', '/')
    new_rel = os.path.relpath(new_abs, REPO_DIR).replace('\\', '/')
    run_git_mv(old_rel, new_rel)

print("\n=== Building rename map for import updates ===")

# --- BUILD RENAME MAP ---
rename_map = {}

for old_abs, new_abs in file_renames:
    old_name = os.path.basename(old_abs)
    new_name = os.path.basename(new_abs)
    rename_map[old_name] = new_name
    old_base = old_name.split('.')[0]
    new_base = new_name.split('.')[0]
    if old_base not in rename_map:
        rename_map[old_base] = new_base

for old_abs, new_abs, _ in folder_renames:
    old_seg = os.path.basename(old_abs)
    new_seg = os.path.basename(new_abs)
    rename_map[old_seg] = new_seg

print(f"Rename map: {len(rename_map)} entries")


def replace_path_segments(path, rmap):
    parts = path.split('/')
    new_parts = []
    changed = False
    for part in parts:
        if part in rmap and rmap[part] != part:
            new_parts.append(rmap[part])
            changed = True
        else:
            new_parts.append(part)
    return '/'.join(new_parts) if changed else path


def update_imports_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"  Could not read {filepath}: {e}")
        return False

    original = content

    def replace_match(m):
        path = m.group('path')
        if not (path.startswith('./') or path.startswith('../')):
            return m.group(0)
        new_path = replace_path_segments(path, rename_map)
        if new_path != path:
            return m.group(0).replace(path, new_path, 1)
        return m.group(0)

    content = re.sub(
        r'''(?:from|import)\s+['"](?P<path>[^'"]+)['"]''',
        replace_match,
        content
    )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False


# --- UPDATE IMPORTS ---
print("\n=== Updating import paths ===")
update_count = 0
for root, dirs, files in os.walk(SRC_DIR):
    for fname in files:
        if fname.endswith(('.jsx', '.js', '.ts', '.tsx', '.scss', '.css')):
            fpath = os.path.join(root, fname)
            if update_imports_in_file(fpath):
                print(f"  Updated: {os.path.relpath(fpath, SRC_DIR)}")
                update_count += 1

print(f"\nImport updates: {update_count} files.")
print("All done!")
