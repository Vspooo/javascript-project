let id = new URL(location.href).searchParams.get("id")


fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.json())
    .then(post => {
        createPostElement(post);
        return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    })
    .then(response => response.json())
    .then(comments => {
        createCommentsElement(comments);
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });

function createPostElement(post) {
    const currentPost = document.createElement("div");
    currentPost.id = "currentPost";
    currentPost.classList.add("font-lato");
    for (const key in post) {
        const paragraph = document.createElement("p");
        paragraph.innerText = `${key} - ${post[key]}`;
        currentPost.appendChild(paragraph);
    }
    document.body.appendChild(currentPost);
}

function createCommentsElement(comments) {
    const commentDiv = document.createElement("div");
    commentDiv.id = "title";
    commentDiv.classList.add("center", "font-lato");
    const paragraph = document.createElement("p");
    paragraph.innerText = "comments: ";
    commentDiv.appendChild(paragraph);
    document.body.appendChild(commentDiv);
    const div = document.createElement("div");
    div.id = "comments";
    div.classList.add("font-lato");
    document.body.appendChild(div);
    comments.forEach(comment => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        for (const key in comment) {
            const paragraph = document.createElement("p");
            paragraph.innerText = `${key} - ${comment[key]}`;
            commentElement.appendChild(paragraph);
        }
        div.appendChild(commentElement);
    });
}
