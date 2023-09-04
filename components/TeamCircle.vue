<template>
    <div>
        <div v-if="totalMembers == 0" class="inner">
            <div class="hoop3">
                <img :src="`/assets/team/${center.image}`" :alt="center.image">
            </div>
        </div>
        
        <div v-else class="inner">
            <div class="hoop2">
                <img :src="`/assets/team/${center.image}`" :alt="center.image">
                <div :class="`outer-members outer-members-${totalMembers}`">
                    <div v-for="(person, index) in members" class="person" :id="`person-${index+1}`"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'teamCircle',
        props: ['center', 'members', 'teamNumber'],
        computed: {
            totalMembers() {
                return this.members.length;
            }
        },
        mounted() {
            let i = 1
            while (i <= this.totalMembers) {
                var styleElem = document.head.appendChild(document.createElement("style"));
                styleElem.innerHTML = `#team-${this.teamNumber} #person-${i}::before { background-image: url(/assets/team/${this.members[i-1].image}); }`;
                i++;
            }
        }
    };
</script>