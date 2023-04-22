import { rest } from 'msw';

export const DISCORD_WEBHOOK_NOTIFY = rest.post(
	'https://discord.com/api/webhooks/:webhookId/:apiKey',
	async (req, res, ctx) => {
		console.info(
			'Discord webhook request received',
			JSON.stringify(await req.json(), undefined, 2)
		);
		return res(ctx.status(204));
	}
);

export const discordHandlers = [DISCORD_WEBHOOK_NOTIFY];
