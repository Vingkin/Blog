import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as p}from"./app-ee96bbef.js";const e={},t=p(`<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>将一个复杂对象的构建与表示分离，使得同样的构建过程可以创建不同的表示。</p><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/image-20200413225341516.png" style="zoom:60%;"><ul><li>分离了部件的<strong>构造</strong>(由Builder来负责)和<strong>装配</strong>(由Director负责)。 从而可以构造出复杂的对象。这个模式适用于：某个对象的构建过程复杂的情况。</li><li>由于实现了构建和装配的解耦。不同的构建器，相同的装配，也可以做出不同的对象；相同的构建器，不同的装配顺序也可以做出不同的对象。也就是实现了构建算法、装配算法的解耦，实现了更好的复用。</li><li>建造者模式可以将部件和其组装过程分开，一步一步创建一个复杂的对象。用户只需要指定复杂对象的类型就可以得到该对象，而无须知道其内部的具体构造细节。</li></ul><h2 id="结构" tabindex="-1"><a class="header-anchor" href="#结构" aria-hidden="true">#</a> 结构</h2><p>建造者（Builder）模式包含如下角色：</p><ul><li><p>抽象建造者类（Builder）：这个接口（可以是接口或者抽象类）规定要实现复杂对象的哪些部分的创建，并不涉及具体的部件对象的创建。</p></li><li><p>具体建造者类（ConcreteBuilder）：实现 Builder 接口，完成复杂产品的各个部件的具体创建方法。在构造过程完成后，提供产品的实例。</p></li><li><p>产品类（Product）：要创建的复杂对象。</p></li><li><p>指挥者类（Director）：调用具体建造者来创建复杂对象的各个部分，在指导者中不涉及具体产品的信息，只负责保证对象各部分完整创建或按某种顺序创建。</p></li></ul><p>类图如下：</p><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/建造者模式.png" style="zoom:80%;"><h2 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h2><p><strong>创建共享单车</strong></p><p>生产自行车是一个复杂的过程，它包含了车架，车座等组件的生产。而车架又有碳纤维，铝合金等材质的，车座有橡胶，真皮等材质。对于自行车的生产就可以使用建造者模式。</p><p>这里Bike是产品，包含车架，车座等组件；Builder是抽象建造者，MobikeBuilder和OfoBuilder是具体的建造者；Director是指挥者。类图如下：</p><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/建造者模式1.png" style="zoom:80%;"><p>具体的代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//自行车类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Bike</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> frame<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> seat<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> frame<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setFrame</span><span class="token punctuation">(</span><span class="token class-name">String</span> frame<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>frame <span class="token operator">=</span> frame<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getSeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> seat<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setSeat</span><span class="token punctuation">(</span><span class="token class-name">String</span> seat<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>seat <span class="token operator">=</span> seat<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 抽象 builder 类 （定义各种抽象组件）</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>

    <span class="token keyword">protected</span> <span class="token class-name">Bike</span> mBike <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Bike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildSeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">Bike</span> <span class="token function">createBike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//摩拜单车Builder类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MobikeBuilder</span> <span class="token keyword">extends</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buildFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mBike<span class="token punctuation">.</span><span class="token function">setFrame</span><span class="token punctuation">(</span><span class="token string">&quot;铝合金车架&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buildSeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mBike<span class="token punctuation">.</span><span class="token function">setSeat</span><span class="token punctuation">(</span><span class="token string">&quot;真皮车座&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Bike</span> <span class="token function">createBike</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> mBike<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//ofo单车Builder类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OfoBuilder</span> <span class="token keyword">extends</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buildFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mBike<span class="token punctuation">.</span><span class="token function">setFrame</span><span class="token punctuation">(</span><span class="token string">&quot;碳纤维车架&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buildSeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mBike<span class="token punctuation">.</span><span class="token function">setSeat</span><span class="token punctuation">(</span><span class="token string">&quot;橡胶车座&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Bike</span> <span class="token function">createBike</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> mBike<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//指挥者类 （对组件进行一定顺序的组装）</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Director</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Builder</span> mBuilder<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Director</span><span class="token punctuation">(</span><span class="token class-name">Builder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mBuilder <span class="token operator">=</span> builder<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Bike</span> <span class="token function">construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mBuilder<span class="token punctuation">.</span><span class="token function">buildFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        mBuilder<span class="token punctuation">.</span><span class="token function">buildSeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> mBuilder<span class="token punctuation">.</span><span class="token function">createBike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//测试类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">showBike</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OfoBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">showBike</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MobikeBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">showBike</span><span class="token punctuation">(</span><span class="token class-name">Builder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Director</span> director <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Director</span><span class="token punctuation">(</span>builder<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Bike</span> bike <span class="token operator">=</span> director<span class="token punctuation">.</span><span class="token function">construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>bike<span class="token punctuation">.</span><span class="token function">getFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>bike<span class="token punctuation">.</span><span class="token function">getSeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong></p><p>上面示例是 Builder模式的常规用法，指挥者类 Director 在建造者模式中具有很重要的作用，它用于指导具体构建者如何构建产品，控制调用先后次序，并向调用者返回完整的产品类，但是有些情况下需要简化系统结构，可以把指挥者类和抽象建造者进行结合</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 抽象 builder 类</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>

    <span class="token keyword">protected</span> <span class="token class-name">Bike</span> mBike <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Bike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">buildSeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">Bike</span> <span class="token function">createBike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">Bike</span> <span class="token function">construct</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">buildFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name"><span class="token namespace">this<span class="token punctuation">.</span></span>BuildSeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createBike</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>说明：</strong></p><p>这样做确实简化了系统结构，但同时也加重了抽象建造者类的职责，也不是太符合单一职责原则，如果construct() 过于复杂，建议还是封装到 Director 中。</p><h2 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点" aria-hidden="true">#</a> 优缺点</h2><p><strong>优点：</strong></p><ul><li>建造者模式的封装性很好。使用建造者模式可以有效的封装变化，在使用建造者模式的场景中，一般产品类和建造者类是比较稳定的，因此，将主要的业务逻辑封装在指挥者类中对整体而言可以取得比较好的稳定性。</li><li>在建造者模式中，客户端不必知道产品内部组成的细节，将产品本身与产品的创建过程解耦，使得相同的创建过程可以创建不同的产品对象。</li><li>可以更加精细地控制产品的创建过程 。将复杂产品的创建步骤分解在不同的方法中，使得创建过程更加清晰，也更方便使用程序来控制创建过程。</li><li>建造者模式很容易进行扩展。如果有新的需求，通过实现一个新的建造者类就可以完成，基本上不用修改之前已经测试通过的代码，因此也就不会对原有功能引入风险。符合开闭原则。</li></ul><p><strong>缺点：</strong></p><p>造者模式所创建的产品一般具有较多的共同点，其组成部分相似，如果产品之间的差异性很大，则不适合使用建造者模式，因此其使用范围受到一定的限制。</p><h2 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h2><p>建造者（Builder）模式创建的是复杂对象，其产品的各个部分经常面临着剧烈的变化，但将它们组合在一起的算法却相对稳定，所以它通常在以下场合使用。</p><ul><li>创建的对象较复杂，由多个部件构成，各部件面临着复杂的变化，但构件间的建造顺序是稳定的。</li><li>创建复杂对象的算法独立于该对象的组成部分以及它们的装配方式，即产品的构建过程和最终的表示是独立的。</li></ul><h2 id="模式扩展" tabindex="-1"><a class="header-anchor" href="#模式扩展" aria-hidden="true">#</a> 模式扩展</h2><p>建造者模式除了上面的用途外，在开发中还有一个常用的使用方式，就是当一个类构造器需要传入很多参数时，如果创建这个类的实例，代码可读性会非常差，而且很容易引入错误，此时就可以利用建造者模式进行重构。</p><p>重构前代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> cpu<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> screen<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> memory<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> mainboard<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Phone</span><span class="token punctuation">(</span><span class="token class-name">String</span> cpu<span class="token punctuation">,</span> <span class="token class-name">String</span> screen<span class="token punctuation">,</span> <span class="token class-name">String</span> memory<span class="token punctuation">,</span> <span class="token class-name">String</span> mainboard<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cpu <span class="token operator">=</span> cpu<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>screen <span class="token operator">=</span> screen<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>memory <span class="token operator">=</span> memory<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>mainboard <span class="token operator">=</span> mainboard<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getCpu</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> cpu<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setCpu</span><span class="token punctuation">(</span><span class="token class-name">String</span> cpu<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cpu <span class="token operator">=</span> cpu<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getScreen</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> screen<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setScreen</span><span class="token punctuation">(</span><span class="token class-name">String</span> screen<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>screen <span class="token operator">=</span> screen<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> memory<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setMemory</span><span class="token punctuation">(</span><span class="token class-name">String</span> memory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>memory <span class="token operator">=</span> memory<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getMainboard</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> mainboard<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setMainboard</span><span class="token punctuation">(</span><span class="token class-name">String</span> mainboard<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>mainboard <span class="token operator">=</span> mainboard<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Phone{&quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;cpu=&#39;&quot;</span> <span class="token operator">+</span> cpu <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, screen=&#39;&quot;</span> <span class="token operator">+</span> screen <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, memory=&#39;&quot;</span> <span class="token operator">+</span> memory <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, mainboard=&#39;&quot;</span> <span class="token operator">+</span> mainboard <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token char">&#39;}&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//构建Phone对象</span>
        <span class="token class-name">Phone</span> phone <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Phone</span><span class="token punctuation">(</span><span class="token string">&quot;intel&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;三星屏幕&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;金士顿&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;华硕&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面在客户端代码中构建Phone对象，传递了四个参数，如果参数更多呢？代码的可读性及使用的成本就是比较高。</p><p>重构后代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Phone</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> cpu<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> screen<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> memory<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> mainboard<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Phone</span><span class="token punctuation">(</span><span class="token class-name">Builder</span> builder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        cpu <span class="token operator">=</span> builder<span class="token punctuation">.</span>cpu<span class="token punctuation">;</span>
        screen <span class="token operator">=</span> builder<span class="token punctuation">.</span>screen<span class="token punctuation">;</span>
        memory <span class="token operator">=</span> builder<span class="token punctuation">.</span>memory<span class="token punctuation">;</span>
        mainboard <span class="token operator">=</span> builder<span class="token punctuation">.</span>mainboard<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> cpu<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> screen<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> memory<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> mainboard<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">cpu</span><span class="token punctuation">(</span><span class="token class-name">String</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            cpu <span class="token operator">=</span> val<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">screen</span><span class="token punctuation">(</span><span class="token class-name">String</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            screen <span class="token operator">=</span> val<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">memory</span><span class="token punctuation">(</span><span class="token class-name">String</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            memory <span class="token operator">=</span> val<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">mainboard</span><span class="token punctuation">(</span><span class="token class-name">String</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            mainboard <span class="token operator">=</span> val<span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">public</span> <span class="token class-name">Phone</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Phone</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Phone{&quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;cpu=&#39;&quot;</span> <span class="token operator">+</span> cpu <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, screen=&#39;&quot;</span> <span class="token operator">+</span> screen <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, memory=&#39;&quot;</span> <span class="token operator">+</span> memory <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token string">&quot;, mainboard=&#39;&quot;</span> <span class="token operator">+</span> mainboard <span class="token operator">+</span> <span class="token char">&#39;\\&#39;&#39;</span> <span class="token operator">+</span>
                <span class="token char">&#39;}&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Phone</span> phone <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Phone<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">cpu</span><span class="token punctuation">(</span><span class="token string">&quot;intel&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">mainboard</span><span class="token punctuation">(</span><span class="token string">&quot;华硕&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">memory</span><span class="token punctuation">(</span><span class="token string">&quot;金士顿&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">screen</span><span class="token punctuation">(</span><span class="token string">&quot;三星&quot;</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重构后的代码在使用起来更方便，某种程度上也可以提高开发效率。从软件设计上，对程序员的要求比较高。</p><h2 id="创建者模式对比" tabindex="-1"><a class="header-anchor" href="#创建者模式对比" aria-hidden="true">#</a> 创建者模式对比</h2><h3 id="工厂方法模式vs建造者模式" tabindex="-1"><a class="header-anchor" href="#工厂方法模式vs建造者模式" aria-hidden="true">#</a> 工厂方法模式VS建造者模式</h3><p>工厂方法模式注重的是整体对象的创建方式；而建造者模式注重的是部件构建的过程，意在通过一步一步地精确构造创建出一个复杂的对象。</p><p>我们举个简单例子来说明两者的差异，如要制造一个超人，如果使用工厂方法模式，直接产生出来的就是一个力大无穷、能够飞翔、内裤外穿的超人；而如果使用建造者模式，则需要组装手、头、脚、躯干等部分，然后再把内裤外穿，于是一个超人就诞生了。</p><h3 id="抽象工厂模式vs建造者模式" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式vs建造者模式" aria-hidden="true">#</a> 抽象工厂模式VS建造者模式</h3><p>抽象工厂模式实现对产品家族的创建，一个产品家族是这样的一系列产品：具有不同分类维度的产品组合，采用抽象工厂模式则是不需要关心构建过程，只关心什么产品由什么工厂生产即可。</p><p>建造者模式则是要求按照指定的蓝图建造产品，它的主要目的是通过组装零配件而产生一个新产品。</p><p>如果将抽象工厂模式看成汽车配件生产工厂，生产一个产品族的产品，那么建造者模式就是一个汽车组装工厂，通过对部件的组装可以返回一辆完整的汽车。</p>`,45),c=[t];function o(i,l){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","Builder.html.vue"]]);export{r as default};
