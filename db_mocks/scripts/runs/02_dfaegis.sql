-- Aegis Solo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (21000,1001,'ngs','dfaegis','urgent_quest','global','level80r',1,1,'0:17:24','Test notes','2023-09-16T02:13:24Z',1,'2023-09-16T04:49:27Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (21001,1017,'ngs','dfaegis','urgent_quest','japan','level80r',1,1,'0:10:01','Test notes','2023-01-22T06:37:21Z',1,'2023-01-22T07:45:49Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (21002,1011,'ngs','dfaegis','urgent_quest','global','60r',1,1,'0:12:49','Test notes','2023-06-17T02:31:16Z',1,'2023-06-17T04:31:41Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (21003,1013,'ngs','dfaegis','urgent_quest','global','pre60r',1,1,'0:14:35','Test notes','2023-02-28T07:19:54Z',1,'2023-02-28T11:31:21Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (21004,5000000,'ngs','dfaegis','urgent_quest','global','pot6r',1,1,'0:14:04','Test notes','2023-03-19T09:49:23Z',1,'2023-03-19T21:21:04Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (21005,1011,'ngs','dfaegis','urgent_quest','japan','pre60r',1,1,'0:16:05','Test notes','2023-02-25T06:18:33Z',1,'2023-02-25T09:49:59Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (21006,1012,'ngs','dfaegis','urgent_quest','global','level75r',1,1,'0:13:37','Test notes','2023-07-16T16:46:12Z',1,'2023-07-17T02:15:40Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (21007,1013,'ngs','dfaegis','urgent_quest','global','lvl80grind',1,1,'0:13:16','Test notes','2023-04-17T11:19:35Z',1,'2023-04-17T16:15:31Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (21008,1014,'ngs','dfaegis','urgent_quest','japan','60r',1,1,'0:17:31','Test notes','2023-04-10T00:05:01Z',1,'2023-04-10T11:53:40Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (21009,1013,'ngs','dfaegis','urgent_quest','japan','60r',1,1,'0:16:14','Test notes','2023-01-14T11:56:00Z',1,'2023-01-14T16:36:32Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (21010,1015,'ngs','dfaegis','urgent_quest','global','pre60r',1,1,'0:19:01','Test notes','2023-07-21T07:13:58Z',1,'2023-07-21T10:07:12Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (21011,1014,'ngs','dfaegis','urgent_quest','japan','level75r',1,1,'0:15:02','Test notes','2023-09-30T13:05:45Z',1,'2023-09-30T15:01:39Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (21012,1017,'ngs','dfaegis','urgent_quest','global','level75r',1,1,'0:12:58','Test notes','2023-08-20T05:17:44Z',1,'2023-08-20T07:05:39Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (21013,1016,'ngs','dfaegis','urgent_quest','global','level80r',1,1,'0:14:18','Test notes','2023-03-28T16:43:09Z',1,'2023-03-29T03:57:58Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (21014,1011,'ngs','dfaegis','urgent_quest','japan','60r',1,1,'0:18:18','Test notes','2023-07-13T09:16:42Z',1,'2023-07-13T12:51:03Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (21015,1012,'ngs','dfaegis','urgent_quest','global','pre60r',1,1,'0:18:44','Test notes','2023-08-26T12:15:50Z',1,'2023-08-26T22:25:37Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (21016,1012,'ngs','dfaegis','urgent_quest','global','level80r',1,1,'0:16:28','New Time succeeds old run','2023-03-28T04:14:49Z',1,'2023-03-28T11:42:55Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (21017,5000000,'ngs','dfaegis','urgent_quest','global','level80r',1,1,'0:13:52','Test not yet approved run','2023-05-10T02:14:07Z',0,NULL,NULL,'{"support":"aina_manon"}',NULL),
  (21018,5000000,'ngs','dfaegis','urgent_quest','japan','level80r',1,1,'0:18:19','Test not yet approved run 2','2023-03-03T02:59:29Z',0,NULL,NULL,'{"support":"nadereh"}',NULL),
  (21019,5000000,'ngs','dfaegis','urgent_quest','global','level80r',1,1,'0:17:27','Test reject run','2023-05-27T17:18:04Z',9,'2023-05-28T00:48:22Z','Rejected run','{"support":"nadereh"}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (21300,21000,1001,0,'https://youtu.be/9290f1f37dcd',N'trying_to_rid_this_name','ngs_force','ngs_braver','ngs_none','["ngs_sword","ngs_twin_daggers","ngs_talis"]'),
  (21301,21001,1017,0,'https://youtu.be/6a8e68308b7d',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none','["ngs_assault_rifle","ngs_harmonizer","ngs_talis"]'),
  (21302,21002,1011,0,'https://youtu.be/b79a886c6ac2',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none','["ngs_sword","ngs_gunblade","ngs_rod"]'),
  (21303,21003,1013,0,'https://youtu.be/74784743a9b7',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none','["ngs_wired_lance","ngs_assault_rifle"]'),
  (21304,21004,5000000,0,'https://youtu.be/d99d563d6ab1',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none','["ngs_twin_daggers","ngs_knuckles","ngs_twin_machine_guns"]'),
  (21305,21005,1011,0,'https://youtu.be/774ec119eb3a',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_sword","ngs_wired_lance","ngs_wand"]'),
  (21306,21006,1012,0,'https://youtu.be/c333aff6a000',N'trying_to_rid_this_name','ngs_waker','ngs_slayer','ngs_none','["ngs_rod","ngs_talis","ngs_harmonizer"]'),
  (21307,21007,1013,0,'https://youtu.be/a8af2b118ab0',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none','["ngs_katana","ngs_soaring_blades","ngs_bow"]'),
  (21308,21008,1014,0,'https://youtu.be/6de03a746b50',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none','["ngs_sword","ngs_assault_rifle","ngs_launcher"]'),
  (21309,21009,1013,0,'https://youtu.be/f04219c651e3',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none','["ngs_twin_daggers","ngs_assault_rifle","ngs_bow"]'),
  (21310,21010,1015,0,'https://youtu.be/8a1e228f4d97',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none','["ngs_wired_lance","ngs_katana","ngs_wand"]'),
  (21311,21011,1014,0,'https://youtu.be/6f1ede296d39',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none','["ngs_knuckles","ngs_katana","ngs_bow"]'),
  (21312,21012,1017,0,'https://youtu.be/1090bfd9c9f6',N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none','["ngs_twin_daggers","ngs_launcher","ngs_rod"]'),
  (21313,21013,1016,0,'https://youtu.be/04dd0f7208f6',N'trying_to_rid_this_name','ngs_braver','ngs_ranger','ngs_none','["ngs_partisan","ngs_knuckles","ngs_harmonizer"]'),
  (21314,21014,1011,0,'https://youtu.be/0ebb90604621',N'trying_to_rid_this_name','ngs_fighter','ngs_waker','ngs_none','["ngs_sword","ngs_bow"]'),
  (21315,21015,1012,0,'https://youtu.be/4ed87c4f6499',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_wired_lance","ngs_gunblade","ngs_bow"]'),
  (21316,21016,1012,0,'https://youtu.be/f3400d4b9785',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_sword","ngs_gunblade","ngs_assault_rifle"]'),
  (21317,21017,5000000,0,'https://youtu.be/c6ee8510939b',N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none','["ngs_bow","ngs_rod","ngs_jet_boots"]'),
  (21318,21018,5000000,0,'https://youtu.be/54b8ced12d5e',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none','["ngs_twin_daggers","ngs_katana","ngs_gunblade"]'),
  (21319,21019,5000000,0,'https://youtu.be/08186ad3c2e7',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none','["ngs_wired_lance","ngs_partisan","ngs_wand"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Aegis Duo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (22000,1001,'ngs','dfaegis','urgent_quest','global','level80r',1,2,'0:15:58','Test notes','2023-06-20T00:28:45Z',1,'2023-06-20T13:02:39Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (22001,1017,'ngs','dfaegis','urgent_quest','japan','level80r',1,2,'0:12:23','Test notes','2023-09-18T03:43:52Z',1,'2023-09-18T09:57:28Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (22002,1011,'ngs','dfaegis','urgent_quest','global','60r',1,2,'0:11:32','Test notes','2023-12-14T01:27:22Z',1,'2023-12-14T07:55:52Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (22003,1013,'ngs','dfaegis','urgent_quest','global','pre60r',1,2,'0:11:08','Test notes','2023-10-11T05:12:53Z',1,'2023-10-11T17:51:59Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (22004,5000000,'ngs','dfaegis','urgent_quest','global','pot6r',1,2,'0:16:59','Test notes','2023-04-11T04:31:56Z',1,'2023-04-11T15:43:12Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (22005,1011,'ngs','dfaegis','urgent_quest','japan','pre60r',1,2,'0:15:53','Test notes','2023-06-06T02:40:36Z',1,'2023-06-06T04:59:33Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (22006,1012,'ngs','dfaegis','urgent_quest','global','level75r',1,2,'0:10:30','Test notes','2023-03-29T11:19:44Z',1,'2023-03-29T22:05:15Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (22007,1013,'ngs','dfaegis','urgent_quest','global','lvl80grind',1,2,'0:16:16','Test notes','2023-05-20T03:59:53Z',1,'2023-05-20T04:21:43Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (22008,1014,'ngs','dfaegis','urgent_quest','japan','60r',1,2,'0:13:04','Test notes','2023-08-08T16:33:24Z',1,'2023-08-09T01:39:32Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (22009,1013,'ngs','dfaegis','urgent_quest','japan','60r',1,2,'0:10:03','Test notes','2023-06-25T03:07:28Z',1,'2023-06-25T13:35:32Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (22010,1015,'ngs','dfaegis','urgent_quest','global','pre60r',1,2,'0:16:21','Test notes','2023-08-19T05:38:38Z',1,'2023-08-19T17:14:17Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (22011,1014,'ngs','dfaegis','urgent_quest','japan','level75r',1,2,'0:12:48','Test notes','2023-03-27T02:09:54Z',1,'2023-03-27T03:46:14Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (22012,1017,'ngs','dfaegis','urgent_quest','global','level75r',1,2,'0:16:43','Test notes','2023-03-05T08:07:47Z',1,'2023-03-05T08:50:36Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (22013,1016,'ngs','dfaegis','urgent_quest','global','level80r',1,2,'0:12:53','Test notes','2023-09-15T05:38:19Z',1,'2023-09-15T17:34:06Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (22014,1011,'ngs','dfaegis','urgent_quest','japan','60r',1,2,'0:13:47','Test notes','2023-09-24T06:24:03Z',1,'2023-09-24T17:51:32Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (22015,1012,'ngs','dfaegis','urgent_quest','global','pre60r',1,2,'0:13:32','Test notes','2023-03-24T05:07:21Z',1,'2023-03-24T10:40:03Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (22016,1012,'ngs','dfaegis','urgent_quest','global','level80r',1,2,'0:12:44','New Time succeeds old run','2023-07-07T03:22:31Z',1,'2023-07-07T06:32:52Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (22017,5000000,'ngs','dfaegis','urgent_quest','global','level80r',1,2,'0:12:42','Test not yet approved run','2023-08-16T19:13:59Z',0,NULL,NULL,'{"support":"nadereh"}',NULL),
  (22018,5000000,'ngs','dfaegis','urgent_quest','japan','level80r',1,2,'0:14:19','Test not yet approved run 2','2023-09-10T16:43:37Z',0,NULL,NULL,'{"support":"ilma"}',NULL),
  (22019,5000000,'ngs','dfaegis','urgent_quest','japan','level80r',1,2,'0:16:30','Test reject run','2023-03-10T09:22:57Z',9,'2023-03-10T19:37:44Z','Rejected run','{"support":"aina_manon"}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (22000,22000,1001,0,'https://youtu.be/b7ab7534ce95',N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none',NULL),
  (22001,22000,1006,0,'https://youtu.be/7124ef60c692',N'trying_to_rid_this_name','ngs_bouncer','ngs_waker','ngs_none',NULL),
  
  (22002,22001,1017,0,'https://youtu.be/5a3b6ae04354',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','ngs_none',NULL),
  (22003,22001,1030,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none',NULL),
  
  (22004,22002,1011,0,'https://youtu.be/209290f1f37d',N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none',NULL),
  (22005,22002,1023,0,'https://youtu.be/386a8e68308b',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none',NULL),
  
  (22006,22003,1013,0,'https://youtu.be/86b79a886c6a',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none',NULL),
  (22007,22003,1025,0,'https://youtu.be/0a74784743a9',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none',NULL),
  
  (22008,22004,5000000,0,'https://youtu.be/80d99d563d6a',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none',NULL),
  (22009,22004,1021,0,'https://youtu.be/5f774ec119eb',N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none',NULL),
  
  (22010,22005,1011,0,'https://youtu.be/dcc333aff6a0',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none',NULL),
  (22011,22005,5000000,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none',NULL),
  
  (22012,22006,1012,0,'https://youtu.be/db6de03a746b',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none',NULL),
  (22013,22006,1020,0,'https://youtu.be/67f04219c651',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none',NULL),
  
  (22014,22007,1013,0,'https://youtu.be/df8a1e228f4d',N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none',NULL),
  (22015,22007,1018,0,'https://youtu.be/876f1ede296d',N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','ngs_none',NULL),
  
  (22016,22008,1014,0,'https://youtu.be/2d1090bfd9c9',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none',NULL),
  (22017,22008,1010,0,'https://youtu.be/7d04dd0f7208',N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none',NULL),
  
  (22018,22009,1013,0,'https://youtu.be/1c0ebb906046',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none',NULL),
  (22019,22009,1017,0,'https://youtu.be/8b4ed87c4f64',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none',NULL),
  
  (22020,22010,1015,0,'https://youtu.be/def3400d4b97',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none',NULL),
  (22021,22010,1030,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none',NULL),
  
  (22022,22011,1014,0,'https://youtu.be/f354b8ced12d',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none',NULL),
  (22023,22011,1010,0,'https://youtu.be/4808186ad3c2',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none',NULL),
  
  (22024,22012,1017,0,'https://youtu.be/30ce51d32ed2',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none',NULL),
  (22025,22012,1011,0,'https://youtu.be/e5ceed15797b',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none',NULL),
  
  (22026,22013,1016,0,'https://youtu.be/32eda55fecc2',N'trying_to_rid_this_name','ngs_force','ngs_hunter','ngs_none',NULL),
  (22027,22013,1022,0,'https://youtu.be/85ce2ff5596c',N'trying_to_rid_this_name','ngs_slayer','ngs_slayer','ngs_none',NULL),
  
  (22028,22014,1011,0,'https://youtu.be/d72db799f864',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none',NULL),
  (22029,22014,1026,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none',NULL),
  
  (22030,22015,1012,0,'https://youtu.be/558a94b2fd77',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none',NULL),
  (22031,22015,1016,0,'https://youtu.be/b887cf837ba5',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none',NULL),
  
  (22032,22016,1012,0,'https://youtu.be/9c5f7e54241f',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none',NULL),
  (22033,22016,1016,0,'https://youtu.be/f1f6205bdb31',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none',NULL),
  
  (22034,22017,5000000,0,'https://youtu.be/fa32ef105756',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none',NULL),
  (22035,22017,1022,0,'https://youtu.be/f4f87b79d3f4',N'trying_to_rid_this_name','ngs_waker','ngs_techter','ngs_none',NULL),
  
  (22036,22018,5000000,0,'https://youtu.be/eb4a94f96a2d',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none',NULL),
  (22037,22018,1030,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_force','ngs_none',NULL),
  
  (22038,22019,5000000,0,'https://youtu.be/da0daf609887',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none',NULL),
  (22039,22019,1029,0,'https://youtu.be/c482d7cc35b8',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none',NULL)

;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Aegis Party
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (23000,1001,'ngs','dfaegis','urgent_quest','global','level80r',1,8,'0:16:32','Test notes','2023-10-01T14:09:28Z',1,'2023-10-01T18:35:44Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (23001,1017,'ngs','dfaegis','urgent_quest','japan','level80r',1,8,'0:14:23','Test notes','2023-11-27T06:28:43Z',1,'2023-11-27T11:06:11Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (23002,1011,'ngs','dfaegis','urgent_quest','global','60r',1,8,'0:16:56','Test notes','2023-10-05T10:22:44Z',1,'2023-10-05T23:03:58Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (23003,1013,'ngs','dfaegis','urgent_quest','global','pre60r',1,8,'0:14:36','Test notes','2023-09-11T10:31:58Z',1,'2023-09-11T14:01:48Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (23004,5000000,'ngs','dfaegis','urgent_quest','global','pot6r',1,8,'0:10:38','Test notes','2023-03-22T20:45:15Z',1,'2023-03-22T21:52:06Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (23005,1011,'ngs','dfaegis','urgent_quest','japan','pre60r',1,8,'0:11:58','Test notes','2023-08-25T16:38:00Z',1,'2023-08-26T02:07:46Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (23006,1012,'ngs','dfaegis','urgent_quest','global','level75r',1,8,'0:18:58','Test notes','2023-07-11T22:43:51Z',1,'2023-07-12T04:04:07Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (23007,1013,'ngs','dfaegis','urgent_quest','global','lvl80grind',1,8,'0:12:02','Test notes','2023-08-18T02:28:59Z',1,'2023-08-18T13:18:22Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (23008,1014,'ngs','dfaegis','urgent_quest','japan','60r',1,8,'0:16:17','Test notes','2023-04-16T02:06:41Z',1,'2023-04-16T14:19:57Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (23009,1013,'ngs','dfaegis','urgent_quest','japan','60r',1,8,'0:17:58','Test notes','2023-12-27T08:53:09Z',1,'2023-12-27T14:17:58Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (23010,1015,'ngs','dfaegis','urgent_quest','global','pre60r',1,8,'0:16:15','Test notes','2023-10-29T15:25:08Z',1,'2023-10-30T00:46:43Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (23011,1014,'ngs','dfaegis','urgent_quest','japan','level75r',1,8,'0:12:58','Test notes','2023-05-01T15:06:13Z',1,'2023-05-02T00:07:28Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (23012,1017,'ngs','dfaegis','urgent_quest','global','level75r',1,8,'0:14:16','Test notes','2023-01-27T21:01:37Z',1,'2023-01-27T22:06:46Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (23013,1016,'ngs','dfaegis','urgent_quest','global','level80r',1,8,'0:16:42','Test notes','2023-05-31T10:37:01Z',1,'2023-05-31T16:39:46Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (23014,1011,'ngs','dfaegis','urgent_quest','japan','60r',1,8,'0:15:09','Test notes','2023-06-27T07:53:54Z',1,'2023-06-27T15:56:03Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (23015,1012,'ngs','dfaegis','urgent_quest','global','pre60r',1,8,'0:18:13','Test notes','2023-09-24T23:10:35Z',1,'2023-09-25T03:28:02Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (23016,1012,'ngs','dfaegis','urgent_quest','global','level80r',1,8,'0:17:52','New Time succeeds old run','2023-05-27T16:24:07Z',1,'2023-05-28T00:41:36Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (23017,5000000,'ngs','dfaegis','urgent_quest','global','level80r',1,8,'0:19:16','Test not yet approved run','2023-03-13T18:45:39Z',0,NULL,NULL,'{"support":"glen"}',NULL),
  (23018,5000000,'ngs','dfaegis','urgent_quest','japan','level80r',1,8,'0:13:00','Test not yet approved run 2','2023-12-18T15:58:54Z',0,NULL,NULL,'{"support":"ilma"}',NULL),
  (23019,5000000,'ngs','dfaegis','urgent_quest','global','level80r',1,8,'0:13:56','Test reject run','2023-06-19T13:42:11Z',9,'2023-06-19T13:42:11Z','Rejected run','{"support":"aina_manon"}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (23000,23000,1001,0,'https://youtu.be/e439eb96a491',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (23001,23000,1014,0,'https://youtu.be/16fce33459c0',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none', NULL),
  (23002,23000,1003,0,'https://youtu.be/114f6116b2ce',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (23003,23000,1012,0,'https://youtu.be/7ae049770f92',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none', NULL),
  (23004,23000,1002,1,'https://youtu.be/98380a8afffc',N'trying_to_rid_this_name','ngs_force','ngs_force','ngs_none', NULL),
  (23005,23000,5000000,1,'https://youtu.be/0fd7611818bf',N'trying_to_rid_this_name','ngs_braver','ngs_braver','ngs_none', NULL),
  (23006,23000,1005,1,'https://youtu.be/df23cd6a4264',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none', NULL),
  (23007,23000,1006,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','ngs_none', NULL),

  (23008,23001,1017,0,'https://youtu.be/8683313eca8d',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none', NULL),
  (23009,23001,1013,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (23010,23001,1016,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (23011,23001,1018,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none', NULL),
  (23012,23001,1009,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (23013,23001,1005,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none', NULL),
  (23014,23001,1012,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none', NULL),
  (23015,23001,1026,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_gunner','ngs_none', NULL),

  (23016,23002,1011,0,'https://youtu.be/6f44d63b740c',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','ngs_none', NULL),
  (23017,23002,1023,0,'https://youtu.be/a12f0fb2acb1',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (23018,23002,1021,0,'https://youtu.be/fa38bd0c356b',N'trying_to_rid_this_name','ngs_waker','ngs_ranger','ngs_none', NULL),
  (23019,23002,1019,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none', NULL),
  (23020,23002,1030,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none', NULL),
  (23021,23002,1007,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (23022,23002,1027,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_fighter','ngs_none', NULL),
  (23023,23002,1029,1,'https://youtu.be/b294dae206eb',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),

  (23024,23003,1013,0,'https://youtu.be/ecefd2a36989',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (23025,23003,1009,0,'https://youtu.be/3e0f9beba959',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none', NULL),
  (23026,23003,1004,0,'https://youtu.be/e683e8016241',N'trying_to_rid_this_name','ngs_gunner','ngs_fighter','ngs_none', NULL),
  (23027,23003,1028,0,'https://youtu.be/2c43715dc10c',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),
  (23028,23003,1006,1,'https://youtu.be/30b65fdcc9df',N'trying_to_rid_this_name','ngs_ranger','ngs_fighter','ngs_none', NULL),
  (23029,23003,1001,1,'https://youtu.be/9bae092a3246',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none', NULL),
  (23030,23003,1010,1,'https://youtu.be/79db51cc6a85',N'trying_to_rid_this_name','ngs_ranger','ngs_force','ngs_none', NULL),
  (23031,23003,1022,1,'https://youtu.be/8d20a8f2c3a0',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none', NULL),

  (23032,23004,5000000,0,'https://youtu.be/a2987c28b1a3',N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),
  (23033,23004,1010,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunter','ngs_none', NULL),
  (23034,23004,1008,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),
  (23035,23004,1009,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','ngs_none', NULL),
  (23036,23004,1030,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none', NULL),
  (23037,23004,1026,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','ngs_none', NULL),
  (23038,23004,1003,1,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_techter','ngs_none', NULL),
  (23039,23004,1013,1,'https://youtu.be/2d8153a9ae9c',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none', NULL),

  (23040,23005,1011,0,'https://youtu.be/f9c588f5c100',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),
  (23041,23005,1010,0,'https://youtu.be/055a18a9fabd',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (23042,23005,1026,0,'https://youtu.be/198ed4196f00',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (23043,23005,1001,0,'https://youtu.be/e7f6fad4724d',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (23044,23005,1002,1,'https://youtu.be/9960140b6696',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (23045,23005,5000000,1,'https://youtu.be/d1678d26978b',N'trying_to_rid_this_name','ngs_hunter','ngs_techter','ngs_none', NULL),
  (23046,23005,1024,1,'https://youtu.be/63387af14358',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),
  (23047,23005,1027,1,'https://youtu.be/e100cfbff238',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none', NULL),

  (23048,23006,1012,0,'https://youtu.be/b49f4111f7ec',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (23049,23006,1004,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (23050,23006,1028,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_ranger','ngs_none', NULL),
  (23051,23006,1015,0,'https://youtu.be/e466dd22c56a',N'trying_to_rid_this_name','ngs_hunter','ngs_fighter','ngs_none', NULL),
  (23052,23006,1027,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_bouncer','ngs_none', NULL),
  (23053,23006,1003,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (23054,23006,1007,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_ranger','ngs_none', NULL),
  (23055,23006,1011,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_force','ngs_none', NULL),

  (23056,23007,1013,0,'https://youtu.be/67c1bc0abfe4',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (23057,23007,1020,0,'https://youtu.be/99f24a7912fa',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none', NULL),
  (23058,23007,1023,0,'https://youtu.be/ae9489004398',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (23059,23007,1007,0,'https://youtu.be/24de99a58bee',N'trying_to_rid_this_name','ngs_techter','ngs_bouncer','ngs_none', NULL),
  (23060,23007,1025,1,'https://youtu.be/5ecc92446762',N'trying_to_rid_this_name','ngs_force','ngs_fighter','ngs_none', NULL),
  (23061,23007,1014,1,'https://youtu.be/dc061ed418b1',N'trying_to_rid_this_name','ngs_ranger','ngs_gunner','ngs_none', NULL),
  (23062,23007,1003,1,'https://youtu.be/99dd84541e58',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),
  (23063,23007,1009,1,'https://youtu.be/42d79b5a91ec',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),

  (23064,23008,1014,0,'https://youtu.be/8137cd6694de',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),
  (23065,23008,1005,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (23066,23008,1013,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_techter','ngs_none', NULL),
  (23067,23008,1017,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (23068,23008,1003,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_slayer','ngs_none', NULL),
  (23069,23008,1006,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_hunter','ngs_none', NULL),
  (23070,23008,1025,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_ranger','ngs_none', NULL),
  (23071,23008,1024,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none', NULL),

  (23072,23009,1013,0,'https://youtu.be/f85b196a99bf',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (23073,23009,1012,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),
  (23074,23009,5000000,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),
  (23075,23009,1006,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_force','ngs_none', NULL),
  (23076,23009,1015,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_ranger','ngs_none', NULL),
  (23077,23009,1007,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none', NULL),
  (23078,23009,1016,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_waker','ngs_none', NULL),
  (23079,23009,1011,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none', NULL),

  (23080,23010,1015,0,'https://youtu.be/3e83395e0490',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none', NULL),
  (23081,23010,1012,0,'https://youtu.be/e215120a8302',N'trying_to_rid_this_name','ngs_braver','ngs_hunter','ngs_none', NULL),
  (23082,23010,1007,0,'https://youtu.be/b72320356336',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (23083,23010,1006,0,'https://youtu.be/c8191b2aa090',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (23084,23010,1029,1,'https://youtu.be/93af73f6d9ae',N'trying_to_rid_this_name','ngs_hunter','ngs_force','ngs_none', NULL),
  (23085,23010,1023,1,'https://youtu.be/713ab00a94cc',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','ngs_none', NULL),
  (23086,23010,1027,1,'https://youtu.be/0204a2da39e7',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none', NULL),
  (23087,23010,1008,1,'https://youtu.be/81edf251a605',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),

  (23088,23011,1014,0,'https://youtu.be/6efc45e14daf',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (23089,23011,1011,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (23090,23011,1007,0,'https://youtu.be/4e60c2ec5e2f',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (23091,23011,1022,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none', NULL),
  (23092,23011,1029,1,'https://youtu.be/aac40e249690',N'trying_to_rid_this_name','ngs_gunner','ngs_waker','ngs_none', NULL),
  (23093,23011,1015,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none', NULL),
  (23094,23011,1030,1,'https://youtu.be/54950163b837',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none', NULL),
  (23095,23011,1021,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),

  (23096,23012,1017,0,'https://youtu.be/e71043c799d4',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),
  (23097,23012,1011,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger','ngs_none', NULL),
  (23098,23012,1028,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_waker','ngs_none', NULL),
  (23099,23012,1019,0,'https://youtu.be/a3f9a587ba20',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (23100,23012,1030,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none', NULL),
  (23101,23012,1018,1,'https://youtu.be/873939fdb8d9',N'trying_to_rid_this_name','ngs_techter','ngs_ranger','ngs_none', NULL),
  (23102,23012,1003,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (23103,23012,1001,1,'https://youtu.be/5361cabcc8c1',N'trying_to_rid_this_name','ngs_fighter','ngs_hunter','ngs_none', NULL),

  (23104,23013,1016,0,'https://youtu.be/7285a859fea6',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (23105,23013,1013,0,'https://youtu.be/23cc88b490c5',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),
  (23106,23013,1025,0,'https://youtu.be/73b26b653078',N'trying_to_rid_this_name','ngs_fighter','ngs_hunter','ngs_none', NULL),
  (23107,23013,1004,0,'https://youtu.be/59f2da2f4549',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (23108,23013,5000000,1,'https://youtu.be/d8d54a9ee010',N'trying_to_rid_this_name','ngs_waker','ngs_force','ngs_none', NULL),
  (23109,23013,1011,1,'https://youtu.be/71487d0b79df',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none', NULL),
  (23110,23013,1020,1,'https://youtu.be/0e02aabd39c8',N'trying_to_rid_this_name','ngs_force','ngs_ranger','ngs_none', NULL),
  (23111,23013,1009,1,'https://youtu.be/0a8bfce9b7dc',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),

  (23112,23014,1011,0,'https://youtu.be/bee80f24fe0e',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (23113,23014,1015,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (23114,23014,1018,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (23115,23014,1006,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (23116,23014,1022,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_fighter','ngs_none', NULL),
  (23117,23014,1029,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (23118,23014,1030,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_hunter','ngs_none', NULL),
  (23119,23014,1021,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),

  (23120,23015,1012,0,'https://youtu.be/2870c26d1103',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','ngs_none', NULL),
  (23121,23015,1001,0,'https://youtu.be/eded431982d4',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (23122,23015,1007,0,'https://youtu.be/873c7fd1b730',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none', NULL),
  (23123,23015,1010,0,'https://youtu.be/cf4d8d3a34fa',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none', NULL),
  (23124,23015,1008,1,'https://youtu.be/854739799951',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none', NULL),
  (23125,23015,1023,1,'https://youtu.be/aab506d08db6',N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none', NULL),
  (23126,23015,1022,1,'https://youtu.be/df471e45c0fb',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none', NULL),
  (23127,23015,1021,1,'https://youtu.be/77f090d9c412',N'trying_to_rid_this_name','ngs_waker','ngs_bouncer','ngs_none', NULL),

  (23128,23016,1012,0,'https://youtu.be/d192ebf67e3b',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none', NULL),
  (23129,23016,1023,0,'https://youtu.be/185cfe016727',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none', NULL),
  (23130,23016,1030,0,'https://youtu.be/5d938314fefd',N'trying_to_rid_this_name','ngs_hunter','ngs_slayer','ngs_none', NULL),
  (23131,23016,5000000,0,'https://youtu.be/4e7eec55d03f',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none', NULL),
  (23132,23016,1006,1,'https://youtu.be/c926b73e3955',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (23133,23016,1004,1,'https://youtu.be/97465682e0b0',N'trying_to_rid_this_name','ngs_slayer','ngs_force','ngs_none', NULL),
  (23134,23016,1018,1,'https://youtu.be/201d28df77c5',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none', NULL),
  (23135,23016,1008,1,'https://youtu.be/a6fe0315bcca',N'trying_to_rid_this_name','ngs_force','ngs_fighter','ngs_none', NULL),

  (23136,23017,5000000,0,'https://youtu.be/6e6945698d7a',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (23137,23017,1001,0,'https://youtu.be/6725d2d0ac91',N'trying_to_rid_this_name','ngs_bouncer','ngs_gunner','ngs_none', NULL),
  (23138,23017,1005,0,'https://youtu.be/7fb2aaaffd2b',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (23139,23017,1020,0,'https://youtu.be/32bb060929c7',N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','ngs_none', NULL),
  (23140,23017,1013,1,'https://youtu.be/24de8bd524f2',N'trying_to_rid_this_name','ngs_force','ngs_waker','ngs_none', NULL),
  (23141,23017,1028,1,'https://youtu.be/49ec10974703',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none', NULL),
  (23142,23017,1017,1,'https://youtu.be/287eba992f95',N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger','ngs_none', NULL),
  (23143,23017,1010,1,'https://youtu.be/39c4d48136fe',N'trying_to_rid_this_name','ngs_braver','ngs_force','ngs_none', NULL),

  (23144,23018,5000000,0,'https://youtu.be/8c5b1a7cab4e',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none', NULL),
  (23145,23018,1019,0,'https://youtu.be/7ad0200beca4',N'trying_to_rid_this_name','ngs_fighter','ngs_braver','ngs_none', NULL),
  (23146,23018,1012,0,'https://youtu.be/0f9bb3d11467',N'trying_to_rid_this_name','ngs_gunner','ngs_braver','ngs_none', NULL),
  (23147,23018,1022,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none', NULL),
  (23148,23018,1016,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none', NULL),
  (23149,23018,1002,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_techter','ngs_none', NULL),
  (23150,23018,1001,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_waker','ngs_none', NULL),
  (23151,23018,1017,1,'https://youtu.be/0deb8cd90620',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),

  (23152,23019,5000000,0,'https://youtu.be/202a78e85a9d',N'trying_to_rid_this_name','ngs_slayer','ngs_fighter','ngs_none', NULL),
  (23153,23019,1005,0,'https://youtu.be/783b6c8ec57a',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none', NULL),
  (23154,23019,1010,0,'https://youtu.be/ed9ea25c1aaa',N'trying_to_rid_this_name','ngs_force','ngs_waker','ngs_none', NULL),
  (23155,23019,1006,0,'https://youtu.be/08f4bba9792c',N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none', NULL),
  (23156,23019,1028,1,'https://youtu.be/a48dca8d95aa',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (23157,23019,1019,1,'https://youtu.be/9e5a25ec543f',N'trying_to_rid_this_name','ngs_waker','ngs_hunter','ngs_none', NULL),
  (23158,23019,1029,1,'https://youtu.be/1e1e2732f80f',N'trying_to_rid_this_name','ngs_hunter','ngs_braver','ngs_none', NULL),
  (23159,23019,1021,1,'https://youtu.be/33e59a22d5c6',N'trying_to_rid_this_name','ngs_hunter','ngs_techter','ngs_none', NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;
