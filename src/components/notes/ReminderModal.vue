<template>
    <v-layout row justify-center>
        <v-dialog v-model="show" max-width="400">
            <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
                <v-card-title>
                    <span class="headline">Set Reminder</span>
                </v-card-title>
                <v-card-text>
                    <div v-if="this.note.reminderTime" v-bind:style="[(this.note.reminderTime - Date.now() < 0) ? {background: 'lightgrey'} : {background: 'lightgreen'}]">
                        <span class="subheading"> Currently set to {{formatDate(new Date(this.note.reminderTime))}}</span>
                    </div>

                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="hours"
                                        label="Hour(s)"
                                        hint="How many hours from now?"
                                        :rules="numberRules"></v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-text-field
                                        v-model="minutes"
                                        label="Minute(s)"
                                        hint="How many minutes from now?"
                                        :rules="numberRules"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*Both fields will be added together*</small>
                    <v-spacer></v-spacer>
                    <small v-if="this.note.reminderTime" >**Existing reminder will be replaced**</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="!valid" color="blue darken-1" flat @click.native="submit">Save</v-btn>
                </v-card-actions>
            </v-card>
            </v-form>
        </v-dialog>
    </v-layout>
</template>

<script>
    import { db } from '../../firebase'

    function hrsToMs(hours) {
        return hours * 60 * 60 * 1000;
    }

    function minsToMs(minutes) {
        return minutes * 60 * 1000;
    }


    export default {
        data: () => ({
            hours:  "",
            minutes: "",
            valid: true,
            numberRules: [
                v => !!v || 'Must not be empty',
                v => /^\s*\d+\s*$/.test(v) || 'Must contain only numbers',
            ]
        }),
        props: [
            'showModal',
            'note',
            'index'
        ],
        computed: {
            show: {
                get () {
                    return this.showModal;
                },
                set(value) {
                    if (!value) {
                        this.$emit("close");
                    }
                }
            }
        },
        methods: {
            submit () {
                if (this.$refs.form.validate()) {
                    this.show = false;
                    let sleep = function(time) {return new Promise((resolve) => setTimeout(resolve, time));};
                    sleep(300).then(() => {
                        let hours = parseInt(this.hours);
                        let minutes = parseInt(this.minutes);
                        let reminderTime = Date.now() + hrsToMs(hours) + minsToMs(minutes);
                        // TODO: Refactor, similiar function in Index.vue
                        let timeTillNotify = reminderTime - Date.now();
                        // max int 2147483647
                        if (timeTillNotify >= 0 && timeTillNotify < 2147483647) {
                            let reminderAlert = setTimeout(() => {
                                this.$notify({
                                group: 'reminder',
                                title: this.note.title + " (" + this.formatDate(new Date(Date.now())) + ")",
                                text: this.note.content,
                            });}, timeTillNotify);
                            if (this.$store.state.notes[this.index]["reminderAlert"]) {
                                clearTimeout(this.$store.state.notes[this.index]["reminderAlert"]);
                            }
                            this.$store.state.notes[this.index]["reminderAlert"] = reminderAlert;
                        }
                        this.$store.state.notes[this.index]["reminderTime"] = reminderTime;
                        db.ref('notes').child(this.note.key).update({"reminderTime": reminderTime});
                        this.$refs.form.reset();
                        this.$notify({
                            group: 'info',
                            title: '[Success]',
                            text: "Reminder was successfully added",
                            type: 'success'
                        });
                    });
                }
            },
            formatDate(date) {
                const monthNames = [
                    "January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"
                ];
                const day = date.getDate();
                const monthIndex = date.getMonth();
                const year = date.getFullYear();
                const hours = date.getHours();
                const minutes = ('0'+ date.getMinutes()).slice(-2);

                return monthNames[monthIndex]  + ' ' + day + ' ' + year + " at " + hours + ":" + minutes;
            }
        }
    }
</script>
