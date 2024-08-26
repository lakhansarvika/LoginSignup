document.addEventListener('DOMContentLoaded', () => {
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userPassword = document.getElementById('userPassword');
    const userConfirmPassword = document.getElementById('userConfirmPassword');
    const userAge = document.getElementById('userAge');
    const userId = document.getElementById('userId');
    const registerBtn = document.getElementById('registerBtn');

    const clearErrors = () => {
        document.querySelectorAll('.errorMessage').forEach(span => span.innerText = '');
    };

    const validateField = (field, errorMessage, condition) => {
        const errorSpan = field.nextElementSibling;
        if (condition) {
            errorSpan.innerText = errorMessage;
        } else {
            errorSpan.innerText = '';
        }
    };

    const addInputValidation = () => {
        userName.addEventListener('input', () => {
            validateField(userName, '**Length of name is too short.**', userName.value.length < 5);
        });

        userEmail.addEventListener('input', () => {
            validateField(userEmail, '**Invalid email format.**', !validateEmail(userEmail.value));
        });

        userPassword.addEventListener('input', () => {
            validateField(userPassword, '**Password must be 5 character.**', userPassword.value.length < 5);
        });

        userConfirmPassword.addEventListener('input', () => {
            validateField(userConfirmPassword, '**Passwords do not match.**', userConfirmPassword.value !== userPassword.value);
        });

        userAge.addEventListener('input', () => {
            const age = userAge.value.trim();
            validateField(userAge, '**Enter a valid age.**', !age || isNaN(age) || age <= 0);
        });

        userId.addEventListener('input', () => {
            validateField(userId, '**Employee ID is required.**', userId.value === '');
        });
    };

    registerBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        
        clearErrors();
     
        const name = userName.value.trim();
        const email = userEmail.value.trim();
        const password = userPassword.value.trim();
        const confirmPassword = userConfirmPassword.value.trim();
        const age = userAge.value.trim();
        const id = userId.value.trim();

        let isValid = true;

        if (name.length < 5) {
            document.querySelector('#userName + .errorMessage').innerText = '**Length of name is too short.**';
            isValid = false;
        }
        if (!email) {
            document.querySelector('#userEmail + .errorMessage').innerText = '**Email is required.**';
            isValid = false;
        } else if (!validateEmail(email)) {
            document.querySelector('#userEmail + .errorMessage').innerText = '**Invalid email format.**';
            isValid = false;
        }
        if (!password) {
            document.querySelector('#userPassword + .errorMessage').innerText = '**Password is required.**';
            isValid = false;
        }
        if (!confirmPassword) {
            document.querySelector('#userConfirmPassword + .errorMessage').innerText = '**Confirm Password is required.**';
            isValid = false;
        }
        if (password !== confirmPassword) {
            document.querySelector('#userConfirmPassword + .errorMessage').innerText = '**Passwords do not match.**';
            isValid = false;
        }
        if (!age || isNaN(age) || age <= 0) {
            document.querySelector('#userAge + .errorMessage').innerText = '**Enter a valid age.**';
            isValid = false;
        }
        if (!id) {
            document.querySelector('#userId + .errorMessage').innerText = '**Employee ID is required.** ';
            isValid = false;
        }

        if (isValid) {
            const saveUserData = {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                age: age,
                userId: id
            };
            let users = JSON.parse(localStorage.getItem('users')) || [];

            const matchedData = users.filter((value)=> value.email === saveUserData.email)

            if(matchedData.length > 0 ){
                alert('User All ready exit');
            }else{
                
                users.push(saveUserData);
                localStorage.setItem('users', JSON.stringify(users));
                alert('User Registered Successfully');
                window.location.href = '/index.html';

            }
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    addInputValidation()
});