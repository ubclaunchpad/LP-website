# 📦 Repository Management

All project work (code or not), documentation, etc. should be done or tracked in
a repository within the UBC Launch Pad GitHub organization. This page outlines
general advice for how to maintain repositories.

## Staying Up to Date

Make sure your entire team is "Watching" your project repository - you can do
this from the top right of the GitHub project page. This allows you to receive
notifications in the web interface.

If you do not like the GitHub notification emails, you can disable the emails
and instead configure [Pull Reminders](https://pullreminders.com/) for yourself
or for your team's channel. This can be done via the web interface or the Slack
bot in the Launch Pad workspace - just shoot `@Pull Reminders` a message.

## Repository README

The primary source of truth for any repository should be the README.

At the top of the README, you should provide a summary of your software, and in
particular briefly and succinctly outline what role your project plays or what
problem it solves.

Installation instructions should come immediately after this summary.
Your installation instructions should be written in as simple and clear a manner
as possible and any differences in installation between different operating
systems or environments should be made clear. It is also usually helpful to
include separate development setup instructions, especially if this involves
any extra dependencies or tools.

Optionally, you may want to include sections below this that explain the
high-level operation of the tool, list any major dependencies, and/or credit
your hard-working developers and designers.

Many continuous integration, code coverage, and documentation sites provide
"badges" of project status that you can place at the top of your README.
These are highly recommended - they make your README look much more professional.

For a fantastic example of a README page, check out Launch Pad's
[Inertia](https://github.com/ubclaunchpad/inertia/blob/master/README.md) project.

## Enforcing Standards

You should enforce a clearly defined set of standards for your code;
in particular, this should both be listed in your documentation and enforced
during the build process.

Most modern programming languages have linters or other static analysis tools to
catch "obvious" mistakes and enforce code style and documentation rules, and
running these alongside your tests is highly recommended. Additionally, many
languages, including Python and golang, have standardized code styles and tools
to enforce them, such as pycodestyle and gofmt.

Adding a pull request template will increase the likelihood that pull request
descriptions contain the information you and other maintainers need during the
review process.

Include a `.gitignore` file to reduce the chances that people push unwanted
content; in particular, it is highly recommended to include config files
produced by common IDEs, like IntelliJ, Xcode, Android Studio, and so on. It is
also best to ignore compiled assets, such as Python's `.pyc` files.

It is highly recommended that you provide Docker and docker-compose files as a
means of ensuring simple setup and standardized development/build environments.

## Continuous Integration

You should have a continuous integration system in place to ensure that new code
is tested and meets team standards.

Your continuous integration (CI) process should run automated tests, linters,
code style enforcers, and anything else that can be automated and help maintain
high code quality. Tests in particular help make sure that even when refactors or
major changes are made, you can trust that most of your code base still behaves
as expected, which means you spend less time chasing down obscure bugs, and allows
you more freedom when improving your project's codebase.

### CI Platform

Launch Pad currently recommends [GitHub Actions](https://github.com/features/actions).
To get started, refer to:

* [official Actions Workflows documentation](https://help.github.com/en/actions/reference/workflow-syntax-for-github-actions)
* [Actions Workflows in use at Launch Pad](https://sourcegraph.com/search?q=repo:ubclaunchpad/*+file:.github/workflows&patternType=literal)

### Code Coverage

Code coverage of tests in particular is very valuable to collect during your CI
builds. It's particularly recommended to enforce a minimum threshold for code
coverage (though this does not guarantee that you have good tests!). Sites that
provide code coverage dashboards are a convenient way to summarize this data; we
currently recommend [Codecov](https://codecov.io/).

Ideally documentation about the inner workings of the tool should lie as close
to the code it describes as possible.
