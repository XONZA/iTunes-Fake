export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player'),
          videoButttonPlay = document.querySelector('.video-button__play'),
          videoButtonStop = document.querySelector('.video-button__stop'),
          videoProgress = document.querySelector('.video-progress'),
          videoTimePassed = document.querySelector('.video-time__passed'),
          videoTimeTotal = document.querySelector('.video-time__total');

    const videoFullscreen = document.querySelector('.video-fullscreen');
    const videoVolume = document.querySelector('.video-volume');


        
    const toggleIcon = () => {
        if (videoPlayer.paused){
            videoButttonPlay.classList.remove('fa-pause');
            videoButttonPlay.classList.add('fa-play');
        } else {
            videoButttonPlay.classList.add('fa-pause');
            videoButttonPlay.classList.remove('fa-play');
        }
    };

    const togglePlay = () => {
        if(videoPlayer.paused){
            videoPlayer.play();
        }
        else{
            videoPlayer.pause();
        }

        toggleIcon();
    };

    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    const addZero = n => n < 10 ? '0' + n : n;


    videoPlayer.addEventListener('click', togglePlay);
    videoButttonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);



    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed);
        videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal);
    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();

    });
    
    videoPlayer.addEventListener('fullscreenchange', () => {
        videoVolume.value = videoPlayer.volume * 100;
        console.log(videoPlayer.volume);
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });

    videoPlayerInit.stop = () => {
        if (!videoPlayer.paused){
            stopPlay();
        }
    };
}