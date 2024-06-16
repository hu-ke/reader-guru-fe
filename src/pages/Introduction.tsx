import styled from 'styled-components'
import { StyledNavLink } from '@/App';
import Markdown from 'react-markdown'
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  img[alt="workflowimg"] {
    width: 580px;
  }
`

function Introduction() {
  const { t } = useTranslation()
  return (
    <Wrapper>
    <Markdown>{`
## ${t('What is Reader Guru?')}
${t("The **Reader Guru** is a OpenAI-powered tool that integrated with OpenAI's capabilities of **summarizing** an entire book and **answering** questions based on the book.")}

${t('This website is used for **Free**, without having to signup or signin.')} ${t('All codes of this site are available in')} [my git repo](https://github.com/hu-ke/reader-guru-fe). ${t("Don't forget to give a star if you like it.")}

## ${t('Work Flow')}
${t("Each summarizing or Q&A process may takes few minutes mainly based on your file size as well as OpenAI model's processing efficiency.")} ${t("It's necessary for us to have a grasp of what's going on under the hood.")}
${t('Below is a diagram for the work flow.')}

![workflowimg](https://hukepublicbucket.oss-cn-hangzhou.aliyuncs.com/readerguru/readerguru-flow.png)

1. ${t('Before we start, you need to prepare a .pdf or .epub file.')} ${t("If you don't have one, just")} [${t('click here to download a sample pdf book')}](https://hukepublicbucket.oss-cn-hangzhou.aliyuncs.com/readerguru/IntoThinAirBook.pdf). ${t('After uploading, server will take care of everything and you just need to wait.')} ${t('If you are not a developer, just ignore the following time-consuming steps.')}
2. ${t('Server will extract the whole texts from the book uploaded and use proper *Text Splitter* to split the texts into pieces of document.')}
3. ${t('Embeddings generated by utilizing')} [OpenAI embedding](https://platform.openai.com/docs/guides/embeddings).
4. ${t('Vectors are created by Pinecone or embedding')}
5. ${t('Server will return answers or summary depending on user actions.')}

## ${t('Practice')}
    `}</Markdown>
      <StyledNavLink to={"/new-book"}>{t('Click to Upload a book')}</StyledNavLink>
    </Wrapper>
  );
}

export default Introduction;