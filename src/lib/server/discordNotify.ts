import * as dotenv from 'dotenv';
dotenv.config();

const RUN_SUBMITTED_DISCORD_WEBHOOK_URL = process.env.RUN_SUBMITTED_DISCORD_WEBHOOK_URL;
const RUN_APPROVAL_THUMBNAIL_DFA = process.env.RUN_APPROVAL_THUMBNAIL_DFA;
const RUN_APPROVAL_THUMBNAIL_STIA_PURPLE = process.env.RUN_APPROVAL_THUMBNAIL_STIA_PURPLE;
const RUN_APPROVAL_WEBHOOK_USER_IMG = process.env.RUN_APPROVAL_WEBHOOK_USER_IMG;

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

const RUN_APPROVAL_DISCORD_WEBHOOK_URL = process.env.RUN_APPROVAL_DISCORD_WEBHOOK_URL;

export const notifyDiscordNewRunApproved = async (
	moderatorName: string,
	playerName: string,
	quest: string
) => {
	const webhookUrl = RUN_APPROVAL_DISCORD_WEBHOOK_URL;
	if (!webhookUrl) return;

	const thumbnail = quest.toLowerCase().startsWith('dfa')
		? process.env.RUN_APPROVAL_THUMBNAIL_DFA
		: process.env.RUN_APPROVAL_THUMBNAIL_STIA_PURPLE;
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
						title: 'A new run has been approved :white_check_mark:',
						url: 'https://leaderboard.pso2central.com',
						description: `A new \`${quest}\` run from \`${playerName}\` has been approved by \`${moderatorName}\` and added to the leaderboard.`,
						color: 54300,
						thumbnail: {
							url: process.env.RUN_APPROVAL_WEBHOOK_USER_IMG
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
