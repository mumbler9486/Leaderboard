IF NOT EXISTS(SELECT name FROM sys.databases WHERE name = 'pso2_leaderboard_local')
BEGIN
  CREATE DATABASE pso2_leaderboard_local;
END
