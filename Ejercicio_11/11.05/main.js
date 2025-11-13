const quizContainer = document.getElementById('quiz-container');
const startBtn = document.getElementById('start-btn');
const resultsSummary = document.getElementById('results-summary');
const alertArea = document.getElementById('alert-area');

let questions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];

function showAlert(type, message, timeout=4000){
  alertArea.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
  if(timeout){
    setTimeout(() => {
      const alertEl = bootstrap.Alert.getOrCreateInstance(alertArea.querySelector('.alert'));
      try{ alertEl.close(); } catch(e){}
    }, timeout);
  }
}

function loadQuestions(){
  fetch('questions.json')
    .then(res => {
      if(!res.ok) throw new Error('Error al cargar questions.json');
      return res.json();
    })
    .then(data => {
      questions = data;
      currentIndex = 0;
      score = 0;
      userAnswers = [];
      renderQuestion();
    })
    .catch(err => {
      console.error(err);
      showAlert('danger','No se pudieron cargar las preguntas.');
    });
}

function renderQuestion(){
  if(currentIndex >= questions.length){
    showResults();
    return;
  }

  const q = questions[currentIndex];
  quizContainer.innerHTML = `
    <h5>${q.text}</h5>
    <form id="question-form" class="mt-3 text-start">
      ${q.options.map(opt => `
        <div class="form-check mb-2">
          <input class="form-check-input" type="radio" name="answer" id="${opt.id}" value="${opt.id}">
          <label class="form-check-label" for="${opt.id}">${opt.text}</label>
        </div>
      `).join('')}
      <button type="submit" class="btn btn-success mt-3">${currentIndex === questions.length-1 ? 'Finalizar' : 'Siguiente'}</button>
    </form>
  `;

  const form = document.getElementById('question-form');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const selected = form.answer.value;
    if(!selected){
      showAlert('warning','Selecciona una respuesta antes de continuar.');
      return;
    }

    userAnswers.push({questionId: q.questionId, selected, correct: q.correctAnswer, explanation: q.explanation});
    if(selected === q.correctAnswer) score++;

    currentIndex++;
    renderQuestion();
  });
}

function showResults(){
  quizContainer.style.display = 'none';
  let html = `<h5>Resultados</h5>
              <p>Tu puntuación: ${score} / ${questions.length}</p>
              <div class="mt-3">`;

  userAnswers.forEach(a => {
    if(a.selected !== a.correct){
      html += `<p><strong>${a.questionId}:</strong> Respuesta incorrecta. ${a.explanation}</p>`;
    }
  });
  html += '</div>';
  resultsSummary.innerHTML = html;
}

startBtn.addEventListener('click', () => {
  loadQuestions();
});