import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    '/microservice': [
        {
            text: '中间件',
            icon: "/assets/icon/Middleware_16.svg",
            collapsible: true,
            children: [
                {
                    text: 'ElasticSearch',
                    // icon: '/assets/icon/elasticsearch-Elasticsearch.svg',
                    collapsible: true,
                    children: [
                        {text: 'ElasticSearch 基础', link: '/microservice/middleware/elasticsearch/ElasticSearchBase'},
                        {text: 'ElasticSearch 实战', link: '/microservice/middleware/elasticsearch/ElasticSearchApp'}
                    ]
                }, {
                    text: 'Redis',
                    // icon: '/assets/icon/redis.svg',
                    collapsible: true,
                    children: [
                        {text: 'Redis 基础', link: '/microservice/middleware/redis/RedisBase'},
                        {text: 'Redis 实战', link: '/microservice/middleware/redis/RedisApp'}
                    ]
                }
            ]
        }, {
            text: '响应式编程',
            icon: "/assets/icon/reactive_programming_16.svg",
            collapsible: true,
            children: [
                {text: 'Reactive Stream', link: '/microservice/reactive/ReactiveStream'},
                {text: 'WebFlux', link: '/microservice/reactive/webflux'}
            ]
        }
    ],
    '/bigdata': [
        {
            text: 'Hadoop',
            icon: "/assets/icon/Hadoop16.svg",
            collapsible: true,
            children: [
                {
                    text: 'HDFS',
                    collapsible: true,
                    children: [
                        {text: 'HDFS 集群管理与运维', link: '/bigdata/hadoop/hdfs/1'},
                        {text: 'HDFS 架构原理', link: '/bigdata/hadoop/hdfs/2'},
                        {text: 'HDFS 数据安全与隐私保护', link: '/bigdata/hadoop/hdfs/3'},
                        {text: 'HDFS 源码分析', link: '/bigdata/hadoop/hdfs/4'}
                    ]
                }, {
                    text: 'MapReduce',
                    collapsible: true,
                    children: [
                        {text: 'MapReduce 基础入门', link: '/bigdata/hadoop/mapreduce/1'},
                        {text: 'MapReduce 基础编程', link: '/bigdata/hadoop/mapreduce/2'},
                        {text: 'MapReduce 高阶编程', link: '/bigdata/hadoop/mapreduce/3'},
                        {text: 'MapReduce 整体流程核心代码解读', link: '/bigdata/hadoop/mapreduce/4'},
                        {text: 'MapReduce 性能优化', link: '/bigdata/hadoop/mapreduce/5'}
                    ]
                }, {
                    text: 'YARN',
                    collapsible: true,
                    children: [
                        {text: 'YARN 框架概述', link: '/bigdata/hadoop/yarn/1'}
                    ]
                }
            ]
        }, {
            text: 'Hive',
            icon: "/assets/icon/hive16.svg",
            collapsible: true,
            children: [
                {text: '数据仓库基础与 Apache Hive 入门', link: '/bigdata/hive/1'},
                {text: 'Hive SQL 数据定义语言（DDL）', link: '/bigdata/hive/2'},
                {text: 'Hive SQL 数据操控、查询语言（DML，DQL）', link: '/bigdata/hive/3'},
                {text: 'Hive 函数、运算符使用', link: '/bigdata/hive/4'},
                {text: 'Hive 函数重要应用案例', link: '/bigdata/hive/5'},
                {text: 'Hive 性能优化及 Hive3 新特性', link: '/bigdata/hive/6'},
            ]
        }
    ],
    '/guide': [
        {
            text: 'Java',
            icon: "fa-brands fa-java fa-lg",
            collapsible: true,
            children: [
                {text: 'Java 基础', link: '/guide/interview/Java'},
                {text: 'JDK8 新特性', link: '/guide/interview/JDK8'},
                {text: 'Java 并发', link: '/guide/interview/concurrent'},
                {text: 'JVM', link: '/guide/interview/JVM'}
            ]
        },
        {
            text: '系统设计',
            icon: "/assets/icon/system_design_20.svg",
            collapsible: true,
            children: [
                {
                    text: '基础',
                    collapsible: true,
                    children: [
                        {text: '幂等', link: '/guide/interview/Idempotency'}
                    ]
                },
                {
                    text: '开发框架',
                    collapsible: true,
                    children: [
                        {text: 'Spring', link: '/guide/interview/Spring'},
                        {text: 'Spring 高级', link: '/guide/interview/spriiiiing'},
                        {text: 'SpringMVC', link: '/guide/interview/SpringMVC'},
                        {text: 'MyBatis', link: '/guide/interview/MyBatis'},
                        {text: 'SpringBoot', link: '/guide/interview/SpringBoot'}
                    ]
                }
            ]
        },
        {
            text: '数据库',
            icon: 'fa-solid fa-database',
            collapsible: true,
            children: [
                {text: 'MySQL', link: '/guide/interview/Mysql'},
                {text: 'Redis', link: '/guide/interview/Redis'},
                {text: '数据库开发规范', link: '/guide/interview/DatabaseGuidelines'}
            ]
        },
        {
            text: '计算机基础',
            icon: 'fa-solid fa-computer',
            collapsible: true,
            children: [
                {text: '操作系统', link: '/guide/interview/OS'},
                {text: '计算机网络', link: '/guide/interview/ComputerNetwork'},
                {text: '数据结构', link: '/guide/interview/DataStructure'},
                {text: '代码模板', link: '/guide/interview/CodeTemplate'}
            ]
        },
        // {
        //     text: '面经',
        //     children: [
        //         { text: '携程', link: 'guide/interview/xiecheng' }
        //         // { text: '华为', link: 'guide/interview/huawei' }
        //     ]
        // },
        {
            text: '海量数据',
            icon: '/assets/icon/data_16.svg',
            collapsible: true,
            children: [
                {text: '如何从海量数据中找出高频词？', link: '/guide/interview/high_frequency_words'}
            ]
        },
        {
            text: '分布式',
            icon: 'fa-brands fa-docker fa-sm',
            collapsible: true,
            children: [
                {
                    text: 'ID 生成器',
                    children: [
                        {text: '雪花算法', link: '/guide/interview/SnowFlake'}
                    ]
                }
            ]
        }
    ],
    // '/OS': [
    //     {text: '操作系统上', link: '/OS/OS1'},
    //     {text: '操作系统中', link: '/OS/OS2'},
    //     {text: '操作系统下', link: '/OS/OS3'}
    // ],
    '/designmode': [
        {text: '软件设计原则', link: '/designmode/SoftwareDesignPrinciples'},
        {
            text: '创建者模式',
            collapsible: true,
            children: [
                {text: '单例模式', link: '/designmode/Singleton'},
                {text: '工厂模式', link: '/designmode/Factory'},
                {text: '原型模式', link: '/designmode/Prototype'},
                {text: '建造者模式', link: '/designmode/Builder'}
            ]
        },
        {
            text: '结构型模式',
            collapsible: true,
            children: [
                {text: '适配器模式', link: '/designmode/Adapter'},
                {text: '代理模式', link: '/designmode/Proxy'}
            ]
        },
        {
            text: '行为型模式',
            collapsible: true,
            children: [
                {text: '模板方法模式', link: '/designmode/Template'},
                {text: '观察者模式', link: '/designmode/Observer'},
                {text: '策略模式', link: '/designmode/Strategy'}
            ]
        }
    ],
    '/netty': [
        {
            text: 'NIO基础',
            collapsible: true,
            children: [
                {text: '三大组件', link: '/netty/nio/three_component'},
                {text: 'ByteBuffer', link: '/netty/nio/bytebuffer'},
                {text: '文件编程', link: '/netty/nio/file_programming'},
                {text: '网络编程', link: '/netty/nio/network_programming'},
                {text: 'NIO vs. BIO', link: '/netty/nio/NIOvsBIO'}
            ]
        },
        {
            text: 'Netty入门',
            collapsible: true,
            children: [
                {text: '概述', link: '/netty/basics/summary'},
                {text: 'Hello World', link: '/netty/basics/helloworld'},
                {text: '组件', link: '/netty/basics/component'},
                {text: '双向通信', link: '/netty/basics/two_way_communication'}
            ]
        },
        {
            text: 'Netty进阶',
            collapsible: true,
            children: [
                {text: '粘包与半包', link: '/netty/advance/bag'},
                {text: '协议的设计与解析', link: '/netty/advance/protocol'},
                {text: '聊天室案例', link: '/netty/advance/chatroom'}
            ]
        },
        {
            text: 'Netty优化与源码',
            collapsible: true,
            children: [
                {text: '优化', link: '/netty/optimization/optimization'},
                {text: '源码', link: '/netty/optimization/source_code'}
            ]
        }
    ],
    '/ml': [
        {
            text: '论文解读',
            collapsible: true,
            children: [
                {text: 'YOLOv3', link: '/ml/YOLOv3'},
                {text: 'GAN', link: '/ml/GAN'},
                {text: 'CycleGAN', link: '/ml/CycleGAN'},
                {text: 'pix2pix', link: '/ml/pix2pix'}
            ]
        }
    ]
    /*  "/": [
        "",
        {
          text: "如何使用",
          icon: "laptop-code",
          prefix: "demo/",
          link: "demo/",
          children: "structure",
        },
        {
          text: "文章",
          icon: "book",
          prefix: "posts/",
          children: "structure",
        },
        "intro",
        "slides",
      ],*/
});
