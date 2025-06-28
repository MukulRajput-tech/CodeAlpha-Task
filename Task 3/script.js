
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const volume = document.getElementById('volume');
const playlistDiv = document.getElementById('playlist');

let songs = [
  {
    name: 'Rajput_Clan.mp3',
    title: 'haldi ghadi rhi gava ',
    artist: 'Rana Brass'
  },
  {
    name: 'Daade_ki_bandook.mp3',
    title: 'kon kr lu pyar rajput wangra',
    artist: 'Rahi Rana'
  },
  {
    name: 'Bande_4.mp3',
    title: 'tere kalle jatt ne bande 4 dakle',
    artist: 'Watan Sahi'
  },
   {
    name: 'Police.mp3',
    title: 'mere nal police radiye',
    artist: 'unknown'
  },
   {
    name: 'Churake.mp3',
    title: 'na sok nawabi rakhuga',
    artist: 'pata ni'
  },
   {
    name: 'Got_You.mp3',
    title: 'tu jan chhikda mere te',
    artist: 'janta ni'
  },
   {
    name: 'In_love.mp3',
    title: 'Bakiya to or h tu meri lod h',
    artist: 'Shubh'
  },
   {
    name: 'Darshan_de.mp3',
    title: 'Ashiqa nu darshan de',
    artist: 'Watan Sahi'
  },
   {
    name: 'Bed_Fellas.mp3',
    title: 'jinhe gunda kha kre meri gel rhe sare',
    artist: 'Watan Sahi'
  },
  {
    name: 'Rajput_Sarkar.mp3',
    title: 'hm h rajput sarkar',
    artist: 'Vikrant Thakur'
  }
];

let songIndex = 0;

function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = `songs/${song.name}`;
}

function playSong() {
  audio.play();
  playBtn.innerText = '⏸️';
}

function pauseSong() {
  audio.pause();
  playBtn.innerText = '▶️';
}

playBtn.addEventListener('click', () => {
  if (audio.paused) playSong();
  else pauseSong();
});

prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

nextBtn.addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  let progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

songs.forEach((song, index) => {
  let div = document.createElement('div');
  div.innerText = `${song.title} - ${song.artist}`;
  div.addEventListener('click', () => {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
  });
  playlistDiv.appendChild(div);
});

audio.addEventListener('ended', () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
});

loadSong(songs[songIndex]);

