import { useState, useRef, useMemo, } from 'react'
import Button from "@/components/Button";
import { uploadFile, summarizeFile, generateFileInfo } from '@/utils/http'
import styled, { useTheme } from 'styled-components'
import { Book, BookInfo } from './BookDetail';
import Markdown from 'react-markdown'
import { bookService } from '@/utils/services/book';
import { useDispatch } from 'react-redux';
import { setMyBooks } from '@/store/bookSlice'
import LoadingDots from '@/components/LoadingDots';

enum PHASES {
  UPLOAD = 1,
  SUMMARIZE_CHAT = 2,
}

type UPLOAD_RES_TYPES = {
  coverImgUrl: string;
  numsOfTokens: number;
  fileName: string;
}

type SUMMARIZE_RES_TYPES = {
  fileName: string;
  summary: string;
}

const Summary = styled.div`
  & > pre {
    margin: 0;
    padding: 20px;
    background-color: #eee;
    width: 100%;
    overflow: hidden;
    white-space: normal;
  }
`

const Step = styled.div<{ $num: number; $phase: number; }>`
// border: 1px solid black;
border-left: 1px solid ${props => props.$num < props.$phase ? props.theme.blue : '#bdbdbd'};
padding: 24px;
position: relative;
&::before {
  content: '${props => props.$num}';
  position:absolute;
  top: -15px;
  left: -15px;
  width: 30px;
  height: 30px;
  background-color: ${props => props.$num <= props.$phase ? props.theme.blue : '#ccc'};
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
& > .step-label {
  color: ${props => props.$num <= props.$phase ? props.theme.blue : '#ccc'};
  position: absolute;
  top: 0;
  transform: translateY(-50%);
}
`

function NewBook() {
  const theme = useTheme()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadingMessage, setUploadingMessage] = useState('')
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [fileInfo, setFileInfo] = useState<UPLOAD_RES_TYPES>()
  const [summarizingRes, setSummarizingRes] = useState<SUMMARIZE_RES_TYPES>()
  const fileInputRef = useRef(null);
  const [file, setFile] = useState<File>()
  const [phase, setPhase] = useState(PHASES.UPLOAD)
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const dispatch = useDispatch()

  const fileSizeStr = useMemo(() => {
    if (file) {
      // file.size // size in bytes
      const fileSizeInKB = file.size / 1024
      const fileSizeInMB = fileSizeInKB / 1024;
      if (fileSizeInMB > 1) {
        return `${fileSizeInMB.toFixed(2)}MB`
      } else {
        return `${fileSizeInKB.toFixed(2)}KB`
      }
    }
    return 0
  }, [file])

  const handleFileChange = async(e: any) => {
    let formData = new FormData();
    // @ts-ignore
    let fl = e?.target?.files[0]
    setFile(fl)
    formData.append('file_upload', fl)

    setIsUploading(true)
    let res = await uploadFile(formData, (progressEvent: any) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setUploadingProgress(progress)
    })
    if (res.code === 200) {
      setUploadingMessage(res.msg)
      setIsUploading(false) 
      let infoRes = await generateFileInfo(res.data.fileName)
      setFileInfo(infoRes.data)
      setPhase(PHASES.SUMMARIZE_CHAT)    
    }
  }

  const handleUpload = async() => {
    // @ts-ignore
    fileInputRef?.current?.click();
  };

  const fetchDbBooks = async() => {
    let dbBooks = await bookService.listBooks()
    if (dbBooks?.length > 0) {
      dispatch(setMyBooks(dbBooks))
    }
  }

  const handleSummarize = async() => {
    setIsSummarizing(true)
    if (file?.name) {
      let res = await summarizeFile(file.name)
      setIsSummarizing(false)
      setSummarizingRes(res.data)
      
      const { summary, fileName } = res.data
      await bookService.addOrUpdateBook({
        summary,
        name: fileName,
        numsOfTokens: fileInfo?.numsOfTokens,
        coverImgUrl: fileInfo?.coverImgUrl,
        updatedAt: new Date().valueOf().toString(),
        createdAt: new Date().valueOf().toString(),
      })
      fetchDbBooks()
    }
  }

  const isStep2Disabled = useMemo(() => {
    return isSummarizing || !fileInfo
  }, [isSummarizing, fileInfo])

  return (
    <div style={{marginTop: '20px'}}>
      <Step $num={PHASES.UPLOAD} $phase={phase}>
        <div className='step-label'>Upload a book</div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {/* {selectedFile && <p>Selected file: {selectedFile.name}</p>} */}
        <Button onClick={handleUpload} loading={isUploading} disabled={isUploading} size="small">
          Click to upload &nbsp;
          <svg fill={isUploading ? theme.disabledColor : '#fff'} className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2152" width="20" height="20"><path d="M554.688 500.352v256H469.312v-256h-128L512 314.24l170.688 186.24h-128zM1024 640.192C1024 782.912 919.872 896 787.648 896h-512C123.904 896 0 761.6 0 597.504 0 451.968 94.656 331.52 226.432 302.976 284.16 195.456 391.808 128 512 128c152.32 0 282.112 108.416 323.392 261.12C941.888 413.44 1024 519.04 1024 640.192z m-259.2-205.312c-24.448-129.024-128.896-222.72-252.8-222.72-97.28 0-183.04 57.344-224.64 147.456l-9.28 20.224-20.928 2.944c-103.36 14.4-178.368 104.32-178.368 214.72 0 117.952 88.832 214.4 196.928 214.4h512c88.32 0 157.504-75.136 157.504-171.712 0-88.064-65.92-164.928-144.96-171.776l-29.504-2.56-5.888-30.976z" p-id="2153"></path></svg>
        </Button>
        {
          fileSizeStr ? (
            <div>book size: {fileSizeStr}</div>
          ) : ''
        }
        {
          uploadingProgress > 0 ? (
            <>
              <progress value={uploadingProgress} max="100">{uploadingProgress}%</progress>
              {`${uploadingProgress}`}%
            </>
          ) : ''
        }
        {
          uploadingMessage ? (
            <p style={{color: theme.green, fontStyle: 'italic'}}>
              {uploadingMessage} <LoadingDots color='orange' />
            </p>
          ) : ''
        }
        {
          fileInfo ? (
            <Book>
              <p style={{color: theme.green, fontStyle: 'italic'}}>
                The workspace is ready. you can summarize or chat with the chatbot now.
              </p>
              <img src={fileInfo.coverImgUrl} alt="cover image" width={60}/>
              <BookInfo>
                <div style={{fontWeight: 700, fontSize: '22px'}}>《{fileInfo.fileName}》</div>
                <div> This book contains <span style={{color: theme.blue}}>{fileInfo.numsOfTokens}</span> tokens.</div>
              </BookInfo>
            </Book>
          ) : ''
        }
      </Step>
      <Step $num={PHASES.SUMMARIZE_CHAT} $phase={phase}>
        <div className='step-label'>Summarize or talk with chatbots</div>
        <Markdown>{`
  **Reader Guru** uses **gpt-3.5-turbo-16k** model to summarize documents. This model costs $0.0030 per 1k tokens as listed on [Open AI model pricing](https://openai.com/api/pricing/).
        `}</Markdown>
        {
          fileInfo ? (
            <div>Summarization will cost around <span style={{color: theme.blue}}>${(fileInfo.numsOfTokens * 0.003 / 1000).toFixed(2)}</span>.</div>
          ) : ''
        }
        <Button onClick={handleSummarize} loading={isSummarizing} disabled={isStep2Disabled} size="small">
          summarize&nbsp;
          <svg fill={isStep2Disabled ? theme.disabledColor: '#fff'} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1483" width="20" height="20"><path d="M370.77 845.96h-197.6V382.52h162.06c31.28 0 56.86-25.59 56.86-56.86V165.01h321.28v338.34c0 15.64 12.79 28.43 28.43 28.43s28.43-12.79 28.43-28.43V165.01c0-31.28-25.59-56.86-56.86-56.86h-355.4c-1.42 0-1.42 0-2.84 1.42-1.42 0-1.42 0-2.84 1.42-1.42 0-1.42 1.42-2.84 1.42s-1.42 1.42-2.84 1.42-1.42 1.42-2.84 1.42l-1.42 1.42L124.84 328.5c-5.69 5.69-8.53 12.79-8.53 21.32v496.14c0 31.28 25.59 56.86 56.86 56.86h197.6c15.64 0 28.43-12.79 28.43-28.43 0.01-15.63-12.79-28.43-28.43-28.43M210.13 325.65l126.52-122.26v122.26H210.13z" p-id="1484"></path><path d="M635.2 750.2h45.58l-22.71-58z" fill="#31BC99" p-id="1485"></path><path d="M698.09 583.48c-88.24 0-159.77 71.53-159.77 159.77 0 88.24 71.53 159.77 159.77 159.77s159.77-71.53 159.77-159.77c0-88.24-71.53-159.77-159.77-159.77z m11.43 240.57l-18.44-47.33h-66.2l-18.44 47.33h-31.06l69.54-173.61h26.13l69.54 173.61h-31.07z m81.48 0h-28.52V650.44H791v173.61z" p-id="1486"></path><path d="M544.67 456.34H297.31c-15.64 0-28.43 12.79-28.43 28.43s12.79 28.43 28.43 28.43h247.36c15.64 0 28.43-12.79 28.43-28.43 0-15.63-12.8-28.43-28.43-28.43zM464.04 595.43H297.31c-15.64 0-28.43 12.79-28.43 28.43s12.79 28.43 28.43 28.43h166.73c15.64 0 28.43-12.79 28.43-28.43s-12.8-28.43-28.43-28.43zM371.54 734.53h-71.08c-15.64 0-28.43 12.79-28.43 28.43s12.79 28.43 28.43 28.43h71.08c15.64 0 28.43-12.79 28.43-28.43s-12.79-28.43-28.43-28.43z" p-id="1487"></path></svg>
        </Button>
        {
          summarizingRes ? (
            <Summary>
              <span style={{fontStyle: 'italic'}}>summary:</span>
            <Markdown>{`
\`\`\`
${summarizingRes.summary}
\`\`\`
            `}</Markdown>
            </Summary>
          ) : ''
        }
        {/* <ul>
          <li>1.File uploading.</li>
          <li>2.Text Splitter is extracting the whole texts from the book.</li>
          <li>3.OpenAI embedding is generating embeddings and vectors.</li>
          <li>4.Summarizing.</li>
        </ul> */}
      </Step>
    </div>
  );
}

export default NewBook;
