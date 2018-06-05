<template>
    <v-ons-alert-dialog
            cancelable
            :visible.sync="show"
            modifier="reminder"
            @keyup.enter="submit"
    >
        <div class="alert-dialog-title">Set Reminder<br></br></div>
        <div v-if="this.note.reminderTime" v-bind:style="[(this.note.reminderTime - Date.now() < 0) ? {background: 'lightgrey'} : {background: 'lightgreen'}]">
            <span class="subheading"> Current reminder<br> {{formatDate(new Date(this.note.reminderTime))}}</span>
        </div>
        <v-ons-list>
            <v-ons-list-item>
                <v-ons-input placeholder="Input hour(s)" float
                             v-model="hours"
                >
                </v-ons-input>
            </v-ons-list-item>
            <v-ons-list-item>
                <v-ons-input placeholder="Input minute(s)" float
                             v-model="minutes"
                >
                </v-ons-input>
            </v-ons-list-item>
        </v-ons-list>
        <template slot="footer">
            <v-ons-alert-dialog-button @click="submit">Set</v-ons-alert-dialog-button>
        </template>
    </v-ons-alert-dialog>
</template>

<script>
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
                        this.hours = null;
                        this.minutes = null;
                        this.$emit("close");
                    }
                }
            }
        },
        methods: {
            submit () {
                const regex=/^[0-9]+$/;
                if (!this.hours || !this.minutes) {
                    this.$ons.notification.alert("All fields must be filled in");
                    this.hours = null;
                    this.minutes = null;
                    return;
                }
                if (!this.hours.match(regex) || !this.minutes.match(regex) ) {
                    this.$ons.notification.alert("Input only numbers");
                    this.hours = null;
                    this.minutes = null;
                    return;
                }
                let hours = parseInt(this.hours);
                let minutes = parseInt(this.minutes);
                this.show = false;
                let sleep = function(time) {return new Promise((resolve) => setTimeout(resolve, time));};
                sleep(300).then(() => {

                    let reminderTime = Date.now() + hrsToMs(hours) + minsToMs(minutes);
                    // TODO: Refactor, similiar function in Index.vue
                    let timeTillNotify = reminderTime - Date.now();
                    // max int 2147483647
                    if (timeTillNotify >= 0 && timeTillNotify < 2147483647) {
                        let reminderAlert = setTimeout(() => {
                            this.$ons.notification.alert(this.note.title + " (" + this.formatDate(new Date(Date.now())) + ")", {title: "Reminder"});
                            }, timeTillNotify);
                        if (this.$store.state.notes[this.index]["reminderAlert"]) {
                            clearTimeout(this.$store.state.notes[this.index]["reminderAlert"]);
                        }
                        this.$store.state.notes[this.index]["reminderAlert"] = reminderAlert;
                    }
                    this.$store.state.notes[this.index]["reminderTime"] = reminderTime;
                    this.$store.state.currentNoteRef.child(this.note.key).update({"reminderTime": reminderTime});
                    this.$ons.notification.toast('Reminder set', { timeout: 2000, animation:"fall"} );
                });

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

<style>
    .alert-dialog--reminder{
        width: 100%;
        max-width: 400px;
    }
</style>