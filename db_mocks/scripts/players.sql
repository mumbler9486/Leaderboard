SET IDENTITY_INSERT [dbo].[Players] ON

-- Users for impersonating while testing/developing, uses fixed IDs
INSERT INTO [dbo].[Players]
  (Id,UserId,Roles,PlayerName,CharacterName,Bio,Youtube,Twitch,Discord,Twitter,Trophies,PreferredNameType,Server,Ship,Flag,NameEffectType,NameColor1,NameColor2)
VALUES
  (5000000,'d78f01d3-f5a9-4106-a199-0d43ac79ace1','["user"]','mock_normal_user','mock_normal_user',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,'ffffff','ffffff'),
  (5000001,'15ea8a0f-86b8-4f0b-bcd8-1582ecda036a','["user","moderator"]','mock_moderator','mock_moderator',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,'ffffff','ffffff')
;

-- Rest of the users
INSERT INTO [dbo].[Players]
  (Id,UserId,Roles,PlayerName,CharacterName,Bio,Youtube,Twitch,Discord,Twitter,Trophies,PreferredNameType,Server,Ship,Flag,NameEffectType,NameColor1,NameColor2)
VALUES
  (1001,'3982b6b9-d30e-4afb-ac91-2e701e537b34','["user"]',N'packages',N'packages',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,2,'fe1e82','f6ee2b'),
  (1002,'2b579ab3-4fcb-4dd1-aa8d-f1f4dcc07f38','["user","moderator"]',N'Tall Mommy Cool',N'Tall Mommy Cool',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,3,'0b0b60','3bebb1'),
  (1003,'7f6ae487-f5fa-471a-a9a2-45f8e725ea26','["user"]',N'Olde',N'Olde',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,'fe81a1','d9adca'),
  (1004,'c75278ff-66ae-49d3-a82e-a726ea6a413e','["user"]',N'Bow fanatic',N'Bow fanatic',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,2,'dea981','ff030a'),
  (1005,'b82fdea9-601a-4556-be6b-548230edd6ee','["user"]',N'T-Bone',N'T-Bone',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,'586ff6','6f06e1'),
  (1006,'cba637b6-d30d-4e83-bca8-9c355d4971dc','["user"]',N'長間',N'長間',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,'2114f9','c31afd'),
  (1007,'17316452-c94a-4a5d-b9c4-d4475bd40dd2','["user"]',N'miles',N'miles',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,2,'0ae194','2c75d2'),
  (1008,'92d0282e-63eb-4bae-a760-55ae80ecec2b','["user"]',N'Primm Lord',N'Primm Lord',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,2,'4d160f','15c7ea'),
  (1009,'e1c94f82-987a-44d5-a811-382962247011','["user"]',N'doomster',N'doomster',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,3,'2c75d2','66290'),
  (1010,'56da90cc-cc30-4ffe-b746-dc7e38fbe7ff','["user"]',N'speedy_mcspeedface',N'speedy_mcspeedface',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,3,'122bb0','7e87be'),
  (1011,'83119ab2-0365-4ebd-9a30-7088d9eb878e','["user"]',N'shantae',N'shantae',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,'e2cc6d','3770a7'),
  (1012,'3308d611-34f0-48b0-a3b2-61058bc64b0f','["user"]',N'photoner-vpn-ex',N'vpn-express',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,'8094d7','f72987'),
  (1013,'244f8266-df08-4417-bc87-be3622911ba2','["user"]',N'handsome_dorf',N'handsome_dorf',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,'10d513','e537ce'),
  (1014,'ce8302de-5a86-4917-ac41-d7f9922d1d61','["user"]',N'Soda of Baking',N'Soda of Baking',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,'aa61ad','b62294'),
  (1015,'c3f509dd-917d-41be-88fc-3ae5dcd528fd','["user"]',N'世界光',N'世界光',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,'3e7019','0512c8'),
  (1016,'9327f6cb-9d74-4004-84de-dd80dfd029f8','["user"]',N'Chill Sonic',N'Chill Sonic',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,2,'f7c1de','1f2990'),
  (1017,'92f57857-1c3f-44b4-a9b5-4ea734d5371b','["user"]',N'ApePex69',N'ApePex69',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,'499c4c','3f7aa1'),
  (1018,'82ed3b9a-abe8-4aeb-a778-3b5b77d1cda2','["user"]',N'xX_AdversityNull_Xx',N'xX_AdversityNull_Xx',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,'7941b2','1d6e59'),
  (1019,'b48d8715-d925-4eeb-95be-70871022ffec','["user"]',N'MelekDeez42',N'MelekDeez42',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,3,'e923e4','8c6796'),
  (1020,'6ce565e9-7602-4d88-b9a0-1a26189c4967','["user"]',N'1sussytaco1',N'1sussytaco1',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,'560579','c4a5c5'),
  (1021,'5547eeec-0985-4d7d-9694-75c35fc5542c','["user"]',N'bleem1dream',N'bleem1dream',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,'ccce51','308406'),
  (1022,'e4868eb3-90c4-4c8a-a564-eed8ef56094a','["user"]',N'ngpMyDankness34',N'ngpMyDankness34',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,3,'5ffae8','3dce1c'),
  (1023,'1d7ef902-3848-41e4-9292-384e52232739','["user"]',N'vampyre_mcfrosty',N'vampyre_mcfrosty',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,3,'0aa305','8be69c'),
  (1024,'443cd2a7-29fd-4c24-a04c-a69613a7154a','["user"]',N'PhantomKaizer神',N'PhantomKaizer神',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,'9857b6','d84785'),
  (1025,'c5dd285d-8d20-4704-8e8b-bd7c2100957f','["user"]',N'BasedIllusio',N'BasedIllusio',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,'ddabd8','8da50a'),
  (1026,'1a77106f-8ff8-48a7-9ddc-9cd0cc3bff22','["user"]',N'TROGDOR',N'TROGDOR',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,3,'028957','bd6264'),
  (1027,'ca67f7fc-d74c-4f36-b1fb-4074c31105d2','["user"]',N'CannedFoodDog',N'CannedFoodDog',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,'c86a70','c88041'),
  (1028,'fbe6d645-a358-4dcc-b046-eacb7cf021ff','["user"]',N'ididntsleep63',N'ididntsleep63',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,2,'344fff','73ff98'),
  (1029,'0fd62fdd-ca6c-4c91-adc4-fff2425a12f0','["user"]',N'snoodle99',N'snoodle99',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,2,'3178d8','ff6113'),
  (1030,'c02bfd56-606e-4b0d-bebc-b26811b7c49f','["user"]',N'goatedArmCannon3',N'goatedArmCannon3',NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,3,'420bd6','91940f')
;

SET IDENTITY_INSERT [dbo].[Players] OFF

-- Reset auto increment for players table
DECLARE @maxId INT = (SELECT MAX(Id) from dbo.Players)
dbcc checkident ('dbo.Players', reseed, @maxId);