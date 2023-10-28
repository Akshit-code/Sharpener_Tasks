const postarr = [];
let userIdle = true;

function simulateUserActivity() {
    return new Promise((resolve) => {
        setTimeout(() => {
            userIdle = true;
            resolve();
        }, 1000); 
    });
}

function createPost(postText) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newPost = `User created a post: ${postText}`;
            postarr.push(newPost);
            resolve(newPost);
        }, 1000); 
    });
}

function deleteLastPost() {
    return new Promise((resolve, reject) => {
        if (postarr.length === 0) {
            reject("No posts to delete");
        } else {
            setTimeout(() => {
                const deletedPost = postarr.pop();
                resolve(deletedPost);
            }, 1000); 
        }
    });
}

function updateLastUserActivityTime() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const currentTime = new Date().toISOString();
            userIdle = true;
            resolve(currentTime);
        }, 1000); 
    });
}

simulateUserActivity()
    .then(() => {
        userIdle = false;
        console.log("User is active");
        return createPost("Hello, this is my first post!");
    })
    .then((createdPost) => {
        console.log(createdPost);
        return updateLastUserActivityTime();
    })
    .then((lastActivityTime) => {
        console.log("Last User Activity Time:", lastActivityTime);
        return simulateUserActivity();
    })
    .then(() => {
        userIdle = false;
        console.log("User is active");
        return deleteLastPost();
    })
    .then((deletedPost) => {
        console.log(deletedPost);
        console.log("Remaining Posts:", postarr);
    })
    .catch((error) => {
        console.log("Error:", error);
    });
