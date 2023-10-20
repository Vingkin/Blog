---
title: Kafka
author: Vingkin
date: 2023-10-17
---

**目录**

[[toc]]

<!--more-->



## 1、Kafka简介

### 1.1、消息队列

* 消息队列——用于存放消息的组件
* 程序员可以将消息放入到队列中，也可以从消息队列中获取消息
* 很多时候消息队列不是一个永久性的存储，是作为临时存储存在的（设定一个期限：设置消息在MQ中保存10天）
* 消息队列中间件：消息队列的组件，例如：Kafka、Active MQ、RabbitMQ、RocketMQ、ZeroMQ

### 1.2、Kafka的应用场景

* 异步处理
    * 可以将一些比较耗时的操作放在其他系统中，通过消息队列将需要进行处理的消息进行存储，其他系统可以消费消息队列中的数据
    * 比较常见的：发送短信验证码、发送邮件（可以用此对之前Redis用户注册部分进行改进）

![](https://124.71.187.148/images/kafka/image-20200916093856262.png)

* 系统解耦
    * 原先一个微服务是通过接口（HTTP）调用另一个微服务，这时候耦合很严重，只要接口发生变化就会导致系统不可用
    * 使用消息队列可以将系统进行解耦合，现在第一个微服务可以将消息放入到消息队列中，另一个微服务可以从消息队列中把消息取出来进行处理。进行系统解耦

![](https://124.71.187.148/images/kafka/image-20200916093908261.png)

* 流量削峰
    * 因为消息队列是低延迟、高可靠、高吞吐的，可以应对大量并发

![](https://124.71.187.148/images/kafka/image-20200916093919754.png)

* 日志处理
    * 可以使用消息队列作为临时存储，或者一种通信管道

![](https://124.71.187.148/images/kafka/image-20200916093933994.png)

### 1.3、消息队列的两种模型

* 生产者、消费者模型

    * 生产者负责将消息生产到MQ中
    * 消费者负责从MQ中获取消息
    * 生产者和消费者是解耦的，可能是生产者一个程序、消费者是另外一个程序

* 消息队列的模式

    * 点对点：一个消费者消费一个消息

      ![](https://124.71.187.148/images/kafka/image-202310171449000001.png)

    * 发布订阅：多个消费者可以消费一个消息

      ![](https://124.71.187.148/images/kafka/image-202310171449000002.png)

## 2、Kafka 环境搭建

### 2.1、搭建 Kafka 环境

1. 将 Kafka 的安装包上传到虚拟机，并解压

   ```shell
   cd /export/software/
   tar -xvzf kafka_2.12-2.4.1.tgz -C ../server/
   cd /export/server/kafka_2.12-2.4.1/
   ```

2. 修改 server.properties

   ```shell
   cd /export/server/kafka_2.12-2.4.1/config
   vim server.properties
   # 指定broker的id
   broker.id=0
   # 指定Kafka数据的位置
   log.dirs=/export/server/kafka_2.12-2.4.1/data
   ```

3. 配置 KAFKA_HOME 环境变量

   ```shell
   vim /etc/profile
   export KAFKA_HOME=/export/server/kafka_2.12-2.4.1
   export PATH=:$PATH:${KAFKA_HOME}
   
   每个节点加载环境变量
   source /etc/profile
   ```

4. 启动服务器

   ```shell
   # 启动ZooKeeper
   nohup bin/zookeeper-server-start.sh config/zookeeper.properties &
   # 启动Kafka
   cd /export/server/kafka_2.12-2.4.1
   nohup bin/kafka-server-start.sh config/server.properties &
   # 测试Kafka集群是否启动成功
   bin/kafka-topics.sh --bootstrap-server localhost:9092 --list
   ```

注意：

* 每一个Kafka的节点都需要修改broker.id（每个节点的标识，不能重复）
* log.dir数据存储目录需要配置
* Kafka集群是必须要有ZooKeeper的

### 2.2、目录结构分析

| 目录名称 | 说明                                                         |
|------| ------------------------------------------------------------ |
| bin  | Kafka 的所有执行脚本都在这里。<br/>例如：启动 Kafka 服务器、创建 Topic、生产者、消费者程序等等 |
| config | Kafka 的所有配置文件                                         |
| libs | 运行 Kafka 所需要的所有 JAR 包                               |
| logs | Kafka 的所有日志文件，如果 Kafka 出现一些问题，<br/>需要到该目录中去查看异常信息 |
| site-docs | Kafka 的网站帮助文件                                         |

## 3、基础操作

### 3.1、创建 topic

创建一个topic（主题）。Kafka中所有的消息都是保存在主题中，要生产消息到Kafka，首先必须要有一个确定的主题。

```shell
# 创建名为test的主题
bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --topic test
# 查看目前Kafka中的主题
bin/kafka-topics.sh --list --bootstrap-server localhost:9092
```

### 3.2、生产消息到 Kafka

使用Kafka内置的测试程序，生产一些消息到Kafka的test主题中。

```shell
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
```

### 3.3、从 Kafka 消费消息

使用下面的命令来消费 test 主题中的消息。

```shell
bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test --from-beginning
```

### 3.4、Kafka Tool

远程连接需要配置`server.properties`

```
listeners = PLAINTEXT://:9092

advertised.listeners=PLAINTEXT://ip:9092
```

* 浏览Kafka集群节点、多少个topic、多少个分区
* 创建topic/删除topic
* 浏览ZooKeeper中的数据

## 4、Kafka 基准测试

[基准测试](http://www.blogjava.net/qileilove/archive/2012/07/05/382241.html)（benchmark testing）是一种测量和评估软件性能指标的活动。我们可以通过基准测试，了解到软件、硬件的性能水平。主要测试负载的执行时间、传输速度、吞吐量、资源占用率等。

测试步骤：

1. 启动 Kafka 集群
2. 创建一个 1 个分区 1 个副本的 topic: benchmark
3. 同时运行生产者、消费者基准测试程序
4. 观察结果

### 4.1、创建 topic

```shell
bin/kafka-topics.sh --zookeeper localhost:2181 --create --topic benchmark --partitions 1 --replication-factor 1
```

### 4.2、生产消息基准测试

在生产环境中，推荐使用生产5000W消息，这样会性能数据会更准确些。

```shell
bin/kafka-producer-perf-test.sh --topic benchmark --num-records 50000000 --throughput -1 --record-size 1000 --producer-props bootstrap.servers=localhost:9092 acks=1
```

::: info 参数信息

bin/kafka-producer-perf-test.sh

--topic topic的名字

--num-records	总共指定生产数据量（默认5000W）

--throughput	指定吞吐量——限流（-1不指定）

--record-size  record数据大小（字节）

--producer-props bootstrap.servers=ip1:9092,ip2:9092,ip3:9092 acks=1 指定Kafka集群地址，ACK模式

:::

* Kafka中提供了内置的性能测试工具

    * 生产者：测试生产每秒传输的数据量（多少条数据、多少M的数据）

      ```html
      5000000 records sent, 11825.446943 records/sec (11.28 MB/sec), 2757.61 ms avg latency
      ```

    * 消费者：测试消费每条拉取的数据量

* 对比生产者和消费者：消费者的速度更快

## 5、Kafka Java API开发

**相关依赖：**

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!-- kafka客户端工具 -->
    <dependency>
        <groupId>org.apache.kafka</groupId>
        <artifactId>kafka-clients</artifactId>
        <version>2.4.1</version>
    </dependency>

    <!-- 工具类 -->
    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-io</artifactId>
        <version>1.3.2</version>
    </dependency>

    <!-- SLF桥接LOG4J日志 -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
        <version>1.7.6</version>
    </dependency>

    <!-- SLOG4J日志 -->
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.16</version>
    </dependency>

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>

    <!--hutool-->
    <dependency>
        <groupId>cn.hutool</groupId>
        <artifactId>hutool-all</artifactId>
        <version>5.7.17</version>
    </dependency>

    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.7.0</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
</build>
```

**log4j.properties**

```properties
log4j.rootLogger=INFO,stdout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p - %m%n
```

### 5.1、生产者程序开发

**具体流程：**

1. 创建连接
    * bootstrap.servers：Kafka 的服务器地址
    * acks：表示当生产者生产数据到 Kafka 中，Kafka 中会以什么样的策略返回
    * key.serializer：Kafka 中的消息是以key、value键值对存储的，而且生产者生产的消息是需要在网络上传到的，这里指定的是StringSerializer方式，就是以字符串方式发送（将来还可以使用其他的一些序列化框架：Google ProtoBuf、Avro）
    * value.serializer：同上
2. 采用 try-resource 创建一个生产者对象KafkaProducer
3. 调用 send 方法发送消息（ProducerRecord，封装是 key-value 键值对）
4. 调用 Future.get() 表示等带服务端的响应

**配置KafkaProducer：**

```java
@Configuration
public class KafkaConfig {
    @Bean
    public Properties kafkaProducerConfigProperties() {
        Properties properties = new Properties();
        properties.put("bootstrap.servers", "ip:9092");
        properties.put("acks", "all");
        properties.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        properties.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        return properties;
    }
}
```

**编写代码：**

```java
@Autowired
@Qualifier("kafkaProducerConfigProperties")
private Properties kafkaProducerConfigProperties;

@Test
public void testProducer() {
    try (KafkaProducer<String, String> producer = new KafkaProducer<>(kafkaProducerConfigProperties)) {
        for (int i = 0; i < 100; i++) {
            Future<RecordMetadata> future = producer
                .send(new ProducerRecord<>("test", null, String.valueOf(i)));
            future.get();
            log.info("第{}条消息写入成功！", i + 1);
            Thread.sleep(1000);
        }
    } catch (Exception e) {
        log.error(e.getMessage());
    }
}
```

### 5.2、消费者程序开发

**配置KafkaConsumer：**

```java
@Bean
public Properties kafkaConsumerConfigProperties() {
    Properties properties = new Properties();
    properties.put("bootstrap.servers", "ip:9092");
    properties.put("group.id", "test");
    properties.put("enable.auto.commit", "true");
    properties.put("auto.commit.interval.ms", "1000");
    properties.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
    properties.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
    return properties;
}
```

**编写代码：**

```java
@Autowired
@Qualifier("kafkaConsumerConfigProperties")
private Properties kafkaConsumerConfigProperties;

@Test
public void testConsumer() {
    try (KafkaConsumer<String, String> consumer = new KafkaConsumer<>(kafkaConsumerConfigProperties)) {
        consumer.subscribe(Collections.singletonList("test"));
        while (true) {
            // kafka消费者一次拉取一批数据过来
            ConsumerRecords<String, String> records = consumer.poll(Duration.ofSeconds(5));
            records.forEach(record -> {
                String topic = record.topic();
                long offset = record.offset();
                String key = record.key();
                String value = record.value();
                log.info("========================");
                log.info("topic: {}", topic);
                log.info("offset: {}", offset);
                log.info("key: {}", key);
                log.info("value: {}", value);
            });
        }
    } catch (Exception e) {
        log.error(e.getMessage());
    }
}
```

* `group.id`：消费者组的概念，可以在一个消费组中包含多个消费者。如果若干个消费者的group.id是一样的，表示它们就在一个组中，一个组中的消费者是共同消费Kafka中topic的数据。
* Kafka：是一种拉消息模式的消息队列，在消费者中会有一个offset，表示从哪条消息开始拉取数据
* kafkaConsumer.poll：Kafka的消费者API是一批一批数据的拉取

### 5.3、生产者使用异步方式生产消息

如果我们想获取生产者消息是否成功，或者成功生产消息到 Kafka 中后，执行一些其他动作。此时，可以很方便地使用带有回调函数来发送消息。

需求：

1. 在发送消息出现异常时，能够及时打印出异常信息
2. 在发送消息成功时，打印 Kafka 的 topic 名字、分区 id、offset

```java
@Test
public void testProducer() {
    try (KafkaProducer<String, String> producer = new KafkaProducer<>(kafkaProducerConfigProperties)) {
        for (int i = 0; i < 100; i++) {
            ProducerRecord<String, String> record = new ProducerRecord<>("test", null, String.valueOf(i));
            producer.send(record, (metadata, exception) -> {
                if (exception == null) {
                    // 生产成功
                    String topic = metadata.topic();
                    int partition = metadata.partition();
                    long offset = metadata.offset();
                    log.info("topic: {}, partition: {}, offset: {}", topic, partition, offset);
                } else {
                    log.error(exception.getMessage());
                }
            });
        }
    } catch (Exception e) {
        log.error(e.getMessage());
    }
}
```

* 使用匿名内部类实现Callback接口，该接口中表示Kafka服务器响应给客户端，会自动调用onCompletion方法
    * metadata：消息的元数据（属于哪个topic、属于哪个partition、对应的offset是什么）
    * exception：这个对象Kafka生产消息封装了出现的异常，如果为null，表示发送成功，如果不为null，表示出现异常。

## 6、Kafka中的重要概念

![](https://124.71.187.148/images/kafka/20231018142400001.png)

* **Broker**：一台Kafka 服务器就是一个broker。一个集群由多个broker 组成。一个 broker 可以容纳多个topic。

* **Producer**：生产者

* **Consumer**：消费者

* **Topic**：主题，一个 Kafka 集群中，可以包含多个 topic。一个 topic 可以包含多个分区

    * 是一个逻辑结构，生产、消费消息都需要指定 topic，一个 topic 在物理上被划分为一个或多个 partition。

* **Partition**：Kafka 集群的分布式就是由分区来实现的。一个 topic 中的消息可以分布在 topic 中的不同partition 中，每个 partition 是一个有序的队列。

* **Replica**：副本，实现 Kafka 集群的容错，实现 partition 的容错。一个 topic 至少应该包含大于 1 个的副本，

  一个 Leader 和若干个 Follower。

* **Leader**：每个分区多个副本的“主”，生产者发送数据的对象，以及消费者消费数据的对象都是 Leader。

* **Follower**：每个分区多个副本中的“从”，实时从 Leader 中同步数据，保持和 Leader 数据的同步。Leader 发生故障时，某个 Follower 会成为新的 Leader。

* **Consumer Group**：消费者组，由多个 consumer 组成。**消费者组内每个消费者负责消费不同分区的数据，一个分区只能由一个组内消费者消费；** 消费者组之间互不影响。所有的消费者都属于某个消费者组，即消费者组是逻辑上的一个订阅者。

* **Offset**：偏移量。相对消费者、partition 来说，可以通过 offset 来拉取数据

## 7、幂等性

![](https://124.71.187.148/images/kafka/20231018145100001.png)

在生产者生产消息时，如果出现retry时，有可能会一条消息被发送了多次，如果Kafka不具备幂等性的，就有可能会在partition中保存多条一模一样的消息。

### 7.1、配置幂等性

开启参数 `enable.idempotence` 默认为true，false 关闭。

```java
properties.put("enable.idempotence",true);
```

### 7.2、幂等性原理

![](https://124.71.187.148/images/kafka/202310181457000001.png)

为了实现生产者的幂等性，Kafka引入了 Producer ID（PID）和 Sequence Number的概念。

**PID**：每个Producer在初始化时，都会分配一个唯一的PID，这个PID对用户来说，是透明的。

**Sequence Number**：针对每个生产者（对应PID）发送到指定主题分区的消息都对应一个从0开始递增的Sequence Number。

其中 PID Kafka 每次重启都会重新分配，所以幂等性只能保证的是在单分区单会话内不重复。

## 8、Kafka中的分区副本机制

### 8.1、生产者的分区写入策略

#### 轮询策略

* 默认的策略，也是使用最多的策略，可以最大限度保证所有消息平均分配到一个分区
* 如果在生产消息时，key为null，则使用轮询算法均衡地分配分区

#### 随即策略

随机策略，每次都随机地将消息分配到每个分区。在较早的版本，默认的分区策略就是随机策略，也是为了将消息均衡地写入到每个分区。但后续轮询策略表现更佳，所以基本上很少会使用随机策略。

#### 按 key 分配策略

按key分配策略（key.hash() % 分区的数量），有可能会出现「数据倾斜」，例如：某个key包含了大量的数据，因为key值一样，所有所有的数据将都分配到一个分区中，造成该分区的消息数量远大于其他的分区。

#### 自定义分区策略

**创建自定义分区器：**

```java
public class KeyWithRandomPartitioner implements Partitioner {

    private Random r;
    
    @Override
    public void configure(Map<String, ?> configs) {
    r = new Random();
    }
    
    @Override
    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {
    // cluster.partitionCountForTopic 表示获取指定topic的分区数量
    return r.nextInt(1000) % cluster.partitionCountForTopic(topic);
    }
    
    @Override
    public void close() {
    }
}
```

**配置使用：**

```java
properties.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, KeyWithRandomPartitioner.class.getName());
```

> 乱序问题
>
> * 在Kafka中生产者是有写入策略，如果topic有多个分区，就会将数据分散在不同的partition中存储
> * 当partition数量大于1的时候，数据（消息）会打散分布在不同的partition中，因此在每个partition中数据是相对有序的，但是对于topic，数据就会变得无须，这也是为什么说数据是相对有序的。
> * 如果只有一个分区，消息是有序的

### 8.2、消费组 Rebalance 机制

#### Rebalance 再均衡

Kafka 中的 Rebalance 称之为再均衡，是 Kafka 中确保 Consumer group 下所有的 consumer 如何达成一致，分配订阅的 topic 的每个分区的机制。

**Rebalance触发的时机有：**

1. 消费者组中 **consumer 的个数发生变化**。例如：有新的 consumer 加入到消费者组，或者是某个 consumer 停止了。
2. 订阅的 **topic 个数发生变化**。消费者可以订阅多个主题，假设当前的消费者组订阅了三个主题，但有一个主题突然被删除了，此时也需要发生再均衡。（本质上其实是 partition 发生了变化）
3. 订阅的 topic 中的 partition 发生变化。

#### Rebalance 的不良影响

1. 发生 Rebalance 时，consumer group 下的所有 consumer 都会协调在一起共同参与，Kafka 使用分配策略尽可能达到最公平的分配
2. Rebalance 过程会对 consumer group 产生非常严重的影响，Rebalance 的过程中所有的消费者都将停止工作，直到 Rebalance 完成。

### 8.3、消费者的分区分配策略

#### Range 范围分配策略

Range 范围分配策略是 Kafka 默认的分配策略，它可以确保每个消费者消费的分区数量是均衡的。

> 注意：Range 范围分配策略是针对每个 Topic 的

**配置：**

配置消费者的`partition.assignment.strategy`
为`org.apache.kafka.clients.consumer.RangeAssignor`。

**算法公式：**

n = 分区数量 / 消费者数量

m = 分区数量 % 消费者数量

前 m 个消费者消费 n+1 个

剩余消费者消费 n 个

![](https://124.71.187.148/images/kafka/20231019142700001.png)

#### RoundRobin轮询策略

RoundRobinAssignor 轮询策略是将消费组内所有消费者以及消费者所订阅的**所有 topic 的 partition** 按照字典序排序（topic 和分区的 hashcode 进行排序），然后通过轮询方式逐个将分区以此分配给每个消费者。

**配置：**

配置消费者的`partition.assignment.strategy`为`org.apache.kafka.clients.consumer.RoundRobinAssignor`。

![](https://124.71.187.148/images/kafka/20231019143100001.png)

#### Stricky粘性分配策略

从 Kafka 0.11.x 开始，引入此类分配策略。主要目的：

1. 分区分配尽可能均匀
2. 在发生 rebalance 的时候，分区的分配尽可能与上一次分配保持相同

没有发生 rebalance 时，Striky 粘性分配策略和 RoundRobin 分配策略类似。

![](https://124.71.187.148/images/kafka/20231019143300001.png)

上面如果 consumer2 崩溃了，此时需要进行 rebalance。如果是 Range 分配和轮询分配都会重新进行分配，例如：

![](https://124.71.187.148/images/kafka/20231019143300002.png)

通过上图，我们发现，consumer0 和 consumer1 原来消费的分区大多发生了改变。接下来我们再来看下粘性分配策略。

![](https://124.71.187.148/images/kafka/20231019143300003.png)

我们发现，Striky 粘性分配策略，保留 rebalance 之前的分配结果。这样，只是将原先 consumer2 负责的两个分区再均匀分配给 consumer0、consumer1。这样可以明显减少系统资源的浪费，例如：之前 consumer0、consumer1 之前正在消费某几个分区，但由于 rebalance 发生，导致 consumer0、consumer1 需要重新消费之前正在处理的分区，导致不必要的系统开销。（例如：某个事务正在进行就必须要取消了）

### 8.4、副本的ACK机制

producer是不断地往Kafka中写入数据，写入数据会有一个返回结果，表示是否写入成功。这里对应有一个ACKs的配置。对应的代码如下：

```java
properties.put("acks", "all");
```

* acks = 0：生产者只管写入，不管是否写入成功，可能会数据丢失。性能是最好的
* acks = 1：生产者会等到leader分区写入成功后，返回成功，接着发送下一条
* acks = -1/all：确保消息写入到leader分区、还确保消息写入到对应副本都成功后，接着发送下一条，性能是最差的

根据业务情况来选择ack机制，是要求性能最高，一部分数据丢失影响不大，可以选择0/1。如果要求数据一定不能丢失，就得配置为-1/all。

分区中是有leader和follower的概念，为了确保消费者消费的数据是一致的，只能从分区leader去读写消息，follower做的事情就是同步数据，Backup。

## 9、Kafka-Eagle

### 9.1、开启 JMX 端口

JMX(Java Management Extensions) 是一个为应用程序植入管理功能的框架。JMX 是一套标准的代理和服务，实际上，用户可以在任何Java应用程序中使用这些代理和服务实现管理。很多的一些软件都提供了JMX接口，来实现一些管理、监控功能。

**在启动Kafka的脚本前，添加：**

```shell
cd ${KAFKA_HOME}
export JMX_PORT=9988
nohup bin/kafka-server-start.sh config/server.properties &
```

### 9.2、安装Kafka-Eagle

1. 安装 JDK，并配置好 JAVA_HOME。

2. 将 Kafka-Eagle 上传，并解压到 /export/server 目录中。

   ```shell
   cd /export/software/
   wget https://github.com/smartloli/kafka-eagle-bin/archive/v1.4.6.tar.gz
   
   tar -xvzf kafka-eagle-bin-1.4.6.tar.gz -C ../server/
   cd /export/server/kafka-eagle-bin-1.4.6/ 
   tar -xvzf kafka-eagle-web-1.4.6-bin.tar.gz
   cd /export/server/kafka-eagle-bin-1.4.6/kafka-eagle-web-1.4.6
   ```

3. 配置 Kafka-Eagle 环境变量

   ```shell
   vim /etc/profile
   export KE_HOME=/export/server/kafka-eagle-bin-1.4.6/kafka-eagle-web-1.4.6
   export PATH=$PATH:$KE_HOME/bin
   source /etc/profile
   ```

4. 配置 conf 目录下的 system-config.properties

   ```shell
   vim conf/system-config.properties
   
   # :set nu 开启行号
   # 修改第4行，配置kafka集群别名
   kafka.eagle.zk.cluster.alias=cluster1
   # 修改第5行，配置ZK集群地址
   cluster1.zk.list=localhost:2181
   # 注释第6行
   #cluster2.zk.list=xdn10:2181,xdn11:2181,xdn12:2181
   
   # 修改第32行，打开图标统计
   kafka.eagle.metrics.charts=true
   
   # 注释第69行，取消sqlite数据库连接配置
   #kafka.eagle.driver=org.sqlite.JDBC
   #kafka.eagle.url=jdbc:sqlite:/hadoop/kafka-eagle/db/ke.db
   #kafka.eagle.username=root
   #kafka.eagle.password=www.kafka-eagle.org
   
   # 修改第77行，开启mysql
   kafka.eagle.driver=com.mysql.jdbc.Driver
   kafka.eagle.url=jdbc:mysql://localhost:3306/ke?useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull
   kafka.eagle.username=root
   kafka.eagle.password=123456
   ```

5. 配置 JAVA_HOME

   ```shell
   cd /export/server/kafka-eagle-bin-1.4.6/kafka-eagle-web-1.4.6/bin
   vim ke.sh
   # 在第24行添加JAVA_HOME环境配置
   export JAVA_HOME=/export/server/jdk1.8.0_241
   ```

6. 修改 Kafka-Eagle 可执行权限

   ```shell
   cd /export/server/kafka-eagle-bin-1.4.6/kafka-eagle-web-1.4.6/bin
   chmod +x ke.sh
   ```

7. 启动 Kafka-Eagle

   ```shell
   ./ke.sh start
   ```

## Kafka原理（TODO）

###  leader和follower

* Kafka中的leader和follower是相对分区有意义，不是相对broker
* Kafka在创建topic的时候，会尽量分配分区的leader在不同的broker中，其实就是负载均衡
* leader职责：读写数据
* follower职责：同步数据、参与选举（leader crash之后，会选举一个follower重新成为分区的leader
* 注意和ZooKeeper区分
    * ZK的leader负责读、写，follower可以读取
    * Kafka的leader负责读写、follower不能读写数据（确保每个消费者消费的数据是一致的），Kafka一个topic有多个分区leader，一样可以实现数据操作的负载均衡

### AR\ISR\OSR

* AR表示一个topic下的所有副本
* ISR：In Sync Replicas，正在同步的副本（可以理解为当前有几个follower是存活的）
* OSR：Out of Sync Replicas，不再同步的副本
* AR = ISR + OSR

### leader选举

* Controller：controller是kafka集群的老大，是针对Broker的一个角色

    * Controller是高可用的，是用过ZK来进行选举

* Leader：是针对partition的一个角色

    * Leader是通过ISR来进行快速选举

* 如果Kafka是基于ZK来进行选举，ZK的压力可能会比较大。例如：某个节点崩溃，这个节点上不仅仅只有一个leader，是有不少的leader需要选举。通过ISR快速进行选举。

* leader的负载均衡

    * 如果某个broker crash之后，就可能会导致partition的leader分布不均匀，就是一个broker上存在一个topic下不同partition的leader
    * 通过以下指令，可以将leader分配到优先的leader对应的broker，确保leader是均匀分配的

  ```shell
  bin/kafka-leader-election.sh --bootstrap-server node1.itcast.cn:9092 --topic test --partition=2 --election-type preferred
  ```



### Kafka读写流程

* 写流程
    * 通过ZooKeeper找partition对应的leader，leader是负责写的
    * producer开始写入数据
    * ISR里面的follower开始同步数据，并返回给leader ACK
    * 返回给producer ACK
* 读流程
    * 通过ZooKeeper找partition对应的leader，leader是负责读的
    * 通过ZooKeeper找到消费者对应的offset
    * 然后开始从offset往后顺序拉取数据
    * 提交offset（自动提交——每隔多少秒提交一次offset、手动提交——放入到事务中提交）

### Kafka的物理存储

* Kafka的数据组织结构
    * topic
    * partition
    * segment
        * .log数据文件
        * .index（稀疏索引）
        * .timeindex（根据时间做的索引）
* 深入了解读数据的流程
    * 消费者的offset是一个针对partition全局offset
    * 可以根据这个offset找到segment段
    * 接着需要将全局的offset转换成segment的局部offset
    * 根据局部的offset，就可以从（.index稀疏索引）找到对应的数据位置
    * 开始顺序读取

### 消息传递的语义性

Flink里面有对应的每种不同机制的保证，提供Exactly-Once保障（二阶段事务提交方式）

* At-most once：最多一次（只管把数据消费到，不管有没有成功，可能会有数据丢失）
* At-least once：最少一次（有可能会出现重复消费）
* Exactly-Once：仅有一次（事务性性的保障，保证消息有且仅被处理一次）

### Kafka的消息不丢失

* broker消息不丢失：因为有副本relicas的存在，会不断地从leader中同步副本，所以，一个broker crash，不会导致数据丢失，除非是只有一个副本。
* 生产者消息不丢失：ACK机制（配置成ALL/-1）、配置0或者1有可能会存在丢失
* 消费者消费不丢失：重点控制offset
    * At-least once：一种数据可能会重复消费
    * Exactly-Once：仅被一次消费

### 数据积压

* 数据积压指的是消费者因为有一些外部的IO、一些比较耗时的操作（Full GC——Stop the world），就会造成消息在partition中一直存在得不到消费，就会产生数据积压
* 在企业中，我们要有监控系统，如果出现这种情况，需要尽快处理。虽然后续的Spark Streaming/Flink可以实现背压机制，但是数据累积太多一定对实时系统它的实时性是有说影响的

### 数据清理&配额限速

* 数据清理
    * Log Deletion（日志删除）：如果消息达到一定的条件（时间、日志大小、offset大小），Kafka就会自动将日志设置为待删除（segment端的后缀名会以 .delete结尾），日志管理程序会定期清理这些日志
        * 默认是7天过期
    * Log Compaction（日志合并）
        * 如果在一些key-value数据中，一个key可以对应多个不同版本的value
        * 经过日志合并，就会只保留最新的一个版本
* 配额限速
    * 可以限制Producer、Consumer的速率
    * 防止Kafka的速度过快，占用整个服务器（broker）的所有IO资源
