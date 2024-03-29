<template><div><blockquote>
<p><a href="https://bbs.huaweicloud.com/blogs/344958" target="_blank" rel="noopener noreferrer">SnowFlake 雪花算法详解与实现<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2>
<p>现在的服务基本是分布式，微服务形式的，而且大数据量也导致分库分表的产生，对于水平分表就需要保证表中 id 的全局唯一性。</p>
<p>对于 MySQL 而言，一个表中的主键 id 一般使用自增的方式，但是如果进行水平分表之后，多个表中会生成重复的 id 值。那么如何保证水平分表后的多张表中的 id 是全局唯一性的呢？</p>
<p>如果还是借助数据库主键自增的形式，那么可以让不同表初始化一个不同的初始值，然后按指定的步长进行自增。例如有3张拆分表，初始主键值为1，2，3，自增步长为3。</p>
<p>当然也有人使用 UUID 来作为主键，但是 UUID 生成的是一个无序的字符串，对于 MySQL 推荐使用增长的数值类型值作为主键来说不适合。</p>
<p>也可以使用 Redis 的自增原子性来生成唯一 id，但是这种方式业内比较少用。</p>
<p>当然还有其他解决方案，不同互联网公司也有自己内部的实现方案。雪花算法是其中一个用于解决分布式 id 的高效方案，也是许多互联网公司在推荐使用的。</p>
<h2 id="snowflake-雪花算法" tabindex="-1"><a class="header-anchor" href="#snowflake-雪花算法" aria-hidden="true">#</a> SnowFlake 雪花算法</h2>
<p>SnowFlake 中文意思为雪花，故称为雪花算法。最早是 Twitter 公司在其内部用于分布式环境下生成唯一 ID。在2014年开源 scala 语言版本。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/1649062159979879307.png" alt="雪花算法" tabindex="0" loading="lazy"><figcaption>雪花算法</figcaption></figure>
<p>雪花算法原理就是生成一个的64位比特位的 long 类型的唯一 id。</p>
<ul>
<li>最高1位固定值0，因为生成的 id 是正整数，如果是1就是负数了。</li>
<li>接下来41位存储毫秒级时间戳，<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>41</mn></msup><mi mathvariant="normal">/</mi><mo stretchy="false">(</mo><mn>1000</mn><mo>∗</mo><mn>60</mn><mo>∗</mo><mn>60</mn><mo>∗</mo><mn>24</mn><mo>∗</mo><mn>365</mn><mo stretchy="false">)</mo><mo>=</mo><mn>69</mn></mrow><annotation encoding="application/x-tex">2^{41}/(1000*60*60*24*365)=69</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">41</span></span></span></span></span></span></span></span></span><span class="mord">/</span><span class="mopen">(</span><span class="mord">1000</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">60</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">60</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">24</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">365</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">69</span></span></span></span>，大概可以使用69年。</li>
<li>再接下10位存储机器码，包括5位 datacenterId 和5位 workerId。最多可以部署<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>10</mn></msup><mo>=</mo><mn>1024</mn></mrow><annotation encoding="application/x-tex">2^{10}=1024</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">10</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">1024</span></span></span></span>台机器。</li>
<li>最后12位存储序列号。同一毫秒时间戳时，通过这个递增的序列号来区分。即对于同一台机器而言，同一毫秒时间戳下，可以生成<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mn>12</mn></msup><mo>=</mo><mn>4096</mn></mrow><annotation encoding="application/x-tex">2^{12}=4096</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8141em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">12</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6444em;"></span><span class="mord">4096</span></span></span></span>个不重复 id。</li>
</ul>
<p>可以将雪花算法作为一个单独的服务进行部署，然后需要全局唯一 id 的系统，请求雪花算法服务获取 id 即可。</p>
<p>对于每一个雪花算法服务，需要先指定10位的机器码（机器id+服务id），这个根据自身业务进行设定即可。例如机房号+机器号，机器号+服务号，或者是其他可区别标识的10位比特位的整数值都行。</p>
<h3 id="算法实现" tabindex="-1"><a class="header-anchor" href="#算法实现" aria-hidden="true">#</a> 算法实现</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Set</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">TreeSet</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SnowflakeIdGenerator</span> <span class="token punctuation">{</span>

  <span class="token comment">// 初始时间戳(纪年)，可用雪花算法服务上线时间戳的值</span>
  <span class="token comment">// 1649059688068：2022-04-04 16:08:08</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">INIT_EPOCH</span> <span class="token operator">=</span> <span class="token number">1649059688068L</span><span class="token punctuation">;</span>

  <span class="token comment">// 记录最后使用的毫秒时间戳，主要用于判断是否同一毫秒，以及用于服务器时钟回拨判断</span>
  <span class="token keyword">private</span> <span class="token keyword">long</span> lastTimeMillis <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1L</span><span class="token punctuation">;</span>

  <span class="token comment">// dataCenterId占用的位数</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">DATA_CENTER_ID_BITS</span> <span class="token operator">=</span> <span class="token number">5L</span><span class="token punctuation">;</span>
  <span class="token comment">// dataCenterId占用5个比特位，最大值31</span>
  <span class="token comment">// 0000000000000000000000000000000000000000000000000000000000011111</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">MAX_DATA_CENTER_ID</span> <span class="token operator">=</span> <span class="token operator">~</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">&lt;&lt;</span> <span class="token constant">DATA_CENTER_ID_BITS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// datacenterId</span>
  <span class="token keyword">private</span> <span class="token keyword">long</span> datacenterId<span class="token punctuation">;</span>

  <span class="token comment">// workId占用的位数</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">WORKER_ID_BITS</span> <span class="token operator">=</span> <span class="token number">5L</span><span class="token punctuation">;</span>
  <span class="token comment">// workId占用5个比特位，最大值31</span>
  <span class="token comment">// 0000000000000000000000000000000000000000000000000000000000011111</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">MAX_WORKER_ID</span> <span class="token operator">=</span> <span class="token operator">~</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">&lt;&lt;</span> <span class="token constant">WORKER_ID_BITS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// workId</span>
  <span class="token keyword">private</span> <span class="token keyword">long</span> workerId<span class="token punctuation">;</span>

  <span class="token comment">// 最后12位，代表每毫秒内可产生最大序列号，即 2^12 - 1 = 4095</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">SEQUENCE_BITS</span> <span class="token operator">=</span> <span class="token number">12L</span><span class="token punctuation">;</span>
  <span class="token comment">// 掩码（最低12位为1，高位都为0），主要用于与自增后的序列号进行位与，如果值为0，则代表自增后的序列号超过了4095</span>
  <span class="token comment">// 0000000000000000000000000000000000000000000000000000111111111111</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">SEQUENCE_MASK</span> <span class="token operator">=</span> <span class="token operator">~</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1L</span> <span class="token operator">&lt;&lt;</span> <span class="token constant">SEQUENCE_BITS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 同一毫秒内的最新序号，最大值可为 2^12 - 1 = 4095</span>
  <span class="token keyword">private</span> <span class="token keyword">long</span> sequence<span class="token punctuation">;</span>

  <span class="token comment">// workId位需要左移的位数 12</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">WORK_ID_SHIFT</span> <span class="token operator">=</span> <span class="token constant">SEQUENCE_BITS</span><span class="token punctuation">;</span>
  <span class="token comment">// dataCenterId位需要左移的位数 12+5</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">DATA_CENTER_ID_SHIFT</span> <span class="token operator">=</span> <span class="token constant">SEQUENCE_BITS</span> <span class="token operator">+</span> <span class="token constant">WORKER_ID_BITS</span><span class="token punctuation">;</span>
  <span class="token comment">// 时间戳需要左移的位数 12+5+5</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">TIMESTAMP_SHIFT</span> <span class="token operator">=</span> <span class="token constant">SEQUENCE_BITS</span> <span class="token operator">+</span> <span class="token constant">WORKER_ID_BITS</span> <span class="token operator">+</span> <span class="token constant">DATA_CENTER_ID_BITS</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token class-name">SnowflakeIdGenerator</span><span class="token punctuation">(</span><span class="token keyword">long</span> datacenterId<span class="token punctuation">,</span> <span class="token keyword">long</span> workerId<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// 检查datacenterId的合法值</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>datacenterId <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> datacenterId <span class="token operator">></span> <span class="token constant">MAX_DATA_CENTER_ID</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span>
          <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"datacenterId值必须大于0并且小于%d"</span><span class="token punctuation">,</span> <span class="token constant">MAX_DATA_CENTER_ID</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 检查workId的合法值</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>workerId <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> workerId <span class="token operator">></span> <span class="token constant">MAX_WORKER_ID</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"workId值必须大于0并且小于%d"</span><span class="token punctuation">,</span> <span class="token constant">MAX_WORKER_ID</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>workerId <span class="token operator">=</span> workerId<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>datacenterId <span class="token operator">=</span> datacenterId<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * 通过雪花算法生成下一个id，注意这里使用synchronized同步
   *
   * <span class="token keyword">@return</span> 唯一id
   */</span>
  <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">long</span> <span class="token function">nextId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">long</span> currentTimeMillis <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 当前时间小于上一次生成id使用的时间，可能出现服务器时钟回拨问题</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>currentTimeMillis <span class="token operator">&lt;</span> lastTimeMillis<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>
          <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"可能出现服务器时钟回拨问题，请检查服务器时间。当前服务器时间戳：%d，上一次使用时间戳：%d"</span><span class="token punctuation">,</span> currentTimeMillis<span class="token punctuation">,</span>
              lastTimeMillis<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>currentTimeMillis <span class="token operator">==</span> lastTimeMillis<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 还是在同一毫秒内，则将序列号递增1，序列号最大值为4095</span>

      <span class="token comment">// 序列号的最大值是4095，使用掩码（最低12位为1，高位都为0）进行位与运行后如果值为0，则自增后的序列号超过了4095</span>
      <span class="token comment">// 那么就使用新的时间戳</span>
      sequence <span class="token operator">=</span> <span class="token punctuation">(</span>sequence <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token constant">SEQUENCE_MASK</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>sequence <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        currentTimeMillis <span class="token operator">=</span> <span class="token function">tilNextMillis</span><span class="token punctuation">(</span>lastTimeMillis<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token comment">// 不在同一毫秒内，则序列号重新从0开始，序列号最大值为4095</span>
      sequence <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 记录最后一次使用的毫秒时间戳</span>
    lastTimeMillis <span class="token operator">=</span> currentTimeMillis<span class="token punctuation">;</span>

    <span class="token comment">// 核心算法，将不同部分的数值移动到指定的位置，然后进行或运行</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>currentTimeMillis <span class="token operator">-</span> <span class="token constant">INIT_EPOCH</span><span class="token punctuation">)</span> <span class="token operator">&lt;&lt;</span> <span class="token constant">TIMESTAMP_SHIFT</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token punctuation">(</span>datacenterId
        <span class="token operator">&lt;&lt;</span> <span class="token constant">DATA_CENTER_ID_SHIFT</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token punctuation">(</span>workerId <span class="token operator">&lt;&lt;</span> <span class="token constant">WORK_ID_SHIFT</span><span class="token punctuation">)</span> <span class="token operator">|</span> sequence<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * 获取指定时间戳的接下来的时间戳，也可以说是下一毫秒
   *
   * <span class="token keyword">@param</span> <span class="token parameter">lastTimeMillis</span> 指定毫秒时间戳
   * <span class="token keyword">@return</span> 时间戳
   */</span>
  <span class="token keyword">private</span> <span class="token keyword">long</span> <span class="token function">tilNextMillis</span><span class="token punctuation">(</span><span class="token keyword">long</span> lastTimeMillis<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> currentTimeMillis <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>currentTimeMillis <span class="token operator">&lt;=</span> lastTimeMillis<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      currentTimeMillis <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> currentTimeMillis<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">SnowflakeIdGenerator</span> snowflakeIdGenerator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SnowflakeIdGenerator</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 生成50个id</span>
    <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> set <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">50</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      set<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>snowflakeIdGenerator<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>set<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 验证生成100万个id需要多久</span>
    <span class="token keyword">long</span> startTime <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">1000000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      snowflakeIdGenerator<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="算法优缺点" tabindex="-1"><a class="header-anchor" href="#算法优缺点" aria-hidden="true">#</a> 算法优缺点</h3>
<p>雪花算法有以下几个优点：</p>
<ul>
<li>高并发分布式环境下生成不重复 id，每秒可生成百万个不重复 id。</li>
<li>基于时间戳，以及同一时间戳下序列号自增，基本保证 id 有序递增。</li>
<li>不依赖第三方库或者中间件。</li>
<li>算法简单，在内存中进行，效率高。</li>
</ul>
<p>雪花算法有如下缺点：</p>
<ul>
<li>依赖服务器时间，服务器时钟回拨时可能会生成重复 id。算法中可通过记录最后一个生成 id 时的时间戳来解决，每次生成 id 之前比较当前服务器时钟是否被回拨，避免生成重复 id。</li>
</ul>
<h3 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h3>
<p>其实雪花算法每一部分占用的比特位数量并不是固定死的。例如你的业务可能达不到69年之久，那么可用减少时间戳占用的位数，雪花算法服务需要部署的节点超过1024台，那么可将减少的位数补充给机器码用。</p>
<p>注意，雪花算法中41位比特位不是直接用来存储当前服务器毫秒时间戳的，而是需要当前服务器时间戳减去某一个初始时间戳值，一般可以使用服务上线时间作为初始时间戳值。</p>
<p>对于机器码，可根据自身情况做调整，例如机房号，服务器号，业务号，机器 IP 等都是可使用的。对于部署的不同雪花算法服务中，最后计算出来的机器码能区分开来即可。</p>
</div></template>


