<template>
	<div v-for="teamColumn in teamColumns" class="column center">
		<a
			v-for="member in teamColumn"
			class="tooltip"
			:data-tippy-content="`<div><strong>${member.name}</strong></div><div>${member.role}</div><div>${member.email}</div>`"
			:href="`mailto:${member.email || 'hello@durhack.com'}`"
		>
			<img :src="`/assets/team/${member.image}`" />
		</a>
	</div>
</template>

<script>
import { team } from '../config.json';

export default {
	computed: {
		teamColumns() {
			let teamColumns = [];
			const limit = Math.floor(team.length / 3);
			for (let i = 0; i < limit; i++) {
				teamColumns = [...teamColumns, [team[i * 3], team[(i * 3) + 1]], [team[(i * 3) + 2]]];
			}
			teamColumns.push(team.filter((_, index) => index >= limit * 3));

			return teamColumns;
		},
	},
};
</script>
