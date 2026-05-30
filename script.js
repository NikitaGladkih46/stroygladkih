document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('jobForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function(event) {
//Отменяем стандартную перезагрузку страницы при отправке
        event.preventDefault();

//Собираем данные из полей (пригодится для отправки на бэкенд в будущем)
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const experience = document.getElementById('experience').value.trim();

//Простая валидация
        if (name === '' || phone === '') {
            showMessage('Пожалуйста, заполните обязательные поля.', 'error');
            return;
        }

// Имитируем отправку на сервер
        formMessage.classList.remove('hidden');
        formMessage.textContent = 'Отправка заявки...';
        formMessage.className = 'success'; // Временный класс для статуса

        setTimeout(() => {
//Здесь можно настроить реальную отправку, например через Fetch API на email или в Telegram
            
//Выводим красивый ответ пользователю
            showMessage(`Спасибо, ${name}! Ваша заявка успешно отправлена. Андрей Сергеевич свяжется с вами в ближайшее время.`, 'success');
            
//Сбрасываем форму
            form.reset();
        }, 1500);
    });

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = type; // добавляет класс 'success' или 'error'
        formMessage.classList.remove('hidden');
    }
});
