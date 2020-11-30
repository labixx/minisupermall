export default function (options){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:'http://152.136.185.210:8000/api/w6'+options.url,
			method:options.method || 'get',
			data:options.data || {},
			timeout:options.timeout || '5000ms',
			success:function(res){
				resolve(res);
			},
			fail:function(err){
				reject(err);
			}
		})
	})
	
}