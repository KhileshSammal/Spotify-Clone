// app.js

// Import the initializePlaylist function from the playlist module
import { initializePlaylist } from './playlist';

document.addEventListener('DOMContentLoaded', function () {
  const audioPlayer = document.getElementById('audio-player');
  const playPauseButton = document.getElementById('play-pause');
  const songTitle = document.getElementById('song-title');
  const playlist = document.getElementById('playlist');

  let isPlaying = false;

  playPauseButton.addEventListener('click', function () {
    if (isPlaying) {
      audioPlayer.pause();
      playPauseButton.innerText = 'Play';
    } else {
      audioPlayer.play();
      playPauseButton.innerText = 'Pause';
    }

    isPlaying = !isPlaying;
  });

  // Update the song title when a new song starts
  audioPlayer.addEventListener('play', function () {
    songTitle.innerText = audioPlayer.getAttribute('data-title') || 'Sample Song';
  });

  // Play a song when a playlist item is clicked
  playlist.addEventListener('click', function (event) {
    const listItem = event.target.closest('li');
    if (listItem) {
      const songSrc = listItem.getAttribute('data-src');
      const songTitle = listItem.innerText;

      audioPlayer.src = songSrc;
      audioPlayer.setAttribute('data-title', songTitle);
      audioPlayer.play();

      // Highlight the selected playlist item
      Array.from(playlist.children).forEach(item => {
        item.classList.remove('active');
      });
      listItem.classList.add('active');
    }
  });

  // Initialize the playlist when the DOM is loaded
  initializePlaylist();
});
