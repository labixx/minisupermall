<template>
	<uni-swiper-dot :info="swiperImg" :current="current" field="content"  :dotsStyles="{selectedBackgroundColor:'#ff5'}">
	    <swiper class="swiper-box" @change="change" autoplay interval="3000" circular >
	        <swiper-item v-for="(item ,index) in swiperImg" :key="index">
	            <view class="swiper-item">
					<!-- <slot :data="item" name="imgList"></slot> -->
					<!-- 你的意思应该是把这个item传给home组件 -->
					<!-- 这个slot是后面将要插入的槽 -->
					<!-- <text >{{item.image}}</text> -->
					<!-- item和string => {item, string}变成object传过去 -->
					<!-- <slot name = "imgList" :item="item" :string="str"> -->
					<slot name = "imgList" :item="item"></slot>
	            </view>
	        </swiper-item>
	    </swiper>
	</uni-swiper-dot>
</template>

<script>
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue";
	export default{
		components:{
			uniSwiperDot,
		},
		props:{
			swiperImg:{
				type:Array,
				required:true,
			}
		},
		data(){
			return {
				current:0,
				
			}
		},
		methods:{
			change(event) {		
			    this.current = event.detail.current;	
			},
			
					
		}
	}
</script>
<!-- 再less用/deep/ -->
<style scoped lang="less">
.swiper-item /deep/{
	width:100%;
	height:100%;
	/deep/ image{
		width:100%;
		height:100%;
	
	}
}
</style>
