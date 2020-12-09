<template>
	<view class="home-wrapper">
		<navbar self-define="head-wrapper" class="nav">
			<view slot="left" class="search-left">
				<uni-icons type="search" size="20"></uni-icons>
				<input placeholder="热搜:圆通快递被约谈"/>
			</view>
		</navbar>
		<scroll-view scroll-y 
		:style="{height:scroll_height+'px'}"
		@scrolltolower="handleScrollBottom" 
		scroll-top="scrollTopNum"
		@scroll="handleScroll" >
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
		<backtop :showBackTop="isShowBackTop">
			<image class="backtopLogo" slot="backtopLogo" src="@/static/img/home/top.png" @click="handleClick"></image>
		</backtop>
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
				//可滚动得区域
				scroll_height:null,
				//异步获取得数组
				promiseArr:[],
				scrollTopNum:0,
			}
		},
		created() {
			this.getSwiperImgList();
			this.getMainGoodsInfo('pop');
			this.getMainGoodsInfo('new');
			this.getMainGoodsInfo('sell'); 
		},
		mounted(){	
			this._getScrollHeight();
		},
		//监听器
		watch:{
			//监听异步数据
			promiseArr(newValue,oldVaule){
				this.scroll_height=newValue[0].windowHeight - newValue[1].height;
			}
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
			//scroll-view滚动到底部触发加载更多数据
			handleScrollBottom(){
				this.getMainGoodsInfo(this.currentType);
			},
			//scroll-view触发滚动事件
			handleScroll(event){
				this.isShowBackTop=event.detail.scrollTop>500;
			},
			//回到顶部事件
			handleClick(){
				this.scrollTopNum=0;
				// uni.pageScrollTo({
				// 	scrollTop:0,
				// 	duration:3000,
				// })
				
			},
					
			//动态获取可滚动得高度
			//通过promise.all获取多个异步得数据
			_getScrollHeight(){	
				let as1=new Promise((resolve,reject)=>{
					 uni.getSystemInfo({
						success:res=>{
							resolve(res);
						}
					})
				});
				let as2=new Promise((resolve,reject)=>{
					uni.createSelectorQuery().select(".nav").boundingClientRect(data=>{
						resolve(data);
					}).exec();
				});
				Promise.all([as1,as2]).then(res=>{
					//return res;
					this.promiseArr=[...res];
				}).catch(err=>{
					console.log(err);
				});
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
.backtopLogo{
	width:100rpx;
	height:100rpx;
}
</style>
