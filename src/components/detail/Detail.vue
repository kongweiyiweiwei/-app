<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class="detail" v-show="detailShow">
			<div class="detail-wrapper clearfix">
				<div class="content">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-wrapper">
						<Star :size="48" :score="seller.score"></Star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul class="support" v-if="seller.supports">
						<li v-for="(item,index) in seller.supports" class="support-item">
							<Icon :index="seller.supports[index].type"></Icon>
							<span class="text">{{seller.supports[index].description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p class="text">{{seller.bulletin}}</p>
					</div>
				</div>
			</div>
			<div class="close" @click="hideDetail">
				<i class="icon-close"></i>
			</div>
		</div>
	</transition>
</template>

<script>
	import Star from '../star/Star.vue'
	import Icon from '../icon/Icon.vue'
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'

	export default {
		computed:mapGetters([
			'seller',
			'detailShow'
		]),
		methods:{
			hideDetail(){
				this.$store.dispatch('hideDetail');
			}
		},
		components:{
			Star,
			Icon
		}
	}
</script>

<style lang="less" scoped>
	.detail{
		position: fixed;
		top:0;
		left:0;
		z-index: 666;
		width: 100%;
		height: 100%;
		overflow: auto; //超出屏幕高度时出现滚动条
		background: rgba(7,17,27,0.8);
		backdrop-filter:blur(10px); //只有ios手机支持该模糊效果
		.detail-wrapper{
			width: 100%;
			min-height: 100%;
			.content{
				margin: 64px auto;
				.name{
					text-align: center;
					font-size: 16px;
					font-weight: 700;
					line-height: 16px;
				}
				.star-wrapper{
					text-align: center;
					margin-top: 16px;
				}
				.title{
					display: flex;
					width: 80%;
					margin:28px auto 24px auto;
					.line{
						flex:1;
						border-bottom: 1px solid rgba(255,255,255,0.2);
						position: relative;
						bottom: 6px;
					}
					.text{
						font-size: 14px;
						font-weight: 700;
						padding: 0 12px;
					}
				}
				.support{
					width: 80%;
					margin: 0 auto;
					.support-item{
						padding: 0 12px;
						margin-bottom: 12px;
						.text{
							font-size: 12px;
							font-weight: 200;
						}
					}
				}
				.bulletin{
					width: 80%;
					margin: 0 auto;
					.text{
						padding: 0 12px;
						font-size: 12px;
						font-weight: 200;
						line-height: 24px;
					}
				}
			}
		}
		.close{
			// position: relative;
			width: 32px;
			height: 32px;
			margin:-64px auto 0 auto;
			clear: both;
			font-size: 32px;
			color: rgba(255,255,255,0.5);
		}
	}
</style>