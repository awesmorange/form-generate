<!--
 * @Author: wanglan wlan.orange@qq.com
 * @Date: 2024-07-02 10:22:50
 * @LastEditors: wanglan wlan.orange@qq.com
 * @LastEditTime: 2024-07-02 10:24:33
 * @FilePath: \form-generate\src\components\ts-components\ts-iframe.vue
 * @Description: 自定义组件 iframe
-->
<template>
    <iframe :width="width" :frameborder="frameborder" :scrolling="scrolling" :height="height" :src="src" />
</template>
<script>
export default {
    name: 'tsIframe',
    props: {
        src: {//规定在 iframe中显示的文档的URL。
            type: String,
            required: true
        },
        width: { // 定义iframe的宽度。
            type: String,
            required: false,
            default: () => '100%',
        },
        height: {// 规定 iframe的高度
            type: Number,
            required: false,
            default: () => 70
        },
        frameborder: { //规定是否显示框架周围的边框。
            type: Number,
            required: false,
            default: () => 0
        },
        scrolling: { //规定是否在 iframe中显示滚动条。
            type: String,
            required: false,
            default: () => 'auto'
        }
    }
}
</script>