#' server
#'
#' This is the server definition of a Shiny web application. You can
# run the application by clicking 'Run App' above..
#'
#' @export run
#'
#' @return Server for application that plots bar chart of  steel imports,
# exports, production, and consumption
#'
#' @examples \dontrun{
#' library(foresight)
#' }
#'
#' @import shiny ggplot2 dplyr tidyr ncdf4 raster rasterVis RColorBrewer shinythemes
#' tibble rgdal sp plotly leaflet

library(shiny)
library(ggplot2)
library(dplyr)
library(tidyr)
library(ncdf4)
library(raster)
library(rasterVis)
library(RColorBrewer)
library(shinythemes)
library(tibble)
library(rgdal)
library(sp)
library(plotly)
library(leaflet)
library(sp)

# Load in the required data files:
steel_trade_data <- read.csv('../extdata/Iron_Steel_Trade_data_GCAM6.0.csv',skip=1) %>%
    # For now, we will not report data from Taiwan, as it is not in the shape file:
    filter(GCAM_region != 'Taiwan')


# Load in the shape file from rmap:
GCAM_Reg32_map <- readOGR(dsn='../extdata/GCAMReg32_shp/shape.shp')

# EU-12 and EU-15 have the wrong type of dash that needs to be corrected here:
GCAM_Reg32_map$subRegn <- gsub('EU_','EU-',GCAM_Reg32_map$subRegn)
# We also need to filter out the NA regions:
GCAM_Reg32_map <- subset(GCAM_Reg32_map, !is.na(subRegn))

# Verify that the data has the same region names between the shape file and the
# dataframe:
checkRegionsMatchSpatialPolygon(steel_trade_data, GCAM_Reg32_map)

# Load in the precipitation data:
precip_ncdf_data <- nc_open('../extdata/wrfout_d01_2020-01-01_00%3A00%3A00_3hourly.nc')


# Extract the coordinates for the precipitation variables:
# Get the directory of the netcdf files:

lat <- precip_ncdf_data$dim$west_east$vals
long <- precip_ncdf_data$dim$south_north$vals
Time <- precip_ncdf_data$dim$Time$vals

# Define server logic required to plot the GCAM data
server <- function(input, output, session) {

    filtData <- reactive({
        steel_trade_data %>%
            filter(year == input$year,
                   metric == input$metric)
    })

    output$brandBar <- renderPlot({
        renderPlot

        ggplot(filtData(), aes(reorder(GCAM_region, value))) +
            geom_bar(aes(weight = value), fill = "tomato3") +
            coord_flip() +
            ggtitle("GCAM Steel Trade Data") +
            ylab("Steel (Mt)") +
            xlab('')+
            theme(plot.title=element_text(hjust=0.5),
                  rect = element_rect(fill='transparent'),
                  panel.background = element_rect(fill='transparent',colour=NA),
                  plot.background = element_rect(fill='transparent', colour = NA))
    },
        height = 600,
        width = 600
    )
    output$PrecipMap <- renderPlot({
        renderPlot
        precip_dat <- ncvar_get(precip_ncdf_data, input$var)
        # Get slice of data from date of interest:
        precip.slice <- precip_dat[,,input$time]
        # Plot as a heat map:
        image(lat, long, precip.slice)
    },
    height=1200,
    width=800
    )

    # Set up code for generating the leaflet map here:
    orderedDat <- reactive({
        filtData()[order(match(filtData()$GCAM_region,GCAM_Reg32_map$subRegn)),]
    })
    # Set up reactive bins depending on what the input is
    bins <- reactive({
        # Set the bin range for the line plot
        # 1 bin will be upt to 2/3 of the max value and then partition the rest
        # into 5 categories:
        lowerBinFrac <- 0.6667
        lowerBinMax <- lowerBinFrac * max(orderedDat()$value)
        c(0,seq(from=lowerBinMax,to=max(orderedDat()$value),length.out=6))
    })
    # Set up reactive color palette to change as new data is fed into the model:
    colorPal <- reactive({
        colorBin("RdYlBu", domain = orderedDat()$value, bins = bins())
    })


    output$steelMap <- renderLeaflet({

        leaflet() %>%
            addProviderTiles(providers$Stamen.Toner) %>%
            addScaleBar() %>%
            addPolygons(data=GCAM_Reg32_map,
                        weight=1,
                        smoothFactor = 0.8,
                        fillOpacity=0.7,
                        fillColor=colorPal()(orderedDat()$value)) %>%
                        # highlight = highlightOptions(
                        #     weight=5,
                        #     color="#666666",
                        #     dashArray = "",
                        #     fillOpacity = 0.7,
                        #     bringToFront = TRUE)) %>%
            addLegend(position='bottomright',
                      pal = colorPal(),
                      values = orderedDat()$value,
                      labFormat = labelFormat(transform = function(x) sort(x, decreasing=TRUE))) %>%
            setView(0,0,zoom=1.5)

    })
}
