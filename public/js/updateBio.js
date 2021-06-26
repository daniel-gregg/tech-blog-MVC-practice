// Getting references to our form and input
const $bioUpdateForm = document.querySelector('#bioForm');

// When the signup button is clicked, we validate the email and password are not blank
$bioUpdateForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const first_name = document.querySelector('#first_name').value;
    const last_name = document.querySelector('#last_name').value;
    const bio = document.querySelector('#bio').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    /* if (!first_name || !last_name || !email || !password) {
        return;
    } */
    // If we have an email and password, run the signUpUser function
    updateUser({ first_name, last_name, bio , email, password });
    event.target.reset();
});

// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
function updateUser({ first_name, last_name, bio , email, password }) {
    fetch('/api/users/updateBio', {
        method: 'PUT',
        body: JSON.stringify({
            first_name,
            last_name,
            bio,
            email,
            password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((r) => r.json())
        .then(() => {
            window.location.replace('/dashboard');
        })
        .catch((err) => console.log(err.responseText));
}
