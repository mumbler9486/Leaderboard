-- D1 Cloudflare uses SQLite

CREATE TABLE Players (
    Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    UserId TEXT NOT NULL,
    Roles TEXT NOT NULL,
    PlayerName TEXT NOT NULL UNIQUE,
    CharacterName TEXT NOT NULL,
    Bio TEXT NULL,
    Youtube TEXT NULL,
    Twitch TEXT NULL,
    Discord TEXT NULL,
    Twitter TEXT NULL,
    Trophies TEXT NULL,
    PreferredNameType INTEGER NOT NULL DEFAULT 0,
    Server TEXT NULL,
    Ship INTEGER NULL,
    Flag TEXT NULL,
    NameEffectType INTEGER NOT NULL DEFAULT 0,
    NameColor1 TEXT NOT NULL DEFAULT '000000',
    NameColor2 TEXT NOT NULL DEFAULT '000000'
);

-- Foreign Key Constraints
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS RunParty (
    Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    RunId INTEGER NOT NULL,
    PlayerId INTEGER NULL,
    Ordinal INTEGER NOT NULL,
    PovLink TEXT NULL,
    RunCharacterName TEXT NOT NULL,
    MainClass TEXT NOT NULL,
    SubClass TEXT NOT NULL,
    StyleClass TEXT NOT NULL,
    Weapons TEXT NULL,
    FOREIGN KEY (RunId) REFERENCES Runs(Id),
    FOREIGN KEY (PlayerId) REFERENCES Players(Id)
);

CREATE TABLE IF NOT EXISTS Runs (
    Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    SubmitterId INTEGER NOT NULL,
    Game TEXT NOT NULL,
    Quest TEXT NOT NULL,
    Category TEXT NOT NULL,
    ServerRegion TEXT NOT NULL,
    Patch TEXT NOT NULL,
    QuestRank INTEGER NOT NULL,
    PartySize INTEGER NOT NULL,
    RunTime TIME NOT NULL,
    Notes TEXT NULL,
    SubmissionDate DATETIME NOT NULL,
    SubmissionStatus INTEGER NOT NULL,
    DateReviewed DATETIME NULL,
    ModNotes TEXT NULL,
    Attributes TEXT NULL,
    ReviewedBy TEXT NULL,
    FOREIGN KEY (SubmitterId) REFERENCES Players(Id)
);

-- Starting IDs
-- Set to one less than desired starting ID
INSERT INTO sqlite_sequence (name, seq) VALUES ('Runs', 999);
INSERT INTO sqlite_sequence (name, seq) VALUES ('RunParty', 999);
INSERT INTO sqlite_sequence (name, seq) VALUES ('Players', 999);

-- Indexes
CREATE INDEX idx_Runs_SubmitterId ON Runs (SubmitterId);
CREATE INDEX idx_Runs_Quest ON Runs (Quest);
CREATE INDEX idx_Runs_PartySize ON Runs (PartySize);
CREATE INDEX idx_Runs_Category ON Runs (Category);
CREATE INDEX idx_Runs_Patch ON Runs (Patch);
CREATE INDEX idx_Runs_RunTime ON Runs (RunTime);
CREATE INDEX idx_Runs_SubmissionStatus ON Runs (SubmissionStatus);

CREATE INDEX idx_Party_RunId ON RunParty (RunId);
CREATE INDEX idx_Party_PlayerId ON RunParty (PlayerId);
CREATE INDEX idx_Players_UserId ON Players (UserId);
CREATE INDEX idx_Players_PlayerName ON Players (PlayerName);
