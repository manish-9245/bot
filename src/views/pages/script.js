// Navigation
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Modal Functionality
const signupModal = document.getElementById('signupModal');
const loginModal = document.getElementById('loginModal');
const openSignupModalButtons = document.querySelectorAll('#openSignupModal, #openSignupModalMobile, #getStartedButton, #chooseStarterPlan, #chooseProPlan, #contactUsPlan, #callToActionSignup');
const openLoginModalButtons = document.querySelectorAll('#openLoginModal, #openLoginModalMobile');
const closeSignupModalButton = document.getElementById('closeSignupModal');
const closeLoginModalButton = document.getElementById('closeLoginModal');

function openModal(modal) {
    modal.style.display = 'flex';
    // Prevent scrolling of the background when the modal is open
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    // Allow scrolling of the background again
    document.body.style.overflow = 'auto';
}

openSignupModalButtons.forEach(button => {
    button.addEventListener('click', () => openModal(signupModal));
});

openLoginModalButtons.forEach(button => {
    button.addEventListener('click', () => openModal(loginModal));
});

if (closeSignupModalButton) {
    closeSignupModalButton.addEventListener('click', () => closeModal(signupModal));
}
if (closeLoginModalButton) {
    closeLoginModalButton.addEventListener('click', () => closeModal(loginModal));
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === signupModal) {
        closeModal(signupModal);
    }
    if (event.target === loginModal) {
        closeModal(loginModal);
    }
});

// Google Sign-In
window.onload = function () {
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Google Client ID
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById('googleSignIn'),
        { theme: 'outline', size: 'large' }
    );
};

function handleCredentialResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    // Handle the Google token (send to backend for verification)
    closeModal(loginModal); // Close login modal after successful login
    alert('Login Successful (Mock)'); // Replace with actual logic
}

// Signup Form Submission (Mock)
const signupButton = document.getElementById('signupBtn');
if (signupButton) {
    signupButton.addEventListener('click', () => {
        const data = {
            fullName: document.getElementById('fullName').value,
            whatsapp: document.getElementById('whatsapp').value,
            place: document.getElementById('place').value,
            email: document.getElementById('email').value,
            childEmails: [
                document.getElementById('child1').value,
                document.getElementById('child2').value,
                document.getElementById('child3').value
            ].filter(email => email)
        };
        console.log('Signup Data:', data);
        // Send data to backend API
        closeModal(signupModal); // Close signup modal after submission
        alert('Signup Successful (Mock)'); // Replace with actual logic
    });
}