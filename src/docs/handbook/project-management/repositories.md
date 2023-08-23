# 📦 Repository Management

All project work (code or not), documentation, etc. should be done or tracked in a repository within the UBC Launch Pad GitHub organization. This page outlines general advice for how to use and maintain repositories.

## Notifications

Make sure your entire team has [set up notifications correctly](/handbook/tools/github.md#setting-up-notifications)! This helps everyone stay in the loop on your project's progress and discussions.

## Issues and Tasks

Refer to our [sprint planning guide](/handbook/project-management/sprints.md#managing-tasks) for advice on how to manage issues and tasks in your repository!

## Documentation

Each repository should be accompanied by a set of documentation written in [Markdown](/handbook/tools/github.md#markdown) starting with the README, typically named `README.md`. Your README is the primary way for your team to showcase your awesome project to the world - take the time to make it informative and legible!

In your README, make sure you include or link to:

- **A summary of your software** - in particular, briefly and succinctly outline what role your project plays or what problem it solves.
  - For example, the [`ubclaunchpad/inertia` README](https://github.com/ubclaunchpad/inertia/blob/master/README.md) includes a section on what the project does, its features, and who might want to use it.
- **Usage instructions** - this could be a link to a deployed website and/or how to download and get started with using your project.
  - For example, the [`ubclaunchpad/ubclaunchpad.com` README](https://github.com/ubclaunchpad/ubclaunchpad.com/blob/master/README.md) includes a link to the deployed website and the [project's `USING.md`](https://github.com/ubclaunchpad/ubclaunchpad.com/blob/master/USING.md), which covers some tips on how to use the website.
- **Development instructions** - make sure to cover everything that someone might need to get started with development on your project without any help. This could include development environment setup, project structure, and best practices. Since this can get quite lengthy, you can place this documentation in a separate `CONTRIBUTING.md` file, and link to it from your project README.
  - For example, the [`ubclaunchpad/ubclaunchpad.com` Contribution Guide](https://github.com/ubclaunchpad/ubclaunchpad.com/blob/master/CONTRIBUTING.md) and [`ubclaunchpad/inertia` Contribution Guide](https://github.com/ubclaunchpad/inertia/blob/master/CONTRIBUTING.md) both include detailed instructions on how to get set up and start hacking on the project.
- **Project writeup** - this could be a link to a blog post, a part of your README, or another file that documents your project's journey from start to end. It's a great way to highlight the work that went into your project!
  - For example, the [`ubclaunchpad/food-doods` README](https://github.com/ubclaunchpad/food-doods/blob/master/README.md) documents the team's ideas, pain points they encountered, design mockups, and more.

## Code Tooling

Most modern programming languages have things we call "linters" or other static analysis tools to catch "obvious" mistakes and enforce code style and documentation rules. These tools often feature [code editor](/resources/tools.md#writing-code) integrations that can give you feedback on problems and even fix your code as you type!

Code tooling is generally language-specific - for example:

- JavaScript and Typescript projects have [eslint](https://eslint.org/), [Prettier](https://prettier.io/), and more
- Python has [pycodestyle](https://pypi.org/project/pycodestyle/), [flake8](https://flake8.pycqa.org/en/latest/), and even static type checks using [mypy](http://mypy-lang.org/)
- Golang has [go fmt](https://golang.org/cmd/gofmt/) and [govet](https://golang.org/cmd/vet/)

## Tests

Tests refer to repeatable, programmatic use of your code to assert that given input always produces the same expected behaviour and outputs. They help make sure that even when refactors or major changes are made, you can trust that most of your code base still behaves as expected, which means you spend less time chasing down obscure bugs, and allows you more freedom when improving your project's codebase.

In general, tests should be fully repeatable - given some minimal setup, the same tests should always pass, and they should not rely on your development setup or external services.

Most languages provide special tooling for testing - for example:

- JavaScript and Typescript projects have [Jest](https://jestjs.io/), [Mocha](https://mochajs.org/), and more
- Python has [pytest](https://docs.pytest.org/en/stable/)
- Golang has [go test](https://golang.org/pkg/testing/)

More advanced testing topics include "unit testing" and "integration testing", that you can do a Google search for to learn more.

[Rocket 2](https://github.com/ubclaunchpad/rocket2) and [Inertia](https://github.com/ubclaunchpad/inertia) are good references for comprehensive test tooling and automation.

### Testing interactions with other services

Often, you will want to test interactions with other services such as a database (PostgreSQL, MongoDB, DynamoDB, etc). The best way to do this is to run them as Docker containers locally - this makes them easy to set up and validate behaviour against. This also helps during development, since you can spin up your project locally without setting up authentication against a deployed instance and potentially running into problems with, for example, sharing a database with someone else.

In your programmatic tests, if you write to a database, make sure to include "teardown" steps after each test (to revert any changes a test makes, to avoid affecting other tests).

## Repository Templates

GitHub lets you define [templates](https://docs.github.com/en/free-pro-team@latest/github/building-a-strong-community/about-issue-and-pull-request-templates) to help you standardize the format of your issues and pull requests.

You can refer to [example templates used at Launch Pad](https://sourcegraph.com/search?q=repo:ubclaunchpad/*+file:_TEMPLATE+) for ideas!

## Ignoring Files

Include a [`.gitignore` file](https://git-scm.com/docs/gitignore#_description) to reduce the chances that people push unwanted content; in particular, it is highly recommended to add the following to your `.gitignore`:

- Config files produced by common IDEs, like IntelliJ, Xcode, Android Studio, and so on.
- `.DS_Store` files, which are produced by MacOS.
- Compiled assets, such as Python's `.pyc` files or `bin` output.

## CI/CD

CI/CD, or "Continuous Integration" and "Continuous Deployment", refers to the automated processes that are designed to run tasks for every change that is pushed to a code repository.

Launch Pad currently recommends [GitHub Actions](https://github.com/features/actions) for setting up CI/CD pipelines. To get started, refer to:

- [official Actions Workflows documentation](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Actions Workflows in use at Launch Pad](https://sourcegraph.com/search?q=repo:ubclaunchpad/*+file:.github/workflows+) - when building out pipelines for CI/CD, the best way to do so is to learn by example, so try to find existing pipelines for projects using the same languages and frameworks as you.

### Continuous Integration

You should have a continuous integration system in place to ensure that new code
is tested and meets team standards.

Your continuous integration (CI) process should run:

- [Linters and code style enforcers](#code-tooling).
- A build attempt (for example, `npm run build` on JavaScript/TypeScript projects).
- [Tests](#tests) and [coverage reporting](#code-coverage).
- Anything else that can be automated and help maintain high code quality.

#### Code Coverage

Most code testing frameworks provide ways to export code coverage results. Code coverage refers to the lines of code that are run during [tests](#tests), and allow you to verify you are actually testing your code - for example, see the [Inertia coverage report](https://codecov.io/gh/ubclaunchpad/inertia).

We currently recommend [Codecov](https://codecov.io/) for aggregating and viewing your code coverage. The [Sourcegraph browser extension allows you to view this coverage on GitHub](https://docs.codecov.io/docs/browser-extension) as well.

### Continuous Deployment

Nowadays, continuous deployment for smaller projects typically happen externally in other services - see our recommendations in [deployment options](/handbook/tools/deployment.md).
