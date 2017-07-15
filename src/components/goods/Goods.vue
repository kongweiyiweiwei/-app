<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
					<span class="text">
						<Icon :index="item.type"></Icon>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper">
			<ul>
				<li v-for="item in goods" class="food-list">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item" @click="showFood(food)">
							<div class="icon">
								<img :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontroll-wrapper">
									<Cartcontrol :food="food"></Cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<Shopcart></Shopcart>
		<Food></Food>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import Icon from '../icon/Icon.vue'
	import BScroll from 'better-scroll'
	import Shopcart from '../shopcart/Shopcart.vue'
	import Cartcontrol from '../cartcontrol/Cartcontrol.vue'
	import Food from '../food/Food.vue'

	import 'animate.css/animate.css'

	export default {
		created(){
			//在Action通过是异步的，在Action执行结束后进行处理
			this.$store.dispatch('getGoods').then(() => {
				//在DOM更新后执行
				this.$nextTick(() => {
					//初始化滚动的操作需要在DOM更新后执行，所以必须放到$nextTick()中，否则不生效
					this.initScroll();
					//计算区间的高度
					this.calcHeight();
				});
			});
		},
		computed:{
			...mapGetters([
				'seller',
				'goods'
			]),
			currentIndex(){
				for(let i=0;i<this.heights.length;i++){
					let height1=this.heights[i];
					let height2=this.heights[i+1];
					if(!height2 || (this.scrollY>=height1&&this.scrollY<height2)){
						return i;
					}
				};
				return 0;
			}
		},
		components:{
			Icon,
			Shopcart,
			Cartcontrol,
			Food
		},
		methods:{
			initScroll(){
				this.menuScroll=new BScroll(document.getElementsByClassName('menu-wrapper')[0],{
					click:true //插件默认阻止了事件，需要派发事件才行，这里派发click事件，以便能触发click事件
				});
				this.foodsScroll=new BScroll(document.getElementsByClassName('foods-wrapper')[0],{
					probeType:3, //派发scroll事件，以便在滚动时能实时获取滚动位置
					click:true

				});
				//监听滚动事件，当滚动时触发，参数pos表示实时位置
				this.foodsScroll.on('scroll',(pos) => {
					// console.log(pos.y);
					this.scrollY=Math.abs(Math.round(pos.y)); //有小数、向下滚动时值为负数
				});
			},
			calcHeight(){
				let foodList=document.getElementsByClassName('food-list');
				let height=0;
				this.heights.push(height);
				for(let i=0;i<foodList.length;i++){
					height+=foodList[i].clientHeight; //获取每一个区间的高度，然后累加
					this.heights.push(height);
				}
			},
			selectMenu(index){
				// console.log(index);
				let foodList=document.getElementsByClassName('food-list');
				this.foodsScroll.scrollToElement(foodList[index],300); //滚动到指定元素位置
			},
			showFood(food){
				this.$store.dispatch('showFood',food); //将food传给action
			}
		},
		data(){
			return {
				heights:[], //存储每个区间的递增高度，是一个递增的数组
				scrollY:0, //右侧垂直坐标值
				selectFood:{}
			}
		}

	}
</script>

<style lang="less" scoped>
	@import "../../common/less/mixin.less";

	.goods{
		display: flex;
		position: absolute;
		top: 174px; //header和tab的高度总和为174px
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		.menu-wrapper{
			flex:0 0 80px; //不扩展、不缩放、宽度为80px
			width: 80px;
			background: #f3f5f7;
			.menu-item{
				display: table;
				width: 56px;
				height: 54px;
				padding: 0 12px; //居中
				&.current{
					position: relative;
					margin-top: -1px;
					z-index: 666;
					background-color: #fff;
					font-weight: bold;
					color:blue;
					.text{
						.border-none();
					}
				}
				.text{
					display: table-cell;
					font-size: 12px;
					font-weight: 200;
					line-height: 14px;
					vertical-align: middle;
					.border-1px(rgba(7,17,27,0.1));
				}
			}
		}
		.foods-wrapper{
			flex:1;
			.title{
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #d9dde1;
				font-size: 12px;
				color: rgb(147, 153, 159);
				background-color: #f3f5f7;
			}
			.food-item{
				display: flex;
				margin:18px;
				padding-bottom: 18px; /* 上下元素的margin会重叠在一起，所以此处设置padding */
				.border-1px(rgba(7,17,27,0.1));
				.icon{
					flex:0 0 57px;
					margin-right: 10px;
					img{
						width: 57px;
						height: 57px;
					}
				}
				.content{
					flex:1;
					.name{
						margin: 2px 0 8px 0;
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						color:rgb(7, 17, 27);
					}
					.desc{
						margin-bottom: 8px;
						line-height: 12px;
						font-size: 10px;
						color: rgb(147, 153, 159);
					}
					.extra{
						line-height: 10px;
						font-size: 10px;
						color: rgb(147, 153, 159);
						.count{
							margin-right: 12px;
						}
					}
					.price{
						font-weight: 700;
						line-height: 24px;
						.now{
							margin-right: 8px;
							font-size: 14px;
							color: rgb(240, 20, 20);
						}
						.old{
							text-decoration: line-through;
							font-size: 10px;
							color: rgb(147, 153, 159);
						}
					}
					.cartcontrol{
						position: absolute;
						right: 0;
						bottom: 12px;
					}
				}
			}
		}
	}
</style>