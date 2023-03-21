import sql from "mssql";
import { json } from '@sveltejs/kit';

import * as dotenv from 'dotenv'

dotenv.config()

const config = {
	user: process.env.DB_SUBMIT_USER, // better stored in an app setting such as process.env.DB_USER
	password: process.env.DB_SUBMIT_PASSWORD, // better stored in an app setting such as process.env.DB_PASSWORD
	server: process.env.DB_SERVER, // better stored in an app setting such as process.env.DB_SERVER
	database: process.env.DB_NAME, // better stored in an app setting such as process.env.DB_NAME
	authentication: {
		type: 'default'
	},
	options: {
		encrypt: true
	}
}

export async function POST({ request }) {

    const data = await request.json();
    const urlInfo = await request.url;
    let params = new URL(urlInfo).searchParams

    switch(params.get('type')) {

        case 'dfaduo':
            try {

                var poolConnection = await sql.connect(config);
        
                var sqlRemove = `
                
                    UPDATE Submissions.DFAegisParty
                    SET SubmissionStatus = 1
                    WHERE RunID = @0;
                    
                 `
            
                await poolConnection.request().input('0',sql.Int,data.shared.RunID).query(sqlRemove);
        
                    var sqlQuery = `
        
                    INSERT INTO 
                    DFAegis.Party (
                        PartySize,
                        Patch,
                        Rank,
                        Time,
                        Notes,
                        RunServer,
                        SubmissionTime,
                        SubmitterID,
                        ModNotes,
                        Buff,
                        Drill)
                    VALUES (
                        @1,
                        @2,
                        @4,
                        @5,
                        @6,
                        @7,
                        @8,
                        @9,
                        @10,
                        @11,
                        @12);
                    
                    SELECT SCOPE_IDENTITY() AS LastID;`;
                        
                    data.shared.Rank = 1;

                    var identity = await poolConnection.request()
                    .input('1',sql.Int, data.shared.PartySize)
                    .input('2',sql.NVarChar, data.shared.Patch)
                    .input('4',sql.Int, data.shared.Rank)
                    .input('5',sql.NVarChar, data.shared.Time)
                    .input('6',sql.NVarChar, data.shared.Notes)
                    .input('7',sql.NVarChar, data.shared.ServerID)
                    .input('8',sql.NVarChar, data.shared.SubmissionTime)
                    .input('9',sql.Int, data.shared.SubmitterID)
                    .input('10',sql.NVarChar, data.shared.ModNotes)
                    .input('11',sql.NVarChar, data.shared.Buff)
                    .input('12',sql.Int, data.shared.Drill)
                    .query(sqlQuery);

                    identity = identity.recordset[0].LastID;

                    sqlQuery = `
        
                    INSERT INTO 
                    DFAegis.PartyRunners (
                        RunID,
                        PlayerID,
                        RunCharacterName,
                        MainClass,
                        SubClass,
                        LinkPOV)
                    VALUES (
                        @0,
                        @1,
                        @2,
                        @3,
                        @4,
                        @5);
                    
                    SELECT SCOPE_IDENTITY() AS LastID;`;
        
                    await poolConnection.request()
                    .input('0',sql.Int, identity)
                    .input('1',sql.Int, data.p1.PlayerID)
                    .input('2',sql.NVarChar, data.p1.RunCharacterName)
                    .input('3',sql.NVarChar, data.p1.MainClass)
                    .input('4',sql.NVarChar, data.p1.SubClass)
                    .input('5',sql.NVarChar, data.p1.LinkPOV)
                    .query(sqlQuery);

                    await poolConnection.request()
                    .input('0',sql.Int, identity)
                    .input('1',sql.Int, data.p2.PlayerID)
                    .input('2',sql.NVarChar, data.p2.RunCharacterName)
                    .input('3',sql.NVarChar, data.p2.MainClass)
                    .input('4',sql.NVarChar, data.p2.SubClass)
                    .input('5',sql.NVarChar, data.p2.LinkPOV)
                    .query(sqlQuery);

                    poolConnection.close();
        
                    //returner = context.req.body;
        
                    return json({'Code' : 'success'});
            
                }
                notifyDiscord("<Moderator_Name>", "<Player_Name>", "DFA Duo");
            catch (err) {
                console.error(err.message);
                return json({'Code' : 'error'});
            }
            break;

        case 'dfaparty':
            try {

                var poolConnection = await sql.connect(config);
        
                var sqlRemove = `
                
                    UPDATE Submissions.DFAegisParty
                    SET SubmissionStatus = 1
                    WHERE RunID = @0;
                    
                 `
            
                await poolConnection.request().input('0',sql.Int,data.shared.RunID).query(sqlRemove);
        
                    var sqlQuery = `
        
                    INSERT INTO 
                    DFAegis.Party (
                        PartySize,
                        Patch,
                        Rank,
                        Time,
                        Notes,
                        RunServer,
                        SubmissionTime,
                        SubmitterID,
                        ModNotes,
                        Buff,
                        Drill)
                    VALUES (
                        @1,
                        @2,
                        @4,
                        @5,
                        @6,
                        @7,
                        @8,
                        @9,
                        @10,
                        @11,
                        @12);
                    
                    SELECT SCOPE_IDENTITY() AS LastID;`;
                        
                    data.shared.Rank = 1;

                    var identity = await poolConnection.request()
                    .input('1',sql.Int, data.shared.PartySize)
                    .input('2',sql.NVarChar, data.shared.Patch)
                    .input('4',sql.Int, data.shared.Rank)
                    .input('5',sql.NVarChar, data.shared.Time)
                    .input('6',sql.NVarChar, data.shared.Notes)
                    .input('7',sql.NVarChar, data.shared.ServerID)
                    .input('8',sql.NVarChar, data.shared.SubmissionTime)
                    .input('9',sql.Int, data.shared.SubmitterID)
                    .input('10',sql.NVarChar, data.shared.ModNotes)
                    .input('11',sql.NVarChar, data.shared.Buff)
                    .input('12',sql.Int, data.shared.Drill)
                    .query(sqlQuery);

                    identity = identity.recordset[0].LastID;

                    sqlQuery = `
        
                    INSERT INTO 
                    DFAegis.PartyRunners (
                        RunID,
                        PlayerID,
                        RunCharacterName,
                        MainClass,
                        SubClass,
                        LinkPOV)
                    VALUES (
                        @0,
                        @1,
                        @2,
                        @3,
                        @4,
                        @5);
                    
                    SELECT SCOPE_IDENTITY() AS LastID;`;
        
                    await poolConnection.request()
                    .input('0',sql.Int, identity)
                    .input('1',sql.Int, data.p1.PlayerID)
                    .input('2',sql.NVarChar, data.p1.RunCharacterName)
                    .input('3',sql.NVarChar, data.p1.MainClass)
                    .input('4',sql.NVarChar, data.p1.SubClass)
                    .input('5',sql.NVarChar, data.p1.LinkPOV)
                    .query(sqlQuery);

                    await poolConnection.request()
                    .input('0',sql.Int, identity)
                    .input('1',sql.Int, data.p2.PlayerID)
                    .input('2',sql.NVarChar, data.p2.RunCharacterName)
                    .input('3',sql.NVarChar, data.p2.MainClass)
                    .input('4',sql.NVarChar, data.p2.SubClass)
                    .input('5',sql.NVarChar, data.p2.LinkPOV)
                    .query(sqlQuery);

                    await poolConnection.request()
                    .input('0',sql.Int, identity)
                    .input('1',sql.Int, data.p3.PlayerID)
                    .input('2',sql.NVarChar, data.p3.RunCharacterName)
                    .input('3',sql.NVarChar, data.p3.MainClass)
                    .input('4',sql.NVarChar, data.p3.SubClass)
                    .input('5',sql.NVarChar, data.p3.LinkPOV)
                    .query(sqlQuery);

                    await poolConnection.request()
                    .input('0',sql.Int, identity)
                    .input('1',sql.Int, data.p4.PlayerID)
                    .input('2',sql.NVarChar, data.p4.RunCharacterName)
                    .input('3',sql.NVarChar, data.p4.MainClass)
                    .input('4',sql.NVarChar, data.p4.SubClass)
                    .input('5',sql.NVarChar, data.p4.LinkPOV)
                    .query(sqlQuery);

                    await poolConnection.request()
                    .input('0',sql.Int, identity)
                    .input('1',sql.Int, data.p5.PlayerID)
                    .input('2',sql.NVarChar, data.p5.RunCharacterName)
                    .input('3',sql.NVarChar, data.p5.MainClass)
                    .input('4',sql.NVarChar, data.p5.SubClass)
                    .input('5',sql.NVarChar, data.p5.LinkPOV)
                    .query(sqlQuery);

                    await poolConnection.request()
                    .input('0',sql.Int, identity)
                    .input('1',sql.Int, data.p6.PlayerID)
                    .input('2',sql.NVarChar, data.p6.RunCharacterName)
                    .input('3',sql.NVarChar, data.p6.MainClass)
                    .input('4',sql.NVarChar, data.p6.SubClass)
                    .input('5',sql.NVarChar, data.p6.LinkPOV)
                    .query(sqlQuery);

                    await poolConnection.request()
                    .input('0',sql.Int, identity)
                    .input('1',sql.Int, data.p7.PlayerID)
                    .input('2',sql.NVarChar, data.p7.RunCharacterName)
                    .input('3',sql.NVarChar, data.p7.MainClass)
                    .input('4',sql.NVarChar, data.p7.SubClass)
                    .input('5',sql.NVarChar, data.p7.LinkPOV)
                    .query(sqlQuery);

                    await poolConnection.request()
                    .input('0',sql.Int, identity)
                    .input('1',sql.Int, data.p8.PlayerID)
                    .input('2',sql.NVarChar, data.p8.RunCharacterName)
                    .input('3',sql.NVarChar, data.p8.MainClass)
                    .input('4',sql.NVarChar, data.p8.SubClass)
                    .input('5',sql.NVarChar, data.p8.LinkPOV)
                    .query(sqlQuery);

                    poolConnection.close();
        
                    //returner = context.req.body;
        
                    return json({'Code' : 'success'});
            
                }
                notifyDiscord("<Moderator_Name>", "<Player_Name>", "DFA Party");
            catch (err) {
                console.error(err.message);
                return json({'Code' : 'error'});
            }
            break;

        case 'purpleparty':
                try {
    
                    var poolConnection = await sql.connect(config);
            
                    var sqlRemove = `
                    
                        UPDATE Submissions.Party
                        SET SubmissionStatus = 1
                        WHERE RunID = @0;
                        
                     `
                
                    await poolConnection.request().input('0',sql.Int,data.shared.RunID).query(sqlRemove);
            
                        var sqlQuery = `
            
                        INSERT INTO 
                        Purples.Party (
                            PartySize,
                            Patch,
                            Region,
                            Rank,
                            Time,
                            Notes,
                            RunServer,
                            SubmissionTime,
                            SubmitterID,
                            ModNotes)
                        VALUES (
                            @1,
                            @2,
                            @3,
                            @4,
                            @5,
                            @6,
                            @7,
                            @8,
                            @9,
                            @10);
                        
                        SELECT SCOPE_IDENTITY() AS LastID;`;
                            
                        var identity = await poolConnection.request()
                        .input('1',sql.Int, data.shared.PartySize)
                        .input('2',sql.NVarChar, data.shared.Patch)
                        .input('3',sql.NVarChar, data.shared.Region)
                        .input('4',sql.Int, data.shared.Rank)
                        .input('5',sql.NVarChar, data.shared.Time)
                        .input('6',sql.NVarChar, data.shared.Notes)
                        .input('7',sql.NVarChar, data.shared.ServerID)
                        .input('8',sql.NVarChar, data.shared.SubmissionTime)
                        .input('9',sql.Int, data.shared.SubmitterID)
                        .input('10',sql.NVarChar, data.shared.ModNotes)
                        .query(sqlQuery);
    
                        identity = identity.recordset[0].LastID;
    
                        sqlQuery = `
            
                        INSERT INTO 
                        Purples.PartyRunners (
                            RunID,
                            PlayerID,
                            RunCharacterName,
                            MainClass,
                            SubClass,
                            LinkPOV)
                        VALUES (
                            @0,
                            @1,
                            @2,
                            @3,
                            @4,
                            @5);
                        
                        SELECT SCOPE_IDENTITY() AS LastID;`;
            
                        await poolConnection.request()
                        .input('0',sql.Int, identity)
                        .input('1',sql.Int, data.p1.PlayerID)
                        .input('2',sql.NVarChar, data.p1.RunCharacterName)
                        .input('3',sql.NVarChar, data.p1.MainClass)
                        .input('4',sql.NVarChar, data.p1.SubClass)
                        .input('5',sql.NVarChar, data.p1.LinkPOV)
                        .query(sqlQuery);
    
                        await poolConnection.request()
                        .input('0',sql.Int, identity)
                        .input('1',sql.Int, data.p2.PlayerID)
                        .input('2',sql.NVarChar, data.p2.RunCharacterName)
                        .input('3',sql.NVarChar, data.p2.MainClass)
                        .input('4',sql.NVarChar, data.p2.SubClass)
                        .input('5',sql.NVarChar, data.p2.LinkPOV)
                        .query(sqlQuery);

                        await poolConnection.request()
                        .input('0',sql.Int, identity)
                        .input('1',sql.Int, data.p3.PlayerID)
                        .input('2',sql.NVarChar, data.p3.RunCharacterName)
                        .input('3',sql.NVarChar, data.p3.MainClass)
                        .input('4',sql.NVarChar, data.p3.SubClass)
                        .input('5',sql.NVarChar, data.p3.LinkPOV)
                        .query(sqlQuery);

                        await poolConnection.request()
                        .input('0',sql.Int, identity)
                        .input('1',sql.Int, data.p4.PlayerID)
                        .input('2',sql.NVarChar, data.p4.RunCharacterName)
                        .input('3',sql.NVarChar, data.p4.MainClass)
                        .input('4',sql.NVarChar, data.p4.SubClass)
                        .input('5',sql.NVarChar, data.p4.LinkPOV)
                        .query(sqlQuery);
    
                        poolConnection.close();
            
                        //returner = context.req.body;
            
                        return json({'Code' : 'success'});
                
                    }
                catch (err) {
                    console.error(err.message);
                    return json({'Code' : 'error'});
                }
                break;
                notifyDiscord("<Moderator_Name>", "<Player_Name>", "Purple Party");

        case 'purpleduo':
            try {

                var poolConnection = await sql.connect(config);
        
                var sqlRemove = `
                
                    UPDATE Submissions.Party
                    SET SubmissionStatus = 1
                    WHERE RunID = @0;
                    
                 `
            
                await poolConnection.request().input('0',sql.Int,data.shared.RunID).query(sqlRemove);
        
                    var sqlQuery = `
        
                    INSERT INTO 
                    Purples.Party (
                        PartySize,
                        Patch,
                        Region,
                        Rank,
                        Time,
                        Notes,
                        RunServer,
                        SubmissionTime,
                        SubmitterID,
                        ModNotes)
                    VALUES (
                        @1,
                        @2,
                        @3,
                        @4,
                        @5,
                        @6,
                        @7,
                        @8,
                        @9,
                        @10);
                    
                    SELECT SCOPE_IDENTITY() AS LastID;`;
                        
                    var identity = await poolConnection.request()
                    .input('1',sql.Int, data.shared.PartySize)
                    .input('2',sql.NVarChar, data.shared.Patch)
                    .input('3',sql.NVarChar, data.shared.Region)
                    .input('4',sql.Int, data.shared.Rank)
                    .input('5',sql.NVarChar, data.shared.Time)
                    .input('6',sql.NVarChar, data.shared.Notes)
                    .input('7',sql.NVarChar, data.shared.ServerID)
                    .input('8',sql.NVarChar, data.shared.SubmissionTime)
                    .input('9',sql.Int, data.shared.SubmitterID)
                    .input('10',sql.NVarChar, data.shared.ModNotes)
                    .query(sqlQuery);

                    identity = identity.recordset[0].LastID;

                    sqlQuery = `
        
                    INSERT INTO 
                    Purples.PartyRunners (
                        RunID,
                        PlayerID,
                        RunCharacterName,
                        MainClass,
                        SubClass,
                        LinkPOV)
                    VALUES (
                        @0,
                        @1,
                        @2,
                        @3,
                        @4,
                        @5);
                    
                    SELECT SCOPE_IDENTITY() AS LastID;`;
        
                    //console.log(data.p1.PlayerID)
                    await poolConnection.request()
                    .input('0',sql.Int, identity)
                    .input('1',sql.Int, data.p1.PlayerID)
                    .input('2',sql.NVarChar, data.p1.RunCharacterName)
                    .input('3',sql.NVarChar, data.p1.MainClass)
                    .input('4',sql.NVarChar, data.p1.SubClass)
                    .input('5',sql.NVarChar, data.p1.LinkPOV)
                    .query(sqlQuery);

                    await poolConnection.request()
                    .input('0',sql.Int, identity)
                    .input('1',sql.Int, data.p2.PlayerID)
                    .input('2',sql.NVarChar, data.p2.RunCharacterName)
                    .input('3',sql.NVarChar, data.p2.MainClass)
                    .input('4',sql.NVarChar, data.p2.SubClass)
                    .input('5',sql.NVarChar, data.p2.LinkPOV)
                    .query(sqlQuery);

                    poolConnection.close();
        
                    //returner = context.req.body;
        
                    return json({'Code' : 'success'});
            
                }
                notifyDiscord("<Moderator_Name>", "<Player_Name>", "Purple Duo");
            catch (err) {
                console.error(err.message);
                return json({'Code' : 'error'});
            }
            break;
            
        case 'dfasolo':
            try {
                //console.log("FALZ ALERT")
                var poolConnection = await sql.connect(config);
        
                var sqlRemove = `
                
                    UPDATE Submissions.DFAegisSolo
                    SET SubmissionStatus = 1
                    WHERE RunID = @0;
                    
                 `
            
                await poolConnection.request().input('0',sql.Int,data.RunID).query(sqlRemove);
        
                ////console.log("PASSED");
        
                var sqlRemove = `
                
                SELECT 
                RunID, PlayerID
        
                FROM 
                DFAegis.Solo
        
                WHERE
                DFAegis.Solo.PlayerID = @Player
                AND
                Drill = @Rank
                AND
                Buff = @Region
                AND
                Patch = @Patch
                AND
                MainClass = @Main
                AND
                SubClass = @Sub
                AND
                WeaponInfo1 = @w1
                `
        
                if(data.W2 != null) {
                    sqlRemove += ` AND
                    WeaponInfo2 = @w2`
                }
                else{
                    sqlRemove += ` AND
                    WeaponInfo2 IS NULL`
                }
                if(data.W3 != null) {
                    sqlRemove += ` AND
                    WeaponInfo3 = @w3`
                }
                else{
                    sqlRemove += ` AND
                    WeaponInfo3 IS NULL`
                }
                if(data.W4 != null) {
                    sqlRemove += ` AND
                    WeaponInfo4 = @w4`
                }
                else{
                    sqlRemove += ` AND
                    WeaponInfo4 IS NULL`
                }
                if(data.W5 != null) {
                    sqlRemove += ` AND
                    WeaponInfo5 = @w5`
                }
                else{
                    sqlRemove += ` AND
                    WeaponInfo5 IS NULL`
                }
                if(data.W6 != null) {
                    sqlRemove += ` AND
                    WeaponInfo6 = @w6`
                }
                else{
                    sqlRemove += ` AND
                    WeaponInfo6 IS NULL`
                }
        
                var testexisting = await poolConnection.request().input('Player',sql.Int,data.PlayerID).input('Region',sql.NVarChar,data.Support).input('Rank',sql.Int,data.Drill).input('Patch',sql.NVarChar,data.Patch).input('Main',sql.NVarChar,data.MainClass).input('Sub',sql.NVarChar,data.SubClass).input('w1',sql.NVarChar,data.W1).input('w2',sql.NVarChar,data.W2).input('w3',sql.NVarChar,data.W3).input('w4',sql.NVarChar,data.W4).input('w5',sql.NVarChar,data.W5).input('w6',sql.NVarChar,data.W6).query(sqlRemove);
                
                if (testexisting.rowsAffected != 0 && testexisting.recordset[0].PlayerID != 106 && testexisting.recordset[0].PlayerID != 107) {
                    //console.log(testexisting.recordset[0])
        
                    var sqlUpdate = `
                    
                    UPDATE DFAegis.Solo
        
                    SET
        
                    RunCharacterName = @1,
                    Link = @2,
                    Notes = @3,
                    SubmissionTime = @4,
                    SubmitterID = @5,
                    ModNotes = @6,
                    Time = @7
        
                    WHERE RunID = @0;
                    
                    `
        
                    //console.log(data)
                        
                    await poolConnection.request().input('7',sql.NVarChar, data.Time).input('0',sql.Int, testexisting.recordset[0].RunID).input('1',sql.NVarChar, data.RunCharacter).input('2',sql.NVarChar, data.Link).input('3',sql.NVarChar, data.Notes).input('4',sql.DateTime, data.SubmissionTime).input('5',sql.Int, data.SubmitterID).input('6',sql.NVarChar, data.ModNotes).query(sqlUpdate);
        
                }
        
                else {
                    
                    //console.log('no existing run')
        
                    var sqlQuery = `
        
                    INSERT INTO 
                    DFAegis.Solo (PlayerID,RunCharacterName,Patch,Buff,Rank,Time,MainClass,SubClass,WeaponInfo1,WeaponInfo2,WeaponInfo3,WeaponInfo4,WeaponInfo5,WeaponInfo6,Link,Notes,SubmissionTime,SubmitterID,ModNotes,Drill)
                    VALUES (@1,@2,@3,@4,1,@6,@7,@8,@9,@10,@11,@12,@13,@14,@15,@16,@17,@18,@19,@5);`;
                        
                    await poolConnection.request().input('1',sql.Int, data.PlayerID).input('2',sql.NVarChar, data.RunCharacter).input('3',sql.NVarChar, data.Patch).input('4',sql.NVarChar, data.Support).input('5',sql.Int, data.Drill).input('6',sql.NVarChar, data.Time).input('7',sql.NVarChar, data.MainClass).input('8',sql.NVarChar, data.SubClass).input('9',sql.NVarChar, data.W1).input('10',sql.NVarChar, data.W2).input('11',sql.NVarChar, data.W3).input('12',sql.NVarChar, data.W4).input('13',sql.NVarChar, data.W5).input('14',sql.NVarChar, data.W6).input('15',sql.NVarChar, data.Link).input('16',sql.NVarChar, data.Notes).input('17',sql.DateTime, data.SubmissionTime).input('18',sql.Int, data.SubmitterID).input('19',sql.NVarChar, data.ModNotes).query(sqlQuery);
        
                    }
        
                    poolConnection.close();
        
                    //returner = context.req.body;
        
                    return json({'Code' : 'success'});
            
                }
                notifyDiscord("<Moderator_Name>", "<Player_Name>", "DFA Solo");
            catch (err) {
                console.error(err.message);
                return json({'Code' : 'error'});
            }
            break;

        default:
            try {

                var poolConnection = await sql.connect(config);
        
                var sqlRemove = `
                
                    UPDATE Submissions.Pending
                    SET SubmissionStatus = 1
                    WHERE RunID = @0;
                    
                 `
            
                await poolConnection.request().input('0',sql.Int,data.RunID).query(sqlRemove);
        
                ////console.log("PASSED");
        
                var sqlRemove = `
                
                SELECT 
                RunID
        
                FROM 
                Purples.Solo
        
                WHERE
                Purples.Solo.PlayerID = @Player
                AND
                Rank = @Rank
                AND
                Region = @Region
                AND
                Patch = @Patch
                AND
                MainClass = @Main
                AND
                SubClass = @Sub
                AND
                WeaponInfo1 = @w1
                `
        
                if(data.W2 != null) {
                    sqlRemove += ` AND
                    WeaponInfo2 = @w2`
                }
                else{
                    sqlRemove += ` AND
                    WeaponInfo2 IS NULL`
                }
                if(data.W3 != null) {
                    sqlRemove += ` AND
                    WeaponInfo3 = @w3`
                }
                else{
                    sqlRemove += ` AND
                    WeaponInfo3 IS NULL`
                }
                if(data.W4 != null) {
                    sqlRemove += ` AND
                    WeaponInfo4 = @w4`
                }
                else{
                    sqlRemove += ` AND
                    WeaponInfo4 IS NULL`
                }
                if(data.W5 != null) {
                    sqlRemove += ` AND
                    WeaponInfo5 = @w5`
                }
                else{
                    sqlRemove += ` AND
                    WeaponInfo5 IS NULL`
                }
                if(data.W6 != null) {
                    sqlRemove += ` AND
                    WeaponInfo6 = @w6`
                }
                else{
                    sqlRemove += ` AND
                    WeaponInfo6 IS NULL`
                }
        
                var testexisting = await poolConnection.request().input('Player',sql.Int,data.PlayerID).input('Region',sql.NVarChar,data.Region).input('Rank',sql.Int,data.Rank).input('Patch',sql.NVarChar,data.Patch).input('Main',sql.NVarChar,data.MainClass).input('Sub',sql.NVarChar,data.SubClass).input('w1',sql.NVarChar,data.W1).input('w2',sql.NVarChar,data.W2).input('w3',sql.NVarChar,data.W3).input('w4',sql.NVarChar,data.W4).input('w5',sql.NVarChar,data.W5).input('w6',sql.NVarChar,data.W6).query(sqlRemove);
                
                if (testexisting.rowsAffected != 0 && testexisting.recordset[0].PlayerID != 106 && testexisting.recordset[0].PlayerID != 107) {
                    //console.log(testexisting.recordset[0])
        
                    var sqlUpdate = `
                    
                    UPDATE Purples.Solo
        
                    SET
        
                    RunCharacterName = @1,
                    Link = @2,
                    Notes = @3,
                    SubmissionTime = @4,
                    SubmitterID = @5,
                    ModNotes = @6,
                    Time = @7
        
                    WHERE RunID = @0;
                    
                    `
        
                    //console.log(data)
                        
                    await poolConnection.request().input('7',sql.NVarChar, data.Time).input('0',sql.Int, testexisting.recordset[0].RunID).input('1',sql.NVarChar, data.RunCharacter).input('2',sql.NVarChar, data.Link).input('3',sql.NVarChar, data.Notes).input('4',sql.DateTime, data.SubmissionTime).input('5',sql.Int, data.SubmitterID).input('6',sql.NVarChar, data.ModNotes).query(sqlUpdate);
        
                }
        
                else {
                    
                    //console.log('no existing run')
        
                    var sqlQuery = `
        
                    INSERT INTO 
                    Purples.Solo (PlayerID,RunCharacterName,Patch,Region,Rank,Time,MainClass,SubClass,WeaponInfo1,WeaponInfo2,WeaponInfo3,WeaponInfo4,WeaponInfo5,WeaponInfo6,Link,Notes,SubmissionTime,SubmitterID,ModNotes)
                    VALUES (@1,@2,@3,@4,@5,@6,@7,@8,@9,@10,@11,@12,@13,@14,@15,@16,@17,@18,@19);`;
                        
                    await poolConnection.request().input('1',sql.Int, data.PlayerID).input('2',sql.NVarChar, data.RunCharacter).input('3',sql.NVarChar, data.Patch).input('4',sql.NVarChar, data.Region).input('5',sql.Int, data.Rank).input('6',sql.NVarChar, data.Time).input('7',sql.NVarChar, data.MainClass).input('8',sql.NVarChar, data.SubClass).input('9',sql.NVarChar, data.W1).input('10',sql.NVarChar, data.W2).input('11',sql.NVarChar, data.W3).input('12',sql.NVarChar, data.W4).input('13',sql.NVarChar, data.W5).input('14',sql.NVarChar, data.W6).input('15',sql.NVarChar, data.Link).input('16',sql.NVarChar, data.Notes).input('17',sql.DateTime, data.SubmissionTime).input('18',sql.Int, data.SubmitterID).input('19',sql.NVarChar, data.ModNotes).query(sqlQuery);
        
                    }
        
                    poolConnection.close();
        
                    //returner = context.req.body;
        
                    return json({'Code' : 'success'});
            
                }
                notifyDiscord("<Moderator_Name>", "<Player_Name>", "");
            catch (err) {
                console.error(err.message);
                return json({'Code' : 'error'});
            }
            break;

    }
}

const notifyDiscord = async (moderatorName, playerName, quest) => {
    const webhookUrl = process.env.RUN_APPROVAL_DISCORD_WEBHOOK_URL;
    if (!webhookUrl) return;

    const thumbnail = quest.toLowerCase().startsWith("dfa") ?
        process.env.RUN_APPROVAL_THUMBNAIL_DFA :
        process.env.RUN_APPROVAL_THUMBNAIL_STIA_PURPLE;
    try {
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": "PSO2 Central Leaderboard",
                "embeds": [
                    {
                        "title": "A new run has been approved :white_check_mark:",
                        "url": "https://leaderboard.pso2central.com",
                        "description": `A new **${quest}** run from \`${playerName}\` has been approved by \`${moderatorName}\` and added to the leaderboard.`,
                        "color": 54300,
                        "thumbnail": {
                            "url": process.env.RUN_APPROVAL_WEBHOOK_USER_IMG
                        },
                        "image": {
                            "url": thumbnail
                        },
                        "footer": {
                            "text": "PSO2 Central Leaderboard"
                        }
                    }
                ]
            })
        });
    }
    catch (err) {
        console.error(err);
    }
};
