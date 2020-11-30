<template>
	<view class="goods-wrapper">
		<block v-for="(item ,indx) in list" :key="index">
		<view class="goods-item">
			<image :src="item.show.img" mode="widthFix"></image>
			<view class="goods-title">
				<text>{{item.title}}</text>
			</view>
			<view>
				<text>￥{{item.price}}</text>
				<uniIcons type="star" size="40"></uniIcons>
				<text>{{item.cfav}}</text>
				
			</view>
		</view>
		</block>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	export default{
		props:{
				list:{
					type:Array,
					required:true,
				},
			
		},
		mounted(){
			console.log("获取得数据",this.list);
		},
	}
</script>

<style scoped lang="less">
	.goods-wrapper{
		width:100%;
		display:flex;
		flex-wrap: wrap;
		justify-content: space-around;
		.goods-item{
			width:48%;
			// margin:0 1%;
			image{
				width:100%;
				height:100%;
			}
			.goods-title{
				width:100%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
		
	}
</style>
