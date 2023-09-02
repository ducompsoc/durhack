<template>
    <div id="hoop">
        <img :src="`/assets/team/${image}`" :alt="image">
        <div id="person">
            <div id="person2"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'teamCircle',
        props: ['name', 'role', 'email', 'image']
    };
</script>