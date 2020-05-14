# 🔍 Project Scope <Badge type="tip" text="updated"/>

This document outlines advice on how to scope your project in a way that makes it easier to deliver on the (comparatively) tight schedules Launch Pad projects have.

## Launch Pad Limitations

Note that on paper, it may seem like you have a lot of time since teams get a whole semester to complete their project. However, in between designing your project, learning the prerequisite technologies, adapting to feedback, midterms, breaks, absences, and more, many previous teams actually struggled to complete the projects.

This is why scoping your project appropriately is vital to its success!

## Considerations

This section outlines considerations you should keep in mind as you plan out your project.

### Core Feature and the MVP

In general, your idea should be able to be distilled down to a single core feature. For example:

| Idea | Core Feature |
|------|--------------|
| "a website where you can watch YouTube Videos with friends and chat and queue up playlists" | ability to watch YouTube videos in sync
| "a choose-your-own adventure game where you try and survive as a UBC student" | interface to make choices and present consequences
| "slack bot and team management system for Launch Pad" | update GitHub teams via Slack

This should be done *before* you start any sort of development. Using this core feature, you should determine:

* 💪 **Requirements**: Everything you need to achieve to deliver your core feature, and *nothing else*.
* 🛣 **Stretch Goals**: A *small* set of additional things that must be done to deliver on anything you want to achieve that does not fall within your core feature.

We call the core feature and this set of "requirements" the **Minimum Viable Product**, or MVP.

### Project Timeline

::: warning
This timeline is a *new and proposed* timeline, and will probably change based on our experiences trying it out.
:::

* **Week 0**: Brainstorm ideas and start to consolidate around one or two ideas
  * Designers will focus on user research
* **Week 2**: Finalized project pitch and MVP writeup
  * Designers will continue user testing and prototyping with a focus on the MVP
  * Developers will start implementation work
* **Week 5**: A *functional* MVP based on initial idea and prototypes
  * Teams should start asking people to try initial implementation and give ideas and feedback
  * Designers should start work on collecting feedback based on the implementation, branding, and improving the MVP
  * Developers should work on making the core feature work well and implementing designs
  * Remarks:
    * At this point, the MVP will be quite clunky but should capture the MVP's core feature
    * At this point, midterms and whatnot will probably start to take a toll on progress
* **Week 8**: Branding/design starts to come together, MVP is more polished, progress is made on stretch goals
  * Teams should continue collecting feedback based on their in-progress implementation
  * Designers should start putting together promotional material and helping developers finalize design implementation
  * Developers should shift focus to polish and stretch goals
  * Remarks:
    * Remember that **polish takes a long time** - see the [Ninety-ninety rule](https://en.wikipedia.org/wiki/Ninety-ninety_rule):
      > The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time.
* **Final Week**: Promote the project through social media and platforms like [Product Hunt](https://www.producthunt.com/)!

### Managing Risk

Some requirements may be technically difficult to build, rely on a third-party API, or involve risk in some other way. In general, at the beginning of a project, there may be some unknown factors that a project's success depends on.

These risks should be identified as soon as possible and tackled step by step. For example:

* If a feature is challenging to implement, **get a prototype working first**. This usually means getting a bare-minimum "proof of concept" working that doesn't strictly tie into your application, but simply demonstrates that something is possible. This helps your teammates provide feedback faster and gives you an indication of whether such an implementation is worth pursuing at all before you sink too much time into it!
* If you have a dependency on a third-party data source, **contact or research the third party as soon as possible** and verify the data is available, adequately formatted, etc. before you decide for sure to use it.

You can also manage risk with clearly-defined tasks that encapsulates small units of work - this helps prevent difficult, long-running tasks from ballooning into a huge amount of work that bogs down your project's progress. See [Sprint Planning: Tasks](./sprints.md#tasks) for more details on how to define tasks!
