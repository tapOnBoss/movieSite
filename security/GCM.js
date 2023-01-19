const crypto = require('crypto');

app.post('/register', (req, res) => {
  // Generate a random initialization vector (IV)
const iv = crypto.randomBytes(12);
  // Define the encryption key
const key = crypto.scryptSync("secretKey", "salt", 24);
  // Create a new GCM cipher
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  // Encrypt the user's password
let encrypted = cipher.update(req.body.password, 'utf8', 'hex');
encrypted += cipher.final('hex');
  // Get the GCM tag
const tag = cipher.getAuthTag();
  // Store the IV, tag, and encrypted password in the database
const newUser = new User({
    email: req.body.email,
    password: {
    iv: iv.toString('hex'),
    tag: tag.toString('hex'),
    encrypted: encrypted
    }
});
newUser.save()
    .then(user => res.json(user))
    .catch(err => console.log(err));
});