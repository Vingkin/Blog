export const data = JSON.parse("{\"key\":\"v-3b988860\",\"path\":\"/designmode/Proxy.html\",\"title\":\"代理模式\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"代理模式\",\"author\":\"Vingkin\",\"date\":\"2023-08-31T00:00:00.000Z\",\"description\":\"概述 由于某些原因需要给某对象提供一个代理以控制对该对象的访问。这时，访问对象不适合或者不能直接引用目标对象，代理对象作为访问对象和目标对象之间的中介。 Java中的代理按照代理类生成时机不同又分为静态代理和动态代理。静态代理代理类在编译期就生成，而动态代理代理类则是在Java运行时动态生成。动态代理又有JDK代理和CGLib代理两种。 结构 代理（Proxy）模式分为三种角色： 抽象主题（Subject）类： 通过接口或抽象类声明真实主题和代理对象实现的业务方法。 真实主题（Real Subject）类： 实现了抽象主题中的具体业务，是代理对象所代表的真实对象，是最终要引用的对象。 代理（Proxy）类 ： 提供了与真实主题相同的接口，其内部含有对真实主题的引用，它可以访问、控制或扩展真实主题的功能。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vingkin.github.io/Blog/Blog/designmode/Proxy.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Vingkin的学习博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"代理模式\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"概述 由于某些原因需要给某对象提供一个代理以控制对该对象的访问。这时，访问对象不适合或者不能直接引用目标对象，代理对象作为访问对象和目标对象之间的中介。 Java中的代理按照代理类生成时机不同又分为静态代理和动态代理。静态代理代理类在编译期就生成，而动态代理代理类则是在Java运行时动态生成。动态代理又有JDK代理和CGLib代理两种。 结构 代理（Proxy）模式分为三种角色： 抽象主题（Subject）类： 通过接口或抽象类声明真实主题和代理对象实现的业务方法。 真实主题（Real Subject）类： 实现了抽象主题中的具体业务，是代理对象所代表的真实对象，是最终要引用的对象。 代理（Proxy）类 ： 提供了与真实主题相同的接口，其内部含有对真实主题的引用，它可以访问、控制或扩展真实主题的功能。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"og:updated_time\",\"content\":\"2023-09-25T02:33:51.000Z\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Vingkin\"}],[\"meta\",{\"property\":\"article:published_time\",\"content\":\"2023-08-31T00:00:00.000Z\"}],[\"meta\",{\"property\":\"article:modified_time\",\"content\":\"2023-09-25T02:33:51.000Z\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"代理模式\\\",\\\"image\\\":[\\\"\\\"],\\\"datePublished\\\":\\\"2023-08-31T00:00:00.000Z\\\",\\\"dateModified\\\":\\\"2023-09-25T02:33:51.000Z\\\",\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Vingkin\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"概述\",\"slug\":\"概述\",\"link\":\"#概述\",\"children\":[]},{\"level\":2,\"title\":\"结构\",\"slug\":\"结构\",\"link\":\"#结构\",\"children\":[]},{\"level\":2,\"title\":\"静态代理\",\"slug\":\"静态代理\",\"link\":\"#静态代理\",\"children\":[]},{\"level\":2,\"title\":\"JDK动态代理\",\"slug\":\"jdk动态代理\",\"link\":\"#jdk动态代理\",\"children\":[]},{\"level\":2,\"title\":\"CGLIB动态代理\",\"slug\":\"cglib动态代理\",\"link\":\"#cglib动态代理\",\"children\":[]},{\"level\":2,\"title\":\"三种代理的对比\",\"slug\":\"三种代理的对比\",\"link\":\"#三种代理的对比\",\"children\":[]},{\"level\":2,\"title\":\"优缺点\",\"slug\":\"优缺点\",\"link\":\"#优缺点\",\"children\":[]},{\"level\":2,\"title\":\"使用场景\",\"slug\":\"使用场景\",\"link\":\"#使用场景\",\"children\":[]}],\"git\":{\"createdTime\":1695609231000,\"updatedTime\":1695609231000,\"contributors\":[{\"name\":\"Vingkin\",\"email\":\"1830053226@qq.com\",\"commits\":1}]},\"readingTime\":{\"minutes\":9.22,\"words\":2766},\"filePathRelative\":\"designmode/Proxy.md\",\"localizedDate\":\"2023年8月31日\",\"excerpt\":\"<h2> 概述</h2>\\n<p>由于某些原因需要给某对象提供一个代理以控制对该对象的访问。这时，访问对象不适合或者不能直接引用目标对象，代理对象作为访问对象和目标对象之间的中介。</p>\\n<p>Java中的代理按照代理类生成时机不同又分为<strong>静态代理</strong>和<strong>动态代理</strong>。静态代理代理类在编译期就生成，而动态代理代理类则是在Java运行时动态生成。动态代理又有JDK代理和CGLib代理两种。</p>\\n<h2> 结构</h2>\\n<p>代理（Proxy）模式分为三种角色：</p>\\n<ul>\\n<li>抽象主题（Subject）类： 通过接口或抽象类声明真实主题和代理对象实现的业务方法。</li>\\n<li>真实主题（Real Subject）类： 实现了抽象主题中的具体业务，是代理对象所代表的真实对象，是最终要引用的对象。</li>\\n<li>代理（Proxy）类 ： 提供了与真实主题相同的接口，其内部含有对真实主题的引用，它可以访问、控制或扩展真实主题的功能。</li>\\n</ul>\",\"copyright\":{\"author\":\"Vingkin\"},\"autoDesc\":true}")
