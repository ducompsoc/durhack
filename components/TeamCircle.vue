<template>
    <div v-if="size === 'large'" class="container">
        <div id="hoop">
            <img :src="`/assets/team/${image}`" :alt="image">
            <div id="person">
                <div id="person2"></div>
            </div>
        </div>
    </div>

    <div v-if="size === 'small'" class="container">
    </div>
</template>

<script>
    export default {
        name: 'teamCircle',
        props: ['name', 'role', 'email', 'image', 'size']
    };
</script>