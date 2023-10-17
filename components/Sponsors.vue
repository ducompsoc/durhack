<template>
	<div class="text-center">
		<h1>Sponsors</h1>
	</div>

	<div v-for="(sponsorList, tier) in sponsors">
		<div class="text-center" v-if="(tier == 'partners') && (sponsorList.length > 0)">
			<h3>Partners</h3>
		</div>

		<div :class="`${tier} row wrap`" v-if="tier != 'partners'">
			<div v-for="sponsor in sponsorList" class="sponsor biggest">
				<a :href="sponsor.link" target="_blank" class="column center">
					<img :src="`/assets/sponsors/${sponsor.image}`" class="sponsor-image"/>
					<img :src="`/assets/sponsors/tiles/${tier}.svg`" class="frame"/>
				</a>
			</div>
		</div>

		<div :class="`${tier} row wrap`" v-else>
			<div v-for="sponsor in sponsorList" class="sponsor biggest">
				<a :href="sponsor.link" target="_blank" class="column center">
					<img :src="`/assets/sponsors/${sponsor.image}`" class="partner-image"/>
					<img :src="`/assets/sponsors/tiles/${tier}.svg`" class="partner-frame"/>
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
