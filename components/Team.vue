<template>
    <div class="text-center">
        <h1>MEET THE TEAM</h1>
    </div>
    <div v-if="screenSize > 576" class="flex-item" id="mapbody">
        <div class="hoop">
            <img src="/assets/team/quinn.png" alt="Quinn">
            <div :class="`outer-members outer-members-${teams.length}`">
                <TeamCircle v-for="(team, index) in teams" class="team" :id="`team-${index+1}`" :center="team[0]" :members="team.slice(1)" :teamNumber="index+1" />
            </div>
        </div>
    </div>

    <div id="small-hoops" v-else>
        <div class="hoop-container" v-for="(team, index) in members">
            <TeamCircle class="team" :id="`team-${index+1}`" :center="team[0]" :members="team.slice(1)" :teamNumber="index+1" />
        </div>
    </div>
</template>

// To check:
// screenSize()

<script>
    import TeamCircle from './TeamCircle';
    import { teams } from '../config.json';

    // [ [{quinn}], [{...team1}], [{...team2}], ...]

    export default {
        components: {
            TeamCircle
        },
        computed: {
            members() {
                return teams;
            },
            teams() {
                // Returns the members apart from Quinn
                return teams.slice(1);
            },
            screenSize() {
                // NEED TO MAKE THIS RESPONSIVE
                return 577;
            }
        }
    };
</script>