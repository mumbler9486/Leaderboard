-- Duels

-- Nex Aelio
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (31000,1001,'ngs','duels','nex_aelio','global','lvl80grind',1,1,'00:04:50','Test notes','2023-09-06T00:36:57Z',1,'2023-09-06T11:59:25Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (31001,1017,'ngs','duels','nex_aelio','global','level75r',1,1,'00:06:47','Test notes','2023-03-07T13:03:53Z',1,'2023-03-07T23:12:56Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (31002,1011,'ngs','duels','nex_aelio','global','level80r',1,1,'00:03:46','Test notes','2023-04-28T08:07:35Z',1,'2023-04-28T16:28:28Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (31003,1013,'ngs','duels','nex_aelio','global','slayer',1,1,'00:02:25','Test notes','2023-06-22T23:39:31Z',1,'2023-06-23T11:44:13Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (31004,5000000,'ngs','duels','nex_aelio','global','pot6r',1,1,'00:02:00','Test notes','2023-04-30T13:49:42Z',1,'2023-05-01T02:18:36Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (31005,1011,'ngs','duels','nex_aelio','japan','pot6r',1,1,'00:07:09','Test notes','2023-12-05T05:30:07Z',1,'2023-12-05T10:21:04Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (31006,1012,'ngs','duels','nex_aelio','global','lvl80grind',1,1,'00:09:18','Test notes','2023-08-01T09:46:47Z',1,'2023-08-01T21:38:34Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (31007,1013,'ngs','duels','nex_aelio','global','pot6r',1,1,'00:09:54','Test notes','2023-08-14T20:19:52Z',1,'2023-08-15T01:32:18Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (31008,1014,'ngs','duels','nex_aelio','japan','pot6r',1,1,'00:07:09','Test notes','2023-03-23T16:25:10Z',1,'2023-03-23T16:50:54Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (31009,1013,'ngs','duels','nex_aelio','global','60r',1,1,'00:04:18','Test notes','2023-12-30T04:04:17Z',1,'2023-12-30T16:24:34Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (31010,1015,'ngs','duels','nex_aelio','japan','pre60r',1,1,'00:02:17','Test notes','2023-12-19T18:35:06Z',1,'2023-12-20T05:56:14Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (31011,1014,'ngs','duels','nex_aelio','global','level75r',1,1,'00:05:17','Test notes','2023-11-19T20:02:57Z',1,'2023-11-20T07:55:36Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (31012,1017,'ngs','duels','nex_aelio','japan','level75r',1,1,'00:09:07','Test notes','2023-12-24T01:57:38Z',1,'2023-12-24T04:39:40Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (31013,1016,'ngs','duels','nex_aelio','global','level80r',1,1,'00:06:19','Test notes','2023-02-12T08:38:37Z',1,'2023-02-12T14:17:42Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (31014,1011,'ngs','duels','nex_aelio','japan','level75r',1,1,'00:09:49','Test notes','2023-06-04T23:37:19Z',1,'2023-06-05T01:21:53Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (31015,1012,'ngs','duels','nex_aelio','global','pre60r',1,1,'00:10:00','Test notes','2023-11-21T21:24:38Z',1,'2023-11-22T09:17:32Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (31016,1012,'ngs','duels','nex_aelio','global','pre60r',1,1,'00:03:37','New Time succeeds old run','2023-01-27T09:23:05Z',1,'2023-01-27T17:37:18Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (31017,5000000,'ngs','duels','nex_aelio','global','level80r',1,1,'00:03:40','Test not yet approved run','2024-01-06T05:14:05Z',0,NULL,NULL,'{"augments":true}',NULL),
  (31018,5000000,'ngs','duels','nex_aelio','global','lvl80grind',1,1,'00:02:46','Test not yet approved run 2','2023-02-27T13:08:04Z',0,NULL,NULL,'{"augments":true}',NULL),
  (31019,5000000,'ngs','duels','nex_aelio','global','level75r',1,1,'00:04:44','Test reject run','2023-10-28T23:18:50Z',9,'2023-10-29T08:04:06Z','Rejected run','{"augments":false}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (31000,31000,1001,0,'https://youtu.be/bfb61f6fb4d5',N'trying_to_rid_this_name','ngs_fighter','ngs_force','["ngs_sword","ngs_double_sabers","ngs_jet_boots"]'),
  (31001,31001,1017,0,'https://youtu.be/31d104b6fffa',N'trying_to_rid_this_name','ngs_slayer','ngs_force','["ngs_knuckles","ngs_launcher","ngs_harmonizer"]'),
  (31002,31002,1011,0,'https://youtu.be/22aad95f6df4',N'trying_to_rid_this_name','ngs_waker','ngs_braver','["ngs_assault_rifle","ngs_twin_machine_guns","ngs_bow"]'),
  (31003,31003,1013,0,'https://youtu.be/1a9c4f03c4c7',N'trying_to_rid_this_name','ngs_slayer','ngs_force','["ngs_wired_lance","ngs_double_sabers","ngs_bow"]'),
  (31004,31004,5000000,0,'https://youtu.be/bfb16d10b819',N'trying_to_rid_this_name','ngs_techter','ngs_braver','["ngs_sword","ngs_knuckles","ngs_rod"]'),
  (31005,31005,1011,0,'https://youtu.be/561506d08354',N'trying_to_rid_this_name','ngs_waker','ngs_slayer','["ngs_sword","ngs_assault_rifle","ngs_harmonizer"]'),
  (31006,31006,1012,0,'https://youtu.be/c73bc270fe98',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','["ngs_partisan","ngs_soaring_blades","ngs_talis"]'),
  (31007,31007,1013,0,'https://youtu.be/aa7634d07b7e',N'trying_to_rid_this_name','ngs_waker','ngs_force','["ngs_wired_lance","ngs_launcher","ngs_talis"]'),
  (31008,31008,1014,0,'https://youtu.be/7139230df23c',N'trying_to_rid_this_name','ngs_braver','ngs_waker','["ngs_katana","ngs_twin_machine_guns","ngs_rod"]'),
  (31009,31009,1013,0,'https://youtu.be/339a6136e7ea',N'trying_to_rid_this_name','ngs_braver','ngs_fighter','["ngs_wired_lance","ngs_katana","ngs_twin_machine_guns"]'),
  (31010,31010,1015,0,'https://youtu.be/504b82c294ed',N'trying_to_rid_this_name','ngs_hunter','ngs_braver','["ngs_twin_daggers","ngs_launcher","ngs_twin_machine_guns"]'),
  (31011,31011,1014,0,'https://youtu.be/c179d1759f21',N'trying_to_rid_this_name','ngs_waker','ngs_hunter','["ngs_gunblade","ngs_launcher","ngs_harmonizer"]'),
  (31012,31012,1017,0,'https://youtu.be/488714dd09cd',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','["ngs_partisan","ngs_launcher","ngs_talis"]'),
  (31013,31013,1016,0,'https://youtu.be/9db6b69d6df8',N'trying_to_rid_this_name','ngs_force','ngs_braver','["ngs_wired_lance","ngs_knuckles","ngs_rod"]'),
  (31014,31014,1011,0,'https://youtu.be/4799c7382ccd',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','["ngs_gunblade","ngs_rod","ngs_wand"]'),
  (31015,31015,1012,0,'https://youtu.be/1e1933c364d9',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','["ngs_knuckles","ngs_assault_rifle","ngs_twin_machine_guns"]'),
  (31016,31016,1012,0,'https://youtu.be/0bc8c2b2fb13',N'trying_to_rid_this_name','ngs_ranger','ngs_waker','["ngs_double_sabers","ngs_launcher","ngs_wand"]'),
  (31017,31017,5000000,0,'https://youtu.be/7eb62d82a26b',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','["ngs_double_sabers","ngs_bow","ngs_talis"]'),
  (31018,31018,5000000,0,'https://youtu.be/38425bda9de2',N'trying_to_rid_this_name','ngs_waker','ngs_bouncer','["ngs_sword","ngs_twin_daggers","ngs_katana"]'),
  (31019,31019,5000000,0,'https://youtu.be/5952fb046b7c',N'trying_to_rid_this_name','ngs_braver','ngs_hunter','["ngs_knuckles","ngs_katana","ngs_bow"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;



-- Retem
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (32000,1001,'ngs','duels','renus_retem','global','lvl80grind',1,1,'00:07:17','Test notes','2023-02-05T00:08:37Z',1,'2023-02-05T11:00:52Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (32001,1017,'ngs','duels','renus_retem','global','level80r',1,1,'00:02:30','Test notes','2023-11-11T00:52:28Z',1,'2023-11-11T01:24:11Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (32002,1011,'ngs','duels','renus_retem','global','lvl80grind',1,1,'00:07:29','Test notes','2023-03-29T06:04:56Z',1,'2023-03-29T06:06:25Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (32003,1013,'ngs','duels','renus_retem','japan','lvl80grind',1,1,'00:07:28','Test notes','2023-04-10T08:37:34Z',1,'2023-04-10T09:24:11Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (32004,5000000,'ngs','duels','renus_retem','japan','slayer',1,1,'00:07:06','Test notes','2023-02-22T22:48:51Z',1,'2023-02-22T23:19:12Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (32005,1011,'ngs','duels','renus_retem','global','slayer',1,1,'00:06:41','Test notes','2023-06-12T15:06:10Z',1,'2023-06-13T01:26:11Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (32006,1012,'ngs','duels','renus_retem','global','level80r',1,1,'00:04:18','Test notes','2023-01-23T23:52:40Z',1,'2023-01-24T03:28:37Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (32007,1013,'ngs','duels','renus_retem','global','pre60r',1,1,'00:09:23','Test notes','2023-08-28T15:57:46Z',1,'2023-08-28T19:06:51Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (32008,1014,'ngs','duels','renus_retem','global','slayer',1,1,'00:02:14','Test notes','2023-07-18T17:25:55Z',1,'2023-07-19T00:45:56Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (32009,1013,'ngs','duels','renus_retem','japan','level75r',1,1,'00:04:13','Test notes','2023-04-26T07:26:29Z',1,'2023-04-26T20:22:00Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (32010,1015,'ngs','duels','renus_retem','japan','level80r',1,1,'00:06:39','Test notes','2023-02-05T15:18:52Z',1,'2023-02-05T21:44:22Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (32011,1014,'ngs','duels','renus_retem','japan','60r',1,1,'00:02:12','Test notes','2023-06-29T06:34:36Z',1,'2023-06-29T12:24:53Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (32012,1017,'ngs','duels','renus_retem','global','pot6r',1,1,'00:08:42','Test notes','2023-12-30T20:42:26Z',1,'2023-12-30T23:37:05Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (32013,1016,'ngs','duels','renus_retem','japan','60r',1,1,'00:05:26','Test notes','2023-06-12T21:58:11Z',1,'2023-06-13T00:54:11Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (32014,1011,'ngs','duels','renus_retem','japan','60r',1,1,'00:09:54','Test notes','2023-07-01T03:47:25Z',1,'2023-07-01T10:20:05Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (32015,1012,'ngs','duels','renus_retem','japan','lvl80grind',1,1,'00:06:42','Test notes','2023-07-17T18:23:06Z',1,'2023-07-17T20:18:57Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (32016,1012,'ngs','duels','renus_retem','japan','60r',1,1,'00:04:51','New Time succeeds old run','2023-02-13T03:54:17Z',1,'2023-02-13T08:34:27Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (32017,5000000,'ngs','duels','renus_retem','global','level75r',1,1,'00:08:14','Test not yet approved run','2023-10-24T07:55:02Z',0,NULL,NULL,'{"augments":false}',NULL),
  (32018,5000000,'ngs','duels','renus_retem','japan','slayer',1,1,'00:08:01','Test not yet approved run 2','2023-08-05T07:08:28Z',0,NULL,NULL,'{"augments":true}',NULL),
  (32019,5000000,'ngs','duels','renus_retem','global','level80r',1,1,'00:06:33','Test reject run','2023-11-04T17:27:16Z',9,'2023-11-04T18:08:28Z','Rejected run','{"augments":true}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (32000,32000,1001,0,'https://youtu.be/2635c3d4444b',N'trying_to_rid_this_name','ngs_force','ngs_braver','["ngs_gunblade","ngs_bow","ngs_wand"]'),
  (32001,32001,1017,0,'https://youtu.be/e6ca456b9739',N'trying_to_rid_this_name','ngs_force','ngs_gunner','["ngs_katana","ngs_bow","ngs_wand"]'),
  (32002,32002,1011,0,'https://youtu.be/e14048ad6e71',N'trying_to_rid_this_name','ngs_braver','ngs_techter','["ngs_katana","ngs_assault_rifle","ngs_rod"]'),
  (32003,32003,1013,0,'https://youtu.be/024b530ea5b3',N'trying_to_rid_this_name','ngs_force','ngs_fighter','["ngs_twin_daggers","ngs_launcher","ngs_harmonizer"]'),
  (32004,32004,5000000,0,'https://youtu.be/4e17f8834beb',N'trying_to_rid_this_name','ngs_fighter','ngs_force','["ngs_wired_lance","ngs_assault_rifle","ngs_launcher"]'),
  (32005,32005,1011,0,'https://youtu.be/2aceb51e6a01',N'trying_to_rid_this_name','ngs_braver','ngs_ranger','["ngs_wired_lance","ngs_gunblade","ngs_jet_boots"]'),
  (32006,32006,1012,0,'https://youtu.be/3c17fe94f3bb',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','["ngs_twin_daggers","ngs_gunblade","ngs_bow"]'),
  (32007,32007,1013,0,'https://youtu.be/3a050ff66ddf',N'trying_to_rid_this_name','ngs_hunter','ngs_techter','["ngs_wired_lance","ngs_twin_daggers","ngs_launcher"]'),
  (32008,32008,1014,0,'https://youtu.be/34127d87c054',N'trying_to_rid_this_name','ngs_techter','ngs_gunner','["ngs_double_sabers","ngs_gunblade","ngs_talis"]'),
  (32009,32009,1013,0,'https://youtu.be/55e6673bbbb1',N'trying_to_rid_this_name','ngs_ranger','ngs_force','["ngs_partisan","ngs_twin_daggers","ngs_harmonizer"]'),
  (32010,32010,1015,0,'https://youtu.be/12bfff5e5f6e',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_partisan","ngs_soaring_blades","ngs_assault_rifle"]'),
  (32011,32011,1014,0,'https://youtu.be/7cf4650b471f',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','["ngs_twin_daggers","ngs_talis","ngs_harmonizer"]'),
  (32012,32012,1017,0,'https://youtu.be/6ccb5886b3c5',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','["ngs_knuckles","ngs_soaring_blades","ngs_bow"]'),
  (32013,32013,1016,0,'https://youtu.be/8c8aa64204c8',N'trying_to_rid_this_name','ngs_braver','ngs_techter','["ngs_katana","ngs_twin_machine_guns","ngs_harmonizer"]'),
  (32014,32014,1011,0,'https://youtu.be/7cb50913f0c6',N'trying_to_rid_this_name','ngs_braver','ngs_waker','["ngs_sword","ngs_twin_machine_guns","ngs_bow"]'),
  (32015,32015,1012,0,'https://youtu.be/6b646d93ad2b',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','["ngs_knuckles","ngs_twin_machine_guns","ngs_rod"]'),
  (32016,32016,1012,0,'https://youtu.be/9ecbd72d5c77',N'trying_to_rid_this_name','ngs_gunner','ngs_fighter','["ngs_sword","ngs_gunblade","ngs_assault_rifle"]'),
  (32017,32017,5000000,0,'https://youtu.be/1d560b40ff60',N'trying_to_rid_this_name','ngs_fighter','ngs_waker','["ngs_wired_lance","ngs_soaring_blades","ngs_launcher"]'),
  (32018,32018,5000000,0,'https://youtu.be/bdf6bf9aafb3',N'trying_to_rid_this_name','ngs_gunner','ngs_braver','["ngs_wired_lance","ngs_assault_rifle","ngs_talis"]'),
  (32019,32019,5000000,0,'https://youtu.be/5458d1d2e116',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','["ngs_sword","ngs_knuckles","ngs_soaring_blades"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;


-- Ams Kvaris
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (33000,1001,'ngs','duels','ams_kvaris','global','pot6r',1,1,'00:04:10','Test notes','2023-12-11T05:28:34Z',1,'2023-12-11T16:33:58Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (33001,1017,'ngs','duels','ams_kvaris','global','level75r',1,1,'00:05:44','Test notes','2023-05-26T13:00:26Z',1,'2023-05-26T17:35:16Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (33002,1011,'ngs','duels','ams_kvaris','global','pot6r',1,1,'00:05:54','Test notes','2023-01-08T16:46:38Z',1,'2023-01-08T18:42:07Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (33003,1013,'ngs','duels','ams_kvaris','japan','lvl80grind',1,1,'00:06:50','Test notes','2023-07-24T16:47:13Z',1,'2023-07-25T00:57:49Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (33004,5000000,'ngs','duels','ams_kvaris','japan','level80r',1,1,'00:03:08','Test notes','2023-09-20T10:08:55Z',1,'2023-09-20T20:06:39Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (33005,1011,'ngs','duels','ams_kvaris','global','slayer',1,1,'00:05:56','Test notes','2023-12-18T18:09:50Z',1,'2023-12-19T03:18:06Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (33006,1012,'ngs','duels','ams_kvaris','global','level75r',1,1,'00:09:03','Test notes','2023-01-19T18:09:45Z',1,'2023-01-20T04:55:24Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (33007,1013,'ngs','duels','ams_kvaris','japan','lvl80grind',1,1,'00:08:26','Test notes','2023-11-29T03:52:45Z',1,'2023-11-29T14:35:42Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (33008,1014,'ngs','duels','ams_kvaris','japan','lvl80grind',1,1,'00:07:53','Test notes','2023-10-04T11:00:02Z',1,'2023-10-04T12:06:26Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (33009,1013,'ngs','duels','ams_kvaris','global','lvl80grind',1,1,'00:03:04','Test notes','2023-01-09T13:11:42Z',1,'2023-01-10T00:47:38Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (33010,1015,'ngs','duels','ams_kvaris','japan','lvl80grind',1,1,'00:07:58','Test notes','2023-12-24T10:07:58Z',1,'2023-12-24T11:24:33Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (33011,1014,'ngs','duels','ams_kvaris','global','slayer',1,1,'00:02:02','Test notes','2023-07-19T09:42:03Z',1,'2023-07-19T13:07:13Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (33012,1017,'ngs','duels','ams_kvaris','global','lvl80grind',1,1,'00:07:41','Test notes','2023-02-22T06:50:30Z',1,'2023-02-22T09:50:27Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (33013,1016,'ngs','duels','ams_kvaris','japan','lvl80grind',1,1,'00:08:28','Test notes','2023-01-22T11:58:23Z',1,'2023-01-23T00:10:46Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (33014,1011,'ngs','duels','ams_kvaris','global','60r',1,1,'00:07:09','Test notes','2023-04-03T03:52:34Z',1,'2023-04-03T13:44:31Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (33015,1012,'ngs','duels','ams_kvaris','japan','level80r',1,1,'00:03:33','Test notes','2023-01-09T15:41:34Z',1,'2023-01-10T00:27:37Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (33016,1012,'ngs','duels','ams_kvaris','japan','pre60r',1,1,'00:02:24','New Time succeeds old run','2023-07-11T08:32:49Z',1,'2023-07-11T14:45:52Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (33017,5000000,'ngs','duels','ams_kvaris','japan','pre60r',1,1,'00:06:48','Test not yet approved run','2023-05-13T05:39:36Z',0,NULL,NULL,'{"augments":true}',NULL),
  (33018,5000000,'ngs','duels','ams_kvaris','global','pot6r',1,1,'00:08:34','Test not yet approved run 2','2023-03-04T06:09:32Z',0,NULL,NULL,'{"augments":false}',NULL),
  (33019,5000000,'ngs','duels','ams_kvaris','japan','level75r',1,1,'00:07:08','Test reject run','2023-02-23T01:05:49Z',9,'2023-02-23T13:02:11Z','Rejected run','{"augments":false}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (33000,33000,1001,0,'https://youtu.be/1e7aff2c0209',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_gunblade","ngs_twin_machine_guns","ngs_harmonizer"]'),
  (33001,33001,1017,0,'https://youtu.be/edac2cdd17fe',N'trying_to_rid_this_name','ngs_braver','ngs_hunter','["ngs_sword","ngs_knuckles","ngs_twin_machine_guns"]'),
  (33002,33002,1011,0,'https://youtu.be/d163c3610bc4',N'trying_to_rid_this_name','ngs_force','ngs_hunter','["ngs_double_sabers","ngs_soaring_blades","ngs_bow"]'),
  (33003,33003,1013,0,'https://youtu.be/ee328daabeb3',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_katana","ngs_jet_boots","ngs_harmonizer"]'),
  (33004,33004,5000000,0,'https://youtu.be/d6e6c05a0bde',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','["ngs_knuckles","ngs_assault_rifle","ngs_bow"]'),
  (33005,33005,1011,0,'https://youtu.be/95eec40a798c',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','["ngs_sword","ngs_double_sabers","ngs_bow"]'),
  (33006,33006,1012,0,'https://youtu.be/1cfe9285ebe3',N'trying_to_rid_this_name','ngs_force','ngs_techter','["ngs_katana","ngs_rod","ngs_harmonizer"]'),
  (33007,33007,1013,0,'https://youtu.be/d241e948027b',N'trying_to_rid_this_name','ngs_fighter','ngs_techter','["ngs_twin_daggers","ngs_wand","ngs_jet_boots"]'),
  (33008,33008,1014,0,'https://youtu.be/fdb0275ca4d4',N'trying_to_rid_this_name','ngs_force','ngs_ranger','["ngs_gunblade","ngs_bow","ngs_double_sabers"]'),
  (33009,33009,1013,0,'https://youtu.be/66f153b44513',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_partisan","ngs_knuckles","ngs_bow"]'),
  (33010,33010,1015,0,'https://youtu.be/e5adfe8ee67a',N'trying_to_rid_this_name','ngs_hunter','ngs_techter','["ngs_twin_daggers","ngs_knuckles","ngs_wand"]'),
  (33011,33011,1014,0,'https://youtu.be/d0e38b023893',N'trying_to_rid_this_name','ngs_techter','ngs_waker','["ngs_partisan","ngs_launcher","ngs_talis"]'),
  (33012,33012,1017,0,'https://youtu.be/a7d9defcf9ff',N'trying_to_rid_this_name','ngs_fighter','ngs_techter','["ngs_double_sabers","ngs_knuckles","ngs_jet_boots"]'),
  (33013,33013,1016,0,'https://youtu.be/abd6d40e50ca',N'trying_to_rid_this_name','ngs_gunner','ngs_force','["ngs_katana","ngs_rod","ngs_talis"]'),
  (33014,33014,1011,0,'https://youtu.be/d32873388fca',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','["ngs_gunblade","ngs_jet_boots","ngs_launcher"]'),
  (33015,33015,1012,0,'https://youtu.be/bf1dbbd64543',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','["ngs_wired_lance","ngs_double_sabers","ngs_jet_boots"]'),
  (33016,33016,1012,0,'https://youtu.be/176fa1a632b8',N'trying_to_rid_this_name','ngs_fighter','ngs_techter','["ngs_double_sabers","ngs_knuckles","ngs_gunblade"]'),
  (33017,33017,5000000,0,'https://youtu.be/207364604f64',N'trying_to_rid_this_name','ngs_techter','ngs_bouncer','["ngs_soaring_blades","ngs_gunblade","ngs_launcher"]'),
  (33018,33018,5000000,0,'https://youtu.be/2181e36cbc00',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','["ngs_katana","ngs_soaring_blades","ngs_wand"]'),
  (33019,33019,5000000,0,'https://youtu.be/e0bfdfdfc0d2',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','["ngs_gunblade","ngs_jet_boots","ngs_harmonizer"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;


-- Nils Stia
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (34000,1001,'ngs','duels','nils_stia','japan','pot6r',1,1,'00:07:49','Test notes','2023-05-03T08:19:31Z',1,'2023-05-03T11:26:20Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (34001,1017,'ngs','duels','nils_stia','global','pre60r',1,1,'00:02:01','Test notes','2023-01-20T02:12:10Z',1,'2023-01-20T14:32:44Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (34002,1011,'ngs','duels','nils_stia','japan','lvl80grind',1,1,'00:07:21','Test notes','2023-01-07T03:59:19Z',1,'2023-01-07T11:05:50Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (34003,1013,'ngs','duels','nils_stia','global','lvl80grind',1,1,'00:05:27','Test notes','2023-01-27T23:31:51Z',1,'2023-01-28T00:45:58Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (34004,5000000,'ngs','duels','nils_stia','global','level80r',1,1,'00:07:35','Test notes','2023-10-26T22:46:55Z',1,'2023-10-27T01:37:55Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (34005,1011,'ngs','duels','nils_stia','japan','level80r',1,1,'00:02:05','Test notes','2023-10-30T13:22:14Z',1,'2023-10-30T16:01:13Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (34006,1012,'ngs','duels','nils_stia','global','60r',1,1,'00:06:19','Test notes','2023-08-26T00:48:39Z',1,'2023-08-26T04:11:25Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (34007,1013,'ngs','duels','nils_stia','global','level75r',1,1,'00:07:43','Test notes','2023-02-26T21:15:30Z',1,'2023-02-27T02:41:10Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (34008,1014,'ngs','duels','nils_stia','japan','level80r',1,1,'00:05:53','Test notes','2023-03-20T14:31:18Z',1,'2023-03-20T23:00:52Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (34009,1013,'ngs','duels','nils_stia','japan','level80r',1,1,'00:06:08','Test notes','2023-09-17T15:11:58Z',1,'2023-09-17T15:23:24Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (34010,1015,'ngs','duels','nils_stia','global','level75r',1,1,'00:07:38','Test notes','2023-05-12T18:36:51Z',1,'2023-05-12T22:51:35Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (34011,1014,'ngs','duels','nils_stia','japan','pot6r',1,1,'00:03:56','Test notes','2023-01-09T18:21:10Z',1,'2023-01-10T05:34:15Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (34012,1017,'ngs','duels','nils_stia','global','level75r',1,1,'00:06:46','Test notes','2023-12-23T18:01:22Z',1,'2023-12-24T01:59:48Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (34013,1016,'ngs','duels','nils_stia','japan','pre60r',1,1,'00:03:10','Test notes','2023-08-22T17:16:55Z',1,'2023-08-22T18:40:12Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (34014,1011,'ngs','duels','nils_stia','global','pre60r',1,1,'00:02:31','Test notes','2023-11-14T12:55:29Z',1,'2023-11-15T00:34:49Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (34015,1012,'ngs','duels','nils_stia','global','lvl80grind',1,1,'00:05:05','Test notes','2023-08-25T09:16:59Z',1,'2023-08-25T12:14:08Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (34016,1012,'ngs','duels','nils_stia','japan','lvl80grind',1,1,'00:04:02','New Time succeeds old run','2023-06-16T16:45:29Z',1,'2023-06-17T02:13:12Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (34017,5000000,'ngs','duels','nils_stia','global','slayer',1,1,'00:02:51','Test not yet approved run','2023-07-07T01:23:28Z',0,NULL,NULL,'{"augments":false}',NULL),
  (34018,5000000,'ngs','duels','nils_stia','global','level80r',1,1,'00:08:53','Test not yet approved run 2','2023-10-16T20:27:22Z',0,NULL,NULL,'{"augments":false}',NULL),
  (34019,5000000,'ngs','duels','nils_stia','japan','pre60r',1,1,'00:08:39','Test reject run','2023-09-06T05:10:49Z',9,'2023-09-06T14:19:37Z','Rejected run','{"augments":false}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (34000,34000,1001,0,'https://youtu.be/847966f3017c',N'trying_to_rid_this_name','ngs_hunter','ngs_waker','["ngs_sword","ngs_double_sabers","ngs_twin_machine_guns"]'),
  (34001,34001,1017,0,'https://youtu.be/7cf7486a3f87',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','["ngs_twin_daggers","ngs_wand","ngs_harmonizer"]'),
  (34002,34002,1011,0,'https://youtu.be/4db62dff996d',N'trying_to_rid_this_name','ngs_techter','ngs_force','["ngs_sword","ngs_partisan","ngs_twin_daggers"]'),
  (34003,34003,1013,0,'https://youtu.be/dc44b8500832',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','["ngs_knuckles","ngs_jet_boots"]'),
  (34004,34004,5000000,0,'https://youtu.be/3a2b90118b98',N'trying_to_rid_this_name','ngs_slayer','ngs_braver','["ngs_knuckles","ngs_talis","ngs_harmonizer"]'),
  (34005,34005,1011,0,'https://youtu.be/e855ab21354e',N'trying_to_rid_this_name','ngs_techter','ngs_waker','["ngs_wired_lance","ngs_bow","ngs_harmonizer"]'),
  (34006,34006,1012,0,'https://youtu.be/45c1099763c4',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','["ngs_twin_daggers","ngs_katana","ngs_twin_machine_guns"]'),
  (34007,34007,1013,0,'https://youtu.be/932e293cdef5',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','["ngs_wired_lance","ngs_knuckles","ngs_twin_machine_guns"]'),
  (34008,34008,1014,0,'https://youtu.be/19e619f6792d',N'trying_to_rid_this_name','ngs_waker','ngs_force','["ngs_knuckles","ngs_soaring_blades","ngs_talis"]'),
  (34009,34009,1013,0,'https://youtu.be/13d8d6612735',N'trying_to_rid_this_name','ngs_fighter','ngs_gunner','["ngs_partisan","ngs_twin_daggers","ngs_knuckles"]'),
  (34010,34010,1015,0,'https://youtu.be/d4f561d1347b',N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','["ngs_wired_lance","ngs_harmonizer","ngs_talis"]'),
  (34011,34011,1014,0,'https://youtu.be/2ab125fdb782',N'trying_to_rid_this_name','ngs_force','ngs_slayer','["ngs_katana","ngs_twin_machine_guns","ngs_bow"]'),
  (34012,34012,1017,0,'https://youtu.be/a1b6c3462dfd',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','["ngs_sword","ngs_twin_daggers","ngs_gunblade"]'),
  (34013,34013,1016,0,'https://youtu.be/a17872de4739',N'trying_to_rid_this_name','ngs_slayer','ngs_braver','["ngs_twin_daggers","ngs_rod","ngs_harmonizer"]'),
  (34014,34014,1011,0,'https://youtu.be/201e253977c7',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','["ngs_partisan","ngs_twin_daggers","ngs_bow"]'),
  (34015,34015,1012,0,'https://youtu.be/294c1c73dedf',N'trying_to_rid_this_name','ngs_fighter','ngs_waker','["ngs_wired_lance","ngs_knuckles","ngs_harmonizer"]'),
  (34016,34016,1012,0,'https://youtu.be/2e47fd38691c',N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','["ngs_double_sabers","ngs_katana","ngs_talis"]'),
  (34017,34017,5000000,0,'https://youtu.be/4470fc527033',N'trying_to_rid_this_name','ngs_waker','ngs_braver','["ngs_sword","ngs_soaring_blades","ngs_rod"]'),
  (34018,34018,5000000,0,'https://youtu.be/d60d06f71d52',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','["ngs_knuckles","ngs_soaring_blades","ngs_wand"]'),
  (34019,34019,5000000,0,'https://youtu.be/ed11b4e7c108',N'trying_to_rid_this_name','ngs_slayer','ngs_force','["ngs_twin_daggers","ngs_twin_machine_guns","ngs_rod"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;


-- Halvaldi
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (35000,1001,'ngs','duels','halvaldi','global','lvl80grind',1,1,'00:02:55','Test notes','2024-01-01T17:14:08Z',1,'2024-01-01T18:18:28Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (35001,1017,'ngs','duels','halvaldi','japan','pre60r',1,1,'00:07:12','Test notes','2023-10-20T09:22:34Z',1,'2023-10-20T19:08:33Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (35002,1011,'ngs','duels','halvaldi','japan','pot6r',1,1,'00:04:38','Test notes','2023-10-07T13:54:42Z',1,'2023-10-07T16:26:24Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (35003,1013,'ngs','duels','halvaldi','japan','level75r',1,1,'00:05:29','Test notes','2023-07-01T12:33:57Z',1,'2023-07-01T16:33:51Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (35004,5000000,'ngs','duels','halvaldi','global','level75r',1,1,'00:06:21','Test notes','2023-02-08T17:56:05Z',1,'2023-02-09T05:38:01Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (35005,1011,'ngs','duels','halvaldi','global','pot6r',1,1,'00:09:20','Test notes','2023-03-15T04:06:53Z',1,'2023-03-15T12:26:04Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (35006,1012,'ngs','duels','halvaldi','japan','lvl80grind',1,1,'00:02:05','Test notes','2023-01-18T01:43:05Z',1,'2023-01-18T10:15:50Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (35007,1013,'ngs','duels','halvaldi','global','slayer',1,1,'00:05:01','Test notes','2023-11-25T17:30:47Z',1,'2023-11-25T21:16:29Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (35008,1014,'ngs','duels','halvaldi','japan','pre60r',1,1,'00:06:41','Test notes','2023-07-31T14:23:08Z',1,'2023-08-01T03:12:26Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (35009,1013,'ngs','duels','halvaldi','japan','level75r',1,1,'00:02:58','Test notes','2023-04-16T21:02:32Z',1,'2023-04-16T21:53:25Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (35010,1015,'ngs','duels','halvaldi','japan','lvl80grind',1,1,'00:04:08','Test notes','2023-08-21T00:56:12Z',1,'2023-08-21T02:32:41Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (35011,1014,'ngs','duels','halvaldi','global','slayer',1,1,'00:02:54','Test notes','2023-04-29T01:52:19Z',1,'2023-04-29T02:12:51Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (35012,1017,'ngs','duels','halvaldi','japan','level80r',1,1,'00:07:31','Test notes','2023-02-22T02:46:40Z',1,'2023-02-22T04:22:03Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (35013,1016,'ngs','duels','halvaldi','global','60r',1,1,'00:04:29','Test notes','2023-12-23T00:39:39Z',1,'2023-12-23T05:36:43Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (35014,1011,'ngs','duels','halvaldi','global','60r',1,1,'00:07:05','Test notes','2023-11-29T10:43:12Z',1,'2023-11-29T20:32:58Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (35015,1012,'ngs','duels','halvaldi','global','pot6r',1,1,'00:02:33','Test notes','2023-10-20T16:37:06Z',1,'2023-10-20T20:49:10Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (35016,1012,'ngs','duels','halvaldi','japan','level80r',1,1,'00:02:32','New Time succeeds old run','2023-06-15T19:28:59Z',1,'2023-06-16T08:10:17Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (35017,5000000,'ngs','duels','halvaldi','global','lvl80grind',1,1,'00:03:33','Test not yet approved run','2023-01-16T14:43:24Z',0,NULL,NULL,'{"augments":true}',NULL),
  (35018,5000000,'ngs','duels','halvaldi','japan','level80r',1,1,'00:02:31','Test not yet approved run 2','2023-08-08T17:51:27Z',0,NULL,NULL,'{"augments":false}',NULL),
  (35019,5000000,'ngs','duels','halvaldi','japan','pre60r',1,1,'00:06:17','Test reject run','2023-03-03T08:01:16Z',9,'2023-03-03T20:12:10Z','Rejected run','{"augments":false}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (35000,35000,1001,0,'https://youtu.be/4b91f24cde02',N'trying_to_rid_this_name','ngs_techter','ngs_waker','["ngs_bow","ngs_rod","ngs_jet_boots"]'),
  (35001,35001,1017,0,'https://youtu.be/1b684daa68e3',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','["ngs_knuckles","ngs_gunblade","ngs_assault_rifle"]'),
  (35002,35002,1011,0,'https://youtu.be/5769bb49b8b0',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','["ngs_soaring_blades","ngs_gunblade","ngs_harmonizer"]'),
  (35003,35003,1013,0,'https://youtu.be/0ea81861e8e0',N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger','["ngs_wired_lance","ngs_rod","ngs_jet_boots"]'),
  (35004,35004,5000000,0,'https://youtu.be/97e7c4898ce8',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','["ngs_soaring_blades","ngs_rod","ngs_talis"]'),
  (35005,35005,1011,0,'https://youtu.be/3ae652fa2644',N'trying_to_rid_this_name','ngs_force','ngs_techter','["ngs_sword","ngs_katana","ngs_rod"]'),
  (35006,35006,1012,0,'https://youtu.be/77e5015fc837',N'trying_to_rid_this_name','ngs_fighter','ngs_braver','["ngs_wired_lance","ngs_soaring_blades","ngs_bow"]'),
  (35007,35007,1013,0,'https://youtu.be/5ad3a4c0fa2c',N'trying_to_rid_this_name','ngs_ranger','ngs_waker','["ngs_twin_daggers","ngs_knuckles","ngs_talis"]'),
  (35008,35008,1014,0,'https://youtu.be/a630c34382c1',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','["ngs_soaring_blades","ngs_twin_machine_guns","ngs_bow"]'),
  (35009,35009,1013,0,'https://youtu.be/0b0be62a7615',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','["ngs_partisan","ngs_soaring_blades","ngs_harmonizer"]'),
  (35010,35010,1015,0,'https://youtu.be/a1d9c4d20fd2',N'trying_to_rid_this_name','ngs_waker','ngs_hunter','["ngs_sword","ngs_katana","ngs_twin_machine_guns"]'),
  (35011,35011,1014,0,'https://youtu.be/c30045da7df6',N'trying_to_rid_this_name','ngs_waker','ngs_slayer','["ngs_sword","ngs_soaring_blades","ngs_twin_machine_guns"]'),
  (35012,35012,1017,0,'https://youtu.be/7d7dec495527',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','["ngs_gunblade","ngs_twin_machine_guns","ngs_jet_boots"]'),
  (35013,35013,1016,0,'https://youtu.be/4ba171abc090',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','["ngs_assault_rifle","ngs_launcher","ngs_harmonizer"]'),
  (35014,35014,1011,0,'https://youtu.be/58d02cb4a38c',N'trying_to_rid_this_name','ngs_fighter','ngs_waker','["ngs_knuckles","ngs_gunblade","ngs_bow"]'),
  (35015,35015,1012,0,'https://youtu.be/50bd54e5d833',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','["ngs_sword","ngs_wired_lance","ngs_katana"]'),
  (35016,35016,1012,0,'https://youtu.be/5bea5f754e58',N'trying_to_rid_this_name','ngs_techter','ngs_bouncer','["ngs_partisan","ngs_twin_machine_guns","ngs_rod"]'),
  (35017,35017,5000000,0,'https://youtu.be/7ae238de6585',N'trying_to_rid_this_name','ngs_techter','ngs_force','["ngs_sword","ngs_partisan","ngs_launcher"]'),
  (35018,35018,5000000,0,'https://youtu.be/476ca2a59d44',N'trying_to_rid_this_name','ngs_gunner','ngs_force','["ngs_double_sabers","ngs_wand","ngs_harmonizer"]'),
  (35019,35019,5000000,0,'https://youtu.be/62e2b526b862',N'trying_to_rid_this_name','ngs_braver','ngs_techter','["ngs_twin_daggers","ngs_twin_machine_guns","ngs_jet_boots"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;


-- Zelvin
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (36000,1001,'ngs','duels','zelvin','global','slayer',1,1,'00:05:35','Test notes','2023-02-13T00:48:42Z',1,'2023-02-13T12:03:25Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (36001,1017,'ngs','duels','zelvin','global','lvl80grind',1,1,'00:05:02','Test notes','2023-11-02T04:03:24Z',1,'2023-11-02T08:20:53Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (36002,1011,'ngs','duels','zelvin','japan','slayer',1,1,'00:09:35','Test notes','2023-05-09T18:30:59Z',1,'2023-05-09T21:18:35Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (36003,1013,'ngs','duels','zelvin','japan','slayer',1,1,'00:09:50','Test notes','2023-03-14T05:40:35Z',1,'2023-03-14T16:43:19Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (36004,5000000,'ngs','duels','zelvin','global','level75r',1,1,'00:08:01','Test notes','2023-04-15T11:55:34Z',1,'2023-04-15T19:59:48Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (36005,1011,'ngs','duels','zelvin','global','level75r',1,1,'00:08:56','Test notes','2023-04-06T12:24:55Z',1,'2023-04-06T17:05:42Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (36006,1012,'ngs','duels','zelvin','japan','level80r',1,1,'00:06:32','Test notes','2023-07-07T17:09:48Z',1,'2023-07-08T06:05:06Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (36007,1013,'ngs','duels','zelvin','global','pre60r',1,1,'00:02:33','Test notes','2023-10-18T03:21:57Z',1,'2023-10-18T14:34:49Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (36008,1014,'ngs','duels','zelvin','global','60r',1,1,'00:03:13','Test notes','2023-10-12T20:37:33Z',1,'2023-10-13T08:42:21Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (36009,1013,'ngs','duels','zelvin','global','lvl80grind',1,1,'00:07:16','Test notes','2023-10-11T03:49:37Z',1,'2023-10-11T11:24:53Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (36010,1015,'ngs','duels','zelvin','japan','pre60r',1,1,'00:08:42','Test notes','2023-03-18T04:02:50Z',1,'2023-03-18T11:05:26Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (36011,1014,'ngs','duels','zelvin','global','level75r',1,1,'00:08:44','Test notes','2023-06-07T11:22:32Z',1,'2023-06-07T19:08:47Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (36012,1017,'ngs','duels','zelvin','japan','lvl80grind',1,1,'00:09:11','Test notes','2023-04-19T09:44:06Z',1,'2023-04-19T20:19:41Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (36013,1016,'ngs','duels','zelvin','global','level80r',1,1,'00:04:51','Test notes','2023-08-23T18:11:58Z',1,'2023-08-24T06:11:17Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (36014,1011,'ngs','duels','zelvin','global','60r',1,1,'00:02:23','Test notes','2023-07-15T05:32:31Z',1,'2023-07-15T16:59:29Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (36015,1012,'ngs','duels','zelvin','japan','level80r',1,1,'00:07:55','Test notes','2023-03-19T02:41:01Z',1,'2023-03-19T10:30:37Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (36016,1012,'ngs','duels','zelvin','japan','slayer',1,1,'00:04:57','New Time succeeds old run','2023-07-13T11:33:12Z',1,'2023-07-13T22:41:52Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (36017,5000000,'ngs','duels','zelvin','japan','slayer',1,1,'00:04:35','Test not yet approved run','2023-09-05T22:50:16Z',0,NULL,NULL,'{"augments":true}',NULL),
  (36018,5000000,'ngs','duels','zelvin','japan','level80r',1,1,'00:08:39','Test not yet approved run 2','2023-03-27T00:30:49Z',0,NULL,NULL,'{"augments":true}',NULL),
  (36019,5000000,'ngs','duels','zelvin','global','slayer',1,1,'00:03:18','Test reject run','2023-12-03T00:17:40Z',9,'2023-12-03T00:27:57Z','Rejected run','{"augments":false}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (36000,36000,1001,0,'https://youtu.be/89fb8d030854',N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','["ngs_sword","ngs_gunblade","ngs_assault_rifle"]'),
  (36001,36001,1017,0,'https://youtu.be/fb761cb0f30c',N'trying_to_rid_this_name','ngs_force','ngs_fighter','["ngs_double_sabers","ngs_assault_rifle","ngs_wand"]'),
  (36002,36002,1011,0,'https://youtu.be/c60a0cb5bbfa',N'trying_to_rid_this_name','ngs_gunner','ngs_ranger','["ngs_soaring_blades","ngs_launcher","ngs_talis"]'),
  (36003,36003,1013,0,'https://youtu.be/c570c9f0595e',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','["ngs_twin_daggers","ngs_gunblade","ngs_harmonizer"]'),
  (36004,36004,5000000,0,'https://youtu.be/d2f6104d4c76',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','["ngs_partisan","ngs_bow","ngs_wand"]'),
  (36005,36005,1011,0,'https://youtu.be/9c616a82baa6',N'trying_to_rid_this_name','ngs_techter','ngs_bouncer','["ngs_twin_daggers","ngs_knuckles","ngs_rod"]'),
  (36006,36006,1012,0,'https://youtu.be/0e5421750567',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','["ngs_sword","ngs_assault_rifle","ngs_twin_machine_guns"]'),
  (36007,36007,1013,0,'https://youtu.be/cf66f5c4f7b7',N'trying_to_rid_this_name','ngs_waker','ngs_techter','["ngs_partisan","ngs_soaring_blades","ngs_bow"]'),
  (36008,36008,1014,0,'https://youtu.be/8fb5bb198153',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','["ngs_partisan","ngs_bow","ngs_talis"]'),
  (36009,36009,1013,0,'https://youtu.be/bec816d28015',N'trying_to_rid_this_name','ngs_gunner','ngs_force','["ngs_sword","ngs_double_sabers","ngs_twin_machine_guns"]'),
  (36010,36010,1015,0,'https://youtu.be/03432ced3121',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','["ngs_wired_lance","ngs_twin_daggers","ngs_jet_boots"]'),
  (36011,36011,1014,0,'https://youtu.be/af731b3f0054',N'trying_to_rid_this_name','ngs_gunner','ngs_force','["ngs_soaring_blades","ngs_gunblade","ngs_bow"]'),
  (36012,36012,1017,0,'https://youtu.be/cbc596991ef2',N'trying_to_rid_this_name','ngs_techter','ngs_ranger','["ngs_sword","ngs_launcher","ngs_talis"]'),
  (36013,36013,1016,0,'https://youtu.be/3ee0d740dab5',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','["ngs_twin_daggers","ngs_knuckles","ngs_rod"]'),
  (36014,36014,1011,0,'https://youtu.be/028f2ab704f2',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','["ngs_double_sabers","ngs_twin_machine_guns","ngs_wand"]'),
  (36015,36015,1012,0,'https://youtu.be/b3105a7e7f29',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','["ngs_knuckles","ngs_assault_rifle","ngs_harmonizer"]'),
  (36016,36016,1012,0,'https://youtu.be/2ad4a2186e53',N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger','["ngs_twin_daggers","ngs_knuckles","ngs_twin_machine_guns"]'),
  (36017,36017,5000000,0,'https://youtu.be/a1f62308f6d2',N'trying_to_rid_this_name','ngs_braver','ngs_techter','["ngs_partisan","ngs_soaring_blades","ngs_wand"]'),
  (36018,36018,5000000,0,'https://youtu.be/1f886d8ce547',N'trying_to_rid_this_name','ngs_hunter','ngs_waker','["ngs_double_sabers","ngs_knuckles","ngs_soaring_blades"]'),
  (36019,36019,5000000,0,'https://youtu.be/64f48631ea02',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','["ngs_launcher","ngs_twin_machine_guns","ngs_jet_boots"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Ringwedge
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (37000,1001,'ngs','duels','ringwedge','global','slayer',1,1,'00:05:35','Test notes','2023-02-13T00:48:42Z',1,'2023-02-13T12:03:25Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (37001,1017,'ngs','duels','ringwedge','global','lvl80grind',1,1,'00:05:02','Test notes','2023-11-02T04:03:24Z',1,'2023-11-02T08:20:53Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (37002,1011,'ngs','duels','ringwedge','japan','slayer',1,1,'00:09:35','Test notes','2023-05-09T18:30:59Z',1,'2023-05-09T21:18:35Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (37003,1013,'ngs','duels','ringwedge','japan','slayer',1,1,'00:09:50','Test notes','2023-03-14T05:40:35Z',1,'2023-03-14T16:43:19Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (37004,5000000,'ngs','duels','ringwedge','global','level75r',1,1,'00:08:01','Test notes','2023-04-15T11:55:34Z',1,'2023-04-15T19:59:48Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (37005,1011,'ngs','duels','ringwedge','global','level75r',1,1,'00:08:56','Test notes','2023-04-06T12:24:55Z',1,'2023-04-06T17:05:42Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (37006,1012,'ngs','duels','ringwedge','japan','level80r',1,1,'00:06:32','Test notes','2023-07-07T17:09:48Z',1,'2023-07-08T06:05:06Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (37007,1013,'ngs','duels','ringwedge','global','pre60r',1,1,'00:02:33','Test notes','2023-10-18T03:21:57Z',1,'2023-10-18T14:34:49Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (37008,1014,'ngs','duels','ringwedge','global','60r',1,1,'00:03:13','Test notes','2023-10-12T20:37:33Z',1,'2023-10-13T08:42:21Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (37009,1013,'ngs','duels','ringwedge','global','lvl80grind',1,1,'00:07:16','Test notes','2023-10-11T03:49:37Z',1,'2023-10-11T11:24:53Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (37010,1015,'ngs','duels','ringwedge','japan','pre60r',1,1,'00:08:42','Test notes','2023-03-18T04:02:50Z',1,'2023-03-18T11:05:26Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (37011,1014,'ngs','duels','ringwedge','global','level75r',1,1,'00:08:44','Test notes','2023-06-07T11:22:32Z',1,'2023-06-07T19:08:47Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (37012,1017,'ngs','duels','ringwedge','japan','lvl80grind',1,1,'00:09:11','Test notes','2023-04-19T09:44:06Z',1,'2023-04-19T20:19:41Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (37013,1016,'ngs','duels','ringwedge','global','level80r',1,1,'00:04:51','Test notes','2023-08-23T18:11:58Z',1,'2023-08-24T06:11:17Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (37014,1011,'ngs','duels','ringwedge','global','60r',1,1,'00:02:23','Test notes','2023-07-15T05:32:31Z',1,'2023-07-15T16:59:29Z','Test Mod Notes','{"augments":true}','Tall Mommy Cool'),
  (37015,1012,'ngs','duels','ringwedge','japan','level80r',1,1,'00:07:55','Test notes','2023-03-19T02:41:01Z',1,'2023-03-19T10:30:37Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (37016,1012,'ngs','duels','ringwedge','japan','slayer',1,1,'00:04:57','New Time succeeds old run','2023-07-13T11:33:12Z',1,'2023-07-13T22:41:52Z','Test Mod Notes','{"augments":false}','Tall Mommy Cool'),
  (37017,5000000,'ngs','duels','ringwedge','japan','slayer',1,1,'00:04:35','Test not yet approved run','2023-09-05T22:50:16Z',0,NULL,NULL,'{"augments":true}',NULL),
  (37018,5000000,'ngs','duels','ringwedge','japan','level80r',1,1,'00:08:39','Test not yet approved run 2','2023-03-27T00:30:49Z',0,NULL,NULL,'{"augments":true}',NULL),
  (37019,5000000,'ngs','duels','ringwedge','global','slayer',1,1,'00:03:18','Test reject run','2023-12-03T00:17:40Z',9,'2023-12-03T00:27:57Z','Rejected run','{"augments":false}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (37000,37000,1001,0,'https://youtu.be/e01ef0334f81',N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','["ngs_sword","ngs_gunblade","ngs_assault_rifle"]'),
  (37001,37001,1017,0,'https://youtu.be/0d4addb78946',N'trying_to_rid_this_name','ngs_force','ngs_fighter','["ngs_double_sabers","ngs_assault_rifle","ngs_wand"]'),
  (37002,37002,1011,0,'https://youtu.be/808dc22ee45b',N'trying_to_rid_this_name','ngs_gunner','ngs_ranger','["ngs_soaring_blades","ngs_launcher","ngs_talis"]'),
  (37003,37003,1013,0,'https://youtu.be/e4e79b87e3f2',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','["ngs_twin_daggers","ngs_gunblade","ngs_harmonizer"]'),
  (37004,37004,5000000,0,'https://youtu.be/a841f76fb186',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','["ngs_partisan","ngs_bow","ngs_wand"]'),
  (37005,37005,1011,0,'https://youtu.be/88dabc1ea42b',N'trying_to_rid_this_name','ngs_techter','ngs_bouncer','["ngs_twin_daggers","ngs_knuckles","ngs_rod"]'),
  (37006,37006,1012,0,'https://youtu.be/5d8ad1799f84',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','["ngs_sword","ngs_assault_rifle","ngs_twin_machine_guns"]'),
  (37007,37007,1013,0,'https://youtu.be/42328229f985',N'trying_to_rid_this_name','ngs_waker','ngs_techter','["ngs_partisan","ngs_soaring_blades","ngs_bow"]'),
  (37008,37008,1014,0,'https://youtu.be/5ce4d6a9e9d1',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','["ngs_partisan","ngs_bow","ngs_talis"]'),
  (37009,37009,1013,0,'https://youtu.be/7360d6f3316c',N'trying_to_rid_this_name','ngs_gunner','ngs_force','["ngs_sword","ngs_double_sabers","ngs_twin_machine_guns"]'),
  (37010,37010,1015,0,'https://youtu.be/65e3e7edbf76',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','["ngs_wired_lance","ngs_twin_daggers","ngs_jet_boots"]'),
  (37011,37011,1014,0,'https://youtu.be/ef8df8511dc6',N'trying_to_rid_this_name','ngs_gunner','ngs_force','["ngs_soaring_blades","ngs_gunblade","ngs_bow"]'),
  (37012,37012,1017,0,'https://youtu.be/58be937cb7db',N'trying_to_rid_this_name','ngs_techter','ngs_ranger','["ngs_sword","ngs_launcher","ngs_talis"]'),
  (37013,37013,1016,0,'https://youtu.be/1048efd68788',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','["ngs_twin_daggers","ngs_knuckles","ngs_rod"]'),
  (37014,37014,1011,0,'https://youtu.be/45164db9565c',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','["ngs_double_sabers","ngs_twin_machine_guns","ngs_wand"]'),
  (37015,37015,1012,0,'https://youtu.be/2973f71f45db',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','["ngs_knuckles","ngs_assault_rifle","ngs_harmonizer"]'),
  (37016,37016,1012,0,'https://youtu.be/4432cf479c6d',N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger','["ngs_twin_daggers","ngs_knuckles","ngs_twin_machine_guns"]'),
  (37017,37017,5000000,0,'https://youtu.be/a45c7b6677b6',N'trying_to_rid_this_name','ngs_braver','ngs_techter','["ngs_partisan","ngs_soaring_blades","ngs_wand"]'),
  (37018,37018,5000000,0,'https://youtu.be/c99a712c9ad0',N'trying_to_rid_this_name','ngs_hunter','ngs_waker','["ngs_double_sabers","ngs_knuckles","ngs_soaring_blades"]'),
  (37019,37019,5000000,0,'https://youtu.be/a20726410a91',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','["ngs_launcher","ngs_twin_machine_guns","ngs_jet_boots"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;
