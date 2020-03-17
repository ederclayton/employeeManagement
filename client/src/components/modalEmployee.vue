<template>
  <b-modal id="modal-employee" centered>
    <template v-slot:modal-title>
      {{ currentEmployee._id ? 'Edit' : 'New' }} Employee
    </template>

    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <b-input type="text" v-model="employee.name"
          v-validate="'required'" name="name" class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('name') }"></b-input>
        <div v-if="submitted && errors.has('name')" class="invalid-feedback">
          {{ errors.first('name') }}
        </div>
      </div>
      <div class="form-group">
        <label for="position">Position</label>
        <b-input type="text" v-model="employee.position"
          v-validate="'required'" name="position" class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('position') }"></b-input>
        <div v-if="submitted && errors.has('position')" class="invalid-feedback">
          {{ errors.first('position') }}
        </div>
      </div>
      <div class="form-group">
        <label htmlFor="salary">Salary</label>
        <b-input-group prepend="R$">
          <b-input type="number" v-model.number="employee.salary"
            v-validate="'required'" name="salary"
            :class="{ 'is-invalid': submitted && errors.has('salary') }"></b-input>
          <div v-if="submitted && errors.has('salary')" class="invalid-feedback">
            {{ errors.first('salary') }}
          </div>
        </b-input-group>
      </div>
    </form>

    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="success" class="float-right" @click="handleSubmit">
          Salvar
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      employee: {
        name: '',
        position: '',
        salary: 0
      },
      submitted: false
    }
  },
  computed: {
    ...mapState('employee', ['currentEmployee'])
  },
  watch: {
    currentEmployee: function (newCurrentEmployee) {
      this.employee.name = newCurrentEmployee.name
      this.employee.position = newCurrentEmployee.position
      this.employee.salary = newCurrentEmployee.salary
    }
  },
  methods: {
    ...mapActions('employee', ['addNewEmployee', 'editEmployee']),
    handleSubmit (e) {
      this.submitted = true
      this.$validator.validate().then(valid => {
        if (valid) {
          if (!this.currentEmployee._id) {
            this.addNewEmployee(this.employee)
          } else {
            this.editEmployee({
              id: this.currentEmployee._id,
              newData: this.employee
            })
          }
          this.$bvModal.hide('modal-employee')
        }
      })
    }
  }
}
</script>

<style scoped>
  form {
    padding: 0px 30px;
  }
</style>
