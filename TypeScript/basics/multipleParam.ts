function createUser(name:string,role:string="user",isActive:boolean=true){
    console.log(`${name} (${role},active: ${isActive})`);
    
}
console.log(createUser("Alice"));
console.log(createUser("Bob","admin"));
console.log(createUser("Charlie","moderator",false));
