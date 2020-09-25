# 调研识别手机品牌跳转对应应用商店

> 需求背景：为了推广用户下载App，需要前端识别用户手机品牌并让用户跳转到对应手机应用商店进行下载。

## 一、需支持的手机品牌

| 手机品牌        | 商店地址                                        | 备注   |
| --------------- | ----------------------------------------------- | ------ |
| OPPO            | market://details?id=com.tencent.weishi          |        |
| HUAWEI II HONOR | appmarket://details?id=com.tencent.weishi       |        |
| XIAOMI          | mimarket://details?id=com.tencent.weishi        | 已检测 |
| VIVO            | vivomarket://details?id=com.tencent.weishi      |        |
| SAMSUNG         | samsungapps://ProductDetails/com.tencent.weishi |        |
| IOS             | 无须特定格式URI Scheme，使用Url链接即可         |        |
| 其他(通常格式)  | market://details?id=xxx.xx.xx                   |        |

需要支持华为、小米、OPPO、VIVO、Samsung等安卓手机，以及IOS设备如iPhone、iPad、iPod等设备。不同手机品牌的URI Scheme各不相同，个别品牌的链接格式也不一致。而IOS设备不通过URI Scheme吊起应用商店，使用URL链接即可。我们需要判断用户手机的品牌，来提供一个合适的吊起应用商店的链接，若不属于上述手机品牌则返回`market://details?id=xxx.xx.xxx`作为兜底方案。



## 二、方案调研

前端主要通过判断获取UserAgent来获取当前请求环境的各种参数信息，社区中有如[ua-parser-js](https://github.com/faisalman/ua-parser-js)这样的工具库，用来更好的解析读取`UserAgent`中的如浏览器、设备、浏览器引擎、操作系统架构、CPU等信息。在此基础之上，也有如[mobile-detect](https://github.com/hgoebl/mobile-detect.js/)工具库，能够判断是Android、IOS等设备，但只能识别少数国外的手机品牌，其他的手机品牌准确性无法保证。按照该工具库的实现思路，主要是通过`UserAgent`中特有的名称或字段，识别该特定手机品牌。

于是形成最终的实现思路，通过找到不同手机品牌`UserAgent`中的特征值，来对手机品牌进行识别。结合社区中前人分享的工作，以及广泛分析各个手机UA的区别，总结出如下手机品牌的特征值：

| 手机品牌  | 特征值   | 备注  | 状态   |
| ------ | ------- | ------- | ------ |
| HUAWEI   | /huawei\|honor/ig  | UA格式规范统一  | 已检测 |
| VIVO     | /vivo/ig                         | UA格式规范统一                                           | 已检测 |
| SAMSUNG  | /GT-\|SM-\|SCH-\|samsung/ig      | UA格式规范统一                                           | 已检测 |
| IOS      | /iphone\|ipad\|ipod/ig           | UA格式规范统一                                           |        |
| XIAOMI   | /MI\s\|XiaoMi\|mix\s\|redmi\|HM/ig | 能覆盖当前绝大多数情况                                       |        |
| OPPO     | /oppo/ig                         | 通过已知的OPPO手机型号来取，较为混乱，无法确保能准确识别 |          |


- 华为手机UA格式规范，大部分UA中都包含`HUAWEI`字段，部分荣耀产品中可以通过`HONOR`字段进行识别，在随机的

- VIVO手机UA格式规范，所有的VIVO各个系列的手机UA中都包含`VIVO`字段，

- 三星手机大部分系列都包含`SM-`字段，少数系列可能以`GT-`， `SCH-`起头

- IOS系列产品UA规范，可以从`IPHONE`、`IPAD`、`IPOD`中准确判断手机品牌

- 小米手机UA中可供判断的特征值较多，小米系手机可以从`MI `、`XIAOMI`、`MIX `等特征值中识别，红米系手机可以从`RedMi`字段中识别，较早系列的小米手机UA比较混乱，如下所示，无法较为准确判断，已忽略。

  - HM NOTE 1LTE Build/KTU84P 

  - m1 Build/KTU84P 

  - 2014501 Build/KOT49H 

  - 2014011 Build/HM2014011 

  - 2013022 Build/HM2013022 

  - MI-ONE Plus Build/GINGERBREA

- OPPO手机UA的特征值最为混乱，每个OPPO手机系列没有统一的可供识别的特征值，如下所示，不同系列采用不同的名称，无法有效准确判断该手机品牌。但该手机品牌应用商店格式与兜底方法格式一致，仍可以确保正常吊起OPPO手机应用商店。

  - OPPO R7 Build/KTU84P 

  - R7007 Build/JLS36C 

  - R2017 Build/JLS36C 

  - R6007 Build/JLS36C 

  - N5117 Build/JLS36C 

  - M571C Build/LMY47D

  - R7Plus Build/LRX21M 

  - A31t Build/KTU84P 

  - A31 Build/KTU84P 

  - R8207 Build/KTU84P 

  - R833T Build/JDQ39

  

## 三、简要实现

```Javascript
const appStoreLinks = {
  OPPO: 'market://details?id=',
  HUAWEI: 'appmarket://details?id=',
  XIAOMI: 'mimarket://details?id=',
  VIVO: 'vivomarket://details?id=',
  SAMSUNG: 'samsungapps://ProductDetails/',
  IOS: '',
  DEFAULT: 'market://details?id=',
}

const isVivo = /vivo/i
const isHuawei = /huawei|honor/i
const isSamsung = /samsung|GT-|SM-|SCH-/i
const isXiaomi = /XiaoMi|mix\s|redmi|MI\s/i
const isOppo = /oppo/gi
const isIos = /iphone|ipad|ipod/gi

const brandEigenValues = {
  OPPO: isOppo,
  HUAWEI: isHuawei,
  SAMSUNG: isSamsung,
  XIAOMI: isXiaomi,
  VIVO: isVivo,
  IOS: isIos,
}

const mobileDetect = (ua) => {
  const matchedBrand = Object.entries(
    brandEigenValues
  ).find(([_, eigenvalue]) => eigenvalue.test(ua))
  return matchedBrand ? matchedBrand[0] : 'DEFAULT'
}

// 传入UserAgent和需下载的软件包包名
const getAppStoreLink = (userAgent, packageName) => {
  const mobileType = mobileDetect(userAgent)
  console.log(mobileType)
  if (appStoreLinks.hasOwnProperty(mobileType)) {
    return `${appStoreLinks[mobileType]}${packageName}`
  }
}
```



## 四、小结

本次的实现主要还是基于不同手机品牌的特征值来区分不同的手机品牌，而这一块的准确率主要依赖手机厂商生产时的规范性，如果手机品牌提供了统一格式特征的`UserAgent`，则可以准确识别，但向如小米、OPPO等手机厂商不同的手机系列采用不同的特征命名，则只能通过枚举的方式来检查是否匹配，这样难免有遗漏，准确性无法保证。此外，有些手机型号无法提取有效的特征值，如部分红米手机可以通过`HM`字段进行匹配，但仅两个字母`h`、`m`很容易和其他品牌手机的UA误匹配到，从而影响准确性。

通过上述的方式，基本能够满足当前主流手机品牌的识别，满足绝大数场景下吊起对应品牌手机应用商店的需要。



## 五、相关链接

+ [Github | ua-parser-js](https://github.com/faisalman/ua-parser-js)

+ [Github | mobile-detect.js](https://github.com/hgoebl/mobile-detect.js/)

+ [在线大量真实手机UserAgent库](http://fynas.com/ua)