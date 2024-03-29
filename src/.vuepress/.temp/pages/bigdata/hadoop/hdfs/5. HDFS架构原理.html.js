export const data = JSON.parse("{\"key\":\"v-3f2afb62\",\"path\":\"/bigdata/hadoop/hdfs/5.%20HDFS%E6%9E%B6%E6%9E%84%E5%8E%9F%E7%90%86.html\",\"title\":\"HDFS架构原理\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"HDFS架构原理\",\"description\":\"1. HDFS架构剖析 略 2. HDFS Web Interfaces 略 3. HDFS读写流程 3.1 HDFS写数据流程 Pipeline管道 客户端将数据块写入第一个数据节点，第一个数据节点保存数据之后再将块复制到第二个数据节点，后者保存后将其复制到第三个数据节点 为什么datanode之间采用pipeline线性传输，而不是一次给三个datanode拓扑式传输呢？\"},\"headers\":[{\"level\":2,\"title\":\"1. HDFS架构剖析\",\"slug\":\"_1-hdfs架构剖析\",\"link\":\"#_1-hdfs架构剖析\",\"children\":[]},{\"level\":2,\"title\":\"2. HDFS Web Interfaces\",\"slug\":\"_2-hdfs-web-interfaces\",\"link\":\"#_2-hdfs-web-interfaces\",\"children\":[]},{\"level\":2,\"title\":\"3. HDFS读写流程\",\"slug\":\"_3-hdfs读写流程\",\"link\":\"#_3-hdfs读写流程\",\"children\":[{\"level\":3,\"title\":\"3.1 HDFS写数据流程\",\"slug\":\"_3-1-hdfs写数据流程\",\"link\":\"#_3-1-hdfs写数据流程\",\"children\":[]},{\"level\":3,\"title\":\"3.2 HDFS读数据流程\",\"slug\":\"_3-2-hdfs读数据流程\",\"link\":\"#_3-2-hdfs读数据流程\",\"children\":[]},{\"level\":3,\"title\":\"3.3 HDFS集群角色职责\",\"slug\":\"_3-3-hdfs集群角色职责\",\"link\":\"#_3-3-hdfs集群角色职责\",\"children\":[]}]},{\"level\":2,\"title\":\"4. NameNode元数据管理\",\"slug\":\"_4-namenode元数据管理\",\"link\":\"#_4-namenode元数据管理\",\"children\":[{\"level\":3,\"title\":\"4.1 元数据管理综述\",\"slug\":\"_4-1-元数据管理综述\",\"link\":\"#_4-1-元数据管理综述\",\"children\":[]}]},{\"level\":2,\"title\":\"5. HDFS小文件解决方案\",\"slug\":\"_5-hdfs小文件解决方案\",\"link\":\"#_5-hdfs小文件解决方案\",\"children\":[]}],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"readingTime\":{\"minutes\":5.67,\"words\":1701},\"filePathRelative\":\"bigdata/hadoop/hdfs/5. HDFS架构原理.md\",\"excerpt\":\"<h2> 1. HDFS架构剖析</h2>\\n<p>略</p>\\n<h2> 2. HDFS Web Interfaces</h2>\\n<p>略</p>\\n<h2> 3. HDFS读写流程</h2>\\n<h3> 3.1 HDFS写数据流程</h3>\\n<h4> Pipeline管道</h4>\\n<blockquote>\\n<p>客户端将数据块写入第一个数据节点，第一个数据节点保存数据之后再将块复制到第二个数据节点，后者保存后将其复制到第三个数据节点</p>\\n</blockquote>\\n<p><strong>为什么datanode之间采用pipeline线性传输，而不是一次给三个datanode拓扑式传输呢？</strong></p>\",\"copyright\":{\"author\":\"Vingkin\"},\"autoDesc\":true}")

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
