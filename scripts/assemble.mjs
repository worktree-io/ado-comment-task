/**
 * Assembles the WorktreeCommentTask folder that gets packaged into the .vsix.
 * Structure required by the extension manifest:
 *   WorktreeCommentTask/
 *     task.json
 *     dist/  (bundled task entry point)
 */

import { cpSync, mkdirSync, rmSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "WorktreeCommentTask");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir);

cpSync(resolve(root, "task.json"), resolve(outDir, "task.json"));
cpSync(resolve(root, "dist"), resolve(outDir, "dist"), { recursive: true });

console.log("Assembled WorktreeCommentTask/");
