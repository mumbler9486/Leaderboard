<script lang="ts">
	import { json } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';
	import { each } from 'svelte/internal';
	const dispatch = createEventDispatcher();

	export let modalID: string;
	let d = {};

	var countries = [
		{ text: 'None', value: '' },
		{ text: 'Afghanistan', value: 'AF' },
		{ text: 'Åland Islands', value: 'AX' },
		{ text: 'Albania', value: 'AL' },
		{ text: 'Algeria', value: 'DZ' },
		{ text: 'American Samoa', value: 'AS' },
		{ text: 'Andorra', value: 'AD' },
		{ text: 'Angola', value: 'AO' },
		{ text: 'Anguilla', value: 'AI' },
		{ text: 'Antarctica', value: 'AQ' },
		{ text: 'Antigua and Barbuda', value: 'AG' },
		{ text: 'Argentina', value: 'AR' },
		{ text: 'Armenia', value: 'AM' },
		{ text: 'Aruba', value: 'AW' },
		{ text: 'Australia', value: 'AU' },
		{ text: 'Austria', value: 'AT' },
		{ text: 'Azerbaijan', value: 'AZ' },
		{ text: 'Bahamas', value: 'BS' },
		{ text: 'Bahrain', value: 'BH' },
		{ text: 'Bangladesh', value: 'BD' },
		{ text: 'Barbados', value: 'BB' },
		{ text: 'Belarus', value: 'BY' },
		{ text: 'Belgium', value: 'BE' },
		{ text: 'Belize', value: 'BZ' },
		{ text: 'Benin', value: 'BJ' },
		{ text: 'Bermuda', value: 'BM' },
		{ text: 'Bhutan', value: 'BT' },
		{ text: 'Bolivia', value: 'BO' },
		{ text: 'Bosnia and Herzegovina', value: 'BA' },
		{ text: 'Botswana', value: 'BW' },
		{ text: 'Bouvet Island', value: 'BV' },
		{ text: 'Brazil', value: 'BR' },
		{ text: 'British Indian Ocean Territory', value: 'IO' },
		{ text: 'Brunei Darussalam', value: 'BN' },
		{ text: 'Bulgaria', value: 'BG' },
		{ text: 'Burkina Faso', value: 'BF' },
		{ text: 'Burundi', value: 'BI' },
		{ text: 'Cambodia', value: 'KH' },
		{ text: 'Cameroon', value: 'CM' },
		{ text: 'Canada', value: 'CA' },
		{ text: 'Cape Verde', value: 'CV' },
		{ text: 'Cayman Islands', value: 'KY' },
		{ text: 'Central African Republic', value: 'CF' },
		{ text: 'Chad', value: 'TD' },
		{ text: 'Chile', value: 'CL' },
		{ text: 'China', value: 'CN' },
		{ text: 'Christmas Island', value: 'CX' },
		{ text: 'Cocos (Keeling) Islands', value: 'CC' },
		{ text: 'Colombia', value: 'CO' },
		{ text: 'Comoros', value: 'KM' },
		{ text: 'Congo', value: 'CG' },
		{ text: 'Congo, The Democratic Republic of the', value: 'CD' },
		{ text: 'Cook Islands', value: 'CK' },
		{ text: 'Costa Rica', value: 'CR' },
		{ text: "Cote D'Ivoire", value: 'CI' },
		{ text: 'Croatia', value: 'HR' },
		{ text: 'Cuba', value: 'CU' },
		{ text: 'Cyprus', value: 'CY' },
		{ text: 'Czech Republic', value: 'CZ' },
		{ text: 'Denmark', value: 'DK' },
		{ text: 'Djibouti', value: 'DJ' },
		{ text: 'Dominica', value: 'DM' },
		{ text: 'Dominican Republic', value: 'DO' },
		{ text: 'Ecuador', value: 'EC' },
		{ text: 'Egypt', value: 'EG' },
		{ text: 'El Salvador', value: 'SV' },
		{ text: 'Equatorial Guinea', value: 'GQ' },
		{ text: 'Eritrea', value: 'ER' },
		{ text: 'Estonia', value: 'EE' },
		{ text: 'Ethiopia', value: 'ET' },
		{ text: 'Falkland Islands (Malvinas)', value: 'FK' },
		{ text: 'Faroe Islands', value: 'FO' },
		{ text: 'Fiji', value: 'FJ' },
		{ text: 'Finland', value: 'FI' },
		{ text: 'France', value: 'FR' },
		{ text: 'French Guiana', value: 'GF' },
		{ text: 'French Polynesia', value: 'PF' },
		{ text: 'French Southern Territories', value: 'TF' },
		{ text: 'Gabon', value: 'GA' },
		{ text: 'Gambia', value: 'GM' },
		{ text: 'Georgia', value: 'GE' },
		{ text: 'Germany', value: 'DE' },
		{ text: 'Ghana', value: 'GH' },
		{ text: 'Gibraltar', value: 'GI' },
		{ text: 'Greece', value: 'GR' },
		{ text: 'Greenland', value: 'GL' },
		{ text: 'Grenada', value: 'GD' },
		{ text: 'Guadeloupe', value: 'GP' },
		{ text: 'Guam', value: 'GU' },
		{ text: 'Guatemala', value: 'GT' },
		{ text: 'Guernsey', value: 'GG' },
		{ text: 'Guinea', value: 'GN' },
		{ text: 'Guinea-Bissau', value: 'GW' },
		{ text: 'Guyana', value: 'GY' },
		{ text: 'Haiti', value: 'HT' },
		{ text: 'Heard Island and Mcdonald Islands', value: 'HM' },
		{ text: 'Holy See', value: 'VA' },
		{ text: 'Honduras', value: 'HN' },
		{ text: 'Hong Kong', value: 'HK' },
		{ text: 'Hungary', value: 'HU' },
		{ text: 'Iceland', value: 'IS' },
		{ text: 'India', value: 'IN' },
		{ text: 'Indonesia', value: 'ID' },
		{ text: 'Iran', value: 'IR' },
		{ text: 'Iraq', value: 'IQ' },
		{ text: 'Ireland', value: 'IE' },
		{ text: 'Isle of Man', value: 'IM' },
		{ text: 'Israel', value: 'IL' },
		{ text: 'Italy', value: 'IT' },
		{ text: 'Jamaica', value: 'JM' },
		{ text: 'Japan', value: 'JP' },
		{ text: 'Jersey', value: 'JE' },
		{ text: 'Jordan', value: 'JO' },
		{ text: 'Kazakhstan', value: 'KZ' },
		{ text: 'Kenya', value: 'KE' },
		{ text: 'Kiribati', value: 'KI' },
		{ text: 'South Korea', value: 'KR' },
		{ text: 'Kuwait', value: 'KW' },
		{ text: 'Kyrgyzstan', value: 'KG' },
		{ text: "Lao People's Democratic Republic", value: 'LA' },
		{ text: 'Latvia', value: 'LV' },
		{ text: 'Lebanon', value: 'LB' },
		{ text: 'Lesotho', value: 'LS' },
		{ text: 'Liberia', value: 'LR' },
		{ text: 'Libyan Arab Jamahiriya', value: 'LY' },
		{ text: 'Liechtenstein', value: 'LI' },
		{ text: 'Lithuania', value: 'LT' },
		{ text: 'Luxembourg', value: 'LU' },
		{ text: 'Macao', value: 'MO' },
		{ text: 'Macedonia', value: 'MK' },
		{ text: 'Madagascar', value: 'MG' },
		{ text: 'Malawi', value: 'MW' },
		{ text: 'Malaysia', value: 'MY' },
		{ text: 'Maldives', value: 'MV' },
		{ text: 'Mali', value: 'ML' },
		{ text: 'Malta', value: 'MT' },
		{ text: 'Marshall Islands', value: 'MH' },
		{ text: 'Martinique', value: 'MQ' },
		{ text: 'Mauritania', value: 'MR' },
		{ text: 'Mauritius', value: 'MU' },
		{ text: 'Mayotte', value: 'YT' },
		{ text: 'Mexico', value: 'MX' },
		{ text: 'Micronesia, Federated States of', value: 'FM' },
		{ text: 'Moldova, Republic of', value: 'MD' },
		{ text: 'Monaco', value: 'MC' },
		{ text: 'Mongolia', value: 'MN' },
		{ text: 'Montserrat', value: 'MS' },
		{ text: 'Morocco', value: 'MA' },
		{ text: 'Mozambique', value: 'MZ' },
		{ text: 'Myanmar', value: 'MM' },
		{ text: 'Namibia', value: 'NA' },
		{ text: 'Nauru', value: 'NR' },
		{ text: 'Nepal', value: 'NP' },
		{ text: 'Netherlands', value: 'NL' },
		{ text: 'Netherlands Antilles', value: 'AN' },
		{ text: 'New Caledonia', value: 'NC' },
		{ text: 'New Zealand', value: 'NZ' },
		{ text: 'Nicaragua', value: 'NI' },
		{ text: 'Niger', value: 'NE' },
		{ text: 'Nigeria', value: 'NG' },
		{ text: 'Niue', value: 'NU' },
		{ text: 'Norfolk Island', value: 'NF' },
		{ text: 'Northern Mariana Islands', value: 'MP' },
		{ text: 'Norway', value: 'NO' },
		{ text: 'Oman', value: 'OM' },
		{ text: 'Pakistan', value: 'PK' },
		{ text: 'Palau', value: 'PW' },
		{ text: 'State of Palestine', value: 'PS' },
		{ text: 'Panama', value: 'PA' },
		{ text: 'Papua New Guinea', value: 'PG' },
		{ text: 'Paraguay', value: 'PY' },
		{ text: 'Peru', value: 'PE' },
		{ text: 'Philippines', value: 'PH' },
		{ text: 'Pitcairn', value: 'PN' },
		{ text: 'Poland', value: 'PL' },
		{ text: 'Portugal', value: 'PT' },
		{ text: 'Puerto Rico', value: 'PR' },
		{ text: 'Qatar', value: 'QA' },
		{ text: 'Reunion', value: 'RE' },
		{ text: 'Romania', value: 'RO' },
		{ text: 'Russian Federation', value: 'RU' },
		{ text: 'Rwanda', value: 'RW' },
		{ text: 'Saint Helena', value: 'SH' },
		{ text: 'Saint Kitts and Nevis', value: 'KN' },
		{ text: 'Saint Lucia', value: 'LC' },
		{ text: 'Saint Pierre and Miquelon', value: 'PM' },
		{ text: 'Saint Vincent and the Grenadines', value: 'VC' },
		{ text: 'Samoa', value: 'WS' },
		{ text: 'San Marino', value: 'SM' },
		{ text: 'Sao Tome and Principe', value: 'ST' },
		{ text: 'Saudi Arabia', value: 'SA' },
		{ text: 'Senegal', value: 'SN' },
		{ text: 'Serbia and Montenegro', value: 'CS' },
		{ text: 'Seychelles', value: 'SC' },
		{ text: 'Sierra Leone', value: 'SL' },
		{ text: 'Singapore', value: 'SG' },
		{ text: 'Slovakia', value: 'SK' },
		{ text: 'Slovenia', value: 'SI' },
		{ text: 'Solomon Islands', value: 'SB' },
		{ text: 'Somalia', value: 'SO' },
		{ text: 'South Africa', value: 'ZA' },
		{ text: 'South Georgia and the South Sandwich Islands', value: 'GS' },
		{ text: 'Spain', value: 'ES' },
		{ text: 'Sri Lanka', value: 'LK' },
		{ text: 'Sudan', value: 'SD' },
		{ text: 'Suriname', value: 'SR' },
		{ text: 'Svalbard and Jan Mayen', value: 'SJ' },
		{ text: 'Swaziland', value: 'SZ' },
		{ text: 'Sweden', value: 'SE' },
		{ text: 'Switzerland', value: 'CH' },
		{ text: 'Syria', value: 'SY' },
		{ text: 'Taiwan', value: 'TW' },
		{ text: 'Tajikistan', value: 'TJ' },
		{ text: 'Tanzania, United Republic of', value: 'TZ' },
		{ text: 'Thailand', value: 'TH' },
		{ text: 'Timor-Leste', value: 'TL' },
		{ text: 'Togo', value: 'TG' },
		{ text: 'Tokelau', value: 'TK' },
		{ text: 'Tonga', value: 'TO' },
		{ text: 'Trinidad and Tobago', value: 'TT' },
		{ text: 'Tunisia', value: 'TN' },
		{ text: 'Turkey', value: 'TR' },
		{ text: 'Turkmenistan', value: 'TM' },
		{ text: 'Turks and Caicos Islands', value: 'TC' },
		{ text: 'Tuvalu', value: 'TV' },
		{ text: 'Uganda', value: 'UG' },
		{ text: 'Ukraine', value: 'UA' },
		{ text: 'United Arab Emirates', value: 'AE' },
		{ text: 'United Kingdom', value: 'GB' },
		{ text: 'United States', value: 'US' },
		{ text: 'United States Minor Outlying Islands', value: 'UM' },
		{ text: 'Uruguay', value: 'UY' },
		{ text: 'Uzbekistan', value: 'UZ' },
		{ text: 'Vanuatu', value: 'VU' },
		{ text: 'Venezuela', value: 'VE' },
		{ text: 'Viet Nam', value: 'VN' },
		{ text: 'Virgin Islands, British', value: 'VG' },
		{ text: 'Virgin Islands, U.S.', value: 'VI' },
		{ text: 'Wallis and Futuna', value: 'WF' },
		{ text: 'Western Sahara', value: 'EH' },
		{ text: 'Yemen', value: 'YE' },
		{ text: 'Zambia', value: 'ZM' },
		{ text: 'Zimbabwe', value: 'ZW' }
	];

	let processingInput = false;

	let serverReference;
	let previewName;
	let previewcss;

	async function submitChanges() {
		const res = await fetch('/.auth/me');
		const payload = await res.json();
		const { clientPrincipal } = payload;
		var userInfo = clientPrincipal;

		processingInput = true;
		const response = await fetch('/ngs-api/UpdateProfile', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				newCharacterName: document.getElementById('charname-form').value,
				newPreferredName: document.getElementById('namepref-form').value,
				newYT1: document.getElementById('social-youtube1-form').value,
				newYT2: document.getElementById('social-youtube2-form').value,
				newTwitter: document.getElementById('social-twitter-form').value,
				newTwitch: document.getElementById('social-twitch-form').value,
				newDiscord: document.getElementById('social-discord-form').value,
				newShip: document.getElementById('shipselect-form').value,
				newCountry: document.getElementById('country-form').value,
				newNameC1: document.getElementById('color1-form').value.replace('#', ''),
				newNameC2: document.getElementById('color2-form').value.replace('#', ''),
				newNameEffect: document.getElementById('nametype-form').value,
				newDescription: document.getElementById('description-form').value,
				pidReference: userInfo.userId
			})
		});
		var evt = await response.json();
		if (evt.Successful && evt.Successful == 'Aye') {
			window.location.reload();
		}
	}

	function generateNames(null1, null2, null3) {
		switch (d.previewprefname) {
			// Main Character Name
			case 1:
				previewName = d.previewcharname;
				break;
			// Run Character Name
			case 2:
				previewName = d.previewcharname;
				break;
			// Player Name
			default:
				previewName = d.PlayerName;
				break;
		}
		if (previewName == null || previewName == '') {
			previewName = '';
		}

		if (d.PlayerID != (106 || 107)) {
			previewcss = ``;
			switch (d.previewnametype) {
				case 1:
					previewcss += `color: #` + d.previewc1 + `;`;
					break;
				case 2:
					previewcss +=
						`background: -webkit-linear-gradient(0deg, #` +
						d.previewc1 +
						`, #` +
						d.previewc2 +
						`);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;`;
					break;
				case 3:
					previewcss +=
						`color: #` +
						d.previewc2 +
						`; text-shadow: 0px 0px 5px #` +
						d.previewc1 +
						`, 0px 0px 5px #` +
						d.previewc1 +
						`, 0px 0px 5px #` +
						d.previewc1 +
						`;`;
					break;
				default:
					break;
			}
		} else {
			previewcss = ``;
		}
	}

	function blendColors(colorA, amount) {
		var colorB = '';
		const [rA, gA, bA] = colorA.match(/\w\w/g).map((c) => parseInt(c, 16));
		if (rA > 192) {
			colorB += '00';
		} else {
			colorB += 'FF';
		}
		if (gA > 192) {
			colorB += '00';
		} else {
			colorB += 'FF';
		}
		if (bA > 192) {
			colorB += '00';
		} else {
			colorB += 'FF';
		}
		console.log(colorB);
		const [rB, gB, bB] = colorB.match(/\w\w/g).map((c) => parseInt(c, 16));
		const r = Math.round(rA + (rB - rA) * amount)
			.toString(16)
			.padStart(2, '0');
		const g = Math.round(gA + (gB - gA) * amount)
			.toString(16)
			.padStart(2, '0');
		const b = Math.round(bA + (bB - bA) * amount)
			.toString(16)
			.padStart(2, '0');
		return r + g + b;
	}

	export function openRefresh(input) {
		d = input;

		let descriptionForm = document.getElementById('description-form');
		let characterForm = document.getElementById('charname-form');
		let youtube1Form = document.getElementById('social-youtube1-form');
		let youtube2Form = document.getElementById('social-youtube2-form');
		let twitterForm = document.getElementById('social-twitter-form');
		let twitchForm = document.getElementById('social-twitch-form');
		let discordForm = document.getElementById('social-discord-form');
		let prefnameForm = document.getElementById('namepref-form');
		let shipselectForm = document.getElementById('shipselect-form');
		let countryForm = document.getElementById('country-form');

		let color1Form = document.getElementById('color1-form');
		let color2Form = document.getElementById('color2-form');

		let nametypeform = document.getElementById('nametype-form');

		nametypeform.value = d.NameType;
		serverReference = d.Server.toLowerCase();

		descriptionForm.value = d.Description;
		characterForm.value = d.CharacterName;

		if (d.Flag == null || d.Flag == '') {
			d.Flag = '';
		}
		if (d.Ship == null || d.Ship == '') {
			d.Ship = '';
		}

		d.previewc1 = d.NameColor1;
		d.previewc2 = d.NameColor2;
		d.previewnametype = d.NameType;
		d.previewcharname = d.CharacterName;
		d.previewprefname = d.PreferredName;
		color1Form.value = '#' + d.NameColor1;
		color2Form.value = '#' + d.NameColor2;

		countryForm.value = d.Flag;

		youtube1Form.value = d.Youtube;
		youtube2Form.value = d.Youtube2;
		twitterForm.value = d.Twitter;
		twitchForm.value = d.Twitch;
		discordForm.value = d.Discord;
		prefnameForm.value = d.PreferredName;
		shipselectForm.value = d.Ship;
		generateNames();
	}

	$: {
		generateNames(
			d.previewc1,
			d.previewc2,
			d.previewnametype,
			d.previewcharname,
			d.previewprefname
		);
	}
</script>

<input type="checkbox" id={modalID} class="modal-toggle" />
<div class="modal">
	<div class="modal-box relative max-h-full max-w-4xl rounded">
		{#if !processingInput}
			<div class="flex flex-row">
				<span class="flex-1 self-center text-3xl font-light md:text-4xl">Edit ARKs ID</span>
				<label
					for={modalID}
					class="btn-outline btn-secondary btn-square btn-sm btn flex-initial self-center rounded"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</label>
			</div>
			<div class="divider -mx-6" />

			<div class="truncate text-center">
				<span class="text-6xl font-bold" style={previewcss}>{previewName}</span>
			</div>

			<div class="widget-discord max-h-[20rem] overflow-auto px-1 md:max-h-[44rem]">
				<form id="editingForm" on:submit={submitChanges}>
					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="form-control">
							<label class="label" for="charname-form">
								<span class="label-text">Main Character Name</span>
							</label>
							<input
								id="charname-form"
								type="text"
								on:input={() =>
									(d.previewcharname = document.getElementById('charname-form').value)}
								placeholder="Please enter a character name."
								class="input-bordered input"
								maxlength="24"
								required
							/>
						</div>

						<div class="form-control">
							<label class="label" for="namepref-form">
								<span class="label-text">Preferred Name</span>
							</label>
							<select
								id="namepref-form"
								class="select-bordered select"
								on:change={() =>
									(d.previewprefname = Number(document.getElementById('namepref-form').value))}
							>
								<option value="0">Player Name ({d.PlayerName})</option>
								<option value="1">Character Name ({d.previewcharname})</option>
							</select>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="form-control">
							<label class="label" for="social-youtube1-form">
								<span class="label-text">Youtube Handle (Primary)</span>
							</label>
							<label class="input-group">
								<span>youtube.com/@</span>
								<input
									id="social-youtube1-form"
									placeholder="..."
									type="text"
									class="input-bordered input w-full"
									maxlength="30"
								/>
							</label>
						</div>
						<div class="form-control">
							<label class="label" for="social-youtube2-form">
								<span class="label-text">Youtube Handle (Secondary)</span>
							</label>
							<label class="input-group">
								<span>youtube.com/@</span>
								<input
									id="social-youtube2-form"
									placeholder="..."
									type="text"
									class="input-bordered input w-full"
									maxlength="30"
								/>
							</label>
						</div>
					</div>
					<div class="text-center text-warning">
						These are your Youtube channel(s) '@' handle(s), excluding the '@'!
					</div>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
						<div class="form-control">
							<label class="label" for="social-twitter-form">
								<span class="label-text">Twitter Name</span>
							</label>
							<label class="input-group">
								<span>twitter.com/</span>
								<input
									id="social-twitter-form"
									placeholder="..."
									type="text"
									class="input-bordered input w-full"
									maxlength="30"
								/>
							</label>
						</div>
						<div class="form-control">
							<label class="label" for="social-twitch-form">
								<span class="label-text">Twitch Channel Name</span>
							</label>
							<label class="input-group">
								<span>twitch.tv/</span>
								<input
									id="social-twitch-form"
									placeholder="..."
									type="text"
									class="input-bordered input w-full"
									maxlength="30"
								/>
							</label>
						</div>
						<div class="form-control">
							<label class="label" for="social-discord-form">
								<span class="label-text">Discord Name</span>
							</label>

							<input
								id="social-discord-form"
								type="text"
								placeholder="Name#1234"
								class="input-bordered input w-full"
							/>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
						<div class="form-control">
							<label class="label" for="shipselect-form">
								<span class="label-text">Ship</span>
							</label>
							<select id="shipselect-form" class="select-bordered select">
								<option value="">None</option>
								<option value="1">Ship 1 - {d.Server}</option>
								<option value="2">Ship 2 - {d.Server}</option>
								<option value="3">Ship 3 - {d.Server}</option>
								<option value="4">Ship 4 - {d.Server}</option>
								{#if serverReference != 'global'}
									<option value="5">Ship 5 - {d.Server}</option>
									<option value="6">Ship 6 - {d.Server}</option>
									<option value="7">Ship 7 - {d.Server}</option>
									<option value="8">Ship 8 - {d.Server}</option>
									<option value="9">Ship 9 - {d.Server}</option>
								{/if}
							</select>
						</div>

						<div class="form-control">
							<label class="label" for="country-form">
								<span class="label-text">Country</span>
							</label>
							<select id="country-form" class="widget-discord select-bordered select">
								{#each countries as opt}
									<option value={opt.value.toLowerCase()}>{opt.text}</option>
								{/each}
							</select>
						</div>
					</div>

					<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
						<div class="form-control">
							<label class="label" for="color1-form">
								<span class="label-text">Primary Color</span>
							</label>
							<input
								id="color1-form"
								type="color"
								on:input={() =>
									(d.previewc1 = document.getElementById('color1-form').value.replace('#', ''))}
								class="input-bordered input w-full"
							/>
						</div>
						<div class="form-control">
							<label class="label" for="color2-form">
								<span class="label-text">Secondary Color</span>
							</label>
							<input
								id="color2-form"
								type="color"
								on:input={() =>
									(d.previewc2 = document.getElementById('color2-form').value.replace('#', ''))}
								class="input-bordered input w-full"
							/>
						</div>
						<div class="form-control">
							<label class="label" for="nametype-form">
								<span class="label-text">Name Effect</span>
							</label>
							<select
								id="nametype-form"
								class="select-bordered select"
								on:change={() =>
									(d.previewnametype = Number(document.getElementById('nametype-form').value))}
							>
								<option value="0">No Effect</option>
								<option value="1">Solid Color</option>
								<option value="2">Gradient Color</option>
								<option value="3">Glowing</option>
							</select>
						</div>
					</div>

					<div class="form-control">
						<label class="label" for="description-form">
							<span class="label-text">Your Description (Profile)</span>
						</label>

						<textarea
							class="widget-discord textarea-bordered textarea h-24"
							placeholder="Type your own profile here!"
							id="description-form"
						/>
					</div>
				</form>
			</div>

			<div class="divider -mx-6" />
			<div class="modal-action justify-center md:justify-end">
				<label for={modalID} class="btn-outline btn-error btn rounded md:btn-sm">Cancel</label>
				<button
					class="btn-outline btn-success btn rounded md:btn-sm"
					type="submit"
					form="editingForm">Save</button
				>
			</div>
		{:else}
			<div class="flex basis-full flex-col place-content-center place-items-center gap-1">
				Loading - Please Wait...<br /><progress
					class="progress progress-primary w-56 border border-neutral-content/20"
				/>
			</div>
		{/if}
	</div>
</div>

<style>
	.widget-discord::-webkit-scrollbar {
		width: 10px;
	}
	.widget-discord::-webkit-scrollbar-thumb,
	::-webkit-scrollbar-track-piece {
		background-clip: padding-box;
		border: 3px solid transparent;
		border-radius: 5px;
	}
	.widget-discord::-webkit-scrollbar-thumb {
		background-color: hsla(0, 0%, 100%, 0.1);
	}
	.widget-discord::-webkit-scrollbar-track-piece {
		background-color: transparent;
	}
</style>
