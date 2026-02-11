// contact.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const nomInput = form.elements['nom'];
    const emailInput = form.elements['email'];
    const messageInput = form.elements['message'];
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Empêche l'envoi classique pour tester ici

        // Validation simple
        if(nomInput.value.trim().length < 2) {
            alert('Veuillez entrer un nom valide (au moins 2 caractères).');
            nomInput.focus();
            return;
        }

        if(!validateEmail(emailInput.value)) {
            alert('Veuillez entrer une adresse email valide.');
            emailInput.focus();
            return;
        }

        if(messageInput.value.trim().length < 5) {
            alert('Veuillez entrer un message plus long (au moins 5 caractères).');
            messageInput.focus();
            return;
        }

        // Si tout est ok : simulateur d'envoi
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';

        setTimeout(() => {
            alert('Merci pour votre message ! Je vous répondrai dès que possible.');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer';
        }, 1500);
    });

    // Validation email simple regex
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    // Effet bouton au clic
    submitBtn.addEventListener('mousedown', () => {
        submitBtn.style.transform = 'scale(0.95)';
    });

    submitBtn.addEventListener('mouseup', () => {
        submitBtn.style.transform = 'scale(1)';
    });

    submitBtn.addEventListener('mouseleave', () => {
        submitBtn.style.transform = 'scale(1)';
    });
});
