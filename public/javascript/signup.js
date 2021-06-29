async function signupFormHandler(event){
    event.preventDefault();
    console.log('button pushed')
    const username = document.querySelector("#usernameS").value.trim();
    const password = document.querySelector("#passwordS").value.trim();
    if(username && password){
        const response = await fetch('/api/users', {
            method: 'post',
            body:JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok){
            console.log('success');
            document.location.replace('/');
            
        }
        else{
            alert(response.statusText);
        }

    }
}
document.querySelector('.signUpForm').addEventListener('submit', signupFormHandler);