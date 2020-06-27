# Web Groundwork

::: warning
This page is a work in progress - see our [planning document](https://docs.google.com/document/d/1ZyX8MtEF7v_ka6EvxtyrTnYZv_0YCwVAyygOQmzARYY/edit#).
:::

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
| You can use either JavaScript or TypeScript with React and Node.js. This can minimize the cognitive overhead of switching between stacks, allowing your team to be more productive. | React has a steeper learning curve than other front-end libraries/frameworks. |
An abundance of external libraries and tooling available for these frameworks allows us to focus on application-specific logic instead of boilerplate code. | The abundance of tooling available can be initially overwhelming. |

**Frontend**: React.js

- Frameworks and libraries
  - Component UI libraries: [`AntDesign`](https://ant.design/docs/react/introduce), [`MaterialUI`](https://material-ui.com/), [`SemanticUI`](https://semantic-ui.com/)
  - [`React Router`](https://github.com/ReactTraining/react-router): allows us to build SPAs with navigation
  
- Tooling
  - For getting started, [`create-react-app`](https://create-react-app.dev/) produces React boilerplate setup with no configuration needed
  - For debugging purposes, [`React Developer Tools`](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en#:~:text=React%20Developer%20Tools%20is%20a,%22%20and%20%22%E2%9A%9B%EF%B8%8F%20Profiler%22) is a Chrome extension that allows developers to inspect the component hierarchy
  - For managing application state, [`Redux`](https://redux.js.org/) is a popular choice
  - For build tools, [`Babel`](https://babeljs.io/docs/en/) transcompiles modern JavaScript and JSX into older versions for compatibility
- Considerations
  - Pro: React's popularity in the community means that there is no shortage of learning resources
  - Con: React is less opinionated than front-end frameworks like Vue or Angular and can become difficult to structurally maintain in the long run. React also uses a lot of "magic" and beginners diving deep into it without learning JavaScript fundamentals beforehand often find themselves struggling later

- References
  - [React documentation](https://reactjs.org/)
  - [TypeScript resources](/resources/languages.md#typescript)

**Backend**: Node.js

- Frameworks and libraries
  - [`Express.js`](https://expressjs.com/): a minimal web application framework used for building REST APIs
  - [`Socket.io`](https://socket.io/): allows us to manage real-time event-based communication using web sockets
- Tooling
  - For productivity, [`nodemon`](https://nodemon.io/) automatically restarts the application upon changes detected
- Considerations
  - Pro: Node.js applications scale up well and are known for their being performant. Like React, it is also backed by a large community and hence, learning resources are always available
  - Con: Being a single-threaded environment, Node.js is not suitable for CPU-intensive applications (e.g. audio/video processing)
- References
  - [Node.js documentation](https://nodejs.org/en/)

**Datastore**: MongoDB

- Frameworks and libraries
  - [`Mongoose`](https://mongoosejs.com/): an Object Data Modelling (ODM) library for MongoDB
- Tooling
  - For visualizing and manipulating data quickly, [`MongoDB Compass`](https://www.mongodb.com/products/compass) can be installed on Mac, Linux, or Windows
- Considerations
  - Pro: Being a NoSQL database, MongoDB is good for non-structured or schemaless data. The usage of JSON-like documents makes it pair well with Node.js.
  - Con: MongoDB Atlas Free Tier only allows 10GB in/out of a cluster per week - see [Atlas M0 (Free Tier), M2, and M5 Limitations](https://docs.atlas.mongodb.com/reference/free-shared-limitations/)
- References
  - [MongoDB documentation](https://docs.mongodb.com/)

**Other Tooling**:
  - For managing dependencies, [`npm`](https://www.npmjs.com/) is the default for Node.js but [`yarn`](https://yarnpkg.com/) is a good alternative

**Examples**:
- [`ubclaunchpad/food-doods`](https://github.com/ubclaunchpad/food-doods) is an example of a microservice architecture using Express.js on top of Node.js and MongoDB 

### Sync Stack

TODO

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
