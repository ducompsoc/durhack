// This is a previous year's template

<template>
	<div class="text-center">
		<h1>Past Sponsors</h1>
	</div>

	<div v-for="(sponsorList, tier) in sponsors">
		<h3><img :src="`/assets/graphics/sponsor_${tier}.svg`" class="primary-normal-svg-filter"/>
        </h3>

		<div :class="`${tier} row wrap`">
			<div v-for="sponsor in sponsorList" class="sponsor biggest row">
				<a :href="sponsor.link" target="_blank" class="column center">
					<img :src="`/assets/sponsors/${sponsor.image}`" />
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import { sponsors } from '../config.json';

export default {
	data() {
		return { sponsors };
	},
};
</script>
