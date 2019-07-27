#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Jul 26 20:10:02 2019

@author: lazywiz
"""
import csv

file = '/Users/lazywiz/code/D3DataVizProject/udemy-d3/Proj/World_bank_country_Data.csv'
op_file = '/Users/lazywiz/code/D3DataVizProject/udemy-d3/Proj/World_bank_country_Data_normalized.json'
#file = '/Users/lazywiz/code/D3DataVizProject/udemy-d3/Proj/data.csv'
#op_file = '/Users/lazywiz/code/D3DataVizProject/udemy-d3/Proj/data_small.json'


country_continent_dict = {"AFG":"Asia",
"ALB":"Europe",
"ATA":"Antarctica",
"DZA":"Africa",
"ASM":"Oceania",
"AND":"Europe",
"AGO":"Africa",
"ATG":"North America",
"AZE":"Europe",
"AZE":"Asia",
"ARG":"South America",
"AUS":"Oceania",
"AUT":"Europe",
"BHS":"North America",
"BHR":"Asia",
"BGD":"Asia",
"ARM":"Europe",
"ARM":"Asia",
"BRB":"North America",
"BEL":"Europe",
"BMU":"North America",
"BTN":"Asia",
"BOL":"South America",
"BIH":"Europe",
"BWA":"Africa",
"BVT":"Antarctica",
"BRA":"South America",
"BLZ":"North America",
"CHI":"North America",
"XKX":"Europe", 
"IOT":"Asia",
"SLB":"Oceania",
"VGB":"North America",
"BRN":"Asia",
"BGR":"Europe",
"MMR":"Asia",
"BDI":"Africa",
"BLR":"Europe",
"KHM":"Asia",
"CMR":"Africa",
"CAN":"North America",
"CPV":"Africa",
"CYM":"North America",
"CAF":"Africa",
"LKA":"Asia",
"TCD":"Africa",
"CHL":"South America",
"CHN":"Asia",
"TWN":"Asia",
"CXR":"Asia",
"CCK":"Asia",
"COL":"South America",
"COM":"Africa",
"MYT":"Africa",
"COG":"Africa",
"COD":"Africa",
"COK":"Oceania",
"CRI":"North America",
"HRV":"Europe",
"CUB":"North America",
"CYP":"Europe",
"CYP":"Asia",
"CZE":"Europe",
"BEN":"Africa",
"DNK":"Europe",
"DMA":"North America",
"DOM":"North America",
"ECU":"South America",
"SLV":"North America",
"GNQ":"Africa",
"ETH":"Africa",
"ERI":"Africa",
"EST":"Europe",
"FRO":"Europe",
"FLK":"South America",
"SGS":"Antarctica",
"FJI":"Oceania",
"FIN":"Europe",
"ALA":"Europe",
"FRA":"Europe",
"GUF":"South America",
"PYF":"Oceania",
"ATF":"Antarctica",
"DJI":"Africa",
"GAB":"Africa",
"GEO":"Europe",
"GEO":"Asia",
"GMB":"Africa",
"PSE":"Asia",
"DEU":"Europe",
"GHA":"Africa",
"GIB":"Europe",
"KIR":"Oceania",
"GRC":"Europe",
"GRL":"North America",
"GRD":"North America",
"GLP":"North America",
"GUM":"Oceania",
"GTM":"North America",
"GIN":"Africa",
"GUY":"South America",
"HTI":"North America",
"HMD":"Antarctica",
"VAT":"Europe",
"HND":"North America",
"HKG":"Asia",
"HUN":"Europe",
"ISL":"Europe",
"IND":"Asia",
"IDN":"Asia",
"IRN":"Asia",
"IRQ":"Asia",
"IRL":"Europe",
"ISR":"Asia",
"ITA":"Europe",
"CIV":"Africa",
"JAM":"North America",
"JPN":"Asia",
"KAZ":"Europe",
"KAZ":"Asia",
"JOR":"Asia",
"KEN":"Africa",
"PRK":"Asia",
"KOR":"Asia",
"KWT":"Asia",
"KGZ":"Asia",
"LAO":"Asia",
"LBN":"Asia",
"LSO":"Africa",
"LVA":"Europe",
"LBR":"Africa",
"LBY":"Africa",
"LIE":"Europe",
"LTU":"Europe",
"LUX":"Europe",
"MAC":"Asia",
"MDG":"Africa",
"MWI":"Africa",
"MYS":"Asia",
"MDV":"Asia",
"MLI":"Africa",
"MLT":"Europe",
"MTQ":"North America",
"MRT":"Africa",
"MUS":"Africa",
"MEX":"North America",
"MCO":"Europe",
"MNG":"Asia",
"MDA":"Europe",
"MNE":"Europe",
"MSR":"North America",
"MAR":"Africa",
"MOZ":"Africa",
"OMN":"Asia",
"NAM":"Africa",
"NRU":"Oceania",
"NPL":"Asia",
"NLD":"Europe",
"ANT":"North America",
"CUW":"North America",
"ABW":"North America",
"SXM":"North America",
"BES":"North America",
"NCL":"Oceania",
"VUT":"Oceania",
"NZL":"Oceania",
"NIC":"North America",
"NER":"Africa",
"NGA":"Africa",
"NIU":"Oceania",
"NFK":"Oceania",
"NOR":"Europe",
"MNP":"Oceania",
"UMI":"Oceania",
"UMI":"North America",
"FSM":"Oceania",
"MHL":"Oceania",
"PLW":"Oceania",
"PAK":"Asia",
"PAN":"North America",
"PNG":"Oceania",
"PRY":"South America",
"PER":"South America",
"PHL":"Asia",
"PCN":"Oceania",
"POL":"Europe",
"PRT":"Europe",
"GNB":"Africa",
"TLS":"Asia",
"PRI":"North America",
"QAT":"Asia",
"REU":"Africa",
"ROU":"Europe",
"RUS":"Europe",
"RUS":"Asia",
"RWA":"Africa",
"BLM":"North America",
"SHN":"Africa",
"KNA":"North America",
"AIA":"North America",
"LCA":"North America",
"MAF":"North America",
"SPM":"North America",
"VCT":"North America",
"SMR":"Europe",
"STP":"Africa",
"SAU":"Asia",
"SEN":"Africa",
"SRB":"Europe",
"SYC":"Africa",
"SLE":"Africa",
"SGP":"Asia",
"SVK":"Europe",
"VNM":"Asia",
"SVN":"Europe",
"SOM":"Africa",
"ZAF":"Africa",
"ZWE":"Africa",
"ESP":"Europe",
"SSD":"Africa",
"ESH":"Africa",
"SDN":"Africa",
"SUR":"South America",
"SJM":"Europe",
"SWZ":"Africa",
"SWE":"Europe",
"CHE":"Europe",
"SYR":"Asia",
"TJK":"Asia",
"THA":"Asia",
"TGO":"Africa",
"TKL":"Oceania",
"TON":"Oceania",
"TTO":"North America",
"ARE":"Asia",
"TUN":"Africa",
"TUR":"Europe",
"TUR":"Asia",
"TKM":"Asia",
"TCA":"North America",
"TUV":"Oceania",
"UGA":"Africa",
"UKR":"Europe",
"MKD":"Europe",
"EGY":"Africa",
"GBR":"Europe",
"GGY":"Europe",
"JEY":"Europe",
"IMN":"Europe",
"TZA":"Africa",
"USA":"North America",
"VIR":"North America",
"BFA":"Africa",
"URY":"South America",
"UZB":"Asia",
"VEN":"South America",
"WLF":"Oceania",
"WSM":"Oceania",
"YEM":"Asia",
"ZMB":"Africa"
}

class CountryData:
    def __init__(self, country_code, name):
        self.country_code = country_code
        self.name = name
        self.gdp = 'null'
        self.population = 'null'
        self.population_male = 'null'
        self.population_female = 'null'
        self.life_exp = 'null'
    
    def __str__(self):
        return  "{" + ','.join(('{} = {}'.format(item, self.__dict__[item]) for item in self.__dict__)) + "}"

of = open(op_file, "w")
#of.write("year, country, country_code, series", "value")

def name_normalization(name):
    if name == "GDP per capita (current US$)":
        return "gdp"
    elif name == "Population, male":
        return "population_male"
    elif name == "Population, female":
        return "population_female"
    elif name == "Life expectancy at birth, total (years)":
        return "life_exp"
    else:
        return name

def normalize_value(value):
    if not value or len(value) == 0:
        return 'null'
    else:
        return value

year_country_map = {}

# Fill map
for year in range(1960, 2019):    
    # Initialize map
    country_map = {}

    with open(file, 'r') as csvfile:
        csvreader = csv.reader(csvfile)
    
        # csvreader.next() also works in Python 2.
        next(csvreader)
    
        for row in csvreader:
            country_map.update( {row[1] : CountryData(row[1], row[0])})
        
    with open(file, 'r') as csvfile:
        csvreader = csv.reader(csvfile)

        # This skips the first row of the CSV file.
        # csvreader.next() also works in Python 2.
        next(csvreader)

        for row in csvreader:
            c = country_map.get(row[1])
            value = normalize_value(row[year - 1960 + 4])
            
            if row[2] == "GDP per capita (current US$)":
                c.gdp = value
            elif row[2] == "Population, male":
                c.population_male = value
            elif row[2] == "Population, female":
                c.population_female = value
            elif row[2] == "Population, total":
                c.population = value
            elif row[2] == "Life expectancy at birth, total (years)":
                c.life_exp = value
            else:
                print("######## ERROR ###### :  " + row[2])
            
            country_map.update( {row[1] : c} )
    year_country_map.update({year : country_map})
    

of.write("[ \n")

for year, country_map in year_country_map.items():
    count = 0
    of.write("\n{ \n\"countries\": [\n")
    for country_code, country_data in country_map.items(): 
        msg = "{ \"country\":\"" + country_data.name + \
            "\", \"country_code\":\"" + country_code + \
            "\", \"continent\":\"" + country_continent_dict[country_code] + \
            "\", \"income\":"  + country_data.gdp + \
            ", \"life_exp\":"  + country_data.life_exp + \
            ", \"population\":"  + country_data.population + \
            ", \"population_male\":" + country_data.population_male + \
            ", \"population_female\":" + country_data.population_female + " }"
 
        if count < 216:
            msg += ",\n"
        else:
            msg += "\n"
        
        
        of.write(msg)
        print(str(year) + ": " + str(count) + ":" +  msg)
        count = count + 1
        
    of.write("], \n \"year\":\"" + str(year) + "\"")
    if year == 2018:
        of.write("}\n")
    else:
        of.write("},\n")

of.write("\n ]")

of.close()
