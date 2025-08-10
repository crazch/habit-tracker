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

// This function format time to MM:SS
const formattedTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
};

// This function calculate time
const pomodoro = (timeInMinutes, onComplete, onTick) => {
  let totalSeconds = timeInMinutes * 60;

  const timerInterval = setInterval(() => {
    onTick(formattedTime(totalSeconds));

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      //timerBox.textContent = "00:00";
      onComplete();
    }
    totalSeconds--;
  }, 1000);
};

// This function responsible for short break timer after each session
const sessionBreak = (breakMinutes, onComplete, onTick) => {
  let totalSeconds = breakMinutes * 60;

  const timerInterval = setInterval(() => {
    onTick(formattedTime(totalSeconds));

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      timerBox.textContent = "00:00";
      onComplete();
    }
    totalSeconds--;
  }, 1000);
};