-- Aegis Solo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (21000,1001,'ngs','dfaegis','urgent_quest','global','level80r',1,1,'0:17:24','Test notes','2023-05-16T00:46:06Z',1,'2023-05-16T02:46:06Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (21001,1017,'ngs','dfaegis','urgent_quest','japan','level80r',1,1,'0:10:01','Test notes','2023-11-25T05:38:26Z',1,'2023-11-25T07:38:26Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (21002,1011,'ngs','dfaegis','urgent_quest','global','60r',1,1,'0:12:49','Test notes','2023-05-29T11:54:52Z',1,'2023-05-29T13:54:52Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (21003,1013,'ngs','dfaegis','urgent_quest','global','pre60r',1,1,'0:14:35','Test notes','2023-07-27T07:52:03Z',1,'2023-07-27T09:52:03Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (21004,5000000,'ngs','dfaegis','urgent_quest','global','pot6r',1,1,'0:14:04','Test notes','2023-07-07T01:12:28Z',1,'2023-07-07T03:12:28Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (21005,1011,'ngs','dfaegis','urgent_quest','japan','pre60r',1,1,'0:16:05','Test notes','2023-07-13T11:19:22Z',1,'2023-07-13T13:19:22Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (21006,1012,'ngs','dfaegis','urgent_quest','global','level75r',1,1,'0:13:37','Test notes','2023-06-14T15:25:32Z',1,'2023-06-14T18:25:32Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (21007,1013,'ngs','dfaegis','urgent_quest','global','lvl80grind',1,1,'0:13:16','Test notes','2023-12-02T11:58:04Z',1,'2023-12-03T11:58:04Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (21008,1014,'ngs','dfaegis','urgent_quest','japan','60r',1,1,'0:17:31','Test notes','2023-07-31T08:42:36Z',1,'2023-07-31T10:42:36Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (21009,1013,'ngs','dfaegis','urgent_quest','japan','60r',1,1,'0:16:14','Test notes','2023-03-27T01:20:57Z',1,'2023-03-28T01:20:57Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (21010,1015,'ngs','dfaegis','urgent_quest','global','pre60r',1,1,'0:19:01','Test notes','2023-07-04T18:33:23Z',1,'2023-07-06T18:33:23Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (21011,1014,'ngs','dfaegis','urgent_quest','japan','level75r',1,1,'0:15:02','Test notes','2023-11-19T07:56:40Z',1,'2023-11-20T07:56:40Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (21012,1017,'ngs','dfaegis','urgent_quest','global','level75r',1,1,'0:12:58','Test notes','2023-07-23T00:55:46Z',1,'2023-08-23T00:55:46Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (21013,1016,'ngs','dfaegis','urgent_quest','global','level80r',1,1,'0:14:18','Test notes','2023-02-05T22:27:06Z',1,'2023-02-05T23:27:06Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (21014,1011,'ngs','dfaegis','urgent_quest','japan','60r',1,1,'0:18:18','Test notes','2023-10-10T23:10:22Z',1,'2023-10-11T01:10:22Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (21015,1012,'ngs','dfaegis','urgent_quest','global','pre60r',1,1,'0:18:44','Test notes','2023-04-06T19:10:05Z',1,'2023-04-06T21:10:05Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (21016,1012,'ngs','dfaegis','urgent_quest','global','level80r',1,1,'0:16:28','New Time succeeds old run','2023-12-25T11:53:20Z',1,'2023-03-25T13:55:20Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (21017,5000000,'ngs','dfaegis','urgent_quest','global','level80r',1,1,'0:13:52','Test not yet approved run','2023-12-05T23:25:44Z',0,NULL,'{"support":"aina_manon"}',NULL,NULL),
  (21018,5000000,'ngs','dfaegis','urgent_quest','japan','level80r',1,1,'0:18:19','Test not yet approved run 2','2023-03-05T22:16:12Z',0,NULL,'{"support":"nadereh"}',NULL,NULL),
  (21019,5000000,'ngs','dfaegis','urgent_quest','global','level80r',1,1,'0:17:27','Test reject run','2023-12-09T00:49:35Z',9,NULL,'Rejected run','{"support":"nadereh"}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (21300,21000,1001,0,'https://youtu.be/9290f1f37dcd','trying_to_rid_this_name','ngs_force','ngs_braver','["ngs_harmonizer","ngs_twin_daggers","ngs_wired_lance"]'),
  (21301,21001,1017,0,'https://youtu.be/6a8e68308b7d','trying_to_rid_this_name','ngs_techter','ngs_force','["ngs_knuckles","ngs_bow","ngs_twin_daggers"]'),
  (21302,21002,1011,0,'https://youtu.be/b79a886c6ac2','trying_to_rid_this_name','ngs_bouncer','ngs_slayer','["ngs_twin_daggers","ngs_bow"]'),
  (21303,21003,1013,0,'https://youtu.be/74784743a9b7','trying_to_rid_this_name','ngs_bouncer','ngs_hunter','["ngs_double_sabers","ngs_katana","ngs_assault_rifle"]'),
  (21304,21004,5000000,0,'https://youtu.be/d99d563d6ab1','trying_to_rid_this_name','ngs_techter','ngs_force','["ngs_partisan","ngs_wired_lance","ngs_twin_daggers"]'),
  (21305,21005,1011,0,'https://youtu.be/774ec119eb3a','trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_gunblade","ngs_rod","ngs_bow"]'),
  (21306,21006,1012,0,'https://youtu.be/c333aff6a000','trying_to_rid_this_name','ngs_waker','ngs_slayer','["ngs_bow","ngs_wand"]'),
  (21307,21007,1013,0,'https://youtu.be/a8af2b118ab0','trying_to_rid_this_name','ngs_force','ngs_gunner','["ngs_twin_machine_guns","ngs_assault_rifle","ngs_talis"]'),
  (21308,21008,1014,0,'https://youtu.be/6de03a746b50','trying_to_rid_this_name','ngs_waker','ngs_gunner','["ngs_gunblade","ngs_soaring_blades"]'),
  (21309,21009,1013,0,'https://youtu.be/f04219c651e3','trying_to_rid_this_name','ngs_slayer','ngs_waker','["ngs_twin_daggers","ngs_bow"]'),
  (21310,21010,1015,0,'https://youtu.be/8a1e228f4d97','trying_to_rid_this_name','ngs_braver','ngs_bouncer','["ngs_double_sabers","ngs_rod","ngs_launcher"]'),
  (21311,21011,1014,0,'https://youtu.be/6f1ede296d39','trying_to_rid_this_name','ngs_fighter','ngs_slayer','["ngs_rod","ngs_wand","ngs_soaring_blades"]'),
  (21312,21012,1017,0,'https://youtu.be/1090bfd9c9f6','trying_to_rid_this_name','ngs_techter','ngs_slayer','["ngs_katana","ngs_soaring_blades","ngs_katana"]'),
  (21313,21013,1016,0,'https://youtu.be/04dd0f7208f6','trying_to_rid_this_name','ngs_braver','ngs_ranger','["ngs_sword","ngs_katana","ngs_sword"]'),
  (21314,21014,1011,0,'https://youtu.be/0ebb90604621','trying_to_rid_this_name','ngs_fighter','ngs_fighter','["ngs_sword","ngs_twin_daggers","ngs_bow"]'),
  (21315,21015,1012,0,'https://youtu.be/4ed87c4f6499','trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_jet_boots","ngs_jet_boots","ngs_wired_lance"]'),
  (21316,21016,1012,0,'https://youtu.be/f3400d4b9785','trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_double_sabers","ngs_gunblade","ngs_katana"]'),
  (21317,21017,5000000,0,'https://youtu.be/c6ee8510939b','trying_to_rid_this_name','ngs_gunner','ngs_force','["ngs_twin_machine_guns","ngs_wired_lance","ngs_twin_machine_guns"]'),
  (21318,21018,5000000,0,'https://youtu.be/54b8ced12d5e','trying_to_rid_this_name','ngs_fighter','ngs_force','["ngs_soaring_blades","ngs_assault_rifle","ngs_sword"]'),
  (21319,21019,5000000,0,'https://youtu.be/08186ad3c2e7','trying_to_rid_this_name','ngs_hunter','ngs_bouncer','["ngs_launcher","ngs_gunblade","ngs_soaring_blades"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Aegis Duo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (22000,1001,'ngs','dfaegis','urgent_quest','global','level80r',1,2,'0:15:58','Test notes','2023-11-16T08:33:32Z',1,'2023-11-16T11:33:32Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (22001,1017,'ngs','dfaegis','urgent_quest','japan','level80r',1,2,'0:12:23','Test notes','2023-03-13T22:36:48Z',1,'2023-03-13T23:36:48Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (22002,1011,'ngs','dfaegis','urgent_quest','global','60r',1,2,'0:11:32','Test notes','2023-12-10T23:38:06Z',1,'2023-12-10T23:39:06Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (22003,1013,'ngs','dfaegis','urgent_quest','global','pre60r',1,2,'0:11:08','Test notes','2023-02-04T00:42:02Z',1,'2023-02-04T01:42:02Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (22004,5000000,'ngs','dfaegis','urgent_quest','global','pot6r',1,2,'0:16:59','Test notes','2023-07-12T14:52:12Z',1,'2023-07-15T14:52:12Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (22005,1011,'ngs','dfaegis','urgent_quest','japan','pre60r',1,2,'0:15:53','Test notes','2023-09-23T17:51:04Z',1,'2023-09-24T17:51:04Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (22006,1012,'ngs','dfaegis','urgent_quest','global','level75r',1,2,'0:10:30','Test notes','2023-04-25T07:13:46Z',1,'2023-04-25T09:13:46Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (22007,1013,'ngs','dfaegis','urgent_quest','global','lvl80grind',1,2,'0:16:16','Test notes','2023-11-01T01:29:56Z',1,'2023-11-01T02:29:56Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (22008,1014,'ngs','dfaegis','urgent_quest','japan','60r',1,2,'0:13:04','Test notes','2023-01-15T11:20:44Z',1,'2023-01-15T17:20:44Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (22009,1013,'ngs','dfaegis','urgent_quest','japan','60r',1,2,'0:10:03','Test notes','2023-11-14T10:20:37Z',1,'2023-11-14T18:20:37Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (22010,1015,'ngs','dfaegis','urgent_quest','global','pre60r',1,2,'0:16:21','Test notes','2023-12-16T10:23:30Z',1,'2023-12-16T14:23:30Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (22011,1014,'ngs','dfaegis','urgent_quest','japan','level75r',1,2,'0:12:48','Test notes','2023-08-14T07:55:30Z',1,'2023-08-14T08:00:30Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (22012,1017,'ngs','dfaegis','urgent_quest','global','level75r',1,2,'0:16:43','Test notes','2023-06-30T06:09:22Z',1,'2023-07-30T06:09:22Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (22013,1016,'ngs','dfaegis','urgent_quest','global','level80r',1,2,'0:12:53','Test notes','2023-08-30T23:24:25Z',1,'2023-08-30T23:55:25Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (22014,1011,'ngs','dfaegis','urgent_quest','japan','60r',1,2,'0:13:47','Test notes','2023-08-10T00:47:56Z',1,'2023-08-10T02:47:56Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (22015,1012,'ngs','dfaegis','urgent_quest','global','pre60r',1,2,'0:13:32','Test notes','2023-03-05T23:36:32Z',1,'2023-03-05T23:45:32Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (22016,1012,'ngs','dfaegis','urgent_quest','global','level80r',1,2,'0:12:44','New Time succeeds old run','2023-07-25T01:23:16Z',1,'2023-07-25T03:23:16Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (22017,5000000,'ngs','dfaegis','urgent_quest','global','level80r',1,2,'0:12:42','Test not yet approved run','2023-01-20T10:07:30Z',0,NULL,'{"support":"nadereh"}',NULL,NULL),
  (22018,5000000,'ngs','dfaegis','urgent_quest','japan','level80r',1,2,'0:14:19','Test not yet approved run 2','2023-11-15T01:38:28Z',0,NULL,'{"support":"ilma"}',NULL,NULL),
  (22019,5000000,'ngs','dfaegis','urgent_quest','japan','level80r',1,2,'0:16:30','Test reject run','2023-08-01T06:12:37Z',9,'2023-08-01T09:12:37Z','Rejected run','{"support":"aina_manon"}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (22000,22000,1001,0,'https://youtu.be/b7ab7534ce95','trying_to_rid_this_name','ngs_gunner','ngs_force',NULL),
  (22001,22000,1006,0,'https://youtu.be/7124ef60c692','trying_to_rid_this_name','ngs_bouncer','ngs_waker',NULL),
  
  (22002,22001,1017,0,'https://youtu.be/5a3b6ae04354','trying_to_rid_this_name','ngs_ranger','ngs_braver',NULL),
  (22003,22001,1030,0,NULL,'trying_to_rid_this_name','ngs_braver','ngs_bouncer',NULL),
  
  (22004,22002,1011,0,'https://youtu.be/209290f1f37d','trying_to_rid_this_name','ngs_techter','ngs_gunner',NULL),
  (22005,22002,1023,0,'https://youtu.be/386a8e68308b','trying_to_rid_this_name','ngs_fighter','ngs_slayer',NULL),
  
  (22006,22003,1013,0,'https://youtu.be/86b79a886c6a','trying_to_rid_this_name','ngs_gunner','ngs_hunter',NULL),
  (22007,22003,1025,0,'https://youtu.be/0a74784743a9','trying_to_rid_this_name','ngs_bouncer','ngs_slayer',NULL),
  
  (22008,22004,5000000,0,'https://youtu.be/80d99d563d6a','trying_to_rid_this_name','ngs_slayer','ngs_bouncer',NULL),
  (22009,22004,1021,0,'https://youtu.be/5f774ec119eb','trying_to_rid_this_name','ngs_slayer','ngs_braver',NULL),
  
  (22010,22005,1011,0,'https://youtu.be/dcc333aff6a0','trying_to_rid_this_name','ngs_hunter','ngs_ranger',NULL),
  (22011,22005,5000000,0,NULL,'trying_to_rid_this_name','ngs_bouncer','ngs_force',NULL),
  
  (22012,22006,1012,0,'https://youtu.be/db6de03a746b','trying_to_rid_this_name','ngs_slayer','ngs_hunter',NULL),
  (22013,22006,1020,0,'https://youtu.be/67f04219c651','trying_to_rid_this_name','ngs_ranger','ngs_techter',NULL),
  
  (22014,22007,1013,0,'https://youtu.be/df8a1e228f4d','trying_to_rid_this_name','ngs_techter','ngs_slayer',NULL),
  (22015,22007,1018,0,'https://youtu.be/876f1ede296d','trying_to_rid_this_name','ngs_hunter','ngs_gunner',NULL),
  
  (22016,22008,1014,0,'https://youtu.be/2d1090bfd9c9','trying_to_rid_this_name','ngs_fighter','ngs_bouncer',NULL),
  (22017,22008,1010,0,'https://youtu.be/7d04dd0f7208','trying_to_rid_this_name','ngs_braver','ngs_slayer',NULL),
  
  (22018,22009,1013,0,'https://youtu.be/1c0ebb906046','trying_to_rid_this_name','ngs_fighter','ngs_force',NULL),
  (22019,22009,1017,0,'https://youtu.be/8b4ed87c4f64','trying_to_rid_this_name','ngs_slayer','ngs_hunter',NULL),
  
  (22020,22010,1015,0,'https://youtu.be/def3400d4b97','trying_to_rid_this_name','ngs_ranger','ngs_techter',NULL),
  (22021,22010,1030,0,NULL,'trying_to_rid_this_name','ngs_gunner','ngs_hunter',NULL),
  
  (22022,22011,1014,0,'https://youtu.be/f354b8ced12d','trying_to_rid_this_name','ngs_techter','ngs_fighter',NULL),
  (22023,22011,1010,0,'https://youtu.be/4808186ad3c2','trying_to_rid_this_name','ngs_slayer','ngs_waker',NULL),
  
  (22024,22012,1017,0,'https://youtu.be/30ce51d32ed2','trying_to_rid_this_name','ngs_gunner','ngs_bouncer',NULL),
  (22025,22012,1011,0,'https://youtu.be/e5ceed15797b','trying_to_rid_this_name','ngs_bouncer','ngs_fighter',NULL),
  
  (22026,22013,1016,0,'https://youtu.be/32eda55fecc2','trying_to_rid_this_name','ngs_force','ngs_hunter',NULL),
  (22027,22013,1022,0,'https://youtu.be/85ce2ff5596c','trying_to_rid_this_name','ngs_slayer','ngs_slayer',NULL),
  
  (22028,22014,1011,0,'https://youtu.be/d72db799f864','trying_to_rid_this_name','ngs_gunner','ngs_bouncer',NULL),
  (22029,22014,1026,0,NULL,'trying_to_rid_this_name','ngs_waker','ngs_braver',NULL),
  
  (22030,22015,1012,0,'https://youtu.be/558a94b2fd77','trying_to_rid_this_name','ngs_force','ngs_bouncer',NULL),
  (22031,22015,1016,0,'https://youtu.be/b887cf837ba5','trying_to_rid_this_name','ngs_techter','ngs_braver',NULL),
  
  (22032,22016,1012,0,'https://youtu.be/9c5f7e54241f','trying_to_rid_this_name','ngs_force','ngs_slayer',NULL),
  (22033,22016,1016,0,'https://youtu.be/f1f6205bdb31','trying_to_rid_this_name','ngs_techter','ngs_fighter',NULL),
  
  (22034,22017,5000000,0,'https://youtu.be/fa32ef105756','trying_to_rid_this_name','ngs_techter','ngs_hunter',NULL),
  (22035,22017,1022,0,'https://youtu.be/f4f87b79d3f4','trying_to_rid_this_name','ngs_waker','ngs_techter',NULL),
  
  (22036,22018,5000000,0,'https://youtu.be/eb4a94f96a2d','trying_to_rid_this_name','ngs_braver','ngs_gunner',NULL),
  (22037,22018,1030,0,NULL,'trying_to_rid_this_name','ngs_slayer','ngs_force',NULL),
  
  (22038,22019,5000000,0,'https://youtu.be/da0daf609887','trying_to_rid_this_name','ngs_force','ngs_gunner',NULL),
  (22039,22019,1029,0,'https://youtu.be/c482d7cc35b8','trying_to_rid_this_name','ngs_force','ngs_slayer',NULL)

;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Aegis Party
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (23000,1001,'ngs','dfaegis','urgent_quest','global','level80r',1,8,'0:16:32','Test notes','2023-05-16T00:46:06Z',1,'2023-05-16T02:46:06Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (23001,1017,'ngs','dfaegis','urgent_quest','japan','level80r',1,8,'0:14:23','Test notes','2023-11-25T05:38:26Z',1,'2023-11-25T07:38:26Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (23002,1011,'ngs','dfaegis','urgent_quest','global','60r',1,8,'0:16:56','Test notes','2023-05-29T11:54:52Z',1,'2023-05-29T13:54:52Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (23003,1013,'ngs','dfaegis','urgent_quest','global','pre60r',1,8,'0:14:36','Test notes','2023-07-27T07:52:03Z',1,'2023-07-27T09:52:03Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (23004,5000000,'ngs','dfaegis','urgent_quest','global','pot6r',1,8,'0:10:38','Test notes','2023-07-07T01:12:28Z',1,'2023-07-07T03:12:28Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (23005,1011,'ngs','dfaegis','urgent_quest','japan','pre60r',1,8,'0:11:58','Test notes','2023-07-13T11:19:22Z',1,'2023-07-13T13:19:22Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (23006,1012,'ngs','dfaegis','urgent_quest','global','level75r',1,8,'0:18:58','Test notes','2023-06-14T15:25:32Z',1,'2023-06-14T18:25:32Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (23007,1013,'ngs','dfaegis','urgent_quest','global','lvl80grind',1,8,'0:12:02','Test notes','2023-12-02T11:58:04Z',1,'2023-12-03T11:58:04Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (23008,1014,'ngs','dfaegis','urgent_quest','japan','60r',1,8,'0:16:17','Test notes','2023-07-31T08:42:36Z',1,'2023-07-31T10:42:36Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (23009,1013,'ngs','dfaegis','urgent_quest','japan','60r',1,8,'0:17:58','Test notes','2023-03-27T01:20:57Z',1,'2023-03-28T01:20:57Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (23010,1015,'ngs','dfaegis','urgent_quest','global','pre60r',1,8,'0:16:15','Test notes','2023-07-04T18:33:23Z',1,'2023-07-06T18:33:23Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (23011,1014,'ngs','dfaegis','urgent_quest','japan','level75r',1,8,'0:12:58','Test notes','2023-11-19T07:56:40Z',1,'2023-11-20T07:56:40Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (23012,1017,'ngs','dfaegis','urgent_quest','global','level75r',1,8,'0:14:16','Test notes','2023-07-23T00:55:46Z',1,'2023-08-23T00:55:46Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (23013,1016,'ngs','dfaegis','urgent_quest','global','level80r',1,8,'0:16:42','Test notes','2023-02-05T22:27:06Z',1,'2023-02-05T23:27:06Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (23014,1011,'ngs','dfaegis','urgent_quest','japan','60r',1,8,'0:15:09','Test notes','2023-10-10T23:10:22Z',1,'2023-10-11T01:10:22Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (23015,1012,'ngs','dfaegis','urgent_quest','global','pre60r',1,8,'0:18:13','Test notes','2023-04-06T19:10:05Z',1,'2023-04-06T21:10:05Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (23016,1012,'ngs','dfaegis','urgent_quest','global','level80r',1,8,'0:17:52','New Time succeeds old run','2023-12-25T11:53:20Z',1,'2023-03-25T13:55:20Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (23017,5000000,'ngs','dfaegis','urgent_quest','global','level80r',1,8,'0:19:16','Test not yet approved run','2023-12-05T23:25:44Z',0,NULL,'{"support":"glen"}',NULL,NULL),
  (23018,5000000,'ngs','dfaegis','urgent_quest','japan','level80r',1,8,'0:13:00','Test not yet approved run 2','2023-03-05T22:16:12Z',0,NULL,'{"support":"ilma"}',NULL,NULL),
  (23019,5000000,'ngs','dfaegis','urgent_quest','global','level80r',1,8,'0:13:56','Test reject run','2023-12-09T00:49:35Z',9,NULL,'Rejected run','{"support":"aina_manon"}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (23000,23000,1001,0,'https://youtu.be/e439eb96a491','trying_to_rid_this_name','ngs_gunner','ngs_slayer', NULL),
  (23001,23000,1014,0,'https://youtu.be/16fce33459c0','trying_to_rid_this_name','ngs_ranger','ngs_techter', NULL),
  (23002,23000,1003,0,'https://youtu.be/114f6116b2ce','trying_to_rid_this_name','ngs_gunner','ngs_slayer', NULL),
  (23003,23000,1012,0,'https://youtu.be/7ae049770f92','trying_to_rid_this_name','ngs_waker','ngs_gunner', NULL),
  (23004,23000,1002,1,'https://youtu.be/98380a8afffc','trying_to_rid_this_name','ngs_force','ngs_force', NULL),
  (23005,23000,5000000,1,'https://youtu.be/0fd7611818bf','trying_to_rid_this_name','ngs_braver','ngs_braver', NULL),
  (23006,23000,1005,1,'https://youtu.be/df23cd6a4264','trying_to_rid_this_name','ngs_waker','ngs_gunner', NULL),
  (23007,23000,1006,1,NULL,'trying_to_rid_this_name','ngs_ranger','ngs_bouncer', NULL),

  (23008,23001,1017,0,'https://youtu.be/8683313eca8d','trying_to_rid_this_name','ngs_hunter','ngs_bouncer', NULL),
  (23009,23001,1013,0,NULL,'trying_to_rid_this_name','ngs_braver','ngs_waker', NULL),
  (23010,23001,1016,0,NULL,'trying_to_rid_this_name','ngs_fighter','ngs_bouncer', NULL),
  (23011,23001,1018,0,NULL,'trying_to_rid_this_name','ngs_slayer','ngs_braver', NULL),
  (23012,23001,1009,1,NULL,'trying_to_rid_this_name','ngs_hunter','ngs_ranger', NULL),
  (23013,23001,1005,1,NULL,'trying_to_rid_this_name','ngs_bouncer','ngs_hunter', NULL),
  (23014,23001,1012,1,NULL,'trying_to_rid_this_name','ngs_techter','ngs_braver', NULL),
  (23015,23001,1026,1,NULL,'trying_to_rid_this_name','ngs_ranger','ngs_gunner', NULL),

  (23016,23002,1011,0,'https://youtu.be/6f44d63b740c','trying_to_rid_this_name','ngs_ranger','ngs_braver', NULL),
  (23017,23002,1023,0,'https://youtu.be/a12f0fb2acb1','trying_to_rid_this_name','ngs_force','ngs_bouncer', NULL),
  (23018,23002,1021,0,'https://youtu.be/fa38bd0c356b','trying_to_rid_this_name','ngs_waker','ngs_ranger', NULL),
  (23019,23002,1019,0,NULL,'trying_to_rid_this_name','ngs_bouncer','ngs_braver', NULL),
  (23020,23002,1030,1,NULL,'trying_to_rid_this_name','ngs_slayer','ngs_braver', NULL),
  (23021,23002,1007,1,NULL,'trying_to_rid_this_name','ngs_bouncer','ngs_force', NULL),
  (23022,23002,1027,1,NULL,'trying_to_rid_this_name','ngs_braver','ngs_fighter', NULL),
  (23023,23002,1029,1,'https://youtu.be/b294dae206eb','trying_to_rid_this_name','ngs_force','ngs_techter', NULL),

  (23024,23003,1013,0,'https://youtu.be/ecefd2a36989','trying_to_rid_this_name','ngs_fighter','ngs_bouncer', NULL),
  (23025,23003,1009,0,'https://youtu.be/3e0f9beba959','trying_to_rid_this_name','ngs_hunter','ngs_bouncer', NULL),
  (23026,23003,1004,0,'https://youtu.be/e683e8016241','trying_to_rid_this_name','ngs_gunner','ngs_fighter', NULL),
  (23027,23003,1028,0,'https://youtu.be/2c43715dc10c','trying_to_rid_this_name','ngs_force','ngs_techter', NULL),
  (23028,23003,1006,1,'https://youtu.be/30b65fdcc9df','trying_to_rid_this_name','ngs_ranger','ngs_fighter', NULL),
  (23029,23003,1001,1,'https://youtu.be/9bae092a3246','trying_to_rid_this_name','ngs_techter','ngs_force', NULL),
  (23030,23003,1010,1,'https://youtu.be/79db51cc6a85','trying_to_rid_this_name','ngs_ranger','ngs_force', NULL),
  (23031,23003,1022,1,'https://youtu.be/8d20a8f2c3a0','trying_to_rid_this_name','ngs_gunner','ngs_hunter', NULL),

  (23032,23004,5000000,0,'https://youtu.be/a2987c28b1a3','trying_to_rid_this_name','ngs_braver','ngs_techter', NULL),
  (23033,23004,1010,0,NULL,'trying_to_rid_this_name','ngs_waker','ngs_hunter', NULL),
  (23034,23004,1008,0,NULL,'trying_to_rid_this_name','ngs_slayer','ngs_gunner', NULL),
  (23035,23004,1009,0,NULL,'trying_to_rid_this_name','ngs_hunter','ngs_gunner', NULL),
  (23036,23004,1030,1,NULL,'trying_to_rid_this_name','ngs_braver','ngs_slayer', NULL),
  (23037,23004,1026,1,NULL,'trying_to_rid_this_name','ngs_slayer','ngs_ranger', NULL),
  (23038,23004,1003,1,NULL,'trying_to_rid_this_name','ngs_fighter','ngs_techter', NULL),
  (23039,23004,1013,1,'https://youtu.be/2d8153a9ae9c','trying_to_rid_this_name','ngs_braver','ngs_bouncer', NULL),

  (23040,23005,1011,0,'https://youtu.be/f9c588f5c100','trying_to_rid_this_name','ngs_force','ngs_slayer', NULL),
  (23041,23005,1010,0,'https://youtu.be/055a18a9fabd','trying_to_rid_this_name','ngs_waker','ngs_fighter', NULL),
  (23042,23005,1026,0,'https://youtu.be/198ed4196f00','trying_to_rid_this_name','ngs_braver','ngs_waker', NULL),
  (23043,23005,1001,0,'https://youtu.be/e7f6fad4724d','trying_to_rid_this_name','ngs_waker','ngs_fighter', NULL),
  (23044,23005,1002,1,'https://youtu.be/9960140b6696','trying_to_rid_this_name','ngs_gunner','ngs_bouncer', NULL),
  (23045,23005,5000000,1,'https://youtu.be/d1678d26978b','trying_to_rid_this_name','ngs_hunter','ngs_techter', NULL),
  (23046,23005,1024,1,'https://youtu.be/63387af14358','trying_to_rid_this_name','ngs_force','ngs_slayer', NULL),
  (23047,23005,1027,1,'https://youtu.be/e100cfbff238','trying_to_rid_this_name','ngs_fighter','ngs_force', NULL),

  (23048,23006,1012,0,'https://youtu.be/b49f4111f7ec','trying_to_rid_this_name','ngs_slayer','ngs_bouncer', NULL),
  (23049,23006,1004,0,NULL,'trying_to_rid_this_name','ngs_hunter','ngs_ranger', NULL),
  (23050,23006,1028,0,NULL,'trying_to_rid_this_name','ngs_force','ngs_ranger', NULL),
  (23051,23006,1015,0,'https://youtu.be/e466dd22c56a','trying_to_rid_this_name','ngs_hunter','ngs_fighter', NULL),
  (23052,23006,1027,1,NULL,'trying_to_rid_this_name','ngs_waker','ngs_bouncer', NULL),
  (23053,23006,1003,1,NULL,'trying_to_rid_this_name','ngs_waker','ngs_fighter', NULL),
  (23054,23006,1007,1,NULL,'trying_to_rid_this_name','ngs_waker','ngs_ranger', NULL),
  (23055,23006,1011,1,NULL,'trying_to_rid_this_name','ngs_hunter','ngs_force', NULL),

  (23056,23007,1013,0,'https://youtu.be/67c1bc0abfe4','trying_to_rid_this_name','ngs_bouncer','ngs_force', NULL),
  (23057,23007,1020,0,'https://youtu.be/99f24a7912fa','trying_to_rid_this_name','ngs_bouncer','ngs_fighter', NULL),
  (23058,23007,1023,0,'https://youtu.be/ae9489004398','trying_to_rid_this_name','ngs_gunner','ngs_bouncer', NULL),
  (23059,23007,1007,0,'https://youtu.be/24de99a58bee','trying_to_rid_this_name','ngs_techter','ngs_bouncer', NULL),
  (23060,23007,1025,1,'https://youtu.be/5ecc92446762','trying_to_rid_this_name','ngs_force','ngs_fighter', NULL),
  (23061,23007,1014,1,'https://youtu.be/dc061ed418b1','trying_to_rid_this_name','ngs_ranger','ngs_gunner', NULL),
  (23062,23007,1003,1,'https://youtu.be/99dd84541e58','trying_to_rid_this_name','ngs_force','ngs_slayer', NULL),
  (23063,23007,1009,1,'https://youtu.be/42d79b5a91ec','trying_to_rid_this_name','ngs_slayer','ngs_gunner', NULL),

  (23064,23008,1014,0,'https://youtu.be/8137cd6694de','trying_to_rid_this_name','ngs_slayer','ngs_gunner', NULL),
  (23065,23008,1005,0,NULL,'trying_to_rid_this_name','ngs_fighter','ngs_bouncer', NULL),
  (23066,23008,1013,0,NULL,'trying_to_rid_this_name','ngs_waker','ngs_techter', NULL),
  (23067,23008,1017,0,NULL,'trying_to_rid_this_name','ngs_fighter','ngs_bouncer', NULL),
  (23068,23008,1003,1,NULL,'trying_to_rid_this_name','ngs_waker','ngs_slayer', NULL),
  (23069,23008,1006,1,NULL,'trying_to_rid_this_name','ngs_ranger','ngs_hunter', NULL),
  (23070,23008,1025,1,NULL,'trying_to_rid_this_name','ngs_techter','ngs_ranger', NULL),
  (23071,23008,1024,1,NULL,'trying_to_rid_this_name','ngs_waker','ngs_braver', NULL),

  (23072,23009,1013,0,'https://youtu.be/f85b196a99bf','trying_to_rid_this_name','ngs_slayer','ngs_techter', NULL),
  (23073,23009,1012,0,NULL,'trying_to_rid_this_name','ngs_bouncer','ngs_slayer', NULL),
  (23074,23009,5000000,0,NULL,'trying_to_rid_this_name','ngs_braver','ngs_techter', NULL),
  (23075,23009,1006,0,NULL,'trying_to_rid_this_name','ngs_braver','ngs_force', NULL),
  (23076,23009,1015,1,NULL,'trying_to_rid_this_name','ngs_gunner','ngs_ranger', NULL),
  (23077,23009,1007,1,NULL,'trying_to_rid_this_name','ngs_techter','ngs_hunter', NULL),
  (23078,23009,1016,1,NULL,'trying_to_rid_this_name','ngs_techter','ngs_waker', NULL),
  (23079,23009,1011,1,NULL,'trying_to_rid_this_name','ngs_techter','ngs_fighter', NULL),

  (23080,23010,1015,0,'https://youtu.be/3e83395e0490','trying_to_rid_this_name','ngs_bouncer','ngs_hunter', NULL),
  (23081,23010,1012,0,'https://youtu.be/e215120a8302','trying_to_rid_this_name','ngs_braver','ngs_hunter', NULL),
  (23082,23010,1007,0,'https://youtu.be/b72320356336','trying_to_rid_this_name','ngs_slayer','ngs_techter', NULL),
  (23083,23010,1006,0,'https://youtu.be/c8191b2aa090','trying_to_rid_this_name','ngs_hunter','ngs_ranger', NULL),
  (23084,23010,1029,1,'https://youtu.be/93af73f6d9ae','trying_to_rid_this_name','ngs_hunter','ngs_force', NULL),
  (23085,23010,1023,1,'https://youtu.be/713ab00a94cc','trying_to_rid_this_name','ngs_slayer','ngs_ranger', NULL),
  (23086,23010,1027,1,'https://youtu.be/0204a2da39e7','trying_to_rid_this_name','ngs_techter','ngs_fighter', NULL),
  (23087,23010,1008,1,'https://youtu.be/81edf251a605','trying_to_rid_this_name','ngs_force','ngs_slayer', NULL),

  (23088,23011,1014,0,'https://youtu.be/6efc45e14daf','trying_to_rid_this_name','ngs_bouncer','ngs_force', NULL),
  (23089,23011,1011,0,NULL,'trying_to_rid_this_name','ngs_gunner','ngs_bouncer', NULL),
  (23090,23011,1007,0,'https://youtu.be/4e60c2ec5e2f','trying_to_rid_this_name','ngs_gunner','ngs_slayer', NULL),
  (23091,23011,1022,0,NULL,'trying_to_rid_this_name','ngs_techter','ngs_gunner', NULL),
  (23092,23011,1029,1,'https://youtu.be/aac40e249690','trying_to_rid_this_name','ngs_gunner','ngs_waker', NULL),
  (23093,23011,1015,1,NULL,'trying_to_rid_this_name','ngs_techter','ngs_slayer', NULL),
  (23094,23011,1030,1,'https://youtu.be/54950163b837','trying_to_rid_this_name','ngs_fighter','ngs_slayer', NULL),
  (23095,23011,1021,1,NULL,'trying_to_rid_this_name','ngs_slayer','ngs_techter', NULL),

  (23096,23012,1017,0,'https://youtu.be/e71043c799d4','trying_to_rid_this_name','ngs_force','ngs_techter', NULL),
  (23097,23012,1011,0,NULL,'trying_to_rid_this_name','ngs_bouncer','ngs_ranger', NULL),
  (23098,23012,1028,0,NULL,'trying_to_rid_this_name','ngs_hunter','ngs_waker', NULL),
  (23099,23012,1019,0,'https://youtu.be/a3f9a587ba20','trying_to_rid_this_name','ngs_fighter','ngs_bouncer', NULL),
  (23100,23012,1030,1,NULL,'trying_to_rid_this_name','ngs_gunner','ngs_force', NULL),
  (23101,23012,1018,1,'https://youtu.be/873939fdb8d9','trying_to_rid_this_name','ngs_techter','ngs_ranger', NULL),
  (23102,23012,1003,1,NULL,'trying_to_rid_this_name','ngs_force','ngs_bouncer', NULL),
  (23103,23012,1001,1,'https://youtu.be/5361cabcc8c1','trying_to_rid_this_name','ngs_fighter','ngs_hunter', NULL),

  (23104,23013,1016,0,'https://youtu.be/7285a859fea6','trying_to_rid_this_name','ngs_slayer','ngs_bouncer', NULL),
  (23105,23013,1013,0,'https://youtu.be/23cc88b490c5','trying_to_rid_this_name','ngs_bouncer','ngs_slayer', NULL),
  (23106,23013,1025,0,'https://youtu.be/73b26b653078','trying_to_rid_this_name','ngs_fighter','ngs_hunter', NULL),
  (23107,23013,1004,0,'https://youtu.be/59f2da2f4549','trying_to_rid_this_name','ngs_slayer','ngs_bouncer', NULL),
  (23108,23013,5000000,1,'https://youtu.be/d8d54a9ee010','trying_to_rid_this_name','ngs_waker','ngs_force', NULL),
  (23109,23013,1011,1,'https://youtu.be/71487d0b79df','trying_to_rid_this_name','ngs_techter','ngs_braver', NULL),
  (23110,23013,1020,1,'https://youtu.be/0e02aabd39c8','trying_to_rid_this_name','ngs_force','ngs_ranger', NULL),
  (23111,23013,1009,1,'https://youtu.be/0a8bfce9b7dc','trying_to_rid_this_name','ngs_slayer','ngs_gunner', NULL),

  (23112,23014,1011,0,'https://youtu.be/bee80f24fe0e','trying_to_rid_this_name','ngs_braver','ngs_waker', NULL),
  (23113,23014,1015,0,NULL,'trying_to_rid_this_name','ngs_force','ngs_gunner', NULL),
  (23114,23014,1018,0,NULL,'trying_to_rid_this_name','ngs_force','ngs_bouncer', NULL),
  (23115,23014,1006,0,NULL,'trying_to_rid_this_name','ngs_waker','ngs_fighter', NULL),
  (23116,23014,1022,1,NULL,'trying_to_rid_this_name','ngs_ranger','ngs_fighter', NULL),
  (23117,23014,1029,1,NULL,'trying_to_rid_this_name','ngs_hunter','ngs_ranger', NULL),
  (23118,23014,1030,1,NULL,'trying_to_rid_this_name','ngs_ranger','ngs_hunter', NULL),
  (23119,23014,1021,1,NULL,'trying_to_rid_this_name','ngs_braver','ngs_techter', NULL),

  (23120,23015,1012,0,'https://youtu.be/2870c26d1103','trying_to_rid_this_name','ngs_slayer','ngs_ranger', NULL),
  (23121,23015,1001,0,'https://youtu.be/eded431982d4','trying_to_rid_this_name','ngs_slayer','ngs_techter', NULL),
  (23122,23015,1007,0,'https://youtu.be/873c7fd1b730','trying_to_rid_this_name','ngs_techter','ngs_hunter', NULL),
  (23123,23015,1010,0,'https://youtu.be/cf4d8d3a34fa','trying_to_rid_this_name','ngs_techter','ngs_braver', NULL),
  (23124,23015,1008,1,'https://youtu.be/854739799951','trying_to_rid_this_name','ngs_slayer','ngs_waker', NULL),
  (23125,23015,1023,1,'https://youtu.be/aab506d08db6','trying_to_rid_this_name','ngs_techter','ngs_gunner', NULL),
  (23126,23015,1022,1,'https://youtu.be/df471e45c0fb','trying_to_rid_this_name','ngs_ranger','ngs_techter', NULL),
  (23127,23015,1021,1,'https://youtu.be/77f090d9c412','trying_to_rid_this_name','ngs_waker','ngs_bouncer', NULL),

  (23128,23016,1012,0,'https://youtu.be/d192ebf67e3b','trying_to_rid_this_name','ngs_gunner','ngs_hunter', NULL),
  (23129,23016,1023,0,'https://youtu.be/185cfe016727','trying_to_rid_this_name','ngs_fighter','ngs_force', NULL),
  (23130,23016,1030,0,'https://youtu.be/5d938314fefd','trying_to_rid_this_name','ngs_hunter','ngs_slayer', NULL),
  (23131,23016,5000000,0,'https://youtu.be/4e7eec55d03f','trying_to_rid_this_name','ngs_bouncer','ngs_braver', NULL),
  (23132,23016,1006,1,'https://youtu.be/c926b73e3955','trying_to_rid_this_name','ngs_fighter','ngs_bouncer', NULL),
  (23133,23016,1004,1,'https://youtu.be/97465682e0b0','trying_to_rid_this_name','ngs_slayer','ngs_force', NULL),
  (23134,23016,1018,1,'https://youtu.be/201d28df77c5','trying_to_rid_this_name','ngs_fighter','ngs_force', NULL),
  (23135,23016,1008,1,'https://youtu.be/a6fe0315bcca','trying_to_rid_this_name','ngs_force','ngs_fighter', NULL),

  (23136,23017,5000000,0,'https://youtu.be/6e6945698d7a','trying_to_rid_this_name','ngs_force','ngs_gunner', NULL),
  (23137,23017,1001,0,'https://youtu.be/6725d2d0ac91','trying_to_rid_this_name','ngs_bouncer','ngs_gunner', NULL),
  (23138,23017,1005,0,'https://youtu.be/7fb2aaaffd2b','trying_to_rid_this_name','ngs_force','ngs_gunner', NULL),
  (23139,23017,1020,0,'https://youtu.be/32bb060929c7','trying_to_rid_this_name','ngs_ranger','ngs_bouncer', NULL),
  (23140,23017,1013,1,'https://youtu.be/24de8bd524f2','trying_to_rid_this_name','ngs_force','ngs_waker', NULL),
  (23141,23017,1028,1,'https://youtu.be/49ec10974703','trying_to_rid_this_name','ngs_slayer','ngs_waker', NULL),
  (23142,23017,1017,1,'https://youtu.be/287eba992f95','trying_to_rid_this_name','ngs_bouncer','ngs_ranger', NULL),
  (23143,23017,1010,1,'https://youtu.be/39c4d48136fe','trying_to_rid_this_name','ngs_braver','ngs_force', NULL),

  (23144,23018,5000000,0,'https://youtu.be/8c5b1a7cab4e','trying_to_rid_this_name','ngs_bouncer','ngs_fighter', NULL),
  (23145,23018,1019,0,'https://youtu.be/7ad0200beca4','trying_to_rid_this_name','ngs_fighter','ngs_braver', NULL),
  (23146,23018,1012,0,'https://youtu.be/0f9bb3d11467','trying_to_rid_this_name','ngs_gunner','ngs_braver', NULL),
  (23147,23018,1022,0,NULL,'trying_to_rid_this_name','ngs_slayer','ngs_hunter', NULL),
  (23148,23018,1016,1,NULL,'trying_to_rid_this_name','ngs_braver','ngs_slayer', NULL),
  (23149,23018,1002,1,NULL,'trying_to_rid_this_name','ngs_gunner','ngs_techter', NULL),
  (23150,23018,1001,1,NULL,'trying_to_rid_this_name','ngs_ranger','ngs_waker', NULL),
  (23151,23018,1017,1,'https://youtu.be/0deb8cd90620','trying_to_rid_this_name','ngs_bouncer','ngs_slayer', NULL),

  (23152,23019,5000000,0,'https://youtu.be/202a78e85a9d','trying_to_rid_this_name','ngs_slayer','ngs_fighter', NULL),
  (23153,23019,1005,0,'https://youtu.be/783b6c8ec57a','trying_to_rid_this_name','ngs_techter','ngs_fighter', NULL),
  (23154,23019,1010,0,'https://youtu.be/ed9ea25c1aaa','trying_to_rid_this_name','ngs_force','ngs_waker', NULL),
  (23155,23019,1006,0,'https://youtu.be/08f4bba9792c','trying_to_rid_this_name','ngs_waker','ngs_braver', NULL),
  (23156,23019,1028,1,'https://youtu.be/a48dca8d95aa','trying_to_rid_this_name','ngs_force','ngs_gunner', NULL),
  (23157,23019,1019,1,'https://youtu.be/9e5a25ec543f','trying_to_rid_this_name','ngs_waker','ngs_hunter', NULL),
  (23158,23019,1029,1,'https://youtu.be/1e1e2732f80f','trying_to_rid_this_name','ngs_hunter','ngs_braver', NULL),
  (23159,23019,1021,1,'https://youtu.be/33e59a22d5c6','trying_to_rid_this_name','ngs_hunter','ngs_techter', NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;
