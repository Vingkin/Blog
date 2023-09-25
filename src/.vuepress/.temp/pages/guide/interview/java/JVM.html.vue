<template><div><h2 id="双亲委派机制" tabindex="-1"><a class="header-anchor" href="#双亲委派机制" aria-hidden="true">#</a> 双亲委派机制</h2>
<p><strong>工作原理</strong></p>
<ol>
<li>如果一个类加载器收到了类加载的请求，它并不会自己先去加载，而是把这个请求委托给父类的加载器去执行</li>
<li>如果父类加载器还存在父类加载器，则进一步向上委托，依次递归，请求最终将到达顶层的启动类加载器</li>
<li>如果父类加载器可以完成类加载任务，就成功返回，倘若父类加载器无法完成此加载任务，子加载器才会尝试自己去加载，这就是双亲委派机制</li>
</ol>
<p><strong>优点</strong></p>
<ol>
<li>避免类的重复加载</li>
<li>保护程序安全，防止核心API被随意篡改（比如：java.lang.String)</li>
</ol>
<h2 id="沙箱安全机制" tabindex="-1"><a class="header-anchor" href="#沙箱安全机制" aria-hidden="true">#</a> 沙箱安全机制</h2>
<p>比如自定义String类，但是在加载自定义String类的时候会率先使用引导类加载器进行加载，而引导类加载器在加载的过程中会先加载jdk自带的文件（rt.jar包中java/lang/String.class），报错信息说没有main方法，就是因为加载的是rt.jar包中的String类。这样可以保证对java核心源代码的保护，这就是沙箱安全机制。</p>
<h2 id="使用pc寄存器存储字节码指令地址有什么用呢" tabindex="-1"><a class="header-anchor" href="#使用pc寄存器存储字节码指令地址有什么用呢" aria-hidden="true">#</a> 使用PC寄存器存储字节码指令地址有什么用呢？</h2>
<blockquote>
<p>为什么用PC寄存器记录当前线程的执行地址呢</p>
</blockquote>
<p>因为CPU需要不停的切换各个线程，这时候切换回来以后，就得知道接着从哪条指令开始继续执行（<strong>PC寄存器为什么要设定为线程私有</strong>）</p>
<p>JVM的字节码解释器就需要通过改变PC寄存器的值来明确下一条应该执行什么样的字节码指令</p>
<h2 id="举例栈溢出的情况" tabindex="-1"><a class="header-anchor" href="#举例栈溢出的情况" aria-hidden="true">#</a> 举例栈溢出的情况</h2>
<p>栈大小分为固定的，和动态变化。如果是固定的就可能出现<code v-pre>StackOverflowError</code>。如果是动态变化的，内存不足时就可能出现<code v-pre>OOM</code></p>
<h2 id="方法中定义的局部变量是否线程安全" tabindex="-1"><a class="header-anchor" href="#方法中定义的局部变量是否线程安全" aria-hidden="true">#</a> 方法中定义的局部变量是否线程安全</h2>
<blockquote>
<p>还得根据变量是基本类型和引用类型两种情况分类讨论</p>
</blockquote>
<ol>
<li>如果只有一个线程操作此数据，则必是线程安全的</li>
<li>如果有多个线程操作此数据，则此数据是共享数据。如果不考虑同步机制的话，会存在线程安全问题。
<ul>
<li>如果对象是在内部产生，并在内部消亡，没有返回到外部，那么他是线程安全的，反之则是线程不安全的。（逃逸分析）</li>
</ul>
</li>
</ol>
<h2 id="minor-gc、major-gc、full-gc" tabindex="-1"><a class="header-anchor" href="#minor-gc、major-gc、full-gc" aria-hidden="true">#</a> Minor GC、Major GC、Full GC</h2>
<p>JVM在进行GC时，并非每次都对三个内存（新生代、老年代；方法区）区域一起回收，大部分时候回收的都是指新生代</p>
<p>针对HotSpot VM的实现，它里面的GC按照回收区域又分为两大种类型：一种是部分收集（Partial GC），一种是整堆收集（Full GC）</p>
<ul>
<li>部分收集：不是完整收集整个Java堆的垃圾收集。其中又分为：
<ol>
<li>新生代收集（Minor GC / Young GC）：只是新生代的垃圾收集</li>
<li>老年代收集（Major GC / Old GC）：只是老年代的垃圾收集
<ul>
<li>目前，只有CMS GC会有单独收集老年代的行为</li>
<li><strong>注意，很多时候Major GC会和Full GC混淆使用，需要具体分析是老年代回收还是整堆回收</strong></li>
</ul>
</li>
<li>混合收集（Mixed GC）：收集整个新生代以及部分老年代的垃圾收集
<ul>
<li>目前只有G1 GC会有这种行为</li>
</ul>
</li>
</ol>
</li>
<li>整堆收集（Full GC)：收集整个Java堆和方法区的垃圾收集</li>
</ul>
<h2 id="创建对象的方式" tabindex="-1"><a class="header-anchor" href="#创建对象的方式" aria-hidden="true">#</a> 创建对象的方式</h2>
<ol>
<li>new</li>
<li>Class的newInstance()：反射的方式，只能调用空参的构造器，权限必须是public</li>
<li>Constructor的newInstance(Xxx)：反射的方式，可以调用空参、带参的构造器，权限没有要求</li>
<li>使用clone()：不调用任何构造器，当前类需要实现Cloneable接口，实现clone()</li>
<li>使用反序列化：从文件中、网络中获取一个对象的二进制流</li>
</ol>
<h2 id="创建对象的步骤" tabindex="-1"><a class="header-anchor" href="#创建对象的步骤" aria-hidden="true">#</a> 创建对象的步骤</h2>
<ol>
<li>判断对象对应的类是否加载、链接、初始化
<ul>
<li>虚拟机遇到一条new指令，首先去检查这个指令的参数能否在Metaspace的常量池中定位到一个类的符号引用，并且检查这个符号引用代表的类是否已经被加载、解析和初始化（判断类元信息是否存在）。如果没有，那么在双亲委派模式下，使用当前类加载器以ClassLoader+包名+类名为Key进行查找对应的.class文件。如果没有找到文件，则抛出ClassNotFoundException异常，如果找到，则进行类加载，并生成对应的Class类对象。</li>
</ul>
</li>
<li>为对象分配内存：首先计算对象占用空间大小，接着在堆中划分一块内存给新对象。<s>如果实例成员变量是引用变量，仅分配引用变量空间即可，即4个字节大小。</s>
<ul>
<li>如果内存规整：指针碰撞</li>
<li>不规整：空闲列表</li>
</ul>
</li>
<li>处理并发安全问题
<ul>
<li>采用CAS失败重试、区域加锁保证更新的原子性</li>
<li>每个线程先分配一块TLAB</li>
</ul>
</li>
<li>初始化分配到的空间：所有属性设置默认值，保证对象实例字段在不赋值时可以直接使用</li>
<li>设置对象的对象头</li>
<li>执行init方法进行初始化
<ul>
<li>在Java程序员的视角看来，初始化才正式开始。初始化成员变量，执行实例化代码块，调用类的构造方法，并把堆内对象的首地址赋值给引用变量。因此一般来说（由字节码中是否跟随由invokespecial指令所决定），new指令之后会接着就是执行方法，把对象按照程序员的意愿进行初始化，这样一个真正可用的对象才算完全创建出来。</li>
</ul>
</li>
</ol>
<hr>
<ol>
<li>判断对象所对应的类是否加载链接初始化，如果没有则需要在双亲委派模式下对相应的类进行加载。</li>
<li>为对象分配内存。分配内存的方式有碰撞指针和空闲列表，具体使用哪种方式得看内存是否规整，规整的话使用碰撞指针否则使用空闲列表。</li>
<li>内存分配的并发问题
<ul>
<li>采用CAS配上失败重试的方式保证操作的原子性。CAS是乐观锁的一种实现方式。</li>
<li>为每个线程分配一块TLAB，TLAB是每个线程独享的，不存在线程安全问题</li>
</ul>
</li>
<li>初始化零值：内存分配完成后虚拟机需要将分配到内存的空间都初始化零值，这一操作保证了对象的实例字段在Java代码中不赋值就可以使用。</li>
<li>设置对象的对象头</li>
<li>执行init方法：在上面的工作都完成之后，从虚拟机的角度来看，一个新的对象已经产生了，但是从Java程序的视角来看，对象创建才刚刚开始。</li>
</ol>
<h2 id="对象的内存布局" tabindex="-1"><a class="header-anchor" href="#对象的内存布局" aria-hidden="true">#</a> 对象的内存布局</h2>
<ol>
<li>对象头
<ul>
<li>运行时元数据（Mark Word）
<ul>
<li>哈希值</li>
<li>GC分代年龄</li>
<li>锁状态标志</li>
<li>线程持有的锁</li>
<li>偏向线程ID</li>
<li>偏向时间戳</li>
</ul>
</li>
<li>类型指针（Klass Word）：指向类元数据InstanceKlass，确定该对象所属类型</li>
<li>说明：如果是数组，还需记录数组的长度</li>
</ul>
</li>
<li>实例数据
<ul>
<li>说明：对象真正存储的有效数据，包括程序代码中定义的各种类型的字段</li>
</ul>
</li>
<li>对齐填充</li>
</ol>
<h2 id="字符串拼接" tabindex="-1"><a class="header-anchor" href="#字符串拼接" aria-hidden="true">#</a> 字符串拼接</h2>
<ol>
<li>常量与常量引用的拼接结果在常量池，原理是编译期优化</li>
<li>常量池中不会存在相同内容的变量</li>
<li>拼接前后，只要其中有一个是变量，结果就在堆中。变量拼接的原理是StringBuilder</li>
<li>如果拼接的结果调用intern()方法，根据该字符串是否在常量池中存在，分为：
<ul>
<li>如果存在，则返回字符串在常量池中的地址</li>
<li>如果字符串常量池中不存在该字符串，则在常量池中创建一份，并返回此对象的地址</li>
</ul>
</li>
</ol>
<h2 id="gc大厂面试题" tabindex="-1"><a class="header-anchor" href="#gc大厂面试题" aria-hidden="true">#</a> GC大厂面试题</h2>
<p><strong>蚂蚁金服</strong></p>
<ol>
<li>你知道哪几种垃圾回收器，各自的优缺点，重点讲一下CMS和G1？</li>
<li>JVM GC算法有哪些，目前的JDK版本采用什么回收算法？</li>
<li>G1回收器讲下回收过程GC是什么？为什么要有GC？</li>
<li>GC的两种判定方法？CMS收集器与G1收集器的特点</li>
</ol>
<p><strong>百度</strong></p>
<ol>
<li>说一下GC算法，分代回收说下</li>
<li>垃圾收集策略和算法</li>
</ol>
<p><strong>天猫</strong></p>
<ol>
<li>JVM GC原理，JVM怎么回收内存</li>
<li>CMS特点，垃圾回收算法有哪些？各自的优缺点，他们共同的缺点是什么？</li>
</ol>
<p><strong>滴滴</strong></p>
<ol>
<li>Java的垃圾回收器都有哪些，说下G1的应用场景，平时你是如何搭配使用垃圾回收器的</li>
</ol>
<p><strong>京东</strong></p>
<ol>
<li>你知道哪几种垃圾收集器，各自的优缺点，重点讲下CMS和G1，</li>
<li>包括原理，流程，优缺点。垃圾回收算法的实现原理</li>
</ol>
<p><strong>阿里</strong></p>
<ol>
<li>讲一讲垃圾回收算法。</li>
<li>什么情况下触发垃圾回收？</li>
<li>如何选择合适的垃圾收集算法？</li>
<li>JVM有哪三种垃圾回收器？</li>
</ol>
<p><strong>字节跳动</strong></p>
<ol>
<li>常见的垃圾回收器算法有哪些，各有什么优劣？</li>
<li>System.gc()和Runtime.gc()会做什么事情？</li>
<li>Java GC机制？GC Roots有哪些？</li>
<li>Java对象的回收方式，回收算法。</li>
<li>CMS和G1了解么，CMS解决什么问题，说一下回收的过程。</li>
<li>CMS回收停顿了几次，为什么要停顿两次?</li>
</ol>
<h2 id="增量收集算法" tabindex="-1"><a class="header-anchor" href="#增量收集算法" aria-hidden="true">#</a> 增量收集算法</h2>
<p><strong>基本思想</strong></p>
<p>如果一次性将所有的垃圾进行处理，需要造成系统长时间的停顿，那么就可以让垃圾收集线程和应用程序线程交替执行。<strong>每次，垃圾收集线程只收集一小片区域的内存空间，接着切换到应用程序线程。依次反复，知道垃圾收集完成。</strong></p>
<p><strong>缺点</strong></p>
<p>使用这种方式，由于在垃圾回收过程中，间断性地还执行了应用程序代码，所以能减少系统的停顿时间。但是，因为线程和上下文切换的消耗，会使得垃圾回收的总成本上升，<strong>造成系统吞吐量的下降。</strong></p>
<h2 id="system-gc-的理解" tabindex="-1"><a class="header-anchor" href="#system-gc-的理解" aria-hidden="true">#</a> System.gc()的理解</h2>
<p>在默认情况下，通过System.gc()或者Runtime.getRuntime().gc()的调用，会显式触发Full GC，同时对老年代和新生代进行回收，尝试释放被丢弃对象占用的内存。</p>
<h2 id="内存溢出和内存泄漏的原因" tabindex="-1"><a class="header-anchor" href="#内存溢出和内存泄漏的原因" aria-hidden="true">#</a> 内存溢出和内存泄漏的原因</h2>
<p><strong>内存溢出</strong></p>
<ol>
<li>Java虚拟机的堆内存设置不够</li>
<li>代码中创建了大量大对象，并且长时间不能被垃圾收集器收集</li>
</ol>
<p><strong>内存泄漏</strong></p>
<ol>
<li>单例对象：单例的生命周期和应用程序是一样长的，所以单例程序中，如果持有对外部对象的引用的话，那么这个外部对象是不能被回收的，则会导致内存泄露的产生。</li>
<li>一些提供close的资源未关闭导致内存泄漏</li>
</ol>
<h2 id="评估gc的性能指标" tabindex="-1"><a class="header-anchor" href="#评估gc的性能指标" aria-hidden="true">#</a> 评估GC的性能指标</h2>
<ol>
<li>
<p><strong>吞吐量</strong>：运行用户代码的时间占总运行时间的比例（总运行时间 = 程序的运行时间a + 内存回收的时间b）a/(a+b)</p>
</li>
<li>
<p>垃圾收集开销：吞吐量的补数，垃圾收集所用时间与总运行时间的比例。</p>
</li>
<li>
<p><strong>暂停时间</strong>：执行垃圾收集时，程序的工作线程被暂停的时间。</p>
</li>
<li>
<p>收集频率：相对于应用程序的执行，收集操作发生的频率。</p>
</li>
<li>
<p><strong>内存占用</strong>：Java堆区所占的内存大小。</p>
</li>
<li>
<p>快速：一个对象从诞生到被回收所经历的时间。</p>
</li>
<li>
<p>吞吐量、暂停时间、内存占用这三者共同构成一个“不可能三角”。三者总体的表现会随着技术进步而越来越好。一款优秀的收集器通常最多同时满足其中的两项。</p>
</li>
<li>
<p>这三项里，暂停时间的重要性日益凸显。因为随着硬件发展，内存占用多些越来越能容忍，硬件性能的提升也有助于降低收集器运行时对应用程序的影响，即提高了吞吐量。而内存的扩大，对延迟反而带来负面效果。</p>
</li>
<li>
<p>简单来说，主要抓住两点：</p>
<ul>
<li>吞吐量</li>
<li>暂停时间</li>
</ul>
</li>
</ol>
<h2 id="_7种经典的垃圾回收器" tabindex="-1"><a class="header-anchor" href="#_7种经典的垃圾回收器" aria-hidden="true">#</a> 7种经典的垃圾回收器</h2>
<figure><img src="https://unpkg.zhimg.com/youthlql@1.0.8/JVM/chapter_012/0034.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>以串并行分类</strong>：</p>
<ol>
<li>串行回收器：Serial、Serial old</li>
<li>并行回收器：ParNew、Parallel Scavenge、Parallel old</li>
<li>并发回收器：CMS、G1</li>
</ol>
<p><strong>分代分类：</strong></p>
<ol>
<li>新生代收集器：Serial、ParNew、Parallel Scavenge；</li>
<li>老年代收集器：Serial old、Parallel old、CMS；</li>
<li>整堆收集器：G1；</li>
</ol>
<figure><img src="https://unpkg.zhimg.com/youthlql@1.0.8/JVM/chapter_012/0007.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>垃圾收集器组合关系：</strong></p>
<figure><img src="https://unpkg.zhimg.com/youthlql@1.0.8/JVM/chapter_012/0008.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol>
<li>
<p>两个收集器间有连线，表明它们可以搭配使用：</p>
<ul>
<li>Serial/Serial old</li>
<li>Serial/CMS （JDK9废弃）</li>
<li>ParNew/Serial Old （JDK9废弃）</li>
<li>ParNew/CMS</li>
<li>Parallel Scavenge/Serial Old （预计废弃）</li>
<li>Parallel Scavenge/Parallel Old</li>
<li>G1</li>
</ul>
</li>
<li>
<p>其中Serial Old作为CMS出现”Concurrent Mode Failure”失败的后备预案。</p>
</li>
<li>
<p>（红色虚线）由于维护和兼容性测试的成本，在JDK 8时将Serial+CMS、ParNew+Serial Old这两个组合声明为废弃（JEP173），并在JDK9中完全取消了这些组合的支持（JEP214），即：移除。</p>
</li>
<li>
<p>（绿色虚线）JDK14中：弃用Parallel Scavenge和Serial Old GC组合（JEP366）</p>
</li>
<li>
<p>（青色虚线）JDK14中：删除CMS垃圾回收器（JEP363）</p>
</li>
<li>
<p>为什么要有很多收集器，一个不够吗？因为Java的使用场景很多，移动端，服务器等。所以就需要针对不同的场景，提供不同的垃圾收集器，提高垃圾收集的性能。</p>
</li>
<li>
<p>虽然我们会对各个收集器进行比较，但并非为了挑选一个最好的收集器出来。没有一种放之四海皆准、任何场景下都适用的完美收集器存在，更加没有万能的收集器。所以<strong>我们选择的只是对具体应用最合适的收集器</strong>。</p>
</li>
</ol>
<h2 id="垃圾回收器的选择" tabindex="-1"><a class="header-anchor" href="#垃圾回收器的选择" aria-hidden="true">#</a> 垃圾回收器的选择</h2>
<blockquote>
<p>HotSpot有这么多的垃圾回收器，那么如果有人问，Serial GC、Parallel GC、Concurrent Mark Sweep GC这三个GC有什么不同呢？</p>
</blockquote>
<ol>
<li>如果你想要最小化地使用内存和并行开销，请选Serial GC；</li>
<li>如果你想要最大化应用程序的吞吐量，请选Parallel GC；</li>
<li>如果你想要最小化GC的中断或停顿时间，请选CMS GC。</li>
</ol>
<h2 id="jdk-后续版本中-cms-的变化" tabindex="-1"><a class="header-anchor" href="#jdk-后续版本中-cms-的变化" aria-hidden="true">#</a> JDK 后续版本中 CMS 的变化</h2>
<ol>
<li>JDK9新特性：CMS被标记为Deprecate了（JEP291）
<ul>
<li>如果对JDK9及以上版本的HotSpot虚拟机使用参数-XX:+UseConcMarkSweepGC来开启CMS收集器的话，用户会收到一个警告信息，提示CMS未来将会被废弃。</li>
</ul>
</li>
<li>JDK14新特性：删除CMS垃圾回收器（JEP363）移除了CMS垃圾收集器，
<ul>
<li>如果在JDK14中使用XX:+UseConcMarkSweepGC的话，JVM不会报错，只是给出一个warning信息，但是不会exit。JVM会自动回退以默认GC方式启动JVM</li>
</ul>
</li>
</ol>
</div></template>


