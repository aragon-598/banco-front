<template>
  <div>
    
    <v-container>

      <!-- ========================= MODAL CLIENTE ====================================== -->
      <div class="text-center">
        <v-dialog
          v-model="dialog"
          width="500"
          persistent
        >
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Nuevo cliente | Datos
            </v-card-title>
            <v-divider></v-divider>
              <v-container>
                <v-text-field
                label="Nombre"
                outlined
                v-model="nombre"
              ></v-text-field>
              <v-text-field
                label="Apellidos"
                outlined
                v-model="apellidos"
              ></v-text-field>
              <v-text-field
                label="DUI"
                outlined
                v-model="dui"
              ></v-text-field>
              </v-container>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn                
                text
                @click="cancelarBtn"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="guardarCliente"
                :disabled="nombre=='' || apellidos=='' || dui==''"
              >
                Guardar cambios              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>



      <!-- ========================= BOTONES ====================================== -->
        <v-btn
          color="green lighten-2"
          dark
          @click="dialog=true"
        >
          Agregar cliente
        </v-btn>
        <br>
        <br>
      <!-- ========================= TABLA ====================================== -->
      <clientes></clientes>

      <!-- ========================= SNACKBAR ====================================== -->
      <div class="text-center">

        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
        >
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="blue"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-container>
  </div>
</template>

<script>
  
  import Clientes from '../components/home/Clientes.vue'
  import axios from 'axios'

  export default {
    name: 'Home',

    data() {
      return {
        dialog:false,
        nombre:'',
        apellidos:'',
        dui:'',
        /* Notificacion de DUI */
        snackbar: false,
        text: 'El N° de DUI ya está registrado',
        timeout: 1500,
        /* Variables de transaccion */

      }
    },

    components: {
      Clientes
    },
    methods: {
      guardarCliente(){
        this.dialog = false;
        var cliente = {
          dui:this.dui,
          nombre:this.nombre,
          apellidos:this.apellidos,
          fechaRegistro:new Date(Date.now())
        }
        axios.post(
          "http://localhost:5000/cliente/newclient",
          cliente
        ).then((response)=> {
            console.log(response);
            window.location.reload
          })
          .catch((error)=>{
            console.log(error);
            this.snackbar = true;
            this.cancelarBtn();
          })
          
      },
      cancelarBtn(){
        this.dialog = false;
        this.dui="";
        this.nombre="";
        this.apellidos="";
      },
      guardarCuenta(){

      }

    },
  }
</script>
