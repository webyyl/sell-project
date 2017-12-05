<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
		<div class="tab-item">
			<a v-link="{path:'/goods'}">商品</a>
		</div>
		<div class="tab-item">
			<a v-link="{path:'/ratings'}">评论</a>
		</div>
		<div class="tab-item">
			<a v-link="{path:'/seller'}">商家</a>
		</div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import Header from './components/header/header.vue';
const ERR_OK=0;
export default{
	data(){
		return{
			seller:{}
		}
	},
	components:{
		'v-header':Header
	},
	created(){
		this.$http.get('/api/seller').then((response)=>{
			var ResponseData=response.data
			
			 if(ResponseData.errno===ERR_OK){
			 	this.seller=ResponseData.data;
			 	
			 }
		})
	}
};

</script>
<style rel="stylesheet/less" lang="less">
 @import "common/less/mixin.less";
	.tab{
		display: flex;
		width:100%;
		height: 40px;
		line-height:40px;
		.border-1px(rgba(7, 17, 27, 0.1));

		.tab-item{
			flex:1;
			font-size:14px;
			text-align: center;
			&>a{
				display: block;
				color: rgb(77,85,93);
				&.v-link-active{
					color: rgb(240,20,20);
				}
			}
		}
	}

</style>
