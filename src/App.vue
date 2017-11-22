<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
		<div class="tab-item">商品</div>
		<div class="tab-item">评论</div>
		<div class="tab-item">商家</div>
    </div>
    <div class="foot">i am foot</div>
  </div>
</template>

<script>
import Header from './components/header/header.vue';
export default{
  components:{
    'v-header':Header
  }
};

</script>

<style rel="stylesheet/less" lang="less" scoped>
#app{
	.tab{

		display: flex;
		width:100%;
		height: 40px;
		line-height:40px;
		.tab-item{
			flex:1;
			text-align: center;
		}
	}
}

</style>
