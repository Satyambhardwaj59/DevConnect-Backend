# Dev-connect API

## authRouter

- POST /singup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

## userRouter

- GET /user/connection
- GET /user/request
- GET /user/feed   - Gets you the profiles of other userson platform

### status:  ignore, interested, accepted, rejected

