export const data = JSON.parse("{\"key\":\"v-34c67a3d\",\"path\":\"/bigdata/hadoop/mapreduce/2.MapReduce%E5%9F%BA%E7%A1%80%E7%BC%96%E7%A8%8B.html\",\"title\":\"MapReduce基础编程\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MapReduce基础编程\",\"description\":\"1. MapReduce Partition分区 注意分区与分组的区别，分区的目的是通过设置ReduceTask的数量将数据输出到不同的文件中。而每一个分组调用一次reduce程序。 输出文件的个数与ReduceTask个数是一种对等关系，有几个ReduceTask，最终程序就输出几个文件。 对于MapTask究竟给哪个ReduceTask处理，这就是数据分区问题。 可以自己制定ReduceTask的个数： job.setNumReduceTasks(3);\"},\"headers\":[{\"level\":2,\"title\":\"2.1 Combiner组件的使用\",\"slug\":\"_2-1-combiner组件的使用\",\"link\":\"#_2-1-combiner组件的使用\",\"children\":[]},{\"level\":2,\"title\":\"3.1 各州累计病例数量统计\",\"slug\":\"_3-1-各州累计病例数量统计\",\"link\":\"#_3-1-各州累计病例数量统计\",\"children\":[]},{\"level\":2,\"title\":\"3.2 各州累计病例分区统计\",\"slug\":\"_3-2-各州累计病例分区统计\",\"link\":\"#_3-2-各州累计病例分区统计\",\"children\":[]},{\"level\":2,\"title\":\"3.3 各州累计病例数最多top1县\",\"slug\":\"_3-3-各州累计病例数最多top1县\",\"link\":\"#_3-3-各州累计病例数最多top1县\",\"children\":[]},{\"level\":2,\"title\":\"4.1 MapTask并行度机制\",\"slug\":\"_4-1-maptask并行度机制\",\"link\":\"#_4-1-maptask并行度机制\",\"children\":[]},{\"level\":2,\"title\":\"4.2 ReduceTask并行度机制\",\"slug\":\"_4-2-reducetask并行度机制\",\"link\":\"#_4-2-reducetask并行度机制\",\"children\":[]},{\"level\":2,\"title\":\"5.1 MapTask工作机制详解\",\"slug\":\"_5-1-maptask工作机制详解\",\"link\":\"#_5-1-maptask工作机制详解\",\"children\":[]},{\"level\":2,\"title\":\"5.2 ReduceTask工作机制详解\",\"slug\":\"_5-2-reducetask工作机制详解\",\"link\":\"#_5-2-reducetask工作机制详解\",\"children\":[]}],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"readingTime\":{\"minutes\":14.11,\"words\":4232},\"filePathRelative\":\"bigdata/hadoop/mapreduce/2.MapReduce基础编程.md\",\"excerpt\":\"<h1> 1. MapReduce Partition分区</h1>\\n<blockquote>\\n<p>注意分区与分组的区别，分区的目的是通过设置ReduceTask的数量将数据输出到不同的文件中。而每一个分组调用一次reduce程序。</p>\\n</blockquote>\\n<p>输出文件的个数与ReduceTask个数是一种对等关系，有几个ReduceTask，最终程序就输出几个文件。</p>\\n<p>对于MapTask究竟给哪个ReduceTask处理，这就是<strong>数据分区</strong>问题。</p>\\n<p>可以自己制定ReduceTask的个数：</p>\\n<ul>\\n<li><code>job.setNumReduceTasks(3);</code></li>\\n</ul>\",\"copyright\":{\"author\":\"Vingkin\"},\"autoDesc\":true}")

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
