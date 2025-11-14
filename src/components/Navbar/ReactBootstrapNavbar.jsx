import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import './ReactBootstrapNavbar.css';

export default function ReactBootstrapNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="react-navbar px-3">
      <Container fluid>
        {/* 左上 Logo */}
        <Navbar.Brand as={Link} to="/">
          MySite
        </Navbar.Brand>

        {/* 漢堡按鈕 */}
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          {/* 導覽連結 */}
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={NavLink} to="/" end>
              首頁
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              關於我們
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              聯絡
            </Nav.Link>
          </Nav>

          {/* 右側搜尋列 */}
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="搜尋..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">搜尋</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
