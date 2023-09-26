export const data = JSON.parse("{\"key\":\"v-6c88c43f\",\"path\":\"/guide/interview/systemdesign/framework/MyBatis.html\",\"title\":\"MyBatis / MyBatis-Plus\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"MyBatis / MyBatis-Plus\",\"author\":\"Vingkin\",\"date\":\"2023-08-07T00:00:00.000Z\",\"description\":\"Mybatis @Param / @RequestBody 发现在dao层方法接口的参数中不用@Param指定参数名称，在xml中也是可以直接用#{}来对参数进行引用，查了很多资料解释是idea进行了预处理，所以即使不报错，也需要在dao层参数名称位置指定具体名称，以免其他开发环境下出现bug。 @RequestBody是对json格式的入参进行处理，将json格式数据封装成具体的vo或者po实体类，目前现在都是前后端分离的项目，前端传过来的参数都是json格式的，所以在controller层实体类型的参数前需要加上@RequestBody注解。\"},\"headers\":[{\"level\":2,\"title\":\"Mybatis\",\"slug\":\"mybatis\",\"link\":\"#mybatis\",\"children\":[{\"level\":3,\"title\":\"@Param / @RequestBody\",\"slug\":\"param-requestbody\",\"link\":\"#param-requestbody\",\"children\":[]},{\"level\":3,\"title\":\"$和#\",\"slug\":\"和\",\"link\":\"#和\",\"children\":[]},{\"level\":3,\"title\":\"Mybatis分页操作\",\"slug\":\"mybatis分页操作\",\"link\":\"#mybatis分页操作\",\"children\":[]},{\"level\":3,\"title\":\"Mybatis动态表模式实现\",\"slug\":\"mybatis动态表模式实现\",\"link\":\"#mybatis动态表模式实现\",\"children\":[]}]},{\"level\":2,\"title\":\"Mybatis Plus\",\"slug\":\"mybatis-plus\",\"link\":\"#mybatis-plus\",\"children\":[{\"level\":3,\"title\":\"前端传来不定条件Mybatis-Plus的解决方案\",\"slug\":\"前端传来不定条件mybatis-plus的解决方案\",\"link\":\"#前端传来不定条件mybatis-plus的解决方案\",\"children\":[]},{\"level\":3,\"title\":\"函数式SQL\",\"slug\":\"函数式sql\",\"link\":\"#函数式sql\",\"children\":[]},{\"level\":3,\"title\":\"Mybatis-Plus多数据源\",\"slug\":\"mybatis-plus多数据源\",\"link\":\"#mybatis-plus多数据源\",\"children\":[]},{\"level\":3,\"title\":\"通过MybatisX插件自动生成代码\",\"slug\":\"通过mybatisx插件自动生成代码\",\"link\":\"#通过mybatisx插件自动生成代码\",\"children\":[]}]}],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"readingTime\":{\"minutes\":5.52,\"words\":1657},\"filePathRelative\":\"guide/interview/systemdesign/framework/MyBatis.md\",\"localizedDate\":\"2023年8月7日\",\"excerpt\":\"<h2> Mybatis</h2>\\n<h3> @Param / @RequestBody</h3>\\n<ol>\\n<li>发现在dao层方法接口的参数中不用<code>@Param</code>指定参数名称，在xml中也是可以直接用<code>#{}</code>来对参数进行引用，查了很多资料解释是idea进行了预处理，所以即使不报错，也需要在dao层参数名称位置指定具体名称，以免其他开发环境下出现bug。</li>\\n<li>@RequestBody是对json格式的入参进行处理，<strong>将json格式数据封装成具体的vo或者po实体类</strong>，目前现在都是前后端分离的项目，前端传过来的参数都是json格式的，所以在controller层实体类型的参数前需要加上@RequestBody注解。</li>\\n</ol>\",\"copyright\":{\"author\":\"Vingkin\"},\"autoDesc\":true}")

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
