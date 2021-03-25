<template>
  <v-container class="align-center justify-center">
      <v-snackbar
      v-model="snackbar"
      absolute
      top
      color="success"
      class="text-center text-align-center"
    >
      <v-icon dark class="mx-3">
        fas fa-info-circle
      </v-icon>
    <span>Votre compte a été créé avec succès ! Vous pouvez maintenant vous connecter.</span>
    </v-snackbar>
    
      <v-row class="mb-6" no-gutters>
        <v-col md="6">
            <v-card class="col-md-3 offset-md-6" elevation="1">
                <v-card-title class="">Inscrivez-vous chez Nous !</v-card-title>
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
                    <v-card-actions>
                        <v-btn text @click="resetForm">
                            Annuler
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" type="submit" :disabled="!formIsValid">
                            Créer un compte
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
            codeAdmin: ''
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

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {
        this.userConnected = this.form.first + " " + this.form.last
        this.register()
        this.resetForm()
      },
      register() {
        let payload = {};
        if(this.formIsValid) {
            console.log('IsAdminUser ? ', this.isAdmin)
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
            Service.post('user/register', payload ).then( () => {
                this.snackbar = true
                setTimeout( () => {
                  this.$router.push({ name : 'Connexion'})
                }, 2500)
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