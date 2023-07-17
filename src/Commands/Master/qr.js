const qr = require('qr-image')

module.exports = {
    name: 'generateqr',
    aliases: ['qr'],
    exp: 0,
    category: 'dev',
    description: 'Generates a QR code for authentication',
    async execute(client, flag, arg, M) {
        // Check if the command is used by the allowed WhatsApp number
        if (M.from !== '265990169520@s.whatsapp.net') return

        // Check if session and bot name are provided
        if (!process.env.SESSION || !process.env.NAME) {
            return client.sendMessage(M.from, 'Please provide the session and name of the bot for multi-authentication.')
        }

        // Generate the QR code
        const qrCode = qr.imageSync(process.env.SESSION)

        // Send the QR code image as a reply
        client.sendMessage(M.from, { image: { url: 'data:image/png;base64,' + qrCode.toString('base64') } }, { quoted: M })
    }
}
