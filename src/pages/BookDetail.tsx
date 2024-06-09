import styled, { useTheme } from 'styled-components'
import ChatPanel from '../components/ChatPanel'
import { useParams } from 'react-router-dom';
import Markdown from 'react-markdown'
import { useCallback, useEffect, useState } from 'react';
import { bookService } from '@/utils/services/book';
import { Book as BookType } from '@/utils/db';

export const Book = styled.div`
  padding-top: 10px;
  padding-left: 20px;
  display: flex;
`
export const BookInfo = styled.div`
  padding-left: 10px;
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

function SampleA() {
  const theme = useTheme()
  const { bookname='' } = useParams()
  const [book, setBook] = useState<BookType>()

  const fetchDbBook = useCallback(async() => {
    if (bookname) {
      let book = await bookService.getBook(bookname)
      console.log(book)
      setBook(book)
    }
  }, [bookname])
  
  useEffect(() => {
    fetchDbBook()
  }, [fetchDbBook])

  return (
    <div style={{position: 'relative', paddingBottom: '60px'}}>
      <Book>
        <img src={book?.coverImgUrl} alt="" width="60" />
        <BookInfo>
          <div style={{fontWeight: 700, fontSize: '22px'}}>《{book?.name}》</div>
          <div> This book contains <span style={{color: theme.blue}}>{book?.numsOfTokens}</span> tokens.</div>
        </BookInfo>
      </Book>
      <Summary>
        <span style={{fontStyle: 'italic'}}>Summary:</span>
      <Markdown>{`
\`\`\`
${book?.summary || ''}
\`\`\`
      `}</Markdown>
      </Summary>
      <div style={{marginTop: '10px'}}>
        <span style={{fontStyle: 'italic'}}>Chat with you book:</span>
        <ChatPanel conversation={book?.conversation}/>
      </div>
    </div>
  );
}

export default SampleA
