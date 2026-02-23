# Git Commit Message Rewriter

A small local tool that converts Git commit messages into clean, shareable update posts using a local AI model.

It’s designed for developers who want better commit-based updates without relying on external AI APIs or cloud services.

---

## Features

- Converts Git commit messages into readable update posts
- Runs entirely locally using Docker
- No external API keys required
- Simple, stateless design
- Fast enough for local development workflows

---

## Who this is for

This project started as a personal tool.

I wanted a simple way to turn my Git commits into something I could share publicly, without overthinking it or depending on external services. If you often build things but struggle with what to say about them, this tool might be useful to you too.

This project does **not** auto-post to any platform. The output is intentionally copied and shared manually.

---

## How it works

1. A Git commit message is sent to the API
2. The API calls a local AI model via Ollama
3. The model rewrites the commit into a concise, professional update
4. The generated text is returned as plain text

That’s it — simple by design.

---

## Getting started

### Prerequisites

- Docker
- Docker Compose
- Node.js

---

### Setup

Clone the repository:

```bash
git clone https://github.com/oceeboy/commit-to-tweet
cd commit-to-tweet
```

---

## Running the project

Available scripts:

```bash
npm run dev
npm run start
npm run docker:up
npm run docker:down
```

Use the Docker commands to start and stop the local AI runtime.

---

## GitHub webhook setup (local development)

If you are running this locally and want to receive GitHub webhook events, you’ll need to expose your local server.

### Tunneling with ngrok

Port `3000` must be publicly accessible so GitHub can send webhook events.

This example uses ngrok on macOS. For other platforms, refer to the ngrok documentation.

Install ngrok:

```bash
brew install ngrok
```

Authenticate ngrok (sign up first to get a token):

```bash
ngrok config add-authtoken <your-token>
```

Start a tunnel:

```bash
ngrok http 3000
```

---

### Configure GitHub webhook

Use the domain provided by ngrok as your webhook URL:

```
https://<domain-name>.ngrok-free.dev/api/v1/github
```

Set a webhook secret and store the same value in your environment variables:

```
GITHUB_WEBHOOK_SECRET=<your-secret>
```

Generate your own secret for better security.

In your GitHub repository:

- Go to **Settings**
- Select **Webhooks**
- Add a new webhook
- Paste the URL and secret

---

## Notes

- No database is used
- No authentication layer is included
- No automatic posting to social platforms

These choices are intentional to keep the project focused and lightweight.

---

## License

MIT
