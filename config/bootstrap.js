module.exports.bootstrap = async function() {
  if (await Person.count() > 0) {
    return;
}

await Person.createEach([
{"ld":"We will swim at a good place","url":"https://picsum.photos/seed/picsum4/500/500","st":"08:35","et":"15:36","quota":"30","createdAt":1635233767613,"updatedAt":1635233767613,"id":1,"name":"swim","sd":"swimming in HK","organizer":"Organizer1","venue":"Venue1","date":"2021-10-27","he":"on","_id":1},
{"ld":"We will play computer game with classmates","url":"https://picsum.photos/seed/picsum1/500/500","st":"08:37","et":"09:37","quota":"50","createdAt":1635233869542,"updatedAt":1635233869542,"id":2,"name":"play game","sd":"play computer game","organizer":"Organizer3","venue":"Venue3","date":"2021-10-29","he":"on","_id":2},
{"ld":"We will study in the HKBU","url":"https://picsum.photos/id/326/300/200.jpg","st":"21:39","et":"23:39","quota":"10","createdAt":1635233980644,"updatedAt":1635233980644,"id":3,"name":"study","sd":"study at night","organizer":"Organizer2","venue":"Venue5","date":"2021-11-03","he":"on","_id":3},
{"ld":"We will eat with some friends in HKBU","url":"https://picsum.photos/seed/picsum5/500/1500","st":"16:51","et":"18:51","quota":"20","createdAt":1635234705436,"updatedAt":1635234705436,"id":4,"name":"eating","sd":"eat with friends","organizer":"Organizer5","venue":"Venue3","date":"2021-12-02","he":"on","_id":4},
{"ld":"have fun","url":"https://picsum.photos/seed/picsum2/1500/500","st":"16:03","et":"18:02","quota":"15","createdAt":1635235375360,"updatedAt":1635235375360,"id":5,"name":"BBQ","sd":"eating","organizer":"Organizer4","venue":"Venue2","date":"2021-10-08","he":"","_id":5}
  
]);

return generateUsers();

async function generateUsers() {

	if (await User.count() > 0) {
		return;
	}

	var hashedPassword = await sails.helpers.passwords.hashPassword('123456');

	await User.createEach([
		{ username: "admin", password: hashedPassword, type:"admin" },
		{username:"admin2",password: hashedPassword, type:"admin"}
		// etc.
	]);

	const event1 = await Person.findOne({name: "swim"});
	const student1 = await User.findOne({username: "student1"});
	const student2 = await User.findOne({username: "student2"});
	const student3 = await User.findOne({username: "student3"});
	const student4 = await User.findOne({username: "student4"});
	const student5 = await User.findOne({username: "student5"});

	await User.addToCollection(student1.id, 'events').members(event1.id);
	await User.addToCollection(student2.id, 'events').members(event1.id);
	await User.addToCollection(student3.id, 'events').members(event1.id);
	await User.addToCollection(student4.id, 'events').members(event1.id);
	await User.addToCollection(student5.id, 'events').members(event1.id);


}
}

