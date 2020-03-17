<template>
  <div>
    <div class="header">
      <h1>Employee Management</h1>
      <button class="btn btn-light logoutButton" @click="userLogout">Logout</button>
    </div>
    <div class="grid-cards container">
      <NewEmployeeCard class="grid-card"/>
      <EmployeeCard v-for="(employee, index) in employeeList"
        :key="employee.id" :index="index" class="grid-card"/>
    </div>
    <ModalEmployee/>
  </div>
</template>

<script>
import EmployeeCard from '@/components/employeeCard'
import NewEmployeeCard from '@/components/newEmployeeCard'
import ModalEmployee from '@/components/modalEmployee'
import { mapState, mapActions } from 'vuex'

export default {
  components: { EmployeeCard, NewEmployeeCard, ModalEmployee },
  computed: {
    ...mapState('employee', ['employeeList'])
  },
  methods: {
    ...mapActions('employee', ['initEmployeeList']),
    ...mapActions('account', ['logout']),
    userLogout () {
      this.logout()
      location.reload(true)
    }
  },
  created () {
    this.initEmployeeList()
  }
}
</script>

<style scoped>
  .grid-cards {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
  .grid-card {
    margin: 18px;
  }
  .header {
    width: 100%;
    height: 80px;
    background-color: #343a40;
    color: white;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .logoutButton {
    position: absolute;
    top: 20px;
    right: 20px;
  }
</style>
