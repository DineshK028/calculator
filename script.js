document.getElementById('ageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const dob = new Date(document.getElementById('dob').value);
    const today = new Date();

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (months < 0) {
        years--;
        months += 12;
    }

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    const result = `You are ${years} years, ${months} months, and ${days} days old.`;
    document.getElementById('result').innerText = result;
});

// Reset the result when the reset button is clicked
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('result').innerText = '';
});
