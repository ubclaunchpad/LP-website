# Web Groundwork

## Stacks

This section provides some recommended combinations of technology you can leverage. Feel free to use this guidance to build your own stack by adjusting them as needed (for example, by replacing certain elements or combining different stacks).

::: tip
Have some technologies you enjoy using? See our [Contribution Guide](/CONTRIBUTING.md) to add it here!
:::

<!--- Stack Template - use this to create a new stack section!

### My Stack

| Pros | Cons |
|------|------|
| TODO | TODO |

**Frontend**: TODO

- Frameworks and libraries
- Tooling
- Considerations
- References

**Backend**: TODO

- Frameworks and libraries
- Tooling
- Considerations
- References

**Datastore**: TODO

- Frameworks and libraries
- Tooling
- Considerations
- References

**Other Tooling**: TODO

**Examples**: TODO

--->

### MERN Stack

| Pros | Cons |
|------|------|
| The frontend and backend share similar languages and libraries. | React has a steeper learning curve than other front-end libraries/frameworks. |
An abundance of external libraries and tooling available for these frameworks allows us to focus on application-specific logic instead of boilerplate code. | The abundance of tooling available can be initially overwhelming. |

**Frontend**: React.js

- Frameworks and libraries
  - Component UI libraries: [`AntDesign`](https://ant.design/docs/react/introduce), [`MaterialUI`](https://material-ui.com/), [`SemanticUI`](https://semantic-ui.com/)
  - [`React Router`](https://github.com/ReactTraining/react-router): allows us to build single-page applications with navigation
- Tooling
  - For getting started, [`create-react-app`](https://create-react-app.dev/) produces React boilerplate setup with no configuration needed
  - For debugging purposes, [`React Developer Tools`](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) is a Chrome extension that allows developers to inspect the component hierarchy
  - For managing application state, [`Redux`](https://redux.js.org/) is a popular choice
  - For build tools, [`Babel`](https://babeljs.io/docs/en/) transcompiles modern JavaScript and JSX into older versions for compatibility
- Considerations
  - Pro: React's popularity in the community means that there is no shortage of learning resources
  - Con: React is less opinionated than other front-end frameworks like Vue or Angular and can become difficult to structurally maintain in the long run. React also uses a lot of "magic" and beginners diving deep into it without learning JavaScript fundamentals beforehand often find themselves struggling later
- References
  - [React documentation](https://reactjs.org/)
  - [JavaScript resources](/resources/languages.md#javascript)
  - [TypeScript resources](/resources/languages.md#typescript)

**Backend**: Node.js

- Frameworks and libraries
  - [`Express.js`](https://expressjs.com/): a minimal web application framework used for building REST APIs
  - [`Socket.io`](https://socket.io/): allows us to manage real-time event-based communication using web sockets
- Tooling
  - For productivity, [`nodemon`](https://nodemon.io/) automatically restarts the application upon changes detected
- Considerations
  - Pro: Node.js applications scale up well and are known for being performant. Like React, it is also backed by a large community and hence, learning resources are always available
  - Con: Being a single-threaded environment, Node.js is not suitable for CPU-intensive applications (e.g. audio/video processing)
- References
  - [Node.js documentation](https://nodejs.org/en/)

**Datastore**: MongoDB

- Frameworks and libraries
  - [`Mongoose`](https://mongoosejs.com/): a popular library for using MongoDB from Node.js applications
- Tooling
  - For visualizing and manipulating data quickly, [`Studio 3T`](https://studio3t.com/) can be installed on Mac, Linux, or Windows
- Considerations
  - Pro:
    - Being a NoSQL database, MongoDB is good for non-structured or schemaless data. The usage of JSON-like documents makes it pair well with Node.js
    - A [`Docker Image`](https://hub.docker.com/_/mongo) for MongoDB is available. If you have Docker installed, you can spin up a MongoDB container very easily without installing mongo locally
    - A cloud-hosted MongoDB service, [`MongoDB Atlas`](https://www.mongodb.com/cloud/atlas) is available on AWS, Azure and Google Cloud. With this service, you can deploy, operate, and scale a MongoDB database in just a few clicks
  - Con: MongoDB Atlas Free Tier only allows 10GB in/out of a cluster per week - see [Atlas M0 (Free Tier), M2, and M5 Limitations](https://docs.atlas.mongodb.com/reference/free-shared-limitations/)
- References
  - [MongoDB documentation](https://docs.mongodb.com/)

**Other Tooling**:
- For managing dependencies, [`npm`](https://www.npmjs.com/) is the default for Node.js

**Examples**:
- [`ubclaunchpad/food-doods`](https://github.com/ubclaunchpad/food-doods) is an example of a microservice architecture where the recipe and user services use Node.js, Express.js and MongoDB Atlas with Mongoose

### Sync Stack

| Pros | Cons |
|------|------|
| Shared language means easier onboarding for inexperienced members. Unopinionated technologies allow for customizability - especially consider this stack if you have a niche use case. | React is not the easiest frontend framework to learn |
 Going "accountless" means much less overhead and initial set up, and skips the need to handle user accounts and credentials. | Complex data structures and data relationships may not fit well with a simple key value store. "Accountless" means it can be difficult to “attach” information to a specific user. |

**Frontend**: React.js (TypeScript)

- Frameworks and libraries
  - Material UI: [Material UI](https://material-ui.com/) is React UI framework for easily building React components.
- Tooling
  - [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) is a simple way to setup the frontend.
- Considerations
  - Pro: React is currently (2020) the most popular frontend framework. This means that it has a lot of community support (eg. stack overflow), and large number of libraries/packages which can help with your project.
  - Pro + Con: React is unopinionated - meaning the build and structure of your application is up to you. There are many ways to do everything in React, and each approach has its own advantages and disadvantages, so it's up to you to decide which is best for your project.
  - [TypeScript resources](/resources/languages.md#typescript)

**Backend**: Node.js (TypeScript)
- Frameworks and libraries
  - [Express](https://expressjs.com/) is a popular Node.js server-side framework. It provides a set of features that makes backend developing easier. Like React, it is unopinioated and there are many ways to solve the same problem. [Express app generator](https://expressjs.com/en/starter/generator.html) can quickly set up application boilerplate
  - Logging: [`Pino`](https://github.com/pinojs/pino) is a low-overhead structured Node.js logger.
- Tooling

**Datastore**: Redis

- Frameworks and libraries
  - [`Redis`](https://redis.io/) is a versatile "key-value" store (like a big hashmap) which can be used as a database and/or a cache
- Considerations
  - Pro: Simple key-value storage, no schemas or column names required
  - Pro: In-memory database means it has high read and write speed - great for real-time applications
  - Con: In-memory database means data sets can't be larger than memory

**Other Tooling**: None

**Examples**:

- [`ubclaunchpad/sync`](https://github.com/ubclaunchpad/sync)

### Rob's Stack

| Pros | Cons |
|------|------|
| Strongly typed, use of code generation reduces boilerplate. GraphQL has good tooling. | Golang does not have a steep learning curve, but can seem intimidating |

**Frontend**: Vue.js and Typescript

- Frameworks and libraries
  - GraphQL: [Vue Apollo](https://apollo.vuejs.org/)
- Tooling
  - `vue-cli` is a great way to kickstart the frontend - just follow [the guide](https://vuejs.org/v2/guide/typescript.html#Project-Creation)
- Considerations
  - Pro: Vue.js is a beginner-friendly template-based library with very nice tooling via `vue-cli`, and TypeScript gives a good foundation for non-trivial projects
  - Con: TypeScript can have a steep learning curve, and Vue library choices might be more limited
- References
  - [TypeScript resources](/resources/languages.md#typescript)

**Backend**: Golang

- Frameworks and libraries
  - GraphQL: [`gqlgen`](https://github.com/99designs/gqlgen) is a great schema-first server generator - it will write most of the Go server boilerplate for you. You can also easily add an [API playground](https://pkg.go.dev/github.com/99designs/gqlgen@v0.11.3/graphql/playground?tab=doc), which helps a lot during development!
  - Logging: [`zap`](https://github.com/uber-go/zap) is a versatile logger that can output both console-style and machine-readable JSON formats
- Tooling
  - The standard Go toolchain offers pretty much everything you'll need, from building to testing - see the [`go` command reference](https://golang.org/cmd/go/)
- Considerations
  - If you decide to not go with GraphQL, [`chi`](https://github.com/go-chi/chi) is a lightweight Express-style library for building standard REST APIs.
- References
  - [Go resources](/resources/languages.md#go)

**Datastore**: DynamoDB

- Frameworks and libraries
  - [`dynamo`](https://github.com/guregu/dynamo) is a Mongo-style Go client for DynamoDB
- Tooling
  - You can use the DynamoDB Docker container to run your application locally and build integration tests - see [`ubclaunchpad/pinpoint`'s testing Docker Compose setup](https://sourcegraph.com/github.com/ubclaunchpad/pinpoint/-/blob/dev/testenv.yml)
- Considerations
  - Pro: DynamoDB is basically free for most use cases! (no cost up to 25GB as of June 2020)
  - Con: DynamoDB table design requires special care due to the way it works - see the [DnyamoDB best practices guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
- References
  - [`ubclaunchpad/rocket2` DynamoDB reference](https://rocket2.readthedocs.io/en/latest/docs/Database.html)

**Other Tooling**: None

**Examples**:

- [`ubclaunchpad/ubclaunchpad.com`](https://github.com/ubclaunchpad/ubclaunchpad.com) is a good example of a Vue.js frontend
- The [`bobheadxi/timelines` server](https://sourcegraph.com/github.com/bobheadxi/timelines@master/-/tree/server) has an example GraphQL implementation using `gqlgen`

## Further Reading

- [Analytics tooling at Launch Pad](/handbook/tools/analytics.md)
- [Repository management at Launch Pad](/handbook/project-management/repositories.md)
- [Deployment options at Launch Pad](/handbook/tools/deployment.md)
