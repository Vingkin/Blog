<template><div><h2 id="netty-是什么" tabindex="-1"><a class="header-anchor" href="#netty-是什么" aria-hidden="true">#</a> Netty 是什么？</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Netty is an asynchronous event-driven network application framework
for rapid development of maintainable high performance protocol servers &amp; clients.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Netty 是一个异步的、基于事件驱动的网络应用框架，用于快速开发可维护、高性能的网络服务器和客户端</p>
<h2 id="netty-的作者" tabindex="-1"><a class="header-anchor" href="#netty-的作者" aria-hidden="true">#</a> Netty 的作者</h2>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/os/0005.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>他还是另一个著名网络应用框架 Mina 的重要贡献者</p>
<h2 id="netty-的地位" tabindex="-1"><a class="header-anchor" href="#netty-的地位" aria-hidden="true">#</a> Netty 的地位</h2>
<p>Netty 在 Java 网络应用框架中的地位就好比：Spring 框架在 JavaEE 开发中的地位</p>
<p>以下的框架都使用了 Netty，因为它们有网络通信需求！</p>
<ul>
<li>Cassandra - nosql 数据库</li>
<li>Spark - 大数据分布式计算框架</li>
<li>Hadoop - 大数据分布式存储框架</li>
<li>RocketMQ - ali 开源的消息队列</li>
<li>ElasticSearch - 搜索引擎</li>
<li>gRPC - rpc 框架</li>
<li>Dubbo - rpc 框架</li>
<li>Spring 5.x - flux api 完全抛弃了 tomcat ，使用 netty 作为服务器端</li>
<li>Zookeeper - 分布式协调框架</li>
</ul>
<h2 id="netty-的优势" tabindex="-1"><a class="header-anchor" href="#netty-的优势" aria-hidden="true">#</a> Netty 的优势</h2>
<ul>
<li>Netty vs NIO，工作量大，bug 多
<ul>
<li>需要自己构建协议</li>
<li>解决 TCP 传输问题，如粘包、半包</li>
<li>epoll 空轮询导致 CPU 100%</li>
<li>对 API 进行增强，使之更易用，如 FastThreadLocal =&gt; ThreadLocal，ByteBuf =&gt; ByteBuffer</li>
</ul>
</li>
<li>Netty vs 其它网络应用框架
<ul>
<li>Mina 由 apache 维护，将来 3.x 版本可能会有较大重构，破坏 API 向下兼容性，Netty 的开发迭代更迅速，API 更简洁、文档更优秀</li>
<li>久经考验，16年，Netty 版本
<ul>
<li>2.x 2004</li>
<li>3.x 2008</li>
<li>4.x 2013</li>
<li>5.x 已废弃（没有明显的性能提升，维护成本高）</li>
</ul>
</li>
</ul>
</li>
</ul>
</div></template>


