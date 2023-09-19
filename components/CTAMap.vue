<template>
    <div class="flex-container">
        <div class="flex-item" id="cta">
            <h2>Join us in the <b class="emphasis">Teaching and Learning Centre</b> at Durham University</h2>
            <a href="https://maps.app.goo.gl/jxoBZftwrarF7XuaA" target="_blank" class="button-div">
                <button type="button">FIND YOUR ROUTE</button>
            </a>
        </div>
        <div class="flex-item" id="mapbody">
            <div id="hoop1">
                <div id="hoop2">
                    <a href="https://maps.app.goo.gl/jxoBZftwrarF7XuaA" target="_blank">
                        <img src="/assets//photos/tlcpng-min.png" id="map-img" alt="Map showing the location of the TLC building in Durham.">
                    </a>
                </div>
                <div id="o-planet">
                    <div id="b-planet"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CTAMap'
    }
</script>