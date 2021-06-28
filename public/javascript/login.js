async function logInFormHandler(event){
    event.preventDefault();
    console.log('button pushed')
    const username = document.querySelector("#usernameL").value.trim();
    const password = document.querySelector("#passwordL").value.trim();
    if(username && password){
        const response = await fetch('/api/users/login', {
            method: 'post',
            body:JSON.stringify({
                username,
                password
            }),
            headers:{'Content-Type': 'application/json'}
        });
        if(response.ok){
            console.log('success');
            document.location.replace('/dashboard');
        }
        else{
            alert(response.statusText);
        }

    }
}
document.querySelector('.logInForm').addEventListener('submit', logInFormHandler);