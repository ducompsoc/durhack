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
        props: ['center', 'members'],
        computed: {
            totalMembers() {
                return this.members.length;
            }
        },
    };
</script>