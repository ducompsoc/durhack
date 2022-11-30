<template>
    <div>
        <div>
            <!--Header menu goes here -->
        </div>

        <div class="above-the-fold" id="top">
            <div class="foreground">
                <div class="container content row">
                    <div class="hero">
                        <div class="cutout">
                            <div>

                                <div class="logo">
                                    <img
                                        alt="DurHack 2022 Logo: A purple glowing cyberpunk triangle with a shield in the centre."
                                        src="/assets/logo22.png">
                                </div>

                                <p>
                                    Thank you for joining us for the seventh iteration of DurHack,
                                    Durham University Computing
                                    Society’s annual flagship hackathon.
                                </p>

                                <p>
                                    Students of all experience levels came together in teams of up
                                    to five, helping
                                    and learning from each other in order to create their own
                                    project.
                                </p>

                                <p class="date">
                                    19th &ndash; 20th November 2022
                                </p>

                                <a class="register button" href="/preregister">Fancy joining us next
                                    time?</a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <div class="bg-wrap">
                <div class="video-front"></div>

                <video autoplay muted playsinline loop poster="/assets/videos/splash-poster.jpg">
                    <source src="/assets/videos/splash.webm" type="video/webm" />
                </video>

                <!--<div class="nodes">
                    <div class="bg a"></div>
                    <div class="bg b"></div>
                    <div class="bg c"></div>
                </div> -->
            </div>
        </div>

        <a id="mlh-trust-badge"
           style="display:block;max-width:100px;min-width:60px;position:fixed;right:50px;top:0;width:10%;z-index:10000;border: none"
           href="https://mlh.io/eu?utm_source=eu-hackathon&utm_medium=TrustBadge&utm_campaign=2023-season&utm_content=black"
           target="_blank"><img
                src="https://s3.amazonaws.com/logged-assets/trust-badge/2023/mlh-trust-badge-2023-black.svg"
                alt="Major League Hacking 2023 Hackathon Season" style="width:100%"></a>

        <div id="navbar">
            <a href="#intro">Intro</a>
            <a href="#faqs">FAQs</a>
            <a href="#sponsors">Sponsors</a>
            <a href="#schedule">Schedule</a>
            <a href="#team">Team</a>
<!--            <div id="navdiag2"/>-->
        </div>

        <div id="navstripe"></div>
        <div id="navouter"></div>
        <div id="navleft"></div>
        <div id="navright"></div>
        <div id="navcorner"></div>
        <div id="navtrustbadge"></div>

        <img src="/assets/graphics/artifact-diamond.svg" class="artifact intro-diamond rellax" data-rellax-speed="-3" />
        <img src="/assets/graphics/artifact-cross.svg" class="artifact intro-cross rellax" data-rellax-speed="-1" />

        <div id="intro" class="section intro container">
            <h2>DurHack is all about <b>learning something new</b></h2>

            <div class="flex-container">
                <div class="flex-item">
                    <div class="image">
                        <img alt="A top down view of 5 students around a table with their laptops" class="file-crop"
                            src="/assets/photos/top_down_laptop_table.jpg">
                        <img src="/assets/graphics/file_tic.svg" class="img-file-under-tic" aria-hidden="true" />
                    </div>

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
                    <div class="image">
                        <img alt="Four people in front of a whiteboard, writing and designing a progream." class="file-crop"
                            src="/assets/photos/whiteboard.jpg">
                        <img src="/assets/graphics/file_tic.svg" class="img-file-under-tic" aria-hidden="true" />
                    </div>

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

        <div id="faqs" class="section faqs column">
            <div class="faq-cap top"></div>
            <aside>
                <h1>FAQs</h1>
                <div>
                    <FAQs/>
                </div>
            </aside>
            <div class="faq-cap bottom flex">
                <div class="row">
                    <a href="/2022-submissions" target="_blank">Check out 2022's projects</a>
                    <a href="/photos" target="_blank">See photos from 2022</a>
                </div>
            </div>
        </div>

        <div class="section anchor sponsors" id="sponsors">
            <aside>
                <h1>Sponsors 2022</h1>
                <div class="sponsor-grid">
                    <Sponsors/>

                    <!-- <div class="template"></div> -->

                    <p>Thanks in advance to all our sponsors for making DurHack possible!</p>

                    <p>Interested in sponsoring DurHack? We'd love to work with you. Send us an
                        email at <a
                            href="mailto:sponsor@durhack.com">sponsor@durhack.com</a>.</p>
                </div>
            </aside>
        </div>

        <div class="section anchor schedule" id="schedule">
            <div class="container">
                <aside class="inside">
                    <h1>Schedule 2022</h1>
                    <div>
                        <Schedule/>
                        <p>Please note: this was 2022's schedule. The next DurHack is likely to
                            follow a similar format.</p>
                    </div>

                </aside>

            </div>
        </div>

        <div class="section cta-foot" id="map">
            <div class="flex-container">
                <div class="flex-item" id="mapbody">
                    <p class="">Join us in the Mathematics and Computer Science
                        building at Durham University.</p>
                    <a class="register button" href="/preregister">Register your interest for the
                        next DurHack</a>
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


        <!--        <div class="section cta-foot" id="volunteer">-->
        <!--            <div class="flex-container">-->
        <!--                <div class="flex-item" id="volunteerBody">-->
        <!--                    <p class="">If you’d like to gain hands-on experience of running an event, this role is for you. <br>Registration closes on the 14th November.</p>-->
        <!--                    <a href="/volunteer" class="register button">Become a DurHack Volunteer</a>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->

        <div class="text-center" id="team">
            <h1>Meet the team</h1>
        </div>


        <div class="section anchor team">
            <div class="bg"></div>
            <div class="inner">
                <div class="team-grid row center template">
                    <Team />
                </div>
                <!-- <Team /> -->
                <div class="socials">
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
                <p><a href="mailto:hello@durhack.com">hello@durhack.com</a></p>
            </div>
        </div>

        <!-- <div class="section anchor team" id="team">
			<div class="bg"></div>

			<div class="inner">
				<p>And here are your organisers for DurHack</p>
				<div class="team-grid row center template"></div>
				<p><a href="mailto:hello@durhack.com">hello@durhack.com</a></p>
			</div> -->


        <footer>
            <div class="container row center">
                <div class="legal flex">
                    <p class="bigger">
                        DurHack follows the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf">MLH Code of
                            Conduct</a>.
                        Photos and videos taken at events in 2019 and 2022.
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
                        src="/assets/logo-22-white.svg">
                </div>
            </div>
        </footer>


    </div>
</template>
<script>
import FAQs from "../components/FAQs";
import Team from "../components/TeamGrid";
import Sponsors from "../components/Sponsors";

export default {
    components: { FAQs, Team, Sponsors },
    mounted() {
        new Rellax('.rellax');
    }
}
</script>
