#EP-03

- Create a repository  ✅
- Initialize the repository     ✅
- node_module, package-lock.json, package.json find Difference  ❌
- Install express       ✅
- Create a Server       ✅
- Listen to port 7777   ✅
- Write request handlers for /test, /hello      ✅
- Install nodemon and update script inside package.json     ✅
- What is dependencies      ✅
- What is use of "-g" while npm install     ❌
- Difference between caret and tilda [ ^ vs ~ ]     ✅

#EP-04

- Initialize git    ✅
- .gitignore        ✅
- Create a remote repo on github    ✅
- Push all code to remote origin    ✅
- Play with routes and route extensions ex. /hello, /hello/2, /xyz  ✅
- Order of the routes matter a lot      ✅
- Install Postman app and make a workspace/collection > test API call   ✅
- Write logic to handle GET, POST, PUT, PATCH, and DELETE method in API and test all in postman ✅
- Explore routing and use ?, +, *, (), in the route {it will work on Express version 4 but in version 5 it not working ? change into {}, and * ==>{*..}}    ✅ ❌
- use Regex in routes /a/, /.*fly$/ {it also not work on version 5}     ❌
- Reading query params in the routes    ✅
- Reading the Dynamic Routes    ✅

#EP-05

- Multiple route Handeller - Play with the code ✅
- next();   ❌
- next function and errors along with res.send()     ✅
- app.use("/route", rH, [rH2, rH3], rH4, rH5); (rH => route Handler)     ✅
- What is middleware? and Why do we need it?     ✅
- How express js handle request bihind the seen     ❌
- Difference between app.use() and app.all()        ❌
- write a dummy auth middelware for all admin    ✅
- write a dummy auth middelware for all user and expect /user/login  ✅
- Error Handling app.use("/", (err, req, res, next) => {}); always use it in last of all route


#EP-06

- Create a free cluster on MongoDB official website (Mongo Atlas) ✅
- Install mongoose library  ✅
- Connect your application to the Database "Connection-url"/Dev-connect     ✅
- Call the connectDB function and connect to Database before starting application on 7777  ✅
- create a userSchema & user Model      ✅
- Create POST /singup API to add data to database       ✅
- Push some documents using API calls from postman      ✅
- Error Handling using try , catch      ✅

#EP-07

- JS Object vs JSON (difference)    
- Add The express.json() middleware to your code    ✅
- Make your signup API dynamic to recive data from the end user     ✅
- User.findOne with duplicate email ids, which object will return   ✅
- API - GET user by email   ✅
- API - Feed API - GET / Feed - get all the users from the database ✅
- API - GET user by ID      ✅
- Create a delete user API      ✅
- Diffrerence Between PATCH and PUT     
- API - Update a user   ✅
- Explore the mongoose documentation for Model methods  ✅
- What are the options in a Model.findOneAndUpdate method, explore about it     ✅
- API - update the user by emailId      ✅

#EP-08

- Explore schematype options from the documantation ✅
- add required, unique, lowercase, min, minLength, trim ✅
- Add default   ✅
- Create a custom validate function for gender  ✅
- Imporve the DB schema - PUT all appropiate validation on each field in Schema     ✅
- Add timestamps to the userSchema      ✅
- Add API level validation on Patch request & post API      ✅
- DATA Sanitizing - Add API validation for each field       ✅
- Install validator     ✅
- Explore validator library function and use validator function for password, email, and Photo URL  ✅
- NEVER TRUST req.body (incoming data)      ✅

#EP-09

- Validate data in Signup API   ✅
- Install bcrypt package        ✅
- Create PasswordHash using bcrypt.hash & save the user is encrupted password   ✅
- Create login API      ✅
- Compare emailId, Password if it is not match throw same error to avoid information leaking    ✅

#EP-10

- Install cookie-parse      ✅
- Just send a dummy cookie to user      ✅
- create GEt /profile API and check if you get the cookie back  ✅
- Install jsonwebtoken      ✅
- In login API, after email and password validation, create a JWT token and send it to user     ✅
- Read the cookies inside your profile API and find the looged in user      ✅
- userAuth Middleware       ✅
- Add the userAuth middleware in profile API and a new sendConnectionRequest API        ✅
- Set the expiry of JWT token and cookies to 7 days     ✅
- Create userSchema method to getJWT()      ✅
- Create userSchema method to comparePassword(password)     ✅

# EP-11

- Explore tinder APIs   ✅
- Create a list of all API you can think of in DEV-connect      ✅
- Group multiple routes under respective routers    ✅
- Read documentation for express.Router     
- Create routes folder for managing auth, profile, request routers      ✅
- Create authRouter, profileRouter, requestRouter       ✅
- Import these router in app.js     ✅
- Create POST /logout API           ✅
- Create PATCH /profile/edit        ✅
- Create PATCH /profile/password API => forgot password API     ✅
- Make you validate all data in every post, patch apis      ✅

# EP-12

- Create Connection Request Schema      ✅
- Send Connection Request API           ✅
- Proper Validation of Data             ✅
- Think about all corner cases          ✅
- $or query $and query in mongoose  -https://www.mongodb.com/docs/manual/reference/operator/query/
- schema.pre("save") function       ✅
- Read more about indexes in MongoDB        ✅
- Why do we need index in DB        ✅
- What is the advantages and disadvantage of creating of indexes?       
- Read this artical about compound indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- ALWAYS THINK ABOUT CORNER CASES   ✅

# EP-13 

- Write code for proper validation of POST /request/review/:status/:requestId  API
- Thought Process - POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/populate.html
- Create GET /user/connection/received with all checks
- Create GET /user/connection API and test it