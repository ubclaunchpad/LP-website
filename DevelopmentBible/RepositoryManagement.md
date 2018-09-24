# 📦 Repository Management

## README
The primary source of truth for any repository should be the README.

At the top of the README, you should provide a summary of your software, and in particular briefly and succinctly outline what role your tool plays or what problem it solves.

Installation instructions should come immediately after this summary.
Your installation instructions should be written in as simple and clear a manner as possible
and any differences in installation between different operating systems or environments should be made clear.
It is also usually helpful to include separate development setup instructions,
especially if this involves any extra dependencies or tools.

Optionally, you may want to include sections below this that explain the high-level operation of the tool, list any major dependencies, and/or credit your hard-working developers and designers.

Many continuous integration, code coverage, and documentation sites provide ''badges'' of project status that you can place at the top of your README.
These are highly recommended--they make your README look much more professional.

For a fantastic example of a README page, check out Launch Pad's [Inertia](https://github.com/ubclaunchpad/inertia) project.

## Enforcing Standards
You should enforce a clearly defined set of standards for your code;
in particular, this should both be listed in your documentation and enforced during the build process.

Most modern programming languages have linters or other static analysis tools to catch ''obvious'' mistakes and enforce code style and documentation rules,
and running these alongside your tests is highly recommended.
Additionally, many languages, including Python and golang, have standardized code styles and tools to enforce them, such as pycodestyle and gofmt.

Adding a pull request template will increase the likelihood that pull request descriptions contain the information you and other maintainers need during the review process.

Include a .gitignore file to reduce the chances that people push unwanted content;
in particular, it is highly recommended to include config files produced by common IDEs, like IntelliJ, Xcode, Android Studio, and so on.

It is highly recommended that you provide Docker and docker-compose files as a means of ensuring simple setup and standardized development/build environments.

## Builds and Tests
You should have a continuous integration system in place to ensure that new code is tested and meets team standards.
Launch Pad recommends [Travis CI](https://travis-ci.org), which is free for open-source repositories;
our GitHub organization is already connected to Travis and a number of project use it currently.

Your CI process should run automated tests, linters, code style enforcers, and anything else that can be automated and help maintain high code quality.
Test code coverage is very valuable to collect during your CI builds,
and it's particularly recommended to enforce a minimum threshold for code coverage (though this does not guarantee that you have good tests!).
Sites that provide code coverage dashboards are a convenient way to summarize this data;
we currently recommend [Codecov](https://codecov.io/), or alternatively [Coveralls](https://coveralls.io).

Ideally documentation about the inner workings of the tool should lie as close to the code it describes as possible.
