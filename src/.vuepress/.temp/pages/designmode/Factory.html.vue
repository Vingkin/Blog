<template><div><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>需求：设计一个咖啡店点餐系统。</p>
<p>设计一个咖啡类（Coffee），并定义其两个子类（美式咖啡【AmericanCoffee】和拿铁咖啡【LatteCoffee】）；再设计一个咖啡店类（CoffeeStore），咖啡店具有点咖啡的功能。</p>
<p>具体类的设计如下：</p>
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/工厂设计模式引入.png" style="zoom:80%;" />
<p>在java中，万物皆对象，这些对象都需要创建，如果创建的时候直接new该对象，就会对该对象耦合严重，假如我们要更换对象，所有new对象的地方都需要修改一遍，这显然违背了软件设计的开闭原则。如果我们使用工厂来生产对象，我们就只和工厂打交道就可以了，彻底和对象解耦，如果要更换对象，直接在工厂里更换该对象即可，达到了与对象解耦的目的；所以说，工厂模式最大的优点就是：<strong>解耦</strong>。</p>
<p>在本教程中会介绍三种工厂的使用</p>
<ul>
<li>简单工厂模式（不属于GoF的23种经典设计模式）</li>
<li>工厂方法模式</li>
<li>抽象工厂模式</li>
</ul>
<h2 id="简单工厂模式" tabindex="-1"><a class="header-anchor" href="#简单工厂模式" aria-hidden="true">#</a> 简单工厂模式</h2>
<p>简单工厂不是一种设计模式，反而比较像是一种编程习惯。</p>
<h3 id="结构" tabindex="-1"><a class="header-anchor" href="#结构" aria-hidden="true">#</a> 结构</h3>
<p>简单工厂包含如下角色：</p>
<ul>
<li>抽象产品 ：定义了产品的规范，描述了产品的主要特性和功能。</li>
<li>具体产品 ：实现或者继承抽象产品的子类</li>
<li>具体工厂 ：提供了创建产品的方法，调用者通过该方法来获取产品。</li>
</ul>
<h3 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h3>
<p>现在使用简单工厂对上面案例进行改进，类图如下：</p>
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/简单工厂模式.png" style="zoom:70%;" />
<p>工厂类代码如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleCoffeeFactory</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Coffee</span> coffee <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">"americano"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            coffee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AmericanoCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">"latte"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            coffee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LatteCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"对不起，您所点的咖啡没有"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> coffee<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>工厂（factory）处理创建对象的细节，一旦有了SimpleCoffeeFactory，CoffeeStore类中的orderCoffee()就变成此对象的客户，后期如果需要Coffee对象直接从工厂中获取即可。这样也就解除了和Coffee实现类的耦合，同时又产生了新的耦合，CoffeeStore对象和SimpleCoffeeFactory工厂对象的耦合，工厂对象和商品对象的耦合。</p>
<p>后期如果再加新品种的咖啡，我们势必要需求修改SimpleCoffeeFactory的代码，违反了开闭原则。工厂类的客户端可能有很多，比如创建美团外卖等，这样只需要修改工厂类的代码，省去其他的修改操作。</p>
<h3 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点" aria-hidden="true">#</a> 优缺点</h3>
<p><strong>优点：</strong></p>
<p>封装了创建对象的过程，可以通过参数直接获取对象。把对象的创建和业务逻辑层分开，这样以后就避免了修改客户代码，如果要实现新产品直接修改工厂类，而不需要在原代码中修改，这样就降低了客户代码修改的可能性，更加容易扩展。</p>
<p><strong>缺点：</strong></p>
<p>增加新产品时还是需要修改工厂类的代码，<strong>违背了“开闭原则”</strong>。</p>
<h3 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展" aria-hidden="true">#</a> 扩展</h3>
<p><strong>静态工厂</strong></p>
<p>在开发中也有一部分人将工厂类中的创建对象的功能定义为静态的，这个就是静态工厂模式，它也不是23种设计模式中的。代码如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleCoffeeFactory</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Coffee</span> coffee <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">"americano"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            coffee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AmericanoCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token string">"latte"</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            coffee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LatteCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> coffe<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="工厂方法模式" tabindex="-1"><a class="header-anchor" href="#工厂方法模式" aria-hidden="true">#</a> 工厂方法模式</h2>
<p>针对上例中的缺点，使用工厂方法模式就可以完美的解决，完全遵循开闭原则。</p>
<h3 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h3>
<p>定义一个用于创建对象的接口，让子类决定实例化哪个产品类对象。工厂方法使一个产品类的实例化延迟到其工厂的子类。</p>
<h3 id="结构-1" tabindex="-1"><a class="header-anchor" href="#结构-1" aria-hidden="true">#</a> 结构</h3>
<p>工厂方法模式的主要角色：</p>
<ul>
<li>抽象工厂（Abstract Factory）：提供了创建产品的接口，调用者通过它访问具体工厂的工厂方法来创建产品。</li>
<li>具体工厂（ConcreteFactory）：主要是实现抽象工厂中的抽象方法，完成具体产品的创建。</li>
<li>抽象产品（Product）：定义了产品的规范，描述了产品的主要特性和功能。</li>
<li>具体产品（ConcreteProduct）：实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间一一对应。</li>
</ul>
<h3 id="实现-1" tabindex="-1"><a class="header-anchor" href="#实现-1" aria-hidden="true">#</a> 实现</h3>
<p>使用工厂方法模式对上例进行改进，类图如下：</p>
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/工厂方法模式.png" style="zoom:70%;" />
<p>代码如下：</p>
<p>咖啡抽象类：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Coffee</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addMilk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"add milk"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addSugar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"add sugar"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>咖啡具体类：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LatteCoffee</span> <span class="token keyword">extends</span> <span class="token class-name">Coffee</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"latte coffee"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>抽象工厂：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">CoffeeFactory</span> <span class="token punctuation">{</span>
    <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体工厂：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LatteCoffeeFactory</span> <span class="token keyword">implements</span> <span class="token class-name">CoffeeFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">LatteCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AmericanCoffeeFactory</span> <span class="token keyword">implements</span> <span class="token class-name">CoffeeFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AmericanCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>咖啡店类：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CoffeeStore</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">CoffeeFactory</span> factory<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">CoffeeStore</span><span class="token punctuation">(</span><span class="token class-name">CoffeeFactory</span> factory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>factory <span class="token operator">=</span> factory<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Coffee</span> <span class="token function">orderCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Coffee</span> coffee <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        coffee<span class="token punctuation">.</span><span class="token function">addMilk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        coffee<span class="token punctuation">.</span><span class="token function">addsugar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> coffee<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从以上的编写的代码可以看到，要增加产品类时也要相应地增加工厂类，不需要修改工厂类的代码了，这样就解决了简单工厂模式的缺点。</p>
<p>工厂方法模式是简单工厂模式的进一步抽象。由于使用了多态性，工厂方法模式保持了简单工厂模式的优点，而且克服了它的缺点。</p>
<h3 id="优缺点-1" tabindex="-1"><a class="header-anchor" href="#优缺点-1" aria-hidden="true">#</a> 优缺点</h3>
<p><strong>优点：</strong></p>
<ul>
<li>用户只需要知道具体工厂的名称就可得到所要的产品，无须知道产品的具体创建过程；</li>
<li>在系统增加新的产品时只需要添加具体产品类和对应的具体工厂类，无须对原工厂进行任何修改，满足开闭原则；</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>每增加一个产品就要增加一个具体产品类和一个对应的具体工厂类，这增加了系统的复杂度。</li>
</ul>
<h2 id="抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式" aria-hidden="true">#</a> 抽象工厂模式</h2>
<p>前面介绍的工厂方法模式中考虑的是一类产品的生产，如畜牧场只养动物、电视机厂只生产电视机、传智播客只培养计算机软件专业的学生等。</p>
<p>这些工厂只生产同种类产品，同种类产品称为同等级产品，也就是说：工厂方法模式只考虑生产同等级的产品，但是在现实生活中许多工厂是综合型的工厂，能生产多等级（种类） 的产品，如电器厂既生产电视机又生产洗衣机或空调，大学既有软件专业又有生物专业等。</p>
<p>本节要介绍的抽象工厂模式将考虑多等级产品的生产，将同一个具体工厂所生产的位于不同等级的一组产品称为一个产品族，下图所示横轴是产品等级，也就是同一类产品；纵轴是产品族，也就是同一品牌的产品，同一品牌的产品产自同一个工厂。</p>
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/image-20200401214509176.png" style="zoom:67%;" />
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/image-20200401222951963.png" style="zoom:67%;" />
<h3 id="概念-1" tabindex="-1"><a class="header-anchor" href="#概念-1" aria-hidden="true">#</a> 概念</h3>
<p>是一种为访问类提供一个创建一组相关或相互依赖对象的接口，且访问类无须指定所要产品的具体类就能得到同族的不同等级的产品的模式结构。</p>
<p>抽象工厂模式是工厂方法模式的升级版本，工厂方法模式只生产一个等级的产品，而抽象工厂模式可生产多个等级的产品。</p>
<h3 id="结构-2" tabindex="-1"><a class="header-anchor" href="#结构-2" aria-hidden="true">#</a> 结构</h3>
<p>抽象工厂模式的主要角色如下：</p>
<ul>
<li>抽象工厂（Abstract Factory）：提供了创建产品的接口，它包含多个创建产品的方法，可以创建多个不同等级的产品。</li>
<li>具体工厂（Concrete Factory）：主要是实现抽象工厂中的多个抽象方法，完成具体产品的创建。</li>
<li>抽象产品（Product）：定义了产品的规范，描述了产品的主要特性和功能，抽象工厂模式有多个抽象产品。</li>
<li>具体产品（ConcreteProduct）：实现了抽象产品角色所定义的接口，由具体工厂来创建，它 同具体工厂之间是多对一的关系。</li>
</ul>
<h3 id="实现-2" tabindex="-1"><a class="header-anchor" href="#实现-2" aria-hidden="true">#</a> 实现</h3>
<p>现咖啡店业务发生改变，不仅要生产咖啡还要生产甜点，如提拉米苏、抹茶慕斯等，要是按照工厂方法模式，需要定义提拉米苏类、抹茶慕斯类、提拉米苏工厂、抹茶慕斯工厂、甜点工厂类，很容易发生类爆炸情况。其中拿铁咖啡、美式咖啡是一个产品等级，都是咖啡；提拉米苏、抹茶慕斯也是一个产品等级；拿铁咖啡和提拉米苏是同一产品族（也就是都属于意大利风味），美式咖啡和抹茶慕斯是同一产品族（也就是都属于美式风味）。所以这个案例可以使用抽象工厂模式实现。类图如下：</p>
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/抽象工厂模式.png" style="zoom:67%;" />
<p>代码如下：</p>
<p>抽象工厂：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">DessertFactory</span> <span class="token punctuation">{</span>

    <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Dessert</span> <span class="token function">createDessert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体工厂：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//美式甜点工厂</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AmericanDessertFactory</span> <span class="token keyword">implements</span> <span class="token class-name">DessertFactory</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AmericanCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Dessert</span> <span class="token function">createDessert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MatchaMousse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//意大利风味甜点工厂</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ItalyDessertFactory</span> <span class="token keyword">implements</span> <span class="token class-name">DessertFactory</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">LatteCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Dessert</span> <span class="token function">createDessert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Tiramisu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要加同一个产品族的话，只需要再加一个对应的工厂类即可，不需要修改其他的类。</p>
<h3 id="优缺点-2" tabindex="-1"><a class="header-anchor" href="#优缺点-2" aria-hidden="true">#</a> 优缺点</h3>
<p><strong>优点：</strong></p>
<p>当一个产品族中的多个对象被设计成一起工作时，它能保证客户端始终只使用同一个产品族中的对象。</p>
<p><strong>缺点：</strong></p>
<p>当产品族中需要增加一个新的产品时，所有的工厂类都需要进行修改。</p>
<h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h3>
<ul>
<li>
<p>当需要创建的对象是一系列相互关联或相互依赖的产品族时，如电器工厂中的电视机、洗衣机、空调等。</p>
</li>
<li>
<p>系统中有多个产品族，但每次只使用其中的某一族产品。如有人只喜欢穿某一个品牌的衣服和鞋。</p>
</li>
<li>
<p>系统中提供了产品的类库，且所有产品的接口相同，客户端不依赖产品实例的创建细节和内部结构。</p>
</li>
</ul>
<p>如：输入法换皮肤，一整套一起换。生成不同操作系统的程序。</p>
<h2 id="模式扩展" tabindex="-1"><a class="header-anchor" href="#模式扩展" aria-hidden="true">#</a> 模式扩展</h2>
<p><strong>简单工厂+配置文件解除耦合</strong></p>
<p>可以通过工厂模式+配置文件的方式解除工厂对象和产品对象的耦合。在工厂类中加载配置文件中的全类名，并创建对象进行存储，客户端如果需要对象，直接进行获取即可。</p>
<p>第一步：定义配置文件</p>
<p>为了演示方便，我们使用properties文件作为配置文件，名称为bean.properties</p>
<div class="language-properties line-numbers-mode" data-ext="properties"><pre v-pre class="language-properties"><code><span class="token key attr-name">american</span><span class="token punctuation">=</span><span class="token value attr-value">com.itheima.pattern.factory.config_factory.AmericanCoffee</span>
<span class="token key attr-name">latte</span><span class="token punctuation">=</span><span class="token value attr-value">com.itheima.pattern.factory.config_factory.LatteCoffee</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步：改进工厂类</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CoffeeFactory</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Coffee</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token class-name">Properties</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">InputStream</span> is <span class="token operator">=</span> <span class="token class-name">CoffeeFactory</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getResourceAsStream</span><span class="token punctuation">(</span><span class="token string">"bean.properties"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            p<span class="token punctuation">.</span><span class="token function">load</span><span class="token punctuation">(</span>is<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 遍历Properties集合对象</span>
            <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> keys <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Object</span> key <span class="token operator">:</span> keys<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 根据键获取值（全类名）</span>
                <span class="token class-name">String</span> className <span class="token operator">=</span> p<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 获取字节码对象</span>
                <span class="token class-name">Class</span> clazz <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span>className<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">Coffee</span> obj <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Coffee</span><span class="token punctuation">)</span> clazz<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span>key<span class="token punctuation">,</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">return</span> map<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>静态成员变量用来存储创建的对象（键存储的是名称，值存储的是对应的对象），而读取配置文件以及创建对象写在静态代码块中，目的就是只需要执行一次。</p>
<h2 id="jdk源码解析-collection-iterator方法" tabindex="-1"><a class="header-anchor" href="#jdk源码解析-collection-iterator方法" aria-hidden="true">#</a> JDK源码解析-Collection.iterator方法</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"令狐冲"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"风清扬"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"任我行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//获取迭代器对象</span>
        <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> it <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">iterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//使用迭代器遍历</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>it<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">String</span> ele <span class="token operator">=</span> it<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>ele<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对上面的代码大家应该很熟，使用迭代器遍历集合，获取集合中的元素。而单列集合获取迭代器的方法就使用到了工厂方法模式。我们看通过类图看看结构：</p>
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/JDK源码解析.png" style="zoom:75%;" />
<p>Collection接口是抽象工厂类，ArrayList是具体的工厂类；Iterator接口是抽象商品类，ArrayList类中的Iter内部类是具体的商品类。在具体的工厂类中iterator()方法创建具体的商品类的对象。</p>
<blockquote>
<p>另：</p>
<p>​	1,DateForamt类中的getInstance()方法使用的是工厂模式；</p>
<p>​	2,Calendar类中的getInstance()方法使用的是工厂模式；</p>
</blockquote>
</div></template>


