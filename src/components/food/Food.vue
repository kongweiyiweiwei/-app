<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight" @before-enter="beforeEnter">
		<div class="food" v-show="foodShow">
			<div class="food-content"> <!-- 这里必须添加一个外层的容器，才能实现滚动 -->
				<div class="image-header">
					<img :src="food.image">
					<div class="back" @click="hideFood">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="buy" @click.stop="addFirst" v-show="food.count===0||!food.count">加入购物车</div>
					<div class="cartcontrol-wrapper">
						<Cartcontrol :food="food"></Cartcontrol>
					</div>
				</div>
				<Split></Split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<Split v-show="food.info"></Split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<Ratingselect></Ratingselect>
					<div class="rating-wrapper">
						<ul>
							<li v-for="rating in selectRatings" class="rating-item">
								<div class="time">
									{{rating.rateTime | formatDate}}
								</div>
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img class="avatar" :src="rating.avatar">
								</div>
								<p class="text">
									<i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
									<span>{{rating.text}}</span>
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.rating||food.ratings.length===0">暂无评价</div>
					</div>
				</div>
			</div>	
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue'
	import {mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import 'animate.css/animate.css'
	import Cartcontrol from '../cartcontrol/Cartcontrol.vue'
	import Split from '../split/Split.vue'
	import Ratingselect from '../ratingselect/Ratingselect.vue'

	export default {
		computed:{
			...mapGetters([
				'foodShow',
				'food',
				'selectRatings'
			])
		},
		methods:{
			hideFood(){
				this.$store.dispatch('hideFood');
			},
			addFirst(){
				Vue.set(this.food,'count',1);
			},
			beforeEnter(el){ //在动画进入前初始化滚动
				this.$store.dispatch('changeTypes',['推荐','吐槽','全部']);
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll=new BScroll(el,{
							click:true
						});
					}else{
						this.scroll.refresh();
					}
				});
			}
		},
		components:{
			Cartcontrol,
			Split,
			Ratingselect
		}
	}
</script>

<style lang="less" scoped>
	@import "../../common/less/mixin.less";

	.food{
		position: fixed;
		top: 0;
		left: 0;
		bottom:48px;
		z-index: 5;
		width: 100%;
		background-color: #fff;
		.image-header{
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 100%;
			img{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			.back{
				position: absolute;
				top: 10px;
				left: 0;
				.icon-arrow_lift{
					display: block;
					font-size: 10px;
					color: #fff;
					padding: 10px;
				}
			}
		}
		.content{
			position: relative;
			padding: 18px;
			.title{
				line-height: 14px;
				margin-bottom: 8px;
				font-size: 14px;
				font-weight: 700;
				color: rgb(7,17,27);
			}
			.detail{
				margin-bottom: 18px;
				line-height: 10px;
				height: 10px;
				font-size: 10px;
				color: rgb(147, 153, 159);
				.sell-count{
					margin-right: 12px;
				}
			}
			.price{
				font-weight: 700;
				line-height: 24px;
				.now{
					margin-right: 8px;
					font-size: 14px;
					color: rgb(240,20,20);
				}
				.old{
					text-decoration: line-through;
					font-size: 10px;
					color:rgb(147,153,159);
				}
			}
			.buy{
				position: absolute;
				right: 18px;
				bottom: 18px;
				z-index: 10;
				height: 24px;
				line-height: 24px;
				padding: 0 12px;
				box-sizing: border-box;
				border-radius: 12px;
				font-size: 10px;
				color: #fff;
				background: rgb(0,160,220);
			}
			.cartcontrol-wrapper{
		        position: absolute;
		        right: 12px;
		        bottom: 12px;
			}
		}
		.info{
			padding: 18px;
			.title{
				line-height: 14px;
				margin-bottom: 6px;
				font-size: 14px;
				color: rgb(7,17,27);
			}
			.text{
				line-height: 24px;
				padding: 0 8px;
				font-size: 12px;
				color: rgb(77, 85, 93);
			}
		}
		.rating{
			padding-top: 18px;
			.title{
				line-height: 14px;
				margin-left: 18px;
				font-size: 14px;
				color: rgb(7,17,27);
			}
			.rating-wrapper{
				padding: 0 18px;
				.rating-item{
					position: relative;
					padding: 16px 0;
					.border-1px(rgba(7,17,27,0.1));
					.time{
						margin-bottom: 6px;
						line-height: 12px;
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.user{
						position: absolute;
						right: 0;
						top: 16px;
						line-height: 12px;
						.name{
							display: inline-block;
							margin-right: 6px;
							vertical-align: center;
							font-size: 10px;
							color: rgb(147,153,159);
						}
						.avatar{
							width: 12px;
							height: 12px;
							border-radius: 50%;
						}
					}
					.text{
						line-height: 16px;
						font-size: 12px;
						color: rgb(7,17,27);
						.icon-thumb_up,.icon-thumb_down{
							margin-right: 4px;
							line-height: 16px;
							font-size: 12px;
						}	
						.icon-thumb_up{
							color:rgb(0,160,220);
						}
						.icon-thumb_down{
							color:rgb(147,153,159);
						}
					}
				}
				.no-rating{
					padding: 16px 0;
					font-size: 12px;
					color: rgb(147,153,159);
				}
			}
		}
	}
</style>