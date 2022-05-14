module.exports.bootstrap = async function() {
  if (await Person.count() > 0) {
    return;
}

await Person.createEach([
	{"name":"Air Force 1","sd":"Sports shoes, sportswear, sports accessories.","ld":"The Air Force 1 was born in 1982 and is deeply rooted in the sport of basketball. At that time, six basketball players were selected to endorse the shoe, and they were carefully selected defensive specialists who brought the basketball shoe to the world. The classic poster, the tough stance, Malone and his partners showcased the six elements of AF1 success: grandeur, durability, transcendence, grandeur, consistency and purity. the AF1 conquered the earth!","url":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fec4.images-amazon.com%2Fimages%2FI%2F61f5eNnhn5L._SL1040_.jpg&refer=http%3A%2F%2Fec4.images-amazon.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655094713&t=7e465bbea0077429f53a79d63e9f5752","organizer":"Nike","date":"2021-12-09","st":"15:45","et":"17:45","venue":"America","quota":12,"he":"on","createdAt":1652503532572,"updatedAt":1652503532572,"id":6,"_id":6},
	{"name":"Lao Gan Ma","sd":"Lao Gan Ma brand oil chili is one of the traditional flavor food in Guizhou region","ld":"In recent decades, it has been carefully brewed with traditional techniques, featuring elegant and delicate, spicy and outstanding, and long aftertaste. It is a must-have at home and a good gift for friends and relatives. In 1984, Ms. Tao Huabei, with her unique frying process, introduced a unique flavorful seasoning for meals, which has delighted the customers.","url":"https://img2.baidu.com/it/u=2102918777,1726810214&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500","organizer":"Lao GanMa","date":"2021-07-07","st":"16:53","et":"21:53","venue":"China","quota":1,"he":"on","createdAt":1652504041422,"updatedAt":1652504041422,"id":7,"_id":7},
	{"name":"Orion","sd":"Holliday is the pioneer of pie products and pie culture.","ld":"Since 1974, when Holliday's chocolate pies were first introduced and marketed, they have been selling well for more than 30 years. The pies produced by Goodwill have been sold well in more than 60 countries and regions overseas and hold the absolute leading share in the world chocolate pie market. Since its launch in 2003, the HOLLYWOOD xylitol sugar-free gum has also been well received by consumers and has been well received by the market.","url":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi2%2FTB1djmaFVXXXXc6XXXXXXXXXXXX_%21%210-item_pic.jpg_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655096166&t=209cda12d5190cd3a816e4456c01068a","organizer":"Orion","date":"2022-05-06","st":"10:56","et":"17:56","venue":"Korea","quota":2,"he":"on","createdAt":1652504214729,"updatedAt":1652504214729,"id":8,"_id":8},
	{"name":"EVISU","sd":"Founded in 1991 in Osaka, Japan, it was named after the god of Japanese prosperity.","ld":"Initially, only about 14 pairs of jeans were produced each day, each carefully hand-painted and bearing the now famous Seagull logo. As a result, the brand attracted a detail-obsessed Japanese fashion crowd and sparked interest in the fabrics and elements of old-fashioned denim.","url":"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg14.360buyimg.com%2Fn8%2Fjfs%2Ft1%2F31278%2F15%2F5694%2F106295%2F5c88c63eE99c3f50d%2F4a9498904bf952ef.jpg&refer=http%3A%2F%2Fimg14.360buyimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655096430&t=d6d6ed628b918fd5f2cd6915e1509548","organizer":"EVISU","date":"2022-02-09","st":"01:01","et":"16:01","venue":"Japan","quota":3,"he":"on","createdAt":1652504481492,"updatedAt":1652504481492,"id":9,"_id":9}
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

