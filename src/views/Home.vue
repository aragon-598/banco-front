<template>
  <div>
    <v-container>
      <clientes></clientes>
    </v-container>
  </div>
</template>

<script>
  
  import Clientes from '../components/home/Clientes.vue'

  export default {
    name: 'Home',

    components: {
      Clientes
    },
  }
</script>
