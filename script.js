document.getElementById("ageForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const dobInput = document.getElementById("dob").value;
    if (!dobInput) return;

    const dob = new Date(dobInput);
    const today = new Date();

    // Years, months, days calculation
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        days += prevMonthDays;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Day of birth
    const weekday = dob.toLocaleString("en-US", { weekday: "long" });

    // Next Birthday
    let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = nextBirthday - today;
    const daysToGo = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const nextBdayWeekday = nextBirthday.toLocaleString("en-US", { weekday: "long" });

    // Output
    const output = `
        <p><strong>Your Age:</strong> ${years} years, ${months} months, ${days} days</p>
        <p><strong>Born on:</strong> ${weekday}</p>
        <p><strong>Next Birthday:</strong> ${nextBdayWeekday}, ${nextBirthday.toDateString()}</p>
        <p><strong>Days Remaining:</strong> ${daysToGo} days</p>
    `;

    const resultBox = document.getElementById("result");
    resultBox.innerHTML = output;
    resultBox.classList.remove("hidden");
    resultBox.classList.add("fade-in");
});

// Reset button clears output
document.getElementById("resetBtn").addEventListener("click", function () {
    const resultBox = document.getElementById("result");
    resultBox.innerHTML = "";
    resultBox.classList.add("hidden");
});
