const http = require('http');
const querystring = require('querystring');

const postData = querystring.stringify({
    email: 'example@email.com',
    password: 'password'
});

const options = {
    hostname: 'localhost',
    port: 4000,
    path: '/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
    }
};

const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => {
        data += chunk;
    });
    res.on('end', () => {
        console.log(JSON.parse(data));
    });
});
// axios
const axios = require('axios');

axios.post('http://localhost:4000/register', {
    email: 'example@email.com',
    password: 'password'
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.log(error);
});


//Connect to your MongoDB database
mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
