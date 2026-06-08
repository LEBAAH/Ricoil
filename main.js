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

            // Store locally (demonstration)
            saveSubmission(data);

            // Show success message
            contactForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');

            console.log('Form submitted successfully:', data);
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
