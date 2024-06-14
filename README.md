# 项目介绍
利用OpenAI文本总结和基于文本问答的能力，实现了对上传文件的总结和对话功能，文件上传支持`pdf`和`epub`两种文件格式，支持结果和对话的本地持久化。网站免费使用，无需注册或登录。本项目是网站的前端部分代码。[进入网站>>](http://reader.guru/introduction)
# 技术栈
- 前端
    - Reactjs v18、dexie v4
- 服务端
    - python v3.12、gunicorn、fastapi、langchain
# 网站截图
文件上传页
![](https://hukepublicbucket.oss-cn-hangzhou.aliyuncs.com/readerguru/readerguru-uploadpage.png)
文件详情页
![](https://hukepublicbucket.oss-cn-hangzhou.aliyuncs.com/readerguru/readerguru-detailpage.png)
# 工作流程
每一次的总结或对话流程最长可能需要等待几分钟，这主要是由上传文件的大小和OpenAI的处理效率决定的。 我们有必要了解下整个过程发生了什么。 以下是工作过程图：

![](https://hukepublicbucket.oss-cn-hangzhou.aliyuncs.com/readerguru/readerguru-flow.png)

1. 在我们开始之前，你需要准备一个.pdf或.epub格式的文件 如果你没有文件，你可以 点击这里下载一个示例pdf文件. 上传完成后，服务端会帮你处理剩下的事，你只需要耐心等待。 如果你不是开发人员，可以跳过剩下的步骤。
2. 服务端会从上传的文件中提取所有的文本内容，然后调用Text Splitter将文本内容分割成许多独立的document对象。
3. 生成Embeddings对象，通过利用 OpenAI embedding。
4. 通过embedding或Pinecone来生成vectors。
5. 服务器会根据用户操作来生成答案或总结。