<template>
  <div>
  <!-- Div gauche -->
  <v-container class="white">
    <v-row no-gutters>

      <v-col cols="6" class="pa-2" >
        <v-card elevation="0">
            <v-card-title class="display-1 text--white">Réglages d'affichage</v-card-title>
            <v-card-text>
                <div class="d-flex align-center justify-start">
                    <p class="ma-0 mr-5 body-1">Afficher la température ambiante</p>
                    <v-switch v-model="displayTemperature" inset ></v-switch>
                </div>

                 <div class="d-flex align-center justify-start">
                    <p class="ma-0 mr-5 body-1">Afficher les constantes (BPM)</p>
                    <v-switch v-model="displayHealthFrequency" inset ></v-switch>
                </div>
            </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6" class="pa-2" >
        <v-card class="mx-auto" elevation="0" >
            <v-card-text>
                <p class="display-1 text--primary">
                    Mes information personnelles
                </p>
                
                <div>{{UserName}}</div>
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
    
  </div>
</template>

<script>
export default {
    name: 'Settings',
    data () {
        return {
            // Your data here
            displayTemperature: true,
            displayHealthFrequency: false,
            UserName: 'John Doe'
        }
    }
}
</script>

<style>

</style>