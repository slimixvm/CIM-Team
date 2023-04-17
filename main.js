document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Replace the following object with your actual user data
            const validUsers = {
                '3rmY@kLS#H0e6': '3rmY@kLS#H0e6',
            };

            if (validUsers[username] && validUsers[username] === password) {
                localStorage.setItem('loggedIn', 'true');
                const returnUrl = localStorage.getItem('returnUrl') || 'index.html';
                localStorage.removeItem('returnUrl');
                window.location.href = returnUrl;
            } else {
                alert('Invalid username or password.');
            }
        });

        // Redirect if already logged in
        redirectIfLoggedIn();
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            logout();
        });
    }

    protectPage();
});

function protectPage() {
    if (localStorage.getItem('loggedIn') !== 'true') {
        localStorage.setItem('returnUrl', window.location.href);
        window.location.href = 'login.html';
    } else {
        document.getElementById('main-content').classList.remove('blur');
    }
    updateLoginStatus();
}

function redirectIfLoggedIn() {
    if (localStorage.getItem('loggedIn') === 'true') {
        const returnUrl = localStorage.getItem('returnUrl') || 'index.html';
        localStorage.removeItem('returnUrl');
        updateLoginStatus();
        window.location.href = returnUrl;
    }
}

function updateLoginStatus() {
    const loginStatus = document.getElementById('login-status');
    if (loginStatus && localStorage.getItem('loggedIn') === 'true') {
        loginStatus.innerHTML = 'Logged in as Cim Representative';
    } else {
        loginStatus.innerHTML = '';
    }
}

function logout() {
    localStorage.removeItem('loggedIn');
    updateLoginStatus();
    protectPage();
}
