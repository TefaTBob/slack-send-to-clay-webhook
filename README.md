# slack-send-to-clay-webhook

A Slack app that adds a native "Send to Webhook" step to Workflow Builder. Fill out a form in Slack, and the app POSTs the data as JSON to any webhook URL.

Built on the Deno Slack SDK — Slack hosts the runtime, no server required.

---

## What it does

Adds a shortcut to Slack that opens a form with two fields:

- **Webhook URL** — the target endpoint
- **Payload** — comma-separated values (e.g. `https://linkedin.com/in/bobafett/, Boba Fett`)

The app splits the payload on commas and converts it to a numbered JSON object before sending:

```json
{"1": "https://linkedin.com/in/bobafett/", "2": "Boba Fett"}
```

You handle field mapping on the receiving end.

---

## Requirements

- A paid Slack workspace
- [Slack CLI](https://api.slack.com/automation/quickstart) installed and authorized
- [Deno](https://deno.land) installed

---

## Setup

### 1. Install the Slack CLI

```zsh
curl -fsSL https://downloads.slack-edge.com/slack-cli/install.sh | bash
```

### 2. Install Deno

```zsh
curl -fsSL https://deno.land/install.sh | sh
```

Add to your PATH:

```zsh
echo 'export DENO_INSTALL="$HOME/.deno"' >> ~/.zshrc
echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 3. Clone this repo

```zsh
slack create my-app --template https://github.com/TefaTBob/slack-send-to-clay-webhook
cd my-app
```

### 4. Authorize the Slack CLI in your workspace

```zsh
slack login
```

---

## Running locally

```zsh
slack run
```

The app will install to your workspace as `slack-send-to-clay-webhook (local)`. You'll be prompted to create a trigger — select `triggers/send_webhook_trigger.ts`.

Paste the generated shortcut URL into any Slack channel. Click it to open the form.

Local mode only runs while `slack run` is active and is only visible to you.

---

## Deploying

```zsh
slack deploy
```

Once deployed, the app is available to your entire workspace without needing your machine running. You'll be prompted to create a new trigger for the deployed version.

---

## Outgoing domains

Slack requires webhook target domains to be whitelisted in `manifest.ts`:

```typescript
outgoingDomains: ["api.clay.com"],
```

Add any additional domains you need and redeploy.

---

## Project structure

```
functions/
  send_webhook.ts           # Parses payload and POSTs to webhook
workflows/
  send_webhook_workflow.ts  # Form + function wired together
triggers/
  send_webhook_trigger.ts   # Shortcut trigger
manifest.ts                 # App config, scopes, outgoing domains
```

---

## Viewing logs

```zsh
slack activity --tail
```
