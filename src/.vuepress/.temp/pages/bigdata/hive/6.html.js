export const data = JSON.parse("{\"key\":\"v-4d7aa064\",\"path\":\"/bigdata/hive/6.html\",\"title\":\"Hive 性能优化及 Hive3 新特性\",\"lang\":\"zh-CN\",\"frontmatter\":{\"title\":\"Hive 性能优化及 Hive3 新特性\",\"description\":\"1. Hive表设计优化 1.1 分区表结构设计 Hive在执行查询计划时，会使用表的最后一级目录作为底层处理数据的输入。如果不使用分区表，那么表目录下的所有文件将都会被加载，会导致大量磁盘和网络的IO损耗。 1.1.1 普通表结构问题 假设每天有1G的数据增量，一年就是365GB的数据，按照业务需求，每次只需要对其中一天的数据进行处理，也就是处理1GB的数据； 程序会先加载365GB的数据，然后将364GB的数据过滤掉，只保留一天的数据再进行计算，导致了大量的磁盘和网络的IO的损耗。\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://vingkin.github.io/Blog/Blog/bigdata/hive/6.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"Vingkin的学习博客\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Hive 性能优化及 Hive3 新特性\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"1. Hive表设计优化 1.1 分区表结构设计 Hive在执行查询计划时，会使用表的最后一级目录作为底层处理数据的输入。如果不使用分区表，那么表目录下的所有文件将都会被加载，会导致大量磁盘和网络的IO损耗。 1.1.1 普通表结构问题 假设每天有1G的数据增量，一年就是365GB的数据，按照业务需求，每次只需要对其中一天的数据进行处理，也就是处理1GB的数据； 程序会先加载365GB的数据，然后将364GB的数据过滤掉，只保留一天的数据再进行计算，导致了大量的磁盘和网络的IO的损耗。\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Vingkin\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Hive 性能优化及 Hive3 新特性\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Vingkin\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"1. Hive表设计优化\",\"slug\":\"_1-hive表设计优化\",\"link\":\"#_1-hive表设计优化\",\"children\":[{\"level\":3,\"title\":\"1.1 分区表结构设计\",\"slug\":\"_1-1-分区表结构设计\",\"link\":\"#_1-1-分区表结构设计\",\"children\":[]},{\"level\":3,\"title\":\"1.2 分桶表结构设计\",\"slug\":\"_1-2-分桶表结构设计\",\"link\":\"#_1-2-分桶表结构设计\",\"children\":[]},{\"level\":3,\"title\":\"1.3 索引设计\",\"slug\":\"_1-3-索引设计\",\"link\":\"#_1-3-索引设计\",\"children\":[]}]},{\"level\":2,\"title\":\"1.3.2 索引的原理\",\"slug\":\"_1-3-2-索引的原理\",\"link\":\"#_1-3-2-索引的原理\",\"children\":[]},{\"level\":2,\"title\":\"2. Hive表数据优化\",\"slug\":\"_2-hive表数据优化\",\"link\":\"#_2-hive表数据优化\",\"children\":[{\"level\":3,\"title\":\"2.1 文件格式\",\"slug\":\"_2-1-文件格式\",\"link\":\"#_2-1-文件格式\",\"children\":[]},{\"level\":3,\"title\":\"2.2 数据压缩\",\"slug\":\"_2-2-数据压缩\",\"link\":\"#_2-2-数据压缩\",\"children\":[]},{\"level\":3,\"title\":\"2.3 存储优化\",\"slug\":\"_2-3-存储优化\",\"link\":\"#_2-3-存储优化\",\"children\":[]}]},{\"level\":2,\"title\":\"3. Job作业执行优化\",\"slug\":\"_3-job作业执行优化\",\"link\":\"#_3-job作业执行优化\",\"children\":[{\"level\":3,\"title\":\"3.1 explain查询计划\",\"slug\":\"_3-1-explain查询计划\",\"link\":\"#_3-1-explain查询计划\",\"children\":[]},{\"level\":3,\"title\":\"3.2 MapReduce属性优化\",\"slug\":\"_3-2-mapreduce属性优化\",\"link\":\"#_3-2-mapreduce属性优化\",\"children\":[]},{\"level\":3,\"title\":\"3.3 Join优化\",\"slug\":\"_3-3-join优化\",\"link\":\"#_3-3-join优化\",\"children\":[]},{\"level\":3,\"title\":\"3.4 优化器\",\"slug\":\"_3-4-优化器\",\"link\":\"#_3-4-优化器\",\"children\":[]},{\"level\":3,\"title\":\"3.5 谓词下推（PPD）\",\"slug\":\"_3-5-谓词下推-ppd\",\"link\":\"#_3-5-谓词下推-ppd\",\"children\":[]},{\"level\":3,\"title\":\"3.6 数据倾斜\",\"slug\":\"_3-6-数据倾斜\",\"link\":\"#_3-6-数据倾斜\",\"children\":[]}]},{\"level\":2,\"title\":\"4. Hive3新特性\",\"slug\":\"_4-hive3新特性\",\"link\":\"#_4-hive3新特性\",\"children\":[{\"level\":3,\"title\":\"4.1 Hive on Tez\",\"slug\":\"_4-1-hive-on-tez\",\"link\":\"#_4-1-hive-on-tez\",\"children\":[]},{\"level\":3,\"title\":\"4.2 Hive LLAP更新\",\"slug\":\"_4-2-hive-llap更新\",\"link\":\"#_4-2-hive-llap更新\",\"children\":[]},{\"level\":3,\"title\":\"4.3 Metastore独立模式\",\"slug\":\"_4-3-metastore独立模式\",\"link\":\"#_4-3-metastore独立模式\",\"children\":[]}]}],\"git\":{\"createdTime\":null,\"updatedTime\":null,\"contributors\":[]},\"readingTime\":{\"minutes\":22.42,\"words\":6727},\"filePathRelative\":\"bigdata/hive/6.md\",\"excerpt\":\"<h2> 1. Hive表设计优化</h2>\\n<h3> 1.1 分区表结构设计</h3>\\n<blockquote>\\n<p>Hive在执行查询计划时，会<strong>使用表的最后一级目录作为底层处理数据的输入</strong>。如果不使用分区表，那么表目录下的所有文件将都会被加载，会导致大量磁盘和网络的IO损耗。</p>\\n</blockquote>\\n<h4> 1.1.1 普通表结构问题</h4>\\n<ul>\\n<li>假设每天有1G的数据增量，一年就是365GB的数据，按照业务需求，每次只需要对其中一天的数据进行处理，也就是处理1GB的数据；</li>\\n<li>程序会先加载365GB的数据，然后将364GB的数据过滤掉，只保留一天的数据再进行计算，<strong>导致了大量的磁盘和网络的IO的损耗</strong>。</li>\\n</ul>\",\"copyright\":{\"author\":\"Vingkin\"},\"autoDesc\":true}")
