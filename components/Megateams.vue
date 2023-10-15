<template>
    <div class="text-center">
        <h1>
            <span>Megateams</span>
        </h1>
    </div>
    <Transition name="fade">
        <div class="text-center">
            <p>
                This year, we're introducing <b>'Megateams'</b>! These will gather teams of hackers together into larger groups, in which
                they will be able to compete for small prizes by completing challenges!<br/><br/>
                Don't worry, you'll still make your project in a team of 4 - megateams are like a house system (think Harry Potter!).<br/>&nbsp;
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
