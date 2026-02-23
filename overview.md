# Worktree for Azure DevOps

**Open work items as isolated workspaces — with one click.**

When a work item is created in Azure DevOps, this pipeline task automatically posts an **Open workspace** comment. Clicking the link launches [Worktree](https://worktree.io) on your machine, which creates an isolated git worktree and opens it in your editor. No extra clone. No context switching.

---

## How it works

1. A work item is created in Azure DevOps
2. A service hook triggers a pipeline run
3. This task posts an **Open workspace** comment on the work item
4. Any team member clicks the link to open an isolated workspace instantly

The comment looks like this:

> A workspace is ready for this work item.
>
> [![Open workspace →](https://img.shields.io/badge/Open_workspace_%E2%86%92-F05032?style=for-the-badge&logo=git&logoColor=white)](https://worktree.io)

---

## Setup

### 1. Install Worktree

Install the [Worktree](https://worktree.io#install) desktop daemon on your machine. It handles the `worktree://` URL scheme and opens workspaces in your configured editor.

### 2. Add the task to a pipeline

```yaml
steps:
  - task: WorktreeComment@1
```

### 3. Trigger via service hook

In your Azure DevOps project, go to **Project Settings → Service hooks** and create a hook that triggers the pipeline when a work item is created.

---

## Inputs

| Name | Default | Description |
|------|---------|-------------|
| `token` | `$(System.AccessToken)` | ADO access token used to post the comment. |
| `workItemId` | `$(System.WorkItemId)` | ID of the work item to comment on. Populated automatically by the service hook trigger. |

---

## Links

- [Worktree website](https://worktree.io)
- [GitHub](https://github.com/worktree-io)
