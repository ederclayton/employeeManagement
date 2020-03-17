<template>
  <div>
    <b-card no-body class="card">
      <template v-slot:header class="card-header">
        <h5 class="mb-0">{{ employeeList[index].name }}</h5>
      </template>
      <b-card-body>
        <h6 class="mb-2">{{ employeeList[index].position }}</h6>
        <b-card-sub-title>R$ {{ employeeList[index].salary.toFixed(2) }}</b-card-sub-title>
      </b-card-body>

      <b-card-footer class="card-footer">
        <b-button variant="warning" @click="editClick()">
          <span class="h5">
            <b-icon icon="pencil"></b-icon>
          </span>
        </b-button>

        <b-button variant="danger" @click="deleteEmployee(employeeList[index]._id)">
          <span class="h5">
            <b-icon icon="trash"></b-icon>
          </span>
        </b-button>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('employee', ['employeeList'])
  },
  props: {
    index: Number
  },
  methods: {
    ...mapActions('employee', ['setCurrentEmployee', 'deleteEmployee']),
    editClick () {
      this.setCurrentEmployee(this.index)
      this.$bvModal.show('modal-employee')
    }
  }
}
</script>

<style scoped>
  .card {
    width: 15rem;
    height: 15rem;
    margin-bottom: 40px;
  }

  .card-header {
    height: 5rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card-footer {
    display: flex;
    justify-content: space-around;
  }

  h5 {
    text-align: center;
    vertical-align: middle;
  }
</style>
