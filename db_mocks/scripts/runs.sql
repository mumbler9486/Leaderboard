-- Purple Solo
INSERT INTO runs
  (id,submitter_id,game,quest,category,server_region,patch,quest_rank,party_size,run_time,notes,submission_date,submission_status,date_reviewed,mod_notes,attributes,reviewed_by)
OVERRIDING SYSTEM VALUE
VALUES
  (1000,1001,'ngs','purples','aelio','global','level80r',4,1,'0:03:23','Notes',CURRENT_DATE,1, CURRENT_DATE,'Mod Notes', NULL,'Tall Mommy Cool');
INSERT INTO run_party
  (id,run_id,player_id,ordinal,pov_link,run_character_name,main_class,sub_class,weapons)
OVERRIDING SYSTEM VALUE
VALUES 
  (1000,1000,1001,0,'https://youtu.be/tas0Oc586t80','wrapping','ngs_techter','ngs_bouncer','["ngs_katana","ngs_assault_rifle","ngs_rod"]');

-- Purple Duo


-- Purple Party


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
