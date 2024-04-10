/**
 * Generates a list of numbers from 1 to maxRank inclusive
 * @param maxRank Max rank
 * @returns List of integers
 */
export const generateRankList = (maxRank: number) =>
	new Array(maxRank).fill(0).map((_, i) => i + 1);
