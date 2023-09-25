export const data = JSON.parse("{\"key\":\"v-42d31e13\",\"path\":\"/designmode/Builder.html\",\"title\":\"建造者模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"建造者模式\",\"author\":\"Vingkin\",\"date\":\"2022-06-22T00:00:00.000Z\",\"description\":\"概述 将一个复杂对象的构建与表示分离，使得同样的构建过程可以创建不同的表示。 分离了部件的构造(由Builder来负责)和装配(由Director负责)。 从而可以构造出复杂的对象。这个模式适用于：某个对象的构建过程复杂的情况。 由于实现了构建和装配的解耦。不同的构建器，相同的装配，也可以做出不同的对象；相同的构建器，不同的装配顺序也可以做出不同的对象。也就是实现了构建算法、装配算法的解耦，实现了更好的复用。 建造者模式可以将部件和其组装过程分开，一步一步创建一个复杂的对象。用户只需要指定复杂对象的类型就可以得到该对象，而无须知道其内部的具体构造细节。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vingkin.github.io/Blog/designmode/Builder.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Vingkin的学习博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"建造者模式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"概述 将一个复杂对象的构建与表示分离，使得同样的构建过程可以创建不同的表示。 分离了部件的构造(由Builder来负责)和装配(由Director负责)。 从而可以构造出复杂的对象。这个模式适用于：某个对象的构建过程复杂的情况。 由于实现了构建和装配的解耦。不同的构建器，相同的装配，也可以做出不同的对象；相同的构建器，不同的装配顺序也可以做出不同的对象。也就是实现了构建算法、装配算法的解耦，实现了更好的复用。 建造者模式可以将部件和其组装过程分开，一步一步创建一个复杂的对象。用户只需要指定复杂对象的类型就可以得到该对象，而无须知道其内部的具体构造细节。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Vingkin\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2022-06-22T00:00:00.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"建造者模式\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2022-06-22T00:00:00.000Z\\\",\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Vingkin\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"概述\",\"slug\":\"概述\",\"link\":\"#概述\",\"children\":[]},{\"level\":2,\"title\":\"结构\",\"slug\":\"结构\",\"link\":\"#结构\",\"children\":[]},{\"level\":2,\"title\":\"实例\",\"slug\":\"实例\",\"link\":\"#实例\",\"children\":[]},{\"level\":2,\"title\":\"优缺点\",\"slug\":\"优缺点\",\"link\":\"#优缺点\",\"children\":[]},{\"level\":2,\"title\":\"使用场景\",\"slug\":\"使用场景\",\"link\":\"#使用场景\",\"children\":[]},{\"level\":2,\"title\":\"模式扩展\",\"slug\":\"模式扩展\",\"link\":\"#模式扩展\",\"children\":[]},{\"level\":2,\"title\":\"创建者模式对比\",\"slug\":\"创建者模式对比\",\"link\":\"#创建者模式对比\",\"children\":[{\"level\":3,\"title\":\"工厂方法模式VS建造者模式\",\"slug\":\"工厂方法模式vs建造者模式\",\"link\":\"#工厂方法模式vs建造者模式\",\"children\":[]},{\"level\":3,\"title\":\"抽象工厂模式VS建造者模式\",\"slug\":\"抽象工厂模式vs建造者模式\",\"link\":\"#抽象工厂模式vs建造者模式\",\"children\":[]}]}],\"git\":{},\"readingTime\":{\"minutes\":7.91,\"words\":2374},\"filePathRelative\":\"designmode/Builder.md\",\"localizedDate\":\"2022年6月22日\",\"excerpt\":\"<h2> 概述</h2>\\n<p>将一个复杂对象的构建与表示分离，使得同样的构建过程可以创建不同的表示。</p>\\n<img src=\\\"https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/image-20200413225341516.png\\\" style=\\\"zoom:60%;\\\">\\n<ul>\\n<li>分离了部件的<strong>构造</strong>(由Builder来负责)和<strong>装配</strong>(由Director负责)。 从而可以构造出复杂的对象。这个模式适用于：某个对象的构建过程复杂的情况。</li>\\n<li>由于实现了构建和装配的解耦。不同的构建器，相同的装配，也可以做出不同的对象；相同的构建器，不同的装配顺序也可以做出不同的对象。也就是实现了构建算法、装配算法的解耦，实现了更好的复用。</li>\\n<li>建造者模式可以将部件和其组装过程分开，一步一步创建一个复杂的对象。用户只需要指定复杂对象的类型就可以得到该对象，而无须知道其内部的具体构造细节。</li>\\n</ul>\",\"copyright\":{\"author\":\"Vingkin\"},\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
