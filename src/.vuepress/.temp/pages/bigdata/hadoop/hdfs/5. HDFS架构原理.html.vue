<template><div><h2 id="_1-hdfs架构剖析" tabindex="-1"><a class="header-anchor" href="#_1-hdfs架构剖析" aria-hidden="true">#</a> 1. HDFS架构剖析</h2>
<p>略</p>
<h2 id="_2-hdfs-web-interfaces" tabindex="-1"><a class="header-anchor" href="#_2-hdfs-web-interfaces" aria-hidden="true">#</a> 2. HDFS Web Interfaces</h2>
<p>略</p>
<h2 id="_3-hdfs读写流程" tabindex="-1"><a class="header-anchor" href="#_3-hdfs读写流程" aria-hidden="true">#</a> 3. HDFS读写流程</h2>
<h3 id="_3-1-hdfs写数据流程" tabindex="-1"><a class="header-anchor" href="#_3-1-hdfs写数据流程" aria-hidden="true">#</a> 3.1 HDFS写数据流程</h3>
<h4 id="pipeline管道" tabindex="-1"><a class="header-anchor" href="#pipeline管道" aria-hidden="true">#</a> Pipeline管道</h4>
<blockquote>
<p>客户端将数据块写入第一个数据节点，第一个数据节点保存数据之后再将块复制到第二个数据节点，后者保存后将其复制到第三个数据节点</p>
</blockquote>
<p><strong>为什么datanode之间采用pipeline线性传输，而不是一次给三个datanode拓扑式传输呢？</strong></p>
<p>因为数据以管道的方式，顺序的沿着一个方向传输，这样能够充分利用每个机器的带宽，避免网络瓶颈和高延迟时的连接，最小化推送所有数据的延时。在线性推送模式下，每台机器所有的出口宽带都用于以最快的速度传输数据，而不是在多个接受者之间分配宽带。</p>
<h4 id="ack应答响应" tabindex="-1"><a class="header-anchor" href="#ack应答响应" aria-hidden="true">#</a> ACK应答响应</h4>
<blockquote>
<p>ACK (Acknowledge character）即是确认字符，在数据通信中，接收方发给发送方的一种传输类控制字符。表示发来的数据已确认接收无误。</p>
</blockquote>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251615435.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="默认三副本存储策略" tabindex="-1"><a class="header-anchor" href="#默认三副本存储策略" aria-hidden="true">#</a> 默认三副本存储策略</h4>
<blockquote>
<p>默认副本存储策略是由BlockPlacementPolicyDefault指定</p>
</blockquote>
<ul>
<li>
<p>第一块副本：客户端就是一个datanode的话优先客户端本地，否则随机</p>
</li>
<li>
<p>第二块副本：不同于第一块副本的不同机架。</p>
</li>
<li>
<p>第三块副本：第二块副本相同机架不同机器。</p>
</li>
</ul>
<h4 id="写流程" tabindex="-1"><a class="header-anchor" href="#写流程" aria-hidden="true">#</a> 写流程</h4>
<ol>
<li>HDFS客户端创建FileSystem对象实例<strong>DistributedFileSystem</strong>， FileSystem封装了与文件系统操作的相关方法。</li>
<li>调用DistributedFileSystem对象的create()方法，通过<strong>RPC请求</strong>NameNode创建文件。NameNode执行各种检查判断：目标文件是否存在、父目录是否存在、客户端是否具有创建该文件的权限。检查通过NameNode就会为本次请求记下一条记录，返回FSDataOutputStream输出流对象给客户端用于写数据。</li>
<li>客户端通过FSDataOutputStream开始写入数据。<strong>FSDataOutputStream是DFSOutputStream包装类</strong>。</li>
<li>客户端写入数据时，DFSOutputStream将数据分成一个个数据包（<strong>packet</strong> <strong>默认64k</strong>）,并写入一个内部数据队列（<strong>data queue</strong>）。<strong>（DFSOutputStream有一个内部类做DataStreamer，用于请求NameNode挑选出适合存储数据副本的一组DataNode，默认是3副本存储。DataStreamer将数据包流式传输到pipeline的第一个DataNode,该DataNode存储数据包并将它发送到pipeline的第二个DataNode。同样，第二个DataNode存储数据包并且发送给第三个（也是最后一个）DataNode。）</strong></li>
<li>DFSOutputStream也维护着一个内部数据包队列来等待DataNode的收到确认回执，称之为确认队列（<strong>ack</strong> <strong>queue</strong>）,收到pipeline中所有DataNode确认信息后，该数据包才会从确认队列删除。</li>
<li>客户端完成数据写入后，在FSDataOutputStream输出流上调用close()方法关闭。</li>
<li>DistributedFileSystem联系NameNode告知其文件写入完成，等待NameNode确认。因为namenode已经知道文件由哪些块组成（DataStream请求分配数据块），因此仅需等待最小复制块即可成功返回。<strong>（最小复制是由参数dfs.namenode.replication.min指定，默认是1）</strong></li>
</ol>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251615700.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_3-2-hdfs读数据流程" tabindex="-1"><a class="header-anchor" href="#_3-2-hdfs读数据流程" aria-hidden="true">#</a> 3.2 HDFS读数据流程</h3>
<ol>
<li>
<p>HDFS客户端创建FileSystem对象实例DistributedFileSystem， FileSystem封装了与文件系统操作的相关方法。调用DistributedFileSystem对象的open()方法来打开希望读取的文件。</p>
</li>
<li>
<p>DistributedFileSystem使用RPC调用namenode来确定<strong>文件中前几个块的块位置（分批次读取）信息</strong>。</p>
<p>对于每个块，namenode返回具有该块所有副本的datanode位置地址列表，并且该地址列表是排序好的，与客户端的网络拓扑距离近的排序靠前。</p>
</li>
<li>
<p>DistributedFileSystem将FSDataInputStream输入流返回到客户端以供其读取数据。FSDataInputStream类是DFSInputStream类的包装。</p>
</li>
<li>
<p>客户端在FSDataInputStream输入流上调用read()方法。然后，已存储DataNode地址的DFSInputStream连接到文件中第一个块的最近的DataNode。数据从DataNode流回客户端，结果客户端可以在流上重复调用read（）。</p>
</li>
<li>
<p>当该块结束时，DFSInputStream将关闭与DataNode的连接，然后寻找下一个块的最佳datanode。这些操作对用户来说是透明的。所以用户感觉起来它一直在读取一个连续的流。客户端从流中读取数据时，也会根据需要询问NameNode来<strong>检索下一批数据块的DataNode位置信息。</strong></p>
</li>
<li>
<p>一旦客户端完成读取，就对FSDataInputStream调用close()方法。</p>
</li>
</ol>
<h3 id="_3-3-hdfs集群角色职责" tabindex="-1"><a class="header-anchor" href="#_3-3-hdfs集群角色职责" aria-hidden="true">#</a> 3.3 HDFS集群角色职责</h3>
<p><strong>NameNode职责</strong></p>
<ul>
<li>
<p>NameNode是HDFS的核心，集群的主角色，被称为Master。</p>
</li>
<li>
<p>NameNode仅存储管理HDFS的元数据：文件系统namespace操作维护目录树，文件和块的位置信息。</p>
</li>
<li>
<p>NameNode不存储实际数据或数据集。数据本身实际存储在DataNodes中。</p>
</li>
<li>
<p>NameNode知道HDFS中任何给定文件的块列表及其位置。使用此信息NameNode知道如何从块中构建文件。</p>
</li>
<li>
<p>NameNode并不持久化存储每个文件中各个块所在的DataNode的位置信息，这些信息会在系统启动时从DataNode汇报中重建。</p>
</li>
<li>
<p>NameNode对于HDFS至关重要，当NameNode关闭时，HDFS / Hadoop集群无法访问。</p>
</li>
<li>
<p>NameNode是Hadoop集群中的单点故障。</p>
</li>
<li>
<p>NameNode所在机器通常会配置有大量内存（RAM）。</p>
</li>
</ul>
<p><strong>DataNode职责</strong></p>
<ul>
<li>
<p>DataNode负责将实际数据存储在HDFS中。是集群的从角色，被称为Slave。</p>
</li>
<li>
<p>DataNode启动时，它将自己发布到NameNode并汇报自己负责持有的块列表。</p>
</li>
<li>
<p>根据NameNode的指令，执行块的创建、复制、删除操作。</p>
</li>
<li>
<p>DataNode会定期（dfs.heartbeat.interval配置项配置，默认是3秒）向NameNode发送心跳，如果NameNode长时间没有接受到DataNode发送的心跳， NameNode就会认为该DataNode失效。</p>
</li>
<li>
<p>DataNode会定期向NameNode进行自己持有的数据块信息汇报，汇报时间间隔取参数dfs.blockreport.intervalMsec,参数未配置的话默认为6小时.</p>
</li>
<li>
<p>DataNode所在机器通常配置有大量的硬盘空间。因为实际数据存储在DataNode中。</p>
</li>
</ul>
<h2 id="_4-namenode元数据管理" tabindex="-1"><a class="header-anchor" href="#_4-namenode元数据管理" aria-hidden="true">#</a> 4. NameNode元数据管理</h2>
<h3 id="_4-1-元数据管理综述" tabindex="-1"><a class="header-anchor" href="#_4-1-元数据管理综述" aria-hidden="true">#</a> 4.1 元数据管理综述</h3>
<p><strong>元数据类型</strong></p>
<ul>
<li><strong>文件自身属性信息</strong>：文件名称、权限，修改时间，文件大小，复制因子，数据块大小。</li>
<li><strong>文件块位置映射信息</strong>：记录文件块和DataNode之间的映射信息，即哪个块位于哪个节点上。</li>
</ul>
<p><strong>元数据按存储形式分类</strong></p>
<ul>
<li>内存元数据</li>
<li>元数据文件
<ul>
<li>fsimage内存镜像文件</li>
<li>Edits log编辑日志</li>
</ul>
</li>
</ul>
<h2 id="_5-hdfs小文件解决方案" tabindex="-1"><a class="header-anchor" href="#_5-hdfs小文件解决方案" aria-hidden="true">#</a> 5. HDFS小文件解决方案</h2>
<p>通过下述实现：</p>
<ul>
<li>Hadoop Archive文件归档</li>
<li>Sequence File序列化文件</li>
</ul>
</div></template>


