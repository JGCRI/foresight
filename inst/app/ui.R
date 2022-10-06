#
# This is the user-interface definition of a Shiny web application. You can
# run the application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)
library(dplyr)
library(tidyr)
library(ncdf4)
library(raster)
library(rasterVis)
library(RColorBrewer)
library(shinythemes)


# Define UI for application that plots bar chart of  steel imports,
# exports, production, and consumptions. These should be ordered in terms
# of value during the plotting:
shinyUI(
  fluidPage(theme = shinytheme('darkly'),
    navbarPage("GCIMS Rshiny Dashboard Integration",
           tabPanel("Test Data (CSV)",
              # Application title
              titlePanel("Pilot Dashboard (GCAM Steel Trade)"),

              # Sidebar with an input box to select a parameter of interest
              fluidRow(
                column(4,
                       h4('Input Parameters'),
                       wellPanel(
                         sliderInput("year","Year", min=1970, max = 2018, 1970, sep = "", step=1,
                                     animate =
                                       animationOptions(interval=200, loop = TRUE)),

                         selectInput("metric","Metric",
                                     c("Production" = "production",
                                       "Exports" = "exports_reval",
                                       "Imports" = "imports_reval",
                                       "Domestic Supply" = "domestic_supply",
                                       "Consumption" = "consumption_reval")),

                       ),
                       plotOutput("brandBar")

                ),
                column(6,
                       leafletOutput("steelMap", width="100%",height="1000px")
                ),
              ),

           ),

           tabPanel("GCAM NetCDF Example (Precipitation)",
              titlePanel("NetCDF Example"),

              # Sidebar Layout that allows the user to select between different precipitation
              # variables:
              sidebarLayout(
                  sidebarPanel(
                      # Slider bar for date:
                      sliderInput("time","Date", min=1, max = 57, 1, sep = "", step = 1),

                      # Select variable for map:
                      selectInput("var","Variable",
                                  c("RAINC",
                                    "RAINNC",
                                    "RAINSH",
                                    "T2")),
                  ),
                  mainPanel(
                      plotOutput("PrecipMap")
                  )
              )

           )
    )
  )
)
