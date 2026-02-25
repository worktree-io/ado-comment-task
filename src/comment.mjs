const BASE_URL = "https://worktree.io"; // eslint-disable-line default/no-hardcoded-urls

export function buildCommentBody({ owner, project, workItemId, codeHost = "github", gitlabOwner, gitlabRepo }) {
  const params = new URLSearchParams({ owner, project, workItem: workItemId });
  if (codeHost === "gitlab") {
    params.set("codeHost", "gitlab");
    params.set("gitlabOwner", gitlabOwner ?? "");
    params.set("gitlabRepo", gitlabRepo ?? "");
  }
  const url = `${BASE_URL}/open?${params.toString()}`;

  return [
    "A workspace is ready for this work item.",
    "",
    `[![Open workspace →](https://img.shields.io/badge/Open_workspace_%E2%86%92-F05032?style=for-the-badge&logo=git&logoColor=white)](${url})`,
    "",
    `<sub>Powered by [Worktree](${BASE_URL}) · [Install](${BASE_URL}#install)</sub>`,
  ].join("\n");
}
