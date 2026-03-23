const btn = document.getElementById("playBtn");
const music = document.getElementById("bgMusic");

let playing = false;

btn.addEventListener("click", () => {
    if (!playing) {
        music.muted = false;
        music.play().catch(err => console.log(err));
        btn.textContent = "⏸";
    } else {
        music.pause();
        btn.textContent = "▶";
    }
    playing = !playing;
});
