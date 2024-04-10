

export default function getCookie(cname){
    let name = cname+ '=';
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++){
        let c = ca[i];
        while (c.charAt(0) == ' '){
            c=c.substring(1);
        }
        if(c.indexOf(name) == 0){
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export function setCookie(cname, cvalue, exdays){
    const date = new Date();
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expiers=' + date.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function checkCookie(){
    let username = getCookie("user");
    let retVal = false;
    if (username != "") {
        retVal = true;
    }
    return retVal;
}


export function deleteCookie(){
    const date = new Date();
    document.cookie = 'user=' + " " + ';' +  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000)) + ';path=/';
}


