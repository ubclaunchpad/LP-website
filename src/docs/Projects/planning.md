# 🔍 Project Planning

This document outlines advice on how to scope your project in a way that makes it easier to deliver on the (comparatively) tight schedules Launch Pad projects have.

[#TODO](https://github.com/ubclaunchpad/docs/issues/252)

## Launch Pad Limitations

Note that on paper, it may seem like you have a lot of time since teams get a whole semester to complete their project. However, in between designing your project, learning the prerequisite technologies, adapting to feedback, midterms, breaks, absences, and more, many previous teams actually struggled to complete the projects.

This is why scoping your project appropriately is vital to its success!

## Core Feature and the MVP

In many cases, your _project_ should be able to be distilled down to a **single** _core feature_. For example:

| Idea                                                                                        | Core Feature                                       |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| "a website where you can watch YouTube Videos with friends and chat and queue up playlists" | ability to watch YouTube videos in sync            |
| "a choose-your-own adventure game where you try and survive as a UBC student"               | interface to make choices and present consequences |
| "slack bot and team management system for Launch Pad"                                       | update GitHub teams via Slack                      |

Anything broader than an _idea_ is likely more of a theme. Narrowing down your _core feature_ should be done **before** you start any sort of development - see [ideation](#ideation) for some tips. Using this _core feature_, you should then determine:

- 💪 **Requirements**: Everything you need to achieve to deliver your core feature, and _nothing else_.
- 🛣 **Stretch Goals**: A _small_ set of additional things that must be done to deliver on anything you want to achieve that does not fall within your _core feature_.

We call the _core feature_ and this set of "requirements" the **Minimum Viable Product**, or MVP.

### Ideation

At Launch Pad, ideation will often happen at [kickoff events](/handbook/strategy/recurring-processes.md#kickoff-event).

To help narrow down a _core feature_, start with a _theme_, which could be something like "productivity and tasks scheduling" or "Launch Pad internal tooling". From here, try to ask questions like the following to drive discussions:

- What pain points do you or certain demographics face regarding this _theme_?
- What kind of specific functions can address these pain points?
- Are these specific functions broad, like an _idea_, or can they be narrowed down further to a _core feature_?

During discussions, keep the following in mind as well:

- Go around the group to engage as many people as possible.
- Be encouraging and positive, even if you think the ideas is not very good.
- Instead of rejecting an idea or feature, you can discuss what kind of problem the idea is trying to tackle and suggest another potential approach, or discuss similar problems instead. Also keep in mind that there are some ideas that have historically fared poorly in Launch Pad teams - see our [risky ideas list](#risky-ideas).
- If a single idea or person is dominating the conversation, be sure to take to time to allow other ideas to be discussed or other members to have their thoughts heard!

**Avoid talking about technical details**, unless it is critical to your ideas and core features - for example, an idea that will require mobile features will likely have to be a mobile application. Be wary of having a technology you want to _really_ want to use and trying to apply it to every problem you see.

## Project Timeline

(ADD)

## Managing Risk

Some requirements may be technically difficult to build, rely on a third-party API, or involve risk in some other way. In general, at the beginning of a project, there may be some unknown factors that a project's success depends on.

These risks should be identified as soon as possible and tackled step by step. For example:

- If a feature is challenging to implement, **get a prototype working first**. This usually means getting a bare-minimum "proof of concept" working that doesn't strictly tie into your application, but simply demonstrates that something is possible. This helps your teammates provide feedback faster and gives you an indication of whether such an implementation is worth pursuing at all before you sink too much time into it!
- If you have a dependency on a third-party data source, **contact or research the third party as soon as possible** and verify the data is available, adequately formatted, etc. before you decide for sure to use it.

### Risky Ideas

Some types of ideas have traditionally fared poorly at Launch Pad:

- "Social network"-type projects: these frequently rely heavily on user-generated content (or just having lots of users), which often leads to unsatisfying results. Accounts, social graphs (friends, connections, interactions), and so on are often tedious and harder to implement than you might expect.
- Projects requiring deep domain expertise: this includes projects _centered around_ medical/legal/machine-learning/etc topics. Most Launch Pad teams will spend a lot of time figuring out the basics of writing software collaboratively, so it is difficult to catch the team up with the expertise required to, for example, develop a model from scratch. If the idea only requires these things tangentially - for example, if a machine learning model exists for your use case already - that should be fine!
- Projects leveraging data that is not available through supported APIs: these projects will typically involve intensive scraping of websites. Figuring out how to scrape modern websites can be a very tedious endeavour, and can be a huge time sink. Scrapers also tend to be prone to breakage when the target website changes, making them difficult to maintain.

However, if your team is aware of the risks and are confident you want to move forward with ideas that fall into these categories, feel free to go for it!
