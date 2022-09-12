<template>
	<div class="timeline">
		<div class="group" v-for="(day, key) in schedule">
			<div v-if="key" class="bracket center column">
				<div class="day">{{day.day}}</div>
			</div>

			<div class="row set">
				<div v-for="event in day.events" class="event">
					<div class="line row center">
						<div class="gap"></div>
					</div>

					<div class="inner">
						<div class="time">{{event.start}}<span v-if="event.end"> &ndash; {{event.end}}</span></div>
						<div class="row center">
							<div class="icon">
								<img :src="`/assets/icons/${event.icon}.svg`" />
							</div>
						</div>
						<div class="title">{{event.title}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { schedule } from '../config.json';

export default {
	data() {
		return { schedule };
	},
};
</script>
