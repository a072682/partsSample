import { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./_open_ai_page.scss";
import axios from "axios";

// 後端 API 基礎位址，統一管理避免分散在各函式中
const BASE_URL = "http://127.0.0.1:8000";

function OpenAIPage() {

  //#region
  //#endregion


  // ==============================================
  // 區塊一：RAG 知識庫建立
  // ==============================================

  //#region 區塊一 - 狀態

    //#region 儲存要寫入的資料庫名稱
    const [ragDatabase, setRagDatabase] = useState("");
    //#endregion

    //#region 儲存整體補充文字資料
    const [ragText, setRagText] = useState("");
    //#endregion

    //#region 資料庫檔案儲存狀態（每個檔案含個別敘述文字）
    // 格式：[{ file: File, description: string }, ...]
    const [ragFiles, setRagFiles] = useState([]);
    //#endregion

    //#region refs（用來清空 ragInput）
    const inputRagRef = useRef();
    //#endregion

  //#endregion

  //#region 區塊一 - 事件處理

    //#region 滑鼠「拖著東西」經過這個區域時，一直觸發
    const handleRagDragOver = (e) => {
      // 取消預設動作
      e.preventDefault();
    };
    //#endregion

    //#region 當使用者「把東西拖進來並放開滑鼠」時觸發
    const handleRagDrop = (e) => {
      // 取消預設動作
      e.preventDefault();
      // 將滑鼠拖進來的檔案放入到空陣列中
      // 像是[ File, File, File ]
      const dropped = Array.from(e.dataTransfer.files);
      // 將每個拖入的檔案包成含空白敘述欄位的物件格式
      const newFiles = dropped.map((file) => ({ file, description: "" }));
      // 將結果資料放入陣列中並寫入 ragFiles 狀態中
      setRagFiles((prev) => [...prev, ...newFiles]);
    };
    //#endregion

    //#region 更新指定索引位置的檔案敘述文字
    const updateRagFileDescription = (index, value) => {
      // 使用 map 建立新陣列，找到目標索引後更新其 description 欄位
      setRagFiles((prev) =>
        prev.map((item, i) =>
          // 索引相符時回傳更新後的物件，否則原樣回傳
          i === index ? { ...item, description: value } : item
        )
      );
    };
    //#endregion

    //#region 上傳資料到 RAG 知識庫
    const uploadRagData = async () => {
      // 若沒有檔案也沒有文字則直接返回，不送出
      if (ragFiles.length === 0 && !ragText) return;

      // 建立 FormData 物件以傳送多類型資料
      const formData = new FormData();

      // 寫入資料庫名稱，若未填寫則使用預設名稱
      formData.append("database", ragDatabase || "default_db");

      // 將各檔案的個別敘述整理成「檔名: 敘述」格式後合併為文字段落
      const fileDescriptions = ragFiles
        // 過濾掉沒有填寫敘述的項目
        .filter((item) => item.description.trim() !== "")
        // 整理成「檔名: 敘述」的格式方便後端辨識
        .map((item) => `${item.file.name}: ${item.description.trim()}`)
        // 以換行合併成一段文字
        .join("\n");

      // 將整體文字與各檔案敘述合併，過濾空值後以雙換行連接
      const combinedText = [ragText, fileDescriptions].filter(Boolean).join("\n\n");
      // 寫入純文字資料，對應後端的 text_data 欄位
      formData.append("text_data", combinedText);

      // 逐一判斷每個檔案類型並放到對應的欄位
      ragFiles.forEach(({ file }) => {

        if (
          // 判斷 MIME 類型或副檔名是否為 PDF
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf")
        ) {
          // PDF 檔案對應後端的 pdf_files 欄位
          formData.append("pdf_files", file);

        } else if (file.type.startsWith("image/")) {
          // 圖片檔案對應後端的 img_files 欄位
          formData.append("img_files", file);

        } else if (file.type.startsWith("audio/")) {
          // 音訊檔案對應後端的 audios 欄位
          formData.append("audios", file);

        } else if (file.type.startsWith("video/")) {
          // 影片檔案對應後端的 videos 欄位
          formData.append("videos", file);
        }

      });

      try {
        // 發出 POST 請求到後端 RAG ingest API
        const res = await axios.post(
          `${BASE_URL}/rag/ingest`,
          formData,
          {
            headers: {
              // 設定為 multipart 以傳送檔案
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // 印出成功回應
        console.log("RAG 加入成功:", res.data);

        // 清空已選檔案狀態
        setRagFiles([]);
        // 清空整體文字資料狀態
        setRagText("");
        // 清空資料庫名稱狀態
        setRagDatabase("");
        // 清空 file input 的顯示值
        inputRagRef.current.value = null;
        // 上傳成功後重新取得最新資料庫清單
        fetchDatabases();

      } catch (error) {
        // 印出錯誤資訊
        console.error("上傳失敗:", error);
      }
    };
    //#endregion

  //#endregion


  // ==============================================
  // 區塊二：已建立的知識庫
  // ==============================================

  //#region 區塊二 - 狀態

    //#region 儲存已建立的 RAG 資料庫清單
    const [ragDatabases, setRagDatabases] = useState([]);
    //#endregion

  //#endregion

  //#region 區塊二 - 事件處理

    //#region 向後端取得所有已建立的資料庫名稱
    const fetchDatabases = async () => {
      try {
        // 發出 GET 請求到後端資料庫清單 API
        const res = await axios.get(`${BASE_URL}/rag/databases`);
        // 將回傳的 all_databases 陣列寫入狀態
        setRagDatabases(res.data.all_databases || []);
      } catch (error) {
        // 若請求失敗則印出錯誤
        console.error("取得資料庫清單失敗:", error);
      }
    };
    //#endregion

    //#region 刪除指定名稱的資料庫
    const deleteDatabase = async (name) => {
      try {
        // 發出 DELETE 請求，將資料庫名稱放入路徑參數
        await axios.delete(`${BASE_URL}/rag/databases/${name}`);
        // 刪除成功後重新整理資料庫清單
        fetchDatabases();
      } catch (error) {
        // 若刪除失敗則印出錯誤
        console.error("刪除資料庫失敗:", error);
      }
    };
    //#endregion

    //#region 元件載入時自動取得資料庫清單
    useEffect(() => {
      // 元件掛載後立即呼叫一次
      fetchDatabases();
    }, []);
    //#endregion

  //#endregion


  // ==============================================
  // 區塊三：基礎 AI 對話
  // ==============================================

  //#region 區塊三 - 狀態

    //#region 提問問題資訊儲存狀態
    const [question, setQuestion] = useState("");
    //#endregion

    //#region 檔案儲存狀態
    const [files, setFiles] = useState([]);
    //#endregion

    //#region 儲存AI回答答案狀態
    const [basicReply, setBasicReply] = useState("");
    //#endregion

    //#region 儲存目前選擇的 AI 提供者（openai 或 claude）
    const [basicProvider, setBasicProvider] = useState("openai");
    //#endregion

    //#region refs（用來清空 input）
    const inputRef = useRef();
    //#endregion

  //#endregion

  //#region 區塊三 - 事件處理

    //#region 將檔案轉成帶 preview 的格式
      //引入的資料會是陣列，輸出的也會是陣列(因為map)
      const processFiles = (fileList) => {
        return fileList.map((file) => ({
            //原始檔案
            file,
            //如果檔案的類型開頭是image/就給予一個臨時的網址讓圖片可以顯示，如果不是則輸出null
            preview:file.type.startsWith("image/")? URL.createObjectURL(file) : null,
          })
        );
      };
    //#endregion

    //#region 滑鼠「拖著東西」經過這個區域時，一直觸發
      const handleDragOver = (e) => {
        // 取消預設動作
        e.preventDefault();
      };
    //#endregion

    //#region 當使用者「把東西拖進來並放開滑鼠」時觸發
      const handleDrop = (e) => {
        // 取消預設動作
        e.preventDefault();
        // 將滑鼠拖進來的檔案放入到空陣列中
        // 像是[ File, File, File ]
        const dropped = Array.from(e.dataTransfer.files);

        // 將dropped放入processFiles函式並執行，最後輸出每個檔案是否有縮圖的陣列
        const newFiles = processFiles(dropped);
        // 將結果資料放入陣列中並寫入Files狀態中
        setFiles((prev) => [...prev, ...newFiles]);
      };
    //#endregion

    //#region 點選新增檔案
      const handleSelectFile = (e) => {
        //將檔案放入陣列中
        const selected = Array.from(e.target.files);
        // 將selected放入processFiles函式並執行，最後輸出每個檔案是否有縮圖的陣列
        const newFiles = processFiles(selected);
        // 將結果資料放入陣列中並寫入Files狀態中
        setFiles((prev) => [...prev, ...newFiles]);
        // 每次選完都清空
        e.target.value = null;
      };
    //#endregion

    //#region 刪除檔案
      //引入的資料會是數字
      const removeFile = (indexData) => {
        setFiles((prev) => {
          // 確認目標檔案
          const target = prev[indexData];

          //如果preview不是null則觸發
          if (target.preview) {
            // 移除臨時的圖片網址
            URL.revokeObjectURL(target.preview);
          }
          // 留下符合規則的資料
          return prev.filter((_, i) => i !== indexData);
        });
      };
    //#endregion

    //#region icon 判斷
      const getFileIcon = (file) => {
        if (file.type.startsWith("audio/")) {
          return "🎧";
        }
        if (file.type.startsWith("video/")) {
          return "🎬";
        }
        return "📄";
      };
    //#endregion

    //#region 發送
      const askBasicAI = async() => {
        // 將AI回應清空
        setBasicReply("");
        //建立新檔案物件
        const formData = new FormData();
        //寫入問題資料
        formData.append("question", question);
        // 寫入 AI 提供者參數（openai 或 claude），讓後端依此選擇模型
        formData.append("provider", basicProvider);

        //對資料進行分類並寫入
        files.forEach((item) => {
          const file = item.file;
          if (file.type.startsWith("image/")) {
            formData.append("files", file);
          } else if (file.type.startsWith("audio/")) {
            formData.append("audios", file);
          } else if (file.type.startsWith("video/")) {
            formData.append("videos", file);
          }
        });

        // 👉 TODO: fetch API
        try{
          //post請求
          const response = await fetch(
            `${BASE_URL}/chat/ask`,
            {
              method: "POST",
              body: formData
            }
          );

          // 檢查 HTTP 狀態
          // 如果錯誤則回報錯誤
          if (!response.ok) {
            throw new Error("連接AI錯誤");
          }

          //持續儲存ai回應的資料
          //response.body為資料源頭
          //.getReader代表設定讀取器
          //取得的資料為Binary（二進位資料）無法直接讀取
          const reader = response.body.getReader();

          //設定文字解碼器
          const decoder = new TextDecoder("utf-8");

          //進入迴圈
          while (true) {
            // 解構函數
            // 只要使用.getReader跟.read相關指令代表接收到的資料格式固定為以下格式
            // {
            //   done: false,
            //   value: Uint8Array(...)
            // }
            // done = 是否讀取結束 false → 還有資料 true  → Stream 已結束
            // value 是 chunk（資料片段）
            const { done, value } = await reader.read();

            // 讀取結束時跳出迴圈
            if (done) {
              break;
            }

            // 把二進位資料轉換成文字
            const chunk = decoder.decode(value);

            //每次都把文字寫入BasicReply狀態中
            setBasicReply((prev) => {
              return(
                prev + chunk
              )
            });
          }
        }catch(error){
          console.error("AI請求失敗:", error);
          setBasicReply("發生錯誤，請稍後再試");
        }finally{
          //清除臨時圖片網址
          files.forEach((item) => {
            if (item.preview) {
              URL.revokeObjectURL(item.preview);
            }
          });
          //問題狀態清除
          setQuestion("");
          //檔案狀態清除
          setFiles([]);
          //input儲存狀態清除
          inputRef.current.value = null;
        }
        //#endregion
      };
    //#endregion

  //#endregion


  // ==============================================
  // 區塊四：RAG AI 對話
  // ==============================================

  //#region 區塊四 - 狀態

    //#region 儲存 RAG 對話的提問問題
    const [ragQuestion, setRagQuestion] = useState("");
    //#endregion

    //#region 儲存 RAG 對話的多模態附加檔案
    // 格式與基礎對話相同：[{ file: File, preview: string|null }, ...]
    const [ragChatFiles, setRagChatFiles] = useState([]);
    //#endregion

    //#region 儲存RAG_AI回答答案狀態
    const [ragReply, setRagReply] = useState("");
    //#endregion

    //#region 儲存 RAG AI 回答的來源清單
    const [sources, setSources] = useState([]);
    //#endregion

    //#region refs（用來清空 ragChat input）
    const inputRagChatRef = useRef();
    //#endregion

  //#endregion

  //#region 區塊四 - 事件處理

    //#region 滑鼠「拖著東西」經過 RAG 對話框時，一直觸發
    const handleRagChatDragOver = (e) => {
      // 取消預設動作
      e.preventDefault();
    };
    //#endregion

    //#region 當使用者「把東西拖進 RAG 對話框並放開滑鼠」時觸發
    const handleRagChatDrop = (e) => {
      // 取消預設動作
      e.preventDefault();
      // 將滑鼠拖進來的檔案放入到空陣列中
      const dropped = Array.from(e.dataTransfer.files);
      // 將dropped放入processFiles函式並執行，最後輸出每個檔案是否有縮圖的陣列
      const newFiles = processFiles(dropped);
      // 將結果資料放入陣列中並寫入 ragChatFiles 狀態中
      setRagChatFiles((prev) => [...prev, ...newFiles]);
    };
    //#endregion

    //#region 點選新增 RAG 對話檔案
    const handleRagChatSelectFile = (e) => {
      // 將檔案放入陣列中
      const selected = Array.from(e.target.files);
      // 將selected放入processFiles函式並執行，最後輸出每個檔案是否有縮圖的陣列
      const newFiles = processFiles(selected);
      // 將結果資料放入陣列中並寫入 ragChatFiles 狀態中
      setRagChatFiles((prev) => [...prev, ...newFiles]);
      // 每次選完都清空
      e.target.value = null;
    };
    //#endregion

    //#region 刪除 RAG 對話的檔案
    const removeRagChatFile = (indexData) => {
      setRagChatFiles((prev) => {
        // 確認目標檔案
        const target = prev[indexData];
        //如果preview不是null則觸發
        if (target.preview) {
          // 移除臨時的圖片網址
          URL.revokeObjectURL(target.preview);
        }
        // 留下符合規則的資料
        return prev.filter((_, i) => i !== indexData);
      });
    };
    //#endregion

    //#region 詢問 RAG AI 並接收串流回應
    const askRAGAI = async () => {

      // 每次送出前先清空上一次的 RAG 回答
      setRagReply("");
      // 每次送出前先清空上一次的來源清單
      setSources([]);

      // 建立 FormData 以支援多模態檔案上傳
      const formData = new FormData();
      // 寫入 RAG 對話的問題文字
      formData.append("question", ragQuestion);

      // 逐一分類 RAG 對話的附加檔案並寫入對應欄位
      ragChatFiles.forEach((item) => {
        const file = item.file;
        if (file.type.startsWith("image/")) {
          // 圖片對應 files 欄位
          formData.append("files", file);
        } else if (file.type.startsWith("audio/")) {
          // 音訊對應 audios 欄位
          formData.append("audios", file);
        } else if (file.type.startsWith("video/")) {
          // 影片對應 videos 欄位
          formData.append("videos", file);
        }
      });

      // 發出 POST 請求到後端 RAG 串流對話 API
      const response = await fetch(
        `${BASE_URL}/rag/chat`,
        {
          // 使用 POST 方法
          method: "POST",
          // 傳送 FormData（不設 Content-Type，瀏覽器自動加上 boundary）
          body: formData,
        }
      );

      // 取得串流資料的讀取器
      const reader = response.body.getReader();
      // 建立文字解碼器，將二進位資料轉為字串
      const decoder = new TextDecoder("utf-8");

      // 標記是否已進入來源收集模式，預設為否
      let sourceMode = false;
      // 累積來源文字的暫存字串
      let sourceBuffer = "";

      // 進入迴圈持續讀取串流資料
      while (true) {

        // 讀取下一段資料，done 表示是否結束，value 是二進位片段
        const { done, value } = await reader.read();

        // 串流結束時跳出迴圈
        if (done) break;

        // 將二進位片段解碼成可讀字串
        const chunk = decoder.decode(value);

        // 若收到 [SOURCES] 標記，切換為來源收集模式
        if (chunk.includes("[SOURCES]")) {
          // 開啟來源模式
          sourceMode = true;
          // 跳過此次迴圈，不寫入回答
          continue;
        }

        // 尚未進入來源模式時，將文字累加到 RAG 回答狀態
        if (!sourceMode) {
          setRagReply(prev => prev + chunk);
        }
        // 進入來源模式後，將文字累加到暫存字串
        else {
          sourceBuffer += chunk;
        }

      }

      // 將暫存的來源字串按換行切割成陣列
      const parsedSources = sourceBuffer
        // 以換行分割每筆來源
        .split("\n")
        // 移除每筆來源的前後空白
        .map(s => s.trim())
        // 過濾掉空字串
        .filter(s => s !== "");

      // 將解析完成的來源清單寫入狀態
      setSources(parsedSources);

      // 清空 RAG 問題狀態
      setRagQuestion("");
      // 清空 RAG 對話檔案狀態
      setRagChatFiles([]);
      // 若 ref 存在則清空 file input 顯示值
      if (inputRagChatRef.current) inputRagChatRef.current.value = null;

    };
    //#endregion

  //#endregion


  // ==============================================
  // 區塊五：Wiki 知識庫建立
  // ==============================================

  //#region 區塊五 - 狀態

    //#region 儲存 Wiki 知識庫名稱（project name）
    const [wikiProjectName, setWikiProjectName] = useState("");
    //#endregion

    //#region 儲存告訴 AI 如何整理 wiki 的規則文字
    const [wikiSchemaText, setWikiSchemaText] = useState("");
    //#endregion

    //#region 儲存要寫入 Wiki 的純文字資料
    const [wikiIngestText, setWikiIngestText] = useState("");
    //#endregion

    //#region 儲存要上傳的 Wiki 檔案（PDF、圖片、音訊、影片）
    // 格式：[{ file: File }, ...]
    const [wikiIngestFiles, setWikiIngestFiles] = useState([]);
    //#endregion

    //#region refs（用來清空 wikiIngest file input）
    const inputWikiRef = useRef();
    //#endregion

  //#endregion

  //#region 區塊五 - 事件處理

    //#region 滑鼠「拖著東西」經過 Wiki 上傳區域時，一直觸發
    const handleWikiDragOver = (e) => {
      // 取消預設動作
      e.preventDefault();
    };
    //#endregion

    //#region 當使用者「把東西拖進 Wiki 上傳區並放開滑鼠」時觸發
    const handleWikiDrop = (e) => {
      // 取消預設動作
      e.preventDefault();
      // 將拖入的檔案轉成陣列
      const dropped = Array.from(e.dataTransfer.files);
      // 包成物件格式後寫入狀態
      setWikiIngestFiles((prev) => [...prev, ...dropped.map((file) => ({ file }))]);
    };
    //#endregion

    //#region 上傳資料到 Wiki 知識庫（POST /wiki/ingest）
    const uploadWikiData = async () => {
      // 若知識庫名稱為空則不送出
      if (!wikiProjectName.trim()) return;

      // 建立 FormData 以傳送多類型資料
      const formData = new FormData();

      // 寫入知識庫名稱，對應後端的 project_name 欄位
      formData.append("project_name", wikiProjectName);

      // 寫入 schema 規則文字，對應後端的 schema_text 欄位
      formData.append("schema_text", wikiSchemaText);

      // 寫入純文字資料，對應後端的 text_data 欄位
      formData.append("text_data", wikiIngestText);

      // 逐一判斷每個檔案類型並放到對應的欄位
      wikiIngestFiles.forEach(({ file }) => {

        if (
          // 判斷 MIME 類型或副檔名是否為 PDF
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf")
        ) {
          // PDF 檔案對應後端的 pdf_files 欄位
          formData.append("pdf_files", file);

        } else if (file.type.startsWith("image/")) {
          // 圖片檔案對應後端的 img_files 欄位
          formData.append("img_files", file);

        } else if (file.type.startsWith("audio/")) {
          // 音訊檔案對應後端的 audios 欄位
          formData.append("audios", file);

        } else if (file.type.startsWith("video/")) {
          // 影片檔案對應後端的 videos 欄位
          formData.append("videos", file);
        }

      });

      try {
        // 發出 POST 請求到後端 Wiki ingest API
        const res = await axios.post(
          `${BASE_URL}/wiki/ingest`,
          formData,
          {
            headers: {
              // 設定為 multipart 以傳送檔案
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // 印出成功回應
        console.log("Wiki 加入成功:", res.data);

        // 清空知識庫名稱狀態
        setWikiProjectName("");
        // 清空 schema 規則狀態
        setWikiSchemaText("");
        // 清空純文字資料狀態
        setWikiIngestText("");
        // 清空已選檔案狀態
        setWikiIngestFiles([]);
        // 清空 file input 的顯示值
        inputWikiRef.current.value = null;
        // 上傳成功後重新整理 Wiki 知識庫清單
        fetchWikiProjects();

      } catch (error) {
        // 印出錯誤資訊
        console.error("Wiki 上傳失敗:", error);
      }
    };
    //#endregion

  //#endregion


  // ==============================================
  // 區塊六：Wiki 知識庫清單
  // ==============================================

  //#region 區塊六 - 狀態

    //#region 儲存所有 Wiki 知識庫的清單
    // 格式：[{ id, name, ... }, ...]
    const [wikiProjects, setWikiProjects] = useState([]);
    //#endregion

    //#region 儲存目前展開查看的 Wiki 知識庫 id
    const [selectedWikiProjectId, setSelectedWikiProjectId] = useState(null);
    //#endregion

    //#region 儲存目前展開的知識庫其 wiki 頁面清單
    // 格式：[{ page_id, title, content, ... }, ...]
    const [wikiPages, setWikiPages] = useState([]);
    //#endregion

  //#endregion

  //#region 區塊六 - 事件處理

    //#region 向後端取得所有 Wiki 知識庫（GET /wiki/projects）
    const fetchWikiProjects = async () => {
      try {
        // 發出 GET 請求到後端 Wiki 知識庫清單 API
        const res = await axios.get(`${BASE_URL}/wiki/projects`);
        // 將回傳的 projects 陣列寫入狀態
        setWikiProjects(res.data.projects || []);
      } catch (error) {
        // 若請求失敗則印出錯誤
        console.error("取得 Wiki 知識庫清單失敗:", error);
      }
    };
    //#endregion

    //#region 取得指定知識庫的所有 wiki 頁面
    const fetchWikiPages = async (projectId) => {
      try {
        // 發出 GET 請求，將知識庫 id 放入路徑參數
        const res = await axios.get(`${BASE_URL}/wiki/projects/${projectId}/pages`);
        // 將回傳的 pages 陣列寫入狀態
        setWikiPages(res.data.pages || []);
      } catch (error) {
        // 若請求失敗則印出錯誤
        console.error("取得 Wiki 頁面失敗:", error);
      }
    };
    //#endregion

    //#region 點擊知識庫卡片：展開或收合
    const handleWikiProjectClick = (projectId) => {
      if (selectedWikiProjectId === projectId) {
        // 再次點擊同一張卡片時收合
        setSelectedWikiProjectId(null);
        setWikiPages([]);
      } else {
        // 切換到新的卡片並載入頁面
        setSelectedWikiProjectId(projectId);
        fetchWikiPages(projectId);
      }
    };
    //#endregion

    //#region 元件載入時自動取得 Wiki 知識庫清單
    useEffect(() => {
      // 元件掛載後立即呼叫一次
      fetchWikiProjects();
    }, []);
    //#endregion

  //#endregion


  // ==============================================
  // 區塊七：Wiki AI 對話
  // ==============================================

  //#region 區塊七 - 狀態

    //#region 儲存 Wiki AI 對話所選用的知識庫 project_id
    const [wikiChatProjectId, setWikiChatProjectId] = useState("");
    //#endregion

    //#region 儲存 Wiki AI 對話的提問問題
    const [wikiQuestion, setWikiQuestion] = useState("");
    //#endregion

    //#region 儲存 Wiki AI 的回答文字
    const [wikiReply, setWikiReply] = useState("");
    //#endregion

  //#endregion

  //#region 區塊七 - 事件處理

    //#region 詢問 Wiki AI（POST /wiki/chat）
    const askWikiAI = async () => {
      // 若尚未選擇知識庫或問題為空則不送出
      if (!wikiChatProjectId.trim() || !wikiQuestion.trim()) return;

      // 每次送出前先清空上一次的回答
      setWikiReply("");

      try {
        // 發出 POST 請求到後端 Wiki 對話 API
        const res = await axios.post(
          `${BASE_URL}/wiki/chat`,
          {
            // 對應後端的 project_id 欄位
            project_id: wikiChatProjectId,
            // 對應後端的 question 欄位
            question: wikiQuestion,
          }
        );

        // 將後端回傳的 answer 寫入回答狀態
        setWikiReply(res.data.answer || "");
        // 印出完整回應
        console.log("Wiki AI 回應:", res.data);

        // 清空問題輸入
        setWikiQuestion("");

      } catch (error) {
        // 印出錯誤資訊
        console.error("Wiki AI 請求失敗:", error);
        setWikiReply("發生錯誤，請稍後再試");
      }
    };
    //#endregion

  //#endregion


  return (

    <article className="OpenAIPage">

      <h1>AI RAG Demo</h1>


      {/* ============================================================ */}
      {/* 區塊一：RAG 知識庫建立                                        */}
      {/* ============================================================ */}
      <section className="section">
        <h2>區塊一：RAG 知識庫建立</h2>

        {/* 上傳操作區域，支援拖放 */}
        <div className="uploadBox"
          onDrop={handleRagDrop}
          onDragOver={handleRagDragOver}
        >

          {/* 資料庫名稱輸入 */}
          <input
            type="text"
            placeholder="資料庫名稱（未填則使用 default_db）"
            value={ragDatabase}
            onChange={(e) => setRagDatabase(e.target.value)}
          />

          {/* 整體文字資料 */}
          <textarea
            placeholder="可輸入整體補充文字資料（選填）"
            value={ragText}
            onChange={(e) => setRagText(e.target.value)}
          />

          {/* 上傳檔案按鈕 */}
          <input
            type="file"
            multiple
            ref={inputRagRef}
            onChange={(e) => {
              // 將選取的檔案包成含空白敘述的物件格式
              const selected = Array.from(e.target.files).map((file) => ({ file, description: "" }));
              // 寫入 ragFiles 狀態
              setRagFiles((prev) => [...prev, ...selected]);
              // 清空 input 顯示值
              e.target.value = null;
            }}
          />

          {/* 顯示已選檔案清單（含個別敘述輸入） */}
          <div className="fileBox">
            {ragFiles.map((item, index) => (
              <div key={index} className="fileItem">

                {/* 檔案類型 icon */}
                <div className="fileIcon">
                  {item.file.type.startsWith("image/")
                    ? "🖼️"
                    : item.file.type.startsWith("audio/")
                    ? "🎧"
                    : item.file.type.startsWith("video/")
                    ? "🎬"
                    : item.file.type === "application/pdf"
                    ? "📕"
                    : "📄"}
                </div>

                {/* 檔案名稱、類型與個別敘述輸入 */}
                <div className="fileInfo">
                  <div className="fileName">{item.file.name}</div>
                  <div className="fileType">{item.file.type || "unknown"}</div>
                  {/* 每個檔案的個別敘述輸入欄位，內容會與檔案一起送出 */}
                  <input
                    type="text"
                    placeholder="輸入此檔案的敘述（選填）"
                    value={item.description}
                    onChange={(e) => updateRagFileDescription(index, e.target.value)}
                  />
                </div>

                {/* 刪除此檔案按鈕 */}
                <button
                  onClick={() => {
                    // 過濾掉對應索引的檔案
                    setRagFiles((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  ✖
                </button>

              </div>
            ))}
          </div>

          {/* 上傳按鈕 */}
          <button onClick={uploadRagData}>
            上傳到知識庫
          </button>

        </div>
      </section>
      {/* 區塊一：RAG 知識庫建立 */}


      {/* ============================================================ */}
      {/* 區塊二：已建立的知識庫                                        */}
      {/* ============================================================ */}
      <section className="section">
        <h2>區塊二：已建立的知識庫</h2>

        <div className="databaseList">

          {/* 手動重新整理按鈕 */}
          <button onClick={fetchDatabases}>重新整理</button>

          {/* 判斷清單是否為空 */}
          {ragDatabases.length === 0 ? (
            // 空的時候顯示提示文字
            <p className="emptyHint">目前無建立資料庫</p>
          ) : (
            // 有資料時以卡片形式逐一渲染每個資料庫
            <div className="databaseCards">
              {ragDatabases.map((dbName, index) => (
                // 每張卡片顯示資料庫名稱與刪除按鈕
                <div key={index} className="databaseCard">
                  {/* 資料庫名稱 */}
                  <span className="dbName">{dbName}</span>
                  {/* 刪除按鈕，點擊後呼叫 DELETE /rag/databases/{name} */}
                  <button
                    className="deleteBtn"
                    onClick={() => deleteDatabase(dbName)}
                  >
                    刪除
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
      {/* 區塊二：已建立的知識庫 */}


      {/* ============================================================ */}
      {/* 區塊三：基礎 AI 對話                                          */}
      {/* ============================================================ */}
      <section className="section">
        <h2>區塊三：基礎 AI 對話</h2>

        {/* AI 提供者切換按鈕 */}
        <div className="providerToggle">
          {/* 點擊後切換為 OpenAI */}
          <button
            className={basicProvider === "openai" ? "active" : ""}
            onClick={() => setBasicProvider("openai")}
          >
            OpenAI
          </button>
          {/* 點擊後切換為 Claude */}
          <button
            className={basicProvider === "claude" ? "active" : ""}
            onClick={() => setBasicProvider("claude")}
          >
            Claude
          </button>
        </div>

        {/* 詢問AI對話框 */}
        <div className="askBox">
          {/* 對話框區塊設定 */}
          <div className="inputBox"
              // 當使用者「把東西拖進來並放開滑鼠」時觸發
              onDrop={handleDrop}
              //滑鼠「拖著東西」經過這個區域時，一直觸發
              onDragOver={handleDragOver}
          >
            {/* 左側新增檔案按鈕 */}
            <label className="addFileBtn">
              ＋
              <input
                type="file"
                multiple
                ref={inputRef}
                onChange={handleSelectFile}
                hidden
              />
            </label>
            {/* 左側新增檔案按鈕 */}

            {/* 中間區塊 */}
            <div className="contentArea">
              {/* 檔案預覽區塊 */}
              <div className="fileBox">
                {
                  files.map((item, index) => (
                    // 檔案顯示區塊
                    <div key={index} className="fileItem">
                      {/* 圖片縮圖 */}
                      {
                        item.preview ?
                        (
                          // 縮圖設定
                          <img src={item.preview}
                              className="thumbnail"
                              alt=""
                          />
                          // 縮圖設定
                        )
                        :
                        (

                          <div className="fileIcon">
                            {
                              getFileIcon(item.file)
                            }
                          </div>
                        )
                      }

                      {/* 檔案敘述區塊 */}
                      <div className="fileInfo">
                        {/* 檔案名稱設定 */}
                        <div className="fileName">
                          {item.file.name}
                        </div>
                        {/* 檔案名稱設定 */}

                        {/* 檔案類型設定 */}
                        <div className="fileType">檔案</div>
                        {/* 檔案類型設定 */}
                      </div>
                      {/* 檔案敘述區塊 */}

                      {/* icon區塊設定 */}
                      <div className="actions">
                        {/* 關閉按鈕設定 */}
                        <button onClick={() => removeFile(index)}>
                          ✖
                        </button>
                        {/* 關閉按鈕設定 */}
                      </div>
                      {/* icon區塊設定 */}
                    </div>
                    // 檔案顯示區塊
                  ))
                }
              </div>
              {/* 檔案預覽區塊 */}

              {/* 文字輸入 */}
              <input
                className="textInput"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="想問就問"
              />
              {/* 文字輸入 */}
            </div>
            {/* 中間區塊 */}

            {/* 發送按鈕 */}
            <button className="sendBtn" onClick={askBasicAI}>
              ↑
            </button>
            {/* 發送按鈕 */}
          </div>
          {/* 對話框區塊設定 */}
        </div>
        {/* 詢問AI對話框 */}

        {/* AI回應區塊 */}
        <div className="chatContainer">
          <div className="chatBox">
            <h3>Basic AI 回應</h3>
            <div className="chatReply">
              <ReactMarkdown
                children={basicReply}
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");

                    return !inline ? (
                      <div className="codeBlock">
                        {/* 上方語言標籤 */}
                        <div className="codeHeader">
                          {match ? match[1] : "code"}
                        </div>

                        {/* 程式碼區塊 */}
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match ? match[1] : "javascript"}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </div>
          </div>
        </div>
        {/* AI回應區塊 */}

      </section>
      {/* 區塊三：基礎 AI 對話 */}


      {/* ============================================================ */}
      {/* 區塊四：RAG AI 對話                                           */}
      {/* ============================================================ */}
      <section className="section">
        <h2>區塊四：RAG AI 對話</h2>

        {/* 詢問AI對話框 */}
        <div className="askBox">
          {/* 對話框區塊設定 */}
          <div className="inputBox"
            // 當使用者「把東西拖進來並放開滑鼠」時觸發
            onDrop={handleRagChatDrop}
            // 滑鼠「拖著東西」經過這個區域時，一直觸發
            onDragOver={handleRagChatDragOver}
          >
            {/* 左側新增檔案按鈕 */}
            <label className="addFileBtn">
              ＋
              <input
                type="file"
                multiple
                ref={inputRagChatRef}
                onChange={handleRagChatSelectFile}
                hidden
              />
            </label>
            {/* 左側新增檔案按鈕 */}

            {/* 中間區塊 */}
            <div className="contentArea">
              {/* 檔案預覽區塊 */}
              <div className="fileBox">
                {
                  ragChatFiles.map((item, index) => (
                    // 檔案顯示區塊
                    <div key={index} className="fileItem">
                      {/* 圖片縮圖 */}
                      {
                        item.preview ?
                        (
                          // 縮圖設定
                          <img src={item.preview}
                              className="thumbnail"
                              alt=""
                          />
                          // 縮圖設定
                        )
                        :
                        (
                          <div className="fileIcon">
                            {getFileIcon(item.file)}
                          </div>
                        )
                      }

                      {/* 檔案敘述區塊 */}
                      <div className="fileInfo">
                        {/* 檔案名稱設定 */}
                        <div className="fileName">
                          {item.file.name}
                        </div>
                        {/* 檔案名稱設定 */}

                        {/* 檔案類型設定 */}
                        <div className="fileType">檔案</div>
                        {/* 檔案類型設定 */}
                      </div>
                      {/* 檔案敘述區塊 */}

                      {/* icon區塊設定 */}
                      <div className="actions">
                        {/* 關閉按鈕設定 */}
                        <button onClick={() => removeRagChatFile(index)}>
                          ✖
                        </button>
                        {/* 關閉按鈕設定 */}
                      </div>
                      {/* icon區塊設定 */}
                    </div>
                    // 檔案顯示區塊
                  ))
                }
              </div>
              {/* 檔案預覽區塊 */}

              {/* 文字輸入 */}
              <input
                className="textInput"
                value={ragQuestion}
                onChange={(e) => setRagQuestion(e.target.value)}
                placeholder="想問就問"
              />
              {/* 文字輸入 */}
            </div>
            {/* 中間區塊 */}

            {/* 發送按鈕 */}
            <button className="sendBtn" onClick={askRAGAI}>
              ↑
            </button>
            {/* 發送按鈕 */}
          </div>
          {/* 對話框區塊設定 */}
        </div>
        {/* 詢問AI對話框 */}

        {/* AI回應區塊 */}
        <div className="chatContainer">
          <div className="chatBox">
            <h3>RAG AI 回應</h3>
            <div className="chatReply">
              <ReactMarkdown
                children={ragReply}
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");

                    return !inline ? (
                      <div className="codeBlock">
                        {/* 上方語言標籤 */}
                        <div className="codeHeader">
                          {match ? match[1] : "code"}
                        </div>

                        {/* 程式碼區塊 */}
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match ? match[1] : "javascript"}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </div>

            {/* 來源清單：有來源資料時才顯示 */}
            {sources.length > 0 && (
              <div className="sourceList">
                <h4>參考來源</h4>
                <ul>
                  {/* 逐一列出每筆來源 */}
                  {sources.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
        {/* AI回應區塊 */}

      </section>
      {/* 區塊四：RAG AI 對話 */}


      {/* ============================================================ */}
      {/* 區塊五：Wiki 知識庫建立                                       */}
      {/* ============================================================ */}
      <section className="section">
        <h2>區塊五：Wiki 知識庫建立</h2>

        {/* 上傳操作區域，支援拖放 */}
        <div className="uploadBox"
          onDrop={handleWikiDrop}
          onDragOver={handleWikiDragOver}
        >

          {/* 知識庫名稱輸入 */}
          <input
            type="text"
            placeholder="知識庫名稱（必填）"
            value={wikiProjectName}
            onChange={(e) => setWikiProjectName(e.target.value)}
          />

          {/* Schema 規則文字：告訴 AI 如何整理 wiki */}
          <textarea
            placeholder="Schema 規則（告訴 AI 如何整理 wiki，選填）"
            value={wikiSchemaText}
            onChange={(e) => setWikiSchemaText(e.target.value)}
          />

          {/* 純文字資料 */}
          <textarea
            placeholder="可輸入純文字資料（選填）"
            value={wikiIngestText}
            onChange={(e) => setWikiIngestText(e.target.value)}
          />

          {/* 上傳檔案按鈕 */}
          <input
            type="file"
            multiple
            ref={inputWikiRef}
            onChange={(e) => {
              // 將選取的檔案包成物件格式
              const selected = Array.from(e.target.files).map((file) => ({ file }));
              // 寫入 wikiIngestFiles 狀態
              setWikiIngestFiles((prev) => [...prev, ...selected]);
              // 清空 input 顯示值
              e.target.value = null;
            }}
          />

          {/* 顯示已選檔案清單 */}
          <div className="fileBox">
            {wikiIngestFiles.map((item, index) => (
              <div key={index} className="fileItem">

                {/* 檔案類型 icon */}
                <div className="fileIcon">
                  {item.file.type.startsWith("image/")
                    ? "🖼️"
                    : item.file.type.startsWith("audio/")
                    ? "🎧"
                    : item.file.type.startsWith("video/")
                    ? "🎬"
                    : item.file.type === "application/pdf"
                    ? "📕"
                    : "📄"}
                </div>

                {/* 檔案名稱與類型 */}
                <div className="fileInfo">
                  <div className="fileName">{item.file.name}</div>
                  <div className="fileType">{item.file.type || "unknown"}</div>
                </div>

                {/* 刪除此檔案按鈕 */}
                <button
                  onClick={() => {
                    // 過濾掉對應索引的檔案
                    setWikiIngestFiles((prev) => prev.filter((_, i) => i !== index));
                  }}
                >
                  ✖
                </button>

              </div>
            ))}
          </div>

          {/* 上傳按鈕 */}
          <button onClick={uploadWikiData}>
            上傳到 Wiki 知識庫
          </button>

        </div>
      </section>
      {/* 區塊五：Wiki 知識庫建立 */}


      {/* ============================================================ */}
      {/* 區塊六：Wiki 知識庫清單                                       */}
      {/* ============================================================ */}
      <section className="section">
        <h2>區塊六：Wiki 知識庫清單</h2>

        <div className="databaseList">

          {/* 手動重新整理按鈕 */}
          <button onClick={fetchWikiProjects}>重新整理</button>

          {/* 判斷清單是否為空 */}
          {wikiProjects.length === 0 ? (
            // 空的時候顯示提示文字
            <p className="emptyHint">目前無建立 Wiki 知識庫</p>
          ) : (
            // 有資料時以卡片形式逐一渲染每個知識庫
            <div className="databaseCards">
              {wikiProjects.map((project) => (
                <div key={project.id} className="databaseCard">

                  {/* 點擊卡片展開 / 收合該知識庫的 wiki 頁面 */}
                  <div
                    className="dbName"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleWikiProjectClick(project.id)}
                  >
                    {/* 知識庫名稱 */}
                    {project.name}
                    {/* 展開狀態指示 */}
                    <span style={{ marginLeft: "8px" }}>
                      {selectedWikiProjectId === project.id ? "▲" : "▼"}
                    </span>
                  </div>

                  {/* 展開後顯示該知識庫的 wiki 頁面清單 */}
                  {selectedWikiProjectId === project.id && (
                    <div className="wikiPageList">
                      {wikiPages.length === 0 ? (
                        // 尚無頁面時顯示提示
                        <p className="emptyHint">此知識庫尚無頁面</p>
                      ) : (
                        <ul>
                          {/* 逐一列出每個 wiki 頁面標題 */}
                          {wikiPages.map((page) => (
                            <li key={page.page_id}>
                              <strong>{page.title}</strong>
                              {/* 若有摘要內容則顯示 */}
                              {page.content && (
                                <p className="pageContent">{page.content}</p>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

        </div>
      </section>
      {/* 區塊六：Wiki 知識庫清單 */}


      {/* ============================================================ */}
      {/* 區塊七：Wiki AI 對話                                          */}
      {/* ============================================================ */}
      <section className="section">
        <h2>區塊七：Wiki AI 對話</h2>

        {/* 對話輸入區域 */}
        <div className="uploadBox">

          {/* 選擇目標知識庫（project_id） */}
          <select
            value={wikiChatProjectId}
            onChange={(e) => setWikiChatProjectId(e.target.value)}
          >
            <option value="">請選擇知識庫</option>
            {/* 列出所有已建立的 Wiki 知識庫供選擇 */}
            {wikiProjects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          {/* 問題輸入欄位 */}
          <textarea
            placeholder="輸入問題"
            value={wikiQuestion}
            onChange={(e) => setWikiQuestion(e.target.value)}
          />

          {/* 送出按鈕 */}
          <button onClick={askWikiAI}>
            詢問 Wiki AI
          </button>

        </div>

        {/* AI 回應區塊 */}
        <div className="chatContainer">
          <div className="chatBox">
            <h3>Wiki AI 回應</h3>
            <div className="chatReply">
              <ReactMarkdown
                children={wikiReply}
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");

                    return !inline ? (
                      <div className="codeBlock">
                        {/* 上方語言標籤 */}
                        <div className="codeHeader">
                          {match ? match[1] : "code"}
                        </div>

                        {/* 程式碼區塊 */}
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match ? match[1] : "javascript"}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </div>
          </div>
        </div>
        {/* AI 回應區塊 */}

      </section>
      {/* 區塊七：Wiki AI 對話 */}

    </article>

  );

}

export default OpenAIPage;
