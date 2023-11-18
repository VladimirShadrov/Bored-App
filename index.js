const URL = 'http://www.boredapi.com/api/activity/';
const $title = document.querySelector('.js-title');
const $activityText = document.querySelector('.js-activity-text');
const $btn = document.querySelector('.js-action-btn');
const $loader = document.querySelector('.js-loader');
const activityTitleText = 'Ура, теперь не скучно 🔥';
const defaultTitleText = '🤔 Стало скучно?';
const activityGradient = 'linear-gradient(180deg, rgba(0, 176, 28, 0.2) 24.48%, rgba(255, 255, 255, 0) 100%)';
const defaultGradient = 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.20) 47.62%)';
const boredText = 'Найти, чем заняться';
let timeout = null;
let isTaskReceived = false;
const loaderActiveClass = 'loader-container-active';

$btn.addEventListener('click', getActivity);

/**
 * Получение данных с сервера
 */
async function getActivity() {
  if (timeout) {
    clearTimeout(timeout);
  }

  try {
    $btn.disabled = true;
    showLoader();
    const response = await fetch(URL);

    if (response.ok) {
      const data = await response.json();
      hideloader();
      updateContent(data.activity);
      $btn.disabled = false;
    }

    timeout = setTimeout(() => {
      boredAgain();
    }, 3000);
  } catch (error) {
    throw new Error(`Ошибка запроса: ${error}`);
  }
}

/**
 * Обновляет контент
 * @param {String} text - Текст, полученный с сервера
 */
function updateContent(text) {
  if (!isTaskReceived) {
    changeText($title, activityTitleText);
    setGradient(document.body, activityGradient);

    isTaskReceived = true;
  }

  changeText($activityText, text);
}

/**
 * Заменяет текст у элемента
 * @param {HTMLElement} element - Элемент, у которого нужно изменить текст
 * @param {String} text - Текст для элемента
 */
function changeText(element, text) {
  element.innerText = text;
}

/**
 * Изменяет градиент у элемента
 * @param {HTMLElement} element - Элемент, у которого нужно изменить градиент
 * @param {String} gradient - Значение градиента
 */
function setGradient(element, gradient) {
  element.style.background = gradient;
}

/**
 * Возвращает контент к исходному состоянию
 */
function boredAgain() {
  isTaskReceived = false;

  changeText($activityText, boredText);
  changeText($title, defaultTitleText);
  setGradient(document.body, defaultGradient);
}

/**
 * Отображает лоадер
 */
function showLoader() {
  $loader.classList.add(loaderActiveClass);
}

/**
 * Скрывает лоадер
 */
function hideloader() {
  $loader.classList.remove(loaderActiveClass);
}
