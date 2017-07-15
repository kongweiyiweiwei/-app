<template>
	<div class="ratings" ref="ratings">
		<div class="rating-content">
			<div class="overview">
				<div class="left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="right">
					<div class="service-score">
						<span class="title">服务态度</span>
						<Star :size="36" :score="seller.serviceScore"></Star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>	
					<div class="food-score">
						<span class="title">商品评分</span>
						<Star :size="36" :score="seller.foodScore"></Star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-time">
						<span class="title">送达时间</span>
						<span class="text">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<Split></Split>
			<Ratingselect></Ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in selectRatings" class="rating-item">
						<div class="avatar">
							<img :src="rating.avatar">
						</div>
						<div class="content">
							<h1 class="username">{{rating.username}}</h1>
							<div class="star-wrapper">
								<Star :size="24" :score="rating.score"></Star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
							<div class="text">{{rating.text}}</div>
							<div class="recommend" v-show="rating.recommend&&rating.recommend.length">
								<i class="icon-thumb_up"></i>	
								<span class="item" v-for="item in rating.recommend">{{item}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import Split from '../split/Split.vue'
	import Ratingselect from '../ratingselect/Ratingselect.vue'
	import Star from '../star/Star.vue'

	export default {
		computed:{
			...mapGetters([
				'seller',
				'selectRatings'
			])
		},
		components:{
			Split,
			Ratingselect,
			Star
		},
		created(){
			this.$store.dispatch('getRatings').then(() => {
				this.$store.dispatch('changeTypes',['满意','不满意','全部']);
				this.$nextTick(() => {
					this.scroll=new BScroll(this.$refs.ratings,{
					 	click:true
					});
				});
			});
		},
		watch:{ //监听评价，当发生变化时更新滚动
			selectRatings:function(newValue,oldValue){
				// this.$nextTick(() => {
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.ratings,{
							click:true
						});
					}else{
						this.scroll.refresh();
					}
				// });
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../common/less/mixin.less";

	.ratings{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		.overview{
			display: flex;
			padding: 18px 0;
			.left{
				flex:0 0 137px;
				width: 137px;
				padding: 6px 0;
				border-right: 1px solid rgba(7,17,27,0.1);
				text-align: center;
				.score{
					margin-bottom: 6px;
					line-height: 28px;
					font-size: 24px;
					color: rgb(255,153,0);
				}
				.title{
					margin-bottom: 8px;
					line-height: 12px;
					font-size: 12px;
					color: rgb(7,17,27);
				}
				.rank{
					line-height: 10px;
					font-size: 10px;
					color: rgb(147,153,159);
				}
			}
			.right{
				flex:1;
				padding: 6px 24px;
				.service-score,.food-score{
					margin-bottom: 8px;
					.title{
						display: inline-block;
						line-height: 18px;
						font-size: 12px;
						color: rgb(7,17,27);
					}
					.star{
						display: inline-block;
						margin: 0 4px;
						vertical-align: middle;
					}
					.score{
						display: inline-block;
						line-height: 18px;
						font-size: 12px;
						color: rgb(255,153,0);
					}
				}
				.delivery-time{
					.title{
						line-height: 18px;
						font-size: 12px;
						color: rgb(7,17,27);
					}	
					.text{
						margin-left: 4px;
						font-size: 12px;
						color: rgb(147,152,159);
					}
				}
			}
		}
		.rating-wrapper{
			padding: 0 18px;
			.rating-item{
				display: flex;
				padding: 18px 0;
				.border-1px(rgba(7,17,27,0.1));
				.avatar{
					flex:0 0 28px;
					width: 28px;
					margin-right: 12px;
					img{
						width: 28px;
						height: 28px;
						border-radius: 50%;
					}
				}
				.content{
					position: relative;
					flex: 1;
					.name{
						margin-bottom: 4px;
						line-height: 12px;
						font-size: 10px;
						color: rgb(7,17,27)
					}
					.star-wrapper{
						margin-bottom: 6px;
						.star{
							display: inline-block;
							margin-right: 6px;
							vertical-align: middle;
						}
						.delivery{
							display: inline-block;
							line-height: 12px;
							font-size: 10px;
							color: rgb(147,153,159);
						}
					}
					.time{
						position: absolute;
						top: 0;
						right: 0;
						line-height: 12px;
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.text{
						margin-bottom: 8px;
						line-height: 18px;
						font-size: 12px;
						color: rgb(7,17,27);
					}
					.recommend{
						line-height: 16px;
						.icon-thumb_up{
							display: inline-block;
							margin:0 8px 4px 0;
							font-size: 12px;
							color: rgb(0,160,220);
						}
						.item{
							padding: 0 6px;
							margin-right: 8px;
							border: 1px solid rgba(7,17,27,0.1);
							border-radius: 1px;
							font-size: 9px;
							color: rgb(147,153,159);
							background: #fff;
						}
					}
				}
			}
		}
	}
</style>