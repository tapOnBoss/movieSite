const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    let cipher = crypto.createCipher
}

app.post('/register', (req, res) => {
    const cipher = crypto.createCipher('aes-256-cbc', 'secretKey');
    let encrypted = cipher.update(req.body.password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const newUser = new User({
    email: req.body.email,
    password: encrypted
    });
    newUser.save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});  
