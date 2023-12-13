export const data = JSON.parse("{\"key\":\"v-75b94215\",\"path\":\"/netty/basics/helloworld.html\",\"title\":\"Hello World\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Hello World\",\"author\":\"vingkin\",\"date\":\"2022-07-22T00:00:00.000Z\",\"description\":\"目标 开发一个简单的服务器端和客户端 客户端向服务器端发送 hello, world 服务器仅接收，不返回 加入依赖 &lt;dependency&gt; &lt;groupId&gt;io.netty&lt;/groupId&gt; &lt;artifactId&gt;netty-all&lt;/artifactId&gt; &lt;version&gt;4.1.39.Final&lt;/version&gt; &lt;/dependency&gt;\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vingkin.github.io/Blog/Blog/netty/basics/helloworld.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Vingkin的学习博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Hello World\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"目标 开发一个简单的服务器端和客户端 客户端向服务器端发送 hello, world 服务器仅接收，不返回 加入依赖 &lt;dependency&gt; &lt;groupId&gt;io.netty&lt;/groupId&gt; &lt;artifactId&gt;netty-all&lt;/artifactId&gt; &lt;version&gt;4.1.39.Final&lt;/version&gt; &lt;/dependency&gt;\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-09-25T02:33:51.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"vingkin\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-07-22T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-09-25T02:33:51.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Hello World\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-07-22T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2023-09-25T02:33:51.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"vingkin\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"目标\",\"slug\":\"目标\",\"link\":\"#目标\",\"children\":[]},{\"level\":2,\"title\":\"服务器端\",\"slug\":\"服务器端\",\"link\":\"#服务器端\",\"children\":[]},{\"level\":2,\"title\":\"客户端\",\"slug\":\"客户端\",\"link\":\"#客户端\",\"children\":[]},{\"level\":2,\"title\":\"流程梳理\",\"slug\":\"流程梳理\",\"link\":\"#流程梳理\",\"children\":[{\"level\":3,\"title\":\"提示💡\",\"slug\":\"提示💡\",\"link\":\"#提示💡\",\"children\":[]}]}],\"git\":{\"createdTime\":1695609231000,\"updatedTime\":1695609231000,\"contributors\":[{\"name\":\"Vingkin\",\"email\":\"1830053226@qq.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":2.84,\"words\":851},\"filePathRelative\":\"netty/basics/helloworld.md\",\"localizedDate\":\"2022年7月22日\",\"excerpt\":\"<h2> 目标</h2>\\n<p>开发一个简单的服务器端和客户端</p>\\n<ul>\\n<li>客户端向服务器端发送 hello, world</li>\\n<li>服务器仅接收，不返回</li>\\n</ul>\\n<p>加入依赖</p>\\n<div class=\\\"language-xml line-numbers-mode\\\" data-ext=\\\"xml\\\"><pre class=\\\"language-xml\\\"><code><span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>dependency</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n    <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>groupId</span><span class=\\\"token punctuation\\\">&gt;</span></span>io.netty<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>groupId</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n    <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>artifactId</span><span class=\\\"token punctuation\\\">&gt;</span></span>netty-all<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>artifactId</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n    <span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;</span>version</span><span class=\\\"token punctuation\\\">&gt;</span></span>4.1.39.Final<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>version</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n<span class=\\\"token tag\\\"><span class=\\\"token tag\\\"><span class=\\\"token punctuation\\\">&lt;/</span>dependency</span><span class=\\\"token punctuation\\\">&gt;</span></span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"copyright\":{\"author\":\"vingkin\"},\"autoDesc\":true}")