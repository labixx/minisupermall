import vue from 'vue';
import vue-lazyload from 'vue-lazyload';
vue.use(vue-lazyload,{
	  preLoad: 1,
	  error: require('@/static/img/home/default.jap'),
	  loading: require('@/static/img/home/default.jap'),
	  attempt: 2,
});