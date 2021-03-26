<template>
  <div class="about">
     
     <v-dialog v-model="newEvent" width="500" >
      <v-card>
        <v-card-title v-if="form.name.length == 0">Nouvel Evenement</v-card-title>
        <v-card-title v-else-if="form.name.length != 0">{{form.name}}</v-card-title>

        <v-card-section class="q-pt-none">
          <v-form ref="form" @submit.prevent="submit">
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-text-field placeholder="Name" v-model="form.name" counter maxlength="64"  filled ></v-text-field>
                            </v-col><v-col cols="12" sm="6">
                                <v-menu
                                ref="menuStartDate"
                                v-model="menuStartDate"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="form.startDate"
                                    label="Date"
                                    filled
                                    hint="MM/DD/YYYY format"
                                    persistent-hint
                                    prepend-icon="fas fa-calendar-alt"
                                    v-bind="attrs"
                                    @blur="date = parseDate(form.startDate)"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                 <v-date-picker
                                  v-model="form.startDate"
                                  no-title
                                  scrollable
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="menuStartDate = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menuStartDate.save(form.startDate)"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-menu
                                ref="menuEndDate"
                                v-model="menuEndDate"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    v-model="form.endDate"
                                    label="Date"
                                    filled
                                    hint="MM/DD/YYYY format"
                                    persistent-hint
                                    prepend-icon="fas fa-calendar-alt"
                                    v-bind="attrs"
                                    @blur="date = parseDate(form.endDate)"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                 <v-date-picker
                                  v-model="form.endDate"
                                  no-title
                                  scrollable
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="menuEndDate = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.menuEndDate.save(form.endDate)"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-text-field placeholder="description" v-model="form.description"  filled ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-btn text @click="newEvent = false">
                            Annuler
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" type="submit" @click="addPlanning" :disabled="!formIsValid">
                           Valider
                        </v-btn>
                    </v-card-actions>
                </v-form>
        </v-card-section>

        <v-card-actions align="right" class="bg-white text-teal">
          
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-sheet
      tile
      height="54"
      class="d-flex"
    >
    <v-btn @click="newEvent = true" class="ma-2 text-capitalize" color="primary" >
      <v-icon left>
        fas fa-plus-circle
      </v-icon>
      Nouvel Evenement
    </v-btn>
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>fas fa-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="type"
      ></v-select>
      <v-select
        v-model="mode"
        :items="modes"
        dense
        outlined
        hide-details
        label="event-overlap-mode"
        class="ma-2"
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        dense
        outlined
        hide-details
        label="weekdays"
        class="ma-2"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>fas fa-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>
</template>
<script>
  import Service from '../services/service'
  export default {
    name: 'PlanningPage',
    data () {
      const form = Object.freeze({
            name: '',
            startDate: '',
            endDate: '',
            description: '',
            category: '',
      })
      return{
        categoryOb:[],
        form:Object.assign({}, form ),
        // FORMAT DE DATE PICKER
        menuStartDate:'',
        menuEndDate:'',
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
        newEvent: false,
        type: 'month',
        types: ['month', 'week', 'day', '4day'],
        mode: 'stack',
        modes: ['stack', 'column'],
        weekday: [0, 1, 2, 3, 4, 5, 6],
        weekdays: [
          { text: 'Lun - Dim', value: [0, 1, 2, 3, 4, 5, 6] },
          { text: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
          { text: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
          { text: 'Mon, Wed, Fri', value: [1, 3, 5] },
        ],
        value: '',
        CurrentUser: 1,
        events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      }
    },
    computed: {
      formIsValid () {
        return (
          this.form.name &&
          this.form.startDate &&
          this.form.endDate &&
          this.form.description
        )
      },
    },
    methods: {
      getEvents () {
      const payload = {
                name: 'test',
                colorCode: 'red',
            }
        Service.post('/planning/category',payload)
        this.categoryOb =Service.get('/planning/category')
        console.log('category',this.categoryOb)
        const events = []
        const planning = Service.get('/planning/user/'+this.CurrentUser)
        
        
        
        planning.then( response => {
            console.log('response', response.data)
            
            for(var value of response.data){
                const startDate = value.startDate.replace('T',' ').replace('Z','').replace('.000','')
                const endDate = value.endDate.replace('T',' ').replace('Z','').replace('.000','')
                console.log('value',value)
                console.log('start',startDate)
                console.log('end',endDate)
                events.push({
                  name: value.name,
                  start: startDate,
                  end: endDate,
                  description: value.description,
                  color: 'red',
                    timed: true,
              })
            }
         })
        
        

        this.events = events
      },
      addPlanning(){
        console.log('idUser',this.CurrentUser);
        const payload = {
                name: this.form.name,
                startDate: this.form.startDate,
                endDate: this.form.endDate,
                description: this.form.description,
                categorie: 1,
                owner: this.CurrentUser
            }
          Service.post('planning/user', payload ).then( response => {
                console.log('response', response)
                localStorage.setItem('CurrentUser', JSON.stringify(response))
                this.snackbar = true
                this.getEvents()
            }).catch( error => {
                console.error('error', error)
            })
      },
      exitForm (){
        this.small=false;
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
  
}
</script>

<style>

</style>