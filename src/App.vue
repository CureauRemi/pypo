<template>

  <v-app>
    <!-- APP HEADER -->
    <div class="header" app>
      <router-link :to="{name: 'Accueil'}"><img :src="require('./assets/logo-pypo.png')" alt="Logo" class="logo"/></router-link>
      <h1 class="title" color="primary">{{ $route.name }}</h1>
      <v-spacer></v-spacer>

      <v-menu offset-y class="mr-4" v-if="isConnected && isAdmin">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
            class="text-capitalize"
            elevation="0"
          >
            Administrateur
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            :to="{name: item.name}"
            exact
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-tooltip bottom v-show="!isConnectPage">
      <template v-slot:activator="{ on, attrs }">
         <v-btn  class="mr-4 ml-4" color="primary"  x-large fab elevation="0" @click="handleConnect()" v-bind="attrs" v-on="on" ele>
          <!-- IF CONNECTED -->
          <v-icon v-show="isConnected">fas fa-sign-out-alt</v-icon>
          <v-icon v-show="!isConnected">fas fa-sign-in-alt</v-icon>
        </v-btn>
      </template>
      <span v-show="isConnected"> Se Déconnecter</span>
      <span v-show="!isConnected"> Se Connecter</span>
    </v-tooltip>


     
    </div>
    <!-- APP CONTAINER ROUTER -->
    <v-main class="pa-4">
      <v-container fluid class="font-main">
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- APP FOOTER -->
    <v-bottom-navigation color="primary" grow>

    <v-btn :to="{name: 'Planning'}" exact class="no-bg">
      <span>Planning</span>
      <v-icon>fa-calendar-alt</v-icon>
    </v-btn>

    <v-btn :to="{name: 'Accueil'}" exact class="no-bg">
      <span>Accueil</span>
      <v-icon>fa-home</v-icon>
    </v-btn>

    <v-btn :to="{name: 'Réglages'}" exact class="no-bg">
      <span>Paramètres</span>
      <v-icon>fa-cog</v-icon>
    </v-btn>

    </v-bottom-navigation>
    
  </v-app>

</template>

<script>
export default {
  name: 'App',
  data () { 
    return {
      isConnected: false,
      isConnectPage: false,
      isAdmin: false,
      menuItems : [
        {
          name : 'Tableau de Bord'
        },
        {
          name : 'Liste des Patients'
        }
      ]
    }
  },
  created() {
    if(localStorage.getItem('CurrentUser') != null) {
      this.isConnected = true
    }
  },
  updated () {
    if(this.isConnected) {
      if(localStorage.getItem('CurrentUser')) {
        this.isAdmin = JSON.parse(localStorage.getItem('CurrentUser')).isAdmin
      }
    }

    if(this.$router.history.current.name == 'Connexion' || this.$router.history.current.name == 'Inscription') {
      this.isConnectPage = true
    } else {
      this.isConnectPage = false
    }
  },
  methods: {
    handleConnect() {
      // console.log('isConnected ? ', this.isConnected);
      if(this.isConnected) {
        this.isConnected = !this.isConnected;
        this.$router.push({ name : 'Connexion' })
        localStorage.removeItem('CurrentUser')
      } else {
        this.$router.push({ name : 'Connexion' });
      }
    }
  }
};
</script>

<style lang="sass" scoped>
@import "./css/variables"

.header
  width: 100%
  display: inline-flex
  align-items: center
  .logo
    width: 6vw
  .title
    margin-left: 35px
    font-size: 2rem!important
    font-family: $main-font!important
.v-item-group.v-bottom-navigation .v-btn
  height: 100%
.no-bg
 background: rgba(#ffff, 1)!important

body
  font-family: $main-font!important
  max-width: 99%
</style>
