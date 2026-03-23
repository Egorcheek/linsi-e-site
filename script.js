const btn = document.getElementById("playBtn");
const music = document.getElementById("bgMusic");

let playing = false;

btn.addEventListener("click", () => {
    if (!playing) {
        music.play();
        btn.textContent = "⏸";
    } else {
        music.pause();
        btn.textContent = "▶";
    }
    playing = !playing;
});
