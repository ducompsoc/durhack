<template>
    <div id="intro-section">
        <div id="about">
            <p>Thank you for joining us for the eighth iteration of Durhack, Durham University Computing Society's annual flagship hackathon.</p>
            <h4>4 - 5 November</h4>
            <p>Students of all experience levels come together in teams of up to five, helping and learning from each other in order to create their own project.</p>
        </div>
        <a href="https://durhack.com/ticket" target="_blank" class="button-div">
            <button type="button">BOOK TICKET</button>
        </a>
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
        <a href="https://durhack-2022-2.devpost.com/project-gallery" target="_blank" class="previous-row">
                <h5>See last year's projects&nbsp;</h5><img src="/assets/icons/blue-triangle.svg">
        </a>
        <a href="https://drive.google.com/drive/folders/1L7HPur6l4qoPQqgsdaCEZMEqm_Tg-owx" target="_blank" class="previous-row">
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
        name: 'introduction'
    };
</script>