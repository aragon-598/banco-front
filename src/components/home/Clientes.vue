<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              DUI
            </th>
            <th class="text-left">
              NOMBRE
            </th>
            <th class="text-left">
              APELLIDOS
            </th>
            <th class="text-left">
              ACCIONES
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cliente in clientes"
            :key="cliente.codCliente"
          >
            <td>{{ cliente.dui }}</td>
            <td>{{ cliente.nombre }}</td>
            <td>{{ cliente.apellidos }}</td>
            <td>
                <router-link class="mr-2" :to="`/nuevacuenta/${cliente.codCliente}`">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        elevation="2"
                        small
                        id="nueva-cuenta"
                        v-bind="attrs"
                        v-on="on"
                      >
                      <v-icon>mdi-plus</v-icon>
                      </v-btn>
                    </template>
                    <span>Crear nueva cuenta</span>
                  </v-tooltip>
                </router-link>
                <router-link class="mr-2" :to="`/cuenta-transaccion/${cliente.codCliente}`">
                <v-tooltip bottom>
                  <template v-slot:activator="{on,attrs}">
                    <v-btn
                      color="success"
                      elevation="2"
                      small
                      v-on="on"
                      v-bind="attrs"
                      id="cuenta-transaccion"
                    >
                    <v-icon>mdi-transfer</v-icon>
                    </v-btn>
                  </template>
                  <span>Más acciones con cuentas</span>
                </v-tooltip>
                </router-link>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>

import axios from 'axios'
import {eventBus} from '../../main'

  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'DUI',
            align: 'start',
            sortable: false,
            value: 'dui',
          },
          { text: 'Nombre', value: 'nombre' },
          { text: 'Apellidos', value: 'apellidos' }
        ],
        clientes:[],
        
      }
    },
    methods:{
        getAllClientes(){
            axios.get('http://localhost:5000/cliente/allclients').
            then(response => {
                
                this.clientes = response.data;
            }).
            catch((e)=>console.log(e))
        },
        emitirVisible(){
        eventBus.$emit("modal",true)
      },
      cancelarBtn2(){

      },
      guardarCuenta(){

      }
    },
    mounted() {
        this.getAllClientes();
    },
  }
</script>