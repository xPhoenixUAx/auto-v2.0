document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".question").addEventListener("click", () => {
    const answer = item.querySelector(".answer");
    const toggleBtn = item.querySelector(".toggle-btn");

    // Toggle the answer visibility
    if (answer.style.display === "block") {
      answer.style.display = "none";
      toggleBtn.textContent = "+";
    } else {
      answer.style.display = "block";
      toggleBtn.textContent = "-";
    }
  });
});
