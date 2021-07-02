
async function logInFormHandler(event){
    event.preventDefault();
    //console.log('button pushed')
    const username = document.querySelector("#usernameL").value.trim();
    const password = document.querySelector("#passwordL").value.trim();
     fetch('/api/users/login', {
            method: 'POST',
            body:JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(function (){
            
            document.location.replace('/dashboard');
            
        }).catch(err => console.log(err)
            
        );
        
        
    };
    


document.querySelector('.logInForm').addEventListener('submit', logInFormHandler);

