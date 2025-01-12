# Telegram Bot Webhook on Vercel

This project demonstrates how to deploy a Telegram bot webhook on [Vercel](https://vercel.com). The bot listens for messages from Telegram, processes them, and sends a response back to the user.

## Features

- Handles incoming messages from Telegram.
- Processes user input using a custom `get_tutor_tips` function.
- Sends responses back to the user in Markdown format.
- Deployed on Vercel for serverless execution.

---

## Prerequisites

1. **Telegram Bot Token**: You need to create a bot on Telegram and obtain the bot token. Follow the steps below to create a bot:
   - Open Telegram and search for the [BotFather](https://t.me/botfather).
   - Use the `/newbot` command to create a new bot.
   - Follow the instructions and copy the token provided by BotFather.

2. **Vercel Account**: Sign up for a free account on [Vercel](https://vercel.com).

3. **Node.js**: Ensure you have Node.js installed on your local machine.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Environment Variables
Create a .env file in the root of your project and add the following:
```bash
TELEGRAM_TOKEN=<your-telegram-bot-token>
GOOGLE_API_KEY=<your-google-token>
```

Replace <your-telegram-bot-token> with the token you received from BotFather.

### 4. Deploy to Vercel
Install the Vercel CLI:
```bash
npm install -g vercel
```


Login to Vercel:
```bash
vercel login
```

Deploy the project:
```bash
vercel
```

Follow the prompts to deploy your project. Once deployed, Vercel will provide you with a public URL for your webhook.

Setting Up the Telegram Webhook
To connect your Telegram bot to the deployed webhook, you need to set the webhook URL. Use the following steps:

Replace <your-vercel-url> with the URL provided by Vercel after deployment.

Use the following cURL command to set the webhook:
```bash
curl -X POST https://api.telegram.org/bot<your-telegram-bot-token>/setWebhook -d "url=<your-vercel-url>"
```

Example:
```bash
curl -X POST https://api.telegram.org/bot123456789:ABCDEF1234567890/setWebhook -d "url=https://your-vercel-app.vercel.app/api/webhook"
```


Telegram will now send all incoming messages to your Vercel webhook.

### Signing a Webhook on Telegram
Telegram allows you to verify the authenticity of incoming requests by signing the webhook. Follow these steps to verify the signature:

Telegram sends a X-Telegram-Bot-Api-Secret-Token header with each request.

Compare this header value with a secret token you set when configuring the webhook.

To set a secret token, modify the webhook setup command:
```bash
curl -X POST https://api.telegram.org/bot<your-telegram-bot-token>/setWebhook -d "url=<your-vercel-url>" -d "secret_token=<your-secret-token>"
```


In your webhook code, verify the X-Telegram-Bot-Api-Secret-Token header:
```bash
const secretToken = '<your-secret-token>';
if (request.headers['x-telegram-bot-api-secret-token'] !== secretToken) {
    response.status(403).send('Forbidden');
    return;
}
```


## Testing the Bot
- Open Telegram and search for your bot.
- Send a message to the bot.
- The bot will process your message and respond based on the get_tutor_tips function.

## Troubleshooting
- Webhook Not Working: Ensure the webhook URL is correctly set and publicly accessible.

- Environment Variables: Verify that the TELEGRAM_TOKEN is correctly set in your .env file or Vercel environment settings.

- Error Logs: Check the Vercel logs for any errors:

```bash
vercel logs <deployment-name>
```



## License
This project is licensed under the MIT License.

This README provides a comprehensive guide to setting up and deploying the Telegram bot webhook on Vercel, including how to sign and verify the webhook.