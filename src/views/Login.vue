<template>
  <v-container class="align-center justify-center">
      <v-row class="mb-6" no-gutters>
        <v-col md="6">
            <v-card class="col-md-3 offset-md-6" elevation="1">
                <v-card-title class="">Connectez-vous !</v-card-title>
                <v-form ref="form" @submit.prevent="submit">
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field placeholder="Nom" v-model="form.last"  :rules="rules.name" filled ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field placeholder="Prénom" v-model="form.first" :rules="rules.name" filled ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-checkbox class="ml-4" v-model="isAdmin" :label="isAdmin ? `Vous êtes Administrateur ?` : 'Vous n\'êtes pas administrateur' "></v-checkbox>
                                <v-text-field v-show="isAdmin" placeholder="Code établissement"  v-model="codeAdmin" filled counter maxlength="4"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card-text><router-link :to="{ name: 'Inscription'}">Vous n'avez pas de compte ?</router-link></v-card-text>
                    <v-card-actions>
                        <v-btn text @click="resetForm">
                            Annuler
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" type="submit" :disabled="!formIsValid">
                            Se connecter
                        </v-btn>
                    </v-card-actions>

                </v-form>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Service from '../services/service'
export default {
    name: 'LoginPage',
    data () {
        const defaultForm = Object.freeze({
            first: '',
            last: '',
        })
        return {
            form: Object.assign({}, defaultForm),
            rules: {
                name: [val => (val || '').length > 0 || 'Ce champ est requis'],
            },
            defaultForm,
            snackbar: false,
            userConnected: '',
            isAdmin: false,
            codeAdmin: '',
            alert : {
                type: '',
                message: '',
                icon: ''
            }
        }
    },
    computed: {
      formIsValid () {
        return (
          this.form.first &&
          this.form.last
        )
      },
    },
    created () {
        if(localStorage.getItem('CurrentUser') != null) {
            this.$router.push({ name: 'Accueil'});
        }
    }, 
    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.userConnected = this.form.first + " " + this.form.last
        this.login()
        
        this.resetForm()
      },
      login() {
        let payload = {};
        if(this.formIsValid) {
            if(this.isAdmin) {
                payload = {
                    firstName: this.form.first,
                    lastName: this.form.last,
                    isAdmin: this.isAdmin,
                    CodeAdmin: this.codeAdmin
                }
            } else {
                payload = {
                    firstName: this.form.first,
                    lastName: this.form.last,
                    isAdmin: this.isAdmin
                }
            }
            Service.post('user/login', payload ).then( response => {
                localStorage.setItem('CurrentUser', JSON.stringify(response.data))
                if(response.data.isAdmin){
                    this.$router.push({ name:  'Tableau de Bord'})
                } else {
                    this.$router.push({ name : 'Accueil' })
                }
            }).catch( error => {
                console.error('error', error)
            })
        }
      }
    },

}
</script>

<style>

</style>
