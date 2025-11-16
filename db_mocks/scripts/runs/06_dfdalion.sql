-- Dalion Solo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (61000,1001,'ngs','dfdalion','quest','global','level80r',1,1,'0:17:24','Test notes','2023-09-16T02:13:24Z',1,'2023-09-16T04:49:27Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61001,1017,'ngs','dfdalion','quest','japan','level80r',1,1,'0:10:01','Test notes','2023-01-22T06:37:21Z',1,'2023-01-22T07:45:49Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61002,1011,'ngs','dfdalion','quest','global','60r',1,1,'0:12:49','Test notes','2023-06-17T02:31:16Z',1,'2023-06-17T04:31:41Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61003,1013,'ngs','dfdalion','quest','global','pre60r',1,1,'0:14:35','Test notes','2023-02-28T07:19:54Z',1,'2023-02-28T11:31:21Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61004,5000000,'ngs','dfdalion','quest','global','pot6r',1,1,'0:14:04','Test notes','2023-03-19T09:49:23Z',1,'2023-03-19T21:21:04Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61005,1011,'ngs','dfdalion','quest','japan','pre60r',1,1,'0:16:05','Test notes','2023-02-25T06:18:33Z',1,'2023-02-25T09:49:59Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61006,1012,'ngs','dfdalion','quest','global','level75r',1,1,'0:13:37','Test notes','2023-07-16T16:46:12Z',1,'2023-07-17T02:15:40Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61007,1013,'ngs','dfdalion','quest','global','lvl80grind',1,1,'0:13:16','Test notes','2023-04-17T11:19:35Z',1,'2023-04-17T16:15:31Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61008,1014,'ngs','dfdalion','quest','japan','60r',1,1,'0:17:31','Test notes','2023-04-10T00:05:01Z',1,'2023-04-10T11:53:40Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61009,1013,'ngs','dfdalion','quest','japan','60r',1,1,'0:16:14','Test notes','2023-01-14T11:56:00Z',1,'2023-01-14T16:36:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61010,1015,'ngs','dfdalion','quest','global','pre60r',1,1,'0:19:01','Test notes','2023-07-21T07:13:58Z',1,'2023-07-21T10:07:12Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61011,1014,'ngs','dfdalion','quest','japan','level75r',1,1,'0:15:02','Test notes','2023-09-30T13:05:45Z',1,'2023-09-30T15:01:39Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61012,1017,'ngs','dfdalion','quest','global','level75r',1,1,'0:12:58','Test notes','2023-08-20T05:17:44Z',1,'2023-08-20T07:05:39Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61013,1016,'ngs','dfdalion','quest','global','level80r',1,1,'0:14:18','Test notes','2023-03-28T16:43:09Z',1,'2023-03-29T03:57:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61014,1011,'ngs','dfdalion','quest','japan','60r',1,1,'0:18:18','Test notes','2023-07-13T09:16:42Z',1,'2023-07-13T12:51:03Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61015,1012,'ngs','dfdalion','quest','global','pre60r',1,1,'0:18:44','Test notes','2023-08-26T12:15:50Z',1,'2023-08-26T22:25:37Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61016,1012,'ngs','dfdalion','quest','global','level80r',1,1,'0:16:28','New Time succeeds old run','2023-03-28T04:14:49Z',1,'2023-03-28T11:42:55Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (61017,5000000,'ngs','dfdalion','quest','global','level80r',1,1,'0:13:52','Test not yet approved run','2023-05-10T02:14:07Z',0,NULL,NULL,NULL,NULL),
  (61018,5000000,'ngs','dfdalion','quest','japan','level80r',1,1,'0:18:19','Test not yet approved run 2','2023-03-03T02:59:29Z',0,NULL,NULL,NULL,NULL),
  (61019,5000000,'ngs','dfdalion','quest','global','level80r',1,1,'0:17:27','Test reject run','2023-05-27T17:18:04Z',9,'2023-05-28T00:48:22Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (61300,61000,1001,0,'https://youtu.be/9290f1f37dcd',N'trying_to_rid_this_name','ngs_force','ngs_braver','ngs_none','["ngs_sword","ngs_twin_daggers","ngs_talis"]'),
  (61301,61001,1017,0,'https://youtu.be/6a8e68308b7d',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none','["ngs_assault_rifle","ngs_harmonizer","ngs_talis"]'),
  (61302,61002,1011,0,'https://youtu.be/b79a886c6ac2',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none','["ngs_sword","ngs_gunblade","ngs_rod"]'),
  (61303,61003,1013,0,'https://youtu.be/74784743a9b7',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none','["ngs_wired_lance","ngs_assault_rifle"]'),
  (61304,61004,5000000,0,'https://youtu.be/d99d563d6ab1',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none','["ngs_twin_daggers","ngs_knuckles","ngs_twin_machine_guns"]'),
  (61305,61005,1011,0,'https://youtu.be/774ec119eb3a',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_sword","ngs_wired_lance","ngs_wand"]'),
  (61306,61006,1012,0,'https://youtu.be/c333aff6a000',N'trying_to_rid_this_name','ngs_waker','ngs_slayer','ngs_none','["ngs_rod","ngs_talis","ngs_harmonizer"]'),
  (61307,61007,1013,0,'https://youtu.be/a8af2b118ab0',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none','["ngs_katana","ngs_soaring_blades","ngs_bow"]'),
  (61308,61008,1014,0,'https://youtu.be/6de03a746b50',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none','["ngs_sword","ngs_assault_rifle","ngs_launcher"]'),
  (61309,61009,1013,0,'https://youtu.be/f04219c651e3',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none','["ngs_twin_daggers","ngs_assault_rifle","ngs_bow"]'),
  (61310,61010,1015,0,'https://youtu.be/8a1e228f4d97',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none','["ngs_wired_lance","ngs_katana","ngs_wand"]'),
  (61311,61011,1014,0,'https://youtu.be/6f1ede296d39',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none','["ngs_knuckles","ngs_katana","ngs_bow"]'),
  (61312,61012,1017,0,'https://youtu.be/1090bfd9c9f6',N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none','["ngs_twin_daggers","ngs_launcher","ngs_rod"]'),
  (61313,61013,1016,0,'https://youtu.be/04dd0f7208f6',N'trying_to_rid_this_name','ngs_braver','ngs_ranger','ngs_none','["ngs_partisan","ngs_knuckles","ngs_harmonizer"]'),
  (61314,61014,1011,0,'https://youtu.be/0ebb90604621',N'trying_to_rid_this_name','ngs_fighter','ngs_waker','ngs_none','["ngs_sword","ngs_bow"]'),
  (61315,61015,1012,0,'https://youtu.be/4ed87c4f6499',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_wired_lance","ngs_gunblade","ngs_bow"]'),
  (61316,61016,1012,0,'https://youtu.be/f3400d4b9785',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_sword","ngs_gunblade","ngs_assault_rifle"]'),
  (61317,61017,5000000,0,'https://youtu.be/c6ee8510939b',N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none','["ngs_bow","ngs_rod","ngs_jet_boots"]'),
  (61318,61018,5000000,0,'https://youtu.be/54b8ced12d5e',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none','["ngs_twin_daggers","ngs_katana","ngs_gunblade"]'),
  (61319,61019,5000000,0,'https://youtu.be/08186ad3c2e7',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none','["ngs_wired_lance","ngs_partisan","ngs_wand"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Dalion Duo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (62000,1001,'ngs','dfdalion','quest','global','level80r',1,2,'0:15:58','Test notes','2023-06-20T00:28:45Z',1,'2023-06-20T13:02:39Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62001,1017,'ngs','dfdalion','quest','japan','level80r',1,2,'0:12:23','Test notes','2023-09-18T03:43:52Z',1,'2023-09-18T09:57:28Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62002,1011,'ngs','dfdalion','quest','global','60r',1,2,'0:11:32','Test notes','2023-12-14T01:27:22Z',1,'2023-12-14T07:55:52Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62003,1013,'ngs','dfdalion','quest','global','pre60r',1,2,'0:11:08','Test notes','2023-10-11T05:12:53Z',1,'2023-10-11T17:51:59Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62004,5000000,'ngs','dfdalion','quest','global','pot6r',1,2,'0:16:59','Test notes','2023-04-11T04:31:56Z',1,'2023-04-11T15:43:12Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62005,1011,'ngs','dfdalion','quest','japan','pre60r',1,2,'0:15:53','Test notes','2023-06-06T02:40:36Z',1,'2023-06-06T04:59:33Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62006,1012,'ngs','dfdalion','quest','global','level75r',1,2,'0:10:30','Test notes','2023-03-29T11:19:44Z',1,'2023-03-29T22:05:15Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62007,1013,'ngs','dfdalion','quest','global','lvl80grind',1,2,'0:16:16','Test notes','2023-05-20T03:59:53Z',1,'2023-05-20T04:21:43Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62008,1014,'ngs','dfdalion','quest','japan','60r',1,2,'0:13:04','Test notes','2023-08-08T16:33:24Z',1,'2023-08-09T01:39:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62009,1013,'ngs','dfdalion','quest','japan','60r',1,2,'0:10:03','Test notes','2023-06-25T03:07:28Z',1,'2023-06-25T13:35:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62010,1015,'ngs','dfdalion','quest','global','pre60r',1,2,'0:16:21','Test notes','2023-08-19T05:38:38Z',1,'2023-08-19T17:14:17Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62011,1014,'ngs','dfdalion','quest','japan','level75r',1,2,'0:12:48','Test notes','2023-03-27T02:09:54Z',1,'2023-03-27T03:46:14Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62012,1017,'ngs','dfdalion','quest','global','level75r',1,2,'0:16:43','Test notes','2023-03-05T08:07:47Z',1,'2023-03-05T08:50:36Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62013,1016,'ngs','dfdalion','quest','global','level80r',1,2,'0:12:53','Test notes','2023-09-15T05:38:19Z',1,'2023-09-15T17:34:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62014,1011,'ngs','dfdalion','quest','japan','60r',1,2,'0:13:47','Test notes','2023-09-24T06:24:03Z',1,'2023-09-24T17:51:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62015,1012,'ngs','dfdalion','quest','global','pre60r',1,2,'0:13:32','Test notes','2023-03-24T05:07:21Z',1,'2023-03-24T10:40:03Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62016,1012,'ngs','dfdalion','quest','global','level80r',1,2,'0:12:44','New Time succeeds old run','2023-07-07T03:22:31Z',1,'2023-07-07T06:32:52Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (62017,5000000,'ngs','dfdalion','quest','global','level80r',1,2,'0:12:42','Test not yet approved run','2023-08-16T19:13:59Z',0,NULL,NULL,NULL,NULL),
  (62018,5000000,'ngs','dfdalion','quest','japan','level80r',1,2,'0:14:19','Test not yet approved run 2','2023-09-10T16:43:37Z',0,NULL,NULL,NULL,NULL),
  (62019,5000000,'ngs','dfdalion','quest','japan','level80r',1,2,'0:16:30','Test reject run','2023-03-10T09:22:57Z',9,'2023-03-10T19:37:44Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (62000,62000,1001,0,'https://youtu.be/b7ab7534ce95',N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none',NULL),
  (62001,62000,1006,0,'https://youtu.be/7124ef60c692',N'trying_to_rid_this_name','ngs_bouncer','ngs_waker','ngs_none',NULL),
  
  (62002,62001,1017,0,'https://youtu.be/5a3b6ae04354',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','ngs_none',NULL),
  (62003,62001,1030,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none',NULL),
  
  (62004,62002,1011,0,'https://youtu.be/209290f1f37d',N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none',NULL),
  (62005,62002,1023,0,'https://youtu.be/386a8e68308b',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none',NULL),
  
  (62006,62003,1013,0,'https://youtu.be/86b79a886c6a',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none',NULL),
  (62007,62003,1025,0,'https://youtu.be/0a74784743a9',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none',NULL),
  
  (62008,62004,5000000,0,'https://youtu.be/80d99d563d6a',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none',NULL),
  (62009,62004,1021,0,'https://youtu.be/5f774ec119eb',N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none',NULL),
  
  (62010,62005,1011,0,'https://youtu.be/dcc333aff6a0',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none',NULL),
  (62011,62005,5000000,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none',NULL),
  
  (62012,62006,1012,0,'https://youtu.be/db6de03a746b',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none',NULL),
  (62013,62006,1020,0,'https://youtu.be/67f04219c651',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none',NULL),
  
  (62014,62007,1013,0,'https://youtu.be/df8a1e228f4d',N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none',NULL),
  (62015,62007,1018,0,'https://youtu.be/876f1ede296d',N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','ngs_none',NULL),
  
  (62016,62008,1014,0,'https://youtu.be/2d1090bfd9c9',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none',NULL),
  (62017,62008,1010,0,'https://youtu.be/7d04dd0f7208',N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none',NULL),
  
  (62018,62009,1013,0,'https://youtu.be/1c0ebb906046',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none',NULL),
  (62019,62009,1017,0,'https://youtu.be/8b4ed87c4f64',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none',NULL),
  
  (62020,62010,1015,0,'https://youtu.be/def3400d4b97',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none',NULL),
  (62021,62010,1030,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none',NULL),
  
  (62022,62011,1014,0,'https://youtu.be/f354b8ced12d',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none',NULL),
  (62023,62011,1010,0,'https://youtu.be/4808186ad3c2',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none',NULL),
  
  (62024,62012,1017,0,'https://youtu.be/30ce51d32ed2',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none',NULL),
  (62025,62012,1011,0,'https://youtu.be/e5ceed15797b',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none',NULL),
  
  (62026,62013,1016,0,'https://youtu.be/32eda55fecc2',N'trying_to_rid_this_name','ngs_force','ngs_hunter','ngs_none',NULL),
  (62027,62013,1022,0,'https://youtu.be/85ce2ff5596c',N'trying_to_rid_this_name','ngs_slayer','ngs_slayer','ngs_none',NULL),
  
  (62028,62014,1011,0,'https://youtu.be/d72db799f864',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none',NULL),
  (62029,62014,1026,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none',NULL),
  
  (62030,62015,1012,0,'https://youtu.be/558a94b2fd77',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none',NULL),
  (62031,62015,1016,0,'https://youtu.be/b887cf837ba5',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none',NULL),
  
  (62032,62016,1012,0,'https://youtu.be/9c5f7e54241f',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none',NULL),
  (62033,62016,1016,0,'https://youtu.be/f1f6205bdb31',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none',NULL),
  
  (62034,62017,5000000,0,'https://youtu.be/fa32ef105756',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none',NULL),
  (62035,62017,1022,0,'https://youtu.be/f4f87b79d3f4',N'trying_to_rid_this_name','ngs_waker','ngs_techter','ngs_none',NULL),
  
  (62036,62018,5000000,0,'https://youtu.be/eb4a94f96a2d',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none',NULL),
  (62037,62018,1030,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_force','ngs_none',NULL),
  
  (62038,62019,5000000,0,'https://youtu.be/da0daf609887',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none',NULL),
  (62039,62019,1029,0,'https://youtu.be/c482d7cc35b8',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none',NULL)

;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Dalion Party
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (63000,1001,'ngs','dfdalion','quest','global','level80r',1,4,'0:16:32','Test notes','2023-10-01T14:09:28Z',1,'2023-10-01T18:35:44Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63001,1017,'ngs','dfdalion','quest','japan','level80r',1,4,'0:14:23','Test notes','2023-11-27T06:28:43Z',1,'2023-11-27T11:06:11Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63002,1011,'ngs','dfdalion','quest','global','60r',1,4,'0:16:56','Test notes','2023-10-05T10:22:44Z',1,'2023-10-05T23:03:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63003,1013,'ngs','dfdalion','quest','global','pre60r',1,4,'0:14:36','Test notes','2023-09-11T10:31:58Z',1,'2023-09-11T14:01:48Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63004,5000000,'ngs','dfdalion','quest','global','pot6r',1,4,'0:10:38','Test notes','2023-03-22T20:45:15Z',1,'2023-03-22T21:52:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63005,1011,'ngs','dfdalion','quest','japan','pre60r',1,4,'0:11:58','Test notes','2023-08-25T16:38:00Z',1,'2023-08-26T02:07:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63006,1012,'ngs','dfdalion','quest','global','level75r',1,4,'0:18:58','Test notes','2023-07-11T22:43:51Z',1,'2023-07-12T04:04:07Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63007,1013,'ngs','dfdalion','quest','global','lvl80grind',1,4,'0:12:02','Test notes','2023-08-18T02:28:59Z',1,'2023-08-18T13:18:22Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63008,1014,'ngs','dfdalion','quest','japan','60r',1,4,'0:16:17','Test notes','2023-04-16T02:06:41Z',1,'2023-04-16T14:19:57Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63009,1013,'ngs','dfdalion','quest','japan','60r',1,4,'0:17:58','Test notes','2023-12-27T08:53:09Z',1,'2023-12-27T14:17:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63010,1015,'ngs','dfdalion','quest','global','pre60r',1,4,'0:16:15','Test notes','2023-10-29T15:25:08Z',1,'2023-10-30T00:46:43Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63011,1014,'ngs','dfdalion','quest','japan','level75r',1,4,'0:12:58','Test notes','2023-05-01T15:06:13Z',1,'2023-05-02T00:07:28Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63012,1017,'ngs','dfdalion','quest','global','level75r',1,4,'0:14:16','Test notes','2023-01-27T21:01:37Z',1,'2023-01-27T22:06:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63013,1016,'ngs','dfdalion','quest','global','level80r',1,4,'0:16:42','Test notes','2023-05-31T10:37:01Z',1,'2023-05-31T16:39:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63014,1011,'ngs','dfdalion','quest','japan','60r',1,4,'0:15:09','Test notes','2023-06-27T07:53:54Z',1,'2023-06-27T15:56:03Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63015,1012,'ngs','dfdalion','quest','global','pre60r',1,4,'0:18:13','Test notes','2023-09-24T23:10:35Z',1,'2023-09-25T03:28:02Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63016,1012,'ngs','dfdalion','quest','global','level80r',1,4,'0:17:52','New Time succeeds old run','2023-05-27T16:24:07Z',1,'2023-05-28T00:41:36Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (63017,5000000,'ngs','dfdalion','quest','global','level80r',1,4,'0:19:16','Test not yet approved run','2023-03-13T18:45:39Z',0,NULL,NULL,NULL,NULL),
  (63018,5000000,'ngs','dfdalion','quest','japan','level80r',1,4,'0:13:00','Test not yet approved run 2','2023-12-18T15:58:54Z',0,NULL,NULL,NULL,NULL),
  (63019,5000000,'ngs','dfdalion','quest','global','level80r',1,4,'0:13:56','Test reject run','2023-06-19T13:42:11Z',9,'2023-06-19T13:42:11Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (63000,63000,1001,0,'https://youtu.be/e439eb96a491',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (63001,63000,1014,0,'https://youtu.be/16fce33459c0',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none', NULL),
  (63002,63000,1003,0,'https://youtu.be/114f6116b2ce',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (63003,63000,1012,0,'https://youtu.be/7ae049770f92',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none', NULL),
  
  (63008,63001,1017,0,'https://youtu.be/8683313eca8d',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none', NULL),
  (63009,63001,1013,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (63010,63001,1016,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (63011,63001,1018,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none', NULL),
  
  (63016,63002,1011,0,'https://youtu.be/6f44d63b740c',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','ngs_none', NULL),
  (63017,63002,1023,0,'https://youtu.be/a12f0fb2acb1',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (63018,63002,1021,0,'https://youtu.be/fa38bd0c356b',N'trying_to_rid_this_name','ngs_waker','ngs_ranger','ngs_none', NULL),
  (63019,63002,1019,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none', NULL),
  
  (63024,63003,1013,0,'https://youtu.be/ecefd2a36989',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (63025,63003,1009,0,'https://youtu.be/3e0f9beba959',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none', NULL),
  (63026,63003,1004,0,'https://youtu.be/e683e8016241',N'trying_to_rid_this_name','ngs_gunner','ngs_fighter','ngs_none', NULL),
  (63027,63003,1028,0,'https://youtu.be/2c43715dc10c',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),

  (63032,63004,5000000,0,'https://youtu.be/a2987c28b1a3',N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),
  (63033,63004,1010,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunter','ngs_none', NULL),
  (63034,63004,1008,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),
  (63035,63004,1009,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','ngs_none', NULL),
  
  (63040,63005,1011,0,'https://youtu.be/f9c588f5c100',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),
  (63041,63005,1010,0,'https://youtu.be/055a18a9fabd',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (63042,63005,1026,0,'https://youtu.be/198ed4196f00',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (63043,63005,1001,0,'https://youtu.be/e7f6fad4724d',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  
  (63048,63006,1012,0,'https://youtu.be/b49f4111f7ec',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (63049,63006,1004,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (63050,63006,1028,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_ranger','ngs_none', NULL),
  (63051,63006,1015,0,'https://youtu.be/e466dd22c56a',N'trying_to_rid_this_name','ngs_hunter','ngs_fighter','ngs_none', NULL),
  
  (63056,63007,1013,0,'https://youtu.be/67c1bc0abfe4',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (63057,63007,1020,0,'https://youtu.be/99f24a7912fa',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none', NULL),
  (63058,63007,1023,0,'https://youtu.be/ae9489004398',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (63059,63007,1007,0,'https://youtu.be/24de99a58bee',N'trying_to_rid_this_name','ngs_techter','ngs_bouncer','ngs_none', NULL),

  (63064,63008,1014,0,'https://youtu.be/8137cd6694de',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),
  (63065,63008,1005,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (63066,63008,1013,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_techter','ngs_none', NULL),
  (63067,63008,1017,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),

  (63072,63009,1013,0,'https://youtu.be/f85b196a99bf',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (63073,63009,1012,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),
  (63074,63009,5000000,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),
  (63075,63009,1006,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_force','ngs_none', NULL),

  (63080,63010,1015,0,'https://youtu.be/3e83395e0490',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none', NULL),
  (63081,63010,1012,0,'https://youtu.be/e215120a8302',N'trying_to_rid_this_name','ngs_braver','ngs_hunter','ngs_none', NULL),
  (63082,63010,1007,0,'https://youtu.be/b72320356336',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (63083,63010,1006,0,'https://youtu.be/c8191b2aa090',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),

  (63088,63011,1014,0,'https://youtu.be/6efc45e14daf',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (63089,63011,1011,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (63090,63011,1007,0,'https://youtu.be/4e60c2ec5e2f',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (63091,63011,1022,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none', NULL),

  (63096,63012,1017,0,'https://youtu.be/e71043c799d4',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),
  (63097,63012,1011,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger','ngs_none', NULL),
  (63098,63012,1028,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_waker','ngs_none', NULL),
  (63099,63012,1019,0,'https://youtu.be/a3f9a587ba20',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),

  (63104,63013,1016,0,'https://youtu.be/7285a859fea6',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (63105,63013,1013,0,'https://youtu.be/23cc88b490c5',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),
  (63106,63013,1025,0,'https://youtu.be/73b26b653078',N'trying_to_rid_this_name','ngs_fighter','ngs_hunter','ngs_none', NULL),
  (63107,63013,1004,0,'https://youtu.be/59f2da2f4549',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),

  (63112,63014,1011,0,'https://youtu.be/bee80f24fe0e',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (63113,63014,1015,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (63114,63014,1018,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (63115,63014,1006,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),

  (63120,63015,1012,0,'https://youtu.be/2870c26d1103',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','ngs_none', NULL),
  (63121,63015,1001,0,'https://youtu.be/eded431982d4',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (63122,63015,1007,0,'https://youtu.be/873c7fd1b730',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none', NULL),
  (63123,63015,1010,0,'https://youtu.be/cf4d8d3a34fa',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none', NULL),

  (63128,63016,1012,0,'https://youtu.be/d192ebf67e3b',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none', NULL),
  (63129,63016,1023,0,'https://youtu.be/185cfe016727',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none', NULL),
  (63130,63016,1030,0,'https://youtu.be/5d938314fefd',N'trying_to_rid_this_name','ngs_hunter','ngs_slayer','ngs_none', NULL),
  (63131,63016,5000000,0,'https://youtu.be/4e7eec55d03f',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none', NULL),

  (63136,63017,5000000,0,'https://youtu.be/6e6945698d7a',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (63137,63017,1001,0,'https://youtu.be/6725d2d0ac91',N'trying_to_rid_this_name','ngs_bouncer','ngs_gunner','ngs_none', NULL),
  (63138,63017,1005,0,'https://youtu.be/7fb2aaaffd2b',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (63139,63017,1020,0,'https://youtu.be/32bb060929c7',N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','ngs_none', NULL),

  (63144,63018,5000000,0,'https://youtu.be/8c5b1a7cab4e',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none', NULL),
  (63145,63018,1019,0,'https://youtu.be/7ad0200beca4',N'trying_to_rid_this_name','ngs_fighter','ngs_braver','ngs_none', NULL),
  (63146,63018,1012,0,'https://youtu.be/0f9bb3d11467',N'trying_to_rid_this_name','ngs_gunner','ngs_braver','ngs_none', NULL),
  (63147,63018,1022,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none', NULL),

  (63152,63019,5000000,0,'https://youtu.be/202a78e85a9d',N'trying_to_rid_this_name','ngs_slayer','ngs_fighter','ngs_none', NULL),
  (63153,63019,1005,0,'https://youtu.be/783b6c8ec57a',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none', NULL),
  (63154,63019,1010,0,'https://youtu.be/ed9ea25c1aaa',N'trying_to_rid_this_name','ngs_force','ngs_waker','ngs_none', NULL),
  (63155,63019,1006,0,'https://youtu.be/08f4bba9792c',N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none', NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Dalion Multi Party urgent quest
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (64000,1001,'ngs','dfdalion','urgent_quest','global','level80r',1,8,'0:16:32','Test notes','2023-10-01T14:09:28Z',1,'2023-10-01T18:35:44Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64001,1017,'ngs','dfdalion','urgent_quest','japan','level80r',1,8,'0:14:23','Test notes','2023-11-27T06:28:43Z',1,'2023-11-27T11:06:11Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64002,1011,'ngs','dfdalion','urgent_quest','global','60r',1,8,'0:16:56','Test notes','2023-10-05T10:22:44Z',1,'2023-10-05T23:03:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64003,1013,'ngs','dfdalion','urgent_quest','global','pre60r',1,8,'0:14:36','Test notes','2023-09-11T10:31:58Z',1,'2023-09-11T14:01:48Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64004,5000000,'ngs','dfdalion','urgent_quest','global','pot6r',1,8,'0:10:38','Test notes','2023-03-22T20:45:15Z',1,'2023-03-22T21:52:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64005,1011,'ngs','dfdalion','urgent_quest','japan','pre60r',1,8,'0:11:58','Test notes','2023-08-25T16:38:00Z',1,'2023-08-26T02:07:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64006,1012,'ngs','dfdalion','urgent_quest','global','level75r',1,8,'0:18:58','Test notes','2023-07-11T22:43:51Z',1,'2023-07-12T04:04:07Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64007,1013,'ngs','dfdalion','urgent_quest','global','lvl80grind',1,8,'0:12:02','Test notes','2023-08-18T02:28:59Z',1,'2023-08-18T13:18:22Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64008,1014,'ngs','dfdalion','urgent_quest','japan','60r',1,8,'0:16:17','Test notes','2023-04-16T02:06:41Z',1,'2023-04-16T14:19:57Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64009,1013,'ngs','dfdalion','urgent_quest','japan','60r',1,8,'0:17:58','Test notes','2023-12-27T08:53:09Z',1,'2023-12-27T14:17:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64010,1015,'ngs','dfdalion','urgent_quest','global','pre60r',1,8,'0:16:15','Test notes','2023-10-29T15:25:08Z',1,'2023-10-30T00:46:43Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64011,1014,'ngs','dfdalion','urgent_quest','japan','level75r',1,8,'0:12:58','Test notes','2023-05-01T15:06:13Z',1,'2023-05-02T00:07:28Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64012,1017,'ngs','dfdalion','urgent_quest','global','level75r',1,8,'0:14:16','Test notes','2023-01-27T21:01:37Z',1,'2023-01-27T22:06:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64013,1016,'ngs','dfdalion','urgent_quest','global','level80r',1,8,'0:16:42','Test notes','2023-05-31T10:37:01Z',1,'2023-05-31T16:39:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64014,1011,'ngs','dfdalion','urgent_quest','japan','60r',1,8,'0:15:09','Test notes','2023-06-27T07:53:54Z',1,'2023-06-27T15:56:03Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64015,1012,'ngs','dfdalion','urgent_quest','global','pre60r',1,8,'0:18:13','Test notes','2023-09-24T23:10:35Z',1,'2023-09-25T03:28:02Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64016,1012,'ngs','dfdalion','urgent_quest','global','level80r',1,8,'0:17:52','New Time succeeds old run','2023-05-27T16:24:07Z',1,'2023-05-28T00:41:36Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (64017,5000000,'ngs','dfdalion','urgent_quest','global','level80r',1,8,'0:19:16','Test not yet approved run','2023-03-13T18:45:39Z',0,NULL,NULL,NULL,NULL),
  (64018,5000000,'ngs','dfdalion','urgent_quest','japan','level80r',1,8,'0:13:00','Test not yet approved run 2','2023-12-18T15:58:54Z',0,NULL,NULL,NULL,NULL),
  (64019,5000000,'ngs','dfdalion','urgent_quest','global','level80r',1,8,'0:13:56','Test reject run','2023-06-19T13:42:11Z',9,'2023-06-19T13:42:11Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (64000,64000,1001,0,'https://youtu.be/e439eb96a491',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (64001,64000,1014,0,'https://youtu.be/16fce33459c0',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none', NULL),
  (64002,64000,1003,0,'https://youtu.be/114f6116b2ce',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (64003,64000,1012,0,'https://youtu.be/7ae049770f92',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none', NULL),
  (64004,64000,1002,1,'https://youtu.be/98380a8afffc',N'trying_to_rid_this_name','ngs_force','ngs_force','ngs_none', NULL),
  (64005,64000,5000000,1,'https://youtu.be/0fd7611818bf',N'trying_to_rid_this_name','ngs_braver','ngs_braver','ngs_none', NULL),
  (64006,64000,1005,1,'https://youtu.be/df23cd6a4264',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none', NULL),
  (64007,64000,1006,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','ngs_none', NULL),

  (64008,64001,1017,0,'https://youtu.be/8683313eca8d',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none', NULL),
  (64009,64001,1013,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (64010,64001,1016,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (64011,64001,1018,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none', NULL),
  (64012,64001,1009,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (64013,64001,1005,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none', NULL),
  (64014,64001,1012,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none', NULL),
  (64015,64001,1026,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_gunner','ngs_none', NULL),

  (64016,64002,1011,0,'https://youtu.be/6f44d63b740c',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','ngs_none', NULL),
  (64017,64002,1023,0,'https://youtu.be/a12f0fb2acb1',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (64018,64002,1021,0,'https://youtu.be/fa38bd0c356b',N'trying_to_rid_this_name','ngs_waker','ngs_ranger','ngs_none', NULL),
  (64019,64002,1019,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none', NULL),
  (64020,64002,1030,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none', NULL),
  (64021,64002,1007,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (64022,64002,1027,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_fighter','ngs_none', NULL),
  (64023,64002,1029,1,'https://youtu.be/b294dae206eb',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),

  (64024,64003,1013,0,'https://youtu.be/ecefd2a36989',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (64025,64003,1009,0,'https://youtu.be/3e0f9beba959',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none', NULL),
  (64026,64003,1004,0,'https://youtu.be/e683e8016241',N'trying_to_rid_this_name','ngs_gunner','ngs_fighter','ngs_none', NULL),
  (64027,64003,1028,0,'https://youtu.be/2c43715dc10c',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),
  (64028,64003,1006,1,'https://youtu.be/30b65fdcc9df',N'trying_to_rid_this_name','ngs_ranger','ngs_fighter','ngs_none', NULL),
  (64029,64003,1001,1,'https://youtu.be/9bae092a3246',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none', NULL),
  (64030,64003,1010,1,'https://youtu.be/79db51cc6a85',N'trying_to_rid_this_name','ngs_ranger','ngs_force','ngs_none', NULL),
  (64031,64003,1022,1,'https://youtu.be/8d20a8f2c3a0',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none', NULL),

  (64032,64004,5000000,0,'https://youtu.be/a2987c28b1a3',N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),
  (64033,64004,1010,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunter','ngs_none', NULL),
  (64034,64004,1008,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),
  (64035,64004,1009,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','ngs_none', NULL),
  (64036,64004,1030,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none', NULL),
  (64037,64004,1026,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','ngs_none', NULL),
  (64038,64004,1003,1,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_techter','ngs_none', NULL),
  (64039,64004,1013,1,'https://youtu.be/2d8153a9ae9c',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none', NULL),

  (64040,64005,1011,0,'https://youtu.be/f9c588f5c100',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),
  (64041,64005,1010,0,'https://youtu.be/055a18a9fabd',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (64042,64005,1026,0,'https://youtu.be/198ed4196f00',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (64043,64005,1001,0,'https://youtu.be/e7f6fad4724d',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (64044,64005,1002,1,'https://youtu.be/9960140b6696',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (64045,64005,5000000,1,'https://youtu.be/d1678d26978b',N'trying_to_rid_this_name','ngs_hunter','ngs_techter','ngs_none', NULL),
  (64046,64005,1024,1,'https://youtu.be/63387af14358',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),
  (64047,64005,1027,1,'https://youtu.be/e100cfbff238',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none', NULL),

  (64048,64006,1012,0,'https://youtu.be/b49f4111f7ec',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (64049,64006,1004,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (64050,64006,1028,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_ranger','ngs_none', NULL),
  (64051,64006,1015,0,'https://youtu.be/e466dd22c56a',N'trying_to_rid_this_name','ngs_hunter','ngs_fighter','ngs_none', NULL),
  (64052,64006,1027,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_bouncer','ngs_none', NULL),
  (64053,64006,1003,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (64054,64006,1007,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_ranger','ngs_none', NULL),
  (64055,64006,1011,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_force','ngs_none', NULL),

  (64056,64007,1013,0,'https://youtu.be/67c1bc0abfe4',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (64057,64007,1020,0,'https://youtu.be/99f24a7912fa',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none', NULL),
  (64058,64007,1023,0,'https://youtu.be/ae9489004398',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (64059,64007,1007,0,'https://youtu.be/24de99a58bee',N'trying_to_rid_this_name','ngs_techter','ngs_bouncer','ngs_none', NULL),
  (64060,64007,1025,1,'https://youtu.be/5ecc92446762',N'trying_to_rid_this_name','ngs_force','ngs_fighter','ngs_none', NULL),
  (64061,64007,1014,1,'https://youtu.be/dc061ed418b1',N'trying_to_rid_this_name','ngs_ranger','ngs_gunner','ngs_none', NULL),
  (64062,64007,1003,1,'https://youtu.be/99dd84541e58',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),
  (64063,64007,1009,1,'https://youtu.be/42d79b5a91ec',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),

  (64064,64008,1014,0,'https://youtu.be/8137cd6694de',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),
  (64065,64008,1005,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (64066,64008,1013,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_techter','ngs_none', NULL),
  (64067,64008,1017,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (64068,64008,1003,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_slayer','ngs_none', NULL),
  (64069,64008,1006,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_hunter','ngs_none', NULL),
  (64070,64008,1025,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_ranger','ngs_none', NULL),
  (64071,64008,1024,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none', NULL),

  (64072,64009,1013,0,'https://youtu.be/f85b196a99bf',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (64073,64009,1012,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),
  (64074,64009,5000000,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),
  (64075,64009,1006,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_force','ngs_none', NULL),
  (64076,64009,1015,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_ranger','ngs_none', NULL),
  (64077,64009,1007,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none', NULL),
  (64078,64009,1016,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_waker','ngs_none', NULL),
  (64079,64009,1011,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none', NULL),

  (64080,64010,1015,0,'https://youtu.be/3e83395e0490',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none', NULL),
  (64081,64010,1012,0,'https://youtu.be/e215120a8302',N'trying_to_rid_this_name','ngs_braver','ngs_hunter','ngs_none', NULL),
  (64082,64010,1007,0,'https://youtu.be/b72320356336',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (64083,64010,1006,0,'https://youtu.be/c8191b2aa090',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (64084,64010,1029,1,'https://youtu.be/93af73f6d9ae',N'trying_to_rid_this_name','ngs_hunter','ngs_force','ngs_none', NULL),
  (64085,64010,1023,1,'https://youtu.be/713ab00a94cc',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','ngs_none', NULL),
  (64086,64010,1027,1,'https://youtu.be/0204a2da39e7',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none', NULL),
  (64087,64010,1008,1,'https://youtu.be/81edf251a605',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),

  (64088,64011,1014,0,'https://youtu.be/6efc45e14daf',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (64089,64011,1011,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (64090,64011,1007,0,'https://youtu.be/4e60c2ec5e2f',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (64091,64011,1022,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none', NULL),
  (64092,64011,1029,1,'https://youtu.be/aac40e249690',N'trying_to_rid_this_name','ngs_gunner','ngs_waker','ngs_none', NULL),
  (64093,64011,1015,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none', NULL),
  (64094,64011,1030,1,'https://youtu.be/54950163b837',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none', NULL),
  (64095,64011,1021,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),

  (64096,64012,1017,0,'https://youtu.be/e71043c799d4',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),
  (64097,64012,1011,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger','ngs_none', NULL),
  (64098,64012,1028,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_waker','ngs_none', NULL),
  (64099,64012,1019,0,'https://youtu.be/a3f9a587ba20',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (64100,64012,1030,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none', NULL),
  (64101,64012,1018,1,'https://youtu.be/873939fdb8d9',N'trying_to_rid_this_name','ngs_techter','ngs_ranger','ngs_none', NULL),
  (64102,64012,1003,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (64103,64012,1001,1,'https://youtu.be/5361cabcc8c1',N'trying_to_rid_this_name','ngs_fighter','ngs_hunter','ngs_none', NULL),

  (64104,64013,1016,0,'https://youtu.be/7285a859fea6',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (64105,64013,1013,0,'https://youtu.be/23cc88b490c5',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),
  (64106,64013,1025,0,'https://youtu.be/73b26b653078',N'trying_to_rid_this_name','ngs_fighter','ngs_hunter','ngs_none', NULL),
  (64107,64013,1004,0,'https://youtu.be/59f2da2f4549',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (64108,64013,5000000,1,'https://youtu.be/d8d54a9ee010',N'trying_to_rid_this_name','ngs_waker','ngs_force','ngs_none', NULL),
  (64109,64013,1011,1,'https://youtu.be/71487d0b79df',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none', NULL),
  (64110,64013,1020,1,'https://youtu.be/0e02aabd39c8',N'trying_to_rid_this_name','ngs_force','ngs_ranger','ngs_none', NULL),
  (64111,64013,1009,1,'https://youtu.be/0a8bfce9b7dc',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),

  (64112,64014,1011,0,'https://youtu.be/bee80f24fe0e',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (64113,64014,1015,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (64114,64014,1018,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (64115,64014,1006,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (64116,64014,1022,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_fighter','ngs_none', NULL),
  (64117,64014,1029,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (64118,64014,1030,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_hunter','ngs_none', NULL),
  (64119,64014,1021,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),

  (64120,64015,1012,0,'https://youtu.be/2870c26d1103',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','ngs_none', NULL),
  (64121,64015,1001,0,'https://youtu.be/eded431982d4',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (64122,64015,1007,0,'https://youtu.be/873c7fd1b730',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none', NULL),
  (64123,64015,1010,0,'https://youtu.be/cf4d8d3a34fa',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none', NULL),
  (64124,64015,1008,1,'https://youtu.be/854739799951',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none', NULL),
  (64125,64015,1023,1,'https://youtu.be/aab506d08db6',N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none', NULL),
  (64126,64015,1022,1,'https://youtu.be/df471e45c0fb',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none', NULL),
  (64127,64015,1021,1,'https://youtu.be/77f090d9c412',N'trying_to_rid_this_name','ngs_waker','ngs_bouncer','ngs_none', NULL),

  (64128,64016,1012,0,'https://youtu.be/d192ebf67e3b',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none', NULL),
  (64129,64016,1023,0,'https://youtu.be/185cfe016727',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none', NULL),
  (64130,64016,1030,0,'https://youtu.be/5d938314fefd',N'trying_to_rid_this_name','ngs_hunter','ngs_slayer','ngs_none', NULL),
  (64131,64016,5000000,0,'https://youtu.be/4e7eec55d03f',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none', NULL),
  (64132,64016,1006,1,'https://youtu.be/c926b73e3955',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (64133,64016,1004,1,'https://youtu.be/97465682e0b0',N'trying_to_rid_this_name','ngs_slayer','ngs_force','ngs_none', NULL),
  (64134,64016,1018,1,'https://youtu.be/201d28df77c5',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none', NULL),
  (64135,64016,1008,1,'https://youtu.be/a6fe0315bcca',N'trying_to_rid_this_name','ngs_force','ngs_fighter','ngs_none', NULL),

  (64136,64017,5000000,0,'https://youtu.be/6e6945698d7a',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (64137,64017,1001,0,'https://youtu.be/6725d2d0ac91',N'trying_to_rid_this_name','ngs_bouncer','ngs_gunner','ngs_none', NULL),
  (64138,64017,1005,0,'https://youtu.be/7fb2aaaffd2b',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (64139,64017,1020,0,'https://youtu.be/32bb060929c7',N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','ngs_none', NULL),
  (64140,64017,1013,1,'https://youtu.be/24de8bd524f2',N'trying_to_rid_this_name','ngs_force','ngs_waker','ngs_none', NULL),
  (64141,64017,1028,1,'https://youtu.be/49ec10974703',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none', NULL),
  (64142,64017,1017,1,'https://youtu.be/287eba992f95',N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger','ngs_none', NULL),
  (64143,64017,1010,1,'https://youtu.be/39c4d48136fe',N'trying_to_rid_this_name','ngs_braver','ngs_force','ngs_none', NULL),

  (64144,64018,5000000,0,'https://youtu.be/8c5b1a7cab4e',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none', NULL),
  (64145,64018,1019,0,'https://youtu.be/7ad0200beca4',N'trying_to_rid_this_name','ngs_fighter','ngs_braver','ngs_none', NULL),
  (64146,64018,1012,0,'https://youtu.be/0f9bb3d11467',N'trying_to_rid_this_name','ngs_gunner','ngs_braver','ngs_none', NULL),
  (64147,64018,1022,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none', NULL),
  (64148,64018,1016,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none', NULL),
  (64149,64018,1002,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_techter','ngs_none', NULL),
  (64150,64018,1001,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_waker','ngs_none', NULL),
  (64151,64018,1017,1,'https://youtu.be/0deb8cd90620',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),

  (64152,64019,5000000,0,'https://youtu.be/202a78e85a9d',N'trying_to_rid_this_name','ngs_slayer','ngs_fighter','ngs_none', NULL),
  (64153,64019,1005,0,'https://youtu.be/783b6c8ec57a',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none', NULL),
  (64154,64019,1010,0,'https://youtu.be/ed9ea25c1aaa',N'trying_to_rid_this_name','ngs_force','ngs_waker','ngs_none', NULL),
  (64155,64019,1006,0,'https://youtu.be/08f4bba9792c',N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none', NULL),
  (64156,64019,1028,1,'https://youtu.be/a48dca8d95aa',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (64157,64019,1019,1,'https://youtu.be/9e5a25ec543f',N'trying_to_rid_this_name','ngs_waker','ngs_hunter','ngs_none', NULL),
  (64158,64019,1029,1,'https://youtu.be/1e1e2732f80f',N'trying_to_rid_this_name','ngs_hunter','ngs_braver','ngs_none', NULL),
  (64159,64019,1021,1,'https://youtu.be/33e59a22d5c6',N'trying_to_rid_this_name','ngs_hunter','ngs_techter','ngs_none', NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;