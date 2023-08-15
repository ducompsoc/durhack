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
        <li><img alt="pegasus icon" src="/assets/graphics/megateam/pegasus/icon-stars.png"></li>
        <li><img alt="cygnus icon" src="/assets/graphics/megateam/cygnus/icon-stars.png"></li>
        <li><img alt="lyra icon" src="/assets/graphics/megateam/lyra/icon-stars.png"></li>
        <li><img alt="orion icon" src="/assets/graphics/megateam/orion/icon-stars.png"></li>
    </ul>
    <div class="button-div">
        <button type="button" v-on:click="isHidden = !isHidden">LEARN MORE</button>
    </div>
    <div id="world"></div>
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