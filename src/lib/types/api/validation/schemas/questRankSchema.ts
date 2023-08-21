import { number } from 'yup';

/**
 * Creates a quest rank validation based on the category of the quest
 * @param validRanksMap A category mapped to a list of valid ranks
 * @returns
 */
export const yupQuestRank = (validRanksMap: Record<string, number[]>) =>
	number()
		.integer()
		.required()
		.test(
			'valid_quest_rank',
			(questRank) => `Quest rank is invalid for the selected quest.`,
			(questRank, ctx) => {
				if (!questRank) {
					return true;
				}

				const validRanks = validRanksMap[ctx.parent.category] ?? [];
				const isValid = validRanks.includes(questRank) ?? false;
				if (!isValid) {
					return ctx.createError({
						message: `Quest rank is invalid. Must be one of: ${validRanks.join(',')}`
					});
				}
				return isValid;
			}
		);
