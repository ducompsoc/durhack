/**
 * Hi! DurHack website is pretty simple, so we're going to keep things pretty raw here.
 */
import tippy from 'tippy.js';

import './styles/index.scss';
import 'tippy.js/dist/tippy.css';

let config;
if (window.location.pathname.includes('nextgen')) {
	config = require('../config-nextgen.json');
} else {
	config = require('../config.json');
}

/**
 * Find all the navigation buttons and measure them.
 */
let navButtons = [];

function refreshNavButtons() {
	navButtons = [...document.querySelectorAll('header .nav > a.anchor')]
		.map(link => ({ link: link.href.split('#')[1], width: link.clientWidth }));
}

refreshNavButtons();
document.addEventListener('resize', () => {
	setTimeout(() => {
		refreshNavButtons();
	}, 500);
});

/**
 * Make the navigation bar "sticky" and update progress as we scroll.
 */
const navHeight = 76;

const header = document.querySelector('header');
const aboveTheFold = document.getElementById('top');
document.addEventListener('scroll', () => {
	if (window.scrollY > aboveTheFold.getBoundingClientRect().height) {
		header.classList.add('float');
	} else {
		header.classList.remove('float');
	}

	const currentSection = [...document.querySelectorAll('.anchor[id]')].find(sect => sect.getBoundingClientRect().bottom > navHeight);

	const { top, height } = currentSection.getBoundingClientRect();
	let totalWidth = Math.max(-top / (height - navHeight), 0) * navButtons.find(({ link }) => link === currentSection.id).width;
	navButtons.slice(0, navButtons.findIndex(({ link }) => link === currentSection.id)).forEach(({ width }) => {
		totalWidth += width;
	});

	document.querySelector('header .fill').style.width = `${totalWidth}px`;
});

/**
 * Make anchors smooth-scrolling.
 */
document.querySelectorAll('header .nav > a.anchor').forEach(element => {
	element.addEventListener('click', event => {
		event.preventDefault();

		const destination = element.href.split('#')[1];
		document.querySelector(`#${destination}`).scrollIntoView({
			behavior: 'smooth',
		});
	});
});

/**
 * Organise team members into groups.
 */
let teamColumns = [];
const limit = Math.floor(config.team.length / 3);
for (let i = 0; i < limit; i++) {
	teamColumns = [...teamColumns, [config.team[i * 3]], [config.team[(i * 3) + 1], config.team[(i * 3) + 2]]];
}
teamColumns.push(config.team.filter((_, index) => index >= limit * 3));

/**
 * Include partials.
 */
//document.querySelector('.faqs .template').innerHTML = require('./templates/faqs.hbs')({ questions: config.faqs });
//document.querySelector('.sponsors .template').innerHTML = require('./templates/sponsors.hbs')({ sponsors: config.sponsors });
//document.querySelector('.schedule .template').innerHTML = require('./templates/schedule.hbs')({ schedule: config.schedule });

if (document.querySelector('.team')) {
	document.querySelector('.team .template').innerHTML = require('./templates/team.hbs')({ teamColumns });
}

/**
 * Make FAQs clickable and unclickable.
 */
function closeQuestions() {
	const open = document.querySelector('.faqs .question:not(.closed)');
	if (open) {
		open.classList.add('closed');
	}
}

document.addEventListener('click', () => {
	closeQuestions();
});

document.querySelectorAll('.faqs .question').forEach(element => {
	element.querySelector('.title').addEventListener('click', event => {
		const isClosed = element.classList.contains('closed');
		closeQuestions();
		if (isClosed) {
			element.classList.remove('closed');
		}

		event.stopPropagation();
	});
});

/**
 * Enable tooltips.
 */
tippy('.tooltip');
