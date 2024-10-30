export const datasets = [
  {
    dataset: "gcamv7p0",
    scenarios: [
      'GCAM_SSP1',
      'GCAM_SSP2',
      'GCAM_SSP3',
      'GCAM_SSP4',
      'GCAM_SSP5',
      'Reference'
    ],
    params: {
      agProdByCrop: { units: "Agricultural Production by Crop (MT)", group: "agriculture", region: "region", description: "Agricultural production by crop per region in mentric tons."},
      elecByTechTWh: { units: "Electricity Generation by Fuel (TWh)", group: "electricity", region: "region", description: "Electrical generation by fuel per region in terawatt hours"},
      elecCapByFuel: { units: "Electricity Capacity by Fuel (TWh)", group: "electricity", region: "region", description: "Electrical capacity by fuel per region in terawatt hours"},
      emissCO2ByAggSector: { units: "CO2 Emissions by Aggregated Sector (MTCO2)", group: "emissions", region: "region", description: "CO2 emissions by aggregated sectors per region in metric tons of CO2."},
      emissCO2BySector: { units: "CO2 Emissions by Sector (MTCO2)", group: "emissions", region: "region", description: "CO2 emissions by non-aggregated sectors per region in metric tons of CO2." },
      emissGHGByGasGWPAR5: { units: "Greenhouse Gas Emissions by Gas [GWP - AR5] (MTCO2eq)", group: "emissions", region: "region", description: "Greenhouse gas emissions for the AR5 gases in CO2 equivalent metric tons." },
      energyFinalByFuelEJ: { units: "Final Energy by Fuel (EJ)", group: "energy", region: "region", description: "Final energy use by fuel per region in exajoules." },
      energyFinalConsumBySecEJ: { units: "Final Energy Consumption by Sector (EJ)", group: "energy", region: "region", description: "Final energy consumption by sector per region in exajoules." },
      energyFinalSubsecByFuelBuildEJ: { units: "Building Final Energy by Fuel (EJ)", group: "energy", region: "region", description: "Final energy use per fuel for buildings in exajoules." },
      energyFinalSubsecByFuelIndusEJ: { units: "Industry Final Energy by Fuel (EJ)", group: "energy", region: "region", description: "Final energy use per fuel for industry in exajoules." },
      energyFinalSubsecByFuelTranspEJ: { units: "Transportation Final Energy by Fuel (EJ)", group: "energy", region: "region", description: "Final energy use per fuel for transport in exajoules." },
      energyPrimaryByFuelEJ: { units: "Primary Energy Consumption by Fuel (EJ)", group: "energy", region: "region", description: "Primary energy consumption by fuel in exajoules." },
      gdp: { units: "GDP (Million 1990$)", group: "socioeconomic - gdp", region: "region", description: "Total gross domestic product [Market exchange rate] by GCAM region given in units of 1 million 1990 U.S. dollars." },
      landAlloc: { units: "Land Allocation (1000 km2)", group: "land", region: "region", description: "Land allocation by type in 1000 kilometers squared." },
      landIrrCrop: { units: "Irrigated Crop Land (1000 km2)", group: "land", region: "region", description: "Total area of irrigated croplands by region in 1000 kilometers squared." },
      landRfdCrop: { units: "Rainfed Crop Land (1000 km2)", group: "land", region: "region", description: "Total area of rainfed croplands by region in 1000 kilometers squared." },
      livestock_MeatDairybySubsector: { units: "Livestock Production (Mt)", group: "livestock", region: "region", description: "Total livestock production by Region in metric tons." },
      pop: { units: "Population (Million)", group: "socioeconomic - population", region: "region", description: "Total population by GCAM region given in units of 1 million people." },
      tempGlobalMean: { units: "Global Mean T. (Degrees C above 1850 - 1900 avg)", group: "climate", region: "global", description:  "Global mean surface temperature anomaly relative to the 1850 - 1900's mean in degrees celcius." },
      watSupRunoffBasin: { units: "Water Runoff (km3)", group: "water", region: "region", description: "Water runoff by Basin in kilometers cubed." },
      watWithdrawByBasinRunoff: { units: "Water Withdrawals by Basin [Runoff] (km3)", group: "water", region: "glu", description: "Water withdrawals from runoff by GCAM basin in kilometers cubed." },
      watWithdrawByCrop: { units: "Water Withdrawals by Crop (km3)", group: "water", region: "region", description: "Water withdrawals by crop for each GCAM region in kilometers cubed." },
      watWithdrawBySec: { units: "Water Withdrawals by Sector (km3)", group: "water", region: "region", description: "Water withdrawals by sector for each GCAM region in kilometers cubed." },
      watWithdrawROGW: { units: "Water Withdrawals by Water Source [Runoff vs Groundwater] (km3)", group: "water", region: "glu", description: "Water withdrawals by groundwater vs. water withdrawals by runoff in kilometers cubed." }
    },
    defaults: [
      "pop",
      "gdp",
      "agProdByCrop",
      "energyPrimaryByFuelEJ",
      "watWithdrawBySec",
      "emissCO2ByAggSector"
    ]
  }
]