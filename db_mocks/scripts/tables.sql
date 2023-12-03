-- Create tables
DROP TABLE IF EXISTS runs CASCADE;
CREATE TABLE runs (
	id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1000 ) PRIMARY KEY,
	submitter_id int NOT NULL,
	game varchar(3) NOT NULL,
	quest varchar(50) NOT NULL,
	category varchar(30) NOT NULL,
	server_region varchar(10) NOT NULL,
	patch varchar(30) NOT NULL,
	quest_rank smallint NOT NULL,
	party_size smallint NOT NULL,
	run_time interval NOT NULL,
	notes varchar(500) NULL,
	submission_date timestamptz NOT NULL,
	submission_status smallint NOT NULL,
	date_approved timestamptz NULL,
	mod_notes varchar(500) NULL,
	attributes jsonb NULL,
	reviewed_by varchar(30)
);

DROP TABLE IF EXISTS run_party CASCADE;
CREATE TABLE run_party (
	id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1000 ) PRIMARY KEY,
	run_id int NOT NULL,
	player_id int NULL,
	ordinal smallint NOT NULL,
	pov_link varchar(100) NULL,
	run_character_name varchar(30) NOT NULL,
	main_class varchar(30) NOT NULL,
	sub_class varchar(30) NOT NULL,
	weapons jsonb NULL
);

DROP TABLE IF EXISTS Players CASCADE;
CREATE TABLE Players (
	id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1000 ) PRIMARY KEY,
	user_id uuid NOT NULL,
	roles jsonb NOT NULL,
	player_name varchar(30) NOT NULL UNIQUE,
	character_name varchar(30) NOT NULL,
	bio varchar(500) NULL,
	youtube varchar(50) NULL,
	twitch varchar(50) NULL,
	discord varchar(50) NULL,
	twitter varchar(50) NULL,
	trophies varchar(50) NULL,
	preferred_name_type smallint NOT NULL,
	server varchar(10) NULL,
	ship smallint NULL,
	flag varchar(5) NULL,
	name_effect_type smallint NOT NULL,
	name_color1 varchar(6) NOT NULL,
	name_color2 varchar(6) NOT NULL
);


-- ALTER TABLE run_party WITH CHECK ADD CONSTRAINT FK_Party_RunId FOREIGN KEY(RunId)
-- REFERENCES runs (Id)
-- ALTER TABLE run_party CHECK CONSTRAINT FK_Party_RunId

-- ALTER TABLE run_party WITH CHECK ADD CONSTRAINT FK_Party_PlayerId FOREIGN KEY(PlayerId)
-- REFERENCES Players (Id)
-- ALTER TABLE run_party CHECK CONSTRAINT FK_Party_PlayerId

-- ALTER TABLE runs WITH CHECK ADD CONSTRAINT FK_runs_SubmitterId FOREIGN KEY(SubmitterId)
-- REFERENCES Players (Id)
-- ALTER TABLE runs CHECK CONSTRAINT FK_runs_SubmitterId

-- ALTER TABLE Players 
-- ADD CONSTRAINT df_PreferredNameType DEFAULT 0 FOR PreferredNameType;

-- ALTER TABLE Players
-- ADD CONSTRAINT df_NameEffectType DEFAULT 0 FOR NameEffectType;

-- ALTER TABLE Players
-- ADD CONSTRAINT df_NameColor1 DEFAULT '000000' FOR NameColor1;

-- ALTER TABLE Players
-- ADD CONSTRAINT df_NameColor2 DEFAULT '000000' FOR NameColor2;

-- CREATE INDEX idx_runs_SubmitterId
-- ON runs (SubmitterId)

-- CREATE INDEX idx_runs_Game
-- ON runs (Quest)

-- CREATE INDEX idx_runs_Quest
-- ON runs (Quest)

-- CREATE INDEX idx_runs_PartySize
-- ON runs (PartySize)

-- CREATE INDEX idx_runs_Category
-- ON runs (Category)

-- CREATE INDEX idx_runs_Patch
-- ON runs (Patch)

-- CREATE INDEX idx_runs_RunTime
-- ON runs (RunTime)

-- CREATE INDEX idx_runs_SubmissionStatus
-- ON runs (SubmissionStatus)

-- CREATE INDEX idx_runs_PovLink
-- ON run_party (PovLink)

-- CREATE INDEX idx_Party_RunId
-- ON run_party (RunId)

-- CREATE INDEX idx_Party_PlayerId
-- ON run_party (PlayerId)

-- CREATE INDEX idx_Players_UserId
-- ON Players (UserId)

-- CREATE INDEX idx_Players_PlayerName
-- ON Players (PlayerName)

