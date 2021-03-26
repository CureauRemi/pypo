<template>
    <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="4"
        
      >
        <v-card
          class="pa-2 justify-center"
          elevation="0"
        >
          <v-card-title>Temperature Ambiante</v-card-title>
          <v-card-title>{{ temperature}}°C</v-card-title>
          <v-btn @click="getTemperature()" icon>
            <v-icon>fas fa-sync-alt</v-icon>
          </v-btn>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2"
          elevation="0"
        >
          
        </v-card>
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2"
          elevation="0"
        >
          
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Service from '../services/temperature-service';
export default {
  name: 'HomePage',
  components: {
  },
  data () {
    return {
      temperature: 0,
    }
  },
  methods: {
    getTemperature () {
       Service.get('api/temperature').then( response => {
        this.temperature = response.data.result
      }).catch( error => {
        console.error('error', error)
      })
    }
  }
}
</script>
