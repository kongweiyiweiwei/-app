<template>
	<div class="cartcontrol">
		<div class="decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop="decreaseCart"></div>
		<div class="count" v-show="food.count>0">{{food.count}}</div>
		<div class="increase icon-add_circle" @click.stop="increaseCart"></div>
	</div>
</template>

<script>
	import Vue from 'vue'

	export default {
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			increaseCart(){
				if ( !this.food.count ){
					Vue.set( this.food , 'count' , 1 );
				}else{
					this.food.count++;
				}
			},
			decreaseCart(){
				if ( this.food.count ){
					this.food.count--;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.cartcontrol{
		.decrease,.increase{
			display: inline-block;
			padding: 6px;
			font-size: 24px;
			line-height: 24px;
			color:rgb(0,160,220);
		}
		.count{
			display: inline-block;
			vertical-align: top;
			padding-top: 6px;
			text-align: center;
			width: 12px;
			font-size: 10px;
			color:rgb(147,153,159);
			line-height: 24px;
		}
	}
</style>

