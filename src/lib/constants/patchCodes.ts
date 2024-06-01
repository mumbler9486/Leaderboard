// The current patch code for all submissions
export const CurrentSubmissionPatchCode = 'level90r';

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
} as const satisfies Record<string, string>;

export type PatchCodes = keyof typeof patchCodeLabelMap;

export const currentPatchLabel = patchCodeLabelMap[CurrentSubmissionPatchCode];
