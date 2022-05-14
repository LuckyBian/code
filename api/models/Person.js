/**
 * Person.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    register:{
      collection : 'User',
      via : 'events'
    },

    name:{
      type : "string"
    },

    sd:{
      type : "string"
    },

    organizer:{
      type: "string"
    },

    venue:{
      type:"string"
    },

    date:{
      type: "string"
    },

    he:{
      type:"string"
    },

    url:{
      type:"string"
    },

    quota:{
      type: "number"
    }

  
  },

};

