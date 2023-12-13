import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as i,c as u,a as n,b as s,e,w as p,f as a}from"./app-ee96bbef.js";const k={},d={href:"https://www.jb51.net/article/213888.htm",target:"_blank",rel:"noopener noreferrer"},r=a('<p>单例模式（Singleton Pattern）是 Java 中最简单的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。</p><p>这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建。这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象。</p><h2 id="单例模式的结构" tabindex="-1"><a class="header-anchor" href="#单例模式的结构" aria-hidden="true">#</a> 单例模式的结构</h2><p>单例模式的主要有以下角色：</p><ul><li>单例类。只能创建一个实例的类</li><li>访问类。使用单例类</li></ul><h2 id="单例模式的实现" tabindex="-1"><a class="header-anchor" href="#单例模式的实现" aria-hidden="true">#</a> 单例模式的实现</h2><blockquote><p>单例设计模式分类两种：</p><p>​ 饿汉式：类加载就会导致该单实例对象被创建</p><p>​ 懒汉式：类加载不会导致该单实例对象被创建，而是首次使用该对象时才会创建</p></blockquote>',7),v=a(`<p>饿汉式-方式1（静态变量方式）</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 饿汉式
 *      静态变量创建类的对象
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">//在成员位置创建该类的对象</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),m=n("p",null,"​ 该方式在成员位置声明Singleton类型的静态变量，并创建Singleton类的对象instance。instance对象是随着类的加载而创建的。如果该对象足够大的话，而一直没有使用就会造成内存的浪费。",-1),b=a(`<p>饿汉式-方式2（静态代码块方式）</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 恶汉式
 *      在静态代码块中创建该类对象
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">//在成员位置创建该类的对象</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),w=n("p",null,"该方式在成员位置声明Singleton类型的静态变量，而对象的创建是在静态代码块中，也是对着类的加载而创建。所以和饿汉式的方式1基本上一样，当然该方式也存在内存浪费问题。",-1),y=a(`<p>懒汉式-方式1（线程不安全）</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 懒汉式
 *  线程不安全
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">//在成员位置创建该类的对象</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),g=n("p",null,"从上面代码我们可以看出该方式在成员位置声明Singleton类型的静态变量，并没有进行对象的赋值操作，那么什么时候赋值的呢？当调用getInstance()方法获取Singleton类的对象的时候才创建Singleton类的对象，这样就实现了懒加载的效果。但是，如果是多线程环境，会出现线程安全问题。",-1),S=a(`<p>懒汉式-方式2（线程安全）</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 懒汉式
 *  线程安全
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">//在成员位置创建该类的对象</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),h=n("p",null,"该方式也实现了懒加载效果，同时又解决了线程安全问题。但是在getInstance()方法上添加了synchronized关键字，导致该方法的执行效果特别低。从上面代码我们可以看出，其实就是在初始化instance的时候才会出现线程安全问题，一旦初始化完成就不存在了。",-1),f=a(`<p>懒汉式-方式3（双重检查锁）</p><p>再来讨论一下懒汉模式中加锁的问题，对于 <code>getInstance()</code> 方法来说，绝大部分的操作都是读操作，读操作是线程安全的，所以我们没必让每个线程必须持有锁才能调用该方法，我们需要调整加锁的时机。由此也产生了一种新的实现模式：双重检查锁模式</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 双重检查方式
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span> 

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

   <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">//第一次判断，如果instance不为null，不进入抢锁阶段，直接返回实例</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//抢到锁之后再次判断是否为null</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>双重检查锁模式是一种非常好的单例实现模式，解决了单例、性能、线程安全问题，上面的双重检测锁模式看上去完美无缺，其实是存在问题，在多线程的情况下，可能会出现空指针问题（此处会问<strong>Java对象的创建过程</strong>），出现问题的原因是JVM在实例化对象的时候会进行优化和指令重排序操作。</p><p>要解决双重检查锁模式带来空指针异常的问题，只需要使用 <code>volatile</code> 关键字, <code>volatile</code> 关键字可以保证可见性和有序性。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 双重检查方式
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

   <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">//第一次判断，如果instance不为null，不进入抢锁阶段，直接返回实际</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//抢到锁之后再次判断是否为空</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),j=n("p",null,[s("添加 "),n("code",null,"volatile"),s(" 关键字之后的双重检查锁模式是一种比较好的单例实现模式，能够保证在多线程的情况下线程安全也不会有性能问题。")],-1),_=a(`<p>懒汉式-方式4（静态内部类方式）</p><p>静态内部类单例模式中实例由内部类创建（<strong>静态内部类的初始化时机</strong>），由于 JVM 在加载外部类的过程中, 是不会加载静态内部类的, 只有内部类的属性/方法被调用时才会被加载, 并初始化其静态属性。静态属性由于被 <code>static</code> 修饰，保证只被实例化一次，并且严格保证实例化顺序。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 静态内部类方式
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SingletonHolder</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SingletonHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),x=n("p",null,"第一次加载Singleton类时不会去初始化INSTANCE，只有第一次调用getInstance，虚拟机加载SingletonHolder",-1),I=n("p",null,"并初始化INSTANCE，这样不仅能确保线程安全，也能保证 Singleton 类的唯一性。",-1),O=n("p",null,"静态内部类单例模式是一种优秀的单例模式，是开源项目中比较常用的一种单例模式。在没有加任何锁的情况下，保证了多线程下的安全，并且没有任何性能影响和空间的浪费。",-1),R=a(`<p>枚举方式</p><p>枚举类实现单例模式是极力推荐的单例实现模式，因为枚举类型是线程安全的，并且只会装载一次，设计者充分的利用了枚举的这个特性来实现单例模式，枚举的写法非常简单，而且枚举类型是所用单例实现中唯一一种不会被破坏的单例实现模式。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 枚举方式
 */</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),E=n("p",null,"枚举方式属于饿汉式方式。",-1),N=a(`<h2 id="存在的问题" tabindex="-1"><a class="header-anchor" href="#存在的问题" aria-hidden="true">#</a> 存在的问题</h2><h3 id="问题演示" tabindex="-1"><a class="header-anchor" href="#问题演示" aria-hidden="true">#</a> 问题演示</h3><p>破坏单例模式：</p><p>使上面定义的单例类（Singleton）可以创建多个对象，枚举方式除外。有两种方式，分别是序列化和反射。</p><ul><li><p>序列化反序列化</p><p><strong>Singleton类：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SingletonHolder</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SingletonHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Test类：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">//往文件中写对象</span>
        <span class="token comment">//writeObject2File();</span>
        <span class="token comment">//从文件中读取对象</span>
        <span class="token class-name">Singleton</span> s1 <span class="token operator">=</span> <span class="token function">readObjectFromFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Singleton</span> s2 <span class="token operator">=</span> <span class="token function">readObjectFromFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//判断两个反序列化后的对象是否是同一个对象</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1 <span class="token operator">==</span> s2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">readObjectFromFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建对象输入流对象</span>
        <span class="token class-name">ObjectInputStream</span> ois <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectInputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;C:\\\\Users\\\\Think\\\\Desktop\\\\a.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//第一个读取Singleton对象</span>
        <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">)</span> ois<span class="token punctuation">.</span><span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">writeObject2File</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">//获取Singleton类的对象</span>
        <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//创建对象输出流</span>
        <span class="token class-name">ObjectOutputStream</span> oos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectOutputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">&quot;C:\\\\Users\\\\Think\\\\Desktop\\\\a.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//将instance对象写出到文件中</span>
        oos<span class="token punctuation">.</span><span class="token function">writeObject</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>上面代码运行结果是<code>false</code>，表明序列化和反序列化已经破坏了单例设计模式。</p></blockquote></li><li><p>反射</p><p><strong>Singleton类：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Test类：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">//获取Singleton类的字节码对象</span>
        <span class="token class-name">Class</span> clazz <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
        <span class="token comment">//获取Singleton类的私有无参构造方法对象</span>
        <span class="token class-name">Constructor</span> constructor <span class="token operator">=</span> clazz<span class="token punctuation">.</span><span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//取消访问检查</span>
        constructor<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建Singleton类的对象s1</span>
        <span class="token class-name">Singleton</span> s1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">)</span> constructor<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//创建Singleton类的对象s2</span>
        <span class="token class-name">Singleton</span> s2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">)</span> constructor<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//判断通过反射创建的两个Singleton对象是否是同一个对象</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1 <span class="token operator">==</span> s2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>上面代码运行结果是<code>false</code>，表明序列化和反序列化已经破坏了单例设计模式</p></blockquote></li></ul>`,5),C=n("h3",{id:"问题的解决",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#问题的解决","aria-hidden":"true"},"#"),s(" 问题的解决")],-1),T=a(`<li><p>序列化、反序列方式破坏单例模式的解决方法</p><p>在Singleton类中添加<code>readResolve()</code>方法，在反序列化时被反射调用，如果定义了这个方法，就返回这个方法的值，如果没有定义，则返回新new出来的对象。</p><p><strong>Singleton类：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SingletonHolder</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SingletonHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/**
     * 下面是为了解决序列化反序列化破解单例模式
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Object</span> <span class="token function">readResolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SingletonHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码解析：</strong></p><p>ObjectInputStream类</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> <span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ClassNotFoundException</span><span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token comment">// if nested read, passHandle contains handle of enclosing object</span>
    <span class="token keyword">int</span> outerHandle <span class="token operator">=</span> passHandle<span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token function">readObject0</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//重点查看readObject0方法</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
    
<span class="token keyword">private</span> <span class="token class-name">Object</span> <span class="token function">readObject0</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> unshared<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
		<span class="token keyword">switch</span> <span class="token punctuation">(</span>tc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
			<span class="token keyword">case</span> <span class="token constant">TC_OBJECT</span><span class="token operator">:</span>
				<span class="token keyword">return</span> <span class="token function">checkResolve</span><span class="token punctuation">(</span><span class="token function">readOrdinaryObject</span><span class="token punctuation">(</span>unshared<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//重点查看readOrdinaryObject方法</span>
			<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        depth<span class="token operator">--</span><span class="token punctuation">;</span>
        bin<span class="token punctuation">.</span><span class="token function">setBlockDataMode</span><span class="token punctuation">(</span>oldMode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>    
<span class="token punctuation">}</span>
    
<span class="token keyword">private</span> <span class="token class-name">Object</span> <span class="token function">readOrdinaryObject</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> unshared<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
	<span class="token comment">//isInstantiable 返回true，执行 desc.newInstance()，通过反射创建新的单例类，</span>
    obj <span class="token operator">=</span> desc<span class="token punctuation">.</span><span class="token function">isInstantiable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> desc<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span> 
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token comment">// 在Singleton类中添加 readResolve 方法后 desc.hasReadResolveMethod() 方法执行结果为true</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> handles<span class="token punctuation">.</span><span class="token function">lookupException</span><span class="token punctuation">(</span>passHandle<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> desc<span class="token punctuation">.</span><span class="token function">hasReadResolveMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    	<span class="token comment">// 通过反射调用 Singleton 类中的 readResolve 方法，将返回值赋值给rep变量</span>
    	<span class="token comment">// 这样多次调用ObjectInputStream类中的readObject方法，继而就会调用我们定义的readResolve方法，所以返回的是同一个对象。</span>
    	<span class="token class-name">Object</span> rep <span class="token operator">=</span> desc<span class="token punctuation">.</span><span class="token function">invokeReadResolve</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
     	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,1),q=a(`<p>反射方式破解单例的解决方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">/*
           反射破解单例模式需要添加的代码
        */</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),z=n("p",null,"这种方式比较好理解。当通过反射方式调用构造方法进行创建创建时，直接抛异常。不运行此中操作。",-1),H=a(`<h2 id="jdk源码解析-runtime类" tabindex="-1"><a class="header-anchor" href="#jdk源码解析-runtime类" aria-hidden="true">#</a> JDK源码解析-Runtime类</h2><p>Runtime类就是使用的单例设计模式。</p><ol><li><p>通过源代码查看使用的是哪儿种单例模式</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Runtime</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Runtime</span> currentRuntime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Runtime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns the runtime object associated with the current Java application.
     * Most of the methods of class <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">Runtime</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> are instance
     * methods and must be invoked with respect to the current runtime object.
     *
     * <span class="token keyword">@return</span>  the <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">Runtime</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> object associated with the current
     *          Java application.
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Runtime</span> <span class="token function">getRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> currentRuntime<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/** Don&#39;t let anyone else instantiate this class */</span>
    <span class="token keyword">private</span> <span class="token class-name">Runtime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面源代码中可以看出Runtime类使用的是饿汉式（静态属性）方式来实现单例模式的。</p></li><li><p>使用Runtime类中的方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RuntimeDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//获取Runtime类对象</span>
        <span class="token class-name">Runtime</span> runtime <span class="token operator">=</span> <span class="token class-name">Runtime</span><span class="token punctuation">.</span><span class="token function">getRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//返回 Java 虚拟机中的内存总量。</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>runtime<span class="token punctuation">.</span><span class="token function">totalMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//返回 Java 虚拟机试图使用的最大内存量。</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>runtime<span class="token punctuation">.</span><span class="token function">maxMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建一个新的进程执行指定的字符串命令，返回进程对象</span>
        <span class="token class-name">Process</span> process <span class="token operator">=</span> runtime<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token string">&quot;ipconfig&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//获取命令执行后的结果，通过输入流获取</span>
        <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> process<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> b <span class="token operator">=</span> inputStream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>b<span class="token punctuation">,</span><span class="token string">&quot;gbk&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol>`,3);function A(F,J){const o=c("ExternalLinkIcon"),t=c("font");return i(),u("div",null,[n("blockquote",null,[n("p",null,[n("a",d,[s("为什么要使用单例模式详解"),e(o)])])]),r,n("ol",null,[n("li",null,[v,e(t,{color:"red"},{default:p(()=>[s("说明：")]),_:1}),m]),n("li",null,[b,e(t,{color:"red"},{default:p(()=>[s("说明：")]),_:1}),w]),n("li",null,[y,e(t,{color:"red"},{default:p(()=>[s("说明：")]),_:1}),g]),n("li",null,[S,e(t,{color:"red"},{default:p(()=>[s("说明：")]),_:1}),h]),n("li",null,[f,e(t,{color:"red"},{default:p(()=>[s("小结：")]),_:1}),j]),n("li",null,[_,e(t,{color:"red"},{default:p(()=>[s("说明：")]),_:1}),x,I,e(t,{color:"red"},{default:p(()=>[s("小结：")]),_:1}),O]),n("li",null,[R,e(t,{color:"red"},{default:p(()=>[s("说明：")]),_:1}),E])]),N,n("blockquote",null,[e(t,{color:"red"},{default:p(()=>[s("注意：")]),_:1}),s("枚举方式不会出现这两个问题。")]),C,n("ul",null,[T,n("li",null,[q,e(t,{color:"red"},{default:p(()=>[s("说明:")]),_:1}),z])]),H])}const V=l(k,[["render",A],["__file","Singleton.html.vue"]]);export{V as default};
