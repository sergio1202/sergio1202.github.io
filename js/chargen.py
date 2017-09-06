'''
This is a text based random enemy generator for the board game 
battlestations v2. It was created based on the request by the author in 
the rule book on page 160.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details. 
see <http://www.gnu.org/licenses/>

Author: starchildren
Date: 2017-09-04
''' 
import random

#Globals
# Mission Difficulty Tables
MD0 = {2:(1,2,0), 3:(1,2,0), 4:(1,2,0), 5:(1,2,0), 6:(1,2,0), 7:(1,2,0), 8:(1,2,0), 9:(1,2,0), 10:(1,2,0), 11:(1,2,0), 12:(1,2,0)}
MD1 = {2:(1,2,1), 3:(1,2,1), 4:(1,2,1), 5:(1,3,0), 6:(1,3,0), 7:(1,3,0), 8:(1,3,0), 9:(2,2,0), 10:(2,2,0),11:(2,2,0), 12:(2,2,0)}
MD2 = {2:(1,3,1), 3:(1,2,2), 4:(2,3,1), 5:(1,4,1), 6:(1,3,2), 7:(2,4,1), 8:(2,3,2), 9:(1,4,2), 10:(1,5,1),11:(3,4,1), 12:(2,4,2)}
MD3 = {2:(2,5,1), 3:(2,3,3), 4:(1,5,2), 5:(3,4,2), 6:(1,4,3), 7:(3,5,1), 8:(1,6,1), 9:(2,5,2), 10:(2,4,3),11:(2,6,1), 12:(3,5,2)}
MD4 = {2:(2,4,4), 3:(1,6,3), 4:(1,5,4), 5:(4,6,1), 6:(3,6,2), 7:(3,5,3), 8:(2,6,3), 9:(3,7,1), 10:(3,4,4),11:(2,7,2), 12:(4,6,2)}
MD5 = {2:(4,5,3), 3:(1,7,3), 4:(3,6,3), 5:(4,7,1), 6:(2,5,4), 7:(2,8,1), 8:(2,7,3), 9:(4,6,3), 10:(2,6,4),11:(4,7,2), 12:(2,8,2)}
MD6 = {2:(4,5,4), 3:(3,7,3), 4:(3,6,4), 5:(1,9,1), 6:(3,8,2), 7:(4,8,1), 8:(1,7,4), 9:(2,9,1), 10:(2,8,3),11:(2,7,4), 12:(4,6,4)}
MD7 = {2:(4,8,2), 3:(3,9,1), 4:(2,6,5), 5:(3,7,4), 6:(4,9,1), 7:(4,7,4), 8:(1,7,5), 9:(2,9,3), 10:(4,6,5),11:(3,8,4), 12:(3,7,5)}
MD8 = {2:(1,8,5), 3:(4,7,5), 4:(3,8,5), 5:(2,7,6), 6:(4,9,4), 7:(4,8,5), 8:(2,9,5), 9:(4,7,6), 10:(3,8,6),11:(1,9,6), 12:(3,9,6)}
MD9 = {2:(2,8,7), 3:(4,9,6), 4:(3,8,7), 5:(4,8,7), 6:(2,9,7), 7:(3,8,8), 8:(4,8,8), 9:(5,8,7), 10:(4,9,7),11:(5,8,8), 12:(2,9,8)}
MD10 = {2:(3,9,8), 3:(3,9,9), 4:(4,9,8), 5:(4,9,9), 6:(5,9,7), 7:(5,9,8), 8:(5,9,9), 9:(6,9,6), 10:(6,9,7),11:(6,9,8), 12:(6,9,9)}

# Athletics Tables
ATH1 = {2:["Sonic Beam","Kit","g"],3:["Needler","Kit"],4:["Slug Gun","Kit"],5:["Ion Bore","g"],
6:["Disintegrator","Scope"],7:["Blaster","Kit","g"],8:["Laser", "Kit"],
9:["Nerve Disruptor","Kit"],10:["Particle Gun","Kit"],11:["Voltrex"],12:["Plasma Pistol","gggg"]}

ATH2 = {2:["Knife","Stun","Kit"],3:["Sword","ggg"],4:["Kit","Flyntlock","Flyntlock","EMP grenade"],
5:["VibraKnife","Kit","g"],6:["Phase Pick"],7:["Gun Butt","Kit","g"],8:["Energy Blade","gg"],
9:["Plasma Dagger","Kit"],10:["Arc Laser","ggg"],11:["EMP pistol"],12:["Lightning Rod","Kit"]}

ATH3 = {2:["MedJack","Aggro","Charme","Detox ","Dull","Equilout","FlyBoy","Numb ","Patches ","Roid","Stim","StunGone ","SupSci","TecKnow"],
3:["Skeletal Enhancement","Slug Machine Gun"],4:["Cyberfoot","Pro Chip"],
5:["Cybergyros"],6:["Cyberhand", "Pro Chip"],7:["Autonurse","Pro Chip","gg"],
8:["Athletics Skill Chip", "Combat Skill Chip", "Science Skill Chip", "Engineering Skill Chip", "Piloting Skill Chip", "MagBoots"],
9:["Cyberhook","Pro Chip"],10:["Kit","Pro Chip","Satchel Charge"],11:["Skeletal Enhancement","Plasma Projector"],12:["Gun Butt","Kit"]}

ATH4 = {2:["Kit","Kit"],3:["Kit","Kit"],4:["Kit","Kit"],5:["Kit","Kit"],6:["Kit","Kit"],7:["Kit","Kit"],
8:["Kit","Kit"],9:["Kit","Kit"],10:["Kit","Kit"],11:["Kit","Kit"],12:["Kit","Kit"]}

# Profession Kits
MARINE_KITS = ["Vibraknife","MedKit","JetPack","EVA","WristComp"]
SCI_KITS = ["MedKit","JetPack","ToolKit","EVA","WristComp"]
ENG_KITS = ["ToolKit","JetPack","MedKit","EVA","WristComp"]
PILOT_KITS = ["JetPack",",ToolKit","MedKit","EVA","WristComp"]
GRENADES = ["Frag Grenade", "Energy Grenade", "EMP Grenade", "Stun Grenade", "Fritzer Grenade"]

# Species and stats.
# TODO: Add hard to play species
SPECIES = {1:("Bot",4,8,1,4,False),2:("Blootian",0,7,5,6,False),3:("Canosian",8,8,9999,5,False),4:("Diploid",4,8,2,3,True),
5:("Fungaloid",8,9,2,4,False),6:("Human",5,8,2,5,True),7:("Kerbite",5,9,5,6,True),8:("Silicoid",9,7,1,4,False),
9:("Tentac",6,9,9999,6,False),10:("Trundlian",0,8,7,2,False),11:("Vomeg",7,7,3,5,True),12:("Whistler",9,7,4,5,False),
13:("Xeloxian",5,8,6,2,True),14:("Zoallan",4,9,3,7,False),15:("Avianoid",3,9,2,4,False),16:("Cheetahoid",4,8,2,9,True),
17:("Crocodillian",5,7,2,5,False),18:("Elephantoid",8,5,3,5,False),19:("Felinoids",6,8,2,6,True),20:("Gorilloids",6,7,4,2,True),
21:("Lupinoids",5,8,2,6,True),22:("Lapinoid",3,9,2,7,True),23:("Rhinoceroid",7,6,2,6,False),24:("Reptilianoid",4,8,2,5,False),
25:("Testudinoid",3,8,2,4,False),26:("Ursinoid",8,7,2,5,False)}

# Professions
# TODO: Implement extra professions
CORE_PROFESSIONS = ["Marine", "Scientist", "Engineer", "Pilot"]
EXTRA_PROFESSIONS = ["Athlete", "Diplomat", "Psychic", "Psychiatrist"]


def main():
	print("Welcome to Battlestations Enemy Manager!")
	# Get Mission Difficulty
	MD = input("Enter mission difficulty (MD) (0 - 10): ")
	# error checking
	if MD.isdigit():
		MD=int(MD)
	else:
		print("Enter a number.")
		exit()
	if MD <0 or MD > 10:
		print("Invalid MD. Must be between 0 and 10")
		exit()
	
	# Get number of players, so as to define number of enemies
	num_enemy = input("How many enemy crew (e.g. number of players)? ")
	if num_enemy.isdigit():
		num_enemy=int(num_enemy)
	else:
		print("Enter a number.")
		exit()
	if num_enemy <0:
		print("Are you playing with noone, including yourself? Try a number greater than 0")
		exit()
	if num_enemy >32:
		print("Expecting to have more than twice a Dreadnaught's crew? I can't help you there.")
		exit()
	
	# Select appropriate MD table
	MD_Table = MD0
	if MD==0:
		MD_Table = MD0
	elif MD==1:
		MD_Table = MD1
	elif MD==2:
		MD_Table = MD2
	elif MD==3:
		MD_Table = MD3
	elif MD==4:
		MD_Table = MD4
	elif MD==5:
		MD_Table = MD5
	elif MD==6:
		MD_Table = MD6
	elif MD==7:
		MD_Table = MD7
	elif MD==8:
		MD_Table = MD8
	elif MD==9:
		MD_Table = MD9
	elif MD==10:
		MD_Table = MD10
		
	print("Rolling on MD table...")
	roll = random.randint(1,6) + random.randint(1,6)
	print("Rolled: " + str(roll))
	print("Enemy stats: " + str(MD_Table[roll]))
	
	# Allow specific species selection or randomly select
	species_selection = input("Randomly Select Enemy Species (if 'n', will give list to pick from): " )
	if species_selection == 'n':
		print("Enter the number matching the species you want.")
		for key, value in SPECIES.items():
			print(str(key)+": "+ value[0])
		species_selection = 0
		while species_selection<1 or species_selection>SPECIES.length:
			species_selection = input("Species number: " )
			if species_selection.isdigit():
				species_selection=int(species_selection)
	else: 
		species_selection = random.choice(list(SPECIES.keys()))
	
	# Distribute professions evenly.
	profession_tracker=CORE_PROFESSIONS[:]
	random.shuffle(profession_tracker)
	enemies = []
	for e in range(0,num_enemy):
		if e%4==0:
			random.shuffle(profession_tracker)
		enemies.append(Character(SPECIES[species_selection], MD, profession_tracker[e%4], MD_Table[roll]))

	print('\nGenerating Characters...\n')
	# TODO: Generate bots when larger ships are being used that exceed number of players
	for i in enemies:
		print(i.character_sheet())
		
class Character(object):
	
	# TODO: Handle Blootian limbs. Currently assumes max possible limbs (4)
	blootian_limbs = 4
	
	def __init__(self,species_details, rank, p, s):
		self.species = species_details[0]
		self.hp_base = species_details[1]
		self.target_number = species_details[2]
		self.hands = species_details[3]
		self.move = species_details[4]
		self.can_wear_armor = species_details[5]
		self.rank = rank
		self.current_health=self.hp_base+rank
		self.profession=p
		self.wearing_armor = False
		
		# Set the skills based on profession
		# TODO: Handle non-core professions
		ath = s[0]
		prim = s[1]
		sec = s[2]
		if p=="Marine":
			self.skills=[ath,prim,sec,sec,sec]
		elif p=="Engineer":
			self.skills=[ath,sec,prim,sec,sec]
		elif p=="Pilot":
			self.skills=[ath,sec,sec,prim,sec]
		elif p=="Scientist":
			self.skills=[ath,sec,sec,sec,prim]	
		elif p=="Athlete":
			self.skills=[ath,sec,sec,sec,sec]
		elif p=="Diplomat":
			self.skills=[ath,sec,sec,sec,sec]
		elif p=="Psychic":
			self.skills=[ath,sec,sec,sec,sec]
		elif p=="Psychiatrist":
			self.skills=[ath,sec,sec,sec,sec]
		else:
			self.skills=[ath,sec,sec,sec,sec]
		
		self.carry = ath*10
		
		# Roll for equipment (pg 160 - 161)
		# If enemy can wear armor, add it and reduce athletics by 1 (
		# for purposes of rolling on equip tables)
		if ath>1 and self.can_wear_armor:
			ath=ath-1
			equip=["Armor"]
			self.wearing_armor=True
		else:
			equip=[]
			
		# If enemy has more than 3 hands and 3 athletics 
		# add shield and reduce athletics by 1
		if self.hands>2 and s[0]>2:
			ath=ath-1
			equip.append("Shield")
		
		# Silicoids are special apparently, they get this stuff.
		if self.species=="Silicoid":
			equip.append("Gun Butt")
			equip.append("Jet Pack")
		
		# Roll on the athletics tables tables (page 161)
		for i in range(0,ath):
			roll = random.randint(1,6) + random.randint(1,6)
			if i==0:
				equip = equip + ATH1[roll]
			elif i==1:
				equip = equip + ATH2[roll]
			elif i==2:
				equip = equip + ATH3[roll]
			else:
				equip = equip + ATH4[roll]
		
		# Convert Kits to profession items
		# Convert Pro Chips to profession chips
		k = []
		if self.profession == "Marine":
			k = MARINE_KITS
			if "Pro Chip" in equip:
				equip = self.switch_pro_chip("Combat Skill Chip", equip)
		elif self.profession=="Engineer":
			k = ENG_KITS
			if "Pro Chip" in equip:
				equip = self.switch_pro_chip("Engineering Skill Chip", equip)
		elif self.profession=="Pilot":
			k = PILOT_KITS
			if "Pro Chip" in equip:
				equip = self.switch_pro_chip("Piloting Skill Chip", equip)
		elif self.profession=="Scientist":
			k = SCI_KITS
			if "Pro Chip" in equip:
				equip = self.switch_pro_chip("Science Skill Chip", equip)
		num_kits = equip.count("Kit")
		if num_kits > 0:
			for n in range(0,num_kits):
				if n<3:
					equip[equip.index("Kit")] = k[n]
				elif n==3:
					equip[equip.index("Kit")] = k[n]
					equip.append(k[4])
				else:
					equip=equip + GRENADES
		
		# Convert 'g' to random grenades
		# TODO: Allow user to select grenade type
		if "g" in equip:
			equip[equip.index("g")] = random.choice(GRENADES)
		if "gg" in equip:
			equip[equip.index("gg")] = random.choice(GRENADES)
			equip.append(random.choice(GRENADES))
		if "ggg" in equip:
			equip[equip.index("ggg")] = random.choice(GRENADES)
			equip.append(random.choice(GRENADES))
			equip.append(random.choice(GRENADES))
		if "gggg" in equip:
			equip[equip.index("gggg")] = random.choice(GRENADES)
			equip.append(random.choice(GRENADES))
			equip.append(random.choice(GRENADES))
			equip.append(random.choice(GRENADES))
		
		# Niche case where no MedKit occurs (pg 161)
		if self.profession=="Scientist" and "MedKit" not in equip:
			equip.append("MedKit")
			if "Ion Bore" in equip:
				equip[equip.index("Ion Bore")]="Blaster"
			elif "Disintegrator" in equip:
				equip[equip.index("Disintegrator")]="Blaster"
			elif "Voltrex" in equip:
				equip[equip.index("Voltrex")]="Blaster"
			elif "Plasma Pistol" in equip:
				equip[equip.index("Plasma Pistol")]="Blaster"
				
		self.equipment=equip
	
	# Helper function to switch out Pro Chip
	def switch_pro_chip(self, p,e):
		equip = [p if x=="Pro Chip" else x for x in e]
		return equip
	
	# Print formatting for character sheet
	def character_sheet(self):
		sheet = 'Profession: {}\n'.format(self.profession)
		sheet = sheet+'Species: {}\n'.format(self.species)
		sheet = sheet+'HP: {}\tMove: {}\tHands: {}\tTgt: {}\n'.format(self.current_health,self.move,self.hands,self.target_number)
		sheet = sheet+'Ath: {}\tCom: {}\tEng: {}\tPil: {}\tSci: {}\n'.format(self.skills[0],self.skills[1],self.skills[2],self.skills[3],self.skills[4])
		sheet = sheet+"Equipment: {}\n".format(", ".join(self.equipment))
		return sheet
		
if __name__ == '__main__':
	main()