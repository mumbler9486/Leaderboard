import sql from 'mssql';
import type { IndomitableRun } from '$lib/types/api/duels/indomitable';
import { parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { parseWeapon } from '$lib/types/api/weapon';
import { leaderboardDb } from '$lib/server/db/db';
import { error, json } from '@sveltejs/kit';
import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import { type InferType, string, number, object, array } from 'yup';
import { normalizeYoutubeLink, youtubeUrlRegex } from '$lib/utils/youtube.js';
import { jsonError } from '$lib/server/error.js';
import { weaponsToDbValMap } from '$lib/server/db/util/weaponType.js';
import { notifyDiscordNewRunSubmitted } from '$lib/server/discordNotify.js';

const approvalRequestSchema = object({
	moderatorId: number().required(),
	runId: number().required(),
	modNotes: string().nullable().max(500)
});

type ApprovalRequest = InferType<typeof approvalRequestSchema>;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// Validate request
	const body = await request.json();
	let parsedRun: ApprovalRequest;
	try {
		parsedRun = await approvalRequestSchema.validate(body);
	} catch (err: any) {
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}
	if (!parsedRun) {
		return jsonError(400, { error: 'json_parse_error' });
	}

	// Check data in db
	const validationErrors = await checkData(parsedRun);
	if (validationErrors.length > 0) {
		return jsonError(400, { error: 'bad_request', details: validationErrors });
	}

	return json({ data: 'success' });
}

const checkData = async (run: ApprovalRequest) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	return errorList;
};
