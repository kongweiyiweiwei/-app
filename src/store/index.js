import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import seller from './modules/seller'
import goods from './modules/goods'
import food from './modules/food'


Vue.use(Vuex);

export default new Vuex.Store({
	actions,
	getters,
	modules:{ //相当于state，包含状态数据 
		seller,
		goods,
		food
	}
});