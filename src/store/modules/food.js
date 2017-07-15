import types from '../types.js'
import axios from 'axios'

const state={
	foodShow:false,
	food:{},
	ratings:[], //所有评价
	types: ['满意','不满意','全部'],  //0表示满意，1表示不满意，2表示全部
	selectType:2, //选择类型
	onlyContent:false, //只看有内容的吗
	selectRatings:[] //选择显示的评价
}

const getters={
	foodShow(state){
		return state.foodShow;
	},
	food(state){
		return state.food;
	},
	ratings(state){
		return state.ratings;
	},
	types(state){
		return state.types;
	},
	selectType(state){
		return state.selectType;
	},
	onlyContent(state){
		return state.onlyContent;
	},
	selectRatings(state){
		return state.selectRatings;
	}
}

const actions={
	showFood:({commit,state},food) => {
		commit(types.SHOW_FOOD,food);
	},
	hideFood:({commit}) => {
		commit(types.HIDE_FOOD);
	},
	select:({commit,state},{type}) => {
		commit(types.SELECT,{type});
	},
	changeTypes:({commit,state},_types) => {  //此处需要注意避免types名称重名，导致冲突报错
		commit(types.CHANGE_TYPES,_types);
	},
	toggle({commit}){
		commit(types.TOGGLE);
	},
	getRatings:({commit,state}) => {
		//返回一个Promise对象，便于在异步操作完成后进行处理
		return new Promise((resolve,reject) => {
			axios.get('/api/ratings').then((resp) => {
		      if(resp.data.errno===0){
		      	// console.log(resp.data.data);
		      	commit(types.GET_RATINGS,resp.data.data);
		      	resolve();
		      }
		    });
		});
	}
}

const mutations={
	[types.SHOW_FOOD](state,food){
		state.foodShow=true;
		state.food=food; //需要注意代码间的顺序，如必须等获取到food后才能进行处理操作
		state.ratings=food.ratings;
	},
	[types.HIDE_FOOD](state){
		state.foodShow=false;
	},
	[types.SELECT](state,{type}){
		state.selectType=type;
		//过滤选择要显示的评价
		state.selectRatings=state.ratings.filter(rating => {
			if(state.onlyContent&&!rating.text){
				return false;
			}else if(state.selectType===2){
				return true;
			}else {
				return rating.rateType===state.selectType;
			}
		});
	},
	[types.CHANGE_TYPES](state,_types){
		//初始化
		state.types=_types;
		state.selectType=2; //每次打开时都恢复默认
		state.onlyContent=false;
		state.selectRatings=state.ratings;
	},
	[types.TOGGLE](state){
		state.onlyContent=!state.onlyContent;
		//过滤选择要显示的评价
		state.selectRatings=state.ratings.filter(rating => {
			if(state.onlyContent&&!rating.text){
				return false;
			}else if(state.selectType===2){
				return true;
			}else {
				return rating.rateType===state.selectType;
			}
		});
	},
	[types.GET_RATINGS](state,data){
		state.ratings=data;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}