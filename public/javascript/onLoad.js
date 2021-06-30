loadOnce = true;
function pageReload(event){
    event.preventDefault();
    console.log('page is fully loaded');
    if(loadOnce){
        loadOnce = false;
        location.reload();
        return false;
}
}

window.addEventListener('load', pageReload);