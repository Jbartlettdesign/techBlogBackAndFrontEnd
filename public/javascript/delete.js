async function deletePostEventHandler(event){
    event.preventDefault();
    console.log('button pushed');
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

        const response = await fetch(`/api/posts/delete/${id}`, {
            method: 'DELETE',
            
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


document.getElementById('delete').addEventListener('click', deletePostEventHandler);