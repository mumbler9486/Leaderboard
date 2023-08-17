import sql, { NVarChar, type Request } from 'mssql';
import type { ProfileUpdateRequest } from '$lib/types/api/validation/profileUpdate';
import { fields } from '../util/nameof';
import { isNullOrEmpty } from '$lib/utils/string';
import type { PlayersDbModel } from '../types/db/users/players';

const playerDbFields = fields<PlayersDbModel>();

export const updatePlayerProfile = async (
	request: Request,
	playerId: number,
	updateProfileRequest: ProfileUpdateRequest
) => {
	const updateCustomizationQuery = `
    UPDATE dbo.Players
    SET 
      ${playerDbFields.NameEffectType} = @nameType,
      ${playerDbFields.NameColor1} = @nameColor1,
      ${playerDbFields.NameColor2} = @nameColor2,
      ${playerDbFields.Server} = @server,
      ${playerDbFields.PreferredNameType} = @preferredName,
      ${playerDbFields.Flag} = @flag,
      ${playerDbFields.Ship} = @ship,
      ${playerDbFields.CharacterName} = @characterName,
      ${playerDbFields.Bio} = @description,
      ${playerDbFields.Youtube} = @youtube,
      ${playerDbFields.Twitch} = @twitch,
      ${playerDbFields.Twitter} = @twitter,
      ${playerDbFields.Discord} = @discord
    WHERE ${playerDbFields.Id} = @playerId;
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

	const isSuccess = results?.rowsAffected[0] === 1;
	if (!isSuccess) {
		throw Error(
			`Player profile update failed, affected an erroneous number of rows. rowsAffected=${results.rowsAffected}`
		);
	}

	return isSuccess;
};
