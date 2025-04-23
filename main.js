document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productOrderForm');
    const orderSummary = document.getElementById('orderSummary');

    function validateName(name) {
        return name.length >= 2 && /^[A-Za-z\s]+$/.test(name);
    }

    function validatePhone(phone) {
        return /^\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/.test(phone);
    }

    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        const errors = {};

        const firstName = document.getElementById('firstName').value;
        if (!validateName(firstName)) {
            errors.firstName = 'Please enter a valid first name (minimum 2 letters, Latin alphabet only)';
            isValid = false;
        }

        const lastName = document.getElementById('lastName').value;
        if (!validateName(lastName)) {
            errors.lastName = 'Please enter a valid last name (minimum 2 letters, Latin alphabet only)';
            isValid = false;
        }

        const phone = document.getElementById('phoneNumber').value;
        if (!validatePhone(phone)) {
            errors.phone = 'Please enter a valid phone number in format +7 (9XX) XXX-XX-XX';
            isValid = false;
        }

        const destination = document.getElementById('destination').value;
        if (destination.length < 5) {
            errors.destination = 'Address must contain at least 5 characters';
            isValid = false;
        }

        const orderDate = document.getElementById('orderDate').value;
        if (!orderDate) {
            errors.date = 'Please select delivery date and time';
            isValid = false;
        }

        const quantity = document.getElementById('quantity').value;
        if (!quantity || quantity < 1) {
            errors.quantity = 'Please specify quantity (minimum 1)';
            isValid = false;
        }

        const paymentMethod = document.getElementById('paymentMethod').value;
        if (!paymentMethod) {
            errors.payment = 'Please select payment method';
            isValid = false;
        }

        if (!isValid) {
            Object.keys(errors).forEach(key => {
                const errorElement = document.getElementById(`${key}Error`);
                if (errorElement) {
                    errorElement.textContent = errors[key];
                }
            });
        } else {
            document.querySelectorAll('.error-message').forEach(element => {
                element.textContent = '';
            });

            orderSummary.style.display = 'block';
            orderSummary.innerHTML = `
                <h3>Order Summary:</h3>
                <p>Name: ${firstName} ${lastName}</p>
                <p>Phone: ${phone}</p>
                <p>Address: ${destination}</p>
                <p>Date and Time: ${orderDate}</p>
                <p>Quantity: ${quantity}</p>
                <p>Payment Method: ${paymentMethod === 'cash' ? 'Cash' : 'Credit Card'}</p>
            `;
            
            // Анимация появления сводки
            orderSummary.style.animation = 'fadeIn 0.5s ease-in-out';
        }
    });

    const callbackForm = document.getElementById('phoneCallbackForm');
    callbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (this.checkValidity()) {
            alert('Callback request has been sent!');
            this.reset();
        }
    });

    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => {
        form.addEventListener('click', function() {
            forms.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
        });
    });
}); 