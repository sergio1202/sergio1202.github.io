app.controller('profCtrl', ['$scope', function ($scope) {
    $scope.professions = ['Marine', 'Engineer', 'Pilot', 'Scientist'];
    $scope.species = [
        {
            Species: 'Bot (sentient)', BaseHitPoints: '4', TargetNumber: '8', Hands: '1', Move: '4', WearsArmor: 'N',
            SpecialAbility: 'Mechanical: -1 point per die of damage. 1 free upgrade per rank (no other upgrades allowed). No cyberware.'
        },
        {
            Species: 'Blootian', BaseHitPoints: '0', TargetNumber: '11', Hands: '1+,1-4', Move: '2+,1-4', WearsArmor: 'N',
            SpecialAbility: 'Bubbly: Free Reroll on Life Support Checks and the largest die in an attack (or a needler hit) pops a limb-bubble instead of dealing damage. Add limb-bubbles to move and hands attribute. Subtract limb-bubbles from Target #. Athletics check of 8 to regrow limb-bubble or when healing regrow one limb bubble in place of a die of hit point healing. Begin play with maximum bubbles (4).'
        },
        {
            Species: 'Canosian', BaseHitPoints: '8', TargetNumber: '8', Hands: '∞', Move: '5', WearsArmor: 'N',
            SpecialAbility: 'Tumble: You get a second move action either before or after your action.'
        },
        {
            Species: 'Diploid', BaseHitPoints: '4', TargetNumber: '8', Hands: '2', Move: '4', WearsArmor: 'Y',
            SpecialAbility: 'Bifurcation: You get two separate phases each phase as if you were two characters with the same body. All active skill check actions in phases (not upgrades, requisitions) are at a -3 penalty.'
        },
        {
            Species: 'Fungaloid', BaseHitPoints: '8', TargetNumber: '9', Hands: '2', Move: '4', WearsArmor: 'N',
            SpecialAbility: 'Regenerate: Recover 2 points at the end of each phase as long as damage isn\'t more than your hit points.'
        },
        {
            Species: 'Human', BaseHitPoints: '5', TargetNumber: '8', Hands: '2', Move: '5', WearsArmor: 'Y',
            SpecialAbility: 'Willpower: You may reroll one or both dice when making a skill check within your profession. You need not decide whether to reroll both before rerolling either.'
        },
        {
            Species: 'Kerbite', BaseHitPoints: '5', TargetNumber: '9', Hands: '5', Move: '6', WearsArmor: 'Y',
            SpecialAbility: 'Cooperative: Once per phase, you get a free Assist action on a friendly as you are moving adjacent to them during your move action.'
        },
        {
            Species: 'Silicoid', BaseHitPoints: '9', TargetNumber: '7', Hands: '1', Move: '4', WearsArmor: 'N',
            SpecialAbility: 'Rocky: Each time you would be dealt damage reduce it by 1d6., Strong: Add +10 Carry and +1 point of damage dealt with melee attacks.'
        },
        {
            Species: 'Tentac', BaseHitPoints: '6', TargetNumber: '9', Hands: '∞', Move: '6', WearsArmor: 'N',
            SpecialAbility: 'Resiliency: Roll an extra die each time you are damaged and remove the highest die.'
        },
        {
            Species: 'Trundlian', BaseHitPoints: '0', TargetNumber: '8', Hands: '7', Move: '2', WearsArmor: 'N',
            SpecialAbility: 'Versatile: You may reroll “1”\'s in your initial skill checks. Add your empty hands to your hit points or move in any combination.'
        },
        {
            Species: 'Vomeg', BaseHitPoints: '7', TargetNumber: '7', Hands: '3', Move: '5', WearsArmor: 'Y',
            SpecialAbility: 'Reach: You may act from any adjacent square as if you were in it.'
        },
        {
            Species: 'Whistler', BaseHitPoints: '9', TargetNumber: '7', Hands: '4', Move: '5', WearsArmor: 'N',
            SpecialAbility: 'Puff: One of your moves in each move action may be a jet move that doesn\'t require a skill check.'
        },
        {
            Species: 'Xeloxian', BaseHitPoints: '5', TargetNumber: '8', Hands: '6', Move: '2', WearsArmor: 'Y',
            SpecialAbility: 'Fistwalk: Add free hands to move value., Aggressive: Add +1 point to direct fire personal attack damage.'
        },
        {
            Species: 'Zoallan', BaseHitPoints: '4', TargetNumber: '9', Hands: '3', Move: '7', WearsArmor: 'N',
            SpecialAbility: 'Carapace: -2 points of damage from all sources.'
        },
        {
            Species: 'ADVANCED SPECIES', BaseHitPoints: '', TargetNumber: '', Hands: '', Move: '', WearsArmor: '',
            SpecialAbility: 'These Species aren\'t necessarily more effective than the others but they are more challenging to play. Beginning players are strongly encouraged to select other species.'
        },
        {
            Species: 'Chronosian (Advanced)', BaseHitPoints: '7', TargetNumber: '8', Hands: '∞', Move: '5', WearsArmor: 'N',
            SpecialAbility: 'Timehop: May choose on phase 1 to jump back in time from phase 6 to phase 1 as a free action in the future. Future self does not move or act on phase one. You must spend the automatic action on phase 6 in the spot you jumped back from to jump back. When you jump back, all damage and states (stun, ionization, etc.) from both selves converge into the remaining self. Each extra or missing piece of equipment causes a die of damage and is annihilated.'
        },
        {
            Species: 'Minutian (Advanced)', BaseHitPoints: '2', TargetNumber: '11', Hands: '∞*', Move: '6', WearsArmor: 'N',
            SpecialAbility: 'Alien Ability: Tiny: Divide carry by 2. You don\'t slag squares you occupy and occupied squares aren\'t slagged for you (jetpack restrictions still apply). You are not entitled to take free attacks on things entering your square., Featherweight: Suffer ½  damage (round down). Convert the rest into movement you must spend immediately. You may not enter a square you have already been in with this movement. If forced to do so, it becomes damage. Getting moved through occupied squares subjects you to free attacks.'
        },
        {
            Species: 'Pyreltian (Advanced)', BaseHitPoints: '6', TargetNumber: '8', Hands: '2', Move: '5', WearsArmor: 'N',
            SpecialAbility: 'Phasing: In phase 1 you always exist as normal. On other phases roll a die (luckable) when it would be your turn to act. If the dieroll is less than the phase number you are “in phase” and get a number of actions equal to the dieroll. If the dieroll is equal to or greater than the phase number, you phase out and cannot act or be acted upon until you phase in.'
        },
        {
            Species: 'Whaloid (Advanced)', BaseHitPoints: '13', TargetNumber: '3', Hands: '1', Move: '0', WearsArmor: 'N',
            SpecialAbility: 'Immense: You occupy each square of the module you are in (slagging them for others). You cannot leave the module except at a specially equipped starbase. You can reach into the first square of each adjacent module. You cannot grapple or be grappled but you can as an action pick up an unresisting character and deposit them in any square in your module or adjacent to the first square of adjacent modules. You may ignore 2 OOC. You suffer half damage from all sources (round up).'
        },
        {
            Species: '(Beastmen)', BaseHitPoints: '?', TargetNumber: '?', Hands: '?', Move: '?', WearsArmor: '?',
            SpecialAbility: 'Varies'
        },
        {
            Species: 'Avianoid', BaseHitPoints: '3', TargetNumber: '9', Hands: '2', Move: '4', WearsArmor: 'N',
            SpecialAbility: 'Wings: Ignore OOC for movement purposes  May move a number of their moves as automatically successful Jet moves equal to your Athletics. See Jet moves page xxx.'
        },
        {
            Species: 'Cheetahoid', BaseHitPoints: '4', TargetNumber: '8', Hands: '2', Move: '9', WearsArmor: 'Y',
            SpecialAbility: 'Sprint: Once per phase may suffer 1die of damage to take an additional action during your turn at a penalty equal to the damage roll (including movement). Bite: Your unarmed attack deals1d6 damage'
        },
        {
            Species: 'Crocodilian', BaseHitPoints: '5', TargetNumber: '7', Hands: '2', Move: '5', WearsArmor: 'N',
            SpecialAbility: 'Patient: (see Patient special ability page xxx) Bite: Your unarmed attack deals1d6 damage Thick Hide: 1 point natural armor'
        },
        {
            Species: 'Elephantoid', BaseHitPoints: '9', TargetNumber: '5', Hands: '3', Move: '5', WearsArmor: 'N',
            SpecialAbility: 'Huge: Adjacent squares are considered slagged for other characters. Tusks: Your unarmed attack deals1d6 damage, Thick Hide: 1 point natural armor'
        },
        {
            Species: 'Felinoids aka Meeks', BaseHitPoints: '6', TargetNumber: '8', Hands: '2', Move: '6', WearsArmor: 'Y',
            SpecialAbility: 'Ferocious: May make a free melee attack with claw once per phase. Claws: Your unarmed attack deals1d6 damage'
        },
        {
            Species: 'Gorilloids', BaseHitPoints: '6', TargetNumber: '7', Hands: '4', Move: '3', WearsArmor: 'Y',
            SpecialAbility: 'Fistwalk: Add free hands to move value. Tough: See Tough special ability page xxx.'
        },
        {
            Species: 'Lupinoids, Caninoids', BaseHitPoints: '5', TargetNumber: '8', Hands: '2', Move: '6', WearsArmor: 'Y',
            SpecialAbility: 'Flanker: Add +1 die to melee damage you deal if there is an ally adjacent to your target. Claws: Your unarmed attack deals1d6 damage'
        },
        {
            Species: 'Lapinoid', BaseHitPoints: '3', TargetNumber: '9', Hands: '2', Move: '7', WearsArmor: 'Y',
            SpecialAbility: 'Lucky: You get +3 Luck. Elusive: You may force opponents to reroll one die in personal attack skill checks against you.'
        },
        {
            Species: 'Rhinoceroid', BaseHitPoints: '7', TargetNumber: '6', Hands: '2', Move: '6', WearsArmor: 'N',
            SpecialAbility: 'Charger: See Charger special ability page xxx except may use horn for this attack. Horn: Your unarmed attack deals1d6 damage Thick Hide: 1 point natural armor'
        },
        {
            Species: 'Reptilianoid (Snakoid)', BaseHitPoints: '4', TargetNumber: '8', Hands: '2', Move: '5', WearsArmor: 'N',
            SpecialAbility: 'Bite: Your unarmed attack deals1d6 damage. Poisonous bite: Anyone bit by a snake suffers as if hit by Oucho toxin (page xxx).'
        },
        {
            Species: 'Testudinoid (Turtloid)', BaseHitPoints: '2', TargetNumber: '8', Hands: '2', Move: '4', WearsArmor: 'N',
            SpecialAbility: 'Shell: Reduce all damage by one point per die. Braced: See Braced special ability page xxx.'
        },
        {
            Species: 'Ursinoid', BaseHitPoints: '9', TargetNumber: '7', Hands: '2', Move: '5', WearsArmor: 'N',
            SpecialAbility: 'Death Marcher: See  special ability page xxx. This is already figured into your base hit points. Thick Hide: 1 point natural armor. Claws: Your unarmed attack deals1d6 damage'
        }
    ];

    $scope.speciesSelect = function (index) {
        return $scope.species[index].SpecialAbility;
    };


}]);