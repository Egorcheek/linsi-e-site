const btn = document.getElementById("playBtn");
const music = document.getElementById("bgMusic");

let playing = false;

btn.addEventListener("click", () => {
    if (!playing) {
        music.play()
            .then(() => {
                btn.textContent = "⏸";
                playing = true;
            })
            .catch(err => {
                console.log("Не удалось воспроизвести:", err);
            });
    } else {
        music.pause();
        btn.textContent = "▶";
        playing = false;
    }
});
