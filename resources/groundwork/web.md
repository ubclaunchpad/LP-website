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
| Strongly typed, use of code generation reduces boilerplate. GraphQL has good tooling. | Golang does not have a steep learning curve, but can seem intimidating |

**Frontend**: React.js

- Frameworks and libraries
  - GraphQL: [Vue Apollo](https://apollo.vuejs.org/)
- Tooling
  - `vue-cli` is a great way to kickstart the frontend - just follow [the guide](https://vuejs.org/v2/guide/typescript.html#Project-Creation)
- Considerations
  - Pro: Vue.js is a beginner-friendly template-based library with very nice tooling via `vue-cli`, and TypeScript gives a good foundation for non-trivial projects
  - Con: TypeScript can have a steep learning curve, and Vue library choices might be more limited
- References
  - [TypeScript resources](/resources/languages.md#typescript)

**Backend**: Node.js

- Frameworks and libraries
  - GraphQL: [`gqlgen`](https://github.com/99designs/gqlgen) is a great schema-first server generator - it will write most of the Go server boilerplate for you. You can also easily add an [API playground](https://pkg.go.dev/github.com/99designs/gqlgen@v0.11.3/graphql/playground?tab=doc), which helps a lot during development!
  - Logging: [`zap`](https://github.com/uber-go/zap) is a versatile logger that can output both console-style and machine-readable JSON formats
- Tooling
  - The standard Go toolchain offers pretty much everything you'll need, from building to testing - see the [`go` command reference](https://golang.org/cmd/go/)
- Considerations
  - If you decide to not go with GraphQL, [`chi`](https://github.com/go-chi/chi) is a lightweight Express-style library for building standard REST APIs.
- References
  - [Go resources](/resources/languages.md#go)

**Datastore**: MongoDB

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
