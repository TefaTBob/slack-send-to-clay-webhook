import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const SendWebhookFunction = DefineFunction({
  callback_id: "send_webhook",
  title: "Send to Clay via Webhook",
  description: "POSTs form data to a webhook URL",
  source_file: "functions/send_webhook.ts",
  input_parameters: {
    properties: {
      webhook_url: { type: Schema.types.string, title: "Webhook URL" },
      payload: { type: Schema.types.string, title: "Payload (must add commas between fields)" },
    },
    required: ["webhook_url", "payload"],
  },
  output_parameters: {
    properties: {
      status: { type: Schema.types.string, title: "Response Status" },
    },
    required: ["status"],
  },
});

export default SlackFunction(
  SendWebhookFunction,
  async ({ inputs }) => {
    console.log("Firing POST to:", inputs.webhook_url);
    console.log("Payload:", inputs.payload);

    const parsed = Object.fromEntries(
      inputs.payload.split(",").map((value, index) => [
        String(index + 1),
        value.trim()
      ])
    );

    console.log("Parsed payload:", JSON.stringify(parsed));

    const response = await fetch(inputs.webhook_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });

    console.log("Response status:", response.status);
    const responseText = await response.text();
    console.log("Response body:", responseText);

    return {
      outputs: { status: String(response.status) },
    };
  },
);