<template>
    <div>
        <v-container>
            <v-card
            elevation="10"
            class="mx-auto my-12"
        >
            <v-card-title>Nueva cuenta</v-card-title>
            <v-divider></v-divider>
            <v-spacer></v-spacer>
            <v-container>
              <v-text-field
                label="Nombre de cuenta"
                outlined
                v-model="nombreCuenta"
                ></v-text-field>
                <v-text-field
                label="Monto de apertura"
                v-model="monto"
                type="number"
                step="0.01"
                ></v-text-field>
                <v-row>
                <v-col cols="4">
                    <v-subheader>Estado de la cuenta</v-subheader>
                </v-col>
                <v-col cols="8">
                    <v-radio-group v-model="estado">
                    <v-radio
                        v-for="n in estadoL"
                        :key="n"
                        :label="`${n}`"
                        :value="n"
                    ></v-radio>
                    </v-radio-group>
                </v-col>
                </v-row>
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
                        @click="guardarCuenta"
                        :disabled="nombreCuenta=='' || monto==0 || estado==''"
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
    name:"NuevaCuenta",
    data() {
        return {
            /* Variables de cuenta */
            nombreCuenta:'',
            monto:0,
            estado:'',
            estadoL:['A','O'],
        }
    },
    methods: {
        cancelarBtn2(){
            console.log("Volviendo..");
            this.$router.push('/')
        },
        guardarCuenta(){
            var cuenta = {
                nombreCuenta:this.nombreCuenta,
                montoApertura:this.monto,
                fechaApertura: new Date(Date.now()),
                saldo:this.monto,
                estadoCuenta:this.estado,
                codCliente:{codCliente:this.$route.params.codCliente}
            }

            console.log(cuenta);
            //log

            axios.post('http://localhost:5000/cuenta/newcuenta',cuenta).
            then((response)=>{
                console.log(response.status);
            }).
            catch((e)=>{
                console.log(e);
            });
            this.$router.push('/')
        },
        limpiar(){
            this.monto=0;
            this.nombreCuenta='';
            this.estado=''
        }
    },
    
}
</script>
<style lang="">
    
</style>