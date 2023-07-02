# 📖 UBC Launch Pad Docs

Welcome to the Launch Pad docs hub.

We store a great deal of documents that encompasses our club information, good resources and our handbook. This ensures that Launch Pad will have its autonomy as a team club.

We want members have an easy way to view all these docs while ensuring our access scopes are in place and team can also have their own private docs. That's why we've built this wiki tool.

---

The hub brings all the docs together in one app. It is built on our internal authentication system that tailors your experience based on access scopes

---

_We don't directly store any documents on this repository; this is a solution to streamline how we share and build on our knowledge as a club_

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

The hub will resync when areas are updated. We have yet to decide how frequently we will sync but in general we anticipate the docs will be updated within minutes if not seconds.

- [ ] in the future we will run some background checks before syncing to ensure the doc "areas" follow the standards we need

#### Best Practices

In general follow the best pratices of writing in markdown and if you include any sort of attatchments makes sure the attatchments are publicly available

### Removing a Source

similar to adding a source you can remove it by following the same steps

## Contributing

this contributing section is only to update how this hub renders the docs, and the hub itself; to edit or update the underlying documents refer to their repositories to edit the files

you can clone the repo and work on exisintg issues or create issues yourself.

Note: the repo by design does not include any documents to enure security. To view local documents, you can implmenet some bypass routes in the api.

### TODO

- Document display

  - [ ] Find workarounds to display images and other local contents
  - [ ] Update the rendering process for tables and code blocks

- Authentication

  - [ ] Add authentication layers
  - [ ] Implement the side bar to fetch directories (needs auth support)
  - [ ] Add register and unregister features to the portal
  - [ ] Remove direct github communication and use [Star Port](https://github.com/ubclaunchpad/StarPort) as a proxy.

- Search

  - [ ] Add search and indexing

- Misc.

  - [ ] Sync styles with portal
  - [ ] Monitor performance
  - [ ] Set up Notion Integration

### 🔗 Related

- [Star Port](https://github.com/ubclaunchpad/StarPort): Our backend servers to manage internal tooling. we use this to authorize access

- [Cosmic Gateway](https://github.com/ubclaunchpad/CosmicGateway): Our portal UI

## Areas in Our Wiki

> Currently only allow very limited routes
>
> - `/`
>
> - `/StarPort`
> - `/CosmicGateway`

After streamlining auth we will register the following

| Area          | Repository Reference                       | Access Scopes | Status      |
| ------------- | ------------------------------------------ | ------------- | ----------- |
| 📓 Handbook   | TBD                                        | `Public`      | To be added |
| 💡Ideas       | <https://github.com/ubclaunchpad/ideas>    | TBD           | To be added |
| 🎨 Designers  |                                            | TBD           | To be added |
| 💻 Developers |                                            | TBD           | To be added |
| ✏️ Strategy   | <https://github.com/ubclaunchpad/strategy> | TBD           | To be added |
| 📄 Leads      | <https://github.com/ubclaunchpad/leads>    | TBD           | To be added |
| 📃Execs       | <https://github.com/ubclaunchpad/exec>     | TBD           | To be added |
