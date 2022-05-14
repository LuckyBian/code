/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { json } = require("./PersonController");

module.exports = {

    //login function
    login: async function (req, res) {

        if (req.method == "GET") 
        return res.view('user/login');
    
        if (!req.body.username || !req.body.password) return res.badRequest();
    
        var user = await User.findOne({ username: req.body.username });
    
        if (!user) return res.status(401).json("User not found");



        await sails.helpers.passwords.checkPassword(req.body.password, user.password)
            .tolerate('incorrect', function (error) {
                req.body.password = false
            });

        if (!req.body.password) return res.status(401).json("Wrong Password");

        var whereClause = {};
         
         whereClause.he = "on";
         
         var persons = await Person.find({
             where: whereClause,
             sort: 'he'
         });


        // Start a new session for the new login user
        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = user.username;
            req.session.type = user.type;
            req.session.id = user.id;

            var events = {persons};

            var obj = Object.assign(user,events);

            return res.json(obj);
        });
    },

    // register function
    register: async function(req,res){
        if (req.method == "GET") 
        return res.view('user/register');

    },
//Logout function
    logout: async function (req, res) {

        var whereClause = {};
         
         whereClause.he = "on";
         
         var thosePersons = await Person.find({
             where: whereClause,
             sort: 'he'
         });

        req.session.destroy(function (err) {
        
            if (err) return res.serverError(err);
            
            return res.view('vistor/page',{ persons: thosePersons })       
        });
    },

    //see all events of a user
    populate: async function (req, res) {

        var whereClause = {};
        
        whereClause.username = req.session.username;
        
        var thosePersons = await User.find({
            where: whereClause,
            sort: 'username'
        });
        var id;

        thosePersons.forEach( function(person) {
            id = person.id;
        });
        
        var user = await User.findOne(id).populate("events");
        
        return res.view('student/myevent', { persons: user.events});  
    },

    // add an event
    add: async function (req, res) {

        var whereClause = {};
        
        whereClause.username = req.session.username;
        
        var thosePersons = await User.find({
            where: whereClause,
            sort: 'username'
        });
        var id;

        thosePersons.forEach( function(person) {
            id = person.id;
        });


        var where = {};

        where.name = req.query.name;

        var Event = await Person.find({
            where : where,
            sort: 'name'
        });

        var eid;
        var quota;
        Event.forEach( function(person) {
            eid = person.id;
            quota = person.quota;
        });
        if(quota > 0){
            await User.addToCollection(id, "events").members(eid);
        }
        //return res.view('student/list2', { persons: Event });
    },

    //remove an event
    remove: async function (req, res) {

        var whereClause = {};
        
        whereClause.username = req.session.username;
        
        var thosePersons = await User.find({
            where: whereClause,
            sort: 'username'
        });
        var id;

        thosePersons.forEach( function(person) {
            id = person.id;
        });


        var where = {};

        where.name = req.query.name;

        var Event = await Person.find({
            where : where,
            sort: 'name'
        });

        var eid;
        Event.forEach( function(person) {
            eid = person.id;
        });
  
        await User.removeFromCollection(id, "events").members(eid);

    
        //return res.view('student/list', { persons: Event });
    },
    
};

