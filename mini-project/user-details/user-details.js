
let id = new URL(location.href).searchParams.get("id")


function fetchAndDisplayUserData(id) {
    return new Promise((resolve, reject) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => response.json())
            .then(user => {
                const userDetailsDiv = document.createElement("div");
                userDetailsDiv.id = "wrap";
                document.body.appendChild(userDetailsDiv);

                const userDetailDiv = document.createElement("div");
                userDetailDiv.classList.add("details", "font-lato");
                userDetailDiv.id = "details";
                userDetailsDiv.appendChild(userDetailDiv);

                displayObjectProperties(user, userDetailDiv);

                fetchUserPosts(id)
                    .then(() => resolve())
                    .catch(error => reject(error));
            })
            .catch(error => reject(error));
    });
}

function displayObjectProperties(obj, container) {
    for (const key in obj) {
        const paragraph = document.createElement("p");
        paragraph.classList.add("textForDetails", "color-white");
        let text = "";
        if (Array.isArray(obj[key])) {
            const newObj = obj[key].map(value => `: ${value.name} - ${value.value}`);
            text = newObj.join('\n');
        } else if (typeof obj[key] === "object") {
            text = handleObject(obj[key]);
            paragraph.innerText = ` ${key} : ${text}`;
            container.appendChild(paragraph);
        } else {
            text = obj[key]
        }
        paragraph.innerText = ` ${key} : ${text}`;
        container.appendChild(paragraph);
    }
}

function handleObject(obj) {
    const result = [];
    for (const key in obj) {
        if (typeof obj[key] === "object") {
            result.push(handleObject(obj[key]));
        } else {
            result.push(` ${key} -  ${obj[key]}.`);
        }
    }
    return result.join('\n');
}

function fetchUserPosts(id) {
    return new Promise((resolve, reject) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
            .then(response => response.json())
            .then(posts => {
                const buttonForPosts = document.createElement("button");
                buttonForPosts.innerText = "post of current user";
                buttonForPosts.id = "buttonForPosts";
                buttonForPosts.classList.add("font-lato", "color-white");
                document.body.appendChild(buttonForPosts);

                const postsDiv = document.createElement("div");
                postsDiv.id = "postsDiv";
                document.body.appendChild(postsDiv);

                let isPostsVisible = false;

                buttonForPosts.onclick = function () {
                    postsDiv.innerText = "";
                    if (!isPostsVisible) {
                        posts.forEach(post => {
                            const postDiv = document.createElement("div");
                            postDiv.classList.add("postDiv");

                            const paragraph = document.createElement("p");
                            paragraph.innerText = ` title: ${post.title}`;
                            paragraph.classList.add("postTitle");

                            const postButton = document.createElement("button");
                            postButton.classList.add("postButton", "font-lato");
                            postButton.onclick = function () {
                                location.href = `../post-details/post-details.html?id=${post.id}`;
                            };
                            postButton.innerText = "more info";

                            postDiv.append(paragraph, postButton);
                            postsDiv.appendChild(postDiv);
                        });
                        postsDiv.style.display = "block";
                        postsDiv.style.opacity = 0;
                        postsDiv.style.visibility = "visible";
                        setTimeout(function () {
                            postsDiv.style.opacity = 1;
                        }, 10);
                        isPostsVisible = true;
                    } else {
                        postsDiv.style.display = "none";
                        postsDiv.style.opacity = 1;
                        setTimeout(function () {
                            postsDiv.style.opacity = 0;
                            setTimeout(function () {
                                postsDiv.style.visibility = "hidden";
                            }, 300);
                        }, 100);
                        isPostsVisible = false;
                    }
                };

                const wrap = document.getElementById("wrap");
                wrap.appendChild(buttonForPosts);

                resolve();
            })
            .catch(error => reject(error));
    });
}

fetchAndDisplayUserData(id)
    .then(() => {
    })
    .catch(error => {
        console.error("Error occurred:", error);
    });



