
# vue-admin
 vue3.0尝鲜-后台管理系统（疫情期间没事在家写点bug，精神抖擞一整天）
## vue3.0尝鲜包
> 项目初始部分是按照vue2.0进行搭建，真正使用的是通过npm安装依赖包进行调用vue3.0的相关特性，以及对一些语法进行总结
## 项目启动
``npm install`` 下载依赖

``npm run dev`` 启动项目
## vue3.0的安装
1. 具体有哪些不一样呢？[vue3.0相关文档介绍](https://www.jianshu.com/p/1e09e244bdc3)
2. Vue 官方发布了最新的3.0 API 修改草案，并在充分采纳社区的意见后，将Vue Function API 更正为 Vue Composition API，也提供了 Vue3.0 特性的尝鲜版本，提供了在Vue 2.x 能够提前体验此API的库@vue/composition-api ``意思就是说：VUE2.0也可以用Composition API`` [Composition API详解](https://vue-composition-api-rfc.netlify.com/)
3. 依赖``npm install @vue/composition-api --save``
4. main.js ``import VueCompositionApi from '@vue/composition-api';`` ``Vue.use(VueCompositionApi);``
## api介绍
**setup函数**

按照官方给出的说法，setup函数是一个新的Vue组件选项，是用于在组件中使用Composition API的入口。
```js
export default {
    setup(props, context) {
      context.attrs;
      context.slots
      context.parent
      context.root
      context.emit
      context.refs
        ………
    }
};
```
**Reactive（声明单一对象时使用）**

取得一个对象并返回原始对象的响应数据处理。
```js
const obj = reactive({ count: 0 })
```
**ref（声明基础数据类型变量时使用）**

内部值并返回一个响应性且可变的ref对象。ref对象具有.value指向内部值的单个属性。
```js
const number = ref(0);
```
> 获取值方式：number.value

**isRef 和 toRefs**
检查一个对象是否是ref对象
```js
const unwrapped = isRef(foo) ? foo.value : foo;
--------
function useMousePosition() {
    const pos = reactive({
        x: 0,
        y: 0
    });
    return toRefs(pos);
}
const { x, y } = useMousePosition();
```
``toRefs``将``reactive``对象转换为普通对象，保证对象解构或拓展运算符不会丢失原有响应式对象的响应。

**watch 侦听器**
```js
const count = ref(100);
watch(()=>count.vlaue,()=>{
    console.log('count数值发生变化了')
})
count.value = 200;  // count重新赋值，watch则被执行
```
**Computed**

可传入get和set，用于定义可更改的计算属性
````js
const count = ref(1);
const plusOne = computed({
    get: () => count.value + 1,
    set: val => { count.value = val - 1 }
});
plusOne.value = 1;
console.log(count.value); // 0
````
**$refs 实例属性**

```js
<template>
<div>
    <hello-world ref="helloWold"></hello-world>
    <button ref="btn"></button>
</div>
</template>
<script>
import {ref} from "@vue/composition-api"
export default {
    setup() {
        const helloWorld = ref(null);//helloworld组件实例
        const btn = ref(null);//button dom节点对象
        return {
            btn,
            helloWorld
        }
    }
}
</script>
```
**Props 外部属性(一般在组件用的多)**
```js
export default {
    props:{
        name:String
    },
    setup(props) {
        console.log(props.name)
    }
}
```
**生命周期挂钩**
```js
import { onMounted, onUpdated, onUnmounted } from 'vue'
const MyComponent = {
  setup() {
    onMounted(() => {
      console.log('mounted!')
    })
    onUpdated(() => {
      console.log('updated!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })
  }
}
```
> ``@vue/composition-api``删除了``onBeforeCreate`` 和 ``onCreated``。因为setup总是在创建组件实例时调用，即onBeforeCreate之后和onCreated之前调用，因此``onBeforeCreate``和``onCreated``将可以使用``setup``进行代替。

**2.x生命周期选项和Composition API之间的映射**
```js
beforeCreate ->使用 setup()
created ->使用 setup()
beforeMount - > onBeforeMount
mounted - > onMounted
methods -> 去除，普通方式写方法
beforeUpdate - > onBeforeUpdate
updated - > onUpdated
beforeDestroy - > onBeforeUnmount
destroyed - > onUnmounted
errorCaptured - > onErrorCaptured
```
>除了2.x生命周期等效项之外，Composition API还提供了以下调试挂钩：
```js
onRenderTracked
onRenderTriggered
两个钩子都收到DebuggerEvent类似于onTrack和onTrigge
```
