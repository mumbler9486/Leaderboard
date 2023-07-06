import sql, { NVarChar, type Request } from 'mssql';
import type { ProfileUpdateRequest } from '$lib/types/api/validation/profileUpdate';
import { fields } from '../util/nameof';
import type {
	PlayerCustomizationDbModel,
	PlayerInformationDbModel
} from '../types/db/users/playerInformation';
import { isNullOrEmpty } from '$lib/utils/string';

const playerInfoDbFields = fields<PlayerInformationDbModel>();
const playerCustomDbFields = fields<PlayerCustomizationDbModel>();

export const updatePlayerProfile = async (
	request: sql.Request,
	playerId: number,
	updateProfileRequest: ProfileUpdateRequest
) => {
	const updateCustomizationQuery = `
    UPDATE Players.Customization
    SET 
      ${playerCustomDbFields.NameType} = @nameType,
      ${playerCustomDbFields.NameColor1} = @nameColor1,
      ${playerCustomDbFields.NameColor2} = @nameColor2,
      ${playerCustomDbFields.Server} = @server,
      ${playerCustomDbFields.PreferredName} = @preferredName,
      ${playerCustomDbFields.Flag} = @flag,
      ${playerCustomDbFields.Ship} = @ship
    WHERE ${playerCustomDbFields.PlayerID} = @playerId;

    UPDATE Players.Information
    SET 
      ${playerInfoDbFields.CharacterName} = @characterName,
      ${playerInfoDbFields.Description} = @description,
      ${playerInfoDbFields.Youtube} = @youtube,
      ${playerInfoDbFields.Twitch} = @twitch,
      ${playerInfoDbFields.Twitter} = @twitter,
      ${playerInfoDbFields.Discord} = @discord
    WHERE ${playerInfoDbFields.PlayerID} = @playerId;
  `;

	const flag = isNullOrEmpty(updateProfileRequest.playerCountry)
		? undefined
		: updateProfileRequest.playerCountry!.toLowerCase();

	request = request
		.input('playerId', sql.Int, playerId)
		.input('nameType', sql.Int, updateProfileRequest.nameEffect)
		.input('nameColor1', sql.NVarChar, updateProfileRequest.primaryColor)
		.input('nameColor2', sql.NVarChar, updateProfileRequest.secondaryColor)
		.input('server', sql.NVarChar, updateProfileRequest.serverRegion)
		.input('preferredName', sql.Int, updateProfileRequest.preferredName)
		.input('flag', sql.NVarChar, flag)
		.input('ship', sql.Int, updateProfileRequest.ship)
		.input('characterName', sql.NVarChar, updateProfileRequest.mainCharacterName)
		.input('description', sql.NVarChar, updateProfileRequest.description)
		.input('youtube', sql.NVarChar, updateProfileRequest.youtubeHandle)
		.input('twitch', sql.NVarChar, updateProfileRequest.twitchChannel)
		.input('twitter', sql.NVarChar, updateProfileRequest.twitterHandle)
		.input('discord', sql.NVarChar, updateProfileRequest.discordUsername);

	const results = await request.query(updateCustomizationQuery);

	const isSuccess =
		results?.rowsAffected &&
		results.rowsAffected.length == 2 &&
		results.rowsAffected[0] == 1 &&
		results.rowsAffected[1] == 1;
	if (!isSuccess) {
		throw Error(
			`Player profile update failed, affected an erroneous number of rows. rowsAffected=${results.rowsAffected}`
		);
	}

	return isSuccess;
};
