const button = document.getElementById("summarise-btn");
const resultDiv = document.getElementById("result");
const summaryText = document.getElementById("summary-text");

button.addEventListener("click", async () => {
    const notes = document.getElementById("notes-input").value;

    if (!notes) {
        alert("Please paste some notes first!");
        return;
    }

    button.textContent = "Summarising...";
    button.disabled = true;

    try {
        const response = await fetch("http://127.0.0.1:8000/summarise", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: notes })
        });

        const data = await response.json();
        summaryText.textContent = data.summary;
        resultDiv.classList.remove("hidden");

    } catch (error) {
        alert("Something went wrong. Is the backend running?");
    }

    button.textContent = "Summarise";
    button.disabled = false;
});