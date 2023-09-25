<template><div><h2 id="红黑树" tabindex="-1"><a class="header-anchor" href="#红黑树" aria-hidden="true">#</a> 红黑树</h2>
<ol>
<li>节点是红色或黑色</li>
<li>根节点是黑色</li>
<li>每个叶子节点都是黑色的空节点（NIL节点）</li>
<li>每个红色节点的两个子节点都是黑色。（从每个叶子到根的所有路径上不能有两个连续的红节点）</li>
<li>从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。</li>
</ol>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/1602b6016e143cf3tplv-t2oaga2asx-zoom-in-crop-mark1304000.awebp" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<h2 id="布隆过滤器" tabindex="-1"><a class="header-anchor" href="#布隆过滤器" aria-hidden="true">#</a> 布隆过滤器</h2>
<blockquote>
<p><a href="https://javaguide.cn/cs-basics/data-structure/bloom-filter.html" target="_blank" rel="noopener noreferrer">布隆过滤器<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="什么是布隆过滤器" tabindex="-1"><a class="header-anchor" href="#什么是布隆过滤器" aria-hidden="true">#</a> 什么是布隆过滤器</h3>
<p>首先，我们需要了解布隆过滤器的概念。</p>
<p>布隆过滤器（Bloom Filter）是一个叫做 Bloom 的老哥于 1970 年提出的。我们可以把它看作由二进制向量（或者说位数组）和一系列随机映射函数（哈希函数）两部分组成的数据结构。相比于我们平时常用的的 List、Map 、Set 等数据结构，它占用空间更少并且效率更高，但是缺点是其返回的结果是概率性的，而不是非常准确的。理论情况下添加到集合中的元素越多，误报的可能性就越大。并且，存放在布隆过滤器的数据不容易删除。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/image-20220605222756152.png" alt="布隆过滤器示意图" tabindex="0" loading="lazy"><figcaption>布隆过滤器示意图</figcaption></figure>
<p>位数组中的每个元素都只占用 1 bit ，并且每个元素只能是 0 或者 1。这样申请一个 100w 个元素的位数组只占用 1000000Bit / 8 = 125000 Byte = 125000/1024 kb ≈ 122kb 的空间。</p>
<p>总结：<strong>一个名叫 Bloom 的人提出了一种来检索元素是否在给定大集合中的数据结构，这种数据结构是高效且性能很好的，但缺点是具有一定的错误识别率和删除难度。并且，理论情况下，添加到集合中的元素越多，误报的可能性就越大。</strong></p>
<h3 id="布隆过滤器的原理介绍" tabindex="-1"><a class="header-anchor" href="#布隆过滤器的原理介绍" aria-hidden="true">#</a> 布隆过滤器的原理介绍</h3>
<p><strong>当一个元素加入布隆过滤器中的时候，会进行如下操作：</strong></p>
<ol>
<li>使用布隆过滤器中的哈希函数对元素值进行计算，得到哈希值（有几个哈希函数得到几个哈希值）。</li>
<li>根据得到的哈希值，在位数组中把对应下标的值置为 1。</li>
</ol>
<p><strong>当我们需要判断一个元素是否存在于布隆过滤器的时候，会进行如下操作：</strong></p>
<ol>
<li>对给定元素再次进行相同的哈希计算；</li>
<li>得到值之后判断位数组中的每个元素是否都为 1，如果值都为 1，那么说明这个值在布隆过滤器中，如果存在一个值不为 1，说明该元素不在布隆过滤器中。</li>
</ol>
<p>举个简单的例子：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/image-20220605222938690.png" alt="布隆过滤器hash计算" tabindex="0" loading="lazy"><figcaption>布隆过滤器hash计算</figcaption></figure>
<p>如图所示，当字符串存储要加入到布隆过滤器中时，该字符串首先由多个哈希函数生成不同的哈希值，然后将对应的位数组的下标设置为 1（当位数组初始化时，所有位置均为 0）。当第二次存储相同字符串时，因为先前的对应位置已设置为 1，所以很容易知道此值已经存在（去重非常方便）。</p>
<p>如果我们需要判断某个字符串是否在布隆过滤器中时，只需要对给定字符串再次进行相同的哈希计算，得到值之后判断位数组中的每个元素是否都为 1，如果值都为 1，那么说明这个值在布隆过滤器中，如果存在一个值不为 1，说明该元素不在布隆过滤器中。</p>
<p><strong>不同的字符串可能哈希出来的位置相同，这种情况我们可以适当增加位数组大小或者调整我们的哈希函数。</strong></p>
<p>综上，我们可以得出：<strong>布隆过滤器说某个元素存在，小概率会误判。布隆过滤器说某个元素不在，那么这个元素一定不在。</strong></p>
<h3 id="布隆过滤器使用场景" tabindex="-1"><a class="header-anchor" href="#布隆过滤器使用场景" aria-hidden="true">#</a> 布隆过滤器使用场景</h3>
<ol>
<li>判断给定数据是否存在：比如判断一个数字是否存在于包含大量数字的数字集中（数字集很大，5 亿以上！）、 防止缓存穿透（判断请求的数据是否有效避免直接绕过缓存请求数据库）等等、邮箱的垃圾邮件过滤、黑名单功能等等。</li>
<li>去重：比如爬给定网址的时候对已经爬取过的 URL 去重。</li>
</ol>
<h2 id="sds" tabindex="-1"><a class="header-anchor" href="#sds" aria-hidden="true">#</a> SDS</h2>
<blockquote>
<p><a href="https://xiaolincoding.com/redis/data_struct/data_struct.html#sds" target="_blank" rel="noopener noreferrer">Redis 数据结构 | 小林coding (xiaolincoding.com)<ExternalLinkIcon/></a></p>
</blockquote>
<p>字符串在 Redis 中是很常用的，键值对中的键是字符串类型，值有时也是字符串类型。</p>
<p>Redis 是用 C 语言实现的，但是它没有直接使用 C 语言的 char* 字符数组来实现字符串，而是自己封装了一个名为简单动态字符串（simple dynamic string，SDS） 的数据结构来表示字符串，也就是 Redis 的 String 数据类型的底层数据结构是 SDS。</p>
<p>既然 Redis 设计了 SDS 结构来表示字符串，肯定是 C 语言的 char* 字符数组存在一些缺陷。</p>
<p>要了解这一点，得先来看看 char* 字符数组的结构。</p>
<h3 id="c-语言字符串的缺陷" tabindex="-1"><a class="header-anchor" href="#c-语言字符串的缺陷" aria-hidden="true">#</a> C 语言字符串的缺陷</h3>
<p>C 语言的字符串其实就是一个字符数组，即数组中每个元素是字符串中的一个字符。</p>
<p>比如，下图就是字符串“xiaolin”的 char* 字符数组的结构：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/376128646c75a893ad47914858fa2131.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>没学过 C 语言的同学，可能会好奇为什么最后一个字符是“\0”？</p>
<p>在 C 语言里，对字符串操作时，char * 指针只是指向字符数组的起始位置，而<strong>字符数组的结尾位置就用“\0”表示，意思是指字符串的结束</strong>。</p>
<p>因此，C 语言标准库中的字符串操作函数就通过判断字符是不是 “\0” 来决定要不要停止操作，如果当前字符不是 “\0” ，说明字符串还没结束，可以继续操作，如果当前字符是 “\0” 是则说明字符串结束了，就要停止操作。</p>
<p>举个例子，C 语言获取字符串长度的函数 <code v-pre>strlen</code>，就是通过字符数组中的每一个字符，并进行计数，等遇到字符为 “\0” 后，就会停止遍历，然后返回已经统计到的字符个数，即为字符串长度。下图显示了 strlen 函数的执行流程：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/bcf6bde3b647bdc343efcbc1a8f10579.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>很明显，<strong>C 语言获取字符串长度的时间复杂度是 O（N）（*这是一个可以改进的地方*</strong>）</p>
<p>C 语言字符串用 “\0” 字符作为结尾标记有个缺陷。假设有个字符串中有个 “\0” 字符，这时在操作这个字符串时就会<strong>提早结束</strong>，比如 “xiao\0lin” 字符串，计算字符串长度的时候则会是 4，如下图：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/6286480eb1840a8930e18fd215d82565.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>因此，除了字符串的末尾之外，<strong>字符串里面不能含有 “\0” 字符</strong>，否则最先被程序读入的 “\0” 字符将被误认为是字符串结尾，这个限制使得 C 语言的字符串只能保存文本数据，<strong>不能保存像图片、音频、视频文化这样的二进制数据（*这也是一个可以改进的地方*）</strong></p>
<p>另外， C 语言标准库中字符串的操作函数是很不安全的，对程序员很不友好，稍微一不注意，就会导致缓冲区溢出。</p>
<p>举个例子，strcat 函数是可以将两个字符串拼接在一起。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">//将 src 字符串拼接到 dest 字符串后面</span>
<span class="token keyword">char</span> <span class="token operator">*</span><span class="token function">strcat</span><span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span>dest<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">char</span><span class="token operator">*</span> src<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>C 语言的字符串是不会记录自身的缓冲区大小的</strong>，所以 strcat 函数假定程序员在执行这个函数时，已经为 dest 分配了足够多的内存，可以容纳 src 字符串中的所有内容，而<strong>一旦这个假定不成立，就会发生缓冲区溢出将可能会造成程序运行终止，（*这是一个可以改进的地方*</strong>）。</p>
<p>而且，strcat 函数和 strlen 函数类似，时间复杂度也很高，也都需要先通过遍历字符串才能得到目标字符串的末尾。然后对于 strcat 函数来说，还要再遍历源字符串才能完成追加，<strong>对字符串的操作效率不高</strong>。</p>
<p>好了， 通过以上的分析，我们可以得知 C 语言的字符串不足之处以及可以改进的地方：</p>
<ul>
<li>获取字符串长度的时间复杂度为 O（N）；</li>
<li>字符串的结尾是以 “\0” 字符标识，字符串里面不能包含有 “\0” 字符，因此不能保存二进制数据；</li>
<li>字符串操作函数不高效且不安全，比如有缓冲区溢出的风险，有可能会造成程序运行终止；</li>
</ul>
<p>Redis 实现的 SDS 的结构就把上面这些问题解决了，接下来我们一起看看 Redis 是如何解决的。</p>
<h3 id="sds-结构设计" tabindex="-1"><a class="header-anchor" href="#sds-结构设计" aria-hidden="true">#</a> SDS 结构设计</h3>
<p>下图就是 Redis 5.0 的 SDS 的数据结构：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/516738c4058cdf9109e40a7812ef4239.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>结构中的每个成员变量分别介绍下：</p>
<ul>
<li><strong>len，记录了字符串长度</strong>。这样获取字符串长度的时候，只需要返回这个成员变量值就行，时间复杂度只需要 O（1）。</li>
<li><strong>alloc，分配给字符数组的空间长度</strong>。这样在修改字符串的时候，可以通过 <code v-pre>alloc - len</code> 计算出剩余的空间大小，可以用来判断空间是否满足修改需求，如果不满足的话，就会自动将 SDS 的空间扩展至执行修改所需的大小，然后才执行实际的修改操作，所以使用 SDS 既不需要手动修改 SDS 的空间大小，也不会出现前面所说的缓冲区溢出的问题。</li>
<li><strong>flags，用来表示不同类型的 SDS</strong>。一共设计了 5 种类型，分别是 sdshdr5、sdshdr8、sdshdr16、sdshdr32 和 sdshdr64，后面在说明区别之处。</li>
<li><strong>buf[]，字符数组，用来保存实际数据</strong>。不仅可以保存字符串，也可以保存二进制数据。</li>
</ul>
<p>总的来说，Redis 的 SDS 结构在原本字符数组之上，增加了三个元数据：len、alloc、flags，用来解决 C 语言字符串的缺陷。</p>
<blockquote>
<p><strong>O（1）复杂度获取字符串长度</strong>（这也可以说是Redis为什么快的一个原因）</p>
</blockquote>
<p>C 语言的字符串长度获取 strlen 函数，需要通过遍历的方式来统计字符串长度，时间复杂度是 O（N）。</p>
<p>而 Redis 的 SDS 结构因为加入了 len 成员变量，那么<strong>获取字符串长度的时候，直接返回这个成员变量的值就行，所以复杂度只有 O（1）</strong>。</p>
<blockquote>
<p><strong>二进制安全</strong></p>
</blockquote>
<p>因为 SDS 不需要用 “\0” 字符来标识字符串结尾了，而是<strong>有个专门的 len 成员变量来记录长度，所以可存储包含 “\0” 的数据</strong>。但是 SDS 为了兼容部分 C 语言标准库的函数， SDS 字符串结尾还是会加上 “\0” 字符。</p>
<p>因此， SDS 的 API 都是以处理二进制的方式来处理 SDS 存放在 buf[] 里的数据，程序不会对其中的数据做任何限制，数据写入的时候时什么样的，它被读取时就是什么样的。</p>
<p>通过使用二进制安全的 SDS，而不是 C 字符串，使得 Redis 不仅可以保存文本数据，也可以保存任意格式的二进制数据。</p>
<blockquote>
<p><strong>不会发生缓冲区溢出</strong></p>
</blockquote>
<p>C 语言的字符串标准库提供的字符串操作函数，大多数（比如 strcat 追加字符串函数）都是不安全的，因为这些函数把缓冲区大小是否满足操作需求的工作交由开发者来保证，程序内部并不会判断缓冲区大小是否足够用，当发生了缓冲区溢出就有可能造成程序异常结束。</p>
<p>所以，Redis 的 SDS 结构里引入了 alloc 和 len 成员变量，这样 SDS API 通过 <code v-pre>alloc - len</code> 计算，可以算出剩余可用的空间大小，这样在对字符串做修改操作的时候，就可以由程序内部判断缓冲区大小是否足够用。</p>
<p>而且，<strong>当判断出缓冲区大小不够用时，Redis 会自动将扩大 SDS 的空间大小（小于 1MB 翻倍扩容，大于 1MB 按 1MB 扩容）</strong>，以满足修改所需的大小。</p>
<p>在扩展 SDS 空间之前，SDS API 会优先检查未使用空间是否足够，如果不够的话，API 不仅会为 SDS 分配修改所必须要的空间，还会给 SDS 分配额外的「未使用空间」。</p>
<p>这样的好处是，下次在操作 SDS 时，如果 SDS 空间够的话，API 就会直接使用「未使用空间」，而无须执行内存分配，<strong>有效的减少内存分配次数</strong>。</p>
<p>所以，使用 SDS 即不需要手动修改 SDS 的空间大小，也不会出现缓冲区溢出的问题。</p>
<blockquote>
<p><strong>节省内存空间</strong></p>
</blockquote>
<p>SDS 结构中有个 flags 成员变量，表示的是 SDS 类型。</p>
<p>Redis 一共设计了 5 种类型，分别是 sdshdr5、sdshdr8、sdshdr16、sdshdr32 和 sdshdr64。</p>
<p>这 5 种类型的主要<strong>区别就在于，它们数据结构中的 len 和 alloc 成员变量的数据类型不同</strong>。</p>
<p>比如 sdshdr16 和 sdshdr32 这两个类型，它们的定义分别如下：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__packed__<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">sdshdr16</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint16_t</span> len<span class="token punctuation">;</span>
    <span class="token class-name">uint16_t</span> alloc<span class="token punctuation">;</span> 
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> flags<span class="token punctuation">;</span> 
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token keyword">struct</span> <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__packed__<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">sdshdr32</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint32_t</span> len<span class="token punctuation">;</span>
    <span class="token class-name">uint32_t</span> alloc<span class="token punctuation">;</span> 
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> flags<span class="token punctuation">;</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到：</p>
<ul>
<li>sdshdr16 类型的 len 和 alloc 的数据类型都是 uint16_t，表示字符数组长度和分配空间大小不能超过 2 的 16 次方。</li>
<li>sdshdr32 则都是 uint32_t，表示表示字符数组长度和分配空间大小不能超过 2 的 32 次方。</li>
</ul>
<p><strong>之所以 SDS 设计不同类型的结构体，是为了能灵活保存不同大小的字符串，从而有效节省内存空间</strong>。比如，在保存小字符串时，结构头占用空间也比较少。</p>
<p>除了设计不同类型的结构体，Redis 在编程上还<strong>使用了专门的编译优化来节省内存空间</strong>，即在 struct 声明了 <code v-pre>__attribute__ ((packed))</code> ，它的作用是：<strong>告诉编译器取消结构体在编译过程中的优化对齐，按照实际占用字节数进行对齐</strong>。</p>
<p>比如，sdshdr16 类型的 SDS，默认情况下，编译器会按照 2 字节对齐的方式给变量分配内存，这意味着，即使一个变量的大小不到 2 个字节，编译器也会给它分配 2 个字节。</p>
<p>举个例子，假设下面这个结构体，它有两个成员变量，类型分别是 char 和 int，如下所示：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>

<span class="token keyword">struct</span> <span class="token class-name">test1</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> a<span class="token punctuation">;</span>
    <span class="token keyword">int</span> b<span class="token punctuation">;</span>
 <span class="token punctuation">}</span> test1<span class="token punctuation">;</span>
 
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"%lu\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>test1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大家猜猜这个结构体大小是多少？我先直接说答案，这个结构体大小计算出来是 8。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/35820959e8cf4376391c427ed7f81495.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>这是因为默认情况下，编译器是使用「字节对齐」的方式分配内存，虽然 char 类型只占一个字节，但是由于成员变量里有 int 类型，它占用了 4 个字节，所以在成员变量为 char 类型分配内存时，会分配 4 个字节，其中这多余的 3 个字节是为了字节对齐而分配的，相当于有 3 个字节被浪费掉了。</p>
<p>如果不想编译器使用字节对齐的方式进行分配内存，可以采用了 <code v-pre>__attribute__ ((packed))</code> 属性定义结构体，这样一来，结构体实际占用多少内存空间，编译器就分配多少空间。</p>
<p>比如，我用 <code v-pre>__attribute__ ((packed))</code> 属性定义下面的结构体 ，同样包含 char 和 int 两个类型的成员变量，代码如下所示：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>

<span class="token keyword">struct</span> <span class="token keyword">__attribute__</span><span class="token punctuation">(</span><span class="token punctuation">(</span>packed<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">test2</span>  <span class="token punctuation">{</span>
    <span class="token keyword">char</span> a<span class="token punctuation">;</span>
    <span class="token keyword">int</span> b<span class="token punctuation">;</span>
 <span class="token punctuation">}</span> test2<span class="token punctuation">;</span>
 
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"%lu\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>test2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这时打印的结果是 5（1 个字节 char + 4 字节 int）。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/47e6c8fbc17fd6c89bdfcb5eedaaacff.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>可以看得出，这是按照实际占用字节数进行分配内存的，这样可以节省内存空间。</p>
<h2 id="压缩列表" tabindex="-1"><a class="header-anchor" href="#压缩列表" aria-hidden="true">#</a> 压缩列表</h2>
<blockquote>
<p><a href="https://xiaolincoding.com/redis/data_struct/data_struct.html#%E5%8E%8B%E7%BC%A9%E5%88%97%E8%A1%A8" target="_blank" rel="noopener noreferrer">Redis 数据结构 | 小林coding (xiaolincoding.com)<ExternalLinkIcon/></a></p>
</blockquote>
<p>压缩列表的最大特点，就是它被设计成一种内存紧凑型的数据结构，占用一块连续的内存空间，不仅可以利用 CPU 缓存，而且会针对不同长度的数据，进行相应编码，这种方法可以有效地节省内存开销。</p>
<p>但是，压缩列表的缺陷也是有的：</p>
<ul>
<li>不能保存过多的元素，否则查询效率就会降低；</li>
<li>新增或修改某个元素时，压缩列表占用的内存空间需要重新分配，甚至可能引发连锁更新的问题。</li>
</ul>
<p>因此，Redis 对象（List 对象、Hash 对象、Zset 对象）包含的元素数量较少，或者元素值不大的情况才会使用压缩列表作为底层数据结构。</p>
<h3 id="压缩列表结构设计" tabindex="-1"><a class="header-anchor" href="#压缩列表结构设计" aria-hidden="true">#</a> 压缩列表结构设计</h3>
<p>压缩列表是 Redis 为了节约内存而开发的，它是<strong>由连续内存块组成的顺序型数据结构</strong>，有点类似于数组。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/ab0b44f557f8b5bc7acb3a53d43ebfcb.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>压缩列表在表头有三个字段：</p>
<ul>
<li><em><strong>zlbytes</strong></em>，记录整个压缩列表占用对内存字节数；</li>
<li><em><strong>zltail</strong></em>，记录压缩列表「尾部」节点距离起始地址由多少字节，也就是列表尾的偏移量；</li>
<li><em><strong>zllen</strong></em>，记录压缩列表包含的节点数量；</li>
<li><em><strong>zlend</strong></em>，标记压缩列表的结束点，固定值 0xFF（十进制255）。</li>
</ul>
<p>在压缩列表中，如果我们要查找定位第一个元素和最后一个元素，可以通过表头三个字段的长度直接定位，复杂度是 O(1)。而<strong>查找其他元素时，就没有这么高效了，只能逐个查找，此时的复杂度就是 O(N) 了，因此压缩列表不适合保存过多的元素</strong>。</p>
<p>另外，压缩列表节点（entry）的构成如下：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/a3b1f6235cf0587115b21312fe60289c.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>压缩列表节点包含三部分内容：</p>
<ul>
<li><em><strong>prevlen</strong></em>，记录了「前一个节点」的长度；</li>
<li><em><strong>encoding</strong></em>，记录了当前节点实际数据的类型以及长度；</li>
<li><em><strong>data</strong></em>，记录了当前节点的实际数据；</li>
</ul>
<p>当我们往压缩列表中插入数据时，压缩列表就会根据数据是字符串还是整数，以及数据的大小，会使用不同空间大小的 prevlen 和 encoding 这两个元素里保存的信息，<strong>这种根据数据大小和类型进行不同的空间大小分配的设计思想，正是 Redis 为了节省内存而采用的</strong>。</p>
<p>分别说下，prevlen 和 encoding 是如何根据数据的大小和类型来进行不同的空间大小分配。</p>
<p>压缩列表里的每个节点中的 prevlen 属性都记录了「前一个节点的长度」，而且 prevlen 属性的空间大小跟前一个节点长度值有关，比如：</p>
<ul>
<li>如果<strong>前一个节点的长度小于 254 字节</strong>，那么 prevlen 属性需要用 <strong>1 字节的空间</strong>来保存这个长度值；</li>
<li>如果<strong>前一个节点的长度大于等于 254 字节</strong>，那么 prevlen 属性需要用 <strong>5 字节的空间</strong>来保存这个长度值；</li>
</ul>
<p>encoding 属性的空间大小跟数据是字符串还是整数，以及字符串的长度有关：</p>
<ul>
<li>如果<strong>当前节点的数据是整数</strong>，则 encoding 会使用 <strong>1 字节的空间</strong>进行编码。</li>
<li>如果<strong>当前节点的数据是字符串，根据字符串的长度大小</strong>，encoding 会使用 <strong>1 字节/2字节/5字节的空间</strong>进行编码。</li>
</ul>
<h3 id="连锁更新" tabindex="-1"><a class="header-anchor" href="#连锁更新" aria-hidden="true">#</a> 连锁更新</h3>
<p>压缩列表除了查找复杂度高的问题，还有一个问题。</p>
<p><strong>压缩列表新增某个元素或修改某个元素时，如果空间不不够，压缩列表占用的内存空间就需要重新分配。而当新插入的元素较大时，可能会导致后续元素的 prevlen 占用空间都发生变化，从而引起「连锁更新」问题，导致每个元素的空间都要重新分配，造成访问压缩列表性能的下降</strong>。</p>
<p>前面提到，压缩列表节点的 prevlen 属性会根据前一个节点的长度进行不同的空间大小分配：</p>
<ul>
<li>如果前一个<strong>节点的长度小于 254 字节</strong>，那么 prevlen 属性需要用 <strong>1 字节的空间</strong>来保存这个长度值；</li>
<li>如果前一个<strong>节点的长度大于等于 254 字节</strong>，那么 prevlen 属性需要用 <strong>5 字节的空间</strong>来保存这个长度值；</li>
</ul>
<p>现在假设一个压缩列表中有多个连续的、长度在 250～253 之间的节点，如下图：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/462c6a65531667f2bcf420953b0aded9.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>因为这些节点长度值小于 254 字节，所以 prevlen 属性需要用 1 字节的空间来保存这个长度值。</p>
<p>这时，如果将一个长度大于等于 254 字节的新节点加入到压缩列表的表头节点，即新节点将成为 e1 的前置节点，如下图：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/d1a6deff4672580609c99a5b06bf3429.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>因为 e1 节点的 prevlen 属性只有 1 个字节大小，无法保存新节点的长度，此时就需要对压缩列表的空间重分配操作，并将 e1 节点的 prevlen 属性从原来的 1 字节大小扩展为 5 字节大小。</p>
<p>多米诺牌的效应就此开始。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/1f0e5ae7ab749078cadda5ba0ed98eac.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure>
<p>e1 原本的长度在 250～253 之间，因为刚才的扩展空间，此时 e1 的长度就大于等于 254 了，因此原本 e2 保存 e1 的 prevlen 属性也必须从 1 字节扩展至 5 字节大小。</p>
<p>正如扩展 e1 引发了对 e2 扩展一样，扩展 e2 也会引发对 e3 的扩展，而扩展 e3 又会引发对 e4 的扩展.... 一直持续到结尾。</p>
<p><strong>这种在特殊情况下产生的连续多次空间扩展操作就叫做「连锁更新」</strong>，就像多米诺牌的效应一样，第一张牌倒下了，推动了第二张牌倒下；第二张牌倒下，又推动了第三张牌倒下....，</p>
<h3 id="压缩列表的缺陷" tabindex="-1"><a class="header-anchor" href="#压缩列表的缺陷" aria-hidden="true">#</a> 压缩列表的缺陷</h3>
<p>空间扩展操作也就是重新分配内存，因此<strong>连锁更新一旦发生，就会导致压缩列表占用的内存空间要多次重新分配，这就会直接影响到压缩列表的访问性能</strong>。</p>
<p>所以说，<strong>虽然压缩列表紧凑型的内存布局能节省内存开销，但是如果保存的元素数量增加了，或是元素变大了，会导致内存重新分配，最糟糕的是会有「连锁更新」的问题</strong>。</p>
<p>因此，<strong>压缩列表只会用于保存的节点数量不多的场景</strong>，只要节点数量足够小，即使发生连锁更新，也是能接受的。</p>
<p>虽说如此，Redis 针对压缩列表在设计上的不足，在后来的版本中，新增设计了两种数据结构：quicklist（Redis 3.2 引入） 和 listpack（Redis 5.0 引入）。这两种数据结构的设计目标，就是尽可能地保持压缩列表节省内存的优势，同时解决压缩列表的「连锁更新」的问题。</p>
<h2 id="前缀树-字典树" tabindex="-1"><a class="header-anchor" href="#前缀树-字典树" aria-hidden="true">#</a> 前缀树（字典树）</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Trie</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">TrieNode</span> <span class="token punctuation">{</span>
        <span class="token comment">// count表示以当前单词结尾的单词数量</span>
        <span class="token keyword">int</span> count<span class="token punctuation">;</span>
        <span class="token comment">// prefix表示以该处节点之前的字符串为前缀的单词数量（包括当前节点）</span>
        <span class="token keyword">int</span> prefix<span class="token punctuation">;</span>
        <span class="token class-name">TrieNode</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nextNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TrieNode</span><span class="token punctuation">[</span><span class="token number">26</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">TrieNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            prefix <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//插入一个新单词</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">insert</span><span class="token punctuation">(</span><span class="token class-name">TrieNode</span> root<span class="token punctuation">,</span> <span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> c <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//如果该分支不存在，创建一个新节点</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>nextNode<span class="token punctuation">[</span>c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">'a'</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                root<span class="token punctuation">.</span>nextNode<span class="token punctuation">[</span>c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">'a'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TrieNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            root <span class="token operator">=</span> root<span class="token punctuation">.</span>nextNode<span class="token punctuation">[</span>c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">'a'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            root<span class="token punctuation">.</span>prefix<span class="token operator">++</span><span class="token punctuation">;</span><span class="token comment">//注意，应该加在后面</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//以该节点结尾的单词数+1</span>
        root<span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//查找该单词是否存在，如果存在返回数量，不存在返回-1</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">search</span><span class="token punctuation">(</span><span class="token class-name">TrieNode</span> root<span class="token punctuation">,</span> <span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> c <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//如果该分支不存在，表名该单词不存在</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>nextNode<span class="token punctuation">[</span>c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">'a'</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//如果存在，则继续向下遍历</span>
            root <span class="token operator">=</span> root<span class="token punctuation">.</span>nextNode<span class="token punctuation">[</span>c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">'a'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//如果count==0,也说明该单词不存在</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>count <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> root<span class="token punctuation">.</span>count<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//查询以str为前缀的单词数量</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">searchPrefix</span><span class="token punctuation">(</span><span class="token class-name">TrieNode</span> root<span class="token punctuation">,</span> <span class="token class-name">String</span> str<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> c <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">toCharArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> str<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//如果该分支不存在，表名该单词不存在</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>nextNode<span class="token punctuation">[</span>c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">'a'</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">//如果存在，则继续向下遍历</span>
            root <span class="token operator">=</span> root<span class="token punctuation">.</span>nextNode<span class="token punctuation">[</span>c<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token char">'a'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> root<span class="token punctuation">.</span>prefix<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">TrieNode</span> newNode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TrieNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">insert</span><span class="token punctuation">(</span>newNode<span class="token punctuation">,</span> <span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">insert</span><span class="token punctuation">(</span>newNode<span class="token punctuation">,</span> <span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">insert</span><span class="token punctuation">(</span>newNode<span class="token punctuation">,</span> <span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">insert</span><span class="token punctuation">(</span>newNode<span class="token punctuation">,</span> <span class="token string">"helloworld"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">search</span><span class="token punctuation">(</span>newNode<span class="token punctuation">,</span> <span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token function">searchPrefix</span><span class="token punctuation">(</span>newNode<span class="token punctuation">,</span> <span class="token string">"h"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     输出：3   4
     **/</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二叉树构建" tabindex="-1"><a class="header-anchor" href="#二叉树构建" aria-hidden="true">#</a> 二叉树构建</h2>
<blockquote>
<p>数组转换为二叉树</p>
</blockquote>
<div class="language-cpp line-numbers-mode" data-ext="cpp"><pre v-pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;bits/stdc++.h></span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token class-name">TreeNode</span> <span class="token punctuation">{</span>
	<span class="token keyword">int</span> val<span class="token punctuation">;</span>
	TreeNode <span class="token operator">*</span>left<span class="token punctuation">;</span>
	TreeNode <span class="token operator">*</span>right<span class="token punctuation">;</span>
	<span class="token function">TreeNode</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		val <span class="token operator">=</span> x<span class="token punctuation">;</span>
		left <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
		right <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

TreeNode<span class="token operator">*</span> <span class="token function">createTree</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span><span class="token operator">&amp;</span> vec<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	vector<span class="token operator">&lt;</span>TreeNode<span class="token operator">*</span><span class="token operator">></span> vecNode<span class="token punctuation">;</span>
	TreeNode<span class="token operator">*</span> root <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> vec<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		TreeNode<span class="token operator">*</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">TreeNode</span><span class="token punctuation">(</span>vec<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>vec<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> vecNode<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">else</span> vecNode<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> root <span class="token operator">=</span> node<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">*</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">&lt;</span> vecNode<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> <span class="token punctuation">(</span>vecNode<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token constant">NULL</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			vecNode<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-></span> left <span class="token operator">=</span> vecNode<span class="token punctuation">[</span><span class="token number">2</span> <span class="token operator">*</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
			vecNode<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-></span> right <span class="token operator">=</span> vecNode<span class="token punctuation">[</span><span class="token number">2</span> <span class="token operator">*</span> i <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> root<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">preOrder</span><span class="token punctuation">(</span>TreeNode <span class="token operator">*</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
	cout <span class="token operator">&lt;&lt;</span> root <span class="token operator">-></span> val <span class="token operator">&lt;&lt;</span> <span class="token char">' '</span><span class="token punctuation">;</span>
	<span class="token function">preOrder</span><span class="token punctuation">(</span>root <span class="token operator">-></span> left<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">preOrder</span><span class="token punctuation">(</span>root <span class="token operator">-></span> right<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">l</span><span class="token punctuation">(</span>TreeNode <span class="token operator">*</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
	queue<span class="token operator">&lt;</span>TreeNode<span class="token operator">*</span><span class="token operator">></span> q<span class="token punctuation">;</span>
	q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>q<span class="token punctuation">.</span><span class="token function">empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">int</span> len <span class="token operator">=</span> q<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			TreeNode<span class="token operator">*</span> node <span class="token operator">=</span> q<span class="token punctuation">.</span><span class="token function">front</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			q<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			cout <span class="token operator">&lt;&lt;</span> node <span class="token operator">-></span> val <span class="token operator">&lt;&lt;</span> <span class="token char">' '</span><span class="token punctuation">;</span>
			<span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">-></span> left<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node <span class="token operator">-></span> left<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span> 
			<span class="token keyword">if</span> <span class="token punctuation">(</span>node <span class="token operator">-></span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				q<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node <span class="token operator">-></span> right<span class="token punctuation">)</span><span class="token punctuation">;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">></span> vec<span class="token punctuation">;</span>
	<span class="token keyword">int</span> n<span class="token punctuation">;</span>
	cin <span class="token operator">>></span> n<span class="token punctuation">;</span>
	<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">int</span> a<span class="token punctuation">;</span>
		cin <span class="token operator">>></span> a<span class="token punctuation">;</span>
		vec<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	TreeNode<span class="token operator">*</span> root <span class="token operator">=</span> <span class="token function">createTree</span><span class="token punctuation">(</span>vec<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token function">preOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
	cout <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
	<span class="token function">print</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="图的构建" tabindex="-1"><a class="header-anchor" href="#图的构建" aria-hidden="true">#</a> 图的构建</h2>
<h2 id="并查集" tabindex="-1"><a class="header-anchor" href="#并查集" aria-hidden="true">#</a> 并查集</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">UnionFind</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span><span class="token class-name">Integer</span><span class="token punctuation">></span></span> father<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token class-name">UnionFind</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        father <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>father<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            father<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> rootX <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> rootY <span class="token operator">=</span> <span class="token function">find</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span>rootX <span class="token operator">!=</span> rootY<span class="token punctuation">)</span><span class="token punctuation">{</span>
            father<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>rootX<span class="token punctuation">,</span>rootY<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">find</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> root <span class="token operator">=</span> x<span class="token punctuation">;</span>
        
        <span class="token keyword">while</span><span class="token punctuation">(</span>father<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            root <span class="token operator">=</span> father<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">while</span><span class="token punctuation">(</span>x <span class="token operator">!=</span> root<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">int</span> original_father <span class="token operator">=</span> father<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
            father<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
            x <span class="token operator">=</span> original_father<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        <span class="token keyword">return</span> root<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isConnected</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">find</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token function">find</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="树状数组" tabindex="-1"><a class="header-anchor" href="#树状数组" aria-hidden="true">#</a> 树状数组</h2>
<blockquote>
<p><a href="https://halfrost.com/binary_indexed_tree/" target="_blank" rel="noopener noreferrer">聊聊树状数组 Binary Indexed Tree<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="单点更新-区间求和" tabindex="-1"><a class="header-anchor" href="#单点更新-区间求和" aria-hidden="true">#</a> 单点更新，区间求和</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">TreeArray</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> tree<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">;</span> <span class="token comment">// nums下标从0开始，tree下标从1开始</span>

    <span class="token comment">// 初始化</span>
    <span class="token keyword">public</span> <span class="token class-name">TreeArray</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>tree <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>nums<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>nums <span class="token operator">=</span> nums<span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">add</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 单点修改 </span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">add</span><span class="token punctuation">(</span>index <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> val <span class="token operator">-</span> nums<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        nums<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 区间查询</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sumRange</span><span class="token punctuation">(</span><span class="token keyword">int</span> left<span class="token punctuation">,</span> <span class="token keyword">int</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">prefixSum</span><span class="token punctuation">(</span>right <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token function">prefixSum</span><span class="token punctuation">(</span>left<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">lowBit</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> x <span class="token operator">&amp;</span> <span class="token operator">-</span>x<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// index位置增加val</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token keyword">int</span> val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> tree<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            tree<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">+=</span> val<span class="token punctuation">;</span>
            index <span class="token operator">+=</span> <span class="token function">lowBit</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 查询前index位置的前缀和</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> <span class="token function">prefixSum</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>index <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            sum <span class="token operator">+=</span> tree<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
            index <span class="token operator">-=</span> <span class="token function">lowBit</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sum<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


