// This is the final, corrected script for your website.

document.addEventListener('DOMContentLoaded', () => {
    // Initialization code that should run once on the initial page load
    const typed = new Typed('#animated-text', {
        strings: ['Front-End Developer', 'React.js Enthusiast', 'UI/UX Learner'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });

    AOS.init({
        duration: 1000,
        once: true
    });

    // Mobile Menu Toggle logic
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navLinks.classList.toggle('active');
                menuToggle.classList.toggle('active');
            }
        });
    }

    // Contact Form Submission logic
    const contactForm = document.getElementById('contact-form');
    const statusMessage = document.getElementById('status-message');

    // Function to reset the form and status message
    function resetFormState() {
        if (contactForm) {
            contactForm.reset();
        }
        if (statusMessage) {
            statusMessage.textContent = '';
            statusMessage.style.display = 'none';
            statusMessage.className = 'status-message';
        }
    }

    // Use pageshow to ensure the reset happens when navigating back (BFcache)
    window.addEventListener('pageshow', (event) => {
        // The event.persisted property is true if the page is restored from BFcache
        if (event.persisted) {
            resetFormState();
        }
    });

    // Also call the reset function on initial load
    resetFormState();

    if (contactForm) {
        const submitBtn = document.getElementById('submit-btn');

        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending...';
            submitBtn.disabled = true;

            statusMessage.style.display = 'none';
            statusMessage.textContent = '';
            statusMessage.className = 'status-message';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.ok) {
                        statusMessage.textContent = '✅ Thank you! Your message has been sent successfully.';
                        statusMessage.classList.add('success');
                        statusMessage.style.display = 'block';
                    } else {
                        throw new Error(result.message || 'Form submission failed.');
                    }
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                statusMessage.textContent = '❌ Sorry, there was an error sending your message. Please try again.';
                statusMessage.classList.add('error');
                statusMessage.style.display = 'block';
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});