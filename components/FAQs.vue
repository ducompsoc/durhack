<template>
    <div class="text-center">
        <h1>FREQUENTLY ASKED QUESTIONS</h1>
    </div>
    <ul class="questions">
        <li v-for="(answers, question, index) in faqs" class="question closed">
            <div class="title container">
                <img v-if="index % 3 === 0" src="/assets/icons/twinkle-bright.svg" alt="star">
                <img v-else-if="index % 3 === 1" src="/assets/icons/twinkle-dim.svg" alt="star">
                <img v-else src="/assets/icons/twinkle-normal.svg" alt="star">
                <span>{{ question }}</span>
            </div>

            <div class="answer">
                <div class="container">
                    <p v-for="answer in answers" v-html="( answer )"></p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import {faqs} from '../config.json';
import {faqLogic} from "../faqs";

export default {
    name: 'navigation',
    data() {
        return {faqs};
    },
    mounted() {
        faqLogic();
    }
};
</script>

