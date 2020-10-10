# 🔍 Project Scope <Badge type="tip" text="updated"/>

This document outlines advice on how to scope your project in a way that makes it easier to deliver on the (comparatively) tight schedules Launch Pad projects have.

## Launch Pad Limitations

Note that on paper, it may seem like you have a lot of time since teams get a whole semester to complete their project. However, in between designing your project, learning the prerequisite technologies, adapting to feedback, midterms, breaks, absences, and more, many previous teams actually struggled to complete the projects.

This is why scoping your project appropriately is vital to its success!

## Core Feature and the MVP

In many cases, your *idea* should be able to be distilled down to a **single** *core feature*. For example:

| Idea | Core Feature |
|------|--------------|
| "a website where you can watch YouTube Videos with friends and chat and queue up playlists" | ability to watch YouTube videos in sync
| "a choose-your-own adventure game where you try and survive as a UBC student" | interface to make choices and present consequences
| "slack bot and team management system for Launch Pad" | update GitHub teams via Slack

Anything broader than an *idea* is likely more of a theme. Narrowing down your *core feature* should be done **before** you start any sort of development - see [ideation](#ideation) for some tips. Using this *core feature*, you should then determine:

* 💪 **Requirements**: Everything you need to achieve to deliver your core feature, and *nothing else*.
* 🛣 **Stretch Goals**: A *small* set of additional things that must be done to deliver on anything you want to achieve that does not fall within your *core feature*.

We call the *core feature* and this set of "requirements" the **Minimum Viable Product**, or MVP.

### Ideation

At Launch Pad, ideation will often happen at [kickoff events](/handbook/strategy/recurring-processes.md#kickoff-event).

To help narrow down a *core feature*, start with a *theme*, which could be something like "productivity and tasks scheduling" or "Launch Pad internal tooling". From here, try to ask questions like the following to drive discussions:

* What pain points do you or certain demographics face regarding this *theme*?
* What kind of specific functions can address these pain points?
* Are these specific functions broad, like an *idea*, or can they be narrowed down further to a *core feature*?

During discussions, keep the following in mind as well:

* Go around the group to engage as many people as possible.
* Be encouraging and positive, even if you think the ideas is not very good.
* Instead of rejecting an idea or feature, you can discuss what kind of problem the idea is trying to tackle and suggest another potential approach, or discuss similar problems instead. Also keep in mind that there are some ideas that have historically fared poorly in Launch Pad teams - see our [risky ideas list](#risky-ideas).
* If a single idea or person is dominating the conversation, be sure to take to time to allow other ideas to be discussed or other members to have their thoughts heard!

**Avoid talking about technical details**, unless it is critical to your ideas and core features - for example, an idea that will require mobile features will likely have to be a mobile application. Be wary of having a technology you want to *really* want to use and trying to apply it to every problem you see.

## Project Timeline

::: warning
This timeline is a *new* and *proposed* timeline, and will probably change based on our experiences trying it out.
:::

### Week 0: Brainstorming

In the first week, brainstorm with your team and start to consolidate around one or two ideas.

* ⚒️ **Developers**: participate in user research work with designers
  * Development should not begin yet!
  * Tech leads can start proposing technologies for developers to get a bit of a head start on learning
* 🎨 **Designers**: focus on user research & start wireframing
  * This will involve activities like ideation sessions, interviews, personas, journey maps, user stories, sketching & heat-map voting.
  * finalize features through sketches & user stories.
  * Designers may also ask developers to help with interviews and surveys to get more data.

### Week 2: Finalized project pitch and MVP writeup

Your team should prepare a clear, brief pitch (i.e. a short description) for your MVP and a high-level writeup of what your MVP will entail.

* ⚒️ **Developers**: start implementation work under tech lead's guidance
* 🎨 **Designers**: start wireframing and prototyping with a focus on the MVP
  * Week 2: Hi-Fi Wireframes & prototype should be done by the end of the week.
  * Week 3: User testing on Hi-Fi prototype.
  * Week 4: Iterate from user testing. Hi-Fi wireframes and prototype should be done.
  * At any point, always upload your finished designs (Mid-Fi & Hi-Fi) to your centralized drive for developers to access and always alert them when you have done so.

### Week 5: A *functional* MVP based on initial idea and prototypes

At this point, teams should start asking people to try initial implementation and give ideas and feedback.

* ⚒️ **Developers**: work on making the core feature work well and implementing designs
* 🎨 **Designers**: start work on collecting feedback based on the implementation, branding, and improving the MVP
  * Week 5: Continue user testing with the MVPs & may start playing around with microinteractions, branding.
  * Week 6: Start with branding (logos, name, colours, UI library), keep developers part of your branding ideation (let them do voting, this is their project as much as it is yours!)
  * Week 7: Finalize branding, name, logo etc.
  * Make sure all assets are continuously being updated on centralized drive & Figma or Zeplin Files are being sent to developers.

Remember that this MVP will be quite clunky but should capture the MVP's core feature. Also note that midterms and whatnot will probably start to take a toll on progress!

### Week 8: Polish

At this point, branding/design starts to come together, MVP is more polished, progress is made on stretch goals. Teams should continue collecting feedback based on their in-progress implementation.

* ⚒️ **Developers**: shift focus to polish and stretch goals
* 🎨 **Designers**: start putting together promotional material and helping developers finalize design implementation

Remember that *polish takes a long time* - see the [Ninety-ninety rule](https://en.wikipedia.org/wiki/Ninety-ninety_rule):

> The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time.

### Final Week: Promote the project 🚀

As teams round off their project, they should start working together with their designers and club leadership to promote their project through social media and platforms like [Product Hunt](https://www.producthunt.com/)!

## Managing Risk

Some requirements may be technically difficult to build, rely on a third-party API, or involve risk in some other way. In general, at the beginning of a project, there may be some unknown factors that a project's success depends on.

These risks should be identified as soon as possible and tackled step by step. For example:

* If a feature is challenging to implement, **get a prototype working first**. This usually means getting a bare-minimum "proof of concept" working that doesn't strictly tie into your application, but simply demonstrates that something is possible. This helps your teammates provide feedback faster and gives you an indication of whether such an implementation is worth pursuing at all before you sink too much time into it!
* If you have a dependency on a third-party data source, **contact or research the third party as soon as possible** and verify the data is available, adequately formatted, etc. before you decide for sure to use it.

You can also manage risk with clearly-defined tasks that encapsulates small units of work - this helps prevent difficult, long-running tasks from ballooning into a huge amount of work that bogs down your project's progress. See [Sprint Planning: Tasks](./sprints.md#tasks) for more details on how to define tasks!

### Risky Ideas

Some types of ideas have traditionally fared poorly at Launch Pad:

* "Social network"-type projects: these frequently rely heavily on user-generated content (or just having lots of users), which often leads to unsatisfying results. Accounts, social graphs (friends, connections, interactions), and so on are often tedious and harder to implement than you might expect.
* Projects requiring deep domain expertise: this includes projects *centered around* medical/legal/machine-learning/etc topics. Most Launch Pad teams will spend a lot of time figuring out the basics of writing software collaboratively, so it is difficult to catch the team up with the expertise required to, for example, develop a model from scratch. If the idea only requires these things tangentially - for example, if a machine learning model exists for your use case already - that should be fine!
* Projects leveraging data that is not available through supported APIs: these projects will typically involve intensive scraping of websites. Figuring out how to scrape modern websites can be a very tedious endeavour, and can be a huge time sink. Scrapers also tend to be prone to breakage when the target website changes, making them difficult to maintain.

However, if your team is aware of the risks and are confident you want to move forward with ideas that fall into these categories, feel free to go for it!
