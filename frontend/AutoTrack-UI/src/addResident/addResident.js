const form = document.getElementById("residentForm");
const cancelBtn = document.getElementById("cancelBtn");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    // 🔹 Replace this URL with your backend API endpoint
    const response = await fetch("http://localhost:8080/api/residents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      form.reset();
      message.style.color = "green";
      message.textContent = "✅ Data saved successfully!";
    } else {
      message.style.color = "red";
      message.textContent = "❌ Failed to save data!";
    }
  } catch (error) {
    message.style.color = "red";
    message.textContent = "⚠️ Error connecting to server!";
  }
});

// 🔹 Cancel button → reset form + clear message
cancelBtn.addEventListener("click", () => {
  form.reset();
  message.textContent = "";
});
