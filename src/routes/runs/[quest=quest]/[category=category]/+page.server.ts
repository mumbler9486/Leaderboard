import { error } from '@sveltejs/kit';
import { lookupBoardByRoute } from '$lib/leaderboard/boards';

export function load({ params }) {
	const boardInfo = lookupBoardByRoute(params.quest, params.category)!;

	if (!boardInfo) {
		throw error(404, 'Unknown leaderboard');
	}
}
