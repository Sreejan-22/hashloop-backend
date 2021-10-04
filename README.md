# project-hunt-backend

Tech Stack

- Node.js(Express.js)
- Mongoose + MongoDB
- Cloudinary
- Bcrypt
- JSON Web Token
- Multer
- Validator.js

## Routes

| Route               | Request Method | description                |
| ------------------- | -------------- | -------------------------- |
| /singup             | POST           | create a new user in db    |
| /login              | POST           | log in an user             |
| /projects           | GET            | get all projects           |
| /projects/:username | GET            | get all projects of a user |
| /projects           | POST           | create a new project       |
| /projects/:id       | PUT            | edit/update a project      |
| /projects/:id       | DELETE         | delete a project           |
