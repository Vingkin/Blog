<template><div><h2 id="_1-distcp" tabindex="-1"><a class="header-anchor" href="#_1-distcp" aria-hidden="true">#</a> 1. DistCp</h2>
<blockquote>
<p>HDFS分布式拷贝工具</p>
</blockquote>
<ol>
<li>
<p>用于数据迁移，定期在集群间或集群内部进行数据备份</p>
</li>
<li>
<p>底层使用MapReduce在集群之间或并行地在同一集群内复制文件。执行复制的MapReduce只有mapper阶段。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ hadoop distcp usage: distcp OPTIONS <span class="token punctuation">[</span>source_path<span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token operator">&lt;</span>target_path<span class="token operator">></span>             
	<span class="token parameter variable">-append</span>                //拷贝文件时支持对现有文件进行追加写操作
	<span class="token parameter variable">-async</span>                  //异步执行distcp拷贝任务
	<span class="token parameter variable">-bandwidth</span> <span class="token operator">&lt;</span>arg<span class="token operator">></span>        //对每个Map任务的带宽限速
	<span class="token parameter variable">-delete</span>                 //删除相对于源端,目标端多出来的文件
	<span class="token parameter variable">-diff</span> <span class="token operator">&lt;</span>arg<span class="token operator">></span>             //通过快照diff信息进行数据的同步                  
	<span class="token parameter variable">-overwrite</span>              //以覆盖的方式进行拷贝,如果目标端文件已经存在,则直接覆盖
	<span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>arg<span class="token operator">></span>                //拷贝数据时,扩展属性信息的保留,包括权限信息,块大小信息等等
	<span class="token parameter variable">-skipcrccheck</span>          //拷贝数据时是否跳过cheacksum的校验
	<span class="token parameter variable">-update</span>                 //拷贝数据时,只拷贝相对于源端 ,目标端不存在的文件数据
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="_2-安全模式" tabindex="-1"><a class="header-anchor" href="#_2-安全模式" aria-hidden="true">#</a> 2. 安全模式</h2>
<blockquote>
<p>安全模式下系统可读不可写</p>
</blockquote>
<ol>
<li>
<p>Hadoop中的安全模式safe mode是NameNode的维护状态，在此状态下NameNode不允许对文件系统进行任何更改，可以接受读数据请求。</p>
</li>
<li>
<p>在NameNode启动过程中，首先会从fsimage和edits日志文件加载文件系统状态。然后，等待DataNodes汇报可用的block信息。在此期间，NameNode保持在安全模式。随着DataNode的block汇报持续进行，当整个系统达到安全标准时，HDFS自动离开安全模式。在NameNode Web主页上会显示安全模式是打开还是关闭。</p>
</li>
<li>
<p>如果HDFS处于安全模式下，不允许HDFS客户端进行任何修改文件的操作,包括上传文件，删除文件，重命名，创建文件夹,修改副本数等操作。</p>
</li>
</ol>
<p><strong>自动操作</strong>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># hdfs-site.xml、hdfs-default.xml</span>
dfs.replication      <span class="token comment">#hdfs block的副本数据，默认3</span>
dfs.replication.max   <span class="token comment">#最大块副本数，默认512</span>
dfs.namenode.replication.min   <span class="token comment">#最小块副本数，默认1</span>
dfs.namenode.safemode.threshold-pct  <span class="token comment">#已汇报可用数据块数量占整体块数量的百分比阈值。默认0.999f。</span>
									<span class="token comment">#小于或等于0，则表示退出安全模式之前，不要等待特定百分比的块。</span>
									<span class="token comment"># 大于1的值将使安全模式永久生效  </span>
dfs.namenode.safemode.min.datanodes  <span class="token comment">#指在退出安全模式之前必须存活的DataNode数量，默认0</span>
dfs.namenode.safemode.extension  <span class="token comment">#达到阈值条件后持续扩展的时间。倒计时结束如果依然满足阈值条件                               			# 自动离开安全模式。默认30000毫秒</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>手动操作</strong>：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>hdfs dfsadmin <span class="token parameter variable">-safemode</span> get 	<span class="token comment"># 手动获取安全模式状态信息</span>
hdfs dfsadmin <span class="token parameter variable">-safemode</span> enter 	<span class="token comment"># 手动进入安全模式</span>
hdfs dfsadmin <span class="token parameter variable">-safemode</span> leave	<span class="token comment"># 手动离开安全模式</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-hdfs高阶优化方案" tabindex="-1"><a class="header-anchor" href="#_3-hdfs高阶优化方案" aria-hidden="true">#</a> 3. HDFS高阶优化方案</h2>
<h3 id="_3-1-短路本地读取" tabindex="-1"><a class="header-anchor" href="#_3-1-短路本地读取" aria-hidden="true">#</a> 3.1. 短路本地读取</h3>
<blockquote>
<p>当DFSClient与数据在同一个机器上时，让DFSClient绕开Datanode自己去读取数据</p>
</blockquote>
<p><strong>实现思想：</strong></p>
<ul>
<li>
<p>在Linux中，有个技术叫做<strong>Unix Domain Socket</strong>。Unix Domain Socket是一种进程间的通讯方式，它使得同一个机器上的两个进程能以Socket的方式通讯。</p>
</li>
<li>
<p>它带来的另一大好处是，利用它两个进程除了可以传递普通数据外，还可以在进程间传递文件描述符。</p>
</li>
<li>
<p>借助Unix Domain Socket，可以让A打开文件得到一个文件描述符，然后把文件描述符传递给B，B就能读取文件里面的内容了即使它没有相应的权限。</p>
</li>
<li>
<p>在HDFS的场景里面，A就是Datanode，B就是DFSClient，需要读取的文件就是Datanode数据目录中的某个文件</p>
</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251613199.png" alt="短路本地读取" tabindex="0" loading="lazy"><figcaption>短路本地读取</figcaption></figure>
<p><strong>实现步骤：</strong></p>
<ol>
<li>
<p>因为Java不能直接操作Unix Domain Socket，<a href="http://xn--Hadoopnativelibhadoop-2o47ak84drw0c2c9age7hy8semkey42j.so" target="_blank" rel="noopener noreferrer">所以需要安装Hadoop的native包libhadoop.so<ExternalLinkIcon/></a>。在编译Hadoop源码的时候可以通过编译native模块获取。可以用<code v-pre>hadoop checknative</code>来检查native包是否安装好。</p>
</li>
<li>
<p><code v-pre>dfs.client.read.shortcircuit</code> 是打开短路本地读取功能的开关</p>
<p><code v-pre>dfs.domain.socket.path</code> 是Datanode和DFSClient之间沟通的Socket的本地路径。</p>
<div class="language-properties line-numbers-mode" data-ext="properties"><pre v-pre class="language-properties"><code><span class="token comment"># hdfs-site.xml</span>
&lt;property>
	&lt;name>dfs.client.read.shortcircuit&lt;/name>
    &lt;value>true&lt;/value>
&lt;/property>
&lt;property>
	&lt;name>dfs.domain.socket.path&lt;/name>
    &lt;value>/var/lib/hadoop-hdfs/dn_socket&lt;/value>
&lt;/property>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建本地路径：<code v-pre>mkdir -p /var/lib/hadoop-hdfs</code>（注意不包含dn_socket）</p>
<p>通过datanode的日志查看是否配置完成<code v-pre>/logs/...</code>，搜索关键词<code v-pre>UNIX domain socket</code></p>
</li>
</ol>
<h3 id="_3-2-hdfs-block负载平衡器-balancer" tabindex="-1"><a class="header-anchor" href="#_3-2-hdfs-block负载平衡器-balancer" aria-hidden="true">#</a> 3.2. HDFS Block负载平衡器：Balancer</h3>
<blockquote>
<p>所谓的平衡指的是每个DataNode的利用率（本机已用空间与本机总容量之比）与集群的利用率（HDFS整体已用空间与HDFS集群总容量的比）之间相差不超过给定阈值百分比</p>
</blockquote>
<p><strong>注意：负载平衡器无法在单个DataNode上的各个卷（磁盘）之间进行平衡，将通过磁盘均衡器来实现</strong></p>
<p><strong>实现步骤：</strong></p>
<ol>
<li>
<p>设置平衡数据传输带宽</p>
<p><code v-pre>hdfs dfsadmin -setBalancerBandwidth newbandwidth</code></p>
<p>其中newbandwidth是每个DataNode在平衡操作期间可以使用的最大网络带宽量，以每秒字节数为单位。</p>
<p>例如：<code v-pre>hdfs dfsadmin -setBalancerBandwidth 104857600（100M）</code></p>
</li>
<li>
<p>运行balancer</p>
<p>默认参数运行：<code v-pre>hdfs balancer</code></p>
<p>指定参数运行：<code v-pre>hdfs balancer -thresholod 5</code> 将以阈值5%运行，默认为10%</p>
<p>这意味着程序将确保每个DataNode上的磁盘使用量与群集中的总体使用量相差不超过5％</p>
</li>
</ol>
<h3 id="_3-3-磁盘均衡器-hdfs-disk-balancer-3-0" tabindex="-1"><a class="header-anchor" href="#_3-3-磁盘均衡器-hdfs-disk-balancer-3-0" aria-hidden="true">#</a> 3.3. 磁盘均衡器：HDFS Disk Balancer（3.0）</h3>
<blockquote>
<p><strong>HDFS disk balancer</strong>是Hadoop 3中引入的命令行工具，用于平衡DataNode中的数据在磁盘之间分布不均匀问题</p>
</blockquote>
<p><strong>实现思想：</strong></p>
<ul>
<li>
<p>卷（磁盘）数据密度：比较同台机器上不同卷之间的数据分布情况。</p>
<p>计算方法：</p>
<p>Total Used / Total Capacity - Disk Used / Disk Capacity</p>
</li>
<li>
<p>节点数据密度：比较的是不同机器之间的。</p>
<p>该节点上所有volume data density卷（磁盘）数据密度绝对值的总和</p>
</li>
</ul>
<p>较低的node Data Density值表示该机器节点具有较好的扩展性，而较高的值表示节点具有更倾斜的数据分布。一旦有了volume Data Density和node Data Density，就可以找到集群中数据分布倾斜的节点和机器上数据分步倾斜的磁盘。<strong>（先通过node Data Density确定哪个节点不平衡，再通过volume Data Density对具体的卷实施操作）</strong></p>
<p><strong>实现步骤（百度）：</strong></p>
<blockquote>
<p>默认情况下，Hadoop群集上已经启用了Disk Balancer功能。通过在<code v-pre>hdfs-site.xml</code>中调整<code v-pre>dfs.disk.balancer.enabled</code>参数值，选择在Hadoop中是否启用磁盘平衡器。</p>
</blockquote>
<h3 id="_3-4-纠删码技术-erasure-coding-3-0" tabindex="-1"><a class="header-anchor" href="#_3-4-纠删码技术-erasure-coding-3-0" aria-hidden="true">#</a> 3.4. 纠删码技术（Erasure Coding)（3.0）</h3>
<blockquote>
<p>纠删码技术（Erasure coding）简称EC，是一种编码容错技术。最早用于通信行业，数据传输中的数据恢复。它通过对数据进行分块，然后计算出校验数据，使得各个部分的数据产生关联性。当一部分数据块丢失时，可以通过剩余的数据块和校验块计算出丢失的数据块。</p>
</blockquote>
<blockquote>
<p>出现背景：3副本存储的弊端</p>
</blockquote>
<p><strong>里德所罗门（Reed-Solomon）码数学原理：</strong></p>
<ul>
<li>
<p>k个数据块组成一个向量被乘上一个生成矩阵（Generator Matrix）GT从而得到一个码字（codeword）向量，该向量由k个数据块（d0,d1..d3）和m个校验块（c0,c1）构成。</p>
</li>
<li>
<p>如果数据块丢失，可以用GT逆矩阵乘以码字向量来恢复出丢失的数据块。</p>
</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/BigData/Hadoop/hdfs/2.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>比如有 7、8、9 三个原始数据，通过矩阵乘法，计算出来两个校验数据 50、122</p>
<p>一共五个数据：7、8、9、50、122，可以任意丢两个，然后通过算法进行恢复</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/BigData/Hadoop/hdfs/3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>Hadoop EC架构</strong>（为了支持纠删码，HDFS体系结构进行的调整）</p>
<ul>
<li>
<p>Namenode扩展</p>
<p>条带化的HDFS文件在逻辑上由<code v-pre>block group</code>（块组）组成，每个块组包含一定数量的内部块。这允许在块组级别而不是块级别进行文件管理。</p>
</li>
<li>
<p>客户端扩展</p>
<p>客户端的读写路径得到了增强，可以并行处理块组中的多个内部块</p>
</li>
<li>
<p>Datanode扩展</p>
<p>DataNode运行一个附加的ErasureCodingWorker（ECWorker）任务，以对失败的纠删编码块进行后台恢复。 NameNode检测到失败的EC块，然后NameNode选择一个DataNode进行恢复工作。</p>
</li>
<li>
<p>纠删编码策略</p>
<p>为了适应异构的工作负载，允许HDFS群集中的文件和目录具有不同的复制和纠删码策略。纠删码策略封装了如何对文件进行编码/解码。默认情况下启用<code v-pre>RS-6-3-1024k</code>策略， RS表示编码器算法Reed-Solomon，6 、3中表示数据块和奇偶校验块的数量，1024k表示条带化单元的大小。</p>
<p>目录上还支持默认的REPLICATION方案。它只能在目录上设置，以强制目录采用3倍复制方案，而不继承其祖先的纠删码策略。此策略可以使3x复制方案目录与纠删码目录交错。REPLICATION始终处于启用状态。</p>
<p>此外也支持用户通过XML文件定义自己的EC策略，Hadoop conf目录中有一个名为<code v-pre>user_ec_policies.xml.template</code>的示例EC策略XML文件，用户可以参考该文件。</p>
</li>
<li>
<p>Intel ISA-L</p>
<p>英特尔ISA-L代表英特尔智能存储加速库。 加速纠删码的编码和解码。</p>
</li>
</ul>
<p><strong>EC编码部署方式</strong></p>
<ul>
<li>
<p>集群和硬件配置</p>
<p>编码和解码工作会消耗HDFS客户端和DataNode上的额外<strong>CPU</strong>。</p>
<p>纠删码文件也分布在整个机架上，以实现机架容错。这意味着在读写条带化文件时，大多数操作都是在机架上进行的。因此，<strong>网络带宽</strong>也非常重要。</p>
<p>对于机架容错，拥有<strong>足够数量的机架</strong>也很重要，每个机架所容纳的块数不超过EC奇偶校验块的数。机架数量=（数据块+奇偶校验块）/奇偶校验块后取整。</p>
<p>比如对于EC策略RS（6,3），这意味着最少3个机架（由（6 + 3）/ 3 = 3计算），理想情况下为9个或更多，以处理计划内和计划外的停机。对于机架数少于奇偶校验单元数的群集，HDFS无法维持机架容错能力，但仍将尝试在多个节点之间分布条带化文件以保留节点级容错能力。因此，建议设置具有类似数量的DataNode的机架。</p>
</li>
<li>
<p>纠删码策略设置</p>
<p>纠删码策略由参数<code v-pre>dfs.namenode.ec.system.default.policy</code>指定，<strong>默认是</strong> <code v-pre>RS-6-3-1024k</code>，其他策略默认是禁用的。</p>
<p>可以通过<code v-pre>hdfs ec [-enablePolicy -policy &lt;policyName&gt;]</code>命令启用策略集。</p>
</li>
<li>
<p>启用ISA-L（见下方）</p>
</li>
<li>
<p>EC命令</p>
<p><code v-pre>hdfs ec</code></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>-setPolicy <span class="token parameter variable">-path</span> <span class="token operator">&lt;</span>path<span class="token operator">></span> <span class="token punctuation">[</span>-policy <span class="token operator">&lt;</span>policy<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>-replicate<span class="token punctuation">]</span><span class="token punctuation">]</span>	
<span class="token comment">#在指定路径的目录上设置擦除编码策略。	</span>
<span class="token comment">#path：HDFS中的目录。这是必填参数。设置策略仅影响新创建的文件，而不影响现有文件。	</span>
<span class="token comment">#policy：用于此目录下文件的擦除编码策略。默认RS-6-3-1024k策略。	</span>
<span class="token comment">#-replicate在目录上应用默认的REPLICATION方案，强制目录采用3x复制方案。replicate和-policy &lt;policy>是可	选参数。不能同时指定它们。</span>
<span class="token punctuation">[</span>-getPolicy <span class="token parameter variable">-path</span> <span class="token operator">&lt;</span> path <span class="token operator">></span><span class="token punctuation">]</span> 	
<span class="token comment">#获取指定路径下文件或目录的擦除编码策略的详细信息。</span>
<span class="token punctuation">[</span>-unsetPolicy <span class="token parameter variable">-path</span> <span class="token operator">&lt;</span> path <span class="token operator">></span><span class="token punctuation">]</span> 	
<span class="token comment">#取消设置先前对目录上的setPolicy的调用所设置的擦除编码策略。如果该目录从祖先目录继承了擦除编码策略，则unsetPolicy是no-op。在没有显式策略集的目录上取消策略将不会返回错误。</span>
<span class="token punctuation">[</span>-listPolicies<span class="token punctuation">]</span>	
<span class="token comment">#列出在HDFS中注册的所有（启用，禁用和删除）擦除编码策略。只有启用的策略才适合与setPolicy命令一起使用。</span>
<span class="token punctuation">[</span>-addPolicies <span class="token parameter variable">-policyFile</span> <span class="token operator">&lt;</span>文件<span class="token operator">></span><span class="token punctuation">]</span>	
<span class="token comment">#添加用户定义的擦除编码策略列表。[-listCodecs]	</span>
<span class="token comment">#获取系统中支持的擦除编码编解码器和编码器的列表。</span>
<span class="token punctuation">[</span>-removePolicy <span class="token parameter variable">-policy</span> <span class="token operator">&lt;</span>policyName<span class="token operator">></span><span class="token punctuation">]</span>	
<span class="token comment">#删除用户定义的擦除编码策略。</span>
<span class="token punctuation">[</span>-enablePolicy <span class="token parameter variable">-policy</span> <span class="token operator">&lt;</span>policyName<span class="token operator">></span><span class="token punctuation">]</span>	
<span class="token comment">#启用擦除编码策略。[-disablePolicy -policy &lt;policyName>]	</span>
<span class="token comment">#禁用擦除编码策略。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h4 id="hadoop纠删码算法启用isa-l加速库" tabindex="-1"><a class="header-anchor" href="#hadoop纠删码算法启用isa-l加速库" aria-hidden="true">#</a> Hadoop纠删码算法启用ISA-L加速库</h4>
<p><strong>版本</strong></p>
<table>
<thead>
<tr>
<th>软件</th>
<th>版本</th>
</tr>
</thead>
<tbody>
<tr>
<td>Hadoop</td>
<td>3.1.4</td>
</tr>
<tr>
<td><a href="https://github.com/intel/isa-l/releases" target="_blank" rel="noopener noreferrer">isa-l<ExternalLinkIcon/></a></td>
<td>2.28.0</td>
</tr>
<tr>
<td><a href="https://www.nasm.us/pub/nasm/releasebuilds/2.14.02/" target="_blank" rel="noopener noreferrer">nasm<ExternalLinkIcon/></a></td>
<td>2.14.02</td>
</tr>
<tr>
<td>yasm</td>
<td>1.2.0</td>
</tr>
</tbody>
</table>
<p><strong>1、安装yasm和nasm</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#在Hadoop集群所有节点上安装yasm和nasm。</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yasm
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nasm


<span class="token comment">#注意：isa-l-2.28.0对nasm和yasm有版本要求，低版本在安装时会报错。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2、编译安装isa-l-2.28.0</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#在Hadoop集群所有节点上编译安装isa-l-2.28.0。</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> isa-l-2.28.0.tar.gz
<span class="token builtin class-name">cd</span> isa-l-2.28.0
./autogen.sh
./configure <span class="token parameter variable">--prefix</span><span class="token operator">=</span>/usr <span class="token parameter variable">--libdir</span><span class="token operator">=</span>/usr/lib64
<span class="token function">make</span>
<span class="token function">make</span> <span class="token function">install</span>
 
<span class="token function">make</span> <span class="token parameter variable">-f</span> Makefile.unx


<span class="token comment">#检查libisal.so*是否成功</span>
ll /lib64/libisal.so*
 
<span class="token comment">############如果有，则跳过##############</span>
<span class="token comment">############如果没有有，则复制##############</span>
<span class="token function">cp</span> bin/libisal.so bin/libisal.so.2 /lib64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3、Hadoop上检查是否启用isa-l</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Native library checking:
hadoop:  <span class="token boolean">true</span> /usr/hdp/3.0.0.0-1634/hadoop/lib/native/libhadoop.so.1.0.0
zlib:    <span class="token boolean">true</span> /lib64/libz.so.1
zstd  <span class="token builtin class-name">:</span>  <span class="token boolean">false</span>
snappy:  <span class="token boolean">true</span> /usr/hdp/3.0.0.0-1634/hadoop/lib/native/libsnappy.so.1
lz4:     <span class="token boolean">true</span> revision:10301
bzip2:   <span class="token boolean">true</span> /lib64/libbz2.so.1
openssl: <span class="token boolean">true</span> /lib64/libcrypto.so
ISA-L:   <span class="token boolean">true</span> /lib64/libisal.so.2     -------------<span class="token operator">></span>  Shows that ISA-L is loaded.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-hdfs动态节点管理" tabindex="-1"><a class="header-anchor" href="#_4-hdfs动态节点管理" aria-hidden="true">#</a> 4. HDFS动态节点管理</h2>
<h3 id="_4-1-节点扩容" tabindex="-1"><a class="header-anchor" href="#_4-1-节点扩容" aria-hidden="true">#</a> 4.1. 节点扩容</h3>
<blockquote>
<p>已有HDFS集群容量已不能满足存储数据的需求，需要在原有集群基础上动态添加新的DataNode节点。</p>
</blockquote>
<ol>
<li>
<p>新机器基础环境准备</p>
<ol>
<li>
<p>主机名、IP</p>
<p><code v-pre>vim /etc/sysconfig/network-scripts/ifcfg-ens33</code></p>
<p>设置<code v-pre>IPADDR</code></p>
<p><code v-pre>vim /etc/hostname</code></p>
<p>设置<code v-pre>node4</code></p>
</li>
<li>
<p>Hosts映射</p>
<p><code v-pre>vim /etc/hosts</code></p>
<p>设置IPADDR与Hostname之间的映射</p>
</li>
<li>
<p>防火墙、时间同步</p>
<p><code v-pre>systemctl stop firewalld.service</code>：关闭当下</p>
<p><code v-pre>systemctl disable firewalld.service</code>：永久关闭</p>
<p><code v-pre>ntpdate ntp4.aliyun.com</code>：时间同步</p>
</li>
<li>
<p>SSH免密登录</p>
<p><code v-pre>[root@node1 ~]# ssh -copy-id node4</code>：复制公钥到新机器</p>
</li>
<li>
<p>JDK环境</p>
</li>
</ol>
</li>
<li>
<p>Hadoop配置</p>
<ol>
<li>
<p>修改workers配置文件，方便一键启停</p>
<p><code v-pre>vim /export/server/hadoop-3.1.4/etc/hadoop/workers</code></p>
</li>
<li>
<p>从namenode节点复制hadoop安装包到新节点，注意不包括hadoop.tmp.dir指定的数据存储目录</p>
<p><code v-pre>[root@node1 server]# scp -r hadoop-3.1.4 node4:$PWD</code></p>
</li>
<li>
<p>新机器上配置hadoop环境变量</p>
<p><code v-pre>vim /etc/profile</code>，可以将Namenode 的profile文件拷贝到node4</p>
<p><strong>注意需要创建短路本地读取的文件夹，否则会报错，具体报错可以去logs里面查看</strong></p>
</li>
</ol>
</li>
<li>
<p>手动启动DataNode进程</p>
<p><code v-pre>hdfs --daemon start datanode</code></p>
<p>具体是否启动可以去Web页面查看，或者jps命令获取相关进程</p>
</li>
<li>
<p>DataNode负载均衡服务</p>
<p><code v-pre>hdfs dfsadmin -setBalancerBandwidth 104857600</code>：设置负载均衡的带宽</p>
<p><code v-pre>hdfs balancer -threshold 5</code>：设置偏差为5%</p>
</li>
</ol>
<h3 id="_4-2-动态缩容" tabindex="-1"><a class="header-anchor" href="#_4-2-动态缩容" aria-hidden="true">#</a> 4.2. 动态缩容</h3>
<blockquote>
<p>服务器需要进行退役更换，需要在当下的集群中停止某些机器上datanode的服务</p>
</blockquote>
<ol>
<li>
<p>添加退役节点（该操作node2，node3不需要参与，即不需要拷贝该文件）</p>
<p>在<strong>namenode机器</strong>的<code v-pre>hdfs-site.xml</code>中配置<code v-pre>dfs.hosts.exclude</code>属性（<strong>黑名单</strong>）</p>
<div class="language-properties line-numbers-mode" data-ext="properties"><pre v-pre class="language-properties"><code>&lt;property>
	&lt;name>dfs.hosts.exclude&lt;/name>
    &lt;value>/export/server/hadoop-3.1.4/etc/hadoop/excludes&lt;/value>
&lt;/property>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>excludes文件中的节点就是被禁止的节点</p>
<p>该属性（<code v-pre>dfs.hosts.exclude</code>）需要在namenode启动前配置，否则只能重启机器</p>
<p><strong>当副本为3，服役的节点也是3，则不能退役成功</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>// excludes
node4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>刷新集群</p>
<p><code v-pre>[root@node1 ~]# hdfs dfsadmin -refreshNodes</code>等待节点迁移数据后退役</p>
</li>
<li>
<p>手动关闭DataNode进程</p>
<p><code v-pre>[root@node4 ~]# hdfs --daemon stop datanode</code></p>
</li>
<li>
<p>DataNode负载均衡服务</p>
<p><code v-pre>hdfs balancer -threshold 5</code></p>
</li>
</ol>
<h3 id="_4-3-黑白名单机制" tabindex="-1"><a class="header-anchor" href="#_4-3-黑白名单机制" aria-hidden="true">#</a> 4.3. 黑白名单机制</h3>
<p><strong>白名单</strong></p>
<ul>
<li>允许哪些机器加入到当前的HDFS集群中，是一种准入机制</li>
<li>由<code v-pre>dfs.hosts</code>参数指定，该参数位于<code v-pre>hdfs-site.xml</code>。默认值为空</li>
<li><code v-pre>dfs.hosts</code>指向文件，该文件包含允许连接到namenode的主机列表。必须指定文件的完整路径名。如果该值为空，则允许所有主机准入。</li>
</ul>
<p><strong>黑名单</strong></p>
<ul>
<li>禁止哪些机器加入到当前的HDFS集群中，是一种禁入机制。</li>
<li>由<code v-pre>dfs.hosts.exclude</code>参数指定，该参数位于<code v-pre>hdfs-site.xml</code>。默认值为空。</li>
<li><code v-pre>dfs.hosts.exclude</code>指向文件，该文件包含不允许连接到名称节点的主机列表。必须指定文件的完整路径名。如果该值为空，则不禁止任何主机加入。</li>
</ul>
<h2 id="_5-hdfs-ha高可用" tabindex="-1"><a class="header-anchor" href="#_5-hdfs-ha高可用" aria-hidden="true">#</a> 5. HDFS HA高可用</h2>
<h3 id="_5-1-背景知识" tabindex="-1"><a class="header-anchor" href="#_5-1-背景知识" aria-hidden="true">#</a> 5.1 背景知识</h3>
<p><strong>单点故障</strong>（single point of failure SPOF），系统中某个点故障，导致整个系统不可用</p>
<p><strong>解决单点故障</strong></p>
<blockquote>
<p>目的是为了让故障对业务的影响最小，而不是让故障用不发生</p>
</blockquote>
<p>给单点故障设置备份，形成主备架构</p>
<p><strong>集群可用性评判标准</strong>（x个9）</p>
<p>X个9表示在系统1年时间的使用过程中，系统可以正常使用时间与总时间（1年）之比</p>
<p>比如4个9：(1-99.99%)<em>365</em>24=0.876小时=52.6分钟，表示该系统在连续运行1年时间里最多可能的业务中断时间是52.6分钟</p>
<p>9越多，系统的可靠性越强，能够容忍的业务中断时间越少，但是要付出的成本更高</p>
<p><strong>HA系统设计核心问题</strong></p>
<blockquote>
<p>对于HA的解决方案，都要考虑到这两点</p>
</blockquote>
<ul>
<li>
<p>脑裂问题</p>
<p>集群无主：都认为对方状态是好的，自己是备份角色，后果是无服务</p>
<p>集群多主：都是为对方是故障的， 自己是主角色，导致系统混乱，数据损坏。</p>
<p><strong>为此，保持任意时刻系统有且只有一个主角色提供服务</strong></p>
</li>
<li>
<p>数据状态同步问题</p>
<p>主备节点之间，数据状态不同步</p>
<p>为此，可以采用<strong>日志重演操作记录</strong>，让从角色通过主角色的修改日志记录重演修改操作</p>
</li>
</ul>
<h3 id="_5-2-namenode单点故障问题" tabindex="-1"><a class="header-anchor" href="#_5-2-namenode单点故障问题" aria-hidden="true">#</a> 5.2 NameNode单点故障问题</h3>
<blockquote>
<p>HDFS的单点故障问题指的是NameNode单点故障。对于DataNode出现了故障，因为有冗余副本存储或者EC编码技术，当某个DataNode出现问题时，并不影响整体系统的运行。若NameNode出现了故障，则整个集群不可用，就像删除了索引，虽然有文件，但是找不到问题的具体存放位置。</p>
</blockquote>
<p>解决方法：在同一群集中运行两个（从3.0.0起，支持超过两个）冗余NameNode。形成主备架构。</p>
<h3 id="_5-3-hdfs-ha解决方案-qjm" tabindex="-1"><a class="header-anchor" href="#_5-3-hdfs-ha解决方案-qjm" aria-hidden="true">#</a> 5.3 HDFS HA解决方案--QJM</h3>
<blockquote>
<p>QJM全称Quorum Journal Manager（仲裁日志管理器），是Hadoop官方推荐的HDFS HA解决方案之一</p>
</blockquote>
<ul>
<li>使用zookeeper中ZKFC来实现主备切换；（解决脑裂问题）</li>
<li>使用Journal Node（JN）集群实现edits log的共享以达到数据同步的目的。（解决数据同步问题）</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251614240.png" alt="image-20210721173527315" tabindex="0" loading="lazy"><figcaption>image-20210721173527315</figcaption></figure>
<h4 id="zk-failover-controller-zkfc" tabindex="-1"><a class="header-anchor" href="#zk-failover-controller-zkfc" aria-hidden="true">#</a> ZK Failover Controller（ZKFC）</h4>
<blockquote>
<p>监视和管理NameNode健康状态</p>
</blockquote>
<p>维持和ZK群联系：</p>
<p>如果本地NameNode运行状况良好，并且ZKFC看到当前没有其他节点持有锁znode，它将自己尝试获取该锁。如果成功，则表明它“赢得了<strong>选举</strong>”，并负责运行故障转移以使其本地NameNode处于Active状态。如果已经有其他节点持有锁，zkfc选举失败，则会对该节点注册监听，等待下次继续选举。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251614684.png" alt="image-20210721173918912" tabindex="0" loading="lazy"><figcaption>image-20210721173918912</figcaption></figure>
<p><strong>脑裂问题的解决</strong></p>
<blockquote>
<p>通过Fencing机制来避免，将先前的Active节点隔离，然后将Standby转换为Active状态</p>
</blockquote>
<p>Hadoop对于Fencing提供了两种实现</p>
<ul>
<li>
<p>sshfench</p>
<p>通过ssh登录目标节点，使用命令fuser将进程杀死（通过tcp端口号定位进程pid，该方法比jps更准确）</p>
</li>
<li>
<p>shellfench</p>
</li>
</ul>
<h4 id="journal-node-jn" tabindex="-1"><a class="header-anchor" href="#journal-node-jn" aria-hidden="true">#</a> Journal Node（JN）</h4>
<blockquote>
<p>Journal Node（<strong>JN</strong>）集群是轻量级分布式系统，主要用于高速读写数据、存储数据</p>
</blockquote>
<ul>
<li>使用<strong>2N+1</strong>台JournalNode存储共享<strong>Edits Log</strong>（编辑日志）</li>
<li>任何修改操作在Active Node上进行，JN进程也会同时记录edits log到至少半数的JN中</li>
<li>Standby Node检测到JN 里面的同步log发生变化了会读取JN里面的edits log，然后重演操作记录同步到自己的目录镜像树里面。</li>
</ul>
<h2 id="_6-hdfs-federation联邦机制" tabindex="-1"><a class="header-anchor" href="#_6-hdfs-federation联邦机制" aria-hidden="true">#</a> 6. HDFS Federation联邦机制</h2>
<h3 id="_6-1-当前hdfs体系架构" tabindex="-1"><a class="header-anchor" href="#_6-1-当前hdfs体系架构" aria-hidden="true">#</a> 6.1 当前HDFS体系架构</h3>
<ul>
<li>命名空间：由文件，块和目录组成的统一抽象的目录树结构。</li>
<li>块存储层
<ul>
<li>**块管理：**NameNode执行块管理。块管理通过处理注册和定期心跳来提供DataNode群集成员身份。它处理块报告并支持与块相关的操作，如创建，删除，修改或获取块位置。它还维护块的位置，副本位置。为未复制的块管理块复制，并在已复制的块中删除。</li>
<li>**块存储：**DataNode通过在本地文件系统上存储块并提供读/写访问权限来管理存储空间。</li>
</ul>
</li>
</ul>
<p><strong>当前体系结构的弊端：</strong></p>
<ul>
<li>扩展困难</li>
<li>单个NameNode的吞吐量决定了集群的性能</li>
<li>集群占有组织之间没有隔离</li>
</ul>
<h3 id="_6-2-联邦federation架构" tabindex="-1"><a class="header-anchor" href="#_6-2-联邦federation架构" aria-hidden="true">#</a> 6.2 联邦Federation架构</h3>
<blockquote>
<p>Federation中文意思为联邦,联盟，是<strong>NameNode</strong>之间的<strong>Federation,<strong>也就是集群中会有多个</strong>NameNode</strong>。多个NameNode的情况意味着有多个namespace。注意，这区别于HA模式下的多NameNode，HA中它们是拥有着同一个namespace。</p>
<p>Federation体系中多个namenode之间相互独立且不需要互相协调，各自分工，管理自己的区域。每个DataNode要向集群中所有的namenode注册，且周期性地向所有namenode发送心跳和块报告，并执行来自所有namenode的命令。</p>
</blockquote>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251614383.png" alt="image-20210722132212837" tabindex="0" loading="lazy"><figcaption>image-20210722132212837</figcaption></figure>
<p><strong>优点</strong></p>
<ul>
<li>命名空间可伸缩性</li>
<li>提高集群性能</li>
<li>不同占有者组织之间对于NameNode是隔离的</li>
</ul>
<h2 id="_7-hdfs集群滚动升级" tabindex="-1"><a class="header-anchor" href="#_7-hdfs集群滚动升级" aria-hidden="true">#</a> 7. HDFS集群滚动升级</h2>
<blockquote>
<p>升级的时候依然向外提供服务。注意必须是HA集群，否则无法实现</p>
</blockquote>
<h2 id="_8-hdfs集群滚动降级" tabindex="-1"><a class="header-anchor" href="#_8-hdfs集群滚动降级" aria-hidden="true">#</a> 8. HDFS集群滚动降级</h2>
<h3 id="_8-1-降级和回滚的区别" tabindex="-1"><a class="header-anchor" href="#_8-1-降级和回滚的区别" aria-hidden="true">#</a> 8.1. 降级和回滚的区别</h3>
<p>共同点</p>
<ul>
<li>退回之前版本</li>
<li>在升级的finalize执行后，不允许再执行降级和回滚</li>
</ul>
<p>不同点</p>
<ul>
<li>降级可以滚动降级，不需要停机，回滚需要停机</li>
<li>降级会保留现有的数据状态，回滚不会</li>
</ul>
</div></template>


