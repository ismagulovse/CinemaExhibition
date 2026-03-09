// Форма обратной связи через Web3Forms
const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = feedbackForm.querySelector('.submit-btn');
    const formData = new FormData(feedbackForm);
    formData.append("access_key", "cce09810-f5eb-4df1-ac67-527c37b379a5");

    submitBtn.textContent = "Отправка...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Спасибо! Ваш отзыв отправлен.");
            feedbackForm.reset();
        } else {
            alert("Ошибка: " + data.message);
        }
    } catch (error) {
        alert("Что-то пошло не так. Попробуйте ещё раз.");
    } finally {
        submitBtn.textContent = "Отправить";
        submitBtn.disabled = false;
    }
});