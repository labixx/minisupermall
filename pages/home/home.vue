<template>
	<view class="home-wrapper">
		<navbar self-define="head-wrapper" class="a">
			<view slot="left" class="search-left">
				<uni-icons type="search" size="20"></uni-icons>
				<input placeholder="热搜:圆通快递被约谈"/>
			</view>
		</navbar>
		<scroll-view scroll-y class="scroll-content" @scrolltolower="handleScrollBottom">
		<selfswiper :swiperImg="bannerImage">
			<!-- 不支持slot-scope，所以使用v-slot -->
		<!-- 	<template slot="imgList" slot-scope="info">
				<image :src="info.item"></image>
			</template> -->
			<!-- 
			v-slot:slotName="{解构语法}" 
			v-slot：具名插槽名称="具名插槽数据"			
			-->	
			<template v-slot:imgList="{item}">
				<image :src="item.image" mode="widthFix"></image>
			</template>
		</selfswiper> 
		<recommend :list="recommend"></recommend>
		<view class="weekImg">
			<image src="@/static/img/home/recommend_bg.794b6628.jpg"></image>
		</view>
		<tabcontrol :titles="tabTitles" @titiesClick="titlesClick"></tabcontrol>
		<homegoodsinfo :list="goods[currentType].list"></homegoodsinfo>
		<backtop :showBackTop="isShowBackTop"></backtop>
		</scroll-view>
	</view>
</template>

<script>
	import {swiperImg,mainGoodsList} from '@/network/home.js';
	import navbar from '@/components/common/self-navbar.vue';
	import selfswiper from "@/components/common/self-swiper.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import recommend from './childComponents/recommend.vue';
	import tabcontrol from './childComponents/tabcontrol.vue';
	import homegoodsinfo from './childComponents/homegoodsinfo.vue';
	import backtop from  './childComponents/backtop.vue';
	export default {
		 components: {
			 uniIcons,
			 navbar,
			 selfswiper,
			 recommend,
			 tabcontrol,
			 homegoodsinfo,
			 backtop
		},
		data(){
			return {
				bannerImage:[],
				recommend:[],
				goods:{
					pop:{
						page:0,
						list:[]
					},
					new:{
						page:0,
						list:[]
					},
					sell:{
						page:0,
						list:[]
					}
				},
				currentType:"pop",
				isShowBackTop:false,
				tabTitles:['流行','新款','精选'],
				clientHeight:null,
				scroll_height:0,
			
			}
		},
		created() {
			this.getSwiperImgList();
			 this.getMainGoodsInfo('pop');
			this.getMainGoodsInfo('new');
			this.getMainGoodsInfo('sell'); 
			
		},
		//页面滚动事件
		onPageScroll(event){
			this.isShowBackTop=event.scrollTop>1000;
		},
		mounted(){
			//获取屏幕的高度，默认除了tabbar
			this.getScrollHeight(data=>{
				console.log("iiiiiiii",data);
				this.scroll_height=data.windowHeight;
			});
	console.log(this.scroll_height);
			
		},
		methods:{	
			//获取轮播图数据
			getSwiperImgList(){
				swiperImg().then(res=>{
						// console.log(res);
						this.bannerImage=res.data.data.banner.list;
						this.recommend=res.data.data.recommend.list;
					})
			},
			//获取商品数据,并进行封装
			getMainGoodsInfo(type){
				const page=this.goods[type].page + 1;
				//console.log('当前类型',type);
				mainGoodsList(type,page).then(res=>{
					console.log("商品信息");
					//console.log(res);
					this.goods[type].list=[...res.data.data.list];
					this.goods[type].page=res.data.data.page;
					//console.log('数据',this.goods[type].list);
				})
			},
			
			titlesClick(index){
				switch(index){
					case 0:
					this.currentType='pop';
					break;
					case 1:
					this.currentType='new';
					break;
					case 2:
					this.currentType="sell";
					break;
				};
				//console.log("当前所点击的是",this.currentType);
				//点击标题进行发送对应得商品数据
				this.getMainGoodsInfo(this.currentType);
			},
			//获取滚动的高度
			 getScrollHeight(callback){
				 setTimeout(()=>{
					 uni.getSystemInfo({
					 		success:(res)=>{
					 			callback(res);
					 		}
					 });
				 },1000)
				},
			//scroll-view滚动到底部触发加载更多数据
			handleScrollBottom(){
				this.getMainGoodsInfo(this.currentType);
			},
			}
			
	}
</script>

<style>
.head-wrapper{
	margin-top:25px;
}
.search-left{
	height:100%;
	display:flex;
	font-size: 14px;
	border-radius: 18px;
	background-color: #f7f7f7;
	padding:5px 0px  0px 2px;
	box-sizing: border-box;
}
>>>.bannnerImg{
	border:1px solid black !important;
	width:100%;
	height:100%;
}
.weekImg image{
	width:100%;
}
.scroll-content{
height:461px;
}

</style>
