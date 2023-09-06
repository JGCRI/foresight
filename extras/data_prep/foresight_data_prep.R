# Load Libraries
library(dplyr); library(data.table); library(gcamextractor);

# Variables
dataset = "foresight_v1"
starting_n = 1
gcamdatabase_i = "C:/gcam/gcam-v6.0-Windows-Release-Package/output/database_basexdb_ssp235"
gcamdata_folder_i = "C:/gcam/gcam-v6.0-Windows-Release-Package/input/gcamdata"
rgcam::localDBConn("C:/gcam/gcam-v6.0-Windows-Release-Package/output/","database_basexdb_ssp235")
#params <- gcamextractor::params; params # List of params in gcamextractor
paramsSelect_i = c("pop","elecByTechTWh")

# Extract GCAM Data
#.............................
dataGCAM <- readgcam(reReadData = T,
                     gcamdatabase = gcamdatabase_i,
                     gcamdata_folder = gcamdata_folder_i,
                     dataProjFile = paste0(dataset,".proj"),
                     regionsSelect = NULL,
                     paramsSelect = paramsSelect_i,
                     folder = dataset,
                     save=F,
                     removeVintages = T)

dataGCAM$dataAggClass1
dataGCAM$dataAggParam

# Foresight Table 1: gcamDataTable_aggClass1_regions (Dashboard: Top 10 Country Plot)
gcamDataTable_aggClass1_regions <- dataGCAM$dataAggClass1 %>%
  dplyr::select(-subRegion, -xLabel) %>%
  dplyr::group_by(scenario,region,param,classLabel,class,x,units) %>%
  dplyr::summarize(value=sum(value))%>%
  dplyr::ungroup() %>%
  dplyr::mutate(id=starting_n:n(), dataset="foresight_v1")%>%
  dplyr::select(id,scenario,dataset,region,classLabel,class,x,units,value); gcamDataTable_aggClass1_regions

data.table::fwrite(gcamDataTable_aggClass1_regions,"gcamDataTable_aggClass1_regions.csv")

# Foresight Table 2: gcamDataTable_aggParam_regions (Dashboard: Map by param)
gcamDataTable_aggParam_regions <- dataGCAM$dataAggParam %>%
  dplyr::select(-subRegion, -xLabel) %>%
  dplyr::group_by(scenario,region,param,x, units) %>%
  dplyr::summarize(value=sum(value))%>%
  dplyr::ungroup() %>%
  dplyr::mutate(id=starting_n:n(), dataset="foresight_v1")%>%
  dplyr::select(id,scenario,dataset,region,param,x,units,value); gcamDataTable_aggParam_regions

data.table::fwrite(gcamDataTable_aggParam_regions,"gcamDataTable_aggParam_regions.csv")


# Foresight Table 3: gcamDataTable_aggParam_global (Dashboard: Linechart)
gcamDataTable_aggParam_global <- dataGCAM$dataAggParam %>%
  dplyr::select(-subRegion, -xLabel, -region) %>%
  dplyr::group_by(scenario,param,x, units) %>%
  dplyr::summarize(value=sum(value))%>%
  dplyr::ungroup() %>%
  dplyr::mutate(id=starting_n:n(), dataset="foresight_v1")%>%
  dplyr::select(id,scenario,dataset,param,x,units,value); gcamDataTable_aggParam_global

data.table::fwrite(gcamDataTable_aggParam_global,"gcamDataTable_aggParam_global.csv")

# # Foresight Table 4: gcamDataTable_aggClass1_global
# gcamDataTable_aggClass1_global <-  dataGCAM$dataAggClass1 %>%
#   dplyr::select(-subRegion, -xLabel, -region) %>%
#   dplyr::group_by(scenario,param,classLabel,class,x,units) %>%
#   dplyr::summarize(value=sum(value))%>%
#   dplyr::ungroup() %>%
#   dplyr::mutate(id=starting_n:n(), dataset="foresight_v1")%>%
#   dplyr::select(id,scenario,dataset,param,classLabel,class,x,units,value); gcamDataTable_aggClass1_global
#
# data.table::fwrite(gcamDataTable_aggClass1_global,"gcamDataTable_aggClass1_global.csv")


