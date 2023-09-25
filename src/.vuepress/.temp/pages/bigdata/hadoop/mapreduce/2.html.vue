<template><div><h2 id="_1-mapreduce-partition分区" tabindex="-1"><a class="header-anchor" href="#_1-mapreduce-partition分区" aria-hidden="true">#</a> 1. MapReduce Partition分区</h2>
<blockquote>
<p>注意分区与分组的区别，分区的目的是通过设置ReduceTask的数量将数据输出到不同的文件中。而每一个分组调用一次reduce程序。</p>
</blockquote>
<p>输出文件的个数与ReduceTask个数是一种对等关系，有几个ReduceTask，最终程序就输出几个文件。</p>
<p>对于MapTask究竟给哪个ReduceTask处理，这就是<strong>数据分区</strong>问题。</p>
<p>可以自己制定ReduceTask的个数：</p>
<ul>
<li><code v-pre>job.setNumReduceTasks(3);</code></li>
</ul>
<p>MapReduce的默认分区规则是HashPartitioner，也就是用key的哈希值对ReduceTask个数进行取模，与int最大值是为了避免哈希值为负的情况。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@InterfaceAudience.Public</span>
<span class="token annotation punctuation">@InterfaceStability.Stable</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HashPartitioner</span><span class="token generics"><span class="token punctuation">&lt;</span>K2<span class="token punctuation">,</span> V2<span class="token punctuation">></span></span> <span class="token keyword">implements</span> <span class="token class-name">Partitioner</span><span class="token generics"><span class="token punctuation">&lt;</span>K2<span class="token punctuation">,</span> V2<span class="token punctuation">></span></span> <span class="token punctuation">{</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">JobConf</span> job<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token doc-comment comment">/** Use <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Object</span><span class="token punctuation">#</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span> to partition. */</span>
  <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getPartition</span><span class="token punctuation">(</span><span class="token class-name">K2</span> key<span class="token punctuation">,</span> <span class="token class-name">V2</span> value<span class="token punctuation">,</span>
                          <span class="token keyword">int</span> numReduceTasks<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">)</span> <span class="token operator">%</span> numReduceTasks<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意事项：</p>
<ul>
<li><strong>ReduceTask个数的改变导致了数据分区的产生，而不是有数据分区导致了reducetask个数改变。</strong></li>
<li>数据分区的核心是分区规则。即如何分配数据给各个ReduceTask。</li>
<li>默认的规则可以保证只要map阶段输出的key一样，数据就一定可以分区到同一个ReduceTask，但是不能保证数据平均分区。</li>
<li>ReduceTask个数的改变还会导致输出结果文件不再是一个整体，而是输出到多个文件中。</li>
</ul>
<h2 id="_2-mapreduce-combiner规约" tabindex="-1"><a class="header-anchor" href="#_2-mapreduce-combiner规约" aria-hidden="true">#</a> 2. MapReduce Combiner规约</h2>
<blockquote>
<p>数据归约是指在尽可能保持数据原貌的前提下，最大限度地精简数据量。</p>
</blockquote>
<p>产生的原因：跨网络传递的资源消耗</p>
<p><strong>Combiner的作用就是对map端的输出先做一次局部合并，以减少在map和reduce节点之间的数据传输量。</strong></p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251618427.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-1-combiner组件的使用" tabindex="-1"><a class="header-anchor" href="#_2-1-combiner组件的使用" aria-hidden="true">#</a> 2.1 Combiner组件的使用</h3>
<p>Combiner默认不开启，其本质就是Reducer</p>
<p>具体实现步骤：</p>
<ul>
<li>自定义一个CustomCombiner类，继承Reducer，重写reduce方法</li>
<li>job.setCombinerClass(CustomCombiner.class)</li>
</ul>
<p>注意事项：</p>
<ul>
<li>
<p>Combiner能够应用的前提是不能影响最终的业务逻辑，而且，Combiner的输出kv应该跟reducer的输入kv类型要对应起来。</p>
</li>
<li>
<p>下述场景禁止使用Combiner，因为这样不仅优化了网络传输数据量，还改变了最终的执行结果</p>
<ul>
<li>
<p>业务和数据个数相关的。</p>
</li>
<li>
<p>业务和整体排序相关的。</p>
</li>
</ul>
</li>
<li>
<p>Combiner组件不是禁用，而是<strong>慎用</strong>。用的好提高程序性能，用不好，改变程序结果且不易发现。</p>
</li>
</ul>
<h2 id="_3-covid-19病例统计" tabindex="-1"><a class="header-anchor" href="#_3-covid-19病例统计" aria-hidden="true">#</a> 3. COVID-19病例统计</h2>
<h3 id="_3-1-各州累计病例数量统计" tabindex="-1"><a class="header-anchor" href="#_3-1-各州累计病例数量统计" aria-hidden="true">#</a> 3.1 各州累计病例数量统计</h3>
<blockquote>
<p>统计美国2021-01-28，每个州state累计确诊案例数、累计死亡案例数。</p>
<p><strong>自定义JavaBean实现Writable接口来实现Hadoop的序列化机制</strong></p>
</blockquote>
<p>需求分析：</p>
<ul>
<li>
<p>自定义对象CovidCountBean，用于封装每个县的确诊病例数和死亡病例数。</p>
</li>
<li>
<p>注意自定义对象需要实现Hadoop的序列化机制。</p>
</li>
<li>
<p>以州作为map阶段输出的key,以CovidCountBean作为value，这样属于同一个州的数据就会变成一组进行reduce处理，进行累加即可得出每个州累计确诊病例。</p>
</li>
</ul>
<p>CovidCountBean.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * @Author: Vingkin
 * @Date: Create in 16:58 2021/8/3
 * @Description: 自定义对象作为数据类型在MapReduce中传递，注意实现Hadoop的序列化机制
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CovidCountBean</span> <span class="token keyword">implements</span> <span class="token class-name">Writable</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">long</span> cases<span class="token punctuation">;</span> <span class="token comment">// 确诊病例数</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> deaths<span class="token punctuation">;</span> <span class="token comment">// 死亡病例数</span>
    
    <span class="token comment">// 构造函数 set get 。。。</span>

    <span class="token doc-comment comment">/**
     * 自己封装的set方法，用于对象的属性赋值
     * <span class="token keyword">@param</span> <span class="token parameter">cases</span>
     * <span class="token keyword">@param</span> <span class="token parameter">deaths</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">long</span> cases<span class="token punctuation">,</span> <span class="token keyword">long</span> deaths<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cases <span class="token operator">=</span> cases<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>deaths <span class="token operator">=</span> deaths<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> cases <span class="token operator">+</span> <span class="token string">"\t"</span> <span class="token operator">+</span> deaths<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 序列化方法，控制那些字段序列化出去
     * <span class="token keyword">@param</span> <span class="token parameter">out</span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IOException</span></span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token class-name">DataOutput</span> out<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        out<span class="token punctuation">.</span><span class="token function">writeLong</span><span class="token punctuation">(</span>cases<span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">writeLong</span><span class="token punctuation">(</span>deaths<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 反序列化方法，todo 反序列化的顺序与序列化一致 也就是必须先写cases后写deaths
     * <span class="token keyword">@param</span> <span class="token parameter">in</span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IOException</span></span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">readFields</span><span class="token punctuation">(</span><span class="token class-name">DataInput</span> in<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cases <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">readLong</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>deaths <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">readLong</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CovidSumMapper.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CovidSumMapper</span> <span class="token keyword">extends</span> <span class="token class-name">Mapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LongWritable</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">CovidCountBean</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token class-name">Text</span> outKey <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">CovidCountBean</span> outValue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CovidCountBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">LongWritable</span> key<span class="token punctuation">,</span> <span class="token class-name">Text</span> value<span class="token punctuation">,</span> <span class="token class-name">Mapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LongWritable</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">CovidCountBean</span><span class="token punctuation">></span></span><span class="token punctuation">.</span>Context context<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1. 读取一行数据进行切割</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> fields <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">","</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2. 提取数据 州 确诊数 死亡数</span>
        outKey<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>fields<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        outValue<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">parseLong</span><span class="token punctuation">(</span>fields<span class="token punctuation">[</span>fields<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">parseLong</span><span class="token punctuation">(</span>fields<span class="token punctuation">[</span>fields<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        context<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>outKey<span class="token punctuation">,</span> outValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CovidSumReducer.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CovidSumReducer</span> <span class="token keyword">extends</span> <span class="token class-name">Reducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">CovidCountBean</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">CovidCountBean</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">CovidCountBean</span> outValue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CovidCountBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">reduce</span><span class="token punctuation">(</span><span class="token class-name">Text</span> key<span class="token punctuation">,</span> <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CovidCountBean</span><span class="token punctuation">></span></span> values<span class="token punctuation">,</span> <span class="token class-name">Reducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">CovidCountBean</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">CovidCountBean</span><span class="token punctuation">></span></span><span class="token punctuation">.</span>Context context<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">long</span> countCases <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> countDeaths <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">CovidCountBean</span> value <span class="token operator">:</span> values<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            countCases <span class="token operator">+=</span> value<span class="token punctuation">.</span><span class="token function">getCases</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            countDeaths <span class="token operator">+=</span> value<span class="token punctuation">.</span><span class="token function">getDeath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        outValue<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>countCases<span class="token punctuation">,</span> countDeaths<span class="token punctuation">)</span><span class="token punctuation">;</span>
        context<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> outValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CovidSumDriver.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CovidSumDriver</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">//配置文件对象</span>
        <span class="token class-name">Configuration</span> conf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建作业实例</span>
        <span class="token class-name">Job</span> job <span class="token operator">=</span> <span class="token class-name">Job</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>conf<span class="token punctuation">,</span> <span class="token class-name">CovidSumDriver</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置作业驱动类</span>
        job<span class="token punctuation">.</span><span class="token function">setJarByClass</span><span class="token punctuation">(</span><span class="token class-name">CovidSumDriver</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置作业mapper reducer类</span>
        job<span class="token punctuation">.</span><span class="token function">setMapperClass</span><span class="token punctuation">(</span><span class="token class-name">CovidSumMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setReducerClass</span><span class="token punctuation">(</span><span class="token class-name">CovidSumReducer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置作业mapper阶段输出key value数据类型</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputKeyClass</span><span class="token punctuation">(</span><span class="token class-name">Text</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputValueClass</span><span class="token punctuation">(</span><span class="token class-name">CovidCountBean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置作业reducer阶段输出key value数据类型 也就是程序最终输出数据类型</span>
        job<span class="token punctuation">.</span><span class="token function">setOutputKeyClass</span><span class="token punctuation">(</span><span class="token class-name">Text</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setOutputValueClass</span><span class="token punctuation">(</span><span class="token class-name">CovidCountBean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 配置作业的输入数据路径</span>
        <span class="token class-name">FileInputFormat</span><span class="token punctuation">.</span><span class="token function">addInputPath</span><span class="token punctuation">(</span>job<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 配置作业的输出数据路径</span>
        <span class="token class-name">FileOutputFormat</span><span class="token punctuation">.</span><span class="token function">setOutputPath</span><span class="token punctuation">(</span>job<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//判断输出路径是否存在 如果存在删除</span>
        <span class="token class-name">FileSystem</span> fs <span class="token operator">=</span> <span class="token class-name">FileSystem</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>conf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fs<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 提交作业并等待执行完成</span>
        <span class="token keyword">boolean</span> resultFlag <span class="token operator">=</span> job<span class="token punctuation">.</span><span class="token function">waitForCompletion</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//程序退出</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span>resultFlag <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-各州累计病例分区统计" tabindex="-1"><a class="header-anchor" href="#_3-2-各州累计病例分区统计" aria-hidden="true">#</a> 3.2 各州累计病例分区统计</h3>
<blockquote>
<p>将美国疫情数据不同州的输出到不同文件中，属于同一个州的各个县输出到同一个结果文件中</p>
<p><strong>这个主要考察的就是自定义分区的实现，而且分区数=ReduceTask数</strong></p>
</blockquote>
<p>需求分析：</p>
<ul>
<li>输出到不同文件中--&gt;reducetask有多个（&gt;2）--&gt;默认只有1个，如何有多个？---&gt;可以设置，job.setNumReduceTasks(N)---&gt;当有多个reducetask 意味着数据分区----&gt;默认分区规则是什么？ hashPartitioner---&gt;默认分区规则符合你的业务需求么？----&gt;符合，直接使用---&gt;不符合，自定义分区。</li>
</ul>
<p>StatePartitioner.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * @Author: Vingkin
 * @Date: Create in 19:58 2021/8/3
 * @Description: 自定义分区规则
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StatePartitioner</span> <span class="token keyword">extends</span> <span class="token class-name">Partitioner</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token comment">// 模拟美国各州的数据字典 实际中可以通过redis来实现 如果数据量不大 也可以创建数据集合保存</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span> stateMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        stateMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"Alabama"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stateMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"Alaska"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stateMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"Arkansas"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stateMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"California"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stateMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"Colorado"</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 自定义分区器中分区规则的实现方法 只要getPartition返回的int一样 数据就会被分到同一个分区
     * 所谓的同一个分区指的是数据由同一个ReduceTask来处理
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> state
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 文本数据
     * <span class="token keyword">@param</span> <span class="token parameter">numPartitions</span>
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getPartition</span><span class="token punctuation">(</span><span class="token class-name">Text</span> key<span class="token punctuation">,</span> <span class="token class-name">Text</span> value<span class="token punctuation">,</span> <span class="token keyword">int</span> numPartitions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Integer</span> code <span class="token operator">=</span> stateMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>code <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> code<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token number">5</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CovidPartitionMapper.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CovidPartitionMapper</span> <span class="token keyword">extends</span> <span class="token class-name">Mapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LongWritable</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Text</span> outKey <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">LongWritable</span> key<span class="token punctuation">,</span> <span class="token class-name">Text</span> value<span class="token punctuation">,</span> <span class="token class-name">Mapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LongWritable</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">></span></span><span class="token punctuation">.</span>Context context<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> split <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">","</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        outKey<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>split<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        context<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>outKey<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CovidPartitionReducer.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CovidPartitionReducer</span> <span class="token keyword">extends</span> <span class="token class-name">Reducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">NullWritable</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">reduce</span><span class="token punctuation">(</span><span class="token class-name">Text</span> key<span class="token punctuation">,</span> <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span><span class="token punctuation">></span></span> values<span class="token punctuation">,</span> <span class="token class-name">Reducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">NullWritable</span><span class="token punctuation">></span></span><span class="token punctuation">.</span>Context context<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Text</span> value <span class="token operator">:</span> values<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            context<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token class-name">NullWritable</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CovidPartitionDriver.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CovidPartitionDriver</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">//配置文件对象</span>
        <span class="token class-name">Configuration</span> conf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建作业实例</span>
        <span class="token class-name">Job</span> job <span class="token operator">=</span> <span class="token class-name">Job</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>conf<span class="token punctuation">,</span> <span class="token class-name">CovidPartitionDriver</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置作业驱动类</span>
        job<span class="token punctuation">.</span><span class="token function">setJarByClass</span><span class="token punctuation">(</span><span class="token class-name">CovidPartitionDriver</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置作业mapper reducer类</span>
        job<span class="token punctuation">.</span><span class="token function">setMapperClass</span><span class="token punctuation">(</span><span class="token class-name">CovidPartitionMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setReducerClass</span><span class="token punctuation">(</span><span class="token class-name">CovidPartitionReducer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置作业mapper阶段输出key value数据类型</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputKeyClass</span><span class="token punctuation">(</span><span class="token class-name">Text</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputValueClass</span><span class="token punctuation">(</span><span class="token class-name">Text</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置作业reducer阶段输出key value数据类型 也就是程序最终输出数据类型</span>
        job<span class="token punctuation">.</span><span class="token function">setOutputKeyClass</span><span class="token punctuation">(</span><span class="token class-name">Text</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setOutputValueClass</span><span class="token punctuation">(</span><span class="token class-name">NullWritable</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        job<span class="token punctuation">.</span><span class="token function">setNumReduceTasks</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 配置作业的输入数据路径</span>
        <span class="token class-name">FileInputFormat</span><span class="token punctuation">.</span><span class="token function">addInputPath</span><span class="token punctuation">(</span>job<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 配置作业的输出数据路径</span>
        <span class="token class-name">FileOutputFormat</span><span class="token punctuation">.</span><span class="token function">setOutputPath</span><span class="token punctuation">(</span>job<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//判断输出路径是否存在 如果存在删除</span>
        <span class="token class-name">FileSystem</span> fs <span class="token operator">=</span> <span class="token class-name">FileSystem</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>conf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fs<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 提交作业并等待执行完成</span>
        <span class="token keyword">boolean</span> resultFlag <span class="token operator">=</span> job<span class="token punctuation">.</span><span class="token function">waitForCompletion</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//程序退出</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span>resultFlag <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-各州累计病例数最多top1县" tabindex="-1"><a class="header-anchor" href="#_3-3-各州累计病例数最多top1县" aria-hidden="true">#</a> 3.3 各州累计病例数最多top1县</h3>
<blockquote>
<p>统计美国2021-01-28，每个州state的确诊案例数最多的县是哪一个</p>
<p><strong>主要考察的就是自定义分组的实现，每个州按cases倒序分成一组，当reduce进行处理的时候，迭代器的第一个数据就是cases最多的县，迭代器中的值与key是一一对应的。</strong></p>
</blockquote>
<p>需求分析：</p>
<ul>
<li>在map阶段将“州state、县county、县确诊病例cases”通过自定义对象封装，作为key输出；</li>
<li>重写对象的排序规则，首先根据州的正序排序，如果州相等，按照确诊病例数cases倒序排序，发送到reduce。</li>
<li>在reduce端利用自定义分组规则，将州state相同的分为一组，然后取第一个即是最大值。</li>
</ul>
<p>CovidTop1GroupingComparator.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * @Author: Vingkin
 * @Date: Create in 11:07 2021/8/4
 * @Description: 自定义分组规则，州相同的为一组
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CovidTop1GroupingComparator</span> <span class="token keyword">extends</span> <span class="token class-name">WritableComparator</span> <span class="token punctuation">{</span>

    <span class="token keyword">protected</span> <span class="token class-name">CovidTop1GroupingComparator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token class-name">CovidTop1Bean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 允许创建对象实例</span>
    <span class="token punctuation">}</span>
	
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compare</span><span class="token punctuation">(</span><span class="token class-name">WritableComparable</span> a<span class="token punctuation">,</span> <span class="token class-name">WritableComparable</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">CovidTop1Bean</span> aBean <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">CovidTop1Bean</span><span class="token punctuation">)</span> a<span class="token punctuation">;</span>
        <span class="token class-name">CovidTop1Bean</span> bBean <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">CovidTop1Bean</span><span class="token punctuation">)</span> b<span class="token punctuation">;</span>
        <span class="token keyword">return</span> aBean<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>bBean<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CovidTop1Bean.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CovidTop1Bean</span> <span class="token keyword">implements</span> <span class="token class-name">WritableComparable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CovidTop1Bean</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> state<span class="token punctuation">;</span> <span class="token comment">// 州</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> county<span class="token punctuation">;</span> <span class="token comment">// 县</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> cases<span class="token punctuation">;</span> <span class="token comment">// 确诊病例</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">String</span> state<span class="token punctuation">,</span> <span class="token class-name">String</span> county<span class="token punctuation">,</span> <span class="token keyword">long</span> cases<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>county <span class="token operator">=</span> county<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cases <span class="token operator">=</span> cases<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">compareTo</span><span class="token punctuation">(</span><span class="token class-name">CovidTop1Bean</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> result<span class="token punctuation">;</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span><span class="token function">compareTo</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 州相等的情况，根据cases进行倒序排序</span>
            result <span class="token operator">=</span> <span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">compare</span><span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">getCases</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>cases<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token class-name">DataOutput</span> out<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        out<span class="token punctuation">.</span><span class="token function">writeUTF</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">writeUTF</span><span class="token punctuation">(</span>county<span class="token punctuation">)</span><span class="token punctuation">;</span>
        out<span class="token punctuation">.</span><span class="token function">writeLong</span><span class="token punctuation">(</span>cases<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">readFields</span><span class="token punctuation">(</span><span class="token class-name">DataInput</span> in<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">readUTF</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>county <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">readUTF</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>cases <span class="token operator">=</span> in<span class="token punctuation">.</span><span class="token function">readLong</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> state <span class="token operator">+</span> <span class="token string">"\t"</span> <span class="token operator">+</span> county <span class="token operator">+</span> <span class="token string">"\t"</span> <span class="token operator">+</span> cases<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CovidTop1Mapper.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CovidTop1Mapper</span> <span class="token keyword">extends</span> <span class="token class-name">Mapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LongWritable</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">CovidTop1Bean</span><span class="token punctuation">,</span> <span class="token class-name">NullWritable</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token class-name">CovidTop1Bean</span> outKey <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CovidTop1Bean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">NullWritable</span> outValue <span class="token operator">=</span> <span class="token class-name">NullWritable</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">LongWritable</span> key<span class="token punctuation">,</span> <span class="token class-name">Text</span> value<span class="token punctuation">,</span> <span class="token class-name">Mapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LongWritable</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">CovidTop1Bean</span><span class="token punctuation">,</span> <span class="token class-name">NullWritable</span><span class="token punctuation">></span></span><span class="token punctuation">.</span>Context context<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> fields <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">","</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        outKey<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>fields<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fields<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">parseLong</span><span class="token punctuation">(</span>fields<span class="token punctuation">[</span>fields<span class="token punctuation">.</span>length<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        context<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>outKey<span class="token punctuation">,</span> outValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CovidTop1Reducer.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>vingkin<span class="token punctuation">.</span>mapreduce<span class="token punctuation">.</span>covid<span class="token punctuation">.</span>top1</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CovidTop1Reducer</span> <span class="token keyword">extends</span> <span class="token class-name">Reducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CovidTop1Bean</span><span class="token punctuation">,</span> <span class="token class-name">NullWritable</span><span class="token punctuation">,</span> <span class="token class-name">CovidTop1Bean</span><span class="token punctuation">,</span> <span class="token class-name">NullWritable</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">reduce</span><span class="token punctuation">(</span><span class="token class-name">CovidTop1Bean</span> key<span class="token punctuation">,</span> <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">NullWritable</span><span class="token punctuation">></span></span> values<span class="token punctuation">,</span> <span class="token class-name">Reducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CovidTop1Bean</span><span class="token punctuation">,</span> <span class="token class-name">NullWritable</span><span class="token punctuation">,</span> <span class="token class-name">CovidTop1Bean</span><span class="token punctuation">,</span> <span class="token class-name">NullWritable</span><span class="token punctuation">></span></span><span class="token punctuation">.</span>Context context<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">NullWritable</span> value <span class="token operator">:</span> values<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        context<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token class-name">NullWritable</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CovidTop1Driver.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CovidTop1Driver</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">//配置文件对象</span>
        <span class="token class-name">Configuration</span> conf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建作业实例</span>
        <span class="token class-name">Job</span> job <span class="token operator">=</span> <span class="token class-name">Job</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>conf<span class="token punctuation">,</span> <span class="token class-name">CovidTop1Driver</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置作业驱动类</span>
        job<span class="token punctuation">.</span><span class="token function">setJarByClass</span><span class="token punctuation">(</span><span class="token class-name">CovidTop1Driver</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置作业mapper reducer类</span>
        job<span class="token punctuation">.</span><span class="token function">setMapperClass</span><span class="token punctuation">(</span><span class="token class-name">CovidTop1Mapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setReducerClass</span><span class="token punctuation">(</span><span class="token class-name">CovidTop1Reducer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置作业mapper阶段输出key value数据类型</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputKeyClass</span><span class="token punctuation">(</span><span class="token class-name">CovidTop1Bean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputValueClass</span><span class="token punctuation">(</span><span class="token class-name">NullWritable</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//设置作业reducer阶段输出key value数据类型 也就是程序最终输出数据类型</span>
        job<span class="token punctuation">.</span><span class="token function">setOutputKeyClass</span><span class="token punctuation">(</span><span class="token class-name">CovidTop1Bean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setOutputValueClass</span><span class="token punctuation">(</span><span class="token class-name">NullWritable</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 设置分组规则</span>
        job<span class="token punctuation">.</span><span class="token function">setGroupingComparatorClass</span><span class="token punctuation">(</span><span class="token class-name">CovidTop1GroupingComparator</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 配置作业的输入数据路径</span>
        <span class="token class-name">FileInputFormat</span><span class="token punctuation">.</span><span class="token function">addInputPath</span><span class="token punctuation">(</span>job<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 配置作业的输出数据路径</span>
        <span class="token class-name">FileOutputFormat</span><span class="token punctuation">.</span><span class="token function">setOutputPath</span><span class="token punctuation">(</span>job<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//判断输出路径是否存在 如果存在删除</span>
        <span class="token class-name">FileSystem</span> fs <span class="token operator">=</span> <span class="token class-name">FileSystem</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>conf<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            fs<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 提交作业并等待执行完成</span>
        <span class="token keyword">boolean</span> resultFlag <span class="token operator">=</span> job<span class="token punctuation">.</span><span class="token function">waitForCompletion</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//程序退出</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span>resultFlag <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-mapreduce并行度机制" tabindex="-1"><a class="header-anchor" href="#_4-mapreduce并行度机制" aria-hidden="true">#</a> 4. MapReduce并行度机制</h2>
<h3 id="_4-1-maptask并行度机制" tabindex="-1"><a class="header-anchor" href="#_4-1-maptask并行度机制" aria-hidden="true">#</a> 4.1 MapTask并行度机制</h3>
<blockquote>
<p>MapTask的个数是与逻辑切片的个数相等的，而逻辑切片的大小默认与block size相等，也就是默认为128M</p>
</blockquote>
<p><strong>逻辑规划</strong>：</p>
<ul>
<li>MapTask并行度的决定机制叫做逻辑规划。</li>
<li>客户端提交job之前会对待处理数据进行逻辑切片，形成逻辑规划文件。</li>
<li>逻辑规划机制由FileInputFormat类的<strong>getSplits</strong>方法完成。</li>
<li>逻辑规划结果写入规划文件（job.split），在客户端提交Job之前，把规划文件提交到任务准备区，供后续使用。</li>
<li>每个逻辑切片最终对应启动一个maptask。</li>
</ul>
<p><strong>在默认情况下，split size = block size一个数据块对应一个切片文件 对应一个maptask处理。如果split size = 100M，那么可能会出现需要读多个块的情况，这时候会增加网络传输消耗。所以永远让split size == block size</strong></p>
<p>注意：bytesRemaining/splitSize &gt; 1.1不满足的话，那么最后所有剩余的会作为一个切片。（所以理论上最后一个块的split size = 128 + 128x0.1）。意思是前面都按128M来逻辑划分，当划到最后一部分的时候进行计算。</p>
<h3 id="_4-2-reducetask并行度机制" tabindex="-1"><a class="header-anchor" href="#_4-2-reducetask并行度机制" aria-hidden="true">#</a> 4.2 ReduceTask并行度机制</h3>
<blockquote>
<p>根据业务需求进行手动设置。job.setNumReduceTask(N);</p>
</blockquote>
<h2 id="_5-mapreduce工作流程详解" tabindex="-1"><a class="header-anchor" href="#_5-mapreduce工作流程详解" aria-hidden="true">#</a> 5. MapReduce工作流程详解</h2>
<h3 id="_5-1-maptask工作机制详解" tabindex="-1"><a class="header-anchor" href="#_5-1-maptask工作机制详解" aria-hidden="true">#</a> 5.1 MapTask工作机制详解</h3>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251618670.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>详细步骤</strong></p>
<ul>
<li>Step1：读取数据组件InputFormat（默认TextInputFormat）会通过getSplits方法对输入目录中文件进行逻辑规划得到splits，有多少个split就对应启动多少个MapTask。split与block的对应关系默认是一对一。</li>
<li>Step1：逻辑规划后，由RecordReader对象（默认LineRecordReader）进行读取，以回车换行作为分隔符，读取一行数据，返回&lt;key，value&gt;。（Key表示每行首字符偏移值，value表示这一行文本内容。）</li>
<li>Step1：读取split返回&lt;key,value&gt;，进入用户自己继承的Mapper类中，执行用户重写的map函数。<br>
RecordReader读取一行数据，这里调用一次map方法进程处理。</li>
<li>Step2： map处理完之后，将map的每条结果通过context.write进行collect数据收集。在collect中，会先对其进行分区处理，默认使用HashPartitioner。(MapReduce提供Partitioner接口，它的作用就是决定当前的这对输出数据最终应该交由哪个reduce task处理。默认对key hash后再以reduce task数量取模。如果用户自己对Partitioner有需求，可以订制并设置到job上。 )</li>
<li>Step2： 分区计算之后，会将数据写入内存，内存中这片区域叫做<strong>环形缓冲区（意思就是内存可复用）</strong>，缓冲区的作用是批量收集map结果，减少磁盘IO的影响。</li>
<li>Step3：当溢写线程启动后，需要对这80MB空间内的key做排序(Sort)。排序是MapReduce模型默认的行为，这里的排序也是对序列化的字节做的排序。(如果job设置过Combiner，那么现在就是使用Combiner的时候了。将有相同key的key/value对的value加起来，减少溢写到磁盘的数据量。Combiner会优化MapReduce的中间结果，所以它在整个模型中会多次使用。)</li>
<li>Step4：每次溢写会在磁盘上生成一个临时文件，如果map的输出结果真的很大，有多次这样的溢写发生，磁盘上相应的就会有多个临时文件存在。(当整个数据处理结束之后开始对磁盘中的临时文件进行merge合并，因为最终的文件只有一个，写入磁盘，并且为这个文件提供了一个索引文件，以记录每个reduce对应数据的偏移量。 )</li>
</ul>
<p><strong>环形缓冲区</strong></p>
<ul>
<li>环形缓冲区就是内存中的一块区域，底层是字节数组。缓冲区是有大小限制，默认是100MB。</li>
<li>当map task的输出结果很多时，就可能会撑爆内存，所以需要在一定条件下将缓冲区中的数据临时写入磁盘，然后重新利用这块缓冲区。这个从内存往磁盘写数据的过程被称为Spill，中文可译为溢写。</li>
<li>这个溢写是由单独线程来完成，不影响往缓冲区写map结果的线程。溢写线程启动时不应该阻止map的结果输出，所以整个缓冲区有个溢写的比例spill.percent。这个比例默认是0.8（设置这个的原因就是在溢写的时候依然能往内存中输出数据），也就是当缓冲区的数据已经达到阈值（buffer size * spill percent = 100MB * 0.8 = 80MB），溢写线程启动，锁定这80MB的内存，执行溢写过程。Map task的输出结果还可以往剩下的20MB内存中写，互不影响。</li>
</ul>
<h2 id="_5-2-reducetask工作机制详解" tabindex="-1"><a class="header-anchor" href="#_5-2-reducetask工作机制详解" aria-hidden="true">#</a> 5.2 ReduceTask工作机制详解</h2>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251618943.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>详细步骤：</strong></p>
<ul>
<li>Step1：Copy阶段，简单地拉取数据。Reduce进程启动一些数据copy线程(Fetcher)，通过HTTP方式请求maptask获取属于自己的文件。</li>
<li>Step2： Merge阶段。Copy过来的数据会先放入内存缓冲区中，这里的缓冲区大小要比map端的更为灵活。merge有三种形式：内存到内存；内存到磁盘；磁盘到磁盘。默认情况下第一种形式不启用。当内存中的数据量到达一定阈值，就启动内存到磁盘的merge。第二种merge方式一直在运行，直到没有map端的数据时才结束，然后启动第三种磁盘到磁盘的merge方式生成最终的文件。（把分散的数据合并成一个大的数据后，还会再对合并后的数据排序。默认key的字典序排序。）</li>
<li>Step3:对排序后的键值对调用reduce方法，键相等的键值对组成一组，调用一次reduce方法。<br>
所谓分组就是纯粹的前后两个key比较，如果相等就继续判断下一个是否和当前相等。</li>
<li>reduce处理的结果会调用默认输出组件TextOutputFormat写入到指定的目录文件中。<br>
TextOutputFormat默认是一次输出写一行，key value之间以制表符\t分割。</li>
</ul>
</div></template>


