export interface GetRunDbModel {
	// Run Meta
	run_meta_group_num: string;

	// Run
	run_id: string;
	run_submitter_id: string;
	run_game: string;
	run_quest: string;
	run_category: string;
	run_server_region: string;
	run_patch: string;
	run_quest_rank: string;
	run_party_size: string;
	run_time: { hours: number; minutes: number; seconds: number };
	run_notes: string;
	run_submission_date: string;
	run_submission_status: string;
	run_date_reviewed: string;
	run_mod_notes: string;
	run_attributes: string;
	run_reviewed_by: string;

	// Party
	party_id: string;
	party_run_id: string;
	party_player_id: string;
	party_ordinal: string;
	party_pov_link: string;
	party_run_character_name: string;
	party_main_class: string;
	party_sub_class: string;
	party_weapons: string[];

	// Players
	player_name: string;
	player_character_name: string;
	player_preferred_name_type: string;
	player_server: string;
	player_ship: string;
	player_flag: string;
	player_name_effect_type: string;
	player_name_color1: string;
	player_name_color2: string;

	// Submitter
	submitter_name: string;
	submitter_character_name: string;
	submitter_preferred_name_type: string;
	submitter_server: string;
	submitter_ship: string;
	submitter_flag: string;
	submitter_name_effect_type: string;
	submitter_name_color1: string;
	submitter_name_color2: string;
}
