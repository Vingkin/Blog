<template><div><h2 id="什么是mvc" tabindex="-1"><a class="header-anchor" href="#什么是mvc" aria-hidden="true">#</a> 什么是MVC</h2>
<p>MVC是一种设计模式，在这种模式下软件被分为三层，及<strong>Model（模型）、View（视图）、Controller（控制器）</strong>。Model代表的是数据，View代表的是用户界面，Controller代表的是数据的处理逻辑，它是Model和View这两层的桥梁。将软件分层的好处是，可以将对象之间的耦合度降低，便于代码的维护。</p>
<h2 id="dao层是做什么的" tabindex="-1"><a class="header-anchor" href="#dao层是做什么的" aria-hidden="true">#</a> DAO层是做什么的</h2>
<p>DAO层是Data Access Object的缩写，即数据访问对象，在项目中它通常作为独立的一层，专门用于访问数据库。</p>
<h2 id="介绍一下spring-mvc的执行流程" tabindex="-1"><a class="header-anchor" href="#介绍一下spring-mvc的执行流程" aria-hidden="true">#</a> 介绍一下Spring MVC的执行流程</h2>
<ol>
<li>整个过程开始于客户端发出一个HTTP请求，Web应用服务器接受到这个请求。如果匹配<code v-pre>DispatcherServlet</code>的请求路径，则Web容器将该请求转交给<code v-pre>DispatcherServlet</code>处理。</li>
<li><code v-pre>DispatcherServlet</code>接收到这个请求后，将根据请求的信息（包括URL、HTTP方法、请求报文头、请求参数、Cookie等）及<code v-pre>HandlerMapping</code>的配置找到处理请求的处理器（<code v-pre>Handler</code>）。可将<code v-pre>HandlerMapping</code>看作路由控制器，将<code v-pre>Handler</code>看作目标主机。</li>
<li>当<code v-pre>DispatcherServlet</code>根据<code v-pre>HandlerMapping</code>得到对应请求的<code v-pre>Handler</code>后，通过<code v-pre>HandlerAdapter</code>对<code v-pre>Handler</code>进行封装，再以统一的适配器接口调用<code v-pre>Handler</code>。<code v-pre>HandlerAdapter</code>是Spring MVC框架的接口，顾名思义，<code v-pre>HandlerAdapter</code>是一个适配器，它用统一的接口对各种Handler方法进行调用。</li>
<li>处理器完成业务逻辑的处理后，将返回一个<code v-pre>ModelAndView</code>给<code v-pre>DispatcherServlet</code>，<code v-pre>ModelAndView</code>包含了视图逻辑名和模型数据信息。</li>
<li><code v-pre>ModelAndView</code>中包含的是“逻辑视图名”而非真正的视图对象，<code v-pre>DispatcherServlet</code>借由<code v-pre>ViewResolver</code>完成逻辑视图名到真实视图对象的解析工作。</li>
<li>当得到真实的视图对象View后，<code v-pre>DispatcherServlet</code>就用这个View对象对<code v-pre>ModelAndView</code>中的模型数据进行视图渲染。</li>
<li>最终客户端得到的响应消息可能是有一个普通的HTML页面，也可能是一个XML或JSON串，甚至是一张图片或一个PDF文档等不同的媒体形式。</li>
</ol>
<p><strong>简略版本：</strong></p>
<ol>
<li>用户发送请求至前端控制器<code v-pre>DispatcherServlet</code></li>
<li><code v-pre>DispatcherServlet</code>收到请求调用<code v-pre>HandllerMapping</code>处理器映射器</li>
<li>处理器映射器找到具体的处理器（<code v-pre>Handler</code>）（可以根据xml配置，注解进行查找），生成处理器对象以及处理器拦截器（如果有拦截器则生成）一并返回给<code v-pre>DispatcherServlet</code></li>
<li><code v-pre>DispatcherServlet</code>调用<code v-pre>HandlerAdapter</code>处理器适配器</li>
<li><code v-pre>HandlerAdapter</code>经过适配调用具体的处理器（<code v-pre>Controller</code>，也叫后端控制器）</li>
<li><code v-pre>Controller</code>执行完成后返回<code v-pre>ModelAndView</code></li>
<li><code v-pre>HandlerAdapter</code>将<code v-pre>Controller</code>执行结果<code v-pre>ModelAndView</code>返回给<code v-pre>DispatcherServlet</code></li>
<li><code v-pre>DispatcherServlet</code>将<code v-pre>ModelAndView</code>传给<code v-pre>ViewReslover</code>视图解析器</li>
<li><code v-pre>ViewReslover</code>解析后返回具体<code v-pre>View</code></li>
<li><code v-pre>DispatcherServlet</code>根据<code v-pre>View</code>进行渲染视图。（最终客户端得到的响应消息可能是有一个普通的HTML页面，也可能是一个XML或JSON串，甚至是一张图片或一个PDF文档等不同的媒体形式。）</li>
</ol>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/SpringMVC执行流程.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="说一说你知道的spring-mvc注解" tabindex="-1"><a class="header-anchor" href="#说一说你知道的spring-mvc注解" aria-hidden="true">#</a> 说一说你知道的Spring MVC注解</h2>
<p><strong>@RequestMapping</strong></p>
<p>该注解的作用就是用来处理请求地址映射的，也就是说将其中的处理器方法映射到url路径上</p>
<p>属性：</p>
<ul>
<li>mothod：请求类型，比如get和post</li>
<li>value：请求地址</li>
</ul>
<p><strong>@RequestParam</strong></p>
<p>是将请求参数绑定到控制器的方法参数上，是Spring MVC中的接收普通参数的注解</p>
<p><strong>@RequestBody</strong></p>
<p>用于读取Request请求的body部分，并且<code v-pre>Content-Type</code>为<code v-pre>application/json</code>格式的数据，接收到数据之后会自动将数据绑定到Java对象上去。系统会使用<code v-pre>HttpMessageConverter</code>或者自定义的<code v-pre>HttpMessageConverter</code>将请求的body中的json字符串转换成java对象。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/sign-up"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span> <span class="token function">signUp</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">UserRegisterRequest</span> userRegisterRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    testService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>userRegisterRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>userRegisterRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>@PathVariable</strong></p>
<p>该注解适用于绑定url中的占位符。是Spring MVC支持rest风格的一个重要标志。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/klasses/{klassId}/teachers"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Teacher</span><span class="token punctuation">></span></span> <span class="token function">getKlassRelatedTeachers</span><span class="token punctuation">(</span>
         <span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"klassId"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> klassId<span class="token punctuation">,</span>
         <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"type"</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token class-name">String</span> type <span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="介绍一下sprig-mvc的拦截器" tabindex="-1"><a class="header-anchor" href="#介绍一下sprig-mvc的拦截器" aria-hidden="true">#</a> 介绍一下Sprig MVC的拦截器</h2>
<blockquote>
<p>可以拓展一下SSO单点登录来讲项目</p>
<p><a href="https://ken.io/note/session-principle-skill" target="_blank" rel="noopener noreferrer">Session的工作原理和使用经验 - Ken的杂谈<ExternalLinkIcon/></a></p>
<p><a href="https://javaguide.cn/system-design/security/sso-intro.html" target="_blank" rel="noopener noreferrer">SSO 单点登录 | JavaGuide<ExternalLinkIcon/></a></p>
<p><a href="https://juejin.cn/post/6975413007715139621" target="_blank" rel="noopener noreferrer">SpringBoot实现登录拦截器（实战版） - 掘金 (juejin.cn)<ExternalLinkIcon/></a></p>
</blockquote>
<p>拦截器会对处理器进行拦截，这样通过拦截器就可以增强处理器的功能。Spring MVC中，所有的拦截器都需要实现HandlerInterceptor接口，该接口中包含如下三个方法：<code v-pre>preHandle()</code>,<code v-pre>postHandle()</code>,<code v-pre>afterCompletion()</code>。</p>
<p>这些方法的执行流程如下图：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/31C010B3F63CB1CC1ADC5481E9E77BDB.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>通过上图可以看出，Spring MVC拦截器的执行流程如下：</p>
<ul>
<li>执行<code v-pre>preHandle</code>方法，它会返回一个布尔值。如果为false，则结束所有流程，如果为true，则执行下一步。</li>
<li>执行处理器逻辑，它包含控制器的功能</li>
<li>执行<code v-pre>postHandler</code>方法</li>
<li>执行视图解析和视图渲染</li>
<li>执行<code v-pre>afterCompletion</code>方法</li>
</ul>
<p>Spring MVC拦截器的开发步骤如下：</p>
<ol>
<li><strong>开发拦截器</strong>：实现<code v-pre>HandlerInterceptor</code>接口，从三个方法中选择合适的方法，实现拦截时需要执行的具体业务逻辑，一般使用<code v-pre>preHandle</code>方法。</li>
<li><strong>注册拦截器</strong>：定义配置类，并让它实现<code v-pre>WebMvcConfigurer</code>接口，在接口的<code v-pre>addInterceptors</code>方法中，注册拦截器，并定义该拦截器匹配那些请求路径。</li>
</ol>
</div></template>


