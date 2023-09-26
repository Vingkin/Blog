<template><div><h2 id="操作系统io介绍" tabindex="-1"><a class="header-anchor" href="#操作系统io介绍" aria-hidden="true">#</a> 操作系统IO介绍</h2>
<blockquote>
<p><a href="https://juejin.cn/post/6971291445147729950" target="_blank" rel="noopener noreferrer">再过60分钟你就能了解同步异步、阻塞非阻塞、IO多路复用、select、poll、epoll等概念啦<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="用户空间和内核空间-用户态和内核态" tabindex="-1"><a class="header-anchor" href="#用户空间和内核空间-用户态和内核态" aria-hidden="true">#</a> 用户空间和内核空间（用户态和内核态）</h3>
<p>现在的操作系统都是采用虚拟存储器，对于32位操作系统而言，他的寻址空间（虚拟存储空间）为<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>4</mn><mi>G</mi><mo stretchy="false">(</mo><msup><mn>2</mn><mn>32</mn></msup><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">4G(2^{32})</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord">4</span><span class="mord mathnormal">G</span><span class="mopen">(</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">32</span></span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span>。操作系统的核心是内核，独立于普通的应用程序，可以访问受保护的内存空间，也有访问底层硬件设备的所有权限。为了保证用户进程不能直接操作系统内核（kernel），保证内核的安全，操作系统将虚拟空间划分成两部分，一部分为内核空间，一部分为用户空间。针对linux操作系统而言，将最高的1G字节供内核使用，成为内核空间，而将较低的3G字节供各个进程使用，称为用户空间。</p>
<p><strong>什么时候会从用户态切换到内核态？</strong></p>
<ol>
<li>系统调用：用户进程主动切换到内核态的方式，用户态进程通过系统调用向操作系统申请资源完成工作，例如<code v-pre>fork()</code>就是一个创建新进程的系统调用，系统调用的机制核心使用了操作系统为用户特别开放的一个中断来实现，如Linux的 <code v-pre>int 80H</code> 中断，也可以称为软中断。</li>
<li>异常：当CPU在执行用户态的进程时，发生了一些没有预知的异常，这时当前运行进程会切换到处理此异常的内核相关进程，也就是切换到了内核态，如缺页异常。</li>
<li>中断：当CPU在执行用户态的进程时，外围设备完成用户请求的操作后，会向CPU发出相应的中断信号，这时CPU会暂时执行下一个即将要执行的指令，转到与中断信号对应的处理程序去执行，也就是切换到了内核态。如硬盘读写操作完成，系统会切换到硬盘读写的中断处理程序中执行后边的操作等。</li>
</ol>
<p><strong>为什么用户态与内核态的转换开销大？</strong></p>
<ol>
<li>保留用户态现场（上下文、寄存器、用户栈等）</li>
<li>复制用户态参数，用户栈切换到内核栈，进入内核态</li>
<li>额外的检查（内核代码对用户不信任）</li>
<li>执行内核态代码</li>
<li>复制内核态代码执行结果，回到用户态</li>
<li>恢复用户态现场（上下文、寄存器、用户栈等）</li>
</ol>
<h3 id="文件描述符" tabindex="-1"><a class="header-anchor" href="#文件描述符" aria-hidden="true">#</a> 文件描述符</h3>
<p>文件描述符（File descriptor）是计算机科学中的一个术语，是一个用于表述指向文件的引用的抽象化概念。</p>
<p>文件描述符在形式上是一个非负整数。实际上，他是一个索引值，指向内核为每一个进程所维护的该进程打开文件的记录表。当程序打开一个现有文件或者创建一个新文件时，内核向进程返回一个文件描述符。在程序设计中，一些涉及底层的程序编写往往会围绕着文件描述符展开。但是文件描述符这一个概念往往只适用于UNIX、Linux这样的操作系统。</p>
<h3 id="缓存-i-o" tabindex="-1"><a class="header-anchor" href="#缓存-i-o" aria-hidden="true">#</a> 缓存 I/O</h3>
<p>缓存I/O又被称作标准I/O，大多数文件系统的默认I/O操作都是缓存I/O。在Linux的缓存I/O机制中，操作系统会将I/O的数据缓存在文件系统的页缓存（page cache）中，也就是说，<strong>数据会被拷贝到操作系统内核的缓冲区中，然后才会从操作系统的内核缓冲区拷贝到应用程序的地址空间。</strong></p>
<p><strong>缓存I/O的缺点：</strong></p>
<p>数据在传输过程中需要在应用程序地址空间和内核之间进行多次数据拷贝操作，这些数据拷贝操作所带来的CPU以及内存开销是非常大的。</p>
<h3 id="i-o-模式" tabindex="-1"><a class="header-anchor" href="#i-o-模式" aria-hidden="true">#</a> I/O 模式</h3>
<p>对于缓存I/O，对于一次I/O访问（以read举例），数据会先被拷贝到操作系统内核的缓冲区中，然后才会从操作系统内核的缓冲区拷贝到应用程序的地址空间。所以说，当一个read操作发生时，他会经历两个阶段：</p>
<ol>
<li>等待数据准备</li>
<li>将数据从内核拷贝到进程中</li>
</ol>
<p>正是因为这两个阶段，linux系统产生了下面五种网络模式的方案</p>
<ol>
<li>阻塞I/O（blocking IO）</li>
<li>非阻塞I/O（nonblocking IO）</li>
<li>I/O多路复用（IO multiplexing）</li>
<li>信号驱动I/O（signal driven IO）</li>
<li>异步I/O（asynchronous IO）</li>
</ol>
<p><strong>阻塞I/O</strong></p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/阻塞IO.webp" alt="阻塞IO" tabindex="0" loading="lazy"><figcaption>阻塞IO</figcaption></figure>
<p>在linux中，默认情况下所有的socket都是blocking，一个典型的读操作流程如上图所示。</p>
<p>当用户进程调用了recvfrom这个系统调用，kernel就开始了IO的第一个阶段：准备数据。这个过程需要等待，也就是说数据被拷贝到操作系统内核的缓冲区中是需要一个过程的。而在用户进程这边，整个进程会被阻塞。当kernel一直等到数据准备好了，他就会将数据从kernel中拷贝到用户内存中，然后kernel返回结果，用户进程才解除block的状态，重新运行起来。</p>
<blockquote>
<p>blocking IO的特点就是IO执行的两个阶段都会被block</p>
</blockquote>
<p><strong>非阻塞I/O</strong></p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/非阻塞IO.webp" alt="非阻塞IO" tabindex="0" loading="lazy"><figcaption>非阻塞IO</figcaption></figure>
<p>在linux下，可以通过设置socket使其变为non-blocking。当对一个non-blocking socket执行读操作时，流程如上图所示。</p>
<p>当用户发出read操作时，如果kernel中的数据还没有准备好，那么它并不会block用户进程，而是立刻返回一个error。从用户进程角度讲，它发起一个read操作后，并不需要等待，而是马上就得到了一个结果。用户进程判断结果是一个error时，他就知道数据还没有准备好，于是他可以再次发送read操作。一旦kernel中的数据准备好了，并且又再次收到了用户进程的system call，那么他马上就将数据拷贝到了用户内存，然后返回。</p>
<blockquote>
<p>nonblocking IO的特点是用户进程需要不断地主动询问kernel数据好了没有</p>
</blockquote>
<p><strong>I/O多路复用</strong></p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/IO多路复用.webp" alt="IO多路复用" tabindex="0" loading="lazy"><figcaption>IO多路复用</figcaption></figure>
<p>IO multiplexing就是我们说的select，poll和epoll，有些地方也称这种IO方式为事件驱动IO（event driven IO）。select/epoll的好处就在于单个process就可以同时处理多个网络的IO。他的基本原理就是select，poll和epoll。不断地轮询所负责的所有socket，当某个socket有数据到达了就通知用户进程。</p>
<p><strong>当用户进程调用了select，那么整个进程会被block</strong>，而同时，kernel会“监视”所有select负责的socket，当任何一个socket中的数据准备好了，select就会返回。这个时候用户进程再调用read操作，将数据从kernel拷贝到用户进程。</p>
<blockquote>
<p>IO多路复用的特点是通过一种机制使得一个进程能够同时等待多个文件描述符，而这些文件描述符（套接字描述符）其中的任意一个进入读就绪状态，select函数就可以返回</p>
</blockquote>
<p>这个图和blocking IO的图其实并没有太大的不同，事实上，还更差一些。因为这里需要使用两个system call（select和recvfrom），而blocking IO只调用了一个system call（recvfrom）。但是，用select的优势在于它可以同时处理多个connection</p>
<p>所以，如果处理的连接数不是很高的话，使用select/epoll的web server不一定比使用multi-threading + blocking IO的web server性能更好，可能延迟还更大。<strong>select/epoll的优势并不是对于单个连接能处理得更快，而是在于能处理更多的连接。</strong></p>
<p>在IO multiplexing Model中，实际中，对于每一个socket，一般都设置成为non-blocking，但是，如上图所示，整个用户的process其实是一直被block的。只不过process是被select这个函数block，而不是被socket IO给block。</p>
<p><strong>异步I/O</strong></p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/异步IO.webp" alt="异步IO" tabindex="0" loading="lazy"><figcaption>异步IO</figcaption></figure>
<p>Linux下的asynchronous IO其实用的很少。流程如上图所示。</p>
<p>用户进程发起read操作之后，立刻就可以开始去做其他事。而另一方面，从kernel的角度，当它收到一个asynchronous read之后，首先他会立刻返回，所以不会对用户进程产生任何block。然后，kernel会等待数据准备完成，然后将数据拷贝到用户内存，当这一切都完成之后，kernel会给用户进程发送一个signal，告诉他read操作完成了。</p>
<p><strong>blocking和non-blocking的区别？</strong></p>
<p>调用blocking IO会一直block住对应的进程知道操作完成，而non-blocking IO在kernel准备数据的情况下会立刻返回。</p>
<p><strong>不同I/O对比</strong></p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/IO模型对比.webp" alt="IO对比" tabindex="0" loading="lazy"><figcaption>IO对比</figcaption></figure>
<h3 id="select、poll和epoll的区别" tabindex="-1"><a class="header-anchor" href="#select、poll和epoll的区别" aria-hidden="true">#</a> select、poll和epoll的区别</h3>
<p>select，poll和epoll都是IO多路复用的机制。<strong>IO多路复用就是通过一种机制使得一个进程可以监视多个文件描述符，一旦某个描述符就绪（一般是读就绪或者写就绪），能够通知程序进行相应的读写操作</strong>。但select，poll，epoll本质上都是同步IO，因为他们需要在读写事件就绪后自己负责进行读写，也就是说这个读写过程是阻塞的，而异步IO则无需自己负责进行读写，异步IO的实现会负责把数据从内核空间拷贝到用户空间。</p>
<p><strong>select</strong></p>
<p>select函数监视的文件描述符分3类，分别是writefds、readfds和exceptfds。调用后select函数会阻塞，直到有描述符就绪（有数据可读、可写或者except）或者超时（timeout指定等待时间，如果立即返回设为null即可），函数返回。当select函数返回后，可以通过<strong>遍历</strong>fdset，来找到就绪的描述符。</p>
<p>select目前几乎在所有的平台上支持，其良好跨平台支持也是他的一个优点。select的一个缺点在于单个进程能够监视文件描述符的数量存在最大限制，在Linux上一般为1024，可以通过修改宏定义甚至重新编译内核的方式提升这一限制，但是这样也会造成效率的降低。</p>
<p>本质上是通过设置或者检查存放fd标志位的数据结构来进行下一步处理。这样所带来的缺点是：</p>
<ol>
<li>select最大的缺陷就是单个进程所打开的fd数量是有一定限制的，它由<code v-pre>FD_SETSIZE</code>设置，默认值是1024.一般来说这个数目和系统内存关系很大，具体数目可以<code v-pre>cat /proc/sys/fs/file-max</code>查看。32位机默认是1024个，64位机默认是2048个。</li>
<li>对socket进行扫描时是线性扫描，采用轮询方式，效率较低。</li>
<li>需要维护一个用来存放大量fd的数据结构，这样会使得用户空间和内核空间在传递该结构时复制开销大。</li>
</ol>
<p><strong>poll</strong></p>
<p>poll本质上和select没有区别。他将用户传入的fd数组拷贝到内核空间，然后查询每个fd对应的设备状态，如果设备就绪则在设备等待队列中加入一项并继续遍历，如果遍历完所有fd后没有发现就绪设备，则挂起当前线程，知道设备就绪或者主动超时，被唤醒后他又要再次遍历fd。他没有最大连接数的限制，原因是他是基于链表来存储的，但是同样有缺点：</p>
<ol>
<li>大量的fd数组被整体复制于用户空间和内核空间，而不管这样的复制是否有意义</li>
<li>poll还有一个特点就是“水平触发”，如果报告了fd后没有被处理，那么下次poll时会再次报告该fd</li>
</ol>
<blockquote>
<p>从上面看，select和poll都需要在返回后，通过遍历文件描述符来获取已经就绪的socket。事实上，同时连接的大量客户端在同一时刻可能只有很少的处于就绪状态，因此随着监视的文件描述符数量的增长，其效率也会线性下降。</p>
</blockquote>
<p><strong>epoll</strong></p>
<p>epoll是select和poll的增强版本。相对于select和poll而言，epoll更加灵活，没有文件描述符限制。epoll使用一个文件描述符管理多个描述符，将用户关系的文件描述符的时间存放到内核的一个事件表中，这样在用户空间和内核空间的copy只需一次。</p>
<p>epoll支持水平触发和边缘触发，最大的特点就在于边缘触发，他只告诉进程哪些fd刚刚变为就绪态，并且只会通知一次。还有一个特点是，epoll使用“事件”的就绪通知方式，通过epoll_ctl注册fd，一旦该fd就绪，内核就会采用类似callback的回调机制来激活该fd，epoll_wait便可以收到通知。</p>
<p>epoll的优点</p>
<ol>
<li>没有最大并发连接的限制，能打开的fd的上限远大于1024（1G的内存大约能监听10万个端口）</li>
<li>效率提升，不是轮询的方式，不会随着fd数目的增加使得效率降低。只有活跃可用的fd才会调用callback函数。即epoll最大的优点就在于他只管你“活跃”的连接，而跟连接总数无关，因此在实际的网络环境中，epoll的效率就会远远高于select和poll</li>
<li>内存拷贝，利用mmap()文件映射内存加速和内核空间的消息传递。即epoll使用mmap减少复制开销</li>
</ol>
<p><strong>水平触发和边缘触发(Level trigger / edge trigger)</strong></p>
<p>epoll对文件描述符的操作有两种模式：LT(Level Trigger)和ET(Edge Trigger)。LT模式是默认模式，LT和ET的区别如下：</p>
<ol>
<li>LT模式：当epoll_wait检测到描述符事件发生并将此事件通知应用程序，应用程序可以不立即处理该事件下次调用epoll_wait时，会再次相应应用程序并通知此事件。</li>
<li>ET模式：当epoll_wait检测到描述符事件发生并将此事件通知应用程序，应用程序必须立即处理该事件。如果不处理，下次调用epoll_wait时，不会再次相应应用程序并通知此事件。</li>
</ol>
<blockquote>
<p>ET模式在很大程度上减少了epoll事件被重复触发的次数，因此效率要比LT模式高。epoll工作在ET模式的时候，必须使用非阻塞套接口，防止由于一个文件句柄的阻塞读/阻塞写操作把处理多个文件描述符的任务饿死。</p>
</blockquote>
<p><strong>总结</strong></p>
<ol>
<li>在select/poll中，进程只有在调用一定的方法后，内核才对所有监视的文件描述符进行扫描。</li>
<li>epoll实现通过epoll_ctl()来注册一个文件扫描符，一旦基于某个文件扫描符就绪时，内核会采用类似callback的回调机制，迅速激活这个文件描述符，当进程调用epoll_wait()时便得到通知。</li>
<li>如果没有大量的闲置连接和死亡连接，那么epoll的效率并不会比select/poll高很多，但是如果很多的话，就会发现epoll的效率大大高于select/poll。</li>
</ol>
<table>
<thead>
<tr>
<th></th>
<th>支持一个进程所能打开的最大连接数</th>
<th>fd剧增后带来的IO效率问题</th>
<th>消息传递方式</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>select</strong></td>
<td>单个进程所能打开的最大连接数由FD_SETSIZE宏定义，其大小是32个整数的大小（在32位的机器上大小就是32*32，64位机器上就是32*64），当然我们可以对其进行修改，然后重新编译内核但是性能可能受到影响，这需要进一步测试</td>
<td>因为每次调用时都会对连接进行线性遍历，所以随着fd的增加会造成遍历速度慢的“线性下降性能问题”</td>
<td>内核需要将消息传递到用户空间，都需要内核的拷贝动作</td>
</tr>
<tr>
<td><strong>poll</strong></td>
<td>poll本质上和select没有区别，但是他没有最大连接数的限制，原因是他是基于链表来存储的</td>
<td>同上</td>
<td>同上</td>
</tr>
<tr>
<td><strong>epoll</strong></td>
<td>虽然连接数有上限，但是很大，1G内存的机器上可以打开10万左右的连接</td>
<td>因为epoll内核中实现是根据每个fd上的callback函数来实现的，只有活跃的socket才会主动调用callback，所以在活跃的socket较少的情况下，使用epoll没有前面两者的线性下降的性能问题，但是所有socket都很活跃的情况下，可能有性能问题</td>
<td>epoll通过内核空间和用户空间共享一块内存来实现</td>
</tr>
</tbody>
</table>
<p>在选择select，poll和epoll时要根据具体的使用场合以及这三种方式的自身特点：</p>
<ol>
<li>表面上epoll的性能更好，但是在连接数少并且连接都十分活跃的情况下，select和poll的性能可能比epoll好，毕竟epoll的通知机制需要很多函数回调</li>
<li>select低效是因为每次它都需要轮询。但低效也是相对的，视情况而定，也可通过良好的设计改善</li>
</ol>
<h2 id="操作系统内存管理介绍" tabindex="-1"><a class="header-anchor" href="#操作系统内存管理介绍" aria-hidden="true">#</a> 操作系统内存管理介绍</h2>
<h3 id="内存管理主要是做什么" tabindex="-1"><a class="header-anchor" href="#内存管理主要是做什么" aria-hidden="true">#</a> 内存管理主要是做什么</h3>
<p>操作系统的内存管理主要负责内存的分配与回收（malloc函数申请内存，free函数释放内存），另外地址转换也就是将逻辑地址转换为相应物理地址等功能也是操作系统内存管理做的事情。</p>
<h3 id="常见的几种内存管理机制" tabindex="-1"><a class="header-anchor" href="#常见的几种内存管理机制" aria-hidden="true">#</a> 常见的几种内存管理机制</h3>
<p>简单分为<strong>连续分配管理方式</strong>和<strong>非连续分配管理方式</strong>。连续分配管理方式是指为一个程序分配一个连续的内存空间，常见的如<strong>块式管理</strong>。同样地，非连续分配管理方式允许一个程序员使用的内存分布在离散或者说不相邻的内存中，常见的如<strong>页式管理</strong>和<strong>段式管理</strong>。</p>
<p><strong>块式管理</strong></p>
<p>远古时代的计算机操作系统的内存管理方式。将内存分为几个固定大校的块，每个块只包含一个进程。如果程序运行需要内存的话，操作系统就分配给它一块，如果程序运行只需要很小的空间的话，分配的这块内存很大一部分几乎被浪费了。这些在每块中未被利用的空间，我们称之为碎片。</p>
<p><strong>页式管理</strong></p>
<blockquote>
<p>在该方式中，将用户程序的地址空间分为若干个固定大小的区域，称为“页”或“页面”。相应地，也将内存空间分为若干个物理块或页框，页和块的大小相同。这样可将用户程序的任一页放入任一物理块中，实现离散分配。</p>
</blockquote>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/377adab44aed2e7341d4f11e8301a18b87d6fac7.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>页（页面）和物理块（页框）</p>
<blockquote>
<p>页面对应着逻辑地址，物理块对应着物理地址</p>
</blockquote>
<p>页式管理中将进程的逻辑地址空间分成若干个页，并为每个页加以编号。相应地将内存的物理地址空间分成若干个块，同样加以编号。在为进程分配内存时，以块为单位，将进程中的若干个页分别装入到多个可以不相邻接的物理块中。由于进程的最后一页经常装不满一块，从而会形成碎片。</p>
<p>页的地址结构：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/20210424101140925.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<br/>
<p>页表</p>
<p>页表的作用是实现页号到物理块号的地址映射</p>
<br/>
<p>如何将逻辑地址转换为物理地址？</p>
<p>通过页号去页表查找该页号对应的块号，然后将物理块号与页内偏移地址拼接成实际物理地址</p>
<br/>
<p>访问内存的有效时间</p>
<p>从进程发出指定逻辑地址的访问请求，经过地址变换，到在内存中找到对应的实际物理地址单元并取出数据，所要花费的总时间，称为<strong>内存的有效访问时间(Effective Access Time, EAT)</strong>。</p>
<p>假设访问一次内存的时间为t，在基本分页存储管理方式中，有效访问时间为第一次访间（即<strong>通过页号访问页表得到物理块号</strong>）与第二次访问内存时间（即将页表项中的物理块号与页内偏移地址拼接成实际物理地址后<strong>访问实际物理地址所耗费的时间</strong>）之和：<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mi>A</mi><mi>T</mi><mo>=</mo><mi>t</mi><mo>+</mo><mi>t</mi><mo>=</mo><mn>2</mn><mi>t</mi></mrow><annotation encoding="application/x-tex">EAT = t + t = 2t</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="mord mathnormal">A</span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6984em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">t</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6151em;"></span><span class="mord mathnormal">t</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">2</span><span class="mord mathnormal">t</span></span></span></span></p>
<br/>
<p>快表和多级页表</p>
<blockquote>
<ol>
<li>虚拟地址到物理地址的转换要快（快表解决）</li>
<li>虚拟地址空间大，页表也会很大的问题（多级页表解决）</li>
</ol>
</blockquote>
<p>快表</p>
<blockquote>
<p>快表的作用和缓存很类似</p>
</blockquote>
<p>在CPU给出有效地址后，由地址变换机构自动地将页号P送入<strong>高速缓冲寄存器（快表）</strong>，并将此页号与高速缓冲中的所有页号进行比较，若其中有与此相匹配地页号，便表示所要访问的页表项在快表中。如果在快表中未找到对应地页表项，则还需再次访问内存中的页表，在内存中找到后将该页表项存入快表的一个寄存器单元中。</p>
<p>在引入快表的分页存储管理方式中，访问内存的有效时间为：<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>E</mi><mi>A</mi><mi>T</mi><mo>=</mo><mi>a</mi><mo>×</mo><mi>λ</mi><mo>+</mo><mo stretchy="false">(</mo><mi>t</mi><mo>+</mo><mi>λ</mi><mo stretchy="false">)</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mi>a</mi><mo stretchy="false">)</mo><mo>+</mo><mi>t</mi></mrow><annotation encoding="application/x-tex">EAT = a \times \lambda + (t + \lambda)(1 - a) + t</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">E</span><span class="mord mathnormal">A</span><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">a</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.7778em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">λ</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">t</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">λ</span><span class="mclose">)</span><span class="mopen">(</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal">a</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6151em;"></span><span class="mord mathnormal">t</span></span></span></span>，其中<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>λ</mi></mrow><annotation encoding="application/x-tex">\lambda</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6944em;"></span><span class="mord mathnormal">λ</span></span></span></span>为访问快表所需时间，<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>t</mi></mrow><annotation encoding="application/x-tex">t</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6151em;"></span><span class="mord mathnormal">t</span></span></span></span>为访问一次内存所需时间，<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>a</mi></mrow><annotation encoding="application/x-tex">a</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">a</span></span></span></span>为快表的命中率。</p>
<p>多级页表</p>
<p>以二级页表而言，将页表进行分页，使每个页面的大小与内存物理块的大小相同，并为它们进行编号，然后离散的存储在不同的物理块中（二级页表）。同样为离散分配的页表在建立一张页表，称为外层页表（一级页表）。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/18464438-d40bb24f98b9fcab.webp" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>多级页表的提出主要是解决下面两个问题：</p>
<ol>
<li>对于页表所需的内存空间，可采用离散分配的方式，以解决难以找到一块连续的大内存空间的问题。</li>
<li>只将当前需要的部分页表项调入内存，其余的页表项仍然驻留在磁盘上，需要时再调入。</li>
</ol>
<p>总结</p>
<p>为了提高内存的空间性能，提出了多级页表的概念；但是空间性能的提升是以时间为代价的，因此为了补充损失的时间性能，提出了快表的概念。不论使快表还是多级页表实际上都利用到了程序的<strong>局部性原理</strong>。</p>
<br/>
<p><strong>段式管理</strong></p>
<blockquote>
<p>这是为了满足用户要求而形成的一种存储管理方式。它把用户程序的地址空间分为若干个大小不同的段，每段可定义一组相对完整的信息。在存储器分配时，以段为单位，这些段在内存中可以不相邻接，所以也同样实现了离散分配。</p>
</blockquote>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/u%3D1505972392%2C2783955240%26fm%3D253%26fmt%3Dauto%26app%3D138%26f%3DJPEG.webp" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>页式管理虽然提高了内存利用率，但是页式管理其中的页并无任何实际意义。在分段存储管理方式中，作业的地址空间被划分为若干个段，每个段定义了一组逻辑信息。例如，有主程序段MAIN、子程序段X、数据段D和栈段S等。段式管理通过段表对应逻辑地址和物理地址。</p>
<br/>
<p><strong>段页式管理</strong></p>
<blockquote>
<p>这是分页和分段两种存储管理方式相结合的产物。它同时具有两者的优点，是目前应用较广泛的一种存储管理方式。</p>
</blockquote>
<p>段页式存储管理结合了页式管理和段式管理的优点。简单来说段页式管理机制就是先把用户程序分成若干个段，再把每个段分成若干个页。也就是说段页式管理机制中段与段之间以及段的内部都是离散的。（对于段式管理，一个段就是一个连续的物理地址空间）</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/20180624102519852.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<br/>
<p><strong>分段和分页的共同点与区别</strong></p>
<ol>
<li>共同点
<ul>
<li>分页机制和分段机制都是为了提高内存利用率，减少内存碎片</li>
<li>页和段都是离散存储的，所以两者都是离散分配内存的方式。但是，每个页和段中的内存是连续的</li>
</ul>
</li>
<li>区别
<ul>
<li>页的大小是固定的，由操作系统决定；而段的大小不固定，取决于具体程序</li>
<li>分页仅仅是为了满足操作系统内存管理的需求，是物理单位。分段则是信息的逻辑单位，在程序中体现为主程序段，数据段等等，其目的是为了更好地满足用户的需求</li>
</ul>
</li>
</ol>
<h3 id="逻辑地址和物理地址" tabindex="-1"><a class="header-anchor" href="#逻辑地址和物理地址" aria-hidden="true">#</a> 逻辑地址和物理地址</h3>
<p>程序员一般只能和逻辑地址打交道，像C语言中指针存储的数值就可以理解为逻辑地址。而物理地址指的是真实物理内存中的地址，是内存单元真正的地址。</p>
<p>CPU中的<strong>内存管理单元</strong>就是用于将逻辑地址翻译成物理地址。</p>
<h3 id="为什么要有虚拟地址空间呢" tabindex="-1"><a class="header-anchor" href="#为什么要有虚拟地址空间呢" aria-hidden="true">#</a> 为什么要有虚拟地址空间呢？</h3>
<p><strong>如果直接把物理地址暴露出来的话会带来严重的问题，比如可能对操作系统造成伤害以及给同时运行多个程序造成困难</strong></p>
<p>使用虚拟地址访问内存有以下优势：</p>
<ul>
<li>程序可以使用一系列相邻的虚拟地址来访问物理内存中不相邻的大内存缓冲区</li>
<li>程序可以使用一系列虚拟地址来访问大于可用物理内存的内存缓冲区。当物理内存的供应量变小时，内存管理器会将物理内存页保存到磁盘文件。数据或代码页会根据需要在物理内存与磁盘之间移动（虚拟内存）</li>
<li>不同进程使用的虚拟地址彼此隔离。一个进程中的代码无法更改正在由另一个进程或操作系统使用的物理内存</li>
</ul>
<h2 id="操作系统虚拟内存介绍" tabindex="-1"><a class="header-anchor" href="#操作系统虚拟内存介绍" aria-hidden="true">#</a> 操作系统虚拟内存介绍</h2>
<p>在说操作系统虚拟内存之前有必要说一下<strong>局部性原理</strong>。局部性原理是虚拟内存技术的基础，正是因为程序具有局部性原理，才可以只装入部分程序到内存就开始运行。</p>
<h3 id="局部性原理" tabindex="-1"><a class="header-anchor" href="#局部性原理" aria-hidden="true">#</a> 局部性原理</h3>
<p>局部性原理有表现在下述两个方面：</p>
<ol>
<li><strong>时间局部性</strong>：如果程序中的某条指令被执行，则不久后该指令可能再次执行；如果某数据被访问过，则不久后该数据可能再次被访问。产生时间局部性的典型原因是程序中存在着大量的循环操作。</li>
<li><strong>空间局部性</strong>：一旦程序访问了某个存储单元，在不久之后，其附近的存储单元也将被访问，即程序在一段时间内所访问的地址可能集中在一定的范围内，这是因为指令通常是顺序存放、顺序执行的，数据也一般是以向量、数组、表等形式簇聚存储的。</li>
</ol>
<p><strong>时间局部性</strong>是通过将近来使用的指令和数据保存到高速缓存存储器中，并使用高速缓存的层次结构实现。<strong>空间局部性</strong>通常是使用较大的高速缓存，并将预取机制集成到高速缓存控制逻辑中实现。虚拟内存技术实际上就是建立了“内存-外存”的两级存储器的结构，利用局部性原理实现高速缓存。</p>
<h3 id="虚拟内存-虚拟存储器" tabindex="-1"><a class="header-anchor" href="#虚拟内存-虚拟存储器" aria-hidden="true">#</a> 虚拟内存（虚拟存储器）</h3>
<p>基于局部性原理可知，应用程序在运行之前没有必要将之全部装入内存，而仅需将那些当前要运行的少数页面或段先装入内存便可运行，其余部分暂留在盘上。程序在运行时，如果他所要访问的页（段）已调入内存，便可继续执行下去；但如果程序所要访问的页（段）尚未调入内存（称为缺页或缺段），便发出缺页（段）中断请求，此时OS将利用请求调页（段）功能将它们调入内存，以使进程能继续执行下去。如果此时内存已满，无法再装入新的页（段），OS还须再利用页（段）的置换功能，将内存中暂时不用的页（段）调至盘上，腾出足够的内存空间后，再将要访问的页（段）调入内存，使程序继续执行下去。这样，便可使一个大的用户程序在较小的内存空间中运行，也可在内存中同时装入更多的进程，使它们并发执行。</p>
<p>虚拟内存类似于时间换空间，用CPU的计算，页的调入调出，换来了一个更大的空间来支持程序的运行。<strong>其重要意义在于定义了一个连续的虚拟地址空间，并且把内存扩展到磁盘空间。</strong></p>
<h3 id="虚拟存储器的实现方法" tabindex="-1"><a class="header-anchor" href="#虚拟存储器的实现方法" aria-hidden="true">#</a> 虚拟存储器的实现方法</h3>
<p>虚拟存储器允许将一个作业分多次调入内存。如果采用连续分配的方式，要求必须将作业装入一个连续的内存区域中，则必须事先为作业一次性地申请一个足以容纳整个作业的内存空间，以便能将作业分先后地多次装入内存。这不仅会使相当一部分内存空间都处于暂时或“永久”地空闲状态，造成内存资源的严重浪费，而且无法、也无意义再从逻辑上扩大内存容量。<strong>所以，虚拟存储器地实现，都毫无例外地建立在离散分配存储管理方式的基础上。</strong></p>
<p>虚拟内存的实现有以下三种方式：</p>
<ol>
<li><strong>请求分页存储管理</strong>：分页请求系统是在分页系统的基础上增加了请求调页功能和页面置换功能所形成的页式虚拟存储系统。它允许用户程序只装入少数页面的程序（及数据）即可启动运行。以后，再通过调页功能及页面置换功能陆续地把即将运行的页面调入内存，同时把暂时不运行的页面换出到外存上。</li>
<li><strong>请求分段存储管理</strong>：请求分段系统是在分段系统的基础上，增加了请求调段及分段置换功能后形成的段式虚拟存储系统。它允许用户程序只要装入少数段的程序和数据即可启动运行。以后通过调段功能和段的置换功能将暂时不运行的段调出，再调入即将运行的段。</li>
<li><strong>请求段页式存储管理</strong></li>
</ol>
<p>不管是上面那种实现方式，我们都需要：</p>
<ol>
<li><strong>一定容量的内存和外存</strong>：在载入程序的时候，只需要将程序的一部分装入内存，而将其他部分留在外存，然后程序就可以执行了</li>
<li><strong>缺页（段）中断</strong>：如果需执行的指令或访问的数据尚未在内存（称为缺页或缺段），则由处理器通知操作系统将相应的页面或段调入到内存，然后继续执行程序</li>
<li><strong>虚拟地址空间</strong>：实现虚拟地址向物理地址的转换</li>
</ol>
<p><strong>这边说的请求分页存储管理和操作系统内存管理中的分页存储管理有何不同？</strong></p>
<p>请求分页存储管理建立在分页存储管理之上。它们的根本区别在于是否将程序所需的全部地址空间都装入主存。请求分页存储管理不要求将作业全部地址空间同时装入主存。基于这一点，请求分页存储管理可以提供虚拟内存，而分页存储管理不能提供虚存。</p>
<h3 id="页面置换算法" tabindex="-1"><a class="header-anchor" href="#页面置换算法" aria-hidden="true">#</a> 页面置换算法</h3>
<p>在进程运行过程中，若其所要访问的页面不在内存，而需把它们调入内存，但内存已无空闲空间时，为了保证该进程能正常运行，操作系统必须在内存中选择一个页面将其移出内存，以便为即将调入的页面让出空间。用来选择淘汰哪一页的规则叫做页面置换算法，通常可以把页面置换算法看成是淘汰页面的规则</p>
<ul>
<li>
<p><strong>最佳页面置换算法（OPT）</strong>：</p>
<p>最佳页面置换算法所选择的被淘汰页面将是以后永不使用的，或者是在最长时间内不再被访问的页面，这样可以保证获得最低的缺页率。但是由于人们目前无法预知进程的若干个页面中，哪一个页面是未来最长时间内不再被访问的，因而该算法无法实现。一般作为衡量其他置换算法的方法</p>
</li>
<li>
<p><strong>先进先出页面置换算法（FIFO）</strong>：</p>
<p>总是淘汰最先进入内存的页面，即选择在内存中驻留时间最久的页面进行淘汰</p>
</li>
<li>
<p><strong>最近最久未使用页面置换算法（LRU）</strong>：</p>
<p>LRU置换算法是选择最近最久未使用的页面予以淘汰。该算法赋予每个页面一个访问字段，用来记录一个页面自上次被访问以来所经历的时间t。当需淘汰一个页面时，选择现有页面中其t值最大的淘汰，即选择最近最久未使用的页面进行淘汰。</p>
<p>假设有一进程，有五个物理块，所访问的页面的页面序号为：<code v-pre>4,7,0,7,1,0,1,2,1,2,6</code>，其演示图如下：（其实并没有用到栈的特性）</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/LRU.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</li>
<li>
<p><strong>最少使用页面置换算法（LFU）</strong>：</p>
<p>该置换算法选择在之前时期使用最少的也页面作为淘汰页</p>
</li>
</ul>
</div></template>


