<template>
	<view v-if="showBackTop"  class="backtop-wrapper">
		<slot name="backtopLogo"></slot>
			<!-- <image src="@/static/img/home/top.png" @click="handleBackTop" class="imgs"></image> -->
		</view>
</template>

<script>
	export default {
		name:"backtop",
			props:{
				showBackTop:{
					type:Boolean,
					default:false,
				},
			},		
			methods:{
				// handleBackTop(){
				// 	console.log("hhhhhhhh");
				// 	uni.pageScrollTo({
				// 		scrollTop:0,
				// 		duration:0,
				// 	})
				// }
			},
		}
</script>

<style scoped>
.backtop-wrapper{
	z-index:99;
	position:fixed;
	right:20rpx;
	bottom:44rpx;
	
}
image{
	width:100rpx;
	height:100rpx;
}
	
</style>