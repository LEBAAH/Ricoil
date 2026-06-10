document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('oil-enquiry-form');

    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Add timestamp
            data.timestamp = new Date().toISOString();

            // Store locally (backup)
            saveSubmission(data);

            console.log('Form submission initiated:', data);
            // No preventDefault() here, so it will submit to the form action
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
