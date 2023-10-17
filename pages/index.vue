<template>
    <div id="topbar">
        <!-- <a id="mlh-trust-badge"
           style="display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000;border: none"
           href="https://mlh.io/eu?utm_source=eu-hackathon&utm_medium=TrustBadge&utm_campaign=2024-season&utm_content=black"
           target="_blank"><img
            src="https://s3.amazonaws.com/logged-assets/trust-badge/2024/mlh-trust-badge-2024-white.svg"
            alt="Major League Hacking 2023 Hackathon Season" style="width:100%"></a> -->
        <nav id="navbar">
            <a href="#intro">Intro</a>
            <a href="#faqs">FAQs</a>
            <a href="#sponsors" style="display: none">Sponsors</a>
            <a href="#schedule">Schedule</a>
            <a href="#team">Team</a>
        </nav>
        <div id="navstripe"/>
        <div id="navbrand">
            <img alt="DurHack 2023 logo" src="/assets/logo23.svg">
            <span>DURHACK</span>
        </div>
        <div id="navdiagonal"/>
        <div id="navbarline"/>
        <div id="mainbluestripe"/>
        <div id="smallbluestripe"/>
        <div id="diagonalbluestripe"/>
    </div>

    <div id="splash" class="section splash container">
        <div class="main container">
            <Splash />
        </div>
    </div>

    <div id="intro" class="section intro container">
        <div id="background">
            <div class="main">
                <Introduction />
            </div>
        </div>
    </div>

    <div class="section cta-map" id="map">
        <div class="main">
            <CTAMap />
        </div>
    </div>

    <div id="faqs" class="section faqs column">
        <div id="faq-background">
            <img src="/assets/photos/faq-bg-min.jpg">
        </div>
        <div class="main" id="faq-main">
            <FAQs />
        </div>
    </div>

    <div id="sponsors" class="section sponsors">
        <div class="main">
            <Sponsors />
        </div>
    </div>


    <div id="schedule" class="section schedule">
        <div class="main">
            <Schedule />
        </div>
    </div>


    <div id="megateams" class="section megateams">
        <div class="main">
            <Megateams />
        </div>
    </div>


    <div id="team" class="section team">
        <div class="main">
            <Team />
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
                    <a href="https://www.tiktok.com/@durhack" target="_blank">
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

            <img id="blur-1" alt="earth" src="/assets/graphics/earth.svg"/>
            <img alt="earth" src="/assets/graphics/earth.svg"/>
        </div>
        <div class="shadow"></div>
    </div>
</template>

<script>
    import Introduction from "../components/Introduction";
    import CTAMap from "../components/CTAMap";
    import FAQs from "../components/FAQs";
    import Sponsors from "../components/Sponsors";
    import Megateams from "../components/Megateams";
    import Team from "../components/Team";
    import Schedule from "../components/Schedule.vue";
    import Splash from "../components/Splash.vue";

    export default {
        components: { Introduction, CTAMap, FAQs, Sponsors, Megateams, Team, Schedule, Splash },
        mounted() {
            new Rellax('.rellax');
        }
    }
</script>
