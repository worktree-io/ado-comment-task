import * as taskLib from "azure-pipelines-task-lib/task.js";
import { buildCommentBody } from "../comment.mjs";

async function run() {
  try {
    const token = taskLib.getInput("token", true);
    const workItemId = taskLib.getInput("workItemId", true);

    // Extract org name from SYSTEM_TEAMFOUNDATIONCOLLECTIONURI
    // e.g. https://dev.azure.com/myorg/ → myorg
    const collectionUri = process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI ?? "";
    const owner = collectionUri
      .replace(/https?:\/\/dev\.azure\.com\//, "")
      .replace(/\/$/, "");

    const project = process.env.SYSTEM_TEAMPROJECT ?? "";

    const body = buildCommentBody({ owner, project, workItemId });

    const url = `https://dev.azure.com/${owner}/${encodeURIComponent(project)}/_apis/wit/workItems/${workItemId}/comments?api-version=7.1`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: body }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`ADO API error ${response.status}: ${text}`);
    }

    taskLib.debug(`Posted workspace link for work item #${workItemId}`);
  } catch (err) {
    taskLib.setResult(taskLib.TaskResult.Failed, err.message);
  }
}

run();
