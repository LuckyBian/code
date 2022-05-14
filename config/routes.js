
module.exports.routes = {

// go to visitor page
'GET /': 'PersonController.page',
'GET /admin': 'PersonController.adminPage',
'GET /student': 'PersonController.studentPage',

//create a new event(Admin)
'GET /person/create' : 'PersonController.create',
'POST /person/create' : 'PersonController.create',

// See json format
'GET /person/json' : 'PersonController.json',

// Admin the event(Admin)
'GET /person/admin': 'PersonController.admin',

//Search event for admin(Admin)
'GET /person/search': 'PersonController.event',
'POST /person/search': 'PersonController.event',

//Search event for vistor(Vistor)
'GET /vistor/search': 'PersonController.vistorEvent',
'POST /vistor/search': 'PersonController.vistorEvent',


'GET /person/paginate': 'PersonController.paginate',


// See Event details for admin(Admin)
'GET /person/list' : 'PersonController.search',
'POST /person/list' : 'PersonController.search',

// See Event details for vistor(Vistor)
'GET /vistor/list' : 'PersonController.vistorSearch',
'POST /vistor/list' : 'PersonController.vistorSearch',

// Delete an event(Admin)
'POST /person/delete/:id': 'PersonController.delete',

// Update the event(Admin)
'GET /person/update/:id': 'PersonController.update',
'POST /person/update/:id': 'PersonController.update',

//Login and logout(All user)
'GET /user': 'UserController.login',
'GET /user/login': 'UserController.login',
'POST /user/login': 'UserController.login',
'POST /user/logout': 'UserController.logout',
'GET /user/logout': 'UserController.logout',
'GET /user/register': 'UserController.register',

//let admin see all registers of an event
'GET /person/:id/register': 'PersonController.populate',

//show all events of a user
'GET /user/events': 'UserController.populate',


'DELETE /user/events/remove': 'UserController.remove',



};
