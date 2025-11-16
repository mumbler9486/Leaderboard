-- Vael Solo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (81000,1001,'ngs','dfvael','urgent_quest','global','level80r',1,1,'0:17:24','Test notes','2023-09-16T02:13:24Z',1,'2023-09-16T04:49:27Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81001,1017,'ngs','dfvael','urgent_quest','japan','level80r',1,1,'0:10:01','Test notes','2023-01-22T06:37:21Z',1,'2023-01-22T07:45:49Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81002,1011,'ngs','dfvael','quest','global','60r',1,1,'0:12:49','Test notes','2023-06-17T02:31:16Z',1,'2023-06-17T04:31:41Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81003,1013,'ngs','dfvael','urgent_quest','global','pre60r',1,1,'0:14:35','Test notes','2023-02-28T07:19:54Z',1,'2023-02-28T11:31:21Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81004,5000000,'ngs','dfvael','urgent_quest','global','pot6r',1,1,'0:14:04','Test notes','2023-03-19T09:49:23Z',1,'2023-03-19T21:21:04Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81005,1011,'ngs','dfvael','urgent_quest','japan','pre60r',1,1,'0:16:05','Test notes','2023-02-25T06:18:33Z',1,'2023-02-25T09:49:59Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81006,1012,'ngs','dfvael','urgent_quest','global','level75r',1,1,'0:13:37','Test notes','2023-07-16T16:46:12Z',1,'2023-07-17T02:15:40Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81007,1013,'ngs','dfvael','urgent_quest','global','lvl80grind',1,1,'0:13:16','Test notes','2023-04-17T11:19:35Z',1,'2023-04-17T16:15:31Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81008,1014,'ngs','dfvael','quest','japan','60r',1,1,'0:17:31','Test notes','2023-04-10T00:05:01Z',1,'2023-04-10T11:53:40Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81009,1013,'ngs','dfvael','urgent_quest','japan','60r',1,1,'0:16:14','Test notes','2023-01-14T11:56:00Z',1,'2023-01-14T16:36:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81010,1015,'ngs','dfvael','urgent_quest','global','pre60r',1,1,'0:19:01','Test notes','2023-07-21T07:13:58Z',1,'2023-07-21T10:07:12Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81011,1014,'ngs','dfvael','quest','japan','level75r',1,1,'0:15:02','Test notes','2023-09-30T13:05:45Z',1,'2023-09-30T15:01:39Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81012,1017,'ngs','dfvael','urgent_quest','global','level75r',1,1,'0:12:58','Test notes','2023-08-20T05:17:44Z',1,'2023-08-20T07:05:39Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81013,1016,'ngs','dfvael','urgent_quest','global','level80r',1,1,'0:14:18','Test notes','2023-03-28T16:43:09Z',1,'2023-03-29T03:57:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81014,1011,'ngs','dfvael','urgent_quest','japan','60r',1,1,'0:18:18','Test notes','2023-07-13T09:16:42Z',1,'2023-07-13T12:51:03Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81015,1012,'ngs','dfvael','quest','global','pre60r',1,1,'0:18:44','Test notes','2023-08-26T12:15:50Z',1,'2023-08-26T22:25:37Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81016,1012,'ngs','dfvael','urgent_quest','global','level80r',1,1,'0:16:28','New Time succeeds old run','2023-03-28T04:14:49Z',1,'2023-03-28T11:42:55Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (81017,5000000,'ngs','dfvael','urgent_quest','global','level80r',1,1,'0:13:52','Test not yet approved run','2023-05-10T02:14:07Z',0,NULL,NULL,NULL,NULL),
  (81018,5000000,'ngs','dfvael','urgent_quest','japan','level80r',1,1,'0:18:19','Test not yet approved run 2','2023-03-03T02:59:29Z',0,NULL,NULL,NULL,NULL),
  (81019,5000000,'ngs','dfvael','urgent_quest','global','level80r',1,1,'0:17:27','Test reject run','2023-05-27T17:18:04Z',9,'2023-05-28T00:48:22Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (81300,81000,1001,0,'https://youtu.be/019o3w1xDu3',N'trying_to_rid_this_name','ngs_force','ngs_braver','ngs_none','["ngs_sword","ngs_twin_daggers","ngs_talis"]'),
  (81301,81001,1017,0,'https://youtu.be/6K74pOyW3ew',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none','["ngs_assault_rifle","ngs_harmonizer","ngs_talis"]'),
  (81302,81002,1011,0,'https://youtu.be/3S6FidYktG6',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none','["ngs_sword","ngs_gunblade","ngs_rod"]'),
  (81303,81003,1013,0,'https://youtu.be/U3u2w8V83VS',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none','["ngs_wired_lance","ngs_assault_rifle"]'),
  (81304,81004,5000000,0,'https://youtu.be/pq9ahtK29H1',N'trying_to_rid_this_name','ngs_techter','ngs_force','ngs_none','["ngs_twin_daggers","ngs_knuckles","ngs_twin_machine_guns"]'),
  (81305,81005,1011,0,'https://youtu.be/z4b2im3LzJV',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_sword","ngs_wired_lance","ngs_wand"]'),
  (81306,81006,1012,0,'https://youtu.be/BekSeOvPwha',N'trying_to_rid_this_name','ngs_waker','ngs_slayer','ngs_none','["ngs_rod","ngs_talis","ngs_harmonizer"]'),
  (81307,81007,1013,0,'https://youtu.be/cvCN7X94d38',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none','["ngs_katana","ngs_soaring_blades","ngs_bow"]'),
  (81308,81008,1014,0,'https://youtu.be/t4g9f2C6mo9',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none','["ngs_sword","ngs_assault_rifle","ngs_launcher"]'),
  (81309,81009,1013,0,'https://youtu.be/jp4T8Dz8w4n',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none','["ngs_twin_daggers","ngs_assault_rifle","ngs_bow"]'),
  (81310,81010,1015,0,'https://youtu.be/pF1Df7KdofS',N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none','["ngs_wired_lance","ngs_katana","ngs_wand"]'),
  (81311,81011,1014,0,'https://youtu.be/Uzw3Y01b39p',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none','["ngs_knuckles","ngs_katana","ngs_bow"]'),
  (81312,81012,1017,0,'https://youtu.be/kpTu3tjdJkS',N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none','["ngs_twin_daggers","ngs_launcher","ngs_rod"]'),
  (81313,81013,1016,0,'https://youtu.be/i4D0y09OZ1k',N'trying_to_rid_this_name','ngs_braver','ngs_ranger','ngs_none','["ngs_partisan","ngs_knuckles","ngs_harmonizer"]'),
  (81314,81014,1011,0,'https://youtu.be/rhQ11d4v1jA',N'trying_to_rid_this_name','ngs_fighter','ngs_waker','ngs_none','["ngs_sword","ngs_bow"]'),
  (81315,81015,1012,0,'https://youtu.be/vs46e2KH1o7',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_wired_lance","ngs_gunblade","ngs_bow"]'),
  (81316,81016,1012,0,'https://youtu.be/YXQW4TaqLwk',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none','["ngs_sword","ngs_gunblade","ngs_assault_rifle"]'),
  (81317,81017,5000000,0,'https://youtu.be/7oMZqMJR4gO',N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none','["ngs_bow","ngs_rod","ngs_jet_boots"]'),
  (81318,81018,5000000,0,'https://youtu.be/33kFuszJ7d1',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none','["ngs_twin_daggers","ngs_katana","ngs_gunblade"]'),
  (81319,81019,5000000,0,'https://youtu.be/Yy2kju8G1Yz',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none','["ngs_wired_lance","ngs_partisan","ngs_wand"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Vael Duo
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (82000,1001,'ngs','dfvael','urgent_quest','global','level80r',1,2,'0:15:58','Test notes','2023-06-20T00:28:45Z',1,'2023-06-20T13:02:39Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82001,1017,'ngs','dfvael','urgent_quest','japan','level80r',1,2,'0:12:23','Test notes','2023-09-18T03:43:52Z',1,'2023-09-18T09:57:28Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82002,1011,'ngs','dfvael','quest','global','60r',1,2,'0:11:32','Test notes','2023-12-14T01:27:22Z',1,'2023-12-14T07:55:52Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82003,1013,'ngs','dfvael','urgent_quest','global','pre60r',1,2,'0:11:08','Test notes','2023-10-11T05:12:53Z',1,'2023-10-11T17:51:59Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82004,5000000,'ngs','dfvael','urgent_quest','global','pot6r',1,2,'0:16:59','Test notes','2023-04-11T04:31:56Z',1,'2023-04-11T15:43:12Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82005,1011,'ngs','dfvael','urgent_quest','japan','pre60r',1,2,'0:15:53','Test notes','2023-06-06T02:40:36Z',1,'2023-06-06T04:59:33Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82006,1012,'ngs','dfvael','urgent_quest','global','level75r',1,2,'0:10:30','Test notes','2023-03-29T11:19:44Z',1,'2023-03-29T22:05:15Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82007,1013,'ngs','dfvael','quest','global','lvl80grind',1,2,'0:16:16','Test notes','2023-05-20T03:59:53Z',1,'2023-05-20T04:21:43Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82008,1014,'ngs','dfvael','urgent_quest','japan','60r',1,2,'0:13:04','Test notes','2023-08-08T16:33:24Z',1,'2023-08-09T01:39:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82009,1013,'ngs','dfvael','quest','japan','60r',1,2,'0:10:03','Test notes','2023-06-25T03:07:28Z',1,'2023-06-25T13:35:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82010,1015,'ngs','dfvael','urgent_quest','global','pre60r',1,2,'0:16:21','Test notes','2023-08-19T05:38:38Z',1,'2023-08-19T17:14:17Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82011,1014,'ngs','dfvael','urgent_quest','japan','level75r',1,2,'0:12:48','Test notes','2023-03-27T02:09:54Z',1,'2023-03-27T03:46:14Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82012,1017,'ngs','dfvael','quest','global','level75r',1,2,'0:16:43','Test notes','2023-03-05T08:07:47Z',1,'2023-03-05T08:50:36Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82013,1016,'ngs','dfvael','urgent_quest','global','level80r',1,2,'0:12:53','Test notes','2023-09-15T05:38:19Z',1,'2023-09-15T17:34:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82014,1011,'ngs','dfvael','urgent_quest','japan','60r',1,2,'0:13:47','Test notes','2023-09-24T06:24:03Z',1,'2023-09-24T17:51:32Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82015,1012,'ngs','dfvael','quest','global','pre60r',1,2,'0:13:32','Test notes','2023-03-24T05:07:21Z',1,'2023-03-24T10:40:03Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82016,1012,'ngs','dfvael','urgent_quest','global','level80r',1,2,'0:12:44','New Time succeeds old run','2023-07-07T03:22:31Z',1,'2023-07-07T06:32:52Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (82017,5000000,'ngs','dfvael','urgent_quest','global','level80r',1,2,'0:12:42','Test not yet approved run','2023-08-16T19:13:59Z',0,NULL,NULL,NULL,NULL),
  (82018,5000000,'ngs','dfvael','urgent_quest','japan','level80r',1,2,'0:14:19','Test not yet approved run 2','2023-09-10T16:43:37Z',0,NULL,NULL,NULL,NULL),
  (82019,5000000,'ngs','dfvael','urgent_quest','japan','level80r',1,2,'0:16:30','Test reject run','2023-03-10T09:22:57Z',9,'2023-03-10T19:37:44Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (82000,82000,1001,0,'https://youtu.be/b413xDx5vEM',N'trying_to_rid_this_name','ngs_gunner','ngs_force','ngs_none',NULL),
  (82001,82000,1006,0,'https://youtu.be/A19ZkX014Go',N'trying_to_rid_this_name','ngs_bouncer','ngs_waker','ngs_none',NULL),
  
  (82002,82001,1017,0,'https://youtu.be/eM5M98vph09',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','ngs_none',NULL),
  (82003,82001,1030,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_bouncer','ngs_none',NULL),
  
  (82004,82002,1011,0,'https://youtu.be/Fw0S3pxjMJ7',N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none',NULL),
  (82005,82002,1023,0,'https://youtu.be/LNGxNQxoe6k',N'trying_to_rid_this_name','ngs_fighter','ngs_slayer','ngs_none',NULL),
  
  (82006,82003,1013,0,'https://youtu.be/23kX2DY4vf3',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none',NULL),
  (82007,82003,1025,0,'https://youtu.be/xd0h9E5hQ9X',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none',NULL),
  
  (82008,82004,5000000,0,'https://youtu.be/yz83xA0M8VH',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none',NULL),
  (82009,82004,1021,0,'https://youtu.be/Ly9m46YKT64',N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none',NULL),
  
  (82010,82005,1011,0,'https://youtu.be/D6M2qp5pHg3',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none',NULL),
  (82011,82005,5000000,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none',NULL),
  
  (82012,82006,1012,0,'https://youtu.be/8YyuQyDiT0m',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none',NULL),
  (82013,82006,1020,0,'https://youtu.be/c8sY6K4NPtF',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none',NULL),
  
  (82014,82007,1013,0,'https://youtu.be/Ry5KL0nDgqC',N'trying_to_rid_this_name','ngs_techter','ngs_slayer','ngs_none',NULL),
  (82015,82007,1018,0,'https://youtu.be/0OWqKu3YvWr',N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','ngs_none',NULL),
  
  (82016,82008,1014,0,'https://youtu.be/V7hDrU7EHpY',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none',NULL),
  (82017,82008,1010,0,'https://youtu.be/jLZ1FT6naV7',N'trying_to_rid_this_name','ngs_braver','ngs_slayer','ngs_none',NULL),
  
  (82018,82009,1013,0,'https://youtu.be/p4OewWxE0br',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none',NULL),
  (82019,82009,1017,0,'https://youtu.be/0JcT4tT92K2',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none',NULL),
  
  (82020,82010,1015,0,'https://youtu.be/Z103EpDHw9T',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none',NULL),
  (82021,82010,1030,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none',NULL),
  
  (82022,82011,1014,0,'https://youtu.be/m2h7F1EcoUP',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none',NULL),
  (82023,82011,1010,0,'https://youtu.be/V3D0Jr641JB',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','ngs_none',NULL),
  
  (82024,82012,1017,0,'https://youtu.be/OVCUw0tE915',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none',NULL),
  (82025,82012,1011,0,'https://youtu.be/Kc6Hz18j9Km',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none',NULL),
  
  (82026,82013,1016,0,'https://youtu.be/gy66D7yj3dG',N'trying_to_rid_this_name','ngs_force','ngs_hunter','ngs_none',NULL),
  (82027,82013,1022,0,'https://youtu.be/K67pwzq5vNo',N'trying_to_rid_this_name','ngs_slayer','ngs_slayer','ngs_none',NULL),
  
  (82028,82014,1011,0,'https://youtu.be/wZ02q75hwrW',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none',NULL),
  (82029,82014,1026,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none',NULL),
  
  (82030,82015,1012,0,'https://youtu.be/VO9H1P89jo1',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none',NULL),
  (82031,82015,1016,0,'https://youtu.be/SwAj274RX46',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none',NULL),
  
  (82032,82016,1012,0,'https://youtu.be/4mYhV52joiq',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none',NULL),
  (82033,82016,1016,0,'https://youtu.be/PY20AE7TS2z',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none',NULL),
  
  (82034,82017,5000000,0,'https://youtu.be/gF278fAu5e9',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none',NULL),
  (82035,82017,1022,0,'https://youtu.be/Ckc0q77W893',N'trying_to_rid_this_name','ngs_waker','ngs_techter','ngs_none',NULL),
  
  (82036,82018,5000000,0,'https://youtu.be/svDYnVy9ads',N'trying_to_rid_this_name','ngs_braver','ngs_gunner','ngs_none',NULL),
  (82037,82018,1030,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_force','ngs_none',NULL),
  
  (82038,82019,5000000,0,'https://youtu.be/b66aVncc6Ki',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none',NULL),
  (82039,82019,1029,0,'https://youtu.be/666Bu9OkfvN',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none',NULL)

;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Vael Party
SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (83000,1001,'ngs','dfvael','urgent_quest','global','level80r',1,4,'0:16:32','Test notes','2023-10-01T14:09:28Z',1,'2023-10-01T18:35:44Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83001,1017,'ngs','dfvael','quest','japan','level80r',1,4,'0:14:23','Test notes','2023-11-27T06:28:43Z',1,'2023-11-27T11:06:11Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83002,1011,'ngs','dfvael','quest','global','60r',1,4,'0:16:56','Test notes','2023-10-05T10:22:44Z',1,'2023-10-05T23:03:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83003,1013,'ngs','dfvael','urgent_quest','global','pre60r',1,4,'0:14:36','Test notes','2023-09-11T10:31:58Z',1,'2023-09-11T14:01:48Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83004,5000000,'ngs','dfvael','urgent_quest','global','pot6r',1,4,'0:10:38','Test notes','2023-03-22T20:45:15Z',1,'2023-03-22T21:52:06Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83005,1011,'ngs','dfvael','urgent_quest','japan','pre60r',1,4,'0:11:58','Test notes','2023-08-25T16:38:00Z',1,'2023-08-26T02:07:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83006,1012,'ngs','dfvael','quest','global','level75r',1,4,'0:18:58','Test notes','2023-07-11T22:43:51Z',1,'2023-07-12T04:04:07Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83007,1013,'ngs','dfvael','urgent_quest','global','lvl80grind',1,4,'0:12:02','Test notes','2023-08-18T02:28:59Z',1,'2023-08-18T13:18:22Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83008,1014,'ngs','dfvael','urgent_quest','japan','60r',1,4,'0:16:17','Test notes','2023-04-16T02:06:41Z',1,'2023-04-16T14:19:57Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83009,1013,'ngs','dfvael','quest','japan','60r',1,4,'0:17:58','Test notes','2023-12-27T08:53:09Z',1,'2023-12-27T14:17:58Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83010,1015,'ngs','dfvael','urgent_quest','global','pre60r',1,4,'0:16:15','Test notes','2023-10-29T15:25:08Z',1,'2023-10-30T00:46:43Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83011,1014,'ngs','dfvael','quest','japan','level75r',1,4,'0:12:58','Test notes','2023-05-01T15:06:13Z',1,'2023-05-02T00:07:28Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83012,1017,'ngs','dfvael','urgent_quest','global','level75r',1,4,'0:14:16','Test notes','2023-01-27T21:01:37Z',1,'2023-01-27T22:06:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83013,1016,'ngs','dfvael','urgent_quest','global','level80r',1,4,'0:16:42','Test notes','2023-05-31T10:37:01Z',1,'2023-05-31T16:39:46Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83014,1011,'ngs','dfvael','quest','japan','60r',1,4,'0:15:09','Test notes','2023-06-27T07:53:54Z',1,'2023-06-27T15:56:03Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83015,1012,'ngs','dfvael','urgent_quest','global','pre60r',1,4,'0:18:13','Test notes','2023-09-24T23:10:35Z',1,'2023-09-25T03:28:02Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83016,1012,'ngs','dfvael','urgent_quest','global','level80r',1,4,'0:17:52','New Time succeeds old run','2023-05-27T16:24:07Z',1,'2023-05-28T00:41:36Z','Test Mod Notes',NULL,'Tall Mommy Cool'),
  (83017,5000000,'ngs','dfvael','urgent_quest','global','level80r',1,4,'0:19:16','Test not yet approved run','2023-03-13T18:45:39Z',0,NULL,NULL,NULL,NULL),
  (83018,5000000,'ngs','dfvael','urgent_quest','japan','level80r',1,4,'0:13:00','Test not yet approved run 2','2023-12-18T15:58:54Z',0,NULL,NULL,NULL,NULL),
  (83019,5000000,'ngs','dfvael','urgent_quest','global','level80r',1,4,'0:13:56','Test reject run','2023-06-19T13:42:11Z',9,'2023-06-19T13:42:11Z','Rejected run',NULL,'Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,StyleClass,Weapons)
VALUES
  (83000,83000,1001,0,'https://youtu.be/5R9Hir1U5uh',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (83001,83000,1014,0,'https://youtu.be/aEfw7W9719T',N'trying_to_rid_this_name','ngs_ranger','ngs_techter','ngs_none', NULL),
  (83002,83000,1003,0,'https://youtu.be/BSLeBVU1Nk8',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (83003,83000,1012,0,'https://youtu.be/73zrHXB8RgW',N'trying_to_rid_this_name','ngs_waker','ngs_gunner','ngs_none', NULL),
  
  (83008,83001,1017,0,'https://youtu.be/6krKBpFvgXi',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none', NULL),
  (83009,83001,1013,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (83010,83001,1016,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (83011,83001,1018,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_braver','ngs_none', NULL),
  
  (83016,83002,1011,0,'https://youtu.be/3zmq1QMCtv3',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','ngs_none', NULL),
  (83017,83002,1023,0,'https://youtu.be/tC5v5wR6LY9',N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (83018,83002,1021,0,'https://youtu.be/w24RurvpW7T',N'trying_to_rid_this_name','ngs_waker','ngs_ranger','ngs_none', NULL),
  (83019,83002,1019,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none', NULL),
  
  (83024,83003,1013,0,'https://youtu.be/EEF7ze3Vq23',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (83025,83003,1009,0,'https://youtu.be/zMuTe0V7Ohi',N'trying_to_rid_this_name','ngs_hunter','ngs_bouncer','ngs_none', NULL),
  (83026,83003,1004,0,'https://youtu.be/ciV07a2Ly6P',N'trying_to_rid_this_name','ngs_gunner','ngs_fighter','ngs_none', NULL),
  (83027,83003,1028,0,'https://youtu.be/1qJ4K25zJ2C',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),

  (83032,83004,5000000,0,'https://youtu.be/2KPPUC0PmU2',N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),
  (83033,83004,1010,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_hunter','ngs_none', NULL),
  (83034,83004,1008,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),
  (83035,83004,1009,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_gunner','ngs_none', NULL),
  
  (83040,83005,1011,0,'https://youtu.be/YRayt4nQRt5',N'trying_to_rid_this_name','ngs_force','ngs_slayer','ngs_none', NULL),
  (83041,83005,1010,0,'https://youtu.be/y5318PUcRaC',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  (83042,83005,1026,0,'https://youtu.be/U6zD6Z7Z9g6',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (83043,83005,1001,0,'https://youtu.be/Qa7GNu8a1PL',N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),
  
  (83048,83006,1012,0,'https://youtu.be/5D377Oa5eyP',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (83049,83006,1004,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),
  (83050,83006,1028,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_ranger','ngs_none', NULL),
  (83051,83006,1015,0,'https://youtu.be/tdOw3CeBwL1',N'trying_to_rid_this_name','ngs_hunter','ngs_fighter','ngs_none', NULL),
  
  (83056,83007,1013,0,'https://youtu.be/uQAdE597QcH',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (83057,83007,1020,0,'https://youtu.be/yZi58JDVchz',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none', NULL),
  (83058,83007,1023,0,'https://youtu.be/Y1gUtgU9h1K',N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (83059,83007,1007,0,'https://youtu.be/3x0mu9ta7SR',N'trying_to_rid_this_name','ngs_techter','ngs_bouncer','ngs_none', NULL),

  (83064,83008,1014,0,'https://youtu.be/6pW4s74zgzj',N'trying_to_rid_this_name','ngs_slayer','ngs_gunner','ngs_none', NULL),
  (83065,83008,1005,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),
  (83066,83008,1013,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_techter','ngs_none', NULL),
  (83067,83008,1017,0,NULL,N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),

  (83072,83009,1013,0,'https://youtu.be/GMsc3124QSB',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (83073,83009,1012,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),
  (83074,83009,5000000,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_techter','ngs_none', NULL),
  (83075,83009,1006,0,NULL,N'trying_to_rid_this_name','ngs_braver','ngs_force','ngs_none', NULL),

  (83080,83010,1015,0,'https://youtu.be/PR5ucm9698h',N'trying_to_rid_this_name','ngs_bouncer','ngs_hunter','ngs_none', NULL),
  (83081,83010,1012,0,'https://youtu.be/dDnsK5rVdyi',N'trying_to_rid_this_name','ngs_braver','ngs_hunter','ngs_none', NULL),
  (83082,83010,1007,0,'https://youtu.be/1vD4db604TH',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (83083,83010,1006,0,'https://youtu.be/YQ26CDd55MF',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','ngs_none', NULL),

  (83088,83011,1014,0,'https://youtu.be/fi0a4C6pabk',N'trying_to_rid_this_name','ngs_bouncer','ngs_force','ngs_none', NULL),
  (83089,83011,1011,0,NULL,N'trying_to_rid_this_name','ngs_gunner','ngs_bouncer','ngs_none', NULL),
  (83090,83011,1007,0,'https://youtu.be/1cDqvpOKWDe',N'trying_to_rid_this_name','ngs_gunner','ngs_slayer','ngs_none', NULL),
  (83091,83011,1022,0,NULL,N'trying_to_rid_this_name','ngs_techter','ngs_gunner','ngs_none', NULL),

  (83096,83012,1017,0,'https://youtu.be/0UtG19z5rbW',N'trying_to_rid_this_name','ngs_force','ngs_techter','ngs_none', NULL),
  (83097,83012,1011,0,NULL,N'trying_to_rid_this_name','ngs_bouncer','ngs_ranger','ngs_none', NULL),
  (83098,83012,1028,0,NULL,N'trying_to_rid_this_name','ngs_hunter','ngs_waker','ngs_none', NULL),
  (83099,83012,1019,0,'https://youtu.be/970K007g95t',N'trying_to_rid_this_name','ngs_fighter','ngs_bouncer','ngs_none', NULL),

  (83104,83013,1016,0,'https://youtu.be/7mjZbaru0ja',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),
  (83105,83013,1013,0,'https://youtu.be/2bGYZ8td2Vk',N'trying_to_rid_this_name','ngs_bouncer','ngs_slayer','ngs_none', NULL),
  (83106,83013,1025,0,'https://youtu.be/yY76Zt4u4n9',N'trying_to_rid_this_name','ngs_fighter','ngs_hunter','ngs_none', NULL),
  (83107,83013,1004,0,'https://youtu.be/9AzqXB31Li5',N'trying_to_rid_this_name','ngs_slayer','ngs_bouncer','ngs_none', NULL),

  (83112,83014,1011,0,'https://youtu.be/bAA5L60oLw8',N'trying_to_rid_this_name','ngs_braver','ngs_waker','ngs_none', NULL),
  (83113,83014,1015,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (83114,83014,1018,0,NULL,N'trying_to_rid_this_name','ngs_force','ngs_bouncer','ngs_none', NULL),
  (83115,83014,1006,0,NULL,N'trying_to_rid_this_name','ngs_waker','ngs_fighter','ngs_none', NULL),

  (83120,83015,1012,0,'https://youtu.be/14p223zGGjR',N'trying_to_rid_this_name','ngs_slayer','ngs_ranger','ngs_none', NULL),
  (83121,83015,1001,0,'https://youtu.be/NiPW1H4Rv08',N'trying_to_rid_this_name','ngs_slayer','ngs_techter','ngs_none', NULL),
  (83122,83015,1007,0,'https://youtu.be/7msHO098g8u',N'trying_to_rid_this_name','ngs_techter','ngs_hunter','ngs_none', NULL),
  (83123,83015,1010,0,'https://youtu.be/o6U1Hfg1dn4',N'trying_to_rid_this_name','ngs_techter','ngs_braver','ngs_none', NULL),

  (83128,83016,1012,0,'https://youtu.be/2aAJP3Oie0W',N'trying_to_rid_this_name','ngs_gunner','ngs_hunter','ngs_none', NULL),
  (83129,83016,1023,0,'https://youtu.be/uD7eOkV2W63',N'trying_to_rid_this_name','ngs_fighter','ngs_force','ngs_none', NULL),
  (83130,83016,1030,0,'https://youtu.be/Or2K1Bf4oL3',N'trying_to_rid_this_name','ngs_hunter','ngs_slayer','ngs_none', NULL),
  (83131,83016,5000000,0,'https://youtu.be/46AA06R9whj',N'trying_to_rid_this_name','ngs_bouncer','ngs_braver','ngs_none', NULL),

  (83136,83017,5000000,0,'https://youtu.be/1d6c3ushLxb',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (83137,83017,1001,0,'https://youtu.be/5Jzs4h6ftq1',N'trying_to_rid_this_name','ngs_bouncer','ngs_gunner','ngs_none', NULL),
  (83138,83017,1005,0,'https://youtu.be/10rG222a9ko',N'trying_to_rid_this_name','ngs_force','ngs_gunner','ngs_none', NULL),
  (83139,83017,1020,0,'https://youtu.be/BHd622VC6m4',N'trying_to_rid_this_name','ngs_ranger','ngs_bouncer','ngs_none', NULL),

  (83144,83018,5000000,0,'https://youtu.be/b0UddRkaxU9',N'trying_to_rid_this_name','ngs_bouncer','ngs_fighter','ngs_none', NULL),
  (83145,83018,1019,0,'https://youtu.be/1D20FK8LAkX',N'trying_to_rid_this_name','ngs_fighter','ngs_braver','ngs_none', NULL),
  (83146,83018,1012,0,'https://youtu.be/0p8j3aeeyAf',N'trying_to_rid_this_name','ngs_gunner','ngs_braver','ngs_none', NULL),
  (83147,83018,1022,0,NULL,N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','ngs_none', NULL),

  (83152,83019,5000000,0,'https://youtu.be/BM678K72V2U',N'trying_to_rid_this_name','ngs_slayer','ngs_fighter','ngs_none', NULL),
  (83153,83019,1005,0,'https://youtu.be/7NSgwN09G37',N'trying_to_rid_this_name','ngs_techter','ngs_fighter','ngs_none', NULL),
  (83154,83019,1010,0,'https://youtu.be/Li80rowSUN2',N'trying_to_rid_this_name','ngs_force','ngs_waker','ngs_none', NULL),
  (83155,83019,1006,0,'https://youtu.be/dz3507gXgJG',N'trying_to_rid_this_name','ngs_waker','ngs_braver','ngs_none', NULL)
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

