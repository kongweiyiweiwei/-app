<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<Star :size="36" :score="seller.score"></Star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<div class="favorite" @click="toggleFavorite">
					<i class="icon-favorite" :class="{'active':favorite}"></i>
					<span class="text">{{favoriteText}}</span>
				</div>
				<ul class="remark">
					<li>
						<h2>起送价</h2>
						<div>
							<span class="big">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li>
						<h2>商家配送</h2>
						<div>
							<span class="big">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li>
						<h2>平均配送时间</h2>
						<div>
							<span class="big">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
			</div>
			<Split></Split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content">{{seller.bulletin}}</div>
				<ul class="support" v-if="seller.supports">
					<li v-for="(item,index) in seller.supports" class="support-item">
						<Icon :index="seller.supports[index].type"></Icon>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<Split></Split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li v-for="pic in seller.pics" class="pic-item">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<Split></Split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li v-for="info in seller.infos" class="info-item">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import Split from '../split/Split.vue'
	import Star from '../star/Star.vue'
	import Icon from '../icon/Icon.vue'

	export default {
		components:{
			Split,
			Star,
			Icon
		},
		data(){
			return {
				favorite:false
			}
		},
		computed:{
			...mapGetters([
				'seller'
			]),
			favoriteText(){
				return this.favorite?'已收藏':'收藏';
			}
		},
		methods:{
			toggleFavorite(){
				this.favorite=!this.favorite;
			},
			initScroll(){
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.seller,{
						click:true
					});
				}else{
					this.scroll.refresh();
				}
			},
			initPicScroll(){ //初始化图片滚动
				if (this.seller.pics) {
		          	let picWidth = 120;
		          	let margin = 6;
		          	let width = (picWidth + margin) * this.seller.pics.length - margin;
		          	this.$refs.picList.style.width = width + 'px';

					if (!this.picScroll) {
		              	this.picScroll = new BScroll(this.$refs.picWrapper, {
		                	scrollX: true,
		                	eventPassthrough: 'vertical'
		              });
		            } else {
		              	this.picScroll.refresh();
		            }
		        }  	
			}
		},
		created(){
			this.$nextTick(() => {
				this.initScroll();
				this.initPicScroll();
			});
		},
		watch:{
			seller(){
				this.$nextTick(() => {
					this.initScroll();
					this.initPicScroll();
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../common/less/mixin.less";

	.seller{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		.overview{
			position: relative;
			padding: 18px;
			.title{
				margin-bottom: 8px;
				line-height: 14px;
				color: rgb(7,17,27);
				font-size: 14px;
			}
			.desc{
				padding-bottom: 18px;
				.border-1px(rgba(7,17,27,0.1));
				.star{
					display: inline-block;
					margin-right: 8px;
					vertical-align: middle;
				}
				.text{
					margin-right: 12px;
					line-height: 18px;
					font-size: 10px;
					color: rgb(77,85,93);
				}
			}
			.favorite{
				position: absolute;
				top: 18px;
				right: 18px;
				width: 50px;
				text-align: center;
				.icon-favorite{
					display: block;
					margin-bottom: 4px;
					line-height: 24px;
					font-size: 24px;
					color: #d4d6d9;
					&.active{
						color:rgb(240,20,20);
					}
				}
				.text{
					line-height: 10px;
					font-size: 10px;
					color: rgb(77,85,93);
				}
			}
			.remark{
				display: flex;
				padding-top: 18px;
				li{
					flex:1;
					text-align: center;
					border-right: 1px solid rgba(7,17,27,0.1);
					&:last-child{
						border:none;
					}
					h2{
						margin-bottom: 4px;
						line-height: 10px;
						font-size: 10px;
						color:rgb(147,153,159);
					}
					div{
						line-height: 24px;
						font-size: 10px;
						color: rgb(7,17,27);
						.big{
							font-size: 24px;
						}
					}
				}
			}
		}
		.bulletin{
			padding:18px;
			.title{
				margin-bottom: 8px;
				line-height: 14px;
				color: rgb(7,17,27);
				font-size: 14px;
			}
			.content{
				padding: 0 12px 16px 12px;
				line-height: 24px;
				font-size: 12px;
				color: rgb(240,20,20);
				.border-1px(rgba(7,17,27,0.1));
			}
			.support{
				.support-item{
					padding: 16px 12px;
					.border-1px(rgba(7,17,27,0.1));
					&:last-child{
						.border-none;
					}
				}
				.icon{
					display: inline-block;
					width: 16px;
					height: 16px;
					vertical-align: middle;margin-right: 6px;
					background-size: 16px 16px;
				}
				.text{
					line-height: 16px;
					font-size: 12px;
					color: rgb(7,17,27);
				}
			}
		}
		.pics{
			padding: 18px;
			.title{
				margin-bottom: 12px;
				line-height: 14px;
				color: rgb(7,17,27);
				font-size: 14px;
			}
			.pic-wrapper{
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				.pic-item{
					display: inline-block;
					margin-right: 6px;
					width: 120px;
					height: 90px;
					&:last-child{
						margin: 0;
					}
				}
			}
		}
		.info{
			padding: 18px 18px 0 18px;
			color: rgb(7,17,27);
			.title{
				padding-bottom: 12px;
				line-height: 14px;
				.border-1px(rgba(7,17,27,0.1));
				font-size: 14px;
			}
			.info-item{
				padding: 16px 12px;
				line-height: 16px;
				.border-1px(rgba(7,17,27,0.1));
				font-size: 12px;
				&:last-child{
					.border-none();
				}
			}
		}
	}
</style>