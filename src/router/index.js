
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
        name: 'home',
        path: '/',
        components: {
            'default': resolve => require.async('page/home/home.vue', resolve)
        }
    }, {
        path: '*',
        redirect: '/'
    }]
});
