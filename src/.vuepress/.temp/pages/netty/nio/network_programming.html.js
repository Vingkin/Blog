export const data = JSON.parse("{\"key\":\"v-04a5c7f2\",\"path\":\"/netty/nio/network_programming.html\",\"title\":\"网络编程\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"网络编程\",\"author\":\"vingkin\",\"date\":\"2022-07-21T00:00:00.000Z\",\"description\":\"非阻塞 vs 阻塞 阻塞 阻塞模式下，相关方法都会导致线程暂停 ServerSocketChannel.accept 会在没有连接建立时让线程暂停 SocketChannel.read 会在没有数据可读时让线程暂停 阻塞的表现其实就是线程暂停了，暂停期间不会占用 cpu，但线程相当于闲置 单线程下，阻塞方法之间相互影响，几乎不能正常工作，需要多线程支持 但多线程下，有新的问题，体现在以下方面 32 位 jvm 一个线程 320k，64 位 jvm 一个线程 1024k，如果连接数过多，必然导致 OOM，并且线程太多，反而会因为频繁上下文切换导致性能降低 可以采用线程池技术来减少线程数和线程上下文切换，但治标不治本，如果有很多连接建立，但长时间 inactive，会阻塞线程池中所有线程，因此不适合长连接，只适合短连接\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vingkin.github.io/Blog/Blog/netty/nio/network_programming.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Vingkin的学习博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"网络编程\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"非阻塞 vs 阻塞 阻塞 阻塞模式下，相关方法都会导致线程暂停 ServerSocketChannel.accept 会在没有连接建立时让线程暂停 SocketChannel.read 会在没有数据可读时让线程暂停 阻塞的表现其实就是线程暂停了，暂停期间不会占用 cpu，但线程相当于闲置 单线程下，阻塞方法之间相互影响，几乎不能正常工作，需要多线程支持 但多线程下，有新的问题，体现在以下方面 32 位 jvm 一个线程 320k，64 位 jvm 一个线程 1024k，如果连接数过多，必然导致 OOM，并且线程太多，反而会因为频繁上下文切换导致性能降低 可以采用线程池技术来减少线程数和线程上下文切换，但治标不治本，如果有很多连接建立，但长时间 inactive，会阻塞线程池中所有线程，因此不适合长连接，只适合短连接\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-09-25T02:33:51.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"vingkin\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-07-21T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-09-25T02:33:51.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"网络编程\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-07-21T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2023-09-25T02:33:51.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"vingkin\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"非阻塞 vs 阻塞\",\"slug\":\"非阻塞-vs-阻塞\",\"link\":\"#非阻塞-vs-阻塞\",\"children\":[{\"level\":3,\"title\":\"阻塞\",\"slug\":\"阻塞\",\"link\":\"#阻塞\",\"children\":[]},{\"level\":3,\"title\":\"非阻塞\",\"slug\":\"非阻塞\",\"link\":\"#非阻塞\",\"children\":[]},{\"level\":3,\"title\":\"多路复用\",\"slug\":\"多路复用\",\"link\":\"#多路复用\",\"children\":[]}]},{\"level\":2,\"title\":\"Selector\",\"slug\":\"selector\",\"link\":\"#selector\",\"children\":[{\"level\":3,\"title\":\"创建\",\"slug\":\"创建\",\"link\":\"#创建\",\"children\":[]},{\"level\":3,\"title\":\"绑定 Channel 事件\",\"slug\":\"绑定-channel-事件\",\"link\":\"#绑定-channel-事件\",\"children\":[]},{\"level\":3,\"title\":\"监听 Channel 事件\",\"slug\":\"监听-channel-事件\",\"link\":\"#监听-channel-事件\",\"children\":[]},{\"level\":3,\"title\":\"select 何时不阻塞💡\",\"slug\":\"select-何时不阻塞💡\",\"link\":\"#select-何时不阻塞💡\",\"children\":[]}]},{\"level\":2,\"title\":\"处理 accept 事件\",\"slug\":\"处理-accept-事件\",\"link\":\"#处理-accept-事件\",\"children\":[{\"level\":3,\"title\":\"事件发生后能否不处理💡\",\"slug\":\"事件发生后能否不处理💡\",\"link\":\"#事件发生后能否不处理💡\",\"children\":[]}]},{\"level\":2,\"title\":\"处理 read 事件\",\"slug\":\"处理-read-事件\",\"link\":\"#处理-read-事件\",\"children\":[{\"level\":3,\"title\":\"为何要 iter.remove()💡\",\"slug\":\"为何要-iter-remove-💡\",\"link\":\"#为何要-iter-remove-💡\",\"children\":[]},{\"level\":3,\"title\":\"cancel 的作用💡\",\"slug\":\"cancel-的作用💡\",\"link\":\"#cancel-的作用💡\",\"children\":[]},{\"level\":3,\"title\":\"不处理边界的问题⚠️\",\"slug\":\"不处理边界的问题⚠️\",\"link\":\"#不处理边界的问题⚠️\",\"children\":[]},{\"level\":3,\"title\":\"处理消息的边界\",\"slug\":\"处理消息的边界\",\"link\":\"#处理消息的边界\",\"children\":[]},{\"level\":3,\"title\":\"ByteBuffer 大小分配\",\"slug\":\"bytebuffer-大小分配\",\"link\":\"#bytebuffer-大小分配\",\"children\":[]}]},{\"level\":2,\"title\":\"处理 write 事件\",\"slug\":\"处理-write-事件\",\"link\":\"#处理-write-事件\",\"children\":[{\"level\":3,\"title\":\"一次无法写完例子\",\"slug\":\"一次无法写完例子\",\"link\":\"#一次无法写完例子\",\"children\":[]},{\"level\":3,\"title\":\"write 为何要取消💡\",\"slug\":\"write-为何要取消💡\",\"link\":\"#write-为何要取消💡\",\"children\":[]}]},{\"level\":2,\"title\":\"更进一步\",\"slug\":\"更进一步\",\"link\":\"#更进一步\",\"children\":[{\"level\":3,\"title\":\"利用多线程优化💡\",\"slug\":\"利用多线程优化💡\",\"link\":\"#利用多线程优化💡\",\"children\":[]},{\"level\":3,\"title\":\"如何拿到 cpu 个数💡\",\"slug\":\"如何拿到-cpu-个数💡\",\"link\":\"#如何拿到-cpu-个数💡\",\"children\":[]}]},{\"level\":2,\"title\":\"UDP\",\"slug\":\"udp\",\"link\":\"#udp\",\"children\":[]}],\"git\":{\"createdTime\":1695609231000,\"updatedTime\":1695609231000,\"contributors\":[{\"name\":\"Vingkin\",\"email\":\"1830053226@qq.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":14.19,\"words\":4257},\"filePathRelative\":\"netty/nio/network_programming.md\",\"localizedDate\":\"2022年7月21日\",\"excerpt\":\"<h2> 非阻塞 vs 阻塞</h2>\\n<h3> 阻塞</h3>\\n<ul>\\n<li>阻塞模式下，相关方法都会导致线程暂停\\n<ul>\\n<li>ServerSocketChannel.accept 会在没有连接建立时让线程暂停</li>\\n<li>SocketChannel.read 会在没有数据可读时让线程暂停</li>\\n<li>阻塞的表现其实就是线程暂停了，暂停期间不会占用 cpu，但线程相当于闲置</li>\\n</ul>\\n</li>\\n<li>单线程下，阻塞方法之间相互影响，几乎不能正常工作，需要多线程支持</li>\\n<li>但多线程下，有新的问题，体现在以下方面\\n<ul>\\n<li>32 位 jvm 一个线程 320k，64 位 jvm 一个线程 1024k，如果连接数过多，必然导致 OOM，并且线程太多，反而会因为频繁上下文切换导致性能降低</li>\\n<li>可以采用线程池技术来减少线程数和线程上下文切换，但治标不治本，如果有很多连接建立，但长时间 inactive，会阻塞线程池中所有线程，因此不适合长连接，只适合短连接</li>\\n</ul>\\n</li>\\n</ul>\",\"copyright\":{\"author\":\"vingkin\"},\"autoDesc\":true}")