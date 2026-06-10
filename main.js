document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('oil-enquiry-form');
    const formSuccess = document.getElementById('form-success');
    const resetBtn = document.getElementById('reset-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Add timestamp
            data.timestamp = new Date().toISOString();

            // Store locally (backup)
            saveSubmission(data);

            // Send to Formspree
            fetch("https://formspree.io/f/ricoil.ltd@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // Show success message
                    contactForm.classList.add('hidden');
                    formSuccess.classList.remove('hidden');
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert("Oops! There was a problem submitting your form. Please try again or contact us via phone.");
                        }
                    })
                }
            }).catch(error => {
                alert("Oops! There was a problem submitting your form. Please check your connection and try again.");
            });

            console.log('Form submission initiated:', data);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            contactForm.reset();
            contactForm.classList.remove('hidden');
            formSuccess.classList.add('hidden');
        });
    }
});

/**
 * Saves the form submission to localStorage
 * @param {Object} data 
 */
function saveSubmission(data) {
    let submissions = JSON.parse(localStorage.getItem('ricoil_enquiries') || '[]');
    submissions.push(data);
    localStorage.setItem('ricoil_enquiries', JSON.stringify(submissions));
}
