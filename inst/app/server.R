#
# This is the server logic of a Shiny web application. You can run the
# application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(ggplot2)
library(plotly)
library(ncdf4)
library(raster)
library(sp)

steel_trade_data <- read.csv('../extdata/Iron_Steel_Trade_data_GCAM6.0.csv',skip=1)
precip_ncdf_data <- nc_open('../../extdata/pilot_dashboard_data/wrfout_d01_2020-01-01_00%3A00%3A00_3hourly.nc')

# Extract the coordinates for the precipitation variables:
# Get the directory of the netcdf files:

lat <- precip_ncdf_data$dim$west_east$vals
long <- precip_ncdf_data$dim$south_north$vals
Time <- precip_ncdf_data$dim$Time$vals

# Define server logic required to plot the GCAM data
server <- function(input, output) {

    output$brandBar <- renderPlot({
        renderPlot

        # Filter data down based on user inputs:
        steel_trade_data %>%
            filter(year == input$year,
                   metric == input$metric) -> steel_trade_data

        ggplot(steel_trade_data, aes(reorder(GCAM_region, value))) +
            geom_bar(aes(weight = value), fill = "tomato3") +
            coord_flip() +
            ggtitle("GCAM Steel Trade Data") +
            ylab("Steel (Mt)") +
            xlab('')+
            theme_bw(base_size = 16)+
            theme(plot.title=element_text(hjust=0.5))
    },
        height = 1000,
        width = 800
    )
    output$PrecipMap <- renderPlot({
        renderPlot
        precip_dat <- ncvar_get(precip_ncdf_data, input$var)
        # Get slice of data from date of interest:
        precip.slice <- precip_dat[,,input$time]
        # Plot as a heat map:
        image(lat, long, precip.slice)
    },
    height=500,
    width=800
)}
