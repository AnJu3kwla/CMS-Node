// //add a request statement for the db.js file
// require('./models/db');

// const express = require('express');
// const handleBars = require('express-handlebars');

// //configure routing for the employeeController 
// const employeeController = require('./controllers/employeeController');

// const path = require('path');
// var app = express();

// //configure express middleware for handlebars
// app.set('views',path.join(__dirname,'/views/'));
// app.engine('handlebars',handleBars({extname:'hbs',defaultLayout : 'main',layoutDir : __dirname + '/views/layouts/'}));
// app.set('view engine','handlebars');

// app.listen(3000,function(){
//     console.log('listening on port 3000');
// });

// //adding a route to the employeeController. configure the routing for the NodeJs application
// app.use('/employee',employeeController);

//add a request statement for the db.js file
require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

//configure routing for the employeeController 
const employeeController = require('./controllers/employeeController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/employee', employeeController);
