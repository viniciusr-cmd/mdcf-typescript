[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[EXPRESS__BADGE]: https://img.shields.io/badge/express-005CFE?style=for-the-badge&logo=express
[MONGO_BADGE]:https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white

<h1 align="center" style="font-weight: bold;">MDCF Typescript 💻</h1>

<div align="center">

![express][EXPRESS__BADGE]
![typescript][TYPESCRIPT__BADGE]
![mongo][MONGO_BADGE]
![Mongoose Badge](https://img.shields.io/badge/Mongoose-800?logo=mongoose&logoColor=fff&style=for-the-badge)
![Vitest Badge](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff&style=for-the-badge)

</div>

<p align="center">
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> •
  <a href="#tests">Unit and E2E Tests</a>
</p>

<p align="center">
  <b>This project is a simple preview of how to use local session cookies for user authentication, using as few external libraries and frameworks as possible.</b>
</p>
<h2 id="whycookie">🍪 SessionToken Cookie rather than JWT (JSON Web Tokens)?</h2>
<p>Session-based approaches are more appropriate for applications that prioritise server-side control, robust session management, and sensitive data protection.
</p>

<h2 id="started">🚀 Getting Started</h2>
<h3>Prerequisites</h3>

Here is a list of all requisites to run this project.

- [NodeJS](https://nodejs.org/en) / [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [MongoDB](https://www.mongodb.com/pt-br)
- [Git](https://github.com)

<h3>Cloning</h3>

 1. **Clone the repository**: Clone the project repository to your local machine using the following command in your terminal emulator:

```bash
git clone https://github.com/viniciusr-cmd/mdcf-typescript.git
```

2. **Navigate to the project directory**: Change your current directory to the project directory:

```bash
cd mdcf-typescript
```

3. **Install dependencies**: Install the project dependencies.

**NPM**
```bash
npm install
```

**YARN**
```bash
yarn install
```

4. **Start the project**: Finally start the project.

**NPM**
```bash
npm start
```

**YARN**
```bash
yarn run
```

<h2 id="tests"> 📝 Running Unit Tests</h3>

This project uses [Vitest](https://vitest.dev/) for unit testing. Follow these steps to run the tests:

1. **Navigate to the project directory**: If you're not already there, change your current directory to the project directory:
```bash
cd mdcf-typescript
```

2. **Install dependencies**: If you haven't already done so, install the project dependencies:

**NPM**
```bash
npm install
```

**YARN**
```bash
yarn install
```

3. **Run the tests**: Use the following command to run the unit tests:

**NPM**
```bash
npm test
```

**YARN**
```bash
yarn test
```

**NPX**
```bash
npx vitest
```


<h2 id="routes">📍 API Endpoints</h2>

Here is listed the main routes of API, and what are their expected request and response bodies.
​
| ROUTE               | DESCRIPTION                                          
|----------------------|-----------------------------------------------------
| POST <kbd>/auth/register</kbd>     | registers user into mongodb database [request details](#post-auth-detail)
| POST <kbd>/auth/login</kbd>     | logs user if registered in database [request details](#postlogin-auth-detail)
| PATCH <kbd>/users/:id</kbd>     | updates the specified user given their ID and if they are the owner [request details](#patch-detail)
| DELETE <kbd>/users/:id</kbd>     | deletes the specified user given their ID and if they are the owner [response details](#delete-detail)
| GET <kbd>/users</kbd>     | get all users info for debug [response details](#getall-detail)


<h3 id="post-auth-detail">POST /auth/register</h3>

**REQUEST**
```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

**RESPONSE**

```json
{
  "authentication": {
    "password": "e0dc347803777c3bf601ebbc2e1c1223c8b4ec1ff6567507823babb6b15bcaae",
    "salt": "trHLYZNZ8L5v6YQHPduclIeEjAX6XfCJDtTmGr7LtYTGdsDtVw5fLPk5NfebChAHy2vrfIUvzRre48PvTDl8LHZid0ahLacF5NQ5HswAHD8QYURMmXXTtP3JlMGbhe2eR3mw45RtdQQwR0hPntpIjSH3sE1cdf3IUvkhtk8As2I=",
    "sessionToken": "651b7dcd0fd8cb5ae3687e8518470aca12e4d0d989ad66de1207eaf473f973fe"
  },
  "_id": "65da248452b8fd995ae08b92",
  "username": "testuser",
  "__v": 0
}
```

<h3 id="postlogin-auth-detail">POST /auth/login</h3>

**REQUEST**
```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

**RESPONSE**
```json
{
  "authentication": {
    "password": "e0dc347803777c3bf601ebbc2e1c1223c8b4ec1ff6567507823babb6b15bcaae",
    "salt": "trHLYZNZ8L5v6YQHPduclIeEjAX6XfCJDtTmGr7LtYTGdsDtVw5fLPk5NfebChAHy2vrfIUvzRre48PvTDl8LHZid0ahLacF5NQ5HswAHD8QYURMmXXTtP3JlMGbhe2eR3mw45RtdQQwR0hPntpIjSH3sE1cdf3IUvkhtk8As2I=",
    "sessionToken": "651b7dcd0fd8cb5ae3687e8518470aca12e4d0d989ad66de1207eaf473f973fe"
  },
  "_id": "65da248452b8fd995ae08b92",
  "username": "testuser",
  "__v": 0
}
```

<h3 id="patch-detail">PATCH /users/:id</h3>

**REQUEST**
```json
{
  "username": "TESTUSERUPDATED"
}
```

**RESPONSE**
```json
{
	"authentication": {
		"password": "f3a8f30ee08e90b348a4a7b9a81008ab363176f8dab32b7c3bbc74c6f4f1acf7",
		"salt": "1prFs01jEV5TGz5z8DneFJRiAzYg/AbE+jG92W/NZjrXYBXA2cn8saOtWcFUePbVYJhSzG7fx7tBrS2xouayp4R+KRdpPoif+T2uRgrcNTdvVcq+KXxyyt1G+rpkDZWmZwWLdC3hB8xvwTTYYAonM15rSJszQM7/q3a3bXDX03U=",
		"sessionToken": "7dd4efbff4ca66e4fa380294a66787a6ef6fac79b08f9745069f37e00ad1a947"
	},
	"_id": "65da2a0e3aa903838235d7e4",
	"username": "TESTUSERUPDATED",
	"__v": 0
}
```

<h3 id="delete-detail">DELETE /users/:id</h3>

CURL **REQUEST**
```curl
curl --request DELETE \
  --url http://localhost:8080/users/65da2a0e3aa903838235d7e4
```

**RESPONSE**
```json
204 No Content
```



<h3>Documentations that might help</h3>

[📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)