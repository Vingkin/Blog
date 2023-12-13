const e=JSON.parse('{"key":"v-4bc5c7c5","path":"/bigdata/hive/5.html","title":"Hive 函数重要应用案例","lang":"zh-CN","frontmatter":{"title":"Hive 函数重要应用案例","description":"1. Hive中多字节分隔符处理 Hive默认序列化类是LazySimpleSerDe，其只支持使用单字节分隔符（char）来加载文本数据，所以遇到多字符或者数据字段中包含了分隔符，那么LazySimpleSerDe就不再适用了。 1.1 问题和需求 比如下面的两种情况： 多字符分隔符：","head":[["meta",{"property":"og:url","content":"https://vingkin.github.io/Blog/Blog/bigdata/hive/5.html"}],["meta",{"property":"og:site_name","content":"Vingkin的学习博客"}],["meta",{"property":"og:title","content":"Hive 函数重要应用案例"}],["meta",{"property":"og:description","content":"1. Hive中多字节分隔符处理 Hive默认序列化类是LazySimpleSerDe，其只支持使用单字节分隔符（char）来加载文本数据，所以遇到多字符或者数据字段中包含了分隔符，那么LazySimpleSerDe就不再适用了。 1.1 问题和需求 比如下面的两种情况： 多字符分隔符："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-25T11:35:18.000Z"}],["meta",{"property":"article:author","content":"Vingkin"}],["meta",{"property":"article:modified_time","content":"2023-09-25T11:35:18.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Hive 函数重要应用案例\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-25T11:35:18.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Vingkin\\"}]}"]]},"headers":[{"level":2,"title":"1. Hive中多字节分隔符处理","slug":"_1-hive中多字节分隔符处理","link":"#_1-hive中多字节分隔符处理","children":[{"level":3,"title":"1.1 问题和需求","slug":"_1-1-问题和需求","link":"#_1-1-问题和需求","children":[]},{"level":3,"title":"1.2 解决方案一：替换分隔符","slug":"_1-2-解决方案一-替换分隔符","link":"#_1-2-解决方案一-替换分隔符","children":[]},{"level":3,"title":"1.3 解决方案二：RegexSerDe正则加载","slug":"_1-3-解决方案二-regexserde正则加载","link":"#_1-3-解决方案二-regexserde正则加载","children":[]},{"level":3,"title":"1.4 解决方案三：自定义InputFormat","slug":"_1-4-解决方案三-自定义inputformat","link":"#_1-4-解决方案三-自定义inputformat","children":[]}]},{"level":2,"title":"2. URL解析函数","slug":"_2-url解析函数","link":"#_2-url解析函数","children":[{"level":3,"title":"2.1 parse_url","slug":"_2-1-parse-url","link":"#_2-1-parse-url","children":[]},{"level":3,"title":"2.2 parse_url_tuple","slug":"_2-2-parse-url-tuple","link":"#_2-2-parse-url-tuple","children":[]}]},{"level":2,"title":"3. 行列转换应用与实现","slug":"_3-行列转换应用与实现","link":"#_3-行列转换应用与实现","children":[{"level":3,"title":"3.1 行转列：多行转多列","slug":"_3-1-行转列-多行转多列","link":"#_3-1-行转列-多行转多列","children":[]},{"level":3,"title":"3.2 行转列：多行转单列","slug":"_3-2-行转列-多行转单列","link":"#_3-2-行转列-多行转单列","children":[]},{"level":3,"title":"3.3 列转行：多列转多行","slug":"_3-3-列转行-多列转多行","link":"#_3-3-列转行-多列转多行","children":[]},{"level":3,"title":"3.4 列转行：单列转多行","slug":"_3-4-列转行-单列转多行","link":"#_3-4-列转行-单列转多行","children":[]}]},{"level":2,"title":"4. Json数据处理","slug":"_4-json数据处理","link":"#_4-json数据处理","children":[{"level":3,"title":"4.1 Hive中的Json处理方式","slug":"_4-1-hive中的json处理方式","link":"#_4-1-hive中的json处理方式","children":[]},{"level":3,"title":"4.2 Json函数","slug":"_4-2-json函数","link":"#_4-2-json函数","children":[]},{"level":3,"title":"4.3 Json SerDe","slug":"_4-3-json-serde","link":"#_4-3-json-serde","children":[]}]},{"level":2,"title":"5. 窗口函数应用实例","slug":"_5-窗口函数应用实例","link":"#_5-窗口函数应用实例","children":[{"level":3,"title":"5.1 案例1：连续登录用户","slug":"_5-1-案例1-连续登录用户","link":"#_5-1-案例1-连续登录用户","children":[]},{"level":3,"title":"5.2 案例2：级联累加求和","slug":"_5-2-案例2-级联累加求和","link":"#_5-2-案例2-级联累加求和","children":[]},{"level":3,"title":"5.3 案例3：分组TopN","slug":"_5-3-案例3-分组topn","link":"#_5-3-案例3-分组topn","children":[]}]},{"level":2,"title":"6. 拉链表的设计与实现","slug":"_6-拉链表的设计与实现","link":"#_6-拉链表的设计与实现","children":[{"level":3,"title":"6.1 实现过程","slug":"_6-1-实现过程","link":"#_6-1-实现过程","children":[]}]}],"git":{"createdTime":1695641718000,"updatedTime":1695641718000,"contributors":[{"name":"Vingkin","email":"1830053226@qq.com","commits":1}]},"readingTime":{"minutes":10.27,"words":3081},"filePathRelative":"bigdata/hive/5.md","localizedDate":"2023年9月25日","excerpt":"<h2> 1. Hive中多字节分隔符处理</h2>\\n<blockquote>\\n<p>Hive默认序列化类是<code>LazySimpleSerDe</code>，其<strong>只支持使用单字节分隔符（char）<strong>来加载文本数据，所以遇到</strong>多字符</strong>或者<strong>数据字段中包含了分隔符</strong>，那么<code>LazySimpleSerDe</code>就不再适用了。</p>\\n</blockquote>\\n<h3> 1.1 问题和需求</h3>\\n<p>比如下面的两种情况：</p>\\n<p><strong>多字符分隔符：</strong></p>","copyright":{"author":"Vingkin"},"autoDesc":true}');export{e as data};