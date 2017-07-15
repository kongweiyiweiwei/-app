<template>
	<div class="ratingselect">
		<div class="type">
			<span class="block all" :class="{'active':selectType===2}" @click="select(2)">
				{{types[2]}} <span class="count">{{ratings.length}}</span>
			</span>
			<span class="block positive" :class="{'active':selectType===0}" @click="select(0)">
				{{types[0]}} <span class="count">{{positiveCount}}</span>
			</span>
			<span class="block negative" :class="{'active':selectType===1}" @click="select(1)">
				{{types[1]}} <span class="count">{{negativeCount}}</span>
			</span>
		</div>
		<div class="switch" :class="{'on':onlyContent}" @click="toggle">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'

	export default {
		computed:{
			...mapGetters([
				'ratings',
				'types',
				'selectType',
				'onlyContent'
			]),
			positiveCount(){
				return this.ratings.filter(rating => {
					return rating.rateType===0;
				}).length;
			},
			negativeCount(){
				return this.ratings.filter(rating => {
					return rating.rateType===1;
				}).length;
			}
		},
		methods:{
			select(type){
				this.$store.dispatch('select',{type});
			},
			toggle(){
				this.$store.dispatch('toggle');
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../common/less/mixin.less";

	.ratingselect{
		.type{
			padding: 18px 0;
			margin: 0 18px;
			.border-1px(rgba(7,17,27,0.1));
			.block{
				display: inline-block;
				margin-right: 8px;
				padding: 8px 12px;
				border-radius: 1px;
				font-size: 12px;
				color: rgb(77,85,93);
				&.active{
					color: #fff;
				}
				&.all,&.positive{
					background: rgba(0,160,220,0.2);
					&.active{
						background: rgb(0,160,220,);
					}
				}
				&.negative{
					background: rgba(77,85,93,0.2);
					&.active{
						background: rgb(77,85,93);
					}
				}
			}
		}
		.switch{
			padding: 12px 18px;
			line-height: 24px;
			border-bottom: 1px solid rgba(7,17,27,0.1);
			color:rgb(147,153,159);
			&.on{
				.icon-check_circle{
					color:#00c850;
				}
			}
			.icon-check_circle{
				display: inline-block;
				vertical-align: top;
				margin-right: 4px;
				font-size: 24px;
			}
			.text{
				display: inline-block;
				vertical-align: top;
				font-size: 12px;
			}
		}
	}
</style>