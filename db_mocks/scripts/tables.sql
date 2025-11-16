CREATE TABLE dbo.[Runs] (
    [Id] int IDENTITY(1000,1) NOT NULL,
    [SubmitterId] int NOT NULL,
    [Game] nvarchar(3) NOT NULL,
    [Quest] nvarchar(50) NOT NULL,
    [Category] nvarchar(30) NOT NULL,
    [ServerRegion] nvarchar(10) NOT NULL,
    [Patch] nvarchar(30) NOT NULL,
    [QuestRank] tinyint NOT NULL,
    [PartySize] tinyint NOT NULL,
    [RunTime] time(7) NOT NULL,
    [Notes] nvarchar(500) NULL,
    [SubmissionDate] datetime2 NOT NULL,
    [SubmissionStatus] tinyint NOT NULL,
    [DateReviewed] datetime2 NULL,
    [ModNotes] nvarchar(500) NULL,
    [Attributes] nvarchar(4000) NULL,
	[ReviewedBy] nvarchar(30) NULL,
    CONSTRAINT [PK_Runs] PRIMARY KEY CLUSTERED (
        [Id] ASC
    )
)

CREATE TABLE dbo.[RunParty] (
    [Id] int IDENTITY(1000,1) NOT NULL,
    [RunId] int NOT NULL,
    [PlayerId] int NULL,
    [Ordinal] tinyint NOT NULL,
    [PovLink] nvarchar(100) NULL,
    [RunCharacterName] nvarchar(30) NOT NULL,
    [MainClass] nvarchar(30) NOT NULL,
    [SubClass] nvarchar(30) NOT NULL,
    [StyleClass] nvarchar(30) NOT NULL,
    [Weapons] nvarchar(4000) NULL,
    CONSTRAINT [PK_Party] PRIMARY KEY CLUSTERED (
        [Id] ASC
    )
)

CREATE TABLE dbo.[Players] (
    [Id] int IDENTITY(1000,1) NOT NULL,
    [UserId] uniqueidentifier NOT NULL,
    [Roles] nvarchar(4000) NOT NULL,
    [PlayerName] nvarchar(30) NOT NULL UNIQUE,
    [CharacterName] nvarchar(30) NOT NULL,
    [Bio] nvarchar(500) NULL,
    [Youtube] nvarchar(50) NULL,
    [Twitch] nvarchar(50) NULL,
    [Discord] nvarchar(50) NULL,
    [Twitter] nvarchar(50) NULL,
    [Trophies] nvarchar(50) NULL,
    [PreferredNameType] tinyint NOT NULL,
    [Server] nvarchar(10) NULL,
    [Ship] tinyint NULL,
    [Flag] nvarchar(5) NULL,
    [NameEffectType] tinyint NOT NULL,
    [NameColor1] nvarchar(6) NOT NULL,
    [NameColor2] nvarchar(6) NOT NULL,
    CONSTRAINT [PK_Players] PRIMARY KEY CLUSTERED (
        [Id] ASC
    )
)


ALTER TABLE dbo.[RunParty] WITH CHECK ADD CONSTRAINT [FK_Party_RunId] FOREIGN KEY([RunId])
REFERENCES dbo.[Runs] ([Id])
ALTER TABLE dbo.[RunParty] CHECK CONSTRAINT [FK_Party_RunId]

ALTER TABLE dbo.[RunParty] WITH CHECK ADD CONSTRAINT [FK_Party_PlayerId] FOREIGN KEY([PlayerId])
REFERENCES dbo.[Players] ([Id])
ALTER TABLE dbo.[RunParty] CHECK CONSTRAINT [FK_Party_PlayerId]

ALTER TABLE dbo.[Runs] WITH CHECK ADD CONSTRAINT [FK_Runs_SubmitterId] FOREIGN KEY([SubmitterId])
REFERENCES dbo.[Players] ([Id])
ALTER TABLE dbo.[Runs] CHECK CONSTRAINT [FK_Runs_SubmitterId]

ALTER TABLE dbo.[Players]
ADD CONSTRAINT [df_PreferredNameType] DEFAULT 0 FOR PreferredNameType;

ALTER TABLE dbo.[Players]
ADD CONSTRAINT df_NameEffectType DEFAULT 0 FOR NameEffectType;

ALTER TABLE dbo.[Players]
ADD CONSTRAINT df_NameColor1 DEFAULT '000000' FOR NameColor1;

ALTER TABLE dbo.[Players]
ADD CONSTRAINT df_NameColor2 DEFAULT '000000' FOR NameColor2;

CREATE INDEX [idx_Runs_SubmitterId]
ON dbo.[Runs] ([SubmitterId])

CREATE INDEX [idx_Runs_Game]
ON dbo.[Runs] ([Quest])

CREATE INDEX [idx_Runs_Quest]
ON dbo.[Runs] ([Quest])

CREATE INDEX [idx_Runs_PartySize]
ON dbo.[Runs] ([PartySize])

CREATE INDEX [idx_Runs_Category]
ON dbo.[Runs] ([Category])

CREATE INDEX [idx_Runs_Patch]
ON dbo.[Runs] ([Patch])

CREATE INDEX [idx_Runs_RunTime]
ON dbo.[Runs] ([RunTime])

CREATE INDEX [idx_Runs_SubmissionStatus]
ON dbo.[Runs] ([SubmissionStatus])

CREATE INDEX [idx_Runs_PovLink]
ON dbo.[RunParty] ([PovLink])

CREATE INDEX [idx_Party_RunId]
ON dbo.[RunParty] ([RunId])

CREATE INDEX [idx_Party_PlayerId]
ON dbo.[RunParty] ([PlayerId])

CREATE INDEX [idx_Players_UserId]
ON dbo.[Players] ([UserId])

CREATE INDEX [idx_Players_PlayerName]
ON dbo.[Players] ([PlayerName])
