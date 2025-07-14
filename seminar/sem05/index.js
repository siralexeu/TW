const link = "https://jsonplaceholder.typicode.com/posts/";

let postsToUse = [];

headerObj = {
    headers:{
        "Content-Type": "application/json"
    }
}

async function getPosts(){
    let posts = (await axios.get(link)).data;
    console.log(posts)
    return posts
}

async function createPosts(post){
    let newElem = (await axios.post(link, post, headerObj)).data;
    console.log(newElem)
    return newElem
}

async function deletePosts(postId){
    let deleteElem = (await axios.delete(link + postId)).data;
    console.log(deleteElem)
    return deleteElem
}

async function getPostsById(postId){
    let post = (await axios.get(link+ postId)).data;
    console.log(post)
    return post
}

async function updatePosts(post, postId){
    let updateElem = (await axios.put(link + postId, post, headerObj)).data;
    console.log(updateElem)
    return updateElem
}

async function callUpdatePost(post, postId){
    let udpateElem = await updatePosts(post, postId);
    postsToUse = postsToUse.map(obj => parseInt(obj.id) === parseInt(postId) ? udpateElem : obj);
    renderTable(postsToUse);
}

async function callGetPostById(postId){
    let post = await getPostsById(postId);

    document.getElementById("putUserId").value = post.userId;
    document.getElementById("putTitle").value = post.title;
    document.getElementById("putBody").value = post.body;
    document.getElementById("putId").textContent = post.id;
}

async function callDeletePost(postId){
    return await deletePosts(postId);
}

async function callCreatePost(post){
    let p = await createPosts(post);
    postsToUse.push(p);
    renderTable(postsToUse);
}

async function callGetPosts(){
    
    let table = document.getElementById("tableId")
    if (table)
        return;

    let p = await getPosts();
    postsToUse = JSON.parse(JSON.stringify(p));
    renderTable(postsToUse);
}

function renderTable(posts){

    if (!posts || posts.length === 0)
        return;

    let oldTable = document.getElementById("tableId")
    if (oldTable)
        document.body.removeChild(oldTable);

    let table = document.createElement("table");
    let tableHeader = document.createElement("thead");
    let tableBody = document.createElement("tbody");

    let headerRow = document.createElement("tr");
  
    for (let i in posts[0]){
        let columnCell = document.createElement("th");
        columnCell.innerText = i;
        headerRow.appendChild(columnCell);
    }
    tableHeader.appendChild(headerRow);

    for (let item of posts){
        let bodyRow = document.createElement("tr");

        for (let i in item){
            let columnCell = document.createElement("td");
            columnCell.innerText = item[i];
            bodyRow.appendChild(columnCell);
        }

        let updateCell = document.createElement("td");
        let updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";

        updateBtn.addEventListener("click", function(e){
            e.preventDefault();
            e.stopPropagation();

            callGetPostById(item.id)        
        })

        updateCell.appendChild(updateBtn);

        let deleteCell = document.createElement("td");
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function(e){
            e.preventDefault();
            e.stopPropagation();

            let index = posts.indexOf(item)

            callDeletePost(item.id).then(() => {
                postsToUse.splice(index, 1);
                renderTable(postsToUse);
            })           
        })

        deleteCell.appendChild(deleteBtn);
        
        bodyRow.appendChild(updateCell);
        bodyRow.appendChild(deleteCell);

        tableBody.appendChild(bodyRow);
    }

    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    table.id = "tableId";
    document.body.appendChild(table);
}

function createPostEvent(){
    let btn = document.getElementById("postButton");
    if (!btn)
        return;

    btn.addEventListener("click", function(e){
        e.preventDefault();
        e.stopPropagation();

        let userId = document.getElementById("userId")?.value
        let title = document.getElementById("title")?.value
        let body = document.getElementById("body")?.value

        if (!userId || !title || !body){
            alert("Please fill all the data");
            return;
        }

        callCreatePost({userId: userId, id: 101, title: title, body: body});
    })

}
createPostEvent();

function putForm(e){
    e.preventDefault();
    e.stopPropagation();

    let userId = document.getElementById("putUserId")?.value
    let title = document.getElementById("putTitle")?.value
    let body = document.getElementById("putBody")?.value
    let id = document.getElementById("putId")?.textContent

    if (!userId || !title || !body){
        alert("Please fill all the data");
        return;
    }

    callUpdatePost({userId: userId, id: id, title: title, body: body}, id);
}