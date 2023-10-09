<template><div><p><strong>目录</strong></p>
<nav class="table-of-contents"><ul><li><router-link to="#_1、短信登录">1、短信登录</router-link><ul><li><router-link to="#_1-1、导入黑马点评项目">1.1、导入黑马点评项目</router-link></li><li><router-link to="#_1-2-、基于session实现登录流程">1.2 、基于Session实现登录流程</router-link></li><li><router-link to="#_1-3-、实现发送短信验证码功能">1.3 、实现发送短信验证码功能</router-link></li><li><router-link to="#_1-4、实现登录拦截功能">1.4、实现登录拦截功能</router-link></li><li><router-link to="#_1-5、隐藏用户敏感信息">1.5、隐藏用户敏感信息</router-link></li><li><router-link to="#_1-6、session共享问题">1.6、session共享问题</router-link></li><li><router-link to="#_1-7、redis代替session的业务流程">1.7、Redis代替session的业务流程</router-link></li><li><router-link to="#_1-8、基于redis实现短信登录">1.8、基于Redis实现短信登录</router-link></li><li><router-link to="#_1-9、解决状态登录刷新问题">1.9、解决状态登录刷新问题</router-link></li></ul></li><li><router-link to="#_2、商户查询缓存">2、商户查询缓存</router-link><ul><li><router-link to="#_2-1、什么是缓存">2.1、什么是缓存?</router-link></li><li><router-link to="#_2-2、添加商户缓存">2.2、添加商户缓存</router-link></li><li><router-link to="#_2-3、缓存更新策略">2.3、缓存更新策略</router-link></li><li><router-link to="#_2-4、实现商铺和缓存与数据库双写一致">2.4、实现商铺和缓存与数据库双写一致</router-link></li><li><router-link to="#_2-5、缓存穿透问题的解决思路">2.5、缓存穿透问题的解决思路</router-link></li><li><router-link to="#_2-6、编码解决商品查询的缓存穿透问题">2.6、编码解决商品查询的缓存穿透问题：</router-link></li><li><router-link to="#_2-7、缓存雪崩问题及解决思路">2.7、缓存雪崩问题及解决思路</router-link></li><li><router-link to="#_2-8、缓存击穿问题及解决思路">2.8、缓存击穿问题及解决思路</router-link></li><li><router-link to="#_2-9、利用互斥锁解决缓存击穿问题">2.9、利用互斥锁解决缓存击穿问题</router-link></li><li><router-link to="#_2-10、利用逻辑过期解决缓存击穿问题">2.10、利用逻辑过期解决缓存击穿问题</router-link></li><li><router-link to="#_2-11、封装redis工具类">2.11、封装Redis工具类</router-link></li></ul></li><li><router-link to="#_3、优惠卷秒杀">3、优惠卷秒杀</router-link><ul><li><router-link to="#_3-1、全局唯一id">3.1、全局唯一ID</router-link></li><li><router-link to="#_3-2、redis实现全局唯一id">3.2、Redis实现全局唯一Id</router-link></li><li><router-link to="#_3-3、添加优惠卷">3.3、添加优惠卷</router-link></li><li><router-link to="#_3-4、实现秒杀下单">3.4、实现秒杀下单</router-link></li><li><router-link to="#_3-5、库存超卖问题分析">3.5、库存超卖问题分析</router-link></li><li><router-link to="#_3-6、乐观锁解决超卖问题">3.6、乐观锁解决超卖问题</router-link></li><li><router-link to="#_3-7、优惠券秒杀-一人一单">3.7、优惠券秒杀-一人一单</router-link></li><li><router-link to="#_3-8、集群环境下的并发问题">3.8、集群环境下的并发问题</router-link></li></ul></li><li><router-link to="#_4、分布式锁">4、分布式锁</router-link><ul><li><router-link to="#_4-1、基本原理和实现方式对比">4.1、基本原理和实现方式对比</router-link></li><li><router-link to="#_4-2、redis分布式锁的实现核心思路">4.2、Redis分布式锁的实现核心思路</router-link></li><li><router-link to="#_4-3、实现分布式锁版本一">4.3、实现分布式锁版本一</router-link></li><li><router-link to="#_4-4、redis分布式锁误删情况说明">4.4、Redis分布式锁误删情况说明</router-link></li><li><router-link to="#_4-5、解决redis分布式锁误删问题">4.5、解决Redis分布式锁误删问题</router-link></li><li><router-link to="#_4-6、分布式锁的原子性问题">4.6、分布式锁的原子性问题</router-link></li><li><router-link to="#_4-7、lua脚本解决多条命令原子性问题">4.7、Lua脚本解决多条命令原子性问题</router-link></li><li><router-link to="#_4-8、利用java代码调用lua脚本改造分布式锁">4.8、利用Java代码调用Lua脚本改造分布式锁</router-link></li></ul></li><li><router-link to="#_5、分布式锁-redisson">5、分布式锁-Redisson</router-link><ul><li><router-link to="#_5-1、分布式锁-redisson-功能介绍">5.1、分布式锁-Redisson 功能介绍</router-link></li><li><router-link to="#_5-2、分布式锁-redisson-快速入门">5.2、分布式锁-Redisson 快速入门</router-link></li><li><router-link to="#_5-3、分布式锁-redisson-可重入锁原理">5.3、分布式锁-Redisson 可重入锁原理</router-link></li><li><router-link to="#_5-4、分布式锁-redisson-锁重试和-watchdog-机制">5.4、分布式锁-Redisson 锁重试和 WatchDog 机制</router-link></li><li><router-link to="#_5-5、分布式锁-redission锁的mutilock原理">5.5、分布式锁-redission锁的MutiLock原理</router-link></li></ul></li><li><router-link to="#_6、秒杀优化">6、秒杀优化</router-link><ul><li><router-link to="#_6-1、秒杀优化-异步秒杀思路">6.1、秒杀优化-异步秒杀思路</router-link></li><li><router-link to="#_6-2-秒杀优化-redis-完成秒杀资格判断">6.2 秒杀优化-Redis 完成秒杀资格判断</router-link></li><li><router-link to="#_6-3-秒杀优化-基于阻塞队列实现秒杀优化">6.3 秒杀优化-基于阻塞队列实现秒杀优化</router-link></li></ul></li></ul></nav>
<!--more-->
<h2 id="_1、短信登录" tabindex="-1"><a class="header-anchor" href="#_1、短信登录" aria-hidden="true">#</a> 1、短信登录</h2>
<h3 id="_1-1、导入黑马点评项目" tabindex="-1"><a class="header-anchor" href="#_1-1、导入黑马点评项目" aria-hidden="true">#</a> 1.1、导入黑马点评项目</h3>
<h4 id="_1-1-1-、导入sql" tabindex="-1"><a class="header-anchor" href="#_1-1-1-、导入sql" aria-hidden="true">#</a> 1.1.1 、导入SQL</h4>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1653057872536.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_1-1-2、有关当前模型" tabindex="-1"><a class="header-anchor" href="#_1-1-2、有关当前模型" aria-hidden="true">#</a> 1.1.2、有关当前模型</h4>
<p>手机或者app端发起请求，请求我们的nginx服务器，nginx基于七层模型走的事HTTP协议，可以实现基于Lua直接绕开tomcat访问redis，也可以作为静态资源服务器，轻松扛下上万并发， 负载均衡到下游tomcat服务器，打散流量，我们都知道一台4核8G的tomcat，在优化和处理简单业务的加持下，大不了就处理1000左右的并发， 经过nginx的负载均衡分流后，利用集群支撑起整个项目，同时nginx在部署了前端项目后，更是可以做到动静分离，进一步降低tomcat服务的压力，这些功能都得靠nginx起作用，所以nginx是整个项目中重要的一环。</p>
<p>在tomcat支撑起并发流量后，我们如果让tomcat直接去访问Mysql，根据经验Mysql企业级服务器只要上点并发，一般是16或32 核心cpu，32 或64G内存，像企业级mysql加上固态硬盘能够支撑的并发，大概就是4000起~7000左右，上万并发， 瞬间就会让Mysql服务器的cpu，硬盘全部打满，容易崩溃，所以我们在高并发场景下，会选择使用mysql集群，同时为了进一步降低Mysql的压力，同时增加访问的性能，我们也会加入Redis，同时使用Redis集群使得Redis对外提供更好的服务。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1653059409865.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_1-1-3、导入后端项目" tabindex="-1"><a class="header-anchor" href="#_1-1-3、导入后端项目" aria-hidden="true">#</a> 1.1.3、导入后端项目</h4>
<p>在资料中提供了一个项目源码：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1653060237073.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_1-1-4、导入前端工程" tabindex="-1"><a class="header-anchor" href="#_1-1-4、导入前端工程" aria-hidden="true">#</a> 1.1.4、导入前端工程</h4>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1653060337562.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_1-1-5-运行前端项目" tabindex="-1"><a class="header-anchor" href="#_1-1-5-运行前端项目" aria-hidden="true">#</a> 1.1.5 运行前端项目</h4>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1653060588190.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_1-2-、基于session实现登录流程" tabindex="-1"><a class="header-anchor" href="#_1-2-、基于session实现登录流程" aria-hidden="true">#</a> 1.2 、基于Session实现登录流程</h3>
<p><strong>发送验证码：</strong></p>
<p>用户在提交手机号后，会校验手机号是否合法，如果不合法，则要求用户重新输入手机号</p>
<p>如果手机号合法，后台此时生成对应的验证码，同时将验证码进行保存，然后再通过短信的方式将验证码发送给用户</p>
<p><strong>短信验证码登录、注册：</strong></p>
<p>用户将验证码和手机号进行输入，后台从session中拿到当前验证码，然后和用户输入的验证码进行校验，如果不一致，则无法通过校验，如果一致，则后台根据手机号查询用户，如果用户不存在，则为用户创建账号信息，保存到数据库，无论是否存在，都会将用户信息保存到session中，方便后续获得当前登录信息</p>
<p><strong>校验登录状态:</strong></p>
<p>用户在请求时候，会从cookie中携带者JsessionId到后台，后台通过JsessionId从session中拿到用户信息，如果没有session信息，则进行拦截，如果有session信息，则将用户信息保存到threadLocal中，并且放行</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1653066208144.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_1-3-、实现发送短信验证码功能" tabindex="-1"><a class="header-anchor" href="#_1-3-、实现发送短信验证码功能" aria-hidden="true">#</a> 1.3 、实现发送短信验证码功能</h3>
<p><strong>页面流程</strong></p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1653067054461.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>具体代码如下</strong></p>
<p><strong>贴心小提示：</strong></p>
<p>具体逻辑上文已经分析，我们仅仅只需要按照提示的逻辑写出代码即可。</p>
<ul>
<li>发送验证码</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">sendCode</span><span class="token punctuation">(</span><span class="token class-name">String</span> phone<span class="token punctuation">,</span> <span class="token class-name">HttpSession</span> session<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1.校验手机号</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">RegexUtils</span><span class="token punctuation">.</span><span class="token function">isPhoneInvalid</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 2.如果不符合，返回错误信息</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"手机号格式错误！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 3.符合，生成验证码</span>
    <span class="token class-name">String</span> code <span class="token operator">=</span> <span class="token class-name">RandomUtil</span><span class="token punctuation">.</span><span class="token function">randomNumbers</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 4.保存验证码到 session</span>
    session<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"code"</span><span class="token punctuation">,</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 5.发送验证码</span>
    log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"发送短信验证码成功，验证码：{}"</span><span class="token punctuation">,</span> code<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 返回ok</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>登录</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token class-name">LoginFormDTO</span> loginForm<span class="token punctuation">,</span> <span class="token class-name">HttpSession</span> session<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1.校验手机号</span>
    <span class="token class-name">String</span> phone <span class="token operator">=</span> loginForm<span class="token punctuation">.</span><span class="token function">getPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">RegexUtils</span><span class="token punctuation">.</span><span class="token function">isPhoneInvalid</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 2.如果不符合，返回错误信息</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"手机号格式错误！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 3.校验验证码</span>
    <span class="token class-name">Object</span> cacheCode <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">"code"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> code <span class="token operator">=</span> loginForm<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>cacheCode <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token operator">!</span>cacheCode<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//3.不一致，报错</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"验证码错误"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//一致，根据手机号查询用户</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"phone"</span><span class="token punctuation">,</span> phone<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">one</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//5.判断用户是否存在</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>user <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//不存在，则创建</span>
        user <span class="token operator">=</span>  <span class="token function">createUserWithPhone</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//7.保存用户信息到session中</span>
    session<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">,</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-4、实现登录拦截功能" tabindex="-1"><a class="header-anchor" href="#_1-4、实现登录拦截功能" aria-hidden="true">#</a> 1.4、实现登录拦截功能</h3>
<p><strong>温馨小贴士：tomcat的运行原理</strong></p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/1653068196656.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>当用户发起请求时，会访问我们像tomcat注册的端口，任何程序想要运行，都需要有一个线程对当前端口号进行监听，tomcat也不例外，当监听线程知道用户想要和tomcat连接连接时，那会由监听线程创建socket连接，socket都是成对出现的，用户通过socket像互相传递数据，当tomcat端的socket接受到数据后，此时监听线程会从tomcat的线程池中取出一个线程执行用户请求，在我们的服务部署到tomcat后，线程会找到用户想要访问的工程，然后用这个线程转发到工程中的controller，service，dao中，并且访问对应的DB，在用户执行完请求后，再统一返回，再找到tomcat端的socket，再将数据写回到用户端的socket，完成请求和响应</p>
<p>通过以上讲解，我们可以得知 每个用户其实对应都是去找tomcat线程池中的一个线程来完成工作的， 使用完成后再进行回收，既然每个请求都是独立的，所以在每个用户去访问我们的工程时，我们可以使用threadlocal来做到线程隔离，每个线程操作自己的一份数据</p>
<p><strong>温馨小贴士：关于threadlocal</strong></p>
<p>如果小伙伴们看过threadLocal的源码，你会发现在threadLocal中，无论是他的put方法和他的get方法， 都是先从获得当前用户的线程，然后从线程中取出线程的成员变量map，只要线程不一样，map就不一样，所以可以通过这种方式来做到线程隔离</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211405117.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>拦截器代码</p>
<div class="language-Java line-numbers-mode" data-ext="Java"><pre v-pre class="language-Java"><code>public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
       //1.获取session
        HttpSession session = request.getSession();
        //2.获取session中的用户
        Object user = session.getAttribute(&quot;user&quot;);
        //3.判断用户是否存在
        if(user == null){
              //4.不存在，拦截，返回401状态码
              response.setStatus(401);
              return false;
        }
        //5.存在，保存用户信息到Threadlocal
        UserHolder.saveUser((User)user);
        //6.放行
        return true;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让拦截器生效</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MvcConfig</span> <span class="token keyword">implements</span> <span class="token class-name">WebMvcConfigurer</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Resource</span>
    <span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addInterceptors</span><span class="token punctuation">(</span><span class="token class-name">InterceptorRegistry</span> registry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 登录拦截器</span>
        registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LoginInterceptor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">excludePathPatterns</span><span class="token punctuation">(</span>
                        <span class="token string">"/shop/**"</span><span class="token punctuation">,</span>
                        <span class="token string">"/voucher/**"</span><span class="token punctuation">,</span>
                        <span class="token string">"/shop-type/**"</span><span class="token punctuation">,</span>
                        <span class="token string">"/upload/**"</span><span class="token punctuation">,</span>
                        <span class="token string">"/blog/hot"</span><span class="token punctuation">,</span>
                        <span class="token string">"/user/code"</span><span class="token punctuation">,</span>
                        <span class="token string">"/user/login"</span>
                <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">order</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// token刷新的拦截器</span>
        registry<span class="token punctuation">.</span><span class="token function">addInterceptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">RefreshTokenInterceptor</span><span class="token punctuation">(</span>stringRedisTemplate<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addPathPatterns</span><span class="token punctuation">(</span><span class="token string">"/**"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">order</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5、隐藏用户敏感信息" tabindex="-1"><a class="header-anchor" href="#_1-5、隐藏用户敏感信息" aria-hidden="true">#</a> 1.5、隐藏用户敏感信息</h3>
<p>我们通过浏览器观察到此时用户的全部信息都在，这样极为不靠谱，所以我们应当在返回用户信息之前，将用户的敏感信息进行隐藏，采用的核心思路就是书写一个UserDto对象，这个UserDto对象就没有敏感信息了，我们在返回前，将有用户敏感信息的User对象转化成没有敏感信息的UserDto对象，那么就能够避免这个尴尬的问题了</p>
<p><strong>在登录方法处修改</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//7.保存用户信息到session中</span>
session<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">,</span> <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span><span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在拦截器处：</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//5.存在，保存用户信息到Threadlocal</span>
<span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">saveUser</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span><span class="token punctuation">)</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在UserHolder处：将user对象换成UserDTO</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserHolder</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">UserDTO</span><span class="token punctuation">></span></span> tl <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThreadLocal</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">saveUser</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span> user<span class="token punctuation">)</span><span class="token punctuation">{</span>
        tl<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">UserDTO</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> tl<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">removeUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        tl<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-6、session共享问题" tabindex="-1"><a class="header-anchor" href="#_1-6、session共享问题" aria-hidden="true">#</a> 1.6、session共享问题</h3>
<p><strong>核心思路分析：</strong></p>
<p>每个tomcat中都有一份属于自己的session,假设用户第一次访问第一台tomcat，并且把自己的信息存放到第一台服务器的session中，但是第二次这个用户访问到了第二台tomcat，那么在第二台服务器上，肯定没有第一台服务器存放的session，所以此时 整个登录拦截功能就会出现问题，我们能如何解决这个问题呢？早期的方案是session拷贝，就是说虽然每个tomcat上都有不同的session，但是每当任意一台服务器的session修改时，都会同步给其他的Tomcat服务器的session，这样的话，就可以实现session的共享了</p>
<p>但是这种方案具有两个大问题</p>
<p>1、每台服务器中都有完整的一份session数据，服务器压力过大。</p>
<p>2、session拷贝数据时，可能会出现延迟</p>
<p>所以咱们后来采用的方案都是基于redis来完成，我们把session换成redis，redis数据本身就是共享的，就可以避免session共享的问题了</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211405378.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_1-7、redis代替session的业务流程" tabindex="-1"><a class="header-anchor" href="#_1-7、redis代替session的业务流程" aria-hidden="true">#</a> 1.7、Redis代替session的业务流程</h3>
<h4 id="_1-7-1、设计key的结构" tabindex="-1"><a class="header-anchor" href="#_1-7-1、设计key的结构" aria-hidden="true">#</a> 1.7.1、设计key的结构</h4>
<p>首先我们要思考一下利用redis来存储数据，那么到底使用哪种结构呢？由于存入的数据比较简单，我们可以考虑使用String，或者是使用哈希，如下图，如果使用String，同学们注意他的value，用多占用一点空间，如果使用哈希，则他的value中只会存储他数据本身，如果不是特别在意内存，其实使用String就可以啦。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211405795.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_1-7-2、设计key的具体细节" tabindex="-1"><a class="header-anchor" href="#_1-7-2、设计key的具体细节" aria-hidden="true">#</a> 1.7.2、设计key的具体细节</h4>
<p>所以我们可以使用String结构，就是一个简单的key，value键值对的方式，但是关于key的处理，session他是每个用户都有自己的session，但是redis的key是共享的，咱们就不能使用code了</p>
<p>在设计这个key的时候，我们之前讲过需要满足两点</p>
<p>1、key要具有唯一性</p>
<p>2、key要方便携带</p>
<p>如果我们采用phone：手机号这个的数据来存储当然是可以的，但是如果把这样的敏感数据存储到redis中并且从页面中带过来毕竟不太合适，所以我们在后台生成一个随机串token，然后让前端带来这个token就能完成我们的整体逻辑了</p>
<h4 id="_1-7-3、整体访问流程" tabindex="-1"><a class="header-anchor" href="#_1-7-3、整体访问流程" aria-hidden="true">#</a> 1.7.3、整体访问流程</h4>
<p>当注册完成后，用户去登录会去校验用户提交的手机号和验证码，是否一致，如果一致，则根据手机号查询用户信息，不存在则新建，最后将用户数据保存到redis，并且生成token作为redis的key，当我们校验用户是否登录时，会去携带着token进行访问，从redis中取出token对应的value，判断是否存在这个数据，如果没有则拦截，如果存在则将其保存到threadLocal中，并且放行。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211405583.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_1-8、基于redis实现短信登录" tabindex="-1"><a class="header-anchor" href="#_1-8、基于redis实现短信登录" aria-hidden="true">#</a> 1.8、基于Redis实现短信登录</h3>
<p>这里具体逻辑就不分析了，之前咱们已经重点分析过这个逻辑啦。</p>
<p><strong>UserServiceImpl代码</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token class-name">LoginFormDTO</span> loginForm<span class="token punctuation">,</span> <span class="token class-name">HttpSession</span> session<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1.校验手机号</span>
    <span class="token class-name">String</span> phone <span class="token operator">=</span> loginForm<span class="token punctuation">.</span><span class="token function">getPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">RegexUtils</span><span class="token punctuation">.</span><span class="token function">isPhoneInvalid</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 2.如果不符合，返回错误信息</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"手机号格式错误！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 3.从redis获取验证码并校验</span>
    <span class="token class-name">String</span> cacheCode <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">LOGIN_CODE_KEY</span> <span class="token operator">+</span> phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> code <span class="token operator">=</span> loginForm<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cacheCode <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token operator">!</span>cacheCode<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 不一致，报错</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"验证码错误"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 4.一致，根据手机号查询用户 select * from tb_user where phone = ?</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"phone"</span><span class="token punctuation">,</span> phone<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">one</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 5.判断用户是否存在</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>user <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 6.不存在，创建新用户并保存</span>
        user <span class="token operator">=</span> <span class="token function">createUserWithPhone</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 7.保存用户信息到 redis中</span>
    <span class="token comment">// 7.1.随机生成token，作为登录令牌</span>
    <span class="token class-name">String</span> token <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 7.2.将User对象转为HashMap存储</span>
    <span class="token class-name">UserDTO</span> userDTO <span class="token operator">=</span> <span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> userMap <span class="token operator">=</span> <span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">beanToMap</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token class-name">CopyOptions</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">setIgnoreNullValue</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">setFieldValueEditor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>fieldName<span class="token punctuation">,</span> fieldValue<span class="token punctuation">)</span> <span class="token operator">-></span> fieldValue<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 7.3.存储</span>
    <span class="token class-name">String</span> tokenKey <span class="token operator">=</span> <span class="token constant">LOGIN_USER_KEY</span> <span class="token operator">+</span> token<span class="token punctuation">;</span>
    stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putAll</span><span class="token punctuation">(</span>tokenKey<span class="token punctuation">,</span> userMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 7.4.设置token有效期</span>
    stringRedisTemplate<span class="token punctuation">.</span><span class="token function">expire</span><span class="token punctuation">(</span>tokenKey<span class="token punctuation">,</span> <span class="token constant">LOGIN_USER_TTL</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 8.返回token</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-9、解决状态登录刷新问题" tabindex="-1"><a class="header-anchor" href="#_1-9、解决状态登录刷新问题" aria-hidden="true">#</a> 1.9、解决状态登录刷新问题</h3>
<h4 id="_1-9-1、初始方案思路总结" tabindex="-1"><a class="header-anchor" href="#_1-9-1、初始方案思路总结" aria-hidden="true">#</a> 1.9.1、初始方案思路总结：</h4>
<p>在这个方案中，他确实可以使用对应路径的拦截，同时刷新登录token令牌的存活时间，但是现在这个拦截器他只是拦截需要被拦截的路径，假设当前用户访问了一些不需要拦截的路径，那么这个拦截器就不会生效，所以此时令牌刷新的动作实际上就不会执行，所以这个方案他是存在问题的</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211406471.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_1-9-2、优化方案" tabindex="-1"><a class="header-anchor" href="#_1-9-2、优化方案" aria-hidden="true">#</a> 1.9.2、优化方案</h4>
<p>既然之前的拦截器无法对不需要拦截的路径生效，那么我们可以添加一个拦截器，在第一个拦截器中拦截所有的路径，把第二个拦截器做的事情放入到第一个拦截器中，同时刷新令牌，因为第一个拦截器有了threadLocal的数据，所以此时第二个拦截器只需要判断拦截器中的user对象是否存在即可，完成整体刷新功能。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211406354.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_1-9-3、代码" tabindex="-1"><a class="header-anchor" href="#_1-9-3、代码" aria-hidden="true">#</a> 1.9.3、代码</h4>
<p><strong>RefreshTokenInterceptor</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RefreshTokenInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">HandlerInterceptor</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">RefreshTokenInterceptor</span><span class="token punctuation">(</span><span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>stringRedisTemplate <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">preHandle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1.获取请求头中的token</span>
        <span class="token class-name">String</span> token <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getHeader</span><span class="token punctuation">(</span><span class="token string">"authorization"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 2.基于TOKEN获取redis中的用户</span>
        <span class="token class-name">String</span> key  <span class="token operator">=</span> <span class="token constant">LOGIN_USER_KEY</span> <span class="token operator">+</span> token<span class="token punctuation">;</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> userMap <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 3.判断用户是否存在</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>userMap<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 5.将查询到的hash数据转为UserDTO</span>
        <span class="token class-name">UserDTO</span> userDTO <span class="token operator">=</span> <span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">fillBeanWithMap</span><span class="token punctuation">(</span>userMap<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">UserDTO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 6.存在，保存用户信息到 ThreadLocal</span>
        <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">saveUser</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 7.刷新token有效期</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">expire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token constant">LOGIN_USER_TTL</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 8.放行</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">afterCompletion</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">,</span> <span class="token class-name">Exception</span> ex<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 移除用户</span>
        <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">removeUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>LoginInterceptor</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoginInterceptor</span> <span class="token keyword">implements</span> <span class="token class-name">HandlerInterceptor</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">preHandle</span><span class="token punctuation">(</span><span class="token class-name">HttpServletRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">,</span> <span class="token class-name">Object</span> handler<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1.判断是否需要拦截（ThreadLocal中是否有用户）</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 没有，需要拦截，设置状态码</span>
            response<span class="token punctuation">.</span><span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token number">401</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 拦截</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 有用户，则放行</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2、商户查询缓存" tabindex="-1"><a class="header-anchor" href="#_2、商户查询缓存" aria-hidden="true">#</a> 2、商户查询缓存</h2>
<h3 id="_2-1、什么是缓存" tabindex="-1"><a class="header-anchor" href="#_2-1、什么是缓存" aria-hidden="true">#</a> 2.1、什么是缓存?</h3>
<p><strong>前言</strong>:<strong>什么是缓存?</strong></p>
<p>就像自行车,越野车的避震器<img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211406395.gif" alt="" loading="lazy"></p>
<p>举个例子:越野车,山地自行车,都拥有&quot;避震器&quot;,<strong>防止</strong>车体加速后因惯性,在酷似&quot;U&quot;字母的地形上飞跃,硬着陆导致的<strong>损害</strong>,像个弹簧一样;</p>
<p>同样,实际开发中,系统也需要&quot;避震器&quot;,防止过高的数据访问猛冲系统,导致其操作线程无法及时处理信息而瘫痪;</p>
<p>这在实际开发中对企业讲,对产品口碑,用户评价都是致命的;所以企业非常重视缓存技术;</p>
<p><strong>缓存(<strong>Cache),就是数据交换的</strong>缓冲区</strong>,俗称的缓存就是<strong>缓冲区内的数据</strong>,一般从数据库中获取,存储于本地代码(例如:</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>例<span class="token number">1</span><span class="token operator">:</span><span class="token class-name">Static</span> <span class="token keyword">final</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 本地用于高并发

例<span class="token number">2</span><span class="token operator">:</span><span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Cache</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token constant">USER_CACHE</span> <span class="token operator">=</span> <span class="token class-name">CacheBuilder</span><span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 用于redis等缓存

例<span class="token number">3</span><span class="token operator">:</span><span class="token class-name">Static</span> <span class="token keyword">final</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span><span class="token class-name">V</span><span class="token punctuation">></span></span> map <span class="token operator">=</span>  <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 本地缓存
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于其被<strong>Static</strong>修饰,所以随着类的加载而被加载到<strong>内存之中</strong>,作为本地缓存,由于其又被<strong>final</strong>修饰,所以其引用(例3:map)和对象(例3:new HashMap())之间的关系是固定的,不能改变,因此不用担心赋值(=)导致缓存失效;</p>
<h4 id="_2-1-1、为什么要使用缓存" tabindex="-1"><a class="header-anchor" href="#_2-1-1、为什么要使用缓存" aria-hidden="true">#</a> 2.1.1、为什么要使用缓存</h4>
<p>一句话:因为<strong>速度快,好用</strong></p>
<p>缓存数据存储于代码中,而代码运行在内存中,内存的读写性能远高于磁盘,缓存可以大大降低<strong>用户访问并发量带来的</strong>服务器读写压力</p>
<p>实际开发过程中,企业的数据量,少则几十万,多则几千万,这么大数据量,如果没有缓存来作为&quot;避震器&quot;,系统是几乎撑不住的,所以企业会大量运用到缓存技术;</p>
<p>但是缓存也会增加代码复杂度和运营的成本:</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211406405.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_2-1-2、如何使用缓存" tabindex="-1"><a class="header-anchor" href="#_2-1-2、如何使用缓存" aria-hidden="true">#</a> 2.1.2、如何使用缓存</h4>
<p>实际开发中,会构筑多级缓存来使系统运行速度进一步提升,例如:本地缓存与redis中的缓存并发使用</p>
<p><strong>浏览器缓存</strong>：主要是存在于浏览器端的缓存</p>
<p>**应用层缓存：**可以分为tomcat本地缓存，比如之前提到的map，或者是使用redis作为缓存</p>
<p>**数据库缓存：**在数据库中有一片空间是 buffer pool，增改查数据都会先加载到mysql的缓存中</p>
<p>**CPU缓存：**当代计算机最大的问题是 cpu性能提升了，但内存读写速度没有跟上，所以为了适应当下的情况，增加了cpu的L1，L2，L3级的缓存</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211406143.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-2、添加商户缓存" tabindex="-1"><a class="header-anchor" href="#_2-2、添加商户缓存" aria-hidden="true">#</a> 2.2、添加商户缓存</h3>
<p>在我们查询商户信息时，我们是直接操作从数据库中去进行查询的，大致逻辑是这样，直接查询数据库那肯定慢咯，所以我们需要增加缓存</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/{id}"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">queryShopById</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//这里是直接查询数据库</span>
    <span class="token keyword">return</span> shopService<span class="token punctuation">.</span><span class="token function">queryById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-1、缓存模型和思路" tabindex="-1"><a class="header-anchor" href="#_2-2-1、缓存模型和思路" aria-hidden="true">#</a> 2.2.1、缓存模型和思路</h4>
<p>标准的操作方式就是查询数据库之前先查询缓存，如果缓存数据存在，则直接从缓存中返回，如果缓存数据不存在，再查询数据库，然后将数据存入redis。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211406038.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_2-1-2、代码如下" tabindex="-1"><a class="header-anchor" href="#_2-1-2、代码如下" aria-hidden="true">#</a> 2.1.2、代码如下</h4>
<p>代码思路：如果缓存有，则直接返回，如果缓存不存在，则查询数据库，然后存入redis。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211406722.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-3、缓存更新策略" tabindex="-1"><a class="header-anchor" href="#_2-3、缓存更新策略" aria-hidden="true">#</a> 2.3、缓存更新策略</h3>
<p>缓存更新是redis为了节约内存而设计出来的一个东西，主要是因为内存数据宝贵，当我们向redis插入太多数据，此时就可能会导致缓存中的数据过多，所以redis会对部分数据进行更新，或者把他叫为淘汰更合适。</p>
<p>**内存淘汰：**redis自动进行，当redis内存达到咱们设定的max-memery的时候，会自动触发淘汰机制，淘汰掉一些不重要的数据(可以自己设置策略方式)</p>
<p>**超时剔除：**当我们给redis设置了过期时间ttl之后，redis会将超时的数据进行删除，方便咱们继续使用缓存</p>
<p>**主动更新：**我们可以手动调用方法把缓存删掉，通常用于解决缓存和数据库不一致问题</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211406488.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_2-3-1、数据库缓存不一致解决方案" tabindex="-1"><a class="header-anchor" href="#_2-3-1、数据库缓存不一致解决方案" aria-hidden="true">#</a> 2.3.1、数据库缓存不一致解决方案：</h4>
<p>由于我们的<strong>缓存的数据源来自于数据库</strong>,而数据库的<strong>数据是会发生变化的</strong>,因此,如果当数据库中<strong>数据发生变化,而缓存却没有同步</strong>,此时就会有<strong>一致性问题存在</strong>,其后果是:</p>
<p>用户使用缓存中的过时数据,就会产生类似多线程数据安全问题,从而影响业务,产品口碑等;怎么解决呢？有如下几种方案</p>
<p>Cache Aside Pattern 人工编码方式：缓存调用者在更新完数据库后再去更新缓存，也称之为双写方案</p>
<p>Read/Write Through Pattern : 由系统本身完成，数据库与缓存的问题交由系统本身去处理</p>
<p>Write Behind Caching Pattern ：调用者只操作缓存，其他线程去异步处理数据库，实现最终一致</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211406065.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h4 id="_2-3-2、数据库和缓存不一致采用什么方案" tabindex="-1"><a class="header-anchor" href="#_2-3-2、数据库和缓存不一致采用什么方案" aria-hidden="true">#</a> 2.3.2、数据库和缓存不一致采用什么方案</h4>
<p>综合考虑使用方案一，但是方案一调用者如何处理呢？这里有几个问题</p>
<p>操作缓存和数据库时有三个问题需要考虑：</p>
<p>如果采用第一个方案，那么假设我们每次操作数据库后，都操作缓存，但是中间如果没有人查询，那么这个更新动作实际上只有最后一次生效，中间的更新动作意义并不大，我们可以把缓存删除，等待再次查询时，将缓存中的数据加载出来</p>
<ul>
<li>
<p>删除缓存还是更新缓存？</p>
<ul>
<li>更新缓存：每次更新数据库都更新缓存，无效写操作较多</li>
<li>删除缓存：更新数据库时让缓存失效，查询时再更新缓存</li>
</ul>
</li>
<li>
<p>如何保证缓存与数据库的操作的同时成功或失败？</p>
<ul>
<li>单体系统，将缓存与数据库操作放在一个事务</li>
<li>分布式系统，利用TCC等分布式事务方案</li>
</ul>
</li>
</ul>
<p>应该具体操作缓存还是操作数据库，我们应当是先操作数据库，再删除缓存，原因在于，如果你选择第一种方案，在两个线程并发来访问时，假设线程1先来，他先把缓存删了，此时线程2过来，他查询缓存数据并不存在，此时他写入缓存，当他写入缓存后，线程1再执行更新动作时，实际上写入的就是旧的数据，新的数据被旧数据覆盖了。</p>
<ul>
<li>先操作缓存还是先操作数据库？
<ul>
<li>先删除缓存，再操作数据库</li>
<li>先操作数据库，再删除缓存</li>
</ul>
</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211407583.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-4、实现商铺和缓存与数据库双写一致" tabindex="-1"><a class="header-anchor" href="#_2-4、实现商铺和缓存与数据库双写一致" aria-hidden="true">#</a> 2.4、实现商铺和缓存与数据库双写一致</h3>
<p>核心思路如下：</p>
<p>修改ShopController中的业务逻辑，满足下面的需求：</p>
<p>根据id查询店铺时，如果缓存未命中，则查询数据库，将数据库结果写入缓存，并设置超时时间</p>
<p>根据id修改店铺时，先修改数据库，再删除缓存</p>
<p><strong>修改重点代码1</strong>：修改<strong>ShopServiceImpl</strong>的queryById方法</p>
<p><strong>设置redis缓存时添加过期时间</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">getByIdWithRedis</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1、从redis查询商铺缓存</span>
    <span class="token class-name">String</span> shopJson <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 2、判断是否存在</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span>shopMap<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 3、不为null且存在，直接返回</span>
        <span class="token class-name">Shop</span> shop <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span>shopJson<span class="token punctuation">,</span> <span class="token class-name">Shop</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 4、不存在，根据id查询数据库</span>
    <span class="token class-name">Shop</span> shop <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">ObjectUtil</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 4.1、数据库不存在返回错误</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"店铺不存在！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 4.2、数据库存在，写入redis</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">,</span> <span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">beanToMap</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_TTL</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 5、返回</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修改重点代码2</strong></p>
<p>代码分析：通过之前的淘汰，我们确定了采用删除策略，来解决双写问题，当我们修改了数据之后，然后把缓存中的数据进行删除，查询时发现缓存中没有数据，则会从mysql中加载最新的数据，从而避免数据库和缓存不一致的问题</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">Shop</span> shop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Long</span> id <span class="token operator">=</span> shop<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"店铺id不能为空！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 1、更新数据库</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">updateById</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 2、删除缓存</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5、缓存穿透问题的解决思路" tabindex="-1"><a class="header-anchor" href="#_2-5、缓存穿透问题的解决思路" aria-hidden="true">#</a> 2.5、缓存穿透问题的解决思路</h3>
<p>缓存穿透 ：缓存穿透是指客户端请求的数据在缓存中和数据库中都不存在，这样缓存永远不会生效，这些请求都会打到数据库。</p>
<p>常见的解决方案有两种：</p>
<ul>
<li>缓存空对象
<ul>
<li>优点：实现简单，维护方便</li>
<li>缺点：
<ul>
<li>额外的内存消耗</li>
<li>可能造成短期的不一致</li>
</ul>
</li>
</ul>
</li>
<li>布隆过滤
<ul>
<li>优点：内存占用较少，没有多余key</li>
<li>缺点：
<ul>
<li>实现复杂</li>
<li>存在误判可能</li>
</ul>
</li>
</ul>
</li>
</ul>
<p><strong>缓存空对象思路分析：</strong> 当我们客户端访问不存在的数据时，先请求redis，但是此时redis中没有数据，此时会访问到数据库，但是数据库中也没有数据，这个数据穿透了缓存，直击数据库，我们都知道数据库能够承载的并发不如redis这么高，如果大量的请求同时过来访问这种不存在的数据，这些请求就都会访问到数据库，简单的解决方案就是哪怕这个数据在数据库中也不存在，我们也把这个数据存入到redis中去，这样，下次用户过来访问这个不存在的数据，那么在redis中也能找到这个数据就不会进入到缓存了</p>
<p><strong>布隆过滤：</strong> 布隆过滤器其实采用的是哈希思想来解决这个问题，通过一个庞大的二进制数组，走哈希思想去判断当前这个要查询的这个数据是否存在，如果布隆过滤器判断存在，则放行，这个请求会去访问redis，哪怕此时redis中的数据过期了，但是数据库中一定存在这个数据，在数据库中查询出来这个数据后，再将其放入到redis中，</p>
<p>假设布隆过滤器判断这个数据不存在，则直接返回</p>
<p>这种方式优点在于节约内存空间，存在误判，误判原因在于：布隆过滤器走的是哈希思想，只要哈希思想，就可能存在哈希冲突</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211407182.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-6、编码解决商品查询的缓存穿透问题" tabindex="-1"><a class="header-anchor" href="#_2-6、编码解决商品查询的缓存穿透问题" aria-hidden="true">#</a> 2.6、编码解决商品查询的缓存穿透问题：</h3>
<p>核心思路如下：</p>
<p>在原来的逻辑中，我们如果发现这个数据在mysql中不存在，直接就返回404了，这样是会存在缓存穿透问题的</p>
<p>现在的逻辑中：如果这个数据不存在，我们不会返回404 ，还是会把这个数据写入到Redis中，并且将value设置为空，欧当再次发起查询时，我们如果发现命中之后，判断这个value是否是null，如果是null，则是之前写入的数据，证明是缓存穿透数据，如果不是，则直接返回数据。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211407363.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Shop</span> <span class="token function">queryWithPassThrough</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1、从redis查询商铺缓存</span>
    <span class="token class-name">String</span> shopJson <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Shop</span> shop <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 2、判断缓存中是否存在</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span>shopJson<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 3、不为null且存在，直接返回</span>
        shop <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span>shopJson<span class="token punctuation">,</span> <span class="token class-name">Shop</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> shop<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 判断是否是key为""的缓存（缓存穿透）</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>shopJson <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 4、不存在，根据id查询数据库</span>
    shop <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">ObjectUtil</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 将空值写入redis（解决缓存穿透问题）</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_NULL_TTL</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 4.1、数据库不存在返回错误</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 4.2、数据库存在，写入redis</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">,</span>                         <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toJsonStr</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_TTL</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> shop<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小总结：</strong></p>
<p>缓存穿透产生的原因是什么？</p>
<ul>
<li>用户请求的数据在缓存中和数据库中都不存在，不断发起这样的请求，给数据库带来巨大压力</li>
</ul>
<p>缓存穿透的解决方案有哪些？</p>
<ul>
<li>缓存null值</li>
<li>布隆过滤</li>
<li>增强id的复杂度，避免被猜测id规律</li>
<li>做好数据的基础格式校验</li>
<li>加强用户权限校验</li>
<li>做好热点参数的限流</li>
</ul>
<h3 id="_2-7、缓存雪崩问题及解决思路" tabindex="-1"><a class="header-anchor" href="#_2-7、缓存雪崩问题及解决思路" aria-hidden="true">#</a> 2.7、缓存雪崩问题及解决思路</h3>
<p>缓存雪崩是指在同一时段大量的缓存key同时失效或者Redis服务宕机，导致大量请求到达数据库，带来巨大压力。</p>
<p>解决方案：</p>
<ul>
<li>给不同的Key的TTL添加随机值</li>
<li>利用Redis集群提高服务的可用性</li>
<li>给缓存业务添加降级限流策略</li>
<li>给业务添加多级缓存</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211407793.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-8、缓存击穿问题及解决思路" tabindex="-1"><a class="header-anchor" href="#_2-8、缓存击穿问题及解决思路" aria-hidden="true">#</a> 2.8、缓存击穿问题及解决思路</h3>
<p>缓存击穿问题也叫热点Key问题，就是一个被高并发访问并且缓存重建业务较复杂的key突然失效了，无数的请求访问会在瞬间给数据库带来巨大的冲击。</p>
<p>常见的解决方案有两种：</p>
<ul>
<li>互斥锁</li>
<li>逻辑过期</li>
</ul>
<p>逻辑分析：假设线程1在查询缓存之后，本来应该去查询数据库，然后把这个数据重新加载到缓存的，此时只要线程1走完这个逻辑，其他线程就都能从缓存中加载这些数据了，但是假设在线程1没有走完的时候，后续的线程2，线程3，线程4同时过来访问当前这个方法， 那么这些线程都不能从缓存中查询到数据，那么他们就会同一时刻来访问查询缓存，都没查到，接着同一时间去访问数据库，同时的去执行数据库代码，对数据库访问压力过大</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211407811.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>解决方案一、使用锁来解决：</p>
<p>因为锁能实现互斥性。假设线程过来，只能一个人一个人的来访问数据库，从而避免对于数据库访问压力过大，但这也会影响查询的性能，因为此时会让查询的性能从并行变成了串行，我们可以采用tryLock方法 + double check来解决这样的问题。</p>
<p>假设现在线程1过来访问，他查询缓存没有命中，但是此时他获得到了锁的资源，那么线程1就会一个人去执行逻辑，假设现在线程2过来，线程2在执行过程中，并没有获得到锁，那么线程2就可以进行到休眠，直到线程1把锁释放后，线程2获得到锁，然后再来执行逻辑，此时就能够从缓存中拿到数据了。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211407143.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>解决方案二、逻辑过期方案</p>
<p>方案分析：我们之所以会出现这个缓存击穿问题，主要原因是在于我们对key设置了过期时间，假设我们不设置过期时间，其实就不会有缓存击穿的问题，但是不设置过期时间，这样数据不就一直占用我们内存了吗，我们可以采用逻辑过期方案。</p>
<p>我们把过期时间设置在 redis的value中，注意：这个过期时间并不会直接作用于redis，而是我们后续通过逻辑去处理。假设线程1去查询缓存，然后从value中判断出来当前的数据已经过期了，此时线程1去获得互斥锁，那么其他线程会进行阻塞，获得了锁的线程他会开启一个 线程去进行 以前的重构数据的逻辑，直到新开的线程完成这个逻辑后，才释放锁， 而线程1直接进行返回，假设现在线程3过来访问，由于线程线程2持有着锁，所以线程3无法获得锁，线程3也直接返回数据，只有等到新开的线程2把重建数据构建完后，其他线程才能走返回正确的数据。</p>
<p>这种方案巧妙在于，异步的构建缓存，缺点在于在构建完缓存之前，返回的都是脏数据。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211407218.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>进行对比</p>
<p><strong>互斥锁方案：</strong> 由于保证了互斥性，所以数据一致，且实现简单，因为仅仅只需要加一把锁而已，也没其他的事情需要操心，所以没有额外的内存消耗，缺点在于有锁就有死锁问题的发生，且只能串行执行性能肯定受到影响</p>
<p><strong>逻辑过期方案：</strong> 线程读取过程中不需要等待，性能好，有一个额外的线程持有锁去进行重构数据，但是在重构数据完成前，其他的线程只能返回之前的数据，且实现起来麻烦</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211407369.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_2-9、利用互斥锁解决缓存击穿问题" tabindex="-1"><a class="header-anchor" href="#_2-9、利用互斥锁解决缓存击穿问题" aria-hidden="true">#</a> 2.9、利用互斥锁解决缓存击穿问题</h3>
<p>核心思路：相较于原来从缓存中查询不到数据后直接查询数据库而言，现在的方案是 进行查询之后，如果从缓存没有查询到数据，则进行互斥锁的获取，获取互斥锁后，判断是否获得到了锁，如果没有获得到，则休眠，过一会再进行尝试，直到获取到锁为止，才能进行查询</p>
<p>如果获取到了锁的线程，再去进行查询，查询后将数据写入redis，再释放锁，返回数据，利用互斥锁就能保证只有一个线程去执行操作数据库的逻辑，防止缓存击穿</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211407709.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>操作锁的代码：</strong></p>
<p>核心思路就是利用redis的setnx方法来表示获取锁，该方法含义是redis中如果没有这个key，则插入成功，返回1，在stringRedisTemplate中返回true，  如果有这个key则插入失败，则返回0，在stringRedisTemplate返回false，我们可以通过true，或者是false，来表示是否有线程成功插入key，成功插入的key的线程我们认为他就是获得到锁的线程。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Boolean</span> flag <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setIfAbsent</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 防止装包以及拆包引发bug</span>
    <span class="token keyword">return</span> <span class="token class-name">BooleanUtil</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span>flag<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>操作代码：</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">Shop</span> <span class="token function">queryWithMutex</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1、从redis查询商铺缓存</span>
    <span class="token class-name">String</span> shopJson <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Shop</span> shop <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 2、判断缓存中是否存在</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span>shopJson<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 3、不为null且存在，直接返回</span>
        shop <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span>shopJson<span class="token punctuation">,</span> <span class="token class-name">Shop</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> shop<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 判断是否是""的缓存（缓存穿透）</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>shopJson <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 4、互斥锁实现缓存重建</span>
        <span class="token comment">// 4.1、获取互斥锁</span>
        <span class="token keyword">boolean</span> hasLock <span class="token operator">=</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">LOCK_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">,</span> <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">LOCK_SHOP_TTL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 4.2、判断是否获取成功</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>hasLock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 4.3、如果失败，则失眠并重试</span>
            <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token function">queryWithMutex</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 4.4、成功，根据id查询数据库</span>
        shop <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 模拟缓存重建延迟</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">ObjectUtil</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 将空值写入redis（解决缓存穿透问题）</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span>
                                            <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_NULL_TTL</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 数据库不存在返回错误</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">,</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toJsonStr</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_TTL</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 数据库存在，写入redis</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        <span class="token comment">// 释放互斥锁</span>
        <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">LOCK_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> shop<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-10、利用逻辑过期解决缓存击穿问题" tabindex="-1"><a class="header-anchor" href="#_2-10、利用逻辑过期解决缓存击穿问题" aria-hidden="true">#</a> 2.10、利用逻辑过期解决缓存击穿问题</h3>
<p><strong>需求：修改根据id查询商铺的业务，基于逻辑过期方式来解决缓存击穿问题</strong></p>
<p>思路分析：当用户开始查询redis时，判断是否命中，如果没有命中则直接返回空数据，不查询数据库，而一旦命中后，将value取出，判断value中的过期时间是否满足，如果没有过期，则直接返回redis中的数据，如果过期，则在开启独立线程后直接返回之前的数据，独立线程去重构数据，重构完成后释放互斥锁。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211408141.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>如果封装数据：因为现在redis中存储的数据的value需要带上过期时间，此时要么你去修改原来的实体类，要么你</p>
<p><strong>步骤一、</strong></p>
<p>新建一个实体类，我们采用第二个方案，这个方案，对原来代码没有侵入性。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisData</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 逻辑过期时间
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">LocalDateTime</span> expireTime<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">T</span> data<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤二、</strong></p>
<p>在<strong>ShopServiceImpl</strong> 新增此方法，利用单元测试进行缓存预热</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">saveShop2Redis</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">,</span> <span class="token class-name">Long</span> expireSeconds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1、查询店铺数据</span>
    <span class="token class-name">Shop</span> shop <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 2、封装逻辑过期时间</span>
    <span class="token class-name">RedisData</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Shop</span><span class="token punctuation">></span></span> redisData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisData</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    redisData<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">;</span>
    redisData<span class="token punctuation">.</span><span class="token function">setExpireTime</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">plusSeconds</span><span class="token punctuation">(</span>expireSeconds<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 3、写入redis</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">,</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toJsonStr</span><span class="token punctuation">(</span>redisData<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在测试类中</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testSaveShop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    shopService<span class="token punctuation">.</span><span class="token function">saveShop2Redis</span><span class="token punctuation">(</span><span class="token number">1L</span><span class="token punctuation">,</span> <span class="token number">10L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>步骤三：正式代码</p>
<p><strong>ShopServiceImpl</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ExecutorService</span> <span class="token constant">CACHE_REBUILD_EXECUTOR</span> <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">private</span> <span class="token class-name">Shop</span> <span class="token function">queryWithLogicalExpire</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1、从redis查询商铺缓存</span>
    <span class="token class-name">String</span> shopJson <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Shop</span> shop <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 2、判断缓存中是否存在</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>shopJson<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 3、不存在，直接返回null</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 4、命中，判断缓存是否过期（需要将json反序列化成对象）</span>
    <span class="token class-name">RedisData</span> redisData <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span>shopJson<span class="token punctuation">,</span> <span class="token class-name">RedisData</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    shop <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">JSONObject</span><span class="token punctuation">)</span> redisData<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Shop</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">LocalDateTime</span> expireTime <span class="token operator">=</span> redisData<span class="token punctuation">.</span><span class="token function">getExpireTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 5、判断是否过期</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>expireTime<span class="token punctuation">.</span><span class="token function">isAfter</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 5.1、未过期，返回shop信息</span>
        <span class="token keyword">return</span> shop<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 5.2、已过期，需要缓存重建</span>
    <span class="token comment">// 6、缓存重建</span>
    <span class="token comment">// 6.1、获取互斥锁</span>
    <span class="token class-name">String</span> lockKey <span class="token operator">=</span> <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">LOCK_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">;</span>
    <span class="token keyword">boolean</span> isLock <span class="token operator">=</span> <span class="token function">tryLock</span><span class="token punctuation">(</span>lockKey<span class="token punctuation">,</span> <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">LOCK_SHOP_TTL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 6.2、判断锁是否获取成功</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isLock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 6.3、成功，开启独立线程，开启缓存重建</span>
        <span class="token constant">CACHE_REBUILD_EXECUTOR</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token comment">// 重建缓存</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">saveShop2Redis</span><span class="token punctuation">(</span>id<span class="token punctuation">,</span> <span class="token number">20L</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                <span class="token comment">// 释放锁</span>
                <span class="token function">unlock</span><span class="token punctuation">(</span>lockKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 6.4、返回过期的商铺信息</span>
    <span class="token keyword">return</span> shop<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-11、封装redis工具类" tabindex="-1"><a class="header-anchor" href="#_2-11、封装redis工具类" aria-hidden="true">#</a> 2.11、封装Redis工具类</h3>
<p>基于StringRedisTemplate封装一个缓存工具类，满足下列需求：</p>
<ul>
<li>方法1：将任意Java对象序列化为json并存储在string类型的key中，并且可以设置TTL过期时间</li>
<li>方法2：将任意Java对象序列化为json并存储在string类型的key中，并且可以设置逻辑过期时间，用于处理缓</li>
</ul>
<p>存击穿问题</p>
<ul>
<li>方法3：根据指定的key查询缓存，并反序列化为指定类型，利用缓存空值的方式解决缓存穿透问题</li>
<li>方法4：根据指定的key查询缓存，并反序列化为指定类型，需要利用逻辑过期解决缓存击穿问题</li>
</ul>
<p>将逻辑进行封装</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CacheClient</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ExecutorService</span> <span class="token constant">CACHE_REBUILD_EXECUTOR</span> <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newFixedThreadPool</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">StringRedisTemplate</span> redisTemplate<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">CacheClient</span><span class="token punctuation">(</span><span class="token class-name">StringRedisTemplate</span> redisTemplate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>redisTemplate <span class="token operator">=</span> redisTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 将任意Java对象序列化为json并存储在string类型的key中，并且可以设置TTL过期时间
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>        存储的key
     * <span class="token keyword">@param</span> <span class="token parameter">value</span>      存储的value
     * <span class="token keyword">@param</span> <span class="token parameter">expireTime</span> 过期时间
     * <span class="token keyword">@param</span> <span class="token parameter">timeUnit</span>   过期时间单位
     */</span>
    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">void</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">T</span> value<span class="token punctuation">,</span> <span class="token class-name">Long</span> expireTime<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> timeUnit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toJsonStr</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">,</span> expireTime<span class="token punctuation">,</span> timeUnit<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 将任意Java对象序列化为json并存储在string类型的key中，并且可以设置逻辑过期时间，用于处理缓存击穿问题
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span>        存储的key
     * <span class="token keyword">@param</span> <span class="token parameter">value</span>      存储的data
     * <span class="token keyword">@param</span> <span class="token parameter">expireTime</span> 逻辑过期时间
     * <span class="token keyword">@param</span> <span class="token parameter">timeUnit</span>   逻辑过期时间单位
     */</span>
    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> <span class="token keyword">void</span> <span class="token function">setWithLogicExpire</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">T</span> value<span class="token punctuation">,</span> <span class="token class-name">Long</span> expireTime<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> timeUnit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RedisData</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">></span></span> redisData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisData</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisData<span class="token punctuation">.</span><span class="token function">setData</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisData<span class="token punctuation">.</span><span class="token function">setExpireTime</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">plusSeconds</span><span class="token punctuation">(</span>timeUnit<span class="token punctuation">.</span><span class="token function">toSeconds</span><span class="token punctuation">(</span>expireTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toJsonStr</span><span class="token punctuation">(</span>redisData<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 根据指定的key查询缓存，并反序列化为指定类型，利用缓存空值的方式解决缓存穿透问题
     *
     * <span class="token keyword">@param</span> <span class="token parameter">keyPrefix</span>  key前缀
     * <span class="token keyword">@param</span> <span class="token parameter">id</span>         id
     * <span class="token keyword">@param</span> <span class="token parameter">expireTime</span> 过期时间
     * <span class="token keyword">@param</span> <span class="token parameter">timeUnit</span>   过期时间单位
     * <span class="token keyword">@param</span> <span class="token parameter">type</span>       返回值class类型
     * <span class="token keyword">@param</span> <span class="token parameter">dbFallback</span> 用于数据库操作的回调函数
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>R<span class="token punctuation">></span></span>        返回值数据类型
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>ID<span class="token punctuation">></span></span>       id数据类型
     * <span class="token keyword">@return</span> R
     */</span>
    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">,</span> ID<span class="token punctuation">></span></span> <span class="token class-name">R</span> <span class="token function">queryWithPassThrough</span><span class="token punctuation">(</span><span class="token class-name">String</span> keyPrefix<span class="token punctuation">,</span> <span class="token class-name">ID</span> id<span class="token punctuation">,</span>
                                          <span class="token class-name">Long</span> expireTime<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> timeUnit<span class="token punctuation">,</span>
                                          <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">></span></span> type<span class="token punctuation">,</span> <span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span>ID<span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">></span></span> dbFallback<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1、从redis查询商铺缓存</span>
        <span class="token class-name">String</span> key <span class="token operator">=</span> keyPrefix <span class="token operator">+</span> id<span class="token punctuation">;</span>
        <span class="token class-name">String</span> json <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 2、判断缓存中是否存在</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 3、不为null且存在，直接返回</span>
            <span class="token keyword">return</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 判断是否是key为""的缓存（缓存穿透）</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>json <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 4、不存在，根据id查询数据库（通过定义回调函数，交给调用者自己处理）</span>
        <span class="token class-name">R</span> r <span class="token operator">=</span> dbFallback<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">ObjectUtil</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 将空值写入redis（解决缓存穿透问题）</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span>
                    <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_NULL_TTL</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 4.1、数据库不存在返回错误</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 4.2、数据库存在，写入redis</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> r<span class="token punctuation">,</span> expireTime<span class="token punctuation">,</span> timeUnit<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> r<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 根据指定的key查询缓存，并反序列化为指定类型，需要利用逻辑过期解决缓存击穿问题将逻辑进行封装
     *
     * <span class="token keyword">@param</span> <span class="token parameter">keyPrefix</span>  key前缀
     * <span class="token keyword">@param</span> <span class="token parameter">id</span>         id
     * <span class="token keyword">@param</span> <span class="token parameter">time</span>       逻辑过期时间
     * <span class="token keyword">@param</span> <span class="token parameter">timeUnit</span>   逻辑过期时间单位
     * <span class="token keyword">@param</span> <span class="token parameter">type</span>       返回值数据class类型
     * <span class="token keyword">@param</span> <span class="token parameter">dbRollback</span> 操作数据库的回调函数
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>R<span class="token punctuation">></span></span>        返回值数据类型
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>ID<span class="token punctuation">></span></span>       id数据类型
     * <span class="token keyword">@return</span> r
     */</span>
    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">,</span> ID<span class="token punctuation">></span></span> <span class="token class-name">R</span> <span class="token function">queryWithLogicalExpire</span><span class="token punctuation">(</span><span class="token class-name">String</span> keyPrefix<span class="token punctuation">,</span> <span class="token class-name">ID</span> id<span class="token punctuation">,</span>
                                            <span class="token class-name">Long</span> time<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> timeUnit<span class="token punctuation">,</span>
                                            <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">></span></span> type<span class="token punctuation">,</span> <span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span>ID<span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">></span></span> dbRollback<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1、从redis查询商铺缓存</span>
        <span class="token class-name">String</span> key <span class="token operator">=</span> keyPrefix <span class="token operator">+</span> id<span class="token punctuation">;</span>
        <span class="token class-name">String</span> json <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2、判断缓存中是否存在</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">isBlank</span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 3、不存在，直接返回null</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 4、命中，判断缓存是否过期（需要将json反序列化成对象）</span>
        <span class="token class-name">RedisData</span> redisData <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span>json<span class="token punctuation">,</span> <span class="token class-name">RedisData</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">R</span> r <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span><span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toJsonStr</span><span class="token punctuation">(</span>redisData<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">LocalDateTime</span> expireTime <span class="token operator">=</span> redisData<span class="token punctuation">.</span><span class="token function">getExpireTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 5、判断是否过期</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>expireTime<span class="token punctuation">.</span><span class="token function">isAfter</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 5.1、未过期，返回shop信息</span>
            <span class="token keyword">return</span> r<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 5.2、已过期，需要缓存重建</span>
        <span class="token comment">// 6、缓存重建</span>
        <span class="token comment">// 6.1、获取互斥锁</span>
        <span class="token class-name">String</span> lockKey <span class="token operator">=</span> <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">LOCK_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> isLock <span class="token operator">=</span> <span class="token function">tryLock</span><span class="token punctuation">(</span>lockKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 6.2、判断锁是否获取成功</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>isLock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 6.3、成功，开启独立线程，开启缓存重建</span>
            <span class="token constant">CACHE_REBUILD_EXECUTOR</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 重建缓存</span>
                    <span class="token comment">// 查数据库</span>
                    <span class="token class-name">R</span> newR <span class="token operator">=</span> dbRollback<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// 写入redis</span>
                    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setWithLogicExpire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> newR<span class="token punctuation">,</span> time<span class="token punctuation">,</span> timeUnit<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 释放锁</span>
                    <span class="token function">unlock</span><span class="token punctuation">(</span>lockKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 6.4、返回过期的商铺信息</span>
        <span class="token keyword">return</span> r<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">,</span> ID<span class="token punctuation">></span></span> <span class="token class-name">R</span> <span class="token function">queryWithMutex</span><span class="token punctuation">(</span>
            <span class="token class-name">String</span> keyPrefix<span class="token punctuation">,</span> <span class="token class-name">ID</span> id<span class="token punctuation">,</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">></span></span> type<span class="token punctuation">,</span> <span class="token class-name">Function</span><span class="token generics"><span class="token punctuation">&lt;</span>ID<span class="token punctuation">,</span> <span class="token class-name">R</span><span class="token punctuation">></span></span> dbFallback<span class="token punctuation">,</span> <span class="token class-name">Long</span> time<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> unit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> key <span class="token operator">=</span> keyPrefix <span class="token operator">+</span> id<span class="token punctuation">;</span>
        <span class="token comment">// 1.从redis查询商铺缓存</span>
        <span class="token class-name">String</span> shopJson <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2.判断是否存在</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span>shopJson<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 3.存在，直接返回</span>
            <span class="token keyword">return</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span>shopJson<span class="token punctuation">,</span> type<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 判断命中的是否是空值</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>shopJson <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 返回一个错误信息</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 4.实现缓存重建</span>
        <span class="token comment">// 4.1.获取互斥锁</span>
        <span class="token class-name">String</span> lockKey <span class="token operator">=</span> <span class="token constant">LOCK_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">;</span>
        <span class="token class-name">R</span> r <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">boolean</span> isLock <span class="token operator">=</span> <span class="token function">tryLock</span><span class="token punctuation">(</span>lockKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 4.2.判断是否获取成功</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isLock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 4.3.获取锁失败，休眠并重试</span>
                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token function">queryWithMutex</span><span class="token punctuation">(</span>keyPrefix<span class="token punctuation">,</span> id<span class="token punctuation">,</span> type<span class="token punctuation">,</span> dbFallback<span class="token punctuation">,</span> time<span class="token punctuation">,</span> unit<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 4.4.获取锁成功，根据id查询数据库</span>
            r <span class="token operator">=</span> dbFallback<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 5.不存在，返回错误</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>r <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 将空值写入redis</span>
                stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token constant">CACHE_NULL_TTL</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 返回错误信息</span>
                <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 6.存在，写入redis</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> r<span class="token punctuation">,</span> time<span class="token punctuation">,</span> unit<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 7.释放锁</span>
            <span class="token function">unlock</span><span class="token punctuation">(</span>lockKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 8.返回</span>
        <span class="token keyword">return</span> r<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Boolean</span> flag <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setIfAbsent</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
                <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">LOCK_SHOP_TTL</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">BooleanUtil</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span>flag<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在ShopServiceImpl 中</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">getByIdWithRedis</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 缓存穿透</span>
    <span class="token comment">// Shop shop = queryWithPassThrough(id);</span>
    <span class="token comment">// Shop shop = cacheClient.queryWithPassThrough(RedisConstants.CACHE_SHOP_KEY, id,</span>
    <span class="token comment">//         RedisConstants.CACHE_SHOP_TTL, TimeUnit.MINUTES,</span>
    <span class="token comment">//         Shop.class, this::getById);</span>
    <span class="token comment">// 缓存击穿</span>
    <span class="token comment">// Shop shop = queryWithMutex(id);</span>
    <span class="token comment">// cacheClient.</span>
    <span class="token comment">// 逻辑过期</span>
    <span class="token class-name">Shop</span> shop <span class="token operator">=</span> cacheClient<span class="token punctuation">.</span><span class="token function">queryWithLogicalExpire</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span><span class="token punctuation">,</span>
                                                   id<span class="token punctuation">,</span> <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_TTL</span><span class="token punctuation">,</span>
                                                   <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">,</span> <span class="token class-name">Shop</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token operator">::</span><span class="token function">getById</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// Shop shop = queryWithLogicalExpire(id);</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>shop <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"店铺不存在！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3、优惠卷秒杀" tabindex="-1"><a class="header-anchor" href="#_3、优惠卷秒杀" aria-hidden="true">#</a> 3、优惠卷秒杀</h2>
<h3 id="_3-1、全局唯一id" tabindex="-1"><a class="header-anchor" href="#_3-1、全局唯一id" aria-hidden="true">#</a> 3.1、全局唯一ID</h3>
<p>每个店铺都可以发布优惠券：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211408297.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>当用户抢购时，就会生成订单并保存到tb_voucher_order这张表中，而订单表如果使用数据库自增ID就存在一些问题：</p>
<ul>
<li>id的规律性太明显</li>
<li>受单表数据量的限制</li>
</ul>
<p>场景分析：如果我们的id具有太明显的规则，用户或者说商业对手很容易猜测出来我们的一些敏感信息，比如商城在一天时间内，卖出了多少单，这明显不合适。</p>
<p>场景分析二：随着我们商城规模越来越大，mysql的单表的容量不宜超过500W，数据量过大之后，我们要进行拆库拆表，但拆分表了之后，他们从逻辑上讲他们是同一张表，所以他们的id是不能一样的， 于是乎我们需要保证id的唯一性。</p>
<p><strong>全局ID生成器</strong>，是一种在分布式系统下用来生成全局唯一ID的工具，一般要满足下列特性：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211408242.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>为了增加ID的安全性，我们可以不直接使用Redis自增的数值，而是拼接一些其它信息：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211408246.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>ID的组成部分：符号位：1bit，永远为0</p>
<p>时间戳：31bit，以秒为单位，可以使用69年</p>
<p>序列号：32bit，秒内的计数器，支持每秒产生2^32个不同ID</p>
<h3 id="_3-2、redis实现全局唯一id" tabindex="-1"><a class="header-anchor" href="#_3-2、redis实现全局唯一id" aria-hidden="true">#</a> 3.2、Redis实现全局唯一Id</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisIdWorker</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 开始时间戳 2022-1-1 00:00:00
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> <span class="token constant">BEGIN_TIMESTAMP</span> <span class="token operator">=</span> <span class="token number">1640995200L</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 序列号的位数
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">COUNT_BITS</span> <span class="token operator">=</span> <span class="token number">32</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">RedisIdWorker</span><span class="token punctuation">(</span><span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>stringRedisTemplate <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 通过不同的前缀来区分不同业务的id</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">nextId</span><span class="token punctuation">(</span><span class="token class-name">String</span> keyPrefix<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1.生成时间戳</span>
        <span class="token class-name">LocalDateTime</span> now <span class="token operator">=</span> <span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> nowSecond <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">toEpochSecond</span><span class="token punctuation">(</span><span class="token class-name">ZoneOffset</span><span class="token punctuation">.</span><span class="token constant">UTC</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> timestamp <span class="token operator">=</span> nowSecond <span class="token operator">-</span> <span class="token constant">BEGIN_TIMESTAMP</span><span class="token punctuation">;</span>

        <span class="token comment">// 2.生成序列号</span>
        <span class="token comment">// 2.1.获取当前日期，精确到天（每天使用一个key）</span>
        <span class="token class-name">String</span> date <span class="token operator">=</span> now<span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token class-name">DateTimeFormatter</span><span class="token punctuation">.</span><span class="token function">ofPattern</span><span class="token punctuation">(</span><span class="token string">"yyyy:MM:dd"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2.2.自增长</span>
        <span class="token keyword">long</span> count <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span><span class="token string">"icr:"</span> <span class="token operator">+</span> keyPrefix <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> date<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 3.拼接并返回</span>
        <span class="token keyword">return</span> timestamp <span class="token operator">&lt;&lt;</span> <span class="token constant">COUNT_BITS</span> <span class="token operator">|</span> count<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试类</p>
<p>知识小贴士：关于countdownlatch</p>
<p>countdownlatch名为信号枪：主要的作用是同步协调在多线程的等待于唤醒问题</p>
<p>我们如果没有CountDownLatch ，那么由于程序是异步的，当异步程序没有执行完时，主线程就已经执行完了，然后我们期望的是分线程全部走完之后，主线程再走，所以我们此时需要使用到CountDownLatch</p>
<p>CountDownLatch 中有两个最重要的方法</p>
<p>1、countDown</p>
<p>2、await</p>
<p>await 方法 是阻塞方法，我们担心分线程没有执行完时，main线程就先执行，所以使用await可以让main线程阻塞，那么什么时候main线程不再阻塞呢？当CountDownLatch  内部维护的 变量变为0时，就不再阻塞，直接放行，那么什么时候CountDownLatch   维护的变量变为0 呢，我们只需要调用一次countDown ，内部变量就减少1，我们让分线程和变量绑定， 执行完一个分线程就减少一个变量，当分线程全部走完，CountDownLatch 维护的变量就是0，此时await就不再阻塞，统计出来的时间也就是所有分线程执行完后的时间。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">testIdWorker</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">InterruptedException</span> <span class="token punctuation">{</span>
    <span class="token class-name">CountDownLatch</span> latch <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CountDownLatch</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Runnable</span> task <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">100</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">long</span> id <span class="token operator">=</span> redisIdWorker<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token string">"order"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"id = "</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        latch<span class="token punctuation">.</span><span class="token function">countDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> begin <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">300</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        es<span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    latch<span class="token punctuation">.</span><span class="token function">await</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> end <span class="token operator">=</span> <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">currentTimeMillis</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"time = "</span> <span class="token operator">+</span> <span class="token punctuation">(</span>end <span class="token operator">-</span> begin<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3、添加优惠卷" tabindex="-1"><a class="header-anchor" href="#_3-3、添加优惠卷" aria-hidden="true">#</a> 3.3、添加优惠卷</h3>
<p>每个店铺都可以发布优惠券，分为平价券和特价券。平价券可以任意购买，而特价券需要秒杀抢购：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211408972.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>tb_voucher：优惠券的基本信息，优惠金额、使用规则等<br>
tb_seckill_voucher：优惠券的库存、开始抢购时间，结束抢购时间。特价优惠券才需要填写这些信息</p>
<p>平价卷由于优惠力度并不是很大，所以是可以任意领取</p>
<p>而代金券由于优惠力度大，所以像第二种卷，就得限制数量，从表结构上也能看出，特价卷除了具有优惠卷的基本信息以外，还具有库存，抢购时间，结束时间等等字段</p>
<p>**新增普通卷代码：  **VoucherController</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">addVoucher</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Voucher</span> voucher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    voucherService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>voucher<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>新增秒杀卷代码：</strong></p>
<p><strong>VoucherController</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"seckill"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">addSeckillVoucher</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">Voucher</span> voucher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    voucherService<span class="token punctuation">.</span><span class="token function">addSeckillVoucher</span><span class="token punctuation">(</span>voucher<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>VoucherServiceImpl</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addSeckillVoucher</span><span class="token punctuation">(</span><span class="token class-name">Voucher</span> voucher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 保存优惠券</span>
    <span class="token function">save</span><span class="token punctuation">(</span>voucher<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 保存秒杀信息</span>
    <span class="token class-name">SeckillVoucher</span> seckillVoucher <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SeckillVoucher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    seckillVoucher<span class="token punctuation">.</span><span class="token function">setVoucherId</span><span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    seckillVoucher<span class="token punctuation">.</span><span class="token function">setStock</span><span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getStock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    seckillVoucher<span class="token punctuation">.</span><span class="token function">setBeginTime</span><span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getBeginTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    seckillVoucher<span class="token punctuation">.</span><span class="token function">setEndTime</span><span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getEndTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    seckillVoucherService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>seckillVoucher<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 保存秒杀库存到Redis中</span>
    stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token constant">SECKILL_STOCK_KEY</span> <span class="token operator">+</span> voucher<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> voucher<span class="token punctuation">.</span><span class="token function">getStock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-4、实现秒杀下单" tabindex="-1"><a class="header-anchor" href="#_3-4、实现秒杀下单" aria-hidden="true">#</a> 3.4、实现秒杀下单</h3>
<p>下单核心思路：当我们点击抢购时，会触发右侧的请求，我们只需要编写对应的controller即可</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211408374.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>秒杀下单应该思考的内容：</p>
<p>下单时需要判断两点：</p>
<ul>
<li>秒杀是否开始或结束，如果尚未开始或已经结束则无法下单</li>
<li>库存是否充足，不足则无法下单</li>
</ul>
<p>下单核心逻辑分析：</p>
<p>当用户开始进行下单，我们应当去查询优惠卷信息，查询到优惠卷信息，判断是否满足秒杀条件</p>
<p>比如时间是否充足，如果时间充足，则进一步判断库存是否足够，如果两者都满足，则扣减库存，创建订单，然后返回订单id，如果有一个条件不满足则直接结束。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211408083.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>VoucherOrderServiceImpl</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">seckillVoucher</span><span class="token punctuation">(</span><span class="token class-name">Long</span> voucherId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1、查询优惠券</span>
    <span class="token class-name">SeckillVoucher</span> seckillVoucher <span class="token operator">=</span> seckillVoucherService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 2、判断秒杀是否开始</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isBefore</span><span class="token punctuation">(</span>seckillVoucher<span class="token punctuation">.</span><span class="token function">getBeginTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"秒杀尚未开始！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 3、判断秒杀是否已经结束</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isAfter</span><span class="token punctuation">(</span>seckillVoucher<span class="token punctuation">.</span><span class="token function">getEndTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"秒杀已经结束！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 4、判断库存是否充足</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>seckillVoucher<span class="token punctuation">.</span><span class="token function">getStock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"库存不足！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 5、扣减库存</span>
    <span class="token keyword">boolean</span> success <span class="token operator">=</span> seckillVoucherService<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">setSql</span><span class="token punctuation">(</span><span class="token string">"stock = stock - 1"</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"voucher_id"</span><span class="token punctuation">,</span> voucherId<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"库存不足！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 6、创建订单</span>
    <span class="token class-name">VoucherOrder</span> voucherOrder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VoucherOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 6.1.订单id</span>
    <span class="token keyword">long</span> orderId <span class="token operator">=</span> redisIdWorker<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token string">"order"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    voucherOrder<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 6.2.用户id</span>
    <span class="token class-name">Long</span> userId <span class="token operator">=</span> <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    voucherOrder<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 6.3.代金券id</span>
    voucherOrder<span class="token punctuation">.</span><span class="token function">setVoucherId</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>voucherOrder<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-5、库存超卖问题分析" tabindex="-1"><a class="header-anchor" href="#_3-5、库存超卖问题分析" aria-hidden="true">#</a> 3.5、库存超卖问题分析</h3>
<p>有关超卖问题分析：在我们原有代码中是这么写的</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code> <span class="token keyword">if</span> <span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getStock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 库存不足</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"库存不足！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//5，扣减库存</span>
    <span class="token keyword">boolean</span> success <span class="token operator">=</span> seckillVoucherService<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setSql</span><span class="token punctuation">(</span><span class="token string">"stock= stock -1"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"voucher_id"</span><span class="token punctuation">,</span> voucherId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//扣减库存</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"库存不足！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>假设线程1过来查询库存，判断出来库存大于1，正准备去扣减库存，但是还没有来得及去扣减，此时线程2过来，线程2也去查询库存，发现这个数量一定也大于1，那么这两个线程都会去扣减库存，最终多个线程相当于一起去扣减库存，此时就会出现库存的超卖问题。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211408724.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>超卖问题是典型的多线程安全问题，针对这一问题的常见解决方案就是加锁：而对于加锁，我们通常有两种解决方案：见下图：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211408129.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>悲观锁：</strong></p>
<p>悲观锁可以实现对于数据的串行化执行，比如syn，和lock都是悲观锁的代表，同时，悲观锁中又可以再细分为公平锁，非公平锁，可重入锁，等等</p>
<p><strong>乐观锁：</strong></p>
<p>乐观锁：会有一个版本号，每次操作数据会对版本号+1，再提交回数据时，会去校验是否比之前的版本大1 ，如果大1 ，则进行操作成功，这套机制的核心逻辑在于，如果在操作过程中，版本号只比原来大1 ，那么就意味着操作过程中没有人对他进行过修改，他的操作就是安全的，如果不大1，则数据被修改过，当然乐观锁还有一些变种的处理方式比如cas</p>
<p>乐观锁的典型代表：就是cas，利用cas进行无锁化机制加锁，var5 是操作前读取的内存值，while中的var1+var2 是预估值，如果预估值 == 内存值，则代表中间没有被人修改过，此时就将新值去替换 内存值</p>
<p>其中do while 是为了在操作失败时，再次进行自旋操作，即把之前的逻辑再操作一次。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">int</span> var5<span class="token punctuation">;</span>
<span class="token keyword">do</span> <span class="token punctuation">{</span>
    var5 <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getIntVolatile</span><span class="token punctuation">(</span>var1<span class="token punctuation">,</span> var2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">compareAndSwapInt</span><span class="token punctuation">(</span>var1<span class="token punctuation">,</span> var2<span class="token punctuation">,</span> var5<span class="token punctuation">,</span> var5 <span class="token operator">+</span> var4<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> var5<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>课程中的使用方式：</strong></p>
<p>课程中的使用方式是没有像cas一样带自旋的操作，也没有对version的版本号+1 ，他的操作逻辑是在操作时，对版本号进行+1 操作，然后要求version 如果是1 的情况下，才能操作，那么第一个线程在操作后，数据库中的version变成了2，但是他自己满足version=1 ，所以没有问题，此时线程2执行，线程2 最后也需要加上条件version =1 ，但是现在由于线程1已经操作过了，所以线程2，操作时就不满足version=1 的条件了，所以线程2无法执行成功</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211408999.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_3-6、乐观锁解决超卖问题" tabindex="-1"><a class="header-anchor" href="#_3-6、乐观锁解决超卖问题" aria-hidden="true">#</a> 3.6、乐观锁解决超卖问题</h3>
<p><strong>修改代码方案一、</strong></p>
<p>VoucherOrderServiceImpl 在扣减库存时，改为：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">boolean</span> success <span class="token operator">=</span> seckillVoucherService<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setSql</span><span class="token punctuation">(</span><span class="token string">"stock= stock -1"</span><span class="token punctuation">)</span> <span class="token comment">//set stock = stock -1</span>
            <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"voucher_id"</span><span class="token punctuation">,</span> voucherId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"stock"</span><span class="token punctuation">,</span>voucher<span class="token punctuation">.</span><span class="token function">getStock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//where id = ？ and stock = ?</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上逻辑的核心含义是：只要我扣减库存时的库存和之前我查询到的库存是一样的，就意味着没有人在中间修改过库存，那么此时就是安全的，但是以上这种方式通过测试发现会有很多失败的情况，失败的原因在于：在使用乐观锁过程中假设100个线程同时都拿到了100的库存，然后大家一起去进行扣减，但是100个人中只有1个人能扣减成功，其他的人在处理时，他们在扣减时，库存已经被修改过了，所以此时其他线程都会失败</p>
<p><strong>修改代码方案二、</strong></p>
<p>之前的方式要修改前后都保持一致，但是这样我们分析过，成功的概率太低，所以我们的乐观锁需要变一下，改成stock大于0 即可</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">boolean</span> success <span class="token operator">=</span> seckillVoucherService<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setSql</span><span class="token punctuation">(</span><span class="token string">"stock= stock -1"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"voucher_id"</span><span class="token punctuation">,</span> voucherId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">gt</span><span class="token punctuation">(</span><span class="token string">"stock"</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//where id = ? and stock > 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>知识小扩展：</strong></p>
<p>针对cas中的自旋压力过大，我们可以使用Longaddr这个类去解决</p>
<p>Java8 提供的一个对AtomicLong改进后的一个类，LongAdder</p>
<p>大量线程并发更新一个原子性的时候，天然的问题就是自旋，会导致并发性问题，当然这也比我们直接使用syn来的好</p>
<p>所以利用这么一个类，LongAdder来进行优化</p>
<p>如果获取某个值，则会对cell和base的值进行递增，最后返回一个完整的值</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211409045.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_3-7、优惠券秒杀-一人一单" tabindex="-1"><a class="header-anchor" href="#_3-7、优惠券秒杀-一人一单" aria-hidden="true">#</a> 3.7、优惠券秒杀-一人一单</h3>
<p>需求：修改秒杀业务，要求同一个优惠券，一个用户只能下一单</p>
<p><strong>现在的问题在于：</strong></p>
<p>优惠卷是为了引流，但是目前的情况是，一个人可以无限制的抢这个优惠卷，所以我们应当增加一层逻辑，让一个用户只能下一个单，而不是让一个用户下多个单</p>
<p>具体操作逻辑如下：比如时间是否充足，如果时间充足，则进一步判断库存是否足够，然后再根据优惠卷id和用户id查询是否已经下过这个订单，如果下过这个订单，则不再下单，否则进行下单</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211409010.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>VoucherOrderServiceImpl</p>
<p><strong>初步代码：增加一人一单逻辑</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">seckillVoucher</span><span class="token punctuation">(</span><span class="token class-name">Long</span> voucherId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1.查询优惠券</span>
    <span class="token class-name">SeckillVoucher</span> voucher <span class="token operator">=</span> seckillVoucherService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 2.判断秒杀是否开始</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getBeginTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isAfter</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 尚未开始</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"秒杀尚未开始！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 3.判断秒杀是否已经结束</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getEndTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isBefore</span><span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 尚未开始</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"秒杀已经结束！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 4.判断库存是否充足</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getStock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 库存不足</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"库存不足！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 5.一人一单逻辑</span>
    <span class="token comment">// 5.1.用户id</span>
    <span class="token class-name">Long</span> userId <span class="token operator">=</span> <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"user_id"</span><span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"voucher_id"</span><span class="token punctuation">,</span> voucherId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 5.2.判断是否存在</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 用户已经购买过了</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"用户已经购买过一次！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//6，扣减库存</span>
    <span class="token keyword">boolean</span> success <span class="token operator">=</span> seckillVoucherService<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setSql</span><span class="token punctuation">(</span><span class="token string">"stock= stock -1"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"voucher_id"</span><span class="token punctuation">,</span> voucherId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//扣减库存</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"库存不足！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//7.创建订单</span>
    <span class="token class-name">VoucherOrder</span> voucherOrder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VoucherOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 7.1.订单id</span>
    <span class="token keyword">long</span> orderId <span class="token operator">=</span> redisIdWorker<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token string">"order"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    voucherOrder<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    voucherOrder<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 7.3.代金券id</span>
    voucherOrder<span class="token punctuation">.</span><span class="token function">setVoucherId</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">save</span><span class="token punctuation">(</span>voucherOrder<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**存在问题：**现在的问题还是和之前一样，并发过来，查询数据库，都不存在订单，所以我们还是需要加锁，但是乐观锁比较适合更新数据，而现在是插入数据，所以我们需要使用悲观锁操作</p>
<p>**注意：**在这里提到了非常多的问题，我们需要慢慢的来思考，首先我们的初始方案是封装了一个createVoucherOrder方法，同时为了确保他线程安全，在方法上添加了一把synchronized 锁</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token class-name">Result</span> <span class="token function">createVoucherOrder</span><span class="token punctuation">(</span><span class="token class-name">Long</span> voucherId<span class="token punctuation">)</span> <span class="token punctuation">{</span>

	<span class="token class-name">Long</span> userId <span class="token operator">=</span> <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token comment">// 5.1.查询订单</span>
        <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"user_id"</span><span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"voucher_id"</span><span class="token punctuation">,</span> voucherId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 5.2.判断是否存在</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 用户已经购买过了</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"用户已经购买过一次！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 6.扣减库存</span>
        <span class="token keyword">boolean</span> success <span class="token operator">=</span> seckillVoucherService<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setSql</span><span class="token punctuation">(</span><span class="token string">"stock = stock - 1"</span><span class="token punctuation">)</span> <span class="token comment">// set stock = stock - 1</span>
                <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"voucher_id"</span><span class="token punctuation">,</span> voucherId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">gt</span><span class="token punctuation">(</span><span class="token string">"stock"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// where id = ? and stock > 0</span>
                <span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 扣减失败</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"库存不足！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 7.创建订单</span>
        <span class="token class-name">VoucherOrder</span> voucherOrder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VoucherOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 7.1.订单id</span>
        <span class="token keyword">long</span> orderId <span class="token operator">=</span> redisIdWorker<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token string">"order"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        voucherOrder<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 7.2.用户id</span>
        voucherOrder<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 7.3.代金券id</span>
        voucherOrder<span class="token punctuation">.</span><span class="token function">setVoucherId</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">save</span><span class="token punctuation">(</span>voucherOrder<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 7.返回订单id</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>，但是这样添加锁，锁的粒度太粗了，在使用锁过程中，控制<strong>锁粒度</strong> 是一个非常重要的事情，因为如果锁的粒度太大，会导致每个线程进来都会锁住，所以我们需要去控制锁的粒度，以下这段代码需要修改为：<br>
intern() 这个方法是从常量池中拿到数据，如果我们直接使用userId.toString() 他拿到的对象实际上是不同的对象，new出来的对象，我们使用锁必须保证锁必须是同一把，所以我们需要使用intern()方法</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span>  <span class="token class-name">Result</span> <span class="token function">createVoucherOrder</span><span class="token punctuation">(</span><span class="token class-name">Long</span> voucherId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token class-name">Long</span> userId <span class="token operator">=</span> <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token keyword">synchronized</span><span class="token punctuation">(</span>userId<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intern</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token comment">// 5.1.查询订单</span>
        <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"user_id"</span><span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"voucher_id"</span><span class="token punctuation">,</span> voucherId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 5.2.判断是否存在</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 用户已经购买过了</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"用户已经购买过一次！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 6.扣减库存</span>
        <span class="token keyword">boolean</span> success <span class="token operator">=</span> seckillVoucherService<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setSql</span><span class="token punctuation">(</span><span class="token string">"stock = stock - 1"</span><span class="token punctuation">)</span> <span class="token comment">// set stock = stock - 1</span>
                <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"voucher_id"</span><span class="token punctuation">,</span> voucherId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">gt</span><span class="token punctuation">(</span><span class="token string">"stock"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// where id = ? and stock > 0</span>
                <span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 扣减失败</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"库存不足！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 7.创建订单</span>
        <span class="token class-name">VoucherOrder</span> voucherOrder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VoucherOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 7.1.订单id</span>
        <span class="token keyword">long</span> orderId <span class="token operator">=</span> redisIdWorker<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token string">"order"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        voucherOrder<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 7.2.用户id</span>
        voucherOrder<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 7.3.代金券id</span>
        voucherOrder<span class="token punctuation">.</span><span class="token function">setVoucherId</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">save</span><span class="token punctuation">(</span>voucherOrder<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 7.返回订单id</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是以上代码还是存在问题，问题的原因在于当前方法被spring的事务控制，如果你在方法内部加锁，可能会导致当前方法事务还没有提交，但是锁已经释放也会导致问题，所以我们选择将当前方法整体包裹起来，确保事务不会出现问题：如下：</p>
<p>在seckillVoucher 方法中，添加以下逻辑，这样就能保证事务的特性，同时也控制了锁的粒度</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Long</span> userId <span class="token operator">=</span> <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">synchronized</span> <span class="token punctuation">(</span>userId<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intern</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createVoucherOrder</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但是以上做法依然有问题，因为你调用的方法，其实是this.的方式调用的，事务想要生效，还得利用代理来生效，所以这个地方，我们需要获得原始的事务对象， 来操作事务</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">synchronized</span> <span class="token punctuation">(</span>userId<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">intern</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取代理对象（事务）</span>
    <span class="token class-name">IVoucherOrderService</span> proxy <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">IVoucherOrderService</span><span class="token punctuation">)</span> <span class="token class-name">AopContext</span><span class="token punctuation">.</span><span class="token function">currentProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> proxy<span class="token punctuation">.</span><span class="token function">createVoucherOrder</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除此之外还需要引入aspectj依赖，以及在启动类添加配置</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.aspectj<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>aspectjweaver<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@EnableAspectJAutoProxy</span><span class="token punctuation">(</span>exposeProxy <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-8、集群环境下的并发问题" tabindex="-1"><a class="header-anchor" href="#_3-8、集群环境下的并发问题" aria-hidden="true">#</a> 3.8、集群环境下的并发问题</h3>
<p>通过加锁可以解决在单机情况下的一人一单安全问题，但是在集群模式下就不行了。</p>
<p>1、我们将服务启动两份，端口分别为8081和8082：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211409436.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>2、然后修改nginx的conf目录下的nginx.conf文件，配置反向代理和负载均衡：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211409530.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>具体操作(略)</strong></p>
<p><strong>有关锁失效原因分析</strong></p>
<p>由于现在我们部署了多个tomcat，每个tomcat都有一个属于自己的jvm，那么假设在服务器A的tomcat内部，有两个线程，这两个线程由于使用的是同一份代码，那么他们的锁对象是同一个，是可以实现互斥的，但是如果现在是服务器B的tomcat内部，又有两个线程，但是他们的锁对象写的虽然和服务器A一样，但是锁对象却不是同一个，所以线程3和线程4可以实现互斥，但是却无法和线程1和线程2实现互斥，这就是 集群环境下，syn锁失效的原因，在这种情况下，我们就需要使用分布式锁来解决这个问题。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309211409093.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="_4、分布式锁" tabindex="-1"><a class="header-anchor" href="#_4、分布式锁" aria-hidden="true">#</a> 4、分布式锁</h2>
<h3 id="_4-1、基本原理和实现方式对比" tabindex="-1"><a class="header-anchor" href="#_4-1、基本原理和实现方式对比" aria-hidden="true">#</a> 4.1、基本原理和实现方式对比</h3>
<p>分布式锁：满足分布式系统或集群模式下多进程可见并且互斥的锁。</p>
<p>分布式锁的核心思想就是让大家都使用同一把锁，只要大家使用的是同一把锁，那么我们就能锁住线程，不让线程进行，让程序串行执行，这就是分布式锁的核心思路</p>
<figure><img src="https://124.71.187.148/images/redis/1653374296906.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>那么分布式锁他应该满足一些什么样的条件呢？</p>
<p>可见性：多个线程都能看到相同的结果，注意：这个地方说的可见性并不是并发编程中指的内存可见性，只是说多个进程之间都能感知到变化的意思</p>
<p>互斥：互斥是分布式锁的最基本的条件，使得程序串行执行</p>
<p>高可用：程序不易崩溃，时时刻刻都保证较高的可用性</p>
<p>高性能：由于加锁本身就让性能降低，所有对于分布式锁本身需要他就较高的加锁性能和释放锁性能</p>
<p>安全性：安全也是程序中必不可少的一环</p>
<figure><img src="https://124.71.187.148/images/redis/1653381992018.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>常见的分布式锁有三种</p>
<p>Mysql：mysql本身就带有锁机制，但是由于mysql性能本身一般，所以采用分布式锁的情况下，其实使用mysql作为分布式锁比较少见</p>
<p>Redis：redis作为分布式锁是非常常见的一种使用方式，现在企业级开发中基本都使用redis或者zookeeper作为分布式锁，利用setnx这个方法，如果插入key成功，则表示获得到了锁，如果有人插入成功，其他人插入失败则表示无法获得到锁，利用这套逻辑来实现分布式锁</p>
<p>Zookeeper：zookeeper也是企业级开发中较好的一个实现分布式锁的方案，由于本套视频并不讲解zookeeper的原理和分布式锁的实现，所以不过多阐述</p>
<table>
<thead>
<tr>
<th></th>
<th>MySQL</th>
<th>Redis</th>
<th>Zookeeper</th>
</tr>
</thead>
<tbody>
<tr>
<td>互斥</td>
<td>利用mysql本身的互斥锁机制</td>
<td>利用setnx这样的互斥命令</td>
<td>利用节点的唯一性和有序性实现互斥</td>
</tr>
<tr>
<td>高可用</td>
<td>好</td>
<td>好</td>
<td>好</td>
</tr>
<tr>
<td>高性能</td>
<td>一般</td>
<td>好</td>
<td>一般</td>
</tr>
<tr>
<td>安全性</td>
<td>断开连接，自动释放锁</td>
<td>利用锁超时时间，到期释放</td>
<td>临时节点，断开连接自动释放</td>
</tr>
</tbody>
</table>
<h3 id="_4-2、redis分布式锁的实现核心思路" tabindex="-1"><a class="header-anchor" href="#_4-2、redis分布式锁的实现核心思路" aria-hidden="true">#</a> 4.2、Redis分布式锁的实现核心思路</h3>
<p>实现分布式锁时需要实现的两个基本方法：</p>
<ul>
<li>
<p>获取锁：</p>
<ul>
<li>
<p>互斥：确保只能有一个线程获取锁</p>
</li>
<li>
<p>非阻塞：尝试一次，成功返回true，失败返回false</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 添加锁，NX是互斥，EX是设置超时时间</span>
SET lock thread1 NX EX <span class="token number">10</span>

<span class="token comment"># 下面方法如果在俩个操作之间服务宕机了，依然会有bug</span>
SETNX lock thread1
<span class="token comment"># 两个操作不具备原子性，这边有可能出bug</span>
EXPIRE lock <span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>释放锁：</p>
<ul>
<li>
<p>手动释放</p>
</li>
<li>
<p>超时释放：获取锁时添加一个超时时间</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 释放锁，删除即可</span>
DEL key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<p>核心思路：</p>
<Mermaid id="mermaid-1353" code="eJxLy8kvT85ILCpRCHHiUlAoLol+uqfh6fLuWAVdXTuFpxvmvlg/9UXf9qf9015OaQSLJefnpVQ/7VjybNra57snP5s3pxaoDyQIlFXIy8wBK0o1iobrerpk44stS2ORVOVngxXlZyMUPeuY8LRrPkhRcWlSelFiQYZCcbohkKsAU52SH/2sc/mLhT1Pdsx62rUQpDQ1LwVIpuRDrDSMftne9WzKPqBpYHPSDUF2QVS/2Nb6bPq2Zx3Tns3pBXKfzlzxdN3UZ3N2QXQaR79oX/W0awWKfnBoVOakAkmgw3Pyi6wUlFPSUs1SLXUU0jJzcoBcM2OzVHMjHaCKovzsVKCAgYEBjKdbnplSkmGlYFBQATcp1ZBqJhlRzSRjapkEjl2o3rS0JFOEasJ6QZEFV4tqMUy5UUEFXCglsRiYZosSK60UTLkA9lwF3Q=="></Mermaid><p>我们利用redis 的setnx 方法，当有多个线程进入时，我们就利用该方法，第一个线程进入时，redis 中就有这个key 了，返回了1，如果结果是1，则表示他抢到了锁，那么他去执行业务，然后再删除锁，退出锁逻辑，没有抢到锁的哥们，等待一定时间后重试即可</p>
<figure><img src="https://124.71.187.148/images/redis/1653382830810.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_4-3、实现分布式锁版本一" tabindex="-1"><a class="header-anchor" href="#_4-3、实现分布式锁版本一" aria-hidden="true">#</a> 4.3、实现分布式锁版本一</h3>
<ul>
<li>加锁逻辑</li>
</ul>
<p><strong>锁的基本接口</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ILock</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 尝试获取锁
     *
     * <span class="token keyword">@param</span> <span class="token parameter">timeoutSec</span> 锁持有的超时事件，过期后自动释放
     * <span class="token keyword">@return</span> true代表获取锁成功，false代表获取锁失败
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token keyword">long</span> timeoutSec<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 释放锁
     */</span>
    <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>SimpleRedisLock</strong></p>
<p>利用setnx方法进行加锁，同时增加过期时间，防止死锁，此方法可以保证加锁和增加过期时间具有原子性</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">KEY_PREFIX</span><span class="token operator">=</span><span class="token string">"lock:"</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token keyword">long</span> timeoutSec<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取当前线程的ID。</span>
    <span class="token keyword">long</span> id <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 如果Redis中不存在指定的键，则尝试设置一个值。</span>
    <span class="token class-name">Boolean</span> success <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setIfAbsent</span><span class="token punctuation">(</span><span class="token constant">KEY_PREFIX</span> <span class="token operator">+</span> name<span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">,</span> timeoutSec<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 如果成功设置值，则返回true；否则返回false。</span>
    <span class="token keyword">return</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>success<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>释放锁逻辑</li>
</ul>
<p>SimpleRedisLock</p>
<p>释放锁，防止删除别人的锁</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token constant">KEY_PREFIX</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>修改业务代码</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">seckillVoucher</span><span class="token punctuation">(</span><span class="token class-name">Long</span> voucherId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1、查询优惠券</span>
    <span class="token class-name">SeckillVoucher</span> seckillVoucher <span class="token operator">=</span> seckillVoucherService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 2、判断秒杀是否开始</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isBefore</span><span class="token punctuation">(</span>seckillVoucher<span class="token punctuation">.</span><span class="token function">getBeginTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"秒杀尚未开始！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 3、判断秒杀是否已经结束</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isAfter</span><span class="token punctuation">(</span>seckillVoucher<span class="token punctuation">.</span><span class="token function">getEndTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"秒杀已经结束！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 4、判断库存是否充足</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>seckillVoucher<span class="token punctuation">.</span><span class="token function">getStock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"库存不足！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 5.1.用户id</span>
    <span class="token class-name">Long</span> userId <span class="token operator">=</span> <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 创建 SimpleRedisLock 实例</span>
    <span class="token class-name">SimpleRedisLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleRedisLock</span><span class="token punctuation">(</span><span class="token string">"order:"</span> <span class="token operator">+</span> userId<span class="token punctuation">,</span> redisTemplate<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 尝试获取锁</span>
    <span class="token keyword">boolean</span> isLock <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token number">1200</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 如果获取锁失败，返回错误信息</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isLock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"不允许重复下单"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取代理对象（事务）</span>
        <span class="token class-name">IVoucherOrderService</span> proxy <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">IVoucherOrderService</span><span class="token punctuation">)</span> <span class="token class-name">AopContext</span><span class="token punctuation">.</span><span class="token function">currentProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 调用代理对象的创建代金券订单方法</span>
        <span class="token keyword">return</span> proxy<span class="token punctuation">.</span><span class="token function">createVoucherOrder</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        <span class="token comment">// 释放锁</span>
        lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-4、redis分布式锁误删情况说明" tabindex="-1"><a class="header-anchor" href="#_4-4、redis分布式锁误删情况说明" aria-hidden="true">#</a> 4.4、Redis分布式锁误删情况说明</h3>
<p>逻辑说明：</p>
<p>持有锁的线程在锁的内部出现了阻塞，导致他的锁自动释放，这时其他线程，线程2来尝试获得锁，就拿到了这把锁，然后线程2在持有锁执行过程中，线程1反应过来，继续执行，而线程1执行过程中，走到了删除锁逻辑，此时就会把本应该属于线程2的锁进行删除，这就是误删别人锁的情况说明</p>
<p>解决方案：解决方案就是在每个线程释放锁的时候，去判断一下当前这把锁是否属于自己，如果属于自己，则不进行锁的删除，假设还是上边的情况，线程1卡顿，锁自动释放，线程2进入到锁的内部执行逻辑，此时线程1反应过来，然后删除锁，但是线程1，一看当前这把锁不是属于自己，于是不进行删除锁逻辑，当线程2走到删除锁逻辑时，如果没有卡过自动释放锁的时间点，则判断当前这把锁是属于自己的，于是删除这把锁。</p>
<figure><img src="https://124.71.187.148/images/redis/1653385920025.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_4-5、解决redis分布式锁误删问题" tabindex="-1"><a class="header-anchor" href="#_4-5、解决redis分布式锁误删问题" aria-hidden="true">#</a> 4.5、解决Redis分布式锁误删问题</h3>
<p>需求：修改之前的分布式锁实现，满足：在获取锁时存入线程标示（可以用UUID表示）<br>
在释放锁时先获取锁中的线程标示，判断是否与当前线程标示一致</p>
<ul>
<li>如果一致则释放锁</li>
<li>如果不一致则不释放锁</li>
</ul>
<p>核心逻辑：在存入锁时，放入自己线程的标识，在删除锁时，判断当前这把锁的标识是不是自己存入的，如果是，则进行删除，如果不是，则不进行删除。</p>
<figure><img src="https://124.71.187.148/images/redis/1653387398820.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>具体代码如下：加锁</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">ID_PREFIX</span> <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"-"</span><span class="token punctuation">;</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token keyword">long</span> timeoutSec<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取当前线程的ID。</span>
    <span class="token class-name">String</span> threadId <span class="token operator">=</span> <span class="token constant">ID_PREFIX</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 如果Redis中不存在指定的键，则尝试设置一个值。</span>
    <span class="token class-name">Boolean</span> success <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setIfAbsent</span><span class="token punctuation">(</span><span class="token constant">KEY_PREFIX</span> <span class="token operator">+</span> name<span class="token punctuation">,</span> threadId<span class="token punctuation">,</span> timeoutSec<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 如果成功设置值，则返回true；否则返回false。</span>
    <span class="token keyword">return</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>success<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>释放锁</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取当前线程的ID</span>
    <span class="token class-name">String</span> threadId <span class="token operator">=</span> <span class="token constant">ID_PREFIX</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 获取缓存的ID</span>
    <span class="token class-name">String</span> cacheId <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token constant">KEY_PREFIX</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 如果缓存的ID和当前线程的ID相同，则删除缓存</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>threadId<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>cacheId<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token constant">KEY_PREFIX</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>有关代码实操说明：</strong></p>
<p>在我们修改完此处代码后，我们重启工程，然后启动两个线程，第一个线程持有锁后，手动释放锁，第二个线程 此时进入到锁内部，再放行第一个线程，此时第一个线程由于锁的value值并非是自己，所以不能释放锁，也就无法删除别人的锁，此时第二个线程能够正确释放锁，通过这个案例初步说明我们解决了锁误删的问题。</p>
<h3 id="_4-6、分布式锁的原子性问题" tabindex="-1"><a class="header-anchor" href="#_4-6、分布式锁的原子性问题" aria-hidden="true">#</a> 4.6、分布式锁的原子性问题</h3>
<p>更为极端的误删逻辑说明：</p>
<p>线程1现在持有锁之后，在执行业务逻辑过程中，他正准备删除锁，而且已经走到了条件判断的过程中，比如他已经拿到了当前这把锁确实是属于他自己的，正准备删除锁，但是此时他的锁到期了，那么此时线程2进来，但是线程1他会接着往后执行，当他卡顿结束后，他直接就会执行删除锁那行代码，相当于条件判断并没有起到作用，这就是删锁时的原子性问题，之所以有这个问题，是因为线程1的拿锁，比锁，删锁，实际上并不是原子性的，我们要防止刚才的情况发生，</p>
<figure><img src="https://124.71.187.148/images/redis/1653387764938.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_4-7、lua脚本解决多条命令原子性问题" tabindex="-1"><a class="header-anchor" href="#_4-7、lua脚本解决多条命令原子性问题" aria-hidden="true">#</a> 4.7、Lua脚本解决多条命令原子性问题</h3>
<p>Redis提供了Lua脚本功能，在一个脚本中编写多条Redis命令，确保多条命令执行时的原子性。Lua是一种编程语言，它的基本语法大家可以参考网站：<a href="https://www.runoob.com/lua/lua-tutorial.html" target="_blank" rel="noopener noreferrer">https://www.runoob.com/lua/lua-tutorial.html<ExternalLinkIcon/></a>, 这里重点介绍Redis提供的调用函数，我们可以使用lua去操作redis，又能保证他的原子性，这样就可以实现拿锁、比锁、删锁是一个原子性动作了，作为Java程序员这一块并不作一个简单要求，并不需要大家过于精通， 只需要知道他有什么作用即可。</p>
<p>这里重点介绍Redis提供的调用函数，语法如下：</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'命令名称'</span><span class="token punctuation">,</span> <span class="token string">'key'</span><span class="token punctuation">,</span> <span class="token string">'其它参数'</span><span class="token punctuation">,</span> <span class="token punctuation">...</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如，我们要执行set name jack，则脚本是这样：</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token operator">#</span> 执行 set name jack
redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'set'</span><span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token string">'jack'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，我们要先执行set name Rose，再执行get name，则脚本如下：</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token operator">#</span> 先执行 set name jack
redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'set'</span><span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token string">'Rose'</span><span class="token punctuation">)</span>
<span class="token operator">#</span> 再执行 get name
<span class="token keyword">local</span> name <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'get'</span><span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">)</span>
<span class="token operator">#</span> 返回
<span class="token keyword">return</span> name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写好脚本以后，需要用Redis命令来调用脚本，调用脚本的常见命令如下：</p>
<figure><img src="https://124.71.187.148/images/redis/1653392181413.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>例如，我们要执行 redis.call('set', 'name', 'jack') 这个脚本，语法如下：</p>
<figure><img src="https://124.71.187.148/images/redis/1653392218531.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>如果脚本中的key、value不想写死，可以作为参数传递。key类型参数会放入KEYS数组，其它参数会放入ARGV数组，在脚本中可以从KEYS和ARGV数组获取这些参数：</p>
<figure><img src="https://124.71.187.148/images/redis/1653392438917.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>接下来我们来回一下我们释放锁的逻辑：</p>
<p>释放锁的业务流程是这样的</p>
<pre><code>1、获取锁中的线程标示

2、判断是否与指定的标示（当前线程标示）一致

3、如果一致则释放锁（删除）

4、如果不一致则什么都不做
</code></pre>
<p>如果用Lua脚本来表示则是这样的：</p>
<p>最终我们操作redis的拿锁比锁删锁的lua脚本就会变成这样</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token comment">-- 这里的 KEYS[1] 就是锁的key，这里的ARGV[1] 就是当前线程标示</span>
<span class="token comment">-- 获取锁中的标示，判断是否与当前线程标示一致</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'GET'</span><span class="token punctuation">,</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">==</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">then</span>
  <span class="token comment">-- 一致，则删除锁</span>
  <span class="token keyword">return</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'DEL'</span><span class="token punctuation">,</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">end</span>
<span class="token comment">-- 不一致，则直接返回</span>
<span class="token keyword">return</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-8、利用java代码调用lua脚本改造分布式锁" tabindex="-1"><a class="header-anchor" href="#_4-8、利用java代码调用lua脚本改造分布式锁" aria-hidden="true">#</a> 4.8、利用Java代码调用Lua脚本改造分布式锁</h3>
<p>lua脚本本身并不需要大家花费太多时间去研究，只需要知道如何调用，大致是什么意思即可，所以在笔记中并不会详细的去解释这些lua表达式的含义。</p>
<p>我们的RedisTemplate中，可以利用execute方法去执行lua脚本，参数对应关系就如下图股</p>
<figure><img src="https://124.71.187.148/images/redis/1653393304844.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>Java代码</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">DefaultRedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> <span class="token constant">UNLOCK_SCRIPT</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        <span class="token constant">UNLOCK_SCRIPT</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultRedisScript</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">UNLOCK_SCRIPT</span><span class="token punctuation">.</span><span class="token function">setLocation</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ClassPathResource</span><span class="token punctuation">(</span><span class="token string">"unlock.lua"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token constant">UNLOCK_SCRIPT</span><span class="token punctuation">.</span><span class="token function">setResultType</span><span class="token punctuation">(</span><span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 调用lua脚本</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>
            <span class="token constant">UNLOCK_SCRIPT</span><span class="token punctuation">,</span>
            <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">singletonList</span><span class="token punctuation">(</span><span class="token constant">KEY_PREFIX</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token constant">ID_PREFIX</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>经过以上代码改造后，我们就能够实现 拿锁比锁删锁的原子性动作了~</p>
<p>小总结：</p>
<p>基于Redis的分布式锁实现思路：</p>
<ul>
<li>利用set nx ex获取锁，并设置过期时间，保存线程标示</li>
<li>释放锁时先判断线程标示是否与自己一致，一致则删除锁
<ul>
<li>特性：
<ul>
<li>利用set nx满足互斥性</li>
<li>利用set ex保证故障时锁依然能释放，避免死锁，提高安全性</li>
<li>利用Redis集群保证高可用和高并发特性</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>笔者总结：我们一路走来，利用添加过期时间，防止死锁问题的发生，但是有了过期时间之后，可能出现误删别人锁的问题，这个问题我们开始是利用删之前 通过拿锁，比锁，删锁这个逻辑来解决的，也就是删之前判断一下当前这把锁是否是属于自己的，但是现在还有原子性问题，也就是我们没法保证拿锁比锁删锁是一个原子性的动作，最后通过lua表达式来解决这个问题</p>
<p>但是目前还剩下一个问题锁不住，什么是锁不住呢，你想一想，如果当过期时间到了之后，我们可以给他续期一下，比如续个 30s，就好像是网吧上网， 网费到了之后，然后说，来，网管，再给我来10块的，是不是后边的问题都不会发生了，那么续期问题怎么解决呢，可以依赖于我们接下来要学习redission啦</p>
<p><strong>测试逻辑：</strong></p>
<p>第一个线程进来，得到了锁，手动删除锁，模拟锁超时了，其他线程会执行 lua 来抢锁，当第一天线程利用lua删除锁时，lua能保证他不能删除他的锁，第二个线程删除锁时，利用lua同样可以保证不会删除别人的锁，同时还能保证原子性。</p>
<h2 id="_5、分布式锁-redisson" tabindex="-1"><a class="header-anchor" href="#_5、分布式锁-redisson" aria-hidden="true">#</a> 5、分布式锁-Redisson</h2>
<h3 id="_5-1、分布式锁-redisson-功能介绍" tabindex="-1"><a class="header-anchor" href="#_5-1、分布式锁-redisson-功能介绍" aria-hidden="true">#</a> 5.1、分布式锁-Redisson 功能介绍</h3>
<p>基于 setnx 实现的分布式锁存在下面的问题：</p>
<p><strong>重入问题</strong>：重入问题是指获得锁的线程可以再次进入到相同的锁的代码块中，可重入锁的意义在于防止死锁，比如 HashTable 这样的代码中，他的方法都是使用 synchronized 修饰的，假如他在一个方法内，调用另一个方法，那么此时如果是不可重入的，不就死锁了吗？所以可重入锁他的主要意义是防止死锁，我们的 synchronized 和 Lock 锁都是可重入的。</p>
<p><strong>不可重试</strong>：是指目前的分布式获取锁只能尝试一次，我们认为合理的情况是：当线程在获得锁失败后，他应该能再次尝试获得锁。</p>
<p><strong>超时释放：</strong> 我们在加锁时增加了过期时间，这样的我们可以防止死锁，但是如果卡顿的时间超长，虽然我们采用了 lua 表达式防止删锁的时候，误删别人的锁，但是毕竟没有锁住，有安全隐患</p>
<p><strong>主从一致性：</strong> 如果 Redis 提供了主从集群，当我们向集群写数据时，主机需要异步的将数据同步给从机，而万一在同步过去之前，主机宕机了，就会出现死锁问题。</p>
<figure><img src="https://124.71.187.148/images/redis/1653546070602.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>那么什么是 Redisson 呢</p>
<p>Redisson 是一个在 Redis 的基础上实现的Java驻内存数据网格（In-Memory Data Grid）。它不仅提供了一系列的分布式的 Java 常用对象，还提供了许多分布式服务，其中就包含了各种分布式锁的实现。</p>
<p>Redisson 提供了分布式锁的多种多样的功能</p>
<figure><img src="https://124.71.187.148/images/redis/1653546736063.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_5-2、分布式锁-redisson-快速入门" tabindex="-1"><a class="header-anchor" href="#_5-2、分布式锁-redisson-快速入门" aria-hidden="true">#</a> 5.2、分布式锁-Redisson 快速入门</h3>
<p>引入依赖：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token generics"><span class="token punctuation">&lt;</span>dependency<span class="token punctuation">></span></span>
	<span class="token generics"><span class="token punctuation">&lt;</span>groupId<span class="token punctuation">></span></span>org<span class="token punctuation">.</span>redisson<span class="token operator">&lt;</span><span class="token operator">/</span>groupId<span class="token operator">></span>
	<span class="token generics"><span class="token punctuation">&lt;</span>artifactId<span class="token punctuation">></span></span>redisson<span class="token operator">&lt;</span><span class="token operator">/</span>artifactId<span class="token operator">></span>
	<span class="token generics"><span class="token punctuation">&lt;</span>version<span class="token punctuation">></span></span><span class="token number">3.13</span><span class="token number">.6</span><span class="token operator">&lt;</span><span class="token operator">/</span>version<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>dependency<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置 Redisson 客户端：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedissonConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RedissonClient</span> <span class="token function">redissonClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 配置</span>
        <span class="token class-name">Config</span> config <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Config</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        config<span class="token punctuation">.</span><span class="token function">useSingleServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">setAddress</span><span class="token punctuation">(</span><span class="token string">"redis://192.168.150.101:6379"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">"123321"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建RedissonClient对象</span>
        <span class="token keyword">return</span> <span class="token class-name">Redisson</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如何使用 Redisson 的分布式锁</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Resource</span>
<span class="token keyword">private</span> <span class="token class-name">RedissionClient</span> redissonClient<span class="token punctuation">;</span>

<span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">testRedisson</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">{</span>
    <span class="token comment">//获取锁(可重入)，指定锁的名称</span>
    <span class="token class-name">RLock</span> lock <span class="token operator">=</span> redissonClient<span class="token punctuation">.</span><span class="token function">getLock</span><span class="token punctuation">(</span><span class="token string">"anyLock"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//尝试获取锁，参数分别是：获取锁的最大等待时间(期间会重试)，锁自动释放时间，时间单位</span>
    <span class="token keyword">boolean</span> isLock <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//判断获取锁成功</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>isLock<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">try</span><span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"执行业务"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>          
        <span class="token punctuation">}</span><span class="token keyword">finally</span><span class="token punctuation">{</span>
            <span class="token comment">//释放锁</span>
            lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span>

    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 VoucherOrderServiceImpl</p>
<p>注入RedissonClient</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Resource</span>
<span class="token keyword">private</span> <span class="token class-name">RedissonClient</span> redissonClient<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">seckillVoucher</span><span class="token punctuation">(</span><span class="token class-name">Long</span> voucherId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 1、查询优惠券</span>
        <span class="token class-name">SeckillVoucher</span> seckillVoucher <span class="token operator">=</span> seckillVoucherService<span class="token punctuation">.</span><span class="token function">getById</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 2、判断秒杀是否开始</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isBefore</span><span class="token punctuation">(</span>seckillVoucher<span class="token punctuation">.</span><span class="token function">getBeginTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"秒杀尚未开始！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 3、判断秒杀是否已经结束</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">LocalDateTime</span><span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isAfter</span><span class="token punctuation">(</span>seckillVoucher<span class="token punctuation">.</span><span class="token function">getEndTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"秒杀已经结束！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 4、判断库存是否充足</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>seckillVoucher<span class="token punctuation">.</span><span class="token function">getStock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"库存不足！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 5.1.用户id</span>
        <span class="token class-name">Long</span> userId <span class="token operator">=</span> <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 创建 SimpleRedisLock 实例</span>
        <span class="token comment">// SimpleRedisLock lock = new SimpleRedisLock("order:" + userId, redisTemplate);</span>
        <span class="token class-name">RLock</span> lock <span class="token operator">=</span> redissonClient<span class="token punctuation">.</span><span class="token function">getLock</span><span class="token punctuation">(</span><span class="token string">"lock:order:"</span> <span class="token operator">+</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 尝试获取锁</span>
        <span class="token keyword">boolean</span> isLock <span class="token operator">=</span> lock<span class="token punctuation">.</span><span class="token function">tryLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 如果获取锁失败，返回错误信息</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isLock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"不允许重复下单"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 获取代理对象（事务）</span>
            <span class="token class-name">IVoucherOrderService</span> proxy <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">IVoucherOrderService</span><span class="token punctuation">)</span> <span class="token class-name">AopContext</span><span class="token punctuation">.</span><span class="token function">currentProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 调用代理对象的创建代金券订单方法</span>
            <span class="token keyword">return</span> proxy<span class="token punctuation">.</span><span class="token function">createVoucherOrder</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 释放锁</span>
            lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-3、分布式锁-redisson-可重入锁原理" tabindex="-1"><a class="header-anchor" href="#_5-3、分布式锁-redisson-可重入锁原理" aria-hidden="true">#</a> 5.3、分布式锁-Redisson 可重入锁原理</h3>
<p>在 Lock 锁中，他是借助于底层的一个 volatile 的一个state变量来记录重入的状态的，比如当前没有人持有这把锁，那么 state=0，假如有人持有这把锁，那么 state=1，如果持有这把锁的人再次持有这把锁，那么 state 就会 +1 ，如果是对于 synchronized 而言，他在 c 语言代码中会有一个 count，原理和 state 类似，也是重入一次就加一，释放一次就 -1 ，直到减少成 0 时，表示当前这把锁没有被人持有。</p>
<p>在 Redisson 中，我们的也支持支持可重入锁。</p>
<p>在分布式锁中，他采用 hash 结构用来存储锁，其中大 key 表示表示这把锁是否存在，用小 key 表示当前这把锁被哪个线程持有。接下来我们一起分析一下当前的这个 lua 表达式</p>
<figure><img src="https://124.71.187.148/images/redis/202310091402000001.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>下面的 lua 脚本一共有3个参数：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>KEYS[1]：锁名称
ARGV[1]：线程唯一标识
ARGV[2]：锁失效时间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token comment">-- 判断是否存在</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'exists'</span><span class="token punctuation">,</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">then</span>
    <span class="token comment">-- 不存在，则创建并获取锁</span>
    redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'hset'</span><span class="token punctuation">,</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">-- 设置有效期</span>
    redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'pexpire'</span><span class="token punctuation">,</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> ARGV<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">-- 返回结果</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token comment">-- 锁已经存在，判断threadId是否是自己</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'hexists'</span><span class="token punctuation">,</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">then</span>
    <span class="token comment">-- threadId是自己，获取锁，重入次数 +1</span>
    redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'hincrby'</span><span class="token punctuation">,</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">-- 设置有效期</span>
    redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'pexpire'</span><span class="token punctuation">,</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> ARGV<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">-- 返回结果</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token comment">-- 代码走到这里，说明锁的不是自己，获取锁失败</span>
<span class="token keyword">return</span> <span class="token number">0</span>；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token comment">-- 判断当前锁是否还是被自己所持有</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'HEXISTS'</span><span class="token punctuation">,</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">then</span>
    <span class="token keyword">return</span> <span class="token keyword">nil</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
<span class="token comment">-- 是自己的锁，则重入次数-1</span>
<span class="token keyword">local</span> count <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'HINCRBY'</span><span class="token punctuation">,</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 判断重入次数是否已经为0</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">then</span>
    <span class="token comment">-- 大于0说明不能释放锁，重置有效期然后返回</span>
    redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'EXPIRE'</span><span class="token punctuation">,</span> KEYS<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> ARGV<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">nil</span><span class="token punctuation">;</span>
<span class="token keyword">else</span>
    <span class="token comment">-- 等于0说明可以释放锁，直接删除</span>
    redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'DEL'</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">nil</span><span class="token punctuation">;</span>
<span class="token keyword">end</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://124.71.187.148/images/redis/202310091402000002.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_5-4、分布式锁-redisson-锁重试和-watchdog-机制" tabindex="-1"><a class="header-anchor" href="#_5-4、分布式锁-redisson-锁重试和-watchdog-机制" aria-hidden="true">#</a> 5.4、分布式锁-Redisson 锁重试和 WatchDog 机制</h3>
<figure><img src="https://124.71.187.148/images/redis/202310091520000001.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>说明</strong>：由于课程中已经说明了有关 tryLock 的源码解析以及其看门狗原理，所以笔者在这里给大家分析 lock() 方法的源码解析，希望大家在学习过程中，能够掌握更多的知识</p>
<p>抢锁过程中，获得当前线程，通过 tryAcquire 进行抢锁，该抢锁逻辑和之前逻辑相同</p>
<p>1、先判断当前这把锁是否存在，如果不存在，插入一把锁，返回 null</p>
<p>2、判断当前这把锁是否是属于当前线程，如果是，则返回 null</p>
<p>所以如果返回是 null，则代表着当前这哥们已经抢锁完毕，或者可重入完毕，但是如果以上两个条件都不满足，则进入到第三个条件，返回的是锁的失效时间，同学们可以自行往下翻一点点，你能发现有个 while(true) 再次进行 tryAcquire 进行抢锁</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">long</span> threadId <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Long</span> ttl <span class="token operator">=</span> <span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> leaseTime<span class="token punctuation">,</span> unit<span class="token punctuation">,</span> threadId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// lock acquired</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>ttl <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来会有一个条件分支，因为 lock 方法有重载方法，一个是带参数，一个是不带参数，如果带带参数传入的值是-1，如果传入参数，则 leaseTime 是他本身，所以如果传入了参数，此时 leaseTime != -1 则会进去抢锁，抢锁的逻辑就是之前说的那三个逻辑</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>leaseTime <span class="token operator">!=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">tryLockInnerAsync</span><span class="token punctuation">(</span>waitTime<span class="token punctuation">,</span> leaseTime<span class="token punctuation">,</span> unit<span class="token punctuation">,</span> threadId<span class="token punctuation">,</span> <span class="token class-name">RedisCommands</span><span class="token punctuation">.</span><span class="token constant">EVAL_LONG</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果是没有传入时间，则此时也会进行抢锁， 而且抢锁时间是默认看门狗时间 commandExecutor.getConnectionManager().getCfg().getLockWatchdogTimeout()</p>
<p>ttlRemainingFuture.onComplete((ttlRemaining, e) 这句话相当于对以上抢锁进行了监听，也就是说当上边抢锁完毕后，此方法会被调用，具体调用的逻辑就是去后台开启一个线程，进行续约逻辑，也就是看门狗线程</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">RFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">></span></span> ttlRemainingFuture <span class="token operator">=</span> <span class="token function">tryLockInnerAsync</span><span class="token punctuation">(</span>waitTime<span class="token punctuation">,</span>
                                        commandExecutor<span class="token punctuation">.</span><span class="token function">getConnectionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getCfg</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getLockWatchdogTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                                        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">,</span> threadId<span class="token punctuation">,</span> <span class="token class-name">RedisCommands</span><span class="token punctuation">.</span><span class="token constant">EVAL_LONG</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
ttlRemainingFuture<span class="token punctuation">.</span><span class="token function">onComplete</span><span class="token punctuation">(</span><span class="token punctuation">(</span>ttlRemaining<span class="token punctuation">,</span> e<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// lock acquired</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ttlRemaining <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">scheduleExpirationRenewal</span><span class="token punctuation">(</span>threadId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">return</span> ttlRemainingFuture<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此逻辑就是续约逻辑，注意看commandExecutor.getConnectionManager().newTimeout（） 此方法</p>
<p>Method(  <strong>new</strong> TimerTask() {},参数2 ，参数3  )</p>
<p>指的是：通过参数2，参数3 去描述什么时候去做参数1的事情，现在的情况是：10s之后去做参数一的事情</p>
<p>因为锁的失效时间是30s，当10s之后，此时这个timeTask 就触发了，他就去进行续约，把当前这把锁续约成30s，如果操作成功，那么此时就会递归调用自己，再重新设置一个timeTask()，于是再过10s后又再设置一个timerTask，完成不停的续约</p>
<p>那么大家可以想一想，假设我们的线程出现了宕机他还会续约吗？当然不会，因为没有人再去调用renewExpiration这个方法，所以等到时间之后自然就释放了。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">renewExpiration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ExpirationEntry</span> ee <span class="token operator">=</span> <span class="token constant">EXPIRATION_RENEWAL_MAP</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token function">getEntryName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ee <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token class-name">Timeout</span> task <span class="token operator">=</span> commandExecutor<span class="token punctuation">.</span><span class="token function">getConnectionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">newTimeout</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">TimerTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">Timeout</span> timeout<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
            <span class="token class-name">ExpirationEntry</span> ent <span class="token operator">=</span> <span class="token constant">EXPIRATION_RENEWAL_MAP</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token function">getEntryName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ent <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token class-name">Long</span> threadId <span class="token operator">=</span> ent<span class="token punctuation">.</span><span class="token function">getFirstThreadId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>threadId <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            
            <span class="token class-name">RFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Boolean</span><span class="token punctuation">></span></span> future <span class="token operator">=</span> <span class="token function">renewExpirationAsync</span><span class="token punctuation">(</span>threadId<span class="token punctuation">)</span><span class="token punctuation">;</span>
            future<span class="token punctuation">.</span><span class="token function">onComplete</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> e<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>e <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"Can't update lock "</span> <span class="token operator">+</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">" expiration"</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                
                <span class="token keyword">if</span> <span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// reschedule itself</span>
                    <span class="token function">renewExpiration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> internalLockLeaseTime <span class="token operator">/</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MILLISECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    ee<span class="token punctuation">.</span><span class="token function">setTimeout</span><span class="token punctuation">(</span>task<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-5、分布式锁-redission锁的mutilock原理" tabindex="-1"><a class="header-anchor" href="#_5-5、分布式锁-redission锁的mutilock原理" aria-hidden="true">#</a> 5.5、分布式锁-redission锁的MutiLock原理</h3>
<p>为了提高redis的可用性，我们会搭建集群或者主从，现在以主从为例</p>
<p>此时我们去写命令，写在主机上， 主机会将数据同步给从机，但是假设在主机还没有来得及把数据写入到从机去的时候，此时主机宕机，哨兵会发现主机宕机，并且选举一个slave变成master，而此时新的master中实际上并没有锁信息，此时锁信息就已经丢掉了。</p>
<figure><img src="https://124.71.187.148/images/redis/1653553998403.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>为了解决这个问题，redission提出来了MutiLock锁，使用这把锁咱们就不使用主从了，每个节点的地位都是一样的， 这把锁加锁的逻辑需要写入到每一个主丛节点上，只有所有的服务器都写入成功，此时才是加锁成功，假设现在某个节点挂了，那么他去获得锁的时候，只要有一个节点拿不到，都不能算是加锁成功，就保证了加锁的可靠性。</p>
<figure><img src="https://124.71.187.148/images/redis/1653554055048.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>那么MutiLock 加锁原理是什么呢？笔者画了一幅图来说明</p>
<p>当我们去设置了多个锁时，redission会将多个锁添加到一个集合中，然后用while循环去不停去尝试拿锁，但是会有一个总共的加锁时间，这个时间是用需要加锁的个数 * 1500ms ，假设有3个锁，那么时间就是4500ms，假设在这4500ms内，所有的锁都加锁成功， 那么此时才算是加锁成功，如果在4500ms有线程加锁失败，则会再次去进行重试.</p>
<figure><img src="https://124.71.187.148/images/redis/1653553093967.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="_6、秒杀优化" tabindex="-1"><a class="header-anchor" href="#_6、秒杀优化" aria-hidden="true">#</a> 6、秒杀优化</h2>
<h3 id="_6-1、秒杀优化-异步秒杀思路" tabindex="-1"><a class="header-anchor" href="#_6-1、秒杀优化-异步秒杀思路" aria-hidden="true">#</a> 6.1、秒杀优化-异步秒杀思路</h3>
<p>我们来回顾一下下单流程</p>
<p>当用户发起请求，此时会请求 nginx，nginx 会访问到 tomcat，而 tomcat 中的程序，会进行串行操作，分成如下几个步骤</p>
<pre><code>1、查询优惠券

2、判断秒杀库存是否足够

3、查询订单

4、校验是否是一人一单

5、扣减库存

6、创建订单
</code></pre>
<p>在这六步操作中，又有很多操作是要去操作数据库的，而且还是一个线程串行执行， 这样就会导致我们的程序执行得很慢，所以我们需要异步程序执行，那么如何加速呢？</p>
<p>在这里笔者想给大家分享一下课程内没有的思路，看看有没有小伙伴这么想，比如，我们可以不可以使用异步编排来做，或者说我开启N多线程，N多个线程，一个线程执行查询优惠卷，一个执行判断扣减库存，一个去创建订单等等，然后再统一做返回，这种做法和课程中有哪种好呢？答案是课程中的好，因为如果你采用我刚说的方式，如果访问的人很多，那么线程池中的线程可能一下子就被消耗完了，而且你使用上述方案，最大的特点在于，你觉得时效性会非常重要，但是你想想是吗？并不是，比如我只要确定他能做这件事，然后我后边慢慢做就可以了，我并不需要他一口气做完这件事，所以我们应当采用的是课程中，类似消息队列的方式来完成我们的需求，而不是使用线程池或者是异步编排的方式来完成这个需求</p>
<figure><img src="https://124.71.187.148/images/redis/1653560986599.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>优化方案：我们将耗时比较短的逻辑判断放入到 redis 中，比如是否库存足够，比如是否一人一单，这样的操作，只要这种逻辑可以完成，就意味着我们是一定可以下单完成的，我们只需要进行快速的逻辑判断，根本就不用等下单逻辑走完，我们直接给用户返回成功， 再在后台开一个线程，后台线程慢慢的去执行queue里边的消息，这样程序不就超级快了吗？而且也不用担心线程池消耗殆尽的问题，因为这里我们的程序中并没有手动使用任何线程池，当然这里边有两个难点</p>
<p>第一个难点是我们怎么在 redis 中去快速校验一人一单，还有库存判断</p>
<p>第二个难点是由于我们校验和 tomcat 下单是两个线程，那么我们如何知道到底哪个单他最后是否成功，或者是下单完成，为了完成这件事我们在 redis 操作完之后，我们会将一些信息返回给前端，同时也会把这些信息丢到异步 queue 中去，后续操作中，可以通过这个 id 来查询我们 tomcat 中的下单逻辑是否完成了。</p>
<figure><img src="https://124.71.187.148/images/redis/1653561657295.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>我们现在来看看整体思路：当用户下单之后，判断库存是否充足只需要导 redis 中去根据 key 找对应的 value 是否大于 0 即可，如果不充足，则直接结束，如果充足，继续在 redis 中判断用户是否可以下单，如果 set 集合中没有这条数据，说明他可以下单，如果 set 集合中没有这条记录，则将 userId 和优惠卷存入到 redis 中，并且返回 0，整个过程需要保证是原子性的，我们可以使用 lua 来操作</p>
<p>当以上判断逻辑走完之后，我们可以判断当前 redis 中返回的结果是否是 0 ，如果是 0，则表示可以下单，则将之前说的信息存入到到 queue 中去，然后返回，然后再来个线程异步的下单，前端可以通过返回的订单 id 来判断是否下单成功。</p>
<figure><img src="https://124.71.187.148/images/redis/1653562234886.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_6-2-秒杀优化-redis-完成秒杀资格判断" tabindex="-1"><a class="header-anchor" href="#_6-2-秒杀优化-redis-完成秒杀资格判断" aria-hidden="true">#</a> 6.2 秒杀优化-Redis 完成秒杀资格判断</h3>
<p>需求：</p>
<ul>
<li>
<p>新增秒杀优惠券的同时，将优惠券信息保存到Redis中</p>
</li>
<li>
<p>基于 Lua 脚本，判断秒杀库存、一人一单，决定用户是否抢购成功</p>
</li>
<li>
<p>如果抢购成功，将优惠券id和用户id封装后存入阻塞队列</p>
</li>
<li>
<p>开启线程任务，不断从阻塞队列中获取信息，实现异步下单功能</p>
</li>
</ul>
<figure><img src="https://124.71.187.148/images/redis/1656080546603.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>VoucherServiceImpl</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addSeckillVoucher</span><span class="token punctuation">(</span><span class="token class-name">Voucher</span> voucher<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 保存优惠券</span>
    <span class="token function">save</span><span class="token punctuation">(</span>voucher<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 保存秒杀信息</span>
    <span class="token class-name">SeckillVoucher</span> seckillVoucher <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SeckillVoucher</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    seckillVoucher<span class="token punctuation">.</span><span class="token function">setVoucherId</span><span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    seckillVoucher<span class="token punctuation">.</span><span class="token function">setStock</span><span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getStock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    seckillVoucher<span class="token punctuation">.</span><span class="token function">setBeginTime</span><span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getBeginTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    seckillVoucher<span class="token punctuation">.</span><span class="token function">setEndTime</span><span class="token punctuation">(</span>voucher<span class="token punctuation">.</span><span class="token function">getEndTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    seckillVoucherService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>seckillVoucher<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 保存秒杀库存到Redis中</span>
    <span class="token comment">//SECKILL_STOCK_KEY 这个变量定义在RedisConstans中</span>
    <span class="token comment">//private static final String SECKILL_STOCK_KEY ="seckill:stock:"</span>
    stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token constant">SECKILL_STOCK_KEY</span> <span class="token operator">+</span> voucher<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> voucher<span class="token punctuation">.</span><span class="token function">getStock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完整 lua 表达式</p>
<div class="language-lua line-numbers-mode" data-ext="lua"><pre v-pre class="language-lua"><code><span class="token comment">-- 1.参数列表</span>
<span class="token comment">-- 1.1.优惠券id</span>
<span class="token keyword">local</span> voucherId <span class="token operator">=</span> ARGV<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>
<span class="token comment">-- 1.2.用户id</span>
<span class="token keyword">local</span> userId <span class="token operator">=</span> ARGV<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
<span class="token comment">-- 1.3.订单id</span>
<span class="token keyword">local</span> orderId <span class="token operator">=</span> ARGV<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span>

<span class="token comment">-- 2.数据key</span>
<span class="token comment">-- 2.1.库存key</span>
<span class="token keyword">local</span> stockKey <span class="token operator">=</span> <span class="token string">'seckill:stock:'</span> <span class="token operator">..</span> voucherId
<span class="token comment">-- 2.2.订单key</span>
<span class="token keyword">local</span> orderKey <span class="token operator">=</span> <span class="token string">'seckill:order:'</span> <span class="token operator">..</span> voucherId

<span class="token comment">-- 3.脚本业务</span>
<span class="token comment">-- 3.1.判断库存是否充足 get stockKey</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">tonumber</span><span class="token punctuation">(</span>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'get'</span><span class="token punctuation">,</span> stockKey<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">then</span>
    <span class="token comment">-- 3.2.库存不足，返回1</span>
    <span class="token keyword">return</span> <span class="token number">1</span>
<span class="token keyword">end</span>
<span class="token comment">-- 3.2.判断用户是否下单 SISMEMBER orderKey userId</span>
<span class="token keyword">if</span><span class="token punctuation">(</span>redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'sismember'</span><span class="token punctuation">,</span> orderKey<span class="token punctuation">,</span> userId<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">then</span>
    <span class="token comment">-- 3.3.存在，说明是重复下单，返回2</span>
    <span class="token keyword">return</span> <span class="token number">2</span>
<span class="token keyword">end</span>
<span class="token comment">-- 3.4.扣库存 incrby stockKey -1</span>
redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'incrby'</span><span class="token punctuation">,</span> stockKey<span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token comment">-- 3.5.下单（保存用户）sadd orderKey userId</span>
redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'sadd'</span><span class="token punctuation">,</span> orderKey<span class="token punctuation">,</span> userId<span class="token punctuation">)</span>
<span class="token comment">-- 3.6.发送消息到队列中， XADD stream.orders * k1 v1 k2 v2 ...</span>
redis<span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token string">'xadd'</span><span class="token punctuation">,</span> <span class="token string">'stream.orders'</span><span class="token punctuation">,</span> <span class="token string">'*'</span><span class="token punctuation">,</span> <span class="token string">'userId'</span><span class="token punctuation">,</span> userId<span class="token punctuation">,</span> <span class="token string">'voucherId'</span><span class="token punctuation">,</span> voucherId<span class="token punctuation">,</span> <span class="token string">'id'</span><span class="token punctuation">,</span> orderId<span class="token punctuation">)</span>
<span class="token keyword">return</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当以上 lua 表达式执行完毕后，剩下的就是根据步骤3,4来执行我们接下来的任务了</p>
<p>VoucherOrderServiceImpl</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">seckillVoucher</span><span class="token punctuation">(</span><span class="token class-name">Long</span> voucherId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//获取用户</span>
    <span class="token class-name">Long</span> userId <span class="token operator">=</span> <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> orderId <span class="token operator">=</span> redisIdWorker<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token string">"order"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 1.执行lua脚本</span>
    <span class="token class-name">Long</span> result <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>
            <span class="token constant">SECKILL_SCRIPT</span><span class="token punctuation">,</span>
            <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            voucherId<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> userId<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> r <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 2.判断结果是否为0</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>r <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 2.1.不为0 ，代表没有购买资格</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span>r <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">?</span> <span class="token string">"库存不足"</span> <span class="token operator">:</span> <span class="token string">"不能重复下单"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//TODO 保存阻塞队列</span>
    <span class="token comment">// 3.返回订单id</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-3-秒杀优化-基于阻塞队列实现秒杀优化" tabindex="-1"><a class="header-anchor" href="#_6-3-秒杀优化-基于阻塞队列实现秒杀优化" aria-hidden="true">#</a> 6.3 秒杀优化-基于阻塞队列实现秒杀优化</h3>
<p>VoucherOrderServiceImpl</p>
<p>修改下单动作，现在我们去下单时，是通过 lua 表达式去原子执行判断逻辑，如果判断我出来不为 0 ，则要么是库存不足，要么是重复下单，返回错误信息，如果是 0，则把下单的逻辑保存到队列中去，然后异步执行</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//异步处理线程池</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ExecutorService</span> <span class="token constant">SECKILL_ORDER_EXECUTOR</span> <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newSingleThreadExecutor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//在类初始化之后执行，因为当这个类初始化好了之后，随时都是有可能要执行的</span>
<span class="token annotation punctuation">@PostConstruct</span>
<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token constant">SECKILL_ORDER_EXECUTOR</span><span class="token punctuation">.</span><span class="token function">submit</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">VoucherOrderHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 用于线程池处理的任务</span>
<span class="token comment">// 当初始化完毕后，就会去从对列中去拿信息</span>
 <span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">VoucherOrderHandler</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span><span class="token punctuation">{</span>

        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 1.获取队列中的订单信息</span>
                    <span class="token class-name">VoucherOrder</span> voucherOrder <span class="token operator">=</span> orderTasks<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token comment">// 2.创建订单</span>
                    <span class="token function">handleVoucherOrder</span><span class="token punctuation">(</span>voucherOrder<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"处理订单异常"</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
          	 <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
     
       <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">handleVoucherOrder</span><span class="token punctuation">(</span><span class="token class-name">VoucherOrder</span> voucherOrder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//1.获取用户</span>
            <span class="token class-name">Long</span> userId <span class="token operator">=</span> voucherOrder<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 2.创建锁对象</span>
            <span class="token class-name">RLock</span> redisLock <span class="token operator">=</span> redissonClient<span class="token punctuation">.</span><span class="token function">getLock</span><span class="token punctuation">(</span><span class="token string">"lock:order:"</span> <span class="token operator">+</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 3.尝试获取锁</span>
            <span class="token keyword">boolean</span> isLock <span class="token operator">=</span> redisLock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 4.判断是否获得锁成功</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isLock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 获取锁失败，直接返回失败或者重试</span>
                log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"不允许重复下单！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
				<span class="token comment">//注意：由于是spring的事务是放在threadLocal中，此时的是多线程，事务会失效</span>
                proxy<span class="token punctuation">.</span><span class="token function">createVoucherOrder</span><span class="token punctuation">(</span>voucherOrder<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                <span class="token comment">// 释放锁</span>
                redisLock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
     <span class="token comment">//a</span>
	<span class="token keyword">private</span> <span class="token class-name">BlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">VoucherOrder</span><span class="token punctuation">></span></span> orderTasks <span class="token operator">=</span><span class="token keyword">new</span>  <span class="token class-name">ArrayBlockingQueue</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">seckillVoucher</span><span class="token punctuation">(</span><span class="token class-name">Long</span> voucherId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Long</span> userId <span class="token operator">=</span> <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">long</span> orderId <span class="token operator">=</span> redisIdWorker<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token string">"order"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 1.执行lua脚本</span>
        <span class="token class-name">Long</span> result <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>
                <span class="token constant">SECKILL_SCRIPT</span><span class="token punctuation">,</span>
                <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                voucherId<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> userId<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> r <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2.判断结果是否为0</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>r <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 2.1.不为0 ，代表没有购买资格</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span>r <span class="token operator">==</span> <span class="token number">1</span> <span class="token operator">?</span> <span class="token string">"库存不足"</span> <span class="token operator">:</span> <span class="token string">"不能重复下单"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">VoucherOrder</span> voucherOrder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VoucherOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2.3.订单id</span>
        <span class="token keyword">long</span> orderId <span class="token operator">=</span> redisIdWorker<span class="token punctuation">.</span><span class="token function">nextId</span><span class="token punctuation">(</span><span class="token string">"order"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        voucherOrder<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2.4.用户id</span>
        voucherOrder<span class="token punctuation">.</span><span class="token function">setUserId</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2.5.代金券id</span>
        voucherOrder<span class="token punctuation">.</span><span class="token function">setVoucherId</span><span class="token punctuation">(</span>voucherId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2.6.放入阻塞队列</span>
        orderTasks<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>voucherOrder<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//3.获取代理对象</span>
         proxy <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">IVoucherOrderService</span><span class="token punctuation">)</span><span class="token class-name">AopContext</span><span class="token punctuation">.</span><span class="token function">currentProxy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//4.返回订单id</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>orderId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
     
      <span class="token annotation punctuation">@Transactional</span>
    <span class="token keyword">public</span>  <span class="token keyword">void</span> <span class="token function">createVoucherOrder</span><span class="token punctuation">(</span><span class="token class-name">VoucherOrder</span> voucherOrder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Long</span> userId <span class="token operator">=</span> voucherOrder<span class="token punctuation">.</span><span class="token function">getUserId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 5.1.查询订单</span>
        <span class="token keyword">int</span> count <span class="token operator">=</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"user_id"</span><span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"voucher_id"</span><span class="token punctuation">,</span> voucherOrder<span class="token punctuation">.</span><span class="token function">getVoucherId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 5.2.判断是否存在</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>count <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 用户已经购买过了</span>
           log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"用户已经购买过了"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
           <span class="token keyword">return</span> <span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 6.扣减库存</span>
        <span class="token keyword">boolean</span> success <span class="token operator">=</span> seckillVoucherService<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">setSql</span><span class="token punctuation">(</span><span class="token string">"stock = stock - 1"</span><span class="token punctuation">)</span> <span class="token comment">// set stock = stock - 1</span>
                <span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"voucher_id"</span><span class="token punctuation">,</span> voucherOrder<span class="token punctuation">.</span><span class="token function">getVoucherId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">gt</span><span class="token punctuation">(</span><span class="token string">"stock"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token comment">// where id = ? and stock > 0</span>
                <span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 扣减失败</span>
            log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">"库存不足"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">save</span><span class="token punctuation">(</span>voucherOrder<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>小总结：</strong></p>
<p>秒杀业务的优化思路是什么？</p>
<ul>
<li>先利用 redis 完成库存余量、一人一单判断，完成抢单业务</li>
<li>再将下单业务放入阻塞队列，利用独立线程异步下单</li>
<li>基于阻塞队列的异步秒杀存在哪些问题？
<ul>
<li>内存限制问题</li>
<li>数据安全问题</li>
</ul>
</li>
</ul>
</div></template>


