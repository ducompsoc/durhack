<template>
    <div class="flex-item">
        <div class="hoop">
            <img :src="`/assets/team/${center.image}`" :alt="image">
            <div :class="`outer-members outer-members-${totalMembers}`">
                <div v-for="(person, index) in members" class="person" :id="`person-${index+1}`"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'teamCircle',
        props: ['center', 'members', 'size'],
        computed: {
            totalMembers() {
                return this.members.length;
            }
        },
    };
</script>