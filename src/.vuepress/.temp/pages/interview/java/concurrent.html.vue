<template><div><h2 id="start-和run" tabindex="-1"><a class="header-anchor" href="#start-和run" aria-hidden="true">#</a> start()和run()</h2>
<ol>
<li>start()和run()都是Thread类的方法（如果用的是Runnable则执行的是Runnable中的run方法，注意Callable中的是call方法）</li>
<li>start是启动线程作用是将线程变为就绪状态，至于是否调用还是得看CPU的分配。run是一个线程的具体执行内容，线程启动后自动调用。</li>
<li>如果在main线程中调用了t1线程的run方法，就相当于main线程运行了一个普通的run方法，并没能达到多线程的效果</li>
<li>strat只能调用一次，多次调用会抛<code v-pre>IllegalThreadStateException</code>异常</li>
</ol>
<h2 id="sleep-与yield" tabindex="-1"><a class="header-anchor" href="#sleep-与yield" aria-hidden="true">#</a> sleep()与yield()</h2>
<p><strong>sleep</strong></p>
<ul>
<li>调用sleep会让当前线程从<code v-pre>Running</code>进入<code v-pre>Timed Waiting</code>（阻塞状态）状态</li>
<li>其他线程可以使用<code v-pre>interrupt</code>方法打断正在睡眠的线程，这时sleep方法会抛出<code v-pre>InterruptedException</code></li>
<li>睡眠结束后的线程未必会立刻得到执行</li>
</ul>
<p><strong>yield</strong></p>
<ul>
<li>调用yield会让当前线程从<code v-pre>Running</code>进入<code v-pre>Runnalbe</code>（就绪状态）状态，然后调度执行其他同优先级的线程。如果这时没有同优先级的线程，那么不能保证让当前线程暂停的效果</li>
<li>具体的实现依赖于操作系统的任务调度器</li>
</ul>
<p><strong>区别</strong></p>
<p>就绪状态有机会被任务调度器调用，阻塞状态不会。</p>
<p>sleep有休眠时间，yield没有时间参数</p>
<h2 id="interrupt" tabindex="-1"><a class="header-anchor" href="#interrupt" aria-hidden="true">#</a> interrupt()</h2>
<blockquote>
<p>Thread中的方法</p>
</blockquote>
<ul>
<li>如果打断的是阻塞线程(<code v-pre>sleep</code>, <code v-pre>wait</code>, <code v-pre>join</code>)，则打断标记(<code v-pre>isInterrupted()</code>)会在打断后清为False</li>
<li>如果打断的是正常运行的线程，则不会清空打断状态</li>
</ul>
<h2 id="线程优先级" tabindex="-1"><a class="header-anchor" href="#线程优先级" aria-hidden="true">#</a> 线程优先级</h2>
<p>Java中优先级最大10，最小1，默认为5，仅仅是一个提示，调度器甚至可以忽略。</p>
<p>只有在cpu比较忙的时候，优先级较高的线程会获得更多的时间片，cpu空闲时，优先级几乎没什么用。</p>
<h2 id="两阶段终止模式" tabindex="-1"><a class="header-anchor" href="#两阶段终止模式" aria-hidden="true">#</a> 两阶段终止模式</h2>
<p>在线程T1中如何优雅地终止另一个线程T2？这里的优雅指的是给T2一个处理其他事情的机会（如释放锁）</p>
<p>如果调用线程的<code v-pre>stop()</code>方法，如果此时线程锁住了共享资源，那么当它被杀死后就再也没有机会释放锁，其他线程永远无法获取锁。</p>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579bedc4446b.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Monitor</span> monitor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Monitor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        monitor<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        monitor<span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Monitor</span> <span class="token punctuation">{</span>

    <span class="token class-name">Thread</span> monitor<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 启动监控器线程
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//设置线控器线程，用于监控线程状态</span>
        monitor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//开始不停的监控</span>
                <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">//判断当前线程是否被打断了</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isInterrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"处理后续任务"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">//终止线程执行</span>
                        <span class="token keyword">break</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"监控器运行中..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token comment">//线程休眠</span>
                        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">//如果是在休眠的时候被打断，不会将打断标记设置为true，这时要重新设置打断标记</span>
                        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        monitor<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 	用于停止监控器线程
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//打断线程</span>
        monitor<span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="守护线程" tabindex="-1"><a class="header-anchor" href="#守护线程" aria-hidden="true">#</a> 守护线程</h2>
<p>当Java进程中有多个线程执行时，只有当所有非守护线程执行完毕后，Java进程才会结束。但当非守护线程执行完毕后，守护线程无论是否执行完毕，都会一同结束。</p>
<blockquote>
<p>垃圾回收器就是一个守护线程</p>
</blockquote>
<h2 id="线程状态" tabindex="-1"><a class="header-anchor" href="#线程状态" aria-hidden="true">#</a> 线程状态</h2>
<p><strong>五种状态</strong></p>
<blockquote>
<p>操作系统层面</p>
</blockquote>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579bf81d9d26.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>初始状态：仅在语言层面创建了线程对象，还未与操作系统线程关联</li>
<li>可运行状态（就绪状态）：指该线程已经被创建（与操作系统线程相关），可以由CPU调度使用</li>
<li>运行状态：指获取了CPU时间片运行中的状态</li>
<li>阻塞状态：
<ul>
<li>如果调用了阻塞API，如读写文件，这时该线程实际不会用到CPU，会导致线程上下文切换，进入阻塞状态</li>
<li>等读写完毕，会由操作系统唤醒阻塞的线程，转换至可运行状态</li>
<li>与<strong>可运行状态</strong>的区别是，对阻塞状态的线程来说只要他们一直不唤醒，调度器就一直不会考虑调度他们。</li>
</ul>
</li>
<li>终止状态：表示线程执行已经完毕，生命周期已经结束，不会再转换为其他状态</li>
</ul>
<p><strong>六种状态</strong></p>
<blockquote>
<p>Java中Thread.State枚举描述的</p>
<p>下图RUNNABLE中的阻塞状态应该去除</p>
</blockquote>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579bfbfceb26.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>线程的状态转换</strong></p>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579bfde812ad.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>NEW：线程刚被创建，但是还没有调用start()方法</li>
<li>RUNNABLE：当调用了start()方法之后的状态。涵盖了操作系统层面的【可运行状态】、【运行状态】和【阻塞状态】（在Java中无法区分运行状态和可运行状态）</li>
<li>BLOCKED、WAITING、TIMED_WAITING：都是Java API层面对【阻塞状态】的细分</li>
<li>TERMINATED：当前线程运行结束</li>
</ul>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579bff8ba642.png" alt="Java 线程的状态 " tabindex="0" loading="lazy"><figcaption>Java 线程的状态 </figcaption></figure>
<h2 id="变量的线程安全分析" tabindex="-1"><a class="header-anchor" href="#变量的线程安全分析" aria-hidden="true">#</a> 变量的线程安全分析</h2>
<p><strong>成员变量和静态变量的线程安全分析</strong></p>
<ul>
<li>如果变量没有在线程间共享，那么变量是安全的</li>
<li>如果变量在线程中共享
<ul>
<li>如果只有读操作，则线程安全</li>
<li>如果有写操作，则该变量属于临界资源，需要考虑线程安全问题</li>
</ul>
</li>
</ul>
<p><strong>局部变量线程安全分析</strong></p>
<ul>
<li>局部变量被初始化为基本数据类型则是安全的</li>
<li>当局部变量是引用变量时则需要进行逃逸分析判断
<ul>
<li>如果该对象没有逃离方法的作用范围，则线程安全</li>
<li>如果该对象逃离了方法的作用范围，则线程不安全</li>
</ul>
</li>
</ul>
<h2 id="对象头" tabindex="-1"><a class="header-anchor" href="#对象头" aria-hidden="true">#</a> 对象头</h2>
<p>Java对象头详细信息在JVM中有描述，简要来说包含<code v-pre>Mark Word</code>(32bit)和<code v-pre>Klass Word</code>(32bit)。如果是数组的话还会包含数组长度(32bit)。</p>
<p>下图描述的是不同锁状态下Mark Word的形式，其中后几位为001表示无锁，101表示偏向锁，00表示轻量级锁，10表示重量级锁，11表示标记GC</p>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c01b9a5ad.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="monitor原理" tabindex="-1"><a class="header-anchor" href="#monitor原理" aria-hidden="true">#</a> Monitor原理</h2>
<p>Monitor被翻译成<strong>监视器</strong>或<strong>管程</strong></p>
<p>每个Java对象都可以关联一个Monitor对象，如果使用synchronized给对象上锁之后，该对象头的Mark Word中就被设置成指向Monitor对象的指针</p>
<p>Monitor的结构如下：</p>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c04eb0085.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>刚开始Monitor中的Owner为null</li>
<li>当Thread-2执行synchronized(obj)就会将Monitor的所有者Owner置为Thread-2，Monitor中只能有一个Owner</li>
<li>在Thread-2上锁的过程中，如果Thread-3，Thread-4，Thread-5也来执行synchronized(obj)，就会进入EntryList BLOCKED</li>
<li>Thread-2执行完同步代码块的内容，然后唤醒EntryList中等待的线程来竞争锁，竞争的时候是非公平的</li>
<li>途中WaitSet中的Thread-0，Thread-1是之前获得过锁，但条件不满足进入WAITING状态的线程</li>
</ul>
<p>注意：</p>
<ul>
<li>synchronized必须是进入同一个锁对象的monitor才有上述的效果（一个锁对象对应着一个monitor）</li>
<li>不加synchronized的对象不会关联监视器，不遵从上述规则</li>
</ul>
<p><strong>字节码层面分析synchronized</strong></p>
<ul>
<li>monitorenter是进入synchronized语句</li>
<li>monitorexit是退出synchronized语句</li>
<li>6 - 14行是synchronized中执行的部分，如果其中出现了错误也会释放锁，因为异常表中当在6 - 16行出现异常时，会跳到19行执行异常处理部分。</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">static</span> <span class="token keyword">int</span> counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        counter<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin.cn/i/2023/12/13/6579c06cd49bb.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="自旋优化" tabindex="-1"><a class="header-anchor" href="#自旋优化" aria-hidden="true">#</a> 自旋优化</h2>
<blockquote>
<p>优化重量级锁竞争</p>
</blockquote>
<p>当发生<strong>重量级锁竞争</strong>的时候，还可以使用自旋来进行优化（不加入Monitor的阻塞队列EntryList中），如果当前线程自旋成功（即在自旋的时候持锁的线程释放了锁），那么当前线程就可以不用进行上下文切换（持锁线程执行完synchronized同步块后，释放锁，Owner为空，唤醒阻塞队列来竞争，胜出的线程获取cpu执行权的过程）就获得了锁</p>
<p><strong>成功演示：</strong></p>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c09733609.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>失败演示：</strong></p>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c0bb9d9fd.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>自旋会占用CPU时间，单核CPU自选就是浪费，多核CPU自旋才能发挥优势</p>
<h2 id="轻量级锁" tabindex="-1"><a class="header-anchor" href="#轻量级锁" aria-hidden="true">#</a> 轻量级锁</h2>
<blockquote>
<p>用于优化重量级锁</p>
<p><a href="https://blog.csdn.net/m0_37989980/article/details/111408759#t5" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/m0_37989980/article/details/111408759#t5<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="偏向锁" tabindex="-1"><a class="header-anchor" href="#偏向锁" aria-hidden="true">#</a> 偏向锁</h2>
<blockquote>
<p>用于优化轻量级锁重入</p>
<p><a href="https://blog.csdn.net/m0_37989980/article/details/111408759#t8" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/m0_37989980/article/details/111408759#t8<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="wait-和notify" tabindex="-1"><a class="header-anchor" href="#wait-和notify" aria-hidden="true">#</a> wait()和notify()</h2>
<blockquote>
<p>Object类中的方法</p>
<p><a href="https://blog.csdn.net/m0_37989980/article/details/111412907#t0" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/m0_37989980/article/details/111412907#t0<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="sleep-和wait-的区别" tabindex="-1"><a class="header-anchor" href="#sleep-和wait-的区别" aria-hidden="true">#</a> sleep()和wait()的区别</h2>
<ol>
<li>sleep是Thread方法，wait是Object方法</li>
<li>sleep不需要强制和synchronized配合使用，但wait需要和synchronized一起使用</li>
<li><strong>sleep不会释放锁对象，wait会释放锁对象</strong></li>
</ol>
<p>他们的线程状态都是<code v-pre>TIMED_WAITING</code></p>
<h2 id="保护性暂停模式" tabindex="-1"><a class="header-anchor" href="#保护性暂停模式" aria-hidden="true">#</a> 保护性暂停模式</h2>
<blockquote>
<p>用于一个线程等待另一个线程的执行结果</p>
<p>join()内部采用的就是这个原理，不过join()中是一个线程等待另一个线程结束</p>
</blockquote>
<ul>
<li>有一个结果需要从一个线程传递到另一个线程，让他们关联同一个GuardedObject</li>
<li>如果有结果不断从一个线程到另一个线程，那么可以使用消息队列（生产者消费者模式）</li>
<li>JDK中，join和future采用的就是该模式</li>
<li>因为一个线程需要等待另一个线程的执行结果，所以归结于同步模式</li>
</ul>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c12b2e934.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="生产者消费者模式" tabindex="-1"><a class="header-anchor" href="#生产者消费者模式" aria-hidden="true">#</a> 生产者消费者模式</h2>
<ul>
<li>与前面的保护性暂停中的GuardObjct不同，不需要产生结果和消费结果的线程一一对应</li>
<li>消费队列可以用来平衡生产和消费的线程资源</li>
<li>生产者仅负责产生结果数据，不关心数据该如何处理，而消费者专心处理结果数据</li>
<li>消息队列是有容量限制的，满时不会再加入数据，空时不会再消耗数据</li>
<li>JDK中各种阻塞队列，采用的就是这种模式</li>
</ul>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c15f7e868.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="park-和unpark" tabindex="-1"><a class="header-anchor" href="#park-和unpark" aria-hidden="true">#</a> park()和unpark()</h2>
<blockquote>
<p><a href="https://blog.csdn.net/m0_37989980/article/details/111412907#t8" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/m0_37989980/article/details/111412907#t8<ExternalLinkIcon/></a></p>
</blockquote>
<ul>
<li>park和unpark是LockSupport类中的方法，运行时会调用Unsafe类中的native方法</li>
<li>每个线程都会和一个park对象关联起来，由三部分组成<code v-pre>_counter</code>,<code v-pre>_cond</code>,<code v-pre>_mutex_</code>。核心部分是counter，可以理解为一个标记位。</li>
<li>当调用park时会查看counter是否为0，为0则进入cond阻塞。为1则继续运行并将counter置为0。</li>
<li>当调用unpark时，会将counter置为1，若之前的counter值为0，还会唤醒阻塞的线程。</li>
<li><strong>如果先调用unpark再调用park不会阻塞线程。调用unpark后将counter置为1，再调用park线程发现counter为1继续运行并将counter置为0。</strong></li>
</ul>
<p><strong>park()&amp;unpark()与wait()&amp;notify()对比</strong></p>
<ol>
<li>wait，notify和notifyAll必须配合Object Monitor(synchronized)一起使用，而park和unpark不必</li>
<li>park，unpark是以线程为单位来【阻塞】和【唤醒】线程，而notify只能随机唤醒一个等待线程，notifyAll是唤醒所有等待线程，无法唤醒指定的线程。</li>
<li><s>park，unpark可以先unpark，而wait，notify不能先notify</s></li>
</ol>
<h2 id="死锁-活锁-饥饿" tabindex="-1"><a class="header-anchor" href="#死锁-活锁-饥饿" aria-hidden="true">#</a> 死锁，活锁，饥饿</h2>
<h3 id="死锁" tabindex="-1"><a class="header-anchor" href="#死锁" aria-hidden="true">#</a> 死锁</h3>
<p>代码演示：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">final</span> <span class="token class-name">Object</span> <span class="token class-name">A</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">final</span> <span class="token class-name">Object</span> <span class="token class-name">B</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	
	<span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
		<span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">A</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">try</span> <span class="token punctuation">{</span>
				<span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">B</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

	<span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token punctuation">{</span>
		<span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">B</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token keyword">try</span> <span class="token punctuation">{</span>
				<span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">A</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>发生死锁的必要条件：</strong></p>
<ol>
<li>互斥条件：在一段时间内，一种资源只能被一个线程所使用</li>
<li>请求和保持条件：线程已经拥有了至少一种资                                                                                                                                                                                                      源，同时又去申请其他资源。因为其他资源被别的线程所使用。该线程进入阻塞状态同时不释放自己已有的资源。</li>
<li>不可抢占条件：进程对已获得的资源在未使用完成前不能被抢占，之后能在线程使用完后自己释放。</li>
<li>循环等待条件：发生死锁时，必然存在一个线程---资源的循环链</li>
</ol>
<p><strong>定位死锁的方法：</strong></p>
<ol>
<li><code v-pre>jstack + 进程id</code>命令查看线程状态有Java层面死锁线程信息</li>
<li><code v-pre>jconsole</code>有死锁检测功能</li>
</ol>
<p><strong>避免死锁的方法：</strong></p>
<ul>
<li>在线程使用锁对象时, 采用<strong>固定加锁的顺序</strong>, 可以使用Hash值的大小来确定加锁的先后</li>
<li>尽可能缩减加锁的范围, 等到操作共享变量的时候才加锁</li>
<li>使用可释放的定时锁 (一段时间申请不到锁的权限了, 直接释放掉)</li>
</ul>
<h3 id="活锁" tabindex="-1"><a class="header-anchor" href="#活锁" aria-hidden="true">#</a> 活锁</h3>
<ul>
<li><code v-pre>活锁</code>出现在两个线程 <strong><code v-pre>互相改变对方的结束条件</code></strong>，谁也无法结束。</li>
</ul>
<p><strong>避免活锁的方法：</strong></p>
<ul>
<li>在线程执行时，中途给予不同的间隔时间, 让某个线程先结束即可。</li>
</ul>
<p><strong>死锁与活锁的区别：</strong></p>
<ul>
<li>死锁是因为线程互相持有对象想要的锁，并且都不释放，最后到时线程阻塞，停止运行的现象。</li>
<li>活锁是因为线程间修改了对方的结束条件，而导致代码一直在运行，却一直运行不完的现象。</li>
</ul>
<h3 id="饥饿" tabindex="-1"><a class="header-anchor" href="#饥饿" aria-hidden="true">#</a> 饥饿</h3>
<ul>
<li>某些线程因为优先级太低，导致一直无法获得资源的现象。</li>
<li>在使用<code v-pre>顺序加锁</code>时，可能会出现<code v-pre>饥饿现象</code></li>
</ul>
<h2 id="固定线程运行顺序" tabindex="-1"><a class="header-anchor" href="#固定线程运行顺序" aria-hidden="true">#</a> 固定线程运行顺序</h2>
<p><strong>wait()&amp;notify()</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>

    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token keyword">boolean</span> t2runned <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">Thread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>t2runned<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">try</span> <span class="token punctuation">{</span>
                            lock<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                    log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"t1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Thread</span> t2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">synchronized</span><span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    t2runned <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    lock<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"t2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        t1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t2<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>park()&amp;unpark()</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        
        <span class="token class-name">Thread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"t1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Thread</span> t2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">unpark</span><span class="token punctuation">(</span>t1<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"t2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        t1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t2<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>await()&amp;signal()</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> t2runned <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token class-name">Condition</span> condition1 <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">Thread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>t2runned<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">try</span> <span class="token punctuation">{</span>
                            condition1<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                    lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"t1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Thread</span> t2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    t2runned <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    condition1<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                    lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"t2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        t1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t2<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="线程交替输出" tabindex="-1"><a class="header-anchor" href="#线程交替输出" aria-hidden="true">#</a> 线程交替输出</h2>
<p><strong>wait()&amp;notify()</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>

    <span class="token keyword">static</span> <span class="token keyword">boolean</span> t1runned <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token keyword">boolean</span> t2runned <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">Thread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>t2runned<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                                lock<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                        log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        t1runned <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                        t2runned <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                        lock<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"t1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Thread</span> t2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>lock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>t1runned<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                                lock<span class="token punctuation">.</span><span class="token function">wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                        log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        t1runned <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                        t2runned <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                        lock<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"t2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        t1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t2<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>park()&amp;unpark()</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>

    <span class="token keyword">volatile</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> t1runned <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">volatile</span> <span class="token keyword">static</span> <span class="token keyword">boolean</span> t2runned <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token class-name">Thread</span> t1<span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token class-name">Thread</span> t2<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>t2runned<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    t2runned <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    t1runned <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">unpark</span><span class="token punctuation">(</span>t2<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"t1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        t2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span>  <span class="token punctuation">(</span><span class="token operator">!</span>t1runned<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">park</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    t2runned <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                    t1runned <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                    <span class="token class-name">LockSupport</span><span class="token punctuation">.</span><span class="token function">unpark</span><span class="token punctuation">(</span>t1<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"t2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        t1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t2<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>await()&amp;signal()</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>

    <span class="token keyword">static</span> <span class="token keyword">boolean</span> t1runned <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token keyword">boolean</span> t2runned <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token class-name">ReentrantLock</span> reentrantLock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Condition</span> condition <span class="token operator">=</span> reentrantLock<span class="token punctuation">.</span><span class="token function">newCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Thread</span> t1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    reentrantLock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>t2runned<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            condition<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        t1runned <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                        t2runned <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                        condition<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                        reentrantLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"t1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Thread</span> t2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    reentrantLock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>t1runned<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            condition<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        t1runned <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
                        t2runned <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
                        condition<span class="token punctuation">.</span><span class="token function">signal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                        reentrantLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"t2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        t1<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        t2<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="并发编程的三大特性" tabindex="-1"><a class="header-anchor" href="#并发编程的三大特性" aria-hidden="true">#</a> 并发编程的三大特性</h2>
<ul>
<li><strong>原子性</strong>：保证指令不会受到线程上下文切换的影响。<strong>程序的原子性是指整个程序中的所有操作，要么全部完成，要么全部失败，不可能滞留在中间某个环节；在多个线程一起执行的时候，一个操作一旦开始，就不会被其他线程所打断。</strong></li>
<li><strong>可见性</strong>：保证指令不会受cpu缓存的影响。<strong>一个线程对共享变量值的修改，能够及时地被其他线程看到</strong></li>
<li><strong>有序性</strong>：保证指令不会受到cpu指令并行优化的影响</li>
</ul>
<h2 id="volatile原理" tabindex="-1"><a class="header-anchor" href="#volatile原理" aria-hidden="true">#</a> volatile原理</h2>
<p><code v-pre>volatile</code>的底层实现原理是内存屏障</p>
<ol>
<li>保证可见性
<ul>
<li>对<code v-pre>volatile</code>变量的写指令后会加入写屏障。写屏障保证该屏障之前的，对共享变量的改动都会同步到主存中。</li>
<li>对<code v-pre>volatile</code>变量之间会加入读屏障。读屏障保证在该屏障之后，对共享变量的读取，加载的是主存中最新数据。</li>
</ul>
</li>
<li>保证有序性（禁止指令重排）
<ul>
<li>写屏障会确保指令重排序时，不会将写屏障之前的代码排在写屏障之后</li>
<li>读屏障会确保指令重排序时，不会将读屏障之后的代码排在读屏障之前</li>
</ul>
</li>
</ol>
<h2 id="volatile和synchronized" tabindex="-1"><a class="header-anchor" href="#volatile和synchronized" aria-hidden="true">#</a> volatile和synchronized</h2>
<ul>
<li>一个线程对<code v-pre>volatile</code>变量的修改对另一个线程可见，不能保证原子性，仅用在一个写线程，多个读线程的情况。（比如<code v-pre>volatile</code>修饰的i，两个线程一个i++一个i--，只能保证看到最新值，不能解决指令交错的问题。）</li>
<li><code v-pre>synchronized</code>语句块既能保证代码块的原子性，也同时能保证代码块内变量的可见性。但缺点是<code v-pre>synchronized</code>属于重量级锁，性能相对较低。</li>
<li><code v-pre>volatile</code>关键字只能修饰变量，<code v-pre>synchronized</code>还可以修饰方法，类以及代码块。</li>
<li><code v-pre>volatile</code>关键字主要用于解决变量在多个线程之间的可见性，而<code v-pre>synchronized</code>关键字解决的是多个线程之间访问资源的同步性。</li>
</ul>
<h2 id="volatile和synchronized在有序性上的不同" tabindex="-1"><a class="header-anchor" href="#volatile和synchronized在有序性上的不同" aria-hidden="true">#</a> volatile和synchronized在有序性上的不同</h2>
<ul>
<li><code v-pre>synchronized</code>的有序性是持有相同锁的两个同步块只能串行的进入，即被加锁的内容要按照顺序被多个线程执行，但是其内部的同步代码还是会发生重排序。</li>
<li><code v-pre>volatile</code>的有序性是通过插入内存屏障来保证指令按照顺序执行。不会存在后面的指令跑到前面的指令之前来执行。是保证编译器优化的时候不会让指令乱序。</li>
<li><strong><code v-pre>synchronized</code>代码块内部是不能保证指令重排的。</strong></li>
</ul>
<h2 id="i-是否线程安全" tabindex="-1"><a class="header-anchor" href="#i-是否线程安全" aria-hidden="true">#</a> i++是否线程安全</h2>
<blockquote>
<p>提到这个问题得区分i是成员变量/静态变量还是局部变量，如果是前者需要考虑，对于局部变量不管是基本类型还是包装类型都不需要考虑，包装类型比如Integer是不可变类，是线程安全的。</p>
<p>假设有1000个线程对i执行++操作，理论上ide结果应该是1000，实际并不是</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// i++ 的字节码指令，此时i是一个静态变量</span>
getstatic    i <span class="token comment">// 获取静态变量i的值</span>
iconst_1	   <span class="token comment">// 准备常量1</span>
iadd		   <span class="token comment">// 自增</span>
putstatic    i <span class="token comment">// 将修改后的值存入静态变量i</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个线程都有自己的工作内存，每个线程需要用共享变量时必须先把共享变量从主存load到自己的工作内存，等完成对共享变量的操作时再save到主内存。</p>
<p>问题就出在一个线程读取主存的值后运算完还未刷回主存就被其他线程从主存中读取到了，这时候其他线程读取的数据就是脏数据了。</p>
<p>这也是经典的内存不可见问题，把count加上volatile也不能解决这个问题。因为volatile只能保证可见性并不能保证原子性。多个线程同时读取这个共享变量的值，就算保证其他线程的可见性，也不能保证线程之间读取到同样的值然后互相覆盖对方值的情况。</p>
<p><strong>解决方案</strong></p>
<ol>
<li>对i++操作的方法加同步锁，同时只能由一个线程执行i++</li>
<li>使用支持原子类型操作的类，比如AtomicInteger，内部使用的是CAS</li>
</ol>
<h2 id="cas的特点" tabindex="-1"><a class="header-anchor" href="#cas的特点" aria-hidden="true">#</a> CAS的特点</h2>
<p>结合CAS和volatile可以实现无锁并发，适用于线程数少、多核CPU的场景下。</p>
<ul>
<li>
<p>CAS是基于乐观锁的思想~~（实际上并不是锁）~~：最乐观的估计，不怕别的线程来修复共享变量，就算改了也没关系，重试即可</p>
</li>
<li>
<p>synchronized是基于悲观锁的思想：最悲观的估计，得防着其他线程来修改共享变量，我上了锁你们都别想改，我改完了解开锁，你们才有机会</p>
</li>
<li>
<p>CAS体现的是无锁并发，无阻塞并发</p>
<ul>
<li>因为没有使用synchronized，所以线程不会陷入阻塞，这是效率提升的因素之一</li>
<li>但是如果竞争激烈，可以想到重试必然频繁发生，反而效率会受影响</li>
</ul>
</li>
</ul>
<h2 id="atomic原子类" tabindex="-1"><a class="header-anchor" href="#atomic原子类" aria-hidden="true">#</a> Atomic原子类</h2>
<blockquote>
<p><a href="https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&amp;mid=2247484834&amp;idx=1&amp;sn=7d3835091af8125c13fc6db765f4c5bd&amp;source=41#wechat_redirect" target="_blank" rel="noopener noreferrer">并发编程面试必备：JUC 中的 Atomic 原子类总结 (qq.com)<ExternalLinkIcon/></a></p>
</blockquote>
<ol>
<li>
<p>原子整数</p>
<ol>
<li>AtomicInteger</li>
<li>AtomicLong</li>
<li>AtomicBoolean</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">AtomicInteger</span> i <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 获取并自增（i = 0, 结果 i = 1, 返回 0），类似于 i++</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">getAndIncrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 自增并获取（i = 1, 结果 i = 2, 返回 2），类似于 ++i</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 自减并获取（i = 2, 结果 i = 1, 返回 1），类似于 --i</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">decrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 获取并自减（i = 1, 结果 i = 0, 返回 1），类似于 i--</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">getAndDecrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 获取并加值（i = 0, 结果 i = 5, 返回 0）</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">getAndAdd</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 加值并获取（i = 5, 结果 i = 0, 返回 0）</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">addAndGet</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 获取并更新（i = 0, p 为 i 的当前值, 结果 i = -2, 返回 0）</span>
    <span class="token comment">// 函数式编程接口，其中函数中的操作能保证原子，但函数需要无副作用</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">getAndUpdate</span><span class="token punctuation">(</span>p <span class="token operator">-></span> p <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 更新并获取（i = -2, p 为 i 的当前值, 结果 i = 0, 返回 0）</span>
    <span class="token comment">// 函数式编程接口，其中函数中的操作能保证原子，但函数需要无副作用</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">updateAndGet</span><span class="token punctuation">(</span>p <span class="token operator">-></span> p <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 获取并计算（i = 0, p 为 i 的当前值, x 为参数1, 结果 i = 10, 返回 0）</span>
    <span class="token comment">// 函数式编程接口，其中函数中的操作能保证原子，但函数需要无副作用</span>
    <span class="token comment">// getAndUpdate 如果在 lambda 中引用了外部的局部变量，要保证该局部变量是 final 的</span>
    <span class="token comment">// getAndAccumulate 可以通过 参数1 来引用外部的局部变量，但因为其不在 lambda 中因此不必是 final</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">getAndAccumulate</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>p<span class="token punctuation">,</span> x<span class="token punctuation">)</span> <span class="token operator">-></span> p <span class="token operator">+</span> x<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 计算并获取（i = 10, p 为 i 的当前值, x 为参数1值, 结果 i = 0, 返回 0）</span>
    <span class="token comment">// 函数式编程接口，其中函数中的操作能保证原子，但函数需要无副作用</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">.</span><span class="token function">accumulateAndGet</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>p<span class="token punctuation">,</span> x<span class="token punctuation">)</span> <span class="token operator">-></span> p <span class="token operator">+</span> x<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>原子引用</p>
<blockquote>
<p>原子引用的作用: <strong>保证引用类型的共享变量是线程安全的(确保这个原子引用没有引用过别人)</strong></p>
</blockquote>
<ol>
<li>AtomicReference</li>
<li>AtomicStampedReference</li>
<li>AtomicMarkableReference</li>
</ol>
</li>
<li>
<p>原子数组</p>
<blockquote>
<p>保证数组内元素的线程安全</p>
</blockquote>
<ol>
<li>AtomicIntegerArray</li>
<li>AtomicLongArray</li>
<li>AtomicReferenceArray</li>
</ol>
</li>
<li>
<p>字段更新器</p>
<blockquote>
<p>保证<code v-pre>多线程</code>访问<code v-pre>同一个对象的成员变量</code>时, <code v-pre>成员变量的线程安全性</code>。</p>
</blockquote>
<ol>
<li>AtomicIntegerFieldUpdater</li>
<li>AtomicLongFieldUpdater</li>
<li>AtomicReferenceFieldUpdater</li>
</ol>
</li>
<li>
<p>原子累加器</p>
<ol>
<li>LongAdder</li>
<li>LongAccumulator</li>
<li>DoubleAdder</li>
<li>DoubleAccumulator</li>
</ol>
</li>
</ol>
<h2 id="原子引用aba问题" tabindex="-1"><a class="header-anchor" href="#原子引用aba问题" aria-hidden="true">#</a> 原子引用ABA问题</h2>
<blockquote>
<p>采用CAS主线程仅能判断出共享变量的值与初值A是否相同，不能感知到这种从A改为B又改回A的情况，如果主线程希望：</p>
<p>只要有其他线程【动过了】共享变量，那么自己的cas就算失败，这时仅比较值是不够的，还需要再加一个版本号</p>
</blockquote>
<ol>
<li>通过AtomicStampedReference判断是否更改了版本号，传入的是整型变量</li>
<li>通过AtomicMarkableReference判断是否被修改，传入的是布尔变量</li>
</ol>
<h2 id="longadder原理" tabindex="-1"><a class="header-anchor" href="#longadder原理" aria-hidden="true">#</a> LongAdder原理</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 累加单元数组，懒惰初始化</span>
<span class="token keyword">transient</span> <span class="token keyword">volatile</span> <span class="token class-name">Cell</span><span class="token punctuation">[</span><span class="token punctuation">]</span> cells<span class="token punctuation">;</span>
<span class="token comment">// 基础值，如果没有竞争，则用cas累加这个域</span>
<span class="token keyword">transient</span> <span class="token keyword">volatile</span> <span class="token keyword">long</span> base<span class="token punctuation">;</span>
<span class="token comment">// 在cells创建或扩容时，置为1，表示加锁</span>
<span class="token keyword">transient</span> <span class="token keyword">volatile</span> <span class="token keyword">int</span> cellsBusy<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>性能提升的原因很简单，就是在有竞争时，设置多个<code v-pre>累加单元</code>(但不会超过cpu的核心数)，Therad-0 累加 Cell[0]，而 Thread-1 累加Cell[1]… 最后将结果汇总。这样它们在累加时操作的不同的 Cell 变量，<code v-pre>因此减少了 CAS 重试失败</code>，从而提高性能。</strong></p>
<p><strong>之前AtomicLong等都是在一个<code v-pre>共享资源变量</code>上进行竞争, <code v-pre>while(true)</code>循环进行CAS重试, 性能没有<code v-pre>LongAdder</code>高</strong></p>
<h2 id="unsafe" tabindex="-1"><a class="header-anchor" href="#unsafe" aria-hidden="true">#</a> Unsafe</h2>
<blockquote>
<p>Unsafe并不是表示线程不安全，而是表示Unsafe类中的操作不安全，因为是对于底层的操作。</p>
<p>Unsafe对象提供了非常底层的，操作系内存、线程的方法，Unsafe对象不能直接调用，只能通过反射获得</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Field</span> theUnsafe <span class="token operator">=</span> <span class="token class-name">Unsafe</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getDeclaredField</span><span class="token punctuation">(</span><span class="token string">"theUnsafe"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
theUnsafe<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Unsafe</span> unsafe <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Unsafe</span><span class="token punctuation">)</span> theUnsafe<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>unsafe<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="不可变类" tabindex="-1"><a class="header-anchor" href="#不可变类" aria-hidden="true">#</a> 不可变类</h2>
<p><strong>final的使用</strong></p>
<ul>
<li>属性用final修饰保证该属性是只读的，不能修改</li>
<li>类用final修饰保证了类不能被继承，该类中的方法不能被重写，防止子类无意间破坏不变性</li>
</ul>
<p><strong>保护性拷贝</strong></p>
<p>使用字符串时，也有一些跟修改相关的方法啊，比如<code v-pre>substring、replace</code> 等，那么下面就看一看这些方法是 如何实现的，就以 substring 为例：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">substring</span><span class="token punctuation">(</span><span class="token keyword">int</span> beginIndex<span class="token punctuation">,</span> <span class="token keyword">int</span> endIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>beginIndex <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">StringIndexOutOfBoundsException</span><span class="token punctuation">(</span>beginIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>endIndex <span class="token operator">></span> value<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">StringIndexOutOfBoundsException</span><span class="token punctuation">(</span>endIndex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">int</span> subLen <span class="token operator">=</span> endIndex <span class="token operator">-</span> beginIndex<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>subLen <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">StringIndexOutOfBoundsException</span><span class="token punctuation">(</span>subLen<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 上面是一些校验，下面才是真正的创建新的String对象</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>beginIndex <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>endIndex <span class="token operator">==</span> value<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">this</span>
            <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> beginIndex<span class="token punctuation">,</span> subLen<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发现其方法最后是调用String 的构造方法创建了一个新字符串，再进入这个构造看看，是否对 <code v-pre>final char[] value</code> 做出了修改：结果发现也没有，构造新字符串对象时，会生成新的 <code v-pre>char[] value</code>，对内容进行复制。<br>
这种通过创建副本对象来避免共享的手段称之为【保护性拷贝（defensive copy）】</p>
<h2 id="final原理" tabindex="-1"><a class="header-anchor" href="#final原理" aria-hidden="true">#</a> final原理</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestFinal</span> <span class="token punctuation">{</span>
	<span class="token keyword">final</span> <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">0</span><span class="token operator">:</span> aload_0
<span class="token number">1</span><span class="token operator">:</span> invokespecial #<span class="token number">1</span> <span class="token comment">// Method java/lang/Object."&lt;init>":()V</span>
<span class="token number">4</span><span class="token operator">:</span> aload_0
<span class="token number">5</span><span class="token operator">:</span> bipush <span class="token number">20</span>
<span class="token number">7</span><span class="token operator">:</span> putfield #<span class="token number">2</span> <span class="token comment">// Field a:I</span>
 <span class="token operator">&lt;</span><span class="token operator">--</span> 写屏障
<span class="token number">10</span><span class="token operator">:</span> retu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发现 final 变量的赋值也会通过 <strong>putfield</strong> 指令来完成，同样在这条指令之后也会加入<code v-pre>写屏障</code>，<strong>保证在其它线程读到它的值时不会出现为 0 的情况。</strong></p>
<ul>
<li>写屏障保证该屏障之前的，对共享变量的改动都会同步到主存中。</li>
<li>写屏障会确保指令重排序时，不会将写屏障之前的代码排在写屏障之后</li>
</ul>
<h2 id="享元模式" tabindex="-1"><a class="header-anchor" href="#享元模式" aria-hidden="true">#</a> 享元模式</h2>
<p>享元模式简单理解就是重用数量有限的同一对象，比如字符串常量池，包装类常量池，线程池以及字符串连接池都运用了享元模式的思想。</p>
<h2 id="线程池" tabindex="-1"><a class="header-anchor" href="#线程池" aria-hidden="true">#</a> 线程池</h2>
<h3 id="线程池的好处" tabindex="-1"><a class="header-anchor" href="#线程池的好处" aria-hidden="true">#</a> 线程池的好处</h3>
<ol>
<li>降低资源消耗。通过重复利用已创建的线程来降低线程创建和销毁所带来的消耗。</li>
<li>提高响应速度。当任务到达时，如果有空闲线程，任务可以不需要等到线程创建就直接运行。</li>
<li>提高线程的可管理性。线程是稀缺资源，如果无限制的创建，不仅会消耗系统资源，还会降低系统的稳定性，使用线程池可以进行统一的分配，调优和监控。</li>
</ol>
<h3 id="线程池状态" tabindex="-1"><a class="header-anchor" href="#线程池状态" aria-hidden="true">#</a> 线程池状态</h3>
<ul>
<li>ThreadPoolExecutor 使用 int 的高 3 位来表示线程池状态，低 29 位表示线程数量。使用一个AtomicInteger来表示状态和数量，<strong>可以通过一次CAS同时更改两个属性的值</strong>。</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">状态名称</th>
<th style="text-align:center">高3位的值</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">RUNNING</td>
<td style="text-align:center">111</td>
<td style="text-align:center">接收新任务，同时处理任务队列中的任务</td>
</tr>
<tr>
<td style="text-align:center">SHUTDOWN</td>
<td style="text-align:center">000</td>
<td style="text-align:center">不接受新任务，但是处理任务队列中的任务</td>
</tr>
<tr>
<td style="text-align:center">STOP</td>
<td style="text-align:center">001</td>
<td style="text-align:center">中断正在执行的任务，同时抛弃阻塞队列中的任务</td>
</tr>
<tr>
<td style="text-align:center">TIDYING</td>
<td style="text-align:center">010</td>
<td style="text-align:center">任务执行完毕，活动线程为0时，即将进入TERMINATED状态</td>
</tr>
<tr>
<td style="text-align:center">TERMINATED</td>
<td style="text-align:center">011</td>
<td style="text-align:center">终结状态</td>
</tr>
</tbody>
</table>
<h3 id="threadpoolexecutor参数" tabindex="-1"><a class="header-anchor" href="#threadpoolexecutor参数" aria-hidden="true">#</a> ThreadPoolExecutor参数</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token keyword">int</span> corePoolSize<span class="token punctuation">,</span>
                          <span class="token keyword">int</span> maximumPoolSize<span class="token punctuation">,</span>
                          <span class="token keyword">long</span> keepAliveTime<span class="token punctuation">,</span>
                          <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">,</span>
                          <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span> workQueue<span class="token punctuation">,</span>
                          <span class="token class-name">ThreadFactory</span> threadFactory<span class="token punctuation">,</span>
                          <span class="token class-name">RejectedExecutionHandler</span> handler<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>corePoolSize：核心线程数</li>
<li>maximumPoolSize：最大线程数
<ul>
<li>maximumPoolSize - corePoolSize = 救急线程数</li>
<li><strong>救急线程在没有空闲核心线程和任务队列满了的情况下才会创建使用</strong></li>
</ul>
</li>
<li>keepAliveTime：救急线程空闲时的最大空闲时间</li>
<li>unit：时间单位，针对救急线程</li>
<li>workQueue：阻塞队列
<ul>
<li>有界阻塞队列：ArrayBlockingQueue</li>
<li>无界阻塞队列：LinkedBlockingQueue</li>
<li>最多只有一个任务的阻塞队列：SynchronizedQueue</li>
<li>优先队列：PriorityBlockingQueue</li>
</ul>
</li>
<li>ThreadFactory：线程工厂（给线程取名字）</li>
<li>handler：拒绝策略（当活动线程数==最大线程数且阻塞队列满的情况下采取的策略）</li>
</ul>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c17f88f56.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="拒绝策略" tabindex="-1"><a class="header-anchor" href="#拒绝策略" aria-hidden="true">#</a> 拒绝策略</h3>
<blockquote>
<p>当活动线程数等于最大线程数且阻塞队列满的情况下采取的策略</p>
</blockquote>
<p>JDK提供了四种实现</p>
<ol>
<li><strong>AbortPolicy终止策略</strong>：丢弃该任务并抛出RejectedExecutionException异常。<strong>这是默认策略</strong></li>
<li><strong>DiscardPolicy丢弃策略</strong>：丢弃任务，但是不抛出异常。如果任务队列已满，则后续提交的任务都会被丢弃，且是静默丢弃。</li>
<li><strong>DiscardOldestPolicy弃老策略</strong>：丢弃队列最前面的任务，然后重新提交被拒绝的任务</li>
<li><strong>CallerRunsPolicy调用者运行策略</strong>：由调用者线程自行处理该任务</li>
</ol>
<h3 id="executors创建的线程池" tabindex="-1"><a class="header-anchor" href="#executors创建的线程池" aria-hidden="true">#</a> Executors创建的线程池</h3>
<blockquote>
<p>由<code v-pre>Executors类</code>提供的工厂方法来创建线程池！<code v-pre>Executors</code> 是Executor 框架的工具类</p>
<p>一般不适用，而是直接使用ThreadPoolExecutor构造方法</p>
</blockquote>
<p><code v-pre>newFixedThreadPool</code></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExecutorService</span> <span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token keyword">int</span> nThreads<span class="token punctuation">,</span> <span class="token class-name">ThreadFactory</span> threadFactory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span>nThreads<span class="token punctuation">,</span> nThreads<span class="token punctuation">,</span>
                                  <span class="token number">0L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">,</span>
                                  <span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                                  threadFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>特点</strong></p>
<ol>
<li>核心线程数 == 最大线程数（没有救急线程被创建），因此也无需超时时间</li>
<li><code v-pre>阻塞队列是无界的，可以放任意数量的任务</code></li>
<li><strong>适用于任务量已知，相对耗时的任务</strong></li>
</ol>
<p><code v-pre>newCachedThreadPool</code></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExecutorService</span> <span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">,</span>
                                  <span class="token number">60L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">,</span>
                                  <span class="token keyword">new</span> <span class="token class-name">SynchronousQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>特点</p>
<ul>
<li>没有核心线程，最大线程数为Integer.MAX_VALUE，所有创建的线程都是救急线程 (可以无限创建)，空闲时生存时间为60秒</li>
<li>阻塞队列使用的是SynchronousQueue
<ul>
<li>SynchronousQueue是一种特殊的队列
<ul>
<li>没有容量，没有线程来取是放不进去的</li>
<li>只有当线程取任务时，才会将任务放入该阻塞队列中</li>
</ul>
</li>
</ul>
</li>
<li>整个线程池表现为线程数会根据任务量不断增长，没有上限，当任务执行完毕，空闲 1分钟后释放线程。 适合任务数比较密集，但每个任务执行时间较短的情况</li>
</ul>
<p><code v-pre>newSingleThreadExecutor</code></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ExecutorService</span> <span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">FinalizableDelegatedExecutorService</span>
        <span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ThreadPoolExecutor</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span>
                                <span class="token number">0L</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">,</span>
                                <span class="token keyword">new</span> <span class="token class-name">LinkedBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Runnable</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用场景：</p>
<ol>
<li>希望多个任务排队执行。线程数固定为 1，任务数多于 1 时，会放入无界队列排队。 任务执行完毕，这唯一的线程也不会被释放。</li>
<li>区别：
<ol>
<li>和自己创建单线程执行任务的区别：自己创建一个单线程串行执行任务，如果任务执行失败而终止那么没有任何补救措施，而<code v-pre>newSingleThreadExecutor</code>线程池还会新建一个线程，保证池的正常工作</li>
<li><code v-pre>Executors.newSingleThreadExecutor()</code> 线程个数始终为1，不能修改
<ol>
<li>FinalizableDelegatedExecutorService 应用的是装饰器模式，只对外暴露了 <code v-pre>ExecutorService </code>接口，因此不能调用 <code v-pre>ThreadPoolExecutor </code>中特有的方法</li>
</ol>
</li>
</ol>
</li>
<li>和<code v-pre>Executors.newFixedThreadPool(1)</code> 初始时为1时的区别：<code v-pre>Executors.newFixedThreadPool(1)</code> 初始时为1，以后还可以修改，对外暴露的是 ThreadPoolExecutor 对象，可以强转后调用 setCorePoolSize 等方法进行修改</li>
</ol>
<h3 id="执行-execute-方法和-submit-方法的区别是什么呢" tabindex="-1"><a class="header-anchor" href="#执行-execute-方法和-submit-方法的区别是什么呢" aria-hidden="true">#</a> 执行 execute()方法和 submit()方法的区别是什么呢？</h3>
<blockquote>
<p>就像runnable()和callable()的区别，submit()有返回值返回一个Future的对象。</p>
</blockquote>
<h3 id="线程池创建多少线程合适" tabindex="-1"><a class="header-anchor" href="#线程池创建多少线程合适" aria-hidden="true">#</a> 线程池创建多少线程合适</h3>
<blockquote>
<p>下面两点只是纯理论说法，具体个数要是需要测试得到</p>
</blockquote>
<ol>
<li>
<p>CPU密集型</p>
<p>通常采用 <strong><code v-pre>cpu 核数 + 1</code></strong> 能够实现最优的 CPU 利用率，+1 是保证当线程由于页缺失故障（操作系统）或其它原因导致暂停时，额外的这个线程就能顶上去，保证 CPU 时钟周期不被浪费</p>
</li>
<li>
<p>IO密集型</p>
<p>CPU 不总是处于繁忙状态，例如，当你执行业务计算时，这时候会使用 CPU 资源，但当你执行 I/O 操作时、远程RPC 调用时，包括进行数据库操作时，这时候 CPU 就闲下来了，你可以利用多线程提高它的利用率。通过CPU的利用率计算得到。</p>
</li>
</ol>
<h2 id="threadlocal" tabindex="-1"><a class="header-anchor" href="#threadlocal" aria-hidden="true">#</a> ThreadLocal</h2>
<ol>
<li>ThreadLocal是Java所提供的线程本地存储机制，可以利用该机制将数据<strong>缓存在某个线程内部</strong>，该线程可以在任何时刻，任意方法中获取缓存的数据</li>
<li>ThreadLocal底层是通过ThreadLocalMap来实现的，每个Thread对象（注意不是ThreadLocal对象）中都存在一个ThreadLocalMap，Map的key为ThreadLocal对象，Map的value为需要缓存的值</li>
<li>如果在线程池中使用ThreadLocal会造成内存泄漏，因为当ThreadLocal对象使用完之后，应该要把设置的key，value也就是Entry对象进行回收，但线程池中的线程不会回收，而线程对象是通过强引用指向ThreadLocalMap，ThreadLocalMap也是通过强引用指向Entry对象，线程不被回收，Entry对象就不会被回收，从而出现内存泄漏，解决办法是，当使用了ThreadLocal对象之后，手动调用ThreadLocal的remove方法，手动清除Entry对象。</li>
</ol>
<h2 id="copyonwritearraylist" tabindex="-1"><a class="header-anchor" href="#copyonwritearraylist" aria-hidden="true">#</a> CopyOnWriteArrayList</h2>
<p>CopyOnWriteArrayList是java.util.concurrent包提供的方法，它实现了读操作无锁，写操作则通过操作操作底层数组的新副本来实现（将之前的ArrayList拷贝一份，写操作在该副本上进行，在完成写之前，需要对写加锁，写操作完成后，将有来的引用指向新副本），是一种读写分离的并发策略。</p>
<p>CopyOnWrite并发容器适用于对于绝大部分访问都是读，且只是偶尔写的并发场景。</p>
<p><strong>get弱一致性</strong></p>
<h2 id="concurrenthashmap" tabindex="-1"><a class="header-anchor" href="#concurrenthashmap" aria-hidden="true">#</a> ConcurrentHashMap</h2>
<blockquote>
<p>一下都是基于JDK 8</p>
</blockquote>
<p>对于JDK 1.7而言，ConcurrentHashMap和HashMap都是基于数组和链表实现的。不同在于ConcurrentHashMap有大数组和小数组，大数组就是Segment数组，小数组是HashEntry数组。Segment继承了ReentranceLock，因此具有可重入锁的特性，这样的话就可以保证多线程同时访问的线程安全问题。ConcurrentHashMap的线程安全是基于Segment加锁的基础上。</p>
<p>对于JDK 1.8而言，CoucurrentHashMap和HashMap的实现方式都是一样的，都是基于Node数组+链表+红黑树。当链表长度大于8并且Node数组长度大于64的时候，链表就会转换为红黑树。它的线程安全是由CAS+volatile和synchronized来实现的。比如在put操作中，如果链表头节点为空，则通过CAS创建链表头节点，如果链表头节点不为空则通过synchronized来加锁遍历链表。这样加锁的好处是对于链表头节点加锁，相比于对Segment加锁，锁的粒度更小，并发性能大大提升。</p>
<p><strong>重要属性和内部类</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 默认为0</span>
<span class="token comment">// 当初始化时，为-1</span>
<span class="token comment">// 当扩容是，为-(1 + 扩容线程数)</span>
<span class="token comment">// 当初始化或扩容完成后，为下一次扩容的阈值大小</span>
<span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token keyword">volatile</span> in sizeCtl<span class="token punctuation">;</span>

<span class="token comment">// 整个ConcurrentHashMap就是一个Node[]</span>
<span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">Map<span class="token punctuation">.</span>Entry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// hash表</span>
<span class="token keyword">transient</span> <span class="token keyword">volatile</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> table<span class="token punctuation">;</span>

<span class="token comment">// 扩容时 新的 hash表</span>
<span class="token keyword">private</span> <span class="token keyword">transient</span> <span class="token keyword">volatile</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> nextTable<span class="token punctuation">;</span>

<span class="token comment">// 扩容时如果某个bin迁移完毕，用FordwardingNode作为旧table bin的头节点</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">ForwardingNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 用在compute以及computeIfAbsent时，用来占位，计算完成后替换为普通Node</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">ReservationNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 作为treebin（红黑树）的头节点，存储root和first</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">TreeBin</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 作为treebin的节点，存储parent，left，right</span>
<span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">TreeNode</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>ForwardingNode</code>的理解</p>
<p>ForwardingNode出现在扩容时，下图是旧的hash表，从右向左迁移bin，该节点迁移完成后加入ForwardingNode作为当前节点的头节点。如果在扩容过程中其他线程来get，get到了ForwardingNode，那么这个线程就回到新的链表中get。如果扩容过程中，其他线程来put，put到了ForwardingNode，此时会帮忙扩容。</p>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c19979ae9.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</blockquote>
<p><strong>构造器分析</strong></p>
<p>实现了懒惰初始化，在构造方法中仅仅计算了table的大小，以后在第一次使用时才会真正创建。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">ConcurrentHashMap</span><span class="token punctuation">(</span><span class="token keyword">int</span> initialCapacity<span class="token punctuation">,</span> <span class="token keyword">float</span> loadFactor<span class="token punctuation">,</span> <span class="token keyword">int</span> concurrencyLevel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>loadFactor <span class="token operator">></span> <span class="token number">0.0f</span><span class="token punctuation">)</span> <span class="token operator">||</span> initialCapacity <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> concurrencyLevel <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">&lt;</span> concurrencyLevel<span class="token punctuation">)</span>   <span class="token comment">// Use at least as many bins</span>
        initialCapacity <span class="token operator">=</span> concurrencyLevel<span class="token punctuation">;</span>   <span class="token comment">// as estimated threads</span>
    <span class="token keyword">long</span> size <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">1.0</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span>initialCapacity <span class="token operator">/</span> loadFactor<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// tableSizeFor是为了保证计算的大小是2^n</span>
    <span class="token keyword">int</span> cap <span class="token operator">=</span> <span class="token punctuation">(</span>size <span class="token operator">>=</span> <span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span><span class="token constant">MAXIMUM_CAPACITY</span><span class="token punctuation">)</span> <span class="token operator">?</span>
        <span class="token constant">MAXIMUM_CAPACITY</span> <span class="token operator">:</span> <span class="token function">tableSizeFor</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>size<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sizeCtl <span class="token operator">=</span> cap<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>get流程</strong></p>
<blockquote>
<p>全程没有加锁</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">V</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">Object</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab<span class="token punctuation">;</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> e<span class="token punctuation">,</span> p<span class="token punctuation">;</span> <span class="token keyword">int</span> n<span class="token punctuation">,</span> eh<span class="token punctuation">;</span> <span class="token class-name">K</span> ek<span class="token punctuation">;</span>
    <span class="token comment">// spread方法能保证返回结果是正数</span>
    <span class="token keyword">int</span> h <span class="token operator">=</span> <span class="token function">spread</span><span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>tab <span class="token operator">=</span> table<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>n <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span>
        <span class="token punctuation">(</span>e <span class="token operator">=</span> <span class="token function">tabAt</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> <span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> h<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果头节点已经是要查找的key</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>eh <span class="token operator">=</span> e<span class="token punctuation">.</span>hash<span class="token punctuation">)</span> <span class="token operator">==</span> h<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>ek <span class="token operator">=</span> e<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token operator">==</span> key <span class="token operator">||</span> <span class="token punctuation">(</span>ek <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>ek<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> e<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// hash为负数表示该bin在扩容中或是treebin，这时调用find方法来查找</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>eh <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span>p <span class="token operator">=</span> e<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>h<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> p<span class="token punctuation">.</span>val <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token comment">// 正常遍历链表，用equals来比较</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>e <span class="token operator">=</span> e<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>hash <span class="token operator">==</span> h <span class="token operator">&amp;&amp;</span>
                <span class="token punctuation">(</span><span class="token punctuation">(</span>ek <span class="token operator">=</span> e<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token operator">==</span> key <span class="token operator">||</span> <span class="token punctuation">(</span>ek <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>ek<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">return</span> e<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>put流程</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">V</span> <span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">putVal</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/** Implementation for put and putIfAbsent */</span>
<span class="token keyword">final</span> <span class="token class-name">V</span> <span class="token function">putVal</span><span class="token punctuation">(</span><span class="token class-name">K</span> key<span class="token punctuation">,</span> <span class="token class-name">V</span> value<span class="token punctuation">,</span> <span class="token keyword">boolean</span> onlyIfAbsent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> value <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// spread方法会综合高位地位，具有更好的hash性</span>
    <span class="token keyword">int</span> hash <span class="token operator">=</span> <span class="token function">spread</span><span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> binCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> tab <span class="token operator">=</span> table<span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// f是链表头节点</span>
        <span class="token comment">// fh是链表头结点的hash</span>
        <span class="token comment">// i是链表在table中的下标</span>
        <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> f<span class="token punctuation">;</span> <span class="token keyword">int</span> n<span class="token punctuation">,</span> i<span class="token punctuation">,</span> fh<span class="token punctuation">;</span>
        <span class="token comment">//要创建table</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>tab <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token punctuation">(</span>n <span class="token operator">=</span> tab<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token comment">// 初始化table使用了cas，无需synchronized创建成功，进入下一轮循环</span>
            tab <span class="token operator">=</span> <span class="token function">initTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 要创建链表头节点</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>f <span class="token operator">=</span> <span class="token function">tabAt</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> i <span class="token operator">=</span> <span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> hash<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 添加链表头节点使用了cas，无需synchronized</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">casTabAt</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
                         <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>                   <span class="token comment">// no lock when adding to empty bin</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 帮忙扩容</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>fh <span class="token operator">=</span> f<span class="token punctuation">.</span>hash<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token constant">MOVED</span><span class="token punctuation">)</span>
            tab <span class="token operator">=</span> <span class="token function">helpTransfer</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> f<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">V</span> oldVal <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token comment">// 锁住链表头节点</span>
            <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>f<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 再次确认链表头节点没有被移动</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">tabAt</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> i<span class="token punctuation">)</span> <span class="token operator">==</span> f<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 链表</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>fh <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        binCount <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                        <span class="token comment">// 遍历链表</span>
                        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> e <span class="token operator">=</span> f<span class="token punctuation">;</span><span class="token punctuation">;</span> <span class="token operator">++</span>binCount<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            <span class="token class-name">K</span> ek<span class="token punctuation">;</span>
                            <span class="token comment">// 找到相同的key</span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>hash <span class="token operator">==</span> hash <span class="token operator">&amp;&amp;</span>
                                <span class="token punctuation">(</span><span class="token punctuation">(</span>ek <span class="token operator">=</span> e<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token operator">==</span> key <span class="token operator">||</span>
                                 <span class="token punctuation">(</span>ek <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>ek<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                oldVal <span class="token operator">=</span> e<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
                                <span class="token comment">// 更新</span>
                                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>onlyIfAbsent<span class="token punctuation">)</span>
                                    e<span class="token punctuation">.</span>val <span class="token operator">=</span> value<span class="token punctuation">;</span>
                                <span class="token keyword">break</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                            <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> pred <span class="token operator">=</span> e<span class="token punctuation">;</span>
                            <span class="token comment">// 已经是最后的节点了，新增Node，追加至链表尾</span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>e <span class="token operator">=</span> e<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                                pred<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span>
                                                          value<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                <span class="token keyword">break</span><span class="token punctuation">;</span>
                            <span class="token punctuation">}</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                    <span class="token comment">// 红黑树</span>
                    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>f <span class="token keyword">instanceof</span> <span class="token class-name">TreeBin</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">Node</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> p<span class="token punctuation">;</span>
                        binCount <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
                        <span class="token comment">// putTreeVal会看key是否已经在树中，是，则返回对应的TreeNode</span>
                        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>p <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">TreeBin</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">)</span>f<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putTreeVal</span><span class="token punctuation">(</span>hash<span class="token punctuation">,</span> key<span class="token punctuation">,</span>
                                                       value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                            oldVal <span class="token operator">=</span> p<span class="token punctuation">.</span>val<span class="token punctuation">;</span>
                            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>onlyIfAbsent<span class="token punctuation">)</span>
                                p<span class="token punctuation">.</span>val <span class="token operator">=</span> value<span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>binCount <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>binCount <span class="token operator">>=</span> <span class="token constant">TREEIFY_THRESHOLD</span><span class="token punctuation">)</span>
                    <span class="token comment">// 如果链表长度大于等于阈值8，进行链表转为红黑树</span>
                    <span class="token function">treeifyBin</span><span class="token punctuation">(</span>tab<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>oldVal <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token keyword">return</span> oldVal<span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 增加size计数，其中用到的原理和LongAdder差不多使用了Cell[]，设置了多个累加单元</span>
    <span class="token function">addCount</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> binCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>size计算流程</strong></p>
<p>size计算实际发生在put，remove改变集合元素的操作之中</p>
<ul>
<li>没有竞争发生，向baseCount累加计数</li>
<li>有竞争发生，新建counterCells，象棋中的一个cell累加计数
<ul>
<li>counterCells初始有两个cell</li>
<li>如果技术竞争比较激烈，会创建新的cell来累加计数</li>
</ul>
</li>
</ul>
<h2 id="aqs" tabindex="-1"><a class="header-anchor" href="#aqs" aria-hidden="true">#</a> AQS</h2>
<blockquote>
<p>以下是面向面试</p>
<p>基于<a href="https://juejin.cn/post/6844903873329496077" target="_blank" rel="noopener noreferrer">死磕 java同步系列之AQS终篇<ExternalLinkIcon/></a>改编</p>
</blockquote>
<h3 id="aqs是什么" tabindex="-1"><a class="header-anchor" href="#aqs是什么" aria-hidden="true">#</a> AQS是什么</h3>
<p>AQS的全称是<code v-pre>AbstractQueuedSynchronizer</code>，是一个抽象类。它为Java中大部分锁和同步器提供一个基础框架，其中运用了设计模式中的<code v-pre>模板方法</code>。像<code v-pre>ReentrantLock</code>，<code v-pre>ReentrantReadWriteLock</code>，<code v-pre>Semaphore</code>，<code v-pre>CountDownLatch</code>都继承了该抽象类。</p>
<h3 id="状态变量state" tabindex="-1"><a class="header-anchor" href="#状态变量state" aria-hidden="true">#</a> 状态变量state</h3>
<p>AQS中定义了一个状态变量state，它有以下两种使用方法：</p>
<ol>
<li>
<p>互斥锁</p>
<p>当AQS只实现为互斥锁的时候，只要成功地通过CAS操作将state的值从0变为1就获取了锁，可重入是通过不断通过CAS操作将state的值+1实现的。当可重入时，释放锁的时候也需要将state减为0。</p>
</li>
<li>
<p>互斥锁+共享锁</p>
<p>当AQS需要同时实现为互斥锁+共享锁的时候，低16为存储互斥锁状态，高16位存储共享锁的状态，主要用于实现读写锁，比如<code v-pre>ReentrantReadWriteLock</code>。</p>
<p>互斥锁是一种独占锁，每次只允许一个线程独占，且当一个线程独占时，其他线程将无法再获取互斥锁及共享锁，但是它自己可以获取共享锁（意思是互斥锁可以降级为共享锁，比如<code v-pre>ReentrantReadWriteLock</code>中的写锁可以降级为读锁）。</p>
<p>共享锁允许同时多个线程占有，只要有一个线程占有了共享锁，所有线程（包括自己）都将无法再获取互斥锁，但是可以获取共享锁</p>
</li>
</ol>
<h3 id="aqs队列" tabindex="-1"><a class="header-anchor" href="#aqs队列" aria-hidden="true">#</a> AQS队列</h3>
<p>AQS中维护了一个队列，获取锁失败的线程都将进入到这个队列中排队，等待所释放后唤醒下一个排队的线程。</p>
<p>在互斥模式下唤醒的是下一个线程，如果是互斥锁+共享锁的情况下，比如<code v-pre>ReentrantReadWriteLock</code>，<strong>唤醒下一个线程后如果发现该线程占有的是共享锁，那么会在队列中再往后判断下一个节点的线程时候占有的是共享锁，如果是共享锁的话会将连着的占有共享锁的线程一同释放，达到一种并发读的效果</strong>。</p>
<p>比如下图中t2和t3就占有共享锁，当t1释放锁t2被唤醒后，会连同t3一起唤醒。</p>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c1b9bb72e.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c1da2b152.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="condition队列" tabindex="-1"><a class="header-anchor" href="#condition队列" aria-hidden="true">#</a> Condition队列</h3>
<p>AQS中还有一个非常重要的内部类<code v-pre>ConditionObject</code>，它实现了Condition接口，主要用于实现条件锁。</p>
<p><code v-pre>ConditionObject</code>中也维护了一个队列，这个队列主要用于等待条件的成立，当条件成立时，其他线程将signal这个队列中的元素，将其移动到AQS的队列中，等待占有锁的线程释放后被唤醒。</p>
<p>Condition典型的运用场景是在<code v-pre>BlockingQueue</code>中的实现，当队列为空时，获取元素的线程阻塞在notEmpty条件上，一旦队列中添加了一个元素，将通知notEmpty条件，将其队列中的元素移动到AQS队列中等待被唤醒。</p>
<h3 id="模板方法" tabindex="-1"><a class="header-anchor" href="#模板方法" aria-hidden="true">#</a> 模板方法</h3>
<p>AQS这个抽象类把模板方法运用地炉火纯青，它里面定义了一系列的模板方法，比如下面这些：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 获取互斥锁</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">acquire</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// tryAcquire(arg)需要子类实现</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">tryAcquire</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
        <span class="token function">acquireQueued</span><span class="token punctuation">(</span><span class="token function">addWaiter</span><span class="token punctuation">(</span><span class="token class-name">Node</span><span class="token punctuation">.</span><span class="token constant">EXCLUSIVE</span><span class="token punctuation">)</span><span class="token punctuation">,</span> arg<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token function">selfInterrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 获取互斥锁可中断</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">acquireInterruptibly</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span>
        <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">interrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// tryAcquire(arg)需要子类实现</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">tryAcquire</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token function">doAcquireInterruptibly</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>    
<span class="token comment">// 获取共享锁</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">acquireShared</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// tryAcquireShared(arg)需要子类实现</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">tryAcquireShared</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
     <span class="token function">doAcquireShared</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 获取共享锁可中断</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">acquireSharedInterruptibly</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span>
        <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">interrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">InterruptedException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// tryAcquireShared(arg)需要子类实现</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">tryAcquireShared</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token function">doAcquireSharedInterruptibly</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 释放互斥锁</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">release</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// tryRelease(arg)需要子类实现</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">tryRelease</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Node</span> h <span class="token operator">=</span> head<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>h <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> h<span class="token punctuation">.</span>waitStatus <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token function">unparkSuccessor</span><span class="token punctuation">(</span>h<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 释放共享锁</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">boolean</span> <span class="token function">releaseShared</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// tryReleaseShared(arg)需要子类实现</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">tryReleaseShared</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">doReleaseShared</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>需要子类实现的方法</strong></p>
<p>上面一起学习了AQS中几个重要的模板方法，下面我们再一起学习下几个需要子类实现的方法：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 互斥模式下使用：尝试获取锁</span>
<span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 互斥模式下使用：尝试释放锁</span>
<span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryRelease</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 共享模式下使用：尝试获取锁</span>
<span class="token keyword">protected</span> <span class="token keyword">int</span> <span class="token function">tryAcquireShared</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 共享模式下使用：尝试释放锁</span>
<span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">tryReleaseShared</span><span class="token punctuation">(</span><span class="token keyword">int</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 如果当前线程独占着锁，返回true</span>
<span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">isHeldExclusively</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这几个方法为什么不直接定义成抽象方法呢？</p>
<p><strong>因为子类只要实现这几个方法中的一部分就可以实现一个同步器了，所以不需要定义成抽象方法。</strong></p>
<h2 id="reentrantlock" tabindex="-1"><a class="header-anchor" href="#reentrantlock" aria-hidden="true">#</a> ReentrantLock</h2>
<p><code v-pre>ReentrantLock</code>是基于Lock接口和AQS抽象类实现的可重入锁。</p>
<h3 id="reentrantlock与synchronized的区别" tabindex="-1"><a class="header-anchor" href="#reentrantlock与synchronized的区别" aria-hidden="true">#</a> ReentrantLock与Synchronized的区别</h3>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c1f2d6cc7.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="reentrantlock的公平锁和非公平锁" tabindex="-1"><a class="header-anchor" href="#reentrantlock的公平锁和非公平锁" aria-hidden="true">#</a> ReentrantLock的公平锁和非公平锁</h3>
<blockquote>
<p><code v-pre>ReentrantLock</code>的非公平体现在，当线程想要获取锁时，先通过两次CAS操作去争抢锁，如果没抢到，当前线程再加入到队列中等待唤醒。对于队列中的线程是公平的，因为AQS中队列满足FIFO的特性。</p>
</blockquote>
<ol>
<li>非公平锁在调用<code v-pre>lock</code>方法后，首先会调用CAS进行一次抢锁，如果这个时候锁恰好没有被占用，那么就直接获取到锁返回了</li>
<li>非公平锁在CAS失败后，和公平锁一样都会进入到<code v-pre>tryAcquire</code>方法，在<code v-pre>tryAcquire</code>方法中，如果发现锁这个时候被释放了<code v-pre>（state == 0）</code>，非公平锁会直接CAS抢锁，但是公平锁会判断队列中是否有线程处于等待状态，如果有则不去抢锁，主动加入到队列等待唤醒。</li>
</ol>
<p>公平锁和非公平锁就这两点区别，如果两次CAS都不成功，那么后面公平锁和非公平锁是一样的，都要进入队列等待唤醒。</p>
<p>相对来说，非公平锁会有更好的性能，因为它的吞吐量比较大。当然，非公平锁让获得锁的时间变得更加不确定，可能导致队列中的线程长期处于饥饿状态。</p>
<h2 id="reentrantreadwritelock" tabindex="-1"><a class="header-anchor" href="#reentrantreadwritelock" aria-hidden="true">#</a> ReentrantReadWriteLock</h2>
<p><code v-pre>ReentrantReadWriteLock</code>是一种读写锁，用于实现并发读。</p>
<p>写锁可以降级为读锁，读锁不能升级为写锁。</p>
<h2 id="stampedlock" tabindex="-1"><a class="header-anchor" href="#stampedlock" aria-hidden="true">#</a> StampedLock</h2>
<p>该类自JDK 8加入，是为了进一步优化读性能，它的特点是在使用读锁和写锁时都必须配合**【戳】**来使用</p>
<p><strong>加解读锁</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">long</span> stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">readLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lock<span class="token punctuation">.</span><span class="token function">unlockRead</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>加解写锁</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">long</span> stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">writeLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
lock<span class="token punctuation">.</span><span class="token function">unlockWrite</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>乐观读，<code v-pre>StampedLock</code>支持<code v-pre>tryOptimisticRead()</code>方法（乐观读），读取完毕后需要做一次<strong>戳校验</strong>，如果校验通过，表示这期间确实没有写操作，数据可以安全使用，如果检验没通过，需要重新获取读锁，保证数据安全。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">long</span> stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">tryOptimisticRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 验戳</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>lock<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 锁升级</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码模拟StampedLock读和写的过程</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 写过程和普通锁没什么区别，都需要全程加锁</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token keyword">new</span> <span class="token class-name">Data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">writeLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// do something</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> newData<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">unlockWrite</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token keyword">int</span> readTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">tryOptimisticRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// do something</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>lock<span class="token punctuation">.</span><span class="token function">validate</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// stamp别修改过了，需要进行加读锁</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        stamp <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">readLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// do something</span>
        <span class="token keyword">return</span> data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">unlockRead</span><span class="token punctuation">(</span>stamp<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>StampedLock的缺点</p>
<blockquote>
<p>为什么StampedLock可以提升并发度的性能，但是不能取代ReentrantLock</p>
</blockquote>
<ul>
<li>不支持条件变量</li>
<li>不支持可重入</li>
</ul>
<h2 id="semaphore" tabindex="-1"><a class="header-anchor" href="#semaphore" aria-hidden="true">#</a> Semaphore</h2>
<p>信号量，用来限制能同时访问共享资源的线程上限</p>
<p>Semaphore有一个构造函数，可以传入一个int型整数n，表示某段代码最多可以有n个线程同时访问。</p>
<p><strong>应用</strong>：使用Semaphore限流，在访问高峰期，<strong>限制请求线程数量</strong>，让请求线程阻塞，高峰期过去再释放许可。</p>
<p><strong>Semaphore的构造函数</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Semaphore</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token keyword">permits</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    sync <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NonfairSync</span><span class="token punctuation">(</span><span class="token keyword">permits</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">NonfairSync</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token keyword">permits</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token keyword">permits</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">Sync</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token keyword">permits</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">permits</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由代码可以看出，Semaphore传入的参数permits最终设置为state的个数</p>
<p><strong>加锁解锁流程</strong></p>
<p>刚开始，permits(state)为3，并且同时5个线程来获取资源</p>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c21ea9a3c.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>假设Thread-1，Thread-2，Thread-4 cas 竞争成功，而Thread-0和Thread-3竞争失败，进入AQS队列park阻塞</p>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c21f5e848.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>这时Thread-4释放了锁，状态如下：</p>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c22036e90.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>接下来Thread-0竞争成功，state再次设置为0，设置自己的head节点，断开原来的head节点，unpark接下来的Thread-3节点，但是由于state=0，因此Thread-3在尝试不成功后再次进入park状态</p>
<figure><img src="https://vingkin.cn/i/2023/12/13/6579c221431a1.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="countdownlatch" tabindex="-1"><a class="header-anchor" href="#countdownlatch" aria-hidden="true">#</a> CountdownLatch</h2>
<p>用来进行线程同步协作，等待所有线程完成倒计时后再恢复运行。</p>
<p>和Semaphore类似，构造函数传入的count值最终都会赋值给state。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">CountDownLatch</span><span class="token punctuation">(</span><span class="token keyword">int</span> count<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"count &lt; 0"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>sync <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Sync</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如可以用于王者荣耀玩家加载，只有所有玩家都加载到100%才能开始游戏。</p>
<p>如果需要主线程汇总结果，<code v-pre>CountdownLatch</code>就不如<code v-pre>future</code>了，主线程通过get方法可以等待其他线程的运行结果，所有线程都运行完了进行汇总。</p>
<h2 id="cyclicbarrier" tabindex="-1"><a class="header-anchor" href="#cyclicbarrier" aria-hidden="true">#</a> Cyclicbarrier</h2>
<p>循环栅栏，用来进行线程协作，等待线程满足某个计数。构造时设置<strong>计数个数</strong>，每个线程执行到某个需要**“同步”<strong>的时刻调用await()方法进行等待，当等待的线程数满足</strong>计数个数**时，继续执行。</p>
<p>和<code v-pre>CountdownLatch</code>和类似，区别就是在于<code v-pre>Cyclibarrier</code>计数变为0后下次再调用可以恢复到初始设定的值。<code v-pre>CountdownLatch</code>要想恢复设定值只能重新创建新的<code v-pre>CountdownLatch</code>对象。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">CyclicBarrier</span> bar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CyclicBarrier</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"task1 task2 finished"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 计数变为0后，下次循环计数重置</span>
    executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"task1 begin..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            bar<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 - 1</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> <span class="token operator">|</span> <span class="token class-name">BrokenBarrierException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"task2 begin..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            bar<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 - 1</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> <span class="token operator">|</span> <span class="token class-name">BrokenBarrierException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意线程池线程数和<code v-pre>CyclicBarrier</code>的计数要一样</strong></p>
<p>比如下面这种情况，task1会优先运行2次，这样就不会达到等待统计两个线程运行结束的预期了</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">CyclicBarrier</span> bar <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CyclicBarrier</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"task1 task2 finished"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"task1 begin..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            bar<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 - 1</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> <span class="token operator">|</span> <span class="token class-name">BrokenBarrierException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    executorService<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"task2 begin..."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            bar<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 - 1</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> <span class="token operator">|</span> <span class="token class-name">BrokenBarrierException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


