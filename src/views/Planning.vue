<template>

  <div class="about">
     <v-btn label="Small" color="primary" @click="small = true" value="ajouter" />
     <v-dialog v-model="small" >
      <v-card>
        <v-card-section>
          <div class="text-h6">Planning</div>
        </v-card-section>

        <v-card-section class="q-pt-none">
          <v-form ref="form" @submit.prevent="submit">
                    <v-container fluid>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-text-field placeholder="Name" v-model="form.name"   filled ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field placeholder="First date" v-model="form.startDate"  filled ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field placeholder="End date" v-model="form.endDate"  filled ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-text-field placeholder="description" v-model="form.description"  filled ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-btn text @click="exitForm">
                            Annuler
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" type="submit" @click="addPlanning">
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
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
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
        <v-icon>mdi-chevron-right</v-icon>
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
    data: () => (
      {
      form:Object.assign({},
      Object.freeze({
            name: '',
            startDate: '',
            endDate: '',
            description: '',
            categorie: '',
        }) ),
      small: false,
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
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    methods: {
      getEvents () {
        const events = []
        const planning = Service.get('/planning/user/1')
        
        
        
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
                  color: value.category.colorCode,
                    timed: true,
              })
            }
         })
        
        

        this.events = events
      },
      addPlanning(){
        const payload = {
                name: this.form.name,
                startDate: this.form.startDate,
                endDate: this.form.endDate,
                description: this.form.description,
                categorie: 1,
                owner: 1
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
    },
  
}
</script>

<style>

</style>