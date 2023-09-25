<template><div><h1 id="_1-hdfs-trash垃圾桶" tabindex="-1"><a class="header-anchor" href="#_1-hdfs-trash垃圾桶" aria-hidden="true">#</a> 1. HDFS Trash垃圾桶</h1>
<blockquote>
<p>该概念就和Windows的垃圾桶一样，默认不开启</p>
</blockquote>
<h2 id="_1-1-功能描述" tabindex="-1"><a class="header-anchor" href="#_1-1-功能描述" aria-hidden="true">#</a> 1.1 功能描述</h2>
<ul>
<li>启用Trash功能后，从HDFS中删除某些内容时，文件或目录不会立即被清除，它们将被移动到回收站Current目录中**(/user/${username}/.Trash/current)**。</li>
<li>最近删除的文件被移动到回收站Current目录，并且在可配置的时间间隔内，HDFS会为在Current回收站目录下的文件创建检查点/user/${username}/.Trash/&lt;日期&gt;，并在过期时删除旧的检查点。</li>
</ul>
<h2 id="_1-2-功能开启" tabindex="-1"><a class="header-anchor" href="#_1-2-功能开启" aria-hidden="true">#</a> 1.2 功能开启</h2>
<ol>
<li>
<p>关闭hdfs集群：<code v-pre>stop-dfs.sh</code></p>
</li>
<li>
<p>修改core-site.xml</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 回收站中的文件多少分钟后会被系统永久删除。如果为零，Trash功能将被禁用。--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>fs.trash.interval<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>1440<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 前后两次检查点的创建时间间隔（单位也是分钟）
 		 新的检查点被创建后，随之旧的检查点就会被系统永久删除。
		 如果为零，则将该值设置为fs.trash.interval的值。
 	--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>fs.trash.checkpoint.interval<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>同步集群（此时在/export/server/hadoop-3.1.4/etc/hadoop目录下）</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@node1 hadoop<span class="token punctuation">]</span><span class="token comment"># scp -r core-site.xml node2:$PWD</span>
<span class="token punctuation">[</span>root@node1 hadoop<span class="token punctuation">]</span><span class="token comment"># scp -r core-site.xml node2:$PWD</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>重启集群：<code v-pre>start-dfs.sh</code></p>
</li>
</ol>
<p>操作时和正常删除操作一样，通过-skipTrash来跳过垃圾桶直接永久删除</p>
<p><code v-pre>hadoop fs -rm [-skipTrash] /tmp/1.txt</code></p>
<p>HDFS提供了一个命令行工具来完成这个工作：<code v-pre>hadoop fs -expunge</code>。该命令立即从文件系统中删除过期的检查点。</p>
<h1 id="_2-hdfs-snapshot快照" tabindex="-1"><a class="header-anchor" href="#_2-hdfs-snapshot快照" aria-hidden="true">#</a> 2. HDFS Snapshot快照</h1>
<blockquote>
<p>快照（Snapshot）是<strong>数据存储的某一时刻的状态记录</strong>。HDFS Snapshot快照是整个文件系统或某个目录在某个时刻的镜像。</p>
</blockquote>
<h2 id="_2-1-快照的作用" tabindex="-1"><a class="header-anchor" href="#_2-1-快照的作用" aria-hidden="true">#</a> 2.1 快照的作用</h2>
<ul>
<li>数据恢复：对重要目录进行创建snapshot的操作，当用户误操作时，可以通过snapshot来进行相关的恢复操作。</li>
<li>数据备份：使用snapshot来进行整个集群，或者某些目录、文件的备份。管理员以某个时刻的snapshot作为备份的起始结点，然后通过比较不同备份之间差异性，来进行增量备份。</li>
<li>数据测试：在某些重要数据上进行测试或者实验，可能会直接将原始的数据破坏掉。可以临时的为用户针对要操作的数据来创建一个snapshot，然后让用户在对应的snapshot上进行相关的实验和测试，从而避免对原始数据的破坏。</li>
</ul>
<h2 id="_2-2-快照功能的理论实现" tabindex="-1"><a class="header-anchor" href="#_2-2-快照功能的理论实现" aria-hidden="true">#</a> 2.2 快照功能的理论实现</h2>
<ul>
<li>HDFS快照不是数据的简单拷贝，只<strong>做差异的记录</strong>。</li>
<li>对于大多不变的数据，你所看到的数据其实是当前物理路径所指的内容，而发生变更的inode数据才会被快照额外拷贝，也就是所说的差异拷贝。</li>
<li>linode指<strong>索引</strong>节点，用来存放文件及目录的基本信息，包含时间、名称、拥有者、所在组等。</li>
<li>并且快照只是记录一些元数据信息。</li>
</ul>
<h2 id="_2-3-快照功能的命令实现" tabindex="-1"><a class="header-anchor" href="#_2-3-快照功能的命令实现" aria-hidden="true">#</a> 2.3 快照功能的命令实现</h2>
<ul>
<li>
<p>目录开启快照功能（<code v-pre>hdfs dfsadmin -allowSnapshot /vingkin</code>）</p>
<p>没有启动快照功能的目录创建快照会报错</p>
</li>
<li>
<p>目录禁用快照功能（<code v-pre>hdfs dfsadmin -disallowSnapshot /vingkin</code>）</p>
<p>禁用的前提是该目录的所有快照已经被删除</p>
</li>
<li>
<p>创建快照（<code v-pre>hdfs dfs -createSnapshot /vingkin [mysnap1]</code>）</p>
<p>可以指定具体的快照名，如果不指定则默认以时间等相关数据命名</p>
</li>
<li>
<p>查看创建的快照（<code v-pre>hdfs lsSnapshottableDir</code>）</p>
<p>还可以通过Web UI页面直接查看快照信息，并可以在Web UI的目录页面手动输入/vingkin/.snapshot来查看隐藏文件</p>
</li>
<li>
<p>比较不同快照的差异（<code v-pre>hdfs snapshotDiff /vingkin mysnap1 mysnap2</code>）</p>
<p>+表示增加了文件，M表示文件做了修改...</p>
</li>
<li>
<p>删除快照（<code v-pre>hdfs dfs -deleteSnapshot /vingkin mysnap1</code>）</p>
</li>
<li>
<p>快照重命名（<code v-pre>hdfs dfs -renameSnapshot /vingkin mysnap1 mysnap2</code>）</p>
<p>将mysnap1重命名为mysnap2</p>
</li>
</ul>
<p><strong>注意：拥有快照的目录不允许被删除</strong></p>
<h1 id="_3-hdfs权限管理" tabindex="-1"><a class="header-anchor" href="#_3-hdfs权限管理" aria-hidden="true">#</a> 3. HDFS权限管理</h1>
<h2 id="_3-1-aaa" tabindex="-1"><a class="header-anchor" href="#_3-1-aaa" aria-hidden="true">#</a> 3.1 AAA</h2>
<blockquote>
<p><strong>认证（Authentication）</strong>、**授权（Authorization）<strong>和</strong>审计（Accounting）**指计算机安全领域的一个架构模式。通常缩写为 AAA。</p>
</blockquote>
<p>在该模式中，使用服务的用户先要<strong>证明自己的身份</strong>；然后根据规则被<strong>授予权限</strong>，同时其<strong>操作被记录</strong>下来留待审计。</p>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251615922.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>作为分布式文件系统，HDFS也集成了一套权限管理系统。客户端在进行每次文件操时，系统会从<strong>用户身份认证</strong>和<strong>数据访问授权</strong>两个环节进行验证。</p>
<h2 id="_3-2-ugo权限管理" tabindex="-1"><a class="header-anchor" href="#_3-2-ugo权限管理" aria-hidden="true">#</a> 3.2 UGO权限管理</h2>
<blockquote>
<p>HDFS文件权限与Linux/Unix系统的UGO模型类似，简单描述为：每个文件和目录都与一个拥有者和一个组相关联。</p>
</blockquote>
<ul>
<li>
<p>USER（文件的所有者）：一般是创建该文件的用户，对该文件具有完全的权限。</p>
</li>
<li>
<p>GROUP（拥有者所在的组）：和文件所有者属于同一组的用户。</p>
</li>
<li>
<p>OTHER（其他用户组）：其他用户组的用户。</p>
</li>
</ul>
<h3 id="_3-2-1-读、写、执行权限" tabindex="-1"><a class="header-anchor" href="#_3-2-1-读、写、执行权限" aria-hidden="true">#</a> 3.2.1 读、写、执行权限</h3>
<ul>
<li>
<p>HDFS文件权限也细分为：读权限（r）、写权限（w）、执行权限（x）。</p>
</li>
<li>
<p>在HDFS中，对于<strong>文件</strong>，需要r权限才能读取文件，而w权限才能写入或追加到文件。没有x可执行文件的概念。</p>
</li>
<li>
<p>在HDFS中，对于<strong>目录</strong>，需要r权限才能列出目录的内容，需要w权限才能创建或删除文件或目录，并且需要x权限才能访问目录的子级。</p>
</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251615494.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_3-2-2-umask权限掩码" tabindex="-1"><a class="header-anchor" href="#_3-2-2-umask权限掩码" aria-hidden="true">#</a> 3.2.2 umask权限掩码</h3>
<blockquote>
<p>HDFS也提供了umask掩码，用于设置在HDFS中<strong>新建的文件和目录的默认权限</strong>。</p>
</blockquote>
<p>默认umask值有属性fs.permissions.umask-mode指定，默认值022。</p>
<p>创建文件和目录时使用的umask，默认的权限就是</p>
<ul>
<li>
<p>目录：777-022=755，也就是drwxr-xr-x</p>
</li>
<li>
<p>文件：777-022=755，因为HDFS中文件没有x执行权限的概念，所以是：-rw-r--r--</p>
</li>
</ul>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>fs.permissions.umask-mode<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>022<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>final</span><span class="token punctuation">></span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>final</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span><span class="token punctuation">></span></span>core-default.xml<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>source</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-3-ugo相关命令" tabindex="-1"><a class="header-anchor" href="#_3-2-3-ugo相关命令" aria-hidden="true">#</a> 3.2.3 UGO相关命令</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment">#变更目录或文件的权限 可以使用数字 也可以使用字母 u g o a + - r w x</span>
hadoop fs <span class="token parameter variable">-chmod</span> <span class="token punctuation">[</span>-R<span class="token punctuation">]</span> <span class="token number">777</span> /user/itcast/foo
hadoop fs <span class="token parameter variable">-chmod</span> <span class="token punctuation">[</span>-R<span class="token punctuation">]</span> u+x,o-x /user/itcast/foo
<span class="token comment">#变更目录或文件的属主或用户组</span>
hadoop fs <span class="token parameter variable">-chown</span> <span class="token punctuation">[</span>-R<span class="token punctuation">]</span> itcast /user/itcast/foo
hadoop fs <span class="token parameter variable">-chown</span> <span class="token punctuation">[</span>-R<span class="token punctuation">]</span> itcast:ogroup /user/itcast/foo
<span class="token comment">#变更用户组</span>
hadoop fs <span class="token parameter variable">-chgrp</span> <span class="token punctuation">[</span>-R<span class="token punctuation">]</span> group1 /user/itcast/foo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**粘滞[nián zhì]位（Sticky bit）**用在目录上设置，如此以来，只有目录内文件的所有者或者root才可以删除或移动该文件。</p>
<p>如果不为目录设置粘滞位，任何具有该目录写和执行权限的用户都可以删除和移动其中的文件</p>
<h2 id="_3-3-hdfs用户身份认证" tabindex="-1"><a class="header-anchor" href="#_3-3-hdfs用户身份认证" aria-hidden="true">#</a> 3.3 HDFS用户身份认证</h2>
<blockquote>
<p>HDFS项目本身并没有用户身份认证，通过相关接口从主机获取相关用户身份，然后用于后续的权限管理。</p>
</blockquote>
<ul>
<li>Simple（默认）</li>
<li>Kerberos</li>
</ul>
<h3 id="_3-3-1-simple认证" tabindex="-1"><a class="header-anchor" href="#_3-3-1-simple认证" aria-hidden="true">#</a> 3.3.1 Simple认证</h3>
<blockquote>
<p>客户端与NN进行交互时，会用基于HDFS客户端所在的Linux/Unix系统的登录用户名来进行认证。只要用户能正常登录就认证成功。</p>
</blockquote>
<p><strong>存在的问题</strong>：</p>
<ul>
<li>多用户使用一个客户端会导致权限混淆</li>
<li>恶意用户可以进行身份伪造从而非法获取相应的权限</li>
</ul>
<p><strong>防止好人误做坏事，不防止坏人做坏事</strong></p>
<h3 id="_3-3-2-kerberos认证" tabindex="-1"><a class="header-anchor" href="#_3-3-2-kerberos认证" aria-hidden="true">#</a> 3.3.2 Kerberos认证</h3>
<blockquote>
<p>Kerberos是麻省理工学院（MIT）开发的一种网络身份<strong>认证协议</strong>。它旨在通过使用密钥加密技术为客户端/服务器应用程序提供强<strong>身份验证</strong>。也就是AAA的第一个A。</p>
</blockquote>
<p><strong>Kerberos所具有的角色</strong>：</p>
<ul>
<li>访问服务的<strong>Client</strong></li>
<li>提供服务的<strong>Server</strong></li>
<li><strong>KDC</strong>（Key Distribution Center）密钥分发中心</li>
</ul>
<p><strong>域的概念</strong>：</p>
<blockquote>
<p>域的产生是为了解决企业内部的资源管理问题，比如一个公司就可以在网络中建立一个域环境，更方便内部的资源管理。在一个域中有域控、域管理员、普通用户、主机等等各种资源。</p>
</blockquote>
<ul>
<li>YUNYING.LAB为其他两个域的<strong>根域</strong>，NEWS.YUNYING.LAB和DEV.YUNYING.LAB均为YUNYING.LAB的<strong>子域</strong>，这三个域组成了一个<strong>域树</strong>。</li>
<li>子域的概念可以理解为一个集团在不同业务上分公司，他们有业务重合的点并且都属于YUNYING.LAB这个根域，但又独立运作。同样TEST.COM也是一个单独的域树，两个域树YUNYING.LAB和TEST.COM组合起来被称为一个<strong>域林</strong>。</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251615058.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>KDC服务默认会安装在一个域的域控中</strong></p>
<p><strong>具体认证过程</strong>：</p>
<ul>
<li>Authentication Server： AS的作用就是验证Client端的身份（确定你是身份证上的本人），验证通过就会给一张TGT（Ticket Granting Ticket）票给Client。</li>
<li>Ticket Granting Server： TGS的作用是通过AS发送给Client的票（TGT）换取访问Server端的票（上车的票ST）。ST（Service Ticket）也有资料称为TGS Ticket，为了和TGS区分，在这里就用ST来说明。</li>
</ul>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251615287.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251615881.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="_3-4-hdfs-group-mapping组映射" tabindex="-1"><a class="header-anchor" href="#_3-4-hdfs-group-mapping组映射" aria-hidden="true">#</a> 3.4 HDFS Group Mapping组映射</h2>
<blockquote>
<p>HDFS在获取用户名后还需要获取该用户所在的组。一般来说，<strong>HDFS</strong>中用户所属组的确认工作需要通过外部的用户组映射（Group Mapping）服务来获取。</p>
</blockquote>
<p>Linux/Unix系统上的用户和用户组信息存储在<code v-pre>/etc/passwd</code>和<code v-pre>/etc/group</code>文件中。</p>
<p>默认情况下，HDFS会通过调用外部的 Shell 命令来获取用户的所有用户组列表。</p>
<ul>
<li>/etc/passwd：（用户名:口令:用户标识号:组标识号:注释性描述:主目录:登录Shell）</li>
<li>/etc/group：（组名：密码：GID：该用户组中的用户列表）</li>
</ul>
<p>此方案的优点在于组映射服务十分稳定，不易受外部服务的影响。</p>
<p>但是用户和用户组管理涉及到root权限等，同时会在服务器上生成大量的用户组，后续管理，特别是自动化运维方面会有较大影响。</p>
<h2 id="_3-5-acl权限管理" tabindex="-1"><a class="header-anchor" href="#_3-5-acl权限管理" aria-hidden="true">#</a> 3.5 ACL权限管理</h2>
<blockquote>
<p>对于一个文件或文件夹而言，通过UGO来给予不同的角色不同的权限。比如属主root具有权限rwx，属组具有权限rwx，其他用户无任何权限。对于一个新来的用户，如果想要授予r-x权限将无法满足。可以通过ACL（Access Control List）访问控制列表，为<strong>特定的用户或组设置不同的权限</strong>。</p>
</blockquote>
<h3 id="_3-5-1-相关命令" tabindex="-1"><a class="header-anchor" href="#_3-5-1-相关命令" aria-hidden="true">#</a> 3.5.1 相关命令</h3>
<p>使用命令前需要设置相关参数并重启hdfs服务</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>dfs.namenode.acls.enabled<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>true<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>final</span><span class="token punctuation">></span></span>false<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>final</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>source</span><span class="token punctuation">></span></span>hdfs-site.xml<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>source</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 为node1用户对于vingkin添加rwx权限</span>
hadoop fs <span class="token parameter variable">-setfacl</span> <span class="token parameter variable">-m</span> user:node1:rwx /vingkin
<span class="token comment"># 查看ACL权限</span>
hadoop fs <span class="token parameter variable">-getfacl</span> /vingkin
<span class="token comment"># 删除指定的ACL条目</span>
hadoop fs <span class="token parameter variable">-setfacl</span> <span class="token parameter variable">-x</span> user:node1 /vingkin
<span class="token comment"># 删除基本ACL条目以外的所有条目。保留用户，组和其他条目以与权限位兼容。（相当于回到没有设置ACL之前的样子）</span>
hadoop fs <span class="token parameter variable">-setfacl</span> <span class="token parameter variable">-b</span> /vingkin
<span class="token comment"># 设置默认的ACl权限，以后在该目录中新建文件或者子目录时，新建的文件/目录的ACL权限都是之前设置的default ACLs</span>
hadoop fs <span class="token parameter variable">-setfacl</span> <span class="token parameter variable">-m</span> default:user:node1:rwx /vingkin
<span class="token comment"># 删除默认ACL权限</span>
hadoop fs <span class="token parameter variable">-setfacl</span> <span class="token parameter variable">-k</span> /vingkin 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_4-hdfs-proxy-user代理用户" tabindex="-1"><a class="header-anchor" href="#_4-hdfs-proxy-user代理用户" aria-hidden="true">#</a> 4. HDFS Proxy user代理用户</h1>
<blockquote>
<p>一个用户（比如超级用户）代表另一个用户提交作业或访问HDFS，比如：用户名为“root”的超级用户代表用户vingkin提交作业并访问HDFS。</p>
</blockquote>
<p>例如：名为root的超级用户只能从host1和host2连接来模拟属于group1和group2的用户。</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- core-site.xml --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>hadoop.proxyuser.root.hosts<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>host1,host2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>hadoop.proxyuser.root.groups<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>group1,group2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>通配符*可用于允许来自任何主机或任何用户的模拟</strong></p>
<p>从任何主机访问的名为root的用户都可以假冒属于任何组的任何用户。</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>hadoop.proxyuser.root.hosts<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>*<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>hadoop.proxyuser.root.groups<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>*<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="_5-hdfs透明加密" tabindex="-1"><a class="header-anchor" href="#_5-hdfs透明加密" aria-hidden="true">#</a> 5. HDFS透明加密</h1>
<blockquote>
<p>对HDFS的指定目录进行透明加密，通过Web UI界面访问或者hadoop fs -cat访问仿佛就是未加密的文件，以为上面两种方法访问时实现了自动解密。通过直接产看块信息时是加密的。</p>
</blockquote>
<h2 id="_5-1-相关概念" tabindex="-1"><a class="header-anchor" href="#_5-1-相关概念" aria-hidden="true">#</a> 5.1 相关概念</h2>
<h3 id="加密区域" tabindex="-1"><a class="header-anchor" href="#加密区域" aria-hidden="true">#</a> 加密区域</h3>
<blockquote>
<p>所谓加密区域其实就是一个目录</p>
</blockquote>
<h3 id="密钥" tabindex="-1"><a class="header-anchor" href="#密钥" aria-hidden="true">#</a> 密钥</h3>
<ul>
<li>
<p>当加密区域被创建时，都会有一个<strong>加密区域秘钥</strong>（EZ密钥，encryption zone key）与之对应，EZ密钥存储在HDFS外部的密钥库中。</p>
</li>
<li>
<p>加密区域里的每个文件都有其自己加密密钥，叫做<strong>数据加密秘钥</strong>（DEK，data encryption key）。</p>
</li>
<li>
<p>DEK会使用其各自的加密区域的EZ密钥进行加密，以形成<strong>加密数据加密密钥</strong>（EDEK）。</p>
</li>
</ul>
<h3 id="密钥库" tabindex="-1"><a class="header-anchor" href="#密钥库" aria-hidden="true">#</a> 密钥库</h3>
<p>存储密钥（key）的叫做密钥库（keystore）,将HDFS与外部企业级密钥库（keystore）集成是部署透明加密的第一步。</p>
<p>与HDFS本身是分离的</p>
<h3 id="密钥管理服务-kms" tabindex="-1"><a class="header-anchor" href="#密钥管理服务-kms" aria-hidden="true">#</a> 密钥管理服务（KMS）</h3>
<blockquote>
<p>Hadoop<strong>密钥管理服务</strong>（Key Management Server，简写KMS），用作HDFS客户端与密钥库之间的代理。</p>
</blockquote>
<p>主要职责：</p>
<ol>
<li>
<p>访问加密区域秘钥（EZ key）</p>
</li>
<li>
<p>生成EDEK，EDEK存储在NameNode上</p>
</li>
<li>
<p>为HDFS客户端解密EDEK</p>
</li>
</ol>
<h3 id="写入加密文件的过程" tabindex="-1"><a class="header-anchor" href="#写入加密文件的过程" aria-hidden="true">#</a> 写入加密文件的过程</h3>
<p>提前动作：创建加密区，设置加密区密钥(EZ key)</p>
<ol>
<li>Client向NN请求在HDFS某个加密区新建文件</li>
<li>NN从缓存中取出一个新的EDEK（后台不断从KMS拉取新的EDEK到缓存中）</li>
<li>获取到EDEK会被NN保存到文件的元数据中</li>
<li>然后NN将EDEK发送给Client</li>
<li>Client发送EDEK给KMS，KMS用对应的EZ key将EDEK解密出DEK发送给Client(EDEK+EZ key -&gt; DEK)</li>
<li>Client用DEK加密文件内容发送给datanode进行存储(DEK + File -&gt; Encrypted File)</li>
<li><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251615591.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></li>
</ol>
<ul>
<li>
<p>DEK是加解密一个文件的密匙，而KMS里存储的EZ key是用来加解密所有文件的密匙（DEK）的密匙。</p>
</li>
<li>
<p>所以，EZ Key是更为重要的数据，只在KMS内部使用（DEK的加解密只在KMS内存进行），不会被传递到外面使用；</p>
</li>
<li>
<p>而HDFS服务端只能接触到EDEK。</p>
</li>
</ul>
<h3 id="读取解密文件的过程" tabindex="-1"><a class="header-anchor" href="#读取解密文件的过程" aria-hidden="true">#</a> 读取解密文件的过程</h3>
<ul>
<li>
<p>读流程与写流程类型，区别就是NN直接读取加密文件元数据里的EDEK返回给客户端，客户端一样把EDEK发送给KMS获取DEK。再对加密内容解密读取。</p>
</li>
<li>
<p>EDEK的加密和解密完全在KMS上进行。更重要的是，请求创建或解密EDEK的客户端永远不会处理EZ密钥。仅KMS可以根据要求使用EZ密钥创建和解密EDEK。</p>
</li>
</ul>
<h2 id="_5-2-kms配置" tabindex="-1"><a class="header-anchor" href="#_5-2-kms配置" aria-hidden="true">#</a> 5.2 KMS配置</h2>
<ol>
<li>
<p>关闭HDFS集群</p>
</li>
<li>
<p>创建keystore：<code v-pre>keytool -genkey -alias 'vinkgin_keystore'</code></p>
</li>
<li>
<p>配置kms.site.xml</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>hadoop.kms.key.provider.uri<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>jceks://file@/${user.home}/kms.jks<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>hadoop.security.keystore.java-keystore-provider.password-file<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>kms.keystore.password<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- kms.keystore.password需在当前目录自己创建，内容就是keystore设置的密码 --></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
		 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>dfs.encryption.key.provider.uri<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
		 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>kms://http@node1:16000/kms<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>hadoop.kms.authentication.type<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>simple<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><a href="http://kms-env.sh" target="_blank" rel="noopener noreferrer">kms-env.sh<ExternalLinkIcon/></a></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">KMS_HOME</span><span class="token operator">=</span>/export/server/hadoop-3.1.4
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KMS_LOG</span><span class="token operator">=</span><span class="token variable">${KMS_HOME}</span>/logs/kms
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KMS_HTTP_PORT</span><span class="token operator">=</span><span class="token number">16000</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KMS_ADMIN_PORT</span><span class="token operator">=</span><span class="token number">16001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>core-site.xml</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>hadoop.security.key.provider.path<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>kms://http@node1:16000/kms<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>hdfs-site.xml</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>name</span><span class="token punctuation">></span></span>dfs.encryption.key.provider.uri<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>name</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>value</span><span class="token punctuation">></span></span>kms://http@node1:16000/kms<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>value</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>同步配置文件</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /export/server/hadoop-3.1.4/etc/hadoop、
<span class="token function">scp</span> core-site.xml hdfs-site.xml kms-site.xml kms-env.sh  node2:/export/server/hadoop-3.1.4/etc/hadoop/
<span class="token function">scp</span> core-site.xml hdfs-site.xml kms-site.xml kms-env.sh  node3:/export/server/hadoop-3.1.4/etc/hadoop/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>启动KMS：<code v-pre>hadoop --daemon start kms</code></p>
</li>
<li>
<p>创建EZ key：<code v-pre>hadoop key create ezk</code></p>
</li>
<li>
<p>创建一个目录，并设置为加密区</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>hadoop fs <span class="token parameter variable">-mkdir</span> /zone 
hdfs crypto <span class="token parameter variable">-createZone</span> <span class="token parameter variable">-keyName</span> ezk <span class="token parameter variable">-path</span> /zone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
</div></template>


