<template>
    <ul class="questions">
        <li v-for="(answers, question) in faqs" class="question closed">
            <div class="title container">
                {{ question }}
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

