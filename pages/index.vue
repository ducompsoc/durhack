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
        <div id="background">
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

                <div class="intro-images">
                    <img alt="A person playing mario kart" src="/assets/photos/mario-kart.jpg">
                    <img alt="A person getting food" src="/assets/photos/food.jpg">
                    <img alt="A team being judged" src="/assets/photos/judging1.jpg">
                    <img alt="A team being judged" src="/assets/photos/judging2.jpg">
                    <img alt="People in a workshop" src="/assets/photos/workshop.jpg">
                    <img alt="A person explaining a whiteboard" src="/assets/photos/whiteboard.jpg">
                    <div id="empty-image"> </div>
                    <img alt="A team cup stacking" src="/assets/photos/cup-stacking.jpg">
                </div>

                <div class="grid">
                    <li>
                        <img alt="An icon of a science flask" src="/assets/icons/white-flask.svg"><br>
                        Workshops to learn new skills
                    </li>
                    <li>
                        <object id="spaceship-shot" type="image/svg+xml" data="/assets/graphics/spaceship-shot/shot-combined.svg"></object>
                        <img id="spaceship" alt="An icon of a spaceship" src="/assets/icons/spaceship.svg"><br>
                        Sponsor-led challenges to shoot for
                    </li>
                    <li>
                        <img alt="An icon of a bulb" src="/assets/icons/bulb.svg"><br>
                        Mentors on-hand to help with your project
                    </li>
                    <li>
                        <img alt="An icon of a shirt" src="/assets/icons/shirt.svg"><br>
                        Hackathon swag and food included
                    </li>
                    <li>
                        <img alt="An icon of a star" src="/assets/icons/star.svg"><br>
                        Mini-events throughout the weekend
                    </li>
                    <li>
                        <img alt="A icon of a jigsaw puzzle piece" src="/assets/icons/puzzle.svg"><br>
                        Optional team-formation activity
                    </li>
                </div>

                <div class="text-center view-previous">
                    <div class="previous-row">
                        <h5>See last year's projects&nbsp;</h5><img src="/assets/icons/blue-triangle.svg">
                    </div>
                    <div class="previous-row">
                        <h5>See last year's projects&nbsp;</h5><img src="/assets/icons/blue-triangle.svg">
                    </div>
                </div>

                <div class="text-center">
                    <p class="intro-text">
                        The premise: work together in your team to create something awesome <span class="emphasis">in
                        just 24 hours</span>.
                    </p>
                    <p class="intro-text">
                        DurHack welcomes students of <span class="emphasis">all experience levels</span>,
                        from all degrees and any university.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="section cta-map" id="map">
        <div class="main">
            <div class="flex-container">
                <div class="flex-item" id="cta">
                    <h2>Join us in the <b class="emphasis">Teaching and Learning Centre</b> at Durham University</h2>
                    <div class="button-div">
                        <button type="button">FIND YOUR ROUTE</button>
                    </div>
                </div>
                <div class="flex-item" id="mapbody">
                    <div id="hoop1">
                        <div id="hoop2">
                            <a href="https://goo.gl/maps/rmFLyMWWXC5c8im69" target="_blank">
                                <img src="/assets//photos/tlcpng.png"
                                     alt="Map showing the location of the MCS building in Durham.">
                            </a>
                        </div>
                        <div id="o-planet">
                            <div id="b-planet"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="faqs" class="section faqs column">
        <div class="main">
            <div class="text-center">
                <h1>FREQUENTLY ASKED QUESTIONS</h1>
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


    <div id="megateams" class="section megateams">
        <div class="main">
            <Megateams/>
        </div>
    </div>

    
    <div id="team" class="section team">
        <div class="main">
            <Team/>
        </div>
    </div>


    <div id="footer" class="section footer">
        <div class="footer-main">
            <p class="text-center"><a href="mailto:hello@durhack.com">hello@durhack.com</a></p>

            <div class="socials">
                <div class="text-center">
                    <a href="https://www.instagram.com/durhackevent" target="_blank">
                        <img alt="Instagram" src="/assets/icons/instagram.svg">
                    </a>
                    <a href="https://www.facebook.com/DurHackEvent" target="_blank">
                        <img alt="Facebook" src="/assets/icons/facebook.svg">
                    </a>
                    <a href="#" target="_blank">
                        <img alt="Tiktok" src="/assets/icons/tiktok.svg">
                    </a>
                    <a href="https://www.linkedin.com/company/durhack/" target="_blank">
                        <img alt="LinkedIn" src="/assets/icons/linkedin.svg">
                    </a>
                    <a href="https://twitter.com/DurHackEvent" target="_blank">
                        <img alt="X" src="/assets/icons/x-twitter.svg">
                    </a>
                </div>
            </div>

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
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import FAQs from "../components/FAQs";
import Megateams from "../components/Megateams";
import Team from "../components/Team";

export default {
    components: { FAQs, Megateams, Team },
    mounted() {
        new Rellax('.rellax');
    }
}
</script>
