export const data = JSON.parse("{\"key\":\"v-e81491ee\",\"path\":\"/bigdata/hadoop/mapreduce/5.MapReduce%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96.html\",\"title\":\"MapReduce性能优化\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MapReduce性能优化\",\"description\":\"1. IO性能优化：文件类型 1.1 行式存储、列式存储 优缺点： 行存储的写入是一次性完成，消耗的时间比列存储少，并且能够保证数据的完整性，缺点是数据读取过程中会产生冗余数据，如果只有少量数据，此影响可以忽略;数量大可能会影响到数据的处理效率。行适合插入、不适合查询。 列存储在写入效率、保证数据完整性上都不如行存储，它的优势是在读取过程，不会产生冗余数据，这对数据完整性要求不高的大数据处理领域，比如互联网，犹为重要。列适合查询，不适合插入。\"},\"headers\":[{\"level\":2,\"title\":\"1.1 行式存储、列式存储\",\"slug\":\"_1-1-行式存储、列式存储\",\"link\":\"#_1-1-行式存储、列式存储\",\"children\":[]}],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"readingTime\":{\"minutes\":0.67,\"words\":202},\"filePathRelative\":\"bigdata/hadoop/mapreduce/5.MapReduce性能优化.md\",\"excerpt\":\"<h1> 1. IO性能优化：文件类型</h1>\\n<h2> 1.1 行式存储、列式存储</h2>\\n<figure><img src=\\\"https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251619941.png\\\" alt=\\\"\\\" tabindex=\\\"0\\\" loading=\\\"lazy\\\"><figcaption></figcaption></figure>\\n<p><strong>优缺点：</strong></p>\\n<ul>\\n<li>行存储的写入是一次性完成，消耗的时间比列存储少，并且能够保证数据的完整性，缺点是数据读取过程中会产生冗余数据，如果只有少量数据，此影响可以忽略;数量大可能会影响到数据的处理效率。<strong>行适合插入、不适合查询。</strong></li>\\n<li>列存储在写入效率、保证数据完整性上都不如行存储，它的优势是在读取过程，不会产生冗余数据，这对数据完整性要求不高的大数据处理领域，比如互联网，犹为重要。<strong>列适合查询，不适合插入。</strong></li>\\n</ul>\",\"copyright\":{\"author\":\"Vingkin\"},\"autoDesc\":true}")

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
