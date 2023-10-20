<template><div><p><strong>目录</strong></p>
<nav class="table-of-contents"><ul><li><router-link to="#kafka简介">Kafka简介</router-link><ul><li><router-link to="#消息队列">消息队列</router-link></li><li><router-link to="#kafka的应用场景">Kafka的应用场景</router-link></li><li><router-link to="#消息队列的两种模型">消息队列的两种模型</router-link></li></ul></li><li><router-link to="#kafka-环境搭建">Kafka 环境搭建</router-link><ul><li><router-link to="#搭建-kafka-环境">搭建 Kafka 环境</router-link></li><li><router-link to="#目录结构分析">目录结构分析</router-link></li></ul></li><li><router-link to="#基础操作">基础操作</router-link><ul><li><router-link to="#创建topic">创建topic</router-link></li><li><router-link to="#生产消息到kafka">生产消息到Kafka</router-link></li><li><router-link to="#从kafka消费消息">从Kafka消费消息</router-link></li><li><router-link to="#kafka-tool">Kafka Tool</router-link></li></ul></li><li><router-link to="#kafka基准测试">Kafka基准测试</router-link><ul><li><router-link to="#创建topic-1">创建topic</router-link></li><li><router-link to="#生产消息基准测试">生产消息基准测试</router-link></li></ul></li><li><router-link to="#kafka-java-api开发">Kafka Java API开发</router-link><ul><li><router-link to="#生产者程序开发">生产者程序开发</router-link></li><li><router-link to="#消费者程序开发">消费者程序开发</router-link></li><li><router-link to="#生产者使用异步方式生产消息">生产者使用异步方式生产消息</router-link></li></ul></li><li><router-link to="#kafka中的重要概念">Kafka中的重要概念</router-link></li><li><router-link to="#幂等性">幂等性</router-link><ul><li><router-link to="#配置幂等性">配置幂等性</router-link></li><li><router-link to="#幂等性原理">幂等性原理</router-link></li></ul></li><li><router-link to="#kafka中的分区副本机制">Kafka中的分区副本机制</router-link><ul><li><router-link to="#生产者的分区写入策略">生产者的分区写入策略</router-link></li><li><router-link to="#消费组-rebalance-机制">消费组 Rebalance 机制</router-link></li><li><router-link to="#消费者的分区分配策略">消费者的分区分配策略</router-link></li><li><router-link to="#副本的ack机制">副本的ACK机制</router-link></li></ul></li><li><router-link to="#kafka-eagle">Kafka-Eagle</router-link><ul><li><router-link to="#开启-jmx-端口">开启 JMX 端口</router-link></li><li><router-link to="#安装kafka-eagle">安装Kafka-Eagle</router-link></li></ul></li><li><router-link to="#kafka原理-todo">Kafka原理（TODO）</router-link><ul><li><router-link to="#leader和follower">leader和follower</router-link></li><li><router-link to="#ar-isr-osr">AR\ISR\OSR</router-link></li><li><router-link to="#leader选举">leader选举</router-link></li><li><router-link to="#kafka读写流程">Kafka读写流程</router-link></li><li><router-link to="#kafka的物理存储">Kafka的物理存储</router-link></li><li><router-link to="#消息传递的语义性">消息传递的语义性</router-link></li><li><router-link to="#kafka的消息不丢失">Kafka的消息不丢失</router-link></li><li><router-link to="#数据积压">数据积压</router-link></li><li><router-link to="#数据清理-配额限速">数据清理&amp;配额限速</router-link></li></ul></li></ul></nav>
<!--more-->
<h2 id="kafka简介" tabindex="-1"><a class="header-anchor" href="#kafka简介" aria-hidden="true">#</a> Kafka简介</h2>
<h3 id="消息队列" tabindex="-1"><a class="header-anchor" href="#消息队列" aria-hidden="true">#</a> 消息队列</h3>
<ul>
<li>消息队列——用于存放消息的组件</li>
<li>程序员可以将消息放入到队列中，也可以从消息队列中获取消息</li>
<li>很多时候消息队列不是一个永久性的存储，是作为临时存储存在的（设定一个期限：设置消息在MQ中保存10天）</li>
<li>消息队列中间件：消息队列的组件，例如：Kafka、Active MQ、RabbitMQ、RocketMQ、ZeroMQ</li>
</ul>
<h3 id="kafka的应用场景" tabindex="-1"><a class="header-anchor" href="#kafka的应用场景" aria-hidden="true">#</a> Kafka的应用场景</h3>
<ul>
<li>异步处理
<ul>
<li>可以将一些比较耗时的操作放在其他系统中，通过消息队列将需要进行处理的消息进行存储，其他系统可以消费消息队列中的数据</li>
<li>比较常见的：发送短信验证码、发送邮件（可以用此对之前Redis用户注册部分进行改进）</li>
</ul>
</li>
</ul>
<figure><img src="https://124.71.187.148/images/kafka/image-20200916093856262.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>系统解耦
<ul>
<li>原先一个微服务是通过接口（HTTP）调用另一个微服务，这时候耦合很严重，只要接口发生变化就会导致系统不可用</li>
<li>使用消息队列可以将系统进行解耦合，现在第一个微服务可以将消息放入到消息队列中，另一个微服务可以从消息队列中把消息取出来进行处理。进行系统解耦</li>
</ul>
</li>
</ul>
<figure><img src="https://124.71.187.148/images/kafka/image-20200916093908261.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>流量削峰
<ul>
<li>因为消息队列是低延迟、高可靠、高吞吐的，可以应对大量并发</li>
</ul>
</li>
</ul>
<figure><img src="https://124.71.187.148/images/kafka/image-20200916093919754.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>日志处理
<ul>
<li>可以使用消息队列作为临时存储，或者一种通信管道</li>
</ul>
</li>
</ul>
<figure><img src="https://124.71.187.148/images/kafka/image-20200916093933994.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="消息队列的两种模型" tabindex="-1"><a class="header-anchor" href="#消息队列的两种模型" aria-hidden="true">#</a> 消息队列的两种模型</h3>
<ul>
<li>
<p>生产者、消费者模型</p>
<ul>
<li>生产者负责将消息生产到MQ中</li>
<li>消费者负责从MQ中获取消息</li>
<li>生产者和消费者是解耦的，可能是生产者一个程序、消费者是另外一个程序</li>
</ul>
</li>
<li>
<p>消息队列的模式</p>
<ul>
<li>
<p>点对点：一个消费者消费一个消息</p>
<figure><img src="https://124.71.187.148/images/kafka/image-202310171449000001.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</li>
<li>
<p>发布订阅：多个消费者可以消费一个消息</p>
<figure><img src="https://124.71.187.148/images/kafka/image-202310171449000002.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</li>
</ul>
</li>
</ul>
<h2 id="kafka-环境搭建" tabindex="-1"><a class="header-anchor" href="#kafka-环境搭建" aria-hidden="true">#</a> Kafka 环境搭建</h2>
<h3 id="搭建-kafka-环境" tabindex="-1"><a class="header-anchor" href="#搭建-kafka-环境" aria-hidden="true">#</a> 搭建 Kafka 环境</h3>
<ol>
<li>
<p>将 Kafka 的安装包上传到虚拟机，并解压</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /export/software/
<span class="token function">tar</span> <span class="token parameter variable">-xvzf</span> kafka_2.12-2.4.1.tgz <span class="token parameter variable">-C</span> <span class="token punctuation">..</span>/server/
<span class="token builtin class-name">cd</span> /export/server/kafka_2.12-2.4.1/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>修改 server.properties</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /export/server/kafka_2.12-2.4.1/config
<span class="token function">vim</span> server.properties
<span class="token comment"># 指定broker的id</span>
<span class="token assign-left variable">broker.id</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token comment"># 指定Kafka数据的位置</span>
<span class="token assign-left variable">log.dirs</span><span class="token operator">=</span>/export/server/kafka_2.12-2.4.1/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>配置 KAFKA_HOME 环境变量</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/profile
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KAFKA_HOME</span><span class="token operator">=</span>/export/server/kafka_2.12-2.4.1
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>:<span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">${KAFKA_HOME}</span>

每个节点加载环境变量
<span class="token builtin class-name">source</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>启动服务器</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 启动ZooKeeper</span>
<span class="token function">nohup</span> bin/zookeeper-server-start.sh config/zookeeper.properties <span class="token operator">&amp;</span>
<span class="token comment"># 启动Kafka</span>
<span class="token builtin class-name">cd</span> /export/server/kafka_2.12-2.4.1
<span class="token function">nohup</span> bin/kafka-server-start.sh config/server.properties <span class="token operator">&amp;</span>
<span class="token comment"># 测试Kafka集群是否启动成功</span>
bin/kafka-topics.sh --bootstrap-server localhost:9092 <span class="token parameter variable">--list</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>注意：</p>
<ul>
<li><a href="http://xn--Kafkabroker-km8q8qj8rfl7gr9vai9sx0xu85cqi3au36anw1a.id" target="_blank" rel="noopener noreferrer">每一个Kafka的节点都需要修改broker.id<ExternalLinkIcon/></a>（每个节点的标识，不能重复）</li>
<li>log.dir数据存储目录需要配置</li>
<li>Kafka集群是必须要有ZooKeeper的</li>
</ul>
<h3 id="目录结构分析" tabindex="-1"><a class="header-anchor" href="#目录结构分析" aria-hidden="true">#</a> 目录结构分析</h3>
<table>
<thead>
<tr>
<th>目录名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>bin</td>
<td>Kafka 的所有执行脚本都在这里。例如：启动 Kafka 服务器、创建 Topic、生产者、消费者程序等等</td>
</tr>
<tr>
<td>config</td>
<td>Kafka 的所有配置文件</td>
</tr>
<tr>
<td>libs</td>
<td>运行 Kafka 所需要的所有 JAR 包</td>
</tr>
<tr>
<td>logs</td>
<td>Kafka 的所有日志文件，如果 Kafka 出现一些问题，需要到该目录中去查看异常信息</td>
</tr>
<tr>
<td>site-docs</td>
<td>Kafka 的网站帮助文件</td>
</tr>
</tbody>
</table>
<h2 id="基础操作" tabindex="-1"><a class="header-anchor" href="#基础操作" aria-hidden="true">#</a> 基础操作</h2>
<h3 id="创建topic" tabindex="-1"><a class="header-anchor" href="#创建topic" aria-hidden="true">#</a> 创建topic</h3>
<p>创建一个topic（主题）。Kafka中所有的消息都是保存在主题中，要生产消息到Kafka，首先必须要有一个确定的主题。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 创建名为test的主题</span>
bin/kafka-topics.sh <span class="token parameter variable">--create</span> --bootstrap-server localhost:9092 <span class="token parameter variable">--topic</span> <span class="token builtin class-name">test</span>
<span class="token comment"># 查看目前Kafka中的主题</span>
bin/kafka-topics.sh <span class="token parameter variable">--list</span> --bootstrap-server localhost:9092
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生产消息到kafka" tabindex="-1"><a class="header-anchor" href="#生产消息到kafka" aria-hidden="true">#</a> 生产消息到Kafka</h3>
<p>使用Kafka内置的测试程序，生产一些消息到Kafka的test主题中。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>bin/kafka-console-producer.sh --broker-list localhost:9092 <span class="token parameter variable">--topic</span> <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="从kafka消费消息" tabindex="-1"><a class="header-anchor" href="#从kafka消费消息" aria-hidden="true">#</a> 从Kafka消费消息</h3>
<p>使用下面的命令来消费 test 主题中的消息。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 <span class="token parameter variable">--topic</span> <span class="token builtin class-name">test</span> --from-beginning
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="kafka-tool" tabindex="-1"><a class="header-anchor" href="#kafka-tool" aria-hidden="true">#</a> Kafka Tool</h3>
<p>远程连接需要配置<code v-pre>server.properties</code></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>listeners = PLAINTEXT://:9092

advertised.listeners=PLAINTEXT://ip:9092
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>浏览Kafka集群节点、多少个topic、多少个分区</li>
<li>创建topic/删除topic</li>
<li>浏览ZooKeeper中的数据</li>
</ul>
<h2 id="kafka基准测试" tabindex="-1"><a class="header-anchor" href="#kafka基准测试" aria-hidden="true">#</a> Kafka基准测试</h2>
<p><a href="http://www.blogjava.net/qileilove/archive/2012/07/05/382241.html" target="_blank" rel="noopener noreferrer">基准测试<ExternalLinkIcon/></a>（benchmark testing）是一种测量和评估软件性能指标的活动。我们可以通过基准测试，了解到软件、硬件的性能水平。主要测试负载的执行时间、传输速度、吞吐量、资源占用率等。</p>
<p>测试步骤：</p>
<ol>
<li>启动 Kafka 集群</li>
<li>创建一个 1 个分区 1 个副本的 topic: benchmark</li>
<li>同时运行生产者、消费者基准测试程序</li>
<li>观察结果</li>
</ol>
<h3 id="创建topic-1" tabindex="-1"><a class="header-anchor" href="#创建topic-1" aria-hidden="true">#</a> 创建topic</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>bin/kafka-topics.sh <span class="token parameter variable">--zookeeper</span> localhost:2181 <span class="token parameter variable">--create</span> <span class="token parameter variable">--topic</span> benchmark <span class="token parameter variable">--partitions</span> <span class="token number">1</span> --replication-factor <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="生产消息基准测试" tabindex="-1"><a class="header-anchor" href="#生产消息基准测试" aria-hidden="true">#</a> 生产消息基准测试</h3>
<p>在生产环境中，推荐使用生产5000W消息，这样会性能数据会更准确些。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>bin/kafka-producer-perf-test.sh <span class="token parameter variable">--topic</span> benchmark --num-records <span class="token number">50000000</span> <span class="token parameter variable">--throughput</span> <span class="token parameter variable">-1</span> --record-size <span class="token number">1000</span> --producer-props <span class="token assign-left variable">bootstrap.servers</span><span class="token operator">=</span>localhost:9092 <span class="token assign-left variable">acks</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container info">
<p class="hint-container-title">参数信息</p>
<p>bin/kafka-producer-perf-test.sh</p>
<p>--topic topic的名字</p>
<p>--num-records	总共指定生产数据量（默认5000W）</p>
<p>--throughput	指定吞吐量——限流（-1不指定）</p>
<p>--record-size  record数据大小（字节）</p>
<p>--producer-props bootstrap.servers=ip1:9092,ip2:9092,ip3:9092 acks=1 指定Kafka集群地址，ACK模式</p>
</div>
<ul>
<li>
<p>Kafka中提供了内置的性能测试工具</p>
<ul>
<li>
<p>生产者：测试生产每秒传输的数据量（多少条数据、多少M的数据）</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>5000000 records sent, 11825.446943 records/sec (11.28 MB/sec), 2757.61 ms avg latency
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>消费者：测试消费每条拉取的数据量</p>
</li>
</ul>
</li>
<li>
<p>对比生产者和消费者：消费者的速度更快</p>
</li>
</ul>
<h2 id="kafka-java-api开发" tabindex="-1"><a class="header-anchor" href="#kafka-java-api开发" aria-hidden="true">#</a> Kafka Java API开发</h2>
<p><strong>相关依赖：</strong></p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- kafka客户端工具 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.kafka<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>kafka-clients<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>2.4.1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- 工具类 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.commons<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>commons-io<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.3.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- SLF桥接LOG4J日志 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.slf4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>slf4j-log4j12<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.7.6<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- SLOG4J日志 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>log4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>log4j<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.2.16<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">></span></span>test<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!--hutool--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>cn.hutool<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>hutool-all<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>5.7.17<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.projectlombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>lombok<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>optional</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>optional</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugins</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>plugin</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.apache.maven.plugins<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>maven-compiler-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.7.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>source</span><span class="token punctuation">></span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>target</span><span class="token punctuation">></span></span>1.8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>target</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugin</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>plugins</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>log4j.properties</strong></p>
<div class="language-properties line-numbers-mode" data-ext="properties"><pre v-pre class="language-properties"><code><span class="token key attr-name">log4j.rootLogger</span><span class="token punctuation">=</span><span class="token value attr-value">INFO,stdout</span>
<span class="token key attr-name">log4j.appender.stdout</span><span class="token punctuation">=</span><span class="token value attr-value">org.apache.log4j.ConsoleAppender</span>
<span class="token key attr-name">log4j.appender.stdout.layout</span><span class="token punctuation">=</span><span class="token value attr-value">org.apache.log4j.PatternLayout</span>
<span class="token key attr-name">log4j.appender.stdout.layout.ConversionPattern</span><span class="token punctuation">=</span><span class="token value attr-value">%5p - %m%n</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生产者程序开发" tabindex="-1"><a class="header-anchor" href="#生产者程序开发" aria-hidden="true">#</a> 生产者程序开发</h3>
<p><strong>具体流程：</strong></p>
<ol>
<li>创建连接
<ul>
<li>bootstrap.servers：Kafka 的服务器地址</li>
<li>acks：表示当生产者生产数据到 Kafka 中，Kafka 中会以什么样的策略返回</li>
<li>key.serializer：Kafka 中的消息是以key、value键值对存储的，而且生产者生产的消息是需要在网络上传到的，这里指定的是StringSerializer方式，就是以字符串方式发送（将来还可以使用其他的一些序列化框架：Google ProtoBuf、Avro）</li>
<li>value.serializer：同上</li>
</ul>
</li>
<li>采用 try-resource 创建一个生产者对象KafkaProducer</li>
<li>调用 send 方法发送消息（ProducerRecord，封装是 key-value 键值对）</li>
<li>调用 Future.get() 表示等带服务端的响应</li>
</ol>
<p><strong>配置KafkaProducer：</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KafkaConfig</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Properties</span> <span class="token function">kafkaProducerConfigProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"bootstrap.servers"</span><span class="token punctuation">,</span> <span class="token string">"ip:9092"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"acks"</span><span class="token punctuation">,</span> <span class="token string">"all"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"key.serializer"</span><span class="token punctuation">,</span> <span class="token string">"org.apache.kafka.common.serialization.StringSerializer"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"value.serializer"</span><span class="token punctuation">,</span> <span class="token string">"org.apache.kafka.common.serialization.StringSerializer"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> properties<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编写代码：</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"kafkaProducerConfigProperties"</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Properties</span> kafkaProducerConfigProperties<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testProducer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">KafkaProducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> producer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KafkaProducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>kafkaProducerConfigProperties<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">RecordMetadata</span><span class="token punctuation">></span></span> future <span class="token operator">=</span> producer
                <span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ProducerRecord</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            future<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"第{}条消息写入成功！"</span><span class="token punctuation">,</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="消费者程序开发" tabindex="-1"><a class="header-anchor" href="#消费者程序开发" aria-hidden="true">#</a> 消费者程序开发</h3>
<p><strong>配置KafkaConsumer：</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">Properties</span> <span class="token function">kafkaConsumerConfigProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"bootstrap.servers"</span><span class="token punctuation">,</span> <span class="token string">"ip:9092"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"group.id"</span><span class="token punctuation">,</span> <span class="token string">"test"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"enable.auto.commit"</span><span class="token punctuation">,</span> <span class="token string">"true"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"auto.commit.interval.ms"</span><span class="token punctuation">,</span> <span class="token string">"1000"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"key.deserializer"</span><span class="token punctuation">,</span> <span class="token string">"org.apache.kafka.common.serialization.StringDeserializer"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"value.deserializer"</span><span class="token punctuation">,</span> <span class="token string">"org.apache.kafka.common.serialization.StringDeserializer"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> properties<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编写代码：</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token annotation punctuation">@Qualifier</span><span class="token punctuation">(</span><span class="token string">"kafkaConsumerConfigProperties"</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token class-name">Properties</span> kafkaConsumerConfigProperties<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testConsumer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">KafkaConsumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> consumer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KafkaConsumer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>kafkaConsumerConfigProperties<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        consumer<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// kafka消费者一次拉取一批数据过来</span>
            <span class="token class-name">ConsumerRecords</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> records <span class="token operator">=</span> consumer<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token class-name">Duration</span><span class="token punctuation">.</span><span class="token function">ofSeconds</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            records<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>record <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token class-name">String</span> topic <span class="token operator">=</span> record<span class="token punctuation">.</span><span class="token function">topic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">long</span> offset <span class="token operator">=</span> record<span class="token punctuation">.</span><span class="token function">offset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> key <span class="token operator">=</span> record<span class="token punctuation">.</span><span class="token function">key</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">String</span> value <span class="token operator">=</span> record<span class="token punctuation">.</span><span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"========================"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"topic: {}"</span><span class="token punctuation">,</span> topic<span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"offset: {}"</span><span class="token punctuation">,</span> offset<span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"key: {}"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
                log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"value: {}"</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><a href="http://group.id" target="_blank" rel="noopener noreferrer">group.id<ExternalLinkIcon/></a>：消费者组的概念，可以在一个消费组中包含多个消费者。如果若干个消费者的group.id是一样的，表示它们就在一个组中，一个组中的消费者是共同消费Kafka中topic的数据。</li>
<li>Kafka是一种拉消息模式的消息队列，在消费者中会有一个offset，表示从哪条消息开始拉取数据</li>
<li>kafkaConsumer.poll：Kafka的消费者API是一批一批数据的拉取</li>
</ul>
<h3 id="生产者使用异步方式生产消息" tabindex="-1"><a class="header-anchor" href="#生产者使用异步方式生产消息" aria-hidden="true">#</a> 生产者使用异步方式生产消息</h3>
<p>如果我们想获取生产者消息是否成功，或者成功生产消息到 Kafka 中后，执行一些其他动作。此时，可以很方便地使用带有回调函数来发送消息。</p>
<p>需求：</p>
<ol>
<li>在发送消息出现异常时，能够及时打印出异常信息</li>
<li>在发送消息成功时，打印 Kafka 的 topic 名字、分区 id、offset</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testProducer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">KafkaProducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> producer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">KafkaProducer</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>kafkaProducerConfigProperties<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">ProducerRecord</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> record <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProducerRecord</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            producer<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>record<span class="token punctuation">,</span> <span class="token punctuation">(</span>metadata<span class="token punctuation">,</span> exception<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>exception <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 生产成功</span>
                    <span class="token class-name">String</span> topic <span class="token operator">=</span> metadata<span class="token punctuation">.</span><span class="token function">topic</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">int</span> partition <span class="token operator">=</span> metadata<span class="token punctuation">.</span><span class="token function">partition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">long</span> offset <span class="token operator">=</span> metadata<span class="token punctuation">.</span><span class="token function">offset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"topic: {}, partition: {}, offset: {}"</span><span class="token punctuation">,</span> topic<span class="token punctuation">,</span> partition<span class="token punctuation">,</span> offset<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                    log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>exception<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>使用匿名内部类实现Callback接口，该接口中表示Kafka服务器响应给客户端，会自动调用onCompletion方法
<ul>
<li>metadata：消息的元数据（属于哪个topic、属于哪个partition、对应的offset是什么）</li>
<li>exception：这个对象Kafka生产消息封装了出现的异常，如果为null，表示发送成功，如果不为null，表示出现异常。</li>
</ul>
</li>
</ul>
<h2 id="kafka中的重要概念" tabindex="-1"><a class="header-anchor" href="#kafka中的重要概念" aria-hidden="true">#</a> Kafka中的重要概念</h2>
<figure><img src="https://124.71.187.148/images/kafka/20231018142400001.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>
<p><strong>Broker</strong>：一台Kafka 服务器就是一个broker。一个集群由多个broker 组成。一个 broker 可以容纳多个topic。</p>
</li>
<li>
<p><strong>Producer</strong>：生产者</p>
</li>
<li>
<p><strong>Consumer</strong>：消费者</p>
</li>
<li>
<p><strong>Topic</strong>：主题，一个 Kafka 集群中，可以包含多个 topic。一个 topic 可以包含多个分区</p>
<ul>
<li>是一个逻辑结构，生产、消费消息都需要指定 topic，一个 topic 在物理上被划分为一个或多个 partition。</li>
</ul>
</li>
<li>
<p><strong>Partition</strong>：Kafka 集群的分布式就是由分区来实现的。一个 topic 中的消息可以分布在 topic 中的不同partition 中，每个 partition 是一个有序的队列。</p>
</li>
<li>
<p><strong>Replica</strong>：副本，实现 Kafka 集群的容错，实现 partition 的容错。一个 topic 至少应该包含大于 1 个的副本，</p>
<p>一个 Leader 和若干个 Follower。</p>
</li>
<li>
<p><strong>Leader</strong>：每个分区多个副本的“主”，生产者发送数据的对象，以及消费者消费数据的对象都是 Leader。</p>
</li>
<li>
<p><strong>Follower</strong>：每个分区多个副本中的“从”，实时从 Leader 中同步数据，保持和 Leader 数据的同步。Leader 发生故障时，某个 Follower 会成为新的 Leader。</p>
</li>
<li>
<p><strong>Consumer Group</strong>：消费者组，由多个 consumer 组成。**消费者组内每个消费者负责消费不同分区的数据，一个分区只能由一个组内消费者消费；**消费者组之间互不影响。所有的消费者都属于某个消费者组，即消费者组是逻辑上的一个订阅者。</p>
</li>
<li>
<p><strong>Offset</strong>：偏移量。相对消费者、partition 来说，可以通过 offset 来拉取数据</p>
</li>
</ul>
<h2 id="幂等性" tabindex="-1"><a class="header-anchor" href="#幂等性" aria-hidden="true">#</a> 幂等性</h2>
<figure><img src="https://124.71.187.148/images/kafka/20231018145100001.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>在生产者生产消息时，如果出现retry时，有可能会一条消息被发送了多次，如果Kafka不具备幂等性的，就有可能会在partition中保存多条一模一样的消息。</p>
<h3 id="配置幂等性" tabindex="-1"><a class="header-anchor" href="#配置幂等性" aria-hidden="true">#</a> 配置幂等性</h3>
<p>开启参数enable.idempotence 默认为true，false 关闭。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"enable.idempotence"</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="幂等性原理" tabindex="-1"><a class="header-anchor" href="#幂等性原理" aria-hidden="true">#</a> 幂等性原理</h3>
<figure><img src="https://124.71.187.148/images/kafka/202310181457000001.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>为了实现生产者的幂等性，Kafka引入了 Producer ID（PID）和 Sequence Number的概念。</p>
<p><strong>PID</strong>：每个Producer在初始化时，都会分配一个唯一的PID，这个PID对用户来说，是透明的。</p>
<p><strong>Sequence Number</strong>：针对每个生产者（对应PID）发送到指定主题分区的消息都对应一个从0开始递增的Sequence Number。</p>
<p>其中 PID Kafka 每次重启都会重新分配，所以幂等性只能保证的是在单分区单会话内不重复。</p>
<h2 id="kafka中的分区副本机制" tabindex="-1"><a class="header-anchor" href="#kafka中的分区副本机制" aria-hidden="true">#</a> Kafka中的分区副本机制</h2>
<h3 id="生产者的分区写入策略" tabindex="-1"><a class="header-anchor" href="#生产者的分区写入策略" aria-hidden="true">#</a> 生产者的分区写入策略</h3>
<h4 id="轮询策略" tabindex="-1"><a class="header-anchor" href="#轮询策略" aria-hidden="true">#</a> 轮询策略</h4>
<ul>
<li>默认的策略，也是使用最多的策略，可以最大限度保证所有消息平均分配到一个分区</li>
<li>如果在生产消息时，key为null，则使用轮询算法均衡地分配分区</li>
</ul>
<h4 id="随即策略" tabindex="-1"><a class="header-anchor" href="#随即策略" aria-hidden="true">#</a> 随即策略</h4>
<p>随机策略，每次都随机地将消息分配到每个分区。在较早的版本，默认的分区策略就是随机策略，也是为了将消息均衡地写入到每个分区。但后续轮询策略表现更佳，所以基本上很少会使用随机策略。</p>
<h4 id="按-key-分配策略" tabindex="-1"><a class="header-anchor" href="#按-key-分配策略" aria-hidden="true">#</a> 按 key 分配策略</h4>
<p>按key分配策略（key.hash() % 分区的数量），有可能会出现「数据倾斜」，例如：某个key包含了大量的数据，因为key值一样，所有所有的数据将都分配到一个分区中，造成该分区的消息数量远大于其他的分区。</p>
<h4 id="自定义分区策略" tabindex="-1"><a class="header-anchor" href="#自定义分区策略" aria-hidden="true">#</a> 自定义分区策略</h4>
<p><strong>创建自定义分区器：</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">KeyWithRandomPartitioner</span> <span class="token keyword">implements</span> <span class="token class-name">Partitioner</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Random</span> r<span class="token punctuation">;</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">></span></span> configs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    r <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">partition</span><span class="token punctuation">(</span><span class="token class-name">String</span> topic<span class="token punctuation">,</span> <span class="token class-name">Object</span> key<span class="token punctuation">,</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> keyBytes<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">,</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> valueBytes<span class="token punctuation">,</span> <span class="token class-name">Cluster</span> cluster<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// cluster.partitionCountForTopic 表示获取指定topic的分区数量</span>
    <span class="token keyword">return</span> r<span class="token punctuation">.</span><span class="token function">nextInt</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span> <span class="token operator">%</span> cluster<span class="token punctuation">.</span><span class="token function">partitionCountForTopic</span><span class="token punctuation">(</span>topic<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>配置使用：</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token class-name">ProducerConfig</span><span class="token punctuation">.</span><span class="token constant">PARTITIONER_CLASS_CONFIG</span><span class="token punctuation">,</span> <span class="token class-name">KeyWithRandomPartitioner</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>乱序问题</p>
<ul>
<li>在Kafka中生产者是有写入策略，如果topic有多个分区，就会将数据分散在不同的partition中存储</li>
<li>当partition数量大于1的时候，数据（消息）会打散分布在不同的partition中，因此在每个partition中数据是相对有序的，但是对于topic，数据就会变得无须，这也是为什么说数据是相对有序的。</li>
<li>如果只有一个分区，消息是有序的</li>
</ul>
</blockquote>
<h3 id="消费组-rebalance-机制" tabindex="-1"><a class="header-anchor" href="#消费组-rebalance-机制" aria-hidden="true">#</a> 消费组 Rebalance 机制</h3>
<h4 id="rebalance-再均衡" tabindex="-1"><a class="header-anchor" href="#rebalance-再均衡" aria-hidden="true">#</a> Rebalance 再均衡</h4>
<p>Kafka 中的 Rebalance 称之为再均衡，是 Kafka 中确保 Consumer group 下所有的 consumer 如何达成一致，分配订阅的 topic 的每个分区的机制。</p>
<p><strong>Rebalance触发的时机有：</strong></p>
<ol>
<li>消费者组中 <strong>consumer 的个数发生变化</strong>。例如：有新的 consumer 加入到消费者组，或者是某个 consumer 停止了。</li>
<li>订阅的 <strong>topic 个数发生变化</strong>。消费者可以订阅多个主题，假设当前的消费者组订阅了三个主题，但有一个主题突然被删除了，此时也需要发生再均衡。（本质上其实是 partition 发生了变化）</li>
<li>订阅的 topic 中的 partition 发生变化。</li>
</ol>
<h4 id="rebalance-的不良影响" tabindex="-1"><a class="header-anchor" href="#rebalance-的不良影响" aria-hidden="true">#</a> Rebalance 的不良影响</h4>
<ol>
<li>发生 Rebalance 时，consumer group 下的所有 consumer 都会协调在一起共同参与，Kafka 使用分配策略尽可能达到最公平的分配</li>
<li>Rebalance 过程会对 consumer group 产生非常严重的影响，Rebalance 的过程中所有的消费者都将停止工作，直到 Rebalance 完成。</li>
</ol>
<h3 id="消费者的分区分配策略" tabindex="-1"><a class="header-anchor" href="#消费者的分区分配策略" aria-hidden="true">#</a> 消费者的分区分配策略</h3>
<h4 id="range-范围分配策略" tabindex="-1"><a class="header-anchor" href="#range-范围分配策略" aria-hidden="true">#</a> Range 范围分配策略</h4>
<p>Range 范围分配策略是 Kafka 默认的分配策略，它可以确保每个消费者消费的分区数量是均衡的。</p>
<p><strong>注意：Range 范围分配策略是针对每个 Topic 的</strong></p>
<p><strong>配置：</strong></p>
<p>配置消费者的<code v-pre>partition.assignment.strategy</code>为<code v-pre>org.apache.kafka.clients.consumer.RangeAssignor</code>。</p>
<p><strong>算法公式：</strong></p>
<p>n = 分区数量 / 消费者数量</p>
<p>m = 分区数量 % 消费者数量</p>
<p>前 m 个消费者消费 n+1 个</p>
<p>剩余消费者消费 n 个</p>
<figure><img src="https://124.71.187.148/images/kafka/20231019142700001.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="roundrobin轮询策略" tabindex="-1"><a class="header-anchor" href="#roundrobin轮询策略" aria-hidden="true">#</a> RoundRobin轮询策略</h4>
<p>RoundRobinAssignor 轮询策略是将消费组内所有消费者以及消费者所订阅的**所有 topic 的 partition **按照字典序排序（topic 和分区的 hashcode 进行排序），然后通过轮询方式逐个将分区以此分配给每个消费者。</p>
<p><strong>配置：</strong></p>
<p>配置消费者的<code v-pre>partition.assignment.strategy</code>为<code v-pre>org.apache.kafka.clients.consumer.RoundRobinAssignor</code>。</p>
<figure><img src="https://124.71.187.148/images/kafka/20231019143100001.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="stricky粘性分配策略" tabindex="-1"><a class="header-anchor" href="#stricky粘性分配策略" aria-hidden="true">#</a> Stricky粘性分配策略</h4>
<p>从 Kafka 0.11.x 开始，引入此类分配策略。主要目的：</p>
<ol>
<li>分区分配尽可能均匀</li>
<li>在发生 rebalance 的时候，分区的分配尽可能与上一次分配保持相同</li>
</ol>
<p>没有发生 rebalance 时，Striky 粘性分配策略和 RoundRobin 分配策略类似。</p>
<figure><img src="https://124.71.187.148/images/kafka/20231019143300001.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>上面如果 consumer2 崩溃了，此时需要进行 rebalance。如果是 Range 分配和轮询分配都会重新进行分配，例如：</p>
<figure><img src="https://124.71.187.148/images/kafka/20231019143300002.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>通过上图，我们发现，consumer0 和 consumer1 原来消费的分区大多发生了改变。接下来我们再来看下粘性分配策略。</p>
<figure><img src="https://124.71.187.148/images/kafka/20231019143300003.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>我们发现，Striky 粘性分配策略，保留 rebalance 之前的分配结果。这样，只是将原先 consumer2 负责的两个分区再均匀分配给 consumer0、consumer1。这样可以明显减少系统资源的浪费，例如：之前 consumer0、consumer1 之前正在消费某几个分区，但由于 rebalance 发生，导致 consumer0、consumer1 需要重新消费之前正在处理的分区，导致不必要的系统开销。（例如：某个事务正在进行就必须要取消了）</p>
<h3 id="副本的ack机制" tabindex="-1"><a class="header-anchor" href="#副本的ack机制" aria-hidden="true">#</a> 副本的ACK机制</h3>
<p>producer是不断地往Kafka中写入数据，写入数据会有一个返回结果，表示是否写入成功。这里对应有一个ACKs的配置。对应的代码如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>properties<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"acks"</span><span class="token punctuation">,</span> <span class="token string">"all"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>acks = 0：生产者只管写入，不管是否写入成功，可能会数据丢失。性能是最好的</li>
<li>acks = 1：生产者会等到leader分区写入成功后，返回成功，接着发送下一条</li>
<li>acks = -1/all：确保消息写入到leader分区、还确保消息写入到对应副本都成功后，接着发送下一条，性能是最差的</li>
</ul>
<p>根据业务情况来选择ack机制，是要求性能最高，一部分数据丢失影响不大，可以选择0/1。如果要求数据一定不能丢失，就得配置为-1/all。</p>
<p>分区中是有leader和follower的概念，为了确保消费者消费的数据是一致的，只能从分区leader去读写消息，follower做的事情就是同步数据，Backup。</p>
<h2 id="kafka-eagle" tabindex="-1"><a class="header-anchor" href="#kafka-eagle" aria-hidden="true">#</a> Kafka-Eagle</h2>
<h3 id="开启-jmx-端口" tabindex="-1"><a class="header-anchor" href="#开启-jmx-端口" aria-hidden="true">#</a> 开启 JMX 端口</h3>
<p>JMX(Java Management Extensions) 是一个为应用程序植入管理功能的框架。JMX 是一套标准的代理和服务，实际上，用户可以在任何Java应用程序中使用这些代理和服务实现管理。很多的一些软件都提供了JMX接口，来实现一些管理、监控功能。</p>
<p><strong>在启动Kafka的脚本前，添加：</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> <span class="token variable">${KAFKA_HOME}</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">JMX_PORT</span><span class="token operator">=</span><span class="token number">9988</span>
<span class="token function">nohup</span> bin/kafka-server-start.sh config/server.properties <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装kafka-eagle" tabindex="-1"><a class="header-anchor" href="#安装kafka-eagle" aria-hidden="true">#</a> 安装Kafka-Eagle</h3>
<ol>
<li>
<p>安装 JDK，并配置好 JAVA_HOME。</p>
</li>
<li>
<p>将 Kafka-Eagle 上传，并解压到 /export/server 目录中。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /export/software/
<span class="token function">wget</span> https://github.com/smartloli/kafka-eagle-bin/archive/v1.4.6.tar.gz

<span class="token function">tar</span> <span class="token parameter variable">-xvzf</span> kafka-eagle-bin-1.4.6.tar.gz <span class="token parameter variable">-C</span> <span class="token punctuation">..</span>/server/
<span class="token builtin class-name">cd</span> /export/server/kafka-eagle-bin-1.4.6/ 
<span class="token function">tar</span> <span class="token parameter variable">-xvzf</span> kafka-eagle-web-1.4.6-bin.tar.gz
<span class="token builtin class-name">cd</span> /export/server/kafka-eagle-bin-1.4.6/kafka-eagle-web-1.4.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>配置 Kafka-Eagle 环境变量</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/profile
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KE_HOME</span><span class="token operator">=</span>/export/server/kafka-eagle-bin-1.4.6/kafka-eagle-web-1.4.6
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$KE_HOME</span>/bin
<span class="token builtin class-name">source</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>配置 conf 目录下的 system-config.properties</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> conf/system-config.properties

<span class="token comment"># :set nu 开启行号</span>
<span class="token comment"># 修改第4行，配置kafka集群别名</span>
<span class="token assign-left variable">kafka.eagle.zk.cluster.alias</span><span class="token operator">=</span>cluster1
<span class="token comment"># 修改第5行，配置ZK集群地址</span>
<span class="token assign-left variable">cluster1.zk.list</span><span class="token operator">=</span>localhost:2181
<span class="token comment"># 注释第6行</span>
<span class="token comment">#cluster2.zk.list=xdn10:2181,xdn11:2181,xdn12:2181</span>

<span class="token comment"># 修改第32行，打开图标统计</span>
<span class="token assign-left variable">kafka.eagle.metrics.charts</span><span class="token operator">=</span>true

<span class="token comment"># 注释第69行，取消sqlite数据库连接配置</span>
<span class="token comment">#kafka.eagle.driver=org.sqlite.JDBC</span>
<span class="token comment">#kafka.eagle.url=jdbc:sqlite:/hadoop/kafka-eagle/db/ke.db</span>
<span class="token comment">#kafka.eagle.username=root</span>
<span class="token comment">#kafka.eagle.password=www.kafka-eagle.org</span>

<span class="token comment"># 修改第77行，开启mysql</span>
<span class="token assign-left variable">kafka.eagle.driver</span><span class="token operator">=</span>com.mysql.jdbc.Driver
<span class="token assign-left variable">kafka.eagle.url</span><span class="token operator">=</span>jdbc:mysql://localhost:3306/ke?useUnicode<span class="token operator">=</span>true<span class="token operator">&amp;</span><span class="token assign-left variable">characterEncoding</span><span class="token operator">=</span>UTF-8<span class="token operator">&amp;</span><span class="token assign-left variable">zeroDateTimeBehavior</span><span class="token operator">=</span>convertToNull
<span class="token assign-left variable">kafka.eagle.username</span><span class="token operator">=</span>root
<span class="token assign-left variable">kafka.eagle.password</span><span class="token operator">=</span><span class="token number">123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>配置 JAVA_HOME</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /export/server/kafka-eagle-bin-1.4.6/kafka-eagle-web-1.4.6/bin
<span class="token function">vim</span> ke.sh
<span class="token comment"># 在第24行添加JAVA_HOME环境配置</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/export/server/jdk1.8.0_241
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>修改 Kafka-Eagle 可执行权限</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /export/server/kafka-eagle-bin-1.4.6/kafka-eagle-web-1.4.6/bin
<span class="token function">chmod</span> +x ke.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>启动 Kafka-Eagle</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>./ke.sh start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<h2 id="kafka原理-todo" tabindex="-1"><a class="header-anchor" href="#kafka原理-todo" aria-hidden="true">#</a> Kafka原理（TODO）</h2>
<h3 id="leader和follower" tabindex="-1"><a class="header-anchor" href="#leader和follower" aria-hidden="true">#</a> leader和follower</h3>
<ul>
<li>Kafka中的leader和follower是相对分区有意义，不是相对broker</li>
<li>Kafka在创建topic的时候，会尽量分配分区的leader在不同的broker中，其实就是负载均衡</li>
<li>leader职责：读写数据</li>
<li>follower职责：同步数据、参与选举（leader crash之后，会选举一个follower重新成为分区的leader</li>
<li>注意和ZooKeeper区分
<ul>
<li>ZK的leader负责读、写，follower可以读取</li>
<li>Kafka的leader负责读写、follower不能读写数据（确保每个消费者消费的数据是一致的），Kafka一个topic有多个分区leader，一样可以实现数据操作的负载均衡</li>
</ul>
</li>
</ul>
<h3 id="ar-isr-osr" tabindex="-1"><a class="header-anchor" href="#ar-isr-osr" aria-hidden="true">#</a> AR\ISR\OSR</h3>
<ul>
<li>AR表示一个topic下的所有副本</li>
<li>ISR：In Sync Replicas，正在同步的副本（可以理解为当前有几个follower是存活的）</li>
<li>OSR：Out of Sync Replicas，不再同步的副本</li>
<li>AR = ISR + OSR</li>
</ul>
<h3 id="leader选举" tabindex="-1"><a class="header-anchor" href="#leader选举" aria-hidden="true">#</a> leader选举</h3>
<ul>
<li>
<p>Controller：controller是kafka集群的老大，是针对Broker的一个角色</p>
<ul>
<li>Controller是高可用的，是用过ZK来进行选举</li>
</ul>
</li>
<li>
<p>Leader：是针对partition的一个角色</p>
<ul>
<li>Leader是通过ISR来进行快速选举</li>
</ul>
</li>
<li>
<p>如果Kafka是基于ZK来进行选举，ZK的压力可能会比较大。例如：某个节点崩溃，这个节点上不仅仅只有一个leader，是有不少的leader需要选举。通过ISR快速进行选举。</p>
</li>
<li>
<p>leader的负载均衡</p>
<ul>
<li>如果某个broker crash之后，就可能会导致partition的leader分布不均匀，就是一个broker上存在一个topic下不同partition的leader</li>
<li>通过以下指令，可以将leader分配到优先的leader对应的broker，确保leader是均匀分配的</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>bin/kafka-leader-election.sh --bootstrap-server node1.itcast.cn:9092 <span class="token parameter variable">--topic</span> <span class="token builtin class-name">test</span> <span class="token parameter variable">--partition</span><span class="token operator">=</span><span class="token number">2</span> --election-type preferred
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h3 id="kafka读写流程" tabindex="-1"><a class="header-anchor" href="#kafka读写流程" aria-hidden="true">#</a> Kafka读写流程</h3>
<ul>
<li>写流程
<ul>
<li>通过ZooKeeper找partition对应的leader，leader是负责写的</li>
<li>producer开始写入数据</li>
<li>ISR里面的follower开始同步数据，并返回给leader ACK</li>
<li>返回给producer ACK</li>
</ul>
</li>
<li>读流程
<ul>
<li>通过ZooKeeper找partition对应的leader，leader是负责读的</li>
<li>通过ZooKeeper找到消费者对应的offset</li>
<li>然后开始从offset往后顺序拉取数据</li>
<li>提交offset（自动提交——每隔多少秒提交一次offset、手动提交——放入到事务中提交）</li>
</ul>
</li>
</ul>
<h3 id="kafka的物理存储" tabindex="-1"><a class="header-anchor" href="#kafka的物理存储" aria-hidden="true">#</a> Kafka的物理存储</h3>
<ul>
<li>Kafka的数据组织结构
<ul>
<li>topic</li>
<li>partition</li>
<li>segment
<ul>
<li>.log数据文件</li>
<li>.index（稀疏索引）</li>
<li>.timeindex（根据时间做的索引）</li>
</ul>
</li>
</ul>
</li>
<li>深入了解读数据的流程
<ul>
<li>消费者的offset是一个针对partition全局offset</li>
<li>可以根据这个offset找到segment段</li>
<li>接着需要将全局的offset转换成segment的局部offset</li>
<li>根据局部的offset，就可以从（.index稀疏索引）找到对应的数据位置</li>
<li>开始顺序读取</li>
</ul>
</li>
</ul>
<h3 id="消息传递的语义性" tabindex="-1"><a class="header-anchor" href="#消息传递的语义性" aria-hidden="true">#</a> 消息传递的语义性</h3>
<p>Flink里面有对应的每种不同机制的保证，提供Exactly-Once保障（二阶段事务提交方式）</p>
<ul>
<li>At-most once：最多一次（只管把数据消费到，不管有没有成功，可能会有数据丢失）</li>
<li>At-least once：最少一次（有可能会出现重复消费）</li>
<li>Exactly-Once：仅有一次（事务性性的保障，保证消息有且仅被处理一次）</li>
</ul>
<h3 id="kafka的消息不丢失" tabindex="-1"><a class="header-anchor" href="#kafka的消息不丢失" aria-hidden="true">#</a> Kafka的消息不丢失</h3>
<ul>
<li>broker消息不丢失：因为有副本relicas的存在，会不断地从leader中同步副本，所以，一个broker crash，不会导致数据丢失，除非是只有一个副本。</li>
<li>生产者消息不丢失：ACK机制（配置成ALL/-1）、配置0或者1有可能会存在丢失</li>
<li>消费者消费不丢失：重点控制offset
<ul>
<li>At-least once：一种数据可能会重复消费</li>
<li>Exactly-Once：仅被一次消费</li>
</ul>
</li>
</ul>
<h3 id="数据积压" tabindex="-1"><a class="header-anchor" href="#数据积压" aria-hidden="true">#</a> 数据积压</h3>
<ul>
<li>数据积压指的是消费者因为有一些外部的IO、一些比较耗时的操作（Full GC——Stop the world），就会造成消息在partition中一直存在得不到消费，就会产生数据积压</li>
<li>在企业中，我们要有监控系统，如果出现这种情况，需要尽快处理。虽然后续的Spark Streaming/Flink可以实现背压机制，但是数据累积太多一定对实时系统它的实时性是有说影响的</li>
</ul>
<h3 id="数据清理-配额限速" tabindex="-1"><a class="header-anchor" href="#数据清理-配额限速" aria-hidden="true">#</a> 数据清理&amp;配额限速</h3>
<ul>
<li>数据清理
<ul>
<li>Log Deletion（日志删除）：如果消息达到一定的条件（时间、日志大小、offset大小），Kafka就会自动将日志设置为待删除（segment端的后缀名会以 .delete结尾），日志管理程序会定期清理这些日志
<ul>
<li>默认是7天过期</li>
</ul>
</li>
<li>Log Compaction（日志合并）
<ul>
<li>如果在一些key-value数据中，一个key可以对应多个不同版本的value</li>
<li>经过日志合并，就会只保留最新的一个版本</li>
</ul>
</li>
</ul>
</li>
<li>配额限速
<ul>
<li>可以限制Producer、Consumer的速率</li>
<li>防止Kafka的速度过快，占用整个服务器（broker）的所有IO资源</li>
</ul>
</li>
</ul>
</div></template>


