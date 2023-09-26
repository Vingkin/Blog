export const data = JSON.parse("{\"key\":\"v-24956641\",\"path\":\"/guide/interview/database/DatabaseGuidelines.html\",\"title\":\"数据库开发规范\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"数据库开发规范\",\"author\":\"Vingkin\",\"date\":\"2023-08-14T00:00:00.000Z\",\"description\":\"本文摘录自阿里巴巴Java开发手册MySQL数据库篇，目的是为了加强记忆方便查询 建表规约 【强制】 表达是否概念的字段，必须使用is_xxx的方式命名，数据类型是unsigned tinyint（1表示是，0表示否）。 说明：任何字段如果为非负数，必须是unsigned。 正例：表达逻辑删除的字段名is_deleted，1表示删除，0表示未删除。\"},\"headers\":[{\"level\":2,\"title\":\"建表规约\",\"slug\":\"建表规约\",\"link\":\"#建表规约\",\"children\":[]},{\"level\":2,\"title\":\"索引规约\",\"slug\":\"索引规约\",\"link\":\"#索引规约\",\"children\":[]},{\"level\":2,\"title\":\"SQL语句\",\"slug\":\"sql语句\",\"link\":\"#sql语句\",\"children\":[]},{\"level\":2,\"title\":\"ORM映射\",\"slug\":\"orm映射\",\"link\":\"#orm映射\",\"children\":[]}],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"readingTime\":{\"minutes\":12.76,\"words\":3827},\"filePathRelative\":\"guide/interview/database/DatabaseGuidelines.md\",\"localizedDate\":\"2023年8月14日\",\"excerpt\":\"<blockquote>\\n<p>本文摘录自<a href=\\\"https://www.bookstack.cn/read/alibaba-java/MySQL%E6%95%B0%E6%8D%AE%E5%BA%93.md\\\" target=\\\"_blank\\\" rel=\\\"noopener noreferrer\\\">阿里巴巴Java开发手册MySQL数据库篇</a>，目的是为了加强记忆方便查询</p>\\n</blockquote>\\n<h2> 建表规约</h2>\\n<div class=\\\"hint-container danger\\\">\\n<p class=\\\"hint-container-title\\\">【强制】</p>\\n<ol>\\n<li>表达是否概念的字段，必须使用<code>is_xxx</code>的方式命名，数据类型是<code>unsigned tinyint</code>（1表示是，0表示否）。</li>\\n</ol>\\n<p><span style=\\\"color: orange\\\">说明</span>：任何字段如果为非负数，必须是<code>unsigned</code>。</p>\\n<p><span style=\\\"color: green\\\">正例</span>：表达逻辑删除的字段名<code>is_deleted</code>，1表示删除，0表示未删除。</p>\\n</div>\",\"copyright\":{\"author\":\"Vingkin\"},\"autoDesc\":true}")

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
