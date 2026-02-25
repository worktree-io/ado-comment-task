import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildCommentBody } from "./comment.mjs";

describe("buildCommentBody", () => {
  it("returns a string containing the badge link", () => {
    const body = buildCommentBody({ owner: "myorg", project: "MyProject", workItemId: "42" });
    assert.ok(body.includes("Open_workspace"), "badge text missing");
    assert.ok(body.includes("https://worktree.io/open?"), "URL missing");
  });

  it("includes owner, project, and workItemId in the URL", () => {
    const body = buildCommentBody({ owner: "acme", project: "Web App", workItemId: "7" });
    assert.ok(body.includes("owner=acme"), "owner missing from URL");
    assert.ok(body.includes("project=Web+App"), "project missing from URL");
    assert.ok(body.includes("workItem=7"), "workItemId missing from URL");
  });

  it("defaults to github codeHost and omits codeHost param", () => {
    const body = buildCommentBody({ owner: "org", project: "proj", workItemId: "1" });
    assert.ok(!body.includes("codeHost="), "codeHost should not appear for default github");
  });

  it("adds GitLab params when codeHost is gitlab", () => {
    const body = buildCommentBody({
      owner: "org",
      project: "proj",
      workItemId: "1",
      codeHost: "gitlab",
      gitlabOwner: "glorg",
      gitlabRepo: "glrepo",
    });
    assert.ok(body.includes("codeHost=gitlab"), "codeHost=gitlab missing");
    assert.ok(body.includes("gitlabOwner=glorg"), "gitlabOwner missing");
    assert.ok(body.includes("gitlabRepo=glrepo"), "gitlabRepo missing");
  });

  it("includes the footer with Worktree branding", () => {
    const body = buildCommentBody({ owner: "org", project: "proj", workItemId: "1" });
    assert.ok(body.includes("Powered by [Worktree]"), "footer branding missing");
  });
});
