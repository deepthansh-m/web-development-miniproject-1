var users = JSON.parse(localStorage.getItem('users')) || [];

users = [
    { username: 'user1', password: 'password1', email: 'user1@example.com', phone: '123' },
    { username: 'Deepthansh M', password: 'Dimpu@2004', email: 'deepthanshm@gmail.com', phone: '7019434002' },
    // add user
];

document.addEventListener("DOMContentLoaded", function () {
    const loadingBar = document.getElementById("loading-bar");
    const mainContainer = document.getElementById("main-container");
    const mobileMenu = document.querySelector('.mobile-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    var loggedInUser = sessionStorage.getItem('loggedInUser');
    document.getElementById('user-greeting').textContent = 'Welcome, ' + loggedInUser;

    var isopen = 0;
    mobileMenu.addEventListener('click', toggleDropdown);
    document.addEventListener('click', closeDropdown);
    
    function toggleDropdown() {
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
            isopen = 0;
        } else {
            dropdownMenu.style.display = 'block';
            isopen = 1;
        }
    }
    function closeDropdown(event) {
        if (!mobileMenu.contains(event.target) && !dropdownMenu.contains(event.target))
        {
            dropdownMenu.style.display = 'none';
            isopen = 0;
        }
    }
    loadingBar.style.width = "30%";
    
    setTimeout(() => {
        loadingBar.style.width = "0";
        setTimeout(() => {
            document.querySelector(".opening-container").style.display = "none";
            mainContainer.style.display = "block";
            document.body.style.overflow = "auto";
        }, 2000);
    }, 2000);
});

function resetPassword() {
    var email = document.getElementById('re-email').value;
    var newPassword = document.getElementById('new-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;

    var foundUserIndex = users.findIndex(user => user.email === email);

    if (foundUserIndex === -1) {
        alert('Email not found! Please try again with a valid email address.');
    } else {
        if (newPassword === confirmPassword) {
            var status = "Password reset successfully for " + email;
            alert(status);

            var updatedUsers = [...users];
            updatedUsers[foundUserIndex] = { ...updatedUsers[foundUserIndex], password: newPassword };

            users = updatedUsers;
            localStorage.setItem('users', JSON.stringify(users));

            window.location.replace('login page.html');
        } else {
            alert('Passwords do not match');
        }
    }
}
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var enteredUsername = document.getElementById('username').value;
    var enteredPassword = document.getElementById('password').value;
    var enteredemail = document.getElementById('email').value;

    var foundUser = users.find(user => user.username === enteredUsername);

    if (foundUser) {
        if (foundUser.password === enteredPassword && foundUser.email === enteredemail) {
            alert('Login successfully !');
            sessionStorage.setItem('loggedInUser', enteredUsername);
            window.location.replace('quixil_login.html');
        } else {
            if (foundUser.password != enteredPassword && foundUser.email != enteredemail) 
            {
                alert("Invalid credentials");
            }

            else if (foundUser.password === enteredPassword) {
             alert('Incorrect email');
            }else{
                alert('Incorrect password');
            }
        }
    } else {
        alert('Username not found');
        window.location.replace('signup.html');
    }
});
function signup() {
    var newUsername = document.getElementById('set-username').value;
    var newPassword = document.getElementById('set-password').value;
    var newEmail = document.getElementById('set-email').value;
    var newPhone = document.getElementById('set-phone').value;
    
    if (!newUsername || !newPassword || !newEmail || !newPhone) {
        alert('Please fill in all the required fields.');
        return;
    }

    var existingUser = users.find(user => user.username === newUsername);

    if (existingUser) {
        alert('Username already exists. Please choose a different username.');
    } else {
        var user = {
            username: newUsername,
            password: newPassword,
            email: newEmail,
            phone :newPhone,
        };

        users.push(user);
            
        localStorage.setItem('users', JSON.stringify(users));

        alert('Account created successfully! You can now log in.');

        setTimeout(function() {
            window.location.replace('login page.html');
        }, 100);
    }
}
function showAlert() {
    alert('Message sent successfully!');
}
function showAlert1() {
    alert('Login to Download !');
}
function showAlert2() {
    alert('Login to view Downloads !');
    window.location.replace('login page.html');
}
function downloadGame(gameName) {
    var downloadTime = new Date().toLocaleString();

    var downloadHistory = JSON.parse(localStorage.getItem('downloadHistory')) || [];

    downloadHistory.push({
        gameName: gameName,
        downloadTime: downloadTime
    });

    localStorage.setItem('downloadHistory', JSON.stringify(downloadHistory));
    alert('Download started!');
}
function displayDownloadHistory() {
    var downloadHistory = JSON.parse(localStorage.getItem('downloadHistory')) || [];
    var downloadHistoryList = document.getElementById('download-history-list');

    downloadHistoryList.innerHTML = '';

    downloadHistory.forEach(function (download) {
        var listItem = document.createElement('li');
        listItem.textContent = download.gameName + ' - ' + download.downloadTime;
        downloadHistoryList.appendChild(listItem);
    });
}
function clearDownloadHistory() {

    var downloadHistory = JSON.parse(localStorage.getItem('downloadHistory')) || [];

    downloadHistory = [];

    localStorage.setItem('downloadHistory', JSON.stringify(downloadHistory));

    displayDownloadHistory();

    alert('Download history cleared successfully!');
}
function searchGames() {
    var searchInput = document.getElementById('search-input').value.toLowerCase();
    var gameElements = document.querySelectorAll('.game');

    gameElements.forEach(function (gameElement) {
        var gameName = gameElement.querySelector('p').textContent.toLowerCase();

        if (gameName.includes(searchInput)) {
            gameElement.style.display = 'block';
        } else {
            gameElement.style.display = 'none';
        }
    });
}