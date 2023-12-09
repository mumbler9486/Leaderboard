import type { ProfileUpdateRequest } from '$lib/types/api/validation/profileUpdate';
import { fields } from '../util/nameof';
import { isNullOrEmpty } from '$lib/utils/string';
import type { PlayersDbModel2 } from '../types/db/users/players';
import type { Pool } from 'pg';

const playerDbFields = fields<PlayersDbModel2>();

export const updatePlayerProfile = async (
	pool: Pool,
	playerId: number,
	updateProfileRequest: ProfileUpdateRequest
) => {
	const flag = isNullOrEmpty(updateProfileRequest.playerCountry)
		? undefined
		: updateProfileRequest.playerCountry!.toLowerCase();

	const results = await pool.query(
		`
		UPDATE players
		SET 
			${playerDbFields.name_effect_type} = $1,
			${playerDbFields.name_color1} = $2,
			${playerDbFields.name_color2} = $3,
			${playerDbFields.server} = $4,
			${playerDbFields.preferred_name_type} = $5,
			${playerDbFields.flag} = $6,
			${playerDbFields.ship} = $7,
			${playerDbFields.character_name} = $8,
			${playerDbFields.bio} = $9,
			${playerDbFields.youtube} = $10,
			${playerDbFields.twitch} = $11,
			${playerDbFields.twitter} = $12,
			${playerDbFields.discord} = $13
		WHERE ${playerDbFields.id} = $14;`,
		[
			updateProfileRequest.nameEffect,
			updateProfileRequest.primaryColor,
			updateProfileRequest.secondaryColor,
			updateProfileRequest.serverRegion,
			updateProfileRequest.preferredName,
			flag,
			updateProfileRequest.ship,
			updateProfileRequest.mainCharacterName,
			updateProfileRequest.description,
			updateProfileRequest.youtubeHandle,
			updateProfileRequest.twitchChannel,
			updateProfileRequest.twitterHandle,
			updateProfileRequest.discordUsername,
			playerId,
		]
	);

	const isSuccess = results?.rowCount === 1;
	if (!isSuccess) {
		throw Error(
			`Player profile update failed, affected an erroneous number of rows. rowsAffected=${results.rowCount}`
		);
	}

	return isSuccess;
};
