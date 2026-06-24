import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { SendWebhookFunction } from "../functions/send_webhook.ts";

export const SendWebhookWorkflow = DefineWorkflow({
  callback_id: "send_webhook_workflow",
  title: "Send Webhook Workflow",
  input_parameters: {
    properties: {
      interactivity: { type: Schema.slack.types.interactivity },
    },
    required: ["interactivity"],
  },
});

// Step 1: Open a form to collect inputs
const formStep = SendWebhookWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Send to Clay via Webhook",
    interactivity: SendWebhookWorkflow.inputs.interactivity,
    fields: {
      elements: [
        {
          name: "webhook_url",
          title: "Webhook URL",
          type: Schema.types.string,
        },
        {
          name: "payload",
          title: "Payload",
          type: Schema.types.string,
          long: true,
        },
      ],
      required: ["webhook_url", "payload"],
    },
  },
);

// Step 2: Pass form output into your custom function
SendWebhookWorkflow.addStep(SendWebhookFunction, {
  webhook_url: formStep.outputs.fields.webhook_url,
  payload: formStep.outputs.fields.payload,
});