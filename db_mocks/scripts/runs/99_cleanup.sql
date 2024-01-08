-- Finish
SET IDENTITY_INSERT [dbo].[Runs] OFF;
SET IDENTITY_INSERT [dbo].[RunParty] OFF;

-- Each table should have it's ID set properly after manual ID insertion
DECLARE @maxRunsId INT = (SELECT MAX(Id) from dbo.Runs)
dbcc checkident ('dbo.Runs', reseed, @maxRunsId);

DECLARE @maxRunPartyId INT = (SELECT MAX(Id) from dbo.RunParty)
dbcc checkident ('dbo.RunParty', reseed, @maxRunPartyId);