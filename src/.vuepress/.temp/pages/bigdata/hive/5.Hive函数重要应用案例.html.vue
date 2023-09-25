<template><div><h1 id="_1-hive中多字节分隔符处理" tabindex="-1"><a class="header-anchor" href="#_1-hive中多字节分隔符处理" aria-hidden="true">#</a> 1. Hive中多字节分隔符处理</h1>
<blockquote>
<p>Hive默认序列化类是<code v-pre>LazySimpleSerDe</code>，其<strong>只支持使用单字节分隔符（char）<strong>来加载文本数据，所以遇到</strong>多字符</strong>或者<strong>数据字段中包含了分隔符</strong>，那么<code v-pre>LazySimpleSerDe</code>就不再适用了。</p>
</blockquote>
<h2 id="_1-1-问题和需求" tabindex="-1"><a class="header-anchor" href="#_1-1-问题和需求" aria-hidden="true">#</a> 1.1 问题和需求</h2>
<p>比如下面的两种情况：</p>
<p><strong>多字符分隔符：</strong></p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626337.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>数据字段中包含了分隔符：</strong></p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626630.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>这个时候就需要提出新的解决方案了</p>
<h2 id="_1-2-解决方案一-替换分隔符" tabindex="-1"><a class="header-anchor" href="#_1-2-解决方案一-替换分隔符" aria-hidden="true">#</a> 1.2 解决方案一：替换分隔符</h2>
<blockquote>
<p>当数据量小的时候，可以写个Java程序来清洗数据即可。当数据量大的时候就需要使用MapReduce的Map阶段来进行数据清洗了。</p>
</blockquote>
<p>主要Map阶段的代码如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ChangeSplitMapper</span> <span class="token keyword">extends</span> <span class="token class-name">Mapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">LongWritable</span><span class="token punctuation">,</span><span class="token class-name">Text</span><span class="token punctuation">,</span><span class="token class-name">Text</span><span class="token punctuation">,</span><span class="token class-name">NullWritable</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>
    <span class="token comment">//定义输出的Key</span>
    <span class="token keyword">private</span> <span class="token class-name">Text</span> outputKey <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//定义输出的Value</span>
    <span class="token keyword">private</span> <span class="token class-name">NullWritable</span> outputValue <span class="token operator">=</span> <span class="token class-name">NullWritable</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">map</span><span class="token punctuation">(</span><span class="token class-name">LongWritable</span> key<span class="token punctuation">,</span> <span class="token class-name">Text</span> value<span class="token punctuation">,</span> <span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
        <span class="token comment">//获取每条数据</span>
        <span class="token class-name">String</span> line <span class="token operator">=</span> value<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//将里面的||转换为|</span>
        <span class="token class-name">String</span> newLine <span class="token operator">=</span> line<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">"\\|\\|"</span><span class="token punctuation">,</span> <span class="token string">"|"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//替换后的内容作为Key</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>outputKey<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>newLine<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//输出结果</span>
        context<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>outputKey<span class="token punctuation">,</span><span class="token keyword">this</span><span class="token punctuation">.</span>outputValue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-3-解决方案二-regexserde正则加载" tabindex="-1"><a class="header-anchor" href="#_1-3-解决方案二-regexserde正则加载" aria-hidden="true">#</a> 1.3 解决方案二：RegexSerDe正则加载</h2>
<blockquote>
<p>除了LazySimpleSerDe外，Hive还内置了很多SerDe类，比如ORCSerDe，RegexSerDe，JsonSerDe等。通过RegexSerDe类，就可以解决分隔符问题。</p>
</blockquote>
<p><strong>通过正则表达式匹配每一行数据即可。重点就是能写好正则表达式</strong></p>
<p>对于上面两个问题的解决方案如下：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> singer
<span class="token punctuation">(</span>
    id       string<span class="token punctuation">,</span><span class="token comment">-- 歌手id</span>
    name     string<span class="token punctuation">,</span><span class="token comment">-- 歌手名称</span>
    country  string<span class="token punctuation">,</span><span class="token comment">-- 国家</span>
    province string<span class="token punctuation">,</span><span class="token comment">-- 省份</span>
    gender   string<span class="token punctuation">,</span><span class="token comment">-- 性别</span>
    works    string<span class="token comment">-- 作品</span>
<span class="token punctuation">)</span> 
<span class="token comment">-- 指定使用RegexSerde加载数据</span>
    <span class="token keyword">ROW</span> FORMAT SERDE <span class="token string">'org.apache.hadoop.hive.serde2.RegexSerDe'</span>
        <span class="token keyword">WITH</span> SERDEPROPERTIES <span class="token punctuation">(</span><span class="token string">"input.regex"</span> <span class="token operator">=</span> <span class="token string">"([0-9]*)\\|\\|(.*)\\|\\|(.*)\\|\\|(.*)\\|\\|(.*)\\|\\|(.*)"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> apachelog
<span class="token punctuation">(</span>
    ip     string<span class="token punctuation">,</span> <span class="token comment">-- IP地址</span>
    stime  string<span class="token punctuation">,</span> <span class="token comment">-- 时间</span>
    mothed string<span class="token punctuation">,</span> <span class="token comment">-- 请求方式</span>
    url    string<span class="token punctuation">,</span> <span class="token comment">-- 请求地址</span>
    policy string<span class="token punctuation">,</span> <span class="token comment">-- 请求协议</span>
    stat   string<span class="token punctuation">,</span> <span class="token comment">-- 请求状态</span>
    body   string  <span class="token comment">-- 字节大小</span>
<span class="token punctuation">)</span>
<span class="token comment">-- 指定使用RegexSerde加载数据</span>
    <span class="token keyword">ROW</span> FORMAT SERDE <span class="token string">'org.apache.hadoop.hive.serde2.RegexSerDe'</span>
<span class="token comment">-- 指定正则表达式</span>
        <span class="token keyword">WITH</span> SERDEPROPERTIES <span class="token punctuation">(</span>
        <span class="token string">"input.regex"</span> <span class="token operator">=</span> <span class="token string">"([^ ]*) ([^}]*) ([^ ]*) ([^ ]*) ([^ ]*) ([0-9]*) ([^ ]*)"</span>
        <span class="token punctuation">)</span> stored <span class="token keyword">as</span> textfile<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_1-4-解决方案三-自定义inputformat" tabindex="-1"><a class="header-anchor" href="#_1-4-解决方案三-自定义inputformat" aria-hidden="true">#</a> 1.4 解决方案三：自定义InputFormat</h2>
<blockquote>
<p>过于繁琐，不推荐使用。</p>
</blockquote>
<h1 id="_2-url解析函数" tabindex="-1"><a class="header-anchor" href="#_2-url解析函数" aria-hidden="true">#</a> 2. URL解析函数</h1>
<blockquote>
<p>Hive中为了实现对URL的解析，专门提供了解析URL的函数<strong>parse_url</strong>和<strong>parse_url_tuple</strong>。其中parse_url_tuple是一个UDTF，注意要和侧视图Lateral View配套使用。</p>
</blockquote>
<h2 id="_2-1-parse-url" tabindex="-1"><a class="header-anchor" href="#_2-1-parse-url" aria-hidden="true">#</a> 2.1 parse_url</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> parse_url<span class="token punctuation">(</span><span class="token string">'http://facebook.com/path/p1.php?id=10086'</span><span class="token punctuation">,</span> <span class="token string">'PROTOCOL'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- http</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> parse_url<span class="token punctuation">(</span><span class="token string">'http://facebook.com/path/p1.php?id=10086'</span><span class="token punctuation">,</span> <span class="token string">'HOST'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- facebook.com</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> parse_url<span class="token punctuation">(</span><span class="token string">'http://facebook.com/path/p1.php?id=10086'</span><span class="token punctuation">,</span> <span class="token string">'PATH'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- /path/p1.php</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> parse_url<span class="token punctuation">(</span><span class="token string">'http://facebook.com/path/p1.php?id=10086'</span><span class="token punctuation">,</span> <span class="token string">'QUERY'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- id=10086</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> parse_url<span class="token punctuation">(</span><span class="token string">'http://facebook.com/path/p1.php?id=10086'</span><span class="token punctuation">,</span> <span class="token string">'QUERY'</span><span class="token punctuation">,</span> <span class="token string">'id'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 10086</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-2-parse-url-tuple" tabindex="-1"><a class="header-anchor" href="#_2-2-parse-url-tuple" aria-hidden="true">#</a> 2.2 parse_url_tuple</h2>
<p><strong>创建实验用表tb_url</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> tb_url
<span class="token punctuation">(</span>
    id  <span class="token keyword">int</span><span class="token punctuation">,</span>
    url string
<span class="token punctuation">)</span> <span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'\t'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626898.png" alt="tb_url" tabindex="0" loading="lazy"><figcaption>tb_url</figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> parse_url_tuple<span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token string">"PROTOCOL"</span><span class="token punctuation">,</span> <span class="token string">"HOST"</span><span class="token punctuation">,</span> <span class="token string">"PATH"</span><span class="token punctuation">,</span> <span class="token string">"QUERY"</span><span class="token punctuation">)</span> 
<span class="token keyword">as</span> <span class="token punctuation">(</span>protocol<span class="token punctuation">,</span> host<span class="token punctuation">,</span> path<span class="token punctuation">,</span> query<span class="token punctuation">)</span> <span class="token keyword">from</span> tb_url<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626599.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>注意下面写法的错误示范：</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> id<span class="token punctuation">,</span>
       parse_url_tuple<span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token string">"HOST"</span><span class="token punctuation">,</span> <span class="token string">"PATH"</span><span class="token punctuation">,</span> <span class="token string">"QUERY"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token punctuation">(</span>host<span class="token punctuation">,</span> path<span class="token punctuation">,</span> query<span class="token punctuation">)</span>
<span class="token keyword">from</span> tb_url<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>UDTF函数对于很多场景下有使用限制，例如：select时不能包含其他字段、不能嵌套调用、不能与group by等放在一起调用等等</p>
<p>UDTF函数的调用方式，主要有以下两种方式：</p>
<ul>
<li>直接在select后单独使用</li>
<li>与Lateral View配套使用</li>
</ul>
</blockquote>
<p>使用UDTF时的正确做法：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> a<span class="token punctuation">.</span>id       <span class="token keyword">as</span> id<span class="token punctuation">,</span>
       b<span class="token punctuation">.</span>host     <span class="token keyword">as</span> host<span class="token punctuation">,</span>
       b<span class="token punctuation">.</span>path     <span class="token keyword">as</span> path<span class="token punctuation">,</span>
       c<span class="token punctuation">.</span>protocol <span class="token keyword">as</span> protocol<span class="token punctuation">,</span>
       c<span class="token punctuation">.</span>query    <span class="token keyword">as</span> query
<span class="token keyword">from</span> tb_url a
         lateral <span class="token keyword">view</span> parse_url_tuple<span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token string">"HOST"</span><span class="token punctuation">,</span> <span class="token string">"PATH"</span><span class="token punctuation">)</span> b <span class="token keyword">as</span> host<span class="token punctuation">,</span> path
         lateral <span class="token keyword">view</span> parse_url_tuple<span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token string">"PROTOCOL"</span><span class="token punctuation">,</span> <span class="token string">"QUERY"</span><span class="token punctuation">)</span> c <span class="token keyword">as</span> protocol<span class="token punctuation">,</span> query<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626938.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h1 id="_3-行列转换应用与实现" tabindex="-1"><a class="header-anchor" href="#_3-行列转换应用与实现" aria-hidden="true">#</a> 3. 行列转换应用与实现</h1>
<h2 id="_3-1-行转列-多行转多列" tabindex="-1"><a class="header-anchor" href="#_3-1-行转列-多行转多列" aria-hidden="true">#</a> 3.1 行转列：多行转多列</h2>
<blockquote>
<p>使用case when语句</p>
<ul>
<li><code v-pre>case when 条件1 then value1 ... else 默认值 end</code></li>
<li><code v-pre>case 列 when v1 then value1 ... else 默认值 end</code></li>
</ul>
</blockquote>
<h3 id="_3-1-1-需求" tabindex="-1"><a class="header-anchor" href="#_3-1-1-需求" aria-hidden="true">#</a> 3.1.1 需求</h3>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626051.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_3-1-2-实现" tabindex="-1"><a class="header-anchor" href="#_3-1-2-实现" aria-hidden="true">#</a> 3.1.2 实现</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> row2col1
<span class="token punctuation">(</span>
    col1 string<span class="token punctuation">,</span>
    col2 string<span class="token punctuation">,</span>
    col3 <span class="token keyword">int</span>
<span class="token punctuation">)</span> <span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'\t'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> col1                                         <span class="token keyword">as</span> col1<span class="token punctuation">,</span>
       <span class="token function">max</span><span class="token punctuation">(</span><span class="token keyword">case</span> col2 <span class="token keyword">when</span> <span class="token string">'c'</span> <span class="token keyword">then</span> col3 <span class="token keyword">else</span> <span class="token number">0</span> <span class="token keyword">end</span><span class="token punctuation">)</span> <span class="token keyword">as</span> c<span class="token punctuation">,</span>
       <span class="token function">max</span><span class="token punctuation">(</span><span class="token keyword">case</span> col2 <span class="token keyword">when</span> <span class="token string">'d'</span> <span class="token keyword">then</span> col3 <span class="token keyword">else</span> <span class="token number">0</span> <span class="token keyword">end</span><span class="token punctuation">)</span> <span class="token keyword">as</span> d<span class="token punctuation">,</span>
       <span class="token function">max</span><span class="token punctuation">(</span><span class="token keyword">case</span> col2 <span class="token keyword">when</span> <span class="token string">'e'</span> <span class="token keyword">then</span> col3 <span class="token keyword">else</span> <span class="token number">0</span> <span class="token keyword">end</span><span class="token punctuation">)</span> <span class="token keyword">as</span> e
<span class="token keyword">from</span> row2col1
<span class="token keyword">group</span> <span class="token keyword">by</span> col1<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-2-行转列-多行转单列" tabindex="-1"><a class="header-anchor" href="#_3-2-行转列-多行转单列" aria-hidden="true">#</a> 3.2 行转列：多行转单列</h2>
<blockquote>
<p>使用concat,concat_ws,collect_list,collect_set等函数</p>
</blockquote>
<h3 id="_3-2-1-需求" tabindex="-1"><a class="header-anchor" href="#_3-2-1-需求" aria-hidden="true">#</a> 3.2.1 需求</h3>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626038.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_3-2-2-实现" tabindex="-1"><a class="header-anchor" href="#_3-2-2-实现" aria-hidden="true">#</a> 3.2.2 实现</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> row2col2
<span class="token punctuation">(</span>
    col1 string<span class="token punctuation">,</span>
    col2 string<span class="token punctuation">,</span>
    col3 <span class="token keyword">int</span>
<span class="token punctuation">)</span> <span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'\t'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> col1<span class="token punctuation">,</span> col2<span class="token punctuation">,</span>
       concat_ws<span class="token punctuation">(</span><span class="token string">","</span><span class="token punctuation">,</span> collect_list<span class="token punctuation">(</span>cast<span class="token punctuation">(</span>col3 <span class="token keyword">as</span> string<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">as</span> col3
<span class="token keyword">from</span> row2col2
<span class="token keyword">group</span> <span class="token keyword">by</span> col1<span class="token punctuation">,</span> col2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-3-列转行-多列转多行" tabindex="-1"><a class="header-anchor" href="#_3-3-列转行-多列转多行" aria-hidden="true">#</a> 3.3 列转行：多列转多行</h2>
<blockquote>
<p>关键使用union关键字，将多个select合并成一个</p>
<ul>
<li>union：去重且排序</li>
<li>union all：不去重不排序</li>
</ul>
</blockquote>
<h3 id="_3-3-1-需求" tabindex="-1"><a class="header-anchor" href="#_3-3-1-需求" aria-hidden="true">#</a> 3.3.1 需求</h3>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626325.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_3-3-2-实现" tabindex="-1"><a class="header-anchor" href="#_3-3-2-实现" aria-hidden="true">#</a> 3.3.2 实现</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> col2row1
<span class="token punctuation">(</span>
    col1 string<span class="token punctuation">,</span>
    col2 <span class="token keyword">int</span><span class="token punctuation">,</span>
    col3 <span class="token keyword">int</span><span class="token punctuation">,</span>
    col4 <span class="token keyword">int</span>
<span class="token punctuation">)</span> <span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'\t'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> col1<span class="token punctuation">,</span> <span class="token string">'c'</span> <span class="token keyword">as</span> col2<span class="token punctuation">,</span> col2 <span class="token keyword">as</span> col3
<span class="token keyword">from</span> col2row1
<span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
<span class="token keyword">select</span> col1<span class="token punctuation">,</span> <span class="token string">'d'</span> <span class="token keyword">as</span> col2<span class="token punctuation">,</span> col3 <span class="token keyword">as</span> col3
<span class="token keyword">from</span> col2row1
<span class="token keyword">UNION</span> <span class="token keyword">ALL</span>
<span class="token keyword">select</span> col1<span class="token punctuation">,</span> <span class="token string">'e'</span> <span class="token keyword">as</span> col2<span class="token punctuation">,</span> col4 <span class="token keyword">as</span> col3
<span class="token keyword">from</span> col2row1<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-4-列转行-单列转多行" tabindex="-1"><a class="header-anchor" href="#_3-4-列转行-单列转多行" aria-hidden="true">#</a> 3.4 列转行：单列转多行</h2>
<blockquote>
<p>explode函数的使用，注意explode的参数只能是Map或者Array</p>
</blockquote>
<h3 id="_3-4-1-需求" tabindex="-1"><a class="header-anchor" href="#_3-4-1-需求" aria-hidden="true">#</a> 3.4.1 需求</h3>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626416.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_3-4-2-实现" tabindex="-1"><a class="header-anchor" href="#_3-4-2-实现" aria-hidden="true">#</a> 3.4.2 实现</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> col2row2
<span class="token punctuation">(</span>
    col1 string<span class="token punctuation">,</span>
    col2 string<span class="token punctuation">,</span>
    col3 string
<span class="token punctuation">)</span> <span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'\t'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> col1<span class="token punctuation">,</span> col2<span class="token punctuation">,</span> lv<span class="token punctuation">.</span>col3 <span class="token keyword">as</span> col3
<span class="token keyword">from</span> col2row2
         lateral <span class="token keyword">view</span> explode<span class="token punctuation">(</span>split<span class="token punctuation">(</span>col3<span class="token punctuation">,</span> <span class="token string">','</span><span class="token punctuation">)</span><span class="token punctuation">)</span> lv <span class="token keyword">as</span> col3<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4-json数据处理" tabindex="-1"><a class="header-anchor" href="#_4-json数据处理" aria-hidden="true">#</a> 4. Json数据处理</h1>
<h2 id="_4-1-hive中的json处理方式" tabindex="-1"><a class="header-anchor" href="#_4-1-hive中的json处理方式" aria-hidden="true">#</a> 4.1 Hive中的Json处理方式</h2>
<ol>
<li>使用Json函数处理：<code v-pre>get_json_object</code>,<code v-pre>json_tuple</code></li>
<li>Json SerDe加载数据</li>
</ol>
<h2 id="_4-2-json函数" tabindex="-1"><a class="header-anchor" href="#_4-2-json函数" aria-hidden="true">#</a> 4.2 Json函数</h2>
<h3 id="_4-2-1-get-json-object" tabindex="-1"><a class="header-anchor" href="#_4-2-1-get-json-object" aria-hidden="true">#</a> 4.2.1 get_json_object</h3>
<blockquote>
<p>用于解析JSON字符串，可以从JSON字符串中返回指定的某个对象列的值</p>
<p>特点是每次只能返回Json对象中一列的值</p>
</blockquote>
<p>[scode type=&quot;green&quot;]</p>
<p>如果数据中每一行只有个别字段是JSON格式字符串，就可以使用JSON函数来实现处理，但是如果数据加载的文件整体就是JSON文件，每一行数据就是一个JSON数据，那么建议直接使用JSONSerde来实现处理最为方便。</p>
<p>[/scode]</p>
<p>参数：</p>
<ul>
<li>第一个参数：指定要解析的JSON字符串</li>
<li>第二个参数：指定要返回的字段，通过**$.columnName**的方式来指定path</li>
</ul>
<p>示例：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> tb_json_test1
<span class="token punctuation">(</span>
    json string
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626006.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span>
    <span class="token comment">-- 获取设备名称</span>
    get_json_object<span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token string">"$.device"</span><span class="token punctuation">)</span>     <span class="token keyword">as</span> device<span class="token punctuation">,</span>
    <span class="token comment">-- 获取设备类型</span>
    get_json_object<span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token string">"$.deviceType"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> deviceType<span class="token punctuation">,</span>
    <span class="token comment">-- 获取设备信号强度</span>
    get_json_object<span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token string">"$.signal"</span><span class="token punctuation">)</span>     <span class="token keyword">as</span> signal<span class="token punctuation">,</span>
    <span class="token comment">-- 获取时间</span>
    get_json_object<span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token string">"$.time"</span><span class="token punctuation">)</span>       <span class="token keyword">as</span> stime
<span class="token keyword">from</span> tb_json_test1<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626071.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_4-2-2-json-tuple" tabindex="-1"><a class="header-anchor" href="#_4-2-2-json-tuple" aria-hidden="true">#</a> 4.2.2 json_tuple</h3>
<blockquote>
<p>用于实现JSON字符串的解析，可以通过指定多个参数来解析JSON返回多列的值</p>
<p>属于UDTF，需要搭配Lateral View来使用</p>
</blockquote>
<p>参数：</p>
<ul>
<li>第一个参数：指定解析的Json字符串</li>
<li>可变参数：指定返回的字段</li>
</ul>
<p>示例：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 单独使用</span>
<span class="token keyword">select</span>
    <span class="token comment">--解析所有字段</span>
    json_tuple<span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token string">"device"</span><span class="token punctuation">,</span> <span class="token string">"deviceType"</span><span class="token punctuation">,</span> <span class="token string">"signal"</span><span class="token punctuation">,</span> <span class="token string">"time"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token punctuation">(</span>device<span class="token punctuation">,</span> deviceType<span class="token punctuation">,</span> signal<span class="token punctuation">,</span> stime<span class="token punctuation">)</span>
<span class="token keyword">from</span> tb_json_test1<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626128.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 搭配侧视图使用</span>
<span class="token keyword">select</span> json<span class="token punctuation">,</span>
       device<span class="token punctuation">,</span>
       deviceType<span class="token punctuation">,</span>
       signal<span class="token punctuation">,</span>
       stime
<span class="token keyword">from</span> tb_json_test1
         lateral <span class="token keyword">view</span> json_tuple<span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token string">"device"</span><span class="token punctuation">,</span> <span class="token string">"deviceType"</span><span class="token punctuation">,</span> <span class="token string">"signal"</span><span class="token punctuation">,</span> <span class="token string">"time"</span><span class="token punctuation">)</span> b
         <span class="token keyword">as</span> device<span class="token punctuation">,</span> deviceType<span class="token punctuation">,</span> signal<span class="token punctuation">,</span> stime<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626729.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="_4-3-json-serde" tabindex="-1"><a class="header-anchor" href="#_4-3-json-serde" aria-hidden="true">#</a> 4.3 Json SerDe</h2>
<blockquote>
<p>Hive中为了简化对于JSON文件的处理，内置了一种专门用于解析JSON文件的Serde解析器，在创建表时，只要指定使用JSONSerde解析表的文件，就会自动将JSON文件中的每一列进行解析</p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> tb_json_test2<span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> tb_json_test2
<span class="token punctuation">(</span>
    device     string<span class="token punctuation">,</span>
    deviceType string<span class="token punctuation">,</span>
    signal     <span class="token keyword">double</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">`</span>time<span class="token punctuation">`</span></span>     string
<span class="token punctuation">)</span>
    <span class="token keyword">ROW</span> FORMAT SERDE <span class="token string">'org.apache.hive.hcatalog.data.JsonSerDe'</span>
    STORED <span class="token keyword">AS</span> TEXTFILE<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_5-窗口函数应用实例" tabindex="-1"><a class="header-anchor" href="#_5-窗口函数应用实例" aria-hidden="true">#</a> 5. 窗口函数应用实例</h1>
<h2 id="_5-1-案例1-连续登录用户" tabindex="-1"><a class="header-anchor" href="#_5-1-案例1-连续登录用户" aria-hidden="true">#</a> 5.1 案例1：连续登录用户</h2>
<ul>
<li>
<p>窗口函数<code v-pre>lead</code></p>
<ul>
<li>功能：用于从当前数据中基于当前行的数据向后取偏移值</li>
<li>语法：<code v-pre>lead(colName, N, defaultValue)</code>
<ul>
<li>colName：取哪一列的值</li>
<li>N：向后偏移几行</li>
<li>defaultValue：如果取不到返回的默认值</li>
</ul>
</li>
</ul>
</li>
<li>
<p>分析</p>
<ul>
<li>我们可以基于用户的登陆信息，找到如下规律：<br>
连续两天登陆 ： 用户下次登陆时间 = 本次登陆以后的第二天<br>
连续三天登陆 ： 用户下下次登陆时间 = 本次登陆以后的第三天<br>
……<br>
我们可以对用户ID进行分区，按照登陆时间进行排序，通过lead函数计算出用户下次登陆时间<br>
通过日期函数计算出登陆以后第二天的日期，如果相等即为连续两天登录。</li>
</ul>
</li>
</ul>
<h3 id="_5-1-1-实现" tabindex="-1"><a class="header-anchor" href="#_5-1-1-实现" aria-hidden="true">#</a> 5.1.1 实现</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> tb_login
<span class="token punctuation">(</span>
    userid    string<span class="token punctuation">,</span>
    logintime string
<span class="token punctuation">)</span> <span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'\t'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251626109.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 连续登陆2天</span>
<span class="token keyword">select</span> userid<span class="token punctuation">,</span>
       logintime<span class="token punctuation">,</span>
       <span class="token comment">-- 本次登陆日期的第二天</span>
       date_add<span class="token punctuation">(</span>logintime<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>                                              <span class="token keyword">as</span> nextday<span class="token punctuation">,</span>
       <span class="token comment">-- 按照用户id分区，按照登陆日期排序，取下一次登陆时间，取不到就为0</span>
       lead<span class="token punctuation">(</span>logintime<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">over</span> <span class="token punctuation">(</span><span class="token keyword">partition</span> <span class="token keyword">by</span> userid <span class="token keyword">order</span> <span class="token keyword">by</span> logintime<span class="token punctuation">)</span> <span class="token keyword">as</span> nextlogin
<span class="token keyword">from</span> tb_login<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251627631.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>通过判断nextday和nextlogin是否相等就可以判断有没有连续登录2天</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">with</span> t1 <span class="token keyword">as</span> <span class="token punctuation">(</span>
    <span class="token keyword">select</span> userid<span class="token punctuation">,</span>
           logintime<span class="token punctuation">,</span>
           <span class="token comment">-- 本次登陆日期的第二天</span>
           date_add<span class="token punctuation">(</span>logintime<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>                                              <span class="token keyword">as</span> nextday<span class="token punctuation">,</span>
           <span class="token comment">-- 按照用户id分区，按照登陆日期排序，取下一次登陆时间，取不到就为0</span>
           lead<span class="token punctuation">(</span>logintime<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">over</span> <span class="token punctuation">(</span><span class="token keyword">partition</span> <span class="token keyword">by</span> userid <span class="token keyword">order</span> <span class="token keyword">by</span> logintime<span class="token punctuation">)</span> <span class="token keyword">as</span> nextlogin
    <span class="token keyword">from</span> tb_login<span class="token punctuation">)</span>
<span class="token keyword">select</span> <span class="token keyword">distinct</span> userid
<span class="token keyword">from</span> t1
<span class="token keyword">where</span> nextday <span class="token operator">=</span> nextlogin<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>连续登录三天的只需要略作修改即可，实现如下：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">with</span> t1 <span class="token keyword">as</span> <span class="token punctuation">(</span>
    <span class="token keyword">select</span> userid<span class="token punctuation">,</span>
           logintime<span class="token punctuation">,</span>
           <span class="token comment">-- 本次登陆日期的第三天</span>
           date_add<span class="token punctuation">(</span>logintime<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>                                              <span class="token keyword">as</span> nextday<span class="token punctuation">,</span>
           <span class="token comment">-- 按照用户id分区，按照登陆日期排序，取下下一次登陆时间，取不到就为0</span>
           lead<span class="token punctuation">(</span>logintime<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">over</span> <span class="token punctuation">(</span><span class="token keyword">partition</span> <span class="token keyword">by</span> userid <span class="token keyword">order</span> <span class="token keyword">by</span> logintime<span class="token punctuation">)</span> <span class="token keyword">as</span> nextlogin
    <span class="token keyword">from</span> tb_login<span class="token punctuation">)</span>
<span class="token keyword">select</span> <span class="token keyword">distinct</span> userid
<span class="token keyword">from</span> t1
<span class="token keyword">where</span> nextday <span class="token operator">=</span> nextlogin<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-2-案例2-级联累加求和" tabindex="-1"><a class="header-anchor" href="#_5-2-案例2-级联累加求和" aria-hidden="true">#</a> 5.2 案例2：级联累加求和</h2>
<blockquote>
<p>需求：统计每个用户每个月的消费总金额以及<strong>当前累计消费总金额</strong></p>
</blockquote>
<p>窗口函数sum默认就是从第一列到当前列求和，也就是满足当前累计消费总金额这个需求</p>
<h3 id="_5-2-1-实现" tabindex="-1"><a class="header-anchor" href="#_5-2-1-实现" aria-hidden="true">#</a> 5.2.1 实现</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> tb_money
<span class="token punctuation">(</span>
    userid string<span class="token punctuation">,</span>
    mth    string<span class="token punctuation">,</span>
    money  <span class="token keyword">int</span>
<span class="token punctuation">)</span> <span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'\t'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251627963.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> userid<span class="token punctuation">,</span>
       mth<span class="token punctuation">,</span>
       m_money<span class="token punctuation">,</span>
       <span class="token function">sum</span><span class="token punctuation">(</span>m_money<span class="token punctuation">)</span> <span class="token keyword">over</span> <span class="token punctuation">(</span><span class="token keyword">partition</span> <span class="token keyword">by</span> userid <span class="token keyword">order</span> <span class="token keyword">by</span> mth<span class="token punctuation">)</span> <span class="token keyword">as</span> t_money
<span class="token keyword">from</span> tb_money_mtn<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251627374.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="_5-3-案例3-分组topn" tabindex="-1"><a class="header-anchor" href="#_5-3-案例3-分组topn" aria-hidden="true">#</a> 5.3 案例3：分组TopN</h2>
<blockquote>
<p>需求：统计每个部门工资最高的前两名</p>
</blockquote>
<p>TopN函数：<code v-pre>row_number,rank,dense_rank</code></p>
<ul>
<li>
<p>row_number：对每个分区的数据进行编号，如果值相同，继续编号</p>
</li>
<li>
<p>rank：对每个分区的数据进行编号，如果值相同，编号相同，但留下空位</p>
</li>
<li>
<p>dense_rank：对每个分区的数据进行编号，如果值相同，编号相同，不留下空位</p>
</li>
</ul>
<h3 id="_5-3-1-实现" tabindex="-1"><a class="header-anchor" href="#_5-3-1-实现" aria-hidden="true">#</a> 5.3.1 实现</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> tb_emp
<span class="token punctuation">(</span>
    empno     string<span class="token punctuation">,</span>
    ename     string<span class="token punctuation">,</span>
    job       string<span class="token punctuation">,</span>
    managerid string<span class="token punctuation">,</span>
    hiredate  string<span class="token punctuation">,</span>
    salary    <span class="token keyword">double</span><span class="token punctuation">,</span>
    bonus     <span class="token keyword">double</span><span class="token punctuation">,</span>
    deptno    string
<span class="token punctuation">)</span> <span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'\t'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251627227.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 过滤每个部门的薪资最高的前两名</span>
<span class="token keyword">with</span> t1 <span class="token keyword">as</span> <span class="token punctuation">(</span>
    <span class="token keyword">select</span> empno<span class="token punctuation">,</span>
           ename<span class="token punctuation">,</span>
           salary<span class="token punctuation">,</span>
           deptno<span class="token punctuation">,</span>
           row_number<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">over</span> <span class="token punctuation">(</span><span class="token keyword">partition</span> <span class="token keyword">by</span> deptno <span class="token keyword">order</span> <span class="token keyword">by</span> salary <span class="token keyword">desc</span><span class="token punctuation">)</span> <span class="token keyword">as</span> rn
    <span class="token keyword">from</span> tb_emp<span class="token punctuation">)</span>
<span class="token keyword">select</span> <span class="token operator">*</span>
<span class="token keyword">from</span> t1
<span class="token keyword">where</span> rn <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251627620.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h1 id="_6-拉链表的设计与实现" tabindex="-1"><a class="header-anchor" href="#_6-拉链表的设计与实现" aria-hidden="true">#</a> 6. 拉链表的设计与实现</h1>
<blockquote>
<p>拉链表专门用于解决在数据仓库中数据发生变化如何实现数据存储的问题，<strong>也就是解决Hive数仓中数据如何更新这个问题</strong>。</p>
</blockquote>
<p>[scode type=&quot;green&quot;]</p>
<p>拉链表的设计是<strong>将更新的数据进行状态记录</strong>，没有发生更新的数据不进行状态存储，用于存储所有数据在不同时间上的所有状态，<strong>通过时间进行标记每个状态的生命周期</strong>，查询时，<strong>根据需求可以获取指定时间范围状态的数据</strong>，<strong>默认用9999-12-31等最大值来表示最新状态</strong>。</p>
<p>[/scode]</p>
<h2 id="_6-1-实现过程" tabindex="-1"><a class="header-anchor" href="#_6-1-实现过程" aria-hidden="true">#</a> 6.1 实现过程</h2>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251627627.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_6-1-1-创建拉链表" tabindex="-1"><a class="header-anchor" href="#_6-1-1-创建拉链表" aria-hidden="true">#</a> 6.1.1 创建拉链表</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> dw_zipper
<span class="token punctuation">(</span>
    userid    string<span class="token punctuation">,</span>
    phone     string<span class="token punctuation">,</span>
    nick      string<span class="token punctuation">,</span>
    gender    <span class="token keyword">int</span><span class="token punctuation">,</span>
    addr      string<span class="token punctuation">,</span>
    starttime string<span class="token punctuation">,</span>
    endtime   string
<span class="token punctuation">)</span> <span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'\t'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251627795.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_6-1-2-创建增量表" tabindex="-1"><a class="header-anchor" href="#_6-1-2-创建增量表" aria-hidden="true">#</a> 6.1.2 创建增量表</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 创建ods层增量表 加载数据</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> ods_zipper_update
<span class="token punctuation">(</span>
    userid    string<span class="token punctuation">,</span>
    phone     string<span class="token punctuation">,</span>
    nick      string<span class="token punctuation">,</span>
    gender    <span class="token keyword">int</span><span class="token punctuation">,</span>
    addr      string<span class="token punctuation">,</span>
    starttime string<span class="token punctuation">,</span>
    endtime   string
<span class="token punctuation">)</span> <span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'\t'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251627050.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_6-1-3-临时表操作" tabindex="-1"><a class="header-anchor" href="#_6-1-3-临时表操作" aria-hidden="true">#</a> 6.1.3 临时表操作</h3>
<blockquote>
<p>合并拉链表和增量表，并写入临时表</p>
<p>对于新增的数据，直接通过union all操作合并即可；对于修改的数据，将之前endtime的9999-12-31修改为新数据starttime的starttime-1，然后通过union all合并修改后的数据即可。</p>
</blockquote>
<p>创建临时表：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> tmp_zipper
<span class="token punctuation">(</span>
    userid    string<span class="token punctuation">,</span>
    phone     string<span class="token punctuation">,</span>
    nick      string<span class="token punctuation">,</span>
    gender    <span class="token keyword">int</span><span class="token punctuation">,</span>
    addr      string<span class="token punctuation">,</span>
    starttime string<span class="token punctuation">,</span>
    endtime   string
<span class="token punctuation">)</span> <span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'\t'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>合并数据到临时表中：</p>
<blockquote>
<p>第一个select是union所有新增数据，第二个select是将修改的数据的endtime修改为新数据starttime的starttime-1</p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> overwrite <span class="token keyword">table</span> tmp_zipper
<span class="token keyword">select</span> userid<span class="token punctuation">,</span>
       phone<span class="token punctuation">,</span>
       nick<span class="token punctuation">,</span>
       gender<span class="token punctuation">,</span>
       addr<span class="token punctuation">,</span>
       starttime<span class="token punctuation">,</span>
       endtime
<span class="token keyword">from</span> ods_zipper_update
<span class="token keyword">union</span> <span class="token keyword">all</span>
<span class="token comment">-- 查询原来拉链表的所有数据，并将这次需要更新的数据的endTime更改为更新值的startTime</span>
<span class="token keyword">select</span> a<span class="token punctuation">.</span>userid<span class="token punctuation">,</span>
       a<span class="token punctuation">.</span>phone<span class="token punctuation">,</span>
       a<span class="token punctuation">.</span>nick<span class="token punctuation">,</span>
       a<span class="token punctuation">.</span>gender<span class="token punctuation">,</span>
       a<span class="token punctuation">.</span>addr<span class="token punctuation">,</span>
       a<span class="token punctuation">.</span>starttime<span class="token punctuation">,</span>
       <span class="token comment">-- 如果这条数据没有更新或者这条数据不是要更改的数据，就保留原来的值，否则就改为新数据的开始时间-1</span>
       <span class="token keyword">if</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>userid <span class="token operator">is</span> <span class="token boolean">null</span> <span class="token operator">or</span> a<span class="token punctuation">.</span>endtime <span class="token operator">&lt;</span> <span class="token string">'9999-12-31'</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span>endtime<span class="token punctuation">,</span> date_sub<span class="token punctuation">(</span>b<span class="token punctuation">.</span>starttime<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">as</span> endtime
<span class="token keyword">from</span> dw_zipper a
         <span class="token keyword">left</span> <span class="token keyword">join</span> ods_zipper_update b
                   <span class="token keyword">on</span> a<span class="token punctuation">.</span>userid <span class="token operator">=</span> b<span class="token punctuation">.</span>userid<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-1-4-覆盖到拉链表" tabindex="-1"><a class="header-anchor" href="#_6-1-4-覆盖到拉链表" aria-hidden="true">#</a> 6.1.4 覆盖到拉链表</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 覆盖拉链表</span>
<span class="token keyword">insert</span> overwrite <span class="token keyword">table</span> dw_zipper
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tmp_zipper<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251627534.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div></template>


