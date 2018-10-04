//dependecies
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

/*
Get login page
*/
exports.getLogin = (req, res) => {

    res.sendFile('pages/login.html', {root: __dirname});
};

/*
Validate Credentials (userName -> admin / password -> root)
Generating a Session ID and a Token
set cookie on header
 */
exports.validateCredentials = (req, res) => {


    if (req.body.inputUsername && req.body.inputPassword){

        const username = req.body.inputUsername;
        const password = req.body.inputPassword;



        if (username === 'admin' && password === 'root') {

            const sessionID = req.cookies['session-id'];
            const cookieToken = req.cookies['csrf-token'];

            // Generating Session ID and Token
            const SESSION_ID = uuidv1();
            const CSRF_TOKEN = uuidv4();

            if (!sessionID && !cookieToken) {

                // Setting Cookie on Header
                res.setHeader('Set-Cookie', [`session-id=${SESSION_ID}`, `time=${Date.now()}`, `csrf-token=${CSRF_TOKEN}`]);

            } else {

                console.log('POST /home Some Session ID and CSRF Token Found')
            }


            res.sendFile('pages/form.html', {root: __dirname});

        } else {

            const error = {status: 401, message: 'Invalid Credentials'};
            res.sendFile('pages/form-error.html', {root: __dirname});
        }
    }else{

        const error = {status: 401, message: 'Invalid Credentials'};
        res.sendFile('pages/form-error.html', {root: __dirname});
    }


}

/*
submit form
check matching of CSRF token
print request
response ( success message or error message)
 */
exports.submitForm = (req, res) => {

    const content = req.body.inputContent;

    const inputToken = req.body.inputToken;
    const cookieToken = req.cookies['csrf-token'];

    // Checking if Cookie Token matches CSRF Token Submitted
    if (cookieToken === inputToken) {

        res.sendFile('pages/form-success.html', {root: __dirname});

        console.log('New content-> '+ content);

    } else {

        res.sendFile('pages/form-error.html', {root: __dirname});
    }
}

/*
log out and clear the session ID and CSRF token
 */
exports.logOut = (req, res) => {

    const sessionID = req.cookies['session-id'];

    res.clearCookie("session-id");
    res.clearCookie("time");
    res.clearCookie("csrf-token");

    res.sendFile('pages/login.html', {root: __dirname});
}

/*
get home page
 */
exports.getHome = (req, res) => {

    const sessionID = req.cookies['session-id'];
    const cookieToken = req.cookies['csrf-token'];

    if (sessionID && cookieToken) {

        res.sendFile('pages/form.html', {root: __dirname});

    } else {

        res.sendFile('pages/login.html', {root: __dirname});
    }
}

exports.logOut = (req, res) => {
    res.redirect('/');
}


