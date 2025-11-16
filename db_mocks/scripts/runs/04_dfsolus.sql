-- DF Solus Solo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (41000,1001,'ngs','dfsolus','quest','japan','lvl80grind',1,1,'00:24:19','Test notes','2023-08-22T14:06:00Z',1,'2023-08-22T23:54:07Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41001,1017,'ngs','dfsolus','quest','global','lvl80grind',1,1,'00:24:39','Test notes','2023-03-31T04:17:37Z',1,'2023-03-31T10:40:45Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41002,1011,'ngs','dfsolus','quest','global','60r',1,1,'00:20:24','Test notes','2023-12-11T18:33:39Z',1,'2023-12-11T21:55:04Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41003,1013,'ngs','dfsolus','quest','japan','pot6r',1,1,'00:24:14','Test notes','2023-10-06T18:19:16Z',1,'2023-10-07T01:25:59Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41004,5000000,'ngs','dfsolus','quest','global','pre60r',1,1,'00:20:36','Test notes','2023-06-20T05:40:37Z',1,'2023-06-20T07:56:45Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41005,1011,'ngs','dfsolus','quest','japan','lvl80grind',1,1,'00:23:29','Test notes','2023-06-11T21:13:41Z',1,'2023-06-12T09:51:27Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41006,1012,'ngs','dfsolus','quest','global','level75r',1,1,'00:23:32','Test notes','2023-09-21T09:52:23Z',1,'2023-09-21T18:05:39Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41007,1013,'ngs','dfsolus','quest','japan','pre60r',1,1,'00:19:33','Test notes','2023-08-26T16:06:11Z',1,'2023-08-26T20:01:21Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41008,1014,'ngs','dfsolus','quest','global','level75r',1,1,'00:16:08','Test notes','2023-06-19T07:16:54Z',1,'2023-06-19T12:14:10Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41009,1013,'ngs','dfsolus','quest','japan','pre60r',1,1,'00:15:34','Test notes','2023-08-27T22:12:25Z',1,'2023-08-28T09:27:15Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41010,1015,'ngs','dfsolus','quest','japan','pot6r',1,1,'00:18:02','Test notes','2023-10-25T04:07:55Z',1,'2023-10-25T14:02:42Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41011,1014,'ngs','dfsolus','quest','japan','pot6r',1,1,'00:16:35','Test notes','2023-06-29T13:23:01Z',1,'2023-06-29T18:02:23Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41012,1017,'ngs','dfsolus','quest','japan','pre60r',1,1,'00:23:35','Test notes','2023-07-20T06:21:41Z',1,'2023-07-20T10:47:13Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41013,1016,'ngs','dfsolus','quest','global','level80r',1,1,'00:21:10','Test notes','2023-06-18T23:21:14Z',1,'2023-06-19T10:44:41Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41014,1011,'ngs','dfsolus','quest','global','lvl80grind',1,1,'00:17:05','Test notes','2023-10-10T17:33:40Z',1,'2023-10-10T19:19:54Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41015,1012,'ngs','dfsolus','quest','global','pre60r',1,1,'00:22:30','Test notes','2023-12-28T18:39:11Z',1,'2023-12-28T21:43:21Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41016,1012,'ngs','dfsolus','quest','global','pre60r',1,1,'00:21:52','New Time succeeds old run','2023-05-17T12:17:43Z',1,'2023-05-18T00:26:54Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (41017,5000000,'ngs','dfsolus','quest','global','60r',1,1,'00:20:05','Test not yet approved run','2023-05-25T12:47:19Z',0,NULL,NULL,NULL,NULL),
  (41018,5000000,'ngs','dfsolus','quest','global','60r',1,1,'00:15:51','Test not yet approved run 2','2023-03-18T00:01:42Z',0,NULL,NULL,NULL,NULL),
  (41019,5000000,'ngs','dfsolus','quest','global','slayer',1,1,'00:19:13','Test reject run','2023-06-20T23:30:33Z',9,'2023-06-21T09:50:26Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (41000,41000,1001,0,'https://youtu.be/6da1c17118d3',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none','["ngs_twin_daggers","ngs_assault_rifle","ngs_rod"]'),
  (41001,41001,1017,0,'https://youtu.be/5b6d984f4821',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none','["ngs_sword","ngs_double_sabers","ngs_bow"]'),
  (41002,41002,1011,0,'https://youtu.be/1acc45a696dd',N'trying_to_rid_this_name','ngs_fighter','ngs_gunner','ngs_none','["ngs_gunblade","ngs_jet_boots","ngs_wand"]'),
  (41003,41003,1013,0,'https://youtu.be/1c6f027e6420',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none','["ngs_double_sabers","ngs_bow","ngs_harmonizer"]'),
  (41004,41004,5000000,0,'https://youtu.be/76399eb7fd4b',N'trying_to_rid_this_name','ngs_slayer','ngs_force','ngs_none','["ngs_partisan","ngs_katana","ngs_assault_rifle"]'),
  (41005,41005,1011,0,'https://youtu.be/2a199ef3cb96',N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none','["ngs_wired_lance","ngs_twin_daggers","ngs_bow"]'),
  (41006,41006,1012,0,'https://youtu.be/ca98b510cbc9',N'trying_to_rid_this_name','ngs_slayer','ngs_force','ngs_none','["ngs_wired_lance","ngs_katana","ngs_assault_rifle"]'),
  (41007,41007,1013,0,'https://youtu.be/edda2af8a573',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none','["ngs_wired_lance","ngs_bow","ngs_talis"]'),
  (41008,41008,1014,0,'https://youtu.be/51b8769bf1c9',N'trying_to_rid_this_name','ngs_waker','ngs_slayer','ngs_none','["ngs_knuckles","ngs_katana","ngs_assault_rifle"]'),
  (41009,41009,1013,0,'https://youtu.be/67ab8c3b5651',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none','["ngs_gunblade","ngs_assault_rifle","ngs_rod"]'),
  (41010,41010,1015,0,'https://youtu.be/8eccf68cc323',N'trying_to_rid_this_name','ngs_waker','ngs_force','ngs_none','["ngs_twin_daggers","ngs_gunblade","ngs_talis"]'),
  (41011,41011,1014,0,'https://youtu.be/c4ddf1ac1eee',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none','["ngs_wired_lance","ngs_jet_boots","ngs_wand"]'),
  (41012,41012,1017,0,'https://youtu.be/e54bb3e9bb33',N'trying_to_rid_this_name','ngs_braver','ngs_fighter','ngs_none','["ngs_talis","ngs_wand","ngs_jet_boots"]'),
  (41013,41013,1016,0,'https://youtu.be/e8587c8a2ff5',N'trying_to_rid_this_name','ngs_hunter','ngs_braver','ngs_none','["ngs_soaring_blades","ngs_bow","ngs_talis"]'),
  (41014,41014,1011,0,'https://youtu.be/2a0f09f68a72',N'trying_to_rid_this_name','ngs_waker','ngs_hunter','ngs_none','["ngs_partisan","ngs_katana","ngs_talis"]'),
  (41015,41015,1012,0,'https://youtu.be/4b4c4521e3fe',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none','["ngs_assault_rifle","ngs_twin_machine_guns","ngs_harmonizer"]'),
  (41016,41016,1012,0,'https://youtu.be/58374e339aa5',N'trying_to_rid_this_name','ngs_force','ngs_braver','ngs_none','["ngs_sword","ngs_wired_lance","ngs_soaring_blades"]'),
  (41017,41017,5000000,0,'https://youtu.be/ecd34c83d0c4',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none','["ngs_wired_lance","ngs_twin_daggers","ngs_katana"]'),
  (41018,41018,5000000,0,'https://youtu.be/48cc2aefc421',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','ngs_none','["ngs_knuckles","ngs_katana","ngs_jet_boots"]'),
  (41019,41019,5000000,0,'https://youtu.be/bd40e6bdcf45',N'trying_to_rid_this_name','ngs_ranger','ngs_waker','ngs_none','["ngs_wired_lance","ngs_soaring_blades","ngs_gunblade"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- DF Solus Duo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (42000,1001,'ngs','dfsolus','quest','japan','60r',1,2,'00:24:38','Test notes','2023-03-24T02:13:00Z',1,'2023-03-24T12:03:11Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42001,1017,'ngs','dfsolus','quest','global','level80r',1,2,'00:15:05','Test notes','2023-09-14T17:29:13Z',1,'2023-09-15T00:32:34Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42002,1011,'ngs','dfsolus','quest','global','lvl80grind',1,2,'00:19:17','Test notes','2023-10-08T10:56:27Z',1,'2023-10-08T12:46:50Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42003,1013,'ngs','dfsolus','quest','japan','level75r',1,2,'00:24:13','Test notes','2023-07-13T16:09:57Z',1,'2023-07-14T03:53:47Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42004,5000000,'ngs','dfsolus','quest','japan','level80r',1,2,'00:18:35','Test notes','2023-03-22T04:30:47Z',1,'2023-03-22T06:00:04Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42005,1011,'ngs','dfsolus','quest','global','slayer',1,2,'00:20:41','Test notes','2023-09-04T13:52:44Z',1,'2023-09-04T19:06:41Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42006,1012,'ngs','dfsolus','quest','japan','pot6r',1,2,'00:15:14','Test notes','2023-03-06T13:19:17Z',1,'2023-03-07T00:17:01Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42007,1013,'ngs','dfsolus','quest','global','pot6r',1,2,'00:18:41','Test notes','2023-06-19T10:41:04Z',1,'2023-06-19T19:59:10Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42008,1014,'ngs','dfsolus','quest','japan','lvl80grind',1,2,'00:22:47','Test notes','2023-12-01T16:00:50Z',1,'2023-12-01T17:01:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42009,1013,'ngs','dfsolus','quest','global','pot6r',1,2,'00:24:31','Test notes','2023-03-18T08:28:52Z',1,'2023-03-18T18:10:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42010,1015,'ngs','dfsolus','quest','japan','pot6r',1,2,'00:15:09','Test notes','2023-10-03T03:45:40Z',1,'2023-10-03T04:33:30Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42011,1014,'ngs','dfsolus','quest','japan','60r',1,2,'00:19:34','Test notes','2023-02-11T21:34:56Z',1,'2023-02-12T01:11:25Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42012,1017,'ngs','dfsolus','quest','global','pre60r',1,2,'00:15:17','Test notes','2023-01-20T10:07:30Z',1,'2023-01-20T18:30:42Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42013,1016,'ngs','dfsolus','quest','japan','level75r',1,2,'00:17:56','Test notes','2023-12-15T01:38:28Z',1,'2023-12-15T14:01:17Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42014,1011,'ngs','dfsolus','quest','japan','level75r',1,2,'00:19:39','Test notes','2023-12-19T06:12:37Z',1,'2023-12-19T15:43:02Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42015,1012,'ngs','dfsolus','quest','japan','level80r',1,2,'00:23:57','Test notes','2023-03-27T03:47:14Z',1,'2023-03-27T04:57:12Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42016,1012,'ngs','dfsolus','quest','global','level75r',1,2,'00:21:04','New Time succeeds old run','2023-06-10T00:57:27Z',1,'2023-06-10T04:09:44Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (42017,5000000,'ngs','dfsolus','quest','global','pre60r',1,2,'00:24:15','Test not yet approved run','2023-02-18T01:12:50Z',0,NULL,NULL,NULL,NULL),
  (42018,5000000,'ngs','dfsolus','quest','japan','pre60r',1,2,'00:17:24','Test not yet approved run 2','2023-05-15T06:55:21Z',0,NULL,NULL,NULL,NULL),
  (42019,5000000,'ngs','dfsolus','quest','global','level80r',1,2,'00:18:50','Test reject run','2023-06-21T01:18:15Z',9,'2023-06-21T11:57:19Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (42000,42000,1001,0,'https://youtu.be/f5d507c2ef3a',N'trying_to_rid_this_name','ngs_hunter','ngs_rang, 'STYLE_CLASS'er',NULL),
  (42001,42000,1006,0,'https://youtu.be/74f43d4f8213',N'trying_to_rid_this_name','ngs_waker','ngs_bounc, 'STYLE_CLASS'er',NULL),
  
  (42002,42001,1017,0,'https://youtu.be/7423efbaf930',N'trying_to_rid_this_name','ngs_braver','ngs_hunt, 'STYLE_CLASS'er',NULL),
  (42003,42001,1030,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_brav, 'STYLE_CLASS'er',NULL),
  
  (42004,42002,1011,0,'https://youtu.be/5e5672fc7604',N'trying_to_rid_this_name','ngs_force','ngs_gunn, 'STYLE_CLASS'er',NULL),
  (42005,42002,1023,0,'https://youtu.be/191f8cff35ca',N'trying_to_rid_this_name','ngs_braver','ngs_techt, 'STYLE_CLASS'er',NULL),
  
  (42006,42003,1013,0,'https://youtu.be/c1483d2ff265',N'trying_to_rid_this_name','ngs_force','ngs_fight, 'STYLE_CLASS'er',NULL),
  (42007,42003,1025,0,'https://youtu.be/06d7990d549d',N'trying_to_rid_this_name','ngs_fighter','ngs_for, 'STYLE_CLASS'ce',NULL),
  
  (42008,42004,5000000,0,'https://youtu.be/5752958c9ce1',N'trying_to_rid_this_name','ngs_braver','ngs_rang, 'STYLE_CLASS'er',NULL),
  (42009,42004,1021,0,'https://youtu.be/2c478ea10dc7',N'trying_to_rid_this_name','ngs_slayer','ngs_rang, 'STYLE_CLASS'er',NULL),
  
  (42010,42005,1011,0,'https://youtu.be/79d478b478af',N'trying_to_rid_this_name','ngs_hunter','ngs_techt, 'STYLE_CLASS'er',NULL),
  (42011,42005,5000000,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_gunn, 'STYLE_CLASS'er',NULL),
  
  (42012,42006,1012,0,'https://youtu.be/943fc8618520',N'trying_to_rid_this_name','ngs_ranger','ngs_for, 'STYLE_CLASS'ce',NULL),
  (42013,42006,1020,0,'https://youtu.be/088d3079b14b',N'trying_to_rid_this_name','ngs_braver','ngs_gunn, 'STYLE_CLASS'er',NULL),
  
  (42014,42007,1013,0,'https://youtu.be/565636fd64c7',N'trying_to_rid_this_name','ngs_slayer','ngs_hunt, 'STYLE_CLASS'er',NULL),
  (42015,42007,1018,0,'https://youtu.be/9832b6b4bf20',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunt, 'STYLE_CLASS'er',NULL),
  
  (42016,42008,1014,0,'https://youtu.be/444fdc11bb28',N'trying_to_rid_this_name','ngs_braver','ngs_techt, 'STYLE_CLASS'er',NULL),
  (42017,42008,1010,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_wak, 'STYLE_CLASS'er',NULL),
  
  (42018,42009,1013,0,'https://youtu.be/64d0d7b3a269',N'trying_to_rid_this_name','ngs_slayer','ngs_bounc, 'STYLE_CLASS'er',NULL),
  (42019,42009,1017,0,'https://youtu.be/80a2cfed5ec0',N'trying_to_rid_this_name','ngs_gunner','ngs_fight, 'STYLE_CLASS'er',NULL),
  
  (42020,42010,1015,0,'https://youtu.be/540b6dad2fdc',N'trying_to_rid_this_name','ngs_fighter','ngs_wak, 'STYLE_CLASS'er',NULL),
  (42021,42010,1030,0,'https://youtu.be/8abacec6eecb',N'trying_to_rid_this_name','ngs_gunner','ngs_brav, 'STYLE_CLASS'er',NULL),
  
  (42022,42011,1014,0,'https://youtu.be/b036216a0562',N'trying_to_rid_this_name','ngs_bouncer','ngs_for, 'STYLE_CLASS'ce',NULL),
  (42023,42011,1010,0,'https://youtu.be/9336a7d22216',N'trying_to_rid_this_name','ngs_braver','ngs_gunn, 'STYLE_CLASS'er',NULL),
  
  (42024,42012,1017,0,'https://youtu.be/4d7e86160f7d',N'trying_to_rid_this_name','ngs_braver','ngs_hunt, 'STYLE_CLASS'er',NULL),
  (42025,42012,1011,0,'https://youtu.be/d11ec9742160',N'trying_to_rid_this_name','ngs_force','ngs_hunt, 'STYLE_CLASS'er',NULL),
  
  (42026,42013,1016,0,'https://youtu.be/402b0684f4e2',N'trying_to_rid_this_name','ngs_braver','ngs_gunn, 'STYLE_CLASS'er',NULL),
  (42027,42013,1022,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_wak, 'STYLE_CLASS'er',NULL),
  
  (42028,42014,1011,0,'https://youtu.be/8cee01250f00',N'trying_to_rid_this_name','ngs_slayer','ngs_techt, 'STYLE_CLASS'er',NULL),
  (42029,42014,1026,0,'https://youtu.be/3bd5b7236e00',N'trying_to_rid_this_name','ngs_force','ngs_techt, 'STYLE_CLASS'er',NULL),
  
  (42030,42015,1012,0,'https://youtu.be/78341233bfad',N'trying_to_rid_this_name','ngs_fighter','ngs_techt, 'STYLE_CLASS'er',NULL),
  (42031,42015,1016,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_rang, 'STYLE_CLASS'er',NULL),
  
  (42032,42016,1012,0,'https://youtu.be/21309231a857',N'trying_to_rid_this_name','ngs_braver','ngs_gunn, 'STYLE_CLASS'er',NULL),
  (42033,42016,1016,0,'https://youtu.be/d6c57691e0e5',N'trying_to_rid_this_name','ngs_hunter','ngs_techt, 'STYLE_CLASS'er',NULL),
  
  (42034,42017,5000000,0,'https://youtu.be/fb0e6d1e306f',N'trying_to_rid_this_name','ngs_techter','ngs_wak, 'STYLE_CLASS'er',NULL),
  (42035,42017,1022,0,'https://youtu.be/57a545c540a6',N'trying_to_rid_this_name','ngs_fighter','ngs_techt, 'STYLE_CLASS'er',NULL),
  
  (42036,42018,5000000,0,'https://youtu.be/baefc7762fbc',N'trying_to_rid_this_name','ngs_gunner','ngs_for, 'STYLE_CLASS'ce',NULL),
  (42037,42018,1030,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_bounc, 'STYLE_CLASS'er',NULL),
  
  (42038,42019,5000000,0,'https://youtu.be/32fee6ebec56',N'trying_to_rid_this_name','ngs_bouncer','ngs_fight, 'STYLE_CLASS'er',NULL),
  (42039,42019,1029,0,'https://youtu.be/dd4e7562137f',N'trying_to_rid_this_name','ngs_fighter','ngs_techt, 'STYLE_CLASS'er',NULL)

;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- DF Solus Party
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (43000,1001,'ngs','dfsolus','quest','global','lvl80grind',1,4,'00:23:55','Test notes','2023-11-10T07:44:12Z',1,'2023-11-10T13:31:33Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43001,1017,'ngs','dfsolus','quest','global','level75r',1,4,'00:19:58','Test notes','2023-11-19T12:19:03Z',1,'2023-11-19T16:46:37Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43002,1011,'ngs','dfsolus','quest','global','pot6r',1,4,'00:22:39','Test notes','2023-01-11T05:01:48Z',1,'2023-01-11T05:33:05Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43003,1013,'ngs','dfsolus','quest','global','60r',1,4,'00:19:17','Test notes','2023-08-15T00:59:20Z',1,'2023-08-15T08:06:57Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43004,5000000,'ngs','dfsolus','quest','global','pot6r',1,4,'00:22:07','Test notes','2023-08-10T12:56:35Z',1,'2023-08-10T23:00:29Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43005,1011,'ngs','dfsolus','quest','global','slayer',1,4,'00:23:13','Test notes','2023-01-15T09:58:33Z',1,'2023-01-15T14:27:48Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43006,1012,'ngs','dfsolus','quest','japan','lvl80grind',1,4,'00:24:40','Test notes','2023-05-14T09:55:58Z',1,'2023-05-14T14:11:41Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43007,1013,'ngs','dfsolus','quest','global','pot6r',1,4,'00:21:51','Test notes','2023-01-28T19:37:30Z',1,'2023-01-29T07:16:10Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43008,1014,'ngs','dfsolus','quest','global','slayer',1,4,'00:18:52','Test notes','2023-06-22T21:58:44Z',1,'2023-06-23T05:54:16Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43009,1013,'ngs','dfsolus','quest','japan','60r',1,4,'00:24:33','Test notes','2023-12-26T17:57:38Z',1,'2023-12-27T00:22:08Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43010,1015,'ngs','dfsolus','quest','japan','level80r',1,4,'00:20:09','Test notes','2023-12-08T06:39:26Z',1,'2023-12-08T15:59:53Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43011,1014,'ngs','dfsolus','quest','global','pot6r',1,4,'00:23:31','Test notes','2023-03-20T04:20:00Z',1,'2023-03-20T12:18:00Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43012,1017,'ngs','dfsolus','quest','global','level75r',1,4,'00:20:49','Test notes','2023-05-24T23:40:04Z',1,'2023-05-25T03:03:30Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43013,1016,'ngs','dfsolus','quest','japan','pot6r',1,4,'00:16:29','Test notes','2023-05-21T15:19:45Z',1,'2023-05-21T16:19:33Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43014,1011,'ngs','dfsolus','quest','global','lvl80grind',1,4,'00:16:51','Test notes','2023-07-12T23:26:07Z',1,'2023-07-13T10:38:39Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43015,1012,'ngs','dfsolus','quest','japan','lvl80grind',1,4,'00:23:47','Test notes','2023-02-05T11:12:26Z',1,'2023-02-05T15:36:57Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43016,1012,'ngs','dfsolus','quest','japan','60r',1,4,'00:22:03','New Time succeeds old run','2023-11-30T02:06:02Z',1,'2023-11-30T13:02:13Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (43017,5000000,'ngs','dfsolus','quest','global','level75r',1,4,'00:22:24','Test not yet approved run','2023-06-04T18:11:40Z',0,NULL,NULL,NULL,NULL),
  (43018,5000000,'ngs','dfsolus','quest','japan','pot6r',1,4,'00:21:07','Test not yet approved run 2','2023-06-10T21:36:28Z',0,NULL,NULL,NULL,NULL),
  (43019,5000000,'ngs','dfsolus','quest','global','pre60r',1,4,'00:18:53','Test reject run','2023-01-08T10:16:09Z',9,'2023-01-08T14:17:35Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (43000,43000,1001,0,'https://youtu.be/61d83b72e793',N'trying_to_rid_this_name','ngs_techter','ngs_bounc, 'STYLE_CLASS'er',NULL),
  (43001,43000,1019,0,'https://youtu.be/b722da4a4e33',N'trying_to_rid_this_name','ngs_slayer','ngs_bounc, 'STYLE_CLASS'er',NULL),
  (43002,43000,1030,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_for, 'STYLE_CLASS'ce',NULL),
  (43003,43000,1017,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_wak, 'STYLE_CLASS'er',NULL),
  
  (43004,43001,1017,0,'https://youtu.be/9d48bd9fa6b8',N'trying_to_rid_this_name','ngs_slayer','ngs_techt, 'STYLE_CLASS'er',NULL),
  (43005,43001,1027,0,'https://youtu.be/c905a84ab7c2',N'trying_to_rid_this_name','ngs_techter','ngs_for, 'STYLE_CLASS'ce',NULL),
  (43006,43001,1023,0,'https://youtu.be/509989d42afa',N'trying_to_rid_this_name','ngs_gunner','ngs_slay, 'STYLE_CLASS'er',NULL),
  (43007,43001,1028,0,'https://youtu.be/798ef453e6bd',N'trying_to_rid_this_name','ngs_slayer','ngs_brav, 'STYLE_CLASS'er',NULL),
  
  (43008,43002,1011,0,'https://youtu.be/bb533de095fb',N'trying_to_rid_this_name','ngs_techter','ngs_wak, 'STYLE_CLASS'er',NULL),
  (43009,43002,1018,0,'https://youtu.be/b1dc74f87d69',N'trying_to_rid_this_name','ngs_slayer','ngs_techt, 'STYLE_CLASS'er',NULL),
  (43010,43002,1008,0,'https://youtu.be/fff011d348d6',N'trying_to_rid_this_name','ngs_techter','ngs_hunt, 'STYLE_CLASS'er',NULL),
  (43011,43002,1005,0,'https://youtu.be/bea1ebb08b91',N'trying_to_rid_this_name','ngs_waker','ngs_for, 'STYLE_CLASS'ce',NULL),
  
  (43012,43003,1013,0,'https://youtu.be/00f119f1cc9c',N'trying_to_rid_this_name','ngs_fighter','ngs_gunn, 'STYLE_CLASS'er',NULL),
  (43013,43003,1003,0,'https://youtu.be/0752941f3684',N'trying_to_rid_this_name','ngs_hunter','ngs_gunn, 'STYLE_CLASS'er',NULL),
  (43014,43003,1012,0,'https://youtu.be/c9fe0cc641d4',N'trying_to_rid_this_name','ngs_force','ngs_slay, 'STYLE_CLASS'er',NULL),
  (43015,43003,1021,0,'https://youtu.be/0b684e872c27',N'trying_to_rid_this_name','ngs_slayer','ngs_techt, 'STYLE_CLASS'er',NULL),
  
  (43016,43004,5000000,0,'https://youtu.be/171f7f08ea7a',N'trying_to_rid_this_name','ngs_slayer','ngs_brav, 'STYLE_CLASS'er',NULL),
  (43017,43004,1013,0,'https://youtu.be/e4f24570d95b',N'trying_to_rid_this_name','ngs_slayer','ngs_gunn, 'STYLE_CLASS'er',NULL),
  (43018,43004,1025,0,'https://youtu.be/e30e875ed34c',N'trying_to_rid_this_name','ngs_fighter','ngs_wak, 'STYLE_CLASS'er',NULL),
  (43019,43004,1001,0,'https://youtu.be/0f1fea721dc0',N'trying_to_rid_this_name','ngs_ranger','ngs_bounc, 'STYLE_CLASS'er',NULL),
  
  (43020,43005,1011,0,'https://youtu.be/2963c6e9ffa0',N'trying_to_rid_this_name','ngs_waker','ngs_brav, 'STYLE_CLASS'er',NULL),
  (43021,43005,1014,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_wak, 'STYLE_CLASS'er',NULL),
  (43022,43005,1006,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_for, 'STYLE_CLASS'ce',NULL),
  (43023,43005,1026,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_wak, 'STYLE_CLASS'er',NULL),
  
  (43024,43006,1012,0,'https://youtu.be/3a10ec30553a',N'trying_to_rid_this_name','ngs_gunner','ngs_hunt, 'STYLE_CLASS'er',NULL),
  (43025,43006,1019,0,'https://youtu.be/e579369f8a46',N'trying_to_rid_this_name','ngs_bouncer','ngs_slay, 'STYLE_CLASS'er',NULL),
  (43026,43006,1030,0,'https://youtu.be/6e1b8e2adb5a',N'trying_to_rid_this_name','ngs_bouncer','ngs_rang, 'STYLE_CLASS'er',NULL),
  (43027,43006,1017,0,'https://youtu.be/77887d49574a',N'trying_to_rid_this_name','ngs_hunter','ngs_bounc, 'STYLE_CLASS'er',NULL),
  
  (43028,43007,1013,0,'https://youtu.be/ecc7153b72ed',N'trying_to_rid_this_name','ngs_force','ngs_techt, 'STYLE_CLASS'er',NULL),
  (43029,43007,1029,0,'https://youtu.be/df6358782323',N'trying_to_rid_this_name','ngs_fighter','ngs_brav, 'STYLE_CLASS'er',NULL),
  (43030,43007,1027,0,'https://youtu.be/79a7d4dbe765',N'trying_to_rid_this_name','ngs_ranger','ngs_wak, 'STYLE_CLASS'er',NULL),
  (43031,43007,1023,0,'https://youtu.be/45bbe124b1e2',N'trying_to_rid_this_name','ngs_slayer','ngs_gunn, 'STYLE_CLASS'er',NULL),
  
  (43032,43008,1014,0,'https://youtu.be/3a8c91d786a6',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunt, 'STYLE_CLASS'er',NULL),
  (43033,43008,1021,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunt, 'STYLE_CLASS'er',NULL),
  (43034,43008,1012,0,'https://youtu.be/ca5cec065e1e',N'trying_to_rid_this_name','ngs_waker','ngs_slay, 'STYLE_CLASS'er',NULL),
  (43035,43008,1026,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_for, 'STYLE_CLASS'ce',NULL),
  
  (43036,43009,1013,0,'https://youtu.be/fe4b0c939ae6',N'trying_to_rid_this_name','ngs_slayer','ngs_bounc, 'STYLE_CLASS'er',NULL),
  (43037,43009,1011,0,'https://youtu.be/7c3e953269f6',N'trying_to_rid_this_name','ngs_fighter','ngs_wak, 'STYLE_CLASS'er',NULL),
  (43038,43009,1029,0,'https://youtu.be/dddfaaeb80ea',N'trying_to_rid_this_name','ngs_techter','ngs_fight, 'STYLE_CLASS'er',NULL),
  (43039,43009,1013,0,'https://youtu.be/faed458f01c4',N'trying_to_rid_this_name','ngs_techter','ngs_bounc, 'STYLE_CLASS'er',NULL),
  
  (43040,43010,1015,0,'https://youtu.be/40dce2873949',N'trying_to_rid_this_name','ngs_techter','ngs_for, 'STYLE_CLASS'ce',NULL),
  (43041,43010,1010,0,'https://youtu.be/b6c370e2985e',N'trying_to_rid_this_name','ngs_gunner','ngs_for, 'STYLE_CLASS'ce',NULL),
  (43042,43010,1015,0,'https://youtu.be/dc2b42927ab3',N'trying_to_rid_this_name','ngs_braver','ngs_techt, 'STYLE_CLASS'er',NULL),
  (43043,43010,1003,0,'https://youtu.be/f04ac0c21a80',N'trying_to_rid_this_name','ngs_ranger','ngs_bounc, 'STYLE_CLASS'er',NULL),
  
  (43044,43011,1014,0,'https://youtu.be/b19415697643',N'trying_to_rid_this_name','ngs_force','ngs_fight, 'STYLE_CLASS'er',NULL),
  (43045,43011,1017,0,'https://youtu.be/7fbc63ac4855',N'trying_to_rid_this_name','ngs_gunner','ngs_rang, 'STYLE_CLASS'er',NULL),
  (43046,43011,5000000,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_gunn, 'STYLE_CLASS'er',NULL),
  (43047,43011,1028,0,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_brav, 'STYLE_CLASS'er',NULL),
  
  (43048,43012,1017,0,'https://youtu.be/153c6687c347',N'trying_to_rid_this_name','ngs_techter','ngs_bounc, 'STYLE_CLASS'er',NULL),
  (43049,43012,1018,0,'https://youtu.be/7afcbf47427f',N'trying_to_rid_this_name','ngs_techter','ngs_hunt, 'STYLE_CLASS'er',NULL),
  (43050,43012,1015,0,'https://youtu.be/5b938cf1d109',N'trying_to_rid_this_name','ngs_waker','ngs_techt, 'STYLE_CLASS'er',NULL),
  (43051,43012,1021,0,'https://youtu.be/821e791af2a1',N'trying_to_rid_this_name','ngs_slayer','ngs_gunn, 'STYLE_CLASS'er',NULL),
  
  (43052,43013,1016,0,'https://youtu.be/5d78c950b982',N'trying_to_rid_this_name','ngs_gunner','ngs_for, 'STYLE_CLASS'ce',NULL),
  (43053,43013,1005,0,'https://youtu.be/ad0c44a98dbe',N'trying_to_rid_this_name','ngs_waker','ngs_gunn, 'STYLE_CLASS'er',NULL),
  (43054,43013,1001,0,'https://youtu.be/b055f590c918',N'trying_to_rid_this_name','ngs_gunner','ngs_for, 'STYLE_CLASS'ce',NULL),
  (43055,43013,1014,0,'https://youtu.be/542a497b42eb',N'trying_to_rid_this_name','ngs_techter','ngs_rang, 'STYLE_CLASS'er',NULL),
  
  (43056,43014,1011,0,'https://youtu.be/da302fb45d5d',N'trying_to_rid_this_name','ngs_fighter','ngs_slay, 'STYLE_CLASS'er',NULL),
  (43057,43014,1016,0,'https://youtu.be/088eda8ee2b3',N'trying_to_rid_this_name','ngs_force','ngs_bounc, 'STYLE_CLASS'er',NULL),
  (43058,43014,1010,0,'https://youtu.be/73215204b494',N'trying_to_rid_this_name','ngs_ranger','ngs_brav, 'STYLE_CLASS'er',NULL),
  (43059,43014,1030,0,'https://youtu.be/50c220ec4d68',N'trying_to_rid_this_name','ngs_bouncer','ngs_rang, 'STYLE_CLASS'er',NULL),
  
  (43060,43015,1012,0,'https://youtu.be/cee587fbb77a',N'trying_to_rid_this_name','ngs_braver','ngs_techt, 'STYLE_CLASS'er',NULL),
  (43061,43015,1027,0,'https://youtu.be/8531aec4c01c',N'trying_to_rid_this_name','ngs_hunter','ngs_wak, 'STYLE_CLASS'er',NULL),
  (43062,43015,1017,0,'https://youtu.be/fd9db47c3d13',N'trying_to_rid_this_name','ngs_bouncer','ngs_slay, 'STYLE_CLASS'er',NULL),
  (43063,43015,1004,0,'https://youtu.be/fce46d8f8702',N'trying_to_rid_this_name','ngs_ranger','ngs_for, 'STYLE_CLASS'ce',NULL),
  
  (43064,43016,1012,0,'https://youtu.be/82cc60db6544',N'trying_to_rid_this_name','ngs_techter','ngs_slay, 'STYLE_CLASS'er',NULL),
  (43065,43016,1027,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_fight, 'STYLE_CLASS'er',NULL),
  (43066,43016,1017,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_for, 'STYLE_CLASS'ce',NULL),
  (43067,43016,1004,0,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_bounc, 'STYLE_CLASS'er',NULL),
  
  (43068,43017,5000000,0,'https://youtu.be/56669cffebd4',N'trying_to_rid_this_name','ngs_slayer','ngs_hunt, 'STYLE_CLASS'er',NULL),
  (43069,43017,1018,0,'https://youtu.be/c9df579bd86f',N'trying_to_rid_this_name','ngs_waker','ngs_fight, 'STYLE_CLASS'er',NULL),
  (43070,43017,1012,0,'https://youtu.be/1b6305e5cd03',N'trying_to_rid_this_name','ngs_waker','ngs_fight, 'STYLE_CLASS'er',NULL),
  (43071,43017,1007,0,'https://youtu.be/8cb4aa482d10',N'trying_to_rid_this_name','ngs_waker','ngs_slay, 'STYLE_CLASS'er',NULL),
  
  (43072,43018,5000000,0,'https://youtu.be/01e92267b9f3',N'trying_to_rid_this_name','ngs_braver','ngs_techt, 'STYLE_CLASS'er',NULL),
  (43073,43018,1029,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_for, 'STYLE_CLASS'ce',NULL),
  (43074,43018,1017,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_bounc, 'STYLE_CLASS'er',NULL),
  (43075,43018,1001,0,'https://youtu.be/c68bceb750f1',N'trying_to_rid_this_name','ngs_force','ngs_wak, 'STYLE_CLASS'er',NULL),
  
  (43076,43019,5000000,0,'https://youtu.be/0bde426e1cdd',N'trying_to_rid_this_name','ngs_braver','ngs_techt, 'STYLE_CLASS'er',NULL),
  (43077,43019,1018,0,'https://youtu.be/ae779cc51950',N'trying_to_rid_this_name','ngs_techter','ngs_rang, 'STYLE_CLASS'er',NULL),
  (43078,43019,1027,0,'https://youtu.be/2c3a3ec7527c',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunt, 'STYLE_CLASS'er',NULL),
  (43079,43019,1030,0,'https://youtu.be/4f84e2dc9f1f',N'trying_to_rid_this_name','ngs_bouncer','ngs_slay, 'STYLE_CLASS'er',NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Solus multi-Party
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (44000,1001,'ngs','dfsolus','urgent_quest','global','level80r',1,8,'00:18:57','Test notes','2023-12-12T20:43:13Z',1,'2023-12-13T00:57:50Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44001,1017,'ngs','dfsolus','urgent_quest','japan','level80r',1,8,'00:18:43','Test notes','2023-07-05T17:06:00Z',1,'2023-07-06T02:04:16Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44002,1011,'ngs','dfsolus','urgent_quest','global','60r',1,8,'00:22:46','Test notes','2023-04-02T17:23:04Z',1,'2023-04-02T21:50:26Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44003,1013,'ngs','dfsolus','urgent_quest','global','pre60r',1,8,'00:15:03','Test notes','2023-12-01T13:38:54Z',1,'2023-12-01T19:31:15Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44004,5000000,'ngs','dfsolus','urgent_quest','global','pot6r',1,8,'00:21:29','Test notes','2023-05-26T10:41:36Z',1,'2023-05-26T16:30:01Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44005,1011,'ngs','dfsolus','urgent_quest','japan','pre60r',1,8,'00:19:44','Test notes','2023-06-05T05:45:19Z',1,'2023-06-05T07:12:28Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44006,1012,'ngs','dfsolus','urgent_quest','global','level75r',1,8,'00:17:43','Test notes','2023-09-22T18:02:45Z',1,'2023-09-23T03:32:09Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44007,1013,'ngs','dfsolus','urgent_quest','global','lvl80grind',1,8,'00:19:50','Test notes','2023-09-06T11:35:06Z',1,'2023-09-06T17:36:57Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44008,1014,'ngs','dfsolus','urgent_quest','japan','60r',1,8,'00:21:09','Test notes','2023-05-19T17:36:10Z',1,'2023-05-19T20:21:44Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44009,1013,'ngs','dfsolus','urgent_quest','japan','60r',1,8,'00:16:26','Test notes','2023-05-23T02:35:52Z',1,'2023-05-23T13:32:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44010,1015,'ngs','dfsolus','urgent_quest','global','pre60r',1,8,'00:18:31','Test notes','2023-12-13T17:51:20Z',1,'2023-12-14T03:23:27Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44011,1014,'ngs','dfsolus','urgent_quest','japan','level75r',1,8,'00:22:56','Test notes','2023-08-13T11:09:16Z',1,'2023-08-13T16:01:47Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44012,1017,'ngs','dfsolus','urgent_quest','global','level75r',1,8,'00:16:33','Test notes','2023-11-25T15:35:39Z',1,'2023-11-25T22:22:29Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44013,1016,'ngs','dfsolus','urgent_quest','global','level80r',1,8,'00:21:59','Test notes','2023-10-04T17:02:10Z',1,'2023-10-04T17:17:43Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44014,1011,'ngs','dfsolus','urgent_quest','japan','60r',1,8,'00:15:06','Test notes','2023-05-25T12:36:46Z',1,'2023-05-25T21:38:34Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44015,1012,'ngs','dfsolus','urgent_quest','global','pre60r',1,8,'00:23:40','Test notes','2023-10-01T06:29:21Z',1,'2023-10-01T10:57:44Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44016,1012,'ngs','dfsolus','urgent_quest','global','level80r',1,8,'00:23:20','New Time succeeds old run','2023-03-22T22:18:23Z',1,'2023-03-23T08:45:12Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (44017,5000000,'ngs','dfsolus','urgent_quest','global','level80r',1,8,'00:24:49','Test not yet approved run','2023-12-05T23:25:44Z',0,NULL,NULL,NULL,NULL),
  (44018,5000000,'ngs','dfsolus','urgent_quest','japan','level80r',1,8,'00:21:59','Test not yet approved run 2','2023-03-05T22:16:12Z',0,NULL,NULL,NULL,NULL),
  (44019,5000000,'ngs','dfsolus','urgent_quest','global','level80r',1,8,'00:18:55','Test reject run','2023-12-09T00:49:35Z',9,NULL,'Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (44000,44000,1001,0,'https://youtu.be/615d0cda598f',N'trying_to_rid_this_name','ngs_bouncer','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44001,44000,1014,0,'https://youtu.be/e7b04887cbb5',N'trying_to_rid_this_name','ngs_fighter','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44002,44000,1003,0,'https://youtu.be/f56c221303be',N'trying_to_rid_this_name','ngs_force','ngs_fight, 'STYLE_CLASS'er', NULL),
  (44003,44000,1012,0,'https://youtu.be/47e60a59444d',N'trying_to_rid_this_name','ngs_ranger','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44004,44000,1002,1,'https://youtu.be/8f8cf6e4c6b9',N'trying_to_rid_this_name','ngs_ranger','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44005,44000,5000000,1,'https://youtu.be/46e519ffd028',N'trying_to_rid_this_name','ngs_hunter','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44006,44000,1005,1,'https://youtu.be/3029c188a8b0',N'trying_to_rid_this_name','ngs_force','ngs_fight, 'STYLE_CLASS'er', NULL),
  (44007,44000,1006,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_rang, 'STYLE_CLASS'er', NULL),

  (44008,44001,1017,0,'https://youtu.be/6da1c17118d3',N'trying_to_rid_this_name','ngs_hunter','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44009,44001,1013,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44010,44001,1016,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_bounc, 'STYLE_CLASS'er', NULL),
  (44011,44001,1018,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_gunn, 'STYLE_CLASS'er', NULL),
  (44012,44001,1009,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44013,44001,1005,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44014,44001,1012,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44015,44001,1026,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_wak, 'STYLE_CLASS'er', NULL),

  (44016,44002,1011,0,'https://youtu.be/5b6d984f4821',N'trying_to_rid_this_name','ngs_fighter','ngs_bounc, 'STYLE_CLASS'er', NULL),
  (44017,44002,1023,0,'https://youtu.be/1acc45a696dd',N'trying_to_rid_this_name','ngs_bouncer','ngs_gunn, 'STYLE_CLASS'er', NULL),
  (44018,44002,1021,0,'https://youtu.be/1c6f027e6420',N'trying_to_rid_this_name','ngs_force','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44019,44002,1019,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44020,44002,1030,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44021,44002,1007,1,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_wak, 'STYLE_CLASS'er', NULL),
  (44022,44002,1027,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44023,44002,1029,1,'https://youtu.be/76399eb7fd4b',N'trying_to_rid_this_name','ngs_hunter','ngs_fight, 'STYLE_CLASS'er', NULL),

  (44024,44003,1013,0,'https://youtu.be/2a199ef3cb96',N'trying_to_rid_this_name','ngs_braver','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44025,44003,1009,0,'https://youtu.be/ca98b510cbc9',N'trying_to_rid_this_name','ngs_ranger','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44026,44003,1004,0,'https://youtu.be/edda2af8a573',N'trying_to_rid_this_name','ngs_ranger','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44027,44003,1028,0,'https://youtu.be/51b8769bf1c9',N'trying_to_rid_this_name','ngs_waker','ngs_fight, 'STYLE_CLASS'er', NULL),
  (44028,44003,1006,1,'https://youtu.be/67ab8c3b5651',N'trying_to_rid_this_name','ngs_braver','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44029,44003,1001,1,'https://youtu.be/8eccf68cc323',N'trying_to_rid_this_name','ngs_gunner','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44030,44003,1010,1,'https://youtu.be/c4ddf1ac1eee',N'trying_to_rid_this_name','ngs_waker','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44031,44003,1022,1,'https://youtu.be/e54bb3e9bb33',N'trying_to_rid_this_name','ngs_bouncer','ngs_wak, 'STYLE_CLASS'er', NULL),

  (44032,44004,5000000,0,'https://youtu.be/e8587c8a2ff5',N'trying_to_rid_this_name','ngs_slayer','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44033,44004,1010,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_bounc, 'STYLE_CLASS'er', NULL),
  (44034,44004,1008,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_bounc, 'STYLE_CLASS'er', NULL),
  (44035,44004,1009,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44036,44004,1030,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44037,44004,1026,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_gunn, 'STYLE_CLASS'er', NULL),
  (44038,44004,1003,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44039,44004,1013,1,'https://youtu.be/2a0f09f68a72',N'trying_to_rid_this_name','ngs_gunner','ngs_techt, 'STYLE_CLASS'er', NULL),

  (44040,44005,1011,0,'https://youtu.be/4b4c4521e3fe',N'trying_to_rid_this_name','ngs_waker','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44041,44005,1010,0,'https://youtu.be/58374e339aa5',N'trying_to_rid_this_name','ngs_bouncer','ngs_wak, 'STYLE_CLASS'er', NULL),
  (44042,44005,1026,0,'https://youtu.be/ecd34c83d0c4',N'trying_to_rid_this_name','ngs_waker','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44043,44005,1001,0,'https://youtu.be/48cc2aefc421',N'trying_to_rid_this_name','ngs_braver','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44044,44005,1002,1,'https://youtu.be/bd40e6bdcf45',N'trying_to_rid_this_name','ngs_slayer','ngs_wak, 'STYLE_CLASS'er', NULL),
  (44045,44005,5000000,1,'https://youtu.be/f5d507c2ef3a',N'trying_to_rid_this_name','ngs_slayer','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44046,44005,1024,1,'https://youtu.be/74f43d4f8213',N'trying_to_rid_this_name','ngs_techter','ngs_wak, 'STYLE_CLASS'er', NULL),
  (44047,44005,1027,1,'https://youtu.be/7423efbaf930',N'trying_to_rid_this_name','ngs_hunter','ngs_wak, 'STYLE_CLASS'er', NULL),

  (44048,44006,1012,0,'https://youtu.be/5e5672fc7604',N'trying_to_rid_this_name','ngs_gunner','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44049,44006,1004,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44050,44006,1028,0,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44051,44006,1015,0,'https://youtu.be/191f8cff35ca',N'trying_to_rid_this_name','ngs_gunner','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44052,44006,1027,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44053,44006,1003,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44054,44006,1007,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44055,44006,1011,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_rang, 'STYLE_CLASS'er', NULL),

  (44056,44007,1013,0,'https://youtu.be/c1483d2ff265',N'trying_to_rid_this_name','ngs_fighter','ngs_bounc, 'STYLE_CLASS'er', NULL),
  (44057,44007,1020,0,'https://youtu.be/06d7990d549d',N'trying_to_rid_this_name','ngs_force','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44058,44007,1023,0,'https://youtu.be/5752958c9ce1',N'trying_to_rid_this_name','ngs_hunter','ngs_fight, 'STYLE_CLASS'er', NULL),
  (44059,44007,1007,0,'https://youtu.be/2c478ea10dc7',N'trying_to_rid_this_name','ngs_slayer','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44060,44007,1025,1,'https://youtu.be/79d478b478af',N'trying_to_rid_this_name','ngs_hunter','ngs_bounc, 'STYLE_CLASS'er', NULL),
  (44061,44007,1014,1,'https://youtu.be/943fc8618520',N'trying_to_rid_this_name','ngs_waker','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44062,44007,1003,1,'https://youtu.be/088d3079b14b',N'trying_to_rid_this_name','ngs_ranger','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44063,44007,1009,1,'https://youtu.be/565636fd64c7',N'trying_to_rid_this_name','ngs_gunner','ngs_rang, 'STYLE_CLASS'er', NULL),

  (44064,44008,1014,0,'https://youtu.be/9832b6b4bf20',N'trying_to_rid_this_name','ngs_braver','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44065,44008,1005,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44066,44008,1013,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_gunn, 'STYLE_CLASS'er', NULL),
  (44067,44008,1017,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44068,44008,1003,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44069,44008,1006,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_bounc, 'STYLE_CLASS'er', NULL),
  (44070,44008,1025,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_bounc, 'STYLE_CLASS'er', NULL),
  (44071,44008,1024,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_techt, 'STYLE_CLASS'er', NULL),

  (44072,44009,1013,0,'https://youtu.be/444fdc11bb28',N'trying_to_rid_this_name','ngs_fighter','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44073,44009,1012,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44074,44009,5000000,0,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_gunn, 'STYLE_CLASS'er', NULL),
  (44075,44009,1006,0,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_fight, 'STYLE_CLASS'er', NULL),
  (44076,44009,1015,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44077,44009,1007,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44078,44009,1016,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_fight, 'STYLE_CLASS'er', NULL),
  (44079,44009,1011,1,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_techt, 'STYLE_CLASS'er', NULL),

  (44080,44010,1015,0,'https://youtu.be/64d0d7b3a269',N'trying_to_rid_this_name','ngs_gunner','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44081,44010,1012,0,'https://youtu.be/80a2cfed5ec0',N'trying_to_rid_this_name','ngs_hunter','ngs_wak, 'STYLE_CLASS'er', NULL),
  (44082,44010,1007,0,'https://youtu.be/540b6dad2fdc',N'trying_to_rid_this_name','ngs_slayer','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44083,44010,1006,0,'https://youtu.be/8abacec6eecb',N'trying_to_rid_this_name','ngs_slayer','ngs_fight, 'STYLE_CLASS'er', NULL),
  (44084,44010,1029,1,'https://youtu.be/b036216a0562',N'trying_to_rid_this_name','ngs_force','ngs_fight, 'STYLE_CLASS'er', NULL),
  (44085,44010,1023,1,'https://youtu.be/9336a7d22216',N'trying_to_rid_this_name','ngs_ranger','ngs_bounc, 'STYLE_CLASS'er', NULL),
  (44086,44010,1027,1,'https://youtu.be/4d7e86160f7d',N'trying_to_rid_this_name','ngs_techter','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44087,44010,1008,1,'https://youtu.be/d11ec9742160',N'trying_to_rid_this_name','ngs_ranger','ngs_fight, 'STYLE_CLASS'er', NULL),

  (44088,44011,1014,0,'https://youtu.be/402b0684f4e2',N'trying_to_rid_this_name','ngs_gunner','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44089,44011,1011,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_gunn, 'STYLE_CLASS'er', NULL),
  (44090,44011,1007,0,'https://youtu.be/8cee01250f00',N'trying_to_rid_this_name','ngs_gunner','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44091,44011,1022,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44092,44011,1029,1,'https://youtu.be/3bd5b7236e00',N'trying_to_rid_this_name','ngs_slayer','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44093,44011,1015,1,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_fight, 'STYLE_CLASS'er', NULL),
  (44094,44011,1030,1,'https://youtu.be/78341233bfad',N'trying_to_rid_this_name','ngs_gunner','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44095,44011,1021,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_wak, 'STYLE_CLASS'er', NULL),

  (44096,44012,1017,0,'https://youtu.be/21309231a857',N'trying_to_rid_this_name','ngs_force','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44097,44012,1011,0,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_gunn, 'STYLE_CLASS'er', NULL),
  (44098,44012,1028,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_fight, 'STYLE_CLASS'er', NULL),
  (44099,44012,1019,0,'https://youtu.be/d6c57691e0e5',N'trying_to_rid_this_name','ngs_force','ngs_wak, 'STYLE_CLASS'er', NULL),
  (44100,44012,1030,1,NULL,N'trying_to_rid_this_name','ngs_force','ngs_wak, 'STYLE_CLASS'er', NULL),
  (44101,44012,1018,1,'https://youtu.be/fb0e6d1e306f',N'trying_to_rid_this_name','ngs_braver','ngs_wak, 'STYLE_CLASS'er', NULL),
  (44102,44012,1003,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44103,44012,1001,1,'https://youtu.be/57a545c540a6',N'trying_to_rid_this_name','ngs_waker','ngs_brav, 'STYLE_CLASS'er', NULL),

  (44104,44013,1016,0,'https://youtu.be/baefc7762fbc',N'trying_to_rid_this_name','ngs_gunner','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44105,44013,1013,0,'https://youtu.be/32fee6ebec56',N'trying_to_rid_this_name','ngs_bouncer','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44106,44013,1025,0,'https://youtu.be/dd4e7562137f',N'trying_to_rid_this_name','ngs_fighter','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44107,44013,1004,0,'https://youtu.be/61d83b72e793',N'trying_to_rid_this_name','ngs_ranger','ngs_wak, 'STYLE_CLASS'er', NULL),
  (44108,44013,5000000,1,'https://youtu.be/b722da4a4e33',N'trying_to_rid_this_name','ngs_ranger','ngs_wak, 'STYLE_CLASS'er', NULL),
  (44109,44013,1011,1,'https://youtu.be/9d48bd9fa6b8',N'trying_to_rid_this_name','ngs_fighter','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44110,44013,1020,1,'https://youtu.be/c905a84ab7c2',N'trying_to_rid_this_name','ngs_bouncer','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44111,44013,1009,1,'https://youtu.be/509989d42afa',N'trying_to_rid_this_name','ngs_fighter','ngs_slay, 'STYLE_CLASS'er', NULL),

  (44112,44014,1011,0,'https://youtu.be/798ef453e6bd',N'trying_to_rid_this_name','ngs_bouncer','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44113,44014,1015,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44114,44014,1018,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_bounc, 'STYLE_CLASS'er', NULL),
  (44115,44014,1006,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44116,44014,1022,1,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_wak, 'STYLE_CLASS'er', NULL),
  (44117,44014,1029,1,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44118,44014,1030,1,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44119,44014,1021,1,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_techt, 'STYLE_CLASS'er', NULL),

  (44120,44015,1012,0,'https://youtu.be/bb533de095fb',N'trying_to_rid_this_name','ngs_slayer','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44121,44015,1001,0,'https://youtu.be/b1dc74f87d69',N'trying_to_rid_this_name','ngs_hunter','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44122,44015,1007,0,'https://youtu.be/fff011d348d6',N'trying_to_rid_this_name','ngs_fighter','ngs_bounc, 'STYLE_CLASS'er', NULL),
  (44123,44015,1010,0,'https://youtu.be/bea1ebb08b91',N'trying_to_rid_this_name','ngs_ranger','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44124,44015,1008,1,'https://youtu.be/00f119f1cc9c',N'trying_to_rid_this_name','ngs_bouncer','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44125,44015,1023,1,'https://youtu.be/0752941f3684',N'trying_to_rid_this_name','ngs_fighter','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44126,44015,1022,1,'https://youtu.be/c9fe0cc641d4',N'trying_to_rid_this_name','ngs_fighter','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44127,44015,1021,1,'https://youtu.be/0b684e872c27',N'trying_to_rid_this_name','ngs_ranger','ngs_fight, 'STYLE_CLASS'er', NULL),

  (44128,44016,1012,0,'https://youtu.be/171f7f08ea7a',N'trying_to_rid_this_name','ngs_techter','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44129,44016,1023,0,'https://youtu.be/e4f24570d95b',N'trying_to_rid_this_name','ngs_gunner','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44130,44016,1030,0,'https://youtu.be/e30e875ed34c',N'trying_to_rid_this_name','ngs_gunner','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44131,44016,5000000,0,'https://youtu.be/0f1fea721dc0',N'trying_to_rid_this_name','ngs_ranger','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44132,44016,1006,1,'https://youtu.be/2963c6e9ffa0',N'trying_to_rid_this_name','ngs_braver','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44133,44016,1004,1,'https://youtu.be/3a10ec30553a',N'trying_to_rid_this_name','ngs_gunner','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44134,44016,1018,1,'https://youtu.be/e579369f8a46',N'trying_to_rid_this_name','ngs_waker','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44135,44016,1008,1,'https://youtu.be/6e1b8e2adb5a',N'trying_to_rid_this_name','ngs_gunner','ngs_hunt, 'STYLE_CLASS'er', NULL),

  (44136,44017,5000000,0,'https://youtu.be/77887d49574a',N'trying_to_rid_this_name','ngs_bouncer','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44137,44017,1001,0,'https://youtu.be/ecc7153b72ed',N'trying_to_rid_this_name','ngs_hunter','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44138,44017,1005,0,'https://youtu.be/df6358782323',N'trying_to_rid_this_name','ngs_force','ngs_gunn, 'STYLE_CLASS'er', NULL),
  (44139,44017,1020,0,'https://youtu.be/79a7d4dbe765',N'trying_to_rid_this_name','ngs_hunter','ngs_slay, 'STYLE_CLASS'er', NULL),
  (44140,44017,1013,1,'https://youtu.be/45bbe124b1e2',N'trying_to_rid_this_name','ngs_gunner','ngs_wak, 'STYLE_CLASS'er', NULL),
  (44141,44017,1028,1,'https://youtu.be/3a8c91d786a6',N'trying_to_rid_this_name','ngs_techter','ngs_bounc, 'STYLE_CLASS'er', NULL),
  (44142,44017,1017,1,'https://youtu.be/ca5cec065e1e',N'trying_to_rid_this_name','ngs_hunter','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44143,44017,1010,1,'https://youtu.be/fe4b0c939ae6',N'trying_to_rid_this_name','ngs_force','ngs_slay, 'STYLE_CLASS'er', NULL),

  (44144,44018,5000000,0,'https://youtu.be/7c3e953269f6',N'trying_to_rid_this_name','ngs_techter','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44145,44018,1019,0,'https://youtu.be/dddfaaeb80ea',N'trying_to_rid_this_name','ngs_gunner','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44146,44018,1012,0,'https://youtu.be/faed458f01c4',N'trying_to_rid_this_name','ngs_ranger','ngs_gunn, 'STYLE_CLASS'er', NULL),
  (44147,44018,1022,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44148,44018,1016,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44149,44018,1002,1,NULL,N'trying_to_rid_this_name','ngs_ranger','ngs_hunt, 'STYLE_CLASS'er', NULL),
  (44150,44018,1001,1,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_rang, 'STYLE_CLASS'er', NULL),
  (44151,44018,1017,1,'https://youtu.be/40dce2873949',N'trying_to_rid_this_name','ngs_waker','ngs_gunn, 'STYLE_CLASS'er', NULL),

  (44152,44019,5000000,0,'https://youtu.be/b6c370e2985e',N'trying_to_rid_this_name','ngs_braver','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44153,44019,1005,0,'https://youtu.be/dc2b42927ab3',N'trying_to_rid_this_name','ngs_force','ngs_techt, 'STYLE_CLASS'er', NULL),
  (44154,44019,1010,0,'https://youtu.be/f04ac0c21a80',N'trying_to_rid_this_name','ngs_waker','ngs_gunn, 'STYLE_CLASS'er', NULL),
  (44155,44019,1006,0,'https://youtu.be/b19415697643',N'trying_to_rid_this_name','ngs_fighter','ngs_gunn, 'STYLE_CLASS'er', NULL),
  (44156,44019,1028,1,'https://youtu.be/7fbc63ac4855',N'trying_to_rid_this_name','ngs_fighter','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44157,44019,1019,1,'https://youtu.be/153c6687c347',N'trying_to_rid_this_name','ngs_slayer','ngs_for, 'STYLE_CLASS'ce', NULL),
  (44158,44019,1029,1,'https://youtu.be/7afcbf47427f',N'trying_to_rid_this_name','ngs_waker','ngs_brav, 'STYLE_CLASS'er', NULL),
  (44159,44019,1021,1,'https://youtu.be/5b938cf1d109',N'trying_to_rid_this_name','ngs_slayer','ngs_for, 'STYLE_CLASS'ce', NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;