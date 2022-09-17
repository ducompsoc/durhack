<template>
    <ul class="questions dots">
        <li v-for="(answers, question) in faqs" class="question closed">
            <div class="title container">
                {{ question }}
            </div>

            <div class="answer">
                <div class="container">
                    <p v-for="answer in answers">{{ answer }}</p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import { faqs } from '../config.json';

export default {
	data() {
		return { faqs };
	},
};
</script>

