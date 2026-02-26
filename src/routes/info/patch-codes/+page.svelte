<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import Timeline from '$lib/Components/Timeline.svelte';
	import TimelineNode from '$lib/Components/TimelineNode.svelte';
	import {
		currentPatchLabel,
		CurrentSubmissionPatchCode,
		patchCodeLabelMap,
	} from '$lib/constants/patchCodes';
</script>

<div class="flex flex-col content-center">
	<div class="container m-16 mx-auto rounded-md border border-secondary bg-base-100/75">
		<div class="m-2 flex flex-col rounded-md border border-secondary bg-base-100 p-4 px-8">
			<div class="text-center text-4xl font-light">Patch Code History</div>
			<Divider />
			<div class="flex flex-col items-center">
				<div class="mb-4 text-xl">
					The current patch is <span class="font-bold text-primary">{currentPatchLabel}</span>
				</div>
				<div class="flex max-w-4xl flex-col gap-2">
					<p>
						Patch codes are a common staple in speed-running. They denote eras of a game for a
						particular version of a game. These often come with their own set of rules and
						conventions as players optimize their game play around certain strategies in that
						version.
					</p>
					<p>
						PSO2 is considered a live-service game meaning we can only play the latest version of
						the game for a limited amount of time. New gear, quest ranks, game updates, and class
						skills eventually come out and eventually make some quest content a breeze, obsoleting
						some run strategies, and usurping records. Therefore it is important to take note of the
						patch code and appreciate the era in which the run was performed in. In this page we
						will outline the history of the game's version releases as they pertain to speed-running
						and the Leaderboards themselves.
					</p>
				</div>
				<div class="mt-8 max-w-6xl">
					<Timeline>
						<TimelineNode
							title="+60 Weapon Grind Release"
							time="October 10, 2023"
							side="left"
							fillLineStart
						>
							Weapons were able to be upgraded to level 60 grind and level 5 potential for the first
							time.
						</TimelineNode>
						<TimelineNode
							title="Leaderboard Started"
							time="Jan 12, 2023"
							side="right"
							fillLineStart
						>
							PSO2 Central's Leaderboard website established and began accepting runs. Speed-runs of
							various quests in the game already existed as far back as December 8, 2023 were
							entered in the leaderboard.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['slayer']}
							time="April 12, 2023"
							side="left"
							fillLineStart
						>
							Slayer class was released. It opened new possibilities for sub-classing and critical
							hit based builds. The first phase of Duels was released alongside with the Defi-series
							Duel-only augment. Nex Aelio, Renus Retem, Ams Kvaris, and Nils Stia at rank 1 were
							available to fight.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['pot6r']}
							time="April 19, 2023"
							side="right"
							fillLineStart
						>
							Weapon potential level 6 was released which required Photon Chunk II A & B to unlock.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['level75r']}
							time="June 14, 2023"
							side="left"
							fillLineStart
						>
							A skill re-balance from June 7th for several classes was released. On the 14th the
							level cap was increased to level 75 alongside new rarity 9⭐ weapons. We decided to
							roll the skill re-balance and level cap increase into the same patch. Dark Falz Aegis
							gains a new rank. Duel Halvaldi released June 21st. Tisah weapons available for the
							first time.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['level80r']}
							time="October 11, 2023"
							side="right"
							fillLineStart
						>
							The maximum player level was increased to level 80 and a few classes gained some new
							class skills "to balance the use of long-range weapons in multiplayer". Existing Duel
							quests (up to phase 2 Zelvin) increased the maximum quest time from 5 minutes to 10
							minutes, nullifies region mag effects during the quest, and lowered HP enemies. Around
							this time newly released Alliance mags offered 5% potency. Duel Boss Zelvin was
							released later on October 18th.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['lvl80grind']}
							time="December 6, 2023"
							side="left"
							fillLineStart
						>
							Weapon grind level +80 was introduced alongside various PA Tech Arts Customizations.
							Bouncer re-balance was released.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['level85r']}
							time="January 31, 2024"
							side="right"
							fillLineStart
						>
							Player level cap has been increased to level 85. Ranger and Gunner classes were also
							expanded with new class skills, Photon Art charge phases, attack ranges, cancel
							timings, and other class balance adjustments. 10* Reyaar Weapons and 9* Einea Units
							were released. Lastly, some Fixas have been adjusted in power with the Verschmelz
							weapon series being rebalanced to accommodate for the changes to Termina.
						</TimelineNode>
						<TimelineNode
							title="Tech Arts Customs and 10⭐ Xover series"
							time="April 10, 2024"
							side="left"
							fillLineStart
						>
							Known as the {patchCodeLabelMap['apr2024xover']} patch, New Tech Art customizations were
							released alongside 10-star Xover weapon series. The patch brings about significant changes
							to various classes that we think would have an impact on the way players approach bosses
							with their classes. Such as Slayer's Regulus PA and changes to Hunter's PAs.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['level90r']}
							time="June 5, 2024"
							side="right"
							fillLineStart
						>
							Known as the {patchCodeLabelMap['level90r']} patch, the player level cap has been updated
							to 90. This alongside the 11⭐ Eredim series weapons, level 90 weapon/armor grind, 7 augment
							slots, new class skills, Augment and Special Ability transfer, and EX Special Ability augmentations.
							was released on this patch as well.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['marsRelease']}
							time="July 31, 2024"
							side="left"
							fillLineStart
						>
							Known as the {patchCodeLabelMap['marsRelease']} patch, the MARS combat system was released.
							From August 10⭐ Ektasis Armor will was released. And then from August 28, 11⭐Exelio weapon
							series was released.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['level95r']}
							time="Oct 2, 2024"
							side="right"
							fillLineStart
						>
							Known as the {patchCodeLabelMap['level95r']} patch, the player level cap was increased
							to 95 for all classes. A new weapon series "Duo Selio" was released. This release also
							included techter class balance adjustments for wands and new class skills. Update: Oct
							16, 2024 update introduced the Highstira Domina augment. Update two: Oct 23, 2024 introduced
							the Giga Triyal augment.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['forceRebalance']}
							time="Dec 4, 2024"
							side="left"
							fillLineStart
							current={CurrentSubmissionPatchCode === 'forceRebalance'}
						>
							Known as the {patchCodeLabelMap['forceRebalance']} patch, the force class was rebalanced.
							Later in the month, a new 12-star weapon series "Twaalv" was released (Dec 18th). This
							release also introduced new EX Augments EX Turnover H, EX Evade HP Gain H, EX Bring Down
							PB Boost H, and EX Maintain Balance H.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['level100r']}
							time="Feb 5, 2025"
							side="right"
							fillLineStart
							current={CurrentSubmissionPatchCode === 'level100r'}
						>
							Known as the {patchCodeLabelMap['level100r']} patch, the player level cap was increased
							to level 100. The hunter class was also rebalanced with new class skills, effects, and
							balance adjustments. Tri-Selios can be upgraded to the 12⭐ Akroselio weapon series. Also
							the cool down time for active skills at the current = {CurrentSubmissionPatchCode ===
								'level100r'} start of any quests will be reduced to 10 seconds for ALL classes. Later
							that month on Feb 19 we also got the 11⭐ Akrotasis Armor series.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['braverRebalance']}
							time="Apr 2, 2025"
							side="left"
							fillLineStart
							current={CurrentSubmissionPatchCode === 'braverRebalance'}
						>
							Known as the {patchCodeLabelMap['braverRebalance']} patch, the Braver class was rebalanced
							with new adjustments, new effects, and new class skills. Additionally new Legendios weapons
							and 12⭐ Klirodim weapons were introduced. New EX Augments were also released. Later that
							month on April 23rd new Defi Augments such as C/Majis Gigas Maste were introduced.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['level105r']}
							time="June 4, 2025"
							side="right"
							fillLineStart
							current={CurrentSubmissionPatchCode === 'level105r'}
						>
							Known as the {patchCodeLabelMap['level105r']} patch, player level cap has been increased
							to level 105. In addition, weapons and armor can now be affixed with up to 8 augments.
							12⭐ Progre Armor was released alongside a new augment C/Ultia Domina. Following the release
							of the High difficulty Dark Falz Vael quest on June 10th, 13⭐ Cres series weapon was also
							released. The weapon has a Potential that raises Potency and reduces PP consumption when
							attacking enemies.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['july2025juvolg']}
							time="July 2, 2025"
							side="left"
							fillLineStart
							current={CurrentSubmissionPatchCode === 'july2025juvolg'}
						>
							Known as the {patchCodeLabelMap['july2025juvolg']} patch, a minor patch for the release
							of the new 13⭐ Juvolg weapon series released on July 2nd. Then the release of the 12⭐
							Eskul Armor on July 16th.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['wakerRebalance']}
							time="August 6, 2025"
							side="right"
							fillLineStart
							current={CurrentSubmissionPatchCode === 'wakerRebalance'}
						>
							Known as the {patchCodeLabelMap['wakerRebalance']} patch, the Waker class will be rebalanced
							and a new class skill will be added. Fighter and Gunner adjustments will also be made.
							In addition a new 13⭐ Volgen weapon series and Legend.2 Lygend weapon series will be released.
							Two new EX special abilities EX Pain Provoke II H and EX Evade Onslaught II H will be released.
							Later on September 3rd, the 13⭐ Zenit weapon series was was released
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['level110r']}
							time="October 1, 2025"
							side="left"
							fillLineStart
							current={CurrentSubmissionPatchCode === 'level110r'}
						>
							Known as the {patchCodeLabelMap['level110r']} patch, level cap was raised to 110. EX Style
							enhancement system was released. C/Tera Triyal augment was also released. Later on the
							22nd of October, Skill Rings were released with Type 1 and Type 2 varieties. November 5th
							also brought some gear releases with 13⭐ Fortscha Armor and C/Argant Gigas Maste capsules.
							From December 3rd Legend.3 weapons will be available. From December 17th we will also got
							the release of C/Argant Gladia Soul.
						</TimelineNode>
						<TimelineNode
							title={patchCodeLabelMap['level115r']}
							time="February 4, 2025"
							side="right"
							fillLineStart
							current={CurrentSubmissionPatchCode === 'level115r'}
						>
							Known as the {patchCodeLabelMap['level115r']} patch, level cap was raised to 115. New 14⭐
							Spradio weapons were released that can be dropped in Nameless City: Entertainment District.
							Leafladio 14⭐ series weapons were also released on March 4, 2026.
						</TimelineNode>
					</Timeline>
				</div>
			</div>
		</div>
	</div>
</div>
