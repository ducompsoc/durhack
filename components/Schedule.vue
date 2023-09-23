// This is a previous year's template

<template>
	<div class="text-center">
		<h1><span>Schedule</span></h1>
	</div>

	<div id="big">
		<object class="schedule-content" type="image/svg+xml" data="/assets/graphics/schedule.svg"></object>
	</div>

	<div id="small">
		<Transition>
			<div :class="{ expanded: !isHidden }">
                <div class="schedule-content-wrapper">
                    <object class="schedule-content" type="image/svg+xml" data="/assets/graphics/long-schedule.svg"/>
                </div>

				<div class="button-div">
					<button type="button" v-on:click="isHidden = !isHidden">{{ isHidden ? "See More" : "See Less" }}</button>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script>
// We can import the schedule dynamically from config.json. I haven't had enough time to get this working so I'm just inserting the SVGs
import { schedule } from '../config.json';

export default {
    name: 'schedule',
    data() {
        return {
            isHidden: true
        };
    }
};
</script>
