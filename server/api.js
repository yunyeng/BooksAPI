module.exports = function(app) {

var mongojs 	 = require("mongojs"),
	request 	 = require("request"),
	moment		 = require("moment"),
    // db 			 = mongojs('googlebooks', ['books', 'users', 'comments']);
	db 			 = mongojs('mongodb://yunyeng:murat131@ds045795.mongolab.com:45795/heroku_3r8s4727', ['books', 'users', 'comments']);

////////////// API Starts //////////////////
/*
	app.post("/api/book/:q", function(req, res){
		console.log(req.body.id);
		var url = 'https://www.googleapis.com/books/v1/volumes/'+req.body.id;
		request(
			{
				url: url,
				json: true
			}, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		        console.log(body); // Print the json response
		        res.json(body);
		    }
		})
	});
*/

	app.post('/api/comment', function(req, res){
		db.comments.insert(req.body, function(err, doc){ 
			/*res.json(doc);*/ 
		});
	});

	app.get('/api/comment/:book_id', function(req, res){
		console.log(req.params.book_id);
		db.comments.find({"book_id": req.params.book_id}, function(err, docs){
			console.log(docs);
			res.json(docs);
		});
	});

	app.post('/api/list/add', function(req, res){
		console.log(req.body);
		var list = req.body;
		if(list.id != undefined && list.id != "undefined"){
			db.users.findOne({"_id": mongojs.ObjectId(list.id)}, function(err, doc){
				if(doc){
					var userList = doc.books;
					userList[list.book] = {"time": moment().format()};
					db.books.findOne({"id": list.book}, function(err2, doc2){
						userList[list.book].book = doc2;
						db.users.findAndModify({
						    query: { "_id": mongojs.ObjectId(list.id) },
						    update: { $set: { "books": userList } },
						    upsert: true
						}, function (err3, doc3) {
						    if(!err3){
						    	res.status(201).send({ message: "The book added to the list."});
						    }
						});
					});
				}
			});
		}
	});

	app.post('/api/list/remove', function(req, res){
		console.log(req.body);
		var list = req.body;
		if(list.id != undefined && list.id != "undefined"){
			db.users.findOne({"_id": mongojs.ObjectId(list.id)}, function(err, doc){
				if(doc){
					var books = doc.books;
					console.log("hey?");
					if(books[list.book]){
						delete books[list.book];
						db.users.findAndModify({
						    query: { "_id": mongojs.ObjectId(list.id) },
						    update: { $set: { "books": books } },
						    upsert: true
						}, function (err, doc, lastErrorObject) {
						    if(!err){
						    	res.status(201).send({ message: "The book removed from the list."});
						    }
						})
					}
				}
			});
		}
	});


	app.get("/api/book/:id", function(req, res){
		console.log(req.params.id);
		var query 	= req.params.id;
		console.log(query);
		// var book = {};
		db.books.findOne({"id": query}, function(err, doc){
			console.log("Coming from: Cache Database");
			// var isbn = doc.volumeInfo.industryIdentifiers[0].identifier;
			// book = doc;
			res.json(doc);
		});
	});

	app.get('/api/list/:id', function(req, res){
		var id 	= req.params.id;
		console.log(id);
		var lists = {};
		var result = {};
		if(id == undefined || id == "undefined"){
			db.users.insert({"books": {}}, function(err, doc){
				lists.id = doc._id;
				res.json(lists);
			});
		} else {
			db.users.findOne({"_id": mongojs.ObjectId(id)}, function(err, doc){
				if(doc){
					console.log("User " + id + " Book List: ");
					result = doc;
					for (var book in result.books){
					  if (result.books.hasOwnProperty(book)){
					    db.books.findOne({"id": book}, function(err2, doc2){
					    	result.books[book].val = doc2;
					    });
					  }
					}
					res.json(result);
				} else {
					db.users.insert({"_id": mongojs.ObjectId(id), "books": {}}, function(err, doc){
						lists.id = doc._id;
						res.json(lists);
					});
				}
			});
		}
	});

	// Core Search API
	app.get("/api/search/:q", function(req, res){
		var query 	= (req.params.q).toLowerCase();
			// page	= 1;
		if(query === undefined || query === "" || query.length < 1)
			return false;
		// if(req.params.p !== undefined) page = parseInt(req.params.p);
		var maxResults = 40;
		// var startIndex = maxResults * (page-1);
		// console.log(startIndex);

		db.books.find( { $or: [ {"volumeInfo.title": new RegExp(query, 'i')}, {"volumeInfo.authors": new RegExp(query, 'i')}  ] }, function(err, doc){
		//db.books.findOne({keyword: query, page: page}, function(err, doc){
			if(doc.length){
				console.log("Coming from: Cache Database");
				console.log(query);
				//console.log(doc);
				var result = {};
				result.items = doc;
				res.json(result);
			} else {
				console.log("Coming from: Google Api");
				var url = 'https://www.googleapis.com/books/v1/volumes?q='+query+'&maxResults='+maxResults;
				// if(page !== undefined) url += '&startIndex='+startIndex;
				request({ url: url, json: true }, function (error, response, body) {
				    if (!error && response.statusCode === 200) {
				        //console.log(body); // Print the json response
				        res.json(body);
				    	db.books.insert(body.items, function(err, doc){ /*res.json(doc);*/ });
				    }
				})
			}
		});
	});

}