export interface DiscordMessage {
	username: string;
	title: string;
	url: string;
	description: string; // Message body
	color: number; // Decimal representation of hex color
	thumbnailUrl: string;
	imageUrl: string;
	footerText: string;
}

export const sendDiscordNotification = async (webhookUrl: string, message: DiscordMessage) => {
	try {
		fetch(webhookUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: message.username,
				embeds: [
					{
						title: message.title,
						url: message.url,
						description: message.description,
						color: message.color,
						thumbnail: {
							url: message.thumbnailUrl,
						},
						image: {
							url: message.imageUrl,
						},
						footer: {
							text: message.footerText,
						},
					},
				],
			}),
		});
	} catch (err) {
		console.error(err);
	}
};
