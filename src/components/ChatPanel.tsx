import styled, { keyframes } from 'styled-components'
import BotImg from '../assets/bot-image.webp';
import UserImg from '../assets/usericon.webp';
import { KeyboardEvent, useEffect, useState } from 'react'
import { queryBook } from '@/utils/http';
import LoadingDots from './LoadingDots';
import { t } from 'i18next';

const Panel = styled.div`
  border: 1px solid #d9d9e3;
  border-radius: 8px;
  max-height: 400px;
  min-height: 250px;
  margin-top: 6px;
  position: relative;
  overflow: scroll;
`
const Heading = styled.div`
  background-color: #f9fafb;
  height: 70px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  border-radius: inherit;
`

const HeadingText = styled.div`
  padding-left: 20px;
`

const InputBar = styled.div`
  height: 50px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-radius: inherit;
  width: 100%;
  border: 1px solid #d9d9e3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  & > input {
    font-size: 16px;
    display: block;
    width: 90%;
    height: calc(100% - 2px);
    outline: none;
    border: none;
    border-radius: 8px;
    margin-right: auto;
  }
`
const GenerateBtn = styled.div`
  color: ${props => props.theme.blue};
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0.2rem;
  & > svg {
    transform: rotate(90deg);
    width: 1.2em;
    height: 1.2em;
    fill: #cccccc;
  }
  &:hover {
    & > svg {
      fill: ${props => props.theme.blue};
    }
  }
`

const fadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const AiMessage = styled.div`
  background: #f9fafb;
  padding: 1.5rem;
  padding-left: 70px;
  color: #000;
  animation: ${fadein} 0.5s;
`
export interface QA {
  type: 'Q' | 'A';
  text: string;
}

interface Props {
  bookName?: string;
  onConversationUpdate?: Function;
  conversation?: Array<QA>;
}

const ChatPanel: React.FC<Props> = ({ bookName='', onConversationUpdate, conversation: con }) => {
  const [text, setText] = useState<string>('')
  const [conversation, setConversation] = useState<QA[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (Array.isArray(con)) {
      setConversation([...con])
    }
  }, [con])

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
  }

  useEffect(() => {
    onConversationUpdate && onConversationUpdate(conversation)
  }, [conversation])

  const onAsk = async() => {
    conversation.push({
      type: 'Q',
      text: text
    })
    setConversation([...conversation])
    setText('')
    setLoading(true)
    try {
      let res = await queryBook({
        query: text,
        filename: bookName
      })
      setLoading(false)
      if (res.code === 200) {
        conversation.push({
          type: 'A',
          text: res.data.answer
        })
        setConversation([...conversation])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onAsk()
    }
  }

  return (
    <div style={{position: 'relative', paddingBottom: '60px'}}>
      <Panel>
        <Heading> 
          <img src={BotImg} alt="" width="40" height="40" />
          <HeadingText>{t('Hi, what would you like to know about this book?')}</HeadingText>
        </Heading>
        {
          conversation.length > 0 ? conversation.map(item => {
            if (item.type === 'Q') {
              return (
                <div style={{padding: '20px', display: 'flex', alignItems: 'center'}}>
                  <img src={UserImg} alt="User" style={{marginRight: '20px'}} />
                  <span>{item.text}</span> 
                </div>
              )
            }
            return (
              <AiMessage>
                {item.text}
              </AiMessage>
            )
          }) : ''
        }
      </Panel>
      <InputBar>
        <input value={text} onChange={onChange} onKeyUp={onKeyUp} type="text" placeholder={t('Message chatbot')} />
        <GenerateBtn>
          {
            loading ? (
              <LoadingDots color="#000" size="large" />
            ) : (
              <svg
                onClick={onAsk}
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            )
          }
        </GenerateBtn>
      </InputBar>
    </div>
  );
}

export default ChatPanel;
