window.addEventListener('load', () => {
    const loadingBar = document.querySelector('.loading-bar-progress');
    const loadingBarLabel = document.querySelector('.loading-bar-label');
    let progress = 0;
    const increment = 100 / 50; // Fill the loading bar evenly in 50 steps
    const intervalDuration = 100; // Adjust this value to control the smoothness of the animation

    const startTime = performance.now();
    const intervalId = setInterval(() => {
      const elapsedTime = performance.now() - startTime;
      progress = (elapsedTime / 5000) * 100; // Fill the bar in 5 seconds
      if (progress >= 100) {
        progress = 100; // Set progress to 100 to ensure it doesn't exceed 100%
      }
      loadingBar.style.width = `${progress}%`;
      loadingBarLabel.textContent = `${Math.round(progress)}%`;

      if (progress >= 100) {
        clearInterval(intervalId);
        setTimeout(() => {
          const loadingScreen = document.getElementById('loading-screen');
          loadingScreen.style.display = 'none';
        }, 1000); // Delay hiding the loading screen for 1 second
      }
    }, intervalDuration); // Repeat the interval every intervalDuration milliseconds
  });
