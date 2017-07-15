<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费￥{{seller.deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop="pay">
				<div class="pay" :class="{'enough':totalPrice>=seller.minPrice}">
					{{payDesc}} <span v-show = '!totalCount'></span>
				</div>
			</div>
		</div>
		<transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
			<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
					<div class="title">购物车</div>
					<div class="empty" @click="empty">清空</div>
				</div>
				<div class="list-content" ref="list">
					<ul>
						<li class="food" v-for="food in selectFoods">
							<div class="name">{{food.name}}</div>
							<div class="price">
								<span>￥{{food.price*food.count}}</span>
							</div>
							<div class="cartcontroll-wrapper">
								<Cartcontrol :food="food"></Cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<div class="list-mask" v-show="listShow" @click="listShow=false"></div>
		</transition>	
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Cartcontrol from '../cartcontrol/Cartcontrol.vue'
	import BScroll from 'better-scroll'

	export default{
		computed:{
			...mapGetters([
				'seller',
				'goods'
			]),
			selectFoods(){
				let foods = [];

				this.goods.forEach( good => {

					good.foods.forEach( food => {

						if ( food.count > 0 ){
							foods.push(food);
						}
					})
				});
				return foods;
			},

			totalCount(){
				let count = 0;
				this.selectFoods.forEach( food => {
					count += food.count;
				})
				return count;
			},

			totalPrice(){
				let total = 0;
				this.selectFoods.forEach( food => {
					total += food.price * food.count;
				})
				return total;
			},
			payDesc(){
				if( this.totalPrice === 0 ){
					return `￥${this.seller.minPrice}元`
				}else if ( this.totalPrice < this.seller.minPrice ) {
					return ` 还差${this.seller.minPrice - this.totalPrice } 元`	
				}else{
					return 'jiesuan'
				}
			}
		},


		components:{
			Cartcontrol
		},
		data(){
			return {
				listShow:false
			}
		},
		methods:{
			toggleList(){
				if(!this.totalCount){
					return;
				}
				this.listShow=!this.listShow;
				//初始化滚动
				if(this.listShow){
					this.$nextTick(() => {
						//判断当没有this.scroll时才初始化，否则刷新即可，避免每次点击都重新创建一个BScroll
						if(!this.scroll){
							// this.scroll=new BScroll(document.getElementsByClassName('list-content')[0],{ //使用原生js获取DOM元素
							this.scroll=new BScroll(this.$refs.list,{  //使用$refs获取DOM元素
								click:true
							});
						}else{
							this.scroll.refresh();
						}
					});
				}
			},
			empty(){
				this.selectFoods.forEach(food => {
					food.count=0;
				});
			},
			pay(){
				if(this.totalPrice<this.minPrice){
					return;
				}
				alert(`需要支付${this.totalPrice}元`);
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../common/less/mixin.less";

	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100%;
		height: 48px;
		background: #000;
		.content{
			display: flex;
			background: #141d27;
			.content-left{
				flex:1;
				.logo-wrapper{
					display: inline-block;
					position: relative;
					top: -10px;
					margin: 0 10px;
					padding: 6px;
					width: 56px;
					height: 56px;
					line-height: 56px;
					box-sizing: border-box;
					border-radius: 50%;
					background: #141d27;
					.logo{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background: #2b343c;
						text-align: center;
						&.highlight{
							background-color:rgb(0,160,220); 
						}
						.icon-shopping_cart{
							font-size: 24px;
							color:#80858a;
							&.highlight{
								color:#fff;
							}
						}
					}
					.num{
						position: absolute;
						top:0;
						right:0;
						width: 24px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-size: 9px;
						font-weight: 700;
						color:#fff;
						background-color: rgb(240, 20, 20);
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
					}
				}
				.price{
					display: inline-block;
					vertical-align: top;
					margin-top: 12px;
					line-height: 24px;
					padding-right: 12px;
					box-sizing: border-box;
					border-right: 1px solid rgba(255,255,255,0.1);
					font-size: 16px;
					font-weight: 700;
					color: rgba(255,255,255,0.4);
					&.highlight{
						color:#fff;
					}
				}
				.desc{
					display: inline-block;
					vertical-align: top;
					line-height: 24px;
					margin: 12px 0 0 12px;
					color: rgba(255,255,255,0.4);
					font-size: 10px;
				}
			}
			.content-right{
				flex:0 0 105px;
				width: 105px;
				.pay{
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 12px;
					color: rgba(255, 255, 255,0.4);
					font-weight: 700;
					background-color: #2b333b;
					&.enough{
						background-color:#00b43c;
						color:#fff; 
					}
				}
			}
		}
		.shopcart-list{
			position: absolute;
			bottom: 48px;
			left: 0;
			z-index: -1;
			width: 100%;
			// transform: translate3d(0, -100%, 0);
			// transform:translateY(-100%);  //向上平移
			.list-header{
				height: 40px;
				line-height: 40px;
				padding: 0 18px;
				background-color: #f3f5f7;
				border-bottom: 1px solid rgba(7, 17, 27, 0.1);
				.title{
					float: left;
					font-size: 14px;
					color: rgb(7, 17, 27);
				}
				.empty{
					float: right;
					font-size: 12px;
					color: rgb(0, 160, 220);
				}
			}
			.list-content{
				padding:0 18px;
				max-height: 217px;
				overflow: hidden;
				background: #fff;
				.food{
					position: relative;
					padding: 12px 0;
					box-sizing: border-box;
					.border-1px(rgba(7, 17, 27, 0.1));
					.name{
						line-height: 24px;
						font-size: 14px;
						color:rgb(7, 17, 27);
					}
					.price{
						position: absolute;
						right: 90px;
						bottom: 12px;
						line-height: 24px;
						font-size: 14px;
						font-weight: 700;
						color: rgb(240, 20, 20);
					}
					.cartcontroll-wrapper{
						position: absolute;
						right: 0;
						bottom: 6px;
					}
				}
			}
		}
	}
	.list-mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
		background-color: rgba(7, 17, 27, 0.6);
	}
</style>