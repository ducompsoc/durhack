<template>
    <div>
        <div v-if="totalMembers == 0" class="inner">
            <div class="hoop3">
                <img 
                    class="tooltip"
                    :src="`/assets/team/${center.image}`" 
                    :alt="center.image" 
                    :data-tippy-content="`<div><strong>${center.name}</strong></div><div>${center.role}</div>`"
                >
            </div>
        </div>
        
        <div v-else class="inner">
            <div class="hoop2">
                <img 
                    class="tooltip"
                    :src="`/assets/team/${center.image}`" 
                    :alt="center.image" 
                    :data-tippy-content="`<div><strong>${center.name}</strong></div><div>${center.role}</div>`"
                >
                <div :class="`outer-members outer-members-${totalMembers}`">
                    <div v-for="(person, index) in members" 
                        class="person" 
                        :id="`person-${index+1}`"
                    >
                        <div 
                            class="person-container"
                            :data-tippy-content="`<div><strong>${person.name}</strong></div><div>${person.role}</div>`"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'teamCircle',
        props: ['center', 'members', 'teamNumber'],
        computed: {
            totalMembers() {
                return this.members.length;
            }
        },
        mounted() {
            var styleElem = document.head.appendChild(document.createElement("style"));
            let styling = '';
            let i = 1
            while (i <= this.totalMembers) {
                styling += `#team-${this.teamNumber} #person-${i} > .person-container { background-image: url(/assets/team/${this.members[i-1].image}); } `;
                i++;
            }
            styleElem.innerHTML = styling;
            console.log(styling);

            tippy('.tooltip', 
                { 
                    allowHTML: true,
                    sticky: true
                }
            );
            tippy('.person-container', 
                { 
                    allowHTML: true,
                    sticky: true
                }
            );
            tippy('#lead', 
                {
                    content: `<div><strong>Quinn Dines</strong></div><div>Lead Organiser</div>`,
                    allowHTML: true,
                    sticky: true
                }
            );
        }
    };
</script>