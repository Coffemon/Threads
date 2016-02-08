var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

var threads = [
	
]


app.get('/threads', function (req, res) {
	res.sendFile("index.html", {root:__dirname+ "/public"})
});

app.get('/api/threads', function (req, res) {
	res.json({threads: threads})
});

app.post('/api/threads', function (req, res) {
	console.log(req.body)
	threads.push({
		text: req.body.text
	})
	res.redirect("/threads")
});

app.put("/api/threads/:id", function (req, res) {

	threads[req.params.id-1].text = req.body.text

 		res.redirect("/threads");
})


app.delete('/api/threads/:id', function (req, res) {
	//delete threads[req.params.id-1]	

	threads.splice(req.params.id-1, 1);

	res.redirect("/threads");
});

var server = app.listen(1337, function () {
	var port = server.address().port;

	console.log('Server up and running on leet connection: ' + port);
});
