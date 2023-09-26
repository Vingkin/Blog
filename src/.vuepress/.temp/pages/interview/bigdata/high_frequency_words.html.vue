<template><div><blockquote>
<p><a href="https://mp.weixin.qq.com/s/e2kFn99DSXjQ7fCxjxlSYw" target="_blank" rel="noopener noreferrer">如何从海量数据中找出高频词？<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="题目描述" tabindex="-1"><a class="header-anchor" href="#题目描述" aria-hidden="true">#</a> 题目描述</h2>
<p>假如有一个<strong>1G</strong>大小的文件，文件里每一行是一个词，每个词的大小不超过<strong>16byte</strong>，要求返回出现频率最高的100个词。内存大小限制是<strong>10M</strong></p>
<h2 id="解法1-存在问题" tabindex="-1"><a class="header-anchor" href="#解法1-存在问题" aria-hidden="true">#</a> 解法1（存在问题）</h2>
<p>由于内存限制，我们无法直接将大文件的所有词一次性读到内存中。</p>
<p>可以使用<strong>分治策略</strong>，把一个大文件分解成多个小文件，保证每个文件的大小小于10M，进而直接将单个小文件读取到内存中处理。</p>
<p><strong>第一步</strong>，首先<strong>遍历大文件</strong>，对遍历到的每个词x，执行 <code v-pre>hash(x) % 500</code>，将结果为i的词存放到文件f(i)中，遍历结束后，可以得到500个小文件，每个小文件的大小为2M左右；</p>
<p><strong>第二步</strong>，接着<strong>统计每个小文件中出现频数最高的100个词</strong>。可以使用HashMap来实现，其中key是词，value是该词出现的频率。</p>
<p>对于遍历到的词x，如果在map中不存在，则执行 <code v-pre>map.put(x, 1)。</code></p>
<p>若存在，则执行 <code v-pre>map.put(x, map.get(x)+1)</code>，将该词出现的次数加1。</p>
<p><strong>第三步</strong>，在第二步中找出了每个文件出现频率最高的100个词之后，通过维护一个<strong>小顶堆</strong>来找出所有小文件中出现频率最高的100词。</p>
<p>具体方法是，遍历第一个文件，把第一个文件中出现频率最高的100个词构造成小顶堆。</p>
<p>如果第一个文件中词的个数小于100，可以继续遍历第二个文件，直到构造好有100个结点的小顶堆为止。</p>
<p>继续遍历其他小文件，如果遍历到的词的出现次数大于堆顶上词的出现次数，可以用新遍历到的词<strong>替换堆顶的词</strong>，然后重新调整此堆为小顶堆。</p>
<p>当遍历完所有小文件后，<strong>这个小顶堆中的词就是出现频率最高的100词</strong>。</p>
<p><strong>总结一下</strong>，这种解法的主要思路如下：</p>
<ol>
<li>采用<strong>分治</strong>的思想，进行哈希取余</li>
<li>使用<strong>HashMap</strong>统计每个小文件单词出现的频次</li>
<li>使用<strong>小顶堆</strong>，遍历步骤2中的小文件，找出词频top100的词</li>
</ol>
<p><strong>但是很容易可以发现问题，在第二步中，如果这个1G的大文件中有某个词词频过高，可能导致小文件大小超过10m。这种情况下该怎么处理呢？</strong></p>
<p>接下来看另外一种解法。</p>
<h2 id="解法2" tabindex="-1"><a class="header-anchor" href="#解法2" aria-hidden="true">#</a> 解法2</h2>
<p><strong>第一步</strong>：使用<strong>多路归并排序</strong>对大文件进行排序，这样相同的单词肯定是紧挨着的</p>
<p>多路归并排序对大文件进行排序的步骤如下：</p>
<ol>
<li>将文件按照顺序切分成大小不超过2m的小文件，总共500个小文件</li>
<li>使用10MB内存<strong>分别</strong>对 500 个小文件中的单词进行<strong>排序</strong></li>
<li>使用一个大小为500大小的堆，对500个小文件进行<strong>多路排序</strong>，结果写到一个大文件中</li>
</ol>
<p>其中第三步，对500个小文件进行多路排序的思路如下：</p>
<ul>
<li><strong>初始化一个小顶堆</strong>，大小就是有序小文件的个数500。堆中的每个节点存放每个有序小文件对应的输入流。</li>
<li>按照每个有序文件中的下一行数据对所有文件输入流进行<strong>排序</strong>，单词小的输入文件流放在堆顶。</li>
<li>拿出堆顶的输入流，并其下一行数据写入到最终排序的文件中，如果拿出来的输入流中还有数据的话，那么将这个输入流再一次添加到栈中。否则说明该文件输入流中没有数据了，那么可以关闭这个流。</li>
<li>循环这个过程，直到所有文件输入流都没有数据为止。</li>
</ul>
<p><strong>第二步</strong>：</p>
<ol>
<li>初始化一个100个节点的<strong>小顶堆</strong>，用于保存100个出现频率最多的单词</li>
<li>遍历整个文件，一个单词一个单词的从文件中取出来，并计数</li>
<li>等到遍历的单词和上一个单词不同的话，那么上一个单词及其频率如果大于堆顶的词的频率，那么放在堆中，否则不放</li>
</ol>
<p>最终，小顶堆中就是出现频率前100的单词了。</p>
<p>解法2相对解法1，更加严谨，如果某个词词频过高或者整个文件都是同一个词的话，解法1不适用。</p>
</div></template>


