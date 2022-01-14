<template >
    <div>
        <v-container>
            <v-card
                elevation="10"
                class="mx-auto my-12"
            >
                <v-card-title>Nueva Transaccion</v-card-title>
                <v-divider></v-divider>
                <v-spacer></v-spacer>
                <v-container>
                <v-text-field
                    label="Valor monetario"
                    outlined
                    type="number"
                    step="0.01"
                    v-model="valor"
                    ></v-text-field>
                    <v-text-field
                    label="Saldo"
                    outlined
                    type="number"
                    step="0.01"
                    :value="cuenta.saldo"
                    disabled
                    ></v-text-field>
                    <v-select
                    :items="tipoTransacciones"
                    item-text="nombreTransaccion"
                    item-value="idTipoTransaccion"
                    label="Tipo de transaccion"
                    v-model="idTt"
                    outlined
                    ></v-select>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        
                            <v-btn                
                                text
                                @click="cancelarBtn2"
                            >
                                Regresar
                            </v-btn>
                        
                        <v-btn
                            color="primary"
                            text
                            @click="guardarTransaccion"
                            :disabled="(valor>cuenta.saldo && idTt==2) || idTt==''||valor==0"
                        >
                            Guardar cambios
                        </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:'NuevaTransaccion',
    data() {
        return {
            tipoTransacciones:[],
            idTt:'',
            valor:0,
            numeroCuenta:'',
            cuenta:{},
            saldo:0
        }
    },
    methods: {
        getTipoTransaccion(){
            axios.get('http://localhost:5000/tipoTransaccion/obtenertipos').
            then(res =>{
                this.tipoTransacciones=res.data;
            }).catch(e => console.log(e))
        },
        guardarTransaccion(){
            var transaccion = {
                valorMonetario: parseFloat(this.valor),
                fechaTransaccion: new Date(Date.now()),
                numeroCuenta: {numeroCuenta:this.cuenta.numeroCuenta},
                idTipoTransaccion:{idTipoTransaccion:this.idTt}
            }

            axios.post('http://localhost:5000/transaccion/nuevaTransaccion',transaccion).
            then((res)=>{
                console.log(res);
            }).
            catch(function (err){
                console.log(err);
            })

            alert("Transaccion exitosa")
            this.$router.push({name:'CuentaTransaccion',params:{codCliente:this.cuenta.codCliente.codCliente}})
        },
        cancelarBtn2(){
            this.$router.push({name:'CuentaTransaccion',params:{codCliente:this.cuenta.codCliente.codCliente}})
        },
        limpiar(){
            
        }
    },
    mounted() {
        this.getTipoTransaccion()
        /**Obtener la cuenta */
        axios.get(`http://localhost:5000/cuenta/cuentabynumerocuenta/${this.$route.params.numeroCuenta}`).
        then(res =>{
            this.cuenta=res.data
        }).catch(e=>console.log(e))
    },
}
</script>
<style lang="">
    
</style>