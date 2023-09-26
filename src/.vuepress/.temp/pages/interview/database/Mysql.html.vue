<template><div><h2 id="说说对mysql索引的理解" tabindex="-1"><a class="header-anchor" href="#说说对mysql索引的理解" aria-hidden="true">#</a> 说说对MySQL索引的理解</h2>
<p>索引是在存储引擎中实现的，因此，每种存储引擎的索引都不一定完全相同，并且每种存储引擎也不一定支持所有的索引类型。MySQL中索引的存储类型有两种，即<code v-pre>BTREE</code>和<code v-pre>HASH</code>，具体和表的存储引擎相关。<code v-pre>MyISAM</code>和<code v-pre>InnoDB</code>的存储引擎只支持<code v-pre>BTREE</code>索引，<code v-pre>MEMORY</code>存储引擎支持<code v-pre>HASH</code>和<code v-pre>BTREE</code>索引。</p>
<p><strong>优点：</strong></p>
<ol>
<li>通过创建唯一索引，可以保证数据库表中每一行数据的唯一性</li>
<li>可以大大加快查询速度，这也是创建索引的主要原因</li>
<li>在实现数据的参考完整性方面，可以加速表和表之间的连接</li>
<li>在使用分组和排序子句进行数据查询时，也可以显著减少查询中分组和排序的时间</li>
</ol>
<p><strong>缺点：</strong></p>
<ol>
<li>创建索引和维护索引要耗费时间，并且随着数据量的增加所耗费的时间也会增加</li>
<li>索引需要占磁盘空间，除了数据表占数据空间之外，每一个索引还要占一定的物理空间，如果有大量的索引，索引文件可能比数据文件更快达到最大文件尺寸</li>
<li>当对表中的数据进行增删改操作的时候，索引也要进行动态维护，这样降低了数据的维护速度</li>
</ol>
<h2 id="为了减少io-索引树会一次性加载吗" tabindex="-1"><a class="header-anchor" href="#为了减少io-索引树会一次性加载吗" aria-hidden="true">#</a> 为了减少IO，索引树会一次性加载吗</h2>
<ol>
<li>数据库索引是存储在磁盘上的，如果数据量很大，必然导致索引的大小也会很大，超过几个G</li>
<li>当我们利用索引查询时候，是不可能将全部几个G的索引都加载进内存的，我们能做的就是逐一加载每个磁盘页（数据页），因为数据页对应着索引树的节点</li>
</ol>
<h2 id="b-树的存储能力如何-为何说一般查找行记录-最多只需1-3次磁盘io-为什么索引使用b-树" tabindex="-1"><a class="header-anchor" href="#b-树的存储能力如何-为何说一般查找行记录-最多只需1-3次磁盘io-为什么索引使用b-树" aria-hidden="true">#</a> B+树的存储能力如何？为何说一般查找行记录，最多只需1~3次磁盘IO（为什么索引使用B+树）</h2>
<p>InnoDB存储引擎中页的大小为16 KB，一般表的逐渐类型为INT（占用4个字节）或BIGINT（占用8个字节），指针类型也一般为4-8个字节，也就是说一个页（B+tree中的一个节点）中大概存储<code v-pre>16KB/(8B+8B)=1K</code>个键值，换算出一页大概能存储1000条数据，深度为3可以存储<code v-pre>1000*1000*1000=10亿</code>条数据。。。</p>
<h2 id="为什么b-树比b树更适合做索引" tabindex="-1"><a class="header-anchor" href="#为什么b-树比b树更适合做索引" aria-hidden="true">#</a> 为什么B+树比B树更适合做索引</h2>
<ol>
<li>
<p><strong>B+树的磁盘读写代价更低</strong></p>
<p>B+树的内部节点并没有指向关键字具体信息的指针。因此其内部节点相对B树更小。如果把所有同一内部节点的关键字存放在同一块盘中，那么盘块所能容纳的关键字数量也越多。一次性读入内存中的需要查找的关键字也就越多。相对来说IO读写次数也就降低了。</p>
</li>
<li>
<p><strong>B+树的查询效率更加稳定</strong></p>
<p>由于非叶节点并不是最终指向文件内容的节点，而只是叶子节点中关键字的索引。所以任何关键字的查找必须走一条从根节点到叶子节点的路。所有关键字查询的路径长度相同，导致每一数据的查询效率相当。而B-树非叶子节点也存储数据，可能需要中序遍历。</p>
</li>
<li>
<p><strong>在范围查询上，B+树的效率也比B树高</strong></p>
<p>B+树的关键字都出现在叶子节点中，叶子节点之间会有指针，数据又是递增的，这使得范围查找可以通过指针连接查找。而在B树中则需要通过中序遍历才能完成范围查询。</p>
</li>
</ol>
<h2 id="innodb为什么不建议用过长的字段作为主键" tabindex="-1"><a class="header-anchor" href="#innodb为什么不建议用过长的字段作为主键" aria-hidden="true">#</a> InnoDB为什么不建议用过长的字段作为主键</h2>
<p>所有二级索引都引用主键索引，过长的主键索引会令二级索引变得过大</p>
<h2 id="innodb为什么使用自增主键是一个很好的选择" tabindex="-1"><a class="header-anchor" href="#innodb为什么使用自增主键是一个很好的选择" aria-hidden="true">#</a> InnoDB为什么使用自增主键是一个很好的选择</h2>
<p>InnoDB数据文件本身是一颗B+树，非单调的主键会造成在插入新纪录时，数据文件为了维持B+树的特性而频繁的分裂调整（页分裂）</p>
<h2 id="hash结构效率高-那为什么还要使用b-树索引呢" tabindex="-1"><a class="header-anchor" href="#hash结构效率高-那为什么还要使用b-树索引呢" aria-hidden="true">#</a> Hash结构效率高，那为什么还要使用B+树索引呢</h2>
<ol>
<li>Hash索引仅能满足 <code v-pre>= , &lt;&gt; , IN</code> 查询。如果进行范围查询，哈希索引的时间复杂度会退化为O(n)。而树型的依然能够保持O(log2N)</li>
<li>Hash索引数据存储是没有顺序的，在ORDER BY的情况下，使用Hash索引还需要对数据重新排序。</li>
<li>对于联合索引的情况，Hash值是将联合索引键合并起来一起计算的，无法对单独的一个键或者几个索引键进行判断。</li>
<li>对于等值查询来说，通常Hash索引的效率更高，不过当索引列的重复值过多，由于Hash冲突效率就会降低。</li>
</ol>
<h2 id="索引的分类" tabindex="-1"><a class="header-anchor" href="#索引的分类" aria-hidden="true">#</a> 索引的分类</h2>
<ol>
<li>从<strong>功能逻辑</strong>上说，索引主要有4种，分别是普通索引、唯一索引、主键索引和全文索引</li>
<li>从<strong>物理实现方式</strong>：聚簇索引和非聚簇索引</li>
<li><strong>作用字段个数</strong>：单列索引和联合索引</li>
</ol>
<h2 id="哪些情况适合创建索引" tabindex="-1"><a class="header-anchor" href="#哪些情况适合创建索引" aria-hidden="true">#</a> 哪些情况适合创建索引</h2>
<ol>
<li>
<p>字段的数值有唯一性的限制</p>
<p><code v-pre>业务上具有唯一特性的字段，即使是组合字段，也必须建成唯一索引</code>。<br>
说明：不要以为唯一索引影响了<code v-pre>insert</code>速度，这个速度损耗可以忽略，但提高查找速度是明显的。</p>
</li>
<li>
<p>频繁作为 <code v-pre>WHERE</code> 查询条件的字段</p>
<p>某个字段在 <code v-pre>SELECT</code> 语句的 <code v-pre>WHERE</code> 条件中经常被使用到，那么就需要给这个字段创建索引了。<br>
尤其是在数据量大的情况下，创建普通索引就可以大幅提升数据查询的效率。</p>
</li>
<li>
<p>经常 <code v-pre>GROUP BY</code> 和 <code v-pre>ORDER BY</code> 的列</p>
<p>索引就是让数据按照某种顺序进行存储或检索，因此当我们使用 GROUP BY 对数据进行分组查询，或者使用 <code v-pre>ORDER BY</code> 对数据进行排序的时候，就需要 <code v-pre>对分组或者排序的字段进行索引</code> 。<br>
如果待排序的列有多个，那么可以在这些列上建立 <code v-pre>组合索引</code> 。</p>
</li>
<li>
<p><code v-pre>UPDATE</code>、<code v-pre>DELETE</code> 的 <code v-pre>WHERE</code> 条件列</p>
<p>对数据按照某个条件进行查询后再进行 <code v-pre>UPDATE</code> 或 <code v-pre>DELETE</code> 的操作，如果对 WHERE 字段创建了索引，就能大幅提升效率。原理是因为我们需要先根据 <code v-pre>WHERE</code> 条件列检索出来这条记录，然后再对它进行更新或删除。<br>
如果进行更新的时候，更新的字段是非索引字段，提升的效率会更明显，这是因为非索引字段更新不需要对索引进行维护。</p>
</li>
<li>
<p><code v-pre>DISTINCT</code> 字段需要创建索引</p>
<p>有时候我们需要对某个字段进行去重，使用 <code v-pre>DISTINCT</code>，那么对这个字段创建索引，也会提升查询效率。</p>
<p>索引列按<code v-pre>递增的顺序</code> 进行排序。这是因为索引会对数据按照某种顺序进行排序，所以在去重的时候也会快很多。</p>
</li>
<li>
<p>多表 <code v-pre>JOIN</code> 连接操作时，创建索引注意事项</p>
<ul>
<li>首先， 连接表的数量尽量不要超过 3 张，因为每增加一张表就相当于增加了一次嵌套的循环，数量级增长会非常快，严重影响查询的效率。</li>
<li>其次， 对 <code v-pre>WHERE</code> 条件创建索引 ，因为 WHERE 才是对数据条件的过滤。如果在数据量非常大的情况下，没有 <code v-pre>WHERE</code> 条件过滤是非常可怕的。</li>
<li>最后， 对用于连接的字段创建索引，并且该字段在多张表中的 类型必须一致 。比如 <code v-pre>course_id</code> 在<code v-pre>student_info</code> 表和 <code v-pre>course</code> 表中都为 <code v-pre>int(11)</code> 类型，而不能一个为 <code v-pre>int</code> 另一个为 <code v-pre>varchar</code> 类型。</li>
</ul>
</li>
<li>
<p>使用列数据类型小的字段创建索引</p>
</li>
<li>
<p>使用字符串前缀创建索引</p>
<ul>
<li>【 强制 】在 <code v-pre>varchar</code> 字段上建立索引时，必须指定索引长度，没必要对全字段建立索引，根据实际文本区分度决定索引长度。</li>
<li>说明：索引的长度与区分度是一对矛盾体，一般对字符串类型数据，长度为 20 的索引，区分度会 高达90% 以上 ，可以使用 <code v-pre>count(distinct left(列名, 索引长度))/count(*)</code> 的区分度来确定。</li>
</ul>
</li>
<li>
<p>区分度（散列性）高的适合作为索引</p>
<p>数据相似性大的就不适合建立索引，如：<code v-pre>男女性别</code></p>
</li>
<li>
<p>使用最频繁的字段放到联合索引左侧</p>
<p>这样也可以较少的建立一些索引。同时，由于&quot;<code v-pre>最左前缀原则</code>&quot;，可以增加联合索引的使用率。</p>
</li>
<li>
<p>在多个字段需要创建索引的情况下，联合索引优于单值</p>
</li>
</ol>
<h2 id="哪些情况不适合创建索引" tabindex="-1"><a class="header-anchor" href="#哪些情况不适合创建索引" aria-hidden="true">#</a> 哪些情况不适合创建索引</h2>
<ol>
<li>
<p>在where中使用不到的字段</p>
</li>
<li>
<p>数据量小的表</p>
</li>
<li>
<p>有大量重复数据的列</p>
</li>
<li>
<p>避免经常更新的表创建过多的索引</p>
</li>
<li>
<p>不建议使用无序的值作为索引</p>
<p>例如<code v-pre>身份证</code>、<code v-pre>UUID</code>(在索引比较时需要转为ASCII，并且插入时可能造成页分裂)、<code v-pre>MD5</code>、<code v-pre>HASH</code>、<code v-pre>无序长字符</code>串等。</p>
</li>
<li>
<p>删除不再使用或很少使用的索引</p>
</li>
<li>
<p>不要定义冗余或重复的索引。</p>
</li>
</ol>
<h2 id="索引下推" tabindex="-1"><a class="header-anchor" href="#索引下推" aria-hidden="true">#</a> 索引下推</h2>
<blockquote>
<p>Index Condition Pushdown(ICP)是MySQL 5.6中新特性，是一种在存储引擎层使用索引过滤数据的一种优化方式。</p>
</blockquote>
<p>示例：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>alert <span class="token keyword">table</span> tb_people <span class="token keyword">add</span> <span class="token keyword">index</span> <span class="token identifier"><span class="token punctuation">`</span>zip_last_first<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>zipcode<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>lastname<span class="token punctuation">`</span></span><span class="token punctuation">,</span> <span class="token identifier"><span class="token punctuation">`</span>firstname<span class="token punctuation">`</span></span><span class="token punctuation">)</span>

<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> people
<span class="token keyword">where</span> zipcode <span class="token operator">=</span> <span class="token string">'000001'</span>
<span class="token operator">and</span> lastname <span class="token operator">like</span> <span class="token string">'%张%'</span>
<span class="token operator">and</span> address <span class="token operator">like</span> <span class="token string">'%北京市%'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述添加了一个联合索引。<code v-pre>select</code>语句只有<code v-pre>zipcode</code>命中了联合索引，<code v-pre>lastname</code>因为%开头并不能命中，但是因为联合索引中有<code v-pre>lastname</code>，所以会先在联合索引中通过<code v-pre>lastname</code>进行过滤，然后再进行回表操作。这就是索引下推。</p>
<h2 id="exists和in的区分" tabindex="-1"><a class="header-anchor" href="#exists和in的区分" aria-hidden="true">#</a> EXISTS和IN的区分</h2>
<p>如何选择需要看表的大小。<code v-pre>小表驱动大表</code>。</p>
<p>比如</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> A <span class="token keyword">where</span> cc <span class="token operator">in</span> <span class="token punctuation">(</span><span class="token keyword">select</span> cc <span class="token keyword">from</span> B<span class="token punctuation">)</span>
<span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> A <span class="token keyword">where</span> <span class="token keyword">exists</span> <span class="token punctuation">(</span><span class="token keyword">select</span> cc <span class="token keyword">from</span> B <span class="token keyword">where</span> B<span class="token punctuation">.</span>cc <span class="token operator">=</span> A<span class="token punctuation">.</span>cc<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当A小于B时，用EXISTS。因为EXISTS的实现，相当于外表循环，</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">for</span> i in <span class="token class-name">A</span>
    <span class="token keyword">for</span> j in <span class="token class-name">B</span>
        <span class="token keyword">if</span> j<span class="token punctuation">.</span>cc <span class="token operator">==</span> i<span class="token punctuation">.</span>cc then<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IN的逻辑</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">for</span> i in <span class="token class-name">B</span>
    <span class="token keyword">for</span> j in <span class="token class-name">A</span>
        <span class="token keyword">if</span> j<span class="token punctuation">.</span>cc <span class="token operator">==</span> i<span class="token punctuation">.</span>cc then<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="count-count-1-和count-具体字段" tabindex="-1"><a class="header-anchor" href="#count-count-1-和count-具体字段" aria-hidden="true">#</a> COUNT(*), COUNT(1)和COUNT(具体字段)</h2>
<ol>
<li><code v-pre>COUNT(*)</code>和<code v-pre>COUNT(1)</code>都是对结果进行COUNT，<code v-pre>COUNT(*)</code>和<code v-pre>COUNT(1)</code>本质上并没有区别。</li>
<li>如果采用的是<code v-pre>MyISAM</code>存储引擎，统计数据表的行数只需要<code v-pre>O(1)</code>的复杂度，这是因为每张<code v-pre>MyISAM</code>的数据表都有一个meta信息存储了<code v-pre>row_count</code>的值，而一致性则由表级锁来保证。如果是<code v-pre>InnoDB</code>，因为<code v-pre>InnoDB</code>支持事务，采用行级锁和<code v-pre>MVCC</code>机制，所以无法像<code v-pre>MyISAM</code>一样，维护一个<code v-pre>row_count</code>变量，因此需要采用扫描全表，<code v-pre>O(n)</code>的复杂度。</li>
<li>在<code v-pre>InnoDB</code>中如果采用<code v-pre>COUNT(具体字段)</code>来统计数据行数，要尽量采用二级索引。因为主键采用的索引是聚簇索引，聚簇索引包含的信息多，明显会大于二级索引。对于<code v-pre>COUNT(*)</code>和<code v-pre>COUNT(1)</code>来说，他们不需要查找具体的行，只是统计行数，系统会<code v-pre>自动</code>采用占用空间小的二级索引来进行统计。如果有多个二级索引，会使用<code v-pre>key_len</code>小的二级索引进行扫描。当没有二级索引的时候，才会采用主键索引来进行统计。</li>
</ol>
<h2 id="关于select" tabindex="-1"><a class="header-anchor" href="#关于select" aria-hidden="true">#</a> 关于SELECT(*)</h2>
<p>在表查询中，建议明确字段，不要使用 <code v-pre>*</code>作为查询的字段列表，推荐受用具体字段查询。</p>
<p>原因：</p>
<ol>
<li><code v-pre>mysql</code>在解析的过程中，会通过查询<code v-pre>数据字典</code>将 <code v-pre>*</code> 按序转换成所有列名，这会大大消耗资源和时间。</li>
<li>无法使用<code v-pre>覆盖索引</code></li>
</ol>
<h2 id="多使用commit" tabindex="-1"><a class="header-anchor" href="#多使用commit" aria-hidden="true">#</a> 多使用COMMIT</h2>
<p>只要有可能，在程序中尽量多使用<code v-pre>COMMIT</code>，这样程序的性能能够得到提高，需求也会因为<code v-pre>COMMIT</code>所释放的资源而减少。</p>
<p><code v-pre>COMMIT</code>所释放的资源：</p>
<ol>
<li>回滚段上用于恢复数据的信息</li>
<li>被程序语句获得的锁</li>
<li><code v-pre>redo / undo log buffer</code>中的空间</li>
<li>管理上述3种资源种的内部花费</li>
</ol>
<h2 id="主键如何设计" tabindex="-1"><a class="header-anchor" href="#主键如何设计" aria-hidden="true">#</a> 主键如何设计</h2>
<h3 id="自增id的问题" tabindex="-1"><a class="header-anchor" href="#自增id的问题" aria-hidden="true">#</a> 自增ID的问题</h3>
<ol>
<li>可靠性不高：存在自增ID回溯的问题，这个问题直到8.0才解决</li>
<li>安全性不高：对外暴露的接口容易暴露信息。比如<code v-pre>/User/1</code></li>
<li>性能差：自增ID的性能较差，需要在数据库服务器端生成</li>
<li>交互多：业务需要二外执行一次类似last_insert_id()的函数才能知道插入的子增值。</li>
<li>局部唯一性：分布式问题</li>
</ol>
<h3 id="推荐的主键设计" tabindex="-1"><a class="header-anchor" href="#推荐的主键设计" aria-hidden="true">#</a> 推荐的主键设计</h3>
<p>对于核心业务，主键的设计至少应该是全局唯一且是单调递增。全局唯一保证在各系统之间都是唯一的，单调递增是希望插入时不影响数据库性能。推荐使用UUID。</p>
<p><strong>UUID的特点：</strong></p>
<p>全局唯一，占用36字节，数据无序，插入性能差。</p>
<p>UUID如下图所示：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/UUID.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>改造UUID</strong></p>
<p>若将时间高低位互换，则时间就是单调递增的了。MySQL8.0可以更换时间低位和时间高位的存储方式，这样UUID就是有序的UUID了。</p>
<h2 id="谈谈你对mvcc的了解" tabindex="-1"><a class="header-anchor" href="#谈谈你对mvcc的了解" aria-hidden="true">#</a> 谈谈你对MVCC的了解</h2>
<blockquote>
<p>MVCC只存在读已提交和可重复读的情况下，两种情况下生成ReadView的机制不一样。</p>
<p>在读已提交中，每次读操作都会生成一个ReadView所以会出现不可重复读的情况。对于可重复读，在一次事务中，只有第一次读操作会生成ReadView，所以不会出现可重复读，也不会出现幻读。</p>
<p><a href="https://juejin.cn/post/6844903808376504327" target="_blank" rel="noopener noreferrer">MySQL事务隔离级别和MVCC - 掘金 (juejin.cn)<ExternalLinkIcon/></a></p>
</blockquote>
<p>InnoDB的默认隔离级别是REPEATABLE READ，RR解决了脏读、不可重复读和<strong>幻读</strong>的问题。注意不是到了串行化才解决了幻读， <s>RR通过MVCC快照读的思想就已经解决了幻读的问题。（这点有待商榷）</s> MVCC的意思是多版本并发控制。它最大的优点就是读不加锁，因此读写不冲突，并发性能好。InnoDB实现MVCC，多个版本的数据可以共存，主要基于以下奇数以及数据结构：</p>
<ol>
<li>隐藏列：InnoDB中每行数据都有隐藏列，隐藏列中包含了本行数据的<code v-pre>事务id</code>，<code v-pre>指向undo log的指针</code>等。</li>
<li>基于undo log的版本链：每行数据的隐藏列中包含了指向undo log的指针，而每条undo log也会指向更早版本的undo log，从而形成一条版本链。</li>
<li>ReadView：通过隐藏列和版本链，MySQL可以将数据恢复到指定版本。但是具体要恢复到哪个版本，则需要根据ReadView来确定。所谓ReadView，是指事务（记作事务A）在某一时刻给整个事务系统（trx_sys）打快照，之后再进行读操作时，会将读取到的数据中的事务id与trx_sys快照比较，从而判断数据对该ReadView是否可见，即对事务A是否可见。</li>
</ol>
<h2 id="where和having的区别" tabindex="-1"><a class="header-anchor" href="#where和having的区别" aria-hidden="true">#</a> WHERE和HAVING的区别</h2>
<p>WHERE是一个约束声明，使用WHERE约束来自数据库的数据，WHERE是在结果返回之前起作用的，WHERE中不能使用聚合函数</p>
<p>HAVING是一个过滤声明，是在查询结果返回集以后对查询结果进行过滤的操作，在HAVING中可以使用聚合函数。另一方面，HAVING子句中不能使用除了分组字段和聚合函数之外的其他字段。</p>
<p>从性能上来说，HAVING子句中如果使用了分组字段作为过滤条件，应该替换成WHERE子句。因为WHERE可以在执行分组操作和计算聚合函数之前过滤掉不需要的数据，性能会更好。</p>
<h2 id="数据库索引失效了怎么办" tabindex="-1"><a class="header-anchor" href="#数据库索引失效了怎么办" aria-hidden="true">#</a> 数据库索引失效了怎么办</h2>
<blockquote>
<p>可以采用一下几种方式，来避免索引失效</p>
</blockquote>
<ol>
<li>使用联合索引时，要遵循“最左前缀”原则</li>
<li>不在索引列上做任何操作，例如计算、函数、类型转换，会导致索引失效而转向全表扫描</li>
<li>尽量使用覆盖索引，减少<code v-pre>select *</code>使用能减少回表的次数</li>
<li>MySQL在使用不等于的时候无法使用索引会导致全表扫描</li>
<li>LIKE以通配符开头（<code v-pre>%abc</code>）MySQL索引会失效变成全表扫描</li>
<li>字符串不加单引号会导致索引失效（发生了索引列的隐式转换）</li>
<li>少用or，用or会导致索引失效</li>
</ol>
<h2 id="事务的四大特性以及如何实现" tabindex="-1"><a class="header-anchor" href="#事务的四大特性以及如何实现" aria-hidden="true">#</a> 事务的四大特性以及如何实现</h2>
<ol>
<li>原子性：原子性指整个数据库事务是不可分割的工作单位。只有事务中的数据库操作都执行成功，整个事务才算执行成功。事务中任何一个SQL语句执行失败，那么之前已经执行成功的SQL语句也必须撤销，数据库状态应该退回到执行事务前的状态。</li>
<li>一致性：一致性是指事务将数据库从一种状态转变为另一种一致的状态。在事务开始之前和事务结束以后，数据库的完整性约束没有被破坏。</li>
<li>隔离性：事务与事务之间的操作时互相隔离互不干扰的。</li>
<li>持久性：事务一旦提交，其结果就是永久的，即使发生宕机等故障，数据库也能将数据恢复。</li>
</ol>
<p><strong>原子性实现原理</strong></p>
<p>实现原子性的关键，是当事务回滚时能够撤销所有已经成功执行的SQL语句。InnoDB实现回滚靠的是<code v-pre>undo log</code>，当事务对数据库进行修改时，InnoDB会生成对应的<code v-pre>undo log</code>。如果事务执行失败或者调用了rollback，导致事务需要回滚，便可以利用<code v-pre>undo log</code>中的信息将数据回滚到修改之前的样子。</p>
<p><code v-pre>undo log</code>属于逻辑日志，它记录的是SQL执行相关的信息。当发生回滚时，InnoDB会根据undo log的内容做与之前相反的工作。对于insert，回滚时会执行delete。对于delete，回滚时会执行insert。对于update，回滚时则会执行相反的update，把数据改回去。</p>
<p><strong>持久性实现原理</strong></p>
<p>InnoDB作为MySQL的存储引擎，数据是存放在磁盘中的，但如果每次读写数据都需要磁盘IO，效率会很低。为此，InnoDB提供了缓存（<code v-pre>Buffer Pool</code>），<code v-pre>Buffer Pool</code>中包含了磁盘中部分数据页的映射，作为访问数据库的缓冲。当从数据库读取数据时，首先会从<code v-pre>Buffer Pool</code>中读取，如果<code v-pre>Buffer Pool</code>中没有，则从磁盘读取后放入<code v-pre>Buffer Pool</code>。当向数据库写入数据时，会首先写入<code v-pre>Buffer Pool</code>，<code v-pre>Buffer Pool</code>中修改的数据会定期刷新到磁盘中。</p>
<p><code v-pre>Buffer Pool</code>的使用大大提高了读写数据的效率，但是也带来了新的问题：如果MySQL宕机，而此时<code v-pre>Buffer Pool</code>中修改的数据还没有刷新到磁盘，就会导致数据的丢失，事务的持久性无法保证。</p>
<p>于是，<code v-pre>redo log</code>被引入来解决这个问题。当数据修改时，除了修改<code v-pre>Buffer Pool</code>中的数据，还会在<code v-pre>redo log</code>记录这次操作。当事务提交时，对<code v-pre>redo log</code>进行刷盘。如果MySQL宕机，重启时可以读取<code v-pre>redo log</code>中的数据，对数据库进行恢复。<code v-pre>redo log</code>采用WAL（Write-ahead logging，预写式日志），所有修改先写入日志，再更新到<code v-pre>Buffer Pool</code>，保证数据不在因MySQL宕机而丢失，从而满足了持久性要求。</p>
<blockquote>
<p>既然<code v-pre>redo log</code>也需要在事务提交时将日志写入磁盘，为什么它比直接将<code v-pre>Buffer Pool</code>中修改的数据写入磁盘要快呢?</p>
</blockquote>
<ul>
<li>将<code v-pre>Buffer Pool</code>中的数据写入磁盘属于随机IO，因为每次修改的数据位置随机，但写<code v-pre>redo log</code>是追加操作，属于顺序IO</li>
<li>将<code v-pre>Buffer Pool</code>中的数据写入磁盘是以数据页为单位进行的，MySQL默认页为16KB，一个页上一个小修改都要整页写入。而<code v-pre>redo log</code>中只包含真正需要写入的部分，无效IO大大减少。</li>
</ul>
<p><strong>隔离性实现原理</strong></p>
<p>隔离性追求的是并发情形下事务之间互不干扰。</p>
<p>第一方面，两个事务同时写：<strong>锁机制保证隔离性</strong></p>
<p>隔离性要求同一时刻只能有一个事务对数据进行写操作，InnoDB通过锁机制来保证这一点。锁机制的基本原理可以概括为：事务在修改数据之前，需要先获得相应的锁。获得锁之后，事务便可以修改数据。该事务执行期间，这部分数据是锁定的，其他事务如果需要修改数据，需要等待当前事务提交或回滚后释放锁。</p>
<p>按照粒度，锁可以分为表锁、行锁以及其他位于二至之间的锁（页锁）。表锁在操作数据时会锁定整张表，并发性能较差。行锁则之锁定需要操作的数据，并发性能好。但是由于加锁本身也需要消耗资源，因此在锁定数据较多的情况下使用表锁可以节省大量资源。MySQL中不同的存储引擎支持的锁是不一样的，例如MyIsam只支持表锁，而InnoDB同时支持表锁和行锁，且处于性能考虑，绝大多数情况下使用的是行锁。</p>
<p>第二方面，一个事务读，一个事务写时，<strong>MVCC保证隔离性</strong></p>
<p>[0x10. 谈谈你对MVCC的了解](#0x10. 谈谈你对MVCC的了解)</p>
<p><strong>一致性实现原理</strong></p>
<p>一致性是事务追求的最终目标。前面提到的原子性、持久性和隔离性都是为了保证数据库状态的一致性。此外，除数据库层面的保障，一致性的实现也需要在应用层面进行保障。</p>
<h2 id="mysql的悲观锁和乐观锁" tabindex="-1"><a class="header-anchor" href="#mysql的悲观锁和乐观锁" aria-hidden="true">#</a> MySQL的悲观锁和乐观锁</h2>
<p><strong>悲观锁</strong></p>
<p>悲观锁是一种思想，对数据被其他事务修改持保守态度，会<strong>通过数据库自身的锁机制来实现</strong>，从而保证数据操作的排他性。</p>
<p><strong>乐观锁</strong></p>
<p>乐观锁也是一种思想，对数据被其他事务修改持乐观态度，属于小概率事件，不采用数据库本身的锁机制，而是通过程序来实现（<code v-pre>CAS</code>）。在程序上，我们可以<strong>使用版本号机制或时间戳机制来实现</strong></p>
<ul>
<li>
<p>乐观锁的版本号机制</p>
<p>在表中设计一个版本号字段version，第一次读的时候会获取version的取值。然后对数据进行更新或删除操作时会对当前字段的version进行加一操作。如果此时已经有事务对这条数据进行了更改，修改就不会成功。</p>
</li>
<li>
<p>乐观锁的时间戳机制</p>
<p>时间戳和版本号机制一样，也是在更新提交的时候，将当前数据的时间戳和更新之前取得的时间戳进行比较，如果两者一致则更新成功，否则就是版本冲突。</p>
</li>
</ul>
<h2 id="根据锁的类型分类" tabindex="-1"><a class="header-anchor" href="#根据锁的类型分类" aria-hidden="true">#</a> 根据锁的类型分类</h2>
<blockquote>
<p>需要注意的是对于InnoDB引擎来说，共享锁和排他锁既可以加在表上，也可以加在行上</p>
</blockquote>
<ol>
<li>共享锁（S Lock）：针对同一份数据，多个事务的读操作可以同时进行而不会互相影响，互相不阻塞</li>
<li>排他锁（X Lock）：当前写操作没有完成前，他会阻断其他共享锁和排他锁。这样就能确保在给定的时间里，只有一个事务能执行写入，并防止其他用户读取正在写入的同一资源</li>
</ol>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">X</th>
<th style="text-align:center">S</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">X</td>
<td style="text-align:center">不兼容</td>
<td style="text-align:center">不兼容</td>
</tr>
<tr>
<td style="text-align:center">S</td>
<td style="text-align:center">不兼容</td>
<td style="text-align:center">兼容</td>
</tr>
</tbody>
</table>
<h2 id="根据锁的粒度进行分类" tabindex="-1"><a class="header-anchor" href="#根据锁的粒度进行分类" aria-hidden="true">#</a> 根据锁的粒度进行分类</h2>
<blockquote>
<p>可以分为表锁，页锁和行锁</p>
</blockquote>
<h3 id="表锁" tabindex="-1"><a class="header-anchor" href="#表锁" aria-hidden="true">#</a> 表锁</h3>
<p><strong>意向锁</strong></p>
<blockquote>
<p>如果我们给某一行数据加上了排他锁，数据库会自动给更大一级的空间，比如数据页或数据表加上意向锁，告诉其他人这个数据页或数据表已经有人给它上过排他锁了。</p>
<p>不这么做的话，想上锁的那个事务需要遍历有没有行锁。</p>
</blockquote>
<ul>
<li>意向共享锁：事务有意向对表中的某些行加共享锁，就会在更大一级的空间加上意向共享锁。</li>
<li>意向排他锁：事务有意向对表中的某些行加排他锁，就会在更大一级的空间加上意向排他锁。</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">意向共享锁（IS）</th>
<th style="text-align:center">意向排他锁（IX）</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">意向共享锁（IS）</td>
<td style="text-align:center">兼容</td>
<td style="text-align:center">兼容</td>
</tr>
<tr>
<td style="text-align:center">意向排他锁（IX）</td>
<td style="text-align:center">兼容</td>
<td style="text-align:center">兼容</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">意向共享锁（IS）</th>
<th style="text-align:center">意向排他锁（IX）</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">共享锁（S）</td>
<td style="text-align:center">兼容</td>
<td style="text-align:center">不兼容</td>
</tr>
<tr>
<td style="text-align:center">排他锁（X）</td>
<td style="text-align:center">不兼容</td>
<td style="text-align:center">不兼容</td>
</tr>
</tbody>
</table>
<p><strong>自增锁</strong></p>
<p><code v-pre>AUTO-INC</code>锁是当想使用含有<code v-pre>AUTO-INCREMENT</code>列的表中插入数据时需要获取的一种特殊的表级锁，在执行插入语句时就在表级别加一个<code v-pre>AUTO-INC</code>锁，然后为每条待插入记录的<code v-pre>AUTO_INCREMENT</code>修饰的列分配递增的值，在该语句执行结束后，再把<code v-pre>AUTO-INC</code>锁释放掉。</p>
<p><strong>元数据锁</strong></p>
<p>当对一个表做增删改查操作的时候，加MDL读锁；当要对表做结构变更操作的时候，加MDL写锁。</p>
<p>读锁之间不互斥，因此你可以有多个线程同时对一张表增删改查。读写锁之间，写锁之间是互斥的，用来保证变更表结构操作的安全性，解决了DML和DDL操作之间的一致性问题。不需要显示使用，在访问一个表的时候会被自动加上。</p>
<h3 id="行锁" tabindex="-1"><a class="header-anchor" href="#行锁" aria-hidden="true">#</a> 行锁</h3>
<blockquote>
<p>行锁又称为记录锁，顾名思义就是锁住某一行。需要注意的是，MySQL服务器层并没有实现行锁机制，行级锁只在存储引擎层实现。</p>
</blockquote>
<p><strong>记录锁（Record Locks）</strong></p>
<blockquote>
<p>可以理解为行级别的共享锁和排他锁</p>
</blockquote>
<p><strong>间隙锁（Gap Locks）</strong></p>
<blockquote>
<p>锁定一个范围，不包含记录本身（开区间），为了防止插入幻影记录而提出的</p>
</blockquote>
<p><strong>临键锁（Next-Key Locks）</strong></p>
<blockquote>
<p>Record Locks + Gap Locks</p>
<p>锁定一个范围包含记录本身（闭区间）</p>
</blockquote>
<h2 id="innodb中行级锁是怎么实现的" tabindex="-1"><a class="header-anchor" href="#innodb中行级锁是怎么实现的" aria-hidden="true">#</a> InnoDB中行级锁是怎么实现的</h2>
<p>InnoDB行级锁是通过给索引上的索引项加锁来实现的。</p>
<h2 id="数据库死锁问题以及解决办法" tabindex="-1"><a class="header-anchor" href="#数据库死锁问题以及解决办法" aria-hidden="true">#</a> 数据库死锁问题以及解决办法</h2>
<p>死锁是指两个或两个以上的事务在执行过程中，因争夺所资源而造成的一种相互等待的现象。若无外力作用，事务都无法推进下去。</p>
<p>解决死锁问题最简单的一种方法是超时，即当两个事务互相等待时，当一个等待时间超过设置的某一阈值时，其中一个事务进行回滚，另一个等待的事务就能继续运行。</p>
<p>除了超时机制，当前数据库还普遍采用<code v-pre>wait-for graph</code>（等待图）的方式来进行死锁检测。较之被动的超时方案，这时一种主动的死锁检测方法。InnoDB引擎也采用这种方法。<code v-pre>wait-for graph</code>要求数据库保存一下两种信息：</p>
<ul>
<li>锁的信息链表</li>
<li>事务等待链表</li>
</ul>
<p>通过上述链表可以构造出一张图，若这个途中存在回路，就代表存在死锁。</p>
</div></template>


