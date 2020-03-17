import axios from '../utils/axiosSettings'
import { authHeader } from '../utils/authHeader'

export const employeeServices = {
  getAll,
  add,
  edit,
  remove
}

async function getAll () {
  const response = await axios.get('employee/all', {
    headers: authHeader()
  })
  const result = response.data
  return result
}

async function add (newEmployee) {
  const response = await axios.post('employee', newEmployee, {
    headers: authHeader()
  })
  const result = response.data
  return result
}

async function edit (id, employee) {
  const response = await axios.put('employee/' + id, employee, {
    headers: authHeader()
  })
  const result = response.data
  return result
}

async function remove (id) {
  await axios.delete('employee/' + id, {
    headers: authHeader()
  })
}
