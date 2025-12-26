function startQuiz() {
  const username = document.getElementById("name").value.trim();

  if (username === "") {
    alert("Please enter your name");
    return;
  }

  localStorage.setItem("quizUsername", username);
  window.location.href = "quiz.html";
}
