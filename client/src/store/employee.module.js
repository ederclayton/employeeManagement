import { employeeServices } from '../services'

const state = {
  employeeList: [],
  currentEmployee: {}
}

const actions = {
  async initEmployeeList ({ commit, dispatch }) {
    try {
      const employees = await employeeServices.getAll()
      commit('init', employees)
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem('user')
          location.reload(true)
        } else {
          dispatch('alert/error', error.response.data.message, { root: true })
        }
      } else {
        dispatch('alert/error', error.message, { root: true })
      }
    }
  },
  async addNewEmployee ({ commit, dispatch }, newEmployee) {
    try {
      const employee = await employeeServices.add(newEmployee)
      commit('append', employee)
      dispatch('alert/success', 'Add new Employee successful', { root: true })
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem('user')
          location.reload(true)
        } else {
          dispatch('alert/error', error.response.data.message, { root: true })
        }
      } else {
        dispatch('alert/error', error.message, { root: true })
      }
    }
  },
  async editEmployee ({ commit, dispatch }, { id, newData }) {
    try {
      const employee = await employeeServices.edit(id, newData)
      commit('update', employee)
      dispatch('alert/success', 'Edit Employee successful', { root: true })
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem('user')
          location.reload(true)
        } else {
          dispatch('alert/error', error.response.data.message, { root: true })
        }
      } else {
        dispatch('alert/error', error.message, { root: true })
      }
    }
  },
  async deleteEmployee ({ commit, dispatch }, id) {
    try {
      await employeeServices.remove(id)
      commit('remove', id)
      dispatch('alert/success', 'Delete Employee successful', { root: true })
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem('user')
          location.reload(true)
        } else {
          dispatch('alert/error', error.response.data.message, { root: true })
        }
      } else {
        dispatch('alert/error', error.message, { root: true })
      }
    }
  },
  setCurrentEmployee ({ state, commit }, index) {
    const employee = state.employeeList[index]
    commit('addCurrentEmployee', employee)
  },
  setEmptyCurrentEmployee ({ commit }) {
    const employee = {}
    commit('addCurrentEmployee', employee)
  }
}

const mutations = {
  init (state, employees) {
    state.employeeList = employees
  },
  addCurrentEmployee (state, employee) {
    state.currentEmployee = employee
  },
  append (state, employee) {
    state.employeeList.push(employee)
  },
  update (state, employee) {
    const index = state.employeeList.findIndex(x => x._id === employee._id)
    state.employeeList[index].name = employee.name
    state.employeeList[index].position = employee.position
    state.employeeList[index].salary = employee.salary
  },
  remove (state, id) {
    const index = state.employeeList.findIndex(x => x._id === id)
    state.employeeList.splice(index, 1)
  }
}

export const employee = {
  namespaced: true,
  state,
  actions,
  mutations
}
