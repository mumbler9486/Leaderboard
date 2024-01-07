-- Purple Solo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (1000,1001,'ngs','purples','aelio','global','level80r',4,1,'0:12:55','Notes','2023-05-16T00:46:06Z',1,'2023-05-16T02:46:06Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1001,1017,'ngs','purples','aelio','japan','level80r',4,1,'0:15:01','Notes','2023-11-25T05:38:26Z',1,'2023-11-25T07:38:26Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1002,1011,'ngs','purples','aelio','global','60r',4,1,'0:17:47','Notes','2023-05-29T11:54:52Z',1,'2023-05-29T13:54:52Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1003,1013,'ngs','purples','aelio','global','pre60r',4,1,'0:18:16','Notes','2023-07-27T07:52:03Z',1,'2023-07-27T09:52:03Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1004,1001,'ngs','purples','aelio','global','pot6r',4,1,'0:16:51','Notes','2023-07-07T01:12:28Z',1,'2023-07-07T03:12:28Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1005,1011,'ngs','purples','aelio','japan','pre60r',4,1,'0:10:54','Notes','2023-07-13T11:19:22Z',1,'2023-07-13T13:19:22Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1006,1012,'ngs','purples','aelio','global','level75r',3,1,'0:17:21','Notes','2023-06-14T15:25:32Z',1,'2023-06-14T18:25:32Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1007,1013,'ngs','purples','aelio','global','lvl80grind',3,1,'0:15:53','Notes','2023-12-02T11:58:04Z',1,'2023-12-03T11:58:04Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1008,1014,'ngs','purples','aelio','japan','60r',3,1,'0:14:15','Notes','2023-07-31T08:42:36Z',1,'2023-07-31T10:42:36Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1009,1013,'ngs','purples','aelio','japan','60r',2,1,'0:13:41','Notes','2023-03-27T01:20:57Z',1,'2023-03-28T01:20:57Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1010,1015,'ngs','purples','aelio','global','pre60r',2,1,'0:17:24','Notes','2023-07-04T18:33:23Z',1,'2023-07-06T18:33:23Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1011,1014,'ngs','purples','aelio','japan','level75r',2,1,'0:18:37','Notes','2023-11-19T07:56:40Z',1,'2023-11-20T07:56:40Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1012,1017,'ngs','purples','aelio','global','level75r',1,1,'0:17:21','Notes','2023-07-23T00:55:46Z',1,'2023-08-23T00:55:46Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1013,1016,'ngs','purples','aelio','global','level80r',1,1,'0:13:39','Notes','2023-02-05T22:27:06Z',1,'2023-02-05T23:27:06Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1014,1011,'ngs','purples','aelio','global','60r',1,1,'0:19:36','Notes','2023-10-10T23:10:22Z',1,'2023-10-11T01:10:22Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1015,1012,'ngs','purples','aelio','global','pre60r',4,1,'0:15:39','Notes','2023-04-06T19:10:05Z',1,'2023-04-06T21:10:05Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1016,1012,'ngs','purples','aelio','global','level80r',4,1,'0:13:39','New Time succeeds old run','2023-12-25T11:53:20Z',1,'2023-03-25T13:55:20Z','Mod Notes', NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (1000,1000,1001,0,'https://youtu.be/3y8HOvXXfCYr','trying_to_rid_this_name','ngs_force','ngs_braver','["ngs_harmonizer","ngs_twin_daggers","ngs_wired_lance"]'),
  (1001,1001,1017,0,'https://youtu.be/wtQv8tNg8P3z','trying_to_rid_this_name','ngs_techter','ngs_force','["ngs_knuckles","ngs_bow","ngs_twin_daggers"]'),
  (1002,1002,1011,0,'https://youtu.be/15KftD3pwV6Q','trying_to_rid_this_name','ngs_bouncer','ngs_slayer','["ngs_twin_daggers","ngs_bow"]'),
  (1003,1003,1013,0,'https://youtu.be/CSncyvF4E0Rq','trying_to_rid_this_name','ngs_bouncer','ngs_hunter','["ngs_double_sabers","ngs_katana","ngs_assault_rifle"]'),
  (1004,1004,1001,0,'https://youtu.be/a8tF5Z9y43kM','trying_to_rid_this_name','ngs_techter','ngs_force','["ngs_partisan","ngs_wired_lance","ngs_twin_daggers"]'),
  (1005,1005,1011,0,'https://youtu.be/y1Bg93YXcg2W','trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_gunblade","ngs_rod","ngs_bow"]'),
  (1006,1006,1012,0,'https://youtu.be/5KkN3wv6nu5R','trying_to_rid_this_name','ngs_waker','ngs_slayer','["ngs_bow","ngs_wand"]'),
  (1007,1007,1013,0,'https://youtu.be/85EpdTM2Q4CB','trying_to_rid_this_name','ngs_force','ngs_gunner','["ngs_twin_machine_guns","ngs_assault_rifle","ngs_talis"]'),
  (1008,1008,1014,0,'https://youtu.be/G8Z44r5rwdmy','trying_to_rid_this_name','ngs_waker','ngs_gunner','["ngs_gunblade","ngs_soaring_blades"]'),
  (1009,1009,1013,0,'https://youtu.be/q9sOjT6aj6fC','trying_to_rid_this_name','ngs_slayer','ngs_waker','["ngs_twin_daggers","ngs_bow"]'),
  (1010,1010,1015,0,'https://youtu.be/dFa9m1eS7rp3','trying_to_rid_this_name','ngs_braver','ngs_bouncer','["ngs_double_sabers","ngs_rod","ngs_launcher"]'),
  (1011,1011,1014,0,'https://youtu.be/5qtqhg1U9uM1','trying_to_rid_this_name','ngs_fighter','ngs_slayer','["ngs_rod","ngs_wand","ngs_soaring_blades"]'),
  (1012,1012,1017,0,'https://youtu.be/rUB9xWRRLe52','trying_to_rid_this_name','ngs_techter','ngs_slayer','["ngs_katana","ngs_soaring_blades","ngs_katana"]'),
  (1013,1013,1016,0,'https://youtu.be/1A5L6C6x0nH7','trying_to_rid_this_name','ngs_braver','ngs_ranger','["ngs_sword","ngs_katana","ngs_sword"]'),
  (1014,1014,1011,0,'https://youtu.be/r6Up2wbU3p0N','trying_to_rid_this_name','ngs_fighter','ngs_fighter','["ngs_sword","ngs_twin_daggers","ngs_bow"]'),
  (1015,1015,1012,0,'https://youtu.be/bU5C66Rai64j','trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_jet_boots","ngs_jet_boots","ngs_wired_lance"]'),
  (1016,1016,1012,0,'https://youtu.be/1a7682528888','trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_double_sabers","ngs_gunblade","ngs_katana"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Purple Duo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (1100,1001,'ngs','purples','aelio','global','level80r',4,2,'0:12:55','Notes','2023-11-16T08:33:32Z',1,'2023-11-16T11:33:32Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1101,1017,'ngs','purples','aelio','japan','level80r',4,2,'0:15:01','Notes','2023-03-13T22:36:48Z',1,'2023-03-13T23:36:48Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1102,1011,'ngs','purples','aelio','global','60r',4,2,'0:17:47','Notes','2023-12-10T23:38:06Z',1,'2023-12-10T23:39:06Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1103,1013,'ngs','purples','aelio','global','pre60r',4,2,'0:18:16','Notes','2023-02-04T00:42:02Z',1,'2023-02-04T01:42:02Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1104,1001,'ngs','purples','aelio','global','pot6r',4,2,'0:16:51','Notes','2023-07-12T14:52:12Z',1,'2023-07-15T14:52:12Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1105,1011,'ngs','purples','aelio','japan','pre60r',4,2,'0:10:54','Notes','2023-09-23T17:51:04Z',1,'2023-09-24T17:51:04Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1106,1012,'ngs','purples','aelio','global','level75r',3,2,'0:17:21','Notes','2023-04-25T07:13:46Z',1,'2023-04-25T09:13:46Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1107,1013,'ngs','purples','aelio','global','lvl80grind',3,2,'0:15:53','Notes','2023-11-01T01:29:56Z',1,'2023-11-01T02:29:56Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1108,1014,'ngs','purples','aelio','japan','60r',3,2,'0:14:15','Notes','2023-01-15T11:20:44Z',1,'2023-01-15T17:20:44Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1109,1013,'ngs','purples','aelio','japan','60r',2,2,'0:13:41','Notes','2023-11-14T10:20:37Z',1,'2023-11-14T18:20:37Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1110,1015,'ngs','purples','aelio','global','pre60r',2,2,'0:17:24','Notes','2023-12-16T10:23:30Z',1,'2023-12-16T14:23:30Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1111,1014,'ngs','purples','aelio','japan','level75r',2,2,'0:18:37','Notes','2023-08-14T07:55:30Z',1,'2023-08-14T08:00:30Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1112,1017,'ngs','purples','aelio','global','level75r',1,2,'0:17:21','Notes','2023-06-30T06:09:22Z',1,'2023-07-30T06:09:22Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1113,1016,'ngs','purples','aelio','global','level80r',1,2,'0:13:39','Notes','2023-08-30T23:24:25Z',1,'2023-08-30T23:55:25Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1114,1011,'ngs','purples','aelio','global','60r',1,2,'0:19:36','Notes','2023-08-10T00:47:56Z',1,'2023-08-10T02:47:56Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1115,1012,'ngs','purples','aelio','global','pre60r',4,2,'0:15:39','Notes','2023-03-05T23:36:32Z',1,'2023-03-05T23:45:32Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1116,1012,'ngs','purples','aelio','global','level80r',4,2,'0:13:39','New Time succeeds old run','2023-07-25T01:23:16Z',1,'2023-07-25T03:23:16Z','Mod Notes', NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (1100,1100,1001,0,'https://youtu.be/372c5885733c','trying_to_rid_this_name','ngs_gunner','ngs_force',NULL),
  (1101,1100,1006,0,'https://youtu.be/1bdc00535a8c','trying_to_rid_this_name','ngs_bouncer','ngs_waker',NULL),
  (1102,1101,1017,0,'https://youtu.be/fe8b747e00ac','trying_to_rid_this_name','ngs_ranger','ngs_braver',NULL),
  (1103,1101,1030,0,'https://youtu.be/71fe6f95cf84','trying_to_rid_this_name','ngs_braver','ngs_bouncer',NULL),
  (1104,1102,1011,0,'https://youtu.be/54f7aa14a842','trying_to_rid_this_name','ngs_techter','ngs_gunner',NULL),
  (1105,1102,1023,0,'https://youtu.be/d400da40e005','trying_to_rid_this_name','ngs_fighter','ngs_slayer',NULL),
  (1106,1103,1013,0,'https://youtu.be/a2a92d5b9e31','trying_to_rid_this_name','ngs_gunner','ngs_hunter',NULL),
  (1107,1103,1025,0,'https://youtu.be/42e4f78b4d29','trying_to_rid_this_name','ngs_bouncer','ngs_slayer',NULL),
  (1108,1104,1001,0,'https://youtu.be/8a90ccef3246','trying_to_rid_this_name','ngs_slayer','ngs_bouncer',NULL),
  (1109,1104,1021,0,'https://youtu.be/6dc86114fc75','trying_to_rid_this_name','ngs_slayer','ngs_braver',NULL),
  (1110,1105,1011,0,'https://youtu.be/d0014f1e7a7f','trying_to_rid_this_name','ngs_hunter','ngs_ranger',NULL),
  (1111,1105,1013,0,'https://youtu.be/c206b17b968e','trying_to_rid_this_name','ngs_bouncer','ngs_force',NULL),
  (1112,1106,1012,0,'https://youtu.be/5a6c3eafa094','trying_to_rid_this_name','ngs_slayer','ngs_hunter',NULL),
  (1113,1106,1020,0,'https://youtu.be/6551424d9d9b','trying_to_rid_this_name','ngs_ranger','ngs_techter',NULL),
  (1114,1107,1013,0,'https://youtu.be/303f4167c96b','trying_to_rid_this_name','ngs_techter','ngs_slayer',NULL),
  (1115,1107,1018,0,'https://youtu.be/e422a5202940','trying_to_rid_this_name','ngs_hunter','ngs_gunner',NULL),
  (1116,1108,1014,0,'https://youtu.be/13e1f5014631','trying_to_rid_this_name','ngs_fighter','ngs_bouncer',NULL),
  (1117,1108,1010,0,'https://youtu.be/c33cba89900c','trying_to_rid_this_name','ngs_braver','ngs_slayer',NULL),
  (1118,1109,1013,0,'https://youtu.be/46d3435fa0ea','trying_to_rid_this_name','ngs_fighter','ngs_force',NULL),
  (1119,1109,1017,0,'https://youtu.be/871ce7c59443','trying_to_rid_this_name','ngs_slayer','ngs_hunter',NULL),
  (1120,1110,1015,0,'https://youtu.be/d317d6462872','trying_to_rid_this_name','ngs_ranger','ngs_techter',NULL),
  (1121,1110,1030,0,'https://youtu.be/abe1fc068aed','trying_to_rid_this_name','ngs_gunner','ngs_hunter',NULL),
  (1122,1111,1014,0,'https://youtu.be/0aaee353deff','trying_to_rid_this_name','ngs_techter','ngs_fighter',NULL),
  (1123,1111,1010,0,'https://youtu.be/2b6fcaa64d05','trying_to_rid_this_name','ngs_slayer','ngs_waker',NULL),
  (1124,1112,1017,0,'https://youtu.be/1d2bda5b2178','trying_to_rid_this_name','ngs_gunner','ngs_bouncer',NULL),
  (1125,1112,1011,0,'https://youtu.be/2f5eef3d6a3b','trying_to_rid_this_name','ngs_bouncer','ngs_fighter',NULL),
  (1126,1113,1016,0,'https://youtu.be/b3259cb1883b','trying_to_rid_this_name','ngs_force','ngs_hunter',NULL),
  (1127,1113,1022,0,'https://youtu.be/8c0e2f579308','trying_to_rid_this_name','ngs_slayer','ngs_slayer',NULL),
  (1128,1114,1011,0,'https://youtu.be/528a576c21cc','trying_to_rid_this_name','ngs_gunner','ngs_bouncer',NULL),
  (1129,1114,1026,0,'https://youtu.be/8298d1283321','trying_to_rid_this_name','ngs_waker','ngs_braver',NULL),
  (1130,1115,1012,0,'https://youtu.be/b325d39a45c7','trying_to_rid_this_name','ngs_force','ngs_bouncer',NULL),
  (1131,1115,1016,0,'https://youtu.be/2bd1e96d90d4','trying_to_rid_this_name','ngs_techter','ngs_braver',NULL),
  (1132,1116,1012,0,'https://youtu.be/e399f9333edd','trying_to_rid_this_name','ngs_force','ngs_slayer',NULL),
  (1133,1116,1016,0,'https://youtu.be/d558c561fc4c','trying_to_rid_this_name','ngs_techter','ngs_fighter',NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Purple Party
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (1200,1001,'ngs','purples','aelio','global','level80r',4,4,'0:12:55','Notes','2023-04-11T04:31:56Z',1,'2023-04-11T19:31:56Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1201,1017,'ngs','purples','aelio','japan','level80r',4,4,'0:15:01','Notes','2023-06-06T02:40:36Z',1,'2023-06-06T06:40:36Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1202,1011,'ngs','purples','aelio','global','60r',4,4,'0:17:47','Notes','2023-03-29T11:19:44Z',1,'2023-03-29T13:19:44Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1203,1013,'ngs','purples','aelio','global','pre60r',4,4,'0:18:16','Notes','2023-05-20T03:59:53Z',1,'2023-05-20T06:59:53Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1204,1001,'ngs','purples','aelio','global','pot6r',4,4,'0:16:51','Notes','2023-08-08T16:33:24Z',1,'2023-08-09T19:33:24Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1205,1011,'ngs','purples','aelio','japan','pre60r',4,4,'0:10:54','Notes','2023-06-25T03:07:28Z',1,'2023-06-25T03:12:28Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1206,1012,'ngs','purples','aelio','global','level75r',3,4,'0:17:21','Notes','2023-08-19T05:38:38Z',1,'2023-08-19T05:39:38Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1207,1013,'ngs','purples','aelio','global','lvl80grind',3,4,'0:15:53','Notes','2023-03-27T02:09:54Z',1,'2023-03-27T03:09:54Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1208,1014,'ngs','purples','aelio','japan','60r',3,4,'0:14:15','Notes','2023-03-05T08:07:47Z',1,'2023-04-05T09:07:47Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1209,1013,'ngs','purples','aelio','japan','60r',2,4,'0:13:41','Notes','2023-09-15T05:38:19Z',1,'2023-09-15T08:38:19Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1210,1015,'ngs','purples','aelio','global','pre60r',2,4,'0:17:24','Notes','2023-09-24T06:24:03Z',1,'2023-09-24T08:24:03Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1211,1014,'ngs','purples','aelio','japan','level75r',2,4,'0:18:37','Notes','2023-03-24T05:07:21Z',1,'2023-03-24T06:07:21Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1212,1017,'ngs','purples','aelio','global','level75r',1,4,'0:17:21','Notes','2023-07-07T03:22:31Z',1,'2023-07-07T04:22:31Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1213,1016,'ngs','purples','aelio','global','level80r',1,4,'0:13:39','Notes','2023-10-01T14:09:28Z',1,'2023-10-01T16:09:28Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1214,1011,'ngs','purples','aelio','global','60r',1,4,'0:19:36','Notes','2023-11-27T06:28:43Z',1,'2023-11-27T06:29:43Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1215,1012,'ngs','purples','aelio','global','pre60r',4,4,'0:15:39','Notes','2023-04-05T10:22:44Z',1,'2023-04-05T12:22:44Z','Mod Notes', NULL,'Tall Mommy Cool'),
  (1216,1012,'ngs','purples','aelio','global','level80r',4,4,'0:13:39','New Time succeeds old run','2023-09-11T10:31:58Z',1,'2023-09-11T12:31:58Z','Mod Notes', NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (1200,1200,1001,0,'https://youtu.be/3316cef55dea8','trying_to_rid_this_name','ngs_bouncer','ngs_braver',NULL),
  (1201,1200,1019,0,'https://youtu.be/edbf767cf4f87','trying_to_rid_this_name','ngs_fighter','ngs_waker',NULL),
  (1202,1200,1030,0,'https://youtu.be/511dc6633efe2','trying_to_rid_this_name','ngs_gunner','ngs_hunter',NULL),
  (1203,1200,1017,0,'https://youtu.be/7db827be20039','trying_to_rid_this_name','ngs_waker','ngs_gunner',NULL),
  (1204,1201,1017,0,'https://youtu.be/d687885ee0ea3','trying_to_rid_this_name','ngs_slayer','ngs_gunner',NULL),
  (1205,1201,1027,0,'https://youtu.be/164db9565c1f4','trying_to_rid_this_name','ngs_braver','ngs_techter',NULL),
  (1206,1201,1023,0,'https://youtu.be/71f45db642cd0','trying_to_rid_this_name','ngs_fighter','ngs_gunner',NULL),
  (1207,1201,1028,0,'https://youtu.be/cf479c6d4e10a','trying_to_rid_this_name','ngs_waker','ngs_fighter',NULL),
  (1208,1202,1011,0,'https://youtu.be/c7b6677b618ea','trying_to_rid_this_name','ngs_force','ngs_waker',NULL),
  (1209,1202,1018,0,'https://youtu.be/712c9ad0e45d2','trying_to_rid_this_name','ngs_fighter','ngs_force',NULL),
  (1210,1202,1008,0,'https://youtu.be/410a91f95587d','trying_to_rid_this_name','ngs_fighter','ngs_braver',NULL),
  (1211,1202,1005,0,'https://youtu.be/6b7769b77ab01','trying_to_rid_this_name','ngs_fighter','ngs_force',NULL),
  (1212,1203,1013,0,'https://youtu.be/ae7c6d63ce37d','trying_to_rid_this_name','ngs_ranger','ngs_hunter',NULL),
  (1213,1203,1003,0,'https://youtu.be/4b9326702c592','trying_to_rid_this_name','ngs_ranger','ngs_force',NULL),
  (1214,1203,1012,0,'https://youtu.be/ec07aa5bd7576','trying_to_rid_this_name','ngs_ranger','ngs_fighter',NULL),
  (1215,1203,1021,0,'https://youtu.be/674afc82d7643','trying_to_rid_this_name','ngs_bouncer','ngs_gunner',NULL),
  (1216,1204,1001,0,'https://youtu.be/b51c1541e9560','trying_to_rid_this_name','ngs_ranger','ngs_fighter',NULL),
  (1217,1204,1013,0,'https://youtu.be/005e608b6a347','trying_to_rid_this_name','ngs_braver','ngs_slayer',NULL),
  (1218,1204,1025,0,'https://youtu.be/81729cabe85f4','trying_to_rid_this_name','ngs_gunner','ngs_bouncer',NULL),
  (1219,1204,1001,0,'https://youtu.be/001903112c62d','trying_to_rid_this_name','ngs_waker','ngs_techter',NULL),
  (1220,1205,1011,0,'https://youtu.be/682528888aa1b','trying_to_rid_this_name','ngs_force','ngs_braver',NULL),
  (1221,1205,1014,0,'https://youtu.be/edbdbe54070b1','trying_to_rid_this_name','ngs_force','ngs_fighter',NULL),
  (1222,1205,1006,0,'https://youtu.be/64cfe8065afb8','trying_to_rid_this_name','ngs_bouncer','ngs_braver',NULL),
  (1223,1205,1026,0,'https://youtu.be/8246a8e4512a1','trying_to_rid_this_name','ngs_gunner','ngs_fighter',NULL),
  (1224,1206,1012,0,'https://youtu.be/a0967d181a830','trying_to_rid_this_name','ngs_slayer','ngs_gunner',NULL),
  (1225,1206,1019,0,'https://youtu.be/b9f09f990d41c','trying_to_rid_this_name','ngs_fighter','ngs_gunner',NULL),
  (1226,1206,1030,0,'https://youtu.be/233e2c4191888','trying_to_rid_this_name','ngs_fighter','ngs_braver',NULL),
  (1227,1206,1017,0,'https://youtu.be/430cc2734ecf6','trying_to_rid_this_name','ngs_force','ngs_techter',NULL),
  (1228,1207,1013,0,'https://youtu.be/b75e421008f51','trying_to_rid_this_name','ngs_force','ngs_fighter',NULL),
  (1229,1207,1029,0,'https://youtu.be/3d839aea9e238','trying_to_rid_this_name','ngs_hunter','ngs_braver',NULL),
  (1230,1207,1027,0,'https://youtu.be/1c889b370ef3d','trying_to_rid_this_name','ngs_force','ngs_braver',NULL),
  (1231,1207,1023,0,'https://youtu.be/e79a195bbf050','trying_to_rid_this_name','ngs_gunner','ngs_slayer',NULL),
  (1232,1208,1014,0,'https://youtu.be/e97fa5739cb27','trying_to_rid_this_name','ngs_force','ngs_fighter',NULL),
  (1233,1208,1021,0,'https://youtu.be/349ad624ffa40','trying_to_rid_this_name','ngs_braver','ngs_slayer',NULL),
  (1234,1208,1012,0,'https://youtu.be/c4cf69adbfd5d','trying_to_rid_this_name','ngs_waker','ngs_waker',NULL),
  (1235,1208,1026,0,'https://youtu.be/51ddb2b32b8dd','trying_to_rid_this_name','ngs_bouncer','ngs_braver',NULL),
  (1236,1209,1013,0,'https://youtu.be/3f2774ce03eff','trying_to_rid_this_name','ngs_techter','ngs_waker',NULL),
  (1237,1209,1011,0,'https://youtu.be/568e40b772151','trying_to_rid_this_name','ngs_force','ngs_braver',NULL),
  (1238,1209,1029,0,'https://youtu.be/9fac918b9b75f','trying_to_rid_this_name','ngs_techter','ngs_gunner',NULL),
  (1239,1209,1013,0,'https://youtu.be/dae39c4365e39','trying_to_rid_this_name','ngs_bouncer','ngs_waker',NULL),
  (1240,1210,1015,0,'https://youtu.be/933be92cf7fdf','trying_to_rid_this_name','ngs_braver','ngs_gunner',NULL),
  (1241,1210,1010,0,'https://youtu.be/9e37237ef4eaa','trying_to_rid_this_name','ngs_ranger','ngs_gunner',NULL),
  (1242,1210,1015,0,'https://youtu.be/c856b9d461769','trying_to_rid_this_name','ngs_bouncer','ngs_braver',NULL),
  (1243,1210,1003,0,'https://youtu.be/a330c9d102c39','trying_to_rid_this_name','ngs_force','ngs_ranger',NULL),
  (1244,1211,1014,0,'https://youtu.be/19cae2274ce1a','trying_to_rid_this_name','ngs_techter','ngs_ranger',NULL),
  (1245,1211,1017,0,'https://youtu.be/2baade5d8e57a','trying_to_rid_this_name','ngs_hunter','ngs_force',NULL),
  (1246,1211,1018,0,'https://youtu.be/79353945f1ca9','trying_to_rid_this_name','ngs_slayer','ngs_bouncer',NULL),
  (1247,1211,1028,0,'https://youtu.be/d05c1f0a43662','trying_to_rid_this_name','ngs_bouncer','ngs_slayer',NULL),
  (1248,1212,1017,0,'https://youtu.be/2e94dc569265d','trying_to_rid_this_name','ngs_techter','ngs_fighter',NULL),
  (1249,1212,1018,0,'https://youtu.be/481a73b2fdb55','trying_to_rid_this_name','ngs_force','ngs_braver',NULL),
  (1250,1212,1015,0,'https://youtu.be/b75aa8bd4f864','trying_to_rid_this_name','ngs_bouncer','ngs_fighter',NULL),
  (1251,1212,1021,0,'https://youtu.be/4e1402e2e470a','trying_to_rid_this_name','ngs_techter','ngs_force',NULL),
  (1252,1213,1016,0,'https://youtu.be/0a2800891bdc1','trying_to_rid_this_name','ngs_bouncer','ngs_slayer',NULL),
  (1253,1213,1005,0,'https://youtu.be/8268d03b81590','trying_to_rid_this_name','ngs_slayer','ngs_hunter',NULL),
  (1254,1213,1001,0,'https://youtu.be/2e5b21fd4ed14','trying_to_rid_this_name','ngs_braver','ngs_force',NULL),
  (1255,1213,1014,0,'https://youtu.be/da7924100b219','trying_to_rid_this_name','ngs_braver','ngs_bouncer',NULL),
  (1256,1214,1011,0,'https://youtu.be/bfe38bedbca93','trying_to_rid_this_name','ngs_techter','ngs_force',NULL),
  (1257,1214,1016,0,'https://youtu.be/0d39da0cda53e','trying_to_rid_this_name','ngs_slayer','ngs_waker',NULL),
  (1258,1214,1010,0,'https://youtu.be/58425114bf70b','trying_to_rid_this_name','ngs_fighter','ngs_slayer',NULL),
  (1259,1214,1030,0,'https://youtu.be/f5b2b5e497bab','trying_to_rid_this_name','ngs_force','ngs_ranger',NULL),
  (1260,1215,1012,0,'https://youtu.be/3c23545a02a09','trying_to_rid_this_name','ngs_force','ngs_fighter',NULL),
  (1261,1215,1027,0,'https://youtu.be/05e952f5aeab2','trying_to_rid_this_name','ngs_bouncer','ngs_fighter',NULL),
  (1262,1215,1017,0,'https://youtu.be/a4691be2cf59c','trying_to_rid_this_name','ngs_fighter','ngs_gunner',NULL),
  (1263,1215,1004,0,'https://youtu.be/e57dd0a8c7225','trying_to_rid_this_name','ngs_waker','ngs_force',NULL),
  (1264,1216,1012,0,'https://youtu.be/3c23545a02a09','trying_to_rid_this_name','ngs_force','ngs_gunner',NULL),
  (1265,1216,1027,0,'https://youtu.be/05e952f5aeab2','trying_to_rid_this_name','ngs_bouncer','ngs_force',NULL),
  (1266,1216,1017,0,'https://youtu.be/a4691be2cf59c','trying_to_rid_this_name','ngs_fighter','ngs_hunter',NULL),
  (1267,1216,1004,0,'https://youtu.be/e57dd0a8c7225','trying_to_rid_this_name','ngs_waker','ngs_slayer',NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Aegis Solo


-- Aegis Duo


-- Aegis Party


-- Venogia Solo


-- Venogia Duo


-- Venogia Party


-- Solus Solo


-- Solus Duo


-- Solus Party


-- Duel


-- Finish
SET IDENTITY_INSERT [dbo].[Runs] OFF;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Each table should have it's ID set properly after manual ID insertion
DECLARE @maxRunsId INT = (SELECT MAX(Id) from dbo.Runs)
dbcc checkident ('dbo.Runs', reseed, @maxRunsId);

DECLARE @maxRunPartyId INT = (SELECT MAX(Id) from dbo.RunParty)
dbcc checkident ('dbo.RunParty', reseed, @maxRunPartyId);
