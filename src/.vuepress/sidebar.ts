import {sidebar} from "vuepress-theme-hope";

export default sidebar({
    '/microservice': [
        {
            text: '响应式编程',
            collapsible: true,
            children: [
                {text: 'Reactive Stream', link: '/microservice/reactive/ReactiveStream'},
                {text: 'WebFlux', link: '/microservice/reactive/webflux'}
            ]
        }, {
            text: '中间件',
            collapsible: true,
            children: [
                {
                    text: 'ElasticSearch',
                    collapsible: true,
                    children: [
                        {text: 'ElasticSearch 基础', link: '/microservice/middleware/elasticsearch/ElasticSearchBase'},
                        {text: 'ElasticSearch 实战', link: '/microservice/middleware/elasticsearch/ElasticSearchApp'}
                    ]
                }, {
                    text: 'Redis',
                    collapsible: true,
                    children: [
                        {text: 'Redis 基础', link: '/microservice/middleware/redis/RedisBase'},
                        {text: 'Redis 实战', link: '/microservice/middleware/redis/RedisApp'}
                    ]
                }
            ]
        }
    ],
    '/guide': [
        {
            text: 'Java',
            collapsible: true,
            children: [
                {text: 'Java基础', link: '/guide/interview/Java'},
                {text: 'JDK8新特性', link: '/guide/interview/JDK8'},
                {text: 'Java并发', link: '/guide/interview/concurrent'},
                {text: 'JVM', link: '/guide/interview/JVM'}
            ]
        },
        {
            text: '系统设计',
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
                        {text: 'Spring高级', link: '/guide/interview/spriiiiing'},
                        {text: 'SpringMVC', link: '/guide/interview/SpringMVC'},
                        {text: 'MyBatis', link: '/guide/interview/MyBatis'},
                        {text: 'SpringBoot', link: '/guide/interview/SpringBoot'}
                    ]
                }
            ]
        },
        {
            text: '数据库',
            collapsible: true,
            children: [
                {text: 'MySQL', link: '/guide/interview/Mysql'},
                {text: 'Redis', link: '/guide/interview/Redis'},
                {text: '数据库开发规范', link: '/guide/interview/DatabaseGuidelines'}
            ]
        },
        {
            text: '计算机基础',
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
            collapsible: true,
            children: [
                {text: '如何从海量数据中找出高频词？', link: '/guide/interview/high_frequency_words'}
            ]
        },
        {
            text: '分布式',
            collapsible: true,
            children: [
                {
                    text: 'ID生成器',
                    children: [
                        {text: '雪花算法', link: '/guide/interview/SnowFlake'}
                    ]
                }
            ]
        }
    ],
    '/OS': [
        {text: '操作系统上', link: '/OS/OS1'},
        {text: '操作系统中', link: '/OS/OS2'},
        {text: '操作系统下', link: '/OS/OS3'}
    ],
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
