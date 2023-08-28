// VARIABLES DECLARATION
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let playPause = document.getElementById("playPause");
let songProgress = document.getElementById("songProgress");
let playEffect = document.getElementById("playEffect");
let currentSongName = document.getElementById("currentSongName");
let songItemPlay = document.getElementsByClassName("songItemPlay");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songs = [
	{ songName: "Agar Tum Saath Ho", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
	{ songName: "Apna Bana Le", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
	{ songName: "Gujju Pataka", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
	{
		songName: "Krishna Theme (Flute)",
		filePath: "songs/4.mp3",
		coverPath: "covers/4.jpg",
	},
	{ songName: "Malang Sajna", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
	{
		songName: "O Bedardeya",
		filePath: "songs/6.mp3",
		coverPath: "covers/6.jpg",
	},
	{ songName: "Rasiya", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
	{ songName: "Tere Naina", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
	{ songName: "Tere Pyar Mein", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
	{ songName: "Tum Kya Mile", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];
// SONGS LIST
songItem.forEach((element, i) => {
	element.getElementsByTagName("img")[0].src = songs[i].coverPath;
	element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
	// const minutes = Math.floor(audioElement.duration / 60);
	// const seconds = Math.floor(audioElement.duration - minutes * 60);
	// console.log(parseInt(minutes + ":" + seconds));
	// let time = minutes + ":" + seconds;
	// element.getElementsByClassName("songDuration")[0].innerText = time;
});
// PLAY PAUSE BUTTON OF SONG LIST
const makeAllPlays = () => {
	Array.from(songItemPlay).forEach((element) => {
		element.classList.remove("fa-circle-pause");
		element.classList.add("fa-circle-play");
	});
};
Array.from(songItemPlay).forEach((element) => {
	element.addEventListener("click", (e) => {
		if (audioElement.paused || audioElement.currentTime <= 0) {
			makeAllPlays();
			songIndex = parseInt(e.target.id);
			e.target.classList.remove("fa-circle-play");
			e.target.classList.add("fa-circle-pause");
			audioElement.src = `songs/${songIndex + 1}.mp3`;
			currentSongName.innerText = songs[songIndex].songName;
			audioElement.currentTime = 0;
			audioElement.play();
			playPause.classList.remove("fa-circle-play");
			playPause.classList.add("fa-circle-pause");
			playEffect.style.opacity = "1";
		} else {
			makeAllPlays();
			e.target.classList.remove("fa-circle-pause");
			e.target.classList.add("fa-circle-play");
			audioElement.pause();
			playPause.classList.remove("fa-circle-pause");
			playPause.classList.add("fa-circle-play");
			playEffect.style.opacity = "0";
		}
	});
});
// PROGRESSBAR
audioElement.addEventListener("timeupdate", () => {
	let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
	songProgress.value = progress;
	if (progress == 100) {
		songIndex++;
		audioElement.src = `songs/${songIndex + 1}.mp3`;
		currentSongName.innerText = songs[songIndex].songName;
		audioElement.currentTime = 0;
		audioElement.play();
	}
});
songProgress.addEventListener("change", () => {
	audioElement.currentTime = (songProgress.value * audioElement.duration) / 100;
});
// SONG BUTTONS
document.getElementById("previous").addEventListener("click", () => {
	if (songIndex <= 0) {
		songIndex = 9;
	} else {
		songIndex--;
	}
	audioElement.src = `songs/${songIndex + 1}.mp3`;
	currentSongName.innerText = songs[songIndex].songName;
	audioElement.currentTime = 0;
	audioElement.play();
	playPause.classList.remove("fa-circle-play");
	playPause.classList.add("fa-circle-pause");
	playEffect.style.opacity = "1";
});
playPause.addEventListener("click", () => {
	if (audioElement.paused || audioElement.currentTime <= 0) {
		audioElement.play();
		playPause.classList.remove("fa-circle-play");
		playPause.classList.add("fa-circle-pause");
		playEffect.style.opacity = "1";
	} else {
		audioElement.pause();
		playPause.classList.remove("fa-circle-pause");
		playPause.classList.add("fa-circle-play");
		playEffect.style.opacity = "0";
	}
});
document.getElementById("next").addEventListener("click", () => {
	if (songIndex >= 9) {
		songIndex = 0;
	} else {
		songIndex++;
	}
	audioElement.src = `songs/${songIndex + 1}.mp3`;
	currentSongName.innerText = songs[songIndex].songName;
	audioElement.currentTime = 0;
	audioElement.play();
	playPause.classList.remove("fa-circle-play");
	playPause.classList.add("fa-circle-pause");
	playEffect.style.opacity = "1";
});
