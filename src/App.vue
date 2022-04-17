<template>
<div id="app">
    <router-view />
</div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {}
    }
}
</script>
<style>
/* 全局滚动条样式 */
    ::-webkit-scrollbar-track-piece {
    width: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    }

    ::-webkit-scrollbar {
    width: 10px;
    height: 6px;
    }

    ::-webkit-scrollbar-thumb {
    height: 50px;
    background: rgba(100, 100, 100, 0.7);
    cursor: pointer;
    }

    ::-webkit-scrollbar-thumb:hover {
    background: rgba(100, 100, 100, 0.9);
    cursor: pointer;
    }
</style>
