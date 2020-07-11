# 📦 Repository Management

All project work (code or not), documentation, etc. should be done or tracked in a repository within the UBC Launch Pad GitHub organization. This page outlines general advice for how to use and maintain repositories.

## Notifications

Make sure your entire team has [set up notifications correctly](/handbook/tools/github.md#setting-up-notifications)! This helps everyone stay in the loop on your project's progress.

## Documentation

Each repository should be accompanied by a set of documentation written in [Markdown](/handbook/tools/github.md#markdown) starting with the README, typically named `README.md`. Your README is the primary way for your team to showcase your awesome project to the world - take the time to make it informative and legible!

In your README, make sure you include or link to:

* **A summary of your software** - in particular, briefly and succinctly outline what role your project plays or what problem it solves.
  * For example, the [`ubclaunchpad/inertia` README](https://github.com/ubclaunchpad/inertia/blob/master/README.md) includes a section on what the project does, its features, and who might want to use it.
* **Usage instructions** - this could be a link to a deployed website and/or how to download and get started with using your project.
  * For example, the [`ubclaunchpad/ubclaunchpad.com` README](https://github.com/ubclaunchpad/ubclaunchpad.com/blob/master/README.md) includes a link to the deployed website and the [project's `USING.md`](https://github.com/ubclaunchpad/ubclaunchpad.com/blob/master/USING.md), which covers some tips on how to use the website.
* **Development instructions** - make sure to cover everything that someone might need to get started with development on your project without any help. This could include development environment setup, project structure, and best practices. Since this can get quite lengthy, you can place this documentation in a separate `CONTRIBUTING.md` file, and link to it from your project README.
  * For example, the [`ubclaunchpad/ubclaunchpad.com` Contribution Guide](https://github.com/ubclaunchpad/ubclaunchpad.com/blob/master/CONTRIBUTING.md) and [`ubclaunchpad/inertia` Contribution Guide](https://github.com/ubclaunchpad/inertia/blob/master/README.md) both include detailed instructions on how to get set up and start hacking on the project.
* **Project writeup** - this could be a link to a blog post, a part of your README, or another file that documents your project's journey from start to end. It's a great way to highlight the work that went into your project!
  * For example, the [`ubclaunchpad/food-doods` README](https://github.com/ubclaunchpad/food-doods/blob/master/README.md) documents the team's ideas, pain points they encountered, design mockups, and more.

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
