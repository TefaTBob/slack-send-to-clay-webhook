import { Trigger } from "deno-slack-sdk/mod.ts";
import { SendWebhookWorkflow } from "../workflows/send_webhook_workflow.ts";

const trigger: Trigger<typeof SendWebhookWorkflow.definition> = {
  type: "shortcut",
  name: "Send Webhook",
  description: "Opens a form and sends data to a webhook",
  workflow: `#/workflows/${SendWebhookWorkflow.definition.callback_id}`,
  inputs: {
    interactivity: { value: "{{data.interactivity}}" },
  },
};

export default trigger;