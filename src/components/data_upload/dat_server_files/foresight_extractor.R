args <- commandArgs(trailingOnly = TRUE)
if (length(args) < 1) {
  stop("Path not provided. Ex: Rscript foresight_extractor.R <path>")
}

# Load Libraries
library(tidyr); library(dplyr); library(data.table); library(rgcam);

load("GWP.rda")
load("capfactors.rda")

gcam_project_path <- args[1]
dataset <- "gcamv7p0"
basin_mappings <- file.path(getwd(), "basinmappings.csv")
data_query <- loadProject(gcam_project_path )

# Constants
ej_to_twh <- 277.7777778

update_basin_names <- function(data, basin_csv) {
  basin_names <- read.csv(basin_csv)
  
  updated_data <- data %>%
    left_join(basin_names, by = c("basin" = "basins")) %>%
    mutate(basin = coalesce(basinname, basin)) %>%
    select(-basinname)
  
  return(updated_data)
}

# Dashboard Queries

# -- Agriculture --
agProdByCrop <- getQuery(data_query, 'ag production by crop type')
agProdByCrop_final <- agProdByCrop %>%
  mutate(    
    param = "agProdByCrop",
    dataset = dataset,
    classLabel = "Crop",
    class = sector,
    units = "Agricultural Production by Crop (MT)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); agProdByCrop_final

# -- Climate --
tempGlobalMean <- getQuery(data_query, 'global mean temperature')
tempGlobalMean_final <- tempGlobalMean %>%
  mutate(
    param = "tempGlobalMean",
    dataset = dataset,
    region = "global",
    classLabel = "Temperature",
    class = "class1",
    units = "Global Mean Temperature (Degrees C)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); tempGlobalMean_final 

# -- Electricity --
elecByTechTWh <- getQuery(data_query, 'elec gen by subsector')
elecByTechTWh_final <- elecByTechTWh %>%
  mutate(    
    param = "elecByTechTWh",
    dataset = dataset,
    classLabel = "Subsector",
    class = subsector,
		value = value * ej_to_twh,
    units = "Electricity Generation by Fuel (TWh)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); elecByTechTWh_final

elecCapByFuel_final <- elecByTechTWh_final %>%
  left_join(capfactors, by = c("class" = "class1")) %>%
	mutate(    
    param = "elecCapByFuel",
		value = value * 1000 / (8760 * as.numeric(cf1971to2100)),
    units = "Electricity Generation with Capacity by Fuel (TWh)"
  ) %>%
	select(param, scenario, dataset, region, classLabel, class, x, units, value, -cf1971to2100); elecCapByFuel_final

# -- Emissions --
emissCO2ByAggSector <- getQuery(data_query, 'CO2 emissions by aggregated sector (excluding resource production)')
emissCO2ByAggSector_final <- emissCO2ByAggSector %>%
  mutate(    
    param = "emissCO2ByAggSector",
    dataset = dataset,
    classLabel = "Sector",
    class = sector,
    units = "CO2 Emissions by Aggregated Sector (MTCO2)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); emissCO2ByAggSector_final

emissCO2BySector <- getQuery(data_query, 'CO2 emissions by sector (excluding resource production)')
emissCO2BySector_final <- emissCO2BySector %>%
  mutate(    
    param = "emissCO2BySector",
    dataset = dataset,
    classLabel = "Sector",
    class = sector,
    units = "CO2 Emissions by Sector (MTCO2)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); emissCO2BySector_final

emissGHGByGasGWPAR5 <- getQuery(data_query, 'NonCO2 emissions by sector');
emissGHGByGasGWPAR5_final <- emissGHGByGasGWPAR5 %>%
	mutate(Units = as.character(Units)) %>%
	mutate(value = case_when(
    Units == "Tg" ~ value * 0.000001,
    Units == "Gg" ~ value * 0.001,
    Units == "MTC" ~ value,
    TRUE ~ value
  )) %>%
  left_join(GWP, by = c("ghg" = "ghg")) %>%
  mutate(
		param = "emissGHGByGasGWPAR5",
		dataset = dataset,
		classLabel = "ghg",
		class = ghg,
		units = "Gas Emissions by CO2 Equivalence [AR5] (MTCO2eq)",
    value = value * GWPAR5
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value, -GWPAR5, -GWPSAR, -GWPAR4, -GTPAR5); emissGHGByGasGWPAR5_final 

# -- Energy --
energyFinalByFuelEJ <- getQuery(data_query, 'final energy consumption by fuel')
energyFinalByFuelEJ_final <- energyFinalByFuelEJ %>%
  mutate(    
    param = "energyFinalByFuelEJ",
    dataset = dataset,
    classLabel = "Input",
    class = input,
    units = "Final Energy by Fuel (EJ)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); energyFinalByFuelEJ_final

energyFinalConsumBySecEJ <- getQuery(data_query, 'total final energy by aggregate sector')
energyFinalConsumBySecEJ_final <- energyFinalConsumBySecEJ%>%
  mutate(    
    param = "energyFinalConsumBySecEJ",
    dataset = dataset,
    classLabel = "Sector",
    class = sector,
    units = "Final Energy Consumption by Sector (EJ)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); energyFinalConsumBySecEJ_final

energyFinalSubsecByFuelBuildEJ <- getQuery(data_query, 'building final energy by fuel')
energyFinalSubsecByFuelBuildEJ_final <- energyFinalSubsecByFuelBuildEJ %>%
  mutate(    
    param = "energyFinalSubsecByFuelBuildEJ",
    dataset = dataset,
    classLabel = "Input",
    class = input,
    units = "Building Final Energy by Fuel (EJ)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); energyFinalSubsecByFuelBuildEJ_final

energyFinalSubsecByFuelIndusEJ <- getQuery(data_query, 'industry final energy by fuel')
energyFinalSubsecByFuelIndusEJ_final <- energyFinalSubsecByFuelIndusEJ %>%
  mutate(    
    param = "energyFinalSubsecByFuelIndusEJ",
    dataset = dataset,
    classLabel = "Input",
    class = input,
    units = "Industry Final Energy by Fuel (EJ)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); energyFinalSubsecByFuelIndusEJ_final

energyFinalSubsecByFuelTranspEJ <- getQuery(data_query, 'transport final energy by fuel')
energyFinalSubsecByFuelTranspEJ_final <- energyFinalSubsecByFuelTranspEJ %>%
  mutate(    
    param = "energyFinalSubsecByFuelTranspEJ",
    dataset = dataset,
    classLabel = "Input",
    class = input,
    units = "Transportation Final Energy by Fuel (EJ)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); energyFinalSubsecByFuelTranspEJ_final

energyPrimaryByFuelEJ <- getQuery(data_query, 'primary energy consumption by region (avg fossil efficiency)')
energyPrimaryByFuelEJ_final <- energyPrimaryByFuelEJ%>%
  mutate(    
    param = "energyPrimaryByFuelEJ",
    dataset = dataset,
    classLabel = "Fuel",
    class = fuel,
    units = "Primary Energy Consumption by Fuel (EJ)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); energyPrimaryByFuelEJ_final


# -- Land --
landAlloc <- getQuery(data_query, 'land allocation by crop')
landAlloc_final <- landAlloc %>%
  mutate(    
    param = "landAlloc",
    dataset = dataset,
    classLabel = "Land type",
    class = landleaf,
	 units = "Land Allocation (1000 km2)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); landAlloc_final

landIrrRfdCrop <- getQuery(data_query, 'land allocation by crop and water source')
landIrrCrop_final <- landIrrRfdCrop %>%
  filter(water == "IRR") %>%
  mutate(    
    param = "landIrrCrop",
    dataset = dataset,
    classLabel = "Crop",
    class = crop,
    units = "Irrigated Crop Land (1000 km2)" 
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); landIrrCrop_final

landRfdCrop_final <- landIrrRfdCrop %>%
  filter(water == "RFD") %>%
  mutate(    
    param = "landRfdCrop",
    dataset = dataset,
    classLabel = "Crop",
    class = crop,
    units = "Rainfed Crop Land (1000 km2)" 
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); landRfdCrop_final

# -- Livestock --
livestock_MeatDairybySubsector <- getQuery(data_query, 'meat and dairy production by type')
livestock_MeatDairybySubsector_final <- livestock_MeatDairybySubsector %>%
  mutate(    
    param = "livestock_MeatDairybySubsector",
    dataset = dataset,
    classLabel = "Sector",
    class = sector,
	 units = "Livestock Production (Mt)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); livestock_MeatDairybySubsector_final

# -- Socioeconomic gdp --
gdp <- getQuery(data_query, 'GDP MER by region')
gdp_final <- gdp %>%
  mutate(    
    param = "gdp",
    dataset = dataset,
    classLabel = "GDP",
    class = "class1",
	 units = "GDP (Million 1990$)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); gdp_final

# -- Socioeconomic population --
pop <- getQuery(data_query, 'population by region')
pop_final <- pop %>%
  mutate(    
    param = "pop",
    dataset = dataset,
    classLabel = "Population",
    class = "class1",
	 units = "Population (Million)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); pop_final

# -- Water --
watSupRunoffBasin <- getQuery(data_query, 'Basin level available runoff')
watSupRunoffBasin_final <- watSupRunoffBasin %>%
  mutate(
    param = "watSupRunoffBasin",
    dataset = dataset,
    classLabel = "Subresource",
    class = subresource,
    units = "Water Runoff (km3)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value) %>%
  group_by(region, param, scenario, dataset, classLabel, class, x, units) %>%
  summarise(
    value = sum(value),
    .groups = 'drop'  # To ungroup after summarizing
  ) %>%
	select(param, scenario, dataset, region, classLabel, class, x, units, value); watSupRunoffBasin_final
 
watWithdrawByCrop <- getQuery(data_query, 'water withdrawals by crop')
watWithdrawByCrop_final <- watWithdrawByCrop %>%
  mutate(    
    param = "watWithdrawByCrop",
    dataset = dataset,
    classLabel = "Sector",
    class = sector,
	 units = "Water Withdrawals by Crop (km3)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); watWithdrawByCrop_final

watWithdrawBySec <- getQuery(data_query, 'water withdrawals by sector')
watWithdrawBySec_final <- watWithdrawBySec %>%
  mutate(    
    param = "watWithdrawBySec",
    dataset = dataset,
    classLabel = "Sector",
    class = sector,
	 units = "Water Withdrawals by Sector (km3)"
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x = year, units, value); watWithdrawBySec_final

watWithdrawROGW <- getQuery(data_query, 'Water withdrawals by water source (runoff vs. groundwater)')
watWithdrawROGW_final <- watWithdrawROGW %>%
  filter(year != 1975) %>%
  mutate(
    param = "watWithdrawROGW",
    dataset = dataset,
    basin = gsub('_water withdrawals', '', `resource`),
    classLabel = "Subresource",
    class = subresource,
    units = "Water Withdrawals by Water Source [Runoff vs Groundwater] (km3)"
  ) %>%
  select(param, scenario, dataset, region, basin, classLabel, class, x = year, units, value)

watWithdrawROGW_final <- update_basin_names(watWithdrawROGW_final, basin_mappings)

watWithdrawROGW_final <- watWithdrawROGW_final %>%
  mutate(
    region = basin
  ) %>%
  select(param, scenario, dataset, region, classLabel, class, x, units, value); watWithdrawROGW_final

dataMerged <- rbind(agProdByCrop_final, tempGlobalMean_final, elecByTechTWh_final, elecCapByFuel_final, emissCO2ByAggSector_final, emissCO2BySector_final, emissGHGByGasGWPAR5_final, energyFinalByFuelEJ_final, energyFinalConsumBySecEJ_final, energyFinalSubsecByFuelBuildEJ_final, energyFinalSubsecByFuelIndusEJ_final, energyFinalSubsecByFuelTranspEJ_final, energyPrimaryByFuelEJ_final, landAlloc_final, landIrrCrop_final, landRfdCrop_final, livestock_MeatDairybySubsector_final, gdp_final, pop_final, watSupRunoffBasin_final, watWithdrawByCrop_final, watWithdrawBySec_final, watWithdrawROGW_final)
dataMerged

# Build Foresight Datasets
gcam_aggClass1_regions <- dataMerged %>%
  mutate(
    id = paste(dataset, scenario, param, sep = "|"),
    sort = paste(x, region, class, sep = "|")
  ) %>%
  select(id, param, scenario, dataset, region, classLabel, class, x, units, value, sort); gcam_aggClass1_regions
fwrite(gcam_aggClass1_regions, paste(getwd(), "/foresight_datatable.csv", sep=""))




