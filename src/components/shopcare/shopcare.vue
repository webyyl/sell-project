<template>
  <div class="shopcare">
  	<div class="content">
  		<div class="content-left">
  			<div class="logo-wrapper">
  				<div class="logo" :class="{'heighlight':totalcount>0}">
					<i class="icon-shopping_cart" :class="{'heighlight':totalcount>0}"></i>
  					<div class="num" v-show="totalcount>0">{{totalcount}}</div>
  				</div>
  			</div>
  			<div class="price" :class="{'heighlight':totalprice>0}">{{totalprice}}元</div>
  			<div class="desc">另需配送费￥{{deliveryprice}}元</div>
  		</div>
  		<div class="content-right">
  			<div class="pay" :class="payClass">
  				{{payDesc}}
  			</div>
  		</div>
  	</div>
  </div>
</template>

<script>
export default{
	props:{
		deliveryprice:{
			type:Number,
			default:0
		},
		minprice:{
			type:Number,
			default:0
		},
		selectFoods:{
			type:Array,
			default(){
				return [{price:20,count:2}];
			}
		}
	},
	computed:{
		totalprice(){
			let total=0;
			this.selectFoods.forEach(function(item){
				total+=item.price*item.count;
			});
			return total;
		},
		totalcount(){
			let count=0;
			this.selectFoods.forEach(function(item){		
				count+=item.count;
			});
			return count;
		},
		payDesc(){
			if(this.totalprice===0){
				return `￥${this.minprice}元起送`;
			}else if(this.totalprice<this.minprice){
				let diff=this.minprice-this.totalprice;
				return `还差￥${diff}元起送`
			}else{
				return '去结算'
			}

		},
		payClass(){
			if(this.totalprice>this.minprice){
				return 'enough';
			}else{
				return 'not-enough';
			}
		}
	}
	
}

</script>
<style rel="stylesheet/less" lang="less">
.shopcare{
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 50;
	width: 100%;
	height: 48px;
	background: #000;
	.content{
		display: flex;
		background: #141d27;
		font-size: 0;
		color: rgba(255,255,255,0.4);
		.content-left{
			flex: 1;
			.logo-wrapper{
				display: inline-block;
				position: relative;
				top: -10px;
				margin: 0 12px;
				padding: 6px;
				width: 56px;
				height: 56px;
				box-sizing: border-box;
				vertical-align: top;
				border-radius: 50%;
				background: #141d27;
				.num{
					position: absolute;
					top: 0;
					right: 0;
					width: 24px;
					height: 16px;
					line-height: 16px;
					text-align: center;
					border-radius:16px;
					font-size: 9px;
					font-weight: 700;
					color: #fff;
					background: rgb(240,20,20);
					box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)

				}
				.logo{
					width: 100%;
					height: 100%;
					border-radius: 50%;
					text-align: center;
					background: #2b343c;
					&.heighlight{
						background: rgb(0,160,220);
					}
					.icon-shopping_cart{
						line-height: 44px;
						font-size: 24px;
						color: #80858a;
						&.heighlight{
							color: #fff;
						}
					}
				}
			}
			.price{
				display: inline-block;
				vertical-align: top;
				margin-top:12px;
				line-height: 24px;
				padding-right: 12px;
				box-sizing: border-box;
				border-right: 1px solid rgba(255,255,255,0.1);
				font-size: 16px;
				font-weight: 700;
				&.heighlight{
					color: #fff;
				}
				
			}
			.desc{
				display: inline-block;
				vertical-align: top;
				margin: 12px 0 0 12px;
				line-height: 24px;
				font-size: 10px;
			}

		}
		.content-right{
			flex: 0 0 105px;
			width: 105px;
			.pay{
				height: 48px;
				line-height: 48px;
				text-align: center;
				font-size:12px;
				font-weight: 700;
				&.not-enough{
					background: #2b333b;
				}
				&.enough{
					background: #00b43c;
					color: #fff;
				}
			}
		}
	}
}


 
</style>
