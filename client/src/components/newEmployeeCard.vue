<template>
  <div>
    <b-card no-body class="card" variant="success" @click="addClick()">
        <b-icon icon="plus" class="big-icon green"></b-icon>
    </b-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('employee', ['setEmptyCurrentEmployee']),
    addClick () {
      this.setEmptyCurrentEmployee()
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
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #28a74544;
  }

  .card:hover {
    background-color: #28a74588;
  }

  .big-icon {
    font-size: 10rem;
  }

  .green {
    color: #28a745;
  }

</style>
