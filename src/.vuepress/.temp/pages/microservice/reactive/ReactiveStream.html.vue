<template><div><h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2>
<p><code v-pre>Reactive Streams</code>为我们提供了Java中的Reactive Programming的通用API。传统异步编程的写法，不同任务分别在不同的线程中执行，协调这些线程执行的先后顺序、线程间的依赖顺序是一件非常麻烦的事情，而<code v-pre>Reactive Streams</code>就是为了解决该问题。<code v-pre>Reactive Streams API</code>中仅仅包含了如下<strong>四个接口：</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//发布者</span>
<span class="token keyword">public</span>  <span class="token keyword">interface</span>  <span class="token class-name">Publisher</span> <span class="token generics"><span class="token punctuation">&lt;</span> <span class="token class-name">T</span> <span class="token punctuation">></span></span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span>  <span class="token keyword">void</span>  subscribe（<span class="token class-name">Subscriber</span> <span class="token operator">&lt;</span>？<span class="token keyword">super</span>  <span class="token class-name">T</span> <span class="token operator">></span>  s）<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//订阅者</span>
<span class="token keyword">public</span>  <span class="token keyword">interface</span>  <span class="token class-name">Subscriber</span> <span class="token generics"><span class="token punctuation">&lt;</span> <span class="token class-name">T</span> <span class="token punctuation">></span></span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span>  <span class="token keyword">void</span>  onSubscribe（<span class="token class-name">Subscription</span>  s）<span class="token punctuation">;</span>
	<span class="token keyword">public</span>  <span class="token keyword">void</span>  onNext（<span class="token class-name">T</span>  t）<span class="token punctuation">;</span>
	<span class="token keyword">public</span>  <span class="token keyword">void</span>  onError（<span class="token class-name">Throwable</span>  t）<span class="token punctuation">;</span>
	<span class="token keyword">public</span>  <span class="token keyword">void</span>  onComplete（）<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//表示Subscriber消费Publisher发布的一个消息的生命周期</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Subscription</span> <span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">request</span><span class="token punctuation">(</span><span class="token keyword">long</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//处理器，表示一个处理阶段，它既是订阅者也是发布者，并且遵守两者的契约</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Processor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">Subscriber</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span><span class="token punctuation">,</span> <span class="token class-name">Publisher</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
	
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="示例1" tabindex="-1"><a class="header-anchor" href="#示例1" aria-hidden="true">#</a> 示例1</h2>
<blockquote>
<p>通过Publisher，Subscriber和Subscription完成一个发布-订阅模式</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReactiveStreamDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>

        <span class="token comment">// 1、定义发布者，发布的数据类型是Integer</span>
        <span class="token class-name">SubmissionPublisher</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> publisher <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubmissionPublisher</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 2、定义订阅者</span>
        <span class="token class-name">Subscriber</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> subscriber <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Subscriber</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

            <span class="token keyword">private</span> <span class="token class-name">Subscription</span> subscription<span class="token punctuation">;</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onSubscribe</span><span class="token punctuation">(</span><span class="token class-name">Subscription</span> subscription<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 保存订阅关系，需要用它来给发布者响应</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>subscription <span class="token operator">=</span> subscription<span class="token punctuation">;</span>
                <span class="token comment">// 请求一个数据</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>subscription<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onNext</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 接收到一个数据，处理</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"接收到数据："</span> <span class="token operator">+</span> item<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 处理完调用request再请求一个数据</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>subscription<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 或者已经达到目标，调用cancel告诉发布者不在调用数据</span>
                <span class="token comment">// this.subscription.cancel();</span>
            <span class="token punctuation">}</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onError</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 出现了异常</span>
                throwable<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 告诉发布者后面不接受数据了</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>subscription<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 全部数据处理完成（发布者关闭了）</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"处理完了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token comment">// 3、发布者订阅者之间建立订阅关系</span>
        publisher<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>subscriber<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 4、生产数据并发布</span>
        <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>i <span class="token operator">-></span> <span class="token punctuation">{</span>
                    publisher<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 5、结束后 关闭发布者</span>
        <span class="token comment">// 正式环境应放在finally或者try-resource中确保关闭</span>
        publisher<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="示例2" tabindex="-1"><a class="header-anchor" href="#示例2" aria-hidden="true">#</a> 示例2</h2>
<blockquote>
<p>在示例1的基础上，添加了processor进行中间处理</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyProcessor</span> <span class="token keyword">extends</span> <span class="token class-name">SubmissionPublisher</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span>
        <span class="token keyword">implements</span> <span class="token class-name">Processor</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token constant">NUMBER_TO_CHINESE</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"零"</span><span class="token punctuation">,</span> <span class="token string">"壹"</span><span class="token punctuation">,</span> <span class="token string">"贰"</span><span class="token punctuation">,</span> <span class="token string">"叁"</span><span class="token punctuation">,</span> <span class="token string">"肆"</span><span class="token punctuation">,</span> <span class="token string">"伍"</span><span class="token punctuation">,</span> <span class="token string">"陆"</span><span class="token punctuation">,</span> <span class="token string">"柒"</span><span class="token punctuation">,</span> <span class="token string">"捌"</span><span class="token punctuation">,</span> <span class="token string">"玖"</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Subscription</span> subscription<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onSubscribe</span><span class="token punctuation">(</span><span class="token class-name">Subscription</span> subscription<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 保存订阅关系，需要用它来发布响应</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>subscription <span class="token operator">=</span> subscription<span class="token punctuation">;</span>
        <span class="token comment">// 请求一个数据</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>subscription<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onNext</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 接收到一个数据，进行处理</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"处理器接收到的数据："</span> <span class="token operator">+</span> item<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 过滤掉小于0的，发布出去</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>item <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token constant">NUMBER_TO_CHINESE</span><span class="token punctuation">[</span>item<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 处理完调用request再请求一个数据</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>subscription<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 或者已经达到目标，调用cancel告诉发布者不在调用数据</span>
        <span class="token comment">// this.subscription.cancel();</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onError</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 出现了异常</span>
        throwable<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 告诉发布者后面不接受数据了</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>subscription<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 全部数据处理完成（发布者关闭了）</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"处理器处理完了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ReactiveStreamDemo2</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1、定义发布者，发布的数据类型是Integer</span>
        <span class="token class-name">SubmissionPublisher</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> publisher <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SubmissionPublisher</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 2、定义处理器，对数据进行过滤，并转换成String类型</span>
        <span class="token class-name">MyProcessor</span> processor <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyProcessor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 3、发布者和处理器之间建立订阅关系</span>
        publisher<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>processor<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 4、定义最终订阅者，消费String类型数据</span>
        <span class="token class-name">Subscriber</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> subscriber <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Subscriber</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">private</span> <span class="token class-name">Subscription</span> subscription<span class="token punctuation">;</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onSubscribe</span><span class="token punctuation">(</span><span class="token class-name">Subscription</span> subscription<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>subscription <span class="token operator">=</span> subscription<span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>subscription<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onNext</span><span class="token punctuation">(</span><span class="token class-name">String</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"接收到处理后的数据："</span> <span class="token operator">+</span> item<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>subscription<span class="token punctuation">.</span><span class="token function">request</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onError</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 出现了异常</span>
                throwable<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 告诉发布者后面不接受数据了</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>subscription<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token annotation punctuation">@Override</span>
            <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onComplete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 全部数据处理完成（发布者关闭了）</span>
                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"订阅者处理完了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>

        <span class="token comment">// 5、处理器和最终订阅者建立订阅关系</span>
        processor<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span>subscriber<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 6、生产数据并发布</span>
        <span class="token comment">// submit是一个阻塞式方法</span>
        <span class="token class-name">Stream</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>i <span class="token operator">-></span> <span class="token punctuation">{</span>
                    publisher<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 7、结束后 关闭发布者</span>
        <span class="token comment">// 正式环境应放在finally或者try-resource中确保关闭</span>
        publisher<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="背压" tabindex="-1"><a class="header-anchor" href="#背压" aria-hidden="true">#</a> 背压</h2>
<p>背压可以理解为订阅者能和发布者交互（通过代码里面的调用request和cancel方法交互），可以调节发布者发布数据的速率，解决把订阅者压垮的问题。关键在于上面例子里面的订阅关系<code v-pre>Subscription</code>这个接口，他有request和cancel 2个方法，用于通知发布者需要数据和通知发布者不再接受数据。</p>
<p>在JDK9zhong<strong>发布者Publisher的实现类SubmissionPublisher的submit方法是block方法</strong>。订阅者会有一个缓冲池，默认为<code v-pre>Flow.defaultBufferSize() = 256</code>。当订阅者的缓冲池满了之后，发布者调用submit方法发布数据就会被阻塞，发布者就会停（慢）下来；订阅者消费了数据之后（调用Subscription.request方法），缓冲池有位置了，submit方法就会继续执行下去，就是通过这样的机制，实现了调节发布者发布数据的速率，消费得快，生成就快，消费得慢，发布者就会被阻塞，当然就会慢下来了。</p>
</div></template>


