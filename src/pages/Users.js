export default class User {
    constructor(email = "", accountType = "") {
        this.email = email;
        this.accountType = accountType
        this.isLoggedIn = false;
    }

    login(data) {
        console.log("Login");
        console.log(data);
        console.log('email:', data.uuid,' | password:', data.psw)
    
        
    }

    logout() {
        console.log("Coming Soon")
    }

    set setAccountType(accountType){
        this.accountType = accountType;
    }

    set setIsLoggedIn(isLoggedIn){
        this.isLoggedIn = isLoggedIn;
    }

    get getAccountType(){
        return this.accountType;
    }

    get getIsLoggedIn() {
        return this.isLoggedIn;
    }


   
}




export class Consumer extends User {
    constructor(email = "", accountType, firstname = "", lastname = "") {
        super(email, password, accountType);
        this.firstname = firstname;
        this.lastname = lastname;
        this.billingAddress = "";
    }

    register(email, password, firstname, lastname) {
        console.log("Coming Soon");
    }

    get firstname() {
        return this.firstname;
    }

    get lastname() {
        return this.lastname;
    }

    get BillingAddress() {
        return this.billingAddress;
    }

    updateName(newName) {
        console.log("Coming Soon");
    }

    updateBillingAddress() {
        console.log("Coming Soon");
    }
}




export class Supplier extends User {
    constructor(email = "", accountType, companyName = "", country = "") {
        super(email, accountType);
        this.companyName = companyName;
        this.country = country;
        this.address = "";
    }

    get companyName() {
        return this.companyName;
    }

    get country() {
        return this.country;
    }

    get address() {
        return this.address;
    }

    register(email, password, companyname, country) {
        console.log("Coming Soon");
    }

    addNewMetal() {
        console.log("Coming Soon");
    }

    updateAddress() {
        console.log("Coming Soon");
    }

    updateCompanyName() {
        console.log("Coming Soon");
    }
}




export class Staff extends User {
    constructor(email = "", accountType, firstname = "", lastname = "", position = "") {
        super(email, accountType);
        this.firstname = firstname;
        this.lastname = lastname;
        this.position = position;
    }

    get firstname() {
        return this.firstname;
    }

    get lastname() {
        return this.lastname;
    }

    get position() {
        return this.position;
    }

    register(email, password, name, position) {
        console.log("Coming Soon");
    }

    updatePosition() {
        console.log("Coming Soon");
    }

    updateName() {
        console.log("Coming Soon");
    }
}