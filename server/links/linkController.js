

var fs = require('fs');
var screenshot = require('screenshot-stream');



// module.exports = { 
// 	fetchUserName: function(req, res, next){
// 		console.log("*** got to the server");
// 		var user = req.user[0].dataValues.fbEmail;
// 		db.User.findOne({where: {fbEmail: user}})
// 			.then(function(user) {
// 				res.json({userDisplayName : user.fbName});
// 			});
// 	},

// 	/**
// 	 * Description
// 	 * @method fetchMyLinks
// 	 * @param {} req
// 	 * @param {} res
// 	 * @param {} next
// 	 * @return 
// 	 */
// 	fetchMyLinks: function(req, res, next){

// 		var user = req.user[0].dataValues.fbEmail;
// 		//console.log(user);
// 		db.User.findOne({where: {fbEmail: user}})
// 			.then(function(user) {
// 				//console.log(user);
// 				db.Link.findAll({where: 
// 					{
// 						fbEmail: user.dataValues.fbEmail
// 					}
// 				}).then(function(results){

// 					res.json(results.map(function(element){
// 						console.log('********************* GETTING MY LINKS **********************');
// 						console.log(element);
// 						console.log('********************* GETTING MY LINKS **********************');


// 						return {
// 							promoLink: element.promoLink,
// 							updatedAt: element.updatedAt,
// 							linkThumbnail: element.linkThumbnail
// 						}
// 					}));
// 				});
// 			});
// 	},

// 	/**
// 	 * Description
// 	 * @method fetchFriendsLinks
// 	 * @param {} req
// 	 * @param {} res
// 	 * @param {} next
// 	 * @return 
// 	 */
// 	fetchFriendsLinks: function(req, res, next){
// 		//var user = req.user[0].dataValues.fbID;
// 		var user = req.user[0].dataValues.fbEmail.toString();


// 		//db.User.findOne({where:{fbID: user}}).then(function(person){
// 		db.User.findOne({where:{fbEmail: user}}).then(function(person){
// 			console.log("person stored in db---------------------------------------");
// 			console.log(person.dataValues.fbToken);
// 			console.log("person stored in db---------------------------------------");

// 			request("https://graph.facebook.com/me/friends?access_token="+person.dataValues.fbToken, function(error, response, body) {
// 				//after making fb api call, store list of friends fbid in results
// 				console.log("frineds---------------------------------------");
// 				console.log(JSON.parse(body).data);
// 				console.log("frineds---------------------------------------");

// 				var results = JSON.parse(body).data.map(function(user){
// 					console.log("******************---------------------------------------");
// 					console.log(user);
// 					console.log("******************---------------------------------------");
// 					return user.id;

// 					//return user.emails[0].value.toString();
// 				});					
// 				//store friends of user in database
// 				results.forEach(function(ele){
// 					db.FriendsList.findOrCreate({where:{friendAEmail:person.dataValues.fbEmail, friendBiD:ele}});
// 				});
// 			});
// 		});



// 		//db.FriendsList.findAll({where:{friendAiD: user}})
// 		db.FriendsList.findAll({where:{friendAEmail: user}})
// 			.then(function(friends){
// 				if(friends) {
// 					friends = friends.map(function(friend){
// 						return friend.dataValues.friendBiD;
// 					});
// 					var postedLinks = [];

// 					db.User.findAll({where: {fbID: friends}}).
// 					 then(function(users) {
// 					 	console.log("**********fatcat******");
// 					 	console.log(users);

// 					 	if(users) {

// 					 		users = users.map(function(user){
// 					 			return user.dataValues.fbEmail
// 					 		});

// 					 		console.log(users);

// 					 		db.Link.findAll({where: {fbEmail: users}}).
// 					 			then( function(result){
// 					 				console.log("*****RESULTS******");
// 					 				console.log(result);


// 					 				postedLinks = postedLinks.concat(result.map(function(ele){
// 					 					return {
// 					 						userName: ele.dataValues.fbName,
// 					 						promoLink: ele.dataValues.promoLink,
// 					 						updatedAt: ele.dataValues.updatedAt,
// 					 						linkThumbnail: ele.dataValues.linkThumbnail,
// 					 						fbPicture: fbPicture
// 					 					}

// 					 				}));
// 					 				console.log( "***** POSTED LINKS WAHAHAH");
// 					 				console.log(postedLinks);
// 					 				res.json(postedLinks);

// 					 			});
// 					 	}else {

// 					 	}

// 					 });
// 				} else {
// 					res.json("[]");
// 				}

// 			});


// 	},

// 	/**
// 	 * Description
// 	 * @method postLink
// 	 * @param {} req
// 	 * @param {} res
// 	 * @param {} next
// 	 * @return 
// 	 */
// 	postLink: function(req, res, next){

// 		console.log("---------------------- posting links ---------------------------------");
// 		console.log(req.user[0].dataValues);
// 		console.log("---------------------- posting links ---------------------------------");


// 		var link = req.body.link;
// 		var fbID = req.user[0].dataValues.fbID;
// 		var fbName = req.user[0].dataValues.fbName;
// 		var basePath = './frontend/frontend/assets/linkThumbnails/';
// 		// creating a unique image file name
// 		var imageName = fbName.replace(/\s/g, '') + Math.floor(Date.now() / 1000) + link.replace(/\W/g, '') + '.png';
// 		console.log("---------------------- IMAGE NAME ---------------------------------");
// 		console.log(imageName);
// 		var stream = screenshot(link, '1024x768', {crop: true});
// 		stream.pipe(fs.createWriteStream(basePath + imageName));
// 		var imageURL = '/linkThumbnails/' + imageName;

// 		stream.on('finish', function(){
// 		  console.log('------------------ FINISHED SAVING IMAGE ----------------------');
// 		});


// 		db.User.findOrCreate({where: {fbID: fbID}})
// 			.then(function(user){
// 				db.Link.findOrCreate({where: 
// 					{
// 						fbName: user[0].dataValues.fbName,
// 						userId: user[0].dataValues.id,
// 						promoLink: link,
// 						linkThumbnail: imageURL,
// 						fbEmail: user[0].dataValues.fbEmail,
// 						fbPicture: user[0].dataValues.fbPicture,
// 					}
// 				}).then(function(results){
// 					res.sendStatus(201);
// 				});
// 			});
// 	}

// };










var db = require('../db');
var request = require("request");


module.exports = { 
	fetchUserName: function(req, res, next){
		console.log("*** got to the server");
		var user = req.user[0].dataValues.fbID;
		db.User.findOne({where: {fbID: user}})
			.then(function(user) {
				res.json({userDisplayName : user.fbName});
			});
	},

	/**
	 * Description
	 * @method fetchMyLinks
	 * @param {} req
	 * @param {} res
	 * @param {} next
	 * @return 
	 */
	fetchMyLinks: function(req, res, next){

		var user = req.user[0].dataValues.fbID;
		console.log("********************** inside of fetch my links *****************");
		console.log(user);
		console.log("********************** inside of fetch my links *****************");

		db.User.findOne({where: {fbID: user.toString()}})
			.then(function(user) {
				console.log(user);
				db.Link.findAll({where: 
					{
						UserId: user.dataValues.id
					}
				}).then(function(results){

					console.log("********************** RESULTS *****************");
					console.log(results);

					res.json(results.map(function(element){
						return {
							promoLink: element.promoLink,
							updatedAt: element.updatedAt
						}
					}));
				});
			});
	},

	/**
	 * Description
	 * @method fetchFriendsLinks
	 * @param {} req
	 * @param {} res
	 * @param {} next
	 * @return 
	 */
	fetchFriendsLinks: function(req, res, next){
		var user = req.user[0].dataValues.fbID;

		db.User.findOne({where:{fbID: user}}).then(function(person){
			request("https://graph.facebook.com/me/friends?access_token="+person.dataValues.fbToken, function(error, response, body) {
				//after making fb api call, store list of friends fbid in results
				console.log("frineds---------------------------------------");
				console.log(JSON.parse(body).data);
				console.log("frineds---------------------------------------");


				var results = JSON.parse(body).data.map(function(user){

					return user.id;
				});					
				//store friends of user in database
				results.forEach(function(ele){
					db.FriendsList.findOrCreate({where:{friendAiD:person.dataValues.fbID, friendBiD:ele}});
				});


			db.FriendsList.findAll({where:{friendAiD: user}})
				.then(function(friends){
				if(friends) {
					friends = friends.map(function(friend){
						return friend.dataValues.friendBiD;
					});
					var postedLinks = [];
					db.User.findAll({where: {fbID: friends}}).
					 then(function(users) {
					 	console.log("**********fatcat******");
					 	console.log(users);
					 	if(users.length !== 0) {
					 		users = users.map(function(user){
					 			return user.dataValues.id
					 		});
					 		console.log(users);
					 		db.Link.findAll({where: {UserId: users}}).
					 			then( function(result){
					 				console.log("*****RESULTS******");
					 				console.log(result);


					 				postedLinks = postedLinks.concat(result.map(function(ele){
					 					return {
					 						userName: ele.dataValues.fbName,
					 						promoLink: ele.dataValues.promoLink,
					 						updatedAt: ele.dataValues.updatedAt,
					 						linkThumbnail: ele.dataValues.linkThumbnail,
					 						fbPicture: ele.dataValues.fbPicture
					 					}

					 				}));
					 				console.log( "***** POSTED LINKS WAHAHAH");
					 				console.log(postedLinks);
					 				res.json(postedLinks);

					 			});
					 	}else {

					 	}

					 });
				} else {
					res.json("[]");
				}

			});




			});
		});






	},

	/**
	 * Description
	 * @method postLink
	 * @param {} req
	 * @param {} res
	 * @param {} next
	 * @return 
	 */
	postLink: function(req, res, next){

		console.log("---------------------- posting links ---------------------------------");
		console.log(req.user[0].dataValues);
		console.log("---------------------- posting links ---------------------------------");


		var link = req.body.link;
		var fbID = req.user[0].dataValues.fbID;
		var fbName = req.user[0].dataValues.fbName;
		var basePath = './frontend/frontend/assets/linkThumbnails/';
		// creating a unique image file name
		var imageName = fbName.replace(/\s/g, '') + Math.floor(Date.now() / 1000) + link.replace(/\W/g, '') + '.png';
		console.log("---------------------- IMAGE NAME ---------------------------------");
		console.log(imageName);
		var stream = screenshot(link, '1024x768', {crop: true});
		stream.pipe(fs.createWriteStream(basePath + imageName));
		var imageURL = '/linkThumbnails/' + imageName;

		stream.on('finish', function(){
		  console.log('------------------ FINISHED SAVING IMAGE ----------------------');
		});


		db.User.findOrCreate({where: {fbID: fbID}})
			.then(function(user){
				db.Link.findOrCreate({where: 
					{
						fbName: user[0].dataValues.fbName,
						UserId: user[0].dataValues.id,
						promoLink: link,
						linkThumbnail: imageURL,
						fbEmail: user[0].dataValues.fbEmail,
						fbPicture: user[0].dataValues.fbPicture,
					}
				}).then(function(results){
					res.sendStatus(201);
				});
			});
	}

};





