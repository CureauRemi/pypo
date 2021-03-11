<template>
  <v-app>
    <router-view />
    <v-bottom-navigation color="primary" grow>
    <v-btn to="/planning" exact>
      <span>Planning</span>
      <v-icon>fa-calendar-alt</v-icon>
    </v-btn>

    <v-btn to="/" exact>
      <span>Accueil</span>
      <v-icon>fa-home</v-icon>
    </v-btn>

    <v-btn to="/settings" exact>
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
    }
  },
};
</script>

<style lang="sass" scoped>
</style>