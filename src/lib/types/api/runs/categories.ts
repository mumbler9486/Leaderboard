export enum NgsRunCategories {
	Quest = 'quest',
	UrgentQuest = 'urgent_quest',
	Trigger = 'trigger',
	NexAelio = 'nex_aelio',
	RenusRetem = 'renus_retem',
	AmsKvaris = 'ams_kvaris',
	NilsStia = 'nils_stia',
	Halvaldi = 'halvaldi',
	Zelvin = 'zelvin',
	Ringwedge = 'ringwedge',
	Aelio = 'aelio',
	Retem = 'retem',
	Kvaris = 'kvaris',
	Stia = 'stia',
	AelioIntruders = 'aelio_intruders',
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
