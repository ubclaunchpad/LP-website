# 📖 UBC Launch Pad Docs

Welcome to the Launch Pad docs hub.

We store a great deal of documents that encompasses our club information, good resources and our handbook. This ensures that Launch Pad will have its autonomy as a team club.

We want members have an easy way to view all these docs while ensuring our access scopes are in place and team can also have their own private docs. That's why we've built this wiki tool.

> The hub brings all the docs together in one app. It is built on our internal authentication system that tailors your experience based on access scopes

**We don't directly store any documents on this repository; this is a solution to streamline how we share and build on our knowledge as a club**

## 📝 Wiki Management

The hub will host the wiki be creating "areas" that each represent a repository/source that's been connected. You will be able to view it if it's public or you're logged in and have the correct access scopes. This ensures we don't have any accidentaly security breaches.

### Registering a New Source

> You can easily add a new wiki source to the hub. Please follow the following steps to register a new wiki

- Create repository under the Launch Pad Organization (public or private)

- Log in to the Launch Pad portal to and under the admin panel click to add a new source

  to register a new source we require a few things:

  1. the repository link
  2. the access scopes you want to set for the source. default will be set to `public` which is accessible to all
     - Note: the registration will need to verify the registerer has access to the repository themselves

### Editing and Creating New Documents

You can publish or modify any of the docs by going to the resource repository. You can follow the way that repository handles updates but generally, you would create a new pull request and it will be updated if it's merged.

#### Syncing changes

The hub will resync when areas are updated. We have yet to decided how frequently we will sync but in general we anticipate the docs will be updated within minutes.

- [ ] in the future we will run some background checks before syncing to ensure the doc "areas" follow the standards we need

#### Best Practices

In general we want our areas to only include `.md` files and all the reference attatchments to be either accessbile publicly or exists in the repository

### Removing a Source

similar to adding a source you can remove it by following the same steps

## Contributing

this contributing section is only to update how this hub renders the docs, and the hub itself; to edit or update the underlying documents refer to their repositories to edit the files

you can clone the repo and work on exisintg issues or create issues yourself.

Note: the repo by design does not include any documents to enure security. To view local documents, you can add your markdown files under the `src/docs` directory.

### 🔗 Related

- [Star Port](https://github.com/ubclaunchpad/StarPort): Our backend servers to manage internal tooling. we use this to authorize access

- [Cosmic Gateway](https://github.com/ubclaunchpad/CosmicGateway): Our portal UI

## Current Areas in Our Wiki

| Area          | Repository Reference                     | Access Scopes |
| ------------- | ---------------------------------------- | ------------- |
| 📓 Handbook   | TBD                                      | `Public`      |
| 💡Ideas       | https://github.com/ubclaunchpad/ideas    | TBD           |
| 🎨 Designers  |                                          | TBD           |
| 💻 Developers |                                          | TBD           |
| ✏️ Strategy   | https://github.com/ubclaunchpad/strategy | TBD           |
| 📄 Leads      | https://github.com/ubclaunchpad/leads    | TBD           |
| 📃Execs       | https://github.com/ubclaunchpad/exec     | TBD           |
