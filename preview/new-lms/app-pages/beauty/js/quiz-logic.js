
import { get, post } from './api-client.js';
// import  './toast.js';
(function () {
    function injectContainer() {
      var el = document.getElementById('toast-container');
      if (!el) {
        el = document.createElement('div');
        el.id = 'toast-container';
        el.className = 'fixed top-5 right-5 z-50 space-y-3';
        document.body.appendChild(el);
      }
      return el;
    }
  
    function getBgClass(type) {
      if (type === 'primary') return 'bg-indigo-300 text-black';
      if (type === 'secondary') return 'bg-purple-200 text-black';
      if (type === 'info') return 'bg-blue-200 text-black';
      if (type === 'success') return 'bg-green-100 text-black';
      if (type === 'warning') return 'bg-yellow-300 text-black';
      if (type === 'danger') return 'bg-red-500 text-white';
      return 'bg-gray-200 text-black';
    }
  
    function getRemixCloseIcon() {
      var icon = document.createElement('i');
      icon.className = 'ri-close-line text-xl';
      return icon;
    }
  
    function createCloseButton(toast) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ml-auto hover:opacity-50 rotate-0 hover:rotate-180 transition-all duration-300';
      btn.appendChild(getRemixCloseIcon());
      btn.onclick = function () {
        toast.remove();
      };
      return btn;
    }
  
    function showToastTailwind(message, type) {
      var container = injectContainer();
      var toast = document.createElement('div');
      toast.className = 'flex items-center rounded p-3 shadow-md ' + getBgClass(type);
      toast.style.animation = 'fadeInOut 4s ease forwards';
  
      var text = document.createElement('span');
      text.className = 'pr-2';
      text.textContent = message;
  
      toast.appendChild(text);
      toast.appendChild(createCloseButton(toast));
      container.appendChild(toast);
  
      setTimeout(function () {
        if (toast && toast.parentNode) {
          toast.remove();
        }
      }, 4000);
    }
  
    window.showToast = showToastTailwind;
  })();
  

function getContentIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("contentId");
}

async function loadQuiz() {
    const contentId = getContentIdFromUrl();
    if (!contentId) {
        showToast('Quiz ID missing in URL', 'danger');
        return;
    }

    try {
        const quizData = await get(`/test/details/content/${contentId}`);
        if (!quizData.questions || quizData.questions.length === 0) {
            showToast('No questions found for this quiz.', 'warning');
            return;
        }

        window.quizState = {
            questions: quizData.questions,
            currentIndex: 0,
            answers: []
        };

        renderCurrentQuestion();
    } catch (err) {
        console.error('Error loading quiz:', err);
        showToast('Failed to load quiz. Please try again later.', 'danger');
    }
}

function renderCurrentQuestion() {
    const container = document.getElementById('quiz-container');
    const { questions, currentIndex } = window.quizState;
    const question = questions[currentIndex];

    container.innerHTML = `
        <div class="border border-black/10 dark:border-white/10 rounded-md">
            <h2 class="text-sm p-4 bg-lightwhite dark:bg-white/5 font-semibold mb-2 block">
                Question ${currentIndex + 1} of ${questions.length}
            </h2>
            <div class="p-5">
                <p class="text-base mb-4">${question.question_text}</p>
                <div class="grid grid-cols-1 gap-3">
                    ${question.options.map((opt, i) => `
                        <label class="inline-flex">
                            <input type="radio" name="question-${question._id}" value="${opt}" class="form-radio peer text-indigo-300">
                            <span class="ml-2 peer-checked:text-indigo-300">${opt}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
        </div>
        <div class="mt-7 flex justify-between gap-4">
            <button type="button" class="btn border bg-indigo-300" onclick="prevQuestion()" ${currentIndex === 0 ? 'disabled' : ''}>Previous</button>
            <button type="button" class="btn border bg-indigo-300" onclick="nextQuestion()">Next</button>
        </div>
    `;
}

function prevQuestion() {
    if (window.quizState.currentIndex > 0) {
        saveAnswer();
        window.quizState.currentIndex -= 1;
        renderCurrentQuestion();
    }
}

function nextQuestion() {
    saveAnswer();
    if (window.quizState.currentIndex < window.quizState.questions.length - 1) {
        window.quizState.currentIndex += 1;
        renderCurrentQuestion();
    } else {
        renderSubmitButton();
    }
}

function saveAnswer() {
    const currentQ = window.quizState.questions[window.quizState.currentIndex];
    const selected = document.querySelector(`input[name="question-${currentQ._id}"]:checked`);
    if (selected) {
        const existing = window.quizState.answers.find(a => a.question_id === currentQ._id);
        if (existing) {
            existing.answer = selected.value;
        } else {
            window.quizState.answers.push({ question_id: currentQ._id, answer: selected.value });
        }
    }
}

function renderSubmitButton() {
    const container = document.getElementById('quiz-container');
    container.innerHTML += `
        <div class="mt-7 flex justify-end gap-4">
            <button type="button" class="btn border bg-green-500 text-white" onclick="submitQuiz()">Submit Quiz</button>
        </div>
    `;
}

async function submitQuiz() {
    saveAnswer();
    const contentId = getContentIdFromUrl();

    try {
        const response = await post(`/quiz/${contentId}/submit`, {
            answers: window.quizState.answers
        });

        showToast('Quiz submitted successfully.', 'success');
        console.log('Submission response:', response);
        // You can redirect or display results here
    } catch (err) {
        console.error('Error submitting quiz:', err);
        showToast('Failed to submit quiz.', 'danger');
    }
}

window.addEventListener('DOMContentLoaded', loadQuiz);
