<template>
  <div class="seller">
  	<div class="seller-content">
  		<div class="overview">
  			<h1 class="title">{{seller.name}}</h1>
  			<div class="desc border-1px">
  				<star :size="36" :score="seller.score"></star>
  				<span class="text">({{seller.ratingCount}})</span>
  				<span class="text">{{seller.sellCount}}</span>
  			</div>
  			<ul class="remark">
  				<li class="block">
  					<h2>起送价</h2>
  					<span class="stress">{{seller.minPrice}}</span>元
  				</li>
  				<li class="block">
  					<h2>商家配送</h2>
  					<span class="stress">{{seller.deliveryPrice}}</span>元
  				</li>
  				<li class="block">
  					<h2>平均配送时间</h2>
  					<span class="stress">{{seller.deliveryTime}}</span>分钟
  				</li>
  			</ul>
  		</div>
  	</div>
  
  </div>
</template>

<script>
import star from 'components/star/star';
export default{
	props:{
		seller:{
			type:Object
		}
	},
  components:{
    star
  }

}

</script>

<style rel="stylesheet/less" lang="less" scope>
@import '../../common/less/mixin.less';
.seller{
  position: fixed;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview{
    padding: 18px;
    .title{
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7,17,27);
      font-size: 14px;
    }
    .desc{
      padding: 18px;
      line-height: 18px;
      .border-1px(rgba(7,17,27,0.1));
      font-size: 0;
      .star{
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
      }
      .text{
        margin-right: 12px;
        display: inline-block;
        vertical-align: top;
        color: rgb(7,17,27);
        font-size: 10px;
      }
    }
    .remark{
      display: flex;
      padding-top: 18px;
      .block{
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7,17,27,0.1);
        &:last-child{
          border: 0;
        }

      }
    }
  }
}

</style>