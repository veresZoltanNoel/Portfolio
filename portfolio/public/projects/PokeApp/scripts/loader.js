// Add event listener for the 'load' event of the window
window.addEventListener('load', () => {

  const loadingBar = document.querySelector('.loading-bar-progress');
  const loadingBarLabel = document.querySelector('.loading-bar-label');

  let progress = 0;
  const intervalDuration = 100;

  // Capture the start time using performance.now()
  const startTime = performance.now();

  // Set up an interval to update the progress
  const intervalId = setInterval(() => {
    // Calculate the elapsed time since the start
    const elapsedTime = performance.now() - startTime;

    // Calculate the progress as a percentage based on elapsed time
    progress = (elapsedTime / 5000) * 100;

    // Cap the progress at 100 if it exceeds that value
    if (progress >= 100) {
      progress = 100;
    }

    // Update the width and  the text content of the loading  bar element
    loadingBar.style.width = `${progress}%`;
    loadingBarLabel.textContent = `${Math.round(progress)}%`;

    // If progress reaches 100 or more, clear the interval and hide the loading screen
    if (progress >= 100) {
      clearInterval(intervalId);

      // Set a timeout to hide the loading screen after .5 second
      setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.display = 'none';
      }, 500);
    }
  }, intervalDuration);
});
