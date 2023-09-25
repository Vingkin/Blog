<template><div><h2 id="_1-hive-sql-dml-load加载数据" tabindex="-1"><a class="header-anchor" href="#_1-hive-sql-dml-load加载数据" aria-hidden="true">#</a> 1. Hive SQL-DML-Load加载数据</h2>
<blockquote>
<p>所谓加载是指：将数据文件移动到与Hive表对应的位置，移动时是纯复制、移动操作。</p>
<p>对于local（Hiveserver2所在机器）是复制操作，HDFS中的文件时移动操作。</p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">------ load语法规则 ----</span>
<span class="token keyword">LOAD</span> <span class="token keyword">DATA</span> <span class="token punctuation">[</span><span class="token keyword">LOCAL</span><span class="token punctuation">]</span> INPATH <span class="token string">'filepath'</span> <span class="token punctuation">[</span>OVERWRITE<span class="token punctuation">]</span> <span class="token keyword">INTO</span> <span class="token keyword">TABLE</span> tablename <span class="token punctuation">[</span><span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>partcol1<span class="token operator">=</span>val1<span class="token punctuation">,</span> partcol2<span class="token operator">=</span>val2 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">]</span>

<span class="token keyword">LOAD</span> <span class="token keyword">DATA</span> <span class="token punctuation">[</span><span class="token keyword">LOCAL</span><span class="token punctuation">]</span> INPATH <span class="token string">'filepath'</span> <span class="token punctuation">[</span>OVERWRITE<span class="token punctuation">]</span> <span class="token keyword">INTO</span> <span class="token keyword">TABLE</span> tablename <span class="token punctuation">[</span><span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>partcol1<span class="token operator">=</span>val1<span class="token punctuation">,</span> partcol2<span class="token operator">=</span>val2 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>INPUTFORMAT <span class="token string">'inputformat'</span> SERDE <span class="token string">'serde'</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token number">3.0</span> <span class="token operator">or</span> later<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-1-基本操作" tabindex="-1"><a class="header-anchor" href="#_1-1-基本操作" aria-hidden="true">#</a> 1.1 基本操作</h3>
<blockquote>
<p><strong>对于加载数据的一些基本操作看之前的文章即可。</strong></p>
</blockquote>
<p>其中包含：</p>
<ul>
<li>静态数据加载</li>
<li>动态数据加载</li>
<li>分区数据加载</li>
</ul>
<p>!!!<br>
<a style="color: red" href="https://vingkin.nytdoj.com/index.php/archives/370/#menu_index_16" 
target="_blank">Load加载数据基本操作</a><br>
<br/><br>
!!!</p>
<h3 id="_1-2-hive3-0-新特性" tabindex="-1"><a class="header-anchor" href="#_1-2-hive3-0-新特性" aria-hidden="true">#</a> 1.2 Hive3.0 新特性</h3>
<blockquote>
<p>这个新特性就是：假设一个一级分区表有两个字段，对于载入的数据又三个字段，那么数据的前两个字段作为表的字段载入表中，数据的最后一个字段作为分区字段进行分区。具体看下面的例子：</p>
</blockquote>
<p><strong>创建一个含有两个字段的表tab1</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token keyword">if</span> <span class="token operator">not</span> <span class="token keyword">exists</span> tab1 <span class="token punctuation">(</span>col1 <span class="token keyword">int</span><span class="token punctuation">,</span> col2 <span class="token keyword">int</span><span class="token punctuation">)</span>
PARTITIONED <span class="token keyword">BY</span> <span class="token punctuation">(</span>col3 <span class="token keyword">int</span><span class="token punctuation">)</span>
<span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">','</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>有一个数据文件tab1.txt具体内容如下所示：</strong></p>
<div class="language-txt line-numbers-mode" data-ext="txt"><pre v-pre class="language-txt"><code>11,22,1
33,44,2
55,66,1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通过load命令向分区表载入数据：</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">LOAD</span> <span class="token keyword">DATA</span> <span class="token keyword">LOCAL</span> INPATH <span class="token string">'/root/hivedata/tab1.txt'</span> <span class="token keyword">INTO</span> <span class="token keyword">TABLE</span> tab1<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>载入数据后，Hive会根据最后一个字段进行自动分区，在HDFS中的表现形式为：</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>/user/hive/warehouse/vinkgin.db/tab1
									/col3<span class="token operator">=</span><span class="token number">1</span>/000000_0
									/col3<span class="token operator">=</span><span class="token number">2</span>/000000_0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于多级分区表来说也是一样的，就以二级分区表为例，应设计好数据文件中的字段，其<strong>字段数为表字段数+2</strong>，数据文件的倒数第二个字段为一级分区，最后一个字段为二级分区。</p>
<h2 id="_2-hive-sql-dml-insert插入数据" tabindex="-1"><a class="header-anchor" href="#_2-hive-sql-dml-insert插入数据" aria-hidden="true">#</a> 2. Hive SQL-DML-insert插入数据</h2>
<blockquote>
<p>Hive执行insert本质上是通过MR程序来实现的，所以如果通过insert来逐条插入(<code v-pre>insert into table1 valules(xx, xx, ...)</code>)那么在大数据的环境中耗时是十分恐怖的，并不推荐使用。但这并不是说明insert没有用武之地，比如分桶表就需要通过insert+select语句加载数据，通过一个MR程序，一次性加载整个表的所有数据。</p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 语法规则</span>
<span class="token keyword">INSERT</span> OVERWRITE <span class="token keyword">TABLE</span> tablename1 <span class="token punctuation">[</span><span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>partcol1<span class="token operator">=</span>val1<span class="token punctuation">,</span> partcol2<span class="token operator">=</span>val2 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span> 
<span class="token punctuation">[</span><span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span><span class="token punctuation">]</span><span class="token punctuation">]</span> select_statement1 <span class="token keyword">FROM</span> from_statement<span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token keyword">TABLE</span> tablename1 <span class="token punctuation">[</span><span class="token keyword">PARTITION</span> <span class="token punctuation">(</span>partcol1<span class="token operator">=</span>val1<span class="token punctuation">,</span> partcol2<span class="token operator">=</span>val2 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">]</span> 
select_statement1 <span class="token keyword">FROM</span> from_statement<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-1-基本操作" tabindex="-1"><a class="header-anchor" href="#_2-1-基本操作" aria-hidden="true">#</a> 2.1 基本操作</h3>
<p>在下面的案例中，<code v-pre>student_from_insert</code>表的数据就是通过<code v-pre>student</code>表中的数据先导出再导入实现的(insert+select)。</p>
<p><strong>创建一张源表student</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> student<span class="token punctuation">(</span>num <span class="token keyword">int</span><span class="token punctuation">,</span>name string<span class="token punctuation">,</span>sex string<span class="token punctuation">,</span>age <span class="token keyword">int</span><span class="token punctuation">,</span>dept string<span class="token punctuation">)</span>
<span class="token keyword">row</span> format delimited
<span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">','</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>加载student表数据</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> inpath <span class="token string">'/root/hivedata/students.txt'</span> <span class="token keyword">into</span> <span class="token keyword">table</span> student<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>创建一张目标表student_from_insert</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> student_from_insert<span class="token punctuation">(</span>sno <span class="token keyword">int</span><span class="token punctuation">,</span>sname string<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>从student表中select数据insert到student_from_insert中</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> <span class="token keyword">table</span> student_from_insert
<span class="token keyword">select</span> num<span class="token punctuation">,</span>name <span class="token keyword">from</span> student<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-from-多重插入" tabindex="-1"><a class="header-anchor" href="#_2-2-from-多重插入" aria-hidden="true">#</a> 2.2 FROM 多重插入</h3>
<blockquote>
<p>一次扫描，多次插入。目的是减少扫描的次数，在一次扫描中，完成多次insert操作。</p>
</blockquote>
<p>案例：通过select上面的student表，通过多重插入进行一次扫描，插入两个表</p>
<p>我通过yarn发现下面的案例依然是执行了两次MR程序</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 创建两张新表</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> student_insert1<span class="token punctuation">(</span>sno <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> student_insert2<span class="token punctuation">(</span>sname string<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 多重插入  一次扫描 多次插入</span>
<span class="token keyword">from</span> student
<span class="token keyword">insert</span> overwrite <span class="token keyword">table</span> student_insert1
<span class="token keyword">select</span> num
<span class="token keyword">insert</span> overwrite <span class="token keyword">table</span> student_insert2
<span class="token keyword">select</span> name<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-dynamic-partition-inserts-动态分区插入" tabindex="-1"><a class="header-anchor" href="#_2-3-dynamic-partition-inserts-动态分区插入" aria-hidden="true">#</a> 2.3 Dynamic Partition Inserts 动态分区插入</h3>
<p>还有一个案例如下：</p>
<p>!!!<br>
<a style="color: red" href="https://vingkin.nytdoj.com/index.php/archives/370/#menu_index_16" 
target="_blank">Load加载数据基本操作</a><br>
<br/><br>
!!!</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-----------案例：动态分区插入-----------</span>
<span class="token comment">-- 1、首先设置动态分区模式为非严格模式 默认已经开启了动态分区功能</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span>dynamic<span class="token punctuation">.</span><span class="token keyword">partition</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span>dynamic<span class="token punctuation">.</span><span class="token keyword">partition</span><span class="token punctuation">.</span><span class="token keyword">mode</span> <span class="token operator">=</span> nonstrict<span class="token punctuation">;</span>

<span class="token comment">-- 2、当前库下已有一张表student</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> student<span class="token punctuation">;</span>

<span class="token comment">-- 3、创建分区表 以sdept作为分区字段</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> student_partition<span class="token punctuation">(</span>Sno <span class="token keyword">int</span><span class="token punctuation">,</span>Sname string<span class="token punctuation">,</span>Sex string<span class="token punctuation">,</span>Sage <span class="token keyword">int</span><span class="token punctuation">)</span> partitioned <span class="token keyword">by</span><span class="token punctuation">(</span>Sdept string<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 4、执行动态分区插入操作</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> <span class="token keyword">table</span> student_partition <span class="token keyword">partition</span><span class="token punctuation">(</span>Sdept<span class="token punctuation">)</span>
<span class="token keyword">select</span> num<span class="token punctuation">,</span>name<span class="token punctuation">,</span>sex<span class="token punctuation">,</span>age<span class="token punctuation">,</span>dept <span class="token keyword">from</span> student<span class="token punctuation">;</span>
<span class="token comment">-- 其中，num,name,sex,age作为表的字段内容插入表中</span>
<span class="token comment">-- dept作为分区字段值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-insert-directory导出数据" tabindex="-1"><a class="header-anchor" href="#_2-4-insert-directory导出数据" aria-hidden="true">#</a> 2.4 Insert Directory导出数据</h3>
<blockquote>
<p>数据导出操作使用的是OVERWRITE操作，谨慎使用</p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 标准语法:</span>
<span class="token keyword">INSERT</span> OVERWRITE <span class="token punctuation">[</span><span class="token keyword">LOCAL</span><span class="token punctuation">]</span> DIRECTORY directory1
    <span class="token punctuation">[</span><span class="token keyword">ROW</span> FORMAT row_format<span class="token punctuation">]</span> <span class="token punctuation">[</span>STORED <span class="token keyword">AS</span> file_format<span class="token punctuation">]</span> <span class="token punctuation">(</span>Note: Only available <span class="token keyword">starting</span> <span class="token keyword">with</span> Hive <span class="token number">0.11</span><span class="token number">.0</span><span class="token punctuation">)</span>
<span class="token keyword">SELECT</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">FROM</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment">-- Hive extension (multiple inserts):</span>
<span class="token keyword">FROM</span> from_statement
<span class="token keyword">INSERT</span> OVERWRITE <span class="token punctuation">[</span><span class="token keyword">LOCAL</span><span class="token punctuation">]</span> DIRECTORY directory1 select_statement1
<span class="token punctuation">[</span><span class="token keyword">INSERT</span> OVERWRITE <span class="token punctuation">[</span><span class="token keyword">LOCAL</span><span class="token punctuation">]</span> DIRECTORY directory2 select_statement2<span class="token punctuation">]</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment">-- row_format</span>
: DELIMITED <span class="token punctuation">[</span><span class="token keyword">FIELDS</span> <span class="token keyword">TERMINATED</span> <span class="token keyword">BY</span> <span class="token keyword">char</span> <span class="token punctuation">[</span><span class="token keyword">ESCAPED</span> <span class="token keyword">BY</span> <span class="token keyword">char</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>COLLECTION ITEMS <span class="token keyword">TERMINATED</span> <span class="token keyword">BY</span> <span class="token keyword">char</span><span class="token punctuation">]</span>
<span class="token punctuation">[</span>MAP <span class="token keyword">KEYS</span> <span class="token keyword">TERMINATED</span> <span class="token keyword">BY</span> <span class="token keyword">char</span><span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">LINES</span> <span class="token keyword">TERMINATED</span> <span class="token keyword">BY</span> <span class="token keyword">char</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>目录可以是完整的URI。如果未指定scheme，则Hive将使用hadoop配置变量fs.default.name来决定导出位置；</p>
</li>
<li>
<p>如果使用LOCAL关键字，则Hive会将数据写入本地文件系统上的目录；</p>
</li>
<li>
<p>写入文件系统的数据被序列化为文本，列之间用\001隔开，行之间用换行符隔开。如果列都不是原始数据类型，那么这些列将序列化为JSON格式。也可以在导出的时候指定分隔符换行符和文件格式。</p>
</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 1、导出查询结果到HDFS指定目录下</span>
<span class="token keyword">insert</span> overwrite directory <span class="token string">'/tmp/hive_export/e1'</span> <span class="token keyword">select</span> num<span class="token punctuation">,</span>name<span class="token punctuation">,</span>age <span class="token keyword">from</span> student <span class="token keyword">limit</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token comment">-- 2、导出时指定分隔符和文件存储格式</span>
<span class="token keyword">insert</span> overwrite directory <span class="token string">'/tmp/hive_export/e2'</span> <span class="token keyword">row</span> format delimited <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">','</span>
stored <span class="token keyword">as</span> orc
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> student<span class="token punctuation">;</span>

<span class="token comment">-- 3、导出数据到本地文件系统指定目录下</span>
<span class="token keyword">insert</span> overwrite <span class="token keyword">local</span> directory <span class="token string">'/root/hive_export/e1'</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> student<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-hive-transaction-事务表" tabindex="-1"><a class="header-anchor" href="#_3-hive-transaction-事务表" aria-hidden="true">#</a> 3. Hive Transaction 事务表</h2>
<p>Hive事务表的部分知识见下面链接：</p>
<p>!!!<br>
<a style="color: red" href="https://vingkin.nytdoj.com/index.php/archives/370/#menu_index_22" 
target="_blank">事务表基本操作</a><br>
<br/><br>
!!!</p>
<h3 id="_3-1-实现原理" tabindex="-1"><a class="header-anchor" href="#_3-1-实现原理" aria-hidden="true">#</a> 3.1 实现原理</h3>
<blockquote>
<p>Hive的文件是存储在HDFS上的，而HDFS上又不支持对文件的任意修改，只能是采取另外的手段来完成</p>
</blockquote>
<ol>
<li>用<strong>HDFS文件作为原始数据</strong>（基础数据），用<strong>delta保存事务操作的记录增量数据</strong></li>
<li>正在执行中的事务，是以一个staging开头的文件夹维护的，执行结束就是delta文件夹。每次执行一次事务操作都会有这样的一个delta增量文件夹</li>
<li>当访问Hive数据时，根据<strong>HDFS原始文件和delta增量文件做合并</strong>，查询最新的数据</li>
</ol>
<p>其中：</p>
<ul>
<li>INSERT语句会直接创建delta目录</li>
<li>DELETE目录的前缀是delete_delta</li>
<li>UPDATE语句采用了split-update特性，即先删除、后插入；</li>
</ul>
<p>下图中，红框标出的就是一次update操作</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251622528.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_3-1-1-delta文件详解" tabindex="-1"><a class="header-anchor" href="#_3-1-1-delta文件详解" aria-hidden="true">#</a> 3.1.1 delta文件详解</h4>
<ul>
<li><strong>delta_minWID_maxWID_stmtID</strong>，即delta前缀、写事务的ID范围、以及语句ID；删除时前缀是delete_delta，里面包含了要删除的文件</li>
<li>Hive会为写事务（INSERT、DELETE等）创建一个写事务ID（Write ID），该ID在表范围内唯一</li>
<li>语句ID（Statement ID）则是当一个事务中有多条写入语句时使用的，用作唯一标识。</li>
</ul>
<p><strong>每个事务的delta文件夹下，都有两个文件：</strong></p>
<ul>
<li><strong>_orc_acid_version</strong>的内容是2,即当前ACID版本号是2。和版本1的主要区别是UPDATE语句采用了split-update特性，即先删除、后插入。这个文件不是ORC文件，可以下载下来直接查看。</li>
<li><strong>bucket_00000</strong>文件则是写入的数据内容。如果事务表没有分区和分桶，就只有一个这样的文件。文件都以ORC格式存储，底层二级制，需要使用ORC TOOLS查看，详见附件资料。</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251622152.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>对于<strong>bucket_00000</strong>文件：</p>
<ul>
<li>operation：0 表示插入，1 表示更新，2 表示删除。由于使用了split-update，1是不会出现的，所以delta文件中的operation是0 ， delete_delta 文件中的operation是2</li>
<li>originalTransaction、currentTransaction：该条记录的原始写事务ID，当前的写事务ID。</li>
<li>rowId：一个自增的唯一ID，在写事务和分桶的组合中唯一。</li>
<li>row：具体数据。对于DELETE语句，则为null，对于INSERT就是插入的数据，对于UPDATE就是更新后的数据。</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251622914.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_3-1-2-合并器" tabindex="-1"><a class="header-anchor" href="#_3-1-2-合并器" aria-hidden="true">#</a> 3.1.2 合并器</h4>
<blockquote>
<p>合并器Compactor是一套在Hive Metastore内运行，支持ACID系统的后台进程。所有合并都是在后台完成的，不会阻止数据的并发读、写。合并后，系统将等待所有旧文件的读操作完成后，删除旧文件</p>
</blockquote>
<p>合并操作分为两种，minor compaction（小合并）、major compaction（大合并）：</p>
<ul>
<li>小合并会将一组delta增量文件重写为单个增量文件，默认触发条件为10个delta文件</li>
<li>大合并将一个或多个增量文件和基础文件重写为新的基础文件，默认触发条件为delta文件相应于基础文件占比，10%</li>
</ul>
<h3 id="_3-2-hive-事务表使用设置与局限性" tabindex="-1"><a class="header-anchor" href="#_3-2-hive-事务表使用设置与局限性" aria-hidden="true">#</a> 3.2 Hive 事务表使用设置与局限性</h3>
<h4 id="_3-2-1-局限性" tabindex="-1"><a class="header-anchor" href="#_3-2-1-局限性" aria-hidden="true">#</a> 3.2.1 局限性</h4>
<blockquote>
<p>好像不用分桶表也可以？</p>
</blockquote>
<ol>
<li>尚不支持BEGIN，COMMIT和ROLLBACK，所有语言操作都是自动提交的；</li>
<li>表文件存储格式仅支持ORC（STORED AS ORC）；</li>
<li>需要配置参数开启事务使用；</li>
<li>外部表无法创建为事务表，因为Hive只能控制元数据，无法管理数据；</li>
<li>表属性参数transactional必须设置为true；</li>
<li>必须将Hive事务管理器设置为org.apache.hadoop.hive.ql.lockmgr.DbTxnManager才能使用ACID表；</li>
<li>事务表不支持LOAD DATA ...语句。</li>
</ol>
<h4 id="_3-2-2-参数设置" tabindex="-1"><a class="header-anchor" href="#_3-2-2-参数设置" aria-hidden="true">#</a> 3.2.2 参数设置</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- Client端</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>support<span class="token punctuation">.</span>concurrency <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">--Hive是否支持并发</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>enforce<span class="token punctuation">.</span>bucketing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">--从Hive2.0开始不再需要  是否开启分桶功能</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span>dynamic<span class="token punctuation">.</span><span class="token keyword">partition</span><span class="token punctuation">.</span><span class="token keyword">mode</span> <span class="token operator">=</span> nonstrict<span class="token punctuation">;</span> <span class="token comment">--动态分区模式  非严格</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>txn<span class="token punctuation">.</span>manager <span class="token operator">=</span> org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>hadoop<span class="token punctuation">.</span>hive<span class="token punctuation">.</span>ql<span class="token punctuation">.</span>lockmgr<span class="token punctuation">.</span>DbTxnManager<span class="token punctuation">;</span>

<span class="token comment">-- Server端</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>compactor<span class="token punctuation">.</span>initiator<span class="token punctuation">.</span><span class="token keyword">on</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">--是否在Metastore实例上运行启动压缩合并</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>compactor<span class="token punctuation">.</span>worker<span class="token punctuation">.</span>threads <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">--在此metastore实例上运行多少个压缩程序工作线程。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-使用事务表" tabindex="-1"><a class="header-anchor" href="#_3-3-使用事务表" aria-hidden="true">#</a> 3.3 使用事务表</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 1、开启参数</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>support<span class="token punctuation">.</span>concurrency <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">--Hive是否支持并发</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>enforce<span class="token punctuation">.</span>bucketing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">--从Hive2.0开始不再需要  是否开启分桶功能</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span>dynamic<span class="token punctuation">.</span><span class="token keyword">partition</span><span class="token punctuation">.</span><span class="token keyword">mode</span> <span class="token operator">=</span> nonstrict<span class="token punctuation">;</span> <span class="token comment">--动态分区模式  非严格</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>txn<span class="token punctuation">.</span>manager <span class="token operator">=</span> org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>hadoop<span class="token punctuation">.</span>hive<span class="token punctuation">.</span>ql<span class="token punctuation">.</span>lockmgr<span class="token punctuation">.</span>DbTxnManager<span class="token punctuation">;</span> <span class="token comment">--</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>compactor<span class="token punctuation">.</span>initiator<span class="token punctuation">.</span><span class="token keyword">on</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">--是否在Metastore实例上运行启动压缩合并</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>compactor<span class="token punctuation">.</span>worker<span class="token punctuation">.</span>threads <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">--在此metastore实例上运行多少个压缩程序工作线程。</span>

<span class="token comment">-- 2、创建Hive事务表</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> trans_student<span class="token punctuation">(</span>
                              id <span class="token keyword">int</span><span class="token punctuation">,</span>
                              name String<span class="token punctuation">,</span>
                              age <span class="token keyword">int</span>
<span class="token punctuation">)</span>stored <span class="token keyword">as</span> orc TBLPROPERTIES<span class="token punctuation">(</span><span class="token string">'transactional'</span><span class="token operator">=</span><span class="token string">'true'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 3、针对事务表进行insert update delete操作</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> trans_student <span class="token punctuation">(</span>id<span class="token punctuation">,</span> name<span class="token punctuation">,</span> age<span class="token punctuation">)</span>
<span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">"vingkin"</span><span class="token punctuation">,</span><span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">update</span> trans_student
<span class="token keyword">set</span> age <span class="token operator">=</span> <span class="token number">20</span>
<span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">delete</span> <span class="token keyword">from</span> trans_student <span class="token keyword">where</span> id <span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-hive-sql-dml-update、delete" tabindex="-1"><a class="header-anchor" href="#_4-hive-sql-dml-update、delete" aria-hidden="true">#</a> 4. Hive SQL-DML-Update、Delete</h2>
<blockquote>
<p>其实这边就是事务表的相关操作没什么好说的</p>
</blockquote>
<h2 id="_5-hive-sql-dql-select-查询数据" tabindex="-1"><a class="header-anchor" href="#_5-hive-sql-dql-select-查询数据" aria-hidden="true">#</a> 5. Hive SQL-DQL-Select 查询数据</h2>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">--------- select语法树 ------------</span>
<span class="token punctuation">[</span><span class="token keyword">WITH</span> CommonTableExpression <span class="token punctuation">(</span><span class="token punctuation">,</span> CommonTableExpression<span class="token punctuation">)</span><span class="token operator">*</span><span class="token punctuation">]</span>
<span class="token keyword">SELECT</span> <span class="token punctuation">[</span><span class="token keyword">ALL</span> <span class="token operator">|</span> <span class="token keyword">DISTINCT</span><span class="token punctuation">]</span> select_expr<span class="token punctuation">,</span> select_expr<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
  <span class="token keyword">FROM</span> table_reference
  <span class="token punctuation">[</span><span class="token keyword">WHERE</span> where_condition<span class="token punctuation">]</span>
  <span class="token punctuation">[</span><span class="token keyword">GROUP</span> <span class="token keyword">BY</span> col_list<span class="token punctuation">]</span>
  <span class="token punctuation">[</span><span class="token keyword">ORDER</span> <span class="token keyword">BY</span> col_list<span class="token punctuation">]</span>
  <span class="token punctuation">[</span>CLUSTER <span class="token keyword">BY</span> col_list
    <span class="token operator">|</span> <span class="token punctuation">[</span>DISTRIBUTE <span class="token keyword">BY</span> col_list<span class="token punctuation">]</span> <span class="token punctuation">[</span>SORT <span class="token keyword">BY</span> col_list<span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
 <span class="token punctuation">[</span><span class="token keyword">LIMIT</span> <span class="token punctuation">[</span><span class="token keyword">offset</span><span class="token punctuation">,</span><span class="token punctuation">]</span> <span class="token keyword">rows</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-1-hive-sql-select查询基础语法" tabindex="-1"><a class="header-anchor" href="#_5-1-hive-sql-select查询基础语法" aria-hidden="true">#</a> 5.1 Hive SQL select查询基础语法</h3>
<h4 id="_5-1-1-select-expr" tabindex="-1"><a class="header-anchor" href="#_5-1-1-select-expr" aria-hidden="true">#</a> 5.1.1 select expr</h4>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 查询所有字段或者指定字段</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> t_usa_covid19_p<span class="token punctuation">;</span>
<span class="token keyword">select</span> county<span class="token punctuation">,</span> cases<span class="token punctuation">,</span> deaths <span class="token keyword">from</span> t_usa_covid19_p<span class="token punctuation">;</span>

<span class="token comment">-- 查询匹配正则表达式的所有字段</span>
<span class="token keyword">SET</span> hive<span class="token punctuation">.</span>support<span class="token punctuation">.</span>quoted<span class="token punctuation">.</span>identifiers <span class="token operator">=</span> none<span class="token punctuation">;</span> <span class="token comment">-- 反引号不在解释为其他含义，被解释为正则表达式</span>
<span class="token keyword">select</span> <span class="token identifier"><span class="token punctuation">`</span>^c.*<span class="token punctuation">`</span></span> <span class="token keyword">from</span> t_usa_covid19_p<span class="token punctuation">;</span>

<span class="token comment">-- 查询当前数据库</span>
<span class="token keyword">select</span> current_database<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 省去from关键字</span>

<span class="token comment">-- 查询使用函数</span>
<span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span>county<span class="token punctuation">)</span> <span class="token keyword">from</span> t_usa_covid19_p<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-1-2-all-、distinct" tabindex="-1"><a class="header-anchor" href="#_5-1-2-all-、distinct" aria-hidden="true">#</a> 5.1.2 ALL 、DISTINCT</h4>
<blockquote>
<p>默认不写为ALL，DISTINCT删除重复的行，当有多个字段时，多个字段看成一个整体。</p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 返回所有匹配的行</span>
<span class="token keyword">select</span> state <span class="token keyword">from</span> t_usa_covid19_p<span class="token punctuation">;</span>
<span class="token comment">-- 相当于</span>
<span class="token keyword">select</span> <span class="token keyword">all</span> state <span class="token keyword">from</span> t_usa_covid19_p<span class="token punctuation">;</span>
<span class="token comment">-- 返回所有匹配的行 去除重复的结果</span>
<span class="token keyword">select</span> <span class="token keyword">distinct</span> state <span class="token keyword">from</span> t_usa_covid19_p<span class="token punctuation">;</span>
<span class="token comment">-- 多个字段distinct整体去重</span>
<span class="token keyword">select</span>  county<span class="token punctuation">,</span>state <span class="token keyword">from</span> t_usa_covid19_p<span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token keyword">distinct</span> county<span class="token punctuation">,</span>state <span class="token keyword">from</span> t_usa_covid19_p<span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token keyword">distinct</span> sex <span class="token keyword">from</span> student<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-1-3-where" tabindex="-1"><a class="header-anchor" href="#_5-1-3-where" aria-hidden="true">#</a> 5.1.3 WHERE</h4>
<blockquote>
<p>WHERE后面是一个布尔表达式，用来过滤查询。WHERE后面可以跟着Hive支持的任何表达式和运算符，但是<strong>不能跟着聚合函数</strong>，比如说这个<code v-pre>count()</code>用来统计查询计数，但是此时的查询结果还不能确定，具有歧义。</p>
</blockquote>
<h4 id="_5-1-4-分区查询" tabindex="-1"><a class="header-anchor" href="#_5-1-4-分区查询" aria-hidden="true">#</a> 5.1.4 分区查询</h4>
<blockquote>
<p>针对的是分区表</p>
</blockquote>
<p>对分区表进行查询时，会检查WHERE子句或JOIN中的ON子句中是否有分区字段，如果有，就会<strong>仅访问符合条件的分区，裁剪掉没有必要访问的分区</strong>。</p>
<h4 id="_5-1-5-group-by" tabindex="-1"><a class="header-anchor" href="#_5-1-5-group-by" aria-hidden="true">#</a> 5.1.5 GROUP BY</h4>
<blockquote>
<p>GROUP BY语句用于结合聚合函数，根据一个或多个列对结果集进行分组</p>
</blockquote>
<p>上面引用的意思就是<strong>出现在GROUP BY中select expr中的字段，要么是GROUP BY分组的字段，要么是被聚合函数引用的字段。</strong></p>
<p>出现上面加粗的限制原因，主要是为了避免一个字段产生多个值的歧义</p>
<ul>
<li>分组字段出现select_expr中，一定没有歧义，因为就是基于该字段分组的，同一组中必相同</li>
<li>被聚合函数应用的字段，也没歧义，因为聚合函数的本质就是多进一出，最终返回一个结果</li>
</ul>
<h4 id="_5-1-6-having" tabindex="-1"><a class="header-anchor" href="#_5-1-6-having" aria-hidden="true">#</a> 5.1.6 HAVING</h4>
<blockquote>
<p>出现HAVING的原因是WHERE关键字无法与聚合函数一起使用</p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 统计死亡病例数大于10000的州</span>
<span class="token comment">-- where语句中不能使用聚合函数 语法报错</span>
<span class="token keyword">select</span> state<span class="token punctuation">,</span><span class="token function">sum</span><span class="token punctuation">(</span>deaths<span class="token punctuation">)</span>
<span class="token keyword">from</span> t_usa_covid19_p <span class="token keyword">where</span> count_date <span class="token operator">=</span> <span class="token string">"2021-01-28"</span> <span class="token operator">and</span> <span class="token function">sum</span><span class="token punctuation">(</span>deaths<span class="token punctuation">)</span> <span class="token operator">></span><span class="token number">10000</span> <span class="token keyword">group</span> <span class="token keyword">by</span> state<span class="token punctuation">;</span>

<span class="token comment">-- 先where分组前过滤（此处是分区裁剪），再进行group by分组， 分组后每个分组结果集确定 再使用having过滤</span>
<span class="token keyword">select</span> state<span class="token punctuation">,</span><span class="token function">sum</span><span class="token punctuation">(</span>deaths<span class="token punctuation">)</span>
<span class="token keyword">from</span> t_usa_covid19_p
<span class="token keyword">where</span> count_date <span class="token operator">=</span> <span class="token string">"2021-01-28"</span>
<span class="token keyword">group</span> <span class="token keyword">by</span> state
<span class="token keyword">having</span> <span class="token function">sum</span><span class="token punctuation">(</span>deaths<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">10000</span><span class="token punctuation">;</span>

<span class="token comment">-- 这样写更好 即在group by的时候聚合函数已经作用得出结果 having直接引用结果过滤 不需要再单独计算一次了</span>
<span class="token keyword">select</span> state<span class="token punctuation">,</span><span class="token function">sum</span><span class="token punctuation">(</span>deaths<span class="token punctuation">)</span> <span class="token keyword">as</span> cnts
<span class="token keyword">from</span> t_usa_covid19_p
<span class="token keyword">where</span> count_date <span class="token operator">=</span> <span class="token string">"2021-01-28"</span>
<span class="token keyword">group</span> <span class="token keyword">by</span> state
<span class="token keyword">having</span> cnts<span class="token operator">></span> <span class="token number">10000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-1-7-having和where的区别" tabindex="-1"><a class="header-anchor" href="#_5-1-7-having和where的区别" aria-hidden="true">#</a> 5.1.7 HAVING和WHERE的区别</h4>
<ul>
<li>having是在分组后对数据进行过滤</li>
<li>where是在分组前对数据进行过滤</li>
<li>having后面可以使用聚合函数</li>
<li>where后面不可以使用聚合函数</li>
</ul>
<h4 id="_5-1-8-limit" tabindex="-1"><a class="header-anchor" href="#_5-1-8-limit" aria-hidden="true">#</a> 5.1.8 LIMIT</h4>
<blockquote>
<p>显示SELECT返回的行数</p>
</blockquote>
<ul>
<li>一个参数n：返回结果集前n条<code v-pre>limit 5</code></li>
<li>两个参数m,n：第一个参数m表示相对第一行的偏移量，第二个参数n表示返回的行数 <code v-pre>limit 4, 5</code></li>
</ul>
<p><strong>注意：只有一个参数时相当于<code v-pre>limit 0, n</code></strong></p>
<h4 id="_5-1-9-执行顺序" tabindex="-1"><a class="header-anchor" href="#_5-1-9-执行顺序" aria-hidden="true">#</a> 5.1.9 执行顺序</h4>
<blockquote>
<p>在查询过程中执行顺序：<code v-pre>from &gt; where &gt; group（含聚合）&gt; having &gt;order &gt; select</code></p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> state<span class="token punctuation">,</span> <span class="token function">sum</span><span class="token punctuation">(</span>deaths<span class="token punctuation">)</span> <span class="token keyword">as</span> cnts
<span class="token keyword">from</span> t_usa_covid19_p
<span class="token keyword">where</span> count_data <span class="token operator">=</span> <span class="token string">"2021-01-28"</span>
<span class="token keyword">group</span> <span class="token keyword">by</span> state
<span class="token keyword">having</span> cnts <span class="token operator">></span> <span class="token number">10000</span>
<span class="token keyword">order</span> <span class="token keyword">by</span> cnts <span class="token keyword">desc</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-2-hive-sql-select查询高阶语法" tabindex="-1"><a class="header-anchor" href="#_5-2-hive-sql-select查询高阶语法" aria-hidden="true">#</a> 5.2 Hive SQL select查询高阶语法</h3>
<h4 id="_5-2-1-order-by" tabindex="-1"><a class="header-anchor" href="#_5-2-1-order-by" aria-hidden="true">#</a> 5.2.1 ORDER BY</h4>
<blockquote>
<p>和RDMBS中的ORDER BY差不多，<strong>用于全局排序</strong>。</p>
<p>默认<strong>ASC（升序）</strong>，可以手动指定为<strong>DESC（降序）</strong></p>
</blockquote>
<h4 id="_5-2-2-cluster-by" tabindex="-1"><a class="header-anchor" href="#_5-2-2-cluster-by" aria-hidden="true">#</a> 5.2.2 CLUSTER BY</h4>
<blockquote>
<p>根据指定字段分组，每组内再根据该字段进行正序排序**（只能正序）**。注意：<strong>分组的个数取决于ReduceTask的个数</strong>，可以通过<code v-pre>set mapreduce.job.reduces=n</code>来手动设定ReduceTask的个数。</p>
</blockquote>
<ul>
<li>分组规则hash散列（分桶表规则一样）：<code v-pre>Hash_Func(col_name) % reducetask</code>个数</li>
<li>分为几组取决于reducetask的个数</li>
</ul>
<p>比如下面的案例就是先手动设定ReduceTask的个数为2，然后根据num分组，然后进行正序排序。由于只有两个组，所以根据学号，偶数分为一组，奇数分为一组。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> mapreduce<span class="token punctuation">.</span>job<span class="token punctuation">.</span>reduces <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> student cluster <span class="token keyword">by</span> num<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通过上面的案例可以发现CLUSTER BY的弊端就是只能通过一个字段进行分组且排序，而且只能进行正序排序。</strong></p>
<p>DISTRIBUTE BY 和 SORT BY就相当于把CLUSTER BY的功能一分为二：</p>
<ul>
<li>DISTRIBUTE BY：用于分组</li>
<li>SORT BY：用于排序</li>
<li>分组和排序使用的字段可以不同，而且排序可以指定倒序排序</li>
</ul>
<p>案例：根据sex进行分组，并且每个分组内再按照age进行倒序排序</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> student distribute <span class="token keyword">by</span> sex sort <span class="token keyword">by</span> age <span class="token keyword">desc</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_5-2-3-cluster、distribute、sort、order-by对比" tabindex="-1"><a class="header-anchor" href="#_5-2-3-cluster、distribute、sort、order-by对比" aria-hidden="true">#</a> 5.2.3 CLUSTER、DISTRIBUTE、SORT、ORDER BY对比</h4>
<ol>
<li>order by全局排序，因此只有一个reducer，结果输出在一个文件中，当输入规模大时，需要较长的计算时间。</li>
<li>distribute by根据指定字段将数据分组，算法是hash散列。sort by是在分组之后，每个组内局部排序</li>
<li>cluster by既有分组，又有排序，但是两个字段只能是同一个字段</li>
</ol>
<h4 id="_5-2-4-union联合查询" tabindex="-1"><a class="header-anchor" href="#_5-2-4-union联合查询" aria-hidden="true">#</a> 5.2.4 UNION联合查询</h4>
<blockquote>
<p>用于将多个SELECT语句的结果合并成一个结果集，<strong>注意每个select语句返回的列的数量和名称必须相同</strong>。</p>
<p>目前版本的HIVE使用UNION时，默认使用DISTINCT删除重复行，可以使用ALL来指定不删除</p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 语法规则</span>
select_statement 
<span class="token keyword">UNION</span> <span class="token punctuation">[</span><span class="token keyword">ALL</span> <span class="token operator">|</span> <span class="token keyword">DISTINCT</span><span class="token punctuation">]</span> 
select_statement 
<span class="token keyword">UNION</span> <span class="token punctuation">[</span><span class="token keyword">ALL</span> <span class="token operator">|</span> <span class="token keyword">DISTINCT</span><span class="token punctuation">]</span> 
select_statement 
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要将ORDER BY，SORT BY，CLUSTER BY，DISTRIBUTE BY或LIMIT应用于单个SELECT，需要将子句放在括住SELECT的括号内</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> num<span class="token punctuation">,</span>name <span class="token keyword">FROM</span> <span class="token punctuation">(</span><span class="token keyword">select</span> num<span class="token punctuation">,</span>name <span class="token keyword">from</span> student_local <span class="token keyword">LIMIT</span> <span class="token number">2</span><span class="token punctuation">)</span> subq1
<span class="token keyword">UNION</span>
<span class="token keyword">SELECT</span> num<span class="token punctuation">,</span>name <span class="token keyword">FROM</span> <span class="token punctuation">(</span><span class="token keyword">select</span> num<span class="token punctuation">,</span>name <span class="token keyword">from</span> student_hdfs <span class="token keyword">LIMIT</span> <span class="token number">3</span><span class="token punctuation">)</span> subq2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要将ORDER BY，SORT BY，CLUSTER BY，DISTRIBUTE BY或LIMIT子句应用于整个UNION结果，需要将ORDER BY，SORT BY，CLUSTER BY，DISTRIBUTE BY或LIMIT放在最后一个之后。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> num<span class="token punctuation">,</span>name <span class="token keyword">from</span> student_local
<span class="token keyword">UNION</span>
<span class="token keyword">select</span> num<span class="token punctuation">,</span>name <span class="token keyword">from</span> student_hdfs
<span class="token keyword">order</span> <span class="token keyword">by</span> num <span class="token keyword">desc</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-5-form-子句中的子查询" tabindex="-1"><a class="header-anchor" href="#_5-2-5-form-子句中的子查询" aria-hidden="true">#</a> 5.2.5 FORM 子句中的子查询</h4>
<ul>
<li><strong>必须要给子查询一个名称</strong>，因为FROM子句中的每个表都必须有一个名称。</li>
<li>子查询返回结果中的列必须具有唯一的名称。</li>
<li>子查询返回结果中的列在外部查询中可用，就像真实表的列一样。</li>
<li>子查询也可以是带有UNION的查询表达式。</li>
</ul>
<p><strong>可以理解为把FROM语句中查询到的看成一张表，对这张表进行查询</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 子查询</span>
<span class="token keyword">SELECT</span> num
<span class="token keyword">FROM</span> <span class="token punctuation">(</span>
         <span class="token keyword">select</span> num<span class="token punctuation">,</span>name <span class="token keyword">from</span> student_local
     <span class="token punctuation">)</span> tmp<span class="token punctuation">;</span>

<span class="token comment">-- 包含UNION ALL的子查询的示例</span>
<span class="token keyword">SELECT</span> t3<span class="token punctuation">.</span>name
<span class="token keyword">FROM</span> <span class="token punctuation">(</span>
         <span class="token keyword">select</span> num<span class="token punctuation">,</span>name <span class="token keyword">from</span> student_local
         <span class="token keyword">UNION</span> <span class="token keyword">distinct</span>
         <span class="token keyword">select</span> num<span class="token punctuation">,</span>name <span class="token keyword">from</span> student_hdfs
     <span class="token punctuation">)</span> t3<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-6-where-子句中的子查询" tabindex="-1"><a class="header-anchor" href="#_5-2-6-where-子句中的子查询" aria-hidden="true">#</a> 5.2.6 WHERE 子句中的子查询</h4>
<ul>
<li>**不相关子查询：**该子查询不引用父查询中的列，可以将查询结果视为IN和NOT IN语句的常量</li>
<li>**相关子查询：**子查询引用父查询中的列</li>
</ul>
<p><strong>不相关子查询</strong>，相当于IN、NOT IN,子查询只能选择一个列。</p>
<ul>
<li>执行子查询，其结果不被显示，而是传递给外部查询，作为外部查询的条件使用。</li>
<li>执行外部查询，并显示整个结果。</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span>
<span class="token keyword">FROM</span> student_hdfs
<span class="token keyword">WHERE</span> student_hdfs<span class="token punctuation">.</span>num <span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token keyword">select</span> num <span class="token keyword">from</span> student_local <span class="token keyword">limit</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>相关子查询</strong>，指EXISTS和NOT EXISTS子查询</p>
<ul>
<li>子查询的WHERE子句中支持对父查询的引用</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> A
<span class="token keyword">FROM</span> T1
<span class="token keyword">WHERE</span> <span class="token keyword">EXISTS</span> <span class="token punctuation">(</span><span class="token keyword">SELECT</span> B <span class="token keyword">FROM</span> T2 <span class="token keyword">WHERE</span> T1<span class="token punctuation">.</span>X <span class="token operator">=</span> T2<span class="token punctuation">.</span>Y<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-2-7-common-table-expressions-cte" tabindex="-1"><a class="header-anchor" href="#_5-2-7-common-table-expressions-cte" aria-hidden="true">#</a> 5.2.7 Common Table Expressions (CTE)</h4>
<ul>
<li>公用表表达式（CTE）是一个<strong>临时结果集</strong>：该结果集是从<strong>WITH子句中指定的简单查询</strong>派生而来的，紧接在SELECT或INSERT关键字之前。</li>
<li>CTE仅在<strong>单个语句的执行范围内</strong>定义。</li>
<li>CTE可以在 SELECT，INSERT， CREATE TABLE AS SELECT或CREATE VIEW AS SELECT语句中使用。</li>
</ul>
<p><strong>CTE的使用</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">----------------- Common Table Expressions（CTE）-----------------------------------</span>
<span class="token comment">-- select语句中的CTE</span>
<span class="token keyword">with</span> q1 <span class="token keyword">as</span> <span class="token punctuation">(</span><span class="token keyword">select</span> num<span class="token punctuation">,</span> name<span class="token punctuation">,</span> age <span class="token keyword">from</span> student <span class="token keyword">where</span> num <span class="token operator">=</span> <span class="token number">95002</span><span class="token punctuation">)</span>
<span class="token keyword">select</span> <span class="token operator">*</span>
<span class="token keyword">from</span> q1<span class="token punctuation">;</span>

<span class="token comment">-- from风格</span>
<span class="token keyword">with</span> q1 <span class="token keyword">as</span> <span class="token punctuation">(</span><span class="token keyword">select</span> num<span class="token punctuation">,</span> name<span class="token punctuation">,</span> age <span class="token keyword">from</span> student <span class="token keyword">where</span> num <span class="token operator">=</span> <span class="token number">95002</span><span class="token punctuation">)</span>
<span class="token keyword">from</span> q1
<span class="token keyword">select</span> <span class="token operator">*</span><span class="token punctuation">;</span>

<span class="token comment">-- chaining CTEs 链式</span>
<span class="token keyword">with</span> q1 <span class="token keyword">as</span> <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> student <span class="token keyword">where</span> num <span class="token operator">=</span> <span class="token number">95002</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
     q2 <span class="token keyword">as</span> <span class="token punctuation">(</span><span class="token keyword">select</span> num<span class="token punctuation">,</span> name<span class="token punctuation">,</span> age <span class="token keyword">from</span> q1<span class="token punctuation">)</span>
<span class="token keyword">select</span> <span class="token operator">*</span>
<span class="token keyword">from</span> <span class="token punctuation">(</span><span class="token keyword">select</span> num <span class="token keyword">from</span> q2<span class="token punctuation">)</span> a<span class="token punctuation">;</span>


<span class="token comment">-- union</span>
<span class="token keyword">with</span> q1 <span class="token keyword">as</span> <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> student <span class="token keyword">where</span> num <span class="token operator">=</span> <span class="token number">95002</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
     q2 <span class="token keyword">as</span> <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> student <span class="token keyword">where</span> num <span class="token operator">=</span> <span class="token number">95004</span><span class="token punctuation">)</span>
<span class="token keyword">select</span> <span class="token operator">*</span>
<span class="token keyword">from</span> q1
<span class="token keyword">union</span> <span class="token keyword">all</span>
<span class="token keyword">select</span> <span class="token operator">*</span>
<span class="token keyword">from</span> q2<span class="token punctuation">;</span>

<span class="token comment">-- 视图，CTAS和插入语句中的CTE</span>
<span class="token comment">-- insert</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> s1 <span class="token operator">like</span> student<span class="token punctuation">;</span>

<span class="token keyword">with</span> q1 <span class="token keyword">as</span> <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> student <span class="token keyword">where</span> num <span class="token operator">=</span> <span class="token number">95002</span><span class="token punctuation">)</span>
<span class="token keyword">from</span> q1
<span class="token keyword">insert</span> overwrite <span class="token keyword">table</span> s1
<span class="token keyword">select</span> <span class="token operator">*</span><span class="token punctuation">;</span>

<span class="token comment">-- ctas</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> s2 <span class="token keyword">as</span>
<span class="token keyword">with</span> q1 <span class="token keyword">as</span> <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> student <span class="token keyword">where</span> num <span class="token operator">=</span> <span class="token number">95002</span><span class="token punctuation">)</span>
<span class="token keyword">select</span> <span class="token operator">*</span>
<span class="token keyword">from</span> q1<span class="token punctuation">;</span>

<span class="token comment">-- view</span>
<span class="token keyword">create</span> <span class="token keyword">view</span> v1 <span class="token keyword">as</span>
<span class="token keyword">with</span> q1 <span class="token keyword">as</span> <span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> student <span class="token keyword">where</span> num <span class="token operator">=</span> <span class="token number">95002</span><span class="token punctuation">)</span>
<span class="token keyword">select</span> <span class="token operator">*</span>
<span class="token keyword">from</span> q1<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-hive-sql-join连接操作" tabindex="-1"><a class="header-anchor" href="#_6-hive-sql-join连接操作" aria-hidden="true">#</a> 6. Hive SQL Join连接操作</h2>
<h3 id="_6-1-inner-join-内连接" tabindex="-1"><a class="header-anchor" href="#_6-1-inner-join-内连接" aria-hidden="true">#</a> 6.1 inner join 内连接</h3>
<blockquote>
<p>只有进行连接的两个表中都存在与连接条件相匹配的数据才会被留下来</p>
</blockquote>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251622721.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 1、inner join</span>
<span class="token keyword">select</span> e<span class="token punctuation">.</span>id<span class="token punctuation">,</span>e<span class="token punctuation">.</span>name<span class="token punctuation">,</span>e_a<span class="token punctuation">.</span>city<span class="token punctuation">,</span>e_a<span class="token punctuation">.</span>street
<span class="token keyword">from</span> employee e <span class="token keyword">inner</span> <span class="token keyword">join</span> employee_address e_a
<span class="token keyword">on</span> e<span class="token punctuation">.</span>id <span class="token operator">=</span>e_a<span class="token punctuation">.</span>id<span class="token punctuation">;</span>

<span class="token comment">-- 等价于 inner join=join</span>
<span class="token keyword">select</span> e<span class="token punctuation">.</span>id<span class="token punctuation">,</span>e<span class="token punctuation">.</span>name<span class="token punctuation">,</span>e_a<span class="token punctuation">.</span>city<span class="token punctuation">,</span>e_a<span class="token punctuation">.</span>street
<span class="token keyword">from</span> employee e <span class="token keyword">join</span> employee_address e_a
<span class="token keyword">on</span> e<span class="token punctuation">.</span>id <span class="token operator">=</span>e_a<span class="token punctuation">.</span>id<span class="token punctuation">;</span>

<span class="token comment">-- 等价于 隐式连接表示法</span>
<span class="token keyword">select</span> e<span class="token punctuation">.</span>id<span class="token punctuation">,</span>e<span class="token punctuation">.</span>name<span class="token punctuation">,</span>e_a<span class="token punctuation">.</span>city<span class="token punctuation">,</span>e_a<span class="token punctuation">.</span>street
<span class="token keyword">from</span> employee e <span class="token punctuation">,</span> employee_address e_a
<span class="token keyword">where</span> e<span class="token punctuation">.</span>id <span class="token operator">=</span>e_a<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251623372.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_6-2-left-join-左连接" tabindex="-1"><a class="header-anchor" href="#_6-2-left-join-左连接" aria-hidden="true">#</a> 6.2 left join 左连接</h3>
<blockquote>
<p>又称为左外连接，join时以左表的全部数据为准，右边与之关联；左表数据全部返回，右表关联上的显示返回，关联不上的显示null返回</p>
</blockquote>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251623588.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 2、left join</span>
<span class="token keyword">select</span> e<span class="token punctuation">.</span>id<span class="token punctuation">,</span>e<span class="token punctuation">.</span>name<span class="token punctuation">,</span>e_conn<span class="token punctuation">.</span>phno<span class="token punctuation">,</span>e_conn<span class="token punctuation">.</span>email
<span class="token keyword">from</span> employee e <span class="token keyword">left</span> <span class="token keyword">join</span> employee_connection e_conn
<span class="token keyword">on</span> e<span class="token punctuation">.</span>id <span class="token operator">=</span>e_conn<span class="token punctuation">.</span>id<span class="token punctuation">;</span>

<span class="token comment">-- 等价于 left outer join</span>
<span class="token keyword">select</span> e<span class="token punctuation">.</span>id<span class="token punctuation">,</span>e<span class="token punctuation">.</span>name<span class="token punctuation">,</span>e_conn<span class="token punctuation">.</span>phno<span class="token punctuation">,</span>e_conn<span class="token punctuation">.</span>email
<span class="token keyword">from</span> employee e <span class="token keyword">left</span> <span class="token keyword">outer</span> <span class="token keyword">join</span>  employee_connection e_conn
<span class="token keyword">on</span> e<span class="token punctuation">.</span>id <span class="token operator">=</span>e_conn<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251623656.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_6-3-right-join-右连接" tabindex="-1"><a class="header-anchor" href="#_6-3-right-join-右连接" aria-hidden="true">#</a> 6.3 right join 右连接</h3>
<blockquote>
<p>又称为右外连接，join时以右表的全部数据为准，左边与之关联；右表数据全部返回，左表关联上的显示返回，关联不上的显示null返回</p>
</blockquote>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251623217.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 3、right join</span>
<span class="token keyword">select</span> e<span class="token punctuation">.</span>id<span class="token punctuation">,</span>e<span class="token punctuation">.</span>name<span class="token punctuation">,</span>e_conn<span class="token punctuation">.</span>phno<span class="token punctuation">,</span>e_conn<span class="token punctuation">.</span>email
<span class="token keyword">from</span> employee e <span class="token keyword">right</span> <span class="token keyword">join</span> employee_connection e_conn
<span class="token keyword">on</span> e<span class="token punctuation">.</span>id <span class="token operator">=</span>e_conn<span class="token punctuation">.</span>id<span class="token punctuation">;</span>

<span class="token comment">-- 等价于 right outer join</span>
<span class="token keyword">select</span> e<span class="token punctuation">.</span>id<span class="token punctuation">,</span>e<span class="token punctuation">.</span>name<span class="token punctuation">,</span>e_conn<span class="token punctuation">.</span>phno<span class="token punctuation">,</span>e_conn<span class="token punctuation">.</span>email
<span class="token keyword">from</span> employee e <span class="token keyword">right</span> <span class="token keyword">outer</span> <span class="token keyword">join</span> employee_connection e_conn
<span class="token keyword">on</span> e<span class="token punctuation">.</span>id <span class="token operator">=</span>e_conn<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251623707.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_6-4-full-outer-join-全外连接" tabindex="-1"><a class="header-anchor" href="#_6-4-full-outer-join-全外连接" aria-hidden="true">#</a> 6.4 full outer join 全外连接</h3>
<blockquote>
<p>又称为外连接，等价于对这两个数据集合分别进行左外连接和右外连接，然后再使用消去重复行的操作将上述两个结果集合并为一个结果集</p>
</blockquote>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251623232.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 4、full outer join</span>
<span class="token keyword">select</span> e<span class="token punctuation">.</span>id<span class="token punctuation">,</span>e<span class="token punctuation">.</span>name<span class="token punctuation">,</span>e_a<span class="token punctuation">.</span>city<span class="token punctuation">,</span>e_a<span class="token punctuation">.</span>street
<span class="token keyword">from</span> employee e <span class="token keyword">full</span> <span class="token keyword">outer</span> <span class="token keyword">join</span> employee_address e_a

<span class="token keyword">on</span> e<span class="token punctuation">.</span>id <span class="token operator">=</span>e_a<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
<span class="token comment">-- 等价于</span>
<span class="token keyword">select</span> e<span class="token punctuation">.</span>id<span class="token punctuation">,</span>e<span class="token punctuation">.</span>name<span class="token punctuation">,</span>e_a<span class="token punctuation">.</span>city<span class="token punctuation">,</span>e_a<span class="token punctuation">.</span>street
<span class="token keyword">from</span> employee e <span class="token keyword">full</span> <span class="token keyword">join</span> employee_address e_a
<span class="token keyword">on</span> e<span class="token punctuation">.</span>id <span class="token operator">=</span>e_a<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251623280.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_6-5-left-semi-join-左半开连接" tabindex="-1"><a class="header-anchor" href="#_6-5-left-semi-join-左半开连接" aria-hidden="true">#</a> 6.5 left semi join 左半开连接</h3>
<blockquote>
<p><strong>左半开连接</strong>（LEFT SEMI JOIN）会返回左边表的记录，前提是其记录对于右边的表满足ON语句中的判定条件。</p>
<p>从效果上来看有点像inner join之后只返回左表的结果。</p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 5、left semi join</span>
<span class="token keyword">select</span> <span class="token operator">*</span>
<span class="token keyword">from</span> employee e <span class="token keyword">left</span> semi <span class="token keyword">join</span> employee_address e_addr
<span class="token keyword">on</span> e<span class="token punctuation">.</span>id <span class="token operator">=</span>e_addr<span class="token punctuation">.</span>id<span class="token punctuation">;</span>

<span class="token comment">-- 相当于 inner join,但是只返回左表全部数据， 只不过效率高一些</span>
<span class="token keyword">select</span> e<span class="token punctuation">.</span><span class="token operator">*</span>
<span class="token keyword">from</span> employee e <span class="token keyword">inner</span> <span class="token keyword">join</span> employee_address e_addr
<span class="token keyword">on</span> e<span class="token punctuation">.</span>id <span class="token operator">=</span>e_addr<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251623382.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_6-6-cross-join-交叉连接" tabindex="-1"><a class="header-anchor" href="#_6-6-cross-join-交叉连接" aria-hidden="true">#</a> 6.6 cross join 交叉连接</h3>
<blockquote>
<p><strong>交叉连接</strong>cross join，将会返回被连接的两个表的笛卡尔积，返回结果的行数等于两个表行数的乘积。对于大表来说，cross join慎用。</p>
</blockquote>
<p>对于下面的代码：一般不建议使用方法A和B，因为如果有WHERE子句的话，往往会先生成两个表行数乘积的行的数据表然后才根据WHERE条件从中选择。因此，如果两个需要求交集的表太大，将会非常非常慢，不建议使用。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 下列A、B、C 执行结果相同，但是效率不一样：</span>
<span class="token comment">-- A:</span>
<span class="token keyword">select</span> a<span class="token punctuation">.</span><span class="token operator">*</span><span class="token punctuation">,</span>b<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">from</span> employee a<span class="token punctuation">,</span>employee_address b <span class="token keyword">where</span> a<span class="token punctuation">.</span>id<span class="token operator">=</span>b<span class="token punctuation">.</span>id<span class="token punctuation">;</span>

<span class="token comment">-- B:</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> employee a <span class="token keyword">cross</span> <span class="token keyword">join</span> employee_address b <span class="token keyword">on</span> a<span class="token punctuation">.</span>id<span class="token operator">=</span>b<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> employee a <span class="token keyword">cross</span> <span class="token keyword">join</span> employee_address b <span class="token keyword">where</span> a<span class="token punctuation">.</span>id<span class="token operator">=</span>b<span class="token punctuation">.</span>id<span class="token punctuation">;</span>

<span class="token comment">-- C:</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> employee a <span class="token keyword">inner</span> <span class="token keyword">join</span> employee_address b <span class="token keyword">on</span> a<span class="token punctuation">.</span>id<span class="token operator">=</span>b<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-7-hive-join使用注意事项" tabindex="-1"><a class="header-anchor" href="#_6-7-hive-join使用注意事项" aria-hidden="true">#</a> 6.7 Hive Join使用注意事项</h3>
<ol>
<li>
<p>允许使用复杂的联接表达式,支持非等值连接</p>
</li>
<li>
<p>同一查询中可以连接2个以上的表</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> a<span class="token punctuation">.</span>val<span class="token punctuation">,</span> b<span class="token punctuation">.</span>val<span class="token punctuation">,</span> c<span class="token punctuation">.</span>val <span class="token keyword">FROM</span> a <span class="token keyword">JOIN</span> b <span class="token keyword">ON</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span>key1<span class="token punctuation">)</span> <span class="token keyword">JOIN</span> c <span class="token keyword">ON</span> <span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span>key2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>如果每个表在联接子句中使用相同的列，则Hive将多个表上的联接转换为单个MR作业</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> a<span class="token punctuation">.</span>val<span class="token punctuation">,</span> b<span class="token punctuation">.</span>val<span class="token punctuation">,</span> c<span class="token punctuation">.</span>val <span class="token keyword">FROM</span> a <span class="token keyword">JOIN</span> b <span class="token keyword">ON</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span>key1<span class="token punctuation">)</span> <span class="token keyword">JOIN</span> c <span class="token keyword">ON</span> <span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span>key1<span class="token punctuation">)</span>
<span class="token comment">-- 由于联接中仅涉及b的key1列，因此被转换为1个MR作业来执行</span>
<span class="token keyword">SELECT</span> a<span class="token punctuation">.</span>val<span class="token punctuation">,</span> b<span class="token punctuation">.</span>val<span class="token punctuation">,</span> c<span class="token punctuation">.</span>val <span class="token keyword">FROM</span> a <span class="token keyword">JOIN</span> b <span class="token keyword">ON</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span>key1<span class="token punctuation">)</span> <span class="token keyword">JOIN</span> c <span class="token keyword">ON</span> <span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span>key2<span class="token punctuation">)</span>
<span class="token comment">-- 会转换为两个MR作业，因为在第一个连接条件中使用了b中的key1列，而在第二个连接条件中使用了b中的key2列。</span>
<span class="token comment">-- 第一个map / reduce作业将a与b联接在一起，然后将结果与c联接到第二个map / reduce作业中。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>join时的最后一个表会通过reducer流式传输，并在其中缓冲之前的其他表，因此，将大表放置在最后有助于减少reducer阶段缓存数据所需要的内存，当然也可以手动指定需要流式传输的表。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> a<span class="token punctuation">.</span>val<span class="token punctuation">,</span> b<span class="token punctuation">.</span>val<span class="token punctuation">,</span> c<span class="token punctuation">.</span>val <span class="token keyword">FROM</span> a <span class="token keyword">JOIN</span> b <span class="token keyword">ON</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span>key1<span class="token punctuation">)</span> <span class="token keyword">JOIN</span> c <span class="token keyword">ON</span> <span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span>key1<span class="token punctuation">)</span>
<span class="token comment">-- 由于联接中仅涉及b的key1列，因此被转换为1个MR作业来执行，并且表a和b的键的特定值的值被缓冲在reducer的内存中。然后，对于从c中检索的每一行，将使用缓冲的行来计算联接。</span>
<span class="token keyword">SELECT</span> a<span class="token punctuation">.</span>val<span class="token punctuation">,</span> b<span class="token punctuation">.</span>val<span class="token punctuation">,</span> c<span class="token punctuation">.</span>val <span class="token keyword">FROM</span> a <span class="token keyword">JOIN</span> b <span class="token keyword">ON</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span>key1<span class="token punctuation">)</span> <span class="token keyword">JOIN</span> c <span class="token keyword">ON</span> <span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span>key2<span class="token punctuation">)</span>
<span class="token comment">-- 计算涉及两个MR作业。其中的第一个将a与b连接起来，并缓冲a的值，同时在reducer中流式传输b的值。</span>
<span class="token comment">-- 在第二个MR作业中，将缓冲第一个连接的结果，同时将c的值通过reducer流式传输。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在join的时候，可以通过语法<strong>STREAMTABLE</strong>提示指定要流式传输的表。如果省略STREAMTABLE提示，则Hive将流式传输最右边的表。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token comment">/*+ STREAMTABLE(a) */</span> a<span class="token punctuation">.</span>val<span class="token punctuation">,</span> b<span class="token punctuation">.</span>val<span class="token punctuation">,</span> c<span class="token punctuation">.</span>val <span class="token keyword">FROM</span> a <span class="token keyword">JOIN</span> b <span class="token keyword">ON</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span>key1<span class="token punctuation">)</span> <span class="token keyword">JOIN</span> c <span class="token keyword">ON</span> <span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span>key1<span class="token punctuation">)</span>
<span class="token comment">-- a,b,c三个表都在一个MR作业中联接，并且表b和c的键的特定值的值被缓冲在reducer的内存中。</span>
<span class="token comment">-- 然后，对于从a中检索到的每一行，将使用缓冲的行来计算联接。如果省略STREAMTABLE提示，则Hive将流式传输最右边的表。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>join在WHERE条件之前进行。</p>
</li>
<li>
<p>如果除一个要连接的表之外的所有表都很小，则可以将其作为仅map作业执行（mapjoin）</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token comment">/*+ MAPJOIN(b) */</span> a<span class="token punctuation">.</span><span class="token keyword">key</span><span class="token punctuation">,</span> a<span class="token punctuation">.</span><span class="token keyword">value</span> <span class="token keyword">FROM</span> a <span class="token keyword">JOIN</span> b <span class="token keyword">ON</span> a<span class="token punctuation">.</span><span class="token keyword">key</span> <span class="token operator">=</span> b<span class="token punctuation">.</span><span class="token keyword">key</span>
<span class="token comment">-- 不需要reducer。对于A的每个Mapper，B都会被完全读取。限制是不能执行FULL / RIGHT OUTER JOIN b。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</div></template>


