import {navbar} from "vuepress-theme-hope";

export default navbar([
    "/",
    {text: 'Java相关', icon: "fa-brands fa-java", link: '/guide/interview/Java'},
    {text: '操作系统', icon: "fa-brands fa-ubuntu", link: '/OS/OS1'},
    {text: 'Netty', link: '/netty/nio/three_component'},
    {text: '设计模式', link: '/designmode/SoftwareDesignPrinciples'},
    {text: '机器学习', icon: "/assets/icon/machine-learning.svg", link: '/ml/YOLOv3'},
    {
        text: '微服务',
        icon: "/assets/icon/microservices-1.svg",
        children: [
            {text: '响应式编程', link: '/microservice/reactive/ReactiveStream'},
            {text: '中间件', link: '/microservice/middleware/elasticsearch/ElasticSearchBase'}
        ]
    },
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
