document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('jobForm');
    const formMessage = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Запрещаем стандартную перезагрузку страницы

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (name === '' || phone === '') {
            showMessage('Пожалуйста, заполните обязательные поля.', 'error');
            return;
        }

        formMessage.classList.remove('hidden');
        formMessage.textContent = 'Отправка данных...';
        formMessage.className = 'success';

// Отправляем данные на Formspree через fetch
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                showMessage(`Спасибо, ${name}! Ваша заявка успешно отправлена. Андрей Сергеевич свяжется с вами в ближайшее время.`, 'success');
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        showMessage(data['errors'].map(error => error['message']).join(", "), 'error');
                    } else {
                        showMessage('Ой! Произошла проблема при отправке формы', 'error');
                    }
                })
            }
        }).catch(error => {
            showMessage('Произошла ошибка сети. Попробуйте позже.', 'error');
        });
    });

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = type;
        formMessage.classList.remove('hidden');
    }
});