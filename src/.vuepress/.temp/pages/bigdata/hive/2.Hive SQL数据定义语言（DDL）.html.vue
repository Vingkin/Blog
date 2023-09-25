<template><div><h1 id="_1-hive-sql-ddl建表基础语法" tabindex="-1"><a class="header-anchor" href="#_1-hive-sql-ddl建表基础语法" aria-hidden="true">#</a> 1 Hive SQL DDL建表基础语法</h1>
<h2 id="_1-1-hive建表完整语法树" tabindex="-1"><a class="header-anchor" href="#_1-1-hive建表完整语法树" aria-hidden="true">#</a> 1.1 Hive建表完整语法树</h2>
<ul>
<li><strong>蓝色字体</strong>是建表语法的关键字，用于指定某些功能。</li>
<li>**[ ]**中括号的语法表示可选。</li>
<li>**|**表示使用的时候，左右语法二选一。</li>
<li><strong>建表语句中的语法顺序要和语法树中顺序保持一致。</strong></li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251621543.png" alt="Hive建表完整语法树" tabindex="0" loading="lazy"><figcaption>Hive建表完整语法树</figcaption></figure>
<h2 id="_1-2-hive数据类型详解" tabindex="-1"><a class="header-anchor" href="#_1-2-hive数据类型详解" aria-hidden="true">#</a> 1.2 Hive数据类型详解</h2>
<blockquote>
<p>指的是表中列的字段类型</p>
</blockquote>
<ul>
<li><strong>原生数据类型(primitive data type)</strong>：数值类型、时间日期类型、字符串类型、杂项数据类型</li>
<li><strong>复杂数据类型(complex data type)</strong>：array数组、map映射、struct结构、union联合体</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251621602.png" alt="原生数据类型" tabindex="0" loading="lazy"><figcaption>原生数据类型</figcaption></figure>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251621109.png" alt="复杂数据类型" tabindex="0" loading="lazy"><figcaption>复杂数据类型</figcaption></figure>
<p><strong>注意事项：</strong></p>
<ul>
<li>Hive SQL中，数据类型<strong>英文字母大小写不敏感</strong>；</li>
<li>除SQL数据类型外，还<strong>支持Java数据类型</strong>，比如字符串string；</li>
<li>复杂数据类型的使用通常需要<strong>和分隔符指定语法配合使用</strong>；</li>
<li>如果定义的数据类型和文件不一致，<strong>Hive会尝试隐式转换，但是不保证成功</strong>。</li>
</ul>
<p><strong>隐式转换：</strong></p>
<blockquote>
<p>原生类型从窄类型到宽类型的转换称为隐式转换，反之，则不允许。 （也就是小数据变成大数据可以隐式转换）</p>
</blockquote>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">void</th>
<th style="text-align:center">boolean</th>
<th style="text-align:center">tinyint</th>
<th style="text-align:center">smallint</th>
<th style="text-align:center">int</th>
<th style="text-align:center">bigint</th>
<th style="text-align:center">float</th>
<th style="text-align:center">double</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><strong>void to</strong></td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
</tr>
<tr>
<td style="text-align:center"><strong>boolean to</strong></td>
<td style="text-align:center">false</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
</tr>
<tr>
<td style="text-align:center"><strong>tinyint to</strong></td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
</tr>
<tr>
<td style="text-align:center"><strong>smallint to</strong></td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
</tr>
<tr>
<td style="text-align:center"><strong>int to</strong></td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
</tr>
<tr>
<td style="text-align:center"><strong>bigint to</strong></td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
</tr>
<tr>
<td style="text-align:center"><strong>float to</strong></td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">true</td>
<td style="text-align:center">true</td>
</tr>
<tr>
<td style="text-align:center"><strong>double to</strong></td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">false</td>
<td style="text-align:center">true</td>
</tr>
</tbody>
</table>
<p><strong>显示转换：</strong></p>
<blockquote>
<p>显式类型转换使用<code v-pre>CAST</code>函数</p>
</blockquote>
<p>例如，<code v-pre>CAST('100' as INT)</code>会将100字符串转换为100整数值。 如果强制转换失败，例如<code v-pre>CAST('Allen' as INT)</code>，该函数返回NULL。</p>
<h2 id="_1-3-hive读写文件机制" tabindex="-1"><a class="header-anchor" href="#_1-3-hive读写文件机制" aria-hidden="true">#</a> 1.3 Hive读写文件机制</h2>
<blockquote>
<p>SerDe是Serializer、Deserializer的简称，目的是用于序列化和反序列化</p>
</blockquote>
<ul>
<li>序列化是对象转化为字节码的过程</li>
<li>反序列化是字节码转换为对象的过程</li>
</ul>
<h3 id="_1-3-1-hive读写文件流程" tabindex="-1"><a class="header-anchor" href="#_1-3-1-hive读写文件流程" aria-hidden="true">#</a> 1.3.1 Hive读写文件流程</h3>
<ul>
<li>Hive读取文件机制：首先调用InputFormat（默认TextInputFormat），返回一条一条kv键值对记录（默认是一行对应一条键值对）。然后调用SerDe（默认LazySimpleSerDe）的Deserializer，将一条记录中的value根据分隔符切分为各个字段。(<strong>HDFS files - TextInputFormat - &lt;key, value&gt; - Deserializer - Row object</strong> )</li>
<li>Hive写文件机制：将Row写入文件时，首先调用SerDe（默认LazySimpleSerDe）的Serializer将对象转换成字节序列，然后调用OutputFormat（默认HiveIgnoreKeyTextOutputFormat）将数据写入HDFS文件中。(<strong>Row object - Serializer - &lt;key, value&gt; - HiveIgnoreKeyTextOutputFormat - HDFS files</strong>)</li>
</ul>
<h3 id="_1-3-2-serde相关语法" tabindex="-1"><a class="header-anchor" href="#_1-3-2-serde相关语法" aria-hidden="true">#</a> 1.3.2 SerDe相关语法</h3>
<blockquote>
<p><code v-pre>  [ROW FORMAT DELIMITED|SERDE serde_name WITH SERDEPROPERTIES (property_name=property_value,...)]</code></p>
</blockquote>
<p>表创建语句中的ROW FORMAT这一行所代表的是跟读写文件、序列化SerDe相关的语法：</p>
<ul>
<li>使用哪个SerDe类进行序列化（默认<strong>LazySimpleSerDe</strong>）</li>
<li>如何指定分隔符</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251622498.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>如果<strong>使用delimited表示使用默认的LazySimpleSerDe类来处理数据</strong></li>
<li>如果数据文件格式比较特殊可以使用<code v-pre>ROW FORMAT SERDE serde_name</code>指定其他的SerDe类来处理数据,甚至支持用户自定义SerDe类。</li>
</ul>
<h3 id="_1-3-3-lazysimpleserde分隔符指定" tabindex="-1"><a class="header-anchor" href="#_1-3-3-lazysimpleserde分隔符指定" aria-hidden="true">#</a> 1.3.3 LazySimpleSerDe分隔符指定</h3>
<blockquote>
<p>LazySimpleSerDe是Hive默认的序列化类，包含4种子语法，分别用于指定字段之间、集合元素之间、map映射 kv之间、换行的分隔符号</p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ROW</span> FORMAT DELIMITED
	<span class="token punctuation">[</span><span class="token keyword">FIELDS</span> <span class="token keyword">TERMINATED</span> <span class="token keyword">BY</span> <span class="token keyword">char</span><span class="token punctuation">]</span> <span class="token comment">-- 字段之间分隔符</span>
	<span class="token punctuation">[</span>COLLECTION ITEMS <span class="token keyword">TERMINATED</span> <span class="token keyword">BY</span> <span class="token keyword">char</span><span class="token punctuation">]</span> <span class="token comment">-- 集合元素之间分隔符</span>
	<span class="token punctuation">[</span>MAP <span class="token keyword">KEY</span> <span class="token keyword">TERMINATED</span> <span class="token keyword">BY</span> <span class="token keyword">char</span><span class="token punctuation">]</span> <span class="token comment">-- Map映射KV之间的分隔符</span>
	<span class="token punctuation">[</span><span class="token keyword">LINES</span> <span class="token keyword">TERMINATED</span> <span class="token keyword">BY</span> <span class="token keyword">char</span><span class="token punctuation">]</span> <span class="token comment">-- 行数据之间的分隔符</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Hive默认分隔符：</strong>'\001'</p>
<h2 id="_1-4-hive数据存储路径" tabindex="-1"><a class="header-anchor" href="#_1-4-hive数据存储路径" aria-hidden="true">#</a> 1.4 Hive数据存储路径</h2>
<h3 id="_1-4-1-默认存储路径" tabindex="-1"><a class="header-anchor" href="#_1-4-1-默认存储路径" aria-hidden="true">#</a> 1.4.1 默认存储路径</h3>
<p>Hive表默认存储路径是由<code v-pre>${HIVE_HOME}/conf/hive-site.xml</code>配置文件的<code v-pre>hive.metastore.warehouse.dir</code>属性指定，<strong>默认值</strong>是：<code v-pre>/user/hive/warehouse</code>。</p>
<h3 id="_1-4-2-指定存储路径" tabindex="-1"><a class="header-anchor" href="#_1-4-2-指定存储路径" aria-hidden="true">#</a> 1.4.2 指定存储路径</h3>
<p>在Hive建表的时候，可以通过<strong>location语法来更改数据在HDFS上的存储路径</strong></p>
<p>语法：<code v-pre>LOCATION '&lt;hdfs_location&gt;'</code></p>
<h2 id="_1-5-基础建表语法联系" tabindex="-1"><a class="header-anchor" href="#_1-5-基础建表语法联系" aria-hidden="true">#</a> 1.5 基础建表语法联系</h2>
<p><strong>数据文件：</strong></p>
<p>字段：id、name（英雄名称）、win_rate（胜率）、skin_price（皮肤及价格）</p>
<div class="language-reStructuredText line-numbers-mode" data-ext="reStructuredText"><pre v-pre class="language-reStructuredText"><code>1,孙悟空,53,西部大镖客:288-大圣娶亲:888-全息碎片:0-至尊宝:888-地狱火:1688
2,鲁班七号,54,木偶奇遇记:288-福禄兄弟:288-黑桃队长:60-电玩小子:2288-星空梦想:0
3,后裔,53,精灵王:288-阿尔法小队:588-辉光之辰:888-黄金射手座:1688-如梦令:1314
4,铠,52,龙域领主:288-曙光守护者:1776
5,韩信,52,飞衡:1788-逐梦之影:888-白龙吟:1188-教廷特使:0-街头霸王:888
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>建表语句：</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token operator">not</span> <span class="token keyword">exists</span> t_hot_hero_skin_price
<span class="token punctuation">(</span>
    id         <span class="token keyword">int</span><span class="token punctuation">,</span>
    name       string <span class="token keyword">comment</span> <span class="token string">"英雄名称"</span><span class="token punctuation">,</span>
    win_rate   <span class="token keyword">double</span> <span class="token keyword">comment</span> <span class="token string">"胜率"</span><span class="token punctuation">,</span>
    skin_price map<span class="token operator">&lt;</span>string<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">></span> <span class="token keyword">comment</span> <span class="token string">"皮肤价格"</span>
<span class="token punctuation">)</span> <span class="token keyword">comment</span> <span class="token string">"热门英雄胜率及皮肤价格"</span>
    <span class="token keyword">row</span> format delimited
        <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">","</span> <span class="token comment">-- 指定字段之间的分隔符</span>
        collection items <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">"-"</span> <span class="token comment">-- 指定集合元素之间的分隔符</span>
        map <span class="token keyword">keys</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">":"</span><span class="token punctuation">;</span> <span class="token comment">-- 指定map元素kv之间的分隔符</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_2-hive-sql-ddl-建表高阶语法" tabindex="-1"><a class="header-anchor" href="#_2-hive-sql-ddl-建表高阶语法" aria-hidden="true">#</a> 2 Hive SQL DDL 建表高阶语法</h1>
<h2 id="_2-1-hive-内部表、外部表" tabindex="-1"><a class="header-anchor" href="#_2-1-hive-内部表、外部表" aria-hidden="true">#</a> 2.1 Hive 内部表、外部表</h2>
<blockquote>
<p>在创建表的时候通过<code v-pre>EXTERNAL</code>关键字指定，不指定表示内部表</p>
<p><code v-pre>create [external] table xxx ();</code></p>
</blockquote>
<p><strong>内部表和外部表的主要区别是外部表再删除时会删除HDFS上的源数据。而外部表不会，外部表只会删除表的元数据，对于其元数据并不会删除。</strong></p>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">内部表 / 托管表</th>
<th style="text-align:center">外部表</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><strong>创建方式</strong></td>
<td style="text-align:center">默认</td>
<td style="text-align:center">使用EXTERNAL关键字</td>
</tr>
<tr>
<td style="text-align:center"><strong>Hive管理范围</strong></td>
<td style="text-align:center">元数据、表数据</td>
<td style="text-align:center">元数据</td>
</tr>
<tr>
<td style="text-align:center"><strong>删除表结果</strong></td>
<td style="text-align:center">删除元数据、删除HDFS上的表数据</td>
<td style="text-align:center">只会删除元数据</td>
</tr>
<tr>
<td style="text-align:center"><strong>操作</strong></td>
<td style="text-align:center">支持ARCHIVE，UNARCHIVE，TRUNCATE，MERGE，CONCATENATE</td>
<td style="text-align:center">不支持</td>
</tr>
<tr>
<td style="text-align:center"><strong>事务</strong></td>
<td style="text-align:center">支持ACID / 事务性</td>
<td style="text-align:center">不支持</td>
</tr>
<tr>
<td style="text-align:center"><strong>缓存</strong></td>
<td style="text-align:center">支持结果缓存</td>
<td style="text-align:center">不支持</td>
</tr>
</tbody>
</table>
<h2 id="_2-2-hive-partitioned-tables-分区表" tabindex="-1"><a class="header-anchor" href="#_2-2-hive-partitioned-tables-分区表" aria-hidden="true">#</a> 2.2 Hive Partitioned Tables 分区表</h2>
<blockquote>
<p>当Hive表对应的数据量大、文件个数多时，<strong>为了避免查询时全表扫描数据</strong>，Hive支持根据指定的字段对表进行分区，分区的字段可以是日期、地域、种类等具有标识意义的字段。</p>
</blockquote>
<p><strong>本质：</strong></p>
<ul>
<li>分区的概念提供了一种将Hive表数据分离为多个文件/目录的方法。</li>
<li><strong>不同分区对应着不同的文件夹，同一分区的数据存储在同一个文件夹下</strong>。</li>
<li>查询过滤的时候只需要根据分区值找到对应的文件夹，扫描本文件夹下本分区下的文件即可，避免全表数据扫描。</li>
<li>这种指定分区查询的方式叫做<strong>分区裁剪</strong>。</li>
</ul>
<p><strong>注意事项：</strong></p>
<ol>
<li>分区表不是建表的必要语法规则，是一种<strong>优化手段表</strong>，可选；</li>
<li><strong>分区字段不能是表中已有的字段</strong>，不能重复；</li>
<li>分区字段是<strong>虚拟字段</strong>，其数据并不存储在底层的文件中；</li>
<li>分区字段值的确定来自于用户价值数据手动指定（<strong>静态分区</strong>）或者根据查询结果位置自动推断（<strong>动态分区</strong>）</li>
<li>Hive<strong>支持多重分区</strong>，也就是说在分区的基础上继续分区，划分更加细粒度</li>
</ol>
<h3 id="_2-2-1-创建分区表" tabindex="-1"><a class="header-anchor" href="#_2-2-1-创建分区表" aria-hidden="true">#</a> 2.2.1 创建分区表</h3>
<p>针对《王者荣耀》英雄数据，重新创建一张分区表<strong>t_all_hero_part</strong>，以role角色作为分区字段</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token operator">not</span> <span class="token keyword">exists</span> t_all_hero_part
<span class="token punctuation">(</span>
    id           <span class="token keyword">int</span><span class="token punctuation">,</span>
    name         string<span class="token punctuation">,</span>
    hp_max       <span class="token keyword">int</span><span class="token punctuation">,</span>
    mp_max       <span class="token keyword">int</span><span class="token punctuation">,</span>
    attack_max   <span class="token keyword">int</span><span class="token punctuation">,</span>
    defense_max  <span class="token keyword">int</span><span class="token punctuation">,</span>
    attack_range string<span class="token punctuation">,</span>
    role_main    string<span class="token punctuation">,</span>
    role_assist  string
<span class="token punctuation">)</span>
    partitioned <span class="token keyword">by</span> <span class="token punctuation">(</span>role string<span class="token punctuation">)</span> <span class="token comment">-- 分区字段不能和表字段重复</span>
    <span class="token keyword">row</span> format delimited
        <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">"\t"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建完成后当使用<code v-pre>select * from t_all_hero_part</code>时会发现有多了个role字段，该字段是虚拟字段，查询的时候尽量先使用where进行分区过滤，查询指定分区的数据，避免全表扫描，比如下述代码：</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 先基于分区过滤 再查询</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> t_all_hero_part <span class="token keyword">where</span> role<span class="token operator">=</span><span class="token string">"sheshou"</span> <span class="token operator">and</span> hp_max <span class="token operator">></span><span class="token number">6000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-2-分区表数据加载" tabindex="-1"><a class="header-anchor" href="#_2-2-2-分区表数据加载" aria-hidden="true">#</a> 2.2.2 分区表数据加载</h3>
<blockquote>
<p>分区表数据加载主要分为静态加载和动态加载两种。其实还可以通过MSCK实现分区表数据的加载，后面进行具体阐述。</p>
</blockquote>
<p><strong>静态分区加载：</strong></p>
<p><code v-pre>load data [local] inpath 'filepath ' into table tablename partition(分区字段='分区值'...)</code>，其中local为可选字段，写了表示客户端路径，没写表示HDFS路径。通过下面代码可以发现**静态分区的属性值由用户加载数据时手动指定。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 静态分区</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> inpath <span class="token string">'/root/hivedata/archer.txt'</span> <span class="token keyword">into</span> <span class="token keyword">table</span> t_all_hero <span class="token keyword">partition</span> <span class="token punctuation">(</span>role <span class="token operator">=</span> <span class="token string">'sheshou'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> inpath <span class="token string">'/root/hivedata/assassin.txt'</span> <span class="token keyword">into</span> <span class="token keyword">table</span> t_all_hero <span class="token keyword">partition</span> <span class="token punctuation">(</span>role <span class="token operator">=</span> <span class="token string">'cike'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> inpath <span class="token string">'/root/hivedata/mage.txt'</span> <span class="token keyword">into</span> <span class="token keyword">table</span> t_all_hero <span class="token keyword">partition</span> <span class="token punctuation">(</span>role <span class="token operator">=</span> <span class="token string">'fashi'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> inpath <span class="token string">'/root/hivedata/support.txt'</span> <span class="token keyword">into</span> <span class="token keyword">table</span> t_all_hero <span class="token keyword">partition</span> <span class="token punctuation">(</span>role <span class="token operator">=</span> <span class="token string">'fuzhu'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> inpath <span class="token string">'/root/hivedata/tank.txt'</span> <span class="token keyword">into</span> <span class="token keyword">table</span> t_all_hero <span class="token keyword">partition</span> <span class="token punctuation">(</span>role <span class="token operator">=</span> <span class="token string">'tanke'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> inpath <span class="token string">'/root/hivedata/warrior.txt'</span> <span class="token keyword">into</span> <span class="token keyword">table</span> t_all_hero <span class="token keyword">partition</span> <span class="token punctuation">(</span>role <span class="token operator">=</span> <span class="token string">'zhanshi'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>动态分区加载：</strong></p>
<blockquote>
<p>分区的字段值是基于查询结果（参数位置）自动推断出来的。核心语法就是<strong>insert+select</strong></p>
</blockquote>
<p>使用动态分区要设置两个参数：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment"># 是否开启动态分区功能</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span>dynamic<span class="token punctuation">.</span><span class="token keyword">partition</span><span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment"># 指定动态分区模式，分为nonstick非严格模式和strict严格模式。</span>
<span class="token comment"># strict严格模式要求至少有一个分区为静态分区。</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span>dynamic<span class="token punctuation">.</span><span class="token keyword">partition</span><span class="token punctuation">.</span><span class="token keyword">mode</span><span class="token operator">=</span>nonstrict<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- --创建一张新的分区表 t_all_hero_part_dynamic</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token operator">not</span> <span class="token keyword">exists</span> t_all_hero_dynamic
<span class="token punctuation">(</span>
    id           <span class="token keyword">int</span><span class="token punctuation">,</span>
    name         string<span class="token punctuation">,</span>
    hp_max       <span class="token keyword">int</span><span class="token punctuation">,</span>
    mp_max       <span class="token keyword">int</span><span class="token punctuation">,</span>
    attack_max   <span class="token keyword">int</span><span class="token punctuation">,</span>
    defense_max  <span class="token keyword">int</span><span class="token punctuation">,</span>
    attack_range string<span class="token punctuation">,</span>
    role_main    string<span class="token punctuation">,</span>
    role_assist  string
<span class="token punctuation">)</span>
    partitioned <span class="token keyword">by</span> <span class="token punctuation">(</span>role string<span class="token punctuation">)</span> <span class="token comment">-- 分区字段不能和表字段重复</span>
    <span class="token keyword">row</span> format delimited
        <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">"\t"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 执行动态分区插值</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> <span class="token keyword">table</span> t_all_hero_dynamic <span class="token keyword">partition</span> <span class="token punctuation">(</span>role<span class="token punctuation">)</span> <span class="token comment">-- 注意这里 分区值没有手动写死</span>
<span class="token keyword">select</span> tmp<span class="token punctuation">.</span><span class="token operator">*</span><span class="token punctuation">,</span> tmp<span class="token punctuation">.</span>role_main
<span class="token keyword">from</span> t_all_hero tmp<span class="token punctuation">;</span> <span class="token comment">-- 其中有两个参数tmp.* tmp.role_main。表示tmp.role_main分区插入tmp.*值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-3-多重分区" tabindex="-1"><a class="header-anchor" href="#_2-2-3-多重分区" aria-hidden="true">#</a> 2.2.3 多重分区</h3>
<blockquote>
<p>多重 分区就是<strong>对分区进行继续分区</strong>，比如说先按省分区，省里面再按市分区。从HDFS的角度来看就是<strong>文件夹下继续划分文件夹</strong>。</p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 多分区表，按省份和市划分</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> t_user_province_city
<span class="token punctuation">(</span>
    id   <span class="token keyword">int</span><span class="token punctuation">,</span>
    name string<span class="token punctuation">,</span>
    age  <span class="token keyword">int</span>
<span class="token punctuation">)</span>
    partitioned <span class="token keyword">by</span> <span class="token punctuation">(</span>province string<span class="token punctuation">,</span> city string<span class="token punctuation">)</span>
    <span class="token keyword">row</span> format delimited
        <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">","</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 双分区表的数据加载 静态加载方式</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> inpath <span class="token string">'/root/hivedata/user.txt'</span> <span class="token keyword">into</span> <span class="token keyword">table</span> t_user_province_city
    <span class="token keyword">partition</span> <span class="token punctuation">(</span>province <span class="token operator">=</span> <span class="token string">'zhejiang'</span><span class="token punctuation">,</span> city <span class="token operator">=</span> <span class="token string">'hangzhou'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> inpath <span class="token string">'/root/hivedata/user.txt'</span> <span class="token keyword">into</span> <span class="token keyword">table</span> t_user_province_city
    <span class="token keyword">partition</span> <span class="token punctuation">(</span>province <span class="token operator">=</span> <span class="token string">'zhejiang'</span><span class="token punctuation">,</span> city <span class="token operator">=</span> <span class="token string">'ningbi'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> inpath <span class="token string">'/root/hivedata/user.txt'</span> <span class="token keyword">into</span> <span class="token keyword">table</span> t_user_province_city
    <span class="token keyword">partition</span> <span class="token punctuation">(</span>province <span class="token operator">=</span> <span class="token string">'shanghai'</span><span class="token punctuation">,</span> city <span class="token operator">=</span> <span class="token string">'pudong'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-3-hive-bucketed-tables-分桶表" tabindex="-1"><a class="header-anchor" href="#_2-3-hive-bucketed-tables-分桶表" aria-hidden="true">#</a> 2.3 Hive Bucketed Tables 分桶表</h2>
<blockquote>
<p>根据表的某个字段进行hash求值，对桶的个数进行取模，从而将单个文件分成多个文件。其原理类似于MapReduce中的分区。</p>
</blockquote>
<p><strong>好处：</strong></p>
<ol>
<li>基于分桶字段查询可以减少全表扫描。因为可以先计算出在哪一个桶文件中，然后在该文件中进行查找。</li>
<li>JOIN时可以提高MR程序效率，减少笛卡尔积数量（前提是对JOIN的字段进行分桶）<br>
<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251622872.png" alt="" loading="lazy"></li>
<li>分桶表数据进行<strong>高效抽样</strong>。当数据量特别大时，对全体数据进行处理存在困难时，抽样就显得尤其重要了。抽样可以从被抽取的数据中估计和推断出整体的特性，是科学实验、质量检验、社会调查普遍采用的一种经济有效的工作和研究方法。</li>
</ol>
<h3 id="_2-3-1-基本语法" tabindex="-1"><a class="header-anchor" href="#_2-3-1-基本语法" aria-hidden="true">#</a> 2.3.1 基本语法</h3>
<p><code v-pre>[CLUSTERED BY (col_name, col_name, ...) [SORTED BY (col_name [ASC|DESC], ...)] INTO num_buckets BUCKETS]</code></p>
<ul>
<li><code v-pre>CLUSTERED BY (col_name)</code>表示根据哪个字段进行分；</li>
<li><code v-pre>SORTED BY (col_name [ASC|DESC], ...)</code>表示根据那个字段进行升序/降序排序，可选</li>
<li><code v-pre>INTO N BUCKETS</code>表示分为几桶（也就是几个部分）</li>
<li>需要注意的是，<strong>分桶的字段必须是表中已经存在的字段</strong></li>
</ul>
<h3 id="_2-3-2-创建分桶表" tabindex="-1"><a class="header-anchor" href="#_2-3-2-创建分桶表" aria-hidden="true">#</a> 2.3.2 创建分桶表</h3>
<blockquote>
<p>**案例：**对美国新冠疫情的一份数据进行按state进行分成5桶，并且按累计确诊病例进行倒序排序</p>
</blockquote>
<p>**数据字段含义：**count_date（统计日期）,county（县）,state（州）,fips（县编码code）,cases（累计确诊病例）,deaths（累计死亡病例）</p>
<p><strong>部分数据展示：</strong></p>
<div class="language-txt line-numbers-mode" data-ext="txt"><pre v-pre class="language-txt"><code>2021-01-28,Autauga,Alabama,01001,5554,69
2021-01-28,Baldwin,Alabama,01003,17779,225
2021-01-28,Barbour,Alabama,01005,1920,40
2021-01-28,Bibb,Alabama,01007,2271,51
2021-01-28,Blount,Alabama,01009,5612,98
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>分桶表创建语句：</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> t_usa_covid19_bucket_sort
<span class="token punctuation">(</span>
    count_data string <span class="token keyword">comment</span> <span class="token string">"统计日期"</span><span class="token punctuation">,</span>
    county     string <span class="token keyword">comment</span> <span class="token string">"县"</span><span class="token punctuation">,</span>
    state      string <span class="token keyword">comment</span> <span class="token string">"州"</span><span class="token punctuation">,</span>
    fips       <span class="token keyword">int</span> <span class="token keyword">comment</span> <span class="token string">"县编码"</span><span class="token punctuation">,</span>
    cases      <span class="token keyword">int</span> <span class="token keyword">comment</span> <span class="token string">"累计确诊病例"</span><span class="token punctuation">,</span>
    deaths     <span class="token keyword">int</span> <span class="token keyword">comment</span> <span class="token string">"累计死亡病例"</span>
<span class="token punctuation">)</span> <span class="token keyword">clustered</span> <span class="token keyword">by</span> <span class="token punctuation">(</span>state<span class="token punctuation">)</span> sorted <span class="token keyword">by</span> <span class="token punctuation">(</span>cases <span class="token keyword">desc</span><span class="token punctuation">)</span> <span class="token keyword">into</span> <span class="token number">5</span> buckets<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-3-分桶表数据加载" tabindex="-1"><a class="header-anchor" href="#_2-3-3-分桶表数据加载" aria-hidden="true">#</a> 2.3.3 分桶表数据加载</h3>
<blockquote>
<p>分桶表数据加载是通过对普通表select，然后insert到分桶表实现的</p>
</blockquote>
<p><strong>step1：开启分桶功能（hive2.0开始已经不需要）</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> hive<span class="token punctuation">.</span>enforce<span class="token punctuation">.</span>bucketing<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>step2：创建普通数据表并载入数据</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> t_usa_covid19
<span class="token punctuation">(</span>
    count_data string <span class="token keyword">comment</span> <span class="token string">"统计日期"</span><span class="token punctuation">,</span>
    county     string <span class="token keyword">comment</span> <span class="token string">"县"</span><span class="token punctuation">,</span>
    state      string <span class="token keyword">comment</span> <span class="token string">"州"</span><span class="token punctuation">,</span>
    fips       <span class="token keyword">int</span> <span class="token keyword">comment</span> <span class="token string">"县编码"</span><span class="token punctuation">,</span>
    cases      <span class="token keyword">int</span> <span class="token keyword">comment</span> <span class="token string">"累计确诊病例"</span><span class="token punctuation">,</span>
    deaths     <span class="token keyword">int</span> <span class="token keyword">comment</span> <span class="token string">"累计死亡病例"</span>
<span class="token punctuation">)</span>
    <span class="token keyword">row</span> format delimited
        <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">","</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>step3：使用insert+select语法将数据加载到分桶表中</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> t_usa_covid19_bucket_sort
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> t_usa_covid19<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在HDFS中，<code v-pre>/user/hive/warehouse/vingkin.db/t_usa_covid19_bucket_sort</code>目录下就有有5个对应的分桶文件。</p>
<h2 id="_2-4-hive-transactional-tables-事务表" tabindex="-1"><a class="header-anchor" href="#_2-4-hive-transactional-tables-事务表" aria-hidden="true">#</a> 2.4 Hive Transactional Tables 事务表</h2>
<p><strong>事务表使用时的相关局限性：</strong></p>
<ol>
<li>尚不支持BEGIN，COMMIT和ROLLBACK。所有语言操作都是自动提交的。</li>
<li>仅支持<strong>ORC文件格式</strong>（STORED AS ORC）。</li>
<li>默认情况下事务配置为关闭。需要<strong>配置参数开启</strong>使用。</li>
<li>表必须是**分桶表（Bucketed）**才可以使用事务功能。</li>
<li>表参数<strong>transactional必须为true</strong>；</li>
<li>外部表不能成为ACID表，不允许从非ACID会话读取/写入ACID表。</li>
</ol>
<h3 id="_2-4-1-创建事务表" tabindex="-1"><a class="header-anchor" href="#_2-4-1-创建事务表" aria-hidden="true">#</a> 2.4.1 创建事务表</h3>
<p><strong>step1：开启事务配置（可以使用set设置当前session生效，也可以配置在hive-site.xml中）</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> hive<span class="token punctuation">.</span>support<span class="token punctuation">.</span>concurrency <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">-- Hive是否支持高并发</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>enforce<span class="token punctuation">.</span>bucketing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">-- 从Hive2.0开始不再需要 是否开启分桶功能</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span>dynamic<span class="token punctuation">.</span><span class="token keyword">partition</span><span class="token punctuation">.</span><span class="token keyword">mode</span> <span class="token operator">=</span> nonstrict<span class="token punctuation">;</span> <span class="token comment">-- 动态分区模式 非严格</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>txn<span class="token punctuation">.</span>manager <span class="token operator">=</span> org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>hadoop<span class="token punctuation">.</span>hive<span class="token punctuation">.</span>ql<span class="token punctuation">.</span>lockmgr<span class="token punctuation">.</span>DbTxnManager<span class="token punctuation">;</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>compactor<span class="token punctuation">.</span>initiator<span class="token punctuation">.</span><span class="token keyword">on</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">-- 是否在Metastore实例上运行启动线程和清理线程</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>compactor<span class="token punctuation">.</span>worker<span class="token punctuation">.</span>threads <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">-- 在此Metastore实例上运行多少个压缩程序工作线程</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>step2：创建Hive事务表</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 注意 事务表创建要素：开启参数、分桶表、orc、表属性</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> trans_student
<span class="token punctuation">(</span>
    id   <span class="token keyword">int</span><span class="token punctuation">,</span>
    name string<span class="token punctuation">,</span>
    age  <span class="token keyword">int</span>
    <span class="token comment">-- 存储为orc 并且表的属性设置transactional=true</span>
<span class="token punctuation">)</span> <span class="token keyword">clustered</span> <span class="token keyword">by</span> <span class="token punctuation">(</span>id<span class="token punctuation">)</span> <span class="token keyword">into</span> <span class="token number">2</span> buckets stored <span class="token keyword">as</span> orc TBLPROPERTIES <span class="token punctuation">(</span><span class="token string">'transactional'</span> <span class="token operator">=</span> <span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>step3：针对事务表进行insert update delete操作</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> trans_student <span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">'vingkin'</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-5-hive-view-视图" tabindex="-1"><a class="header-anchor" href="#_2-5-hive-view-视图" aria-hidden="true">#</a> 2.5 Hive View 视图</h2>
<h3 id="_2-5-1-视图的相关概念" tabindex="-1"><a class="header-anchor" href="#_2-5-1-视图的相关概念" aria-hidden="true">#</a> 2.5.1 视图的相关概念</h3>
<ul>
<li>Hive中的<strong>视图（view）是一种虚拟表，只保存定义，不实际存储数据</strong>。</li>
<li>通常从真实的物理表查询中创建生成视图，也可以从已经存在的视图上创建新视图。</li>
<li>创建视图时，将冻结视图的架构，如果<strong>删除或更改基础表，则视图将失败</strong>。</li>
<li>视图是用来简化操作的，不缓冲记录，也没有提高查询性能。</li>
<li>视图<strong>不能进行修改</strong>操作（insert update delete）</li>
</ul>
<h3 id="_2-5-2-视图的相关语法" tabindex="-1"><a class="header-anchor" href="#_2-5-2-视图的相关语法" aria-hidden="true">#</a> 2.5.2 视图的相关语法</h3>
<ol>
<li>创建视图<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">view</span> v_usa_covid19 <span class="token keyword">as</span> <span class="token keyword">select</span> count_date<span class="token punctuation">,</span> county<span class="token punctuation">,</span>state<span class="token punctuation">,</span>deaths <span class="token keyword">from</span> t_usa_covid19 <span class="token keyword">limit</span> <span class="token number">5</span><span class="token punctuation">;</span>

<span class="token comment">-- 从已有视图创建新视图</span>
<span class="token keyword">create</span> <span class="token keyword">view</span> v_usa_covid19_from_view <span class="token keyword">as</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> v_usa_covid19 <span class="token keyword">limit</span> <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>显示当前已有视图<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> <span class="token keyword">tables</span><span class="token punctuation">;</span>
<span class="token keyword">show</span> views<span class="token punctuation">;</span><span class="token comment">--hive v2.2.0之后支持</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>查询视图<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> v_usa_covid19<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>视图插入演示<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 报错  SemanticException:A view cannot be used as target table for LOAD or INSERT</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> v_usa_covid19 <span class="token keyword">select</span> count_date<span class="token punctuation">,</span>county<span class="token punctuation">,</span>state<span class="token punctuation">,</span>deaths <span class="token keyword">from</span> t_usa_covid19<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>查看视图定义<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> <span class="token keyword">create</span> <span class="token keyword">table</span> v_usa_covid19<span class="token punctuation">;</span> <span class="token comment">-- 注意是table</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>删除视图<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">drop</span> <span class="token keyword">view</span> v_usa_covid19_from_view<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>更改视图属性<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">view</span> v_usa_covid19 <span class="token keyword">set</span> TBLPROPERTIES <span class="token punctuation">(</span><span class="token string">'comment'</span> <span class="token operator">=</span> <span class="token string">'This is a view'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>更改视图定义<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">view</span> v_usa_covid19 <span class="token keyword">as</span>  <span class="token keyword">select</span> county<span class="token punctuation">,</span>deaths <span class="token keyword">from</span> t_usa_covid19 <span class="token keyword">limit</span> <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<h3 id="_2-5-3-使用视图的好处" tabindex="-1"><a class="header-anchor" href="#_2-5-3-使用视图的好处" aria-hidden="true">#</a> 2.5.3 使用视图的好处</h3>
<ol>
<li>
<p>将真实表中特定的列数据提供给用户，<strong>保护数据隐私</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">--通过视图来限制数据访问可以用来保护信息不被随意查询:</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> userinfo<span class="token punctuation">(</span>firstname string<span class="token punctuation">,</span> lastname string<span class="token punctuation">,</span> ssn string<span class="token punctuation">,</span> password string<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">create</span> <span class="token keyword">view</span> safer_user_info <span class="token keyword">as</span> <span class="token keyword">select</span> firstname<span class="token punctuation">,</span> lastname <span class="token keyword">from</span> userinfo<span class="token punctuation">;</span>

<span class="token comment">--可以通过where子句限制数据访问，比如，提供一个员工表视图，只暴露来自特定部门的员工信息:</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> employee<span class="token punctuation">(</span>firstname string<span class="token punctuation">,</span> lastname string<span class="token punctuation">,</span> ssn string<span class="token punctuation">,</span> password string<span class="token punctuation">,</span> department string<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">create</span> <span class="token keyword">view</span> techops_employee <span class="token keyword">as</span> <span class="token keyword">select</span> firstname<span class="token punctuation">,</span> lastname<span class="token punctuation">,</span> ssn <span class="token keyword">from</span> userinfo <span class="token keyword">where</span> department <span class="token operator">=</span> <span class="token string">'java'</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>使用视图优化嵌套查询</p>
</li>
</ol>
<h2 id="_2-6-materialized-views物化视图" tabindex="-1"><a class="header-anchor" href="#_2-6-materialized-views物化视图" aria-hidden="true">#</a> 2.6 Materialized Views物化视图</h2>
<h3 id="_2-6-1-物化视图相关概念" tabindex="-1"><a class="header-anchor" href="#_2-6-1-物化视图相关概念" aria-hidden="true">#</a> 2.6.1 物化视图相关概念</h3>
<ul>
<li>Hive3.0开始尝试引入物化视图，并提供对于<strong>物化视图的查询自动重写机制</strong>。（基于Apache Calcite实现）。</li>
<li>Hive的物化视图还提供了物化视图存储选择机制，可以本地存储在Hive，也可以通过用户自定义storage handlers存储在其他系统（如Druid）。</li>
<li>Hive引入物化视图的目的就是为了<strong>优化数据查询访问的效率,相当于从数据预处理的角度优化数据访问</strong>。</li>
<li>Hive从3.0丢弃了index索引的语法支持，推荐使用物化视图和列式存储文件格式来加快查询的速度。</li>
</ul>
<h3 id="_2-6-2-物化视图和视图的区别" tabindex="-1"><a class="header-anchor" href="#_2-6-2-物化视图和视图的区别" aria-hidden="true">#</a> 2.6.2 物化视图和视图的区别</h3>
<ul>
<li><strong>视图是虚拟的</strong>，逻辑存在的，只有定义没有存储数据。</li>
<li><strong>物化视图是真实的</strong>，物理存在的，里面存储着预计算的数据。</li>
<li>物化视图能够缓存数据，在创建物化视图的时候就把数据缓存起来了，Hive把物化视图当成一张“表”，将数据缓存。而视图只是创建一个虚表，只有表结构，没有数据，实际查询的时候再去改写SQL去访问实际的数据表。</li>
<li>视图的目的是简化降低查询语句的复杂度，而物化视图的目的是提高查询性能。</li>
</ul>
<h3 id="_2-6-3-物化视图相关语法" tabindex="-1"><a class="header-anchor" href="#_2-6-3-物化视图相关语法" aria-hidden="true">#</a> 2.6.3 物化视图相关语法</h3>
<blockquote>
<p>查询自动重写的意思是：对一个表进行查询，如果查询的字段在该表的物化视图中都有，那么系统会自动重写查询语句，对物化视图进行查询并返回结果</p>
<p>是否重写查询使用物化视图可以通过全局参数控制，默认为true： hive.materializedview.rewriting=true;</p>
<p>用户可选择性的控制指定的物化视图查询重写机制，语法如下：</p>
<p><code v-pre>ALTER MATERIALIZED VIEW [db_name.]materialized_view_name ENABLE|DISABLE REWRITE;</code></p>
</blockquote>
<p><strong>目前仅支持对物化视图的drop和show操作</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- Drops a materialized view</span>
<span class="token keyword">DROP</span> MATERIALIZED <span class="token keyword">VIEW</span> <span class="token punctuation">[</span>db_name<span class="token punctuation">.</span><span class="token punctuation">]</span>materialized_view_name<span class="token punctuation">;</span>
<span class="token comment">-- Shows materialized views (with optional filters)</span>
<span class="token keyword">SHOW</span> MATERIALIZED VIEWS <span class="token punctuation">[</span><span class="token operator">IN</span> database_name<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">-- Shows information about a specific materialized view</span>
<span class="token keyword">DESCRIBE</span> <span class="token punctuation">[</span><span class="token keyword">EXTENDED</span> <span class="token operator">|</span> FORMATTED<span class="token punctuation">]</span> <span class="token punctuation">[</span>db_name<span class="token punctuation">.</span><span class="token punctuation">]</span>materialized_view_name<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>新建一张事务表 student_trans</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> hive<span class="token punctuation">.</span>support<span class="token punctuation">.</span>concurrency <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">-- Hive是否支持并发</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>enforce<span class="token punctuation">.</span>bucketing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">-- 从Hive2.0开始不再需要  是否开启分桶功能</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span>dynamic<span class="token punctuation">.</span><span class="token keyword">partition</span><span class="token punctuation">.</span><span class="token keyword">mode</span> <span class="token operator">=</span> nonstrict<span class="token punctuation">;</span> <span class="token comment">-- 动态分区模式  非严格</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>txn<span class="token punctuation">.</span>manager <span class="token operator">=</span> org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>hadoop<span class="token punctuation">.</span>hive<span class="token punctuation">.</span>ql<span class="token punctuation">.</span>lockmgr<span class="token punctuation">.</span>DbTxnManager<span class="token punctuation">;</span> 
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>compactor<span class="token punctuation">.</span>initiator<span class="token punctuation">.</span><span class="token keyword">on</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">-- 是否在Metastore实例上运行启动线程和清理线程</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>compactor<span class="token punctuation">.</span>worker<span class="token punctuation">.</span>threads <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">-- 在此metastore实例上运行多少个压缩程序工作线程。</span>

<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span>  student_trans<span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> student_trans <span class="token punctuation">(</span>
      sno <span class="token keyword">int</span><span class="token punctuation">,</span>
      sname string<span class="token punctuation">,</span>
      sdept string<span class="token punctuation">)</span>
<span class="token keyword">clustered</span> <span class="token keyword">by</span> <span class="token punctuation">(</span>sno<span class="token punctuation">)</span> <span class="token keyword">into</span> <span class="token number">2</span> buckets stored <span class="token keyword">as</span> orc TBLPROPERTIES<span class="token punctuation">(</span><span class="token string">'transactional'</span><span class="token operator">=</span><span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>导入数据到student_trans中</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> overwrite <span class="token keyword">table</span> student_trans
<span class="token keyword">select</span> num<span class="token punctuation">,</span>name<span class="token punctuation">,</span>dept <span class="token keyword">from</span> student<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>对student_trans建立物化视图</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 注意 这里当执行CREATE MATERIALIZED VIEW，会启动一个MR对物化视图进行构建</span>
<span class="token keyword">CREATE</span> MATERIALIZED <span class="token keyword">VIEW</span> student_trans_agg
<span class="token keyword">AS</span> <span class="token keyword">SELECT</span> sdept<span class="token punctuation">,</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">as</span> sdept_cnt <span class="token keyword">from</span> student_trans <span class="token keyword">group</span> <span class="token keyword">by</span> sdept<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>显示已有的物化视图</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> <span class="token keyword">tables</span><span class="token punctuation">;</span>
<span class="token keyword">show</span> materialized views<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>对原始表student_trans查询</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 由于会命中物化视图，重写query查询物化视图，查询速度会加快（没有启动MR，只是普通的table scan）</span>
<span class="token keyword">SELECT</span> sdept<span class="token punctuation">,</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">as</span> sdept_cnt <span class="token keyword">from</span> student_trans <span class="token keyword">group</span> <span class="token keyword">by</span> sdept<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查询执行计划可以发现 查询被自动重写为TableScan alias: itcast.student_trans_agg</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 转换成了对物化视图的查询  提高了查询效率</span>
<span class="token keyword">explain</span> <span class="token keyword">SELECT</span> sdept<span class="token punctuation">,</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">as</span> sdept_cnt <span class="token keyword">from</span> student_trans <span class="token keyword">group</span> <span class="token keyword">by</span> sdept<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>禁用自动重写</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 禁用物化视图自动重写，禁用后对原表的查询通过MR实现</span>
<span class="token keyword">ALTER</span> MATERIALIZED <span class="token keyword">VIEW</span> student_trans_agg <span class="token keyword">DISABLE</span> REWRITE<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当原表发生改变时，使用REBUILD进行重构</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> MATERIALIZED <span class="token keyword">VIEW</span> <span class="token punctuation">[</span>db_name<span class="token punctuation">.</span><span class="token punctuation">]</span>materialized_view_name REBUILD<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>删除物化视图</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">drop</span> materialized <span class="token keyword">view</span> student_trans_agg<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="_3-hive-sql-ddl-其他语法" tabindex="-1"><a class="header-anchor" href="#_3-hive-sql-ddl-其他语法" aria-hidden="true">#</a> 3 Hive SQL DDL 其他语法</h1>
<h2 id="_3-1-database-schema-数据库-ddl-操作" tabindex="-1"><a class="header-anchor" href="#_3-1-database-schema-数据库-ddl-操作" aria-hidden="true">#</a> 3.1 Database|Schema（数据库）DDL 操作</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 创建数据库</span>
<span class="token keyword">create</span> <span class="token keyword">database</span> <span class="token keyword">if</span> <span class="token operator">not</span> <span class="token keyword">exists</span> itcast
<span class="token keyword">comment</span> <span class="token string">"this is my first db"</span>
<span class="token keyword">with</span> dbproperties <span class="token punctuation">(</span><span class="token string">'createdBy'</span><span class="token operator">=</span><span class="token string">'Allen'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 描述数据库信息</span>
<span class="token keyword">describe</span> <span class="token keyword">database</span> itcast<span class="token punctuation">;</span>
<span class="token keyword">describe</span> <span class="token keyword">database</span> <span class="token keyword">extended</span> itcast<span class="token punctuation">;</span>
<span class="token keyword">desc</span> <span class="token keyword">database</span> <span class="token keyword">extended</span> itcast<span class="token punctuation">;</span>

<span class="token comment">-- 切换数据库</span>
<span class="token keyword">use</span> <span class="token keyword">default</span><span class="token punctuation">;</span>
<span class="token keyword">use</span> itcast<span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> t_1<span class="token punctuation">(</span>id <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 删除数据库</span>
<span class="token comment">-- 注意 CASCADE关键字慎重使用</span>
<span class="token keyword">DROP</span> <span class="token punctuation">(</span><span class="token keyword">DATABASE</span><span class="token operator">|</span><span class="token keyword">SCHEMA</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token keyword">IF</span> <span class="token keyword">EXISTS</span><span class="token punctuation">]</span> database_name <span class="token punctuation">[</span><span class="token keyword">RESTRICT</span><span class="token operator">|</span><span class="token keyword">CASCADE</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">drop</span> <span class="token keyword">database</span> itcast <span class="token keyword">cascade</span> <span class="token punctuation">;</span>


<span class="token comment">-- 更改数据库属性</span>
<span class="token keyword">ALTER</span> <span class="token punctuation">(</span><span class="token keyword">DATABASE</span><span class="token operator">|</span><span class="token keyword">SCHEMA</span><span class="token punctuation">)</span> database_name <span class="token keyword">SET</span> DBPROPERTIES <span class="token punctuation">(</span>property_name<span class="token operator">=</span>property_value<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 更改数据库所有者</span>
<span class="token keyword">ALTER</span> <span class="token punctuation">(</span><span class="token keyword">DATABASE</span><span class="token operator">|</span><span class="token keyword">SCHEMA</span><span class="token punctuation">)</span> database_name <span class="token keyword">SET</span> OWNER <span class="token punctuation">[</span><span class="token keyword">USER</span><span class="token operator">|</span>ROLE<span class="token punctuation">]</span> user_or_role<span class="token punctuation">;</span>
<span class="token comment">-- 更改数据库位置</span>
<span class="token keyword">ALTER</span> <span class="token punctuation">(</span><span class="token keyword">DATABASE</span><span class="token operator">|</span><span class="token keyword">SCHEMA</span><span class="token punctuation">)</span> database_name <span class="token keyword">SET</span> LOCATION hdfs_path<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-2-table-表-ddl操作" tabindex="-1"><a class="header-anchor" href="#_3-2-table-表-ddl操作" aria-hidden="true">#</a> 3.2 Table（表）DDL操作</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 查询指定表的元数据信息</span>
<span class="token keyword">describe</span> formatted vingkin<span class="token punctuation">.</span>student_partition<span class="token punctuation">;</span>

<span class="token comment">-- 1、更改表名</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token keyword">RENAME</span> <span class="token keyword">TO</span> new_table_name<span class="token punctuation">;</span>

<span class="token comment">-- 2、更改表属性</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token keyword">SET</span> TBLPROPERTIES <span class="token punctuation">(</span>property_name <span class="token operator">=</span> property_value<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">--更改表注释</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> student <span class="token keyword">SET</span> TBLPROPERTIES <span class="token punctuation">(</span><span class="token string">'comment'</span> <span class="token operator">=</span> <span class="token string">"new comment for student table"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 3、更改SerDe属性</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token keyword">SET</span> SERDE serde_class_name <span class="token punctuation">[</span><span class="token keyword">WITH</span> SERDEPROPERTIES <span class="token punctuation">(</span>property_name <span class="token operator">=</span> property_value<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token punctuation">[</span><span class="token keyword">PARTITION</span> partition_spec<span class="token punctuation">]</span> <span class="token keyword">SET</span> SERDEPROPERTIES serde_properties<span class="token punctuation">;</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token keyword">SET</span> SERDEPROPERTIES <span class="token punctuation">(</span><span class="token string">'field.delim'</span> <span class="token operator">=</span> <span class="token string">','</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">--移除SerDe属性</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token punctuation">[</span><span class="token keyword">PARTITION</span> partition_spec<span class="token punctuation">]</span> UNSET SERDEPROPERTIES <span class="token punctuation">(</span>property_name<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 4、更改表的文件存储格式 该操作仅更改表元数据。现有数据的任何转换都必须在Hive之外进行。</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name  <span class="token keyword">SET</span> FILEFORMAT file_format<span class="token punctuation">;</span>

<span class="token comment">-- 5、更改表的存储位置路径</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token keyword">SET</span> LOCATION <span class="token string">"new location"</span><span class="token punctuation">;</span>

<span class="token comment">-- 6、更改列名称/类型/位置/注释</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> test_change <span class="token punctuation">(</span>a <span class="token keyword">int</span><span class="token punctuation">,</span> b <span class="token keyword">int</span><span class="token punctuation">,</span> c <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- First change column a's name to a1.</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> test_change CHANGE a a1 <span class="token keyword">INT</span><span class="token punctuation">;</span>
<span class="token comment">-- Next change column a1's name to a2, its data type to string, and put it after column b.</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> test_change CHANGE a1 a2 STRING <span class="token keyword">AFTER</span> b<span class="token punctuation">;</span>
<span class="token comment">-- The new table's structure is:  b int, a2 string, c int.</span>
<span class="token comment">-- Then change column c's name to c1, and put it as the first column.</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> test_change CHANGE c c1 <span class="token keyword">INT</span> <span class="token keyword">FIRST</span><span class="token punctuation">;</span>
<span class="token comment">-- The new table's structure is:  c1 int, b int, a2 string.</span>
<span class="token comment">-- Add a comment to column a1</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> test_change CHANGE a1 a1 <span class="token keyword">INT</span> <span class="token keyword">COMMENT</span> <span class="token string">'this is column a1'</span><span class="token punctuation">;</span>

<span class="token comment">-- 7、添加/替换列</span>
<span class="token comment">--使用ADD COLUMNS，您可以将新列添加到现有列的末尾但在分区列之前。</span>
<span class="token comment">-- REPLACE COLUMNS 将删除所有现有列，并添加新的列集。</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token keyword">ADD</span><span class="token operator">|</span><span class="token keyword">REPLACE</span> <span class="token keyword">COLUMNS</span> <span class="token punctuation">(</span>col_name data_type<span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-3-partition-分区-ddl操作" tabindex="-1"><a class="header-anchor" href="#_3-3-partition-分区-ddl操作" aria-hidden="true">#</a> 3.3 Partition（分区）DDL操作</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 1、增加分区</span>
<span class="token comment">-- step1: 创建表 手动加载分区数据</span>
<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> t_user_province<span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> t_user_province <span class="token punctuation">(</span>
    num <span class="token keyword">int</span><span class="token punctuation">,</span>
    name string<span class="token punctuation">,</span>
    sex string<span class="token punctuation">,</span>
    age <span class="token keyword">int</span><span class="token punctuation">,</span>
    dept string<span class="token punctuation">)</span> partitioned <span class="token keyword">by</span> <span class="token punctuation">(</span>province string<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> inpath <span class="token string">'/root/hivedata/students.txt'</span> <span class="token keyword">into</span> <span class="token keyword">table</span> t_user_province <span class="token keyword">partition</span><span class="token punctuation">(</span>province <span class="token operator">=</span><span class="token string">"SH"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- step2：添加一个分区</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> t_user_province <span class="token keyword">ADD</span> <span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>province<span class="token operator">=</span><span class="token string">'BJ'</span><span class="token punctuation">)</span> location
    <span class="token string">'/user/hive/warehouse/vingkin.db/t_user_province/province=BJ'</span><span class="token punctuation">;</span>

<span class="token comment">-- step3:必须自己把数据加载到增加的分区中 hive不会帮你添加</span>

<span class="token comment">-- 此外还支持一次添加多个分区</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token keyword">ADD</span> <span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>dt<span class="token operator">=</span><span class="token string">'2008-08-08'</span><span class="token punctuation">,</span> country<span class="token operator">=</span><span class="token string">'us'</span><span class="token punctuation">)</span> location <span class="token string">'/path/to/us/part080808'</span>
    <span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>dt<span class="token operator">=</span><span class="token string">'2008-08-09'</span><span class="token punctuation">,</span> country<span class="token operator">=</span><span class="token string">'us'</span><span class="token punctuation">)</span> location <span class="token string">'/path/to/us/part080809'</span><span class="token punctuation">;</span>

<span class="token comment">-- 2、重命名分区</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> t_user_province <span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>province <span class="token operator">=</span><span class="token string">"SH"</span><span class="token punctuation">)</span> <span class="token keyword">RENAME</span> <span class="token keyword">TO</span> <span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>province <span class="token operator">=</span><span class="token string">"Shanghai"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 3、删除分区</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token keyword">DROP</span> <span class="token punctuation">[</span><span class="token keyword">IF</span> <span class="token keyword">EXISTS</span><span class="token punctuation">]</span> <span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>dt<span class="token operator">=</span><span class="token string">'2008-08-08'</span><span class="token punctuation">,</span> country<span class="token operator">=</span><span class="token string">'us'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token keyword">DROP</span> <span class="token punctuation">[</span><span class="token keyword">IF</span> <span class="token keyword">EXISTS</span><span class="token punctuation">]</span> <span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>dt<span class="token operator">=</span><span class="token string">'2008-08-08'</span><span class="token punctuation">,</span> country<span class="token operator">=</span><span class="token string">'us'</span><span class="token punctuation">)</span> <span class="token keyword">PURGE</span><span class="token punctuation">;</span> <span class="token comment">--直接删除数据 不进垃圾桶</span>

<span class="token comment">-- 4、修复分区</span>
MSCK <span class="token punctuation">[</span>REPAIR<span class="token punctuation">]</span> <span class="token keyword">TABLE</span> table_name <span class="token punctuation">[</span><span class="token keyword">ADD</span><span class="token operator">/</span><span class="token keyword">DROP</span><span class="token operator">/</span>SYNC PARTITIONS<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">-- 5、修改分区</span>
<span class="token comment">-- 更改分区文件存储格式</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>dt<span class="token operator">=</span><span class="token string">'2008-08-09'</span><span class="token punctuation">)</span> <span class="token keyword">SET</span> FILEFORMAT file_format<span class="token punctuation">;</span>
<span class="token comment">-- 更改分区位置</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> table_name <span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>dt<span class="token operator">=</span><span class="token string">'2008-08-09'</span><span class="token punctuation">)</span> <span class="token keyword">SET</span> LOCATION <span class="token string">"new location"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-1-msck-修复分区" tabindex="-1"><a class="header-anchor" href="#_3-3-1-msck-修复分区" aria-hidden="true">#</a> 3.3.1 MSCK 修复分区</h3>
<blockquote>
<p>Hive将每个表的分区列表信息存储在其metastore中。但是，如果将新分区直接添加到HDFS（例如通过使用hadoop fs -put命令）或从HDFS中直接删除分区文件夹，则除非用户ALTER TABLE table_name ADD/DROP PARTITION在每个新添加的分区上运行命令，否则metastore（也就是Hive）将不会意识到分区信息的这些更改。</p>
<p>MSCK是metastore check的缩写，表示元数据检查操作，可用于元数据的修复。</p>
</blockquote>
<p><strong>step1：创建分区表</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> t_all_hero_part_msck<span class="token punctuation">(</span>
                                     id <span class="token keyword">int</span><span class="token punctuation">,</span>
                                     name string<span class="token punctuation">,</span>
                                     hp_max <span class="token keyword">int</span><span class="token punctuation">,</span>
                                     mp_max <span class="token keyword">int</span><span class="token punctuation">,</span>
                                     attack_max <span class="token keyword">int</span><span class="token punctuation">,</span>
                                     defense_max <span class="token keyword">int</span><span class="token punctuation">,</span>
                                     attack_range string<span class="token punctuation">,</span>
                                     role_main string<span class="token punctuation">,</span>
                                     role_assist string
<span class="token punctuation">)</span> partitioned <span class="token keyword">by</span> <span class="token punctuation">(</span>role string<span class="token punctuation">)</span>
    <span class="token keyword">row</span> format delimited
        <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">"\t"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>step2：使用HDFS命令创建分区文件夹</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>hadoop fs <span class="token parameter variable">-mkdir</span> <span class="token parameter variable">-p</span> /user/hive/warehouse/vingkin.db/t_all_hero_part_msck/role<span class="token operator">=</span>sheshou
hadoop fs <span class="token parameter variable">-mkdir</span> <span class="token parameter variable">-p</span> /user/hive/warehouse/vingkin.db/t_all_hero_part_msck/role<span class="token operator">=</span>tanke
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>step3：把数据文件上传到对应的分区文件夹</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>hadoop fs <span class="token parameter variable">-put</span> archer.txt /user/hive/warehouse/vingkin.db/t_all_hero_part_msck/role<span class="token operator">=</span>sheshou
hadoop fs <span class="token parameter variable">-put</span> tank.txt /user/hive/warehouse/vinngkin.db/t_all_hero_part_msck/role<span class="token operator">=</span>tanke
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>step4：使用MSCK命令进行修复</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- add partitions可以不写 因为默认就是增加分区</span>
MSCK repair <span class="token keyword">table</span> t_all_hero_part_msck <span class="token keyword">add</span> partitions<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>删除分区操作差不多</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- Step1：直接使用HDFS命令删除分区表的某一个分区文件夹</span>
hadoop fs <span class="token operator">-</span>rm <span class="token operator">-</span>r <span class="token operator">/</span><span class="token keyword">user</span><span class="token operator">/</span>hive<span class="token operator">/</span>warehouse<span class="token operator">/</span>itheima<span class="token punctuation">.</span>db<span class="token operator">/</span>t_all_hero_part_msck<span class="token operator">/</span>role<span class="token operator">=</span>sheshou

<span class="token comment">-- Step2：查询发现还有分区信息</span>
<span class="token comment">-- 因为元数据信息没有删除</span>
<span class="token keyword">show</span> partitions t_all_hero_part_msck<span class="token punctuation">;</span>

<span class="token comment">-- Step3：使用MSCK命令进行修复</span>
MSCK repair <span class="token keyword">table</span> t_all_hero_part_msck <span class="token keyword">drop</span> partitions<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


