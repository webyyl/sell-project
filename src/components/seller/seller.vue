<template>
  <div class="seller" v-el:seller>
  	<div class="seller-content">
  		<div class="overview">
  			<h1 class="title">{{seller.name}}</h1>
  			<div class="desc border-1px">
  				<star :size="36" :score="seller.score"></star>
  				<span class="text">({{seller.ratingCount}})</span>
  				<span class="text">月售{{seller.sellCount}}单</span>
  			</div>
  			<ul class="remark">
  				<li class="block">
  					<h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
  					
  				</li>
  				<li class="block">
  					<h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
  				</li>
  				<li class="block">
  					<h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
  				</li>
  			</ul>
  		</div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">
            {{seller.bulletin}}
          </p>
        </div>
        <ul v-if="seller.supports" class="supports">
            <li class="supports-item border-1px" track-by="$index" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
            </li>    
        </ul>
      </div>
      
  	</div>
  
  </div>
</template>

<script>
import star from 'components/star/star';
import split from "components/split/split.vue";
import BScoller from "better-scroll";
export default{
	props:{
		seller:{
			type:Object
		}
	},
  created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  ready(){
    console.log(this.seller)
    this.scoller=new BScoller(this.$els.seller,{
      click:true
    })

  },
  components:{
    star,
    split
  }

}

</script>

<style rel="stylesheet/less" lang="less" scope>
@import '../../common/less/mixin.less';
/*2倍和3倍图片*/
.bg-image(@url){
  background-image: url("@{url}@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url("@{url}@3x.png");
    }
}
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
        display: inline-block;
        margin-right: 12px;
        line-height: 18px;
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
        h2{
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147,153,159);
        }
        .content{
          line-height: 24px;
          font-size: 10px;
          color: rgb(7,17,27);
          .stress{
            font-size: 24px
          }
        }
      }
    }
  }
  .bulletin{
    padding: 10px 18px 0 18px;
    .title{
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7,17,27);
      font-size: 14px;
    }
    .content-wrapper{
      padding: 0 12px 16px 12px;
      .border-1px(rgba(7,17,27,0.1));
      .content{
        line-height: 24px;
        font-size: 12px;
        color: rgb(240,20,20);
      }
    }
    .supports{
      .supports-item{
        padding: 16px 12px;
        .border-1px(rgba(7,17,27,0.1));
        font-size: 0;
        .icon{
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            vertical-align: top;
            background-size: 16px 16px;
            background-repeat: no-repeat;     
            &.decrease {
                 .bg-image('decrease_4');
             }
            &.discount {
                 .bg-image('discount_4');
             }
            &.guarantee {
                 .bg-image('guarantee_4');
             }
            &.invoice {
                 .bg-image('invoice_4');
             }
            &.special {
                 .bg-image('special_4');
             }                                         
        }
        .text{
          display: inline-block;
          vertical-align: top;
          line-height: 16px;
          font-size: 12px;
          color: rgb(7,17,27);
        }
      }   
    }
   
  }
}

</style>