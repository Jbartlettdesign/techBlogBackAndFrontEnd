async function addCommentEventHandler(event){
    event.preventDefault();
    
    const comment_text = document.querySelector("#commentInput").value.trim();
    console.log(comment_text);
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    if(comment_text){
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body:JSON.stringify({
                comment_text,
                post_id,
            }),
            headers:{'Content-Type': 'application/json'}
        });
        if(response.ok){
            console.log('success');
            document.location.reload();
        }
        else{
            alert(response.statusText);
        };
    };
};

document.getElementById('addComment').addEventListener('click', addCommentEventHandler);