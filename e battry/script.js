document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the default form submission

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const location = document.getElementById('location').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (!name || !email || !location || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Additional validation for email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        alert('Thank you, ' + name + '! Your request has been submitted successfully.');
        
        // Optionally, reset the form
        form.reset();
    });
});
