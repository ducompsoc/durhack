<template>
    <div id="intro-section">
        <div id="about">
            <p>Thank you for joining us at the eighth iteration of Durhack, Durham University Computing Society's annual flagship hackathon.</p>
            <h4>4 - 5 November 2023</h4>
            <p>Students of all experience levels came together in teams of up to four, helping and learning from each other while creating their own project.</p>
        </div>

        <div class="button-div">
            <a href="https://forms.gle/Cn2cjbb7jTWjEh226" target="_blank" class="link-button">
                FEEDBACK
            </a>
        </div>
        
        <div id="volunteer">
            <p>If you enjoyed the event this year and are interested in organising next year's Durhack, please let us know!</p>
            
            <div class="button-div">
                <a href="https://forms.gle/T6UzQqSvXaYQgzGA9" target="_blank" class="link-button">
                    SIGN UP TO ORGANISE
                </a>
            </div>
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
        <img alt="A person playing mario kart" src="/assets/photos/mario-kart-min.jpg">
        <img alt="A person getting food" src="/assets/photos/food-min.jpg">
        <img alt="A team being judged" src="/assets/photos/judging1-min.jpg">
        <img alt="A team being judged" src="/assets/photos/judging2-min.jpg">
        <img alt="People in a workshop" src="/assets/photos/workshop-min.jpg">
        <img alt="A person explaining a whiteboard" src="/assets/photos/whiteboard-min.jpg">
        <div id="empty-image">
            <object id="explosion" type="image/svg+xml" data="/assets/graphics/spaceship-shot/explosion.svg"></object>
        </div>
        <img alt="A team cup stacking" src="/assets/photos/cup-stacking-min.jpg">
    </div>

    <div class="grid">
        <li>
            <img alt="An icon of a science flask" src="/assets/icons/white-flask.svg"><br>
            Workshops to learn new skills
        </li>
        <li>
            <object id="spaceship-shot" type="image/svg+xml" data="/assets/graphics/spaceship-shot/laser.svg"></object>
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
        <a href="https://durhack-2023.devpost.com/project-gallery" target="_blank" class="previous-row">
                <h5>See last year's projects&nbsp;</h5><img src="/assets/icons/blue-triangle.svg">
        </a>
        <a href="https://durhack.com/photos" target="_blank" class="previous-row">
            <h5>See last year's photos&nbsp;</h5><img src="/assets/icons/blue-triangle.svg">
        </a>
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
</template>

<script>
    export default {
        name: 'introduction',
        methods: {
            getDifference() {
                const emptyImage = document.getElementById('empty-image');
                const rect = emptyImage.getBoundingClientRect();

                let x22 = rect.left + rect.width * 0.4 + window.scrollX;

                if (window.innerWidth < 768) {
                    x22 = rect.left + rect.width * 0.7 + window.scrollX;
                }

                const y22 = rect.top + rect.height * 0.85 + window.scrollY;
                const [x2, y2] = [Math.round(x22*100)/100, Math.round(y22*100)/100];



                const spaceship = document.getElementById('spaceship');
                const rect2 = spaceship.getBoundingClientRect();

                const x11 = rect2.left + rect2.width / 2 + window.scrollX;

                const y11 = rect2.top + rect2.height / 2 + window.scrollY;
                const [x1, y1] = [Math.round(x11*100)/100, Math.round(y11*100)/100];



                const difference = [ Math.abs(Math.round(x2 - x1)), Math.round(y1 - y2)];

                const shot = document.getElementById('spaceship-shot');
                shot.style.height = difference[1] + 'px';
                shot.style.width = difference[0] + 'px';
            }
        },
        created() {
            if (process.client) {
                window.addEventListener('resize', () => {
                    this.getDifference();
                });
            }
        },
        mounted() {
            this.getDifference();
        }
    };
</script>
