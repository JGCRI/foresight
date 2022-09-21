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


# Define UI for application that plots bar chart of  steel imports,
# exports, production, and consumptions. These should be ordered in terms
# of value during the plotting:
steel_trade_data <- read.csv('../../data/pilot_dashboard_data/Iron_Steel_Trade_data_GCAM6.0.csv',skip=1)

shinyUI(fluidPage(

    # Application title
    titlePanel("GCAM Steel Trade Balances"),

    # Sidebar with an input box to select a parameter of interest
    sidebarLayout(
        sidebarPanel(
            sliderInput("year","Year", min=min(steel_trade_data$year),max = max(steel_trade_data$year),1970, sep = "", step=1,
                        animate =
                            animationOptions(interval=300, loop = TRUE)),

            selectInput("metric","Metric",
                        c("Production" = "production",
                          "Exports" = "exports_reval",
                          "Imports" = "imports_reval",
                          "Domestic Supply" = "domestic_supply",
                          "Consumption" = "consumption_reval")),
            ),

    # Show a plot of the generated distribution
            mainPanel(
            plotOutput("brandBar"),
            ),
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
    )

        ),

    )
)
