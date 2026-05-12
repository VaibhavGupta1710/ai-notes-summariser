const button = document.getElementById("summarise-btn");
const resultDiv = document.getElementById("result");
const summaryText = document.getElementById("summary-text");

button.addEventListener("click", async () => {
    const notes = document.getElementById("notes-input").value;

    if (!notes) {
        alert("Please paste some notes first!");
        return;
    }

    // Show loading state
    button.innerHTML = `<span class="spinner"></span> Summarising...`;
    button.disabled = true;

    try {
        const response = await fetch("/summarise", { 
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

    // Reset button
    button.innerHTML = "Summarise";
    button.disabled = false;
});
const grammarBtn = document.getElementById("grammar-btn");
const grammarResult = document.getElementById("grammar-result");
const grammarList = document.getElementById("grammar-list");

grammarBtn.addEventListener("click", async () => {
    const notes = document.getElementById("notes-input").value;

    if (!notes) {
        alert("Please paste some notes first!");
        return;
    }

    grammarBtn.innerHTML = `<span class="spinner"></span> Checking...`;
    grammarBtn.disabled = true;

    try {
        const response = await fetch("/check-grammar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: notes })
        });

        const data = await response.json();
        
        if (data.error_count === 0) {
            grammarList.innerHTML = "<p style='color:green'>No grammar issues found!</p>";
        } else {
            grammarList.innerHTML = data.errors.map(error => `
                <div class="error-item">
                    <strong>Issue:</strong> ${error.message} <br>
                    <strong>Suggestions:</strong> ${error.suggestion.length > 0 ? error.suggestion.join(", ") : "No suggestions"}
                </div>
            `).join("");
        }

        grammarResult.classList.remove("hidden");

    } catch (error) {
        alert("Something went wrong. Is the backend running?");
    }

    grammarBtn.innerHTML = "Check Grammar";
    grammarBtn.disabled = false;
});