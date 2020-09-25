# 🗂 Google Drive

At Launch Pad, we leverage [Google Drive](https://drive.google.com/) for most of our miscellaneous document-sharing needs. Permanent documentation about processes, however, should be committed to [GitHub](/handbook/tools/github.md) - for example, in the [`docs.ubclaunchpad.com` repository](https://github.com/ubclaunchpad/docs).

Launch Pad Google Drive folders are managed by the [`team@ubclaunchpad.com` GSuite account](email.md). Credentials for the account are available in the [Exec repository](https://github.com/ubclaunchpad/exec).

::: warning Sensitive information
In general, assume pretty liberal with access to folders in Google Drive, since it is hard to keep track of access over time, especially for individual documents, and for ease of use we generally share entire folders with everyone.

Because of this, sensitive information (such as contact details for sponsors) should be tracked in one of our [private GitHub repositories](/handbook/onboarding/leads.md#github-teams) and distributed as required (for example, by linking to specific issues from Drive documents).

Similarly, **do not add credentials (usernames, passwords) in Google Drive**. Instead, get them added to the private [Exec repository](https://github.com/ubclaunchpad/exec/blob/master/assets.md) and provide the credentials to those who need it as required.
:::

## Folders

A list of shared Drive folders used at Launch Pad can be found in the "Quick Links" dropdown in the top right corner of the [`docs.ubclaunchpad.com`](https://docs.ubclaunchpad.com/) website. These folders are defined in [the site configuration](https://sourcegraph.com/github.com/ubclaunchpad/docs/-/blob/.vuepress/config.js#L37-45). Please refer to the [onboarding documentation](/handbook/onboarding/everyone.md) to see which folders should be shared with you. Access and permissions folders is configured by [Rocket](/handbook/onboarding/everyone.md#rocket-setup) - ask someone to add you to the appropriate Rocket team, and check your email for an invitation! Please do not ask to be added directly without checking with `#ask-rocket` if there is a problem.

All folders should be a subfolder of the [shared Launch Pad folder](https://drive.google.com/drive/folders/1u-U3w0V0MaLQrWtDdw_8n15V2lO-6gXo) for easier access management. Within the shared Launch Pad folder, we try to maintain the following structure:

* [Projects](https://drive.google.com/drive/u/0/folders/18piFDBdAUuZAOf9xOgpf2_HBUuVNae0S) - folders for project teams
  * Note that everyone should be granted access to this folder (part of [Onboarding for Everyone](/handbook/onboarding/everyone.md))
  * Each tech lead should create a folder for their project inside a year subfolder ("Projects YYYY") of this folder
  * Inside each project folder, each lead should create a document for meeting notes. All their project meetings should go in this document. See [Sprint Planning](/handbook/project-management/sprints.md) for more details.
* [Strategy](https://drive.google.com/drive/u/0/folders/0BwdNv1PZjDeXMkc1eDVNY1ZHT00) - see [Onboarding for Strategy](/handbook/onboarding/strategy.md)
* [Design](https://drive.google.com/drive/u/0/folders/1Zfe25r3D77hGdyMkj0tlxHNa-r7fAq1d) - see [Onboarding for Design](/handbook/onboarding//design.md)
* [Leads](https://drive.google.com/drive/u/0/folders/1hgPcUC_DrFMmzZ04pBSlZFig4v9AbTuv) - for the [leads](/handbook/onboarding/leads.md)
  * Leads should create a document for meeting notes titled "Leads: Meeting Notes YYYY". All leads meetings should go in this document.
  * Spreadsheets and Google Forms used for [recruitment](/handbook/recruitment/overview.md) are also kept in this folder.
* [Exec](https://drive.google.com/drive/u/0/folders/10b_2H5EhPpJtdgNi7QizRhWC9Qtivr8L) - for the co-presidents
  * Presidents should create a document for meeting notes titled "Exec: Meeting Notes YYYY". All exec meetings should go in this document.

Access and permissions folders is configured by [Rocket](/handbook/onboarding/everyone.md#rocket-setup) - ask someone to add you to the appropriate Rocket team, and check your email for an invitation! Please do not ask to be added directly without checking with `#ask-rocket` if there is a problem. Strategy, Design, and everyone else each only have access to folders relevant to their role. Leads have access to all the above folders throught the UBC Launch Pad shared folder. This is configured using [Rocket](/handbook/tools/slack#rocket):

```
/rocket team edit [TEAM] --folder [FOLDER ID]
```

Rocket then automatically performs the appropriate permissions updates.
