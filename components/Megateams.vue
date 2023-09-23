<template>
    <div class="text-center">
        <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Megateams&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
    </div>
    <Transition name="fade">
        <div class="text-center" v-if="!isHidden">
            <p>This year, we're introducing <b>'Mega Teams'</b>! These will put each of the hacking teams into larger groups, where they all can connect points for their mega team towards a small prize.</p>
        </div>
    </Transition>
    <ul>
        <li><object class="pegasus icon" type="image/svg+xml" data="/assets/graphics/megateam/pegasus/icon.svg"></object></li>
        <li><object class="cygnus icon" type="image/svg+xml" data="/assets/graphics/megateam/cygnus/icon.svg"></object></li>
        <li><object class="lyra icon" type="image/svg+xml" data="/assets/graphics/megateam/lyra/icon.svg"></object></li>
        <li><object class="orion icon" type="image/svg+xml" data="/assets/graphics/megateam/orion/icon.svg"></object></li>
    </ul>
    <div class="button-div">
        <button type="button" v-on:click="isHidden = !isHidden">LEARN MORE</button>
    </div>
</template>

<script>
export default {
    name: 'megateams',
    data() {
        return {
            isHidden: true
        };
    }
};
</script>