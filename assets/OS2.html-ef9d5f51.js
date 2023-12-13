const l=JSON.parse('{"key":"v-1ed47dfd","path":"/OS/OS2.html","title":"操作系统中","lang":"zh-CN","frontmatter":{"title":"操作系统中","author":"keyhx","date":"2022-06-28T00:00:00.000Z","description":"1、死锁的概念 什么是死锁 在并发环境下，各进程因竞争资源而造成的一种互相等待对方手里的资源，导致各进程都阻塞，都无法向前推进的现象 发生死锁至少有两个或两个以上的进程同时发生死锁，发生死锁后，若无外力干涉，这些进程都无法向前推进，发生死锁的进程一定是在阻塞态 饥饿的概念： 由于长期得不到想要的资源，某进程无法向前推进的现象，比如SPF如果有源源不断的短进程到来，则长进程一直无法获得处理机 死循环的概念 某进程在执行的过程中一直跳不出某个循环的现象，有时是因为程序bug导致的，有时是程序员故意为之 死锁、饥饿、死循环的异同 异如上 同：都是进程无法顺利向前推进的现象(故意设计的死循环除外) 死锁产生的条件 1、互斥条件：只有对必须互斥使用的资源的争抢才会导致死锁 2、不剥夺条件：进程所获得的资源在未使用完之前，不能由其他进程强行夺走，只能主动释放 3、请求和保持条件：进程已经至少保持了一个资源，但又提出了新的资源请求，而该资源又被其他进程占有，此时请求进程被阻塞，但又对自己已有的资源保持不放 4、循环等待条件：存在一种进程资源的循环等待链，链中的每一个进程已获得的资源同时被下一个进程所请求 注意：发生死锁的时候一定有循环等待，但是发生循环等待的时候未必死锁，因为如果同类资源的数量大于1，当该类资源又进程释放的时候，死锁结束。如果每类资源只有1个，那就是充分必要条件了 什么时候会发生死锁 1、对系统资源的竞争。对不可剥夺资源的竞争可能会引起死锁，对可剥夺的资源不会产生 2、进程推进顺序非法。请求和释放资源的顺序不当，比如，并发执行的进程P1、P2分别申请并占有了资源R1,R2,但是之后P1进程又申请资源R2，P2进程申请资源R1，这样会导致死锁 3、信号量的使用不当。比如，实现互斥的P操作在实现同步的P操作之前 死锁的处理策略 1、预防死锁：破坏死锁产生的四个必要条件中的一个或几个 2、避免死锁：用某种方法阻止系统进入不安全的状态 3、死锁的检测和解除：允许死锁的产生，不过操作系统会负责检测出死锁的产生，然后采取某种措施解除死锁","head":[["meta",{"property":"og:url","content":"https://vingkin.github.io/Blog/Blog/OS/OS2.html"}],["meta",{"property":"og:site_name","content":"Vingkin的学习博客"}],["meta",{"property":"og:title","content":"操作系统中"}],["meta",{"property":"og:description","content":"1、死锁的概念 什么是死锁 在并发环境下，各进程因竞争资源而造成的一种互相等待对方手里的资源，导致各进程都阻塞，都无法向前推进的现象 发生死锁至少有两个或两个以上的进程同时发生死锁，发生死锁后，若无外力干涉，这些进程都无法向前推进，发生死锁的进程一定是在阻塞态 饥饿的概念： 由于长期得不到想要的资源，某进程无法向前推进的现象，比如SPF如果有源源不断的短进程到来，则长进程一直无法获得处理机 死循环的概念 某进程在执行的过程中一直跳不出某个循环的现象，有时是因为程序bug导致的，有时是程序员故意为之 死锁、饥饿、死循环的异同 异如上 同：都是进程无法顺利向前推进的现象(故意设计的死循环除外) 死锁产生的条件 1、互斥条件：只有对必须互斥使用的资源的争抢才会导致死锁 2、不剥夺条件：进程所获得的资源在未使用完之前，不能由其他进程强行夺走，只能主动释放 3、请求和保持条件：进程已经至少保持了一个资源，但又提出了新的资源请求，而该资源又被其他进程占有，此时请求进程被阻塞，但又对自己已有的资源保持不放 4、循环等待条件：存在一种进程资源的循环等待链，链中的每一个进程已获得的资源同时被下一个进程所请求 注意：发生死锁的时候一定有循环等待，但是发生循环等待的时候未必死锁，因为如果同类资源的数量大于1，当该类资源又进程释放的时候，死锁结束。如果每类资源只有1个，那就是充分必要条件了 什么时候会发生死锁 1、对系统资源的竞争。对不可剥夺资源的竞争可能会引起死锁，对可剥夺的资源不会产生 2、进程推进顺序非法。请求和释放资源的顺序不当，比如，并发执行的进程P1、P2分别申请并占有了资源R1,R2,但是之后P1进程又申请资源R2，P2进程申请资源R1，这样会导致死锁 3、信号量的使用不当。比如，实现互斥的P操作在实现同步的P操作之前 死锁的处理策略 1、预防死锁：破坏死锁产生的四个必要条件中的一个或几个 2、避免死锁：用某种方法阻止系统进入不安全的状态 3、死锁的检测和解除：允许死锁的产生，不过操作系统会负责检测出死锁的产生，然后采取某种措施解除死锁"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-25T02:59:31.000Z"}],["meta",{"property":"article:author","content":"keyhx"}],["meta",{"property":"article:published_time","content":"2022-06-28T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-25T02:59:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"操作系统中\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-06-28T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-25T02:59:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"keyhx\\"}]}"]]},"headers":[{"level":2,"title":"1、死锁的概念","slug":"_1、死锁的概念","link":"#_1、死锁的概念","children":[]},{"level":2,"title":"2、死锁的处理策略----预防死锁","slug":"_2、死锁的处理策略-预防死锁","link":"#_2、死锁的处理策略-预防死锁","children":[]},{"level":2,"title":"3、死锁的处理策略----避免死锁","slug":"_3、死锁的处理策略-避免死锁","link":"#_3、死锁的处理策略-避免死锁","children":[]},{"level":2,"title":"4、死锁的处理策略----检测和解除","slug":"_4、死锁的处理策略-检测和解除","link":"#_4、死锁的处理策略-检测和解除","children":[]},{"level":2,"title":"5、内存的基础知识","slug":"_5、内存的基础知识","link":"#_5、内存的基础知识","children":[]},{"level":2,"title":"6、内存管理的概念","slug":"_6、内存管理的概念","link":"#_6、内存管理的概念","children":[]},{"level":2,"title":"7、内存空间的扩充-----覆盖与交换","slug":"_7、内存空间的扩充-覆盖与交换","link":"#_7、内存空间的扩充-覆盖与交换","children":[]},{"level":2,"title":"8、内存空间的分配-----连续分配管理方式","slug":"_8、内存空间的分配-连续分配管理方式","link":"#_8、内存空间的分配-连续分配管理方式","children":[]},{"level":2,"title":"9、动态分区分配算法","slug":"_9、动态分区分配算法","link":"#_9、动态分区分配算法","children":[]},{"level":2,"title":"10、基本分页存储管理的基本概念","slug":"_10、基本分页存储管理的基本概念","link":"#_10、基本分页存储管理的基本概念","children":[]},{"level":2,"title":"11、基地址变换机构","slug":"_11、基地址变换机构","link":"#_11、基地址变换机构","children":[]},{"level":2,"title":"12、两级页表","slug":"_12、两级页表","link":"#_12、两级页表","children":[]},{"level":2,"title":"13、基本分段存储管理方式","slug":"_13、基本分段存储管理方式","link":"#_13、基本分段存储管理方式","children":[]},{"level":2,"title":"14、段页式管理方式","slug":"_14、段页式管理方式","link":"#_14、段页式管理方式","children":[]},{"level":2,"title":"15、虚拟内存的概念","slug":"_15、虚拟内存的概念","link":"#_15、虚拟内存的概念","children":[]},{"level":2,"title":"16、请求分页存储管理","slug":"_16、请求分页存储管理","link":"#_16、请求分页存储管理","children":[]},{"level":2,"title":"17、页面置换算法","slug":"_17、页面置换算法","link":"#_17、页面置换算法","children":[]},{"level":2,"title":"18、页面分配策略","slug":"_18、页面分配策略","link":"#_18、页面分配策略","children":[]}],"git":{"createdTime":1695609231000,"updatedTime":1695610771000,"contributors":[{"name":"Vingkin","email":"1830053226@qq.com","commits":2}]},"readingTime":{"minutes":36.18,"words":10853},"filePathRelative":"OS/OS2.md","localizedDate":"2022年6月28日","excerpt":"<h2> 1、死锁的概念</h2>\\n<ol>\\n<li>\\n<p>什么是死锁</p>\\n<ul>\\n<li>在并发环境下，<strong>各进程因竞争资源而造成的一种互相等待对方手里的资源，导致各进程都阻塞，都无法向前推进的现象</strong></li>\\n<li><strong>发生死锁至少有两个或两个以上的进程同时发生死锁</strong>，发生死锁后，若无外力干涉，这些进程都无法向前推进，发生死锁的进程一定是在阻塞态</li>\\n<li>饥饿的概念：\\n<ul>\\n<li><strong>由于长期得不到想要的资源，某进程无法向前推进的现象</strong>，比如SPF如果有源源不断的短进程到来，则长进程一直无法获得处理机</li>\\n</ul>\\n</li>\\n<li>死循环的概念\\n<ul>\\n<li><strong>某进程在执行的过程中一直跳不出某个循环的现象</strong>，有时是因为程序bug导致的，有时是程序员故意为之</li>\\n</ul>\\n</li>\\n<li>死锁、饥饿、死循环的异同\\n<ul>\\n<li>异如上</li>\\n<li>同：都是进程无法顺利向前推进的现象(故意设计的死循环除外)</li>\\n</ul>\\n</li>\\n</ul>\\n<figure><img src=\\"https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/90.jpg\\" alt=\\"\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption></figcaption></figure>\\n</li>\\n<li>\\n<p>死锁产生的条件</p>\\n<ul>\\n<li>\\n<p>1、<strong>互斥条件</strong>：只有对必须互斥使用的资源的争抢才会导致死锁</p>\\n</li>\\n<li>\\n<p>2、<strong>不剥夺条件</strong>：进程所获得的资源在未使用完之前，不能由其他进程强行夺走，只能主动释放</p>\\n</li>\\n<li>\\n<p>3、<strong>请求和保持条件</strong>：进程已经至少保持了一个资源，但又提出了新的资源请求，而该资源又被其他进程占有，此时请求进程被阻塞，但又对自己已有的资源保持不放</p>\\n</li>\\n<li>\\n<p>4、<strong>循环等待条件</strong>：存在一种进程资源的循环等待链，链中的每一个进程已获得的资源同时被下一个进程所请求</p>\\n</li>\\n<li>\\n<p>注意：发生死锁的时候一定有循环等待，但是发生循环等待的时候未必死锁，因为如果同类资源的数量大于1，当该类资源又进程释放的时候，死锁结束。如果每类资源只有1个，那就是充分必要条件了</p>\\n</li>\\n</ul>\\n</li>\\n<li>\\n<p>什么时候会发生死锁</p>\\n<ul>\\n<li>1、<strong>对系统资源的竞争</strong>。对不可剥夺资源的竞争可能会引起死锁，对可剥夺的资源不会产生</li>\\n<li>2、<strong>进程推进顺序非法</strong>。请求和释放资源的顺序不当，比如，并发执行的进程P1、P2分别申请并占有了资源R1,R2,但是之后P1进程又申请资源R2，P2进程申请资源R1，这样会导致死锁</li>\\n<li>3、<strong>信号量的使用不当</strong>。比如，实现互斥的P操作在实现同步的P操作之前</li>\\n</ul>\\n</li>\\n<li>\\n<p>死锁的处理策略</p>\\n<ul>\\n<li>1、<strong>预防死锁</strong>：破坏死锁产生的四个必要条件中的一个或几个</li>\\n<li>2、<strong>避免死锁</strong>：用某种方法阻止系统进入不安全的状态</li>\\n<li>3、<strong>死锁的检测和解除</strong>：允许死锁的产生，不过操作系统会负责检测出死锁的产生，然后采取某种措施解除死锁</li>\\n</ul>\\n</li>\\n</ol>","copyright":{"author":"keyhx"},"autoDesc":true}');export{l as data};