<template>
    <div v-if="size === 'large'" class="flex-item" id="mapbody">
        <div id="hoop">
            <img :src="`/assets/team/${image}`" :alt="image">
            <div id="person"></div>
        </div>
    </div>

    <div v-if="size === 'small'" class="flex-item" id="mapbody">
    </div>
</template>

<script>
    export default {
        name: 'teamCircle',
        props: ['name', 'role', 'email', 'image', 'size']
    };
</script>