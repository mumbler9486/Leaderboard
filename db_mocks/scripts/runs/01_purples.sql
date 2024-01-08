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
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (11000,11000,1001,0,'https://youtu.be/3y8HOvXXfCYr',N'trying_to_rid_this_name','ngs_force','ngs_braver','["ngs_harmonizer","ngs_twin_daggers","ngs_wired_lance"]'),
  (11001,11001,1017,0,'https://youtu.be/wtQv8tNg8P3z',N'trying_to_rid_this_name','ngs_techter','ngs_force','["ngs_knuckles","ngs_bow","ngs_twin_daggers"]'),
  (11002,11002,1011,0,'https://youtu.be/15KftD3pwV6Q',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','["ngs_twin_daggers","ngs_bow"]'),
  (11003,11003,1013,0,'https://youtu.be/CSncyvF4E0Rq',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','["ngs_double_sabers","ngs_katana","ngs_assault_rifle"]'),
  (11004,11004,5000000,0,'https://youtu.be/a8tF5Z9y43kM',N'trying_to_rid_this_name','ngs_techter','ngs_force','["ngs_partisan","ngs_wired_lance","ngs_twin_daggers"]'),
  (11005,11005,1011,0,'https://youtu.be/y1Bg93YXcg2W',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_gunblade","ngs_rod","ngs_bow"]'),
  (11006,11006,1012,0,'https://youtu.be/5KkN3wv6nu5R',N'trying_to_rid_this_name','ngs_waker','ngs_slayer','["ngs_bow","ngs_wand"]'),
  (11007,11007,1013,0,'https://youtu.be/85EpdTM2Q4CB',N'trying_to_rid_this_name','ngs_force','ngs_gunner','["ngs_twin_machine_guns","ngs_assault_rifle","ngs_talis"]'),
  (11008,11008,1014,0,'https://youtu.be/G8Z44r5rwdmy',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','["ngs_gunblade","ngs_soaring_blades"]'),
  (11009,11009,1013,0,'https://youtu.be/q9sOjT6aj6fC',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','["ngs_twin_daggers","ngs_bow"]'),
  (11010,11010,1015,0,'https://youtu.be/dFa9m1eS7rp3',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','["ngs_double_sabers","ngs_rod","ngs_launcher"]'),
  (11011,11011,1014,0,'https://youtu.be/5qtqhg1U9uM1',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','["ngs_rod","ngs_wand","ngs_soaring_blades"]'),
  (11012,11012,1017,0,'https://youtu.be/rUB9xWRRLe52',N'trying_to_rid_this_name','ngs_techter','ngs_slayer','["ngs_katana","ngs_soaring_blades","ngs_katana"]'),
  (11013,11013,1016,0,'https://youtu.be/1A5L6C6x0nH7',N'trying_to_rid_this_name','ngs_braver','ngs_ranger','["ngs_sword","ngs_katana","ngs_sword"]'),
  (11014,11014,1011,0,'https://youtu.be/r6Up2wbU3p0N',N'trying_to_rid_this_name','ngs_fighter','ngs_fighter','["ngs_sword","ngs_twin_daggers","ngs_bow"]'),
  (11015,11015,1012,0,'https://youtu.be/bU5C66Rai64j',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_jet_boots","ngs_jet_boots","ngs_wired_lance"]'),
  (11016,11016,1012,0,'https://youtu.be/1a7682528888',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_double_sabers","ngs_gunblade","ngs_katana"]'),
  (11017,11017,5000000,0,'https://youtu.be/9f175e2f5fe6',N'trying_to_rid_this_name','ngs_gunner','ngs_force','["ngs_twin_machine_guns","ngs_wired_lance","ngs_twin_machine_guns"]'),
  (11018,11018,5000000,0,'https://youtu.be/84f41a5690b0',N'trying_to_rid_this_name','ngs_fighter','ngs_force','["ngs_soaring_blades","ngs_assault_rifle","ngs_sword"]'),
  (11019,11019,5000000,0,'https://youtu.be/b2d852b5e0c2',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','["ngs_launcher","ngs_gunblade","ngs_soaring_blades"]')
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
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (12000,12000,1001,0,'https://youtu.be/372c5885733c',N'trying_to_rid_this_name','ngs_gunner','ngs_force',NULL),
  (12001,12000,1006,0,'https://youtu.be/1bdc00535a8c',N'trying_to_rid_this_name','ngs_bouncer','ngs_waker',NULL),
  
  (12002,12001,1017,0,'https://youtu.be/fe8b747e00ac',N'trying_to_rid_this_name','ngs_ranger','ngs_braver',NULL),
  (12003,12001,1030,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_bouncer',NULL),
  
  (12004,12002,1011,0,'https://youtu.be/54f7aa14a842',N'trying_to_rid_this_name','ngs_techter','ngs_gunner',NULL),
  (12005,12002,1023,0,'https://youtu.be/d400da40e005',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer',NULL),
  
  (12006,12003,1013,0,'https://youtu.be/a2a92d5b9e31',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter',NULL),
  (12007,12003,1025,0,'https://youtu.be/42e4f78b4d29',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer',NULL),
  
  (12008,12004,5000000,0,'https://youtu.be/8a90ccef3246',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer',NULL),
  (12009,12004,1021,0,'https://youtu.be/6dc86114fc75',N'trying_to_rid_this_name','ngs_slayer','ngs_braver',NULL),
  
  (12010,12005,1011,0,'https://youtu.be/d0014f1e7a7f',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger',NULL),
  (12011,12005,5000000,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_force',NULL),
  
  (12012,12006,1012,0,'https://youtu.be/5a6c3eafa094',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter',NULL),
  (12013,12006,1020,0,'https://youtu.be/6551424d9d9b',N'trying_to_rid_this_name','ngs_ranger','ngs_techter',NULL),
  
  (12014,12007,1013,0,'https://youtu.be/303f4167c96b',N'trying_to_rid_this_name','ngs_techter','ngs_slayer',NULL),
  (12015,12007,1018,0,'https://youtu.be/e422a5202940',N'trying_to_rid_this_name','ngs_hunter','ngs_gunner',NULL),
  
  (12016,12008,1014,0,'https://youtu.be/13e1f5014631',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer',NULL),
  (12017,12008,1010,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_slayer',NULL),
  
  (12018,12009,1013,0,'https://youtu.be/46d3435fa0ea',N'trying_to_rid_this_name','ngs_fighter','ngs_force',NULL),
  (12019,12009,1017,0,'https://youtu.be/871ce7c59443',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter',NULL),
  
  (12020,12010,1015,0,'https://youtu.be/d317d6462872',N'trying_to_rid_this_name','ngs_ranger','ngs_techter',NULL),
  (12021,12010,1030,0,'https://youtu.be/abe1fc068aed',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter',NULL),
  
  (12022,12011,1014,0,'https://youtu.be/0aaee353deff',N'trying_to_rid_this_name','ngs_techter','ngs_fighter',NULL),
  (12023,12011,1010,0,'https://youtu.be/2b6fcaa64d05',N'trying_to_rid_this_name','ngs_slayer','ngs_waker',NULL),
  
  (12024,12012,1017,0,'https://youtu.be/1d2bda5b2178',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer',NULL),
  (12025,12012,1011,0,'https://youtu.be/2f5eef3d6a3b',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter',NULL),
  
  (12026,12013,1016,0,'https://youtu.be/b3259cb1883b',N'trying_to_rid_this_name','ngs_force','ngs_hunter',NULL),
  (12027,12013,1022,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_slayer',NULL),
  
  (12028,12014,1011,0,'https://youtu.be/528a576c21cc',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer',NULL),
  (12029,12014,1026,0,'https://youtu.be/8298d1283321',N'trying_to_rid_this_name','ngs_waker','ngs_braver',NULL),
  
  (12030,12015,1012,0,'https://youtu.be/b325d39a45c7',N'trying_to_rid_this_name','ngs_force','ngs_bouncer',NULL),
  (12031,12015,1016,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_braver',NULL),
  
  (12032,12016,1012,0,'https://youtu.be/e399f9333edd',N'trying_to_rid_this_name','ngs_force','ngs_slayer',NULL),
  (12033,12016,1016,0,'https://youtu.be/d558c561fc4c',N'trying_to_rid_this_name','ngs_techter','ngs_fighter',NULL),
  
  (12034,12017,5000000,0,'https://youtu.be/c4b211011de8',N'trying_to_rid_this_name','ngs_techter','ngs_hunter',NULL),
  (12035,12017,1022,0,'https://youtu.be/11b29c30bd71',N'trying_to_rid_this_name','ngs_waker','ngs_techter',NULL),
  
  (12036,12018,5000000,0,'https://youtu.be/4586ec681a7a',N'trying_to_rid_this_name','ngs_braver','ngs_gunner',NULL),
  (12037,12018,1030,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_force',NULL),
  
  (12038,12019,5000000,0,'https://youtu.be/e7f6986ffba6',N'trying_to_rid_this_name','ngs_force','ngs_gunner',NULL),
  (12039,12019,1029,0,'https://youtu.be/320d20ca73bb',N'trying_to_rid_this_name','ngs_force','ngs_slayer',NULL)

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
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (13000,13000,1001,0,'https://youtu.be/3316cef55dea8',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver',NULL),
  (13001,13000,1019,0,'https://youtu.be/edbf767cf4f87',N'trying_to_rid_this_name','ngs_fighter','ngs_waker',NULL),
  (13002,13000,1030,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_hunter',NULL),
  (13003,13000,1017,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_gunner',NULL),
  
  (13004,13001,1017,0,'https://youtu.be/d687885ee0ea3',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner',NULL),
  (13005,13001,1027,0,'https://youtu.be/164db9565c1f4',N'trying_to_rid_this_name','ngs_braver','ngs_techter',NULL),
  (13006,13001,1023,0,'https://youtu.be/71f45db642cd0',N'trying_to_rid_this_name','ngs_fighter','ngs_gunner',NULL),
  (13007,13001,1028,0,'https://youtu.be/cf479c6d4e10a',N'trying_to_rid_this_name','ngs_waker','ngs_fighter',NULL),
  
  (13008,13002,1011,0,'https://youtu.be/c7b6677b618ea',N'trying_to_rid_this_name','ngs_force','ngs_waker',NULL),
  (13009,13002,1018,0,'https://youtu.be/712c9ad0e45d2',N'trying_to_rid_this_name','ngs_fighter','ngs_force',NULL),
  (13010,13002,1008,0,'https://youtu.be/410a91f95587d',N'trying_to_rid_this_name','ngs_fighter','ngs_braver',NULL),
  (13011,13002,1005,0,'https://youtu.be/6b7769b77ab01',N'trying_to_rid_this_name','ngs_fighter','ngs_force',NULL),
  
  (13012,13003,1013,0,'https://youtu.be/ae7c6d63ce37d',N'trying_to_rid_this_name','ngs_ranger','ngs_hunter',NULL),
  (13013,13003,1003,0,'https://youtu.be/4b9326702c592',N'trying_to_rid_this_name','ngs_ranger','ngs_force',NULL),
  (13014,13003,1012,0,'https://youtu.be/ec07aa5bd7576',N'trying_to_rid_this_name','ngs_ranger','ngs_fighter',NULL),
  (13015,13003,1021,0,'https://youtu.be/674afc82d7643',N'trying_to_rid_this_name','ngs_bouncer','ngs_gunner',NULL),
  
  (13016,13004,5000000,0,'https://youtu.be/b51c1541e9560',N'trying_to_rid_this_name','ngs_ranger','ngs_fighter',NULL),
  (13017,13004,1013,0,'https://youtu.be/005e608b6a347',N'trying_to_rid_this_name','ngs_braver','ngs_slayer',NULL),
  (13018,13004,1025,0,'https://youtu.be/81729cabe85f4',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer',NULL),
  (13019,13004,1001,0,'https://youtu.be/001903112c62d',N'trying_to_rid_this_name','ngs_waker','ngs_techter',NULL),
  
  (13020,13005,1011,0,'https://youtu.be/682528888aa1b',N'trying_to_rid_this_name','ngs_force','ngs_braver',NULL),
  (13021,13005,1014,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_fighter',NULL),
  (13022,13005,1006,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_braver',NULL),
  (13023,13005,1026,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_fighter',NULL),
  
  (13024,13006,1012,0,'https://youtu.be/a0967d181a830',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner',NULL),
  (13025,13006,1019,0,'https://youtu.be/b9f09f990d41c',N'trying_to_rid_this_name','ngs_fighter','ngs_gunner',NULL),
  (13026,13006,1030,0,'https://youtu.be/233e2c4191888',N'trying_to_rid_this_name','ngs_fighter','ngs_braver',NULL),
  (13027,13006,1017,0,'https://youtu.be/430cc2734ecf6',N'trying_to_rid_this_name','ngs_force','ngs_techter',NULL),
  
  (13028,13007,1013,0,'https://youtu.be/b75e421008f51',N'trying_to_rid_this_name','ngs_force','ngs_fighter',NULL),
  (13029,13007,1029,0,'https://youtu.be/3d839aea9e238',N'trying_to_rid_this_name','ngs_hunter','ngs_braver',NULL),
  (13030,13007,1027,0,'https://youtu.be/1c889b370ef3d',N'trying_to_rid_this_name','ngs_force','ngs_braver',NULL),
  (13031,13007,1023,0,'https://youtu.be/e79a195bbf050',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer',NULL),
  
  (13032,13008,1014,0,'https://youtu.be/e97fa5739cb27',N'trying_to_rid_this_name','ngs_force','ngs_fighter',NULL),
  (13033,13008,1021,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_slayer',NULL),
  (13034,13008,1012,0,'https://youtu.be/c4cf69adbfd5d',N'trying_to_rid_this_name','ngs_waker','ngs_waker',NULL),
  (13035,13008,1026,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_braver',NULL),
  
  (13036,13009,1013,0,'https://youtu.be/3f2774ce03eff',N'trying_to_rid_this_name','ngs_techter','ngs_waker',NULL),
  (13037,13009,1011,0,'https://youtu.be/568e40b772151',N'trying_to_rid_this_name','ngs_force','ngs_braver',NULL),
  (13038,13009,1029,0,'https://youtu.be/9fac918b9b75f',N'trying_to_rid_this_name','ngs_techter','ngs_gunner',NULL),
  (13039,13009,1013,0,'https://youtu.be/dae39c4365e39',N'trying_to_rid_this_name','ngs_bouncer','ngs_waker',NULL),
  
  (13040,13010,1015,0,'https://youtu.be/933be92cf7fdf',N'trying_to_rid_this_name','ngs_braver','ngs_gunner',NULL),
  (13041,13010,1010,0,'https://youtu.be/9e37237ef4eaa',N'trying_to_rid_this_name','ngs_ranger','ngs_gunner',NULL),
  (13042,13010,1015,0,'https://youtu.be/c856b9d461769',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver',NULL),
  (13043,13010,1003,0,'https://youtu.be/a330c9d102c39',N'trying_to_rid_this_name','ngs_force','ngs_ranger',NULL),
  
  (13044,13011,1014,0,'https://youtu.be/19cae2274ce1a',N'trying_to_rid_this_name','ngs_techter','ngs_ranger',NULL),
  (13045,13011,1017,0,'https://youtu.be/2baade5d8e57a',N'trying_to_rid_this_name','ngs_hunter','ngs_force',NULL),
  (13046,13011,5000000,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer',NULL),
  (13047,13011,1028,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer',NULL),
  
  (13048,13012,1017,0,'https://youtu.be/2e94dc569265d',N'trying_to_rid_this_name','ngs_techter','ngs_fighter',NULL),
  (13049,13012,1018,0,'https://youtu.be/481a73b2fdb55',N'trying_to_rid_this_name','ngs_force','ngs_braver',NULL),
  (13050,13012,1015,0,'https://youtu.be/b75aa8bd4f864',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter',NULL),
  (13051,13012,1021,0,'https://youtu.be/4e1402e2e470a',N'trying_to_rid_this_name','ngs_techter','ngs_force',NULL),
  
  (13052,13013,1016,0,'https://youtu.be/0a2800891bdc1',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer',NULL),
  (13053,13013,1005,0,'https://youtu.be/8268d03b81590',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter',NULL),
  (13054,13013,1001,0,'https://youtu.be/2e5b21fd4ed14',N'trying_to_rid_this_name','ngs_braver','ngs_force',NULL),
  (13055,13013,1014,0,'https://youtu.be/da7924100b219',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer',NULL),
  
  (13056,13014,1011,0,'https://youtu.be/bfe38bedbca93',N'trying_to_rid_this_name','ngs_techter','ngs_force',NULL),
  (13057,13014,1016,0,'https://youtu.be/0d39da0cda53e',N'trying_to_rid_this_name','ngs_slayer','ngs_waker',NULL),
  (13058,13014,1010,0,'https://youtu.be/58425114bf70b',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer',NULL),
  (13059,13014,1030,0,'https://youtu.be/f5b2b5e497bab',N'trying_to_rid_this_name','ngs_force','ngs_ranger',NULL),
  
  (13060,13015,1012,0,'https://youtu.be/3c23545a02a09',N'trying_to_rid_this_name','ngs_force','ngs_fighter',NULL),
  (13061,13015,1027,0,'https://youtu.be/05e952f5aeab2',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter',NULL),
  (13062,13015,1017,0,'https://youtu.be/a4691be2cf59c',N'trying_to_rid_this_name','ngs_fighter','ngs_gunner',NULL),
  (13063,13015,1004,0,'https://youtu.be/e57dd0a8c7225',N'trying_to_rid_this_name','ngs_waker','ngs_force',NULL),
  
  (13064,13016,1012,0,'https://youtu.be/3c23545a02a09',N'trying_to_rid_this_name','ngs_force','ngs_gunner',NULL),
  (13065,13016,1027,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_force',NULL),
  (13066,13016,1017,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_hunter',NULL),
  (13067,13016,1004,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_slayer',NULL),
  
  (13068,13017,5000000,0,'https://youtu.be/9571ccb6337ee',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer',NULL),
  (13069,13017,1018,0,'https://youtu.be/9a6fc62d42434',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer',NULL),
  (13070,13017,1012,0,'https://youtu.be/e81a6b024abfc',N'trying_to_rid_this_name','ngs_ranger','ngs_hunter',NULL),
  (13071,13017,1007,0,'https://youtu.be/c3d9460704c2b',N'trying_to_rid_this_name','ngs_ranger','ngs_slayer',NULL),
  
  (13072,13018,5000000,0,'https://youtu.be/50708933cc302',N'trying_to_rid_this_name','ngs_braver','ngs_slayer',NULL),
  (13073,13018,1029,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_waker',NULL),
  (13074,13018,1017,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunter',NULL),
  (13075,13018,1001,0,'https://youtu.be/0f860f501aa6e',N'trying_to_rid_this_name','ngs_ranger','ngs_force',NULL),
  
  (13076,13019,5000000,0,'https://youtu.be/31f0a74d29eda',N'trying_to_rid_this_name','ngs_fighter','ngs_waker',NULL),
  (13077,13019,1018,0,'https://youtu.be/6f1489fc5c00f',N'trying_to_rid_this_name','ngs_ranger','ngs_hunter',NULL),
  (13078,13019,1027,0,'https://youtu.be/4b6371b34c54f',N'trying_to_rid_this_name','ngs_braver','ngs_force',NULL),
  (13079,13019,1030,0,'https://youtu.be/736946756028c',N'trying_to_rid_this_name','ngs_fighter','ngs_waker',NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;
