import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    // {
    //     text: 'Java相关',
    //     icon: "fa-brands fa-java",
    //     link: '/guide/interview/Java'
    // }, {
    //     text: '操作系统',
    //     icon: "fa-brands fa-ubuntu",
    //     link: '/OS/OS1'
    // }, {
    //     text: 'Netty',
    //     link: '/netty/nio/three_component'
    // }, {
    //     text: '设计模式',
    //     link: '/designmode/SoftwareDesignPrinciples'
    // }, {
    //     text: '机器学习',
    //     icon: "/assets/icon/machine-learning.svg",
    //     link: '/ml/YOLOv3'
    // }, {
    //     text: '微服务',
    //     icon: "/assets/icon/microservice.svg",
    //     children: [
    //         {text: '响应式编程', link: '/microservice/reactive/ReactiveStream'},
    //         {text: '中间件', link: '/microservice/middleware/elasticsearch/ElasticSearchBase'}
    //     ]
    // },
    {
        text: '博文',
        icon: "fas fa-book-reader fa-lg",
        children: [
            {
                text: '微服务',
                prefix: '/microservice/',
                children: [
                    {
                        text: '中间件',
                        icon: "/assets/icon/Middleware.svg",
                        link: 'middleware/'
                    }, {
                        text: '响应式编程',
                        icon: "/assets/icon/reactive_programming.svg",
                        link: 'reactive/'
                    }
                ]
            }, {
                text: '大数据',
                prefix: '/bigdata/',
                children: [
                    {
                        text: 'Hadoop',
                        icon: "/assets/icon/Hadoop.svg",
                        link: 'hadoop/'
                    }, {
                        text: 'Hive',
                        icon: "/assets/icon/hive.svg",
                        link: 'hive/'
                    }
                ]
            }, {
                text: '八股',
                prefix: '/interview/',
                children: [
                    {
                        text: 'Java',
                        icon: "fab fa-java",
                        link: 'java'
                    }, {
                        text: '系统设计',
                        icon: "/assets/icon/system_design.svg",
                        link: 'systemdesign'
                    }, {
                        text: '数据库',
                        icon: 'fa-solid fa-database',
                        link: 'database'
                    }, {
                        text: '计算机基础',
                        icon: 'fa-solid fa-computer',
                        link: 'computer'
                    }, {
                        text: '海量数据',
                        icon: '/assets/icon/data.svg',
                        link: 'bigdata'
                    }, {
                        text: '分布式',
                        icon: 'fa-brands fa-docker',
                        link: 'distributed'
                    }
                ]
            }, {
                text: '其他',
                // prefix: '//',
                children: [
                    {
                        text: '设计模式',
                        icon: "/assets/icon/design.svg",
                        link: '/designmode'
                    }, {
                        text: 'Netty',
                        icon: "/assets/icon/Netty_16.svg",
                        link: '/netty/'
                    }, {
                        text: '机器学习',
                        icon: "/assets/icon/AI.svg",
                        link: '/ml/'
                    }
                ]
            }
        ]
    },
    {
        text: "关于我",
        icon: "fa-solid fa-circle-info fa-xl",
        link: "intro"
    }
    /*
    "/demo/",
       {
        text: "博文",
        icon: "pen-to-square",
        prefix: "/posts/",
        children: [
          {
            text: "苹果",
            icon: "pen-to-square",
            prefix: "apple/",
            children: [
              { text: "苹果1", icon: "pen-to-square", link: "1" },
              { text: "苹果2", icon: "pen-to-square", link: "2" },
              "3",
              "4",
            ],
          },
          {
            text: "香蕉",
            icon: "pen-to-square",
            prefix: "banana/",
            children: [
              {
                text: "香蕉 1",
                icon: "pen-to-square",
                link: "1",
              },
              {
                text: "香蕉 2",
                icon: "pen-to-square",
                link: "2",
              },
              "3",
              "4",
            ],
          },
          { text: "樱桃", icon: "pen-to-square", link: "cherry" },
          { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
          "tomato",
          "strawberry",
        ],
      },
      {
        text: "V2 文档",
        icon: "book",
        link: "https://theme-hope.vuejs.press/zh/",
      },
      */
]);
