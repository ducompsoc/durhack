<template>
    <div id="hoop">
        <a href="https://goo.gl/maps/rmFLyMWWXC5c8im69" target="_blank">
            <img :src="`/assets/team/${image}`" :alt="image">
        </a>
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