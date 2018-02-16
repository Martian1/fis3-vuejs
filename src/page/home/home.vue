<template>
<div class="home-content">
    <h1>{{name}}</h1>
    <div class="icon icon1"></div><div class="icon icon2"></div><div class="icon icon3"></div>
    <img src="static/images/img.jpg" />
</div>
</template>

<script>
export default {
    data() {
        return {
            name: 'HOME'
        }
    },
    created() {
        console.log('home page');
    },
    methods: {
    }
};
</script>

<style lang="less">
.home-content {
    color: #000000;
}
</style>
