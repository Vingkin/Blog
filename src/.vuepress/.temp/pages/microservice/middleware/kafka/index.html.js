export const data = JSON.parse("{\"key\":\"v-623319fe\",\"path\":\"/microservice/middleware/kafka/\",\"title\":\"Kafka\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Kafka\",\"author\":\"Vingkin\",\"date\":\"2023-10-17T00:00:00.000Z\",\"description\":\"目录 1、Kafka简介 1.1、消息队列 消息队列——用于存放消息的组件 程序员可以将消息放入到队列中，也可以从消息队列中获取消息 很多时候消息队列不是一个永久性的存储，是作为临时存储存在的（设定一个期限：设置消息在MQ中保存10天） 消息队列中间件：消息队列的组件，例如：Kafka、Active MQ、RabbitMQ、RocketMQ、ZeroMQ 1.2、Kafka的应用场景\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vingkin.github.io/Blog/Blog/microservice/middleware/kafka/\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Vingkin的学习博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Kafka\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"目录 1、Kafka简介 1.1、消息队列 消息队列——用于存放消息的组件 程序员可以将消息放入到队列中，也可以从消息队列中获取消息 很多时候消息队列不是一个永久性的存储，是作为临时存储存在的（设定一个期限：设置消息在MQ中保存10天） 消息队列中间件：消息队列的组件，例如：Kafka、Active MQ、RabbitMQ、RocketMQ、ZeroMQ 1.2、Kafka的应用场景\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-10-20T07:18:26.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Vingkin\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-10-17T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-10-20T07:18:26.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Kafka\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-10-17T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2023-10-20T07:18:26.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Vingkin\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"1、Kafka简介\",\"slug\":\"_1、kafka简介\",\"link\":\"#_1、kafka简介\",\"children\":[{\"level\":3,\"title\":\"1.1、消息队列\",\"slug\":\"_1-1、消息队列\",\"link\":\"#_1-1、消息队列\",\"children\":[]},{\"level\":3,\"title\":\"1.2、Kafka的应用场景\",\"slug\":\"_1-2、kafka的应用场景\",\"link\":\"#_1-2、kafka的应用场景\",\"children\":[]},{\"level\":3,\"title\":\"1.3、消息队列的两种模型\",\"slug\":\"_1-3、消息队列的两种模型\",\"link\":\"#_1-3、消息队列的两种模型\",\"children\":[]}]},{\"level\":2,\"title\":\"2、Kafka 环境搭建\",\"slug\":\"_2、kafka-环境搭建\",\"link\":\"#_2、kafka-环境搭建\",\"children\":[{\"level\":3,\"title\":\"2.1、搭建 Kafka 环境\",\"slug\":\"_2-1、搭建-kafka-环境\",\"link\":\"#_2-1、搭建-kafka-环境\",\"children\":[]},{\"level\":3,\"title\":\"2.2、目录结构分析\",\"slug\":\"_2-2、目录结构分析\",\"link\":\"#_2-2、目录结构分析\",\"children\":[]}]},{\"level\":2,\"title\":\"3、基础操作\",\"slug\":\"_3、基础操作\",\"link\":\"#_3、基础操作\",\"children\":[{\"level\":3,\"title\":\"3.1、创建 topic\",\"slug\":\"_3-1、创建-topic\",\"link\":\"#_3-1、创建-topic\",\"children\":[]},{\"level\":3,\"title\":\"3.2、生产消息到 Kafka\",\"slug\":\"_3-2、生产消息到-kafka\",\"link\":\"#_3-2、生产消息到-kafka\",\"children\":[]},{\"level\":3,\"title\":\"3.3、从 Kafka 消费消息\",\"slug\":\"_3-3、从-kafka-消费消息\",\"link\":\"#_3-3、从-kafka-消费消息\",\"children\":[]},{\"level\":3,\"title\":\"3.4、Kafka Tool\",\"slug\":\"_3-4、kafka-tool\",\"link\":\"#_3-4、kafka-tool\",\"children\":[]}]},{\"level\":2,\"title\":\"4、Kafka 基准测试\",\"slug\":\"_4、kafka-基准测试\",\"link\":\"#_4、kafka-基准测试\",\"children\":[{\"level\":3,\"title\":\"4.1、创建 topic\",\"slug\":\"_4-1、创建-topic\",\"link\":\"#_4-1、创建-topic\",\"children\":[]},{\"level\":3,\"title\":\"4.2、生产消息基准测试\",\"slug\":\"_4-2、生产消息基准测试\",\"link\":\"#_4-2、生产消息基准测试\",\"children\":[]}]},{\"level\":2,\"title\":\"5、Kafka Java API开发\",\"slug\":\"_5、kafka-java-api开发\",\"link\":\"#_5、kafka-java-api开发\",\"children\":[{\"level\":3,\"title\":\"5.1、生产者程序开发\",\"slug\":\"_5-1、生产者程序开发\",\"link\":\"#_5-1、生产者程序开发\",\"children\":[]},{\"level\":3,\"title\":\"5.2、消费者程序开发\",\"slug\":\"_5-2、消费者程序开发\",\"link\":\"#_5-2、消费者程序开发\",\"children\":[]},{\"level\":3,\"title\":\"5.3、生产者使用异步方式生产消息\",\"slug\":\"_5-3、生产者使用异步方式生产消息\",\"link\":\"#_5-3、生产者使用异步方式生产消息\",\"children\":[]}]},{\"level\":2,\"title\":\"6、Kafka中的重要概念\",\"slug\":\"_6、kafka中的重要概念\",\"link\":\"#_6、kafka中的重要概念\",\"children\":[]},{\"level\":2,\"title\":\"7、幂等性\",\"slug\":\"_7、幂等性\",\"link\":\"#_7、幂等性\",\"children\":[{\"level\":3,\"title\":\"7.1、配置幂等性\",\"slug\":\"_7-1、配置幂等性\",\"link\":\"#_7-1、配置幂等性\",\"children\":[]},{\"level\":3,\"title\":\"7.2、幂等性原理\",\"slug\":\"_7-2、幂等性原理\",\"link\":\"#_7-2、幂等性原理\",\"children\":[]}]},{\"level\":2,\"title\":\"8、Kafka中的分区副本机制\",\"slug\":\"_8、kafka中的分区副本机制\",\"link\":\"#_8、kafka中的分区副本机制\",\"children\":[{\"level\":3,\"title\":\"8.1、生产者的分区写入策略\",\"slug\":\"_8-1、生产者的分区写入策略\",\"link\":\"#_8-1、生产者的分区写入策略\",\"children\":[]},{\"level\":3,\"title\":\"8.2、消费组 Rebalance 机制\",\"slug\":\"_8-2、消费组-rebalance-机制\",\"link\":\"#_8-2、消费组-rebalance-机制\",\"children\":[]},{\"level\":3,\"title\":\"8.3、消费者的分区分配策略\",\"slug\":\"_8-3、消费者的分区分配策略\",\"link\":\"#_8-3、消费者的分区分配策略\",\"children\":[]},{\"level\":3,\"title\":\"8.4、副本的ACK机制\",\"slug\":\"_8-4、副本的ack机制\",\"link\":\"#_8-4、副本的ack机制\",\"children\":[]}]},{\"level\":2,\"title\":\"9、Kafka-Eagle\",\"slug\":\"_9、kafka-eagle\",\"link\":\"#_9、kafka-eagle\",\"children\":[{\"level\":3,\"title\":\"9.1、开启 JMX 端口\",\"slug\":\"_9-1、开启-jmx-端口\",\"link\":\"#_9-1、开启-jmx-端口\",\"children\":[]},{\"level\":3,\"title\":\"9.2、安装Kafka-Eagle\",\"slug\":\"_9-2、安装kafka-eagle\",\"link\":\"#_9-2、安装kafka-eagle\",\"children\":[]}]},{\"level\":2,\"title\":\"Kafka原理（TODO）\",\"slug\":\"kafka原理-todo\",\"link\":\"#kafka原理-todo\",\"children\":[{\"level\":3,\"title\":\"leader和follower\",\"slug\":\"leader和follower\",\"link\":\"#leader和follower\",\"children\":[]},{\"level\":3,\"title\":\"AR\\\\ISR\\\\OSR\",\"slug\":\"ar-isr-osr\",\"link\":\"#ar-isr-osr\",\"children\":[]},{\"level\":3,\"title\":\"leader选举\",\"slug\":\"leader选举\",\"link\":\"#leader选举\",\"children\":[]},{\"level\":3,\"title\":\"Kafka读写流程\",\"slug\":\"kafka读写流程\",\"link\":\"#kafka读写流程\",\"children\":[]},{\"level\":3,\"title\":\"Kafka的物理存储\",\"slug\":\"kafka的物理存储\",\"link\":\"#kafka的物理存储\",\"children\":[]},{\"level\":3,\"title\":\"消息传递的语义性\",\"slug\":\"消息传递的语义性\",\"link\":\"#消息传递的语义性\",\"children\":[]},{\"level\":3,\"title\":\"Kafka的消息不丢失\",\"slug\":\"kafka的消息不丢失\",\"link\":\"#kafka的消息不丢失\",\"children\":[]},{\"level\":3,\"title\":\"数据积压\",\"slug\":\"数据积压\",\"link\":\"#数据积压\",\"children\":[]},{\"level\":3,\"title\":\"数据清理&配额限速\",\"slug\":\"数据清理-配额限速\",\"link\":\"#数据清理-配额限速\",\"children\":[]}]}],\"git\":{\"createdTime\":1696754878000,\"updatedTime\":1697786306000,\"contributors\":[{\"name\":\"Vingkin\",\"email\":\"1830053226@qq.com\",\"commits\":2}]},\"readingTime\":{\"minutes\":20.2,\"words\":6061},\"filePathRelative\":\"microservice/middleware/kafka/README.md\",\"localizedDate\":\"2023年10月17日\",\"excerpt\":\"<p><strong>目录</strong></p>\\n\\n<!--more-->\\n<h2> 1、Kafka简介</h2>\\n<h3> 1.1、消息队列</h3>\\n<ul>\\n<li>消息队列——用于存放消息的组件</li>\\n<li>程序员可以将消息放入到队列中，也可以从消息队列中获取消息</li>\\n<li>很多时候消息队列不是一个永久性的存储，是作为临时存储存在的（设定一个期限：设置消息在MQ中保存10天）</li>\\n<li>消息队列中间件：消息队列的组件，例如：Kafka、Active MQ、RabbitMQ、RocketMQ、ZeroMQ</li>\\n</ul>\\n<h3> 1.2、Kafka的应用场景</h3>\",\"copyright\":{\"author\":\"Vingkin\"},\"autoDesc\":true}")
