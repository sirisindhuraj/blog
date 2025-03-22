const UserAuthor=require("../models/userAuthorModel")

async function createUserOrAuthor(req,res){
    //business logic to create User or Author
        //get user or author object from req
        const newUserAuthor=req.body;
        console.log('new user author',newUserAuthor)
       //find user by email id
        const userInDb=await UserAuthor.findOne({email:newUserAuthor.email})
        console.log('new user in db',userInDb)
        //if user or author existed
        if(userInDb!==null){
            //check with role
            if(newUserAuthor.role===userInDb.role){
                res.status(200).send({message:newUserAuthor.role,payload:userInDb})
            }else{
                res.status(200).send({message:"Invalid role"})
            }
        }else{
        console.log('start')
            let newUser=new UserAuthor(newUserAuthor);
        console.log('new user in db',newUser)
            let newUserOrAuthorDoc=await newUser.save();
        console.log('new user and author',newUserOrAuthorDoc)
            res.status(201).send({message:newUserOrAuthorDoc.role,payload:newUserOrAuthorDoc})
        }
}


module.exports=createUserOrAuthor;