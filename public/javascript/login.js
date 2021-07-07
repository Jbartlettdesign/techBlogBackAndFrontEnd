const { response } = require("express");

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
        });
        if(response.ok){
        
        
        
            
            document.location.replace('/dashboard');
        }
        else(
            window.alert("no user found")
        )
     
            
        
        
        
    };
    


document.querySelector('.logInForm').addEventListener('submit', logInFormHandler);

