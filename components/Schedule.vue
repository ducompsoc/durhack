// This is a previous year's template

<template>
	<div class="text-center">
		<h1>Schedule</h1>
	</div>

	<div id="big">
		<object id="schedule" type="image/svg+xml" data="/assets/graphics/schedule.svg"></object>
	</div>

	<div class="timeline" id="small">
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
// We can import the schedule dynamically from config.json. I haven't had enough time to get this working so I'm just inserting the SVGs
import { schedule } from '../config.json';

export default {
	
};
</script>
