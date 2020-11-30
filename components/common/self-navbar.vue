<template>
	<view class="self-navvar self-define">
		<view class="navvar-item-left">
			<slot name="left"></slot>
		</view>
		<view  class="navvar-item-right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {}
		},
		externalClasses:['self-define'],
		methods:{},
	}
	
</script>

<style scoped>
	.self-navvar{
		width:100%;
		height:80rpx;
		display:flex;
		flex-direction: row;

	}
	.navvar-item-left{
		flex:2;
	}
	.navvar-item-right{
		flex:1;
	}
</style>
