// Fixes an error with Promise cancellation
process.env.NTBA_FIX_319 = '1';

// Require our Telegram helper package
const TelegramBot = require('node-telegram-bot-api');
const { get_tutor_tips } = require('../lib/gemini_api');

// Export as an asynchronous function
// We'll wait until we've responded to the user
module.exports = async (request, response) => {
    try {
        // Ensure the TELEGRAM_TOKEN is set
        if (!process.env.TELEGRAM_TOKEN) {
            throw new Error('TELEGRAM_TOKEN is not set in environment variables');
        }

        console.log("Initialized")

        // Create our new bot handler with the token
        const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

        // Retrieve the POST request body that gets sent from Telegram
        const { body } = request;

        // Ensure that this is a message being sent
        if (body.message) {
            // Retrieve the ID for this chat
            // and the text that the user sent
            const { chat: { id }, text } = body.message;

            // Get the tutor response
            let tutor_response;
            try {
                tutor_response = await get_tutor_tips(text);
            } catch (err) {
                console.error('Error in get_tutor_tips:', err);
                tutor_response = 'Sorry, I could not process your request.';
            }

            // Send our new message back in Markdown
            await bot.sendMessage(id, tutor_response, { parse_mode: 'Markdown' });

            console.log('Message sent!')
        }

        // Acknowledge the message with Telegram
        response.send('OK');
    } catch (error) {
        // Log the error
        console.error('Error sending message:', error.toString());
        response.status(500).send('Internal Server Error');
    }
};