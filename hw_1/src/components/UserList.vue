<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Age</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr v-for="(user,index) in users" :key="user.id">
      <th scope="row">{{index+2}}</th>
      <td>{{user.name}}</td>
      <td>{{user.email}}</td>
      <td>{{user.age}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
name: "UserList",
  props:{
    users: Object,
    required: true
  }
}
</script>

<style scoped>

</style>