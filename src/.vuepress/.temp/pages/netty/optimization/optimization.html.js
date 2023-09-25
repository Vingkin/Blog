export const data = JSON.parse("{\"key\":\"v-16d38cb0\",\"path\":\"/netty/optimization/optimization.html\",\"title\":\"Netty优化\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Netty优化\",\"author\":\"vingkin\",\"date\":\"2022-07-29T00:00:00.000Z\",\"description\":\"扩展序列化算法 序列化，反序列化主要用在消息正文的转换上 序列化时，需要将 Java 对象变为要传输的数据（可以是 byte[]，或 json 等，最终都需要变成 byte[]） 反序列化时，需要将传入的正文数据还原成 Java 对象，便于处理 目前的代码仅支持 Java 自带的序列化，反序列化机制，核心代码如下 // 反序列化 byte[] body = new byte[bodyLength]; byteByf.readBytes(body); ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(body)); Message message = (Message) in.readObject(); message.setSequenceId(sequenceId); // 序列化 ByteArrayOutputStream out = new ByteArrayOutputStream(); new ObjectOutputStream(out).writeObject(message); byte[] bytes = out.toByteArray();\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vingkin.github.io/Blog/Blog/netty/optimization/optimization.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Vingkin的学习博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Netty优化\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"扩展序列化算法 序列化，反序列化主要用在消息正文的转换上 序列化时，需要将 Java 对象变为要传输的数据（可以是 byte[]，或 json 等，最终都需要变成 byte[]） 反序列化时，需要将传入的正文数据还原成 Java 对象，便于处理 目前的代码仅支持 Java 自带的序列化，反序列化机制，核心代码如下 // 反序列化 byte[] body = new byte[bodyLength]; byteByf.readBytes(body); ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(body)); Message message = (Message) in.readObject(); message.setSequenceId(sequenceId); // 序列化 ByteArrayOutputStream out = new ByteArrayOutputStream(); new ObjectOutputStream(out).writeObject(message); byte[] bytes = out.toByteArray();\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-09-25T02:33:51.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"vingkin\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-07-29T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-09-25T02:33:51.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Netty优化\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-07-29T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2023-09-25T02:33:51.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"vingkin\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"扩展序列化算法\",\"slug\":\"扩展序列化算法\",\"link\":\"#扩展序列化算法\",\"children\":[]},{\"level\":2,\"title\":\"参数调优\",\"slug\":\"参数调优\",\"link\":\"#参数调优\",\"children\":[{\"level\":3,\"title\":\"1）CONNECT_TIMEOUT_MILLIS\",\"slug\":\"_1-connect-timeout-millis\",\"link\":\"#_1-connect-timeout-millis\",\"children\":[]},{\"level\":3,\"title\":\"2）SO_BACKLOG\",\"slug\":\"_2-so-backlog\",\"link\":\"#_2-so-backlog\",\"children\":[]},{\"level\":3,\"title\":\"3）ulimit -n\",\"slug\":\"_3-ulimit-n\",\"link\":\"#_3-ulimit-n\",\"children\":[]},{\"level\":3,\"title\":\"4）TCP_NODELAY\",\"slug\":\"_4-tcp-nodelay\",\"link\":\"#_4-tcp-nodelay\",\"children\":[]},{\"level\":3,\"title\":\"5）SO_SNDBUF & SO_RCVBUF\",\"slug\":\"_5-so-sndbuf-so-rcvbuf\",\"link\":\"#_5-so-sndbuf-so-rcvbuf\",\"children\":[]},{\"level\":3,\"title\":\"6）ALLOCATOR\",\"slug\":\"_6-allocator\",\"link\":\"#_6-allocator\",\"children\":[]},{\"level\":3,\"title\":\"7）RCVBUF_ALLOCATOR\",\"slug\":\"_7-rcvbuf-allocator\",\"link\":\"#_7-rcvbuf-allocator\",\"children\":[]}]},{\"level\":2,\"title\":\"RPC 框架\",\"slug\":\"rpc-框架\",\"link\":\"#rpc-框架\",\"children\":[{\"level\":3,\"title\":\"1）准备工作\",\"slug\":\"_1-准备工作\",\"link\":\"#_1-准备工作\",\"children\":[]},{\"level\":3,\"title\":\"2）服务器 handler\",\"slug\":\"_2-服务器-handler\",\"link\":\"#_2-服务器-handler\",\"children\":[]},{\"level\":3,\"title\":\"3）客户端代码第一版\",\"slug\":\"_3-客户端代码第一版\",\"link\":\"#_3-客户端代码第一版\",\"children\":[]},{\"level\":3,\"title\":\"4）客户端 handler 第一版\",\"slug\":\"_4-客户端-handler-第一版\",\"link\":\"#_4-客户端-handler-第一版\",\"children\":[]},{\"level\":3,\"title\":\"5）客户端代码 第二版\",\"slug\":\"_5-客户端代码-第二版\",\"link\":\"#_5-客户端代码-第二版\",\"children\":[]},{\"level\":3,\"title\":\"6）客户端 handler 第二版\",\"slug\":\"_6-客户端-handler-第二版\",\"link\":\"#_6-客户端-handler-第二版\",\"children\":[]}]}],\"git\":{\"createdTime\":1695609231000,\"updatedTime\":1695609231000,\"contributors\":[{\"name\":\"Vingkin\",\"email\":\"1830053226@qq.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":9.93,\"words\":2980},\"filePathRelative\":\"netty/optimization/optimization.md\",\"localizedDate\":\"2022年7月29日\",\"excerpt\":\"<h2> 扩展序列化算法</h2>\\n<p>序列化，反序列化主要用在消息正文的转换上</p>\\n<ul>\\n<li>序列化时，需要将 Java 对象变为要传输的数据（可以是 byte[]，或 json 等，最终都需要变成 byte[]）</li>\\n<li>反序列化时，需要将传入的正文数据还原成 Java 对象，便于处理</li>\\n</ul>\\n<p>目前的代码仅支持 Java 自带的序列化，反序列化机制，核心代码如下</p>\\n<div class=\\\"language-java line-numbers-mode\\\" data-ext=\\\"java\\\"><pre class=\\\"language-java\\\"><code><span class=\\\"token comment\\\">// 反序列化</span>\\n<span class=\\\"token keyword\\\">byte</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> body <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token keyword\\\">byte</span><span class=\\\"token punctuation\\\">[</span>bodyLength<span class=\\\"token punctuation\\\">]</span><span class=\\\"token punctuation\\\">;</span>\\nbyteByf<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">readBytes</span><span class=\\\"token punctuation\\\">(</span>body<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n<span class=\\\"token class-name\\\">ObjectInputStream</span> in <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">ObjectInputStream</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">ByteArrayInputStream</span><span class=\\\"token punctuation\\\">(</span>body<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n<span class=\\\"token class-name\\\">Message</span> message <span class=\\\"token operator\\\">=</span> <span class=\\\"token punctuation\\\">(</span><span class=\\\"token class-name\\\">Message</span><span class=\\\"token punctuation\\\">)</span> in<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">readObject</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\nmessage<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">setSequenceId</span><span class=\\\"token punctuation\\\">(</span>sequenceId<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n\\n<span class=\\\"token comment\\\">// 序列化</span>\\n<span class=\\\"token class-name\\\">ByteArrayOutputStream</span> out <span class=\\\"token operator\\\">=</span> <span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">ByteArrayOutputStream</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n<span class=\\\"token keyword\\\">new</span> <span class=\\\"token class-name\\\">ObjectOutputStream</span><span class=\\\"token punctuation\\\">(</span>out<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">writeObject</span><span class=\\\"token punctuation\\\">(</span>message<span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n<span class=\\\"token keyword\\\">byte</span><span class=\\\"token punctuation\\\">[</span><span class=\\\"token punctuation\\\">]</span> bytes <span class=\\\"token operator\\\">=</span> out<span class=\\\"token punctuation\\\">.</span><span class=\\\"token function\\\">toByteArray</span><span class=\\\"token punctuation\\\">(</span><span class=\\\"token punctuation\\\">)</span><span class=\\\"token punctuation\\\">;</span>\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div><div class=\\\"line-number\\\"></div></div></div>\",\"copyright\":{\"author\":\"vingkin\"},\"autoDesc\":true}")
