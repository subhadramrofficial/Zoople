const path=require("path");
const filePath=path.join("zoople","NODE","path","demo.txt")
console.log(filePath);//Joins multiple path segments into one path. automatically chooses the correct separator so it is easy, safe and portable to use.

const basename=path.basename("c:\\Users\\bhadr\\OneDrive\\Desktop\\Zoople\\NODE\\path\\demo.txt")
console.log(basename);//Returns the name of last part of a file. it must be a file or folder.

const dirname=path.dirname("c:\\Users\\bhadr\\OneDrive\\Desktop\\Zoople\\NODE\\path\\demo.txt")
console.log(dirname);//Returns the folder (directory) containing the file.

const extname=path.extname("demo.txt")
console.log(extname);//Returns the file extension.

const parse=path.parse("c:\\Users\\bhadr\\OneDrive\\Desktop\\Zoople\\NODE\\path\\demo.txt")
console.log(parse);//Breaks a path into its parts.

const resolve=path.resolve("path","demo.txt")
console.log(resolve);//creates an absolute path





