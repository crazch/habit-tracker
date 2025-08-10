const timerBox = document.getElementById("output");
const infoBox1 = document.getElementById("info1");
const infoBox2 = document.getElementById("info2");

// Setup function for minutes, sessions and break minutes
const sessionManager = (totalSession, totalMinutes, breakMinutes) => {
  currentSession = 1;

  const startSession = () => {
    console.log("CURRENT SESSION: " + currentSession);
    if (currentSession > totalSession) {
      console.log("ALL SESSION DONE!");
      return;
    }

    console.log("STARTING SESSION: " + currentSession);
    pomodoro(totalMinutes, () => {
      console.log("Work session finished, starting break...");
      sessionBreak(breakMinutes, () => {
        currentSession++;
        startSession();
      });
    });
  };
  startSession();
};

// This function calculate time
const pomodoro = (timeInMinutes, onComplete) => {
  let totalSeconds = timeInMinutes * 60;

  const timerInterval = setInterval(() => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format minutes and seconds to always have two digits
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    timerBox.textContent = `${formattedMinutes}:${formattedSeconds}`;

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      timerBox.textContent = "00:00";
      onComplete();
    }
    totalSeconds--;
  }, 1000);
};

// This function responsible for short break timer after each session
const sessionBreak = (breakMinutes, onComplete) => {
  let totalSeconds = breakMinutes * 60;

  const timerInterval = setInterval(() => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    timerBox.textContent = `${formattedMinutes}:${formattedSeconds}`;

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      timerBox.textContent = "00:00";
      onComplete();
    }
    totalSeconds--;
  }, 1000);
};