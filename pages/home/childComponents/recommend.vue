<template>
	<view class="recommend-wrapper">
		<block v-for="(item,index) in list" :key="index">
			<view class="recommend-item">
				<image :src="item.image" mode="widthFix"></image>
				<text>{{item.title}}</text>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default {
		name:'recommend',
		props:{
			list:{
				type:Array,
				required:true,
			}
		},
		data () {
			return {
				
			}
		},
	}
</script>

<style scoped>
.recommend-wrapper{
		width:100%;
		display:flex;
		margin:10rpx 0;
		padding-bottom:30rpx;
		border-bottom:20rpx solid #d6d6d6;
	
	}
.recommend-item{
		flex:1;
	}
	image{
	width:100%;
	height:100%;
	}
</style>
