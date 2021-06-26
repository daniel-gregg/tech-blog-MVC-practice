const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;

    try {
        const response = fetch(`/post/new`, {
            method: 'POST',
            body: JSON.stringify({ title, content, }),
            headers: { 'Content-Type': 'application/json' },
        });
        document.location.replace(`/dashboard`);
    } catch (err) {
        console.log(err);
    }
};

document.querySelector('#postForm').addEventListener('submit', postFormHandler);
