<template>
    <img alt="top-down view of people at a desk programming" class="splash-photo" src="/assets/photos/splash-hacking-min.jpg">
    <img alt="circuitry overlay" class="circuitry-overlay" src="/assets/graphics/artifact-circuitry.svg"/>
    <img alt="dark space blur" class="space-shadow" src="/assets/graphics/artifact-space-blur.svg"/>
    <object class="rocket" type="image/svg+xml" data="/assets/graphics/rocket/rocket-combined.svg">rocket</object>
    <div class="countdown">
        <div class="t-minus"/>
        <div class="days">{{ daysTo.days }}</div>
        <div class="hours">{{ daysTo.hours }}</div>
        <div class="minutes">{{ daysTo.minutes }}</div>
        <div class="seconds">{{ daysTo.seconds }}</div>
    </div>
</template>

<script>
    import { teams } from '../config.json';

    export default {
        name: 'splash',
        data() {
            return {
                daysTo: {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                }
            };
        },
        methods: {
            daysUntil: function () {
                // https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates
                const firstDate = new Date();

                // We switch from BST to GMT on October 29th
                // Change the 10 to 9 on October 29th
                let secondDate = new Date(2023, 10, 4, 10, 30);

                if (firstDate > new Date(2023, 9, 29, 23)) {
                    secondDate = new Date(2023, 10, 4, 9, 30);
                }

                if (secondDate < firstDate) {
                    this.daysTo = {
                        days: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    };
                    return;
                }

                const diffDays = Math.floor(Math.abs((secondDate - firstDate) / (24 * 60 * 60 * 1000)));
                const diffHours = Math.floor((Math.abs((secondDate - firstDate) / (60 * 60 * 1000))) - (diffDays * 24));
                const diffMinutes = Math.floor((Math.abs((secondDate - firstDate) / (60 * 1000))) - (diffDays * 24 * 60) - (diffHours * 60));
                const diffSeconds = Math.floor((Math.abs((secondDate - firstDate) / (1000))) - (diffDays * 24 * 60 * 60) - (diffHours * 60 * 60) - (diffMinutes * 60));

                this.daysTo = {
                    days: diffDays,
                    hours: diffHours,
                    minutes: diffMinutes,
                    seconds: diffSeconds
                };
            },
            teams() {
                // Returns the members apart from Quinn
                return teams.slice(1);
            }
        },
        created() {
            this.daysUntil();
        },
        mounted() {
            setInterval(this.daysUntil, 500);
        }
    };
</script>
