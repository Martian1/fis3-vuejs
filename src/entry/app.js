import Vue from 'vue';
import router from '../router';
import App from '../page/app.vue';

new Vue({
    el: '#app',
    render: h => h(App),
    router
});
