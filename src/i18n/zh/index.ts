
const introduction = {
    'What is Reader Guru?': '网站介绍',
    "The **Reader Guru** is a OpenAI-powered tool that integrated with OpenAI's capabilities of **summarizing** an entire book and **answering** questions based on the book.": '网站利用了OpenAI文本总结和基于文本问答的能力。实现了对pdf或epub格式文件的总结和对话。',
    'This website is used for **Free**, without having to signup or signin.': '免费使用，无需注册或登录。',
    'All codes of this site are available in': '所有代码都放在了git仓库',
    "Don't forget to give a star if you like it.": '如果喜欢的话不要忘了点个star支持一下~',
    'Work Flow': '工作过程',
    "Each summarizing or Q&A process may takes few minutes mainly based on your file size as well as OpenAI model's processing efficiency.": '每一次的总结或对话流程最长可能需要等待几分钟，这主要是由上传文件的大小和OpenAI的处理效率决定的。',
    "It's necessary for us to have a grasp of what's going on under the hood.": '我们有必要了解下整个过程发生了什么。',
    'Below is a diagram for the work flow.': '以下是工作过程图：',
    'Before we start, you need to prepare a .pdf or .epub file.': '在我们开始之前，你需要准备一个.pdf或.epub格式的文件',
    "If you don't have one, just": '如果你没有文件，你可以',
    'click here to download a sample pdf book': '点击这里下载一个示例pdf文件',
    'After uploading, server will take care of everything and you just need to wait.': '上传完成后，服务端会帮你处理剩下的事，你只需要耐心等待。',
    'If you are not a developer, just ignore the following time-consuming steps.': '如果你不是开发人员，可以跳过剩下的步骤。',
    'Server will extract the whole texts from the book uploaded and use proper *Text Splitter* to split the texts into pieces of document.': '服务端会从上传的文件中提取所有的文本内容，然后调用*Text Splitter*将文本内容分割成许多独立的document对象。',
    'Embeddings generated by leveraging': '生成Embeddings对象，通过利用',
    'Vectors are created by Pinecone or embedding': '通过embedding或Pinecone来生成vectors',
    'Server will return answers or summary depending on user actions.': '服务器会根据用户操作来生成答案或总结。',
    'Practice': '实践',
    'Click to Upload a book': '点击此处上传书本'
}
const TopBar = {
    'Contact me': '联系我',
    'WeChat': '微信',
    'Email': '邮箱',
    'Mobile phone': '手机号',
    'contact me': '联系我',
    'Any suggestions?': '有什么建议吗?',
    'Your AI Reading Assistant': '您的AI阅读小帮手'
}

const Menu = {
    'Get Started': '开始',
    'Introduction': '介绍',
    'Upload a Book': '上传书本',
    'My Books': '我的书籍'
}

const NewBook = {
    'Upload a book': '上传一本书',
    'Click to upload': '点击此处上传',
    'book size': '文件大小',
    'Summarize or talk with book': '总结或基于书本内容提问',
    'The workspace is ready. Now you can summarize or chat with the book.': '工作空间已经就绪，现在可以总结或提问啦',
    'This book contains': '本书包含',
    '**Reader Guru** uses **gpt-3.5-turbo-16k** model to summarize documents.': '网站使用**gpt-3.5-turbo-16k**模型来生成总结。',
    'This model costs $0.0030 per 1k tokens as listed on': '该模型的价格是每1k token花费0.003美元，可以在OpenAI官网查询',
    'Summarization will cost around': '本次总结过程需要花费大约',
    'summarize': '生成总结',
    'summary:': '总结'
}

const BookDetail = {
    'Are you sure to delete this book?': '确定删除该书吗？',
    'Once you delete the book, you will need to re-upload it if needed again.': '删除该书之后，当你需要的时候你将要重新上传。',
    'Confirm': '确定',
    'Cancel': '取消',
    'This book contains': '本书包含',
    'Delete': '删除',
    'Summary': '总结',
    're-summarize': '重新总结',
    'Chat with your book:': '基于本书问答',
    'Message chatbot': '对机器人提问',
    'The file has been removed on server, you need to upload again.': '文件已被移除，你需要再次上传',
    'Operation Failed': '操作失败',
}

const ChatPanel = {
    'Hi, what would you like to know about this book?': '哈喽，关于本书你有什么需要了解的？'
}

export default {
    ...introduction,
    ...TopBar,
    ...Menu,
    ...NewBook,
    ...BookDetail,
    ...ChatPanel
}