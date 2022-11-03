# Project helper functions for server ------------------------------------------------
# addMising()

#' Example Function
#'
#' Example
#' @param x x description
#' @param y y description
#' @export
example_add<-function(x,y){
  return(x+y)
}


# checkRegionsMatchSpatialPolygon()

#' Function to check that the elements of a spatial polygon dataframe
#' match with the underlying data
#'
#' checkRegionsMatchSpatialPolygon()
#' @param data_csv data_csv csv file containing the underlying data
#' @param data_shp data_shp GCAM shape file from rmap with the name of
#' GCAM subregions listed under subRegn. If they do not match, this will
#' throw a warning message
#' @export
checkRegionsMatchSpatialPolygon <- function(data_csv,data_shp){
  # Create a vector comparing the regions tabulated between the shape file
  # We will check that the regions in csv file are all elements of the
  # shape file and we will check that all elements of the shape file
  # are elements of the csv file:

  # Test 1: Check that all csv regions are in the shape file
  compareDat_csv <- is.element(data_csv$GCAM_region, data_shp$subRegn)
  # Test 2: Check that all shape file regions are in the csv
  compareDat_shp <- is.element(data_shp$subRegn, data_csv$GCAM_region)

  if(any(compareDat_csv[compareDat_csv == FALSE])) {
    print('There are differences in the regions listed between shp file and csv data')
  } else if(any(compareDat_shp[compareDat_shp == FALSE])) {
    print('There are differences in the regions listed between shp file and csv data')
  } else{
    print('Region matching test passed')
  }

}

