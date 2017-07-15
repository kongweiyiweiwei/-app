<template>
	<div class="header">
		<!-- 内容 -->
		<div class="content-wrapper">
			<div class="avatar"> <!-- 头像 -->
				<img :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<!-- 由于获取数据是一个异步操作，刚开始seller是空对象，所以需要使用v-if判断，否则会报错 -->
				<div class="support" v-if="seller.supports"> 
					<Icon :index="seller.supports[0].type"></Icon>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>		
			</div>
			<div class="support-count" v-if="seller.supports" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<!-- 公告 -->
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin"></span>
			<span class="text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<!-- 背景 -->
		<div class="background-wrapper">
			<img :src="seller.avatar">
		</div>
		<!-- 详情弹出层 -->
		<Detail></Detail>
	</div>
</template>

<script>
	import Icon from '../icon/Icon.vue'
	import Detail from '../detail/Detail.vue';
	import {mapGetters} from 'vuex'

	export default {
		created(){
	      this.$store.dispatch('getSeller');
	    },
		computed:mapGetters([
			'seller',
			'detailShow'
		]),
		methods:{
			showDetail(){
				this.$store.dispatch('showDetail');
			}
		},
		components:{
			Icon,
			Detail
		}
	}
</script>

<style lang="less" scoped>
	@import "../../common/less/mixin.less";

	.header{
		color:#fff;
		background:rgba(7,17,27,0.5);
		position: relative;
		.content-wrapper{
			position: relative;
			padding:24px 12px 18px 24px;
			font-size: 0px; //消除avatar和content之间的间隙
			.avatar{
				display: inline-block;
				vertical-align: top;
				img{
					width:64px;
					height:64px;
					border-radius: 2px;
				}
			}
			.content{
				display: inline-block;
				font-size: 14px; //单独为content设置字体大小(注：由于内部为每个内容都单独设置了字体大小，所以此处可以不设置)
				margin-left:16px;
				.title{
					margin:2px 0px 8px 0px;
					.brand{
						display: inline-block;
						vertical-align: top;
						width:30px;
						height:18px;
						.bg-img("../../components/header/brand"); //此处的相对路径是相对于引入的mixin.less，并非当前组件
						background-size: 30px 18px;
					}
					.name{
						margin-left: 6px;
						font-size:16px;
						font-weight: bold;
						line-height: 18px;
					}
				}
				.description{
					margin-bottom: 10px;
					font-size: 12px;
					line-height: 12px;
				}
				.support{
					.text{
						font-size: 10px;
						line-height: 12px;
					}
				}
			}
			.support-count{
				position: absolute;
				right: 12px;
				bottom: 18px;
				padding:0 8px; 
				height: 24px;
				line-height: 24px;
				border-radius: 14px;
				background: rgba(0, 0, 0, 0.2);
				text-align: center;
					.count{
						font-size:10px;
						vertical-align: top;
					}
					.icon-keyboard_arrow_right{
						font-size:10px;
						line-height: 24px;
						margin-right: 2px;
					}
			}
		}
		.bulletin-wrapper{
			position: relative;
			height: 28px;
			line-height: 28px;
			padding: 0 28px 0 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow:ellipsis;
			background: rgba(7,17,27,0.2);
			.bulletin{
				display: inline-block;
				vertical-align: middle;
				width: 22px;
				height: 12px;
				.bg-img("../../components/header/bulletin");
				background-size: 22px 12px;
				border-radius: 2px;
			}
			.text{
				font-size: 10px;
			}
			.icon-keyboard_arrow_right{
				position: absolute;
				right: 10px;
				top:8px;
			}
		}
		.background-wrapper{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			filter:blur(10px); //CSS3 Filter(滤镜)中的blur模糊
			img{
				width: 100%;
				height: 100%;
			}
		}
	}

</style>