<template>
  <v-container>
        <h4>Cuentas de {{cliente.nombre}} {{cliente.apellidos}}</h4>
        <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color=""
                    elevation="5"
                    fab
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="regresar"
                >
                    <v-icon>mdi-arrow-left-bold</v-icon>
                </v-btn>
            </template>
            <span>Regresar</span>
        </v-tooltip>
      <v-simple-table>
        <template v-slot:default>
        <thead>
            <tr>
            <th class="text-left">
                Numero de cuenta
            </th>
            <th class="text-left">
                Nombre de la cuenta
            </th>
            <th class="text-left">
                Estado
            </th>
            <th class="text-left">
                Acción
            </th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="cuenta in cuentasbyCliente"
            :key="cuenta.numeroCuenta"
            >
            <td>{{ cuenta.numeroCuenta }}</td>
            <td>{{ cuenta.nombreCuenta }}</td>
            <td>{{cuenta.estadoCuenta}}</td>
            <td>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                elevation="2"
                                small
                                id="nueva-transaccion"
                                :disabled="cuenta.estadoCuenta=='O'"
                                @click="nuevaTransaccion(cuenta.numeroCuenta)"
                                v-bind="attrs"
                                v-on="on"
                            >
                            
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                    </template>
                        <span>Nueva Transaccion</span>
                    </v-tooltip>
            </td>
            </tr>
        </tbody>
        </template>
    </v-simple-table>
  </v-container>
</template>
<script>
import axios from 'axios'

export default {
    name:"CuentaTransaccion",
    data() {
        return {
            cuentasbyCliente:[],
            cliente:{}
        }
    },
    mounted() {
        /**Cuentas por cliente */
        axios.get(`http://localhost:5000/cuenta/cuentasbycliente/${this.$route.params.codCliente}`).
        then((res=>{
            this.cuentasbyCliente=res.data;
        })).
        catch((e)=>console.log(e))

        /**Cliente */
        axios.get(`http://localhost:5000/cliente/client/${this.$route.params.codCliente}`).
        then((res=>{
            this.cliente=res.data;
        })).
        catch((e)=>console.log(e))
    },
    methods: {
        nuevaTransaccion(idCuenta){
            this.$router.push({name:'NuevaTransaccion',params:{numeroCuenta:idCuenta}})
        },
        regresar(){
            this.$router.push('/')
        }
    },
}
</script>
<style>
    
</style>