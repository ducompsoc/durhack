<template>
    <div class="text-center">
        <h1>MEET THE TEAM</h1>
    </div>
    <div class="flex-item" id="mapbody">
        <div class="hoop">
            <img src="/assets/team/quinn.png" alt="Quinn">
            <div :class="`outer-members outer-members-${teams.length}`">
                <TeamCircle v-for="(team, index) in teams" class="person" :id="`person-${index+1}`" :center="team" :members="[team, team, team, team]"/>
            </div>
        </div>
    </div>
</template>

<script>
    import TeamCircle from './TeamCircle';
    import { team } from '../config.json';

    export default {
        components: {
            TeamCircle
        },
        computed: {
            team() {
                return team[0];
            },
            teams() {
                return [team[0], team[0], team[0], team[0]];
            }
        },
    };
</script>