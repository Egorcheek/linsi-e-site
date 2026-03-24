// ---------- ПЛЕЕР ----------
let tracks = [];
let current = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const nameEl = document.getElementById("track-name");

// загрузка треков
fetch('tracks.json')
  .then(res => res.json())
  .then(data => {
    tracks = data;

    // если нет tracks.json — fallback
    if (!tracks.length) {
        audio.src = "assets/music.mp3";
        nameEl.textContent = "music.mp3";
    } else {
        loadTrack(0);
    }
});

function loadTrack(i) {
    current = i;
    audio.src = tracks[i].file;
    nameEl.textContent = tracks[i].title;

// если длинное — включаем анимацию
    setTimeout(() => {
        if (nameEl.scrollWidth > nameEl.clientWidth) {
            nameEl.classList.add("scrolling");
        } else {
            nameEl.classList.remove("scrolling");
        }
    }, 100);
}

// play/pause
playBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
};

// next
nextBtn.onclick = () => {
    current = (current + 1) % tracks.length;
    loadTrack(current);
    audio.play();
};

// prev
prevBtn.onclick = () => {
    current = (current - 1 + tracks.length) % tracks.length;
    loadTrack(current);
    audio.play();
};

// прогресс
audio.ontimeupdate = () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
};

// перемотка
progress.oninput = () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
};

// громкость
volume.oninput = () => {
    audio.volume = volume.value;
};

const timeEl = document.getElementById("time");

// время
audio.ontimeupdate = () => {
    const current = formatTime(audio.currentTime);
    const total = formatTime(audio.duration);

    timeEl.textContent = `${current} / ${total}`;

    progress.value = (audio.currentTime / audio.duration) * 100 || 0;
};

function formatTime(sec) {
    if (!sec) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

// громкость 75%
audio.volume = 0.75;
volume.value = 0.75;


// ---------- НАВИГАЦИЯ ----------
const content = document.getElementById("page-content");

document.querySelectorAll("nav a").forEach(link => {
    link.onclick = (e) => {
        e.preventDefault();
        loadPage(link.dataset.page);
    };
});

function loadPage(page) {

    if (page === "home") {
        content.innerHTML = `
            <div class="welcome">
                Привет!<br>Добро пожаловать на мой сайт!
            </div>
        `;
    }

    if (page === "blog") {
        fetch('posts.json')
          .then(res => res.json())
          .then(posts => {
            content.innerHTML = `<div class="posts"></div>`;
            const container = document.querySelector('.posts');

            posts.reverse().forEach(post => {
                const el = document.createElement('div');
                el.className = 'post';

                el.innerHTML = `
                    <div class="post-date">${post.date}</div>
                    <div class="post-title">${post.title}</div>
                    <p>${post.text}</p>
                `;

                container.appendChild(el);
            });
          });
    }

    if (page === "music") {
        fetch('tracks.json')
          .then(res => res.json())
          .then(tracks => {

            content.innerHTML = `<div class="music-list"></div>`;
            const list = document.querySelector(".music-list");

            tracks.forEach((track, i) => {
                const el = document.createElement("div");
                el.className = "track";

                el.innerHTML = `
                    <img src="${track.cover}">
                    <span>${track.title}</span>
                `;

                el.onclick = () => {
                    loadTrack(i);
                    audio.play();
                };

                list.appendChild(el);
            });

          });
    }

}

// первая загрузка
loadPage("home");
