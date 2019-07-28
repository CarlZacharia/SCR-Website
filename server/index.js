var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');

app.use(cors());

var authCheck = jwt({
	secret: new Buffer('obybdkprhLPGfPf9qfp-fZoH8PSK2_PettIAMoB3Q-k_Q-cWvlEwx5j5RbNktgx7', 'base64'),
	audience: 'jGUgQ5BdS8Y5SL5qrtIMRTrb7VQDecZA'
});

app.get('/api/public', function(req, res) {
	res.json({message: 'Hi from public endpoint'});
});

app.get('/api/private', authCheck, function(req, res) {
	res.json({message: 'Authentication Required'});
});

app.listen(3001);
console.log('Listening on localhost:3001');