// S3 bucket, and configure the necessary permissions for Elastic Beanstalk and CodeDeploy to access the bucket
const s3 = new AWS.S3({
    apiVersion: '2006-03-01'
});

s3.createBucket({
    Bucket: 'my-bucket'
}, (err, data) => {
    if (err) {
    console.log(err);
    } else {
      // Configure bucket permissions
    }
});

const codedeploy = new AWS.CodeDeploy({
    apiVersion: '2014-10-06'
});
codedeploy.createApplication({
    applicationName: 'my-app'
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        codedeploy.createDeploymentGroup({
        applicationName: 'my-app',
        deploymentGroupName: 'my-group',
        ec2TagFilters: [
            {
            key: 'Stack',
            value: 'production',
            type: 'KEY_AND_VALUE'
        }
        ]
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
          // Configure CodeDeploy permissions
        }
     });
    }
});

//Store encryption here as encrypted data
app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
        console.log(err);
    } else {
        const newUser = new User({
        email: req.body.email,
        password: hash
        });
        newUser.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
        }
    });
});
