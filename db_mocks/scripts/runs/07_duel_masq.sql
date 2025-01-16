-- Masq Duel

SET IDENTITY_INSERT [dbo].[Runs] ON;
INSERT INTO dbo.Runs
  (Id,SubmitterId,Game,Quest,Category,ServerRegion,Patch,QuestRank,PartySize,RunTime,Notes,SubmissionDate,SubmissionStatus,DateReviewed,ModNotes,Attributes,ReviewedBy)
VALUES
  (71000,1001,'ngs','extra-duels','masquerade','global','lvl80grind',1,1,'00:04:50','Test notes','2023-09-06T00:36:57Z',1,'2023-09-06T11:59:25Z','Test Mod Notes','{"augments":false,"depth":10}','Tall Mommy Cool'),
  (71001,1017,'ngs','extra-duels','masquerade','global','level75r',1,1,'00:06:47','Test notes','2023-03-07T13:03:53Z',1,'2023-03-07T23:12:56Z','Test Mod Notes','{"augments":true,"depth":8}','Tall Mommy Cool'),
  (71002,1011,'ngs','extra-duels','masquerade','global','level80r',1,1,'00:03:46','Test notes','2023-04-28T08:07:35Z',1,'2023-04-28T16:28:28Z','Test Mod Notes','{"augments":false,"depth":4}','Tall Mommy Cool'),
  (71003,1013,'ngs','extra-duels','masquerade','global','slayer',1,1,'00:02:25','Test notes','2023-06-22T23:39:31Z',1,'2023-06-23T11:44:13Z','Test Mod Notes','{"augments":false,"depth":5}','Tall Mommy Cool'),
  (71004,5000000,'ngs','extra-duels','masquerade','global','pot6r',1,1,'00:02:00','Test notes','2023-04-30T13:49:42Z',1,'2023-05-01T02:18:36Z','Test Mod Notes','{"augments":true,"depth":3}','Tall Mommy Cool'),
  (71005,1011,'ngs','extra-duels','masquerade','japan','pot6r',1,1,'00:07:09','Test notes','2023-12-05T05:30:07Z',1,'2023-12-05T10:21:04Z','Test Mod Notes','{"augments":true,"depth":9}','Tall Mommy Cool'),
  (71006,1012,'ngs','extra-duels','masquerade','global','lvl80grind',1,1,'00:09:18','Test notes','2023-08-01T09:46:47Z',1,'2023-08-01T21:38:34Z','Test Mod Notes','{"augments":false,"depth":5}','Tall Mommy Cool'),
  (71007,1013,'ngs','extra-duels','masquerade','global','pot6r',1,1,'00:09:54','Test notes','2023-08-14T20:19:52Z',1,'2023-08-15T01:32:18Z','Test Mod Notes','{"augments":false,"depth":1}','Tall Mommy Cool'),
  (71008,1014,'ngs','extra-duels','masquerade','japan','pot6r',1,1,'00:07:09','Test notes','2023-03-23T16:25:10Z',1,'2023-03-23T16:50:54Z','Test Mod Notes','{"augments":true,"depth":7}','Tall Mommy Cool'),
  (71009,1013,'ngs','extra-duels','masquerade','global','60r',1,1,'00:04:18','Test notes','2023-12-30T04:04:17Z',1,'2023-12-30T16:24:34Z','Test Mod Notes','{"augments":true,"depth":4}','Tall Mommy Cool'),
  (71010,1015,'ngs','extra-duels','masquerade','japan','pre60r',1,1,'00:02:17','Test notes','2023-12-19T18:35:06Z',1,'2023-12-20T05:56:14Z','Test Mod Notes','{"augments":false,"depth":1}','Tall Mommy Cool'),
  (71011,1014,'ngs','extra-duels','masquerade','global','level75r',1,1,'00:05:17','Test notes','2023-11-19T20:02:57Z',1,'2023-11-20T07:55:36Z','Test Mod Notes','{"augments":false,"depth":7}','Tall Mommy Cool'),
  (71012,1017,'ngs','extra-duels','masquerade','japan','level75r',1,1,'00:09:07','Test notes','2023-12-24T01:57:38Z',1,'2023-12-24T04:39:40Z','Test Mod Notes','{"augments":true,"depth":8}','Tall Mommy Cool'),
  (71013,1016,'ngs','extra-duels','masquerade','global','level80r',1,1,'00:06:19','Test notes','2023-02-12T08:38:37Z',1,'2023-02-12T14:17:42Z','Test Mod Notes','{"augments":false,"depth":9}','Tall Mommy Cool'),
  (71014,1011,'ngs','extra-duels','masquerade','japan','level75r',1,1,'00:09:49','Test notes','2023-06-04T23:37:19Z',1,'2023-06-05T01:21:53Z','Test Mod Notes','{"augments":false,"depth":4}','Tall Mommy Cool'),
  (71015,1012,'ngs','extra-duels','masquerade','global','pre60r',1,1,'00:10:00','Test notes','2023-11-21T21:24:38Z',1,'2023-11-22T09:17:32Z','Test Mod Notes','{"augments":false,"depth":10}','Tall Mommy Cool'),
  (71016,1012,'ngs','extra-duels','masquerade','global','pre60r',1,1,'00:03:37','New Time succeeds old run','2023-01-27T09:23:05Z',1,'2023-01-27T17:37:18Z','Test Mod Notes','{"augments":true,"depth":10}','Tall Mommy Cool'),
  (71017,5000000,'ngs','extra-duels','masquerade','global','level80r',1,1,'00:03:40','Test not yet approved run','2024-01-06T05:14:05Z',0,NULL,NULL,'{"augments":true,"depth":2}',NULL),
  (71018,5000000,'ngs','extra-duels','masquerade','global','lvl80grind',1,1,'00:02:46','Test not yet approved run 2','2023-02-27T13:08:04Z',0,NULL,NULL,'{"augments":true,"depth":8}',NULL),
  (71019,5000000,'ngs','extra-duels','masquerade','global','level75r',1,1,'00:04:44','Test reject run','2023-10-28T23:18:50Z',9,'2023-10-29T08:04:06Z','Rejected run','{"augments":false,"depth":2}','Tall Mommy Cool')
;
SET IDENTITY_INSERT [dbo].[Runs] OFF;

SET IDENTITY_INSERT [dbo].[RunParty] ON;
INSERT INTO dbo.RunParty
  (Id,RunId,PlayerId,Ordinal,PovLink,RunCharacterName,MainClass,SubClass,Weapons)
VALUES
  (71000,71000,1001,0,'https://youtu.be/2r3vz6Spa9mwk',N'trying_to_rid_this_name','ngs_fighter','ngs_force','["ngs_sword","ngs_double_sabers","ngs_jet_boots"]'),
  (71001,71001,1017,0,'https://youtu.be/Tg036DpGFFsE3',N'trying_to_rid_this_name','ngs_slayer','ngs_force','["ngs_knuckles","ngs_launcher","ngs_harmonizer"]'),
  (71002,71002,1011,0,'https://youtu.be/LRuAV7Kxah8on',N'trying_to_rid_this_name','ngs_waker','ngs_braver','["ngs_assault_rifle","ngs_twin_machine_guns","ngs_bow"]'),
  (71003,71003,1013,0,'https://youtu.be/0jQ2pYa4DhS55',N'trying_to_rid_this_name','ngs_slayer','ngs_force','["ngs_wired_lance","ngs_double_sabers","ngs_bow"]'),
  (71004,71004,5000000,0,'https://youtu.be/39ABhH6YjO622',N'trying_to_rid_this_name','ngs_techter','ngs_braver','["ngs_sword","ngs_knuckles","ngs_rod"]'),
  (71005,71005,1011,0,'https://youtu.be/69Rs5p63FfOA8',N'trying_to_rid_this_name','ngs_waker','ngs_slayer','["ngs_sword","ngs_assault_rifle","ngs_harmonizer"]'),
  (71006,71006,1012,0,'https://youtu.be/Ry0Jx22gtUezh',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','["ngs_partisan","ngs_soaring_blades","ngs_talis"]'),
  (71007,71007,1013,0,'https://youtu.be/54VC3r1D069Rg',N'trying_to_rid_this_name','ngs_waker','ngs_force','["ngs_wired_lance","ngs_launcher","ngs_talis"]'),
  (71008,71008,1014,0,'https://youtu.be/87x9Q9aPqKrvf',N'trying_to_rid_this_name','ngs_braver','ngs_waker','["ngs_katana","ngs_twin_machine_guns","ngs_rod"]'),
  (71009,71009,1013,0,'https://youtu.be/001YDHbpV1RW5',N'trying_to_rid_this_name','ngs_braver','ngs_fighter','["ngs_wired_lance","ngs_katana","ngs_twin_machine_guns"]'),
  (71010,71010,1015,0,'https://youtu.be/1JALu7Jj9sqxg',N'trying_to_rid_this_name','ngs_hunter','ngs_braver','["ngs_twin_daggers","ngs_launcher","ngs_twin_machine_guns"]'),
  (71011,71011,1014,0,'https://youtu.be/p5Oua80zF36Z4',N'trying_to_rid_this_name','ngs_waker','ngs_hunter','["ngs_gunblade","ngs_launcher","ngs_harmonizer"]'),
  (71012,71012,1017,0,'https://youtu.be/BXtfH9e8Wi04C',N'trying_to_rid_this_name','ngs_slayer','ngs_hunter','["ngs_partisan","ngs_launcher","ngs_talis"]'),
  (71013,71013,1016,0,'https://youtu.be/6NSYPiEiZMAie',N'trying_to_rid_this_name','ngs_force','ngs_braver','["ngs_wired_lance","ngs_knuckles","ngs_rod"]'),
  (71014,71014,1011,0,'https://youtu.be/VGb0j5u5O1FOn',N'trying_to_rid_this_name','ngs_slayer','ngs_waker','["ngs_gunblade","ngs_rod","ngs_wand"]'),
  (71015,71015,1012,0,'https://youtu.be/g2fA7Vit06Vpo',N'trying_to_rid_this_name','ngs_ranger','ngs_braver','["ngs_knuckles","ngs_assault_rifle","ngs_twin_machine_guns"]'),
  (71016,71016,1012,0,'https://youtu.be/62EYh015LfKMm',N'trying_to_rid_this_name','ngs_ranger','ngs_waker','["ngs_double_sabers","ngs_launcher","ngs_wand"]'),
  (71017,71017,5000000,0,'https://youtu.be/OyZq5jQfbj3Rd',N'trying_to_rid_this_name','ngs_hunter','ngs_ranger','["ngs_double_sabers","ngs_bow","ngs_talis"]'),
  (71018,71018,5000000,0,'https://youtu.be/MLpcsrA241ij5',N'trying_to_rid_this_name','ngs_waker','ngs_bouncer','["ngs_sword","ngs_twin_daggers","ngs_katana"]'),
  (71019,71019,5000000,0,'https://youtu.be/7F9pxg4sbHCUu',N'trying_to_rid_this_name','ngs_braver','ngs_hunter','["ngs_knuckles","ngs_katana","ngs_bow"]')
;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;
