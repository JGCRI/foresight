#' saveDataFiles.R

#---------------------------
# Libraries Needed
#---------------------------
library(data.table)
library(usethis)
library(broom)
library(dplyr)

#---------------------------
# Example gcam data table
#---------------------------
exampleData <- data.table::fread(paste(getwd(),"/inst/exampleData/exampleGCAM5p3SSP235.csv",sep=""),skip=0,encoding="Latin-1")%>%tibble::as_tibble()
usethis::use_data(exampleData, overwrite=T)
