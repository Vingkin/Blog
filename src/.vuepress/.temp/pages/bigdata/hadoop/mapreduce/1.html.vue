<template><div><h2 id="_1-mapreduce相关介绍" tabindex="-1"><a class="header-anchor" href="#_1-mapreduce相关介绍" aria-hidden="true">#</a> 1. MapReduce相关介绍</h2>
<blockquote>
<p>MapReduce是一个离线计算框架，针对静态数据集，不支持动态的离线数据</p>
</blockquote>
<h3 id="_1-1-hadoop-writable序列化机制" tabindex="-1"><a class="header-anchor" href="#_1-1-hadoop-writable序列化机制" aria-hidden="true">#</a> 1.1 Hadoop Writable序列化机制</h3>
<blockquote>
<p><strong>序列化</strong> (Serialization)是将结构化对象转换成字节流以便于进行网络传输或写入持久存储的过程。</p>
<p><strong>反序列化</strong>（Deserialization）是将字节流转换为一系列结构化对象的过程，重新创建该对象。</p>
</blockquote>
<p>Hadoop通过<strong>Writable</strong>接口实现的序列化机制，接口提供两个方法<strong>write</strong>和<strong>readFields</strong>。</p>
<ul>
<li>
<p>write叫做序列化方法，用于把对象指定的字段写出去；</p>
</li>
<li>
<p>readFields叫做反序列化方法，用于从字节流中读取字段重构对象；</p>
</li>
</ul>
<p>Hadoop没有提供对象比较功能，所以和java中的Comparable接口合并，提供一个接口<strong>WritableComparable</strong>。</p>
<p>WritableComparable接口可用于用户自定义对象的比较规则。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@InterfaceAudience.Public</span>
<span class="token annotation punctuation">@InterfaceStability.Stable</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">WritableComparable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">extends</span> <span class="token class-name">Writable</span><span class="token punctuation">,</span> <span class="token class-name">Comparable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th style="text-align:center">Hadoop数据类型</th>
<th style="text-align:center">Java数据类型</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">BooleanWritable</td>
<td style="text-align:center">boolean</td>
</tr>
<tr>
<td style="text-align:center">ByteWritable</td>
<td style="text-align:center">byte</td>
</tr>
<tr>
<td style="text-align:center">IntWritable</td>
<td style="text-align:center">int</td>
</tr>
<tr>
<td style="text-align:center">FloatWritable</td>
<td style="text-align:center">float</td>
</tr>
<tr>
<td style="text-align:center">LongWritable</td>
<td style="text-align:center">long</td>
</tr>
<tr>
<td style="text-align:center">DoubleWritable</td>
<td style="text-align:center">double</td>
</tr>
<tr>
<td style="text-align:center"><strong>Text</strong></td>
<td style="text-align:center"><strong>String</strong></td>
</tr>
<tr>
<td style="text-align:center">MapWritable</td>
<td style="text-align:center">map</td>
</tr>
<tr>
<td style="text-align:center">ArrayWritable</td>
<td style="text-align:center">array</td>
</tr>
<tr>
<td style="text-align:center">NullWritable</td>
<td style="text-align:center">null</td>
</tr>
</tbody>
</table>
<p>如果想自定义Hadoop数据类型</p>
<ul>
<li>自定义对象必须实现Hadoop的序列化机制Writable</li>
<li>如果需要将自定义的对象作为key传递，则还需要实现Comparable接口，因为MapReduce框中的Shuffle过程要求对key必须能排序。你得指定对象的排序规则是什么。</li>
</ul>
<h2 id="_2-wordcount" tabindex="-1"><a class="header-anchor" href="#_2-wordcount" aria-hidden="true">#</a> 2. WordCount</h2>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251617177.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>所需要的依赖以及maven打包插件</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.hadoop<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>hadoop-common<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.1.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.hadoop<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>hadoop-hdfs<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.1.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.hadoop<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>hadoop-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.1.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.hadoop<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>hadoop-mapreduce-client-core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.1.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.1.32<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.maven.plugins<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>maven-jar-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.4<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>archive</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>manifest</span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>addClasspath</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>addClasspath</span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>classpathPrefix</span><span class="token punctuation">></span></span>lib/<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>classpathPrefix</span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>mainClass</span><span class="token punctuation">></span></span>com.vingkin.mapreduce.wordcount.WordCountDriver_v2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>mainClass</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>manifest</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>archive</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.maven.plugins<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>maven-compiler-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>source</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>target</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>target</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>encoding</span><span class="token punctuation">></span></span>UTF-8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>encoding</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="map阶段" tabindex="-1"><a class="header-anchor" href="#map阶段" aria-hidden="true">#</a> Map阶段</h3>
<p>WordCountMapper.java</p>
<blockquote>
<p>Map阶段的处理类，对应着MapTask</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WordCountMapper</span> <span class="token keyword">extends</span> <span class="token class-name">Mapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LongWritable</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">LongWritable</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Text</span> outkey <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">static</span> <span class="token class-name">LongWritable</span> outvalue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LongWritable</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">LongWritable</span> key<span class="token punctuation">,</span> <span class="token class-name">Text</span> value<span class="token punctuation">,</span> <span class="token class-name">Mapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LongWritable</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">LongWritable</span><span class="token punctuation">></span></span><span class="token punctuation">.</span>Context context<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 拿取一行数据转换为String</span>
        <span class="token class-name">String</span> line <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 根据分隔符进行切割</span>
        <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> words <span class="token operator">=</span> line<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">"\\s+"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 遍历数组</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> word <span class="token operator">:</span> words<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            outkey<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 输出数据 吧每个单词都标记1 输出的结果&lt;单词,1></span>
            context<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>outkey<span class="token punctuation">,</span> outvalue<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="相关解析" tabindex="-1"><a class="header-anchor" href="#相关解析" aria-hidden="true">#</a> 相关解析</h4>
<p>Mapper的四个泛型分别为：</p>
<ul>
<li>KEYIN：LongWritable</li>
<li>VALUEIN：Text</li>
<li>KEYOUT：Text</li>
<li>VALUEOUT：LongWritable</li>
</ul>
<p>在map阶段之前，MapReduce程序已采用其默认的读取数据组件TextInputFormat对文本数据进行了读取，每一行返回一个kv键值对（<strong>map方法基于行来调用，每一行调用一次map方法进行业务处理</strong>），分别表示每一行起始位置的偏移量和这一行的文本内容。因此，Mapper的KEYIN和VALUEIN分别对应着TextInputFormat返回的键值对，其Hadoop数据类型分别为LongWritable和Text。</p>
<p>在执行map的时候，先将LongWritable类型的value转换成String类型，再通过正则对一行文本进行分隔。最后通过context上下文对象将每个单词都组成<code v-pre>&lt;单词, 1&gt;</code>形式的键值对进行输出。因此KEYOUT和VALUEOUT的数据类型分别为Text和LongWritable。</p>
<h3 id="reduce阶段" tabindex="-1"><a class="header-anchor" href="#reduce阶段" aria-hidden="true">#</a> Reduce阶段</h3>
<p>WordCountReducer.java</p>
<blockquote>
<p>Reduce阶段的处理类，对应着ReduceTask</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WordCountReducer</span> <span class="token keyword">extends</span> <span class="token class-name">Reducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">LongWritable</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">LongWritable</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">LongWritable</span> outValue <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LongWritable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">reduce</span><span class="token punctuation">(</span><span class="token class-name">Text</span> key<span class="token punctuation">,</span> <span class="token class-name">Iterable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LongWritable</span><span class="token punctuation">></span></span> values<span class="token punctuation">,</span> <span class="token class-name">Reducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">LongWritable</span><span class="token punctuation">,</span> <span class="token class-name">Text</span><span class="token punctuation">,</span> <span class="token class-name">LongWritable</span><span class="token punctuation">></span></span><span class="token punctuation">.</span>Context context<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 统计变量</span>
        <span class="token keyword">long</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">LongWritable</span> value <span class="token operator">:</span> values<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// &lt;hadoop,Iterable[1,1,1]></span>
            count <span class="token operator">+=</span> value<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        outValue<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 最终使用上下文对此项输出结果</span>
        context<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> outValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="相关解析-1" tabindex="-1"><a class="header-anchor" href="#相关解析-1" aria-hidden="true">#</a> 相关解析</h4>
<p>Reducer的四个泛型分别为：</p>
<ul>
<li>KEYIN</li>
<li>VALUEIN</li>
<li>KEYOUT</li>
<li>VALUEOUT</li>
</ul>
<p>Reducer的四个泛型很好确定，Reducer的KEYIN和VALUEIN对应着Mapper的KEYOUT和VALUEOUT，因此为Text和LongWritable。对于KEYOUT和VALUEOUT要根据具体的业务进行判断，此业务是统计单词个数，因而KEYOUT为单词Text，VALUEOUT为单词个数LongWritable。</p>
<p>在Map阶段和Reduce阶段之间MapReduce程序默认对数据进行了相关的处理。对于Map阶段的输出结果我们可以假设为<code v-pre>&lt;hadoop,1&gt;&lt;hadoop,1&gt;&lt;hello,1&gt;&lt;hello,1&gt;&lt;hadoop,1&gt;</code>，MapReduce程序会对数据先按key的字典序对键值对进行排序，然后再以key相同的为一组，分组之后，同一组数据组成一个新的kv键值对，调用一次reduce（<strong>reduce方法基于分组调用，一个分组调用一次</strong>）。</p>
<p>具体的数据操作如下：</p>
<ul>
<li>排序：&lt;hadoop,1&gt;&lt;hadoop,1&gt;&lt;hadoop,1&gt;&lt;hello,1&gt;&lt;hello,1&gt;</li>
<li>分组：
<ul>
<li>&lt;hadoop,1&gt;&lt;hadoop,1&gt;&lt;hadoop,1&gt;</li>
<li>&lt;hello,1&gt;&lt;hello,1&gt;</li>
</ul>
</li>
<li>分组后新的kv键值对：
<ul>
<li>&lt;hadoop,Iterable[1,1,1]&gt;</li>
<li>&lt;hello,Iterable[1,1]&gt;</li>
</ul>
</li>
</ul>
<p>map的执行流程为：对于每一个分组，对values进行迭代遍历加出该key的总个数，再将key作为输出的key，个数作为输出的value通过context上下文对象进行输出。</p>
<h3 id="driver阶段" tabindex="-1"><a class="header-anchor" href="#driver阶段" aria-hidden="true">#</a> Driver阶段</h3>
<p>WordCountDriver_v1.java</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * @Author: Vingkin
 * @Date: Create in 14:44 2021/8/1
 * @Description: MapReduce客户端程序驱动类 构造Job对象实例
 * 指定各种组件属性 包括：mapper reducer类、输入输出的数据类型、输入输出的数据路径
 * 提交job作业 job.submit()
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WordCountDriver_v1</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建配置对象</span>
        <span class="token class-name">Configuration</span> conf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 构建Job作业的实例 参数（配置对象，Job名字）</span>
        <span class="token class-name">Job</span> job <span class="token operator">=</span> <span class="token class-name">Job</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span>conf<span class="token punctuation">,</span> <span class="token class-name">WordCountDriver_v1</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置MR程序运行的主类</span>
        job<span class="token punctuation">.</span><span class="token function">setJarByClass</span><span class="token punctuation">(</span><span class="token class-name">WordCountDriver_v1</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置MR程序的mapper类 reducer类</span>
        job<span class="token punctuation">.</span><span class="token function">setMapperClass</span><span class="token punctuation">(</span><span class="token class-name">WordCountMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setReducerClass</span><span class="token punctuation">(</span><span class="token class-name">WordCountReducer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 指定mapper阶段输出的key value类型</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputKeyClass</span><span class="token punctuation">(</span><span class="token class-name">Text</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputValueClass</span><span class="token punctuation">(</span><span class="token class-name">LongWritable</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 指定reducer阶段输出的key value类型</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputKeyClass</span><span class="token punctuation">(</span><span class="token class-name">Text</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputValueClass</span><span class="token punctuation">(</span><span class="token class-name">LongWritable</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 配置本次作业的输入数据路径 输出数据路径</span>
        <span class="token comment">// todo 默认组件 TextInputFormat TextOutputFormat</span>
        <span class="token class-name">FileInputFormat</span><span class="token punctuation">.</span><span class="token function">setInputPaths</span><span class="token punctuation">(</span>job<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileOutputFormat</span><span class="token punctuation">.</span><span class="token function">setOutputPath</span><span class="token punctuation">(</span>job<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 提交作业</span>
        <span class="token comment">// 采用waitForCompletion参数表示是否开启实时监视追踪作业的执行情况</span>
        <span class="token keyword">boolean</span> resultFlag <span class="token operator">=</span> job<span class="token punctuation">.</span><span class="token function">waitForCompletion</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 退出程序 和job结果进行绑定</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span>resultFlag <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>WordCountDriver_v2.java（效率更高，优先使用）</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * @Author: Vingkin
 * @Date: Create in 14:44 2021/8/1
 * @Description: 使用工具类ToolRunner提交MapReduce作业
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WordCountDriver_v2</span> <span class="token keyword">extends</span> <span class="token class-name">Configured</span> <span class="token keyword">implements</span> <span class="token class-name">Tool</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建配置对象</span>
        <span class="token class-name">Configuration</span> conf <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Configuration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// todo 使用工具类ToolRunner提交程序</span>
        <span class="token keyword">int</span> status <span class="token operator">=</span> <span class="token class-name">ToolRunner</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span>conf<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">WordCountDriver_v2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 退出客户端</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">exit</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">Job</span> job <span class="token operator">=</span> <span class="token class-name">Job</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token function">getConf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">WordCountDriver_v2</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getSimpleName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置MR程序运行的主类</span>
        job<span class="token punctuation">.</span><span class="token function">setJarByClass</span><span class="token punctuation">(</span><span class="token class-name">WordCountDriver_v2</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置MR程序的mapper类 reducer类</span>
        job<span class="token punctuation">.</span><span class="token function">setMapperClass</span><span class="token punctuation">(</span><span class="token class-name">WordCountMapper</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setReducerClass</span><span class="token punctuation">(</span><span class="token class-name">WordCountReducer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 指定mapper阶段输出的key value类型</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputKeyClass</span><span class="token punctuation">(</span><span class="token class-name">Text</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputValueClass</span><span class="token punctuation">(</span><span class="token class-name">LongWritable</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 指定reducer阶段输出的key value类型</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputKeyClass</span><span class="token punctuation">(</span><span class="token class-name">Text</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        job<span class="token punctuation">.</span><span class="token function">setMapOutputValueClass</span><span class="token punctuation">(</span><span class="token class-name">LongWritable</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 配置本次作业的输入数据路径 输出数据路径</span>
        <span class="token comment">// todo 默认组件 TextInputFormat TextOutputFormat</span>
        <span class="token class-name">FileInputFormat</span><span class="token punctuation">.</span><span class="token function">setInputPaths</span><span class="token punctuation">(</span>job<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">FileOutputFormat</span><span class="token punctuation">.</span><span class="token function">setOutputPath</span><span class="token punctuation">(</span>job<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Path</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> job<span class="token punctuation">.</span><span class="token function">waitForCompletion</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打包方式：先clean再package</p>
<p><code v-pre>hadoop jar WordCount-1.0-SNAPSHOT.jar /vingkin/input /vingkin/output</code></p>
<p>默认输入组件为<strong>TextInputFormat</strong>，通过指定input文件夹，就处理该目录所有的文件，把所有文件当成整体来处理。默认输出组件为*<strong>TextOutputFormat</strong>，output文件夹应该不存在，否则报错。</p>
<h2 id="_3-mapreduce程序运行模式" tabindex="-1"><a class="header-anchor" href="#_3-mapreduce程序运行模式" aria-hidden="true">#</a> 3. MapReduce程序运行模式</h2>
<blockquote>
<p>所谓运行模式是指MapReduce程序是单机运行还是分布式运行，程序所需要的运算资源是YARN分配还是本机系统自己分配</p>
</blockquote>
<ul>
<li>yarn：YARN集群模式</li>
<li>local：本地模式（默认）</li>
</ul>
<p>在mapred-default.xml中可以进行相应的配置，需要配置的参数如下：</p>
<ul>
<li>mapreduce.framework.name=yarn</li>
<li>yarn.resourcemanager.hostname=node1</li>
</ul>
<p>但是如果在代码中（conf.set()）或者运行的环境中有配置（mapred-site.xml），则会覆盖default的配置。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>conf<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"mapreduce.framework.name"</span><span class="token punctuation">,</span> <span class="token string">"yarn"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_4-mapreduce流程梳理" tabindex="-1"><a class="header-anchor" href="#_4-mapreduce流程梳理" aria-hidden="true">#</a> 4. MapReduce流程梳理</h2>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251618362.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_4-1-map阶段执行过程" tabindex="-1"><a class="header-anchor" href="#_4-1-map阶段执行过程" aria-hidden="true">#</a> 4.1 Map阶段执行过程</h3>
<ul>
<li>
<p>第一阶段：把输入目录下文件按照一定的标准逐个进行<strong>逻辑切片</strong>，形成切片规划。</p>
<p>默认Split size = Block size，每一个切片由一个MapTask处理。（getSplits）</p>
</li>
<li>
<p>第二阶段：对切片中的数据按照一定的规则读取解析返回&lt;key,value&gt;对。</p>
<p>默认是<strong>按行读取数据</strong>。key是每一行的起始位置偏移量，value是本行的文本内容。（TextInputFormat）</p>
</li>
<li>
<p>第三阶段：调用Mapper类中的<strong>map</strong>方法处理数据。</p>
<p>每读取解析出来的一个&lt;key,value&gt; ，调用一次map方法。</p>
</li>
<li>
<p>第四阶段：按照一定的规则对Map输出的键值对进行<strong>分区partition</strong>。默认不分区，因为只有一个reducetask。</p>
<p>分区的数量就是reducetask运行的数量。</p>
</li>
<li>
<p>第五阶段：Map输出数据写入<strong>内存缓冲区</strong>，达到比例溢出到磁盘上。<strong>溢出spill</strong>的时候根据key进行<strong>排序sort</strong>。</p>
<p>默认根据key字典序排序。</p>
</li>
<li>
<p>第六阶段：对所有溢出文件进行最终的<strong>merge合并</strong>，成为一个文件。</p>
</li>
</ul>
<h3 id="_4-2-reduce阶段执行过程" tabindex="-1"><a class="header-anchor" href="#_4-2-reduce阶段执行过程" aria-hidden="true">#</a> 4.2 Reduce阶段执行过程</h3>
<ul>
<li>
<p>第一阶段：ReduceTask会主动从MapTask<strong>复制拉取</strong>其输出的键值对。</p>
</li>
<li>
<p>第二阶段：把复制到Reducer本地数据，全部进行<strong>合并merge</strong>，即把分散的数据合并成一个大的数据。再对合并后的数据<strong>排序</strong>。</p>
</li>
<li>
<p>第三阶段是对排序后的键值<strong>对调用reduce方法</strong>。</p>
<p>键相等的键值对调用一次reduce方法。最后把这些输出的键值对写入到HDFS文件中。</p>
</li>
</ul>
</div></template>


