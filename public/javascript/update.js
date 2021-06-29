async function updatePostEventHandler(event){
    event.preventDefault();
    console.log('button pushed');
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    if(title && content){
        const response = await fetch(`/api/posts/update/${id}`, {
            method: 'PUT',
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
document.getElementById('update').addEventListener('click', updatePostEventHandler);