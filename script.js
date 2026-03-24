const btn = document.getElementById("playBtn");
const music = document.getElementById("bgMusic");

btn.addEventListener("click", () => {
    if (music.paused) {
        music.play()
            .then(() => {
                btn.textContent = "⏸";
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        music.pause();
        btn.textContent = "▶";
    }
});
