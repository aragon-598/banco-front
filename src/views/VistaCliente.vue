<template>
    <div>
        <h1>Bienvenido {{cliente.nombre}} {{cliente.apellidos}}</h1>
        <v-btn depressed
            @click="salir"
            color="primary"
        >
        Salir
        </v-btn>
        <v-container>
            <h4>Mis Cuentas</h4>
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
                        Saldo
                    </th>
                    <th class="text-left">
                        Acciones
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="cuenta in cuentas"
                    :key="cuenta.numeroCuenta"
                    >
                    <td>{{ cuenta.numeroCuenta }}</td>
                    <td>{{ cuenta.nombreCuenta }}</td>
                    <td>{{cuenta.estadoCuenta}}</td>
                    <td>$ {{cuenta.saldo}}</td>
                    <td>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="primary"
                                        elevation="2"
                                        small
                                        id="nueva-transaccion"
                                        :disabled="cuenta.estadoCuenta=='O'"
                                        @click="verTransacciones(cuenta.numeroCuenta)"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                    
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                            </template>
                            <span>Ver transacciones de esta cuenta</span>
                        </v-tooltip>

                    </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'VistaCliente',
    data() {
        return {
            cuentas:[],
            transacciones:[],
            cliente:{}
        }
    },
    methods: {
        verTransacciones(idCuenta){
            this.$router.push({name:'VerTransacciones',params:{numeroCuenta:idCuenta}})
        },
        salir(){
            this.$router.push('/login')
        }
    },
    mounted() {
        axios.get(`http://localhost:5000/cliente/bydui/${this.$route.params.dui}`).
        then(resp=>{
            console.log(resp.data);
            this.cliente=resp.data
        }).catch(e=>{
            console.log(e);
        })

        axios.get(`http://localhost:5000/cuenta/cuentasbydui/${this.$route.params.dui}`).
        then(res => {
            this.cuentas=res.data
            console.log(this.cuentas);
        }).catch(e =>console.log(e))
    },
}
</script>
<style lang="">
    
</style>