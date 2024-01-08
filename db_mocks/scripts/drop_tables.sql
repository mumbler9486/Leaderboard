-- Must drop in order, else foreign key reference error
IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'dbo' AND name like 'RunParty')
   DROP TABLE RunParty;
GO
IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'dbo' AND name like 'Runs')
   DROP TABLE Runs;
GO
IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'dbo' AND name like 'Players')
   DROP TABLE Players;
GO
