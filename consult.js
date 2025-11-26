// Small nicety: insert current year
    document.getElementById('year').textContent = new Date().getFullYear();







/* button js code */

  const form = document.querySelector('.consult-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop normal submission

    // Check validity of the form
    if (!form.checkValidity()) {
      alert('Error: Please fill in all required fields correctly.');
      return; // Stop further execution
    }

    // If form is valid, redirect to custom 404 page
    window.location.href = './404.html';
  });
