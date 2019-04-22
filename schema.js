var graphql = require('graphql');
var{GraphQLString,GraphQLObjectType,GraphQLSchema} = graphql;
// module import 
var student =require('./module');

var studentType = new GraphQLObjectType({
    name:"student",
    fields:()=>({
    RollNo:{type:GraphQLString},
    Name:{type:GraphQLString},
    Tamil:{type:GraphQLString},
    English:{type:GraphQLString},
    Maths:{type:GraphQLString},
    Science:{type:GraphQLString},
    Social:{type:GraphQLString}
})
});

var rootquery = new GraphQLObjectType({
    name:"rootquery",
    fields:{
        student:{
                type:studentType,
                args:{
                    RollNo:{type:GraphQLString}
                },
                resolve(parent,args){
                    return student.find(args.Rollno);
                }
        }
    }
});

var mutation = new GraphQLObjectType({
    name:"mutation",
    fields:{
        addstudent:{
            type:studentType,
            args:{
                RollNo:{type:GraphQLString},
                Name:{type:GraphQLString},
                Tamil:{type:GraphQLString},
                English:{type:GraphQLString},
                Maths:{type:GraphQLString},
                Science:{type:GraphQLString},
                Social:{type:GraphQLString}
            },
           async resolve(parent,args){
                var newdata =new student({
                    RollNo:args.RollNo,
                    Name:args.Name,
                    Tamil:args.Tamil,
                    English:args.English,
                    Maths:args.Maths,
                    Science:args.Science,
                    Social:args.Social
                });
                
                var result =await newdata.save();
                return result;
            
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query:rootquery,
    mutation:mutation
})