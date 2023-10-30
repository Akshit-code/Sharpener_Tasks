console.log('person1 shows ticket');
console.log('person2 shows ticket');

const preMovie = async () => {

  const person3PromiseToShowTicketWhenWifeArrives = new Promise((resolve, reject) => {
    setTimeout(() => resolve('ticket'), 3000);
  });
  const getPopcorn =  new Promise((resolve, reject) => {
		setTimeout(() => resolve('popcorn'), 3000);
  });
  
  const addButter =  new Promise((resolve, reject) => {
		setTimeout(() => resolve('butter'), 3000);
  });

	const getColdDrink = new Promise( (resolve, reject) => {
  	setTimeout(()=> resolve('butter'), 3000 )
  });

  let ticket = await person3PromiseToShowTicketWhenWifeArrives;

    console.log(`got the ${ticket}`);
    console.log(`Husband:we should go in now`);
    console.log(`Wife: "i am hungry"`);
  
  let popcorn = await getPopcorn;
    console.log(`Husband: here is ${popcorn}`);
	console.log(`Husband:we should go in now`);
    console.log(`Wife: "I dont like popcorn without butter!"`);
  
  let butter = await addButter;
    console.log(`added ${butter}`);
    console.log(`Husband:Anything else darling`);
	console.log(`Wife: lets go we are going to miss the preivew`);
    console.log(`Husband: thanks for the reminder *grin*`);
  
  let coldDrink = await getColdDrink;
    console.log(`added ${coldDrink}`);
    console.log("cheers");
  return ticket;
  
};

preMovie().then((t) => console.log(`person4 shows ${t}`));

console.log('person4 shows ticket');




// ---------------------------------------------------------------- //

const postarr = [];
const user = {
    last_post_created : "",
    last_post_deleted: "",
    lastactivity: "",
    last_created_post_text : "",
    last_deleted_post_text : ""
}

function create_post(post_text) {
    return new Promise( (resolve,reject) => {
        const date = new Date();
        setTimeout( ()=> {
            const post = {
                title: post_text,
                time: date.getTime(),
            }
            user.last_post_created = post_text;
            user.last_created_post_text = post_text;
            user.last_post_created = date.getTime();
            postarr.push(post);
            resolve("New post created");
        },3000)
    })
}

function delete_post() {
    return new Promise( (resolve, reject)=> {
        const date = new Date();
        setTimeout( ()=> {
            if(postarr.length > 0 ){
                const pop_element = postarr.pop();
                user.last_post_deleted = pop_element;
                user.last_post_deleted = date.getTime();
                user.last_deleted_post_text = pop_element.title;
                resolve('Most recent post deleted');
            } else {
                reject("No post to delete");
            }
        },2000)
    } )
}

function print_post() {
    postarr.forEach(post => {
        console.log(post.title);
        console.log(post.time);
    });
}

function update_last_user_actvity_time() {
    return new Promise( (resolve, reject) => {
        setTimeout( ()=> {
            const date = new Date();
            user.lastactivity = date.getTime();
            resolve(user.lastactivity);
        },1000 )
    } )
}


// create_post("Post 1")
//     .then((result)=>{
//         console.log(result);
//         console.log("Post Text: " + user.last_created_post_text);
//     })
//     .then( ()=> update_last_user_actvity_time())
//     .then(() => create_post("Post 2"))
//     .then((result)=> {
//         console.log(result);
//         console.log("Post Text: " + user.last_created_post_text);
//     })
//     .then( ()=> update_last_user_actvity_time())
//     .then(() => create_post("Post 3"))
//     .then((result)=> {
//         console.log(result)
//         console.log("Post Text: " + user.last_created_post_text);
//     })
//     .then( ()=> update_last_user_actvity_time())
//     .then(() => print_post())
//     .then(() => delete_post())
//     .then((result)=> {
//         console.log(result);
//         console.log("Post Text: " + user.last_deleted_post_text);
//     })
//     .then( ()=> update_last_user_actvity_time())
//     .then(() => print_post())


async function main() {
    try {
        const createResult1 = await create_post("New Post 1");
        console.log(createResult1);
        let activityResult = await update_last_user_actvity_time();
        console.log("User's last activity time:", activityResult);

        const createResult2 = await create_post("New Post 2");
        console.log(createResult2);
        activityResult = await update_last_user_actvity_time();
        console.log("User's last activity time:", activityResult);

        const createResult3 = await create_post("New Post 3");
        console.log(createResult3);
        activityResult = await update_last_user_actvity_time();
        console.log("User's last activity time:", activityResult);

        print_post();

        const deleteResult = await delete_post();
        console.log(deleteResult);
        activityResult = await update_last_user_actvity_time();
        console.log("User's last activity time:", activityResult);

        print_post();
    } catch (error) {
        console.error(error);
    }
}

main();