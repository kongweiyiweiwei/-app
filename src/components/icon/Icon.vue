<template>
	<span class="icon" :class="types[index]" v-show="index>=0"></span>
</template>

<script>
	export default {
		data(){
			return {
				types:['decrease','discount','special','invoice','guarantee'] //减、折、特、票、保
			}
		},
		props:['index']
	}
</script>

<style lang="less" scoped>
	@import "../../common/less/mixin.less";

	.icon{
		display: inline-block;
		vertical-align: middle;
		width: 12px;
		height: 12px;
		margin-right: 4px;
		background-size: 12px 12px !important;
		&.decrease{
			.bg-img("../../components/icon/decrease_1"); //此处的相对路径是相对于引入的mixin.less，并非当前组件
		}
		&.discount{
			.bg-img("../../components/icon/discount_1");
		}
		&.special{
			.bg-img("../../components/icon/special_1");
		}
		&.invoice{
			.bg-img("../../components/icon/invoice_1");
		}
		&.guarantee{
			.bg-img("../../components/icon/guarantee_1");
		}
	}
</style>