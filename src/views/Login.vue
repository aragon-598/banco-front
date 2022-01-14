<template >
    <div style="display:flex;justify-content:center;">
        <v-card
          elevation="2"
          width="500px"
          style="margin-top:1rem;"
          class="grey lighten-3"
        >
        
            <v-card-title primary-title>
                Ingresar DUI
            </v-card-title>
            <v-divider></v-divider>
            <v-container grid-list-xs>
                <v-text-field
                    label="DUI"
                    id="id"
                    v-model="dui"
                ></v-text-field>

            </v-container>
            <v-spacer></v-spacer>
            <v-divider></v-divider>
            <v-card-actions >
                <v-btn
                    class="ma-2"
                    color="secondary"
                    @click="vistaAdmin"
                >
                    Vista del administrador
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="success"
                    dark
                    @click="login"
                >
                    Entrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'Login',
    data() {
        return {
            dui:'',
            cliente:null,
            message:''
        }
    },
    methods: {
        vistaAdmin(){
            this.$router.push('/')
        },
        login(){
            axios.get(`http://localhost:5000/cliente/bydui/${this.dui}`).
            then(res =>{
                
                this.cliente=res.data
                if (this.cliente!=null) {
                    this.$router.push({name:'VistaCliente',params:{dui:this.dui}})
                }
                
            }).catch((e)=>{
                console.log(e.message);
                console.log("No existe el usuario con dui "+this.dui);
                alert("No existe ese dui en nuestros registros intentalo de nuevo")
                this.dui=''
            })
        }
    },
}
</script>
<style lang="">
    
</style>