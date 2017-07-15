import types from '../types.js'
import axios from 'axios'

const state={
	goods:[]
}

const getters={
	goods(state){
		return state.goods;
	}
}

const actions={
	getGoods:({commit,state}) => {
		//返回一个Promise对象，便于在异步操作完成后进行处理
		return new Promise((resolve,reject) => {
			axios.get('/api/goods').then((resp) => {
		      if(resp.data.errno===0){
		      	commit(types.GET_GOODS,resp.data.data);
		      	resolve();
		      }
		    });
		});
	}
}

const mutations={
	[types.GET_GOODS](state,data){
		state.goods=data;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}