document.getElementById("start-button").addEventListener("click", () => {
    const sessions = parseInt(document.getElementById("totalSessions").value, 10);
    const workTime = parseInt(document.getElementById("workMinutes").value, 10);
    const breakTime = parseInt(document.getElementById("breakMinutes").value, 10);

    sessionManager(
        sessions,
        workTime,
        breakTime,
        (timerFormat, isBreak) => {
            document.getElementById("timer").textContent =
            (isBreak ? "Break: " : "Work: ") + timerFormat;
            // ADD LATER
        }
    );
});