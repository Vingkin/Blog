<template><div><h2 id="channel-buffer" tabindex="-1"><a class="header-anchor" href="#channel-buffer" aria-hidden="true">#</a> Channel &amp; Buffer</h2>
<p>channel 有一点类似于 stream，它就是读写数据的<strong>双向通道</strong>，可以从 channel 将数据读入 buffer，也可以将 buffer 的数据写入 channel，而之前的 stream 要么是输入，要么是输出，channel 比 stream 更为底层</p>
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/os/20220721171100.png" title="" alt="" data-align="center">
<p>常见的 Channel 有</p>
<ul>
<li>FileChannel</li>
<li>DatagramChannel</li>
<li>SocketChannel</li>
<li>ServerSocketChannel</li>
</ul>
<p>buffer 则用来缓冲读写数据，常见的 buffer 有</p>
<ul>
<li>ByteBuffer
<ul>
<li>MappedByteBuffer</li>
<li>DirectByteBuffer</li>
<li>HeapByteBuffer</li>
</ul>
</li>
<li>ShortBuffer</li>
<li>IntBuffer</li>
<li>LongBuffer</li>
<li>FloatBuffer</li>
<li>DoubleBuffer</li>
<li>CharBuffer</li>
</ul>
<h2 id="selector" tabindex="-1"><a class="header-anchor" href="#selector" aria-hidden="true">#</a> Selector</h2>
<p>selector 单从字面意思不好理解，需要结合服务器的设计演化来理解它的用途</p>
<h3 id="多线程版设计" tabindex="-1"><a class="header-anchor" href="#多线程版设计" aria-hidden="true">#</a> 多线程版设计</h3>
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/os/20220721171657.png" title="" alt="" data-align="center">
<h3 id="多线程版缺点⚠️" tabindex="-1"><a class="header-anchor" href="#多线程版缺点⚠️" aria-hidden="true">#</a> 多线程版缺点⚠️</h3>
<ul>
<li>内存占用高</li>
<li>线程上下文切换成本高</li>
<li>只适合连接数少的场景</li>
</ul>
<h3 id="线程池版设计" tabindex="-1"><a class="header-anchor" href="#线程池版设计" aria-hidden="true">#</a> 线程池版设计</h3>
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/os/20220721171729.png" title="" alt="" data-align="left">
<h4 id="线程池版缺点⚠️" tabindex="-1"><a class="header-anchor" href="#线程池版缺点⚠️" aria-hidden="true">#</a> 线程池版缺点⚠️</h4>
<ul>
<li>阻塞模式下，线程仅能处理一个 socket 连接</li>
<li>仅适合短连接场景</li>
</ul>
<h3 id="selector-版设计" tabindex="-1"><a class="header-anchor" href="#selector-版设计" aria-hidden="true">#</a> selector 版设计</h3>
<p>selector 的作用就是配合一个线程来管理多个 channel，获取这些 channel 上发生的事件，这些 channel 工作在非阻塞模式下，不会让线程吊死在一个 channel 上。适合连接数特别多，但流量低的场景（low traffic）</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/os/20220721171753.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>调用 selector 的 select() 会阻塞直到 channel 发生了读写就绪事件，这些事件发生，select 方法就会返回这些事件交给 thread 来处理</p>
</div></template>


