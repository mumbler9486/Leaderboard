-- Purple Solo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (1000,1001,'ngs','purples','aelio','global','level80r',4,1,'0:12:55','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1001,1017,'ngs','purples','aelio','japan','level80r',4,1,'0:15:01','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1002,1011,'ngs','purples','aelio','global','60r',4,1,'0:17:47','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1003,1013,'ngs','purples','aelio','global','pre60r',4,1,'0:18:16','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1004,1001,'ngs','purples','aelio','global','pot6r',4,1,'0:16:51','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1005,1011,'ngs','purples','aelio','japan','pre60r',4,1,'0:10:54','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1006,1012,'ngs','purples','aelio','global','level75r',3,1,'0:17:21','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1007,1013,'ngs','purples','aelio','global','lvl80grind',3,1,'0:15:53','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1008,1014,'ngs','purples','aelio','japan','60r',3,1,'0:14:15','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1009,1013,'ngs','purples','aelio','japan','60r',2,1,'0:13:41','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1010,1015,'ngs','purples','aelio','global','pre60r',2,1,'0:17:24','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1011,1014,'ngs','purples','aelio','japan','level75r',2,1,'0:18:37','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1012,1017,'ngs','purples','aelio','global','level75r',1,1,'0:17:21','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1013,1016,'ngs','purples','aelio','global','level80r',1,1,'0:13:39','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1014,1011,'ngs','purples','aelio','global','60r',1,1,'0:19:36','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1015,1012,'ngs','purples','aelio','global','pre60r',4,1,'0:15:39','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool')
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
  (1015,1015,1012,0,'https://youtu.be/bU5C66Rai64j','trying_to_rid_this_name','ngs_braver','ngs_gunner','["ngs_jet_boots","ngs_jet_boots","ngs_wired_lance"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Purple Duo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (1100,1001,'ngs','purples','aelio','global','level80r',4,2,'0:12:55','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1101,1017,'ngs','purples','aelio','japan','level80r',4,2,'0:15:01','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1102,1011,'ngs','purples','aelio','global','60r',4,2,'0:17:47','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1103,1013,'ngs','purples','aelio','global','pre60r',4,2,'0:18:16','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1104,1001,'ngs','purples','aelio','global','pot6r',4,2,'0:16:51','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1105,1011,'ngs','purples','aelio','japan','pre60r',4,2,'0:10:54','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1106,1012,'ngs','purples','aelio','global','level75r',3,2,'0:17:21','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1107,1013,'ngs','purples','aelio','global','lvl80grind',3,2,'0:15:53','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1108,1014,'ngs','purples','aelio','japan','60r',3,2,'0:14:15','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1109,1013,'ngs','purples','aelio','japan','60r',2,2,'0:13:41','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1110,1015,'ngs','purples','aelio','global','pre60r',2,2,'0:17:24','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1111,1014,'ngs','purples','aelio','japan','level75r',2,2,'0:18:37','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1112,1017,'ngs','purples','aelio','global','level75r',1,2,'0:17:21','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1113,1016,'ngs','purples','aelio','global','level80r',1,2,'0:13:39','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1114,1011,'ngs','purples','aelio','global','60r',1,2,'0:19:36','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1115,1012,'ngs','purples','aelio','global','pre60r',4,2,'0:15:39','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool')
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
  (1130,1115,1012,0,'https://youtu.be/5dedb829566f','trying_to_rid_this_name','ngs_force','ngs_bouncer',NULL),
  (1131,1115,1016,0,'https://youtu.be/2bd1e96d90d4','trying_to_rid_this_name','ngs_techter','ngs_bouncer',NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Purple Party
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (1200,1001,'ngs','purples','aelio','global','level80r',4,4,'0:12:55','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1201,1017,'ngs','purples','aelio','japan','level80r',4,4,'0:15:01','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1202,1011,'ngs','purples','aelio','global','60r',4,4,'0:17:47','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1203,1013,'ngs','purples','aelio','global','pre60r',4,4,'0:18:16','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1204,1001,'ngs','purples','aelio','global','pot6r',4,4,'0:16:51','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1205,1011,'ngs','purples','aelio','japan','pre60r',4,4,'0:10:54','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1206,1012,'ngs','purples','aelio','global','level75r',3,4,'0:17:21','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1207,1013,'ngs','purples','aelio','global','lvl80grind',3,4,'0:15:53','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1208,1014,'ngs','purples','aelio','japan','60r',3,4,'0:14:15','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1209,1013,'ngs','purples','aelio','japan','60r',2,4,'0:13:41','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1210,1015,'ngs','purples','aelio','global','pre60r',2,4,'0:17:24','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1211,1014,'ngs','purples','aelio','japan','level75r',2,4,'0:18:37','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1212,1017,'ngs','purples','aelio','global','level75r',1,4,'0:17:21','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1213,1016,'ngs','purples','aelio','global','level80r',1,4,'0:13:39','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1214,1011,'ngs','purples','aelio','global','60r',1,4,'0:19:36','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool'),
  (1215,1012,'ngs','purples','aelio','global','pre60r',4,4,'0:15:39','Notes',GETUTCDATE(),1, GETUTCDATE(),'Mod Notes', NULL,'Tall Mommy Cool')
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
  (1263,1215,1004,0,'https://youtu.be/e57dd0a8c7225','trying_to_rid_this_name','ngs_waker','ngs_force',NULL)
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
