import { IndomitableBoss } from '../duels/indomitableBoss';
import { PurpleRegion } from '../purpleRegions';

export enum NgsRunCategories {
	Quest = 'quest',
	UrgentQuest = 'urgent_quest',
	Trigger = 'trigger',
	NexAelio = IndomitableBoss.NexAelio,
	RenusRetem = IndomitableBoss.RenusRetem,
	AmsKvaris = IndomitableBoss.AmsKvaris,
	NilsStia = IndomitableBoss.NilsStia,
	Halvaldi = IndomitableBoss.Halvaldi,
	Zelvin = IndomitableBoss.Zelvin,
	Ringwedge = IndomitableBoss.Ringwedge,
	Aelio = PurpleRegion.Aelio,
	Retem = PurpleRegion.Retem,
	Kvaris = PurpleRegion.Kvaris,
	Stia = PurpleRegion.Stia,
	AelioIntruders = PurpleRegion.AelioIntruders,
}

export const ngsCategoryTranslationMap: Record<NgsRunCategories, string> = {
	[NgsRunCategories.Quest]: `leaderboard.categories.${NgsRunCategories.Quest}`,
	[NgsRunCategories.UrgentQuest]: `leaderboard.categories.${NgsRunCategories.UrgentQuest}`,
	[NgsRunCategories.Trigger]: `leaderboard.categories.${NgsRunCategories.Trigger}`,
	[NgsRunCategories.NexAelio]: `leaderboard.categories.${NgsRunCategories.NexAelio}`,
	[NgsRunCategories.RenusRetem]: `leaderboard.categories.${NgsRunCategories.RenusRetem}`,
	[NgsRunCategories.AmsKvaris]: `leaderboard.categories.${NgsRunCategories.AmsKvaris}`,
	[NgsRunCategories.NilsStia]: `leaderboard.categories.${NgsRunCategories.NilsStia}`,
	[NgsRunCategories.Halvaldi]: `leaderboard.categories.${NgsRunCategories.Halvaldi}`,
	[NgsRunCategories.Zelvin]: `leaderboard.categories.${NgsRunCategories.Zelvin}`,
	[NgsRunCategories.Ringwedge]: `leaderboard.categories.${NgsRunCategories.Ringwedge}`,
	[NgsRunCategories.Aelio]: `leaderboard.categories.${NgsRunCategories.Aelio}`,
	[NgsRunCategories.Retem]: `leaderboard.categories.${NgsRunCategories.Retem}`,
	[NgsRunCategories.Kvaris]: `leaderboard.categories.${NgsRunCategories.Kvaris}`,
	[NgsRunCategories.Stia]: `leaderboard.categories.${NgsRunCategories.Stia}`,
	[NgsRunCategories.AelioIntruders]: `leaderboard.categories.${NgsRunCategories.AelioIntruders}`,
};
