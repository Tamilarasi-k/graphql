var koa = require('koa');
var mount = require('koa-mount');
var  app = new koa();
var graphqlHTTP =require('koa-graphql');
var schema =require('./schema');

var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.4/my_db',{useNewUrlParser:true});

app.use(mount('/graphql',graphqlHTTP({
    graphiql:true,
    schema
})))

app.listen(3005,()=>
{
    console.log("server running...")
})  
