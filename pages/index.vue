<template>
    <div id="topbar">
        <a id="mlh-trust-badge"
           style="display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000;border: none"
           href="https://mlh.io/eu?utm_source=eu-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=black"
           target="_blank"><img
            src="https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-white.svg"
            alt="Major League Hacking 2023 Hackathon Season" style="width:100%"></a>
        <nav id="navbar">
            <a href="#intro">Intro</a>
            <a href="#faqs">FAQs</a>
            <a href="#sponsors">Sponsors</a>
            <a href="#schedule">Schedule</a>
            <a href="#team">Team</a>
        </nav>
        <div id="navstripe"/>
        <div id="navbrand">
            <img alt="DurHack 2023 logo" src="/assets/logo23.svg">
            <span>DURHACK</span>
        </div>
        <div id="navdiagonal"/>
    </div>

    <div id="splash" class="section splash container">
        <div class="main container">
            <img alt="top-down view of people at a desk programming" class="splash-photo" src="/assets/photos/splash-hacking.jpg">
            <img alt="circuitry overlay" class="circuitry-overlay" src="/assets/graphics/artifact-circuitry.svg"/>
            <img alt="dark space blur" class="space-shadow" src="/assets/graphics/artifact-space-blur.svg"/>
            <object class="rocket" type="image/svg+xml" data="/assets/graphics/rocket/rocket-combined.svg">rocket</object>
            <div class="countdown">
                <div class="t-minus"/>
                <div class="days">106</div>
                <div class="hours">8</div>
                <div class="minutes">15</div>
                <div class="seconds">30</div>
            </div>
        </div>
    </div>

    <div id="intro" class="section intro container">
        <div class="main">
            <div id="intro-section">
                <div id="about">
                    <p>Thank you for joining us for the eighth iteration of Durhack, Durham University Computing Society's annual flagship hackathon.</p>
                    <h4>4 - 5 November</h4>
                    <p>Students of all experience levels come together in teams of up to five, helping and learning from each other in order to create their own project.</p>
                </div>
                <div class="button-div">
                    <button type="button">BOOK TICKET</button>
                </div>
                <h2>DurHack is all about <b>learning something new</b></h2>

                <div id="background-constellations">
                    <img alt="orion" id="orion" src="/assets/graphics/megateam/orion/constellation.svg"/>
                    <img alt="cygnus" id="cygnus" src="/assets/graphics/megateam/cygnus/constellation.svg"/>
                    <img alt="lyra" id="lyra" src="/assets/graphics/megateam/lyra/constellation.svg"/>
                    <img alt="pegasus" id="pegasus" src="/assets/graphics/megateam/pegasus/constellation.svg"/>
                    <img alt="orion" id="orion2" src="/assets/graphics/megateam/orion/constellation.svg"/>
                    <img alt="cygnus" id="cygnus2" src="/assets/graphics/megateam/cygnus/constellation.svg"/>
                    <img alt="lyra" id="lyra2" src="/assets/graphics/megateam/lyra/constellation.svg"/>
                    <img alt="pegasus" id="pegasus2" src="/assets/graphics/megateam/pegasus/constellation.svg"/>
                </div>
            </div>

            <div class="flex-container">
                <div class="flex-item">
                    <p>
                        The premise: work together in your team to create something awesome <span class="emphasis">in
                        just 24 hours</span>.
                    </p>
                    <ul>
                        <li>
                            <img alt="A icon of a light bulb" src="/assets/icons/lightbulb.svg">
                            Optional team-formation activity
                        </li>
                        <li>
                            <img alt="An icon of a person partying" src="/assets/icons/party.svg">
                            Mini-events throughout the weekend
                        </li>
                        <li>
                            <img alt="An icon of a shirt" src="/assets/icons/swag.svg">
                            Hackathon swag and food included
                        </li>
                    </ul>
                </div>

                <div class="flex-item">
                    <p>
                        DurHack welcomes students of <span class="emphasis">all experience levels</span>,
                        from all degrees and any university.
                    </p>
                    <ul>
                        <li>
                            <img alt="An icon of a person" src="/assets/icons/mentor.svg">
                            Mentors on-hand to help with your project
                        </li>
                        <li>
                            <img alt="An icon of a science flask" src="/assets/icons/flask.svg">
                            Workshops to learn new skills
                        </li>
                        <li>
                            <img alt="An icon of a rosette prize" src="/assets/icons/prizes.svg">
                            Sponsor-led challenges to shoot for
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class="section cta-map" id="map">
        <div class="main">
            <div class="text-center">
                <h1>Your Way to Durhack</h1>
            </div>
            <div class="flex-container">
                <div class="flex-item" id="mapbody">
                </div>
                <div class="flex-item">
                    <div id="hoop1">
                        <div id="hoop2">
                            <a href="https://goo.gl/maps/rmFLyMWWXC5c8im69" target="_blank">
                                <img src="/assets/mcsmap.png"
                                     alt="Map showing the location of the MCS building in Durham.">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="faqs" class="section faqs column">
        <div class="main">
            <div class="text-center">
                <h1>FAQs</h1>
            </div>
            <FAQs/>
        </div>
    </div>

    <div id="sponsors" class="section sponsors">
        <div class="main">
            <div class="text-center">
                <h1>Sponsors 2023</h1>
            </div>
        </div>
    </div>


    <div id="schedule" class="section schedule">
        <div class="main">
            <div class="text-center">
                <h1>Schedule</h1>
            </div>
        </div>
    </div>


    <div id="team" class="section team">
        <div class="main">
            <div class="text-center">
                <h1>Meet the team</h1>
            </div>
        </div>
    </div>


    <div id="megateams" class="section megateams">
        <div class="main">
            <div class="text-center">
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Megateams&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
            </div>
            <div class="text-center">
                <p>This year, we're introducing 'Mega Teams'! These will put each of the hacking teams into larger groups, where they all can connect points for their mega team towards a small prize.</p>
            </div>
            <ul>
                <li><img alt="pegasus icon" src="/assets/graphics/megateam/pegasus/icon-stars.png"></li>
                <li><img alt="cygnus icon" src="/assets/graphics/megateam/cygnus/icon-stars.png"></li>
                <li><img alt="lyra icon" src="/assets/graphics/megateam/lyra/icon-stars.png"></li>
                <li><img alt="orion icon" src="/assets/graphics/megateam/orion/icon-stars.png"></li>
            </ul>
            <div class="button-div">
                <button type="button">LEARN MORE</button>
            </div>
        </div>
    </div>

    <div class="section socials" hidden>
        <div class="main">
            <a href="https://www.facebook.com/DurHackEvent" target="_blank">
                <img alt="Twitter" src="/assets/icons/facebook_white_58px.png">
            </a>
            <a href="https://www.instagram.com/durhackevent" target="_blank">
                <img alt="Twitter" src="/assets/icons/instagram_white.svg">
            </a>
            <a href="https://twitter.com/DurHackEvent" target="_blank">
                <img alt="Twitter" src="/assets/icons/twitter_white.svg">
            </a>
            <a href="https://www.linkedin.com/company/durhack/" target="_blank">
                <img alt="Twitter" src="/assets/icons/linkedin.png">
            </a>
        </div>
    </div>

    <p class="text-center" hidden><a href="mailto:hello@durhack.com">hello@durhack.com</a></p>

    <footer>
        <div class="container row center">
            <div class="legal flex">
                <p class="bigger">
                    DurHack follows the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of
                        Conduct</a>.
                    Photos and videos taken at events in 2019, 2022 and 2023.
                </p>

                <p>
                    DurHack is an event hosted by Durham University Computing Society (<a
                        href="https://compsoc.tech" target="_blank">compsoc.tech</a>), which is a student society
                    affiliated with Durham Students' Union (<a href="https://durhamsu.com"
                        target="_blank">durhamsu.com</a>).
                    Durham Students' Union is registered in England as a company limited by guarantee (07689815) and
                    a charity (1145400), with VAT number 119733690 and registered office Dunelm House, New Elvet,
                    Durham DH1 3AN.
                </p>
            </div>

            <div class="photo">
                <img alt="The text 2022 on its side and then DurHack written in a white outline font"
                    src="/assets/logo23.svg">
            </div>
        </div>
    </footer>
</template>

<script>
import FAQs from "../components/FAQs";

export default {
    components: { FAQs },
    mounted() {
        new Rellax('.rellax');
    }
}
</script>
