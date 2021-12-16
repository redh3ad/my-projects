'use strict'

const html = document.documentElement;
const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const btnContainer = document.querySelector('.btn-container');
const btns = document.querySelectorAll('.btn');
const openFullScr = document.querySelector('.openfullscreen');

// function PlayAudio

function playAudio(src) {
	const audio = new Audio();
	audio.src = src;
	audio.currentTime = 0;
	audio.play();
}

// audio and animation on mouse click

const addAnimation = (event) => {
	if(event.target.classList.contains('piano-key')) {
		event.target.classList.add('piano-key-active');
		event.target.classList.add('piano-key-active-pseudo');
		const note = event.target.dataset.note;
		const src = `assets/audio/${note}.mp3`;
		playAudio(src);
	}
}

const removeAnimation = (event) => {
	if(event.target.classList.contains('piano-key')) {
		event.target.classList.remove('piano-key-active');
		event.target.classList.remove('piano-key-active-pseudo');
	}
}

const pianoPlay = (event) => {
	if(event.target.classList.contains('piano-key')) {
		const note = event.target.dataset.note;
		const src = `assets/audio/${note}.mp3`;
		playAudio(src);
		event.target.classList.add('piano-key-active');
		event.target.classList.add('piano-key-active-pseudo');
	};
	pianoКeys.forEach((elem) => {
		elem.addEventListener('mouseover', addAnimation);
		elem.addEventListener('mouseout', removeAnimation);
	});
}

const pianoStopPlay = () => {
	pianoКeys.forEach((elem) => {
		if(elem.classList.contains('piano-key-active')) {
			elem.classList.remove('piano-key-active');
			elem.classList.remove('piano-key-active-pseudo');
		}
		elem.removeEventListener('mouseover', addAnimation);
		elem.removeEventListener('mouseout', removeAnimation);
	});
}


piano.addEventListener('mousedown', pianoPlay);
piano.addEventListener('mouseup', pianoStopPlay);
piano.addEventListener('mouseleave', pianoStopPlay);


 // Notes/Letters swither

btnContainer.addEventListener('click', (event) => {
	if(event.target.classList.contains('btn')) {
	btns.forEach((el) => {
		if(el.classList.contains('btn-active')) {
			el.classList.remove('btn-active');
		};
		pianoКeys.forEach((elem) =>{
			elem.classList.remove('piano-key-letter');
	});
	event.target.classList.add('btn-active');
	if(event.target.classList.contains('btn-letters')){
		pianoКeys.forEach((elem) =>{
			elem.classList.add('piano-key-letter');
		});
	};
	});
	}
})

// PlayAudio and add animation when clicked on keybord

window.addEventListener('keydown', (event) => {
	const keyBord = document.querySelector(`.piano-key[data-key='${event.keyCode}']`);
	if(event.repeat === true) return;
	if(!keyBord) return;
	const keyNote = keyBord.getAttribute("data-note");
	const src = `assets/audio/${keyNote}.mp3`;
	playAudio(src);
	if(keyBord.classList.contains('piano-key')) {
		keyBord.classList.add('piano-key-active');
	}

  });

  window.addEventListener('keyup', () => {
	pianoКeys.forEach((el) => {
		if(el.classList.contains('piano-key-active')) {
		el.classList.remove('piano-key-active');
		}
	});
  });

//Script for FullScreen

  openFullScr.addEventListener('click', ()=>{
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} 
	else {
		document.documentElement.requestFullscreen();
	}
  });
