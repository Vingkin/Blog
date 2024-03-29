---
title: 数据结构
author: Vingkin
date: 2022-04-24
---

## 红黑树

1. 节点是红色或黑色
2. 根节点是黑色
3. 每个叶子节点都是黑色的空节点（NIL节点）
4. 每个红色节点的两个子节点都是黑色。（从每个叶子到根的所有路径上不能有两个连续的红节点）
5. 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。

![img](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/1602b6016e143cf3tplv-t2oaga2asx-zoom-in-crop-mark1304000.awebp)

## 布隆过滤器

> [布隆过滤器](https://javaguide.cn/cs-basics/data-structure/bloom-filter.html)

### 什么是布隆过滤器

首先，我们需要了解布隆过滤器的概念。

布隆过滤器（Bloom Filter）是一个叫做 Bloom 的老哥于 1970 年提出的。我们可以把它看作由二进制向量（或者说位数组）和一系列随机映射函数（哈希函数）两部分组成的数据结构。相比于我们平时常用的的 List、Map 、Set 等数据结构，它占用空间更少并且效率更高，但是缺点是其返回的结果是概率性的，而不是非常准确的。理论情况下添加到集合中的元素越多，误报的可能性就越大。并且，存放在布隆过滤器的数据不容易删除。

![布隆过滤器示意图](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/image-20220605222756152.png)

位数组中的每个元素都只占用 1 bit ，并且每个元素只能是 0 或者 1。这样申请一个 100w 个元素的位数组只占用 1000000Bit / 8 = 125000 Byte = 125000/1024 kb ≈ 122kb 的空间。

总结：**一个名叫 Bloom 的人提出了一种来检索元素是否在给定大集合中的数据结构，这种数据结构是高效且性能很好的，但缺点是具有一定的错误识别率和删除难度。并且，理论情况下，添加到集合中的元素越多，误报的可能性就越大。**

### 布隆过滤器的原理介绍

**当一个元素加入布隆过滤器中的时候，会进行如下操作：**

1. 使用布隆过滤器中的哈希函数对元素值进行计算，得到哈希值（有几个哈希函数得到几个哈希值）。
2. 根据得到的哈希值，在位数组中把对应下标的值置为 1。

**当我们需要判断一个元素是否存在于布隆过滤器的时候，会进行如下操作：**

1. 对给定元素再次进行相同的哈希计算；
2. 得到值之后判断位数组中的每个元素是否都为 1，如果值都为 1，那么说明这个值在布隆过滤器中，如果存在一个值不为 1，说明该元素不在布隆过滤器中。

举个简单的例子：

![布隆过滤器hash计算](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/image-20220605222938690.png)

如图所示，当字符串存储要加入到布隆过滤器中时，该字符串首先由多个哈希函数生成不同的哈希值，然后将对应的位数组的下标设置为 1（当位数组初始化时，所有位置均为 0）。当第二次存储相同字符串时，因为先前的对应位置已设置为 1，所以很容易知道此值已经存在（去重非常方便）。

如果我们需要判断某个字符串是否在布隆过滤器中时，只需要对给定字符串再次进行相同的哈希计算，得到值之后判断位数组中的每个元素是否都为 1，如果值都为 1，那么说明这个值在布隆过滤器中，如果存在一个值不为 1，说明该元素不在布隆过滤器中。

**不同的字符串可能哈希出来的位置相同，这种情况我们可以适当增加位数组大小或者调整我们的哈希函数。**

综上，我们可以得出：**布隆过滤器说某个元素存在，小概率会误判。布隆过滤器说某个元素不在，那么这个元素一定不在。**

### 布隆过滤器使用场景

1. 判断给定数据是否存在：比如判断一个数字是否存在于包含大量数字的数字集中（数字集很大，5 亿以上！）、 防止缓存穿透（判断请求的数据是否有效避免直接绕过缓存请求数据库）等等、邮箱的垃圾邮件过滤、黑名单功能等等。
2. 去重：比如爬给定网址的时候对已经爬取过的 URL 去重。

## SDS

> [Redis 数据结构 | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/redis/data_struct/data_struct.html#sds)

字符串在 Redis 中是很常用的，键值对中的键是字符串类型，值有时也是字符串类型。

Redis 是用 C 语言实现的，但是它没有直接使用 C 语言的 char* 字符数组来实现字符串，而是自己封装了一个名为简单动态字符串（simple dynamic string，SDS） 的数据结构来表示字符串，也就是 Redis 的 String 数据类型的底层数据结构是 SDS。

既然 Redis 设计了 SDS 结构来表示字符串，肯定是 C 语言的 char* 字符数组存在一些缺陷。

要了解这一点，得先来看看 char* 字符数组的结构。

###  C 语言字符串的缺陷

C 语言的字符串其实就是一个字符数组，即数组中每个元素是字符串中的一个字符。

比如，下图就是字符串“xiaolin”的 char* 字符数组的结构：

![img](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/376128646c75a893ad47914858fa2131.png)

没学过 C 语言的同学，可能会好奇为什么最后一个字符是“\0”？

在 C 语言里，对字符串操作时，char * 指针只是指向字符数组的起始位置，而**字符数组的结尾位置就用“\0”表示，意思是指字符串的结束**。

因此，C 语言标准库中的字符串操作函数就通过判断字符是不是 “\0” 来决定要不要停止操作，如果当前字符不是 “\0” ，说明字符串还没结束，可以继续操作，如果当前字符是 “\0” 是则说明字符串结束了，就要停止操作。

举个例子，C 语言获取字符串长度的函数 `strlen`，就是通过字符数组中的每一个字符，并进行计数，等遇到字符为 “\0” 后，就会停止遍历，然后返回已经统计到的字符个数，即为字符串长度。下图显示了 strlen 函数的执行流程：

![img](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/bcf6bde3b647bdc343efcbc1a8f10579.png)

很明显，**C 语言获取字符串长度的时间复杂度是 O（N）（\*这是一个可以改进的地方\***）

C 语言字符串用 “\0” 字符作为结尾标记有个缺陷。假设有个字符串中有个 “\0” 字符，这时在操作这个字符串时就会**提早结束**，比如 “xiao\0lin” 字符串，计算字符串长度的时候则会是 4，如下图：

![img](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/6286480eb1840a8930e18fd215d82565.png)

因此，除了字符串的末尾之外，**字符串里面不能含有 “\0” 字符**，否则最先被程序读入的 “\0” 字符将被误认为是字符串结尾，这个限制使得 C 语言的字符串只能保存文本数据，**不能保存像图片、音频、视频文化这样的二进制数据（\*这也是一个可以改进的地方\*）**

另外， C 语言标准库中字符串的操作函数是很不安全的，对程序员很不友好，稍微一不注意，就会导致缓冲区溢出。

举个例子，strcat 函数是可以将两个字符串拼接在一起。

```c
//将 src 字符串拼接到 dest 字符串后面
char *strcat(char *dest, const char* src);
```

**C 语言的字符串是不会记录自身的缓冲区大小的**，所以 strcat 函数假定程序员在执行这个函数时，已经为 dest 分配了足够多的内存，可以容纳 src 字符串中的所有内容，而**一旦这个假定不成立，就会发生缓冲区溢出将可能会造成程序运行终止，（\*这是一个可以改进的地方\***）。

而且，strcat 函数和 strlen 函数类似，时间复杂度也很高，也都需要先通过遍历字符串才能得到目标字符串的末尾。然后对于 strcat 函数来说，还要再遍历源字符串才能完成追加，**对字符串的操作效率不高**。

好了， 通过以上的分析，我们可以得知 C 语言的字符串不足之处以及可以改进的地方：

- 获取字符串长度的时间复杂度为 O（N）；
- 字符串的结尾是以 “\0” 字符标识，字符串里面不能包含有 “\0” 字符，因此不能保存二进制数据；
- 字符串操作函数不高效且不安全，比如有缓冲区溢出的风险，有可能会造成程序运行终止；

Redis 实现的 SDS 的结构就把上面这些问题解决了，接下来我们一起看看 Redis 是如何解决的。

### SDS 结构设计

下图就是 Redis 5.0 的 SDS 的数据结构：

![img](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/516738c4058cdf9109e40a7812ef4239.png)

结构中的每个成员变量分别介绍下：

- **len，记录了字符串长度**。这样获取字符串长度的时候，只需要返回这个成员变量值就行，时间复杂度只需要 O（1）。
- **alloc，分配给字符数组的空间长度**。这样在修改字符串的时候，可以通过 `alloc - len` 计算出剩余的空间大小，可以用来判断空间是否满足修改需求，如果不满足的话，就会自动将 SDS 的空间扩展至执行修改所需的大小，然后才执行实际的修改操作，所以使用 SDS 既不需要手动修改 SDS 的空间大小，也不会出现前面所说的缓冲区溢出的问题。
- **flags，用来表示不同类型的 SDS**。一共设计了 5 种类型，分别是 sdshdr5、sdshdr8、sdshdr16、sdshdr32 和 sdshdr64，后面在说明区别之处。
- **buf[]，字符数组，用来保存实际数据**。不仅可以保存字符串，也可以保存二进制数据。

总的来说，Redis 的 SDS 结构在原本字符数组之上，增加了三个元数据：len、alloc、flags，用来解决 C 语言字符串的缺陷。

> **O（1）复杂度获取字符串长度**（这也可以说是Redis为什么快的一个原因）

C 语言的字符串长度获取 strlen 函数，需要通过遍历的方式来统计字符串长度，时间复杂度是 O（N）。

而 Redis 的 SDS 结构因为加入了 len 成员变量，那么**获取字符串长度的时候，直接返回这个成员变量的值就行，所以复杂度只有 O（1）**。

> **二进制安全**

因为 SDS 不需要用 “\0” 字符来标识字符串结尾了，而是**有个专门的 len 成员变量来记录长度，所以可存储包含 “\0” 的数据**。但是 SDS 为了兼容部分 C 语言标准库的函数， SDS 字符串结尾还是会加上 “\0” 字符。

因此， SDS 的 API 都是以处理二进制的方式来处理 SDS 存放在 buf[] 里的数据，程序不会对其中的数据做任何限制，数据写入的时候时什么样的，它被读取时就是什么样的。

通过使用二进制安全的 SDS，而不是 C 字符串，使得 Redis 不仅可以保存文本数据，也可以保存任意格式的二进制数据。

> **不会发生缓冲区溢出**

C 语言的字符串标准库提供的字符串操作函数，大多数（比如 strcat 追加字符串函数）都是不安全的，因为这些函数把缓冲区大小是否满足操作需求的工作交由开发者来保证，程序内部并不会判断缓冲区大小是否足够用，当发生了缓冲区溢出就有可能造成程序异常结束。

所以，Redis 的 SDS 结构里引入了 alloc 和 len 成员变量，这样 SDS API 通过 `alloc - len` 计算，可以算出剩余可用的空间大小，这样在对字符串做修改操作的时候，就可以由程序内部判断缓冲区大小是否足够用。

而且，**当判断出缓冲区大小不够用时，Redis 会自动将扩大 SDS 的空间大小（小于 1MB 翻倍扩容，大于 1MB 按 1MB 扩容）**，以满足修改所需的大小。

在扩展 SDS 空间之前，SDS API 会优先检查未使用空间是否足够，如果不够的话，API 不仅会为 SDS 分配修改所必须要的空间，还会给 SDS 分配额外的「未使用空间」。

这样的好处是，下次在操作 SDS 时，如果 SDS 空间够的话，API 就会直接使用「未使用空间」，而无须执行内存分配，**有效的减少内存分配次数**。

所以，使用 SDS 即不需要手动修改 SDS 的空间大小，也不会出现缓冲区溢出的问题。

> **节省内存空间**

SDS 结构中有个 flags 成员变量，表示的是 SDS 类型。

Redis 一共设计了 5 种类型，分别是 sdshdr5、sdshdr8、sdshdr16、sdshdr32 和 sdshdr64。

这 5 种类型的主要**区别就在于，它们数据结构中的 len 和 alloc 成员变量的数据类型不同**。

比如 sdshdr16 和 sdshdr32 这两个类型，它们的定义分别如下：

```c
struct __attribute__ ((__packed__)) sdshdr16 {
    uint16_t len;
    uint16_t alloc; 
    unsigned char flags; 
    char buf[];
};


struct __attribute__ ((__packed__)) sdshdr32 {
    uint32_t len;
    uint32_t alloc; 
    unsigned char flags;
    char buf[];
};
```

可以看到：

- sdshdr16 类型的 len 和 alloc 的数据类型都是 uint16_t，表示字符数组长度和分配空间大小不能超过 2 的 16 次方。
- sdshdr32 则都是 uint32_t，表示表示字符数组长度和分配空间大小不能超过 2 的 32 次方。

**之所以 SDS 设计不同类型的结构体，是为了能灵活保存不同大小的字符串，从而有效节省内存空间**。比如，在保存小字符串时，结构头占用空间也比较少。

除了设计不同类型的结构体，Redis 在编程上还**使用了专门的编译优化来节省内存空间**，即在 struct 声明了 `__attribute__ ((packed))` ，它的作用是：**告诉编译器取消结构体在编译过程中的优化对齐，按照实际占用字节数进行对齐**。

比如，sdshdr16 类型的 SDS，默认情况下，编译器会按照 2 字节对齐的方式给变量分配内存，这意味着，即使一个变量的大小不到 2 个字节，编译器也会给它分配 2 个字节。

举个例子，假设下面这个结构体，它有两个成员变量，类型分别是 char 和 int，如下所示：

```c
#include <stdio.h>

struct test1 {
    char a;
    int b;
 } test1;
 
int main() {
     printf("%lu\n", sizeof(test1));
     return 0;
}
```

大家猜猜这个结构体大小是多少？我先直接说答案，这个结构体大小计算出来是 8。

![img](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/35820959e8cf4376391c427ed7f81495.png)

这是因为默认情况下，编译器是使用「字节对齐」的方式分配内存，虽然 char 类型只占一个字节，但是由于成员变量里有 int 类型，它占用了 4 个字节，所以在成员变量为 char 类型分配内存时，会分配 4 个字节，其中这多余的 3 个字节是为了字节对齐而分配的，相当于有 3 个字节被浪费掉了。

如果不想编译器使用字节对齐的方式进行分配内存，可以采用了 `__attribute__ ((packed))` 属性定义结构体，这样一来，结构体实际占用多少内存空间，编译器就分配多少空间。

比如，我用 `__attribute__ ((packed))` 属性定义下面的结构体 ，同样包含 char 和 int 两个类型的成员变量，代码如下所示：

```c
#include <stdio.h>

struct __attribute__((packed)) test2  {
    char a;
    int b;
 } test2;
 
int main() {
     printf("%lu\n", sizeof(test2));
     return 0;
}
```

这时打印的结果是 5（1 个字节 char + 4 字节 int）。

![img](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/47e6c8fbc17fd6c89bdfcb5eedaaacff.png)

可以看得出，这是按照实际占用字节数进行分配内存的，这样可以节省内存空间。

## 压缩列表

> [Redis 数据结构 | 小林coding (xiaolincoding.com)](https://xiaolincoding.com/redis/data_struct/data_struct.html#压缩列表)

压缩列表的最大特点，就是它被设计成一种内存紧凑型的数据结构，占用一块连续的内存空间，不仅可以利用 CPU 缓存，而且会针对不同长度的数据，进行相应编码，这种方法可以有效地节省内存开销。

但是，压缩列表的缺陷也是有的：

- 不能保存过多的元素，否则查询效率就会降低；
- 新增或修改某个元素时，压缩列表占用的内存空间需要重新分配，甚至可能引发连锁更新的问题。

因此，Redis 对象（List 对象、Hash 对象、Zset 对象）包含的元素数量较少，或者元素值不大的情况才会使用压缩列表作为底层数据结构。

### 压缩列表结构设计

压缩列表是 Redis 为了节约内存而开发的，它是**由连续内存块组成的顺序型数据结构**，有点类似于数组。

![img](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/ab0b44f557f8b5bc7acb3a53d43ebfcb.png)

压缩列表在表头有三个字段：

- ***zlbytes***，记录整个压缩列表占用对内存字节数；
- ***zltail***，记录压缩列表「尾部」节点距离起始地址由多少字节，也就是列表尾的偏移量；
- ***zllen***，记录压缩列表包含的节点数量；
- ***zlend***，标记压缩列表的结束点，固定值 0xFF（十进制255）。

在压缩列表中，如果我们要查找定位第一个元素和最后一个元素，可以通过表头三个字段的长度直接定位，复杂度是 O(1)。而**查找其他元素时，就没有这么高效了，只能逐个查找，此时的复杂度就是 O(N) 了，因此压缩列表不适合保存过多的元素**。

另外，压缩列表节点（entry）的构成如下：

![img](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/a3b1f6235cf0587115b21312fe60289c.png)

压缩列表节点包含三部分内容：

- ***prevlen***，记录了「前一个节点」的长度；
- ***encoding***，记录了当前节点实际数据的类型以及长度；
- ***data***，记录了当前节点的实际数据；

当我们往压缩列表中插入数据时，压缩列表就会根据数据是字符串还是整数，以及数据的大小，会使用不同空间大小的 prevlen 和 encoding 这两个元素里保存的信息，**这种根据数据大小和类型进行不同的空间大小分配的设计思想，正是 Redis 为了节省内存而采用的**。

分别说下，prevlen 和 encoding 是如何根据数据的大小和类型来进行不同的空间大小分配。

压缩列表里的每个节点中的 prevlen 属性都记录了「前一个节点的长度」，而且 prevlen 属性的空间大小跟前一个节点长度值有关，比如：

- 如果**前一个节点的长度小于 254 字节**，那么 prevlen 属性需要用 **1 字节的空间**来保存这个长度值；
- 如果**前一个节点的长度大于等于 254 字节**，那么 prevlen 属性需要用 **5 字节的空间**来保存这个长度值；

encoding 属性的空间大小跟数据是字符串还是整数，以及字符串的长度有关：

- 如果**当前节点的数据是整数**，则 encoding 会使用 **1 字节的空间**进行编码。
- 如果**当前节点的数据是字符串，根据字符串的长度大小**，encoding 会使用 **1 字节/2字节/5字节的空间**进行编码。

### 连锁更新

压缩列表除了查找复杂度高的问题，还有一个问题。

**压缩列表新增某个元素或修改某个元素时，如果空间不不够，压缩列表占用的内存空间就需要重新分配。而当新插入的元素较大时，可能会导致后续元素的 prevlen 占用空间都发生变化，从而引起「连锁更新」问题，导致每个元素的空间都要重新分配，造成访问压缩列表性能的下降**。

前面提到，压缩列表节点的 prevlen 属性会根据前一个节点的长度进行不同的空间大小分配：

- 如果前一个**节点的长度小于 254 字节**，那么 prevlen 属性需要用 **1 字节的空间**来保存这个长度值；
- 如果前一个**节点的长度大于等于 254 字节**，那么 prevlen 属性需要用 **5 字节的空间**来保存这个长度值；

现在假设一个压缩列表中有多个连续的、长度在 250～253 之间的节点，如下图：

![img](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/462c6a65531667f2bcf420953b0aded9.png)

因为这些节点长度值小于 254 字节，所以 prevlen 属性需要用 1 字节的空间来保存这个长度值。

这时，如果将一个长度大于等于 254 字节的新节点加入到压缩列表的表头节点，即新节点将成为 e1 的前置节点，如下图：

![img](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/d1a6deff4672580609c99a5b06bf3429.png)

因为 e1 节点的 prevlen 属性只有 1 个字节大小，无法保存新节点的长度，此时就需要对压缩列表的空间重分配操作，并将 e1 节点的 prevlen 属性从原来的 1 字节大小扩展为 5 字节大小。

多米诺牌的效应就此开始。

![img](https://vingkin-1304361015.cos.ap-shanghai.myqcloud.com/interview/1f0e5ae7ab749078cadda5ba0ed98eac.png)

e1 原本的长度在 250～253 之间，因为刚才的扩展空间，此时 e1 的长度就大于等于 254 了，因此原本 e2 保存 e1 的 prevlen 属性也必须从 1 字节扩展至 5 字节大小。

正如扩展 e1 引发了对 e2 扩展一样，扩展 e2 也会引发对 e3 的扩展，而扩展 e3 又会引发对 e4 的扩展.... 一直持续到结尾。

**这种在特殊情况下产生的连续多次空间扩展操作就叫做「连锁更新」**，就像多米诺牌的效应一样，第一张牌倒下了，推动了第二张牌倒下；第二张牌倒下，又推动了第三张牌倒下....，

### 压缩列表的缺陷

空间扩展操作也就是重新分配内存，因此**连锁更新一旦发生，就会导致压缩列表占用的内存空间要多次重新分配，这就会直接影响到压缩列表的访问性能**。

所以说，**虽然压缩列表紧凑型的内存布局能节省内存开销，但是如果保存的元素数量增加了，或是元素变大了，会导致内存重新分配，最糟糕的是会有「连锁更新」的问题**。

因此，**压缩列表只会用于保存的节点数量不多的场景**，只要节点数量足够小，即使发生连锁更新，也是能接受的。

虽说如此，Redis 针对压缩列表在设计上的不足，在后来的版本中，新增设计了两种数据结构：quicklist（Redis 3.2 引入） 和 listpack（Redis 5.0 引入）。这两种数据结构的设计目标，就是尽可能地保持压缩列表节省内存的优势，同时解决压缩列表的「连锁更新」的问题。

## 前缀树（字典树）

```java
public class Trie {

    public static class TrieNode {
        // count表示以当前单词结尾的单词数量
        int count;
        // prefix表示以该处节点之前的字符串为前缀的单词数量（包括当前节点）
        int prefix;
        TrieNode[] nextNode = new TrieNode[26];

        public TrieNode() {
            count = 0;
            prefix = 0;
        }
    }

    //插入一个新单词
    public static void insert(TrieNode root, String str) {
        if (root == null || str.length() == 0) {
            return;
        }
        char[] c = str.toCharArray();
        for (int i = 0; i < str.length(); i++) {
            //如果该分支不存在，创建一个新节点
            if (root.nextNode[c[i] - 'a'] == null) {
                root.nextNode[c[i] - 'a'] = new TrieNode();
            }
            root = root.nextNode[c[i] - 'a'];
            root.prefix++;//注意，应该加在后面
        }

        //以该节点结尾的单词数+1
        root.count++;
    }

    //查找该单词是否存在，如果存在返回数量，不存在返回-1
    public static int search(TrieNode root, String str) {
        if (root == null || str.length() == 0) {
            return -1;
        }
        char[] c = str.toCharArray();
        for (int i = 0; i < str.length(); i++) {
            //如果该分支不存在，表名该单词不存在
            if (root.nextNode[c[i] - 'a'] == null) {
                return -1;
            }
            //如果存在，则继续向下遍历
            root = root.nextNode[c[i] - 'a'];
        }

        //如果count==0,也说明该单词不存在
        if (root.count == 0) {
            return -1;
        }
        return root.count;
    }

    //查询以str为前缀的单词数量
    public static int searchPrefix(TrieNode root, String str) {
        if (root == null || str.length() == 0) {
            return -1;
        }
        char[] c = str.toCharArray();
        for (int i = 0; i < str.length(); i++) {
            //如果该分支不存在，表名该单词不存在
            if (root.nextNode[c[i] - 'a'] == null) {
                return -1;
            }
            //如果存在，则继续向下遍历
            root = root.nextNode[c[i] - 'a'];
        }
        return root.prefix;
    }

    public static void main(String[] args) {
        TrieNode newNode = new TrieNode();
        insert(newNode, "hello");

        insert(newNode, "hello");
        insert(newNode, "hello");
        insert(newNode, "helloworld");
        System.out.println(search(newNode, "hello"));
        System.out.println(searchPrefix(newNode, "h"));
    }

    /**
     输出：3   4
     **/

}
```

## 二叉树构建

> 数组转换为二叉树

```cpp
#include<bits/stdc++.h>
using namespace std;
struct TreeNode {
	int val;
	TreeNode *left;
	TreeNode *right;
	TreeNode(int x) {
		val = x;
		left = NULL;
		right = NULL;
	}
};

TreeNode* createTree(vector<int>& vec) {
	vector<TreeNode*> vecNode;
	TreeNode* root = NULL;
	for (int i = 0; i < vec.size(); i++) {
		TreeNode* node = new TreeNode(vec[i]);
		if (vec[i] != -1) vecNode.push_back(node);
		else vecNode.push_back(NULL);
		if (i == 0) root = node;
	}
	for (int i = 0; i * 2 + 2 < vecNode.size(); i++) {
		if (vecNode[i] != NULL) {
			vecNode[i] -> left = vecNode[2 * i + 1];
			vecNode[i] -> right = vecNode[2 * i + 2];
		}
	}
	return root;
}

void preOrder(TreeNode *root) {
	if (!root) return;
	cout << root -> val << ' ';
	preOrder(root -> left);
	preOrder(root -> right);
}

void l(TreeNode *root) {
	if (!root) return;
	queue<TreeNode*> q;
	q.push(root);
	while (!q.empty()) {
		int len = q.size();
		for (int i = 0; i < len; i++) {
			TreeNode* node = q.front();
			q.pop();
			cout << node -> val << ' ';
			if (node -> left) {
				q.push(node -> left);
			} 
			if (node -> right) {
				q.push(node -> right);
			}
		}
	}
}

int main () {
	vector<int> vec;
	int n;
	cin >> n;
	for (int i = 0; i < n; i++) {
		int a;
		cin >> a;
		vec.push_back(a);
	}
	TreeNode* root = createTree(vec);
	preOrder(root);
	cout << endl;
	print(root);
	return 0;
}
```

## 图的构建

## 并查集

```java
class UnionFind {
    private Map<Integer,Integer> father;
    
    public UnionFind() {
        father = new HashMap<>();
    }
    
    public void add(int x) {
        if (!father.containsKey(x)) {
            father.put(x, null);
        }
    }
    
    public void merge(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX != rootY){
            father.put(rootX,rootY);
        }
    }
    
    public int find(int x) {
        int root = x;
        
        while(father.get(root) != null){
            root = father.get(root);
        }
        
        while(x != root){
            int original_father = father.get(x);
            father.put(x,root);
            x = original_father;
        }
        
        return root;
    }
    
    public boolean isConnected(int x, int y) {
        return find(x) == find(y);
    }
} 
```

## 树状数组

> [聊聊树状数组 Binary Indexed Tree](https://halfrost.com/binary_indexed_tree/)

### 单点更新，区间求和

```java
class TreeArray {
    private int[] tree;
    private int[] nums; // nums下标从0开始，tree下标从1开始

    // 初始化
    public TreeArray(int[] nums) {
        this.tree = new int[nums.length + 1];
        this.nums = nums;
        for (int i = 0; i < nums.length; i++) {
            add(i + 1, nums[i]);
        }
    }

    // 单点修改 
    public void update(int index, int val) {
        add(index + 1, val - nums[index]);
        nums[index] = val;
    }

    // 区间查询
    public int sumRange(int left, int right) {
        return prefixSum(right + 1) - prefixSum(left);
    }

    private int lowBit(int x) {
        return x & -x;
    }

    // index位置增加val
    private void add(int index, int val) {
        while (index < tree.length) {
            tree[index] += val;
            index += lowBit(index);
        }
    }

    // 查询前index位置的前缀和
    private int prefixSum(int index) {
        int sum = 0;
        while (index > 0) {
            sum += tree[index];
            index -= lowBit(index);
        }
        return sum;
    }
}
```



