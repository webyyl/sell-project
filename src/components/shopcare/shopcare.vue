<template>
  <div class="shopcare">
  	<div class="content" @click="togglelist">
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
  	<div class="ball-container">
  			<div transition="drop" v-for="ball in balls" v-show="ball.show" class="balle">
  				<div class="inner inner-hook"></div>
  			</div>	
  	</div>
	<div class="shopcart-list" v-show="ListShow" transition="fold"> 
		<div class="list-header" >
			<h1 class="title">购物车</h1>
			<span class="empty">清空</span>
		</div>
		<div class="list-content" v-el:list-content>
			<ul>
				<li class="food" v-for="food in selectFoods">
  				<span class="name">{{food.name}}</span>
  				<div class="price">
  					<span>￥{{food.price*food.count}}</span>
  				</div>	
  				<div class="cartcontrol-wrapper">
  					<cartcontrol :food="food"></cartcontrol>
  				</div>
				</li>
			</ul>
		</div>
	</div>
  </div>
  
</template>

<script>
import BScoller from "better-scroll";
import cartcontrol from "components/cartcontrol/cartcontrol.vue";
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
	data(){
		return {
			balls:[
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				}
			],
			dropBall:[],
			fold:true

		};
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
			if(this.totalprice>=this.minprice){
				return 'enough';
			}else{
				return 'not-enough';
			}
		},
		ListShow(){
			if(!this.totalcount){
				this.fold=true;
				return false;
			}
			let show=!this.fold;
			if(show){
				this.$nextTick(() =>{
					if(!this.scroll){
						this.scroll=new BScoller(this.$els.listContent,{
							click:true
						})
					}else{
						this.scroll.refresh();
					}
					
				});
			}
			return show;
		}
	},
	methods:{
		drop(el){
			for(let i=0; i<this.balls.length; i++){
				let ball =this.balls[i];
				if(!ball.show){
					ball.show=true;
					ball.el=el;
					this.dropBall.push(ball);
					return;
				}

			}

		},
		togglelist(){
			if(!this.totalcount){
				return false;
			}
			this.fold=!this.fold
		}
	},
	components:{
		cartcontrol
	},
	transitions:{
		drop:{
			beforeEnter(el){
				let count =this.balls.length;
				while(count--){
					let ball=this.balls[count];
					if(ball.show){
						let rect =ball.el.getBoundingClientRect();						
						let x=rect.left-32;
						let y=-(window.innerHeight-rect.top-22);
						el.style.display='';
						el.style.webkitTransform=`translated3d(0,${y}px,0)`;
						el.style.transform=`translate3d(0,${y}px,0)`;
						let inner=el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
						inner.style.transform=`translate3d(${x}px,0,0)`;
					}
				}

			},
			enter(el){		
				this.$nextTick(()=>{
					el.style.display='';
					el.style.webkitTransform=`translated3d(0,0,0)`;
					el.style.transform=`translate3d(0,0,0)`;
					let inner=el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform=`translate3d(0,0,0)`;
					inner.style.transform=`translate3d(0,0,0)`;
				})

			},
			afterEnter(el){
				let ball= this.dropBall.shift();
				if(ball){
					ball.show=false;
					el.style.display='none'
				}

			}
		}
	}
	
}

</script>
<style rel="stylesheet/less" lang="less">
@import "../../common/less/bb.less";
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
	.ball-container{
		.balle{
			position: fixed;
			left: 32px;
			bottom: 22px;
			z-index: 200;
			&.drop-transition{
				transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
				.inner{
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background: rgb(0,160,220);
					transition: all 0.4s linear;
				}
			}
		}
	}
	.shopcart-list{
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		&.fold-transition{
			transition: all 0.5s;
			transform: translate3d(0,-100%,0);
		}
		&.fold-enter,&.fold-leave{
			transform: translate3d(0,0,0);
		}
		.list-header{
			height: 40px;
			line-height: 40px;
			padding: 0 18px;
			background: #f3f5f7;
			border-bottom: 1px solid rgba(7,17,27,0.1);
		    .title{
		    	float: left;
		    	font-size: 14px;
		    	color: rgb(7,17,27);
		    }
		    .empty{
		    	float: right;
		    	font-size:12px;
		    	color: rgb(0,160,220);
		    }
		}
		.list-content{
			padding: 0 18px;
			max-height: 217px;
			background: #fff;
			overflow: hidden;
			.food{
				position: relative;
				padding:12px 0;
				box-sizing: border-box;
			    .border-1px(rgba(7,17,27,0.1));
			    .name{
			    	line-height: 24px;
			    	font-size: 14px;
			    	color: rgb(7,17,27);			    	
			    }
			    .price{
			    	position: absolute;
			    	right: 90px;
			    	bottom: 12px;
			    	line-height: 24px;
			    	font-size: 14px;
			    	font-weight: 700;
			    	color: rgb(240,20,20);
			    }
			    .cartcontrol-wrapper{
			    	position: absolute;
			    	right: 0;
			    	bottom: 6px;
			    }
			}
		}
	}
}


 
</style>
