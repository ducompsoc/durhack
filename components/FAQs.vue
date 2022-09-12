<template>
	<div>
		<div v-for="(answers, question) in faqs" class="question closed">
			<div class="title container">
				<span class="x"></span>
				{{question}}
			</div>

			<div class="answer">
				<div class="container">
					<p v-for="answer in answers">{{answer}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { faqs } from '../config.json';

export default {
	data() {
		return { faqs };
	},
};
</script>

