-- Venogia Solo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (51000,1001,'ngs','venogia','urgent_quest','global','level80r',1,1,'00:19:50','Test notes','2023-04-06T19:10:05Z',1,'2023-04-07T05:26:10Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51001,1017,'ngs','venogia','urgent_quest','japan','level80r',1,1,'00:24:48','Test notes','2023-03-25T11:53:20Z',1,'2023-03-25T17:43:48Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51002,1011,'ngs','venogia','urgent_quest','global','60r',1,1,'00:24:35','Test notes','2023-12-13T13:29:33Z',1,'2023-12-13T15:10:20Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51003,1013,'ngs','venogia','urgent_quest','global','pre60r',1,1,'00:19:39','Test notes','2023-02-07T16:32:13Z',1,'2023-02-07T21:38:30Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51004,5000000,'ngs','venogia','urgent_quest','global','pot6r',1,1,'00:23:00','Test notes','2023-07-13T07:34:38Z',1,'2023-07-13T13:55:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51005,1011,'ngs','venogia','urgent_quest','japan','pre60r',1,1,'00:23:56','Test notes','2023-06-30T16:52:47Z',1,'2023-06-30T22:13:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51006,1012,'ngs','venogia','urgent_quest','global','level75r',1,1,'00:19:22','Test notes','2023-07-03T21:31:07Z',1,'2023-07-04T10:03:23Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51007,1013,'ngs','venogia','urgent_quest','global','lvl80grind',1,1,'00:23:34','Test notes','2023-02-12T07:39:21Z',1,'2023-02-12T18:46:17Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51008,1014,'ngs','venogia','urgent_quest','japan','60r',1,1,'00:15:54','Test notes','2023-09-11T21:50:27Z',1,'2023-09-11T23:00:00Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51009,1013,'ngs','venogia','urgent_quest','japan','60r',1,1,'00:20:40','Test notes','2023-10-20T23:41:28Z',1,'2023-10-21T09:41:45Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51010,1015,'ngs','venogia','urgent_quest','global','pre60r',1,1,'00:18:40','Test notes','2023-04-29T16:55:41Z',1,'2023-04-30T05:44:22Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51011,1014,'ngs','venogia','urgent_quest','japan','level75r',1,1,'00:23:09','Test notes','2023-08-17T17:16:20Z',1,'2023-08-17T21:22:19Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51012,1017,'ngs','venogia','urgent_quest','global','level75r',1,1,'00:19:43','Test notes','2023-05-07T18:33:58Z',1,'2023-05-08T02:40:52Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51013,1016,'ngs','venogia','urgent_quest','global','level80r',1,1,'00:24:04','Test notes','2023-02-11T06:18:08Z',1,'2023-02-11T07:48:24Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51014,1011,'ngs','venogia','urgent_quest','japan','60r',1,1,'00:16:57','Test notes','2023-03-28T00:52:53Z',1,'2023-03-28T12:47:08Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51015,1012,'ngs','venogia','urgent_quest','global','pre60r',1,1,'00:17:45','Test notes','2023-08-22T16:45:11Z',1,'2023-08-22T20:41:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51016,1012,'ngs','venogia','urgent_quest','global','level80r',1,1,'00:17:04','New Time succeeds old run','2023-06-08T21:42:34Z',1,'2023-06-09T01:53:30Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (51017,5000000,'ngs','venogia','urgent_quest','global','level80r',1,1,'00:21:42','Test not yet approved run','2023-03-09T12:42:56Z',0,NULL,NULL,NULL,NULL),
  (51018,5000000,'ngs','venogia','urgent_quest','japan','level80r',1,1,'00:16:55','Test not yet approved run 2','2023-12-24T17:39:18Z',0,NULL,NULL,NULL,NULL),
  (51019,5000000,'ngs','venogia','urgent_quest','global','level80r',1,1,'00:22:31','Test reject run','2023-03-30T15:13:37Z',9,'2023-03-30T16:15:37Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (51300,51000,1001,0,'https://youtu.be/e68fe04b6a1a',N'trying_to_rid_this_name','ngs_braver','ngs_ranger','["ngs_sword","ngs_twin_daggers","ngs_talis"]'),
  (51301,51001,1017,0,'https://youtu.be/9d78e0d69cb3',N'trying_to_rid_this_name','ngs_braver','ngs_hunter','["ngs_assault_rifle","ngs_harmonizer","ngs_talis"]'),
  (51302,51002,1011,0,'https://youtu.be/c7f46b101bf4',N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','["ngs_sword","ngs_gunblade","ngs_rod"]'),
  (51303,51003,1013,0,'https://youtu.be/ec5975fc95f3',N'trying_to_rid_this_name','ngs_hunter','ngs_fighter','["ngs_wired_lance","ngs_assault_rifle"]'),
  (51304,51004,5000000,0,'https://youtu.be/6dbfbd71bb3e',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','["ngs_twin_daggers","ngs_knuckles","ngs_twin_machine_guns"]'),
  (51305,51005,1011,0,'https://youtu.be/660c3019b926',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','["ngs_sword","ngs_wired_lance","ngs_wand"]'),
  (51306,51006,1012,0,'https://youtu.be/685250c91b93',N'trying_to_rid_this_name','ngs_techter','ngs_force','["ngs_rod","ngs_talis","ngs_harmonizer"]'),
  (51307,51007,1013,0,'https://youtu.be/8fa1ce13c8a1',N'trying_to_rid_this_name','ngs_fighter','ngs_braver','["ngs_katana","ngs_soaring_blades","ngs_bow"]'),
  (51308,51008,1014,0,'https://youtu.be/010b01c32300',N'trying_to_rid_this_name','ngs_techter','ngs_bouncer','["ngs_sword","ngs_assault_rifle","ngs_launcher"]'),
  (51309,51009,1013,0,'https://youtu.be/d7070f05e352',N'trying_to_rid_this_name','ngs_force','ngs_techter','["ngs_twin_daggers","ngs_assault_rifle","ngs_bow"]'),
  (51310,51010,1015,0,'https://youtu.be/8c9174d67e44',N'trying_to_rid_this_name','ngs_bouncer','ngs_waker','["ngs_wired_lance","ngs_katana","ngs_wand"]'),
  (51311,51011,1014,0,'https://youtu.be/e33279cc4437',N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','["ngs_knuckles","ngs_katana","ngs_bow"]'),
  (51312,51012,1017,0,'https://youtu.be/0cfdb77cc609',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','["ngs_twin_daggers","ngs_launcher","ngs_rod"]'),
  (51313,51013,1016,0,'https://youtu.be/37d7b950458c',N'trying_to_rid_this_name','ngs_braver','ngs_ranger','["ngs_partisan","ngs_knuckles","ngs_harmonizer"]'),
  (51314,51014,1011,0,'https://youtu.be/a0510f98676c',N'trying_to_rid_this_name','ngs_braver','ngs_waker','["ngs_sword","ngs_bow"]'),
  (51315,51015,1012,0,'https://youtu.be/ec8e95fee3fa',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','["ngs_wired_lance","ngs_gunblade","ngs_bow"]'),
  (51316,51016,1012,0,'https://youtu.be/591bbf960121',N'trying_to_rid_this_name','ngs_force','ngs_fighter','["ngs_sword","ngs_gunblade","ngs_assault_rifle"]'),
  (51317,51017,5000000,0,'https://youtu.be/39082d814538',N'trying_to_rid_this_name','ngs_braver','ngs_fighter','["ngs_bow","ngs_rod","ngs_jet_boots"]'),
  (51318,51018,5000000,0,'https://youtu.be/6e8b76057554',N'trying_to_rid_this_name','ngs_gunner','ngs_braver','["ngs_twin_daggers","ngs_katana","ngs_gunblade"]'),
  (51319,51019,5000000,0,'https://youtu.be/6306712a6edf',N'trying_to_rid_this_name','ngs_gunner','ngs_fighter','["ngs_wired_lance","ngs_partisan","ngs_wand"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Venogia Duo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (52000,1001,'ngs','venogia','urgent_quest','global','level80r',1,2,'00:17:31','Test notes','2023-04-22T09:26:23Z',1,'2023-04-22T21:48:33Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52001,1017,'ngs','venogia','urgent_quest','japan','level80r',1,2,'00:19:16','Test notes','2023-12-18T19:37:53Z',1,'2023-12-19T06:59:51Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52002,1011,'ngs','venogia','urgent_quest','global','60r',1,2,'00:24:42','Test notes','2023-05-12T16:20:12Z',1,'2023-05-12T20:20:36Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52003,1013,'ngs','venogia','urgent_quest','global','pre60r',1,2,'00:18:03','Test notes','2023-03-27T18:15:00Z',1,'2023-03-28T03:37:05Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52004,5000000,'ngs','venogia','urgent_quest','global','pot6r',1,2,'00:18:05','Test notes','2023-09-20T03:04:05Z',1,'2023-09-20T13:58:01Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52005,1011,'ngs','venogia','urgent_quest','japan','pre60r',1,2,'00:23:21','Test notes','2023-06-15T20:24:10Z',1,'2023-06-15T20:53:31Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52006,1012,'ngs','venogia','urgent_quest','global','level75r',1,2,'00:22:23','Test notes','2023-01-21T09:48:57Z',1,'2023-01-21T22:23:49Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52007,1013,'ngs','venogia','urgent_quest','global','lvl80grind',1,2,'00:19:38','Test notes','2023-09-13T18:14:46Z',1,'2023-09-14T03:14:40Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52008,1014,'ngs','venogia','urgent_quest','japan','60r',1,2,'00:21:43','Test notes','2023-05-28T17:41:51Z',1,'2023-05-28T19:48:12Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52009,1013,'ngs','venogia','urgent_quest','japan','60r',1,2,'00:15:56','Test notes','2023-12-13T23:54:23Z',1,'2023-12-14T12:26:40Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52010,1015,'ngs','venogia','urgent_quest','global','pre60r',1,2,'00:22:30','Test notes','2023-06-21T22:42:16Z',1,'2023-06-22T04:17:33Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52011,1014,'ngs','venogia','urgent_quest','japan','level75r',1,2,'00:18:00','Test notes','2023-08-14T23:16:03Z',1,'2023-08-15T00:16:38Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52012,1017,'ngs','venogia','urgent_quest','global','level75r',1,2,'00:21:12','Test notes','2023-10-03T17:54:39Z',1,'2023-10-03T21:15:27Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52013,1016,'ngs','venogia','urgent_quest','global','level80r',1,2,'00:15:43','Test notes','2023-03-03T13:08:54Z',1,'2023-03-03T23:37:59Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52014,1011,'ngs','venogia','urgent_quest','japan','60r',1,2,'00:18:49','Test notes','2023-02-08T21:28:22Z',1,'2023-02-09T03:31:09Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52015,1012,'ngs','venogia','urgent_quest','global','pre60r',1,2,'00:21:14','Test notes','2023-12-03T22:42:13Z',1,'2023-12-04T07:12:13Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52016,1012,'ngs','venogia','urgent_quest','global','level80r',1,2,'00:20:07','New Time succeeds old run','2023-09-26T01:51:57Z',1,'2023-09-26T12:48:36Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (52017,5000000,'ngs','venogia','urgent_quest','global','level80r',1,2,'00:24:16','Test not yet approved run','2023-08-10T00:47:56Z',0,NULL,NULL,NULL,NULL),
  (52018,5000000,'ngs','venogia','urgent_quest','japan','level80r',1,2,'00:23:41','Test not yet approved run 2','2023-08-05T23:36:32Z',0,NULL,NULL,NULL,NULL),
  (52019,5000000,'ngs','venogia','urgent_quest','japan','level80r',1,2,'00:24:55','Test reject run','2023-07-25T01:23:16Z',9,'2023-07-25T03:23:16Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (52000,52000,1001,0,'https://youtu.be/2f75ae552187',N'trying_to_rid_this_name','ngs_bouncer','ngs_gunner',NULL),
  (52001,52000,1006,0,'https://youtu.be/1a04d5c7b57a',N'trying_to_rid_this_name','ngs_hunter','ngs_gunner',NULL),
  
  (52002,52001,1017,0,'https://youtu.be/907cefc94973',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter',NULL),
  (52003,52001,1030,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter',NULL),
  
  (52004,52002,1011,0,'https://youtu.be/12162ddabffc',N'trying_to_rid_this_name','ngs_techter','ngs_waker',NULL),
  (52005,52002,1023,0,'https://youtu.be/b7cd5c8123b8',N'trying_to_rid_this_name','ngs_force','ngs_hunter',NULL),
  
  (52006,52003,1013,0,'https://youtu.be/21fbc427931e',N'trying_to_rid_this_name','ngs_waker','ngs_fighter',NULL),
  (52007,52003,1025,0,'https://youtu.be/78a50fe11607',N'trying_to_rid_this_name','ngs_slayer','ngs_force',NULL),
  
  (52008,52004,5000000,0,'https://youtu.be/66ed0f984112',N'trying_to_rid_this_name','ngs_braver','ngs_gunner',NULL),
  (52009,52004,1021,0,'https://youtu.be/963b75345ea2',N'trying_to_rid_this_name','ngs_ranger','ngs_gunner',NULL),
  
  (52010,52005,1011,0,'https://youtu.be/20565b60cbdf',N'trying_to_rid_this_name','ngs_gunner','ngs_ranger',NULL),
  (52011,52005,5000000,0,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_hunter',NULL),
  
  (52012,52006,1012,0,'https://youtu.be/b76ff9a55f46',N'trying_to_rid_this_name','ngs_gunner','ngs_techter',NULL),
  (52013,52006,1020,0,'https://youtu.be/357ca8806684',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger',NULL),
  
  (52014,52007,1013,0,'https://youtu.be/57da0dd6d0ae',N'trying_to_rid_this_name','ngs_hunter','ngs_gunner',NULL),
  (52015,52007,1018,0,'https://youtu.be/a0a4408f7b23',N'trying_to_rid_this_name','ngs_gunner','ngs_waker',NULL),
  
  (52016,52008,1014,0,'https://youtu.be/cbe0dc29e147',N'trying_to_rid_this_name','ngs_hunter','ngs_force',NULL),
  (52017,52008,1010,0,'https://youtu.be/c03251810f64',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger',NULL),
  
  (52018,52009,1013,0,'https://youtu.be/b246e7e1a5d8',N'trying_to_rid_this_name','ngs_ranger','ngs_techter',NULL),
  (52019,52009,1017,0,'https://youtu.be/15c8d98e3071',N'trying_to_rid_this_name','ngs_slayer','ngs_techter',NULL),
  
  (52020,52010,1015,0,'https://youtu.be/4dab79d05596',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter',NULL),
  (52021,52010,1030,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_hunter',NULL),
  
  (52022,52011,1014,0,'https://youtu.be/8e6a386f8ef0',N'trying_to_rid_this_name','ngs_waker','ngs_fighter',NULL),
  (52023,52011,1010,0,'https://youtu.be/d4a7a95f5e2e',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter',NULL),
  
  (52024,52012,1017,0,'https://youtu.be/bf4f4dc3a4d5',N'trying_to_rid_this_name','ngs_bouncer','ngs_gunner',NULL),
  (52025,52012,1011,0,'https://youtu.be/958cf3600866',N'trying_to_rid_this_name','ngs_ranger','ngs_waker',NULL),
  
  (52026,52013,1016,0,'https://youtu.be/f04ae2f908b5',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter',NULL),
  (52027,52013,1022,0,'https://youtu.be/fa23154dc1e4',N'trying_to_rid_this_name','ngs_techter','ngs_hunter',NULL),
  
  (52028,52014,1011,0,'https://youtu.be/7caff83e7ade',N'trying_to_rid_this_name','ngs_fighter','ngs_gunner',NULL),
  (52029,52014,1026,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_force',NULL),
  
  (52030,52015,1012,0,'https://youtu.be/acb9f2dd16bd',N'trying_to_rid_this_name','ngs_bouncer','ngs_waker',NULL),
  (52031,52015,1016,0,'https://youtu.be/1ac3cf26d11b',N'trying_to_rid_this_name','ngs_braver','ngs_slayer',NULL),
  
  (52032,52016,1012,0,'https://youtu.be/c6b13305c6a9',N'trying_to_rid_this_name','ngs_braver','ngs_gunner',NULL),
  (52033,52016,1016,0,'https://youtu.be/c9331a7d9825',N'trying_to_rid_this_name','ngs_hunter','ngs_fighter',NULL),
  
  (52034,52017,5000000,0,'https://youtu.be/acc3905bccc0',N'trying_to_rid_this_name','ngs_force','ngs_ranger',NULL),
  (52035,52017,1022,0,'https://youtu.be/024ecfcbdd9a',N'trying_to_rid_this_name','ngs_braver','ngs_ranger',NULL),
  
  (52036,52018,5000000,0,'https://youtu.be/9ab6f85d7d81',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger',NULL),
  (52037,52018,1030,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_force',NULL),
  
  (52038,52019,5000000,0,'https://youtu.be/58fac0c23e96',N'trying_to_rid_this_name','ngs_force','ngs_waker',NULL),
  (52039,52019,1029,0,'https://youtu.be/b1ca6823675f',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger',NULL)

;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Venogia Party
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (53000,1001,'ngs','venogia','urgent_quest','global','level80r',1,8,'00:18:57','Test notes','2023-12-12T20:43:13Z',1,'2023-12-13T00:57:50Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53001,1017,'ngs','venogia','urgent_quest','japan','level80r',1,8,'00:18:43','Test notes','2023-07-05T17:06:00Z',1,'2023-07-06T02:04:16Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53002,1011,'ngs','venogia','urgent_quest','global','60r',1,8,'00:22:46','Test notes','2023-04-02T17:23:04Z',1,'2023-04-02T21:50:26Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53003,1013,'ngs','venogia','urgent_quest','global','pre60r',1,8,'00:15:03','Test notes','2023-12-01T13:38:54Z',1,'2023-12-01T19:31:15Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53004,5000000,'ngs','venogia','urgent_quest','global','pot6r',1,8,'00:21:29','Test notes','2023-05-26T10:41:36Z',1,'2023-05-26T16:30:01Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53005,1011,'ngs','venogia','urgent_quest','japan','pre60r',1,8,'00:19:44','Test notes','2023-06-05T05:45:19Z',1,'2023-06-05T07:12:28Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53006,1012,'ngs','venogia','urgent_quest','global','level75r',1,8,'00:17:43','Test notes','2023-09-22T18:02:45Z',1,'2023-09-23T03:32:09Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53007,1013,'ngs','venogia','urgent_quest','global','lvl80grind',1,8,'00:19:50','Test notes','2023-09-06T11:35:06Z',1,'2023-09-06T17:36:57Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53008,1014,'ngs','venogia','urgent_quest','japan','60r',1,8,'00:21:09','Test notes','2023-05-19T17:36:10Z',1,'2023-05-19T20:21:44Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53009,1013,'ngs','venogia','urgent_quest','japan','60r',1,8,'00:16:26','Test notes','2023-05-23T02:35:52Z',1,'2023-05-23T13:32:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53010,1015,'ngs','venogia','urgent_quest','global','pre60r',1,8,'00:18:31','Test notes','2023-12-13T17:51:20Z',1,'2023-12-14T03:23:27Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53011,1014,'ngs','venogia','urgent_quest','japan','level75r',1,8,'00:22:56','Test notes','2023-08-13T11:09:16Z',1,'2023-08-13T16:01:47Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53012,1017,'ngs','venogia','urgent_quest','global','level75r',1,8,'00:16:33','Test notes','2023-11-25T15:35:39Z',1,'2023-11-25T22:22:29Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53013,1016,'ngs','venogia','urgent_quest','global','level80r',1,8,'00:21:59','Test notes','2023-10-04T17:02:10Z',1,'2023-10-04T17:17:43Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53014,1011,'ngs','venogia','urgent_quest','japan','60r',1,8,'00:15:06','Test notes','2023-05-25T12:36:46Z',1,'2023-05-25T21:38:34Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53015,1012,'ngs','venogia','urgent_quest','global','pre60r',1,8,'00:23:40','Test notes','2023-10-01T06:29:21Z',1,'2023-10-01T10:57:44Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53016,1012,'ngs','venogia','urgent_quest','global','level80r',1,8,'00:23:20','New Time succeeds old run','2023-03-22T22:18:23Z',1,'2023-03-23T08:45:12Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (53017,5000000,'ngs','venogia','urgent_quest','global','level80r',1,8,'00:24:49','Test not yet approved run','2023-12-05T23:25:44Z',0,NULL,NULL,NULL,NULL),
  (53018,5000000,'ngs','venogia','urgent_quest','japan','level80r',1,8,'00:21:59','Test not yet approved run 2','2023-03-05T22:16:12Z',0,NULL,NULL,NULL,NULL),
  (53019,5000000,'ngs','venogia','urgent_quest','global','level80r',1,8,'00:18:55','Test reject run','2023-12-09T00:49:35Z',9,NULL,'Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (53000,53000,1001,0,'https://youtu.be/615d0cda598f',N'trying_to_rid_this_name','ngs_bouncer','ngs_force', NULL),
  (53001,53000,1014,0,'https://youtu.be/e7b04887cbb5',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer', NULL),
  (53002,53000,1003,0,'https://youtu.be/f56c221303be',N'trying_to_rid_this_name','ngs_force','ngs_fighter', NULL),
  (53003,53000,1012,0,'https://youtu.be/47e60a59444d',N'trying_to_rid_this_name','ngs_ranger','ngs_slayer', NULL),
  (53004,53000,1002,1,'https://youtu.be/8f8cf6e4c6b9',N'trying_to_rid_this_name','ngs_ranger','ngs_force', NULL),
  (53005,53000,5000000,1,'https://youtu.be/46e519ffd028',N'trying_to_rid_this_name','ngs_hunter','ngs_braver', NULL),
  (53006,53000,1005,1,'https://youtu.be/3029c188a8b0',N'trying_to_rid_this_name','ngs_force','ngs_fighter', NULL),
  (53007,53000,1006,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_ranger', NULL),

  (53008,53001,1017,0,'https://youtu.be/6da1c17118d3',N'trying_to_rid_this_name','ngs_hunter','ngs_techter', NULL),
  (53009,53001,1013,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_force', NULL),
  (53010,53001,1016,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer', NULL),
  (53011,53001,1018,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_gunner', NULL),
  (53012,53001,1009,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_braver', NULL),
  (53013,53001,1005,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_ranger', NULL),
  (53014,53001,1012,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_slayer', NULL),
  (53015,53001,1026,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_waker', NULL),

  (53016,53002,1011,0,'https://youtu.be/5b6d984f4821',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer', NULL),
  (53017,53002,1023,0,'https://youtu.be/1acc45a696dd',N'trying_to_rid_this_name','ngs_bouncer','ngs_gunner', NULL),
  (53018,53002,1021,0,'https://youtu.be/1c6f027e6420',N'trying_to_rid_this_name','ngs_force','ngs_techter', NULL),
  (53019,53002,1019,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_ranger', NULL),
  (53020,53002,1030,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer', NULL),
  (53021,53002,1007,1,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_waker', NULL),
  (53022,53002,1027,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_braver', NULL),
  (53023,53002,1029,1,'https://youtu.be/76399eb7fd4b',N'trying_to_rid_this_name','ngs_hunter','ngs_fighter', NULL),

  (53024,53003,1013,0,'https://youtu.be/2a199ef3cb96',N'trying_to_rid_this_name','ngs_braver','ngs_hunter', NULL),
  (53025,53003,1009,0,'https://youtu.be/ca98b510cbc9',N'trying_to_rid_this_name','ngs_ranger','ngs_slayer', NULL),
  (53026,53003,1004,0,'https://youtu.be/edda2af8a573',N'trying_to_rid_this_name','ngs_ranger','ngs_slayer', NULL),
  (53027,53003,1028,0,'https://youtu.be/51b8769bf1c9',N'trying_to_rid_this_name','ngs_waker','ngs_fighter', NULL),
  (53028,53003,1006,1,'https://youtu.be/67ab8c3b5651',N'trying_to_rid_this_name','ngs_braver','ngs_force', NULL),
  (53029,53003,1001,1,'https://youtu.be/8eccf68cc323',N'trying_to_rid_this_name','ngs_gunner','ngs_braver', NULL),
  (53030,53003,1010,1,'https://youtu.be/c4ddf1ac1eee',N'trying_to_rid_this_name','ngs_waker','ngs_force', NULL),
  (53031,53003,1022,1,'https://youtu.be/e54bb3e9bb33',N'trying_to_rid_this_name','ngs_bouncer','ngs_waker', NULL),

  (53032,53004,5000000,0,'https://youtu.be/e8587c8a2ff5',N'trying_to_rid_this_name','ngs_slayer','ngs_techter', NULL),
  (53033,53004,1010,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_bouncer', NULL),
  (53034,53004,1008,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer', NULL),
  (53035,53004,1009,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunter', NULL),
  (53036,53004,1030,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_braver', NULL),
  (53037,53004,1026,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_gunner', NULL),
  (53038,53004,1003,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_braver', NULL),
  (53039,53004,1013,1,'https://youtu.be/2a0f09f68a72',N'trying_to_rid_this_name','ngs_gunner','ngs_techter', NULL),

  (53040,53005,1011,0,'https://youtu.be/4b4c4521e3fe',N'trying_to_rid_this_name','ngs_waker','ngs_techter', NULL),
  (53041,53005,1010,0,'https://youtu.be/58374e339aa5',N'trying_to_rid_this_name','ngs_bouncer','ngs_waker', NULL),
  (53042,53005,1026,0,'https://youtu.be/ecd34c83d0c4',N'trying_to_rid_this_name','ngs_waker','ngs_hunter', NULL),
  (53043,53005,1001,0,'https://youtu.be/48cc2aefc421',N'trying_to_rid_this_name','ngs_braver','ngs_ranger', NULL),
  (53044,53005,1002,1,'https://youtu.be/bd40e6bdcf45',N'trying_to_rid_this_name','ngs_slayer','ngs_waker', NULL),
  (53045,53005,5000000,1,'https://youtu.be/f5d507c2ef3a',N'trying_to_rid_this_name','ngs_slayer','ngs_force', NULL),
  (53046,53005,1024,1,'https://youtu.be/74f43d4f8213',N'trying_to_rid_this_name','ngs_techter','ngs_waker', NULL),
  (53047,53005,1027,1,'https://youtu.be/7423efbaf930',N'trying_to_rid_this_name','ngs_hunter','ngs_waker', NULL),

  (53048,53006,1012,0,'https://youtu.be/5e5672fc7604',N'trying_to_rid_this_name','ngs_gunner','ngs_ranger', NULL),
  (53049,53006,1004,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_ranger', NULL),
  (53050,53006,1028,0,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_hunter', NULL),
  (53051,53006,1015,0,'https://youtu.be/191f8cff35ca',N'trying_to_rid_this_name','ngs_gunner','ngs_braver', NULL),
  (53052,53006,1027,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_force', NULL),
  (53053,53006,1003,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_ranger', NULL),
  (53054,53006,1007,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_slayer', NULL),
  (53055,53006,1011,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_ranger', NULL),

  (53056,53007,1013,0,'https://youtu.be/c1483d2ff265',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer', NULL),
  (53057,53007,1020,0,'https://youtu.be/06d7990d549d',N'trying_to_rid_this_name','ngs_force','ngs_hunter', NULL),
  (53058,53007,1023,0,'https://youtu.be/5752958c9ce1',N'trying_to_rid_this_name','ngs_hunter','ngs_fighter', NULL),
  (53059,53007,1007,0,'https://youtu.be/2c478ea10dc7',N'trying_to_rid_this_name','ngs_slayer','ngs_force', NULL),
  (53060,53007,1025,1,'https://youtu.be/79d478b478af',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer', NULL),
  (53061,53007,1014,1,'https://youtu.be/943fc8618520',N'trying_to_rid_this_name','ngs_waker','ngs_ranger', NULL),
  (53062,53007,1003,1,'https://youtu.be/088d3079b14b',N'trying_to_rid_this_name','ngs_ranger','ngs_slayer', NULL),
  (53063,53007,1009,1,'https://youtu.be/565636fd64c7',N'trying_to_rid_this_name','ngs_gunner','ngs_ranger', NULL),

  (53064,53008,1014,0,'https://youtu.be/9832b6b4bf20',N'trying_to_rid_this_name','ngs_braver','ngs_hunter', NULL),
  (53065,53008,1005,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunter', NULL),
  (53066,53008,1013,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_gunner', NULL),
  (53067,53008,1017,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_techter', NULL),
  (53068,53008,1003,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_force', NULL),
  (53069,53008,1006,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_bouncer', NULL),
  (53070,53008,1025,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_bouncer', NULL),
  (53071,53008,1024,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_techter', NULL),

  (53072,53009,1013,0,'https://youtu.be/444fdc11bb28',N'trying_to_rid_this_name','ngs_fighter','ngs_techter', NULL),
  (53073,53009,1012,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_hunter', NULL),
  (53074,53009,5000000,0,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_gunner', NULL),
  (53075,53009,1006,0,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_fighter', NULL),
  (53076,53009,1015,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_force', NULL),
  (53077,53009,1007,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_force', NULL),
  (53078,53009,1016,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_fighter', NULL),
  (53079,53009,1011,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_techter', NULL),

  (53080,53010,1015,0,'https://youtu.be/64d0d7b3a269',N'trying_to_rid_this_name','ngs_gunner','ngs_ranger', NULL),
  (53081,53010,1012,0,'https://youtu.be/80a2cfed5ec0',N'trying_to_rid_this_name','ngs_hunter','ngs_waker', NULL),
  (53082,53010,1007,0,'https://youtu.be/540b6dad2fdc',N'trying_to_rid_this_name','ngs_slayer','ngs_force', NULL),
  (53083,53010,1006,0,'https://youtu.be/8abacec6eecb',N'trying_to_rid_this_name','ngs_slayer','ngs_fighter', NULL),
  (53084,53010,1029,1,'https://youtu.be/b036216a0562',N'trying_to_rid_this_name','ngs_force','ngs_fighter', NULL),
  (53085,53010,1023,1,'https://youtu.be/9336a7d22216',N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer', NULL),
  (53086,53010,1027,1,'https://youtu.be/4d7e86160f7d',N'trying_to_rid_this_name','ngs_techter','ngs_ranger', NULL),
  (53087,53010,1008,1,'https://youtu.be/d11ec9742160',N'trying_to_rid_this_name','ngs_ranger','ngs_fighter', NULL),

  (53088,53011,1014,0,'https://youtu.be/402b0684f4e2',N'trying_to_rid_this_name','ngs_gunner','ngs_braver', NULL),
  (53089,53011,1011,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_gunner', NULL),
  (53090,53011,1007,0,'https://youtu.be/8cee01250f00',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter', NULL),
  (53091,53011,1022,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_braver', NULL),
  (53092,53011,1029,1,'https://youtu.be/3bd5b7236e00',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger', NULL),
  (53093,53011,1015,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_fighter', NULL),
  (53094,53011,1030,1,'https://youtu.be/78341233bfad',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer', NULL),
  (53095,53011,1021,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_waker', NULL),

  (53096,53012,1017,0,'https://youtu.be/21309231a857',N'trying_to_rid_this_name','ngs_force','ngs_slayer', NULL),
  (53097,53012,1011,0,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_gunner', NULL),
  (53098,53012,1028,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_fighter', NULL),
  (53099,53012,1019,0,'https://youtu.be/d6c57691e0e5',N'trying_to_rid_this_name','ngs_force','ngs_waker', NULL),
  (53100,53012,1030,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_waker', NULL),
  (53101,53012,1018,1,'https://youtu.be/fb0e6d1e306f',N'trying_to_rid_this_name','ngs_braver','ngs_waker', NULL),
  (53102,53012,1003,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_braver', NULL),
  (53103,53012,1001,1,'https://youtu.be/57a545c540a6',N'trying_to_rid_this_name','ngs_waker','ngs_braver', NULL),

  (53104,53013,1016,0,'https://youtu.be/baefc7762fbc',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer', NULL),
  (53105,53013,1013,0,'https://youtu.be/32fee6ebec56',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver', NULL),
  (53106,53013,1025,0,'https://youtu.be/dd4e7562137f',N'trying_to_rid_this_name','ngs_fighter','ngs_hunter', NULL),
  (53107,53013,1004,0,'https://youtu.be/61d83b72e793',N'trying_to_rid_this_name','ngs_ranger','ngs_waker', NULL),
  (53108,53013,5000000,1,'https://youtu.be/b722da4a4e33',N'trying_to_rid_this_name','ngs_ranger','ngs_waker', NULL),
  (53109,53013,1011,1,'https://youtu.be/9d48bd9fa6b8',N'trying_to_rid_this_name','ngs_fighter','ngs_hunter', NULL),
  (53110,53013,1020,1,'https://youtu.be/c905a84ab7c2',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver', NULL),
  (53111,53013,1009,1,'https://youtu.be/509989d42afa',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer', NULL),

  (53112,53014,1011,0,'https://youtu.be/798ef453e6bd',N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger', NULL),
  (53113,53014,1015,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger', NULL),
  (53114,53014,1018,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_bouncer', NULL),
  (53115,53014,1006,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_techter', NULL),
  (53116,53014,1022,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_waker', NULL),
  (53117,53014,1029,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger', NULL),
  (53118,53014,1030,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_techter', NULL),
  (53119,53014,1021,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_techter', NULL),

  (53120,53015,1012,0,'https://youtu.be/bb533de095fb',N'trying_to_rid_this_name','ngs_slayer','ngs_techter', NULL),
  (53121,53015,1001,0,'https://youtu.be/b1dc74f87d69',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger', NULL),
  (53122,53015,1007,0,'https://youtu.be/fff011d348d6',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer', NULL),
  (53123,53015,1010,0,'https://youtu.be/bea1ebb08b91',N'trying_to_rid_this_name','ngs_ranger','ngs_force', NULL),
  (53124,53015,1008,1,'https://youtu.be/00f119f1cc9c',N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger', NULL),
  (53125,53015,1023,1,'https://youtu.be/0752941f3684',N'trying_to_rid_this_name','ngs_fighter','ngs_techter', NULL),
  (53126,53015,1022,1,'https://youtu.be/c9fe0cc641d4',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer', NULL),
  (53127,53015,1021,1,'https://youtu.be/0b684e872c27',N'trying_to_rid_this_name','ngs_ranger','ngs_fighter', NULL),

  (53128,53016,1012,0,'https://youtu.be/171f7f08ea7a',N'trying_to_rid_this_name','ngs_techter','ngs_ranger', NULL),
  (53129,53016,1023,0,'https://youtu.be/e4f24570d95b',N'trying_to_rid_this_name','ngs_gunner','ngs_braver', NULL),
  (53130,53016,1030,0,'https://youtu.be/e30e875ed34c',N'trying_to_rid_this_name','ngs_gunner','ngs_braver', NULL),
  (53131,53016,5000000,0,'https://youtu.be/0f1fea721dc0',N'trying_to_rid_this_name','ngs_ranger','ngs_braver', NULL),
  (53132,53016,1006,1,'https://youtu.be/2963c6e9ffa0',N'trying_to_rid_this_name','ngs_braver','ngs_slayer', NULL),
  (53133,53016,1004,1,'https://youtu.be/3a10ec30553a',N'trying_to_rid_this_name','ngs_gunner','ngs_techter', NULL),
  (53134,53016,1018,1,'https://youtu.be/e579369f8a46',N'trying_to_rid_this_name','ngs_waker','ngs_force', NULL),
  (53135,53016,1008,1,'https://youtu.be/6e1b8e2adb5a',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter', NULL),

  (53136,53017,5000000,0,'https://youtu.be/77887d49574a',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver', NULL),
  (53137,53017,1001,0,'https://youtu.be/ecc7153b72ed',N'trying_to_rid_this_name','ngs_hunter','ngs_slayer', NULL),
  (53138,53017,1005,0,'https://youtu.be/df6358782323',N'trying_to_rid_this_name','ngs_force','ngs_gunner', NULL),
  (53139,53017,1020,0,'https://youtu.be/79a7d4dbe765',N'trying_to_rid_this_name','ngs_hunter','ngs_slayer', NULL),
  (53140,53017,1013,1,'https://youtu.be/45bbe124b1e2',N'trying_to_rid_this_name','ngs_gunner','ngs_waker', NULL),
  (53141,53017,1028,1,'https://youtu.be/3a8c91d786a6',N'trying_to_rid_this_name','ngs_techter','ngs_bouncer', NULL),
  (53142,53017,1017,1,'https://youtu.be/ca5cec065e1e',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger', NULL),
  (53143,53017,1010,1,'https://youtu.be/fe4b0c939ae6',N'trying_to_rid_this_name','ngs_force','ngs_slayer', NULL),

  (53144,53018,5000000,0,'https://youtu.be/7c3e953269f6',N'trying_to_rid_this_name','ngs_techter','ngs_hunter', NULL),
  (53145,53018,1019,0,'https://youtu.be/dddfaaeb80ea',N'trying_to_rid_this_name','ngs_gunner','ngs_ranger', NULL),
  (53146,53018,1012,0,'https://youtu.be/faed458f01c4',N'trying_to_rid_this_name','ngs_ranger','ngs_gunner', NULL),
  (53147,53018,1022,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_techter', NULL),
  (53148,53018,1016,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter', NULL),
  (53149,53018,1002,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_hunter', NULL),
  (53150,53018,1001,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger', NULL),
  (53151,53018,1017,1,'https://youtu.be/40dce2873949',N'trying_to_rid_this_name','ngs_waker','ngs_gunner', NULL),

  (53152,53019,5000000,0,'https://youtu.be/b6c370e2985e',N'trying_to_rid_this_name','ngs_braver','ngs_force', NULL),
  (53153,53019,1005,0,'https://youtu.be/dc2b42927ab3',N'trying_to_rid_this_name','ngs_force','ngs_techter', NULL),
  (53154,53019,1010,0,'https://youtu.be/f04ac0c21a80',N'trying_to_rid_this_name','ngs_waker','ngs_gunner', NULL),
  (53155,53019,1006,0,'https://youtu.be/b19415697643',N'trying_to_rid_this_name','ngs_fighter','ngs_gunner', NULL),
  (53156,53019,1028,1,'https://youtu.be/7fbc63ac4855',N'trying_to_rid_this_name','ngs_fighter','ngs_force', NULL),
  (53157,53019,1019,1,'https://youtu.be/153c6687c347',N'trying_to_rid_this_name','ngs_slayer','ngs_force', NULL),
  (53158,53019,1029,1,'https://youtu.be/7afcbf47427f',N'trying_to_rid_this_name','ngs_waker','ngs_braver', NULL),
  (53159,53019,1021,1,'https://youtu.be/5b938cf1d109',N'trying_to_rid_this_name','ngs_slayer','ngs_force', NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;
