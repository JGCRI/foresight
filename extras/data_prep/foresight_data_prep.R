# Load Libraries
library(dplyr); library(data.table); library(gcamextractor); library(rgcam);

print(sessionInfo());

# Variables
dataset_i = "gcamv7p0_ref"
starting_n = 1
params <- gcamextractor::params; params # List of params in gcamextractor
paramsSelect_i = c("emissCO2BySector", "agProdByCrop", "landAlloc", "watWithdrawBySec", "pop", "elecFinalByFuelTWh")

rgcam::localDBConn("C:/GCAM/database_basexdb", "ref")

# GCAM 7.0
data <- readgcam(gcamdatabase = "C:/GCAM/database_basexdb/ref",
                 dataProjFile = "dataProj.proj",
                 reReadData = F,
                 folder = "C:/GCAM/extracted/gcamv7p0_ref",
                 paramsSelect = paramsSelect_i,
                 saveData = F)

dataAggClass1 <- data$dataAggClass1
dataAggParam <- data$dataAggClass1
dataAggClass1$param %>% unique() %>% sort()
dataAggClass1$scenario %>% unique() %>% sort()
dataAggParam$param %>% unique() %>% sort()
dataAggParam$scenario %>% unique() %>% sort()


# Foresight Table 1: gcamDataTable_aggClass1_regions (Dashboard: Top 10 Country Plot)
gcamDataTable_aggClass1_regions <- dataAggClass1 %>%
  dplyr::select(-subRegion, -xLabel) %>%
  dplyr::group_by(scenario,region,param,classLabel,class,x,units) %>%
  dplyr::summarize(value=sum(value))%>%
  dplyr::ungroup() %>%
  dplyr::mutate(id=starting_n:n(), dataset=dataset_i)%>%
  dplyr::select(id,param,scenario,dataset,region,classLabel,class,x,units,value); gcamDataTable_aggClass1_regions

data.table::fwrite(gcamDataTable_aggClass1_regions,"gcamDataTable_aggClass1_regions.csv")

# Foresight Table 2: gcamDataTable_aggParam_regions (Dashboard: Map by param)
gcamDataTable_aggParam_regions <- dataAggParam %>%
  dplyr::select(-subRegion, -xLabel) %>%
  dplyr::group_by(scenario,region,param,x, units) %>%
  dplyr::summarize(value=sum(value))%>%
  dplyr::ungroup() %>%
  dplyr::mutate(id=starting_n:n(), dataset=dataset_i)%>%
  dplyr::select(id,param,scenario,dataset,region,x,units,value); gcamDataTable_aggParam_regions

data.table::fwrite(gcamDataTable_aggParam_regions,"gcamDataTable_aggParam_regions.csv")


# Foresight Table 3: gcamDataTable_aggParam_global (Dashboard: Linechart)
gcamDataTable_aggParam_global <- dataAggParam %>%
  dplyr::select(-subRegion, -xLabel, -region) %>%
  dplyr::group_by(scenario,param,x, units) %>%
  dplyr::summarize(value=sum(value))%>%
  dplyr::ungroup() %>%
  dplyr::mutate(id=starting_n:n(), dataset=dataset_i) %>%
  dplyr::mutate(region="global")%>%
  dplyr::select(id,param,scenario,dataset,region,x,units,value); gcamDataTable_aggParam_global

data.table::fwrite(gcamDataTable_aggParam_global,"gcamDataTable_aggParam_global.csv")


# Foresight Table 4: gcamDataTable_aggClass1_global
gcamDataTable_aggClass1_global <-  gcamDataTable_aggClass1_regions %>%
  dplyr::select(-region, -id) %>%
  dplyr::group_by(scenario,param,classLabel,class,x,units) %>%
  dplyr::summarize(value=sum(value))%>%
  dplyr::ungroup() %>%
  dplyr::mutate(id=starting_n:n(), dataset=dataset_i)%>%
  dplyr::mutate(region="global")%>%
  dplyr::select(id,param,scenario,dataset,region,classLabel,class,x,units,value); gcamDataTable_aggClass1_global

data.table::fwrite(gcamDataTable_aggClass1_global,"gcamDataTable_aggClass1_global.csv")


