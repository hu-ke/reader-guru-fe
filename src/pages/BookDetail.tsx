import styled, { useTheme } from 'styled-components'
import ChatPanel from '../components/ChatPanel'
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown'
import { useCallback, useEffect, useState } from 'react';
import { bookService } from '@/utils/services/book';
import { Book as BookType } from '@/utils/db';
import Button from '@/components/Button';
import { summarizeFile } from '@/utils/http';
import Dialog from '@/components/Dialog'
import { setMyBooks } from '@/store/bookSlice'
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";

export const Book = styled.div`
  padding-top: 10px;
  padding-left: 20px;
  display: flex;
  align-items: flex-start;
`
export const BookInfo = styled.div`
  padding-left: 10px;
  margin-right: auto;
`

const Summary = styled.div`
  margin-top: 10px;
  & > pre {
    box-sizing: border-box;
    margin: 0;
    padding: 20px;
    background-color: #eee;
    width: 100%;
    overflow: hidden;
    white-space: normal;
  }
`

function BookDetail() {
  const { t } = useTranslation()
  const theme = useTheme()
  const { bookname='' } = useParams()
  const [book, setBook] = useState<BookType>()
  const [isSummarizing, setIsSummarizing] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const fetchDbBook = useCallback(async() => {
    if (bookname) {
      let book = await bookService.getBook(bookname)
      setBook(book)
    }
  }, [bookname])
  
  useEffect(() => {
    fetchDbBook()
  }, [fetchDbBook])

  const resummarize = async() => {
    setIsSummarizing(true)
    if (book?.name) {
      try {
        let res = await summarizeFile(book.name)
        setIsSummarizing(false)
        
        const { summary, fileName } = res.data
        await bookService.addOrUpdateBook({
          summary,
          name: fileName,
          numsOfTokens: book?.numsOfTokens,
          coverImgUrl: book?.coverImgUrl,
          updatedAt: new Date().valueOf().toString(),
          createdAt: new Date().valueOf().toString(),
        })
        setBook({
          ...book,
          summary
        })
      } catch(e) {
        console.error(e)
      }
    }
  }

  const fetchDbBooks = async() => {
    let dbBooks = await bookService.listBooks()
    if (dbBooks?.length > 0) {
      dispatch(setMyBooks(dbBooks))
      const lastBookName = dbBooks[dbBooks.length - 1].name
      navigate(`/mybooks/${lastBookName}`)
    } else {
      navigate('/new-book')
    }
  }

  const handleModalOpen = () => {
    const onCancel = () => {
      dialog.hide()
    }
    const onOk = async() => {
      await bookService.deleteBook(bookname)
      fetchDbBooks()
      dialog.hide()
    }
    const dialog = Dialog.confirm({
      title: <span style={{color: theme.red}}>{t('Are you sure to delete this book?')}</span>,
      content: <p style={{margin: 20}}>{t('Once you delete the book, you will need to re-upload it if needed again.')}</p>,
      footer: (
        <footer style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Button size="small" danger onClick={onOk}>{t('Confirm')}</Button>&nbsp;
          <Button size="small" type="normal" onClick={onCancel}>{t('Cancel')}</Button>
        </footer>
      )
    })
  }

  return (
    <div style={{position: 'relative', paddingBottom: '60px'}}>
      <Book>
        <img src={book?.coverImgUrl} alt="" width="60" />
        <BookInfo>
          <div style={{fontWeight: 700, fontSize: '22px'}}>《{book?.name}》</div>
          <div> {t('This book contains')} <span style={{color: theme.blue}}>{book?.numsOfTokens}</span> tokens.</div>
        </BookInfo>
        <Button danger size="small" onClick={handleModalOpen}>{t('Delete')}</Button>
      </Book>
      <Summary>
        <span style={{fontStyle: 'italic', display: 'flex', marginBottom: '10px'}}>
          {t('Summary')}: &nbsp;
          <Button size='small' disabled={isSummarizing} loading={isSummarizing} onClick={resummarize}>
            {t('re-summarize')}&nbsp; 
            <svg fill="#fff" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2294" width="14" height="14"><path d="M935.161672 427.51891c-14.511505-11.744485-37.643342-9.155521-49.1627 5.403057l-12.9438 16.20917c-0.926092-5.842055-1.995447-11.625782-3.158946-17.325597C831.326792 245.594511 666.360623 110.434182 477.668077 110.434182c-27.455305 0-55.099922 2.885723-82.198094 8.562003C179.036629 164.405397 39.60195 378.546545 84.655052 596.34499c38.522362 186.222285 203.488531 321.383638 392.229173 321.383638 27.430746 0 55.076386-2.873444 82.174558-8.549723 75.144444-15.746636 144.18589-53.508681 198.288089-108.002806l1.87572-1.662873c1.757017-1.74576 2.778276-3.432169 2.588965-3.443425l1.781576-2.387373c2.137687-3.527336 4.65502-9.191336 4.65502-16.173354 0-17.361413-14.035668-31.479969-31.326473-31.479969-4.275373 0-8.454556 0.914836-12.325723 2.612501l-1.90028-1.318018-8.644891 8.65717c-46.359864 46.478568-104.261599 78.042447-167.484525 91.283006-22.657023 4.750187-45.766346 7.160073-68.684312 7.160073-157.818375 0-295.733445-113.073288-327.96145-268.87268-37.738509-182.291766 78.849836-361.484961 259.918751-399.448598 22.657023-4.750187 45.766346-7.160073 68.708871-7.160073 157.793816 0 295.709909 113.061009 327.96145 268.860401 0.427742 2.101871 0.855484 4.227278 1.258667 6.364965l-13.751189-11.091616c-14.511505-11.768021-37.59627-9.1678-49.1627 5.390777-12.017708 15.056927-9.619078 37.156248 5.343705 49.269124l78.089519 63.1032c0.14224 0.106424 0.285502 0.213871 0.427742 0.332575l3.491521 2.814092 0.712221 0c6.483668 3.657296 15.770172 4.964058 21.065781 4.322445 9.475815-0.890276 17.954931-5.485945 23.940249-12.93152l62.723553-78.659501C952.498526 461.635939 950.052824 439.560154 935.161672 427.51891z" p-id="2295"></path></svg>
          </Button>
        </span>
      <Markdown>{`
\`\`\`
${book?.summary || ''}
\`\`\`
      `}</Markdown>
      </Summary>
      <div style={{marginTop: '10px'}}>
        <span style={{fontStyle: 'italic'}}>{t('Chat with your book:')}</span>
        <ChatPanel conversation={book?.conversation}/>
      </div>
    </div>
  );
}

export default BookDetail;
