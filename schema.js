var graphql = require('graphql');
var _ = require('lodash');
var date = require('graphql-iso-date');
var { GraphQLDateTime } = date;
var { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLBoolean, GraphQLInputObjectType } = graphql;
// module import
var Vendor = require('../model/vendor');
// graphql schema import 

var DeleteVendor = require("../controller/vendorcontroller");


var addressInput = new GraphQLInputObjectType({
    name: "addressInput",
    fields: () => ({
        line: { type: GraphQLString },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        pincode: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString }
    })
})

var address = new GraphQLObjectType({
    name: "address",
    fields: () => ({
        line: { type: GraphQLString },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        pincode: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString }
    })
})


var vendorType = new GraphQLObjectType({
    name: 'vendor',
    fields: () => ({
        code: { type: GraphQLString },
        name: { type: GraphQLString },
        mobile: { type: GraphQLString },
        address: { type: address },
        GSTNO: { type: GraphQLString },
        DLNO: { type: GraphQLString },
        active: { type: GraphQLBoolean },
        createdby: { type: GraphQLString },
        createddate: { type: GraphQLString },
        modifiedby: { type: GraphQLString },
        modifieddate: { type: GraphQLString },

    })

});



var rootquery = new GraphQLObjectType({
    name: 'rootquery',
    fields: {
        vendor: {
            type: vendorType,
            args: {
                code: { type: GraphQLString }
            },
            resolve(parents, args) {
                return vendor.find(args.code);
            }
        }
    }

});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
       addvendor: {
            type: vendorType,
            args: {
                code: { type: GraphQLString },
                name: { type: GraphQLString },
                mobile: { type: GraphQLString },
                address: { type: addressInput },
                GSTNO: { type: GraphQLString },
                DLNO: { type: GraphQLString },
                active: { type: GraphQLBoolean },
                createdby: { type: GraphQLString },
                createddate: { type: GraphQLString },
                modifiedby: { type: GraphQLString },
                modifieddate: { type: GraphQLString }
            },
            async resolve(parent, args) {

                if (args.code != null && args.name != null && args.mobile != null && args.address.line != null && args.address.street != null
                    && args.address.city != null && args.address.state != null && args.address.country !=null && args.address.pincode !=null
                    && args.address.phone != null && args.address.email != null && args.GSTNO != null && args.DLNO != null&& args.createdby!= null
                    && args.modifiedby!= null ) {
                    var data = await Vendor.findOne({"code":args.code});
                    console.log("data"+data);
                    if (data != null) {
                        console.log("data alreay exists");
                    }
                    else {
                        var newdata = Vendor({
                           
                            code:args.code,
                            name: args.name,
                            mobile: args.mobile,
                            address: {
                                line: args.address.line,
                                street: args.address.street,
                                city: args.address.city,
                                state: args.address.state,
                                country: args.address.country,
                                pincode: args.address.pincode,
                                phone: args.address.phone,
                                email: args.address.email,
                            },
                            GSTNO: args.GSTNO,
                            DLNO: args.DLNO,
                            active: args.active,
                            createdby: args.createdby,
                           // createddate: args.createddate,
                            modifiedby: args.modifiedby,
                           // modifieddate: args.modifieddate
                        });
                        //console.log( "new " + JSON.stringify(newdata) )
                        var result= await newdata.save();
                        console.log(result)
                        return result; 

                    }
                    
                }
                else{
                    console.log("enter all details");
                }

            }
       },
        deletevendor: {
            type: vendorType,
            args: {
                code: { type: GraphQLString }
            },
            async resolve(parent, args){
                console.log(args.code)
                var data = await Vendor.findOneAndDelete({"code":args.code});
                 console.log(data)
                if(data != null){
                    console.log("data deleted");
                    return data;
                }
                else{
                  
                    console.log("data not found")
                   
                }
                
            }
        },
        updatevendor: {
            type: vendorType,
            args: {
                code: { type: GraphQLString },
                name: { type: GraphQLString },
                mobile: { type: GraphQLString },
                address: { type: addressInput },
                GSTNO: { type: GraphQLString },
                DLNO: { type: GraphQLString },
                active: { type: GraphQLBoolean },
                createdby: { type: GraphQLString },
                createddate: { type: GraphQLString },
                modifiedby: { type: GraphQLString },
                modifieddate: { type: GraphQLString }
            },
           async resolve(parent, args) {
               if(args.code>0){
                   console.log("request code"+args.code);
                   var data =await Vendor.findOneAndUpdate({ "code": args.code }, {
                    $set: {
                        "name": args.name, "mobile": args.mobile,
                        "address": {
                            "line": args.address.line, "street": args.address.street, "city": args.address.city,
                            "state": args.address.state, "country": args.address.country, "pincode": args.address.pincode, "phone": args.address.phone,
                            "email": args.address.email
                        },
                        "GSTNO": args.GSTNO,
                        "DLNO": args.DLNO, "active": args.active, "createdby": args.createdby, "modifiedby": args.modifiedby
                        
                    }
                });

                if(data != null){
                    console.log("data updated");
                    return data;
                }
                else{
                    console.log("data not found");
                    
                }
            }
            }
        },
        getvendor: {
            type: vendorType,
            args: {
                code: { type: GraphQLString }
            },
           async resolve(parent, args) {
                console.log("request code"+args.code)
                var data = await Vendor.findOne({"code":args.code});
                console.log(data)
                if(data != null){
                    console.log("data checked");
                    return data;
                   
                }
                else{
                    console.log("not found");
                }
               
            }

        }

    }
})

module.exports = new GraphQLSchema({
    query: rootquery,
    mutation: mutation
});
