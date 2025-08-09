const timerBox = document.getElementById("output");
const infoBox1 = document.getElementById("info1");

// This function calculate time
const pomodoro = timeInMinutes => {
    totalSeconds = timeInMinutes * 60;

    const timerInterval = setInterval(() => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        // Format minutes and seconds to always have two digits
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

        timerBox.textContent = `${formattedMinutes}:${formattedSeconds}`;

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerBox.textContent = "00:00";
            infoBox1.textContent = `SESSION: ${pomodoroSession - 1}`
            sessionManager();
        }
        totalSeconds--;
    }, 1000);
};

const sessionManager = (session, minutes) => {
    infoBox1.textContent = "SESSION: " + session;
    session--;

    if (session >= 0) {
        pomodoro(minutes);
    } else {
        console.log("Pomodoro Finished!");
    }
};

// TODO: ADD SESSION BREAKS