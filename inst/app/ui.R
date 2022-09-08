#' ui

#---------------------------
# Libraries Needed (Also add to DESCRIPTION)
#---------------------------
library(shiny)
library(shinyFiles)
library(shinythemes)
library(leaflet)
library(DT)
library(shinyalert)
library(shinyWidgets)
library(shinyjs)
library(plotly)
library(shinyBS)


#...........................
# Options
#...........................
options(shiny.sanitize.errors = FALSE)

#---------------------------
# ui object
#---------------------------

ui <- function(request) { fluidPage(

  #---------------------------
  # Themes
  #---------------------------

  #shinythemes::themeSelector(),
  #theme = shinythemes::shinytheme("spacelab"),

  #---------------------------
  # CSS/html
  #---------------------------

  useShinyjs(),
  useShinyalert(),

  theme ="styles.css",
  # Hide Shiny Errors
  tags$style(type="text/css",
             ".shiny-output-error { visibility: hidden; }",
             ".shiny-output-error:before { visibility: hidden; }"
  ),

  tags$script("
    Shiny.addCustomMessageHandler('rhm_clic', function(value) {
    Shiny.setInputValue('regionsSelected', value);
    });
  "),

  tags$script("
    Shiny.addCustomMessageHandler('openlink', function(value) {
    window.open(value, '_blank');
    });
  "),
  tags$script("
    Shiny.addCustomMessageHandler('setsetting', function(value) {
    console.log(value);
    Shiny.setInputValue(value[0], value.slice(1,value.length));
    });
  "),

  #---------------------------
  #Dropdown Button
  #---------------------------

  div(id = "preloaded",
      dropdownButton(
        inputId = "Preloadedbutton",
        label="Preloaded",
        circle = FALSE,
        up=FALSE,
        right=TRUE,
        uiOutput('examplesPreloadedInput'),
        status="preloadedButton"
      ),style="float:right;"
  ),


  #---------------------------
  # Side Bar with dropdown
  #---------------------------

  div(id = "Sidebar",
      absolutePanel(class="floatNav",
                    fixed = TRUE,
                    draggable = FALSE,
                    top = 60,
                    left = "auto",
                    right = 15,
                    bottom = "auto",
                    width = 330,
                    height = "auto",
      selectInput(
        inputId = "inputz",
        label = "Input",
        choices = c("url","csv","gcam", ""),
        selected = "",
        multiple = FALSE,
        selectize = TRUE,
        width = "100%"),
      # Reactive Input Choices Based on Input File-------------------------

      # Scenarios
      uiOutput('selectScenarios'),
      # Ref Scenarios
      uiOutput('selectRefScenarios'),
      # Params
      uiOutput('selectParams'),
      # Regions
      uiOutput('selectRegions'),
    )),


    #---------------------------
    # Main Panel
    #---------------------------

  navbarPage(
    title = "ARGUS",
    position = c("fixed-top"),
    collapsible = FALSE,
    fluid = T,

        #---------------------------
        # Main Panel: Home Tab
        #---------------------------
        tabPanel("Focus",
                 div(align="center",
                     bsCollapse(id = "collapse_focus", multiple = FALSE,
                                bsCollapsePanel("Notes", style = "info",
                                                actionButton(style="position:absolute; left:40px",
                                                             inputId='focusstoryboardtoggle',
                                                             label='Edit',
                                                             class = "download-button", icon = icon("edit","fa-1x")),
                                                textOutput("focusstoryboardtexttitle"),
                                                tags$style("#focusstoryboardtexttitle {font-weight: bold; font-size: 30px}"),
                                                verbatimTextOutput("focusstoryboardtext", placeholder = TRUE),
                                                tags$style(type="text/css","#focusstoryboardtext {white-space:pre-wrap;
                                                           text-size:20px; background-color:rgba(0,0,0,0) ; border-color:rgba(0,0,0,0);
                                                                      text-align: left;width;100%;height:10vh;display: 'inline-block'}")

                                ))),
                 fluidRow(column(3,uiOutput('selectFocusMapYear')),
                          column(2,br(),uiOutput('selectFocusMapParam')),
                          column(2,br(),uiOutput('selectFocusMapScenario'))
                          ),
                 fluidRow(
                   column(8,div(class="window",leafletOutput(outputId = "focusMap", height=800))),
                   column(4,
                          plotlyOutput(outputId = "focusChartSum", height=350),
                          plotlyOutput(outputId = "focusChartBar", height=450))
                 )


          ),

        #---------------------------
        # Main Panel: Summary Tab
                  #---------------------------
    tabPanel("Lines",
             div(align="center",
                  tabsetPanel(type="tabs",
                       tabPanel("All",
                                    div(downloadButton(
                                            'downloadPlotSum',NULL,download = "charts_summary.png",
                                            class = "download_button_in"),style="float:right"),
                                br(),
                                div(align="center",
                                    bsCollapse(id = "collapse_lines_all", multiple = FALSE,
                                           bsCollapsePanel("Notes", style = "info",
                                                           actionButton(style="position:absolute; left:40px",
                                                                        inputId='linesallstoryboardtoggle',
                                                                        label='Edit',
                                                                        class = "download-button", icon = icon("edit","fa-1x")),
                                                           textOutput("linesallstoryboardtexttitle"),
                                                           tags$style("#linesallstoryboardtexttitle {font-weight: bold; font-size: 30px}"),
                                                           verbatimTextOutput("linesallstoryboardtext", placeholder = TRUE),
                                                           tags$style(type="text/css","#linesallstoryboardtext {white-space:pre-wrap;
                                                           text-size:20px; background-color:rgba(0,0,0,0) ; border-color:rgba(0,0,0,0);
                                                                      text-align: left;width;100%;height:10vh;display: 'inline-block'}")

                                           ))),
                                    plotOutput(outputId = "summary")),
                       tabPanel("Compare Regions",
                                div(downloadButton('downloadPlotSumReg',NULL,download = "charts_summary_region.png",
                                               class = "download_button_in"),style="float:right"),
                                br(),
                                div(align="center",
                                    bsCollapse(id = "collapse_lines_compare", multiple = FALSE,
                                               bsCollapsePanel("Notes", style = "info",
                                                               actionButton(style="position:absolute; left:40px",
                                                                            inputId='linescomparestoryboardtoggle',
                                                                            label='Edit',
                                                                            class = "download-button", icon = icon("edit","fa-1x")),
                                                               textOutput("linescomparestoryboardtexttitle"),
                                                               tags$style("#linescomparestoryboardtexttitle {font-weight: bold; font-size: 30px}"),
                                                               verbatimTextOutput("linescomparestoryboardtext", placeholder = TRUE),
                                                               tags$style(type="text/css","#linescomparestoryboardtext {white-space:pre-wrap;
                                                           text-size:20px; background-color:rgba(0,0,0,0) ; border-color:rgba(0,0,0,0);
                                                                      text-align: left;width;100%;height:10vh;display: 'inline-block'}")

                                               ))),
                                div(actionButton("button_subset_regions", "Choose Regions to Compare",class = "update_button"),
                                             align="left"),
                                plotOutput(outputId = "summaryReg"))
                  )
                 )
             ),
                  #---------------------------
                  # Main Panel: Charts
                  #---------------------------
                  tabPanel("Charts",
                           div(align="center",
                                tabsetPanel(type = "tabs",
                                      tabPanel("Absolute Value",
                                               div(downloadButton('downloadPlotChart',NULL,download = "charts_bar.png",  class = "download_button_in"),
                                                   style = "float: right"),
                                               br(),
                                               div(align="center",
                                                   bsCollapse(id = "collapse_charts_abs", multiple = FALSE,
                                                              bsCollapsePanel("Notes", style = "info",
                                                                              actionButton(style="position:absolute; left:40px",
                                                                                           inputId='chartsabsstoryboardtoggle',
                                                                                           label='Edit',
                                                                                           class = "download-button", icon = icon("edit","fa-1x")),
                                                                              textOutput("chartsabsstoryboardtexttitle"),
                                                                              tags$style("#chartsabsstoryboardtexttitle {font-weight: bold; font-size: 30px}"),
                                                                              verbatimTextOutput("chartsabsstoryboardtext", placeholder = TRUE),
                                                                              tags$style(type="text/css","#chartsabsstoryboardtext {white-space:pre-wrap;
                                                           text-size:20px; background-color:rgba(0,0,0,0) ; border-color:rgba(0,0,0,0);
                                                                      text-align: left;width;100%;height:10vh;display: 'inline-block'}")

                                                              ))),
                                               fluidRow(
                                                 column(10),
                                                 column(1,
                                                        div(
                                                          style="float:right")),
                                                 # column(1, div(downloadButton('downloadPlotChart',NULL,download = "barCharts.png",  class = "download_button"),
                                                 #               style = "float: right"))
                                                 ),
                                               div(class="charts",plotOutput(outputId = "plotAbs", width = "100%", height="100%"), style = "margin-right: 20px;margin-left: 20px;")
                                      ),
                                      tabPanel("Absolute Difference",
                                               div(downloadButton('downloadChartDiffAbs',NULL,download = "charts_bar_diff_absolute.png",  class = "download_button_in"),
                                                   style = "float: right"),
                                               br(),
                                               div(align="center",
                                                   bsCollapse(id = "collapse_charts_diffabs", multiple = FALSE,
                                                              bsCollapsePanel("Notes", style = "info",
                                                                              actionButton(style="position:absolute; left:40px",
                                                                                           inputId='chartsdiffabsstoryboardtoggle',
                                                                                           label='Edit',
                                                                                           class = "download-button", icon = icon("edit","fa-1x")),
                                                                              textOutput("chartsdiffabsstoryboardtexttitle"),
                                                                              tags$style("#chartsdiffabsstoryboardtexttitle {font-weight: bold; font-size: 30px}"),
                                                                              verbatimTextOutput("chartsdiffabsstoryboardtext", placeholder = TRUE),
                                                                              tags$style(type="text/css","#chartsdiffabsstoryboardtext {white-space:pre-wrap;
                                                           text-size:20px; background-color:rgba(0,0,0,0) ; border-color:rgba(0,0,0,0);
                                                                      text-align: left;width;100%;height:10vh;display: 'inline-block'}")

                                                              ))),
                                               div(class="charts",plotOutput(outputId = "plotDiff", width = "100%", height="100%"), style = "margin-right: 20px;margin-left: 20px;")
                                      ),
                                      tabPanel("Percent Difference",
                                               div(downloadButton('downloadChartDiffPrcnt',NULL,download = "charts_bar_diff_percent.png",  class = "download_button_in"),
                                                   style = "float: right"),
                                               br(),
                                               div(align="center",
                                                   bsCollapse(id = "collapse_charts_diffprcnt", multiple = FALSE,
                                                              bsCollapsePanel("Notes", style = "info",
                                                                              actionButton(style="position:absolute; left:40px",
                                                                                           inputId='chartsdiffprcntstoryboardtoggle',
                                                                                           label='Edit',
                                                                                           class = "download-button", icon = icon("edit","fa-1x")),
                                                                              textOutput("chartsdiffprcntstoryboardtexttitle"),
                                                                              tags$style("#chartsdiffprcntstoryboardtexttitle {font-weight: bold; font-size: 30px}"),
                                                                              verbatimTextOutput("chartsdiffprcntstoryboardtext", placeholder = TRUE),
                                                                              tags$style(type="text/css","#chartsdiffprcntstoryboardtext {white-space:pre-wrap;
                                                           text-size:20px; background-color:rgba(0,0,0,0) ; border-color:rgba(0,0,0,0);
                                                                      text-align: left;width;100%;height:10vh;display: 'inline-block'}")

                                                              ))),
                                               div(class="charts",plotOutput(outputId = "plotPerc", width = "100%", height="100%"), style = "margin-right: 20px;margin-left: 20px;")
                                      )
                                )
                           )
                  ),
                  #---------------------------
                  # Main Panel: Maps Tab
                  #---------------------------
                  tabPanel("Maps",
                           fluidRow(column(6, div(uiOutput('selectMapYear')), style = "float: left"),
                                    column(4,
                                           div(
                                             br(),
                                             pickerInput(
                                               inputId = "legendType",
                                               label = "Legend Type",
                                               choices = c("kmean", "pretty"),
                                               selected = "kmean",
                                               multiple = F
                                             )
                                           )),
                                    column(1,)),
                           div(align="center",
                               tabsetPanel(type="tabs",
                                           tabPanel("Absolute Value",
                                                    div(downloadButton('downloadMap',NULL,download = "maps.png",class = "download_button_in"),style="float:right"),
                                                    br(),
                                                    div(align="center",
                                                        bsCollapse(id = "collapse_maps_abs", multiple = FALSE,
                                                                   bsCollapsePanel("Notes", style = "info",
                                                                                   actionButton(style="position:absolute; left:40px",
                                                                                                inputId='mapsabsstoryboardtoggle',
                                                                                                label='Edit',
                                                                                                class = "download-button", icon = icon("edit","fa-1x")),
                                                                                   textOutput("mapsabsstoryboardtexttitle"),
                                                                                   tags$style("#mapsabsstoryboardtexttitle {font-weight: bold; font-size: 30px}"),
                                                                                   verbatimTextOutput("mapsabsstoryboardtext", placeholder = TRUE),
                                                                                   tags$style(type="text/css","#mapsabsstoryboardtext {white-space:pre-wrap;
                                                           text-size:20px; background-color:rgba(0,0,0,0) ; border-color:rgba(0,0,0,0);
                                                                      text-align: left;width;100%;height:10vh;display: 'inline-block'}")

                                                                   ))),
                                                    div(class="charts",
                                                        plotOutput(outputId = "mapAbs", width = "100%", height="100%"),
                                                        style = "margin-right: 20px;margin-left: 20px;")
                                                    ),
                                           tabPanel("Absolute Difference",
                                                    div(downloadButton('downloadMapDiffAbs',NULL,download = "maps_diff_absolute.png", class = "download_button_in"),style="float:right"),
                                                    br(),
                                                    div(align="center",
                                                        bsCollapse(id = "collapse_maps_diffabs", multiple = FALSE,
                                                                   bsCollapsePanel("Notes", style = "info",
                                                                                   actionButton(style="position:absolute; left:40px",
                                                                                                inputId='mapsdiffabsstoryboardtoggle',
                                                                                                label='Edit',
                                                                                                class = "download-button", icon = icon("edit","fa-1x")),
                                                                                   textOutput("mapsdiffabsstoryboardtexttitle"),
                                                                                   tags$style("#mapsdiffabsstoryboardtexttitle {font-weight: bold; font-size: 30px}"),
                                                                                   verbatimTextOutput("mapsdiffabsstoryboardtext", placeholder = TRUE),
                                                                                   tags$style(type="text/css","#mapsdiffabsstoryboardtext {white-space:pre-wrap;
                                                           text-size:20px; background-color:rgba(0,0,0,0) ; border-color:rgba(0,0,0,0);
                                                                      text-align: left;width;100%;height:10vh;display: 'inline-block'}")

                                                                   ))),
                                                    div(class="charts",
                                                        plotOutput(outputId = "mapDiffAbs", width = "100%", height="100%"),
                                                        style = "margin-right: 20px;margin-left: 20px;")
                                                    ),
                                          tabPanel("Percent Difference",
                                                   div(downloadButton('downloadMapDiffPrcnt',NULL,download = "maps_diff_percent.png",class = "download_button_in"),style="float:right"),
                                                   br(),
                                                   div(align="center",
                                                       bsCollapse(id = "collapse_maps_diffprcnt", multiple = FALSE,
                                                                  bsCollapsePanel("Notes", style = "info",
                                                                                  actionButton(style="position:absolute; left:40px",
                                                                                               inputId='mapsdiffprcntstoryboardtoggle',
                                                                                               label='Edit',
                                                                                               class = "download-button", icon = icon("edit","fa-1x")),
                                                                                  textOutput("mapsdiffprcntstoryboardtexttitle"),
                                                                                  tags$style("#mapsdiffprcntstoryboardtexttitle {font-weight: bold; font-size: 30px}"),
                                                                                  verbatimTextOutput("mapsdiffprcntstoryboardtext", placeholder = TRUE),
                                                                                  tags$style(type="text/css","#mapsdiffprcntstoryboardtext {white-space:pre-wrap;
                                                           text-size:20px; background-color:rgba(0,0,0,0) ; border-color:rgba(0,0,0,0);
                                                                      text-align: left;width;100%;height:10vh;display: 'inline-block'}")

                                                                  ))),
                                                   div(class="charts",
                                                       plotOutput(outputId = "mapDiffPrcnt", width = "100%", height="100%"),
                                                       style = "margin-right: 20px;margin-left: 20px;")
                                                   )
                                          )
                               )
                           ),
                  #---------------------------
                  # Main Panel: Table Tab
                  #---------------------------
                  tabPanel(
                    "Table",
                    div(downloadButton('downloadTable', NULL, download = "table.csv", class="download_button"),
                        style = "float: right; margin-top: -6.5px"),
                    # br(),
                    div(align="center",
                        bsCollapse(id = "collapse_table", multiple = FALSE,
                                   bsCollapsePanel("Notes", style = "info",
                                                   actionButton(style="position:absolute; left:40px",
                                                                inputId='tablestoryboardtoggle',
                                                                label='Edit',
                                                                class = "download-button", icon = icon("edit","fa-1x")),
                                                   textOutput("tablestoryboardtexttitle"),
                                                   tags$style("#tablestoryboardtexttitle {font-weight: bold; font-size: 30px}"),
                                                   verbatimTextOutput("tablestoryboardtext", placeholder = TRUE),
                                                   tags$style(type="text/css","#tablestoryboardtext {white-space:pre-wrap;
                                                           text-size:20px; background-color:rgba(0,0,0,0) ; border-color:rgba(0,0,0,0);
                                                                      text-align: left;width;100%;height:10vh;display: 'inline-block'}")

                                   ))),
                    div(class="charts", DTOutput(outputId = "table"))
                  ),

    #---------------------------
    # NavBar buttons
    #---------------------------

    div(actionButton(inputId="toggleSidebar", label="Inputs", icon = icon("caret-up","fa-1x"),class = "download_button_input")),
    div(downloadButton('downloadAll', "All", download = "all.zip", class = "download_button")),
    div(actionLink(inputId='github', label='',class = "icon", icon = icon("github","fa-1x"),onclick ="window.open('https://github.com/JGCRI/argus', '_blank')")),
    div(actionLink(inputId='help', label='', class = "icon",icon = icon("question","fa-1x"),onclick ="window.open('https://jgcri.github.io/argus/', '_blank')")),
    div(actionLink(inputId='loadbookmark', label='', class = "icon", icon = icon("bookmark","fa-1x"))),
    tags$script(HTML("var header = $('.navbar> .container-fluid');
                   header.append($('#toggleSidebar'));
                   header.append($('#downloadAll'));
                   header.append($('#preloaded'));
                   header.append($('#help'));
                   header.append($('#github'));
                   header.append($('#loadsetting'));
                   header.append($('#loadbookmark'));
                   console.log(header)"))
  )

)

}
