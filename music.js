window.addEventListener("load", function() {
    var audio = document.getElementById("myAudio");
    var icon = document.getElementById("music-icon");

    var savedTime = localStorage.getItem('audioTime');
    var isPlaying = localStorage.getItem('audioPlaying');

    if (savedTime) {
        audio.currentTime = savedTime;
    }

    if (isPlaying === "true") {
        audio.play().then(() => {
            icon.innerHTML = "🔊";
        }).catch(error => {
            const trigger = () => {
                audio.play();
                icon.innerHTML = "🔊";
                document.removeEventListener('click', trigger);
                document.removeEventListener('touchstart', trigger);
            };
            document.addEventListener('click', trigger);
            document.addEventListener('touchstart', trigger);
        });
    }

    audio.ontimeupdate = function() {
        localStorage.setItem('audioTime', audio.currentTime);
    };
    audio.onplay = function() { localStorage.setItem('audioPlaying', 'true'); };
    audio.onpause = function() { localStorage.setItem('audioPlaying', 'false'); };
});

function toggleMusic() {
    var audio = document.getElementById("myAudio");
    var icon = document.getElementById("music-icon");
    if (audio.paused) { 
        audio.play(); 
        icon.innerHTML = "🔊"; 
    } else { 
        audio.pause(); 
        icon.innerHTML = "🔇"; 
    }
}
