<template><div><h2 id="列举一些重要的spring模块" tabindex="-1"><a class="header-anchor" href="#列举一些重要的spring模块" aria-hidden="true">#</a> 列举一些重要的Spring模块</h2>
<p>下图对应的是 Spring4.x 版本。目前最新的 5.x 版本中 Web 模块的 Portlet 组件已经被废弃掉，同时增加了用于异步响应式处理的 WebFlux 组件。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/e0c60b4606711fc4a0b6faf03230247a.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol>
<li>Spring Core：核心模块，Spring其他功能基本都需要依赖于该类库，主要提供IOC依赖注入功能的支持</li>
<li>Spring Aspects：该模块为与AspectJ的集成提供支持</li>
<li>Spring AOP：提供了面向切面编程的实现</li>
<li>Spring Data Access / Integration
<ol>
<li>spring-jdbc : 提供了对数据库访问的抽象 JDBC。不同的数据库都有自己独立的 API 用于操作数据库，而 Java 程序只需要和 JDBC API 交互，这样就屏蔽了数据库的影响。</li>
<li>spring-tx : 提供对事务的支持。</li>
<li>spring-orm : 提供对 Hibernate 等 ORM 框架的支持。</li>
<li>spring-oxm ： 提供对 Castor 等 OXM 框架的支持。</li>
<li>spring-jms : Java 消息服务。</li>
</ol>
</li>
<li>Spring Web
<ol>
<li>spring-web ：对 Web 功能的实现提供一些最基础的支持。</li>
<li>spring-webmvc ： 提供对 Spring MVC 的实现。</li>
<li>spring-websocket ： 提供了对 WebSocket 的支持，WebSocket 可以让客户端和服务端进行双向通信。</li>
<li>spring-webflux ：提供对 WebFlux 的支持。WebFlux 是 Spring Framework 5.0 中引入的新的响应式框架。与 Spring MVC 不同，它不需要 Servlet API，是完全异步.</li>
</ol>
</li>
<li>Spring test：Spring 团队提倡测试驱动开发（TDD）。有了控制反转 (IoC)的帮助，单元测试和集成测试变得更简单。</li>
</ol>
<h2 id="请你说说spring的核心是什么" tabindex="-1"><a class="header-anchor" href="#请你说说spring的核心是什么" aria-hidden="true">#</a> 请你说说Spring的核心是什么？</h2>
<p>Spring的核心是IoC和AOP</p>
<ol>
<li>
<p><code v-pre>IoC</code>叫反转控制，就是将对象的控制权交由Spring框架来管理。IOC可以帮助我们维护对象与对象之间的依赖关系，降低对象之间的耦合度。</p>
<p>说到IoC就不得不说DI，IoC是通过DI来实现的。由于IoC这个词汇比较抽象而DI却更直观，所以很多时候我们就用DI来替代它，在很多时候我们简单地将IoC和DI划等号，这是一种习惯。而实现依赖注入的关键是IoC容器，它的本质就是一个工厂。</p>
<p>DI主要有两种注入方式：</p>
<ol>
<li>构造方法注入</li>
<li>setter方法注入</li>
</ol>
</li>
<li>
<p><code v-pre>AOP</code>是面向切面编程的意思。将那些与业务无关却为业务模块共同调用的逻辑或责任（如事务处理、日志管理和权限管理等）封装起来，便于减少系统的重复代码，降低模块间的耦合度，也有利于未来的可拓展性和可维护性。比如@Transactional注解就是通过AOP实现的。</p>
<p>Spring AOP是基于动态代理的。如果代理对象实现了某个接口，那么Spring AOP会使用JDK Proxy通过接口去创建代理对象，对于没有实现接口的对象，Spring AOP会使用Cglib生成一个被代理对象的子类来作为代理。</p>
<p>当然也可以使用AspectJ！</p>
</li>
</ol>
<h2 id="说一说对spring容器的了解" tabindex="-1"><a class="header-anchor" href="#说一说对spring容器的了解" aria-hidden="true">#</a> 说一说对Spring容器的了解</h2>
<p>Spring主要提供了两种类型的容器：BeanFactory和ApplicationContext</p>
<ul>
<li><code v-pre>BeanFactory</code>：是基础类型的IoC容器，是IoC的顶层接口，提供完整的IoC服务支持。如果没有特殊指定，默认采用延迟初始化策略。只有当客户端对象需要访问容器中的某个对象时，该对象才会进行初始化以及依赖注入的操作。所以，相对来说，容器启动初期速度较快，所需要的资源有限。对于资源有限，并且功能要求不是很严格的场景，BeanFactory是比较合适的IoC容器选择。</li>
<li><code v-pre>ApplicationContext</code>：他是在BeanFactory的基础上构建的，是<code v-pre>BeanFactory</code>的子接口，拥有BeanFactory的所有支持。除此之外，还支持比如事件发布、国际化信息支持（继承了<code v-pre>MessageSource</code>）等。ApplicationContext所管理的对象，在该类型容器启动之后，默认全部初始化并进行依赖注入。所以，对于BeanFactory而言，ApplicationContext要求更多的系统资源。同时，因为在启动时就完成所有初始化，容器启动的时间较BeanFactory也会长一些。在那些系统资源充足，并且要求更多功能的场景中，ApplicationContext类型的容器是比较合适的选择。</li>
</ul>
<h2 id="说一说对beanfactory的了解" tabindex="-1"><a class="header-anchor" href="#说一说对beanfactory的了解" aria-hidden="true">#</a> 说一说对BeanFactory的了解</h2>
<p>其实就是说上面的，包括<code v-pre>ApplicationContext</code></p>
<p>BeanFactory是一个类工厂，与传统类工厂不同的是，BeanFactory是类的通用工厂，可以创建并管理各种类的对象。这些被创建和管理的对象叫做Bean。</p>
<p>BeanFactory是Spring容器的顶层接口，Spring为BeanFactory提供了很多实现，比较常用的比如<code v-pre>AnnotationConfigApplicationContext</code>，常用的方法比如<code v-pre>getBean()</code>获取指定名称的Bean。</p>
<p><code v-pre>BeanFactory</code>本身并不会自动解析像<code v-pre>@Bean</code>,<code v-pre>@Autowired</code>,<code v-pre>@Resources</code>这些注解的功能，如果想要通过<code v-pre>BeanFactory</code>实现这些功能，则需要向<code v-pre>BeanFactory</code>添加一些后置处理器来解析这些注解，从而将相关Bean加入到IoC容器中。</p>
<h2 id="spring是如何管理bean的" tabindex="-1"><a class="header-anchor" href="#spring是如何管理bean的" aria-hidden="true">#</a> Spring是如何管理Bean的</h2>
<p>Spring通过IoC来管理Bean，我们可以通过XML配置或者注解来进行配置。</p>
<p>以下是管理Bean时常用的一些注解：</p>
<ol>
<li><code v-pre>@ComponentScan</code>：用于声明扫描策略。通过它的声明，Spring就知道要哪些包下带声明的类需要被扫描。</li>
<li><code v-pre>@Component</code>，<code v-pre>@Repository</code>，<code v-pre>@Service</code>，<code v-pre>@Controller</code>用于类上声明Bean，他们的作用一样，只是语义不同。<code v-pre>@Component</code>用于声明通用的Bean，<code v-pre>@Repository</code>用于声明DAO层的Bean，<code v-pre>@Service</code>用于声明业务层的Bean，<code v-pre>@Controller</code>用于声明视图层的控制器Bean，被这些注解声明的类当被扫描到时就会创建对应的Bean</li>
<li><code v-pre>@Autowired</code>，<code v-pre>@Qualifier</code>，<code v-pre>@Resource</code>，<code v-pre>@Value</code>用于注入Bean。<code v-pre>@Autowired</code>用于按类型注入，<code v-pre>@Qualifier</code>指定Bean名称注入需要与<code v-pre>@Autowired</code>一起使用，<code v-pre>@Resource</code>既可以按类型注入也可以指定Bean名称注入，@Value适用于注入基本类型。</li>
<li><code v-pre>@Scope</code>用于声明Bean的作用域。</li>
<li><code v-pre>@PostConstruct</code>，<code v-pre>@PreDestory</code>用于声明Bean的生命周期。其中被<code v-pre>@PostConstruct</code>修饰的发给发将在Bean实例化后被调用，<code v-pre>@PreDestory</code>修饰的方法将在容器销毁前调用。</li>
</ol>
<h2 id="bean的作用域" tabindex="-1"><a class="header-anchor" href="#bean的作用域" aria-hidden="true">#</a> Bean的作用域</h2>
<p>默认情况下，Bean在Spring容器中是单例的，可以通过@Scope注解修改Bean的作用域。</p>
<table>
<thead>
<tr>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>singleton</td>
<td>单例Bean，默认作用域，IoC容器启动时创建，IoC容器销毁时销毁</td>
</tr>
<tr>
<td>prototype</td>
<td>每次请求都会创建一个新的bean实例，每次使用时创建，销毁不归容器管，自行调用销毁方法</td>
</tr>
<tr>
<td>request</td>
<td>每一次HTTP请求（浏览器刷新页面）都会产生一个新的Bean</td>
</tr>
<tr>
<td>session</td>
<td>同一个HTTP Session共享一个Bean，不同的HTTP Session（不同的浏览器）使用不同的Bean</td>
</tr>
<tr>
<td>application</td>
<td>应用程序启动时bean创建，应用程序销毁时bean销毁，应用程序值得是ServletContext</td>
</tr>
</tbody>
</table>
<h2 id="bean的生命周期" tabindex="-1"><a class="header-anchor" href="#bean的生命周期" aria-hidden="true">#</a> Bean的生命周期</h2>
<ol>
<li>解析类得到<code v-pre>BeanDefinition</code></li>
<li>通过构造方法实例化得到一个对象（如果有多个构造方法，则要推断使用）</li>
<li>对加了<code v-pre>@Autowired</code>或者相关注解对对象进行依赖注入</li>
<li>回调<code v-pre>Aware</code>接口的方法，比如<code v-pre>BeanNameAware</code>中<code v-pre>setBeanName()</code>方法，<code v-pre>BeanFactoryAware</code>中<code v-pre>setBeanFactory()</code>方法。</li>
<li>调用<code v-pre>BeanPostProcessor</code>的初始化前的方法</li>
<li>调用初始化方法</li>
<li>调用<code v-pre>BeanPostProcessor</code>的初始化后的方法，这会进行AOP</li>
<li>如果当前创建的Bean是单例的则会放入单例池</li>
<li>使用Bean</li>
<li>Spring容器关闭时调用<code v-pre>DisposableBean</code>中的<code v-pre>destory()</code>方法</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Slf4j</span>
<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyBeanPostProcessor</span> <span class="token keyword">implements</span> <span class="token class-name">InstantiationAwareBeanPostProcessor</span><span class="token punctuation">,</span> <span class="token class-name">DestructionAwareBeanPostProcessor</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token comment">// 实例化前（即调用构造方法前）执行的方法</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">postProcessBeforeInstantiation</span><span class="token punctuation">(</span><span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">></span></span> beanClass<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>beanName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"lifeCycleBean"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt; 实例化前执行，如@PreDestroy"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 返回null保持原有对象不变，返回不为null，会替换掉原有对象</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token comment">// 实例化后执行的方法</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">postProcessAfterInstantiation</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>beanName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"lifeCycleBean"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt; 实例化后执行，这里如果返回 false 会跳过依赖注入阶段"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// return false;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token comment">// 依赖注入阶段执行的方法</span>
    <span class="token keyword">public</span> <span class="token class-name">PropertyValues</span> <span class="token function">postProcessProperties</span><span class="token punctuation">(</span><span class="token class-name">PropertyValues</span> pvs<span class="token punctuation">,</span> <span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>beanName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"lifeCycleBean"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt; 依赖注入阶段执行，如@Autowired、@Value、@Resource"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> pvs<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token comment">// 销毁前执行的方法</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">postProcessBeforeDestruction</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>beanName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"lifeCycleBean"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;销毁之前执行"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token comment">// 初始化之前执行的方法</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">postProcessBeforeInitialization</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>beanName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"lifeCycleBean"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt; 初始化之前执行，这里返回的对象会替换掉原本的bean，如 @PostConstruct、@ConfigurationProperties"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> bean<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token comment">// 初始化之后执行的方法</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">postProcessAfterInitialization</span><span class="token punctuation">(</span><span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>beanName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">"lifeCycleBean"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">"&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt; 初始化之后执行，这里返回的对象会替换掉原本的bean，如 代理增强"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> bean<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="单例bean的线程安全问题了解吗" tabindex="-1"><a class="header-anchor" href="#单例bean的线程安全问题了解吗" aria-hidden="true">#</a> 单例Bean的线程安全问题了解吗</h2>
<blockquote>
<p>要是问Bean的线程安全问题需要考虑单例Bean还是多例Bean，多例Bean不存在线程安全问题</p>
</blockquote>
<p>单例Bean存在线程安全问题，主要是因为当多个线程操作同一个对象的时候存在共享资源竞争的问题。</p>
<p>两种解决方法：</p>
<ol>
<li>在Bean中尽量避免定义可变的成员变量。</li>
<li>在类中定义一个ThreadLocal成员变量，将需要的可变成员变量保存在ThreadLocal中</li>
</ol>
<p>不过，大部分Bean实际都是无状态（没有实例变量）的（比如Dao、Service），这种情况下，Bean是线程安全的。</p>
<h2 id="component和-bean的区别是什么" tabindex="-1"><a class="header-anchor" href="#component和-bean的区别是什么" aria-hidden="true">#</a> @Component和@Bean的区别是什么？</h2>
<ol>
<li><code v-pre>@Component</code>注解作用于类，通常是通过类路径扫描（<code v-pre>@ComponentScan</code>）自动侦测以及自动装配到Spring容器中。而@Bean注解作用于方法，将当前方法的返回值存入IOC容器。</li>
<li><code v-pre>@Bean</code>注解比<code v-pre>@Component</code>注解的自定义性更强，而且很多地方我们只能通过<code v-pre>@Bean</code>注解来注册Bean。比如当我们引用第三方库中的类需要装配到Spring容器中时，只能通过<code v-pre>@Bean</code>来实现。</li>
</ol>
<h2 id="aspectj" tabindex="-1"><a class="header-anchor" href="#aspectj" aria-hidden="true">#</a> AspectJ</h2>
<p>AspectJ与Spring AOP和Cglib实现AOP是有所不同的，AspectJ是在字节码的层面上实现的，另外两个是通过代理实现的。</p>
<p>AspectJ相当于在被增强方法的class文件的对应位置调用增强方法实现AOP</p>
<p>对于AspectJ的实现也有两种，一种在编译阶段实现，一种在类加载阶段实现</p>
<ol>
<li>
<p>编译阶段：通过在pom文件中配置AspectJ编译插件实现</p>
</li>
<li>
<p>类加载阶段：通过配置虚拟机参数<code v-pre>-javaagent</code>实现，具体类的样式可以通过阿里巴巴的<code v-pre>arthas</code>插件看到</p>
</li>
</ol>
<h2 id="spring-aop和aspectj-aop的区别" tabindex="-1"><a class="header-anchor" href="#spring-aop和aspectj-aop的区别" aria-hidden="true">#</a> Spring AOP和AspectJ AOP的区别？</h2>
<ol>
<li>Spring AOP输入运行时增强，而AspectJ是编译时或者类加载时增强。</li>
<li>Spring AOP基于代理，而AspectJ基于字节码操作。</li>
</ol>
<h2 id="说说aop的应用场景" tabindex="-1"><a class="header-anchor" href="#说说aop的应用场景" aria-hidden="true">#</a> 说说AOP的应用场景</h2>
<p>Spring AOP为IoC的使用提供了更多的便利。一方面，应用可以直接使用AOP的功能，设计应用的横切关注点，把跨应用的多个模块功能抽象出来，通过AOP编织到模块中，比如可以通过AOP实现应用程序中的日志功能。</p>
<p>另一方面，在Spring内部，事务处理也是通过AOP实现的。</p>
<h2 id="spring-aop不能对哪些类进行增强" tabindex="-1"><a class="header-anchor" href="#spring-aop不能对哪些类进行增强" aria-hidden="true">#</a> Spring AOP不能对哪些类进行增强</h2>
<ol>
<li>Spring AOP只能对IoC容器中的Bean进行增强，对于不受容器管理的对象不能增强。</li>
<li>由于CGLib采用动态创建子类的方式生成代理对象，所以不能对final修饰的类进行代理。</li>
</ol>
<h2 id="既然没有接口都可以用cglib-为什么spring还要使用jdk动态代理" tabindex="-1"><a class="header-anchor" href="#既然没有接口都可以用cglib-为什么spring还要使用jdk动态代理" aria-hidden="true">#</a> 既然没有接口都可以用CGLib，为什么Spring还要使用JDK动态代理</h2>
<p>在性能方面，CGLib创建的代理对象比JDK动态代理创建的代理对象高很多。但是，CGLib在创建代理对象时所花费的时间比JDK动态代理多很多。所以，对于单例的对象无需频繁创建代理对象，采用CGLib比较合适。反之，对于多例的对象因为要频繁创建代理对象，则JDK动态代理更合适。</p>
<h2 id="spring是如何管理事务的" tabindex="-1"><a class="header-anchor" href="#spring是如何管理事务的" aria-hidden="true">#</a> Spring是如何管理事务的</h2>
<ol>
<li><strong>编程式事务</strong>：Spring提供了<code v-pre>TransactionTemplate</code>和<code v-pre>TransactionManager</code>手动管理事务。这种方式相对麻烦，实际应用中很少使用。</li>
<li><strong>声明式事务</strong>：在XML配置文件中配置或者直接基于注解（推荐使用），实际是通过AOP实现的（基于<code v-pre>@Transactional</code>的全注解方式使用最多）</li>
</ol>
<h2 id="spring中的事务传播行为" tabindex="-1"><a class="header-anchor" href="#spring中的事务传播行为" aria-hidden="true">#</a> Spring中的事务传播行为</h2>
<p>当我们调用一个业务方法时，它的内部可能会调用其他的业务方法，以完成一个完整的业务操作。这种业务方法嵌套调用的时候，如果这两个方法都是要保证事务的，那么就要通过Spring的事务传播机制控制当前事务如何传播到被嵌套调用的业务方法中。</p>
<p>Spring在<code v-pre>TransactionDefinition</code>接口中规定了其中类型的事务传播行为。</p>
<table>
<thead>
<tr>
<th>事务传播类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>PROPAGATION_REQUIRED</td>
<td>如果当前没有事务，则新建一个事务；如果已存在一个事务，在加入到这个事务中。这时最常见的选择，也是<code v-pre>@Transactional</code>的默认选项。</td>
</tr>
<tr>
<td>PROPAGATION_REQUIRED_NEW</td>
<td>创建一个新的事务，如果当前存在事务，则把当前事务挂起。也就是说不管外部方法是否开启事务，REQUIRES_NEW修饰的内部方法都会开启自己的新事务，且开启的事务互相独立，互不干扰。</td>
</tr>
<tr>
<td>PROPAGATION_NESTED</td>
<td>如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行，如果当前没有事务，则等价于PROPAGATION_REQUIRED（nested：嵌套的）</td>
</tr>
<tr>
<td>PROPAGATION_MANDATORY</td>
<td>如果当前存在事务，则加入该事务；如果不存在则抛出异常。（mandatory：强制性）</td>
</tr>
<tr>
<td>PROPAGATION_SUPPORTS</td>
<td>如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务方式继续运行</td>
</tr>
<tr>
<td>PROPAGATION_NOT_SUPPORTED</td>
<td>以非事务方式运行，如果当前存在事务，则把当前事务挂起</td>
</tr>
<tr>
<td>PROPAGATION_NEVER</td>
<td>以非事务方式运行，如果当前存在事务，则抛出异常</td>
</tr>
</tbody>
</table>
<blockquote>
<p>若是错误的配置了以下三种事务传播行为，事务将不会发生回滚。</p>
</blockquote>
<h2 id="spring的事务如何配置-常用注解有那些" tabindex="-1"><a class="header-anchor" href="#spring的事务如何配置-常用注解有那些" aria-hidden="true">#</a> Spring的事务如何配置，常用注解有那些？</h2>
<p>事务的打开、回滚和提交是由<strong>事务管理器</strong>来完成的，我们使用不同的数据库访问框架，就要使用与之对应的<strong>事务管理器</strong>。在Spring Boot中，当你添加了数据库访问框架的起步依赖时，他就会进行自动配置，即自动实例化正确的事务管理器。</p>
<p>对于声明式事务，是使用<code v-pre>@Transactional</code>进行标注的。这个注解可以标注在类或者方法上。</p>
<ul>
<li>当他标注在类上时，代表着各类所有公共（public）非静态方法（static）都将启用事务功能</li>
<li>当它标注在方法上时，代表这个方法将启用事务功能。</li>
</ul>
<p>另外，在<code v-pre>@Transactional</code>注解上，我们可以使用<code v-pre>isolation</code>属性声明事物的隔离级别，使用<code v-pre>propagation</code>属性声明事物的传播行为。</p>
<h2 id="transactional-rollbackfor-exception-class-注解了解吗" tabindex="-1"><a class="header-anchor" href="#transactional-rollbackfor-exception-class-注解了解吗" aria-hidden="true">#</a> @Transactional(rollbackFor = Exception.class)注解了解吗</h2>
<p>Exception分为运行时异常和非运行时异常。</p>
<p>在<code v-pre>@Transactional</code>注解中如果不配置<code v-pre>rollbackFor</code>属性，那么事务只会在遇到<code v-pre>RuntimeException</code>的时候才会回滚，加上<code v-pre>rollbackFor=Exception.class</code>，可以让事务在遇到非运行时异常时也会回滚。</p>
<h2 id="transactional失效场景" tabindex="-1"><a class="header-anchor" href="#transactional失效场景" aria-hidden="true">#</a> @Transactional失效场景</h2>
<ol>
<li><code v-pre>@Transaction</code>应用再非public修饰的方法上</li>
<li><code v-pre>@Transaction</code>注解属性<code v-pre>propagation</code>设置错误，上面写的传播行为后三个会使之失效</li>
<li><code v-pre>@Transactional</code>注解属性<code v-pre>rollbackFor</code>设置错误</li>
<li>数据库引擎不支持事务，只有InnoDB支持事务</li>
</ol>
<h2 id="spring是怎么解决循环依赖的" tabindex="-1"><a class="header-anchor" href="#spring是怎么解决循环依赖的" aria-hidden="true">#</a> Spring是怎么解决循环依赖的</h2>
<p>TODO</p>
</div></template>


