-- Generates drop table queries
SELECT 'DROP TABLE IF EXISTS "' || schemaname || '"."' || tablename || '" CASCADE;'
FROM pg_tables WHERE schemaname = 'public';
