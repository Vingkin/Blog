<template><div><h2 id="_1-io性能优化-文件类型" tabindex="-1"><a class="header-anchor" href="#_1-io性能优化-文件类型" aria-hidden="true">#</a> 1. IO性能优化：文件类型</h2>
<h3 id="_1-1-行式存储、列式存储" tabindex="-1"><a class="header-anchor" href="#_1-1-行式存储、列式存储" aria-hidden="true">#</a> 1.1 行式存储、列式存储</h3>
<figure><img src="https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/img/202309251619941.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>优缺点：</strong></p>
<ul>
<li>行存储的写入是一次性完成，消耗的时间比列存储少，并且能够保证数据的完整性，缺点是数据读取过程中会产生冗余数据，如果只有少量数据，此影响可以忽略;数量大可能会影响到数据的处理效率。<strong>行适合插入、不适合查询。</strong></li>
<li>列存储在写入效率、保证数据完整性上都不如行存储，它的优势是在读取过程，不会产生冗余数据，这对数据完整性要求不高的大数据处理领域，比如互联网，犹为重要。<strong>列适合查询，不适合插入。</strong></li>
</ul>
</div></template>


