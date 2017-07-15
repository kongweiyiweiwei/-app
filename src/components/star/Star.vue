<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>

<script>
	const LENGTH=5;
	const ON='on';
	const HALF='half';
	const OFF='off';

	export default {
		props:['size','score'],
		computed:{
			starType(){
				return 'star-'+this.size;
			},
			itemClasses(){
				let result=[];
				let integer=Math.floor(this.score); //整数
				let decimal=this.score-integer; //小数
				for(let i=0;i<integer;i++){
					result.push(ON);
				}
				if(decimal>=0.5){
					result.push(HALF);
				}
				while(result.length<LENGTH){
					result.push(OFF);
				}
				return result;
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../common/less/mixin.less";

	.star{
		&.star-24{
			.star-item{
				display: inline-block;
				width: 10px;
				height: 10px;
				margin-right: 3px;
				background-size: 10px 10px !important;
				&.on{
					.bg-img("../../components/star/star24_on");
				}
				&.half{
					.bg-img("../../components/star/star24_half");
				}
				&.off{
					.bg-img("../../components/star/star24_off");
				}
			}
		}
		&.star-36{
			.star-item{
				display: inline-block;
				width: 15px;
				height: 15px;
				margin-right: 6px;
				background-size: 15px 15px !important;
				&.on{
					.bg-img("../../components/star/star36_on");
				}
				&.half{
					.bg-img("../../components/star/star36_half");
				}
				&.off{
					.bg-img("../../components/star/star36_off");
				}
			}
		}
		&.star-48{
			.star-item{
				display: inline-block;
				width: 20px;
				height: 20px;
				margin-right: 22px;
				background-size: 20px 20px !important;
				&.on{
					.bg-img("../../components/star/star48_on");
				}
				&.half{
					.bg-img("../../components/star/star48_half");
				}
				&.off{
					.bg-img("../../components/star/star48_off");
				}
			}
		}

	}
</style>