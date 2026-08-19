const os=require("os");
console.log(os.platform());//returns the os platform
console.log(os.arch());//Returns the CPU architecture.
console.log(os.hostname());//Returns the computer's name.
console.log(os.totalmem());//Returns the total memory (RAM) in bytes.
console.log(os.freemem());//Returns the available free memory.
console.log(os.userInfo());//Returns information about the current user.
console.log(os.cpus());//Returns information about the CPU.

