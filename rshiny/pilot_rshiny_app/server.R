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

steel_trade_data <- read.csv('../../data/pilot_dashboard_data/Iron_Steel_Trade_data_GCAM6.0.csv',skip=1)

# Define server logic required to plot the GCAM data
server <- function(input, output) {

    output$brandBar <- renderPlot({
        renderPlot
        
        # steel_trade_data <- read.csv('../../data/pilot_dashboard_data/Iron_Steel_Trade_data_GCAM6.0.csv',skip=1)

        # Filter data down based on user inputs:
        steel_trade_data %>%
            filter(year == input$year,
                   metric == input$metric) -> steel_trade_data

        
        # Error message for when user has filtered out all data                   
        # validate (
        #     need(nrow(steel_trade_data$value) > 0, "No value found. Please make another selection.")
        # )
        # 
        # Bar chart of GCAM steel trade data
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
    )}

