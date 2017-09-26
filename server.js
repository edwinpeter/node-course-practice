const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//Partial Views
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

//hbs.registerHelper is used to register a function
hbs.registerHelper('getDate', ()=>{
	return new Date();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

app.set('view engine', 'hbs');


// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + "/public"));


//app.use is used to register a middleware
app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method}, ${req.url}`;
	fs.appendFile('server.log', log + "\n", (err)=>{
		if(err){
			console.log("unable to append server.log");
		}
	});
	next();
});

app.get('/', (req, res)=>{
	//res.send('<h1>Hello Express</h1>');
	/*res.send({
		name: 'Edwin',
		likes: [
			'Run',
			'Walk'
		]
	})*/
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		message: 'Welcome'
	});
});


app.get('/about', (req,res)=>{
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req,res)=>{
	res.send({
		errorMessage: "Error cannot la"
	});
});



app.listen(3000);