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

            console.log('Form submission initiated via AJAX:', data);

            // Send to FormSubmit using AJAX
            fetch("https://formsubmit.co/ajax/ricoil.ltd@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === "true" || data.success === true) {
                    // Show success message
                    contactForm.classList.add('hidden');
                    formSuccess.classList.remove('hidden');
                    contactForm.reset();
                } else {
                    alert("Oops! There was a problem submitting your form. Please try again.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Oops! There was a problem submitting your form. Please check your connection and try again.");
            });
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            formSuccess.classList.add('hidden');
            contactForm.classList.remove('hidden');
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
