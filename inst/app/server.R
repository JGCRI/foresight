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
library(leaflet)
library(rgdal)
library(tibble)
library(sp)

steel_trade_data <- read.csv('../extdata/Iron_Steel_Trade_data_GCAM6.0.csv',skip=1)
precip_ncdf_data <- nc_open('../extdata/wrfout_d01_2020-01-01_00%3A00%3A00_3hourly.nc')

# Load in the shape file from rmap:
GCAM_Reg32_map <- readOGR(dsn='../extdata/GCAMReg32_shp/shape.shp')

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

    # Set up reactive bins depending on what the input is
    bins <- reactive({
        # Set the bin range for the line plot
        seq(from=min(filtData()$value),to=max(filtData()$value),length.out=10)
    })
    # Set up reactive color palette to change as new data is fed into the model:
    colorPal <- reactive({
        colorBin("plasma",domain=filtData()$value, bins=bins())
    })


    output$steelMap <- renderLeaflet({

        leaflet() %>%
            addProviderTiles(providers$Stamen.Toner) %>%
            addScaleBar() %>%
            addLegend(position='bottomright',
                      pal = colorPal(),
                      values = filtData()$value)%>%
            setView(0,0,zoom=1.5) %>%
            addPolygons(data=GCAM_Reg32_map,
                             weight=1,
                             smoothFactor = 1.0,
                             color='white',
                             fillOpacity=0.8,
                             fillColor=colorPal()(filtData()$value))
    })
}
