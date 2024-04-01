
export default class User {
    constructor(name='') {
        this.isLoggedIn = true;
        this.name=name;
    }

    set setIsLoggedIn(value) {
        this.isLoggedIn = value;
    }

    get getIsLoggedIn() {
    return this.isLoggedIn;
    }

    logout(){
        this.setIsLoggedIn(false);
    }
}