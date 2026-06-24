import { Manifest } from "deno-slack-sdk/mod.ts";
import { SendWebhookFunction } from "./functions/send_webhook.ts";
import { SendWebhookWorkflow } from "./workflows/send_webhook_workflow.ts";

export default Manifest({
  name: "slack-send-to-webhook",
  description: "Sends form data to a Clay webhook URL",
  icon: "assets/default_new_app_icon.png",
  functions: [SendWebhookFunction],
  workflows: [SendWebhookWorkflow],
  outgoingDomains: ["api.clay.com"],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
  ],
});