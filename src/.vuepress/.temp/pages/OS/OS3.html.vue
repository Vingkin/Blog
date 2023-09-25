<template><div><h2 id="_1、初识文件管理" tabindex="-1"><a class="header-anchor" href="#_1、初识文件管理" aria-hidden="true">#</a> 1、初识文件管理</h2>
<ol>
<li>
<p>文件内部的数据组织形式</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220521220755154.png" alt="image-20220521220755154" tabindex="0" loading="lazy"><figcaption>image-20220521220755154</figcaption></figure>
</li>
<li>
<p>文件组织形式</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220521220941143.png" alt="image-20220521220941143" tabindex="0" loading="lazy"><figcaption>image-20220521220941143</figcaption></figure>
</li>
<li>
<p>操作系统向上提供的功能</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220521221245106.png" alt="image-20220521221245106" tabindex="0" loading="lazy"><figcaption>image-20220521221245106</figcaption></figure>
<p>可以使用几个基本操作完成更加复杂的操作，比如：复制文件：先创建一个新的空文件夹，再把源文件读入内存，再将内存中的数据写入到新文件中</p>
</li>
<li>
<p>文件如何存放在外存？</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220521221810990.png" alt="image-20220521221810990" tabindex="0" loading="lazy"><figcaption>image-20220521221810990</figcaption></figure>
</li>
<li>
<p>其他需要操作系统实现的文件管理功能</p>
<p>文件共享：使多个用户可以共享使用一个文件</p>
<p>文件保护：如何保证不同的用户对文件由不同的操作权限</p>
</li>
</ol>
<h2 id="_2、文件的逻辑结构" tabindex="-1"><a class="header-anchor" href="#_2、文件的逻辑结构" aria-hidden="true">#</a> 2、文件的逻辑结构</h2>
<p>文件逻辑结构：指在用户看来，文件内部的数据应该是如何组织起来的</p>
<p>文件的物理结构：在操作系统看来，文件的数据是如何存放在外存中的</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522125526046.png" alt="image-20220522125526046" tabindex="0" loading="lazy"><figcaption>image-20220522125526046</figcaption></figure>
<ol>
<li>
<p>无结构文件：文件内部的数据就是一系列二进制流或字符流组成。又称“<strong>流式文件</strong>”。比如：.txt文件</p>
</li>
<li>
<p>有结构文件：由一组相似的记录组成，又称为“<strong>记录式文件</strong>”。每条记录又由若干个数据项组成。如</p>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522125936141.png" alt="image-20220522125936141" tabindex="0" loading="lazy"><figcaption>image-20220522125936141</figcaption></figure>
<ul>
<li>
<p>根据各条记录的长度(占用的存储空间)是否相等，又可以分为<strong>定长记录和可变长记录</strong></p>
<ul>
<li>
<p>定长记录</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522131645588.png" alt="image-20220522131645588" tabindex="0" loading="lazy"><figcaption>image-20220522131645588</figcaption></figure>
</li>
<li>
<p>可变长记录</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522131805969.png" alt="image-20220522131805969" tabindex="0" loading="lazy"><figcaption>image-20220522131805969</figcaption></figure>
</li>
</ul>
</li>
</ul>
<ol start="3">
<li>
<p>顺序文件</p>
<ul>
<li>
<p>文件中的记录一个接一个的顺序排列(逻辑上)，记录<strong>可以是定长的或可变长的</strong>。各个记录在物理上可以<strong>顺序存储或链式存储</strong></p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522132423543.png" alt="image-20220522132423543" tabindex="0" loading="lazy"><figcaption>image-20220522132423543</figcaption></figure>
</li>
<li>
<p>已经知道文件的起始地址，能否找到第i个记录对应的地址即能否实现随机存储，能否根据关键字实现随机查找？</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522134405761.png" alt="image-20220522134405761" tabindex="0" loading="lazy"><figcaption>image-20220522134405761</figcaption></figure>
</li>
</ul>
</li>
<li>
<p>索引文件</p>
<p>解决的问题：对于可变长记录文件，要找到第i个记录，必须先顺序查找第i - 1个记录。</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522135220091.png" alt="image-20220522135220091" tabindex="0" loading="lazy"><figcaption>image-20220522135220091</figcaption></figure>
</li>
<li>
<p>索引顺序文件</p>
<p>解决问题：每个记录对应一个索引表项，因此索引表可能会很大</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522141420657.png" alt="image-20220522141420657" tabindex="0" loading="lazy"><figcaption>image-20220522141420657</figcaption></figure>
<ul>
<li>
<p>文件检索效率</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522142220989.png" alt="image-20220522142220989" tabindex="0" loading="lazy"><figcaption>image-20220522142220989</figcaption></figure>
</li>
<li>
<p>多级索引顺序文件</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522142404913.png" alt="image-20220522142404913" tabindex="0" loading="lazy"><figcaption>image-20220522142404913</figcaption></figure>
</li>
</ul>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522142638847.png" alt="image-20220522142638847" tabindex="0" loading="lazy"><figcaption>image-20220522142638847</figcaption></figure>
<h2 id="_3、文件目录" tabindex="-1"><a class="header-anchor" href="#_3、文件目录" aria-hidden="true">#</a> 3、文件目录</h2>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522143959739.png" alt="image-20220522143959739" tabindex="0" loading="lazy"><figcaption>image-20220522143959739</figcaption></figure>
<ol>
<li>
<p>文件控制块</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522144708324.png" alt="image-20220522144708324" tabindex="0" loading="lazy"><figcaption>image-20220522144708324</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522144900273.png" alt="image-20220522144900273" tabindex="0" loading="lazy"><figcaption>image-20220522144900273</figcaption></figure>
<p>需要对目录进行哪些操作？</p>
<p><strong>搜索</strong>：当用户需要使用一个文件的时候，系统要根据文件名搜索目录，找到该文件对应的目录项</p>
<p><strong>创建文件</strong>：创建一个新文件时，需要在其所属的目录中增加一个目录项</p>
<p><strong>删除文件</strong>：当删除一个文件时，需要在目录中删除相应的目录项</p>
<p><strong>显示目录</strong>：用户可以请求显示目录的内容，如显示该目录中的所有文件及相应的属性</p>
<p><strong>修改目录</strong>：某些文件属性保存在目录中，因此这些属性变化时需要修改相应的目录项</p>
</li>
<li>
<p>目录结构----单级目录结构</p>
<p>整个系统只建立一张目录表，每个文件占一个目录项</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522202312578.png" alt="image-20220522202312578" tabindex="0" loading="lazy"><figcaption>image-20220522202312578</figcaption></figure>
</li>
<li>
<p>目录结构---两级目录结构</p>
<p>早期的多用户操作系统，采用两级目录结构。分为主文件目录(MFD)和用户文件目录(UFD)</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522203520109.png" alt="image-20220522203520109" tabindex="0" loading="lazy"><figcaption>image-20220522203520109</figcaption></figure>
</li>
<li>
<p>目录结构---多级目录结构(又称树形目录结构)</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522203842838.png" alt="image-20220522203842838" tabindex="0" loading="lazy"><figcaption>image-20220522203842838</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522204512602.png" alt="image-20220522204512602" tabindex="0" loading="lazy"><figcaption>image-20220522204512602</figcaption></figure>
</li>
<li>
<p>目录结构---无环图目录结构</p>
<p>解决的问题：树形目录结构可以很方便的对文件进行分类，层次结构清晰，也能够更有效地进行文件的管理和保护。但是，树形结构不便于实现文件的共享。</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522213646590.png" alt="image-20220522213646590" tabindex="0" loading="lazy"><figcaption>image-20220522213646590</figcaption></figure>
</li>
<li>
<p>索引结点(FCB的改进)</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522213950345.png" alt="image-20220522213950345" tabindex="0" loading="lazy"><figcaption>image-20220522213950345</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522214100918.png" alt="image-20220522214100918" tabindex="0" loading="lazy"><figcaption>image-20220522214100918</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220522214148310.png" alt="image-20220522214148310" tabindex="0" loading="lazy"><figcaption>image-20220522214148310</figcaption></figure>
<h2 id="_4、文件的物理结构" tabindex="-1"><a class="header-anchor" href="#_4、文件的物理结构" aria-hidden="true">#</a> 4、文件的物理结构</h2>
<ol>
<li>
<p>类似内存分页，磁盘中的存储单元也会被分为一个个“块/磁盘块/物理块”，<strong>磁盘块的大小与内存块、页面的大小相同</strong></p>
</li>
<li>
<p>内存与磁盘之间的数据交换(即读/写操作、磁盘I/O)都是以块为单位进行的，即每次读入一块，或每次写出一块</p>
</li>
<li>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220524133535599.png" alt="image-20220524133535599" tabindex="0" loading="lazy"><figcaption>image-20220524133535599</figcaption></figure>
</li>
<li>
<p>文件分配方式----连续分配</p>
<ul>
<li>
<p>连续分配方式要求每个文件在磁盘上占有一组连续的块</p>
</li>
<li>
<p>优点：支持顺序访问和直接访问(即随机访问)；连续分配的文件在顺序访问时速度最快</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220524134337470.png" alt="image-20220524134337470" tabindex="0" loading="lazy"><figcaption>image-20220524134337470</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220524134541056.png" alt="image-20220524134541056" tabindex="0" loading="lazy"><figcaption>image-20220524134541056</figcaption></figure>
</li>
<li>
<p>缺点：不方便文件拓展；存储空间利用率低，会产生磁盘碎片</p>
<figure><img src="@source/OS/C:/Users/AIERXUAN/Desktop/picture/image-20220524135042854-16533715138903.png" alt="image-20220524135042854" tabindex="0" loading="lazy"><figcaption>image-20220524135042854</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220524142132631.png" alt="image-20220524142132631" tabindex="0" loading="lazy"><figcaption>image-20220524142132631</figcaption></figure>
</li>
</ul>
</li>
<li>
<p>文件分配方式---链接分配</p>
<p>链接分配采取离散分配的方式，可以为文件分配离散的磁盘块。分为隐式链接和显式链接两种</p>
<ul>
<li>
<p>隐式链接</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220529212115224.png" alt="image-20220529212115224" tabindex="0" loading="lazy"><figcaption>image-20220529212115224</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220529212212817.png" alt="image-20220529212212817" tabindex="0" loading="lazy"><figcaption>image-20220529212212817</figcaption></figure>
<p>隐式链接：除文件的最后一个盘块之外，每个盘块中都存有指向下一个盘块的指针。文件目录包括文件第一块的指针和最后一块指针</p>
<p>优点：方便文件拓展，不会有碎片问题，外存利用率高</p>
<p>缺点：只支持顺序访问，不支持随机访问，查找效率低，指向下一个盘块的指针也需要耗费少量的存储空间。</p>
</li>
<li>
<p>显示链接</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220529212901703.png" alt="image-20220529212901703" tabindex="0" loading="lazy"><figcaption>image-20220529212901703</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220529213416885.png" alt="image-20220529213416885" tabindex="0" loading="lazy"><figcaption>image-20220529213416885</figcaption></figure>
<p>显示链接---把用于链接文件各个物理块的指针显示的存放在一张表中，即文件分配表(FAT)。一个磁盘只会建立一张文件分配表，开机时文件分配表放入内存，并常驻内存。</p>
<p>优点：方便文件拓展，不会有碎片问题，外存利用率高，并且支持随机访问，相比于隐式链接来说，地址转换时不需要访问磁盘，因此文件的访问效率更高</p>
<p>缺点：文件分配表需要占用一定的内存</p>
</li>
<li>
<p>索引分配</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220529214611813.png" alt="image-20220529214611813" tabindex="0" loading="lazy"><figcaption>image-20220529214611813</figcaption></figure>
<p>如何实现文件的逻辑块号到物理块号的转换？</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220529215048681.png" alt="image-20220529215048681" tabindex="0" loading="lazy"><figcaption>image-20220529215048681</figcaption></figure>
<p>若每个磁盘块1KB，一个索引表项4B，则一个磁盘块只能存放256个索引项，如果一个文件的大小超过了256块，那么一个磁盘块是装不下文件的整张索引表的，如何解决？</p>
<p>①链接方案</p>
<p>②多层索引</p>
<p>③混合索引</p>
<ul>
<li>
<p>链接方案</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220529222421721.png" alt="image-20220529222421721" tabindex="0" loading="lazy"><figcaption>image-20220529222421721</figcaption></figure>
</li>
<li>
<p>多层索引</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530143548528.png" alt="image-20220530143548528" tabindex="0" loading="lazy"><figcaption>image-20220530143548528</figcaption></figure>
<p>采用k层索引结构，且顶级索引表未调入内存，则访问一个数据块只需要k + 1次读磁盘操作</p>
</li>
<li>
<p>混合索引</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530144020397.png" alt="image-20220530144020397" tabindex="0" loading="lazy"><figcaption>image-20220530144020397</figcaption></figure>
</li>
</ul>
</li>
</ul>
</li>
</ol>
<h2 id="_5、文件存储空间管理" tabindex="-1"><a class="header-anchor" href="#_5、文件存储空间管理" aria-hidden="true">#</a> 5、文件存储空间管理</h2>
<ol>
<li>
<p>存储空间的划分与初始化</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530144632343.png" alt="image-20220530144632343" tabindex="0" loading="lazy"><figcaption>image-20220530144632343</figcaption></figure>
</li>
<li>
<p>存储空间管理---空闲表法</p>
<p>适用于连续分配方式</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530145112083.png" alt="image-20220530145112083" tabindex="0" loading="lazy"><figcaption>image-20220530145112083</figcaption></figure>
</li>
<li>
<p>存储空间管理---空闲链表法</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530145400964.png" alt="image-20220530145400964" tabindex="0" loading="lazy"><figcaption>image-20220530145400964</figcaption></figure>
<ul>
<li>
<p>空闲盘块链</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530145536142.png" alt="image-20220530145536142" tabindex="0" loading="lazy"><figcaption>image-20220530145536142</figcaption></figure>
</li>
<li>
<p>空闲盘区链</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530145757007.png" alt="image-20220530145757007" tabindex="0" loading="lazy"><figcaption>image-20220530145757007</figcaption></figure>
</li>
</ul>
</li>
<li>
<p>存储空间管理---位视图法</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530193310886.png" alt="image-20220530193310886" tabindex="0" loading="lazy"><figcaption>image-20220530193310886</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530193511600.png" alt="image-20220530193511600" tabindex="0" loading="lazy"><figcaption>image-20220530193511600</figcaption></figure>
<p>连续分配、离散分配都适用</p>
</li>
<li>
<p>存储空间管理---成组链接法</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530193750402.png" alt="image-20220530193750402" tabindex="0" loading="lazy"><figcaption>image-20220530193750402</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530194728231.png" alt="image-20220530194728231" tabindex="0" loading="lazy"><figcaption>image-20220530194728231</figcaption></figure>
<p>如何进行空闲块的分配？</p>
<p>比如：需要100个空闲块</p>
<p>①检查第一个分组的块数是否足够。100 = 100，足够。</p>
<p>②分配第一个分组中的100个空闲块。但是由于300号块内存放了再下一组的信息，因此300号块的数据需要复制到超级块中</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530195251537.png" alt="image-20220530195251537" tabindex="0" loading="lazy"><figcaption>image-20220530195251537</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530195308743.png" alt="image-20220530195308743" tabindex="0" loading="lazy"><figcaption>image-20220530195308743</figcaption></figure>
<p>如何回收？</p>
<p>假设每个分组最多为100个空闲块，此时第一个分组已有100个块，还要再回收一块。需要将超级块中的数据复制到新回收的块中，并修改超级块的内容，让新回收的块成为第一个分组</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530195708965.png" alt="image-20220530195708965" tabindex="0" loading="lazy"><figcaption>image-20220530195708965</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530195918540.png" alt="image-20220530195918540" tabindex="0" loading="lazy"><figcaption>image-20220530195918540</figcaption></figure>
<h2 id="_6、文件的基本操作" tabindex="-1"><a class="header-anchor" href="#_6、文件的基本操作" aria-hidden="true">#</a> 6、文件的基本操作</h2>
<ol>
<li>
<p>创建文件</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530201101036.png" alt="image-20220530201101036" tabindex="0" loading="lazy"><figcaption>image-20220530201101036</figcaption></figure>
</li>
<li>
<p>删除文件</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530201342594.png" alt="image-20220530201342594" tabindex="0" loading="lazy"><figcaption>image-20220530201342594</figcaption></figure>
</li>
<li>
<p>打开文件</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530201818071.png" alt="image-20220530201818071" tabindex="0" loading="lazy"><figcaption>image-20220530201818071</figcaption></figure>
</li>
<li>
<p>打开文件</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530202619445.png" alt="image-20220530202619445" tabindex="0" loading="lazy"><figcaption>image-20220530202619445</figcaption></figure>
</li>
<li>
<p>关闭文件</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530202718681.png" alt="image-20220530202718681" tabindex="0" loading="lazy"><figcaption>image-20220530202718681</figcaption></figure>
</li>
<li>
<p>读文件</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530204655334.png" alt="image-20220530204655334" tabindex="0" loading="lazy"><figcaption>image-20220530204655334</figcaption></figure>
</li>
<li>
<p>写文件</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530204953730.png" alt="image-20220530204953730" tabindex="0" loading="lazy"><figcaption>image-20220530204953730</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530205021424.png" alt="image-20220530205021424" tabindex="0" loading="lazy"><figcaption>image-20220530205021424</figcaption></figure>
<h2 id="_7、文件共享" tabindex="-1"><a class="header-anchor" href="#_7、文件共享" aria-hidden="true">#</a> 7、文件共享</h2>
<p>文件共享是操作系统为用户提供文件共享功能，可以让多个用户共享的适用同一个文件，多个用户共享同一个文件，意味着系统中只有“一份”文件数据。并且只要某个用户修改了该文件数据，其他用户也可以看到文件数据的变化</p>
<ol>
<li>
<p>基于索引节点的共享方式(硬链接)</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530205956876.png" alt="image-20220530205956876" tabindex="0" loading="lazy"><figcaption>image-20220530205956876</figcaption></figure>
</li>
<li>
<p>基于符号链的共享方式(软链接)</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530210148637.png" alt="image-20220530210148637" tabindex="0" loading="lazy"><figcaption>image-20220530210148637</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530210336394.png" alt="image-20220530210336394" tabindex="0" loading="lazy"><figcaption>image-20220530210336394</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530210456044.png" alt="image-20220530210456044" tabindex="0" loading="lazy"><figcaption>image-20220530210456044</figcaption></figure>
<h2 id="_8、文件保护" tabindex="-1"><a class="header-anchor" href="#_8、文件保护" aria-hidden="true">#</a> 8、文件保护</h2>
<ol>
<li>
<p>口令保护</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530210706405.png" alt="image-20220530210706405" tabindex="0" loading="lazy"><figcaption>image-20220530210706405</figcaption></figure>
</li>
<li>
<p>加密保护</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530210923203.png" alt="image-20220530210923203" tabindex="0" loading="lazy"><figcaption>image-20220530210923203</figcaption></figure>
<p>每五位就与01001进行异或操作</p>
<p>优点：保密性强，不需要再系统中存储“密码”</p>
<p>缺点：编码/译码(加密/解密)要花费一定时间</p>
</li>
<li>
<p>访问控制</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530212222775.png" alt="image-20220530212222775" tabindex="0" loading="lazy"><figcaption>image-20220530212222775</figcaption></figure>
<p>精简的访问列表：以“组”为单位，标记各“组”用户可以对文件执行哪些操作。比如：分为 系统管理员、文件主、文件主的伙伴、其他用户 几个分组</p>
<p>当用户想要访问文件时，系统会检查该用户所属的分组是否有相应的访问权限</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530212539209.png" alt="image-20220530212539209" tabindex="0" loading="lazy"><figcaption>image-20220530212539209</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530212817688.png" alt="image-20220530212817688" tabindex="0" loading="lazy"><figcaption>image-20220530212817688</figcaption></figure>
<h2 id="_9、文件系统的层次结构" tabindex="-1"><a class="header-anchor" href="#_9、文件系统的层次结构" aria-hidden="true">#</a> 9、文件系统的层次结构</h2>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530213756966.png" alt="image-20220530213756966" tabindex="0" loading="lazy"><figcaption>image-20220530213756966</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530214006044.png" alt="image-20220530214006044" tabindex="0" loading="lazy"><figcaption>image-20220530214006044</figcaption></figure>
<h2 id="_10、磁盘的结构" tabindex="-1"><a class="header-anchor" href="#_10、磁盘的结构" aria-hidden="true">#</a> 10、磁盘的结构</h2>
<ol>
<li>
<p>磁盘、磁道、扇区</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530214532180.png" alt="image-20220530214532180" tabindex="0" loading="lazy"><figcaption>image-20220530214532180</figcaption></figure>
</li>
<li>
<p>如何在磁盘中读/写数据</p>
<figure><img src="@source/OS/C:/Users/AIERXUAN/Desktop/picture/image-20220530214811906-16539185445651.png" alt="image-20220530214811906" tabindex="0" loading="lazy"><figcaption>image-20220530214811906</figcaption></figure>
</li>
<li>
<p>盘面/柱面</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530220243511.png" alt="image-20220530220243511" tabindex="0" loading="lazy"><figcaption>image-20220530220243511</figcaption></figure>
<p>柱面：具有相同编号的磁道形成的圆柱</p>
</li>
<li>
<p>磁盘的分类</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530220354717.png" alt="image-20220530220354717" tabindex="0" loading="lazy"><figcaption>image-20220530220354717</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530220421638.png" alt="image-20220530220421638" tabindex="0" loading="lazy"><figcaption>image-20220530220421638</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530220453740.png" alt="image-20220530220453740" tabindex="0" loading="lazy"><figcaption>image-20220530220453740</figcaption></figure>
<h2 id="_11、磁盘调度算法" tabindex="-1"><a class="header-anchor" href="#_11、磁盘调度算法" aria-hidden="true">#</a> 11、磁盘调度算法</h2>
<ol>
<li>
<p>一次磁盘读/写操作需要的时间</p>
<ul>
<li>
<p>寻找时间(寻道时间)<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>T</mi><mi>s</mi></msub></mrow><annotation encoding="application/x-tex">T_s</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">s</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> :在读/写数据前，将磁头移动到指定磁盘所花的时间</p>
<ol>
<li>启动磁头臂时间为s</li>
<li>移动磁头时间，假设是匀速移动，每跨越一个磁道耗时为m，总共需要跨越n个磁道</li>
</ol>
<p>寻道时间 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>T</mi><mi>s</mi></msub><mo>=</mo><mi>s</mi><mo>+</mo><mi>m</mi><mo>∗</mo><mi>n</mi></mrow><annotation encoding="application/x-tex">T_s = s + m * n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">s</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">s</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.4653em;"></span><span class="mord mathnormal">m</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span></p>
</li>
<li>
<p>延迟时间<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>T</mi><mi>R</mi></msub></mrow><annotation encoding="application/x-tex">T_R</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.00773em;">R</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> :通过旋转磁盘，使磁头定位到目标扇区所需要的时间。设磁盘转速为r，则平均所需的延迟时间$T_R = \frac{1}{2} * \frac{1}{r} = \frac{1}{2r} $ (<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mn>1</mn><mi>r</mi></mfrac></mrow><annotation encoding="application/x-tex">\frac{1}{r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1901em;vertical-align:-0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span> 是转动一圈需要的时间，找到目标扇区平均需要转半圈，因此乘<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mn>1</mn><mn>2</mn></mfrac></mrow><annotation encoding="application/x-tex">\frac{1}{2}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1901em;vertical-align:-0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span>)</p>
</li>
<li>
<p>传输时间<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>T</mi><mi>s</mi></msub></mrow><annotation encoding="application/x-tex">T_s</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">s</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span> :从磁盘读出或向磁盘写入数据所经历的时间，假设磁盘转速为r，此次读/写的字节数为b，每个磁盘上的字节数为N。则</p>
<p>传输时间<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>T</mi><mi>s</mi></msub><mo>=</mo><mfrac><mn>1</mn><mi>r</mi></mfrac><mo>∗</mo><mfrac><mi>b</mi><mi>N</mi></mfrac><mo>=</mo><mfrac><mi>b</mi><mrow><mi>r</mi><mi>N</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">T_s = \frac{1}{r} * \frac{b}{N} = \frac{b}{rN}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">s</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1.1901em;vertical-align:-0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">∗</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.2251em;vertical-align:-0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8801em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.10903em;">N</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1.2251em;vertical-align:-0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8801em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span><span class="mord mathnormal mtight" style="margin-right:0.10903em;">N</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span> (每个磁道可存N字节的数据，因此b字节的数据需要b/N个磁道才能存储，而读/写一个磁道所需的时间刚好又是转一圈所需要的时间<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mn>1</mn><mi>r</mi></mfrac></mrow><annotation encoding="application/x-tex">\frac{1}{r}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1.1901em;vertical-align:-0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span> )</p>
</li>
</ul>
<p>总的平均存储时间<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>T</mi><mi>a</mi></msub><mo>=</mo><msub><mi>T</mi><mi>s</mi></msub><mo>+</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mi>r</mi></mrow></mfrac><mo>+</mo><mfrac><mi>b</mi><mrow><mi>r</mi><mi>N</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">T_a = T_s + \frac{1}{2r} + \frac{b}{rN}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">a</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">T</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.1514em;"><span style="top:-2.55em;margin-left:-0.1389em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">s</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.1901em;vertical-align:-0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">1</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:1.2251em;vertical-align:-0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8801em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.02778em;">r</span><span class="mord mathnormal mtight" style="margin-right:0.10903em;">N</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">b</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></p>
<p>延迟时间和传输时间都与磁盘转速相关，且为线性相关。而转速是硬件固有的属性，因此操作系统也无法优化延迟时间和传输时间。</p>
</li>
<li>
<p>磁盘调度算法</p>
<ul>
<li>
<p>先来先服务算法(FCFS)</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220530224610670.png" alt="image-20220530224610670" tabindex="0" loading="lazy"><figcaption>image-20220530224610670</figcaption></figure>
</li>
<li>
<p>最短寻找时间优先(SSTF)</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220531113725569.png" alt="image-20220531113725569" tabindex="0" loading="lazy"><figcaption>image-20220531113725569</figcaption></figure>
</li>
<li>
<p>扫描算法(SCAN)</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220531114050634.png" alt="image-20220531114050634" tabindex="0" loading="lazy"><figcaption>image-20220531114050634</figcaption></figure>
</li>
<li>
<p>LOOK调度算法</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220531114605608.png" alt="image-20220531114605608" tabindex="0" loading="lazy"><figcaption>image-20220531114605608</figcaption></figure>
</li>
<li>
<p>循环扫描算法(C-SCAN)</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220531114848212.png" alt="image-20220531114848212" tabindex="0" loading="lazy"><figcaption>image-20220531114848212</figcaption></figure>
</li>
<li>
<p>C-LOOK调度算法</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220531115047482.png" alt="image-20220531115047482" tabindex="0" loading="lazy"><figcaption>image-20220531115047482</figcaption></figure>
</li>
</ul>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220531115101881.png" alt="image-20220531115101881" tabindex="0" loading="lazy"><figcaption>image-20220531115101881</figcaption></figure>
<h2 id="_12、减少延迟时间的方法" tabindex="-1"><a class="header-anchor" href="#_12、减少延迟时间的方法" aria-hidden="true">#</a> 12、减少延迟时间的方法</h2>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220531200459574.png" alt="image-20220531200459574" tabindex="0" loading="lazy"><figcaption>image-20220531200459574</figcaption></figure>
<ol>
<li>
<p>减少延迟时间的方法：交替编号</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220531201414435.png" alt="image-20220531201414435" tabindex="0" loading="lazy"><figcaption>image-20220531201414435</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220531223117841.png" alt="image-20220531223117841" tabindex="0" loading="lazy"><figcaption>image-20220531223117841</figcaption></figure>
<p>转两圈读完的原因：因为要一个隔着一个的读，所以需要两圈</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220531223412094.png" alt="image-20220531223412094" tabindex="0" loading="lazy"><figcaption>image-20220531223412094</figcaption></figure>
</li>
<li>
<p>减少延迟时间的方法：错位命名</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220607112210165.png" alt="image-20220607112210165" tabindex="0" loading="lazy"><figcaption>image-20220607112210165</figcaption></figure>
<ul>
<li>0号盘面是在1号盘面上面的，扇区都一一对应，转两圈读取完0号盘面的数据以后，读取1号盘面的0扇区时无法立即开始读，增加了延迟时间</li>
</ul>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220607112458312.png" alt="image-20220607112458312" tabindex="0" loading="lazy"><figcaption>image-20220607112458312</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220607112703160.png" alt="image-20220607112703160" tabindex="0" loading="lazy"><figcaption>image-20220607112703160</figcaption></figure>
<h2 id="_13、磁盘的管理" tabindex="-1"><a class="header-anchor" href="#_13、磁盘的管理" aria-hidden="true">#</a> 13、磁盘的管理</h2>
<ol>
<li>
<p>磁盘初始化</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220607113400305.png" alt="image-20220607113400305" tabindex="0" loading="lazy"><figcaption>image-20220607113400305</figcaption></figure>
</li>
<li>
<p>引导块</p>
<ul>
<li>计算机开机时需要进行一系列初始化工作，这些初始化工作是通过执行**初始化程序(自举程序)**完成的</li>
<li>在ROM中存放了很小的&quot;自举装入程序&quot;，开机时计算机先运行&quot;自举装入程序&quot;，通过执行该程序就可以找到引导块，并将完整的自举程序读入内存，完成初始化</li>
<li>完整的自举程序放在磁盘的启动块(即引导块/启动分区)上，启动块位于磁盘的固定位置，拥有启动分区的磁盘为启动磁盘或系统磁盘(C:盘)</li>
</ul>
</li>
<li>
<p>坏块管理</p>
<p>坏块：无法正常使用的扇区，属于硬件故障，操作系统是无法修复的，应该将坏块标记出来，以免错误的使用到它</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608103307481.png" alt="image-20220608103307481" tabindex="0" loading="lazy"><figcaption>image-20220608103307481</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608103332891.png" alt="image-20220608103332891" tabindex="0" loading="lazy"><figcaption>image-20220608103332891</figcaption></figure>
<h2 id="_14、i-o设备的基本概念和分类" tabindex="-1"><a class="header-anchor" href="#_14、i-o设备的基本概念和分类" aria-hidden="true">#</a> 14、I/O设备的基本概念和分类</h2>
<ol>
<li>
<p>I/O设备介绍</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608104012756.png" alt="image-20220608104012756" tabindex="0" loading="lazy"><figcaption>image-20220608104012756</figcaption></figure>
</li>
<li>
<p>I/O设备的分类</p>
<ul>
<li>
<p>按照使用特性分类</p>
<figure><img src="@source/OS/C:/Users/AIERXUAN/Desktop/picture/image-20220608104222135-16546561790021.png" alt="image-20220608104222135" tabindex="0" loading="lazy"><figcaption>image-20220608104222135</figcaption></figure>
</li>
<li>
<p>按照传输速率分类</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608104500993.png" alt="image-20220608104500993" tabindex="0" loading="lazy"><figcaption>image-20220608104500993</figcaption></figure>
</li>
<li>
<p>按信息交换的单位分类</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608104632049.png" alt="image-20220608104632049" tabindex="0" loading="lazy"><figcaption>image-20220608104632049</figcaption></figure>
</li>
</ul>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608104719687.png" alt="image-20220608104719687" tabindex="0" loading="lazy"><figcaption>image-20220608104719687</figcaption></figure>
<h2 id="_15、i-o控制器" tabindex="-1"><a class="header-anchor" href="#_15、i-o控制器" aria-hidden="true">#</a> 15、I/O控制器</h2>
<ol>
<li>
<p>I/O设备的机械部件</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608104921354.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</li>
<li>
<p>I/O设备的电子部件(I/O控制器)</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608105259812.png" alt="image-20220608105259812" tabindex="0" loading="lazy"><figcaption>image-20220608105259812</figcaption></figure>
</li>
<li>
<p>I/O控制器的组成</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608105835197.png" alt="image-20220608105835197" tabindex="0" loading="lazy"><figcaption>image-20220608105835197</figcaption></figure>
<p>注意：</p>
<ul>
<li>一个I/O控制器可能会对应多个设备</li>
<li>数据寄存器、控制寄存器、状态寄存器可能也有多个，每个控制/状态寄存器对应一个具体的设备，且这些寄存器都要有相应的地址，才能方便CPU操作。有的计算机会让这些寄存器占用内存地址的一部分，称为<strong>内存映像I/O</strong>;另一些计算机则采用I/O专用地址，即<strong>寄存器独立编址</strong></li>
</ul>
</li>
<li>
<p>内存映像I/O与寄存器独立编址</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608110542490.png" alt="image-20220608110542490" tabindex="0" loading="lazy"><figcaption>image-20220608110542490</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608110604462.png" alt="image-20220608110604462" tabindex="0" loading="lazy"><figcaption>image-20220608110604462</figcaption></figure>
<h2 id="_16、i-o控制方式" tabindex="-1"><a class="header-anchor" href="#_16、i-o控制方式" aria-hidden="true">#</a> 16、I/O控制方式</h2>
<ol>
<li>
<p>程序直接控制方式</p>
<ol>
<li>完成一次读/写操作的流程(轮询)</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608132930223.png" alt="image-20220608132930223" tabindex="0" loading="lazy"><figcaption>image-20220608132930223</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608133444265.png" alt="image-20220608133444265" tabindex="0" loading="lazy"><figcaption>image-20220608133444265</figcaption></figure>
<ol start="2">
<li>
<p>CPU干预的频率</p>
<p>很频繁，I/O操作开始之前、完成之后需要CPU介入，并且在等待I/O完成的过程中CPU需要不断的轮询检查</p>
</li>
<li>
<p>数据传送的单位</p>
<p>每次读/写<strong>一个字</strong></p>
</li>
<li>
<p>数据的流向</p>
<p>读操作(数据输入)：I/O设备 ---&gt; CPU --&gt; 内存</p>
<p>写操作(数据输出)：内存 ---&gt; CPU ---&gt; I/O设备</p>
<p>每个字的读/写都需要CPU的帮助</p>
</li>
<li>
<p>优缺点</p>
<p>优点：实现简单，在读/写指令之后，加上实现循环检查的一系列指令即可</p>
<p>缺点：CPU和I/O设备只能串行工作，CPU需要一直轮询检查，长期处于“忙等”状态，CPU利用率低</p>
</li>
</ol>
</li>
<li>
<p>中断驱动方式</p>
<ol>
<li>
<p>完成一次读/写操作的流程</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608134521785.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</li>
<li>
<p>CPU干预的频率</p>
<p>每次I/O操作开始之前、完成之后需要CPU介入</p>
<p>等待I/O完成的过程中CPU可以切换到别的进程执行</p>
</li>
<li>
<p>数据传送单位</p>
<p>每次读/写<strong>一个字</strong></p>
</li>
<li>
<p>数据的流向</p>
<p>读操作(数据输入)：I/O设备 ---&gt; CPU --&gt; 内存</p>
<p>写操作(数据输出)：内存 ---&gt; CPU ---&gt; I/O设备</p>
</li>
<li>
<p>优缺点</p>
<p>优点：与程序直接控制方式相比，在中断驱动方式中，I/O控制器会通过中断信号主动报告I/O已完成，CPU不再需要不停的轮询。<strong>CPU与I/O设备可并行工作</strong>，CPU利用率得到明显的提升</p>
<p>缺点：每个字在I/O设备与内存之间的传输，都需要经过CPU。而<strong>频繁的中断处理会消耗较多的CPU时间</strong>，每次中断只能传输一个字</p>
</li>
</ol>
</li>
<li>
<p>DMA方式(直接存储器存取)</p>
<p>完成一次读/写操作的流程</p>
<figure><img src="@source/OS/C:/Users/AIERXUAN/Desktop/picture/image-20220608140442691-16546685878863.png" alt="image-20220608140442691" tabindex="0" loading="lazy"><figcaption>image-20220608140442691</figcaption></figure>
<ol>
<li>
<p>DMA控制器</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608140914035.png" alt="image-20220608140914035" tabindex="0" loading="lazy"><figcaption>image-20220608140914035</figcaption></figure>
</li>
<li>
<p>CPU干预的频率</p>
<p>在传送一个或多个数据块的开始和结束时，才需要CPU的干预</p>
</li>
<li>
<p>数据传送的单位</p>
<p>每次读/写一个或多个块(注意每次读写的只能是连续的多个块，且这些块读入内存后在)</p>
</li>
<li>
<p>数据的流向(不再需要经过CPU)</p>
<p>读操作(数据输入)：I/O设备 ---&gt; 内存</p>
<p>写操作(数据输出)：内存 ---&gt; I/O设备</p>
</li>
<li>
<p>优缺点</p>
<p>优点：数据传输以&quot;块&quot;为单位，CPU介入频率进一步降低。数据的传输不再需要先经过CPU再写入内存，数据传输效率进一步增加。CPU和I/O设备的并行性得到提升</p>
<p>缺点：CPU每发出一条I/O指令，只能读/写一个或多个连续的数据块。如果要读写多个离散存储的数据块，或者要将数据分别写到不同内存区域时，CPU要分别发出多条I/O指令，进行多次中断处理才能完成</p>
</li>
</ol>
</li>
<li>
<p>通道控制方式</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608144106793.png" alt="image-20220608144106793" tabindex="0" loading="lazy"><figcaption>image-20220608144106793</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608144250495.png" alt="image-20220608144250495" tabindex="0" loading="lazy"><figcaption>image-20220608144250495</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608144448647.png" alt="image-20220608144448647" tabindex="0" loading="lazy"><figcaption>image-20220608144448647</figcaption></figure>
<h2 id="_17、i-o软件层次结构" tabindex="-1"><a class="header-anchor" href="#_17、i-o软件层次结构" aria-hidden="true">#</a> 17、I/O软件层次结构</h2>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608144740589-16546708755945.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol>
<li>
<p>用户层系统</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608145040522.png" alt="image-20220608145040522" tabindex="0" loading="lazy"><figcaption>image-20220608145040522</figcaption></figure>
</li>
<li>
<p>设备独立性软件</p>
<p>设备独立性软件，又称设备无关性软件，与设备的硬件特性无关的功能都几乎在这一层实现。</p>
<p>主要实现的功能：</p>
<ol>
<li>
<p>向上层提供统一的调用接口(如read/write系统调用)</p>
</li>
<li>
<p>设备的保护：设备被看做是一种特殊的文件，不同用户对各个文件的访问权限是不一样的，同理，对设备的访问权限也不一样</p>
</li>
<li>
<p>差错处理：对一些设备的错误进行处理</p>
</li>
<li>
<p>设备的分配与回收</p>
</li>
<li>
<p>数据缓冲区管理：通过缓冲技术屏蔽设备之间数据交换单位大小和传输速度的差异</p>
</li>
<li>
<p>建立逻辑设备名到物理设备名的映射关系，根据设备类型选择调用相应的驱动程序</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608150454000.png" alt="image-20220608150454000" tabindex="0" loading="lazy"><figcaption>image-20220608150454000</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608150624784.png" alt="image-20220608150624784" tabindex="0" loading="lazy"><figcaption>image-20220608150624784</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608150637422.png" alt="image-20220608150637422" tabindex="0" loading="lazy"><figcaption>image-20220608150637422</figcaption></figure>
</li>
</ol>
</li>
<li>
<p>设备驱动程序</p>
<p>负责对硬件设备的具体控制，将上层发出的一系列命令(如read/write)转化成特定设备能听得懂的一些列操作，包括设置设备寄存器，检查设备状态等。不同的I/O设备有不同的硬件特性，具体细节只有设备厂家才知道，因此厂家需要根据设备的硬件特性设计并提供相应的驱动程序</p>
</li>
<li>
<p>中断处理程序</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608152211751.png" alt="image-20220608152211751" tabindex="0" loading="lazy"><figcaption>image-20220608152211751</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608153523239.png" alt="image-20220608153523239" tabindex="0" loading="lazy"><figcaption>image-20220608153523239</figcaption></figure>
<h2 id="_18、i-o核心子系统" tabindex="-1"><a class="header-anchor" href="#_18、i-o核心子系统" aria-hidden="true">#</a> 18、I/O核心子系统</h2>
<p>I/O系统(I/O核心子系统)属于操作系统的内核部分，主要包括：设备独立性软件、设备驱动程序、中断处理程序</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220608154426249.png" alt="image-20220608154426249" tabindex="0" loading="lazy"><figcaption>image-20220608154426249</figcaption></figure>
<ol>
<li>
<p>I/O调度：用某种算法确定一个好的顺序来处理各个I/O请求</p>
<p>比如：磁盘调度 ，当多个磁盘I/O请求到来时，用某种调度算法来确定满足I/O请求的顺序</p>
</li>
<li>
<p>设备保护：</p>
<p>操作系统需要实现文件保护功能，不同的用户对各个文件有不同的访问权限(如：只读、读和写等)</p>
<p>在UNIX系统中，设备被看做是一种特殊的文件，每个设备也会有对应的FCB。当用户请求访问某个设备时，系统根据FCB中记录的信息来判断该用户是否有相应的访问权限，以此实现设备保护功能</p>
</li>
</ol>
<h2 id="_19、假脱机技术" tabindex="-1"><a class="header-anchor" href="#_19、假脱机技术" aria-hidden="true">#</a> 19、假脱机技术</h2>
<ol>
<li>
<p>脱机技术简介</p>
<ul>
<li>
<p>手工操作阶段：主机直接从I/O设备获得数据，由于设备速度慢，主机速度很快，人机速度矛盾明显，主机要浪费很多时间来等待设备</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609095039255.png" alt="image-20220609095039255" tabindex="0" loading="lazy"><figcaption>image-20220609095039255</figcaption></figure>
</li>
<li>
<p>批处理阶段引入了脱机输入/输出技术(用磁带完成)：</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609095427515.png" alt="image-20220609095427515" tabindex="0" loading="lazy"><figcaption>image-20220609095427515</figcaption></figure>
</li>
<li>
<p>假脱机技术，又称&quot;SPOOLing技术&quot;是用软件的方式模拟脱机技术。系统的组成如下：</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609095722677.png" alt="image-20220609095722677" tabindex="0" loading="lazy"><figcaption>image-20220609095722677</figcaption></figure>
<p>输入井：模拟脱机输入时的磁带，用于收容I/O设备输入的数据</p>
<p>输出井：模拟脱机输出时的磁带，用于收容用户进程输出的数据</p>
<p>输入进程：模拟脱机输入时的外围控制机</p>
<p>输出进程：模拟脱机输出时的外围控制机</p>
<p>输入缓冲区：在输入进程的控制下，输入缓冲区用于暂存从输入设备输入的数据，之后在转存到输入井中</p>
<p>输出缓冲区：在输出进程的控制下，用于暂存从输出井传来的数据，之后再传送到输出设备上</p>
</li>
</ul>
</li>
<li>
<p>共享打印机原理分析</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609100750640.png" alt="image-20220609100750640" tabindex="0" loading="lazy"><figcaption>image-20220609100750640</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609101627441.png" alt="image-20220609101627441" tabindex="0" loading="lazy"><figcaption>image-20220609101627441</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609101720564.png" alt="image-20220609101720564" tabindex="0" loading="lazy"><figcaption>image-20220609101720564</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609101958603.png" alt="image-20220609101958603" tabindex="0" loading="lazy"><figcaption>image-20220609101958603</figcaption></figure>
<h2 id="_20、设备的分配与回收" tabindex="-1"><a class="header-anchor" href="#_20、设备的分配与回收" aria-hidden="true">#</a> 20、设备的分配与回收</h2>
<ol>
<li>
<p>设备分配时应考虑的因素</p>
<ol>
<li>
<p>设备的固有属性：</p>
<ul>
<li>独占设备—一个时段只能分配一个进程</li>
<li>共享设备—可同时分配给多个进程使用，各进程往往是宏观上同时共享使用设备，而在微观上交替使用</li>
<li>虚拟设备—采用SPOOLing技术将独占设备改造成虚拟的共享设备，可同时分配给多个进程使用</li>
</ul>
</li>
<li>
<p>设备的分配算法：</p>
<p>先来先服务、优先级高者优先、短任务优先.....</p>
</li>
<li>
<p>设备分配中的安全性：</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609103338474.png" alt="image-20220609103338474" tabindex="0" loading="lazy"><figcaption>image-20220609103338474</figcaption></figure>
</li>
</ol>
</li>
<li>
<p>静态分配和动态分配</p>
<ul>
<li>静态分配：进程运行前为其分配全部所需资源，运行结束后归还资源，不会发生死锁</li>
<li>动态分配：进程运行过程中动态申请设备资源</li>
</ul>
</li>
<li>
<p>设备分配管理中的数据结构</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609103645775.png" alt="image-20220609103645775" tabindex="0" loading="lazy"><figcaption>image-20220609103645775</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609103942129.png" alt="image-20220609103942129" tabindex="0" loading="lazy"><figcaption>image-20220609103942129</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609104134198.png" alt="image-20220609104134198" tabindex="0" loading="lazy"><figcaption>image-20220609104134198</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609104233122.png" alt="image-20220609104233122" tabindex="0" loading="lazy"><figcaption>image-20220609104233122</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609104330037.png" alt="image-20220609104330037" tabindex="0" loading="lazy"><figcaption>image-20220609104330037</figcaption></figure>
</li>
<li>
<p>设备分配的步骤</p>
<ol>
<li>根据进程请求的物理设备名查找SDT(物理设备名是进程请求分配时提供的参数)</li>
<li>根据SDT找到DCT，若设备忙碌则将进程PCB挂到设备等待队列中，不忙碌则将设备分配给进程</li>
<li>根据DCT找到COCT，若控制器忙碌则将进程PCB挂到控制器等待队列中，不忙碌则将控制器分配给进程</li>
<li>根据COCT找到CHCT，若通道忙碌则将进程PCB挂到通道等待队列中，不忙碌则将通道分配个进程</li>
</ol>
<p>缺点：</p>
<ol>
<li>用户编程时必须使用&quot;物理设备名&quot;，底层细节对用户不透明，不方便编程</li>
<li>若换了一个物理设备，则程序无法运行</li>
<li>若进程请求的物理设备正在忙碌，则即使系统中还有同类型的设备，进程也必须阻塞等待</li>
</ol>
<p>改进方法：建立逻辑设备名与物理设备名的映射机制，用户编程时只需提供逻辑设备名</p>
</li>
<li>
<p>设备分配改进</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220609115836152-16547471320781.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610212414867.png" alt="image-20220610212414867" tabindex="0" loading="lazy"><figcaption>image-20220610212414867</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610212527979.png" alt="image-20220610212527979" tabindex="0" loading="lazy"><figcaption>image-20220610212527979</figcaption></figure>
<h2 id="_21、缓冲区管理" tabindex="-1"><a class="header-anchor" href="#_21、缓冲区管理" aria-hidden="true">#</a> 21、缓冲区管理</h2>
<ol>
<li>
<p>缓冲区介绍以及作用</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610212917960.png" alt="image-20220610212917960" tabindex="0" loading="lazy"><figcaption>image-20220610212917960</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610213119470.png" alt="image-20220610213119470" tabindex="0" loading="lazy"><figcaption>image-20220610213119470</figcaption></figure>
</li>
<li>
<p>单缓冲</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610213442230.png" alt="image-20220610213442230" tabindex="0" loading="lazy"><figcaption>image-20220610213442230</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610213728733.png" alt="image-20220610213728733" tabindex="0" loading="lazy"><figcaption>image-20220610213728733</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610214210814.png" alt="image-20220610214210814" tabindex="0" loading="lazy"><figcaption>image-20220610214210814</figcaption></figure>
<p>结论：采用单缓冲策略，处理一块数据平均耗时Max(C,T) + M</p>
</li>
<li>
<p>双缓冲</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610214717158.png" alt="image-20220610214717158" tabindex="0" loading="lazy"><figcaption>image-20220610214717158</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610215055371.png" alt="image-20220610215055371" tabindex="0" loading="lazy"><figcaption>image-20220610215055371</figcaption></figure>
<p>结论：采用双缓冲策略，处理一个数据块的平均耗时为Max(T,C+M)</p>
</li>
<li>
<p>使用单/双缓冲在通信时的区别</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610215815431.png" alt="image-20220610215815431" tabindex="0" loading="lazy"><figcaption>image-20220610215815431</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610215848171.png" alt="image-20220610215848171" tabindex="0" loading="lazy"><figcaption>image-20220610215848171</figcaption></figure>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610220013207.png" alt="image-20220610220013207" tabindex="0" loading="lazy"><figcaption>image-20220610220013207</figcaption></figure>
</li>
<li>
<p>循环缓冲区</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610220150678.png" alt="image-20220610220150678" tabindex="0" loading="lazy"><figcaption>image-20220610220150678</figcaption></figure>
</li>
<li>
<p>缓冲池</p>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610221353573.png" alt="image-20220610221353573" tabindex="0" loading="lazy"><figcaption>image-20220610221353573</figcaption></figure>
</li>
</ol>
<figure><img src="https://picture2-1310712259.cos.ap-nanjing.myqcloud.com/img/image-20220610221431032.png" alt="image-20220610221431032" tabindex="0" loading="lazy"><figcaption>image-20220610221431032</figcaption></figure>
</div></template>


