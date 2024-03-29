<template><div><h2 id="接口和抽象类有什么共同点和区别" tabindex="-1"><a class="header-anchor" href="#接口和抽象类有什么共同点和区别" aria-hidden="true">#</a> 接口和抽象类有什么共同点和区别</h2>
<p>共同点：</p>
<ul>
<li>都不能被实例化</li>
<li>都可以包含抽象方法</li>
<li>都可以有默认的实现方法（Java 8可以用default关键字在接口中定义默认方法）</li>
</ul>
<p>区别：</p>
<ul>
<li>接口主要用于对类的行为进行约束，实现了某个接口就有了相应的行为。抽象类主要用于代码复用，强调的是所属关系</li>
<li>一个类只能继承一个抽象类，但是能实现多个接口</li>
<li>接口中的成员变量只能是public static final类型的，不能被修改且必须有初始值，而抽象类的成员变量默认default，可在子类中被重新定义，也可被重新赋值。</li>
</ul>
<h2 id="equals和hashcode" tabindex="-1"><a class="header-anchor" href="#equals和hashcode" aria-hidden="true">#</a> equals和hashcode</h2>
<blockquote>
<p>equals和hashCode都是Object类中的方法。hashCode是为了获取对象的哈希码，这个哈希码的作用是确定对象在哈希表中的索引位置</p>
</blockquote>
<p>举个HashSet插入对象的例子，HashSet首先会根据对象的hashcode值来判断对象加入的位置，同时也会与其他已经加入的对象的hashcode值进行比较，如果没有相符的hashcode，HashSet会假设对象没有重复出现。但是如果发现有相同hashcode值的对象，这时会调用equals方法来检查hashcode相等的对象是否真的相同。如果两者相同，HashSet就不会让其加入操作成功。如果不同的话，就会重新散列到其他位置。我们这样可以大大减少了equals的次数，相应就大大提高了执行速度。</p>
<h2 id="与equals的区别" tabindex="-1"><a class="header-anchor" href="#与equals的区别" aria-hidden="true">#</a> ==与equals的区别</h2>
<ul>
<li>对于基本类型来说，==比较的是值是否相等</li>
<li>对于引用类型来说，==比较的是两个引用是否指向同一个对象地址</li>
<li>对于引用类型来说，equals方法如果没有被重写，equals与==作用一样，如果重写了，比如String则比较的具体内容是否相等。</li>
</ul>
<h2 id="包装类型的常量池技术" tabindex="-1"><a class="header-anchor" href="#包装类型的常量池技术" aria-hidden="true">#</a> 包装类型的常量池技术</h2>
<p>Byte,Short,Integer,Long这四种包装类默认创建了数值[-128,127]的相应类型的缓存数据，Character创建了数值在[0,127]范围的缓存数据，Boolean直接返回True/False</p>
<h2 id="自动装箱与自动拆箱" tabindex="-1"><a class="header-anchor" href="#自动装箱与自动拆箱" aria-hidden="true">#</a> 自动装箱与自动拆箱</h2>
<p><strong>装箱：</strong> 将基本类型用他们的引用类型包装起来，调用包装类的<code v-pre>valueOf()</code>方法</p>
<p><strong>拆箱：</strong> 将包装类型转换为基本数据类型，调用了<code v-pre>xxxValue()</code>方法</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Integer</span> i <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">// 自动装箱</span>
<span class="token keyword">int</span> n <span class="token operator">=</span> i<span class="token punctuation">;</span> <span class="token comment">// 自动拆箱</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="arraylist和linkedlist的区别" tabindex="-1"><a class="header-anchor" href="#arraylist和linkedlist的区别" aria-hidden="true">#</a> ArrayList和LinkedList的区别</h2>
<ol>
<li>是否保证线程安全：ArrayList和LinkedList都是不同步的，也就是<strong>都不保证线程安全</strong></li>
<li>ArrayList底层采用的是<strong>Object数组</strong>，LinkedList采用的是<strong>双向链表</strong>（JDK 1.6之前采用的是双向循环链表，JDK 1.7取消了循环）</li>
<li>数组和链表在插入删除方面的区别（注意两种结构都需要考虑是在中间操作还是在两端操作）</li>
<li>数组支持随机访问，链表不支持随机访问</li>
</ol>
<h2 id="arraylist的扩容机制" tabindex="-1"><a class="header-anchor" href="#arraylist的扩容机制" aria-hidden="true">#</a> ArrayList的扩容机制</h2>
<ol>
<li>new的时候可以给ArrayList设置数组的长度值，也可以不设置，不设置的情况下，在第一次add时会默认赋值长度为10</li>
<li>每次add操作都会对比add后的长度值与数组原有的长度值，判断是否要扩容</li>
<li>如果需要扩容，默认1.5倍长度进行扩容，先会去创造一个新的长度的数组，再将原来数组赋值过去，完成扩容操作</li>
<li>扩容的时候还是会将扩容后的数据长度与<code v-pre>Integer.MAX_VALUE</code>进行对比，以防越界</li>
<li>工作时，我们尽可能给ArrayList一个初始长度，避免扩容操作</li>
</ol>
<h2 id="list删除元素问题" tabindex="-1"><a class="header-anchor" href="#list删除元素问题" aria-hidden="true">#</a> List删除元素问题</h2>
<blockquote>
<p><a href="https://www.cnblogs.com/r1-12king/p/16066013.html" target="_blank" rel="noopener noreferrer">java中的fast-fail机制 - r1-12king - 博客园 (cnblogs.com)<ExternalLinkIcon/></a></p>
<p><a href="https://blog.csdn.net/zhaozuhao110/article/details/88116831" target="_blank" rel="noopener noreferrer">List移除元素_肆虐的毛豆的博客-CSDN博客_list删除元素<ExternalLinkIcon/></a></p>
<p><code v-pre>fail-fast</code> 机制是Java集合(Collection)中的一种错误机制。当多个线程对同一个集合的内容进行操作时，就可能会产生<code v-pre>fail-fast</code>事件。或者一个线程对集合进行删除时也可能会产生。</p>
</blockquote>
<h2 id="comparable和comparator的区别" tabindex="-1"><a class="header-anchor" href="#comparable和comparator的区别" aria-hidden="true">#</a> Comparable和Comparator的区别</h2>
<blockquote>
<p>两者都是用于自定义排序的接口</p>
</blockquote>
<ul>
<li>Comparable接口出自java.lang，用compareTo(Object obj)方法来排序</li>
<li>Comparator接口出自java.util，通过compare(Object obj1, Object obj2)来进行排序</li>
</ul>
<h2 id="hashset、linkedhashset和treeset三者的异同" tabindex="-1"><a class="header-anchor" href="#hashset、linkedhashset和treeset三者的异同" aria-hidden="true">#</a> HashSet、LinkedHashSet和TreeSet三者的异同</h2>
<ol>
<li>HashSet、LinkedHashSet和TreeSet都是Set接口的实现类，都能保证数据的唯一性，并且都不是线程安全的</li>
<li>三者的主要区别在于底层数据结构不同，HashSet底层采用的时哈希表（基于HashMap实现），LinkedHashSet底层采用的是链表和哈希表，TreeSet底层采用红黑树</li>
<li>底层数据结构的不同导致应用场景也有所不同。HashSet用于不需要保证元素插入和取出顺序的场景，LinkedHashSet用于保证元素的插入和取出满足FIFO场景，TreeSet用于支持元素的自定义排序场景。</li>
</ol>
<h2 id="hashmap的底层实现" tabindex="-1"><a class="header-anchor" href="#hashmap的底层实现" aria-hidden="true">#</a> HashMap的底层实现</h2>
<blockquote>
<p>JDK 1.8之前链表采用头插法，1.8采用了尾插法</p>
</blockquote>
<p>JDK 1.8之前HashMap底层采用的是<strong>数组和链表</strong>。HashMap通过key的hashcode经过<strong>扰动函数</strong>后得到hash值，然后通过<code v-pre>(n-1)&amp;hash</code>判断当前元素的存放位置（这里n指的是数组的长度），如果当前位置存在元素的话，就判断该元素与要存入的hash以及key是否相同，如果相同的话直接覆盖，不相同就通过拉链表解决冲突。</p>
<p>所谓扰动函数指的就是HashMap中的hash方法。目的是为了防止一些实现比较差的hashcode方法，换句话说使用扰动函数之后可以减少碰撞</p>
<p>JDK 1.8之后在解决哈希冲突时有了较大的变化，当链表长度大于阈值（默认为8）（将链表转换成红黑树之前会判断，如果当前数组的长度小于64，那么会选择先进行数组扩容，而不是转换为红黑树）时，将链表转化为红黑树，以减少搜索时间。</p>
<blockquote>
<p>(n-1)&amp;hash的规则决定在扩容后需要对已有元素进行重新hash</p>
</blockquote>
<h2 id="hashmap的扩容机制" tabindex="-1"><a class="header-anchor" href="#hashmap的扩容机制" aria-hidden="true">#</a> HashMap的扩容机制</h2>
<blockquote>
<p>针对JDK 1.8</p>
</blockquote>
<ul>
<li>容量（capacity）：hash表数组的大小，默认为16</li>
<li>初始化容量（initial capacity）：创建hash表时指定的初始容量</li>
<li>尺寸（size）：当前hash表中的元素数量</li>
<li>负载（load）：<code v-pre>load = size / capacity</code>。负载为0时，表示空的hash表。轻负载的hash表具有冲突少、适宜插入和查询的特点</li>
<li>负载因子（load factor）：决定hash表的最大填满程度（范围是0-1，默认为0.75）</li>
</ul>
<p>当hash表的负载达到了指定的“负载因子”值时，hash表就会加倍扩容，将原有的对象<strong>重新分配</strong>，放入新的hash表中，这成为rehashing。rehashing过程很复杂，而且非常消耗性能，所以指定一个合适的“负载因子”值很重要。</p>
<h2 id="hashmap在jdk-1-7的死链问题" tabindex="-1"><a class="header-anchor" href="#hashmap在jdk-1-7的死链问题" aria-hidden="true">#</a> HashMap在JDK 1.7的死链问题</h2>
<blockquote>
<p><a href="https://www.zhihu.com/question/394039290" target="_blank" rel="noopener noreferrer">jdk1.7中 hashmap为什么会发生死链?<ExternalLinkIcon/></a></p>
<p>发生在多线程数组扩容的的情况下</p>
</blockquote>
<h2 id="bio-nio-aio" tabindex="-1"><a class="header-anchor" href="#bio-nio-aio" aria-hidden="true">#</a> BIO，NIO，AIO</h2>
<blockquote>
<p><a href="https://segmentfault.com/a/1190000037714804" target="_blank" rel="noopener noreferrer">理解什么是BIO/NIO/AIO<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="bio" tabindex="-1"><a class="header-anchor" href="#bio" aria-hidden="true">#</a> BIO</h3>
<p><strong>BIO基本介绍</strong></p>
<ul>
<li>Java BIO就是传统的Java IO编程，其相关的类和接口在java.io包下</li>
<li>BIO(Blocking I/O)：<strong>同步阻塞</strong>，服务器实现模式为一个连接一个线程，即客户端有连接请求时，服务器就会需要启动一个线程来进行处理。如果这个连接不做任何事情就会造成不必要的开销。可以通过线程池进行改善。</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/BIO模型.webp" alt="BIO模型" tabindex="0" loading="lazy"><figcaption>BIO模型</figcaption></figure>
<p><strong>BIO问题分析</strong></p>
<ol>
<li>每个请求都需要创建独立的线程，与对应的客户端进行数据处理</li>
<li>当并发数很大时，需要创建大量的线程来处理连接，系统资源占用较大</li>
<li>连接建立后，如果当前线程暂时没有数据可读，则当前线程会一直阻塞在Read操作上。或者说连接后无事可做，这些都会造成线程资源的浪费</li>
</ol>
<h3 id="nio" tabindex="-1"><a class="header-anchor" href="#nio" aria-hidden="true">#</a> NIO</h3>
<p><strong>NIO基本介绍</strong></p>
<ol>
<li>Java NIO全称Java non-blocking IO，指的是JDK提供的新的API。从JDK1.4开始，JAVA提供了一系列改进的I/O的新特性，被统称为NIO，是<strong>同步非阻塞</strong>的。</li>
<li>NIO相关类都放在了java.nio包下，并对原java.io包中很多类进行了改写</li>
<li>NIO有三大核心部分：<strong>Channel（管道）、Buffer（缓冲区）、Selector（选择器）</strong></li>
<li>NIO是<strong>面向缓冲区编程</strong>的。数据读取到了一个它稍微处理的缓冲区，需要时可在缓冲区中前后移动，这就增加了处理过程中的灵活性，使用它可以提供非阻塞的高伸缩性网络。</li>
<li>Java NIO的非阻塞模式，使一个线程从某通道发送请求读取数据，但是它仅能得到当前可用数据，如果目前没有可用数据时，不会保持线程阻塞，直到数据变为可以读取之前，该线程可以做其他事情。非阻塞写入同理。</li>
</ol>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/NIO模型.webp" alt="BIO模型" tabindex="0" loading="lazy"><figcaption>BIO模型</figcaption></figure>
<p><strong>NIO三大核心组件</strong></p>
<ol>
<li>每个Channel对应一个Buffer</li>
<li>一个线程对应一个Selector，一个Selector对应多个Channel</li>
<li>上图反应了有三个Channel注册到了该Selector</li>
<li>程序切换到哪个Channel是由**事件（event）**决定的</li>
<li>Selector会根据不同的事件，在各个通道上切换</li>
<li>Buffer就是一个内存块，底层是有一个数组</li>
<li>数据的读取和写入是通过Buffer（双向的），但是需要flip()切换读写模式。而BIO是单向的，要么是输入流要么是输出流</li>
</ol>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/NIO三大核心组件.webp" alt="NIO三大核心组件" tabindex="0" loading="lazy"><figcaption>NIO三大核心组件</figcaption></figure>
<p><strong>Buffer</strong></p>
<ul>
<li>缓冲区本质上是一个可以读写数据的内存块，可以理解为是一个<strong>容器对象（数组）</strong>，该对象提供了一组方法，可以更轻松地使用内存块，缓冲区对象内置了一些机制，能够跟踪和记录了缓冲区的状态变化情况。</li>
<li>Channel读取或者写入数据必须通过Buffer</li>
<li>Buffer的子类中通过一个对应类型的数组用来存放数据</li>
<li>Buffer常用子类：<code v-pre>ByteBuffer</code>,<code v-pre>ShortBuffer</code>,<code v-pre>CharBuffer</code>,<code v-pre>IntBuffer</code>,<code v-pre>LongBuffer</code>,<code v-pre>DoubleBuffer</code>,<code v-pre>FloatBuffer</code></li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">属性</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">capacity</td>
<td style="text-align:center">容量，即可以容纳的最大数据量；在缓冲区被创建的时候就被指定，无法修改</td>
</tr>
<tr>
<td style="text-align:center">limit</td>
<td style="text-align:center">表示缓冲区的当前终点，不能对缓冲区超过limit的位置进行读写操作，但是limit是可以修改的</td>
</tr>
<tr>
<td style="text-align:center">position</td>
<td style="text-align:center">当前位置，下一个要被读或者写的索引，每次读写缓冲区数据都会改变该值，为下次读写做准备</td>
</tr>
<tr>
<td style="text-align:center">mark</td>
<td style="text-align:center">标记当前position位置，让reset后回到标记位置</td>
</tr>
</tbody>
</table>
<p><strong>Channel</strong></p>
<p>NIO的通道类似于流，但是有如下区别：</p>
<ol>
<li>通道是双向的可以进行读写，但是流是单向的只能读或者写</li>
<li>通道可以实现异步读写数据</li>
<li>通道可以从缓冲区读取数据，也可以写入数据到缓冲区</li>
</ol>
<p>常用的Channel有：<code v-pre>FileChannel</code>，<code v-pre>DatagramChannel</code>，<code v-pre>SocketChannel</code>，<code v-pre>SocketServerChannel</code></p>
<p><strong>Selector</strong></p>
<ol>
<li>Java的NIO使用了非阻塞的I/O方式。可以用一个线程处理若干个客户端连接，就会使用到Selector</li>
<li>Selector能够检测到多个注册通道上是否有事件发生（多个Channel以事件的形式注册到同一个Selector），如果有事件发生，便获取事件然后针对每个事件进行相应的处理</li>
<li>只有在连接真正有读写事件发生时，才会进行读写，减少了系统开销，并且不必为每个连接都创建一个线程，不用维护多个线程。</li>
<li>避免了多线程之间上下文切换导致的开销。</li>
</ol>
<h3 id="aio" tabindex="-1"><a class="header-anchor" href="#aio" aria-hidden="true">#</a> AIO</h3>
<p>JDK7引入了Asynchronous I/O，即AIO。在进行I/O编程时，通常用到两种模式：Reactor和Proactor。Java的NIO就是Reactor，当有事件触发时，服务器得到通知，进行相应的处理。</p>
<p>AIO叫做<strong>异步非阻塞</strong>IO，引入了异步通道的概念，采用了Proactor模式，简化了程序编写，有效的请求才会启动线程，特点就是先由操作系统完成后才通知服务端程序启动线程去处理，一般用于连接数较多且连接时长较长的应用。</p>
<p><strong>Reactor和Proactor</strong></p>
<ul>
<li>两种IO多路复用方案：Reactor和Proactor</li>
<li>Reactor模式是基于同步IO，Proactor模式是和异步IO相关的</li>
</ul>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p><strong>BIO、NIO、AIO使用场景分析</strong></p>
<ul>
<li>BIO方式适用于<strong>连接数较小且固定</strong>的架构，这种方式对服务器资源要求比较高，并发局限于应用中，JDK1.4之前唯一的选择，程序较为简单容易实现</li>
<li>NIO方式适用于<strong>连接数目多且连接比较短</strong>的架构，比如聊天服务器等等，JDK1.4开始支持</li>
<li>AIO方式适用于<strong>连接数目多且连接比较长</strong>的架构，比如相册服务器，充分调用OS参与并发操作，JDK1.7开始支持</li>
</ul>
<p><strong>NIO、BIO对比</strong></p>
<ol>
<li>BIO是以流的形式处理数据，而NIO以块（Buffer）的方式处理数据，块IO的效率比流IO高很多</li>
<li>BIO是阻塞的，而NIO是非阻塞的</li>
<li>BIO基于字节流和字符流进行操作，而NIO基于Channel和Buffer进行操作，数据总是从通道读取到缓冲区中，或者从缓冲区写入到通道中。Selector用于监听多个通道事件，因此使用<strong>单个线程可以监听多个客户端通道</strong></li>
</ol>
</div></template>


