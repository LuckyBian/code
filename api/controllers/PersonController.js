/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // The home 
    // The page for vistor
    page: async function (req, res) {

       // var everyones = await Person.find();
        
        // return res.view('person/page', { persons: everyones });

        var whereClause = {};
        
        whereClause.he = "on";
        
        var thosePersons = await Person.find({
            where: whereClause,
            sort: 'he'
        });
        
        return res.view('vistor/page', { persons: thosePersons });

       
    },

    //The page for Admin
    adminPage: async function (req, res) {

        // var everyones = await Person.find();
         
         // return res.view('person/page', { persons: everyones });
 
         var whereClause = {};
         
         whereClause.he = "on";
         
         var thosePersons = await Person.find({
             where: whereClause,
             sort: 'he'
         });
         
         return res.view('person/page', { persons: thosePersons });
        
     },

     //The page for Student
    studentPage: async function (req, res) {

        // var everyones = await Person.find();
         
         // return res.view('person/page', { persons: everyones });
 
         var whereClause = {};
         
         whereClause.he = "on";
         
         var thosePersons = await Person.find({
             where: whereClause,
             sort: 'he'
         });
         
         return res.view('student/page', { persons: thosePersons });
        
     },

    // creat a event
    create: async function (req, res) {

        if (req.method == "GET") return res.view('person/create');
        
        var person = await Person.create(req.body).fetch();
    
        return res.status(201).json({ id: person.id });
    },

    json: async function(req,res){
        var everyones = await Person.find();

        return res.json(everyones);

    },

    // Check all events and registers (Admin)
    admin: async function (req, res) {

        var everyones = await Person.find();
        
        return res.view('person/admin', { persons: everyones });
    },

    //See event details for admin
    search: async function (req, res) {
    
        var whereClause = {};
        
        if (req.query.name) whereClause.name = req.query.name;
        
        var sd = req.query.sd;
        if (!isNaN(sd)) whereClause.sd = sd;
        
        var thosePersons = await Person.find({
            where: whereClause,
            sort: 'name'
        });
        
        return res.view('person/list', { persons: thosePersons });
    },

    // See event details for vistor
    vistorSearch: async function (req, res) {
    
        var whereClause = {};
        
        if (req.query.name) whereClause.name = req.query.name;
        
        var sd = req.query.sd;
        if (!isNaN(sd)) whereClause.sd = sd;
        
        var thosePersons = await Person.find({
            where: whereClause,
            sort: 'name'
        });
        
        return res.view('vistor/list', { persons: thosePersons });
    },

    // See event details for student
    studentSearch: async function (req, res) {
    
        var whereClause = {};
        
        if (req.query.name) whereClause.name = req.query.name;
        
        var sd = req.query.sd;
        if (!isNaN(sd)) whereClause.sd = sd;
        
        var thosePersons = await Person.find({
            where: whereClause,
            sort: 'name'
        });

        var whereC = {};
        
        whereC.username = req.session.username;
        
        var Persons = await User.find({
            where: whereC,
            sort: 'username'
        });
        var id;

        Persons.forEach( function(person) {
            id = person.id;
        });

        var user = await User.findOne(id).populate("events");

        var reg = false;

         user.events.forEach( function(person) {
             if(person.name == req.query.name)
             reg = true;
         });      

        if(reg) return res.view('student/list2', { persons: thosePersons });
   
        return res.view('student/list', { persons: thosePersons });
    },


    // Search for event for admin
    event: async function (req, res) {

    var perPage = Math.max(req.query.perPage, 2) || 2;
    var current  = Math.max(req.query.current - 1, 0) || 0;
    var whereClause = {};
        
    if (req.query.name) whereClause.name = { contains: req.query.name };
    if (req.query.venue) whereClause.venue = req.query.venue;
    if (req.query.organizer) whereClause.organizer = req.query.organizer;

    var sd = new Date(req.query.sd);
    var ed = new Date(req.query.ed);
    if (!isNaN(sd) & !isNaN(ed)) whereClause.date = { '<=': ed, '>=': sd };

        var somePersons = await Person.find({
            where: whereClause,
            sort: 'name',
            limit: perPage,
            skip: current
        });

        var numPerson = await Person.find({
            where: whereClause,
        });

        var count = numPerson.length;

        return res.view('person/event', { persons: somePersons , total: count });  
    },

    //Search event for vistor
    vistorEvent: async function (req, res) {

        var perPage = Math.max(req.query.perPage, 2) || 2;
        var current  = Math.max(req.query.current - 1, 0) || 0;
        var whereClause = {};
            
        if (req.query.name) whereClause.name = { contains: req.query.name };
        if (req.query.venue) whereClause.venue = req.query.venue;
        if (req.query.organizer) whereClause.organizer = req.query.organizer;
    
        var sd = new Date(req.query.sd);
        var ed = new Date(req.query.ed);
        if (!isNaN(sd) & !isNaN(ed)) whereClause.date = { '<=': ed, '>=': sd };
    
            var somePersons = await Person.find({
                where: whereClause,
                sort: 'name',
                limit: perPage,
                skip: current
            });
    
            var numPerson = await Person.find({
                where: whereClause,
            });
    
            var count = numPerson.length;
    
            return res.view('vistor/event', { persons: somePersons , total: count });  
        },

    //Search event for student
    studentEvent: async function (req, res) {

        var perPage = Math.max(req.query.perPage, 2) || 2;
        var current  = Math.max(req.query.current - 1, 0) || 0;
        var whereClause = {};
            
        if (req.query.name) whereClause.name = { contains: req.query.name };
        if (req.query.venue) whereClause.venue = req.query.venue;
        if (req.query.organizer) whereClause.organizer = req.query.organizer;
    
        var sd = new Date(req.query.sd);
        var ed = new Date(req.query.ed);
        if (!isNaN(sd) & !isNaN(ed)) whereClause.date = { '<=': ed, '>=': sd };
    
            var somePersons = await Person.find({
                where: whereClause,
                sort: 'name',
                limit: perPage,
                skip: current
            });
    
            var numPerson = await Person.find({
                where: whereClause,
            });
    
            var count = numPerson.length;
    
            return res.view('student/event', { persons: somePersons , total: count });  
        },

    // action - paginate
paginate: async function (req, res) {

    var perPage = Math.max(req.query.perPage, 2) || 2;

    var somePersons = await Person.find({
        limit: perPage,
        skip: perPage * (Math.max(req.query.current - 1, 0) || 0)
    });

    var count = await Person.count();

    return res.view('person/paginate', { persons: somePersons, total: count });
},

// action - delete 
delete: async function (req, res) {

    var deletedPerson = await Person.destroyOne(req.params.id);

    if (!deletedPerson) return res.notFound();

    alert("Person deleted.");

    return res.redirect('/'); 
},

// action - update
update: async function (req, res) {

    if (req.method == "GET") {

        var thatPerson = await Person.findOne(req.params.id);

        if (!thatPerson) return res.notFound();

        return res.view('person/update', { person: thatPerson });
        
    } else {
    
        var updatedPerson = await Person.updateOne(req.params.id).set(req.body);

        if (!updatedPerson) return res.notFound();

        return res.ok("Record updated");
    }
},

//show all register of an events
populate: async function (req, res) {

    var person = await Person.findOne(req.params.id).populate("register");

    if (!person) return res.notFound();

    return res.view('person/reg', { persons: person.register});  
},

};



