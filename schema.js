var graphql = require('graphql');
var _ = require('lodash');
var { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLBoolean,GraphQLInputObjectType } = graphql;
// module import
var Vendor = require('../model/vendor');
// graphql schema import 


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
        address: { type: address},
        GSTNO: { type: GraphQLString },
        DLNO: { type: GraphQLString },
        active: { type: GraphQLBoolean },
        createdby: { type: GraphQLString },
        createddate: { type:GraphQLString},
        modifiedby: { type: GraphQLString },
        modifieddate: { type:  GraphQLString }

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
        }
    }

});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addvendor: {
            type: vendorType,
            args: {
                code: { type:GraphQLString },
                name: { type:GraphQLString },
                mobile: { type:GraphQLString },
                address: { type:addressInput },
                GSTNO: { type:GraphQLString },
                DLNO: { type:GraphQLString },
                active: { type:GraphQLBoolean },
                createdby: { type:GraphQLString },
                createddate: { type:GraphQLString },
                modifiedby: { type: GraphQLString },
                modifieddate: { type:GraphQLString}
            },
            resolve(parent, args) {
                let newdata = new Vendor({
                    code: args.code,
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
                    //createddate: args.createddate,
                    modifiedby: args.modifiedby,
                   // modifieddate: args.modifieddate
                });
                return newdata.save();
            }
        },
         deletevendor:{
             type:vendorType,
             args:{
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
             resolve(parent,args){
                  return Vendor.findOneAndDelete({"code":args.code});
             }

        },
        updatevendor:{
            type:vendorType,
            args:{
                code: { type: GraphQLString },
                name: { type: GraphQLString },
               
            },
            resolve(parent,args){
                return Vendor.findOneAndUpdate({"code":args.code},{$set:{"name":args.name }});
            }
        },
        getvendor:{
            type:vendorType,
            args:{
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
            resolve(parent,args){

                 var vendor = Vendor.findOne({"code":args.code});
                 console.log(vendor)
                 return vendor;
                 
            }

       }
       
    }
})

module.exports = new GraphQLSchema({
    query: rootquery,
    mutation: mutation
});
