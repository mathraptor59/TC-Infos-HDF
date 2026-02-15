document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const statusDiv = document.getElementById('form-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // stop envoi classique

        const nom = form.elements['nom'].value.trim();
        const email = form.elements['email'].value.trim();
        const message = form.elements['message'].value.trim();

        if(nom.length < 2) { statusDiv.textContent = 'Veuillez entrer un nom valide.'; return; }
        if(!validateEmail(email)) { statusDiv.textContent = 'Veuillez entrer un email valide.'; return; }
        if(message.length < 5) { statusDiv.textContent = 'Veuillez entrer un message plus long.'; return; }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        statusDiv.textContent = '';

        fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    statusDiv.textContent = 'Merci ! Votre message a été envoyé.';
                    form.reset();
                } else {
                    statusDiv.style.color = 'red';
                    statusDiv.textContent = 'Oups, une erreur est survenue. Réessayez.';
                }
            })
            .catch(err => {
                statusDiv.style.color = 'red';
                statusDiv.textContent = 'Oups, une erreur est survenue. Réessayez.';
                console.error(err);
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            });
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }
});
