async function addPostEventHandler(event){
    event.preventDefault();
    
    const title = document.querySelector("#newTitle").value.trim();
    const content = document.querySelector("#newContent").value.trim();
    console.log("btn pushed")
    
   if(title && content){
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body:JSON.stringify({
                title,
                content,
            }),
            headers:{'Content-Type': 'application/json'}
        });
        if(response.ok){
            console.log('success');
            document.location.replace('/dashboard');
        }
        else{
            alert(response.statusText);
        };
    };
};
document.getElementById('create').addEventListener('click', addPostEventHandler);