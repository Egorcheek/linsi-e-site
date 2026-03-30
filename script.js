const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const nameEl = document.getElementById("track-name");
const timeEl = document.getElementById("time");

const content = document.getElementById("page-content");
const titleEl = document.getElementById("page-title");

let tracks = [];
let current = 0;

// загрузка треков
fetch('tracks.json')
  .then(res => res.json())
  .then(data => {
    tracks = data;

    if (tracks.length > 0) {
        loadTrack(0);
    } else {
        audio.src = "assets/music.mp3";
        nameEl.textContent = "music.mp3";
    }
  });

// загрузка трека
function loadTrack(i) {
    current = i;
    audio.src = tracks[i].file;
    nameEl.innerHTML = `<span>${tracks[i].title}</span>`;

// проверка на переполнение
setTimeout(() => {
    if (nameEl.scrollWidth > nameEl.clientWidth) {
        nameEl.classList.add("scrolling");
    } else {
        nameEl.classList.remove("scrolling");
    }
}, 100);
}

// play
playBtn.onclick = () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "❚❚"; // пауза
    } else {
        audio.pause();
        playBtn.textContent = "▶"; // плей
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

    timeEl.textContent =
        format(audio.currentTime) + " / " + format(audio.duration);
};

function format(t) {
    if (!t) return "0:00";
    let m = Math.floor(t / 60);
    let s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

// перемотка
progress.oninput = () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
};

// громкость
volume.value = 0.75;
audio.volume = 0.75;

volume.oninput = () => {
    audio.volume = volume.value;
};

// -------- НАВИГАЦИЯ --------

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();
        loadPage(this.dataset.page);
    });
});

function loadPage(page) {

    if (page === "home") {
        titleEl.textContent = "home";

        content.innerHTML = `
            <div class="profile">
                <img src="assets/avatar.jpg">
                <div class="updates">
                    <div class="updates-title">Last updates:</div>
                    <div class="updates-list"></div>
                </div>
            </div>

            <div class="welcome">
                Привет! Добро пожаловать!
            </div>

            <div class="footer">
                <div class="counter">
                    <img src="https://hitwebcounter.com/counter/counter.php?page=21484535&style=0024&nbdigits=5&type=page&initCount=0">
                </div>
                <div class="song">
                    song of the day: ...
                </div>
            </div>
        `;

        // Загружаем последние обновления
        fetch('updates.json')
            .then(res => res.json())
            .then(updates => {
                const list = document.querySelector('.updates-list');
                updates.forEach(item => {
                    const el = document.createElement('p');
                    el.textContent = item.text;
                    list.appendChild(el);
                });
            });
    }

    if (page === "blog") {
        titleEl.textContent = "blog";

        fetch('posts.json')
          .then(res => res.json())
          .then(posts => {

            content.innerHTML = `<div class="posts"></div>`;
            const container = document.querySelector('.posts');

            posts.forEach(post => {
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
    titleEl.textContent = "music";

    fetch('tracks.json')
      .then(res => res.json())
      .then(list => {

        content.innerHTML = `<div class="music-list"></div>`;
        const container = document.querySelector(".music-list");

        list.forEach((track, i) => {

            const el = document.createElement("div");
            el.className = "track";

            el.innerHTML = `
                <img src="${track.cover}">
                <div class="track-info">
                    <span class="track-title">${track.title}</span>
                    <span class="track-duration">--:--</span>
                </div>
            `;

            // длительность
            const tempAudio = new Audio(track.file);
            tempAudio.onloadedmetadata = () => {
                const dur = format(tempAudio.duration);
                el.querySelector(".track-duration").textContent = dur;
            };

            el.onclick = () => {
                loadTrack(i);
                audio.play();
                playBtn.textContent = "❚❚"; // ← ОБЯЗАТЕЛЬНО
            };

            container.appendChild(el);
        });

      });
}

    if (page === "links") {
        titleEl.textContent = "links";

        content.innerHTML = `
            <div class="links">
                <a href="https://t.me/LINSIdotE" target="_blank">telegram</a>                
                <a href="#" target="_blank">soundcloud</a>
                <a href="#" target="_blank">youtube</a>
            </div>
        `;
    }

}

// старт
loadPage("home");
