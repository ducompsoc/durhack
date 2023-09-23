<template>
    <div class="text-center">
        <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Megateams&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
    </div>
    <Transition name="fade">
        <div class="text-center">
            <p>
                This year, we're introducing <b>'Megateams'</b>! These will gather teams of hackers together into larger groups, in which
                they will be able to compete for small prizes by completing challenges!
            </p>
        </div>
    </Transition>
    <ul>
        <li><object class="pegasus icon" type="image/svg+xml" data="/assets/graphics/megateam/pegasus/icon.svg"></object></li>
        <li><object class="cygnus icon" type="image/svg+xml" data="/assets/graphics/megateam/cygnus/icon.svg"></object></li>
        <li><object class="lyra icon" type="image/svg+xml" data="/assets/graphics/megateam/lyra/icon.svg"></object></li>
        <li><object class="orion icon" type="image/svg+xml" data="/assets/graphics/megateam/orion/icon.svg"></object></li>
    </ul>
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
