<template><div><h1 id="_1-hive表设计优化" tabindex="-1"><a class="header-anchor" href="#_1-hive表设计优化" aria-hidden="true">#</a> 1. Hive表设计优化</h1>
<h2 id="_1-1-分区表结构设计" tabindex="-1"><a class="header-anchor" href="#_1-1-分区表结构设计" aria-hidden="true">#</a> 1.1 分区表结构设计</h2>
<blockquote>
<p>Hive在执行查询计划时，会<strong>使用表的最后一级目录作为底层处理数据的输入</strong>。如果不使用分区表，那么表目录下的所有文件将都会被加载，会导致大量磁盘和网络的IO损耗。</p>
</blockquote>
<h3 id="_1-1-1-普通表结构问题" tabindex="-1"><a class="header-anchor" href="#_1-1-1-普通表结构问题" aria-hidden="true">#</a> 1.1.1 普通表结构问题</h3>
<ul>
<li>假设每天有1G的数据增量，一年就是365GB的数据，按照业务需求，每次只需要对其中一天的数据进行处理，也就是处理1GB的数据；</li>
<li>程序会先加载365GB的数据，然后将364GB的数据过滤掉，只保留一天的数据再进行计算，<strong>导致了大量的磁盘和网络的IO的损耗</strong>。</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251627333.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_1-1-2-分区设计思想" tabindex="-1"><a class="header-anchor" href="#_1-1-2-分区设计思想" aria-hidden="true">#</a> 1.1.2 分区设计思想</h3>
<p>根据查询的需求，将数据按照查询的条件【一般以时间】进行划分分区存储，<strong>将不同分区的数据单独使用一个HDFS目录来进行存储</strong>，当底层实现计算时，根据查询的条件，<strong>只读取对应分区的数据作为输入，减少不必要的数据加载，提高程序的性能。</strong></p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251627694.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="_1-2-分桶表结构设计" tabindex="-1"><a class="header-anchor" href="#_1-2-分桶表结构设计" aria-hidden="true">#</a> 1.2 分桶表结构设计</h2>
<h3 id="_1-2-1-分桶表设计思想" tabindex="-1"><a class="header-anchor" href="#_1-2-1-分桶表设计思想" aria-hidden="true">#</a> 1.2.1 分桶表设计思想</h3>
<blockquote>
<p>分桶表的设计是按照一定的规则【底层通过MapReduce中的多个Reduce来实现】将数据划分到不同的文件中进行存储，构建分桶表。</p>
</blockquote>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251627244.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_1-2-2-优化join" tabindex="-1"><a class="header-anchor" href="#_1-2-2-优化join" aria-hidden="true">#</a> 1.2.2 优化Join</h3>
<p><strong>Hive中Join的问题：</strong></p>
<ul>
<li>默认情况下，Hive底层是通过MapReduce来实现的；</li>
<li>MapReduce在处理数据之间join的时候有两种方式：MapJoin、ReduceJoin，其中MapJoin效率较高；</li>
<li>如果<strong>有两张非常大的表要进行Join</strong>，底层无法使用MapJoin提高Join的性能，<strong>只能走默认的ReduceJoin；</strong></li>
<li>而ReduceJoin必须<strong>经过Shuffle过程，相对性能比较差</strong>，而且<strong>容易产生数据倾斜</strong>。</li>
</ul>
<p>如果有两张表按照相同的划分规则【比如按照Join的关联字段】将各自的数据进行划分；在Join时，就可以实现Bucket与Bucket的Join，避免不必要的比较，减少笛卡尔积数量。</p>
<h2 id="_1-3-索引设计" tabindex="-1"><a class="header-anchor" href="#_1-3-索引设计" aria-hidden="true">#</a> 1.3 索引设计</h2>
<blockquote>
<p>实际工作场景中，一般不推荐使用Hive Index，推荐使用ORC文件格式中的索引、物化视图来代替Hive Index提高查询性能。</p>
</blockquote>
<h3 id="_1-3-1-hive中的索引" tabindex="-1"><a class="header-anchor" href="#_1-3-1-hive中的索引" aria-hidden="true">#</a> 1.3.1 Hive中的索引</h3>
<ul>
<li>在传统的关系型数据库例如MySQL、Oracle中，为了提高数据的查询效率，可以为表中的字段单独构建索引，查询时，可以基于字段的索引快速的实现查询、过滤等操作。</li>
<li>Hive中也同样提供了索引的设计，允许用户为字段构建索引，提高数据的查询效率。但是Hive的索引与关系型数据库中的索引并不相同，比如，Hive不支持主键或者外键索引。</li>
<li>Hive索引可以建立在表中的某些列上，以提升一些操作的效率。</li>
<li>在可以预见到分区数据非常庞大的情况下，分桶和索引常常是优于分区的；</li>
<li>而分桶由于SMB Join对关联键（join字段）要求严格，所以并不是总能生效；</li>
<li>注意：官方明确表示，索引功能支持是从Hive0.7版本开始，到<strong>Hive3.0不再支持</strong>。</li>
</ul>
<h1 id="_1-3-2-索引的原理" tabindex="-1"><a class="header-anchor" href="#_1-3-2-索引的原理" aria-hidden="true">#</a> 1.3.2 索引的原理</h1>
<p>当为某张表的某个字段创建索引时，Hive中会自动创建一张索引表，该表记录了该字段的每个值与数据实际物理位置之间的关系，例如数据所在的HDFS文件地址，以及所在文件中偏移量offset等信息。</p>
<h3 id="_1-3-3-索引的目的" tabindex="-1"><a class="header-anchor" href="#_1-3-3-索引的目的" aria-hidden="true">#</a> 1.3.3 索引的目的</h3>
<p>提高Hive表指定列的查询速度。没有索引时，类似WHERE tab1.col1 = 10的查询，Hive会加载整张表或分区，然后处理所有的行，但是如果在字段col1上面存在索引时，那么只会加载和处理文件的一部分。</p>
<h3 id="_1-3-4-索引的使用" tabindex="-1"><a class="header-anchor" href="#_1-3-4-索引的使用" aria-hidden="true">#</a> 1.3.4 索引的使用</h3>
<p>创建索引：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 为表中的userid构建索引</span>
<span class="token keyword">create</span> <span class="token keyword">index</span> idx_user_id_login <span class="token keyword">on</span> <span class="token keyword">table</span> tb_login_part<span class="token punctuation">(</span>userid<span class="token punctuation">)</span>
<span class="token comment">-- 索引类型为Compact，Hive支持Compact和Bitmap类型，存储的索引内容不同</span>
<span class="token keyword">as</span> <span class="token string">'COMPACT'</span>
<span class="token comment">-- 延迟构建索引</span>
<span class="token keyword">with</span> deferred rebuild<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建/更新索引：通过运行一个MapReduce程序来构建索引</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">alter</span> <span class="token keyword">index</span> idx_user_id_login <span class="token keyword">ON</span> tb_login_part rebuild<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看索引结构：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">desc</span> default__tb_login_part_idx_user_id_login__<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看索引内容：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> default__tb_login_part_idx_user_id_login__<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除索引：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">INDEX</span> idx_user_id_login <span class="token keyword">ON</span> tb_login_part<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_1-3-5-索引的问题" tabindex="-1"><a class="header-anchor" href="#_1-3-5-索引的问题" aria-hidden="true">#</a> 1.3.5 索引的问题</h3>
<ul>
<li>Hive构建索引的过程是通过一个MapReduce程序来实现的；</li>
<li>每次Hive中原始数据表的数据发生更新时，索引表不会自动更新；</li>
<li>必须手动执行一个Alter index命令来实现通过MapReduce更新索引表，导致整体性能较差，维护相对繁琐。</li>
</ul>
<h1 id="_2-hive表数据优化" tabindex="-1"><a class="header-anchor" href="#_2-hive表数据优化" aria-hidden="true">#</a> 2. Hive表数据优化</h1>
<h2 id="_2-1-文件格式" tabindex="-1"><a class="header-anchor" href="#_2-1-文件格式" aria-hidden="true">#</a> 2.1 文件格式</h2>
<blockquote>
<p>通过不同的文件格式，可以降低存储空间，提高查询性能。主要推荐使用ORC格式。具体见Hadoop中的讲解。</p>
</blockquote>
<p>主要的存储格式如下，在创建表的时候通过stored as 关键字指定，具体使用见前面DDL。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251628336.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-1-1-textfile" tabindex="-1"><a class="header-anchor" href="#_2-1-1-textfile" aria-hidden="true">#</a> 2.1.1 TextFile</h3>
<ul>
<li>TextFile是Hive中<strong>默认</strong>的文件格式，存储形式为按行存储。</li>
<li>工作中最常见的数据文件格式就是TextFile文件，几乎所有的原始数据生成都是TextFile格式，所以Hive设计时考虑到为了避免各种编码及数据错乱的问题，选用了TextFile作为默认的格式。</li>
<li><strong>建表时不指定存储格式即为TextFile，导入数据时把数据文件拷贝至HDFS不进行处理。</strong></li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251628961.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-1-2-sequencefile" tabindex="-1"><a class="header-anchor" href="#_2-1-2-sequencefile" aria-hidden="true">#</a> 2.1.2 SequenceFile</h3>
<ul>
<li>SequenceFile是Hadoop里用来存储序列化的键值对即二进制的一种文件格式。</li>
<li>SequenceFile文件也可以作为MapReduce作业的输入和输出，hive也支持这种格式。</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251628746.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-1-3-parquet" tabindex="-1"><a class="header-anchor" href="#_2-1-3-parquet" aria-hidden="true">#</a> 2.1.3 Parquet</h3>
<ul>
<li>Parquet是一种支持嵌套结构的<strong>列式存储</strong>文件格式，最早是由Twitter和Cloudera合作开发，2015年5月从Apache孵化器里毕业成为Apache顶级项目。</li>
<li>是一种支持嵌套数据模型对的列式存储系统，作为大数据系统中OLAP查询的优化方案，它已经被多种查询引擎原生支持，并且部分高性能引擎将其作为默认的文件存储格式。</li>
<li>通过数据编码和压缩，以及映射下推和谓词下推功能，Parquet的性能也较之其它文件格式有所提升。</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251628486.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-1-4-orc" tabindex="-1"><a class="header-anchor" href="#_2-1-4-orc" aria-hidden="true">#</a> 2.1.4 ORC</h3>
<ul>
<li>ORC（OptimizedRC File）文件格式也是一种Hadoop生态圈中的<strong>列式存储</strong>格式；</li>
<li>它的产生早在2013年初，最初产生自Apache Hive，用于降低Hadoop数据存储空间和加速Hive查询速度；</li>
<li>2015年ORC项目被Apache项目基金会提升为Apache顶级项目</li>
</ul>
<figure><img src="@source/bigdata/hive/imgs/82.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="_2-2-数据压缩" tabindex="-1"><a class="header-anchor" href="#_2-2-数据压缩" aria-hidden="true">#</a> 2.2 数据压缩</h2>
<h3 id="_2-2-1-概述" tabindex="-1"><a class="header-anchor" href="#_2-2-1-概述" aria-hidden="true">#</a> 2.2.1 概述</h3>
<ul>
<li>Hive中的压缩就是使用了Hadoop中的压缩实现的，所以Hadoop中支持的压缩在Hive中都可以直接使用。</li>
<li>Hadoop中支持的压缩算法：</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251628645.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>Hive底层运行MapReduce程序时，磁盘I/O操作、网络数据传输、shuffle和merge要花大量的时间，尤其是数据规模很大和工作负载密集的情况下。</li>
<li>鉴于磁盘I/O和网络带宽是Hadoop的宝贵资源，数据压缩对于节省资源、最小化磁盘I/O和网络传输非常有帮助。</li>
<li>Hive压缩实际上说的就是MapReduce的压缩。</li>
</ul>
<p>MapReduce的压缩主要可以在下面四个阶段：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251628006.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-2-2-使用" tabindex="-1"><a class="header-anchor" href="#_2-2-2-使用" aria-hidden="true">#</a> 2.2.2 使用</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 开启hive中间传输数据压缩功能</span>
<span class="token comment">-- 1）开启hive中间传输数据压缩功能</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span>compress<span class="token punctuation">.</span>intermediate<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">-- 2）开启mapreduce中map输出压缩功能</span>
<span class="token keyword">set</span> mapreduce<span class="token punctuation">.</span>map<span class="token punctuation">.</span>output<span class="token punctuation">.</span>compress<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">-- 3）设置mapreduce中map输出数据的压缩方式</span>
<span class="token keyword">set</span> mapreduce<span class="token punctuation">.</span>map<span class="token punctuation">.</span>output<span class="token punctuation">.</span>compress<span class="token punctuation">.</span>codec<span class="token operator">=</span> org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>hadoop<span class="token punctuation">.</span>io<span class="token punctuation">.</span>compress<span class="token punctuation">.</span>SnappyCodec<span class="token punctuation">;</span>


<span class="token comment">-- 开启Reduce输出阶段压缩</span>
<span class="token comment">-- 1）开启hive最终输出数据压缩功能</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span>compress<span class="token punctuation">.</span>output<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">-- 2）开启mapreduce最终输出数据压缩</span>
<span class="token keyword">set</span> mapreduce<span class="token punctuation">.</span>output<span class="token punctuation">.</span>fileoutputformat<span class="token punctuation">.</span>compress<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">-- 3）设置mapreduce最终数据输出压缩方式</span>
<span class="token keyword">set</span> mapreduce<span class="token punctuation">.</span>output<span class="token punctuation">.</span>fileoutputformat<span class="token punctuation">.</span>compress<span class="token punctuation">.</span>codec <span class="token operator">=</span> org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>hadoop<span class="token punctuation">.</span>io<span class="token punctuation">.</span>compress<span class="token punctuation">.</span>SnappyCodec<span class="token punctuation">;</span>
<span class="token comment">-- 4）设置mapreduce最终数据输出压缩为块压缩</span>
<span class="token keyword">set</span> mapreduce<span class="token punctuation">.</span>output<span class="token punctuation">.</span>fileoutputformat<span class="token punctuation">.</span>compress<span class="token punctuation">.</span><span class="token keyword">type</span><span class="token operator">=</span>BLOCK<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-3-存储优化" tabindex="-1"><a class="header-anchor" href="#_2-3-存储优化" aria-hidden="true">#</a> 2.3 存储优化</h2>
<h3 id="_2-3-1-避免小文件生成" tabindex="-1"><a class="header-anchor" href="#_2-3-1-避免小文件生成" aria-hidden="true">#</a> 2.3.1 避免小文件生成</h3>
<ul>
<li>Hive的存储本质还是HDFS，HDFS是不利于小文件存储的，因为<strong>每个小文件会产生一条元数据信息</strong>，并且不利用MapReduce的处理，<strong>MapReduce中每个小文件会启动一个MapTask计算处理</strong>，<strong>导致资源的浪费</strong>，所以在使用Hive进行处理分析时，要尽量<strong>避免小文件的生成</strong>。</li>
<li>Hive中提供了一个特殊的机制，可以<strong>自动的判断是否是小文</strong>件，如果是小文件可以<strong>自动将小文件进行合并</strong>。</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 如果hive的程序，只有maptask，将MapTask产生的所有小文件进行合并</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">merge</span><span class="token punctuation">.</span>mapfiles<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">-- 如果hive的程序，有Map和ReduceTask,将ReduceTask产生的所有小文件进行合并</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">merge</span><span class="token punctuation">.</span>mapredfiles<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">-- 每一个合并的文件的大小（244M）</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">merge</span><span class="token punctuation">.</span>size<span class="token punctuation">.</span>per<span class="token punctuation">.</span>task<span class="token operator">=</span><span class="token number">256000000</span><span class="token punctuation">;</span>
<span class="token comment">-- 平均每个文件的大小，如果小于这个值就会进行合并(15M)</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">merge</span><span class="token punctuation">.</span>smallfiles<span class="token punctuation">.</span>avgsize<span class="token operator">=</span><span class="token number">16000000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-2-如何读取小文件" tabindex="-1"><a class="header-anchor" href="#_2-3-2-如何读取小文件" aria-hidden="true">#</a> 2.3.2 如何读取小文件</h3>
<blockquote>
<p>Hive中也提供一种输入类CombineHiveInputFormat，用于<strong>将小文件合并以后，再进行处</strong>理</p>
</blockquote>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 设置Hive中底层MapReduce读取数据的输入类：将所有文件合并为一个大文件作为输入</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>input<span class="token punctuation">.</span>format<span class="token operator">=</span>org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>hadoop<span class="token punctuation">.</span>hive<span class="token punctuation">.</span>ql<span class="token punctuation">.</span>io<span class="token punctuation">.</span>CombineHiveInputFormat<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-3-orc文件索引" tabindex="-1"><a class="header-anchor" href="#_2-3-3-orc文件索引" aria-hidden="true">#</a> 2.3.3 ORC文件索引</h3>
<ul>
<li>在使用ORC文件时，为了加快读取ORC文件中的数据内容，ORC提供了两种索引机制：<strong>Row Group Index</strong> 和 <strong>Bloom Filter Index</strong>可以帮助提高查询ORC文件的性能</li>
<li>当用户写入数据时，可以指定构建索引，当用户查询数据时，可以<strong>根据索引提前对数据进行过滤，避免不必要的数据扫描</strong>。</li>
</ul>
<p><strong>Row Group Index</strong></p>
<ul>
<li>一个ORC文件包含一个或多个stripes(groups of row data)，每个stripe中包含了每个column的min/max值的索引数据；</li>
<li>当查询中有大于等于小于的操作时，会根据min/max值，跳过扫描不包含的stripes。</li>
<li>而其中为每个stripe建立的包含min/max值的索引，就称为Row Group Index行组索引，也叫min-max Index大小对比索引，或者Storage Index。</li>
<li>建立ORC格式表时，指定表参数<code v-pre>orc.create.index=true</code>之后，便会建立Row Group Index；</li>
<li>为了使Row Group Index有效利用，向表中加载数据时，<strong>必须对需要使用索引的字段进行排序</strong></li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 1、开启索引配置</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">optimize</span><span class="token punctuation">.</span><span class="token keyword">index</span><span class="token punctuation">.</span>filter<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">-- 2、创建表并制定构建索引</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> tb_sogou_orc_index
stored <span class="token keyword">as</span> orc tblproperties <span class="token punctuation">(</span><span class="token string">"orc.create.index"</span><span class="token operator">=</span><span class="token string">"true"</span><span class="token punctuation">)</span>
<span class="token keyword">as</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_sogou_source
distribute <span class="token keyword">by</span> stime
sort <span class="token keyword">by</span> stime<span class="token punctuation">;</span>
<span class="token comment">-- 3、当进行范围或者等值查询（**&lt;,>,=**）时就可以基于构建的索引进行查询</span>
<span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">from</span> tb_sogou_orc_index <span class="token keyword">where</span> stime <span class="token operator">></span> <span class="token string">'12:00:00'</span> <span class="token operator">and</span> stime <span class="token operator">&lt;</span> <span class="token string">'18:00:00'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Bloom Filter Index</strong></p>
<ul>
<li>建表时候通过表参数”orc.bloom.filter.columns”=”columnName……”来指定为哪些字段建立BloomFilter索引，在生成数据的时候，会在每个stripe中，为该字段建立BloomFilter的数据结构；</li>
<li>当<strong>查询条件中包含对该字段的等值过滤时候</strong>，先从BloomFilter中获取以下是否包含该值，如果不包含，则跳过该stripe。</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 创建表指定创建布隆索引</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> tb_sogou_orc_bloom
stored <span class="token keyword">as</span> orc tblproperties <span class="token punctuation">(</span><span class="token string">"orc.create.index"</span><span class="token operator">=</span><span class="token string">"true"</span><span class="token punctuation">,</span><span class="token string">"orc.bloom.filter.columns"</span><span class="token operator">=</span><span class="token string">"stime,userid"</span><span class="token punctuation">)</span>
<span class="token keyword">as</span> <span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> tb_sogou_source
distribute <span class="token keyword">by</span> stime sort <span class="token keyword">by</span> stime<span class="token punctuation">;</span>
<span class="token comment">-- stime的范围过滤可以走row group index，userid的过滤可以走bloom filter index</span>
<span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token keyword">from</span> tb_sogou_orc_index
<span class="token keyword">where</span> stime <span class="token operator">></span> <span class="token string">'12:00:00'</span> <span class="token operator">and</span> stime <span class="token operator">&lt;</span> <span class="token string">'18:00:00'</span>
<span class="token operator">and</span> userid <span class="token operator">=</span> <span class="token string">'3933365481995287'</span> <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-4-orc矢量查询" tabindex="-1"><a class="header-anchor" href="#_2-3-4-orc矢量查询" aria-hidden="true">#</a> 2.3.4 ORC矢量查询</h3>
<ul>
<li>Hive的默认查询执行引擎一次处理一行，而矢量化查询执行是一种Hive针对ORC文件操作的特性，目的是按照每批1024行读取数据，并且一次性对整个记录整合（而不是对单条记录）应用操作，提升了像过滤, 联合, 聚合等等操作的性能。</li>
<li><strong>注意：要使用矢量化查询执行，就必须以ORC格式存储数据。</strong></li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 开启矢量化查询</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>vectorized<span class="token punctuation">.</span>execution<span class="token punctuation">.</span>enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>vectorized<span class="token punctuation">.</span>execution<span class="token punctuation">.</span>reduce<span class="token punctuation">.</span>enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_3-job作业执行优化" tabindex="-1"><a class="header-anchor" href="#_3-job作业执行优化" aria-hidden="true">#</a> 3. Job作业执行优化</h1>
<h2 id="_3-1-explain查询计划" tabindex="-1"><a class="header-anchor" href="#_3-1-explain查询计划" aria-hidden="true">#</a> 3.1 explain查询计划</h2>
<ul>
<li>explain命令可以帮助用户了解一条HQL语句在底层的实现过程。通俗来说就是Hive打算如何去做这件事。</li>
<li>explain会解析HQL语句，将整个HQL语句的<strong>实现步骤</strong>、<strong>依赖关系</strong>、<strong>实现过程</strong>都会进行解析返回，可以了解一条HQL语句在底层是如何实现数据的查询及处理的过程，辅助用户对Hive进行优化。</li>
</ul>
<h3 id="_3-1-1-语法" tabindex="-1"><a class="header-anchor" href="#_3-1-1-语法" aria-hidden="true">#</a> 3.1.1 语法</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">EXPLAIN</span> <span class="token punctuation">[</span>FORMATTED<span class="token operator">|</span><span class="token keyword">EXTENDED</span><span class="token operator">|</span>DEPENDENCY<span class="token operator">|</span><span class="token keyword">AUTHORIZATION</span><span class="token operator">|</span><span class="token punctuation">]</span> query
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>FORMATTED：对执行计划进行格式化，返回JSON格式的执行计划</li>
<li><strong>EXTENDED</strong>：提供一些额外的信息，比如文件的路径信息</li>
<li>DEPENDENCY：以JSON格式返回查询所依赖的表和分区的列表</li>
<li>AUTHORIZATION：列出需要被授权的条目，包括输入与输出</li>
</ul>
<h3 id="_3-1-2-输出组成" tabindex="-1"><a class="header-anchor" href="#_3-1-2-输出组成" aria-hidden="true">#</a> 3.1.2 输出组成</h3>
<ul>
<li><strong>The Abstract Syntax Tree for the query（抽象语法树AST）</strong>：Hive使用Antlr解析生成器，可以自动地将HQL生成为抽象语法树</li>
<li><strong>The dependencies between the different stages of the plan（Stage依赖关系）</strong>：会列出运行查询划分的stage阶段以及之间的依赖关系</li>
<li><strong>The description of each of the stages（Stage内容）</strong>：包含了每个stage非常重要的信息，比如运行时的operator和sort orders等具体的信息</li>
</ul>
<h2 id="_3-2-mapreduce属性优化" tabindex="-1"><a class="header-anchor" href="#_3-2-mapreduce属性优化" aria-hidden="true">#</a> 3.2 MapReduce属性优化</h2>
<h3 id="_3-2-1-本地模式" tabindex="-1"><a class="header-anchor" href="#_3-2-1-本地模式" aria-hidden="true">#</a> 3.2.1 本地模式</h3>
<ul>
<li>使用Hive的过程中，有一些数据量不大的表也会转换为MapReduce处理，提交到集群时，需要申请资源，等待资源分配，启动JVM进程，再运行Task，一系列的过程比较繁琐，本身数据量并不大，提交到YARN运行返回会导致性能较差的问题。</li>
<li>Hive为了解决这个问题，延用了MapReduce中的设计，提供本地计算模式，允许程序不提交给YARN，直接在本地运行，以便于<strong>提高小数据量程序的性能。</strong></li>
</ul>
<p><strong>配置</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 开启本地模式</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span><span class="token keyword">mode</span><span class="token punctuation">.</span><span class="token keyword">local</span><span class="token punctuation">.</span>auto <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用条件：</strong></p>
<ul>
<li>输入文件的总大小小于：<code v-pre>hive.exec.mode.local.auto.inputbytesmax</code>(128MB by default)</li>
<li>map-task个数小于：<code v-pre>hive.exec.mode.local.auto.tasks.max</code>(4 by default)</li>
<li>reduce task的个数只能为1或者0</li>
</ul>
<h3 id="_3-2-2-jvm重用" tabindex="-1"><a class="header-anchor" href="#_3-2-2-jvm重用" aria-hidden="true">#</a> 3.2.2 JVM重用</h3>
<blockquote>
<p>Hadoop3不再支持</p>
</blockquote>
<ol>
<li>Hadoop默认会为每个Task启动一个JVM来运行，而在JVM启动时内存开销大；</li>
<li>Job数据量大的情况，如果单个Task数据量比较小，也会申请JVM，这就导致了资源紧张及浪费的情况；</li>
<li>JVM重用可以使得JVM实例在同一个job中重新使用N次，当一个Task运行结束以后，JVM不会进行释放，而是继续供下一个Task运行，直到运行了N个Task以后，就会释放；</li>
<li>N的值可以在Hadoop的mapred-site.xml文件中进行配置，通常在10-20之间。</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- Hadoop3之前的配置，在mapred-site.xml中添加以下参数</span>
<span class="token comment">-- Hadoop3中已不再支持该选项</span>
mapreduce<span class="token punctuation">.</span>job<span class="token punctuation">.</span>jvm<span class="token punctuation">.</span>numtasks<span class="token operator">=</span><span class="token number">10</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-3-并行执行" tabindex="-1"><a class="header-anchor" href="#_3-2-3-并行执行" aria-hidden="true">#</a> 3.2.3 并行执行</h3>
<blockquote>
<p>没有依赖的stage并行执行</p>
</blockquote>
<ol>
<li>Hive在实现HQL计算运行时，会解析为多个Stage，有时候Stage彼此之间有依赖关系，只能挨个执行，但是在一些别的场景下，很多的Stage之间是没有依赖关系的；</li>
<li>例如Union语句，Join语句等等，这些Stage没有依赖关系，但是Hive依旧默认挨个执行每个Stage，这样会导致性能非常差，我们可以通过修改参数，开启并行执行，当多个Stage之间没有依赖关系时，允许多个Stage并行执行，提高性能。</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 开启Stage并行化，默认为false</span>
<span class="token keyword">SET</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span>parallel<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">-- 指定并行化线程数，默认为8</span>
<span class="token keyword">SET</span> hive<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">.</span>parallel<span class="token punctuation">.</span>thread<span class="token punctuation">.</span>number<span class="token operator">=</span><span class="token number">16</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-3-join优化" tabindex="-1"><a class="header-anchor" href="#_3-3-join优化" aria-hidden="true">#</a> 3.3 Join优化</h2>
<ul>
<li>Join是数据分析处理过程中必不可少的操作，Hive同样支持Join的语法；</li>
<li>Hive Join的底层是通过MapReduce来实现的，Hive实现Join时，为了提高MapReduce的性能，提供了多种Join方案来实现；</li>
<li>例如适合小表Join大表的Map Join，大表Join大表的Reduce Join，以及大表Join的优化方案Bucket Join等。</li>
</ul>
<h3 id="_3-3-1-map-join" tabindex="-1"><a class="header-anchor" href="#_3-3-1-map-join" aria-hidden="true">#</a> 3.3.1 Map Join</h3>
<blockquote>
<p>Map端Join的关键是将小表文件做一个分布式缓存（distributed cache），把他发送到各台机器上，再启动一个或多个MapTask，去读大表的数据，分别与缓存之间进行关联，关联的结果直接输出</p>
</blockquote>
<ul>
<li>应用场景：适合于小表join大表或者小表Join小表</li>
<li>原理：将小的那份数据给每个MapTask的内存都放一份完整的数据，大的数据每个部分都可以与小数据的完整数据进行join。底层不需要经过shuffle，需要占用内存空间存放小的数据文件</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251628916.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>尽量使用Map Join来实现Join过程，Hive中默认自动开启了<code v-pre>MapJoin：hive.auto.convert.join=true</code></p>
<p>Hive中小表的大小限制</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 2.0版本之前的控制属性</span>
hive<span class="token punctuation">.</span>mapjoin<span class="token punctuation">.</span>smalltable<span class="token punctuation">.</span>filesize<span class="token operator">=</span><span class="token number">25</span>M
<span class="token comment">-- 2.0版本开始由以下参数控制</span>
hive<span class="token punctuation">.</span>auto<span class="token punctuation">.</span><span class="token keyword">convert</span><span class="token punctuation">.</span><span class="token keyword">join</span><span class="token punctuation">.</span>noconditionaltask<span class="token punctuation">.</span>size<span class="token operator">=</span><span class="token number">512000000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-2-reduce-join" tabindex="-1"><a class="header-anchor" href="#_3-3-2-reduce-join" aria-hidden="true">#</a> 3.3.2 Reduce Join</h3>
<ul>
<li>应用场景：适合于大表Join大表</li>
<li>原理：将两张表的数据在shuffle阶段利用shuffle的分组来将数据按照关联字段进行合并。必须经过shuffle，利用Shuffle过程中的分组来实现关联</li>
<li>使用：Hive会自动判断是否满足Map Join，如果不满足Map Join，则自动执行Reduce Join</li>
</ul>
<h3 id="_3-3-3-bucket-join" tabindex="-1"><a class="header-anchor" href="#_3-3-3-bucket-join" aria-hidden="true">#</a> 3.3.3 Bucket Join</h3>
<ul>
<li>
<p>应用场景：适合于大表Join大表</p>
</li>
<li>
<p>原理：将两张表按照相同的规则将数据划分。根据对应的规则的数据进行join。减少了比较次数，提高了性能</p>
</li>
<li>
<p>使用Bucket Join</p>
<ul>
<li>语法：<code v-pre>clusterd by colName</code></li>
<li>参数：<code v-pre>set hive.optimize.bucketmapjoin = **true**;</code></li>
<li>要求：分桶字段 = Join字段 ，桶的个数相等或者成倍数</li>
</ul>
</li>
<li>
<p>使用Sort Merge Bucket Join（SMB）</p>
<ul>
<li>基于有序数据的Join</li>
<li>语法：distribute by colName sorted by colName</li>
<li>参数：见下面</li>
<li>要求：分桶字段 = Join字段 = 排序字段 ，桶的个数相等或者成倍数</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">optimize</span><span class="token punctuation">.</span>bucketmapjoin <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>auto<span class="token punctuation">.</span><span class="token keyword">convert</span><span class="token punctuation">.</span>sortmerge<span class="token punctuation">.</span><span class="token keyword">join</span><span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">optimize</span><span class="token punctuation">.</span>bucketmapjoin<span class="token punctuation">.</span>sortedmerge <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>auto<span class="token punctuation">.</span><span class="token keyword">convert</span><span class="token punctuation">.</span>sortmerge<span class="token punctuation">.</span><span class="token keyword">join</span><span class="token punctuation">.</span>noconditionaltask<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="_3-4-优化器" tabindex="-1"><a class="header-anchor" href="#_3-4-优化器" aria-hidden="true">#</a> 3.4 优化器</h2>
<h3 id="_3-4-1-背景" tabindex="-1"><a class="header-anchor" href="#_3-4-1-背景" aria-hidden="true">#</a> 3.4.1 背景</h3>
<ul>
<li>出现原因：当一个程序中如果有一些操作彼此之间有关联性，是可以在一个MapReduce中实现的，但是Hive会不智能的选择，Hive会使用两个MapReduce来完成这两个操作。</li>
<li>例如：当我们执行 <code v-pre>select …… from table group by id order by id desc</code>。该SQL语句转换为MapReduce时，我们可以有两种方案来实现：</li>
<li>方案一：第一个MapReduce做group by，经过shuffle阶段对id做分组；第二个MapReduce对第一个MapReduce的结果做order by，经过shuffle阶段对id进行排序</li>
<li>因为都是对id处理，可以使用一个MapReduce的shuffle既可以做分组也可以排序</li>
</ul>
<h3 id="_3-4-2-使用" tabindex="-1"><a class="header-anchor" href="#_3-4-2-使用" aria-hidden="true">#</a> 3.4.2 使用</h3>
<p><strong>在这种场景下，Hive会默认选择用第一种方案来实现，这样会导致性能相对较差</strong></p>
<p>可以在Hive中开启关联优化，对有关联关系的操作进行解析时，可以尽量放在同一个MapReduce中实现。</p>
<p>配置：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">optimize</span><span class="token punctuation">.</span>correlation<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-4-3-优化器介绍" tabindex="-1"><a class="header-anchor" href="#_3-4-3-优化器介绍" aria-hidden="true">#</a> 3.4.3 优化器介绍</h3>
<h4 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h4>
<ul>
<li>Hive默认的优化器在解析一些聚合统计类的处理时，底层解析的方案有时候不是最佳的方案。</li>
<li>例如当前有一张表【共1000条数据】，id构建了索引，id =100值有900条。需求：查询所有id = 100的数据，SQL语句为：<code v-pre>select * from table where id = 100;</code></li>
<li>方案一：由于id这一列构建了索引，索引默认的<strong>优化器引擎RBO</strong>，会选择先从索引中查询id = 100的值所在的位置，再根据索引记录位置去读取对应的数据，但是这并不是最佳的执行方案。</li>
<li>方案二：有id=100的值有900条，占了总数据的90%，这时候是没有必要检索索引以后再检索数据的，可以直接检索数据返回，这样的效率会更高，更节省资源，这种方式就是<strong>CBO优化器引擎</strong>会选择的方案。</li>
</ul>
<h4 id="rbo" tabindex="-1"><a class="header-anchor" href="#rbo" aria-hidden="true">#</a> RBO</h4>
<p>rule basic optimise：基于规则的优化器，根据设定好的规则来对程序进行优化</p>
<h4 id="cbo" tabindex="-1"><a class="header-anchor" href="#cbo" aria-hidden="true">#</a> CBO</h4>
<p><strong>cost basic optimise</strong>：基于代价的优化器，根据不同场景所需要付出的代价来合适选择优化的方案</p>
<p>对数据的分布的信息【数值出现的次数，条数，分布】来综合判断用哪种处理的方案是最佳方案</p>
<ul>
<li>Hive中支持RBO与CBO这两种引擎，默认使用的是RBO优化器引擎。</li>
<li>很明显CBO引擎更加智能，所以在使用Hive时，我们可以配置底层的优化器引擎为CBO引擎。</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> hive<span class="token punctuation">.</span>cbo<span class="token punctuation">.</span><span class="token keyword">enable</span><span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">compute</span><span class="token punctuation">.</span>query<span class="token punctuation">.</span><span class="token keyword">using</span><span class="token punctuation">.</span>stats<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>stats<span class="token punctuation">.</span><span class="token keyword">fetch</span><span class="token punctuation">.</span><span class="token keyword">column</span><span class="token punctuation">.</span>stats<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="anayze分析器" tabindex="-1"><a class="header-anchor" href="#anayze分析器" aria-hidden="true">#</a> Anayze分析器</h4>
<blockquote>
<p>CBO计算代价的手段</p>
</blockquote>
<p>功能：用于提前运行一个MapReduce程序将表或者分区的信息构建一些元数据【表的信息、分区信息、列的信息】，搭配CBO引擎一起使用</p>
<p>用法：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 分析优化器</span>
<span class="token keyword">use</span> tb_part<span class="token punctuation">;</span>
<span class="token comment">-- 构建表中分区数据的元数据信息</span>
<span class="token keyword">ANALYZE</span> <span class="token keyword">TABLE</span> tb_login_part <span class="token keyword">PARTITION</span><span class="token punctuation">(</span>logindate<span class="token punctuation">)</span> <span class="token keyword">COMPUTE</span> <span class="token keyword">STATISTICS</span><span class="token punctuation">;</span>
<span class="token comment">-- 构建表中列的数据的元数据信息</span>
<span class="token keyword">ANALYZE</span> <span class="token keyword">TABLE</span> tb_login_part  <span class="token keyword">COMPUTE</span> <span class="token keyword">STATISTICS</span> <span class="token keyword">FOR</span> <span class="token keyword">COLUMNS</span>  userid<span class="token punctuation">;</span>
<span class="token comment">-- 查看构建的列的元数据</span>
<span class="token keyword">desc</span> formatted tb_login_part userid<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251628717.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="_3-5-谓词下推-ppd" tabindex="-1"><a class="header-anchor" href="#_3-5-谓词下推-ppd" aria-hidden="true">#</a> 3.5 谓词下推（PPD）</h2>
<blockquote>
<ul>
<li>谓词：用来描述或判定客体性质、特征或者客体之间关系的词项。比如&quot;3 大于 2&quot;中&quot;大于&quot;是一个谓词。</li>
<li>谓词下推Predicate Pushdown（PPD）基本思想：将过滤表达式尽可能移动至靠近数据源的位置，以使真正执行时能直接跳过无关的数据。简单点说就是在不影响最终结果的情况下，尽量将过滤条件提前执行。</li>
<li>Hive中谓词下推后，过滤条件会下推到map端，提前执行过滤，减少map到reduce的传输数据，提升整体性能。</li>
<li>开启参数：<code v-pre>hive.optimize.ppd=**true**;</code></li>
</ul>
</blockquote>
<h3 id="_3-5-1-示例" tabindex="-1"><a class="header-anchor" href="#_3-5-1-示例" aria-hidden="true">#</a> 3.5.1 示例</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 使用了谓词下推，先过滤再join</span>
<span class="token keyword">select</span> a<span class="token punctuation">.</span>id<span class="token punctuation">,</span>a<span class="token punctuation">.</span>value1<span class="token punctuation">,</span>b<span class="token punctuation">.</span>value2 <span class="token keyword">from</span> table1 a
<span class="token keyword">join</span> <span class="token punctuation">(</span><span class="token keyword">select</span> b<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">from</span> table2 b <span class="token keyword">where</span> b<span class="token punctuation">.</span>ds<span class="token operator">>=</span><span class="token string">'20181201'</span> <span class="token operator">and</span> b<span class="token punctuation">.</span>ds<span class="token operator">&lt;</span><span class="token string">'20190101'</span><span class="token punctuation">)</span> c
<span class="token keyword">on</span> <span class="token punctuation">(</span>a<span class="token punctuation">.</span>id<span class="token operator">=</span>c<span class="token punctuation">.</span>id<span class="token punctuation">)</span>

<span class="token keyword">select</span> a<span class="token punctuation">.</span>id<span class="token punctuation">,</span>a<span class="token punctuation">.</span>value1<span class="token punctuation">,</span>b<span class="token punctuation">.</span>value2 <span class="token keyword">from</span> table1 a
<span class="token keyword">join</span> table2 b <span class="token keyword">on</span> a<span class="token punctuation">.</span>id<span class="token operator">=</span>b<span class="token punctuation">.</span>id
<span class="token keyword">where</span> b<span class="token punctuation">.</span>ds<span class="token operator">>=</span><span class="token string">'20181201'</span> <span class="token operator">and</span> b<span class="token punctuation">.</span>ds<span class="token operator">&lt;</span><span class="token string">'20190101'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251628479.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_3-5-2-规则" tabindex="-1"><a class="header-anchor" href="#_3-5-2-规则" aria-hidden="true">#</a> 3.5.2 规则</h3>
<ol>
<li>对于Join(Inner Join)、Full outer Join，条件写在on后面，还是where后面，性能上面没有区别；</li>
<li>对于Left outer Join ，右侧的表写在on后面、左侧的表写在where后面，性能上有提高；</li>
<li>对于Right outer Join，左侧的表写在on后面、右侧的表写在where后面，性能上有提高；</li>
<li>当条件分散在两个表时，谓词下推可按上述结论2和3自由组合。</li>
</ol>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251628592.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="_3-6-数据倾斜" tabindex="-1"><a class="header-anchor" href="#_3-6-数据倾斜" aria-hidden="true">#</a> 3.6 数据倾斜</h2>
<blockquote>
<p>数据倾斜的现象是，当提交运行一个程序时，这个程序的大多数的Task都已经运行结束了，只有某一个Task一直在运行，迟迟不能结束，导致整体的进度卡在99%或者100%，这时候就可以判定程序出现了数据倾斜的问题。</p>
</blockquote>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251628550.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_3-6-1-group-by-count-distinct-时的倾斜" tabindex="-1"><a class="header-anchor" href="#_3-6-1-group-by-count-distinct-时的倾斜" aria-hidden="true">#</a> 3.6.1 group by, count(distinct)时的倾斜</h3>
<blockquote>
<p>当程序中出现group by或者count（distinct）等分组聚合的场景时，如果数据本身是倾斜的，根据MapReduce的Hash分区规则，肯定会出现数据倾斜的现象。</p>
<p>根本原因是因为分区规则导致的，所以可以通过以下几种方案来解决group by导致的数据倾斜的问题。</p>
</blockquote>
<h4 id="方案一-开启map端聚合" tabindex="-1"><a class="header-anchor" href="#方案一-开启map端聚合" aria-hidden="true">#</a> 方案一：开启Map端聚合</h4>
<p><code v-pre>hive.map.aggr=true;</code></p>
<p>通过减少shuffle数据量和Reducer阶段的执行时间，避免每个Task数据差异过大导致数据倾斜</p>
<h4 id="方案二-实现随机分区" tabindex="-1"><a class="header-anchor" href="#方案二-实现随机分区" aria-hidden="true">#</a> 方案二：实现随机分区</h4>
<p><code v-pre>select from table distribute by rand();</code></p>
<p>distribute by用于指定底层按照哪个字段作为Key实现分区、分组等</p>
<p>通过rank函数随机值实现随机分区，避免数据倾斜</p>
<h3 id="方案三-数据倾斜时自动负载均衡" tabindex="-1"><a class="header-anchor" href="#方案三-数据倾斜时自动负载均衡" aria-hidden="true">#</a> 方案三：数据倾斜时自动负载均衡</h3>
<p><code v-pre>hive.groupby.skewindata=true;</code></p>
<p>开启该参数以后，当前程序会自动通过两个MapReduce来运行</p>
<p>第一个MapReduce自动进行随机分布到Reducer中，每个Reducer做部分聚合操作，输出结果</p>
<p>第二个MapReduce将上一步聚合的结果再按照业务（group by key）进行处理，保证相同的分布到一起，最终聚合得到结果</p>
<h3 id="_3-6-2-join时的倾斜" tabindex="-1"><a class="header-anchor" href="#_3-6-2-join时的倾斜" aria-hidden="true">#</a> 3.6.2 join时的倾斜</h3>
<blockquote>
<p>Join操作时，如果两张表比较大，无法实现Map Join，只能走Reduce Join，那么当关联字段中某一种值过多的时候依旧会导致数据倾斜的问题；</p>
</blockquote>
<p>面对Join产生的数据倾斜，核心的思想是尽量避免Reduce Join的产生，优先使用Map Join来实现；</p>
<p>但往往很多的Join场景不满足Map Join的需求，那么可以以下几种方案来解决Join产生的数据倾斜问题</p>
<h4 id="方案一-提前过滤-将大数据变成小数据-实现map-join" tabindex="-1"><a class="header-anchor" href="#方案一-提前过滤-将大数据变成小数据-实现map-join" aria-hidden="true">#</a> 方案一：提前过滤，将大数据变成小数据，实现Map Join</h4>
<blockquote>
<p>也就是谓词下推</p>
</blockquote>
<h4 id="方案二-使用bucket-join" tabindex="-1"><a class="header-anchor" href="#方案二-使用bucket-join" aria-hidden="true">#</a> 方案二：使用Bucket Join</h4>
<p>如果使用方案一，过滤后的数据依旧是一张大表，那么最后的Join依旧是一个Reduce Join</p>
<p>这种场景下，可以将两张表的数据构建为桶表，实现Bucket Map Join，避免数据倾斜</p>
<h4 id="方案三-使用skew-join" tabindex="-1"><a class="header-anchor" href="#方案三-使用skew-join" aria-hidden="true">#</a> 方案三：使用Skew Join</h4>
<p>Skew Join是Hive中一种专门为了避免数据倾斜而设计的特殊的Join过程</p>
<p>这种Join的原理是将Map Join和Reduce Join进行合并，如果某个值出现了数据倾斜，就会将产生数据倾斜的数据单独使用Map Join来实现</p>
<p>其他没有产生数据倾斜的数据由Reduce Join来实现，这样就避免了Reduce Join中产生数据倾斜的问题</p>
<p>最终将Map Join的结果和Reduce Join的结果进行Union合并</p>
<p><strong>原理</strong>：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251629063.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>配置</strong>：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 开启运行过程中skewjoin</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">optimize</span><span class="token punctuation">.</span>skewjoin<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">-- 如果这个key的出现的次数超过这个范围</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span>skewjoin<span class="token punctuation">.</span><span class="token keyword">key</span><span class="token operator">=</span><span class="token number">100000</span><span class="token punctuation">;</span>
<span class="token comment">-- 在编译时判断是否会产生数据倾斜</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">optimize</span><span class="token punctuation">.</span>skewjoin<span class="token punctuation">.</span>compiletime<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">-- 不合并，提升性能</span>
<span class="token keyword">set</span> hive<span class="token punctuation">.</span><span class="token keyword">optimize</span><span class="token punctuation">.</span><span class="token keyword">union</span><span class="token punctuation">.</span>remove<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">-- 如果Hive的底层走的是MapReduce，必须开启这个属性，才能实现不合并</span>
<span class="token keyword">set</span> mapreduce<span class="token punctuation">.</span>input<span class="token punctuation">.</span>fileinputformat<span class="token punctuation">.</span>input<span class="token punctuation">.</span>dir<span class="token punctuation">.</span>recursive<span class="token operator">=</span><span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4-hive3新特性" tabindex="-1"><a class="header-anchor" href="#_4-hive3新特性" aria-hidden="true">#</a> 4. Hive3新特性</h1>
<h2 id="_4-1-hive-on-tez" tabindex="-1"><a class="header-anchor" href="#_4-1-hive-on-tez" aria-hidden="true">#</a> 4.1 Hive on Tez</h2>
<blockquote>
<p>一般都使用Spark了，所以了解就行</p>
</blockquote>
<h2 id="_4-2-hive-llap更新" tabindex="-1"><a class="header-anchor" href="#_4-2-hive-llap更新" aria-hidden="true">#</a> 4.2 Hive LLAP更新</h2>
<blockquote>
<p>只能与Tez配套使用，了解</p>
</blockquote>
<h2 id="_4-3-metastore独立模式" tabindex="-1"><a class="header-anchor" href="#_4-3-metastore独立模式" aria-hidden="true">#</a> 4.3 Metastore独立模式</h2>
<blockquote>
<p>从Hive 3.0开始，Metastore可以在不安装Hive其他部分的情况下单独运行，作为一个单独的发行版提供，用于实现允许其他非Hive的系统，例如Spark、Impala等轻松地与Metastore集成。</p>
<p>目前来说为了方便起见，依旧建议将Metastore放在Hive中，一起安装部署。</p>
</blockquote>
</div></template>


