<template><div><h2 id="说说你对spring-boot的理解" tabindex="-1"><a class="header-anchor" href="#说说你对spring-boot的理解" aria-hidden="true">#</a> 说说你对Spring Boot的理解</h2>
<p>从本质上来说，Spring Boot就是Spring。Spring Boot使用“约定大于配置”的理念让你的项目快速的运行起来，使用Spring Boot很容易创建一个能独立运行、准生产级别、基于Spring框架的项目，使用Spring Boot你可以不用或者只需要很少的Spring配置。</p>
<p>简而言之，Spring Boot本身并不提供Spring的核心功能，而是作为Spring的脚手架框架，以达到快速构建项目。Spring Boot有如下优点：</p>
<ul>
<li>可以快速构建项目</li>
<li>可以对主流开发框架的无配置集成</li>
<li>项目可独立运行，无需外部依赖Servlet容器</li>
<li>提供运行时的应用监控</li>
<li>可以极大地提高开发、部署效率</li>
<li>可以与云计算天然集成</li>
</ul>
<h2 id="spring-boot-starter有什么用" tabindex="-1"><a class="header-anchor" href="#spring-boot-starter有什么用" aria-hidden="true">#</a> Spring Boot Starter有什么用</h2>
<p>Spring Boot提供众多起步依赖（Starter）降低项目依赖的复杂度。起步依赖本质上是一个Maven项目对象模型（Project Object Model，POM），定义了对其他库的传递依赖，这些东西加在一起即支持某项功能。很多起步依赖的命名都暗示了它们提供的某种或某类功能。</p>
<p>举例来说，你打算做个Web应用程序。与其向项目的构建文件里添加一堆单独的库依赖，还不如声明这是一个Web应用程序来的简单。你只要添加Spring Boot的Web起步依赖就好了。</p>
<h2 id="介绍spring-boot的启动流程" tabindex="-1"><a class="header-anchor" href="#介绍spring-boot的启动流程" aria-hidden="true">#</a> 介绍Spring Boot的启动流程</h2>
<p>首先，Spring Boot项目创建完成会默认生成一个名为*Application的入口类，我们是通过该类的main方法启动Spring Boot项目的。在main方法中，通过run方法进行*Application类的初始化和启动。</p>
<p>*Application调用run方法的大致流程如下图：</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/4ECC3AECD1D8D2B62421E2D3453DC465.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>其中，*Application在run方法中重点做了以下操作：</p>
<ul>
<li>获取监听器的参数配置</li>
<li>打印Banner信息</li>
<li>创建并初始化容器</li>
<li>监听器发送通知</li>
</ul>
<p>当然，除了上述核心操作，run方法运行过程中还涉及启动时长统计、异常报告、启动日志、异常处理等辅助操作。</p>
<h2 id="spring-boot项目是如何导入包的" tabindex="-1"><a class="header-anchor" href="#spring-boot项目是如何导入包的" aria-hidden="true">#</a> Spring Boot项目是如何导入包的</h2>
<p>通过Spring Boot Starter导入包。其他详见[0x01](#0x01. Spring Boot Starter有什么用).</p>
<h2 id="spring-boot自动装配过程" tabindex="-1"><a class="header-anchor" href="#spring-boot自动装配过程" aria-hidden="true">#</a> Spring Boot自动装配过程</h2>
<p>使用Spring Boot时，我们只需引入对应的Starter，Spring Boot启动时便会自动加载相关依赖，配置相应的初始化参数，以最快捷、简单的形式对第三方软件进行集成，这便是Spring Boot的自动配置功能。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/4C6D51AEA1E10E3717A8BE4AE88B6F79.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>整个自动配置的过程是：Spring Boot通过@EnableAutoConfiguration注解开启自动配置，加载spring.factories中的各种AutoConfiguration类，当某个AutoConfiguration类满足其注解@Conditional指定的生效条件（Starters提供的依赖、配置或Spring容器中是否存在某个Bean等）时，实例化该AutoConfiguration类中定义的Bean，并注入Spring容器，就可以完成依赖框架的自动配置。</p>
<h2 id="说说你对spring-boot的注解的了解" tabindex="-1"><a class="header-anchor" href="#说说你对spring-boot的注解的了解" aria-hidden="true">#</a> 说说你对Spring Boot的注解的了解</h2>
<p><strong>@SpringBootApplication</strong></p>
<p>这个注解时Spring Boot项目的基石，创建Spring Boot项目之后会默认在主类加上。</p>
<p>我们可以把<code v-pre>@SpringBootApplication</code>看作是<code v-pre>@SpringBootConfiguration</code>、<code v-pre>@EnableAutoConfiguration</code>、<code v-pre>@ComponentScan</code>注解的集合。</p>
<ul>
<li><code v-pre>@EnableAutoConfiguration</code>：启用Spring Boot的自动装配机制</li>
<li><code v-pre>@ComponentScan</code>：包路径扫描，扫描被@Component注解修饰的Bean</li>
<li><code v-pre>@SpringBootConfiguration</code>：就是<code v-pre>@Configuration</code>的不同语义的版本，允许在该类中使用<code v-pre>@Bean</code>实修方法注册额外的Bean或导入其他配置类</li>
</ul>
<p><strong>@Import</strong></p>
<p><code v-pre>@EnableAutoConfiguration</code>的关键功能就是通过<code v-pre>@Import</code>注解导入的<code v-pre>ImportSelector</code>来完成的。从源码得知<code v-pre>@Import({AutoConfigurationImportSelector.class})</code>是<code v-pre>@EnableAutoConfiguration</code>注解的组成部分，也是自动配置功能的核心实现者。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Inherited</span>
<span class="token annotation punctuation">@AutoConfigurationPackage</span>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">AutoConfigurationImportSelector</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">EnableAutoConfiguration</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token constant">ENABLED_OVERRIDE_PROPERTY</span> <span class="token operator">=</span> <span class="token string">"spring.boot.enableautoconfiguration"</span><span class="token punctuation">;</span>

    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">exclude</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">excludeName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>@Conditional</strong></p>
<p><code v-pre>@Conditional</code>注解是由Spring 4.0版本引入的新特性，可根据是否满足指定的条件来决定是否进行Bean的实例化及装配，比如，设定当类路径下包含某个jar包才会对注解的类进行实例化操作。总之，就是根据一些特定条件来控制实例化的行为。</p>
<p><strong>@Conditional衍生注解</strong></p>
<ul>
<li><code v-pre>@ConditionalOnBean</code>：在容器中有指定Bean的时候才会加载</li>
<li><code v-pre>@ConditiaonOnMissingBean</code>：在容器中没有指定Bean的时候才会加载</li>
<li>等等</li>
</ul>
<p><strong>@RestController</strong></p>
<p><code v-pre>@RestController</code>是<code v-pre>@Controller</code>和<code v-pre>@ResponseBody</code>的合集，表示这是个控制器Bean，并且是将函数的返回值直接填入HTTP响应体中，返回JSON或XML形式数据，是REST风格的控制器。</p>
<p><strong>@Configuration</strong></p>
<p>一般用来声明配置类，可以用<code v-pre>@Component</code>注解替代，不过使用<code v-pre>@Configuration</code>注解声明配置类更加语义化。</p>
<p><strong>@PathVariable和@RequestParam</strong></p>
<ul>
<li><code v-pre>@PathVariable</code>：用于获取路径参数</li>
<li><code v-pre>@RequestParam</code>：用于获取查询参数</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/klasses/{klassId}/teachers"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Teacher</span><span class="token punctuation">></span></span> <span class="token function">getKlassRelatedTeachers</span><span class="token punctuation">(</span>
         <span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"klassId"</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> klassId<span class="token punctuation">,</span>
         <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">"type"</span><span class="token punctuation">,</span> required <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token class-name">String</span> type <span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们请求的url是：<code v-pre>/klasses/123456/teachers?type=web</code></p>
<p>那么我们服务获取到的数据就是：<code v-pre>klassId=123456,type=web</code></p>
<p><strong>@RequestBody</strong></p>
<p>用于读取Request请求的body部分，并且<code v-pre>Content-Type</code>为<code v-pre>application/json</code>格式的数据，接收到数据之后会自动将数据绑定到Java对象上去。系统会使用<code v-pre>HttpMessageConverter</code>或者自定义的<code v-pre>HttpMessageConverter</code>将请求的body中的json字符串转换成java对象。</p>
<p>我们有个注册的接口：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/sign-up"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span> <span class="token function">signUp</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token annotation punctuation">@Valid</span> <span class="token class-name">UserRegisterRequest</span> userRegisterRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  userService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>userRegisterRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>UserRegisterRequest对象</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UserRegisterRequest</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@NotBlank</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> userName<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@NotBlank</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> password<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@NotBlank</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> fullName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们发送post请求到这个接口，并且body携带JSON数据。这样我们的后端就可以直接把JSON格式的数据映射到我们的<code v-pre>UserRegisterRequest</code>类上。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">"userName"</span><span class="token operator">:</span><span class="token string">"coder"</span><span class="token punctuation">,</span><span class="token property">"fullName"</span><span class="token operator">:</span><span class="token string">"shuangkou"</span><span class="token punctuation">,</span><span class="token property">"password"</span><span class="token operator">:</span><span class="token string">"123456"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要注意的是：<strong>一个请求方法只可以有一个<code v-pre>@RequestBody</code>，但是可以有多个<code v-pre>@RequestParam</code>和<code v-pre>@PathVariable</code></strong>。 如果你的方法必须要用两个 <code v-pre>@RequestBody</code>来接受数据的话，大概率是你的数据库设计或者系统设计出问题了！</p>
<p><strong>@Value和@ConfigurationProperties</strong></p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">wuhan2020</span><span class="token punctuation">:</span> 2020年初武汉爆发了新型冠状病毒，疫情严重，但是，我相信一切都会过去！武汉加油！中国加油！

<span class="token key atrule">my-profile</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> Guide哥
  <span class="token key atrule">email</span><span class="token punctuation">:</span> koushuangbwcx@163.com

<span class="token key atrule">library</span><span class="token punctuation">:</span>
  <span class="token key atrule">location</span><span class="token punctuation">:</span> 湖北武汉加油中国加油
  <span class="token key atrule">books</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 天才基本法
      <span class="token key atrule">description</span><span class="token punctuation">:</span> 二十二岁的林朝夕在父亲确诊阿尔茨海默病这天，得知自己暗恋多年的校园男神裴之即将出国深造的消息——对方考取的学校，恰是父亲当年为她放弃的那所。
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 时间的秩序
      <span class="token key atrule">description</span><span class="token punctuation">:</span> 为什么我们记得过去，而非未来？时间“流逝”意味着什么？是我们存在于时间之内，还是时间存在于我们之中？卡洛·罗韦利用诗意的文字，邀请我们思考这一亘古难题——时间的本质。
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> 了不起的我
      <span class="token key atrule">description</span><span class="token punctuation">:</span> 如何养成一个新习惯？如何让心智变得更成熟？如何拥有高质量的关系？ 如何走出人生的艰难时刻？
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code v-pre>@Value(&quot;${property}&quot;)</code>读取比较简单的配置信息</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">"${wuhan2020}"</span><span class="token punctuation">)</span>
<span class="token class-name">String</span> wuhan2020<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code v-pre>@ConfigurationProperties</code>读取配置信息并于Bean绑定，就可以像使用普通的Bean一样，将其注入到类中使用</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Component</span>
<span class="token annotation punctuation">@ConfigurationProperties</span><span class="token punctuation">(</span>prefix <span class="token operator">=</span> <span class="token string">"library"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@ToString</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LibraryProperties</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> location<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Book</span><span class="token punctuation">></span></span> books<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Setter</span>
    <span class="token annotation punctuation">@Getter</span>
    <span class="token annotation punctuation">@ToString</span>
    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Book</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> name<span class="token punctuation">;</span>
        <span class="token class-name">String</span> description<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">LibraryProperties</span> libraryProperties<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spring-boot全局异常处理器" tabindex="-1"><a class="header-anchor" href="#spring-boot全局异常处理器" aria-hidden="true">#</a> Spring Boot全局异常处理器</h2>
<p><code v-pre>@ControllerAdvice</code>开启全局异常处理，使用该注解表示开启了全局异常的捕获，我们只需再自定义一个方法使用<code v-pre>@ExceptionHandler</code>注解，然后自定义捕获异常类型即可对这些捕获的异常进行统一处理。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 全局异常处理器</span>
<span class="token annotation punctuation">@ControllerAdvice</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GlobalExceptionHandler</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@ExceptionHandler</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token class-name">Exception</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@ResponseBody</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">globalExceptionHandler</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"全局异常捕获>>>:"</span> <span class="token operator">+</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"全局异常捕获,错误原因>>>"</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// controller中进行测试</span>
<span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/sign-up"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">ResponseEntity</span> <span class="token function">signUp</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">UserRegisterRequest</span> userRegisterRequest<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    testService<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>userRegisterRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">ResponseEntity</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>userRegisterRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>全局异常捕获<span class="token punctuation">,</span>错误原因<span class="token operator">>>></span><span class="token operator">/</span> by zero
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


