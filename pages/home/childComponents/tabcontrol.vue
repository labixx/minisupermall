<template>
	<view class="tabcontrol-wrapper">
		<view class="tabcontrol">
		<block v-for="(item,index) in titles" :key="index" >
			<view class="titles" >
			<text :class="{act : current==index?!isAct:isAct}"  @click="tabClick(index)">{{item}}</text>
			</view>
		</block>
		</view>
	</view>
</template>

<script>
	export default {
		name:"tabcontrol",
		props:{
			titles:{
				type:Array,
				required:true,
			},
		},
		data(){
			return {
				current:0,
				isAct:false,
			}
		},
		
		methods:{
			tabClick(index){
				this.current=index;
				this.$emit("titiesClick",index);
			}
		},
	}
</script>

<style scoped>
	.tabcontrol{
		width:100%;
		display:flex;
		text-align: center;
	}
	.titles{
		flex:1;
		padding:10rpx 0;
		}
		.act{
			border-bottom:1px solid #ff5777;
		}
</style>
