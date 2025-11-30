document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("rchatToggleBtn");
    const rchatContainer = document.getElementById("rchatContainer");
    const closeBtn = document.getElementById("rchatCloseBtn");
    const sendBtn = document.getElementById("rchatSendBtn");
    const inputField = document.getElementById("rchatInput");
    const messagesContainer = document.getElementById("rchatMessages");

    // Toggle chatbot visibility
    toggleBtn.addEventListener("click", function () {
        console.log("Toggle button clicked");  // Debugging
        rchatContainer.classList.add("active");
        toggleBtn.style.display = "none"; // Hide button
    });

    closeBtn.addEventListener("click", function () {
        console.log("Close button clicked");  // Debugging
        rchatContainer.classList.remove("active");
        toggleBtn.style.display = "block"; // Show button
    });

    // Send message to Flask backend
    sendBtn.addEventListener("click", function () {
        const userMessage = inputField.value.trim();
        if (!userMessage) {
            console.log("No message entered");  // Debugging
            return;
        }

        console.log("User message:", userMessage);  // Debugging

        // Display user message
        const userDiv = document.createElement("div");
        userDiv.textContent = "You: " + userMessage;
        messagesContainer.appendChild(userDiv);

        // Send request to Flask backend
        fetch("/rchat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: userMessage }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Bot response:", data.response);  // Debugging

            // Display bot response
            const botDiv = document.createElement("div");
            botDiv.textContent = "Bot: " + data.response;
            messagesContainer.appendChild(botDiv);
        })
        .catch(error => {
            console.error("Error:", error);
        });

        // Clear input
        inputField.value = "";
    });
});
