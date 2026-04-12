import { sqliteTable, integer, text, index, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const players = sqliteTable(
	'Players',
	{
		id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
		userId: text('UserId').notNull(),
		roles: text('Roles', { mode: 'json' }).notNull(),
		playerName: text('PlayerName', { length: 30 }).notNull().unique(),
		characterName: text('CharacterName', { length: 30 }).notNull(),
		bio: text('Bio', { length: 500 }),
		youtube: text('Youtube', { length: 50 }),
		twitch: text('Twitch', { length: 50 }),
		discord: text('Discord', { length: 50 }),
		twitter: text('Twitter', { length: 50 }),
		trophies: text('Trophies', { length: 50 }),
		preferredNameType: integer('PreferredNameType').notNull().default(0),
		server: text('Server', { length: 10 }),
		ship: integer('Ship'),
		flag: text('Flag', { length: 5 }),
		nameEffectType: integer('NameEffectType').notNull().default(0),
		nameColor1: text('NameColor1', { length: 6 }).notNull().default('000000'),
		nameColor2: text('NameColor2', { length: 6 }).notNull().default('000000'),
	},
	(table) => [uniqueIndex('idx_PlayerName').on(table.playerName)]
);

export const runParty = sqliteTable(
	'RunParty',
	{
		id: integer('Id').primaryKey({ autoIncrement: true }).notNull(),
		runId: integer('RunId')
			.references(() => runs.id)
			.notNull(),
		playerId: integer('PlayerId')
			.references(() => players.id)
			.notNull(),
		ordinal: integer('Ordinal').notNull(),
		povLink: text('PovLink', { length: 100 }),
		runCharacterName: text('RunCharacterName', { length: 30 }).notNull(),
		mainClass: text('MainClass', { length: 30 }).notNull(),
		subClass: text('SubClass', { length: 30 }).notNull(),
		styleClass: text('StyleClass', { length: 30 }).notNull(),
		weapons: text('Weapons', { mode: 'json' }).notNull(),
	},
	(table) => [index('idx_RunId').on(table.runId), index('idx_PlayerId').on(table.playerId)]
);

export const runs = sqliteTable(
	'Runs',
	{
		id: integer('Id').primaryKey({ autoIncrement: true }).notNull(),
		submitterId: integer('SubmitterId')
			.references(() => players.id)
			.notNull(),
		game: text('Game', { length: 3 }).notNull(),
		quest: text('Quest', { length: 50 }).notNull(),
		category: text('Category', { length: 30 }).notNull(),
		serverRegion: text('ServerRegion', { length: 10 }).notNull(),
		patch: text('Patch', { length: 30 }).notNull(),
		questRank: integer('QuestRank').notNull(),
		partySize: integer('PartySize').notNull(),
		runTime: integer('RunTime', { mode: 'timestamp_ms' }).notNull(),
		notes: text('Notes', { length: 1000 }),
		submissionDate: integer('SubmissionDate', { mode: 'timestamp' }).notNull(),
		submissionStatus: integer('SubmissionStatus').notNull(),
		dateReviewed: integer('DateReviewed', { mode: 'timestamp' }),
		modNotes: text('ModNotes', { length: 1000 }),
		attributes: text('Attributes', { mode: 'json' }),
		reviewedBy: text('ReviewedBy', { length: 30 }),
	},
	(table) => [
		index('idx_SubmitterId').on(table.submitterId),
		index('idx_Quest').on(table.quest),
		index('idx_PartySize').on(table.partySize),
		index('idx_Category').on(table.category),
		index('idx_Patch').on(table.patch),
		index('idx_RunTime').on(table.runTime),
		index('idx_SubmissionStatus').on(table.submissionStatus),
	]
);
