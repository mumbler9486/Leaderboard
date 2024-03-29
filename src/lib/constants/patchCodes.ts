// The current patch code for all submissions
export const CurrentSubmissionPatchCode = 'level85r';

// Keep patch codes under 30 chars
export const patchCodeLabelMap: { [code: string]: string } = {
	['pre60r']: 'Pre +60 Release',
	['60r']: '+60 Release',
	['slayer']: 'Slayer Release',
	['pot6r']: 'Potential Lv6. Release',
	['level75r']: 'Level 75 Release',
	['level80r']: 'Level 80 Release',
	['lvl80grind']: '+80 Weap. Release',
	['level85r']: 'Level 85 Release',
};

export const currentPatchLabel = patchCodeLabelMap[CurrentSubmissionPatchCode];
