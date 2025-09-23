// The current patch code for all submissions
export const CurrentSubmissionPatchCode: keyof typeof patchCodeLabelMap = 'level110r';

// Keep patch codes under 30 chars
export const patchCodeLabelMap = {
	['pre60r']: 'Pre +60 Release',
	['60r']: '+60 Release',
	['slayer']: 'Slayer Release',
	['pot6r']: 'Potential Lv6. Release',
	['level75r']: 'Level 75 Release',
	['level80r']: 'Level 80 Release',
	['lvl80grind']: '+80 Weap. Release',
	['level85r']: 'Level 85 Release',
	['apr2024xover']: 'Apr. 2024 PA Customs',
	['level90r']: 'Level 90 Release',
	['marsRelease']: 'MARS Release',
	['level95r']: 'Level 95 Release',
	['forceRebalance']: 'Force 2024 Rebalance',
	['level100r']: 'Level 100 Release',
	['braverRebalance']: 'Braver 2025 Rebalance',
	['level105r']: 'Level 105 Release',
	['july2025juvolg']: 'July 2025 Juvolg',
	['wakerRebalance']: 'Waker 2025 Rebalance',
	['level110r']: 'Level 110 Release',
} as const satisfies Record<string, string>;

export type PatchCodes = keyof typeof patchCodeLabelMap;

export const currentPatchLabel = patchCodeLabelMap[CurrentSubmissionPatchCode];
