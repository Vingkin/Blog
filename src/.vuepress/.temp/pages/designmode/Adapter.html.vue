<template><div><blockquote>
<p><a href="https://mp.weixin.qq.com/s/1w_epimqLBOiZdIhe6sUsw" target="_blank" rel="noopener noreferrer">程序媛教你一看就懂的适配器设计模式！<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>如果去欧洲国家去旅游的话，他们的插座如下图最左边，是欧洲标准。而我们使用的插头如下图最右边的。因此我们的笔记本电脑，手机在当地不能直接充电。所以就需要一个插座转换器，转换器第1面插入当地的插座，第2面供我们充电，这样使得我们的插头在当地能使用。生活中这样的例子很多，手机充电器（将220v转换为5v的电压），读卡器等，其实就是使用到了适配器模式。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/转接头.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>定义：</strong></p>
<p>​	将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类能一起工作。</p>
<p>​	适配器模式分为类适配器模式和对象适配器模式，前者类之间的耦合度比后者高，且要求程序员了解现有组件库中的相关组件的内部结构，所以应用相对较少些。</p>
<h2 id="结构" tabindex="-1"><a class="header-anchor" href="#结构" aria-hidden="true">#</a> 结构</h2>
<p>适配器模式（Adapter）包含以下主要角色：</p>
<ul>
<li>目标（Target）接口：当前系统业务所期待的接口，它可以是抽象类或接口。</li>
<li>适配者（Adaptee）类：它是被访问和适配的现存组件库中的组件接口。</li>
<li>适配器（Adapter）类：它是一个转换器，通过继承或引用适配者的对象，把适配者接口转换成目标接口，让客户按目标接口的格式访问适配者。</li>
</ul>
<h2 id="类适配器模式" tabindex="-1"><a class="header-anchor" href="#类适配器模式" aria-hidden="true">#</a> 类适配器模式</h2>
<p>实现方式：定义一个适配器类来实现当前系统的业务接口，同时又继承现有组件库中已经存在的组件。</p>
<p>【例】读卡器</p>
<p>现有一台电脑只能读取SD卡，而要读取TF卡中的内容的话就需要使用到适配器模式。创建一个读卡器，将TF卡中的内容读取出来。</p>
<p>类图如下：</p>
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/适配器模式.png" style="zoom:80%;" />
<p>代码如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//SD卡的接口</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">SDCard</span> <span class="token punctuation">{</span>
    <span class="token comment">//读取SD卡方法</span>
    <span class="token class-name">String</span> <span class="token function">readSD</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//写入SD卡功能</span>
    <span class="token keyword">void</span> <span class="token function">writeSD</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//SD卡实现类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SDCardImpl</span> <span class="token keyword">implements</span> <span class="token class-name">SDCard</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">readSD</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> msg <span class="token operator">=</span> <span class="token string">"sd card read a msg :hello word SD"</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> msg<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">writeSD</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sd card write msg : "</span> <span class="token operator">+</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//电脑类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Computer</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">readSD</span><span class="token punctuation">(</span><span class="token class-name">SDCard</span> sdCard<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>sdCard <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">NullPointerException</span><span class="token punctuation">(</span><span class="token string">"sd card null"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sdCard<span class="token punctuation">.</span><span class="token function">readSD</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//TF卡接口</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">TFCard</span> <span class="token punctuation">{</span>
    <span class="token comment">//读取TF卡方法</span>
    <span class="token class-name">String</span> <span class="token function">readTF</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//写入TF卡功能</span>
    <span class="token keyword">void</span> <span class="token function">writeTF</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//TF卡实现类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TFCardImpl</span> <span class="token keyword">implements</span> <span class="token class-name">TFCard</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">readTF</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> msg <span class="token operator">=</span><span class="token string">"tf card read msg : hello word tf card"</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> msg<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">writeTF</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"tf card write a msg : "</span> <span class="token operator">+</span> msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//定义适配器类（SD兼容TF）</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SDAdapterTF</span> <span class="token keyword">extends</span> <span class="token class-name">TFCardImpl</span> <span class="token keyword">implements</span> <span class="token class-name">SDCard</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">readSD</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"adapter read tf card "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">readTF</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">writeSD</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"adapter write tf card"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">writeTF</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//测试类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Computer</span> computer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Computer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">SDCard</span> sdCard <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SDCardImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>computer<span class="token punctuation">.</span><span class="token function">readSD</span><span class="token punctuation">(</span>sdCard<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">SDAdapterTF</span> adapter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SDAdapterTF</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>computer<span class="token punctuation">.</span><span class="token function">readSD</span><span class="token punctuation">(</span>adapter<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类适配器模式违背了合成复用原则。类适配器是客户类有一个接口规范的情况下可用，反之不可用。</p>
<h2 id="对象适配器模式" tabindex="-1"><a class="header-anchor" href="#对象适配器模式" aria-hidden="true">#</a> 对象适配器模式</h2>
<p>实现方式：对象适配器模式可釆用将现有组件库中已经实现的组件引入适配器类中，该类同时实现当前系统的业务接口。</p>
<p>【例】读卡器</p>
<p>我们使用对象适配器模式将读卡器的案例进行改写。类图如下：</p>
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/对象适配器模式.png" style="zoom:80%;" />
<p>代码如下：</p>
<p>类适配器模式的代码，我们只需要修改适配器类（SDAdapterTF）和测试类。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//创建适配器对象（SD兼容TF）</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SDAdapterTF</span>  <span class="token keyword">implements</span> <span class="token class-name">SDCard</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">TFCard</span> tfCard<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">SDAdapterTF</span><span class="token punctuation">(</span><span class="token class-name">TFCard</span> tfCard<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tfCard <span class="token operator">=</span> tfCard<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">readSD</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"adapter read tf card "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> tfCard<span class="token punctuation">.</span><span class="token function">readTF</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">writeSD</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"adapter write tf card"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        tfCard<span class="token punctuation">.</span><span class="token function">writeTF</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//测试类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Computer</span> computer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Computer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">SDCard</span> sdCard <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SDCardImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>computer<span class="token punctuation">.</span><span class="token function">readSD</span><span class="token punctuation">(</span>sdCard<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"------------"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">TFCard</span> tfCard <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TFCardImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">SDAdapterTF</span> adapter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SDAdapterTF</span><span class="token punctuation">(</span>tfCard<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>computer<span class="token punctuation">.</span><span class="token function">readSD</span><span class="token punctuation">(</span>adapter<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意：还有一个适配器模式是接口适配器模式。当不希望实现一个接口中所有的方法时，可以创建一个抽象类Adapter ，实现所有方法。而此时我们只需要继承该抽象类即可。</p>
</blockquote>
<h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2>
<ul>
<li>以前开发的系统存在满足新系统功能需求的类，但其接口同新系统的接口不一致。</li>
<li>使用第三方提供的组件，但组件接口定义和自己要求的接口定义不同。</li>
</ul>
<h2 id="jdk源码解析" tabindex="-1"><a class="header-anchor" href="#jdk源码解析" aria-hidden="true">#</a> JDK源码解析</h2>
<p>Reader（字符流）、InputStream（字节流）的适配使用的是InputStreamReader。</p>
<p>InputStreamReader继承自java.io包中的Reader，对他中的抽象的未实现的方法给出实现。如：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sd<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token keyword">char</span> cbuf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">int</span> offset<span class="token punctuation">,</span> <span class="token keyword">int</span> length<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> sd<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>cbuf<span class="token punctuation">,</span> offset<span class="token punctuation">,</span> length<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上代码中的sd（StreamDecoder类对象），在Sun的JDK实现中，实际的方法实现是对sun.nio.cs.StreamDecoder类的同名方法的调用封装。类结构图如下：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/适配器模式-jdk源码解析.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>从上图可以看出：</p>
<ul>
<li>InputStreamReader是对同样实现了Reader的StreamDecoder的封装。</li>
<li>StreamDecoder不是Java SE API中的内容，是Sun  JDK给出的自身实现。但我们知道他们对构造方法中的字节流类（InputStream）进行封装，并通过该类进行了字节流和字符流之间的解码转换。</li>
</ul>
<font color="red">结论：</font><p>​	从表层来看，InputStreamReader做了InputStream字节流类到Reader字符流之间的转换。而从如上Sun JDK中的实现类关系结构中可以看出，是StreamDecoder的设计实现在实际上采用了适配器模式。</p>
<h2 id="代理-v-s-桥接-v-s-装饰器-v-s-适配器" tabindex="-1"><a class="header-anchor" href="#代理-v-s-桥接-v-s-装饰器-v-s-适配器" aria-hidden="true">#</a> 代理 V.S 桥接 V.S 装饰器 V.S 适配器</h2>
<p>都可称为Wrapper模式，即通过Wrapper类二次封装原始类。代码结构相似，但要解决的问题、应用场景不同。</p>
<ul>
<li>代理模式不改变原始类接口的条件下，为原始类定义一个代理类，主要为控制访问，而非加强功能，这是和装饰器模式的最大不同</li>
<li>桥接模式将接口部分和实现部分分离，让它们更容易、也相对独立地改变</li>
<li>装饰器模式不改变原始类接口的情况下，对原始类功能进行增强，并且支持多个装饰器的嵌套使用</li>
<li>适配器模式适配器模式是一种事后的补救策略。适配器提供跟原始类不同的接口，而代理模式、装饰器模式提供的都是跟原始类相同的接口。</li>
</ul>
</div></template>


