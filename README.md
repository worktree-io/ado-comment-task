# ado-comment-task

An Azure DevOps Pipeline Task that posts a [Worktree](https://worktree.io) workspace link as a comment on new work items.

When triggered, it adds a comment to the specified work item with a button that opens a ready-to-use workspace in Worktree.

## Usage

Add the task to your pipeline YAML:

```yaml
steps:
  - task: WorktreeComment@1
```

The task is designed to be triggered by a service hook on work item creation. It reads the work item ID and project context from the built-in pipeline variables automatically.

### Inputs

| Name | Default | Description |
|------|---------|-------------|
| `token` | `$(System.AccessToken)` | ADO access token used to post the comment. |
| `workItemId` | `$(System.WorkItemId)` | ID of the work item to comment on. |

## Development

**Prerequisites:** Node.js 20+, pnpm

```bash
pnpm install
pnpm build   # compiles src/ → dist/
pnpm lint    # run ESLint
```

The build uses [`@vercel/ncc`](https://github.com/vercel/ncc) to bundle everything into `dist/index.mjs`.
