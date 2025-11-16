-- Purple Solo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (11000,1001,'ngs','purples','aelio','global','level80r',4,1,'0:12:55','Test notes','2023-05-16T00:46:06Z',1,'2023-05-16T02:46:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11001,1017,'ngs','purples','aelio','japan','level80r',4,1,'0:15:01','Test notes','2023-11-25T05:38:26Z',1,'2023-11-25T07:38:26Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11002,1011,'ngs','purples','aelio','global','60r',4,1,'0:17:47','Test notes','2023-05-29T11:54:52Z',1,'2023-05-29T13:54:52Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11003,1013,'ngs','purples','aelio','global','pre60r',4,1,'0:18:16','Test notes','2023-07-27T07:52:03Z',1,'2023-07-27T09:52:03Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11004,5000000,'ngs','purples','aelio','global','pot6r',4,1,'0:16:51','Test notes','2023-07-07T01:12:28Z',1,'2023-07-07T03:12:28Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11005,1011,'ngs','purples','aelio','japan','pre60r',4,1,'0:10:54','Test notes','2023-07-13T11:19:22Z',1,'2023-07-13T13:19:22Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11006,1012,'ngs','purples','aelio','global','level75r',3,1,'0:17:21','Test notes','2023-06-14T15:25:32Z',1,'2023-06-14T18:25:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11007,1013,'ngs','purples','aelio','global','lvl80grind',3,1,'0:15:53','Test notes','2023-12-02T11:58:04Z',1,'2023-12-03T11:58:04Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11008,1014,'ngs','purples','aelio','japan','60r',3,1,'0:14:15','Test notes','2023-07-31T08:42:36Z',1,'2023-07-31T10:42:36Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11009,1013,'ngs','purples','aelio','japan','60r',2,1,'0:13:41','Test notes','2023-03-27T01:20:57Z',1,'2023-03-28T01:20:57Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11010,1015,'ngs','purples','aelio','global','pre60r',2,1,'0:17:24','Test notes','2023-07-04T18:33:23Z',1,'2023-07-06T18:33:23Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11011,1014,'ngs','purples','aelio','japan','level75r',2,1,'0:18:37','Test notes','2023-11-19T07:56:40Z',1,'2023-11-20T07:56:40Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11012,1017,'ngs','purples','aelio','global','level75r',1,1,'0:17:21','Test notes','2023-07-23T00:55:46Z',1,'2023-08-23T00:55:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11013,1016,'ngs','purples','aelio','global','level80r',1,1,'0:13:39','Test notes','2023-02-05T22:27:06Z',1,'2023-02-05T23:27:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11014,1011,'ngs','purples','aelio','japan','60r',1,1,'0:19:36','Test notes','2023-10-10T23:10:22Z',1,'2023-10-11T01:10:22Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11015,1012,'ngs','purples','aelio','global','pre60r',4,1,'0:15:39','Test notes','2023-04-06T19:10:05Z',1,'2023-04-06T21:10:05Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11016,1012,'ngs','purples','aelio','global','level80r',4,1,'0:13:39','New Time succeeds old run','2023-12-25T11:53:20Z',1,'2023-03-25T13:55:20Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (11017,5000000,'ngs','purples','aelio','global','level80r',4,1,'0:14:55','Test not yet approved run','2023-12-05T23:25:44Z',0,NULL,NULL,NULL,NULL),
  (11018,5000000,'ngs','purples','aelio','japan','level80r',4,1,'0:13:14','Test not yet approved run 2','2023-03-05T22:16:12Z',0,NULL,NULL,NULL,NULL),
  (11019,5000000,'ngs','purples','aelio','global','level80r',4,1,'0:11:34','Test reject run','2023-12-09T00:49:35Z',9,'2023-12-09T03:49:35Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (11000,11000,1001,0,'https://youtu.be/3y8HOvXXfCYr',N'trying_to_rid_this_name','ngs_force','ngs_braver','ngs_none','["ngs_harmonizer","ngs_twin_daggers","ngs_wired_lance"]'),
  (11001,11001,1017,0,'https://youtu.be/wtQv8tNg8P3z',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none','["ngs_knuckles","ngs_bow","ngs_twin_daggers"]'),
  (11002,11002,1011,0,'https://youtu.be/15KftD3pwV6Q',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none','["ngs_twin_daggers","ngs_bow"]'),
  (11003,11003,1013,0,'https://youtu.be/CSncyvF4E0Rq',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none','["ngs_double_sabers","ngs_katana","ngs_assault_rifle"]'),
  (11004,11004,5000000,0,'https://youtu.be/a8tF5Z9y43kM',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none','["ngs_partisan","ngs_wired_lance","ngs_twin_daggers"]'),
  (11005,11005,1011,0,'https://youtu.be/y1Bg93YXcg2W',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_gunblade","ngs_rod","ngs_bow"]'),
  (11006,11006,1012,0,'https://youtu.be/5KkN3wv6nu5R',N'trying_to_rid_this_name','ngs_waker','ngs_slayer','ngs_none','["ngs_bow","ngs_wand"]'),
  (11007,11007,1013,0,'https://youtu.be/85EpdTM2Q4CB',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none','["ngs_twin_machine_guns","ngs_assault_rifle","ngs_talis"]'),
  (11008,11008,1014,0,'https://youtu.be/G8Z44r5rwdmy',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none','["ngs_gunblade","ngs_soaring_blades"]'),
  (11009,11009,1013,0,'https://youtu.be/q9sOjT6aj6fC',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none','["ngs_twin_daggers","ngs_bow"]'),
  (11010,11010,1015,0,'https://youtu.be/dFa9m1eS7rp3',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none','["ngs_double_sabers","ngs_rod","ngs_launcher"]'),
  (11011,11011,1014,0,'https://youtu.be/5qtqhg1U9uM1',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none','["ngs_rod","ngs_wand","ngs_soaring_blades"]'),
  (11012,11012,1017,0,'https://youtu.be/rUB9xWRRLe52',N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none','["ngs_katana","ngs_soaring_blades","ngs_katana"]'),
  (11013,11013,1016,0,'https://youtu.be/1A5L6C6x0nH7',N'trying_to_rid_this_name','ngs_braver','ngs_ranger','ngs_none','["ngs_sword","ngs_katana","ngs_sword"]'),
  (11014,11014,1011,0,'https://youtu.be/r6Up2wbU3p0N',N'trying_to_rid_this_name','ngs_fighter','ngs_waker','ngs_none','["ngs_sword","ngs_twin_daggers","ngs_bow"]'),
  (11015,11015,1012,0,'https://youtu.be/bU5C66Rai64j',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_jet_boots","ngs_jet_boots","ngs_wired_lance"]'),
  (11016,11016,1012,0,'https://youtu.be/1a7682528888',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_double_sabers","ngs_gunblade","ngs_katana"]'),
  (11017,11017,5000000,0,'https://youtu.be/9f175e2f5fe6',N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none','["ngs_twin_machine_guns","ngs_wired_lance","ngs_twin_machine_guns"]'),
  (11018,11018,5000000,0,'https://youtu.be/84f41a5690b0',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none','["ngs_soaring_blades","ngs_assault_rifle","ngs_sword"]'),
  (11019,11019,5000000,0,'https://youtu.be/b2d852b5e0c2',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none','["ngs_launcher","ngs_gunblade","ngs_soaring_blades"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Purple Duo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (12000,1001,'ngs','purples','aelio','global','level80r',4,2,'0:12:55','Test notes','2023-11-16T08:33:32Z',1,'2023-11-16T11:33:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12001,1017,'ngs','purples','aelio','japan','level80r',4,2,'0:15:01','Test notes','2023-03-13T22:36:48Z',1,'2023-03-13T23:36:48Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12002,1011,'ngs','purples','aelio','global','60r',4,2,'0:17:47','Test notes','2023-12-10T23:38:06Z',1,'2023-12-10T23:39:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12003,1013,'ngs','purples','aelio','global','pre60r',4,2,'0:18:16','Test notes','2023-02-04T00:42:02Z',1,'2023-02-04T01:42:02Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12004,5000000,'ngs','purples','aelio','global','pot6r',4,2,'0:16:51','Test notes','2023-07-12T14:52:12Z',1,'2023-07-15T14:52:12Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12005,1011,'ngs','purples','aelio','japan','pre60r',4,2,'0:10:54','Test notes','2023-09-23T17:51:04Z',1,'2023-09-24T17:51:04Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12006,1012,'ngs','purples','aelio','global','level75r',3,2,'0:17:21','Test notes','2023-04-25T07:13:46Z',1,'2023-04-25T09:13:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12007,1013,'ngs','purples','aelio','global','lvl80grind',3,2,'0:15:53','Test notes','2023-11-01T01:29:56Z',1,'2023-11-01T02:29:56Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12008,1014,'ngs','purples','aelio','japan','60r',3,2,'0:14:15','Test notes','2023-01-15T11:20:44Z',1,'2023-01-15T17:20:44Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12009,1013,'ngs','purples','aelio','japan','60r',2,2,'0:13:41','Test notes','2023-11-14T10:20:37Z',1,'2023-11-14T18:20:37Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12010,1015,'ngs','purples','aelio','global','pre60r',2,2,'0:17:24','Test notes','2023-12-16T10:23:30Z',1,'2023-12-16T14:23:30Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12011,1014,'ngs','purples','aelio','japan','level75r',2,2,'0:18:37','Test notes','2023-08-14T07:55:30Z',1,'2023-08-14T08:00:30Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12012,1017,'ngs','purples','aelio','global','level75r',1,2,'0:17:21','Test notes','2023-06-30T06:09:22Z',1,'2023-07-30T06:09:22Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12013,1016,'ngs','purples','aelio','global','level80r',1,2,'0:13:39','Test notes','2023-08-30T23:24:25Z',1,'2023-08-30T23:55:25Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12014,1011,'ngs','purples','aelio','japan','60r',1,2,'0:19:36','Test notes','2023-08-10T00:47:56Z',1,'2023-08-10T02:47:56Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12015,1012,'ngs','purples','aelio','global','pre60r',4,2,'0:15:39','Test notes','2023-03-05T23:36:32Z',1,'2023-03-05T23:45:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12016,1012,'ngs','purples','aelio','global','level80r',4,2,'0:13:39','New Time succeeds old run','2023-07-25T01:23:16Z',1,'2023-07-25T03:23:16Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (12017,5000000,'ngs','purples','aelio','global','level80r',4,2,'0:14:39','Test not yet approved run','2023-01-20T10:07:30Z',0,NULL,NULL,NULL,NULL),
  (12018,5000000,'ngs','purples','aelio','japan','level80r',4,2,'0:12:11','Test not yet approved run 2','2023-11-15T01:38:28Z',0,NULL,NULL,NULL,NULL),
  (12019,5000000,'ngs','purples','aelio','japan','level80r',4,2,'0:11:59','Test reject run','2023-08-01T06:12:37Z',9,'2023-08-01T09:12:37Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (12000,12000,1001,0,'https://youtu.be/372c5885733c',N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none',NULL),
  (12001,12000,1006,0,'https://youtu.be/1bdc00535a8c',N'trying_to_rid_this_name','ngs_bouncer','ngs_waker','ngs_none',NULL),
  
  (12002,12001,1017,0,'https://youtu.be/fe8b747e00ac',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','ngs_none',NULL),
  (12003,12001,1030,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none',NULL),
  
  (12004,12002,1011,0,'https://youtu.be/54f7aa14a842',N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none',NULL),
  (12005,12002,1023,0,'https://youtu.be/d400da40e005',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none',NULL),
  
  (12006,12003,1013,0,'https://youtu.be/a2a92d5b9e31',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none',NULL),
  (12007,12003,1025,0,'https://youtu.be/42e4f78b4d29',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none',NULL),
  
  (12008,12004,5000000,0,'https://youtu.be/8a90ccef3246',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none',NULL),
  (12009,12004,1021,0,'https://youtu.be/6dc86114fc75',N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none',NULL),
  
  (12010,12005,1011,0,'https://youtu.be/d0014f1e7a7f',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none',NULL),
  (12011,12005,5000000,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none',NULL),
  
  (12012,12006,1012,0,'https://youtu.be/5a6c3eafa094',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none',NULL),
  (12013,12006,1020,0,'https://youtu.be/6551424d9d9b',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none',NULL),
  
  (12014,12007,1013,0,'https://youtu.be/303f4167c96b',N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none',NULL),
  (12015,12007,1018,0,'https://youtu.be/e422a5202940',N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','ngs_none',NULL),
  
  (12016,12008,1014,0,'https://youtu.be/13e1f5014631',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none',NULL),
  (12017,12008,1010,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none',NULL),
  
  (12018,12009,1013,0,'https://youtu.be/46d3435fa0ea',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none',NULL),
  (12019,12009,1017,0,'https://youtu.be/871ce7c59443',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none',NULL),
  
  (12020,12010,1015,0,'https://youtu.be/d317d6462872',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none',NULL),
  (12021,12010,1030,0,'https://youtu.be/abe1fc068aed',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none',NULL),
  
  (12022,12011,1014,0,'https://youtu.be/0aaee353deff',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none',NULL),
  (12023,12011,1010,0,'https://youtu.be/2b6fcaa64d05',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none',NULL),
  
  (12024,12012,1017,0,'https://youtu.be/1d2bda5b2178',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none',NULL),
  (12025,12012,1011,0,'https://youtu.be/2f5eef3d6a3b',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none',NULL),
  
  (12026,12013,1016,0,'https://youtu.be/b3259cb1883b',N'trying_to_rid_this_name','ngs_force','ngs_hunter','ngs_none',NULL),
  (12027,12013,1022,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_slayer','ngs_none',NULL),
  
  (12028,12014,1011,0,'https://youtu.be/528a576c21cc',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none',NULL),
  (12029,12014,1026,0,'https://youtu.be/8298d1283321',N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none',NULL),
  
  (12030,12015,1012,0,'https://youtu.be/b325d39a45c7',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none',NULL),
  (12031,12015,1016,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none',NULL),
  
  (12032,12016,1012,0,'https://youtu.be/e399f9333edd',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none',NULL),
  (12033,12016,1016,0,'https://youtu.be/d558c561fc4c',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none',NULL),
  
  (12034,12017,5000000,0,'https://youtu.be/c4b211011de8',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none',NULL),
  (12035,12017,1022,0,'https://youtu.be/11b29c30bd71',N'trying_to_rid_this_name','ngs_waker','ngs_techter','ngs_none',NULL),
  
  (12036,12018,5000000,0,'https://youtu.be/4586ec681a7a',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none',NULL),
  (12037,12018,1030,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_force','ngs_none',NULL),
  
  (12038,12019,5000000,0,'https://youtu.be/e7f6986ffba6',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none',NULL),
  (12039,12019,1029,0,'https://youtu.be/320d20ca73bb',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none',NULL)

;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Purple Party
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (13000,1001,'ngs','purples','aelio','global','level80r',4,4,'0:12:55','Test notes','2023-04-11T04:31:56Z',1,'2023-04-11T19:31:56Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13001,1017,'ngs','purples','aelio','japan','level80r',4,4,'0:15:01','Test notes','2023-06-06T02:40:36Z',1,'2023-06-06T06:40:36Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13002,1011,'ngs','purples','aelio','global','60r',4,4,'0:17:47','Test notes','2023-03-29T11:19:44Z',1,'2023-03-29T13:19:44Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13003,1013,'ngs','purples','aelio','global','pre60r',4,4,'0:18:16','Test notes','2023-05-20T03:59:53Z',1,'2023-05-20T06:59:53Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13004,5000000,'ngs','purples','aelio','global','pot6r',4,4,'0:16:51','Test notes','2023-08-08T16:33:24Z',1,'2023-08-09T19:33:24Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13005,1011,'ngs','purples','aelio','japan','pre60r',4,4,'0:10:54','Test notes','2023-06-25T03:07:28Z',1,'2023-06-25T03:12:28Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13006,1012,'ngs','purples','aelio','global','level75r',3,4,'0:17:21','Test notes','2023-08-19T05:38:38Z',1,'2023-08-19T05:39:38Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13007,1013,'ngs','purples','aelio','global','lvl80grind',3,4,'0:15:53','Test notes','2023-03-27T02:09:54Z',1,'2023-03-27T03:09:54Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13008,1014,'ngs','purples','aelio','japan','60r',3,4,'0:14:15','Test notes','2023-03-05T08:07:47Z',1,'2023-04-05T09:07:47Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13009,1013,'ngs','purples','aelio','japan','60r',2,4,'0:13:41','Test notes','2023-09-15T05:38:19Z',1,'2023-09-15T08:38:19Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13010,1015,'ngs','purples','aelio','global','pre60r',2,4,'0:17:24','Test notes','2023-09-24T06:24:03Z',1,'2023-09-24T08:24:03Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13011,1014,'ngs','purples','aelio','japan','level75r',2,4,'0:18:37','Test notes','2023-03-24T05:07:21Z',1,'2023-03-24T06:07:21Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13012,1017,'ngs','purples','aelio','global','level75r',1,4,'0:17:21','Test notes','2023-07-07T03:22:31Z',1,'2023-07-07T04:22:31Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13013,1016,'ngs','purples','aelio','global','level80r',1,4,'0:13:39','Test notes','2023-10-01T14:09:28Z',1,'2023-10-01T16:09:28Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13014,1011,'ngs','purples','aelio','global','60r',1,4,'0:19:36','Test notes','2023-11-27T06:28:43Z',1,'2023-11-27T06:29:43Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13015,1012,'ngs','purples','aelio','global','pre60r',4,4,'0:15:39','Test notes','2023-04-05T10:22:44Z',1,'2023-04-05T12:22:44Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13016,1012,'ngs','purples','aelio','global','level80r',4,4,'0:13:39','New Time succeeds old run','2023-09-11T10:31:58Z',1,'2023-09-11T12:31:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (13017,5000000,'ngs','purples','aelio','global','level80r',4,4,'0:13:11','Test not yet approved run','2023-07-23T12:36:59Z',0,NULL,NULL,NULL,NULL),
  (13018,5000000,'ngs','purples','aelio','japan','level80r',4,4,'0:14:12','Test not yet approved run 2','2023-03-18T00:01:42Z',0,NULL,NULL,NULL,NULL),
  (13019,5000000,'ngs','purples','aelio','global','level80r',4,4,'0:12:33','Test reject run','2023-05-15T06:55:21Z',9,'2023-05-15T08:55:21Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (13000,13000,1001,0,'https://youtu.be/3316cef55dea8',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none',NULL),
  (13001,13000,1019,0,'https://youtu.be/edbf767cf4f87',N'trying_to_rid_this_name','ngs_fighter','ngs_waker','ngs_none',NULL),
  (13002,13000,1030,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none',NULL),
  (13003,13000,1017,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none',NULL),
  
  (13004,13001,1017,0,'https://youtu.be/d687885ee0ea3',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none',NULL),
  (13005,13001,1027,0,'https://youtu.be/164db9565c1f4',N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none',NULL),
  (13006,13001,1023,0,'https://youtu.be/71f45db642cd0',N'trying_to_rid_this_name','ngs_fighter','ngs_gunner','ngs_none',NULL),
  (13007,13001,1028,0,'https://youtu.be/cf479c6d4e10a',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none',NULL),
  
  (13008,13002,1011,0,'https://youtu.be/c7b6677b618ea',N'trying_to_rid_this_name','ngs_force','ngs_waker','ngs_none',NULL),
  (13009,13002,1018,0,'https://youtu.be/712c9ad0e45d2',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none',NULL),
  (13010,13002,1008,0,'https://youtu.be/410a91f95587d',N'trying_to_rid_this_name','ngs_fighter','ngs_braver','ngs_none',NULL),
  (13011,13002,1005,0,'https://youtu.be/6b7769b77ab01',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none',NULL),
  
  (13012,13003,1013,0,'https://youtu.be/ae7c6d63ce37d',N'trying_to_rid_this_name','ngs_ranger','ngs_hunter','ngs_none',NULL),
  (13013,13003,1003,0,'https://youtu.be/4b9326702c592',N'trying_to_rid_this_name','ngs_ranger','ngs_force','ngs_none',NULL),
  (13014,13003,1012,0,'https://youtu.be/ec07aa5bd7576',N'trying_to_rid_this_name','ngs_ranger','ngs_fighter','ngs_none',NULL),
  (13015,13003,1021,0,'https://youtu.be/674afc82d7643',N'trying_to_rid_this_name','ngs_bouncer','ngs_gunner','ngs_none',NULL),
  
  (13016,13004,5000000,0,'https://youtu.be/b51c1541e9560',N'trying_to_rid_this_name','ngs_ranger','ngs_fighter','ngs_none',NULL),
  (13017,13004,1013,0,'https://youtu.be/005e608b6a347',N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none',NULL),
  (13018,13004,1025,0,'https://youtu.be/81729cabe85f4',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none',NULL),
  (13019,13004,1001,0,'https://youtu.be/001903112c62d',N'trying_to_rid_this_name','ngs_waker','ngs_techter','ngs_none',NULL),
  
  (13020,13005,1011,0,'https://youtu.be/682528888aa1b',N'trying_to_rid_this_name','ngs_force','ngs_braver','ngs_none',NULL),
  (13021,13005,1014,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_fighter','ngs_none',NULL),
  (13022,13005,1006,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none',NULL),
  (13023,13005,1026,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_fighter','ngs_none',NULL),
  
  (13024,13006,1012,0,'https://youtu.be/a0967d181a830',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none',NULL),
  (13025,13006,1019,0,'https://youtu.be/b9f09f990d41c',N'trying_to_rid_this_name','ngs_fighter','ngs_gunner','ngs_none',NULL),
  (13026,13006,1030,0,'https://youtu.be/233e2c4191888',N'trying_to_rid_this_name','ngs_fighter','ngs_braver','ngs_none',NULL),
  (13027,13006,1017,0,'https://youtu.be/430cc2734ecf6',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none',NULL),
  
  (13028,13007,1013,0,'https://youtu.be/b75e421008f51',N'trying_to_rid_this_name','ngs_force','ngs_fighter','ngs_none',NULL),
  (13029,13007,1029,0,'https://youtu.be/3d839aea9e238',N'trying_to_rid_this_name','ngs_hunter','ngs_braver','ngs_none',NULL),
  (13030,13007,1027,0,'https://youtu.be/1c889b370ef3d',N'trying_to_rid_this_name','ngs_force','ngs_braver','ngs_none',NULL),
  (13031,13007,1023,0,'https://youtu.be/e79a195bbf050',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none',NULL),
  
  (13032,13008,1014,0,'https://youtu.be/e97fa5739cb27',N'trying_to_rid_this_name','ngs_force','ngs_fighter','ngs_none',NULL),
  (13033,13008,1021,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none',NULL),
  (13034,13008,1012,0,'https://youtu.be/c4cf69adbfd5d',N'trying_to_rid_this_name','ngs_waker','ngs_waker','ngs_none',NULL),
  (13035,13008,1026,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none',NULL),
  
  (13036,13009,1013,0,'https://youtu.be/3f2774ce03eff',N'trying_to_rid_this_name','ngs_techter','ngs_waker','ngs_none',NULL),
  (13037,13009,1011,0,'https://youtu.be/568e40b772151',N'trying_to_rid_this_name','ngs_force','ngs_braver','ngs_none',NULL),
  (13038,13009,1029,0,'https://youtu.be/9fac918b9b75f',N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none',NULL),
  (13039,13009,1013,0,'https://youtu.be/dae39c4365e39',N'trying_to_rid_this_name','ngs_bouncer','ngs_waker','ngs_none',NULL),
  
  (13040,13010,1015,0,'https://youtu.be/933be92cf7fdf',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none',NULL),
  (13041,13010,1010,0,'https://youtu.be/9e37237ef4eaa',N'trying_to_rid_this_name','ngs_ranger','ngs_gunner','ngs_none',NULL),
  (13042,13010,1015,0,'https://youtu.be/c856b9d461769',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none',NULL),
  (13043,13010,1003,0,'https://youtu.be/a330c9d102c39',N'trying_to_rid_this_name','ngs_force','ngs_ranger','ngs_none',NULL),
  
  (13044,13011,1014,0,'https://youtu.be/19cae2274ce1a',N'trying_to_rid_this_name','ngs_techter','ngs_ranger','ngs_none',NULL),
  (13045,13011,1017,0,'https://youtu.be/2baade5d8e57a',N'trying_to_rid_this_name','ngs_hunter','ngs_force','ngs_none',NULL),
  (13046,13011,5000000,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none',NULL),
  (13047,13011,1028,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none',NULL),
  
  (13048,13012,1017,0,'https://youtu.be/2e94dc569265d',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none',NULL),
  (13049,13012,1018,0,'https://youtu.be/481a73b2fdb55',N'trying_to_rid_this_name','ngs_force','ngs_braver','ngs_none',NULL),
  (13050,13012,1015,0,'https://youtu.be/b75aa8bd4f864',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none',NULL),
  (13051,13012,1021,0,'https://youtu.be/4e1402e2e470a',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none',NULL),
  
  (13052,13013,1016,0,'https://youtu.be/0a2800891bdc1',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none',NULL),
  (13053,13013,1005,0,'https://youtu.be/8268d03b81590',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none',NULL),
  (13054,13013,1001,0,'https://youtu.be/2e5b21fd4ed14',N'trying_to_rid_this_name','ngs_braver','ngs_force','ngs_none',NULL),
  (13055,13013,1014,0,'https://youtu.be/da7924100b219',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none',NULL),
  
  (13056,13014,1011,0,'https://youtu.be/bfe38bedbca93',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none',NULL),
  (13057,13014,1016,0,'https://youtu.be/0d39da0cda53e',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none',NULL),
  (13058,13014,1010,0,'https://youtu.be/58425114bf70b',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none',NULL),
  (13059,13014,1030,0,'https://youtu.be/f5b2b5e497bab',N'trying_to_rid_this_name','ngs_force','ngs_ranger','ngs_none',NULL),
  
  (13060,13015,1012,0,'https://youtu.be/3c23545a02a09',N'trying_to_rid_this_name','ngs_force','ngs_fighter','ngs_none',NULL),
  (13061,13015,1027,0,'https://youtu.be/05e952f5aeab2',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none',NULL),
  (13062,13015,1017,0,'https://youtu.be/a4691be2cf59c',N'trying_to_rid_this_name','ngs_fighter','ngs_gunner','ngs_none',NULL),
  (13063,13015,1004,0,'https://youtu.be/e57dd0a8c7225',N'trying_to_rid_this_name','ngs_waker','ngs_force','ngs_none',NULL),
  
  (13064,13016,1012,0,'https://youtu.be/3c23545a02a09',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none',NULL),
  (13065,13016,1027,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none',NULL),
  (13066,13016,1017,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_hunter','ngs_none',NULL),
  (13067,13016,1004,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_slayer','ngs_none',NULL),
  
  (13068,13017,5000000,0,'https://youtu.be/9571ccb6337ee',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none',NULL),
  (13069,13017,1018,0,'https://youtu.be/9a6fc62d42434',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none',NULL),
  (13070,13017,1012,0,'https://youtu.be/e81a6b024abfc',N'trying_to_rid_this_name','ngs_ranger','ngs_hunter','ngs_none',NULL),
  (13071,13017,1007,0,'https://youtu.be/c3d9460704c2b',N'trying_to_rid_this_name','ngs_ranger','ngs_slayer','ngs_none',NULL),
  
  (13072,13018,5000000,0,'https://youtu.be/50708933cc302',N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none',NULL),
  (13073,13018,1029,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_waker','ngs_none',NULL),
  (13074,13018,1017,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunter','ngs_none',NULL),
  (13075,13018,1001,0,'https://youtu.be/0f860f501aa6e',N'trying_to_rid_this_name','ngs_ranger','ngs_force','ngs_none',NULL),
  
  (13076,13019,5000000,0,'https://youtu.be/31f0a74d29eda',N'trying_to_rid_this_name','ngs_fighter','ngs_waker','ngs_none',NULL),
  (13077,13019,1018,0,'https://youtu.be/6f1489fc5c00f',N'trying_to_rid_this_name','ngs_ranger','ngs_hunter','ngs_none',NULL),
  (13078,13019,1027,0,'https://youtu.be/4b6371b34c54f',N'trying_to_rid_this_name','ngs_braver','ngs_force','ngs_none',NULL),
  (13079,13019,1030,0,'https://youtu.be/736946756028c',N'trying_to_rid_this_name','ngs_fighter','ngs_waker','ngs_none',NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Aelio Intruder multi Party
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (14000,1001,'ngs','purples','aelio_intruders','global','level80r',2,8,'0:16:32','Test notes','2023-10-01T14:09:28Z',1,'2023-10-01T18:35:44Z','Test Mod Notes','{"support":"glen"}','Tall Mommy Cool'),
  (14001,1017,'ngs','purples','aelio_intruders','japan','level80r',2,8,'0:14:23','Test notes','2023-11-27T06:28:43Z',1,'2023-11-27T11:06:11Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (14002,1011,'ngs','purples','aelio_intruders','global','60r',2,8,'0:16:56','Test notes','2023-10-05T10:22:44Z',1,'2023-10-05T23:03:58Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (14003,1013,'ngs','purples','aelio_intruders','global','pre60r',2,8,'0:14:36','Test notes','2023-09-11T10:31:58Z',1,'2023-09-11T14:01:48Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (14004,5000000,'ngs','purples','aelio_intruders','global','pot6r',2,8,'0:10:38','Test notes','2023-03-22T20:45:15Z',1,'2023-03-22T21:52:06Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (14005,1011,'ngs','purples','aelio_intruders','japan','pre60r',2,8,'0:11:58','Test notes','2023-08-25T16:38:00Z',1,'2023-08-26T02:07:46Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (14006,1012,'ngs','purples','aelio_intruders','global','level75r',2,8,'0:18:58','Test notes','2023-07-11T22:43:51Z',1,'2023-07-12T04:04:07Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (14007,1013,'ngs','purples','aelio_intruders','global','lvl80grind',2,8,'0:12:02','Test notes','2023-08-18T02:28:59Z',1,'2023-08-18T13:18:22Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (14008,1014,'ngs','purples','aelio_intruders','japan','60r',2,8,'0:16:17','Test notes','2023-04-16T02:06:41Z',1,'2023-04-16T14:19:57Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (14009,1013,'ngs','purples','aelio_intruders','japan','60r',2,8,'0:17:58','Test notes','2023-12-27T08:53:09Z',1,'2023-12-27T14:17:58Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (14010,1015,'ngs','purples','aelio_intruders','global','pre60r',2,8,'0:16:15','Test notes','2023-10-29T15:25:08Z',1,'2023-10-30T00:46:43Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (14011,1014,'ngs','purples','aelio_intruders','japan','level75r',2,8,'0:12:58','Test notes','2023-05-01T15:06:13Z',1,'2023-05-02T00:07:28Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (14012,1017,'ngs','purples','aelio_intruders','global','level75r',2,8,'0:14:16','Test notes','2023-01-27T21:01:37Z',1,'2023-01-27T22:06:46Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (14013,1016,'ngs','purples','aelio_intruders','global','level80r',2,8,'0:16:42','Test notes','2023-05-31T10:37:01Z',1,'2023-05-31T16:39:46Z','Test Mod Notes','{"support":"ilma"}','Tall Mommy Cool'),
  (14014,1011,'ngs','purples','aelio_intruders','japan','60r',2,8,'0:15:09','Test notes','2023-06-27T07:53:54Z',1,'2023-06-27T15:56:03Z','Test Mod Notes','{"support":"nadereh"}','Tall Mommy Cool'),
  (14015,1012,'ngs','purples','aelio_intruders','global','pre60r',2,8,'0:18:13','Test notes','2023-09-24T23:10:35Z',1,'2023-09-25T03:28:02Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (14016,1012,'ngs','purples','aelio_intruders','global','level80r',2,8,'0:17:52','New Time succeeds old run','2023-05-27T16:24:07Z',1,'2023-05-28T00:41:36Z','Test Mod Notes','{"support":"aina_manon"}','Tall Mommy Cool'),
  (14017,5000000,'ngs','purples','aelio_intruders','global','level80r',2,8,'0:19:16','Test not yet approved run','2023-03-13T18:45:39Z',0,NULL,NULL,'{"support":"glen"}',NULL),
  (14018,5000000,'ngs','purples','aelio_intruders','japan','level80r',2,8,'0:13:00','Test not yet approved run 2','2023-12-18T15:58:54Z',0,NULL,NULL,'{"support":"ilma"}',NULL),
  (14019,5000000,'ngs','purples','aelio_intruders','global','level80r',2,8,'0:13:56','Test reject run','2023-06-19T13:42:11Z',9,'2023-06-19T13:42:11Z','Rejected run','{"support":"aina_manon"}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (14000,14000,1001,0,'https://youtu.be/e439eb96a491',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (14001,14000,1014,0,'https://youtu.be/16fce33459c0',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none', NULL),
  (14002,14000,1003,0,'https://youtu.be/114f6116b2ce',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (14003,14000,1012,0,'https://youtu.be/7ae049770f92',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none', NULL),
  (14004,14000,1002,1,'https://youtu.be/98380a8afffc',N'trying_to_rid_this_name','ngs_force','ngs_force','ngs_none', NULL),
  (14005,14000,5000000,1,'https://youtu.be/0fd7611818bf',N'trying_to_rid_this_name','ngs_braver','ngs_braver','ngs_none', NULL),
  (14006,14000,1005,1,'https://youtu.be/df23cd6a4264',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none', NULL),
  (14007,14000,1006,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','ngs_none', NULL),

  (14008,14001,1017,0,'https://youtu.be/8683313eca8d',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none', NULL),
  (14009,14001,1013,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (14010,14001,1016,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (14011,14001,1018,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none', NULL),
  (14012,14001,1009,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (14013,14001,1005,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none', NULL),
  (14014,14001,1012,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none', NULL),
  (14015,14001,1026,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_gunner','ngs_none', NULL),

  (14016,14002,1011,0,'https://youtu.be/6f44d63b740c',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','ngs_none', NULL),
  (14017,14002,1023,0,'https://youtu.be/a12f0fb2acb1',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (14018,14002,1021,0,'https://youtu.be/fa38bd0c356b',N'trying_to_rid_this_name','ngs_waker','ngs_ranger','ngs_none', NULL),
  (14019,14002,1019,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none', NULL),
  (14020,14002,1030,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none', NULL),
  (14021,14002,1007,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (14022,14002,1027,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_fighter','ngs_none', NULL),
  (14023,14002,1029,1,'https://youtu.be/b294dae206eb',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),

  (14024,14003,1013,0,'https://youtu.be/ecefd2a36989',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (14025,14003,1009,0,'https://youtu.be/3e0f9beba959',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none', NULL),
  (14026,14003,1004,0,'https://youtu.be/e683e8016241',N'trying_to_rid_this_name','ngs_gunner','ngs_fighter','ngs_none', NULL),
  (14027,14003,1028,0,'https://youtu.be/2c43715dc10c',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),
  (14028,14003,1006,1,'https://youtu.be/30b65fdcc9df',N'trying_to_rid_this_name','ngs_ranger','ngs_fighter','ngs_none', NULL),
  (14029,14003,1001,1,'https://youtu.be/9bae092a3246',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none', NULL),
  (14030,14003,1010,1,'https://youtu.be/79db51cc6a85',N'trying_to_rid_this_name','ngs_ranger','ngs_force','ngs_none', NULL),
  (14031,14003,1022,1,'https://youtu.be/8d20a8f2c3a0',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none', NULL),

  (14032,14004,5000000,0,'https://youtu.be/a2987c28b1a3',N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),
  (14033,14004,1010,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunter','ngs_none', NULL),
  (14034,14004,1008,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),
  (14035,14004,1009,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','ngs_none', NULL),
  (14036,14004,1030,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none', NULL),
  (14037,14004,1026,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','ngs_none', NULL),
  (14038,14004,1003,1,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_techter','ngs_none', NULL),
  (14039,14004,1013,1,'https://youtu.be/2d8153a9ae9c',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none', NULL),

  (14040,14005,1011,0,'https://youtu.be/f9c588f5c100',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),
  (14041,14005,1010,0,'https://youtu.be/055a18a9fabd',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (14042,14005,1026,0,'https://youtu.be/198ed4196f00',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (14043,14005,1001,0,'https://youtu.be/e7f6fad4724d',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (14044,14005,1002,1,'https://youtu.be/9960140b6696',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (14045,14005,5000000,1,'https://youtu.be/d1678d26978b',N'trying_to_rid_this_name','ngs_hunter','ngs_techter','ngs_none', NULL),
  (14046,14005,1024,1,'https://youtu.be/63387af14358',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),
  (14047,14005,1027,1,'https://youtu.be/e100cfbff238',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none', NULL),

  (14048,14006,1012,0,'https://youtu.be/b49f4111f7ec',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (14049,14006,1004,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (14050,14006,1028,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_ranger','ngs_none', NULL),
  (14051,14006,1015,0,'https://youtu.be/e466dd22c56a',N'trying_to_rid_this_name','ngs_hunter','ngs_fighter','ngs_none', NULL),
  (14052,14006,1027,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_bouncer','ngs_none', NULL),
  (14053,14006,1003,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (14054,14006,1007,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_ranger','ngs_none', NULL),
  (14055,14006,1011,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_force','ngs_none', NULL),

  (14056,14007,1013,0,'https://youtu.be/67c1bc0abfe4',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (14057,14007,1020,0,'https://youtu.be/99f24a7912fa',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none', NULL),
  (14058,14007,1023,0,'https://youtu.be/ae9489004398',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (14059,14007,1007,0,'https://youtu.be/24de99a58bee',N'trying_to_rid_this_name','ngs_techter','ngs_bouncer','ngs_none', NULL),
  (14060,14007,1025,1,'https://youtu.be/5ecc92446762',N'trying_to_rid_this_name','ngs_force','ngs_fighter','ngs_none', NULL),
  (14061,14007,1014,1,'https://youtu.be/dc061ed418b1',N'trying_to_rid_this_name','ngs_ranger','ngs_gunner','ngs_none', NULL),
  (14062,14007,1003,1,'https://youtu.be/99dd84541e58',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),
  (14063,14007,1009,1,'https://youtu.be/42d79b5a91ec',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),

  (14064,14008,1014,0,'https://youtu.be/8137cd6694de',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),
  (14065,14008,1005,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (14066,14008,1013,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_techter','ngs_none', NULL),
  (14067,14008,1017,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (14068,14008,1003,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_slayer','ngs_none', NULL),
  (14069,14008,1006,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_hunter','ngs_none', NULL),
  (14070,14008,1025,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_ranger','ngs_none', NULL),
  (14071,14008,1024,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none', NULL),

  (14072,14009,1013,0,'https://youtu.be/f85b196a99bf',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (14073,14009,1012,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),
  (14074,14009,5000000,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),
  (14075,14009,1006,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_force','ngs_none', NULL),
  (14076,14009,1015,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_ranger','ngs_none', NULL),
  (14077,14009,1007,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none', NULL),
  (14078,14009,1016,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_waker','ngs_none', NULL),
  (14079,14009,1011,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none', NULL),

  (14080,14010,1015,0,'https://youtu.be/3e83395e0490',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none', NULL),
  (14081,14010,1012,0,'https://youtu.be/e215120a8302',N'trying_to_rid_this_name','ngs_braver','ngs_hunter','ngs_none', NULL),
  (14082,14010,1007,0,'https://youtu.be/b72320356336',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (14083,14010,1006,0,'https://youtu.be/c8191b2aa090',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (14084,14010,1029,1,'https://youtu.be/93af73f6d9ae',N'trying_to_rid_this_name','ngs_hunter','ngs_force','ngs_none', NULL),
  (14085,14010,1023,1,'https://youtu.be/713ab00a94cc',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','ngs_none', NULL),
  (14086,14010,1027,1,'https://youtu.be/0204a2da39e7',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none', NULL),
  (14087,14010,1008,1,'https://youtu.be/81edf251a605',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),

  (14088,14011,1014,0,'https://youtu.be/6efc45e14daf',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (14089,14011,1011,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (14090,14011,1007,0,'https://youtu.be/4e60c2ec5e2f',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (14091,14011,1022,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none', NULL),
  (14092,14011,1029,1,'https://youtu.be/aac40e249690',N'trying_to_rid_this_name','ngs_gunner','ngs_waker','ngs_none', NULL),
  (14093,14011,1015,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none', NULL),
  (14094,14011,1030,1,'https://youtu.be/54950163b837',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none', NULL),
  (14095,14011,1021,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),

  (14096,14012,1017,0,'https://youtu.be/e71043c799d4',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),
  (14097,14012,1011,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger','ngs_none', NULL),
  (14098,14012,1028,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_waker','ngs_none', NULL),
  (14099,14012,1019,0,'https://youtu.be/a3f9a587ba20',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (14100,14012,1030,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none', NULL),
  (14101,14012,1018,1,'https://youtu.be/873939fdb8d9',N'trying_to_rid_this_name','ngs_techter','ngs_ranger','ngs_none', NULL),
  (14102,14012,1003,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (14103,14012,1001,1,'https://youtu.be/5361cabcc8c1',N'trying_to_rid_this_name','ngs_fighter','ngs_hunter','ngs_none', NULL),

  (14104,14013,1016,0,'https://youtu.be/7285a859fea6',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (14105,14013,1013,0,'https://youtu.be/23cc88b490c5',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),
  (14106,14013,1025,0,'https://youtu.be/73b26b653078',N'trying_to_rid_this_name','ngs_fighter','ngs_hunter','ngs_none', NULL),
  (14107,14013,1004,0,'https://youtu.be/59f2da2f4549',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (14108,14013,5000000,1,'https://youtu.be/d8d54a9ee010',N'trying_to_rid_this_name','ngs_waker','ngs_force','ngs_none', NULL),
  (14109,14013,1011,1,'https://youtu.be/71487d0b79df',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none', NULL),
  (14110,14013,1020,1,'https://youtu.be/0e02aabd39c8',N'trying_to_rid_this_name','ngs_force','ngs_ranger','ngs_none', NULL),
  (14111,14013,1009,1,'https://youtu.be/0a8bfce9b7dc',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),

  (14112,14014,1011,0,'https://youtu.be/bee80f24fe0e',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (14113,14014,1015,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (14114,14014,1018,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (14115,14014,1006,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (14116,14014,1022,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_fighter','ngs_none', NULL),
  (14117,14014,1029,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (14118,14014,1030,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_hunter','ngs_none', NULL),
  (14119,14014,1021,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),

  (14120,14015,1012,0,'https://youtu.be/2870c26d1103',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','ngs_none', NULL),
  (14121,14015,1001,0,'https://youtu.be/eded431982d4',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (14122,14015,1007,0,'https://youtu.be/873c7fd1b730',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none', NULL),
  (14123,14015,1010,0,'https://youtu.be/cf4d8d3a34fa',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none', NULL),
  (14124,14015,1008,1,'https://youtu.be/854739799951',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none', NULL),
  (14125,14015,1023,1,'https://youtu.be/aab506d08db6',N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none', NULL),
  (14126,14015,1022,1,'https://youtu.be/df471e45c0fb',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none', NULL),
  (14127,14015,1021,1,'https://youtu.be/77f090d9c412',N'trying_to_rid_this_name','ngs_waker','ngs_bouncer','ngs_none', NULL),

  (14128,14016,1012,0,'https://youtu.be/d192ebf67e3b',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none', NULL),
  (14129,14016,1023,0,'https://youtu.be/185cfe016727',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none', NULL),
  (14130,14016,1030,0,'https://youtu.be/5d938314fefd',N'trying_to_rid_this_name','ngs_hunter','ngs_slayer','ngs_none', NULL),
  (14131,14016,5000000,0,'https://youtu.be/4e7eec55d03f',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none', NULL),
  (14132,14016,1006,1,'https://youtu.be/c926b73e3955',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (14133,14016,1004,1,'https://youtu.be/97465682e0b0',N'trying_to_rid_this_name','ngs_slayer','ngs_force','ngs_none', NULL),
  (14134,14016,1018,1,'https://youtu.be/201d28df77c5',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none', NULL),
  (14135,14016,1008,1,'https://youtu.be/a6fe0315bcca',N'trying_to_rid_this_name','ngs_force','ngs_fighter','ngs_none', NULL),

  (14136,14017,5000000,0,'https://youtu.be/6e6945698d7a',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (14137,14017,1001,0,'https://youtu.be/6725d2d0ac91',N'trying_to_rid_this_name','ngs_bouncer','ngs_gunner','ngs_none', NULL),
  (14138,14017,1005,0,'https://youtu.be/7fb2aaaffd2b',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (14139,14017,1020,0,'https://youtu.be/32bb060929c7',N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','ngs_none', NULL),
  (14140,14017,1013,1,'https://youtu.be/24de8bd524f2',N'trying_to_rid_this_name','ngs_force','ngs_waker','ngs_none', NULL),
  (14141,14017,1028,1,'https://youtu.be/49ec10974703',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none', NULL),
  (14142,14017,1017,1,'https://youtu.be/287eba992f95',N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger','ngs_none', NULL),
  (14143,14017,1010,1,'https://youtu.be/39c4d48136fe',N'trying_to_rid_this_name','ngs_braver','ngs_force','ngs_none', NULL),

  (14144,14018,5000000,0,'https://youtu.be/8c5b1a7cab4e',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none', NULL),
  (14145,14018,1019,0,'https://youtu.be/7ad0200beca4',N'trying_to_rid_this_name','ngs_fighter','ngs_braver','ngs_none', NULL),
  (14146,14018,1012,0,'https://youtu.be/0f9bb3d11467',N'trying_to_rid_this_name','ngs_gunner','ngs_braver','ngs_none', NULL),
  (14147,14018,1022,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none', NULL),
  (14148,14018,1016,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none', NULL),
  (14149,14018,1002,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_techter','ngs_none', NULL),
  (14150,14018,1001,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_waker','ngs_none', NULL),
  (14151,14018,1017,1,'https://youtu.be/0deb8cd90620',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),

  (14152,14019,5000000,0,'https://youtu.be/202a78e85a9d',N'trying_to_rid_this_name','ngs_slayer','ngs_fighter','ngs_none', NULL),
  (14153,14019,1005,0,'https://youtu.be/783b6c8ec57a',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none', NULL),
  (14154,14019,1010,0,'https://youtu.be/ed9ea25c1aaa',N'trying_to_rid_this_name','ngs_force','ngs_waker','ngs_none', NULL),
  (14155,14019,1006,0,'https://youtu.be/08f4bba9792c',N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none', NULL),
  (14156,14019,1028,1,'https://youtu.be/a48dca8d95aa',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (14157,14019,1019,1,'https://youtu.be/9e5a25ec543f',N'trying_to_rid_this_name','ngs_waker','ngs_hunter','ngs_none', NULL),
  (14158,14019,1029,1,'https://youtu.be/1e1e2732f80f',N'trying_to_rid_this_name','ngs_hunter','ngs_braver','ngs_none', NULL),
  (14159,14019,1021,1,'https://youtu.be/33e59a22d5c6',N'trying_to_rid_this_name','ngs_hunter','ngs_techter','ngs_none', NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;