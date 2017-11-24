import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from './components/seller/seller'

//路由配置
Vue.use(VueRouter);
var app=Vue.extend(App);

var router=new VueRouter({
	LinkActiveClass:'active'
});

router.map({
	'goods':{
		component:Goods
	},
	'ratings':{
		component:Ratings
	},
	'seller':{
		component:Seller
	}
});

router.start(app,'#app');
router.redirect({
	'/':'goods'
});