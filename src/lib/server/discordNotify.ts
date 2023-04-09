import {
	RUN_SUBMITTED_DISCORD_WEBHOOK_URL,
	RUN_APPROVAL_THUMBNAIL_DFA,
	RUN_APPROVAL_THUMBNAIL_STIA_PURPLE,
	RUN_APPROVAL_WEBHOOK_USER_IMG
} from '$env/static/private';

export const notifyDiscordNewRunSubmitted = async (userName: string, quest: string) => {
	const webhookUrl = RUN_SUBMITTED_DISCORD_WEBHOOK_URL;
	if (!webhookUrl) return;

	const thumbnail = quest.toLowerCase().startsWith('dfa')
		? RUN_APPROVAL_THUMBNAIL_DFA
		: RUN_APPROVAL_THUMBNAIL_STIA_PURPLE;

	try {
		fetch(webhookUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: 'PSO2 Central Leaderboard',
				embeds: [
					{
						title: 'A new run has been submitted :hourglass_flowing_sand:',
						url: 'https://leaderboard.pso2central.com',
						description: `A new **${quest}** run has been submitted by \`${userName}\` to the leaderboard and awaits approval.`,
						color: 16765294,
						thumbnail: {
							url: RUN_APPROVAL_WEBHOOK_USER_IMG
						},
						image: {
							url: thumbnail
						},
						footer: {
							text: 'PSO2 Central Leaderboard'
						}
					}
				]
			})
		});
	} catch (err) {
		console.error(err);
	}
};
