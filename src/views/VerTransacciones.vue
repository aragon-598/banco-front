<template>
    <div>
        <v-container>
            <h4>Mis transacciones</h4>
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
                        Tipo de Transaccion
                    </th>
                    <th class="text-left">
                        Valor Monetario
                    </th>
                    <th class="text-left">
                        Fecha de transaccion
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                    v-for="t in transacciones"
                    :key="t.idTransaccion"
                    >
                    <td>{{ t.idTipoTransaccion.nombreTransaccion}}</td>
                    <td>{{t.valorMonetario}}</td>
                    <td>{{t.fechaTransaccion}}</td>
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
    name:'VerTransacciones',
    data() {
        return {
            transacciones:[],
            cuenta:{}
        }
    },
    methods: {
        regresar(){
            this.$router.push({name:'VistaCliente',params:{dui:this.cuenta.codCliente.dui}})
        }
    },
    mounted() {
        axios.get(`http://localhost:5000/transaccion/transaccionesByNumerocuenta/${this.$route.params.numeroCuenta}`).
        then(res => {
            this.transacciones=res.data;
        }).catch(e=>console.log(e))

        axios.get(`http://localhost:5000/cuenta/cuentabynumerocuenta/${this.$route.params.numeroCuenta}`).
        then(res => {
            this.cuenta=res.data
        }).catch(e =>console.log(e))
    },
}
</script>
<style lang="">
    
</style>