import request from '@/network/index.js';
export function swiperImg(){
	return request({
		url:'/home/multidata',
	})
}

export function mainGoodsList(type,page){
	return request({
		url:'/home/data',
		//注意：使用uni.request得get对应得参数属性使用：data
		data:{
			type,
			page,
		}
	})
}