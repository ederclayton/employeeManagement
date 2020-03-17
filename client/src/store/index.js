import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert.module'
import { account } from './account.module'
import { employee } from './employee.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    alert,
    employee
  }
})
