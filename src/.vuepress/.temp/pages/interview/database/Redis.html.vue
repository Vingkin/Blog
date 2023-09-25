<template><div><h2 id="redis常见数据结构以及使用场景" tabindex="-1"><a class="header-anchor" href="#redis常见数据结构以及使用场景" aria-hidden="true">#</a> Redis常见数据结构以及使用场景</h2>
<p><strong>string</strong></p>
<p>介绍：虽然Reids是C语言编写的，但是其string底层并没有采用C的字符串，而是自己构建了一种简单动态字符串</p>
<p>常用命令：<code v-pre>set，get，strlen，exists，decr，incr，setex</code>等</p>
<p>应用场景：一般用于需要计数的场景，比如用户的访问次数，热点文章的点赞数和转发数等等</p>
<p><strong>list</strong></p>
<p>介绍：底层为双向链表</p>
<p>常用命令：<code v-pre>rpush，lpush，rpop，lpop，lrange，llen</code>等</p>
<p>应用场景：消息队列</p>
<p><strong>hash</strong></p>
<p>介绍：类似于JDK1.8之前的HashMap，内部实现也差不多是数组+链表。</p>
<p>常用命令：<code v-pre>hset，hmset，hexists，hget，hgetall，hkeys，hvals</code>等</p>
<p>应用场景：系统中对象数据的存储</p>
<p><strong>set</strong></p>
<p>介绍：类似于Java中的HashSet</p>
<p>常用命令：<code v-pre>sadd，spop，smembers，sismember，scard，sinterstore，sunion</code>等</p>
<p>应用场景：集合运算，比如集合的交集和并集</p>
<p><strong>sorted set</strong></p>
<p>介绍：基于<code v-pre>跳表</code>实现，和set相比增加了一个权重参数score，使得集合中的元素可以根据score进行有序排列。</p>
<p>常用命令：<code v-pre>zadd，zcard，zscore，zrange，zrevrange，zrem</code>等</p>
<p>应用场景：需要对数据根据某个权重进行排序的场景。比如直播间礼物排行 。</p>
<h2 id="redis到底是单线程还是多线程" tabindex="-1"><a class="header-anchor" href="#redis到底是单线程还是多线程" aria-hidden="true">#</a> Redis到底是单线程还是多线程</h2>
<p>Redis 6.0版本之前的<strong>单线程指的是其网络I/O和键值对读写是有一个线程完成的</strong>。也就是只有网络请求模块和数据操作模块是单线程的，而其他的持久化、集群数据同步等，其实是由额外的线程执行的</p>
<p>Redis 6.0引入的<strong>多线程指的是网络I/O采用了多线程</strong>，而键值对读写命令仍然是单线程处理的，所以Redis仍然是并发安全的</p>
<h2 id="redis单线程为什么还快" tabindex="-1"><a class="header-anchor" href="#redis单线程为什么还快" aria-hidden="true">#</a> Redis单线程为什么还快</h2>
<ol>
<li>命令执行基于内存操作</li>
<li>命令执行是单线程操作，没有线程切换开销</li>
<li>基于IO多路复用机制（epoll）提升Redis的I/O利用率</li>
<li>高效的数据存储结构：全局hash表以及多种高效数据结构，比如：跳表，压缩列表，链表等等</li>
</ol>
<h2 id="redis底层数据是如何用跳表来存储的" tabindex="-1"><a class="header-anchor" href="#redis底层数据是如何用跳表来存储的" aria-hidden="true">#</a> Redis底层数据是如何用跳表来存储的</h2>
<p>将有序链表改造为支持类似“折半查找”的算法，可以让链表可以快速的插入、删除和查找。常用于<code v-pre>Sorted Set</code>的底层实现。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/跳表.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="redis-key过期了为什么内存没释放" tabindex="-1"><a class="header-anchor" href="#redis-key过期了为什么内存没释放" aria-hidden="true">#</a> Redis Key过期了为什么内存没释放</h2>
<ol>
<li>
<p>设置了过期时间的key被没有设置过期时间的相同key覆盖了</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> name vingkin ex <span class="token number">120</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">119</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> name vingkin
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token parameter variable">-1</span> <span class="token comment"># name被覆盖，永不过时</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>与过期数据删除策略有关</p>
</li>
</ol>
<h2 id="过期数据删除策略" tabindex="-1"><a class="header-anchor" href="#过期数据删除策略" aria-hidden="true">#</a> 过期数据删除策略</h2>
<p><strong>惰性删除：</strong> 在取出key的时候对数据进行过期检查。这样对CPU友好，但是会造成太多过期key没有被删除</p>
<p><strong>定期删除：</strong> 每隔一段时间抽取一批key执行删除过期key操作。并且Redis底层会通过限制删除操作的时常和频率来减少删除操作对CPU的影响</p>
<p>定期删除对内存更加友好，惰性删除对CPU更加友好。所以Redis采用两者结合的方式进行过期数据删除</p>
<h2 id="redis-key没设置过期时间为什么被redis主动删除了" tabindex="-1"><a class="header-anchor" href="#redis-key没设置过期时间为什么被redis主动删除了" aria-hidden="true">#</a> Redis Key没设置过期时间为什么被Redis主动删除了</h2>
<p>Redis的内存淘汰机制使用了<code v-pre>allkeys-lru</code>或者<code v-pre>allkeys-random</code>或者<code v-pre>allkeys-lfu</code></p>
<h2 id="redis内存淘汰机制" tabindex="-1"><a class="header-anchor" href="#redis内存淘汰机制" aria-hidden="true">#</a> Redis内存淘汰机制</h2>
<p>当Redis已用内存超过<code v-pre>maxmemory</code>限定时，触动主动清理策略。</p>
<p>主动清理策略再Redis4.0 之前一共实现了6中内存淘汰机制，在4.0之后，又增加了2种策略，总共8种：</p>
<p>针对设置了过期时间的key做处理：</p>
<ul>
<li><strong>volatile-lru（least recently used）：</strong> 从已设置过期时间的数据集(<code v-pre>server.db[i].expires</code>)中挑选最近最少使用的数据淘汰（最常用）</li>
<li><strong>volatile-ttl：</strong> 从已设置过期时间的数据集中挑选即将要过期的数据淘汰</li>
<li><strong>volatile-random：</strong> 从已设置过期时间的数据集中任意选择数据淘汰</li>
<li><strong>volatile-lfu（least frequently used）：</strong> 从已设置过期时间的数据集中挑选最不经常使用的数据淘汰（访问次数最少）</li>
</ul>
<p>针对所有的key做处理：</p>
<ul>
<li><strong>allkeys-lru：（least recently used）：</strong> 当内存不足以容纳新写入数据时，在键空间中，移出最近最少使用的key（最常用）</li>
<li><strong>allkeys-random：</strong> 从数据集中任意选择数据淘汰</li>
<li><strong>allkeys-lfu（least frequently used）：</strong> 当内存不足以容纳新写入的数据时，在键空间中移出最不经常使用的key</li>
</ul>
<p>不处理：</p>
<ul>
<li><strong>no-eviction：</strong> 禁止驱逐数据，也就是说当内存不足以容纳新写入数据时，新写入操作会报错。（基本不使用）</li>
</ul>
<blockquote>
<p>绝大多数情况都是用LRU策略，当存在大量的热点缓存数据时，LFU可能更好点，以访问次数的多少作为参考点。</p>
</blockquote>
<h2 id="删除key的命令会阻塞redis吗" tabindex="-1"><a class="header-anchor" href="#删除key的命令会阻塞redis吗" aria-hidden="true">#</a> 删除Key的命令会阻塞Redis吗</h2>
<p><code v-pre>DEL key [key ...]</code></p>
<p>时间复杂度：</p>
<p><code v-pre>O(N)</code>，其中N为被删除key的数量</p>
<p>删除单个字符串类型的key，时间复杂度为<code v-pre>O(1)</code></p>
<p>删除单个列表、集合、有序集合或哈希表类型的key，时间复杂度为<code v-pre>O(M)</code>，其中M为以上数据类型种元素的数量。</p>
<p><strong>当删除的key是所占内存很大时，不管是string还是其他的数据类型，都有可能会阻塞Redis</strong></p>
<h2 id="redis高可用方案" tabindex="-1"><a class="header-anchor" href="#redis高可用方案" aria-hidden="true">#</a> Redis高可用方案</h2>
<h3 id="主从模式" tabindex="-1"><a class="header-anchor" href="#主从模式" aria-hidden="true">#</a> 主从模式</h3>
<p>不能保证高可用，当master节点挂掉后需要运维介入切换节点，一般不使用</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/主从模式.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="哨兵模式" tabindex="-1"><a class="header-anchor" href="#哨兵模式" aria-hidden="true">#</a> 哨兵模式</h3>
<p>在redis 3.0以前的版本要实现集群一般时借助哨兵sentinel工具来监控master节点的状态，如果master节点异常，则会做出主从切换，将某一台slave作为master，哨兵的配置略微复杂，并且性能和高可用性等各方面表现一般，特别时主从切换的瞬间存在<strong>访问瞬断</strong>的情况，而且哨兵模式只有一个主节点对外提供服务，没法支持很高的并发（单节点理论支持最高并发量为10万），且单个主节点内存也不宜设的过大（一般为10G），否则会导致持久化文件过大，影响数据恢复或主从同步的效率。</p>
<p>sentinel，哨兵是redis集群中非常重要的一个组件，主要有以下功能：</p>
<ul>
<li><strong>集群监控</strong>：负责监控redis master和slave进程是否正常工作</li>
<li><strong>消息通知</strong>：如果某个redis实例有故障，那么哨兵负责发送消息作为报警通知给管理员</li>
<li><strong>故障转移</strong>：如果master node挂掉了，会自动转移到slave node上。故障转移时，判断一个master node是否宕机了，需要大部分的哨兵都同意才行，涉及到了分布式选举。</li>
<li><strong>配置中心</strong>：如果故障转移发生了，通知client客户端新的master地址</li>
</ul>
<p>哨兵用于实现redis集群的高可用，本身也是分布式的，作为一个哨兵集群去运行，互相协同工作。</p>
<ul>
<li>即使部分哨兵节点挂掉了，哨兵集群还是能正常工作的</li>
<li>哨兵通常需要3个实例，来保证自己的健壮性</li>
<li>哨兵 + redis主从的部署架构，是不保证数据零丢失的，只能保证redis集群的高可用性</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/哨兵模式.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="集群模式" tabindex="-1"><a class="header-anchor" href="#集群模式" aria-hidden="true">#</a> 集群模式</h3>
<p>Redis集群是由多个<strong>主从节点群组成的分布式服务器群</strong>，它具有<strong>复制，高可用和分片</strong>的特性。Redis集群不需要sentine哨兵也能完成节点移出和故障转移的功能。需要将每个节点设置成集群模式，这种集群模式没有中心节点，可水平扩展，据官方文档称可以线性扩展到上万个节点（官方推荐不超过1000个）。Redis集群的性能和高可用性均优于之前版本的哨兵模式，且集群配置非常简单。</p>
<ul>
<li>通过hash的方式，将数据分片，每个节点均衡存储一定哈希槽（哈希值）区间的数据</li>
<li>每份数据分片会存储在多个互为主从的多节点上</li>
<li>数据先写入主节点，再同步到从节点（支持配置为阻塞同步）</li>
<li>同一分片多个节点间的数据不保持强一致性</li>
<li>读取数据时，当客户端操作的key没有分配在该节点上时，redis会返回转向指令，转向正确的节点</li>
<li>扩容时，需要把旧节点的数据迁移一部分到新节点</li>
</ul>
<p>在redis cluster架构下，每个redis节点都要开放两个端口号，一个用于连接，一个用于节点间通信</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/高可用集群模式.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="reids集群模式下数据hash分片算法" tabindex="-1"><a class="header-anchor" href="#reids集群模式下数据hash分片算法" aria-hidden="true">#</a> Reids集群模式下数据hash分片算法</h2>
<p>Redis Cluster将所有数据划分为16384个槽位，每个节点负责其中一部分槽位。槽位的信息存储于每个节点中。</p>
<p>当Redis Cluster的客户端来连接集群时，它也会得到一份集群的槽位配置信息并将其缓存在客户端本地。这样当客户端要查找某个key时，可以根据槽位定位算法定位到目标节点。</p>
<p><strong>槽位定位算法</strong></p>
<p>Cluster默认会对key使用crc16算法进行hash得到一个整数值，然后用这个整数值对16384进行取模来得到具体槽位。</p>
<p><code v-pre>HASH_SLOT = CRC16(key) % 16384</code></p>
<p>再根据槽位值和Redis节点的对应关系就可以定位到key具体是落在哪个Redis节点上</p>
<h2 id="redis执行命令出现死循环bug" tabindex="-1"><a class="header-anchor" href="#redis执行命令出现死循环bug" aria-hidden="true">#</a> Redis执行命令出现死循环Bug</h2>
<p>如果想随机查看Redis中的一个key，Redis里面有一个<code v-pre>RANDOMKEY</code>命令可以从Redis中随机取出一个key，这个命令可能导致Redis死循环阻塞。</p>
<p><strong>出现这个问题的原因主要还是在于Redis的过期数据删除策略</strong></p>
<p><code v-pre>RANDOMKEY</code>随机拿出一个key后，首先会检查该key是否过期，如果过期，则会先删除这个key然后重新选取，直到找到一个未过期的key返回。如果Redis中有大量的key已经过期，但是没有被即使清理，那么这个循环会持续很久才结束。这个流程是发生在master节点中的。</p>
<p>如果发生在slave节点中，那么问题会更严重。slave是不会主动清理过期key的，当一个key过期时，master会先清理删除它，然后向slave发送一个DEL命令，告知slave也删除这个key，以此达到主从库的数据一致性。</p>
<p><strong>假设Redis中存在大量已过期但是未被清理的key，在slave中执行<code v-pre>RANDOMKEY</code>时，因为不会删除过期key，则有可能无限制的命中过期key，陷入死循环，导致Redis实例卡死。</strong></p>
<p>这其实是Redis 5.0之前的一个Bug，修复方案就是给<code v-pre>RANDOMKEY</code>增加最多执行次数，无论是否找到key，都返回。</p>
<h2 id="主从切换导致缓存雪崩具体场景" tabindex="-1"><a class="header-anchor" href="#主从切换导致缓存雪崩具体场景" aria-hidden="true">#</a> 主从切换导致缓存雪崩具体场景</h2>
<blockquote>
<p>为什么要保证主从节点机器时钟一致</p>
</blockquote>
<p>我们假设，slave的机器时钟比master走得快很多</p>
<p>此时，Redis master里设置了过期时间的key，从slave角度来看，可能会有很多在master里没过期的数据其实已经过期了</p>
<p>如果此时操作主从切换，把slave提升为新的master</p>
<p>slave成为新的master后，就会开始大量清理过期key，此时就会导致以下结果：</p>
<ol>
<li>master大量清理过期key，主线程可能会发生阻塞，无法及时处理客户端请求</li>
<li>Redis中数据大量过期，引发缓存雪崩甚至系统崩溃</li>
</ol>
<p>当master和slave机器始终严重不一致时，对业务的影响非常大。<strong>所以一定要保证主从节点的机器时钟一致性。</strong></p>
</div></template>


