<template><div><div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>Redis系列整理学习自<a href="https://www.bilibili.com/video/BV1cr4y1671t" target="_blank" rel="noopener noreferrer">黑马程序员Redis相关课程<ExternalLinkIcon/></a></p>
<BiliBili bvid="BV1cr4y1671t" /></div>
<p><strong>目录</strong></p>
<nav class="table-of-contents"><ul><li><router-link to="#_1、redis简单介绍">1、Redis简单介绍</router-link></li><li><router-link to="#_2、初始redis">2、初始Redis</router-link><ul><li><router-link to="#_2-1、认识nosql">2.1、认识NoSQL</router-link></li><li><router-link to="#_2-2、认识redis">2.2、认识Redis</router-link></li><li><router-link to="#_2-3、安装redis">2.3、安装Redis</router-link></li><li><router-link to="#_2-4、redis桌面客户端">2.4、Redis桌面客户端</router-link></li></ul></li><li><router-link to="#_3、redis常见命令">3、Redis常见命令</router-link><ul><li><router-link to="#_3-1、redis数据结构介绍">3.1、Redis数据结构介绍</router-link></li><li><router-link to="#_3-2、redis-通用命令">3.2、Redis 通用命令</router-link></li><li><router-link to="#_3-3、redis命令-string命令">3.3、Redis命令-String命令</router-link></li><li><router-link to="#_3-4、redis命令-key的层级结构">3.4、Redis命令-Key的层级结构</router-link></li><li><router-link to="#_3-5、redis命令-hash命令">3.5、Redis命令-Hash命令</router-link></li><li><router-link to="#_3-6、redis命令-list命令">3.6、Redis命令-List命令</router-link></li><li><router-link to="#_3-7、redis命令-set命令">3.7、Redis命令-Set命令</router-link></li><li><router-link to="#_3-8、redis命令-sortedset类型">3.8、Redis命令-SortedSet类型</router-link></li></ul></li><li><router-link to="#_4、redis的java客户端-jedis">4、Redis的Java客户端-Jedis</router-link><ul><li><router-link to="#_4-1、jedis快速入门">4.1、Jedis快速入门</router-link></li><li><router-link to="#_4-2、jedis连接池">4.2、Jedis连接池</router-link></li></ul></li><li><router-link to="#_5、redis的java客户端-springdataredis">5、Redis的Java客户端-SpringDataRedis</router-link><ul><li><router-link to="#_5-1、快速入门">5.1、快速入门</router-link></li><li><router-link to="#_5-2、数据序列化器">5.2、数据序列化器</router-link></li><li><router-link to="#_5-3、stringredistemplate">5.3、StringRedisTemplate</router-link></li><li><router-link to="#_5-4、hash结构操作">5.4、Hash结构操作</router-link></li></ul></li></ul></nav>
<!--more-->
<h2 id="_1、redis简单介绍" tabindex="-1"><a class="header-anchor" href="#_1、redis简单介绍" aria-hidden="true">#</a> 1、Redis简单介绍</h2>
<p>Redis是一种键值型的NoSql数据库，这里有两个关键字：</p>
<ul>
<li>键值型</li>
<li>NoSql</li>
</ul>
<p>其中<strong>键值型</strong>，是指Redis中存储的数据都是以key.value对的形式存储，而value的形式多种多样，可以是字符串.数值.甚至json：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1652882668159.png" alt="1652882668159" tabindex="0" loading="lazy"><figcaption>1652882668159</figcaption></figure>
<p>而NoSql则是相对于传统关系型数据库而言，有很大差异的一种数据库。</p>
<p>对于存储的数据，没有类似Mysql那么严格的约束，比如唯一性，是否可以为null等等，所以我们把这种松散结构的数据库，称之为NoSQL数据库。</p>
<h2 id="_2、初始redis" tabindex="-1"><a class="header-anchor" href="#_2、初始redis" aria-hidden="true">#</a> 2、初始Redis</h2>
<h3 id="_2-1、认识nosql" tabindex="-1"><a class="header-anchor" href="#_2-1、认识nosql" aria-hidden="true">#</a> 2.1、认识NoSQL</h3>
<p><strong>NoSql</strong>可以翻译做Not Only Sql（不仅仅是SQL），或者是No Sql（非Sql的）数据库。是相对于传统关系型数据库而言，有很大差异的一种特殊的数据库，因此也称之为<strong>非关系型数据库</strong>。</p>
<h4 id="_2-1-1、结构化与非结构化" tabindex="-1"><a class="header-anchor" href="#_2-1-1、结构化与非结构化" aria-hidden="true">#</a> 2.1.1、结构化与非结构化</h4>
<p>传统关系型数据库是结构化数据，每一张表都有严格的约束信息：字段名.字段数据类型.字段约束等等信息，插入的数据必须遵守这些约束：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/4tUgFo6.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>而NoSql则对数据库格式没有严格约束，往往形式松散，自由。</p>
<p>可以是键值型：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/GdqOSsj.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>也可以是文档型：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/zBBQfcc.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>甚至可以是图格式：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/zBnKxWf.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_2-1-2、关联和非关联" tabindex="-1"><a class="header-anchor" href="#_2-1-2、关联和非关联" aria-hidden="true">#</a> 2.1.2、关联和非关联</h4>
<p>传统数据库的表与表之间往往存在关联，例如外键：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/tXYSl5x.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>而非关系型数据库不存在关联关系，要维护关系要么靠代码中的业务逻辑，要么靠数据之间的耦合：</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"张三"</span><span class="token punctuation">,</span>
  <span class="token property">"orders"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
       <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
       <span class="token property">"item"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
	 <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token property">"title"</span><span class="token operator">:</span> <span class="token string">"荣耀6"</span><span class="token punctuation">,</span> <span class="token property">"price"</span><span class="token operator">:</span> <span class="token number">4999</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
       <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
       <span class="token property">"item"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
	 <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token property">"title"</span><span class="token operator">:</span> <span class="token string">"小米11"</span><span class="token punctuation">,</span> <span class="token property">"price"</span><span class="token operator">:</span> <span class="token number">3999</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此处要维护“张三”的订单与商品“荣耀”和“小米11”的关系，不得不冗余的将这两个商品保存在张三的订单文档中，不够优雅。还是建议用业务来维护关联关系。</p>
<h4 id="_2-1-3、查询方式" tabindex="-1"><a class="header-anchor" href="#_2-1-3、查询方式" aria-hidden="true">#</a> 2.1.3、查询方式</h4>
<p>传统关系型数据库会基于Sql语句做查询，语法有统一标准；</p>
<p>而不同的非关系数据库查询语法差异极大，五花八门各种各样。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/AzaHOTF.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_2-1-4、事务" tabindex="-1"><a class="header-anchor" href="#_2-1-4、事务" aria-hidden="true">#</a> 2.1.4、事务</h4>
<p>传统关系型数据库能满足事务ACID的原则。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/J1MqOJM.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>而非关系型数据库往往不支持事务，或者不能严格保证ACID的特性，只能实现基本的一致性。</p>
<h4 id="_2-1-5、总结" tabindex="-1"><a class="header-anchor" href="#_2-1-5、总结" aria-hidden="true">#</a> 2.1.5、总结</h4>
<p>除了上述四点以外，在存储方式.扩展性.查询性能上关系型与非关系型也都有着显著差异，总结如下：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/kZP40dQ.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>存储方式
<ul>
<li>关系型数据库基于磁盘进行存储，会有大量的磁盘IO，对性能有一定影响</li>
<li>非关系型数据库，他们的操作更多的是依赖于内存来操作，内存的读写速度会非常快，性能自然会好一些</li>
</ul>
</li>
</ul>
<ul>
<li>扩展性
<ul>
<li>关系型数据库集群模式一般是主从，主从数据一致，起到数据备份的作用，称为垂直扩展。</li>
<li>非关系型数据库可以将数据拆分，存储在不同机器上，可以保存海量数据，解决内存大小有限的问题。称为水平扩展。</li>
<li>关系型数据库因为表之间存在关联关系，如果做水平扩展会给数据查询带来很多麻烦</li>
</ul>
</li>
</ul>
<h3 id="_2-2、认识redis" tabindex="-1"><a class="header-anchor" href="#_2-2、认识redis" aria-hidden="true">#</a> 2.2、认识Redis</h3>
<p>Redis诞生于2009年全称是<strong>Re</strong>mote  <strong>D</strong>ictionary <strong>S</strong>erver 远程词典服务器，是一个基于内存的键值型NoSQL数据库。</p>
<p><strong>特征</strong>：</p>
<ul>
<li>键值（key-value）型，value支持多种不同数据结构，功能丰富</li>
<li>单线程，每个命令具备原子性</li>
<li>低延迟，速度快（基于内存.IO多路复用.良好的编码）。</li>
<li>支持数据持久化</li>
<li>支持主从集群.分片集群</li>
<li>支持多语言客户端</li>
</ul>
<p><strong>作者</strong>：Antirez</p>
<p>Redis的官方网站地址：<a href="https://redis.io/" target="_blank" rel="noopener noreferrer">https://redis.io/<ExternalLinkIcon/></a></p>
<h3 id="_2-3、安装redis" tabindex="-1"><a class="header-anchor" href="#_2-3、安装redis" aria-hidden="true">#</a> 2.3、安装Redis</h3>
<p>大多数企业都是基于Linux服务器来部署项目，而且Redis官方也没有提供Windows版本的安装包。因此课程中我们会基于Linux系统来安装Redis.</p>
<p>此处选择的Linux版本为CentOS 7.</p>
<h4 id="_2-3-1、依赖库" tabindex="-1"><a class="header-anchor" href="#_2-3-1、依赖库" aria-hidden="true">#</a> 2.3.1、依赖库</h4>
<p>Redis是基于C语言编写的，因此首先需要安装Redis所需要的gcc依赖：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> gcc tcl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-3-2、上传安装包并解压" tabindex="-1"><a class="header-anchor" href="#_2-3-2、上传安装包并解压" aria-hidden="true">#</a> 2.3.2、上传安装包并解压</h4>
<p>然后将课前资料提供的Redis安装包上传到虚拟机的任意目录：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/SyjanS5.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>例如，我放到了/usr/local/src 目录：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/01DTNCf.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>解压缩：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-xzf</span> redis-6.2.6.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解压后：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/8V6zvCD.png" alt="image-20211211080339076" tabindex="0" loading="lazy"><figcaption>image-20211211080339076</figcaption></figure>
<p>进入redis目录：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> redis-6.2.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行编译命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">make</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果没有出错，应该就安装成功了。</p>
<p>默认的安装路径是在 <code v-pre>/usr/local/bin</code>目录下：</p>
<p>该目录已经默认配置到环境变量，因此可以在任意目录下运行这些命令。其中：</p>
<ul>
<li>redis-cli：是redis提供的命令行客户端</li>
<li>redis-server：是redis的服务端启动脚本</li>
<li>redis-sentinel：是redis的哨兵启动脚本</li>
</ul>
<h4 id="_2-3-3、启动" tabindex="-1"><a class="header-anchor" href="#_2-3-3、启动" aria-hidden="true">#</a> 2.3.3、启动</h4>
<p>redis的启动方式有很多种，例如：</p>
<ul>
<li>默认启动</li>
<li>指定配置启动</li>
<li>开机自启</li>
</ul>
<h4 id="_2-3-4、默认启动" tabindex="-1"><a class="header-anchor" href="#_2-3-4、默认启动" aria-hidden="true">#</a> 2.3.4、默认启动</h4>
<p>安装完成后，在任意目录输入redis-server命令即可启动Redis：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>redis-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如图：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/v7xWsqC.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>这种启动属于<code v-pre>前台启动</code>，会阻塞整个会话窗口，窗口关闭或者按下<code v-pre>CTRL + C</code>则Redis停止。不推荐使用。</p>
<h4 id="_2-3-5、指定配置启动" tabindex="-1"><a class="header-anchor" href="#_2-3-5、指定配置启动" aria-hidden="true">#</a> 2.3.5、指定配置启动</h4>
<p>如果要让Redis以<code v-pre>后台</code>方式启动，则必须修改Redis配置文件，就在我们之前解压的redis安装包下（<code v-pre>/usr/local/src/redis-6.2.6</code>），名字叫redis.conf：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/image-20211211082225509.png" alt="image-20211211082225509" tabindex="0" loading="lazy"><figcaption>image-20211211082225509</figcaption></figure>
<p>我们先将这个配置文件备份一份：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>cp redis.conf redis.conf.bck
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后修改redis.conf文件中的一些配置：</p>
<div class="language-properties line-numbers-mode" data-ext="properties"><pre v-pre class="language-properties"><code><span class="token comment"># 允许访问的地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问，生产环境不要设置为0.0.0.0</span>
<span class="token key attr-name">bind</span> <span class="token value attr-value">0.0.0.0</span>
<span class="token comment"># 守护进程，修改为yes后即可后台运行</span>
<span class="token key attr-name">daemonize</span> <span class="token value attr-value">yes </span>
<span class="token comment"># 密码，设置后访问Redis必须输入密码</span>
<span class="token key attr-name">requirepass</span> <span class="token value attr-value">123321</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Redis的其它常见配置：</p>
<div class="language-properties line-numbers-mode" data-ext="properties"><pre v-pre class="language-properties"><code><span class="token comment"># 监听的端口</span>
<span class="token key attr-name">port</span> <span class="token value attr-value">6379</span>
<span class="token comment"># 工作目录，默认是当前目录，也就是运行redis-server时的命令，日志.持久化等文件会保存在这个目录</span>
<span class="token key attr-name">dir</span> <span class="token value attr-value">.</span>
<span class="token comment"># 数据库数量，设置为1，代表只使用1个库，默认有16个库，编号0~15</span>
<span class="token key attr-name">databases</span> <span class="token value attr-value">1</span>
<span class="token comment"># 设置redis能够使用的最大内存</span>
<span class="token key attr-name">maxmemory</span> <span class="token value attr-value">512mb</span>
<span class="token comment"># 日志文件，默认为空，不记录日志，可以指定日志文件名</span>
<span class="token key attr-name">logfile</span> <span class="token value attr-value">"redis.log"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动Redis：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 进入redis安装目录 </span>
<span class="token builtin class-name">cd</span> /usr/local/src/redis-6.2.6
<span class="token comment"># 启动</span>
redis-server redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>停止服务：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 利用redis-cli来执行 shutdown 命令，即可停止 Redis 服务，</span>
<span class="token comment"># 因为之前配置了密码，因此需要通过 -u 来指定密码</span>
redis-cli <span class="token parameter variable">-u</span> <span class="token number">123321</span> <span class="token function">shutdown</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-3-6、开机自启" tabindex="-1"><a class="header-anchor" href="#_2-3-6、开机自启" aria-hidden="true">#</a> 2.3.6、开机自启</h4>
<p>我们也可以通过配置来实现开机自启。</p>
<p>首先，新建一个系统服务文件：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vi</span> /etc/systemd/system/redis.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>内容如下：</p>
<div class="language-conf line-numbers-mode" data-ext="conf"><pre v-pre class="language-conf"><code>[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/redis-server /usr/local/src/redis-6.2.6/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后重载系统服务：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl daemon-reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，我们可以用下面这组命令来操作redis了：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 启动</span>
systemctl start redis
<span class="token comment"># 停止</span>
systemctl stop redis
<span class="token comment"># 重启</span>
systemctl restart redis
<span class="token comment"># 查看状态</span>
systemctl status redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行下面的命令，可以让redis开机自启：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_2-4、redis桌面客户端" tabindex="-1"><a class="header-anchor" href="#_2-4、redis桌面客户端" aria-hidden="true">#</a> 2.4、Redis桌面客户端</h3>
<p>安装完成Redis，我们就可以操作Redis，实现数据的CRUD了。这需要用到Redis客户端，包括：</p>
<ul>
<li>命令行客户端</li>
<li>图形化桌面客户端</li>
<li>编程客户端</li>
</ul>
<h4 id="_2-4-1、redis命令行客户端" tabindex="-1"><a class="header-anchor" href="#_2-4-1、redis命令行客户端" aria-hidden="true">#</a> 2.4.1、Redis命令行客户端</h4>
<p>Redis安装完成后就自带了命令行客户端：redis-cli，使用方式如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>redis-cli <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>commonds<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中常见的options有：</p>
<ul>
<li><code v-pre>-h 127.0.0.1</code>：指定要连接的redis节点的IP地址，默认是127.0.0.1</li>
<li><code v-pre>-p 6379</code>：指定要连接的redis节点的端口，默认是6379</li>
<li><code v-pre>-a 123321</code>：指定redis的访问密码</li>
</ul>
<p>其中的commonds就是Redis的操作命令，例如：</p>
<ul>
<li><code v-pre>ping</code>：与redis服务端做心跳测试，服务端正常会返回<code v-pre>pong</code></li>
</ul>
<p>不指定commond时，会进入<code v-pre>redis-cli</code>的交互控制台：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/OYYWPNo.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_2-4-2、图形化桌面客户端" tabindex="-1"><a class="header-anchor" href="#_2-4-2、图形化桌面客户端" aria-hidden="true">#</a> 2.4.2、图形化桌面客户端</h4>
<p>GitHub上的大神编写了Redis的图形化桌面客户端，地址：<a href="https://github.com/uglide/RedisDesktopManager" target="_blank" rel="noopener noreferrer">https://github.com/uglide/RedisDesktopManager<ExternalLinkIcon/></a></p>
<p>不过该仓库提供的是RedisDesktopManager的源码，并未提供windows安装包。</p>
<p>在下面这个仓库可以找到安装包：<a href="https://github.com/lework/RedisDesktopManager-Windows/releases" target="_blank" rel="noopener noreferrer">https://github.com/lework/RedisDesktopManager-Windows/releases<ExternalLinkIcon/></a></p>
<h4 id="_2-4-3、安装" tabindex="-1"><a class="header-anchor" href="#_2-4-3、安装" aria-hidden="true">#</a> 2.4.3、安装</h4>
<p>在课前资料中可以找到Redis的图形化桌面客户端：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/BZ4Agbi.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>解压缩后，运行安装程序即可安装：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/hguGHbX.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>安装完成后，在安装目录下找到rdm.exe文件：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/hwK5LQ8.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>双击即可运行：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/6hUqslY.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_2-4-4、建立连接" tabindex="-1"><a class="header-anchor" href="#_2-4-4、建立连接" aria-hidden="true">#</a> 2.4.4、建立连接</h4>
<p>点击左上角的<code v-pre>连接到Redis服务器</code>按钮：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/9qTGyoN.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>在弹出的窗口中填写Redis服务信息：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/DshNnKC.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>点击确定后，在左侧菜单会出现这个链接：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/A2cOm7Q.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>点击即可建立连接了。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/ja8Fd9s.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Redis默认有16个仓库，编号从0至15.  通过配置文件可以设置仓库数量，但是不超过16，并且不能自定义仓库名称。</p>
<p>如果是基于redis-cli连接Redis服务，可以通过select命令来选择数据库：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 选择 0号库</span>
<span class="token keyword">select</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、redis常见命令" tabindex="-1"><a class="header-anchor" href="#_3、redis常见命令" aria-hidden="true">#</a> 3、Redis常见命令</h2>
<h3 id="_3-1、redis数据结构介绍" tabindex="-1"><a class="header-anchor" href="#_3-1、redis数据结构介绍" aria-hidden="true">#</a> 3.1、Redis数据结构介绍</h3>
<p>Redis是一个key-value的数据库，key一般是String类型，不过value的类型多种多样：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1652887393157.png" alt="1652887393157" tabindex="0" loading="lazy"><figcaption>1652887393157</figcaption></figure>
<p><strong>贴心小建议：命令不要死记，学会查询就好啦</strong></p>
<p>Redis为了方便我们学习，将操作不同数据类型的命令也做了分组，在官网（ <a href="https://redis.io/commands" target="_blank" rel="noopener noreferrer">https://redis.io/commands<ExternalLinkIcon/></a> ）可以查看到不同的命令：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1652887648826.png" alt="1652887648826" tabindex="0" loading="lazy"><figcaption>1652887648826</figcaption></figure>
<p>当然我们也可以通过Help命令来帮助我们去查看命令</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1652887748279.png" alt="1652887748279" tabindex="0" loading="lazy"><figcaption>1652887748279</figcaption></figure>
<h3 id="_3-2、redis-通用命令" tabindex="-1"><a class="header-anchor" href="#_3-2、redis-通用命令" aria-hidden="true">#</a> 3.2、Redis 通用命令</h3>
<p>通用指令是部分数据类型的，都可以使用的指令，常见的有：</p>
<ul>
<li>KEYS：查看符合模板的所有key</li>
<li>DEL：删除一个指定的key</li>
<li>EXISTS：判断key是否存在</li>
<li>EXPIRE：给一个key设置有效期，有效期到期时该key会被自动删除</li>
<li>TTL：查看一个KEY的剩余有效期</li>
</ul>
<p>通过help [command] 可以查看一个命令的具体用法，例如：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1652887865189.png" alt="1652887865189" tabindex="0" loading="lazy"><figcaption>1652887865189</figcaption></figure>
<p>课堂代码如下</p>
<ul>
<li>KEYS</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys *
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"name"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"age"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span>

<span class="token comment"># 查询以a开头的key</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys a*
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"age"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>贴心小提示：在生产环境下，不推荐使用keys 命令，因为这个命令在key过多的情况下，效率不高</strong></p>
<ul>
<li>DEL</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">help</span> del

  DEL key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
  summary: Delete a key
  since: <span class="token number">1.0</span>.0
  group: generic

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> del name <span class="token comment">#删除单个</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>  <span class="token comment">#成功删除1个</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys *
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"age"</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> MSET k1 v1 k2 v2 k3 v3 <span class="token comment">#批量添加数据</span>
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys *
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"k3"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"k2"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"k1"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"age"</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> del k1 k2 k3 k4
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>   <span class="token comment">#此处返回的是成功删除的key，由于redis中只有k1,k2,k3 所以只成功删除3个，最终返回</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys * <span class="token comment">#再查询全部的key</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"age"</span>	<span class="token comment">#只剩下一个了</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>贴心小提示：同学们在拷贝代码的时候，只需要拷贝对应的命令哦~</strong></p>
<ul>
<li>EXISTS</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">help</span> EXISTS

  EXISTS key <span class="token punctuation">[</span>key <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
  summary: Determine <span class="token keyword">if</span> a key exists
  since: <span class="token number">1.0</span>.0
  group: generic

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> exists age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> exists name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>EXPIRE</li>
</ul>
<p><strong>贴心小提示</strong>：内存非常宝贵，对于一些数据，我们应当给他一些过期时间，当过期时间到了之后，他就会自动被删除~</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> expire age <span class="token number">10</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">8</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">6</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token parameter variable">-2</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token parameter variable">-2</span>  <span class="token comment">#当这个key过期了，那么此时查询出来就是-2 </span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys *
<span class="token punctuation">(</span>empty list or <span class="token builtin class-name">set</span><span class="token punctuation">)</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> age <span class="token number">10</span> <span class="token comment">#如果没有设置过期时间</span>
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl age
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token parameter variable">-1</span>  <span class="token comment"># ttl的返回值就是-1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3、redis命令-string命令" tabindex="-1"><a class="header-anchor" href="#_3-3、redis命令-string命令" aria-hidden="true">#</a> 3.3、Redis命令-String命令</h3>
<p>String类型，也就是字符串类型，是Redis中最简单的存储类型。</p>
<p>其value是字符串，不过根据字符串的格式不同，又可以分为3类：</p>
<ul>
<li>string：普通字符串</li>
<li>int：整数类型，可以做自增.自减操作</li>
<li>float：浮点类型，可以做自增.自减操作</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1652890121291.png" alt="1652890121291" tabindex="0" loading="lazy"><figcaption>1652890121291</figcaption></figure>
<p>String的常见命令有：</p>
<ul>
<li>SET：添加或者修改已经存在的一个String类型的键值对</li>
<li>GET：根据key获取String类型的value</li>
<li>MSET：批量添加多个String类型的键值对</li>
<li>MGET：根据多个key获取多个String类型的value</li>
<li>INCR：让一个整型的key自增1</li>
<li>INCRBY:让一个整型的key自增并指定步长，例如：incrby num 2 让num值自增2</li>
<li>INCRBYFLOAT：让一个浮点类型的数字自增并指定步长</li>
<li>SETNX：添加一个String类型的键值对，前提是这个key不存在，否则不执行</li>
<li>SETEX：添加一个String类型的键值对，并且指定有效期</li>
</ul>
<p><strong>贴心小提示</strong>：以上命令除了INCRBYFLOAT 都是常用命令</p>
<ul>
<li>SET 和GET: 如果key不存在则是新增，如果存在则是修改</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> set name <span class="token class-name">Rose</span>  <span class="token comment">//原来不存在</span>
<span class="token constant">OK</span>

<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> get name 
<span class="token string">"Rose"</span>

<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> set name <span class="token class-name">Jack</span> <span class="token comment">//原来存在，就是修改</span>
<span class="token constant">OK</span>

<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> get name
<span class="token string">"Jack"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>MSET和MGET</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">MSET</span> k1 v1 k2 v2 k3 v3
<span class="token constant">OK</span>

<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">MGET</span> name age k1 k2 k3
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"Jack"</span> <span class="token comment">//之前存在的name</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"10"</span>   <span class="token comment">//之前存在的age</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"v1"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"v2"</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">"v3"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>INCR和INCRBY和DECY</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> get age 
<span class="token string">"10"</span>

<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> incr age <span class="token comment">//增加1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">11</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> get age <span class="token comment">//获得age</span>
<span class="token string">"11"</span>

<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> incrby age <span class="token number">2</span> <span class="token comment">//一次增加2</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">13</span> <span class="token comment">//返回目前的age的值</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> incrby age <span class="token number">2</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">15</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> incrby age <span class="token operator">-</span><span class="token number">1</span> <span class="token comment">//也可以增加负数，相当于减</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">14</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> incrby age <span class="token operator">-</span><span class="token number">2</span> <span class="token comment">//一次减少2个</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">12</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">DECR</span> age <span class="token comment">//相当于 incr 负数，减少正常用法</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">11</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> get age 
<span class="token string">"11"</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>SETNX</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> help setnx

  <span class="token constant">SETNX</span> key value
  summary<span class="token operator">:</span> <span class="token class-name">Set</span> the value of a key<span class="token punctuation">,</span> only <span class="token keyword">if</span> the key does not exist
  since<span class="token operator">:</span> <span class="token number">1.0</span><span class="token number">.0</span>
  group<span class="token operator">:</span> string

<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> set name <span class="token class-name">Jack</span>  <span class="token comment">//设置名称</span>
<span class="token constant">OK</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> setnx name lisi <span class="token comment">//如果key不存在，则添加成功</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> get name <span class="token comment">//由于name已经存在，所以lisi的操作失败</span>
<span class="token string">"Jack"</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> setnx name2 lisi <span class="token comment">//name2 不存在，所以操作成功</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> get name2 
<span class="token string">"lisi"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>SETEX</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setex name <span class="token number">10</span> jack
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">8</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">7</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4、redis命令-key的层级结构" tabindex="-1"><a class="header-anchor" href="#_3-4、redis命令-key的层级结构" aria-hidden="true">#</a> 3.4、Redis命令-Key的层级结构</h3>
<p>Redis没有类似MySQL中的Table的概念，我们该如何区分不同类型的key呢？</p>
<p>例如，需要存储用户.商品信息到redis，有一个用户id是1，有一个商品id恰好也是1，此时如果使用id作为key，那就会冲突了，该怎么办？</p>
<p>我们可以通过给key添加前缀加以区分，不过这个前缀不是随便加的，有一定的规范：</p>
<p>Redis的key允许有多个单词形成层级结构，多个单词之间用':'隔开，格式如下：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1652941631682.png" alt="1652941631682" tabindex="0" loading="lazy"><figcaption>1652941631682</figcaption></figure>
<p>这个格式并非固定，也可以根据自己的需求来删除或添加词条。</p>
<p>例如我们的项目名称叫 heima，有user和product两种不同类型的数据，我们可以这样定义key：</p>
<ul>
<li>
<p>user相关的key：<strong>heima:user:1</strong></p>
</li>
<li>
<p>product相关的key：<strong>heima:product:1</strong></p>
</li>
</ul>
<p>如果Value是一个Java对象，例如一个User对象，则可以将对象序列化为JSON字符串后存储：</p>
<table>
    <tr>
        <th>KEY</th>
        <th>VALUE</th>
    </tr>
    <tr>
        <td>heima:user:1</td>
        <td>{"id":1, "name": "Jack", "age": 21}</td>
    </tr>
    <tr>
        <td>heima:product:1</td>
        <td>{"id":1, "name": "小米11", "price": 4999}</td>
    </tr>
</table>
<p>一旦我们向redis采用这样的方式存储，那么在可视化界面中，redis会以层级结构来进行存储，形成类似于这样的结构，更加方便Redis获取数据</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1652941883537.png" alt="1652941883537" tabindex="0" loading="lazy"><figcaption>1652941883537</figcaption></figure>
<h3 id="_3-5、redis命令-hash命令" tabindex="-1"><a class="header-anchor" href="#_3-5、redis命令-hash命令" aria-hidden="true">#</a> 3.5、Redis命令-Hash命令</h3>
<p>Hash类型，也叫散列，其value是一个无序字典，类似于Java中的HashMap结构。</p>
<p>String结构是将对象序列化为JSON字符串后存储，当需要修改对象某个字段时很不方便：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1652941995945.png" alt="1652941995945" tabindex="0" loading="lazy"><figcaption>1652941995945</figcaption></figure>
<p>Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1652942027719.png" alt="1652942027719" tabindex="0" loading="lazy"><figcaption>1652942027719</figcaption></figure>
<p><strong>Hash类型的常见命令</strong></p>
<ul>
<li>
<p>HSET key field value：添加或者修改hash类型key的field的值</p>
</li>
<li>
<p>HGET key field：获取一个hash类型key的field的值</p>
</li>
<li>
<p>HMSET：批量添加多个hash类型key的field的值</p>
</li>
<li>
<p>HMGET：批量获取多个hash类型key的field的值</p>
</li>
<li>
<p>HGETALL：获取一个hash类型的key中的所有的field和value</p>
</li>
<li>
<p>HKEYS：获取一个hash类型的key中的所有的field</p>
</li>
<li>
<p>HINCRBY:让一个hash类型key的字段值自增并指定步长</p>
</li>
<li>
<p>HSETNX：添加一个hash类型的key的field值，前提是这个field不存在，否则不执行</p>
</li>
</ul>
<p><strong>贴心小提示</strong>：哈希结构也是我们以后实际开发中常用的命令哟</p>
<ul>
<li>HSET和HGET</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HSET</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">3</span> name <span class="token class-name">Lucy</span><span class="token comment">//大key是 heima:user:3 小key是name，小value是Lucy</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HSET</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">3</span> age <span class="token number">21</span><span class="token comment">// 如果操作不存在的数据，则是新增</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HSET</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">3</span> age <span class="token number">17</span> <span class="token comment">//如果操作存在的数据，则是修改</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HGET</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">3</span> name 
<span class="token string">"Lucy"</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HGET</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">3</span> age
<span class="token string">"17"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>HMSET和HMGET</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HMSET</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">4</span> name <span class="token class-name">HanMeiMei</span>
<span class="token constant">OK</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HMSET</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">4</span> name <span class="token class-name">LiLei</span> age <span class="token number">20</span> sex man
<span class="token constant">OK</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HMGET</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">4</span> name age sex
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"LiLei"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"20"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"man"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>HGETALL</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HGETALL</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">4</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"name"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"LiLei"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"age"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"20"</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">"sex"</span>
<span class="token number">6</span><span class="token punctuation">)</span> <span class="token string">"man"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>HKEYS和HVALS</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HKEYS</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">4</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"name"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"age"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"sex"</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HVALS</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">4</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"LiLei"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"20"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"man"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>HINCRBY</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HINCRBY</span>  heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">4</span> age <span class="token number">2</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">22</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HVALS</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">4</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"LiLei"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"22"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"man"</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HINCRBY</span>  heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">4</span> age <span class="token operator">-</span><span class="token number">2</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>HSETNX</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HSETNX</span> heima<span class="token operator">:</span>user4 sex woman
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HGETALL</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">3</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"name"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"Lucy"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"age"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"17"</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HSETNX</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">3</span> sex woman
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">HGETALL</span> heima<span class="token operator">:</span>user<span class="token operator">:</span><span class="token number">3</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"name"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"Lucy"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"age"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"17"</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">"sex"</span>
<span class="token number">6</span><span class="token punctuation">)</span> <span class="token string">"woman"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-6、redis命令-list命令" tabindex="-1"><a class="header-anchor" href="#_3-6、redis命令-list命令" aria-hidden="true">#</a> 3.6、Redis命令-List命令</h3>
<p>Redis中的List类型与Java中的LinkedList类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。</p>
<p>特征也与LinkedList类似：</p>
<ul>
<li>有序</li>
<li>元素可以重复</li>
<li>插入和删除快</li>
<li>查询速度一般</li>
</ul>
<p>常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等。</p>
<p><strong>List的常见命令有：</strong></p>
<ul>
<li>LPUSH key element ... ：向列表左侧插入一个或多个元素</li>
<li>LPOP key：移除并返回列表左侧的第一个元素，没有则返回nil</li>
<li>RPUSH key element ... ：向列表右侧插入一个或多个元素</li>
<li>RPOP key：移除并返回列表右侧的第一个元素</li>
<li>LRANGE key star end：返回一段角标范围内的所有元素</li>
<li>BLPOP和BRPOP：与LPOP和RPOP类似，只不过在没有元素时等待指定时间，而不是直接返回nil</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1652943604992.png" alt="1652943604992" tabindex="0" loading="lazy"><figcaption>1652943604992</figcaption></figure>
<ul>
<li>LPUSH和RPUSH</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">LPUSH</span> users <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">RPUSH</span> users <span class="token number">4</span> <span class="token number">5</span> <span class="token number">6</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>LPOP和RPOP</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">LPOP</span> users
<span class="token string">"3"</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">RPOP</span> users
<span class="token string">"6"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>LRANGE</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">LRANGE</span> users <span class="token number">1</span> <span class="token number">2</span>
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"1"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"4"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-7、redis命令-set命令" tabindex="-1"><a class="header-anchor" href="#_3-7、redis命令-set命令" aria-hidden="true">#</a> 3.7、Redis命令-Set命令</h3>
<p>Redis的Set结构与Java中的HashSet类似，可以看做是一个value为null的HashMap。因为也是一个hash表，因此具备与HashSet类似的特征：</p>
<ul>
<li>无序</li>
<li>元素不可重复</li>
<li>查找快</li>
<li>支持交集.并集.差集等功能</li>
</ul>
<p><strong>Set类型的常见命令</strong></p>
<ul>
<li>SADD key member ... ：向set中添加一个或多个元素</li>
<li>SREM key member ... : 移除set中的指定元素</li>
<li>SCARD key： 返回set中元素的个数</li>
<li>SISMEMBER key member：判断一个元素是否存在于set中</li>
<li>SMEMBERS：获取set中的所有元素</li>
<li>SINTER key1 key2 ... ：求key1与key2的交集</li>
<li>SDIFF key1 key2 ... ：求key1与key2的差集</li>
<li>SUNION key1 key2 ..：求key1和key2的并集</li>
</ul>
<p>例如两个集合：s1和s2:</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/ha8x86R.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>求交集：SINTER s1 s2</p>
<p>求s1与s2的不同：SDIFF s1 s2</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/L9vTv2X.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>具体命令</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> sadd s1 a b c
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> smembers s1
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"c"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"b"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"a"</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> srem s1 a
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">SISMEMBER</span> s1 a
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">SISMEMBER</span> s1 b
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token class-name">SCARD</span> s1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>案例</strong></p>
<ul>
<li>将下列数据用Redis的Set集合来存储：</li>
<li>张三的好友有：李四.王五.赵六</li>
<li>李四的好友有：王五.麻子.二狗</li>
<li>利用Set的命令实现下列功能：</li>
<li>计算张三的好友有几人</li>
<li>计算张三和李四有哪些共同好友</li>
<li>查询哪些人是张三的好友却不是李四的好友</li>
<li>查询张三和李四的好友总共有哪些人</li>
<li>判断李四是否是张三的好友</li>
<li>判断张三是否是李四的好友</li>
<li>将李四从张三的好友列表中移除</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">SADD</span> zs lisi wangwu zhaoliu
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">SADD</span> ls wangwu mazi ergou
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token class-name">SCARD</span> zs
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">SINTER</span> zs ls
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"wangwu"</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">SDIFF</span> zs ls
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"zhaoliu"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"lisi"</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">SUNION</span> zs ls
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"wangwu"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"zhaoliu"</span>
<span class="token number">3</span><span class="token punctuation">)</span> <span class="token string">"lisi"</span>
<span class="token number">4</span><span class="token punctuation">)</span> <span class="token string">"mazi"</span>
<span class="token number">5</span><span class="token punctuation">)</span> <span class="token string">"ergou"</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">SISMEMBER</span> zs lisi
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">SISMEMBER</span> ls zhangsan
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">SREM</span> zs lisi
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
    
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span><span class="token operator">:</span><span class="token number">6379</span><span class="token operator">></span> <span class="token constant">SMEMBERS</span> zs
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">"zhaoliu"</span>
<span class="token number">2</span><span class="token punctuation">)</span> <span class="token string">"wangwu"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-8、redis命令-sortedset类型" tabindex="-1"><a class="header-anchor" href="#_3-8、redis命令-sortedset类型" aria-hidden="true">#</a> 3.8、Redis命令-SortedSet类型</h3>
<p>Redis的SortedSet是一个可排序的set集合，与Java中的TreeSet有些类似，但底层数据结构却差别很大。SortedSet中的每一个元素都带有一个score属性，可以基于score属性对元素排序，底层的实现是一个跳表（SkipList）加 hash表。</p>
<p>SortedSet具备下列特性：</p>
<ul>
<li>可排序</li>
<li>元素不重复</li>
<li>查询速度快</li>
</ul>
<p>因为SortedSet的可排序特性，经常被用来实现排行榜这样的功能。</p>
<p>SortedSet的常见命令有：</p>
<ul>
<li>ZADD key score member：添加一个或多个元素到sorted set ，如果已经存在则更新其score值</li>
<li>ZREM key member：删除sorted set中的一个指定元素</li>
<li>ZSCORE key member : 获取sorted set中的指定元素的score值</li>
<li>ZRANK key member：获取sorted set 中的指定元素的排名</li>
<li>ZCARD key：获取sorted set中的元素个数</li>
<li>ZCOUNT key min max：统计score值在给定范围内的所有元素的个数</li>
<li>ZINCRBY key increment member：让sorted set中的指定元素自增，步长为指定的increment值</li>
<li>ZRANGE key min max：按照score排序后，获取指定排名范围内的元素</li>
<li>ZRANGEBYSCORE key min max：按照score排序后，获取指定score范围内的元素</li>
<li>ZDIFF.ZINTER.ZUNION：求差集.交集.并集</li>
</ul>
<p>注意：所有的排名默认都是升序，如果要降序则在命令的Z后面添加REV即可，例如：</p>
<ul>
<li><strong>升序</strong>获取sorted set 中的指定元素的排名：ZRANK key member</li>
<li><strong>降序</strong>获取sorted set 中的指定元素的排名：ZREVRANK key memeber</li>
</ul>
<h2 id="_4、redis的java客户端-jedis" tabindex="-1"><a class="header-anchor" href="#_4、redis的java客户端-jedis" aria-hidden="true">#</a> 4、Redis的Java客户端-Jedis</h2>
<p>在Redis官网中提供了各种语言的客户端，地址：<a href="https://redis.io/docs/clients/" target="_blank" rel="noopener noreferrer">https://redis.io/docs/clients/<ExternalLinkIcon/></a></p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/9f68ivq.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>其中Java客户端也包含很多：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/image-20220609102817435.png" alt="image-20220609102817435" tabindex="0" loading="lazy"><figcaption>image-20220609102817435</figcaption></figure>
<p>标记为❤的就是推荐使用的java客户端，包括：</p>
<ul>
<li>Jedis和Lettuce：这两个主要是提供了Redis命令对应的API，方便我们操作Redis，而SpringDataRedis又对这两种做了抽象和封装，因此我们后期会直接以SpringDataRedis来学习。</li>
<li>Redisson：是在Redis基础上实现了分布式的可伸缩的java数据结构，例如Map.Queue等，而且支持跨进程的同步机制：Lock.Semaphore等待，比较适合用来实现特殊的功能需求。</li>
</ul>
<h3 id="_4-1、jedis快速入门" tabindex="-1"><a class="header-anchor" href="#_4-1、jedis快速入门" aria-hidden="true">#</a> 4.1、Jedis快速入门</h3>
<p><strong>入门案例详细步骤</strong></p>
<p>案例分析：</p>
<p>0）创建工程</p>
<p>1）引入依赖：</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--jedis--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>redis.clients<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jedis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.7.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!--单元测试--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.junit.jupiter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>junit-jupiter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.7.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）建立连接</p>
<p>新建一个单元测试类，内容如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Jedis</span> jedis<span class="token punctuation">;</span>

<span class="token annotation punctuation">@BeforeEach</span>
<span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1.建立连接</span>
    <span class="token comment">// jedis = new Jedis("192.168.150.101", 6379);</span>
    jedis <span class="token operator">=</span> <span class="token class-name">JedisConnectionFactory</span><span class="token punctuation">.</span><span class="token function">getJedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 2.设置密码</span>
    jedis<span class="token punctuation">.</span><span class="token function">auth</span><span class="token punctuation">(</span><span class="token string">"123321"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 3.选择库</span>
    jedis<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）测试：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">testString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 存入数据</span>
    <span class="token class-name">String</span> result <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"虎哥"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"result = "</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 获取数据</span>
    <span class="token class-name">String</span> name <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"name = "</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">testHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 插入hash数据</span>
    jedis<span class="token punctuation">.</span><span class="token function">hset</span><span class="token punctuation">(</span><span class="token string">"user:1"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"Jack"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    jedis<span class="token punctuation">.</span><span class="token function">hset</span><span class="token punctuation">(</span><span class="token string">"user:1"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token string">"21"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 获取</span>
    <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">hgetAll</span><span class="token punctuation">(</span><span class="token string">"user:1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4）释放资源</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@AfterEach</span>
<span class="token keyword">void</span> <span class="token function">tearDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>jedis <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        jedis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-2、jedis连接池" tabindex="-1"><a class="header-anchor" href="#_4-2、jedis连接池" aria-hidden="true">#</a> 4.2、Jedis连接池</h3>
<p>Jedis本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此我们推荐大家使用Jedis连接池代替Jedis的直连方式</p>
<p>有关池化思想，并不仅仅是这里会使用，很多地方都有，比如说我们的数据库连接池，比如我们tomcat中的线程池，这些都是池化思想的体现。</p>
<h4 id="_4-2-1、创建jedis的连接池" tabindex="-1"><a class="header-anchor" href="#_4-2-1、创建jedis的连接池" aria-hidden="true">#</a> 4.2.1、创建Jedis的连接池</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JedisConnectionFacotry</span> <span class="token punctuation">{</span>

     <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">JedisPool</span> jedisPool<span class="token punctuation">;</span>

     <span class="token keyword">static</span> <span class="token punctuation">{</span>
         <span class="token comment">//配置连接池</span>
         <span class="token class-name">JedisPoolConfig</span> poolConfig <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JedisPoolConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         poolConfig<span class="token punctuation">.</span><span class="token function">setMaxTotal</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         poolConfig<span class="token punctuation">.</span><span class="token function">setMaxIdle</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         poolConfig<span class="token punctuation">.</span><span class="token function">setMinIdle</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         poolConfig<span class="token punctuation">.</span><span class="token function">setMaxWaitMillis</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">//创建连接池对象</span>
         jedisPool <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JedisPool</span><span class="token punctuation">(</span>poolConfig<span class="token punctuation">,</span>
                 <span class="token string">"192.168.150.101"</span><span class="token punctuation">,</span><span class="token number">6379</span><span class="token punctuation">,</span><span class="token number">1000</span><span class="token punctuation">,</span><span class="token string">"123321"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>

     <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Jedis</span> <span class="token function">getJedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
          <span class="token keyword">return</span> jedisPool<span class="token punctuation">.</span><span class="token function">getResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>代码说明：</strong></p>
<p>1） JedisConnectionFacotry：工厂设计模式是实际开发中非常常用的一种设计模式，我们可以使用工厂，去降低代的耦合，比如Spring中的Bean的创建，就用到了工厂设计模式</p>
<p>2）静态代码块：随着类的加载而加载，确保只能执行一次，我们在加载当前工厂类的时候，就可以执行static的操作完成对 连接池的初始化</p>
<p>3）最后提供返回连接池中连接的方法.</p>
<h4 id="_4-2-2、改造原始代码" tabindex="-1"><a class="header-anchor" href="#_4-2-2、改造原始代码" aria-hidden="true">#</a> 4.2.2、改造原始代码</h4>
<p><strong>代码说明:</strong></p>
<p>1.在我们完成了使用工厂设计模式来完成代码的编写之后，我们在获得连接时，就可以通过工厂来获得。</p>
<p>，而不用直接去new对象，降低耦合，并且使用的还是连接池对象。</p>
<p>2.当我们使用了连接池后，当我们关闭连接其实并不是关闭，而是将Jedis还回连接池的。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>    <span class="token annotation punctuation">@BeforeEach</span>
    <span class="token keyword">void</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//建立连接</span>
        <span class="token comment">/*jedis = new Jedis("127.0.0.1",6379);*/</span>
        jedis <span class="token operator">=</span> <span class="token class-name">JedisConnectionFacotry</span><span class="token punctuation">.</span><span class="token function">getJedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">//选择库</span>
        jedis<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

   <span class="token annotation punctuation">@AfterEach</span>
    <span class="token keyword">void</span> <span class="token function">tearDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>jedis <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            jedis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5、redis的java客户端-springdataredis" tabindex="-1"><a class="header-anchor" href="#_5、redis的java客户端-springdataredis" aria-hidden="true">#</a> 5、Redis的Java客户端-SpringDataRedis</h2>
<p>SpringData是Spring中数据操作的模块，包含对各种数据库的集成，其中对Redis的集成模块就叫做SpringDataRedis，官网地址：<a href="https://spring.io/projects/spring-data-redis" target="_blank" rel="noopener noreferrer">https://spring.io/projects/spring-data-redis<ExternalLinkIcon/></a></p>
<ul>
<li>提供了对不同Redis客户端的整合（Lettuce和Jedis）</li>
<li>提供了RedisTemplate统一API来操作Redis</li>
<li>支持Redis的发布订阅模型</li>
<li>支持Redis哨兵和Redis集群</li>
<li>支持基于Lettuce的响应式编程</li>
<li>支持基于JDK.JSON.字符串.Spring对象的数据序列化及反序列化</li>
<li>支持基于Redis的JDKCollection实现</li>
</ul>
<p>SpringDataRedis中提供了RedisTemplate工具类，其中封装了各种对Redis的操作。并且将不同数据类型的操作API封装到了不同的类型中：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1652976773295.png" alt="1652976773295" tabindex="0" loading="lazy"><figcaption>1652976773295</figcaption></figure>
<h3 id="_5-1、快速入门" tabindex="-1"><a class="header-anchor" href="#_5-1、快速入门" aria-hidden="true">#</a> 5.1、快速入门</h3>
<p>SpringBoot已经提供了对SpringDataRedis的支持，使用非常简单：</p>
<h4 id="_5-1-1、导入pom坐标" tabindex="-1"><a class="header-anchor" href="#_5-1-1、导入pom坐标" aria-hidden="true">#</a> 5.1.1、导入pom坐标</h4>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/POM/4.0.0<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
         <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">></span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.5.7<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>relativePath</span><span class="token punctuation">/></span></span> <span class="token comment">&lt;!-- lookup parent from repository --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.heima<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>redis-demo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>0.0.1-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>redis-demo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>description</span><span class="token punctuation">></span></span>Demo project for Spring Boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>description</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>properties</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>java.version</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>java.version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>properties</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--redis依赖--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--common-pool--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-pool2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!--Jackson依赖--></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.fasterxml.jackson.core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jackson-databind<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-maven-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>excludes</span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclude</span><span class="token punctuation">></span></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
                            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclude</span><span class="token punctuation">></span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>excludes</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-1-2、配置文件" tabindex="-1"><a class="header-anchor" href="#_5-1-2、配置文件" aria-hidden="true">#</a> 5.1.2、配置文件</h4>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> 192.168.150.101
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123321</span>
    <span class="token key atrule">lettuce</span><span class="token punctuation">:</span>
      <span class="token key atrule">pool</span><span class="token punctuation">:</span>
        <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">8</span>  <span class="token comment">#最大连接</span>
        <span class="token key atrule">max-idle</span><span class="token punctuation">:</span> <span class="token number">8</span>   <span class="token comment">#最大空闲连接</span>
        <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">0</span>   <span class="token comment">#最小空闲连接</span>
        <span class="token key atrule">max-wait</span><span class="token punctuation">:</span> 100ms <span class="token comment">#连接等待时间</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_5-1-3、测试代码" tabindex="-1"><a class="header-anchor" href="#_5-1-3、测试代码" aria-hidden="true">#</a> 5.1.3、测试代码</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">RedisDemoApplicationTests</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> redisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 写入一条String数据</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"虎哥"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 获取string数据</span>
        <span class="token class-name">Object</span> name <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"name = "</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>贴心小提示：SpringDataJpa使用起来非常简单，记住如下几个步骤即可</strong></p>
<p>SpringDataRedis的使用步骤：</p>
<ul>
<li>引入spring-boot-starter-data-redis依赖</li>
<li>在application.yml配置Redis信息</li>
<li>注入RedisTemplate</li>
</ul>
<h3 id="_5-2、数据序列化器" tabindex="-1"><a class="header-anchor" href="#_5-2、数据序列化器" aria-hidden="true">#</a> 5.2、数据序列化器</h3>
<p>RedisTemplate可以接收任意Object作为值写入Redis：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/OEMcbuu.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>只不过写入前会把Object序列化为字节形式，默认是采用JDK序列化，得到的结果是这样的：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/5FjtWk5.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>缺点：</p>
<ul>
<li>可读性差</li>
<li>内存占用较大</li>
</ul>
<p>我们可以自定义RedisTemplate的序列化方式，代码如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">redisTemplate</span><span class="token punctuation">(</span><span class="token class-name">RedisConnectionFactory</span> connectionFactory<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 创建RedisTemplate对象</span>
        <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> template <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置连接工厂</span>
        template<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>connectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建JSON序列化工具</span>
        <span class="token class-name">GenericJackson2JsonRedisSerializer</span> jsonRedisSerializer <span class="token operator">=</span> 
            							<span class="token keyword">new</span> <span class="token class-name">GenericJackson2JsonRedisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置Key的序列化</span>
        template<span class="token punctuation">.</span><span class="token function">setKeySerializer</span><span class="token punctuation">(</span><span class="token class-name">RedisSerializer</span><span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        template<span class="token punctuation">.</span><span class="token function">setHashKeySerializer</span><span class="token punctuation">(</span><span class="token class-name">RedisSerializer</span><span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 设置Value的序列化</span>
        template<span class="token punctuation">.</span><span class="token function">setValueSerializer</span><span class="token punctuation">(</span>jsonRedisSerializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        template<span class="token punctuation">.</span><span class="token function">setHashValueSerializer</span><span class="token punctuation">(</span>jsonRedisSerializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 返回</span>
        <span class="token keyword">return</span> template<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里采用了JSON序列化来代替默认的JDK序列化方式。最终结果如图：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/XOAq3cN.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>整体可读性有了很大提升，并且能将Java对象自动的序列化为JSON字符串，并且查询时能自动把JSON反序列化为Java对象。不过，其中记录了序列化时对应的class名称，目的是为了查询时实现自动反序列化。这会带来额外的内存开销。</p>
<h3 id="_5-3、stringredistemplate" tabindex="-1"><a class="header-anchor" href="#_5-3、stringredistemplate" aria-hidden="true">#</a> 5.3、StringRedisTemplate</h3>
<p>尽管JSON的序列化方式可以满足我们的需求，但依然存在一些问题，如图：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1653054602930.png" alt="1653054602930" tabindex="0" loading="lazy"><figcaption>1653054602930</figcaption></figure>
<p>为了在反序列化时知道对象的类型，JSON序列化器会将类的class类型写入json结果中，存入Redis，会带来额外的内存开销。</p>
<p>为了减少内存的消耗，我们可以采用手动序列化的方式，换句话说，就是不借助默认的序列化器，而是我们自己来控制序列化的动作，同时，我们只采用String的序列化器，这样，在存储value时，我们就不需要在内存中就不用多存储数据，从而节约我们的内存空间</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1653054744832.png" alt="1653054744832" tabindex="0" loading="lazy"><figcaption>1653054744832</figcaption></figure>
<p>这种用法比较普遍，因此SpringDataRedis就提供了RedisTemplate的子类：StringRedisTemplate，它的key和value的序列化方式默认就是String方式。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/zXH6Qn6.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>省去了我们自定义RedisTemplate的序列化方式的步骤，而是直接使用：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">RedisStringTests</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 写入一条String数据</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"verify:phone:13600527634"</span><span class="token punctuation">,</span> <span class="token string">"124143"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 获取string数据</span>
        <span class="token class-name">Object</span> name <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"name = "</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ObjectMapper</span> mapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testSaveUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">JsonProcessingException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建对象</span>
        <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"虎哥"</span><span class="token punctuation">,</span> <span class="token number">21</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 手动序列化</span>
        <span class="token class-name">String</span> json <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 写入数据</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"user:200"</span><span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 获取数据</span>
        <span class="token class-name">String</span> jsonUser <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"user:200"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 手动反序列化</span>
        <span class="token class-name">User</span> user1 <span class="token operator">=</span> mapper<span class="token punctuation">.</span><span class="token function">readValue</span><span class="token punctuation">(</span>jsonUser<span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"user1 = "</span> <span class="token operator">+</span> user1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时我们再来看一看存储的数据，小伙伴们就会发现那个class数据已经不在了，节约了我们的空间~</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1653054945211.png" alt="1653054945211" tabindex="0" loading="lazy"><figcaption>1653054945211</figcaption></figure>
<p>最后小总结：</p>
<p>RedisTemplate的两种序列化实践方案：</p>
<ul>
<li>
<p>方案一：</p>
<ul>
<li>自定义RedisTemplate</li>
<li>修改RedisTemplate的序列化器为GenericJackson2JsonRedisSerializer</li>
</ul>
</li>
<li>
<p>方案二：</p>
<ul>
<li>使用StringRedisTemplate</li>
<li>写入Redis时，手动把对象序列化为JSON</li>
<li>读取Redis时，手动把读取到的JSON反序列化为对象</li>
</ul>
</li>
</ul>
<h3 id="_5-4、hash结构操作" tabindex="-1"><a class="header-anchor" href="#_5-4、hash结构操作" aria-hidden="true">#</a> 5.4、Hash结构操作</h3>
<p>在基础篇的最后，咱们对Hash结构操作一下，收一个小尾巴，这个代码咱们就不再解释啦</p>
<p>马上就开始新的篇章~~~进入到我们的Redis实战篇</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">RedisStringTests</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">;</span>


    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">testHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"user:400"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"虎哥"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"user:400"</span><span class="token punctuation">,</span> <span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token string">"21"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> entries <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span><span class="token string">"user:400"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"entries = "</span> <span class="token operator">+</span> entries<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


