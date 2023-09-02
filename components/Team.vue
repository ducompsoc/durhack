<template>
    <div class="text-center">
        <h1>MEET THE TEAM</h1>
    </div>
    <TeamCircle :center="team" :members="[team, team, team, team]" size="large"/>
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
            }
        },
    };
</script>