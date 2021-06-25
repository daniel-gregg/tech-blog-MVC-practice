const commentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#content').value;
    const postId = document.querySelector('#post_id').value;
    const authorId = document.querySelector('#author_id').value;

    try {
        const response = fetch(`/post/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ content, postId, authorId }),
            headers: { 'Content-Type': 'application/json' },
        });
        document.location.replace(`/post/${postId}`);
    } catch (err) {
        console.log(err);
    }
};

document.querySelector('#commentForm').addEventListener('submit', commentHandler);
