-- Vael Solo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (101000,1001,'ngs','malignant-ruine-luther','quest','global','level80r',1,1,'0:17:24','Test notes','2023-09-16T02:13:24Z',1,'2023-09-16T04:49:27Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101001,1017,'ngs','malignant-ruine-luther','quest','japan','level80r',1,1,'0:10:01','Test notes','2023-01-22T06:37:21Z',1,'2023-01-22T07:45:49Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101002,1011,'ngs','malignant-ruine-luther','quest','global','60r',1,1,'0:12:49','Test notes','2023-06-17T02:31:16Z',1,'2023-06-17T04:31:41Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101003,1013,'ngs','malignant-ruine-luther','quest','global','pre60r',1,1,'0:14:35','Test notes','2023-02-28T07:19:54Z',1,'2023-02-28T11:31:21Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101004,5000000,'ngs','malignant-ruine-luther','quest','global','pot6r',1,1,'0:14:04','Test notes','2023-03-19T09:49:23Z',1,'2023-03-19T21:21:04Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101005,1011,'ngs','malignant-ruine-luther','quest','japan','pre60r',1,1,'0:16:05','Test notes','2023-02-25T06:18:33Z',1,'2023-02-25T09:49:59Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101006,1012,'ngs','malignant-ruine-luther','quest','global','level75r',1,1,'0:13:37','Test notes','2023-07-16T16:46:12Z',1,'2023-07-17T02:15:40Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101007,1013,'ngs','malignant-ruine-luther','quest','global','lvl80grind',1,1,'0:13:16','Test notes','2023-04-17T11:19:35Z',1,'2023-04-17T16:15:31Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101008,1014,'ngs','malignant-ruine-luther','quest','japan','60r',1,1,'0:17:31','Test notes','2023-04-10T00:05:01Z',1,'2023-04-10T11:53:40Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101009,1013,'ngs','malignant-ruine-luther','quest','japan','60r',1,1,'0:16:14','Test notes','2023-01-14T11:56:00Z',1,'2023-01-14T16:36:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101010,1015,'ngs','malignant-ruine-luther','quest','global','pre60r',1,1,'0:19:01','Test notes','2023-07-21T07:13:58Z',1,'2023-07-21T10:07:12Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101011,1014,'ngs','malignant-ruine-luther','quest','japan','level75r',1,1,'0:15:02','Test notes','2023-09-30T13:05:45Z',1,'2023-09-30T15:01:39Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101012,1017,'ngs','malignant-ruine-luther','quest','global','level75r',1,1,'0:12:58','Test notes','2023-08-20T05:17:44Z',1,'2023-08-20T07:05:39Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101013,1016,'ngs','malignant-ruine-luther','quest','global','level80r',1,1,'0:14:18','Test notes','2023-03-28T16:43:09Z',1,'2023-03-29T03:57:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101014,1011,'ngs','malignant-ruine-luther','quest','japan','60r',1,1,'0:18:18','Test notes','2023-07-13T09:16:42Z',1,'2023-07-13T12:51:03Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101015,1012,'ngs','malignant-ruine-luther','quest','global','pre60r',1,1,'0:18:44','Test notes','2023-08-26T12:15:50Z',1,'2023-08-26T22:25:37Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101016,1012,'ngs','malignant-ruine-luther','quest','global','level80r',1,1,'0:16:28','New Time succeeds old run','2023-03-28T04:14:49Z',1,'2023-03-28T11:42:55Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (101017,5000000,'ngs','malignant-ruine-luther','quest','global','level80r',1,1,'0:13:52','Test not yet approved run','2023-05-10T02:14:07Z',0,NULL,NULL,NULL,NULL),
  (101018,5000000,'ngs','malignant-ruine-luther','quest','japan','level80r',1,1,'0:18:19','Test not yet approved run 2','2023-03-03T02:59:29Z',0,NULL,NULL,NULL,NULL),
  (101019,5000000,'ngs','malignant-ruine-luther','quest','global','level80r',1,1,'0:17:27','Test reject run','2023-05-27T17:18:04Z',9,'2023-05-28T00:48:22Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (101300,101000,1001,0,'https://youtu.be/019o3w1xDu3',N'trying_to_rid_this_name','ngs_force','ngs_braver','ngs_none','["ngs_sword","ngs_twin_daggers","ngs_talis"]'),
  (101301,101001,1017,0,'https://youtu.be/6K74pOyW3ew',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none','["ngs_assault_rifle","ngs_harmonizer","ngs_talis"]'),
  (101302,101002,1011,0,'https://youtu.be/3S6FidYktG6',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none','["ngs_sword","ngs_gunblade","ngs_rod"]'),
  (101303,101003,1013,0,'https://youtu.be/U3u2w8V83VS',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none','["ngs_wired_lance","ngs_assault_rifle"]'),
  (101304,101004,5000000,0,'https://youtu.be/pq9ahtK29H1',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none','["ngs_twin_daggers","ngs_knuckles","ngs_twin_machine_guns"]'),
  (101305,101005,1011,0,'https://youtu.be/z4b2im3LzJV',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_sword","ngs_wired_lance","ngs_wand"]'),
  (101306,101006,1012,0,'https://youtu.be/BekSeOvPwha',N'trying_to_rid_this_name','ngs_waker','ngs_slayer','ngs_none','["ngs_rod","ngs_talis","ngs_harmonizer"]'),
  (101307,101007,1013,0,'https://youtu.be/cvCN7X94d38',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none','["ngs_katana","ngs_soaring_blades","ngs_bow"]'),
  (101308,101008,1014,0,'https://youtu.be/t4g9f2C6mo9',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none','["ngs_sword","ngs_assault_rifle","ngs_launcher"]'),
  (101309,101009,1013,0,'https://youtu.be/jp4T8Dz8w4n',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none','["ngs_twin_daggers","ngs_assault_rifle","ngs_bow"]'),
  (101310,101010,1015,0,'https://youtu.be/pF1Df7KdofS',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none','["ngs_wired_lance","ngs_katana","ngs_wand"]'),
  (101311,101011,1014,0,'https://youtu.be/Uzw3Y01b39p',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none','["ngs_knuckles","ngs_katana","ngs_bow"]'),
  (101312,101012,1017,0,'https://youtu.be/kpTu3tjdJkS',N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none','["ngs_twin_daggers","ngs_launcher","ngs_rod"]'),
  (101313,101013,1016,0,'https://youtu.be/i4D0y09OZ1k',N'trying_to_rid_this_name','ngs_braver','ngs_ranger','ngs_none','["ngs_partisan","ngs_knuckles","ngs_harmonizer"]'),
  (101314,101014,1011,0,'https://youtu.be/rhQ11d4v1jA',N'trying_to_rid_this_name','ngs_fighter','ngs_waker','ngs_none','["ngs_sword","ngs_bow"]'),
  (101315,101015,1012,0,'https://youtu.be/vs46e2KH1o7',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_wired_lance","ngs_gunblade","ngs_bow"]'),
  (101316,101016,1012,0,'https://youtu.be/YXQW4TaqLwk',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_sword","ngs_gunblade","ngs_assault_rifle"]'),
  (101317,101017,5000000,0,'https://youtu.be/7oMZqMJR4gO',N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none','["ngs_bow","ngs_rod","ngs_jet_boots"]'),
  (101318,101018,5000000,0,'https://youtu.be/33kFuszJ7d1',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none','["ngs_twin_daggers","ngs_katana","ngs_gunblade"]'),
  (101319,101019,5000000,0,'https://youtu.be/Yy2kju8G1Yz',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none','["ngs_wired_lance","ngs_partisan","ngs_wand"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Vael Duo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (102000,1001,'ngs','malignant-ruine-luther','quest','global','level80r',1,2,'0:15:58','Test notes','2023-06-20T00:28:45Z',1,'2023-06-20T13:02:39Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102001,1017,'ngs','malignant-ruine-luther','quest','japan','level80r',1,2,'0:12:23','Test notes','2023-09-18T03:43:52Z',1,'2023-09-18T09:57:28Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102002,1011,'ngs','malignant-ruine-luther','quest','global','60r',1,2,'0:11:32','Test notes','2023-12-14T01:27:22Z',1,'2023-12-14T07:55:52Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102003,1013,'ngs','malignant-ruine-luther','quest','global','pre60r',1,2,'0:11:08','Test notes','2023-10-11T05:12:53Z',1,'2023-10-11T17:51:59Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102004,5000000,'ngs','malignant-ruine-luther','quest','global','pot6r',1,2,'0:16:59','Test notes','2023-04-11T04:31:56Z',1,'2023-04-11T15:43:12Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102005,1011,'ngs','malignant-ruine-luther','quest','japan','pre60r',1,2,'0:15:53','Test notes','2023-06-06T02:40:36Z',1,'2023-06-06T04:59:33Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102006,1012,'ngs','malignant-ruine-luther','quest','global','level75r',1,2,'0:10:30','Test notes','2023-03-29T11:19:44Z',1,'2023-03-29T22:05:15Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102007,1013,'ngs','malignant-ruine-luther','quest','global','lvl80grind',1,2,'0:16:16','Test notes','2023-05-20T03:59:53Z',1,'2023-05-20T04:21:43Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102008,1014,'ngs','malignant-ruine-luther','quest','japan','60r',1,2,'0:13:04','Test notes','2023-08-08T16:33:24Z',1,'2023-08-09T01:39:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102009,1013,'ngs','malignant-ruine-luther','quest','japan','60r',1,2,'0:10:03','Test notes','2023-06-25T03:07:28Z',1,'2023-06-25T13:35:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102010,1015,'ngs','malignant-ruine-luther','quest','global','pre60r',1,2,'0:16:21','Test notes','2023-08-19T05:38:38Z',1,'2023-08-19T17:14:17Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102011,1014,'ngs','malignant-ruine-luther','quest','japan','level75r',1,2,'0:12:48','Test notes','2023-03-27T02:09:54Z',1,'2023-03-27T03:46:14Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102012,1017,'ngs','malignant-ruine-luther','quest','global','level75r',1,2,'0:16:43','Test notes','2023-03-05T08:07:47Z',1,'2023-03-05T08:50:36Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102013,1016,'ngs','malignant-ruine-luther','quest','global','level80r',1,2,'0:12:53','Test notes','2023-09-15T05:38:19Z',1,'2023-09-15T17:34:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102014,1011,'ngs','malignant-ruine-luther','quest','japan','60r',1,2,'0:13:47','Test notes','2023-09-24T06:24:03Z',1,'2023-09-24T17:51:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102015,1012,'ngs','malignant-ruine-luther','quest','global','pre60r',1,2,'0:13:32','Test notes','2023-03-24T05:07:21Z',1,'2023-03-24T10:40:03Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102016,1012,'ngs','malignant-ruine-luther','quest','global','level80r',1,2,'0:12:44','New Time succeeds old run','2023-07-07T03:22:31Z',1,'2023-07-07T06:32:52Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (102017,5000000,'ngs','malignant-ruine-luther','quest','global','level80r',1,2,'0:12:42','Test not yet approved run','2023-08-16T19:13:59Z',0,NULL,NULL,NULL,NULL),
  (102018,5000000,'ngs','malignant-ruine-luther','quest','japan','level80r',1,2,'0:14:19','Test not yet approved run 2','2023-09-10T16:43:37Z',0,NULL,NULL,NULL,NULL),
  (102019,5000000,'ngs','malignant-ruine-luther','quest','japan','level80r',1,2,'0:16:30','Test reject run','2023-03-10T09:22:57Z',9,'2023-03-10T19:37:44Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (102000,102000,1001,0,'https://youtu.be/b413xDx5vEM',N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none',NULL),
  (102001,102000,1006,0,'https://youtu.be/A19ZkX014Go',N'trying_to_rid_this_name','ngs_bouncer','ngs_waker','ngs_none',NULL),
  
  (102002,102001,1017,0,'https://youtu.be/eM5M98vph09',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','ngs_none',NULL),
  (102003,102001,1030,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none',NULL),
  
  (102004,102002,1011,0,'https://youtu.be/Fw0S3pxjMJ7',N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none',NULL),
  (102005,102002,1023,0,'https://youtu.be/LNGxNQxoe6k',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none',NULL),
  
  (102006,102003,1013,0,'https://youtu.be/23kX2DY4vf3',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none',NULL),
  (102007,102003,1025,0,'https://youtu.be/xd0h9E5hQ9X',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none',NULL),
  
  (102008,102004,5000000,0,'https://youtu.be/yz83xA0M8VH',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none',NULL),
  (102009,102004,1021,0,'https://youtu.be/Ly9m46YKT64',N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none',NULL),
  
  (102010,102005,1011,0,'https://youtu.be/D6M2qp5pHg3',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none',NULL),
  (102011,102005,5000000,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none',NULL),
  
  (102012,102006,1012,0,'https://youtu.be/8YyuQyDiT0m',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none',NULL),
  (102013,102006,1020,0,'https://youtu.be/c8sY6K4NPtF',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none',NULL),
  
  (102014,102007,1013,0,'https://youtu.be/Ry5KL0nDgqC',N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none',NULL),
  (102015,102007,1018,0,'https://youtu.be/0OWqKu3YvWr',N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','ngs_none',NULL),
  
  (102016,102008,1014,0,'https://youtu.be/V7hDrU7EHpY',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none',NULL),
  (102017,102008,1010,0,'https://youtu.be/jLZ1FT6naV7',N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none',NULL),
  
  (102018,102009,1013,0,'https://youtu.be/p4OewWxE0br',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none',NULL),
  (102019,102009,1017,0,'https://youtu.be/0JcT4tT92K2',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none',NULL),
  
  (102020,102010,1015,0,'https://youtu.be/Z103EpDHw9T',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none',NULL),
  (102021,102010,1030,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none',NULL),
  
  (102022,102011,1014,0,'https://youtu.be/m2h7F1EcoUP',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none',NULL),
  (102023,102011,1010,0,'https://youtu.be/V3D0Jr641JB',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none',NULL),
  
  (102024,102012,1017,0,'https://youtu.be/OVCUw0tE915',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none',NULL),
  (102025,102012,1011,0,'https://youtu.be/Kc6Hz18j9Km',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none',NULL),
  
  (102026,102013,1016,0,'https://youtu.be/gy66D7yj3dG',N'trying_to_rid_this_name','ngs_force','ngs_hunter','ngs_none',NULL),
  (102027,102013,1022,0,'https://youtu.be/K67pwzq5vNo',N'trying_to_rid_this_name','ngs_slayer','ngs_slayer','ngs_none',NULL),
  
  (102028,102014,1011,0,'https://youtu.be/wZ02q75hwrW',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none',NULL),
  (102029,102014,1026,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none',NULL),
  
  (102030,102015,1012,0,'https://youtu.be/VO9H1P89jo1',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none',NULL),
  (102031,102015,1016,0,'https://youtu.be/SwAj274RX46',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none',NULL),
  
  (102032,102016,1012,0,'https://youtu.be/4mYhV52joiq',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none',NULL),
  (102033,102016,1016,0,'https://youtu.be/PY20AE7TS2z',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none',NULL),
  
  (102034,102017,5000000,0,'https://youtu.be/gF278fAu5e9',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none',NULL),
  (102035,102017,1022,0,'https://youtu.be/Ckc0q77W893',N'trying_to_rid_this_name','ngs_waker','ngs_techter','ngs_none',NULL),
  
  (102036,102018,5000000,0,'https://youtu.be/svDYnVy9ads',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none',NULL),
  (102037,102018,1030,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_force','ngs_none',NULL),
  
  (102038,102019,5000000,0,'https://youtu.be/b66aVncc6Ki',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none',NULL),
  (102039,102019,1029,0,'https://youtu.be/666Bu9OkfvN',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none',NULL)

;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Vael Party
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (103000,1001,'ngs','malignant-ruine-luther','quest','global','level80r',1,4,'0:16:32','Test notes','2023-10-01T14:09:28Z',1,'2023-10-01T18:35:44Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103001,1017,'ngs','malignant-ruine-luther','quest','japan','level80r',1,4,'0:14:23','Test notes','2023-11-27T06:28:43Z',1,'2023-11-27T11:06:11Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103002,1011,'ngs','malignant-ruine-luther','quest','global','60r',1,4,'0:16:56','Test notes','2023-10-05T10:22:44Z',1,'2023-10-05T23:03:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103003,1013,'ngs','malignant-ruine-luther','quest','global','pre60r',1,4,'0:14:36','Test notes','2023-09-11T10:31:58Z',1,'2023-09-11T14:01:48Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103004,5000000,'ngs','malignant-ruine-luther','quest','global','pot6r',1,4,'0:10:38','Test notes','2023-03-22T20:45:15Z',1,'2023-03-22T21:52:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103005,1011,'ngs','malignant-ruine-luther','quest','japan','pre60r',1,4,'0:11:58','Test notes','2023-08-25T16:38:00Z',1,'2023-08-26T02:07:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103006,1012,'ngs','malignant-ruine-luther','quest','global','level75r',1,4,'0:18:58','Test notes','2023-07-11T22:43:51Z',1,'2023-07-12T04:04:07Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103007,1013,'ngs','malignant-ruine-luther','quest','global','lvl80grind',1,4,'0:12:02','Test notes','2023-08-18T02:28:59Z',1,'2023-08-18T13:18:22Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103008,1014,'ngs','malignant-ruine-luther','quest','japan','60r',1,4,'0:16:17','Test notes','2023-04-16T02:06:41Z',1,'2023-04-16T14:19:57Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103009,1013,'ngs','malignant-ruine-luther','quest','japan','60r',1,4,'0:17:58','Test notes','2023-12-27T08:53:09Z',1,'2023-12-27T14:17:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103010,1015,'ngs','malignant-ruine-luther','quest','global','pre60r',1,4,'0:16:15','Test notes','2023-10-29T15:25:08Z',1,'2023-10-30T00:46:43Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103011,1014,'ngs','malignant-ruine-luther','quest','japan','level75r',1,4,'0:12:58','Test notes','2023-05-01T15:06:13Z',1,'2023-05-02T00:07:28Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103012,1017,'ngs','malignant-ruine-luther','quest','global','level75r',1,4,'0:14:16','Test notes','2023-01-27T21:01:37Z',1,'2023-01-27T22:06:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103013,1016,'ngs','malignant-ruine-luther','quest','global','level80r',1,4,'0:16:42','Test notes','2023-05-31T10:37:01Z',1,'2023-05-31T16:39:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103014,1011,'ngs','malignant-ruine-luther','quest','japan','60r',1,4,'0:15:09','Test notes','2023-06-27T07:53:54Z',1,'2023-06-27T15:56:03Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103015,1012,'ngs','malignant-ruine-luther','quest','global','pre60r',1,4,'0:18:13','Test notes','2023-09-24T23:10:35Z',1,'2023-09-25T03:28:02Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103016,1012,'ngs','malignant-ruine-luther','quest','global','level80r',1,4,'0:17:52','New Time succeeds old run','2023-05-27T16:24:07Z',1,'2023-05-28T00:41:36Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (103017,5000000,'ngs','malignant-ruine-luther','quest','global','level80r',1,4,'0:19:16','Test not yet approved run','2023-03-13T18:45:39Z',0,NULL,NULL,NULL,NULL),
  (103018,5000000,'ngs','malignant-ruine-luther','quest','japan','level80r',1,4,'0:13:00','Test not yet approved run 2','2023-12-18T15:58:54Z',0,NULL,NULL,NULL,NULL),
  (103019,5000000,'ngs','malignant-ruine-luther','quest','global','level80r',1,4,'0:13:56','Test reject run','2023-06-19T13:42:11Z',9,'2023-06-19T13:42:11Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (103000,103000,1001,0,'https://youtu.be/5R9Hir1U5uh',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (103001,103000,1014,0,'https://youtu.be/aEfw7W9719T',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none', NULL),
  (103002,103000,1003,0,'https://youtu.be/BSLeBVU1Nk8',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (103003,103000,1012,0,'https://youtu.be/73zrHXB8RgW',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none', NULL),
  
  (103008,103001,1017,0,'https://youtu.be/6krKBpFvgXi',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none', NULL),
  (103009,103001,1013,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (103010,103001,1016,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (103011,103001,1018,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none', NULL),
  
  (103016,103002,1011,0,'https://youtu.be/3zmq1QMCtv3',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','ngs_none', NULL),
  (103017,103002,1023,0,'https://youtu.be/tC5v5wR6LY9',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (103018,103002,1021,0,'https://youtu.be/w24RurvpW7T',N'trying_to_rid_this_name','ngs_waker','ngs_ranger','ngs_none', NULL),
  (103019,103002,1019,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none', NULL),
  
  (103024,103003,1013,0,'https://youtu.be/EEF7ze3Vq23',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (103025,103003,1009,0,'https://youtu.be/zMuTe0V7Ohi',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none', NULL),
  (103026,103003,1004,0,'https://youtu.be/ciV07a2Ly6P',N'trying_to_rid_this_name','ngs_gunner','ngs_fighter','ngs_none', NULL),
  (103027,103003,1028,0,'https://youtu.be/1qJ4K25zJ2C',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),

  (103032,103004,5000000,0,'https://youtu.be/2KPPUC0PmU2',N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),
  (103033,103004,1010,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunter','ngs_none', NULL),
  (103034,103004,1008,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),
  (103035,103004,1009,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','ngs_none', NULL),
  
  (103040,103005,1011,0,'https://youtu.be/YRayt4nQRt5',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),
  (103041,103005,1010,0,'https://youtu.be/y5318PUcRaC',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (103042,103005,1026,0,'https://youtu.be/U6zD6Z7Z9g6',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (103043,103005,1001,0,'https://youtu.be/Qa7GNu8a1PL',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  
  (103048,103006,1012,0,'https://youtu.be/5D377Oa5eyP',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (103049,103006,1004,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (103050,103006,1028,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_ranger','ngs_none', NULL),
  (103051,103006,1015,0,'https://youtu.be/tdOw3CeBwL1',N'trying_to_rid_this_name','ngs_hunter','ngs_fighter','ngs_none', NULL),
  
  (103056,103007,1013,0,'https://youtu.be/uQAdE597QcH',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (103057,103007,1020,0,'https://youtu.be/yZi58JDVchz',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none', NULL),
  (103058,103007,1023,0,'https://youtu.be/Y1gUtgU9h1K',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (103059,103007,1007,0,'https://youtu.be/3x0mu9ta7SR',N'trying_to_rid_this_name','ngs_techter','ngs_bouncer','ngs_none', NULL),

  (103064,103008,1014,0,'https://youtu.be/6pW4s74zgzj',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),
  (103065,103008,1005,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (103066,103008,1013,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_techter','ngs_none', NULL),
  (103067,103008,1017,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),

  (103072,103009,1013,0,'https://youtu.be/GMsc3124QSB',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (103073,103009,1012,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),
  (103074,103009,5000000,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),
  (103075,103009,1006,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_force','ngs_none', NULL),

  (103080,103010,1015,0,'https://youtu.be/PR5ucm9698h',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none', NULL),
  (103081,103010,1012,0,'https://youtu.be/dDnsK5rVdyi',N'trying_to_rid_this_name','ngs_braver','ngs_hunter','ngs_none', NULL),
  (103082,103010,1007,0,'https://youtu.be/1vD4db604TH',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (103083,103010,1006,0,'https://youtu.be/YQ26CDd55MF',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),

  (103088,103011,1014,0,'https://youtu.be/fi0a4C6pabk',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (103089,103011,1011,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (103090,103011,1007,0,'https://youtu.be/1cDqvpOKWDe',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (103091,103011,1022,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none', NULL),

  (103096,103012,1017,0,'https://youtu.be/0UtG19z5rbW',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),
  (103097,103012,1011,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger','ngs_none', NULL),
  (103098,103012,1028,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_waker','ngs_none', NULL),
  (103099,103012,1019,0,'https://youtu.be/970K007g95t',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),

  (103104,103013,1016,0,'https://youtu.be/7mjZbaru0ja',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (103105,103013,1013,0,'https://youtu.be/2bGYZ8td2Vk',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),
  (103106,103013,1025,0,'https://youtu.be/yY76Zt4u4n9',N'trying_to_rid_this_name','ngs_fighter','ngs_hunter','ngs_none', NULL),
  (103107,103013,1004,0,'https://youtu.be/9AzqXB31Li5',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),

  (103112,103014,1011,0,'https://youtu.be/bAA5L60oLw8',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (103113,103014,1015,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (103114,103014,1018,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (103115,103014,1006,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),

  (103120,103015,1012,0,'https://youtu.be/14p223zGGjR',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','ngs_none', NULL),
  (103121,103015,1001,0,'https://youtu.be/NiPW1H4Rv08',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (103122,103015,1007,0,'https://youtu.be/7msHO098g8u',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none', NULL),
  (103123,103015,1010,0,'https://youtu.be/o6U1Hfg1dn4',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none', NULL),

  (103128,103016,1012,0,'https://youtu.be/2aAJP3Oie0W',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none', NULL),
  (103129,103016,1023,0,'https://youtu.be/uD7eOkV2W63',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none', NULL),
  (103130,103016,1030,0,'https://youtu.be/Or2K1Bf4oL3',N'trying_to_rid_this_name','ngs_hunter','ngs_slayer','ngs_none', NULL),
  (103131,103016,5000000,0,'https://youtu.be/46AA06R9whj',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none', NULL),

  (103136,103017,5000000,0,'https://youtu.be/1d6c3ushLxb',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (103137,103017,1001,0,'https://youtu.be/5Jzs4h6ftq1',N'trying_to_rid_this_name','ngs_bouncer','ngs_gunner','ngs_none', NULL),
  (103138,103017,1005,0,'https://youtu.be/10rG222a9ko',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (103139,103017,1020,0,'https://youtu.be/BHd622VC6m4',N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','ngs_none', NULL),

  (103144,103018,5000000,0,'https://youtu.be/b0UddRkaxU9',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none', NULL),
  (103145,103018,1019,0,'https://youtu.be/1D20FK8LAkX',N'trying_to_rid_this_name','ngs_fighter','ngs_braver','ngs_none', NULL),
  (103146,103018,1012,0,'https://youtu.be/0p8j3aeeyAf',N'trying_to_rid_this_name','ngs_gunner','ngs_braver','ngs_none', NULL),
  (103147,103018,1022,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none', NULL),

  (103152,103019,5000000,0,'https://youtu.be/BM678K72V2U',N'trying_to_rid_this_name','ngs_slayer','ngs_fighter','ngs_none', NULL),
  (103153,103019,1005,0,'https://youtu.be/7NSgwN09G37',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none', NULL),
  (103154,103019,1010,0,'https://youtu.be/Li80rowSUN2',N'trying_to_rid_this_name','ngs_force','ngs_waker','ngs_none', NULL),
  (103155,103019,1006,0,'https://youtu.be/dz3507gXgJG',N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none', NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

