const fs=require("fs")
const write=fs.writeFile("data.txt","Hello World",(error)=>{
    if(error){
        console.log("Not successfull");
        return;
    }
    console.log("File written successfully");
    
})

const read=fs.readFile("data.txt","utf8",(error,data)=>{
    if(error){
        console.log("Error reading file");
        return
    }
    console.log("File content");
    console.log(data);
    
})
