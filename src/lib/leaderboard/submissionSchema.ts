import { ObjectSchema, mixed, object, type AnyObject } from 'yup';
import {
	runSubmissionRequestSchema,
	type RunSubmissionRequest,
} from '$lib/types/api/validation/runSubmission';
import type { NgsQuests } from '$lib/types/api/runs/quests';
import type { NgsRunCategories } from '$lib/types/api/runs/categories';
import { yupRunTimeMapped } from '$lib/types/api/validation/schemas/timeSchema';
import { yupRunPartySchema } from '$lib/types/api/validation/schemas/runPartySchema';
import { yupQuestRank } from '$lib/types/api/validation/schemas/questRankSchema';
import { generateRankList } from '$lib/utils/game/rank';

/**
 * Generates a schema for running a submission.
 *
 * @param {NgsQuests} quest - The quest for the submission.
 * @param {NgsRunCategories} category - The category of the submission.
 * @param {number} maxRank - The maximum rank allowed.
 * @param {number} maxPartySize - The maximum party size allowed.
 * @param {number} maxTime - The maximum time allowed in minutes
 * @return {ObjectSchema<RunSubmissionRequest>} schema for the run submission request.
 */
export const createRunSubmissionSchema = <T extends AnyObject, V>(
	quest: NgsQuests,
	category: NgsRunCategories,
	maxRank: number,
	maxPartySize: number,
	maxTimeSeconds: number
) => {
	return createDetailedRunSubmissionSchema(
		quest,
		category,
		maxRank,
		maxPartySize,
		maxTimeSeconds,
		object()
	);
};

export const createDetailedRunSubmissionSchema = <T extends AnyObject>(
	quest: NgsQuests,
	category: NgsRunCategories,
	maxRank: number,
	maxPartySize: number,
	maxTimeSeconds: number,
	details: ObjectSchema<T>
) => {
	const validRanks = generateRankList(maxRank);
	let boardSchema = (
		runSubmissionRequestSchema.shape({
			quest: mixed<NgsQuests>().required().oneOf([quest]),
			questRank: yupQuestRank({
				[category]: validRanks,
			}),
			category: mixed<NgsRunCategories>().required().oneOf([category]),
			party: yupRunPartySchema(maxPartySize),
			time: yupRunTimeMapped({
				[category]: maxTimeSeconds,
			}),
		}) satisfies ObjectSchema<RunSubmissionRequest>
	).shape({
		details: details,
	});

	return boardSchema;
};
