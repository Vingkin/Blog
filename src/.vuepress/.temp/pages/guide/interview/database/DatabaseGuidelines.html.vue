<template><div><blockquote>
<p>本文摘录自<a href="https://www.bookstack.cn/read/alibaba-java/MySQL%E6%95%B0%E6%8D%AE%E5%BA%93.md" target="_blank" rel="noopener noreferrer">阿里巴巴Java开发手册MySQL数据库篇<ExternalLinkIcon/></a>，目的是为了加强记忆方便查询</p>
</blockquote>
<h2 id="建表规约" tabindex="-1"><a class="header-anchor" href="#建表规约" aria-hidden="true">#</a> 建表规约</h2>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol>
<li>表达是否概念的字段，必须使用<code v-pre>is_xxx</code>的方式命名，数据类型是<code v-pre>unsigned tinyint</code>（1表示是，0表示否）。</li>
</ol>
<p><span style="color: orange">说明</span>：任何字段如果为非负数，必须是<code v-pre>unsigned</code>。</p>
<p><span style="color: green">正例</span>：表达逻辑删除的字段名<code v-pre>is_deleted</code>，1表示删除，0表示未删除。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="2">
<li>表名、字段名必须使用小写字母或数字，禁止出现数字开头，禁止两个下划线中间只出现数字。数据库字段名的修改代价很大，因为无法进行预发布，所以字段名称需要慎重考虑。</li>
</ol>
<p><span style="color: orange">说明</span>：MySQL在Windows下不区分大小写，但在Linux下默认是区分大小写。因此，数据库名、表名、字段名，都不允许出现任何大写字母，避免节外生枝。</p>
<p><span style="color: green">正例</span>：aliyun_admin, rdc_config, level3_name</p>
<p><span style="color: red">反例</span>：AliyunAdmin, rdcConfig, level_3_name</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="3">
<li>表名不使用复数名词。</li>
</ol>
<p><span style="color: orange">说明</span>：表名应该仅仅表示表里面的实体内容，不应该表示实体数量，对应于DO类名也是单数形式，符合表达习惯。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="4">
<li>禁用保留字，如<code v-pre>desc</code>、<code v-pre>range</code>、<code v-pre>match</code>、<code v-pre>delayed</code>等，请参考<a href="https://dev.mysql.com/doc/refman/5.7/en/keywords.html" target="_blank" rel="noopener noreferrer">MySQL官方保留字<ExternalLinkIcon/></a>。</li>
</ol>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="5">
<li>主键索引名为pk字段名；唯一索引名为uk字段名；普通索引名则为idx字段名。</li>
</ol>
<p><span style="color: orange">说明</span>：pk即primary key；uk即unique key；idx即index</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="6">
<li>小数类型为decimal，禁止使用float和double。</li>
</ol>
<p><span style="color: orange">说明</span>：float和double在存储的时候，存在精度损失问题，很可能在值比较时，得到不正确的结果。如果存储的数据范围查过decimal的范围，建议将数据拆成整数和小数分开存储。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="7">
<li>如果存储的字符串长度几乎相等，使用char定长字符串类型。</li>
</ol>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="8">
<li>varchar是可变长字符串，不预先分配存储空间，长度不要超过5000，如果存储长度大于此值，定义字段类型为text，独立出来一张表，用主键来对应，避免影响其它索引效率。</li>
</ol>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="9">
<li>表必备三字段：id, gmt_create, gmt_modified。</li>
</ol>
<p><span style="color: orange">说明</span>：其中id必为主键，类型为unsigned bigint、单表时自增、步长为1。（其实得根据主键类型进行动态判断）。gmt_create, gmt_modified的类型均为datetime类型，前者现在时表示主动创建，后者过去分词表示被动更新。</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="10">
<li>表的命名最好是加上“业务名称_表的作用&quot;。</li>
</ol>
<p><span style="color: green">正例</span>：alipay_task / force_project / trade_config</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="11">
<li>库名与应用名称尽量一致。</li>
</ol>
</div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="12">
<li>如果修改字段含义或对应字段表示的状态追加时，需要及时更新字段注释。</li>
</ol>
</div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="13">
<li>
<p>字段允许适当冗余，以提高查询性能，但必须考虑数据一致。冗余字段应遵循：</p>
<p>1）不是频繁修改的字段。</p>
<p>2） 不是varchar超长字段，更不能是text字段。</p>
</li>
</ol>
<p><span style="color: green">正例</span>：商品类目名称使用频率高，字段长度短，名称基本一成不变，可在相关联的表中冗余存储类目名称，避免关联查询。</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="14">
<li>单表行数超过500万行或者单表容量超过2GB，才推荐进行分库分表。</li>
</ol>
<p><span style="color: orange">说明</span>：如果预计三年后数据量根本达不到这个级别，请不要在创建表时就分库分表。</p>
</div>
<div class="hint-container tip">
<p class="hint-container-title">【参考】</p>
<ol start="15">
<li>合适的字符存储长度，不但节约数据库表空间、节约索引存储，更重要的是提升检索速度。</li>
</ol>
<p><span style="color: green">正例</span>：如下表，其中无符号值可以避免误存负数，且扩大了表示范围。</p>
<table>
<thead>
<tr>
<th>对象</th>
<th>年龄区间</th>
<th>类型</th>
<th>字节</th>
</tr>
</thead>
<tbody>
<tr>
<td>人</td>
<td>150岁之内</td>
<td>unsigned tinyint</td>
<td>1</td>
</tr>
<tr>
<td>龟</td>
<td>数百岁</td>
<td>unsigned smallint</td>
<td>2</td>
</tr>
<tr>
<td>恐龙化石</td>
<td>数千万岁</td>
<td>unsigned int</td>
<td>4</td>
</tr>
<tr>
<td>太阳</td>
<td>约50亿年</td>
<td>unsigned bigint</td>
<td>8</td>
</tr>
</tbody>
</table>
</div>
<h2 id="索引规约" tabindex="-1"><a class="header-anchor" href="#索引规约" aria-hidden="true">#</a> 索引规约</h2>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol>
<li>业务上具有唯一特性的字段，即使是多个字段的组合，也必须建成唯一索引。</li>
</ol>
<p><span style="color: orange">说明</span>：不要以为唯一索引影响了insert速度，这个速度损耗可以忽略，但提高查找速度是明显的；另外，即使在应用层做了非常完善的校验控制，只要没有唯一索引，根据墨菲定律，必然有脏数据产生。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="2">
<li>超过三个表禁止join。需要join的字段，数据类型必须绝对一致；多表关联查询时，保证被关联的字段需要有索引。</li>
</ol>
<p><span style="color: orange">说明</span>：即使双表join也要注意表索引、SQL性能。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="3">
<li>在varchar字段上建立索引时，必须指定索引长度，没必要对全字段建立索引，根据实际文本区分度决定索引长度即可。</li>
</ol>
<p><span style="color: orange">说明</span>：索引的长度与区分度是一对矛盾体，一般对字符串类型数据，长度为20的索引，区分度会高达90%以上，可以使用count(distinct left(列名, 索引长度))/count(*)的区分度来确定。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="4">
<li>页面搜索严禁左模糊或者全模糊，如果需要请走搜索引擎来解决。</li>
</ol>
<p><span style="color: orange">说明</span>：索引文件具有B-Tree的最左前缀匹配特性，如果左边的值未确定，那么无法使用此索引。</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="5">
<li>如果有order by的场景，请注意利用索引的有序性。order by 最后的字段是组合索引的一部分，并且放在索引组合顺序的最后，避免出现file_sort的情况，影响查询性能。</li>
</ol>
<p><span style="color: green">正例</span>：where a=? and b=? order by c; 索引：a_b_c</p>
<p><span style="color: red">反例</span>：索引中有范围查找，那么索引有序性无法利用，如：WHERE a&gt;10 ORDER BY b; 索引a_b无法排序。</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="6">
<li>利用覆盖索引来进行查询操作，避免回表。</li>
</ol>
<p><span style="color: orange">说明</span>：如果一本书需要知道第11章是什么标题，会翻开第11章对应的那一页吗？目录浏览一下就好，这个目录就是起到覆盖索引的作用。</p>
<p><span style="color: green">正例</span>：能够建立索引的种类分为主键索引、唯一索引、普通索引三种，而覆盖索引只是一种查询的一种效果，用explain的结果，extra列会出现：using index。</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="7">
<li>利用延迟关联或者子查询优化超多分页场景。</li>
</ol>
<p><span style="color: orange">说明</span>：MySQL并不是跳过offset行，而是取offset+N行，然后返回放弃前offset行，返回N行，那当offset特别大的时候，效率就非常的低下，要么控制返回的总页数，要么对超过特定阈值的页数进行SQL改写。</p>
<p><span style="color: green">正例</span>：先快速定位需要获取的id段，然后再关联：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> a<span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">FROM</span> 表<span class="token number">1</span> a<span class="token punctuation">,</span>
<span class="token punctuation">(</span><span class="token keyword">select</span> id <span class="token keyword">from</span> 表<span class="token number">1</span> <span class="token keyword">where</span> 条件 <span class="token keyword">LIMIT</span> <span class="token number">100000</span><span class="token punctuation">,</span><span class="token number">20</span> <span class="token punctuation">)</span> b 
<span class="token keyword">where</span> a<span class="token punctuation">.</span>id<span class="token operator">=</span>b<span class="token punctuation">.</span>id 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="8">
<li>SQL性能优化的目标：至少要达到 range 级别，要求是ref级别，如果可以是consts最好。</li>
</ol>
<p><span style="color: orange">说明</span>：</p>
<p>1）consts 单表中最多只有一个匹配行（主键或者唯一索引），在优化阶段即可读取到数据。<br>
2）ref 指的是使用普通的索引（normal index）。<br>
3）range 对索引进行范围检索。</p>
<p><span style="color: red">反例</span>：explain表的结果，type=index，索引物理文件全扫描，速度非常慢，这个index级别比较range还低，与全表扫描是小巫见大巫。</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="9">
<li>建组合索引的时候，区分度最高的在最左边。</li>
</ol>
<p><span style="color: green">正例</span>：如果where a=? and b=? ，a列的几乎接近于唯一值，那么只需要单建idx_a索引即可。</p>
<p><span style="color: orange">说明</span>：存在非等号和等号混合判断条件时，在建索引时，请把等号条件的列前置。如：where a&gt;? and b=? 那么即使a的区分度更高，也必须把b放在索引的最前列。</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="10">
<li>防止因字段类型不同造成的隐式转换，导致索引失效。</li>
</ol>
</div>
<div class="hint-container tip">
<p class="hint-container-title">【参考】</p>
<ol start="11">
<li>创建索引时避免有如下极端误解： 1）宁滥勿缺。认为一个查询就需要建一个索引。 2）宁缺勿滥。认为索引会消耗空间、严重拖慢更新和新增速度。 3）抵制惟一索引。认为业务的惟一性一律需要在应用层通过“先查后插”方式解决。</li>
</ol>
</div>
<h2 id="sql语句" tabindex="-1"><a class="header-anchor" href="#sql语句" aria-hidden="true">#</a> SQL语句</h2>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol>
<li>不要使用count(列名)或count(常量)来替代count(*)，count(*)是SQL92定义的标准统计行数的语法，跟数据库无关，跟NULL和非NULL无关。</li>
</ol>
<p><span style="color: orange">说明</span>：count(*)会统计值为NULL的行，而count(列名)不会统计此列为NULL值的行。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="2">
<li>count(distinct col) 计算该列除NULL之外的不重复行数，注意 count(distinct col1, col2) 如果其中一列全为NULL，那么即使另一列有不同的值，也返回为0。</li>
</ol>
<p><span style="color: orange">说明</span>：count(*)会统计值为NULL的行，而count(列名)不会统计此列为NULL值的行。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="3">
<li>当某一列的值全是NULL时，count(col)的返回结果为0，但sum(col)的返回结果为NULL，因此使用sum()时需注意<a href="https://www.cnblogs.com/jinyewuming/p/13177881.html" target="_blank" rel="noopener noreferrer">NPE问题<ExternalLinkIcon/></a>。</li>
</ol>
<p><span style="color: green">正例</span>：可以使用如下方式来避免sum的NPE问题：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token keyword">IF</span><span class="token punctuation">(</span>ISNULL<span class="token punctuation">(</span><span class="token function">SUM</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token function">SUM</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">FROM</span> <span class="token keyword">table</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="4">
<li>使用<code v-pre>ISNULL()</code>来判断是否为NULL值。 说明：NULL与任何值的直接比较都为NULL。</li>
</ol>
<p>1） <code v-pre>NULL&lt;&gt;NULL</code>的返回结果是NULL，而不是<code v-pre>false</code>。<br>
2） <code v-pre>NULL=NULL</code>的返回结果是NULL，而不是<code v-pre>true</code>。<br>
3） <code v-pre>NULL&lt;&gt;1</code>的返回结果是NULL，而不是<code v-pre>true</code>。</p>
<p><span style="color: green">正例</span>：可以使用如下方式来避免sum的NPE问题：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token keyword">IF</span><span class="token punctuation">(</span>ISNULL<span class="token punctuation">(</span><span class="token function">SUM</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token function">SUM</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">FROM</span> <span class="token keyword">table</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="5">
<li>在代码中写分页查询逻辑时，若count为0应直接返回，避免执行后面的分页语句。</li>
</ol>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="6">
<li>不得使用外键与级联，一切外键概念必须在应用层解决。</li>
</ol>
<p><span style="color: orange">说明</span>：以学生和成绩的关系为例，学生表中的student_id是主键，那么成绩表中的student_id则为外键。如果更新学生表中的student_id，同时触发成绩表中的student_id更新，即为级联更新。外键与级联更新适用于单机低并发，不适合分布式、高并发集群；级联更新是强阻塞，存在数据库更新风暴的风险；外键影响数据库的插入速度。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="7">
<li>禁止使用存储过程，存储过程难以调试和扩展，更没有移植性。</li>
</ol>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="8">
<li>数据订正（特别是删除、修改记录操作）时，要先select，避免出现误删除，确认无误才能执行更新语句。</li>
</ol>
</div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="9">
<li>in操作能避免则避免，若实在避免不了，需要仔细评估in后边的集合元素数量，控制在1000个之内。</li>
</ol>
</div>
<div class="hint-container tip">
<p class="hint-container-title">【参考】</p>
<ol start="10">
<li>如果有全球化需要，所有的字符存储与表示，均以utf-8编码，注意字符统计函数的区别。</li>
</ol>
<p><span style="color: orange">说明</span>：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> LENGTH<span class="token punctuation">(</span>“轻松工作”<span class="token punctuation">)</span>； 返回为<span class="token number">12</span>
<span class="token keyword">SELECT</span> CHARACTER_LENGTH<span class="token punctuation">(</span>“轻松工作”<span class="token punctuation">)</span>； 返回为<span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div>
<div class="hint-container tip">
<p class="hint-container-title">【参考】</p>
<ol start="11">
<li>TRUNCATE TABLE 比 DELETE 速度快，且使用的系统和事务日志资源少，但TRUNCATE无事务且不触发trigger，有可能造成事故，故不建议在开发代码中使用此语句。</li>
</ol>
<p><span style="color: orange">说明</span>：TRUNCATE TABLE 在功能上与不带 WHERE 子句的 DELETE 语句相同。</p>
</div>
<h2 id="orm映射" tabindex="-1"><a class="header-anchor" href="#orm映射" aria-hidden="true">#</a> ORM映射</h2>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol>
<li>在表查询中，一律不要使用 * 作为查询的字段列表，需要哪些字段必须明确写明。</li>
</ol>
<p><span style="color: orange">说明</span>：1）增加查询分析器解析成本。2）增减字段容易与resultMap配置不一致。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="2">
<li>POJO类的布尔属性不能加is，而数据库字段必须加is_，要求在resultMap中进行字段与属性之间的映射。</li>
</ol>
<p><span style="color: orange">说明</span>：参见<a href="https://www.bookstack.cn/read/alibaba-java/%E7%BC%96%E7%A8%8B%E8%A7%84%E7%BA%A6-%E5%91%BD%E5%90%8D%E9%A3%8E%E6%A0%BC.md" target="_blank" rel="noopener noreferrer">定义POJO类以及数据库字段定义规定第8条<ExternalLinkIcon/></a>，在POJO类中增加映射，是必须的。在MyBatis Generator生成的代码中，需要进行对应的修改。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="3">
<li>不要用resultClass当返回参数，即使所有类属性名与数据库字段一一对应，也需要定义；反过来，每一个表也必然有一个与之对应。</li>
</ol>
<p><span style="color: orange">说明</span>：配置映射关系，使字段与DO类解耦，方便维护。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="4">
<li>sql.xml配置参数使用：#{}，#param# 不要使用${} 此种方式容易出现SQL注入。</li>
</ol>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="5">
<li>iBATIS自带的queryForList(String statementName,int start,int size)不推荐使用。</li>
</ol>
<p><span style="color: orange">说明</span>：其实现方式是在数据库取到statementName对应的SQL语句的所有记录，再通过subList取start,size的子集合。</p>
<p><span style="color: green">正例</span>：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
 map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"start"</span><span class="token punctuation">,</span> start<span class="token punctuation">)</span><span class="token punctuation">;</span>    
 map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"size"</span><span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="6">
<li>不允许直接拿HashMap与Hashtable作为查询结果集的输出。</li>
</ol>
<p><span style="color: orange">说明</span>：resultClass=”Hashtable”，会置入字段名和属性值，但是值的类型不可控。</p>
</div>
<div class="hint-container danger">
<p class="hint-container-title">【强制】</p>
<ol start="7">
<li>更新数据表记录时，必须同时更新记录对应的gmt_modified字段值为当前时间。</li>
</ol>
<p><span style="color: orange">说明</span>：resultClass=”Hashtable”，会置入字段名和属性值，但是值的类型不可控。</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">【推荐】</p>
<ol start="8">
<li>不要写一个大而全的数据更新接口。传入为POJO类，不管是不是自己的目标更新字段，都进行update table set c1=value1,c2=value2,c3=value3; 这是不对的。执行SQL时，不要更新无改动的字段，一是易出错；二是效率低；三是增加binlog存储。</li>
</ol>
<p><span style="color: orange">说明</span>：resultClass=”Hashtable”，会置入字段名和属性值，但是值的类型不可控。</p>
</div>
<div class="hint-container tip">
<p class="hint-container-title">【参考】</p>
<ol start="9">
<li><code v-pre>@Transactional</code>事务不要滥用。事务会影响数据库的QPS，另外使用事务的地方需要考虑各方面的回滚方案，包括缓存回滚、搜索引擎回滚、消息补偿、统计修正等。</li>
</ol>
</div>
<div class="hint-container tip">
<p class="hint-container-title">【参考】</p>
<ol start="10">
<li><code v-pre>&lt;isEqual&gt;</code>中的compareValue是与属性值对比的常量，一般是数字，表示相等时带上此条件；<code v-pre>&lt;isNotEmpty&gt;</code>表示不为空且不为null时执行；<code v-pre>&lt;isNotNull&gt;</code>表示不为null值时执行。</li>
</ol>
</div>
</div></template>


