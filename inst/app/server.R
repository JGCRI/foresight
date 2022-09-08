#' server

#...........................
# Libraries Needed
#...........................

library(shiny)
library(ggplot2)
library(dplyr)
library(cowplot)
library(argus)
library(shinyWidgets)
library(tools)
library(zip)
library(leaflet)
library(rgcam)
library(broom)
library(mvbutils)
library(RColorBrewer)
library(grDevices)
library(rmap)
library(plotly)
library(sp)
library(sf)

#...........................
# Options
#...........................

options(shiny.sanitize.errors = FALSE)
options(shiny.maxRequestSize=100*1024^2)
#options(shiny.trace = TRUE)
pal_all <- jgcricolors::jgcricol()$pal_all

#...........................
# Server object
#...........................

server <- function(input, output, session) {

  #toggling on dropdown menus to ensure loading of bookmark data

  toggleDropdownButton("inputx", session = session)

  # NOTE:
  # To collapse code for easy reading place cursor here and enter: ALT+0
  # To Expand code again place cursor here and enter: ALT+SHIFT+O (O not 0)

  #...........................
  # Storyboard
  #...........................

  # Focus story board .......................

  observeEvent(input$focusstoryboardtoggle, {
    print(input$focusstoryboard)
    text = input$focusstoryboard
    title = input$focusstoryboardtitle
    print(text)
    showModal(
      modalDialog(
        size = "s",
        easyClose = TRUE,
        footer = tagList(
          modalButton("Submit")),
        label = "Story Board",
        textInput(inputId="focusstoryboardtitle", label="Title", value = title, width = "100%"),
        textAreaInput(inputId="focusstoryboard",label="Body", value = text, width = "100%", height="50vh", resize="vertical")
      ))
    print(text)
  })

  output$focusstoryboardtext <- renderText({
    input$focusstoryboard
  })

  output$focusstoryboardtexttitle <- renderText({
    input$focusstoryboardtitle
    #    HTML(paste("<b>", input$focusstoryboardtitle, "</b>"))
  })


  # Lines All story board .......................

  observeEvent(input$linesallstoryboardtoggle, {
    print(input$linesallstoryboard)
    text = input$linesallstoryboard
    title = input$linesallstoryboardtitle
    print(text)
    showModal(
      modalDialog(
        size = "s",
        easyClose = TRUE,
        footer = tagList(
          modalButton("Submit")),
        label = "Story Board",
        textInput(inputId="linesallstoryboardtitle", label="Title", value = title, width = "100%"),
        textAreaInput(inputId="linesallstoryboard",label="Body", value = text, width = "100%", height="50vh", resize="vertical")
    ))
    print(text)
  })

  output$linesallstoryboardtext <- renderText({
    input$linesallstoryboard
  })

  output$linesallstoryboardtexttitle <- renderText({
    input$linesallstoryboardtitle
#    HTML(paste("<b>", input$linesallstoryboardtitle, "</b>"))
  })


  # Lines Compare story board .......................

  observeEvent(input$linescomparestoryboardtoggle, {
    text = input$linescomparestoryboard
    title = input$linescomparestoryboardtitle
        showModal(
      modalDialog(
        size = "s",
        easyClose = TRUE,
        footer = tagList(
          modalButton("Submit")),
        label = "Story Board",
        textInput(inputId="linescomparestoryboardtitle", label="Title", value = title, width = "100%"),
        textAreaInput(inputId="linescomparestoryboard",label="Body", value = text, width = "100%", height="50vh", resize="vertical")
      ))
  })

  output$linescomparestoryboardtext <- renderText({
    input$linescomparestoryboard
  })

  output$linescomparestoryboardtexttitle <- renderText({
    input$linescomparestoryboardtitle
  })


  # Charts Abs story board .......................

  observeEvent(input$chartsabsstoryboardtoggle, {
    text = input$chartsabsstoryboard
    title = input$chartsabsstoryboardtitle
    showModal(
      modalDialog(
        size = "s",
        easyClose = TRUE,
        footer = tagList(
          modalButton("Submit")),
        label = "Story Board",
        textInput(inputId="chartsabsstoryboardtitle", label="Title", value = title, width = "100%"),
        textAreaInput(inputId="chartsabsstoryboard",value = text, label="Body", width = "100%", height="50vh", resize="vertical")
      ))
  })

  output$chartsabsstoryboardtext <- renderText({
    input$chartsabsstoryboard
  })

  output$chartsabsstoryboardtexttitle <- renderText({
    input$chartsabsstoryboardtitle
    #HTML(paste("<b>",     input$chartsabsstoryboard, "</b>"))
  })

  # Charts Abs Diff story board .......................

  observeEvent(input$chartsdiffabsstoryboardtoggle, {
    text = input$chartsdiffabsstoryboard
    title = input$chartsdiffabsstoryboardtitle
    showModal(
      modalDialog(
        size = "s",
        easyClose = TRUE,
        footer = tagList(
          modalButton("Submit")),
        textInput(inputId="chartsdiffabsstoryboardtitle", label="Title", value = title, width = "100%"),
        textAreaInput(inputId="chartsdiffabsstoryboard",value = text, label="Story Board", width = "100%", height="50vh", resize="vertical")
      ))
  })

  output$chartsdiffabsstoryboardtext <- renderText({
    input$chartsdiffabsstoryboard
  })

  output$chartsdiffabsstoryboardtexttitle <- renderText({
    input$chartsdiffabsstoryboardtitle
    #HTML(paste("<b>",     input$chartsdiffabsstoryboardtitle, "</b>"))
  })

  # Charts Prcnt Diff story board .......................

  observeEvent(input$chartsdiffprcntstoryboardtoggle, {
    text = input$chartsdiffprcntstoryboard
    title = input$chartsdiffprcntstoryboardtitle
    showModal(
      modalDialog(
        size = "s",
        easyClose = TRUE,
        footer = tagList(
          modalButton("Submit")),
        textInput(inputId="chartsdiffprcntstoryboardtitle", label="Title", value = title, width = "100%"),
        textAreaInput(inputId="chartsdiffprcntstoryboard",value = text, label="Story Board", width = "100%", height="50vh", resize="vertical")
      ))
  })

  output$chartsdiffprcntstoryboardtext <- renderText({
    input$chartsdiffprcntstoryboard
  })

  output$chartsdiffprcntstoryboardtexttitle <- renderText({
    input$chartsdiffprcntstoryboardtitle
    #    HTML(paste("<b>", input$chartsdiffprcntstoryboardtitle, "</b>"))
  })

  # Maps Abs story board .......................

  observeEvent(input$mapsabsstoryboardtoggle, {
    text = input$mapsabsstoryboard
    title = input$mapsabsstoryboardtitle
    showModal(
      modalDialog(
        size = "s",
        easyClose = TRUE,
        footer = tagList(
          modalButton("Submit")),
        textInput(inputId="mapsabsstoryboardtitle", label="Title", value = title, width = "100%"),
        textAreaInput(inputId="mapsabsstoryboard",value = text, label="Story Board", width = "100%", height="50vh", resize="vertical")
      ))
  })

  output$mapsabsstoryboardtext <- renderText({
    input$mapsabsstoryboard
  })

  output$mapsabsstoryboardtexttitle <- renderText({
    input$mapsabsstoryboardtitle
#    HTML(paste("<b>", input$mapsabsstoryboardtitle, "</b>"))
  })


  # Maps Abs Diff story board .......................

  observeEvent(input$mapsdiffabsstoryboardtoggle, {
    text = input$mapsdiffabsstoryboard
    title = input$mapsdiffabsstoryboardtitle
    showModal(
      modalDialog(
        size = "s",
        easyClose = TRUE,
        footer = tagList(
          modalButton("Submit")),
        textInput(inputId="mapsdiffabsstoryboardtitle", label="Title", value = title, width = "100%"),
        textAreaInput(inputId="mapsdiffabsstoryboard",value = text, label="Story Board", width = "100%", height="50vh", resize="vertical")
      ))
  })

  output$mapsdiffabsstoryboardtext <- renderText({
    input$mapsdiffabsstoryboard
  })

  output$mapsdiffabsstoryboardtexttitle <- renderText({
    input$mapsdiffabsstoryboardtitle
    #HTML(paste("<b>",    input$mapsdiffabsstoryboardtitle, "</b>"))
  })

  # Maps Prcnt Diff story board .......................

  observeEvent(input$mapsdiffprcntstoryboardtoggle, {
    text = input$mapsdiffprcntstoryboard
    title = input$mapsdiffprcntstoryboardtitle
    showModal(
      modalDialog(
        size = "s",
        easyClose = TRUE,
        footer = tagList(
          modalButton("Submit")),
        textInput(inputId="mapsdiffprcntstoryboardtitle", label="Title", value = title, width = "100%"),
        textAreaInput(inputId="mapsdiffprcntstoryboard",value = text, label="Story Board", width = "100%", height="50vh", resize="vertical")
      ))
  })

  output$mapsdiffprcntstoryboardtext <- renderText({
    input$mapsdiffprcntstoryboard
  })

  output$mapsdiffprcntstoryboardtexttitle <- renderText({
    input$mapsdiffprcntstoryboardtitle
    #HTML(paste("<b>",input$mapsdiffprcntstoryboardtitle, "</b>"))
  })


  # Table story board

  observeEvent(input$tablestoryboardtoggle, {
    text = input$tablestoryboard
    title = input$tablestoryboardtitle
    showModal(
      modalDialog(
        size = "s",
        easyClose = TRUE,
        footer = tagList(
          modalButton("Submit")),
        textInput(inputId="tablestoryboardtitle", label="Title", value = title, width = "100%"),
        textAreaInput(inputId="tablestoryboard",value = text, label="Story Board", width = "100%", height="50vh", resize="vertical")
      ))
  })

  output$tablestoryboardtext <- renderText({
    input$tablestoryboard
  })

  output$tablestoryboardtexttitle <- renderText({
    input$tablestoryboardtitle
    #HTML(paste("<b>",input$tablestoryboardtitle, "</b>"))
  })



  #...........................
  # Preloaded Data
  #...........................
  if(T){
    preloaded_df <- argus::preloaded_data()
    print(preloaded_df)

    output$examplesPreloadedInput = renderUI({
      selectInput(
        inputId = "examplesPreloaded",
        label = "Select example preloaded",
        choices = c(preloaded_df$name,""),
        selected = "",
        multiple = F
      )
    })


    observeEvent(input$examplesPreloaded, {
      if (input$examplesPreloaded == ""){
        return()
      }
      temp <- tempfile()

      download_link <- (preloaded_df %>%
        dplyr::filter(name == input$examplesPreloaded))$link

      print("...............")
      print(download_link)
      print(input$examplesPreloaded)

      utils::download.file(download_link, temp)
      state <- readRDS(temp)
      rv$data <- state$data
      updateVals(state)
      updatePickerInput(
        inputId = "examplesPreloaded",
        session=session,
        selected = ""
      )
    })
  }


  #...........................
  # Bookmark
  #...........................
  if(T){

    #...........................
    # Bookmark modal
    #...........................

    #Bookmark modal
    observeEvent(input$loadbookmark, {
      showModal(
        modalDialog(
          size = "s",
          easyClose = TRUE,
          footer = NULL,
          fluidRow(column(6,div(
                     downloadButton(
                       'bookmark',
                       "Download Bookmark",
                       class = "download_button"
                     ),
                     style = "float:left;width=100%;margin-bottom:40px"
                   )),
                   column(6,div(
                     actionLink(inputId="._bookmark_",
                                label="URL",
                                class = "btn btn-default shiny-download-link download_button",
                                icon = icon("link","fa-1x")
                     ),
                     style = "float:right;width=100%;margin-bottom:40px"
                   ))
                   ),
          fileInput(
            inputId = "readbookmark",
            label = "Upload Bookmark",
            accept = c(".rds"),
            multiple = TRUE,
            width = "100%"
          ),
          textInput(
            inputId = "readurlrds",
            label = "Read Bookmark from URL",
            width = "100%",
            placeholder =  "https://raw.githubusercontent.com/JGCRI/argus/main/inst/extdata/exampleData.csv"
          )
        )
      )
    })

    #...........................
    # URL Bookmark
    #...........................

    setBookmarkExclude(c("urlfiledata","filedata","filedata","append", "close", "readfilebutton", "readurlbutton",
                         "readgcambutton", "._bookmark_", "loadbookmark"))

    #URL bookmark onbookmark
    onBookmark(function(state) {
      state$values$data <- rv$data
    })

    #URL bookmark onRestore
    onRestored(function(state) {
      removeModal()
    })

    #...........................
    # RDS Bookmark
    #...........................

    #rds bookmark download handler
    output$bookmark <- downloadHandler(
      filename <- "argus_bookmark_data.rds",
      content = function(file){
        state <- isolate(reactiveValuesToList(input))
        state$data <- rv$data
        saveRDS(state, file)
      }
    )

    #rds bookmark url handler
    observeEvent(input$readurlrds, {
      if (input$readurlrds == ""){
        return(0)
      }
      tryCatch({
        temp <- tempfile()
        utils::download.file(input$readurlrds, temp)
        state <- readRDS(temp)
        rv$data <- state$data
        removeModal()
        updateVals(state)
      },finally = {
        return(0)
      })

      }, ignoreInit = TRUE
    )

    #rds bookmark upload handler
    observeEvent(input$readbookmark, {
      removeModal()
      state <- readRDS(input$readbookmark$datapath)
      rv$data <- state$data
      updateVals(state)
    })

    #update input values from rds state
    updateVals <- function(state){
      #focusMapScenarioSelected
      settingfocusMapScenarioSelected <- state$focusMapScenarioSelected
      if(( settingfocusMapScenarioSelected %in% unique(data()$scenario)) && !is.null(settingfocusMapScenarioSelected)){
        updatePickerInput(
          inputId = "focusMapScenarioSelected",
          session=session,
          selected = settingfocusMapScenarioSelected
        )
        session$sendCustomMessage("setsetting", c("focusMapScenarioSelected", settingfocusMapScenarioSelected))
      }

      #focusMapScenarioSelected
      settingfocusMapYearSelected <- state$focusMapYearSelected
      if((settingfocusMapYearSelected %in% dataMapx()$x) && !is.null(settingfocusMapScenarioSelected)){
        updateSliderInput(
          inputId = "focusMapYearSelected",
          session=session,
          min = min(dataMapx()$x),
          max = max(dataMapx()$x),
          value=settingfocusMapYearSelected
        )
        session$sendCustomMessage("setsetting", c("focusMapYearSelected", settingfocusMapYearSelected))
      }

      #focusMapScenarioSelected
      settingfocusMapParamSelected  <- state$focusMapParamSelected
      if(( settingfocusMapParamSelected %in% unique(dataMapx()$param)) && !is.null(settingfocusMapParamSelected)){
        updatePickerInput(
          inputId = "focusMapParamSelected",
          session=session,
          selected = settingfocusMapParamSelected
        )
        session$sendCustomMessage("setsetting", c("focusMapParamSelected", settingfocusMapParamSelected))
      }

        #legendType
        settingsmapLegend <- state$legendType
        if((settingsmapLegend %in% c("kmean","pretty","continuous")) && !is.null(settingsmapLegend)){
          updatePickerInput(
            inputId = "legendType",
            session=session,
            selected = settingsmapLegend
          )
          session$sendCustomMessage("setsetting", c("legendType", settingsmapLegend))
        }

        #mapYear
        settingsmapYear <- state$mapYear
        if(!is.null(settingsmapYear) && (settingsmapYear %in% dataMapx()$x)){
          updateSliderInput(
            inputId = "mapYear",
            session=session,
            min = min(dataMapx()$x),
            max = max(dataMapx()$x),
            value=settingsmapYear
          )
          session$sendCustomMessage("setsetting", c("mapYear", settingsmapYear))
        }

        #subsetRegions
        settingsSubsetRegions <- state$subsetRegions
        if(any(unique(settingsSubsetRegions) %in% unique(data()$subRegion))){
          updatePickerInput(
            inputId = "subsetRegions",
            session=session,
            choices = unique(data()$subRegion),
            selected = state$subsetRegions)
          session$sendCustomMessage("setsetting", c("subsetRegions", settingsSubsetRegions))
        }

        # Regions Update
        settingsRegions <- state$regionsSelected
        if(any(unique(settingsRegions) %in% unique(data()$subRegion))){
          updatePickerInput(
            session=session,
            inputId = "regionsSelected",
            selected = unique(settingsRegions)[unique(settingsRegions) %in% unique(data()$subRegion)],
          )
        }

        # Parameters Update
        settingsParams <- state$paramsSelected
        if(any(unique(settingsParams) %in% unique(data()$param))){
          updatePickerInput(
            session=session,
            inputId = "paramsSelected",
            selected = unique(settingsParams)[unique(settingsParams) %in% unique(data()$param)],
          )
        }

        # Scenario Update
        settingsScenario <- state$scenariosSelected
        if(!any(unique(settingsScenario) %in% unique(data()$scenario))){
        }
        if(any(unique(settingsScenario) %in% unique(data()$scenario))){
          updatePickerInput(
            session=session,
            inputId = "scenariosSelected",
            selected = unique(settingsScenario)[unique(settingsScenario) %in% unique(data()$scenario)],
          )
        }

        # Reference Scenario Update
        settingsRefScenario <- state$scenarioRefSelected
        if(any(unique(settingsRefScenario) %in% unique(data()$scenario))){
          updatePickerInput(
            session=session,
            inputId = "scenarioRefSelected",
            selected = unique(settingsRefScenario)[unique(settingsRefScenario) %in% unique(data()$scenario)],
          )
        }

        # Line story board
        settingslinesallstoryboard <- state$linesallstoryboard
        updateTextAreaInput(
          session=session,
          inputId = "linesallstoryboard",
          value = settingslinesallstoryboard
        )
        session$sendCustomMessage("setsetting", c("linesallstoryboard", settingslinesallstoryboard))

        settingslinesallstoryboardtitle <- state$linesallstoryboardtitle
        updateTextInput(
          session=session,
          inputId = "linesallstoryboardtitle",
          value = settingslinesallstoryboardtitle
        )

        session$sendCustomMessage("setsetting", c("linesallstoryboardtitle", settingslinesallstoryboardtitle))

        # Focus story board
        settingsfocusstoryboard <- state$focusstoryboard
        updateTextAreaInput(
          session=session,
          inputId = "focusstoryboard",
          value = settingsfocusstoryboard
        )
        session$sendCustomMessage("setsetting", c("focusstoryboard", settingsfocusstoryboard))

        settingsfocusstoryboardtitle <- state$focusstoryboardtitle
        updateTextInput(
          session=session,
          inputId = "focusstoryboardtitle",
          value = settingsfocusstoryboardtitle
        )

        session$sendCustomMessage("setsetting", c("focusstoryboardtitle", settingsfocusstoryboardtitle))

        # CompReg story board
        settingslinescomparestoryboard <- state$linescomparestoryboard
        updateTextAreaInput(
          session=session,
          inputId = "linescomparestoryboard",
          value = settingslinescomparestoryboard
        )

        session$sendCustomMessage("setsetting", c("linescomparestoryboard", settingslinescomparestoryboard))

        # Line story board
        settingslinescomparestoryboardtitle <- state$linescomparestoryboardtitle
        updateTextInput(
          session=session,
          inputId = "linescomparestoryboardtitle",
          value = settingslinescomparestoryboardtitle
        )

        session$sendCustomMessage("setsetting", c("linescomparestoryboardtitle", settingslinescomparestoryboardtitle))


        # Line story board
        settingschartsabsstoryboard <- state$chartsabsstoryboard
        updateTextAreaInput(
          session=session,
          inputId = "chartsabsstoryboard",
          value = settingschartsabsstoryboard
        )

        session$sendCustomMessage("setsetting", c("chartsabsstoryboard", settingschartsabsstoryboard))

        # Line story board
        settingschartsabsstoryboardtitle <- state$chartsabsstoryboardtitle
        updateTextInput(
          session=session,
          inputId = "chartsabsstoryboardtitle",
          value = settingschartsabsstoryboardtitle
        )

        session$sendCustomMessage("setsetting", c("chartsabsstoryboardtitle", settingschartsabsstoryboardtitle))
                # Line story board
        settingschartsdiffabsstoryboard<- state$chartsdiffabsstoryboard
        updateTextAreaInput(
          session=session,
          inputId = "chartsdiffabsstoryboard",
          value = settingschartsdiffabsstoryboard
        )

        session$sendCustomMessage("setsetting", c("chartsdiffabsstoryboard", settingschartsdiffabsstoryboard))

        # Line story board
        settingschartsdiffabsstoryboardtitle<- state$chartsdiffabsstoryboardtitle
        updateTextInput(
          session=session,
          inputId = "chartsdiffabsstoryboardtitle",
          value = settingschartsdiffabsstoryboardtitle
        )

        session$sendCustomMessage("setsetting", c("chartsdiffabsstoryboardtitle", settingschartsdiffabsstoryboardtitle))


         settingschartsdiffprcntstoryboard<- state$chartsdiffprcntstoryboard
        updateTextAreaInput(
          session=session,
          inputId = "chartsdiffprcntstoryboard",
          value = settingschartsdiffprcntstoryboard
        )

        session$sendCustomMessage("setsetting", c("chartsdiffprcntstoryboard", settingschartsdiffprcntstoryboard))

        settingschartsdiffprcntstoryboardtitle<- state$chartsdiffprcntstoryboardtitle
        updateTextInput(
          session=session,
          inputId = "chartsdiffprcntstoryboardtitle",
          value = settingschartsdiffprcntstoryboardtitle
        )

        session$sendCustomMessage("setsetting", c("chartsdiffprcntstoryboardtitle", settingschartsdiffprcntstoryboardtitle))

        settingsmapsabsstoryboard<- state$mapsabsstoryboard
        updateTextAreaInput(
          session=session,
          inputId = "mapsabsstoryboard",
          value = settingsmapsabsstoryboard
        )
        session$sendCustomMessage("setsetting", c("mapsabsstoryboard", settingsmapsabsstoryboard))

        settingsmapsabsstoryboardtitle<- state$mapsabsstoryboardtitle
        updateTextInput(
          session=session,
          inputId = "mapsabsstoryboardtitle",
          value = settingsmapsabsstoryboardtitle
        )

        session$sendCustomMessage("setsetting", c("mapsabsstoryboardtitle", settingsmapsabsstoryboardtitle))

        settingsmapsdiffabsstoryboard<- state$mapsdiffabsstoryboard
        updateTextAreaInput(
          session=session,
          inputId = "mapsdiffabsstoryboard",
          value = settingsmapsdiffabsstoryboard
        )

        session$sendCustomMessage("setsetting", c("mapsdiffabsstoryboard", settingsmapsdiffabsstoryboard))

        settingsmapsdiffabsstoryboardtitle<- state$mapsdiffabsstoryboardtitle
        updateTextInput(
          session=session,
          inputId = "mapsdiffabsstoryboardtitle",
          value = settingsmapsdiffabsstoryboardtitle
        )

        session$sendCustomMessage("setsetting", c("mapsdiffabsstoryboardtitle", settingsmapsdiffabsstoryboardtitle))

        settingsmapsdiffprcntstoryboard<- state$mapsdiffprcntstoryboard
        updateTextAreaInput(
          session=session,
          inputId = "mapsdiffprcntstoryboard",
          value =  settingsmapsdiffprcntstoryboard
        )

        session$sendCustomMessage("setsetting", c("mapsdiffprcntstoryboard", settingsmapsdiffprcntstoryboard))

        settingsmapsdiffprcntstoryboardtitle<- state$mapsdiffprcntstoryboardtitle
        updateTextInput(
          session=session,
          inputId = "mapsdiffprcntstoryboardtitle",
          value =  settingsmapsdiffprcntstoryboardtitle
        )

        session$sendCustomMessage("setsetting", c("mapsdiffprcntstoryboardtitle", settingsmapsdiffprcntstoryboardtitle))


        settingstablestoryboard<- state$tablestoryboard
        updateTextAreaInput(
          session=session,
          inputId = "tablestoryboard",
          value =  settingstablestoryboard
        )

        session$sendCustomMessage("setsetting", c("tablestoryboard", settingstablestoryboard))

        settingstablestoryboardtitle<- state$tablestoryboardtitle
        updateTextInput(
          session=session,
          inputId = "tablestoryboardtitle",
          value =  settingstablestoryboardtitle
        )

        session$sendCustomMessage("setsetting", c("tablestoryboardtitle", settingstablestoryboardtitle))

    }



    } # Bookmark


  #...........................
  # Initial Setting
  #...........................

  if(T){ # Initial Settings

  # Initialize Settings
  settings <- reactive({data.frame()})
  settingsVars <- c("urlSelect",
                    "regionsSelect",
                    "scenariosSelect",
                    "scenarioRefSelect",
                    "paramsSelect")

  # Create Modal for Settings Download and Loading
  observeEvent(input$inputz, {
    if (input$inputz == "csv"){
    showModal(
      modalDialog(
        size = "s",
        easyClose = TRUE,
        footer = NULL,
          br(),
          # CSV Data ....................................-
          fileInput(
            inputId = "filedata",
            label = "Upload csv or zip file",
            accept = c(".csv", ".zip"),
            multiple = TRUE,
            width = "100%"
          ),
          br(),
          actionButton(inputId = "readfilebutton",
                       label = "Read File Data")
      ))
    }else if(input$inputz == "url"){
     showModal(
      modalDialog(
        size = "s",
        easyClose = TRUE,
        footer = NULL,
          br(),
          textInput(
            inputId = "urlfiledata",
            label = "Enter url to csv or zip file, seperated by ',' between url",
            placeholder =  "https://raw.githubusercontent.com/JGCRI/argus/main/inst/extdata/exampleData.csv"),
          br(),
          width = "100%",
          br(),
          actionButton(inputId = "readurlbutton",
                       label = "Read Url Data")
    ))
    }else if (input$inputz == "gcam"){
     showModal(
      modalDialog(
        size = "m",
        easyClose = TRUE,
        footer = NULL,
          br(),
          p("*Note: Only for Argus run on local computer.", style="color:#cc0000"),
          tabsetPanel(
            type = "tabs",
            id="gcamtabs",
            tabPanel(
              "gcamdatabase",
              br(),
              shinyDirButton(id = "gcamdir",
                             label = "Choose GCAM directory",
                             title = "Select"),
              br(),
              textInput(
                inputId = "gcamdirfilepath",
                label = NULL,
                placeholder =  "OR Enter path to GCAM directory"),
              br(),
              verbatimTextOutput("gcamdirtext", placeholder = FALSE),
              br(),
              uiOutput('gcamScenarios'),
            ),
            tabPanel(
              ".PROJ",
              br(),
              shinyFilesButton(id = "proj",
                             label = "Choose GCAM .proj file",
                             title = "Select",
                             multiple=F),
              br(),
              textInput(
                inputId = "gcamprojfilepath",
                label = NULL,
                placeholder =  "OR Enter path to GCAM .proj file"),
              br(),
              verbatimTextOutput("gcamprojtext", placeholder = FALSE),
              br(),
              uiOutput('gcamScenariosProj'),
            )
          ),

          br(),
          uiOutput('gcamParams'),
          br(),
          uiOutput('gcamRegions'),
          br(),
          actionButton(inputId = "readgcambutton",
                       label = "Read GCAM Data"),
          br(),
          width = "100%"
        )
      )
      }
      updateSelectInput(session, "inputz", selected = "")
    })

  observeEvent(input$readurlbutton, {
    removeModal()
    #req(input$urlfiledata)
    showModal(
      modalDialog(
        size = "s",
        easyClose = FALSE,
        footer = NULL,
        fluidRow(
          column(6,
                 div(actionLink(
                   inputId='append',
                   label="Append to Input",
                   class = "btn btn-default shiny-download-link download_button"),
                   style = "float:center"
                 ))
          ,
          column(6,
                 div(actionLink(inputId="close",
                                label='Overwrite Input',
                                class = "btn btn-default shiny-download-link download_button"),
                     style="float:right;!important"
                 )
          )
        )
      ))
  })

  observeEvent(input$readfilebutton, {
    removeModal()
    showModal(
      modalDialog(
        size = "s",
        easyClose = FALSE,
        footer = NULL,
        fluidRow(
            column(6,
              div(actionLink(
                  inputId='append',
                  label="Append to Input",
                  class = "btn btn-default shiny-download-link download_button"),
                  style = "float:center"
                ))
        ,
        column(6,
                div(actionLink(inputId="close",
                                label='Overwrite Input',
                                class = "btn btn-default shiny-download-link download_button"),
                                style="float:right;!important"
                 )
          )
        )
    ))
    }, ignoreInit=TRUE)

  observeEvent(input$help,{
    session$sendCustomMessage("handler1", unique(data()$subRegion))
  })

  # Toggle Preloaded
  observeEvent(input$preloaded, {
    shinyjs::toggle(id = "Sidebar")

    if (input$preloaded %% 2 == 1) {
      icon <-  icon("caret-down","fa-1x")
    } else {
      icon <-  icon("caret-up","fa-1x")
    }
    updateActionButton(session,
                       "preloaded",
                       icon = icon)

  })

  # Toggle Sidebar
  observeEvent(input$toggleSidebar, {
    shinyjs::toggle(id = "Sidebar")

    if (input$toggleSidebar %% 2 == 1) {
      icon <-  icon("caret-down","fa-1x")
    } else {
      icon <-  icon("caret-up","fa-1x")
    }
    updateActionButton(session,
                       "toggleSidebar",
                       icon = icon)

  })

  # Load Default Datasets from argus
  dataDefault <- argus::exampleData
  ggplottheme <- ggplot2::theme_bw() +
    ggplot2::theme(strip.background = ggplot2::element_rect(color="black",size=0.1, fill="gray30"),
                   strip.text = ggplot2::element_text(color = "white"))

  } # Initial Setting

  #...........................
  # Reactive Values
  #...........................

  if(T){ # Reactive Values

  # Create your own reactive values that you can modify because input is read only
  rv <- reactiveValues()

  rv$validGcam <- FALSE
  rv$pcount = 1;
  rv$mapflag = 0;
  rv$subRegTypelist = c()
  rv$selectedBase = 0;
  rv$data <- dataDefault %>% dplyr::select(scenario, subRegion, param, aggregate, class, x, value)
  # Charts initializing abs, percDiff, and absDiff
  rv$absChart = 1;
  rv$percDiffChart = 0;
  rv$absDiffChart = 0;

  # Maps initializing abs, percDiff, and absDiff
  rv$absMap = 1;
  rv$percDiffMap = 0;
  rv$absDiffMap = 0;

  } # Reactive values

  #...........................
  # INPUTS
  #...........................

  if(T){ # Read in Inputs

  #...........................
  # GCAM INPUTS
  #...........................

  if(T){ # GCAM Inputs

  roots <- getVolumes()()

  shinyDirChoose(
    input,
    id = 'gcamdir',
    roots = roots,
    filetypes = c('')
  )

  shinyFileChoose(
    input,
    id = 'proj',
    roots = roots,
    filetypes = c('', 'proj')
  )

  #......................................................
  # Creating a reactive environment to choose gcamdatabase
  # Based on folder input or text input
  #......................................................

  rv_gcam <- reactiveValues()
  rv_gcam$gcamdatabasepathx = ""
  rv_gcam$gcamprojpathx = ""

  observeEvent(input$gcamdir,{
    rv_gcam$gcamdatabasepathx <-gsub("\\\\","/",parseDirPath(roots, input$gcamdir))
    rv_gcam$gcamprojpathx <- ""
  })

  observeEvent(input$gcamdirfilepath,{
    rv_gcam$gcamdatabasepathx <-gsub("\\\\","/",input$gcamdirfilepath)
    rv_gcam$gcamprojpathx <- ""
  })

  observeEvent(input$proj,{
    rv_gcam$gcamprojpathx <-gsub("\\\\","/",(parseFilePaths(roots, input$proj))$datapath)
    rv_gcam$gcamdatabasepathx <- ""
  })

  observeEvent(input$gcamprojfilepath,{
    rv_gcam$gcamprojpathx <-gsub("\\\\","/",input$gcamprojfilepath)
    rv_gcam$gcamdatabasepathx <- ""
  })

  output$gcamdirtext <- renderText({
    if(rv_gcam$gcamdatabasepathx != "" & rv$validGCAM){
    paste0("Reading GCAM data from: ", rv_gcam$gcamdatabasepathx)}
    else{
      "Awaiting Valid Input"
    }
  })

  output$gcamprojtext <- renderText({
    if(rv_gcam$gcamprojpathx != "" & rv$validGCAM){
    paste0("Reading GCAM Proj File from: ", rv_gcam$gcamprojpathx)}
    else{
      return("Awaiting Valid Input")
    }
  })

  #.........................................
  # Get names of scenarios in GCAM database
  #.........................................

  gcamScenariosx <- reactive({
      progress <- shiny::Progress$new()
      on.exit(progress$close())
      progress$set(message = "Extracting scenarios from GCAM database", value = 0)
      progress$inc(1/3, detail = paste("Parsing Path", 1))

      gcamdatabasePath_dir <- gsub("/$","",gsub("[^/]+$","",rv_gcam$gcamdatabasepathx)); gcamdatabasePath_dir
      gcamdatabasePath_file <- gsub('.*/ ?(\\w+)', '\\1', rv_gcam$gcamdatabasepathx); gcamdatabasePath_file
      # Save Message from rgcam::localDBConn to a text file and then extract names
      x <- utils::capture.output(rgcam::localDBConn(gcamdatabasePath_dir,gcamdatabasePath_file), type="message")
      x <- gsub(", ",",",gsub(": ","",gsub("Database scenarios:  ","",x)));x
      gcam_scenarios_extracted <- as.vector(unlist(strsplit(gsub("Database scenarios: ","",x),",")))
      if (!is.null(gcam_scenarios_extracted)){
        rv$validGCAM <- TRUE
      }else{
        rv$validGCAM <- FALSE
      }
      return(gcam_scenarios_extracted)
  })

  gcamScenariosxProj <- reactive({
    progress <- shiny::Progress$new()
    on.exit(progress$close())
    progress$set(message = "Extracting scenarios from GCAM database", value = 0)
    progress$inc(1/2, detail = paste("Loading project...", 1))
    scens <- (names(rgcam::loadProject(rv_gcam$gcamprojpathx)))
    if (!is.null(scens)){
      rv$validGCAM <- TRUE
    }else{
      rv$validGCAM <- FALSE
    }
    progress$inc(1/2, detail = paste("Completed", 1))
    return(scens)
  })

  output$gcamScenarios = renderUI({
    pickerInput(
        inputId = "gcamScenariosSelected",
        label = "Select Available GCAM Database Scenarios",
        choices = unique(gcamScenariosx()),
        selected = unique(gcamScenariosx()),
        multiple = TRUE,
        options = list(
          `actions-box` = TRUE,
          `deselect-all-text` = "None",
          `select-all-text` = "All",
          `none-selected-text` = "None Selected"
        )
      )
  })

  output$gcamScenariosProj = renderUI({
    pickerInput(
      inputId = "gcamProjScenariosSelected",
      label = "Select Available GCAM Proj File Scenarios",
      choices = unique(gcamScenariosxProj()),
      selected = unique(gcamScenariosxProj()),
      multiple = TRUE,
      options = list(
        `actions-box` = TRUE,
        `deselect-all-text` = "None",
        `select-all-text` = "All",
        `none-selected-text` = "None Selected"
      )
    )
  })

  #.........................................
  # GCAM parameters
  #.........................................

  gcamParamsx <- reactive({
    unique(gcamextractor::data_params)
  })

  output$gcamParams = renderUI({
    pickerInput(
      inputId = "gcamParamsSelected",
      label = "Select Available GCAM Parameters",
      choices = c(gcamParamsx(),"All"),
      selected = c("pop","gdp"),
      multiple = TRUE,
      options = list(
        `actions-box` = TRUE,
        `deselect-all-text` = "None",
        `select-all-text` = "All",
        `none-selected-text` = "None Selected"
      )
    )
  })

  #.........................................
  # GCAM Regions
  #.........................................

  gcamRegionsx <- reactive({
   unique((rmap::mapping_country_gcam32)$region)
  })

  output$gcamRegions = renderUI({
    pickerInput(
      inputId = "gcamRegionsSelected",
      label = "Select Available GCAM Regions",
      choices = c(gcamRegionsx(),"All"),
      selected = c(gcamRegionsx(),"All"),
      multiple = TRUE,
      options = list(
        `actions-box` = TRUE,
        `deselect-all-text` = "None",
        `select-all-text` = "All",
        `none-selected-text` = "None Selected"
      )
    )
  })

  #...................................
  # Create data table from database

  #dataGCAMx <- eventReactive(input$readgcambutton, {
  observeEvent(input$readgcambutton, {
      if(rv$validGCAM != TRUE){
        return(0)
      }
      progress <- shiny::Progress$new()
      on.exit(progress$close())
      progress$set(message = "Reading from GCAM database", value = 0)

      tempdir <- paste(getwd(),"/tempdir",sep="")
      dir.create(tempdir)
      gcamdatabasepath_i <- rv_gcam$gcamdatabasepathx
      if(rv_gcam$gcamprojpathx!=""){
        reReadData_i <- F
        dataProjFile_i <- rv_gcam$gcamprojpathx
        scenOrigNames_i <- input$gcamProjScenariosSelected
        gcamdatabasepath_i <- NULL
      } else {
        reReadData_i <- T
        dataProjFile_i <- "projFile.proj"
        scenOrigNames_i <- input$gcamScenariosSelected
      }
      if(any("All" %in% input$gcamParamsSelected)){
      paramsSelect_i <- unique(gcamParamsx())} else {
        paramsSelect_i <- input$gcamParamsSelected
      }
      if(any("All" %in% input$gcamParamsSelected)){
        regionsSelect_i <- unique(gcamRegionsx())} else {
          regionsSelect_i <- input$gcamRegionsSelected
        }
      progress$inc(1/3, detail = paste("Connecting to Database", 1))
      dataGCAMraw <- gcamextractor::readgcam(reReadData = reReadData_i,
                                        folder = tempdir,
                                        gcamdatabase = gcamdatabasepath_i,
                                        scenOrigNames = scenOrigNames_i,
                                        #scenNewNames = scenNewNames_i,
                                        dataProjFile = dataProjFile_i,
                                        regionsSelect = regionsSelect_i,
                                        paramsSelect= paramsSelect_i,
                                        saveData = F)
      progress$inc(1/3, detail = paste("Unlinking", 2))
      unlink(tempdir, recursive = T)

      dataGCAMraw$dataAll %>% as_tibble() %>%
        dplyr::select(scenario, region, subRegion, param,
                      class1, class2, x, vintage, aggregate, units,
                      value) %>%
        dplyr::rename(class=class1)-> dataGCAM
      progress$inc(1/3, detail = paste("Load Complete", 3))
      rv$dataGCAM <- dataGCAM
      showModal(
        modalDialog(
          size = "s",
          easyClose = FALSE,
          footer = NULL,
          fluidRow(
            column(6,
                   div(actionLink(
                     inputId='append',
                     label="Append to Input",
                     class = "btn btn-default shiny-download-link download_button"),
                     style = "float:center"
                   ))
            ,
            column(6,
                   div(actionLink(inputId="close",
                                  label='Overwrite Input',
                                  class = "btn btn-default shiny-download-link download_button"),
                       style="float:right;!important"
                   )
            )
          )
        ))
  }, ignoreInit = TRUE, once = TRUE)

  } # GCAM Inputs

  #...........................
  # CSV / URL Inputs
  #...........................

  if(T){ # CSV / URL Inputs

  # Observe File Inputs
  observeEvent(input$filedata, {
    rv$filedatax=input$filedata
    # URL Update
    updateTextInput(
      session=session,
      inputId = "urlfiledata",
      value = "",
    )
    })
  observeEvent(input$urlfiledata, {
    rv$urlfiledatax=input$urlfiledata})
  eventReactive(input$urlfiledata, {
    rv$filedatax=NULL})

  # Read in Raw Data
  data_raw <- reactive({

    if (is.null(rv$filedatax) & is.null(rv$dataGCAM) & (is.null(rv$urlfiledatax))) {

      data_raw_result <- argus::addMissing(
        dataDefault %>%
          dplyr::select(scenario, subRegion, param, aggregate, class, x, value))

    return(data_raw_result)

    } else if(!is.null(rv$filedatax) & is.null(rv$dataGCAM) & (is.null(rv$urlfiledatax))) {

      data_raw_result <- NULL

      print("Checking csv reading 1......")
      print(paste0(input$filedata$datapath))

      for (i in 1:length(input$filedata$datapath)){
        argus::parse_local(input$filedata$datapath[i], inpu$urlfiledata$datapath) %>%
            argus::addMissing() -> data_raw_result_i
        data_raw_result <- dplyr::bind_rows(data_raw_result, data_raw_result_i)
      }

      print("Checking csv reading 2......")

      return(data_raw_result)

    } else if(is.null(rv$filedatax) & !is.null(rv$dataGCAM) & (is.null(rv$urlfiledatax))){

      data_raw_result <-argus::addMissing(rv$dataGCAM %>%
                                            dplyr::select(scenario, subRegion, param, aggregate, class, x, value))

      return(data_raw_result)

    } else {

      urlfiledatax_path <- strsplit(rv$urlfiledatax, ",")

      data_raw_result <- NULL

      for (i in 1:length(urlfiledatax_path[[1]])){
        argus::parse_remote(gsub(" ", "", urlfiledatax_path[[1]][i], fixed = TRUE))%>%
            dplyr::select(scenario, subRegion, param, aggregate, class, x, value) -> data_raw_result_i

        data_raw_result <- dplyr::bind_rows(data_raw_result, data_raw_result_i)
      }
      return(data_raw_result)
    }

  })

  observeEvent(input$append, {
    tblAggsums <- data_raw() %>%
      dplyr::filter(aggregate == "sum") %>%
      dplyr::select(scenario, subRegion, param, aggregate, class, x, value)%>%
      dplyr::group_by_at(dplyr::vars(-value)) %>%
      dplyr::summarize_at(c("value"), list( ~ sum(.)))
    tblAggmeans <- data_raw() %>%
      dplyr::filter(aggregate == "mean") %>%
      dplyr::select(scenario, subRegion, param, aggregate, class, x, value)%>%
      dplyr::group_by_at(dplyr::vars(-value)) %>%
      dplyr::summarize_at(c("value"), list( ~ mean(.)))

    tbl <- dplyr::bind_rows(tblAggsums, tblAggmeans) %>% dplyr::ungroup()
    rv$data <- dplyr::bind_rows(rv$data, tbl)
    rv$filedatax<-NULL
    rv$dataGCAM<-NULL
    rv$urlfiledatax<-NULL
    removeModal()
  }, ignoreInit = TRUE)

  observeEvent(input$close, {
    tblAggsums <- data_raw() %>%
      dplyr::filter(aggregate == "sum") %>%
      dplyr::select(scenario, subRegion, param, aggregate, class, x, value)%>%
      dplyr::group_by_at(dplyr::vars(-value)) %>%
      dplyr::summarize_at(c("value"), list( ~ sum(.)))
    tblAggmeans <- data_raw() %>%
      dplyr::filter(aggregate == "mean") %>%
      dplyr::select(scenario, subRegion, param, aggregate, class, x, value)%>%
      dplyr::group_by_at(dplyr::vars(-value)) %>%
      dplyr::summarize_at(c("value"), list( ~ mean(.)))

    tbl <- dplyr::bind_rows(tblAggsums, tblAggmeans) %>% dplyr::ungroup()
    rv$data <- dplyr::bind_rows(NULL, tbl)
    rv$filedatax<-NULL
    rv$dataGCAM<-NULL
    rv$urlfiledatax<-NULL
    removeModal()
  }, ignoreInit = TRUE)


  data <- reactive({
    return(rv$data)
  })

  } # CSV / URL Inputs

  #...........................
  # Selection of Reactive Inputs
  #...........................

  if(T){ # Select Reactive Inputs

    # Scenario Select
    output$selectScenarios = renderUI({

      pickerInput(
        inputId = "scenariosSelected",
        label = "Select Scenarios",
        choices = unique(data()$scenario),
        selected = unique(data()$scenario),
        multiple = TRUE,
        options = list(
          `actions-box` = TRUE,
          `deselect-all-text` = "None",
          `select-all-text` = "All",
          `none-selected-text` = "None Selected"
        )
      )

    })

    # Ref Scenario Select
    output$selectRefScenarios = renderUI({
      pickerInput(
        inputId = "scenarioRefSelected",
        label = "Select Ref Scenario",
        choices = unique(data()$scenario)[unique(data()$scenario)
                                          %in% scenariosSelectedx()],
        selected = (unique(data()$scenario)[unique(data()$scenario)
                                            %in% scenariosSelectedx()])[1],
        multiple = F
      )
    })

    # Parameters Select
    output$selectParams = renderUI({
      pickerInput(
        inputId = "paramsSelected",
        label = "Select Params",
        choices = c("Chosen Mix", unique(data()$param)),
        selected = unique(data()$param)[1:5],
        multiple = TRUE,
        options = list(
          `actions-box` = TRUE,
          `deselect-all-text` = "None",
          `select-all-text` = "All",
          `none-selected-text` = "None Selected"
        )
      )
    })

    # Regions Select
    output$selectRegions = renderUI({
      pickerInput(
        inputId = "regionsSelected",
        label = "Select Regions",
        choices = unique(data()$subRegion),
        selected = unique(data()$subRegion),
        multiple = TRUE,
        options = list(
          `actions-box` = TRUE,
          `deselect-all-text` = "None",
          `select-all-text` = "All",
          `none-selected-text` = "None Selected"
        )
      )
    })

    # Reactive year select Select based on inputs
    mapYearx <- function(){
      if(!is.null(isolate(input$mapYear))){
        return(isolate(input$mapYear))
      }else{
        return(sort(unique(dataMapx()$x))[round(length(sort(unique(dataMapx()$x)))/2)])
      }
    }

    # Select Years for Map
    output$selectMapYear = renderUI({
      sliderInput("mapYear", label ="Year", min = min(dataMapx()$x),
                  max = max(dataMapx()$x), step = 5,
                  value=selectFocusMapYearx(), sep="",
                  animate =F)
    })

    # Reactive Regions Select based on inputs
    subsetRegionsx <- reactive({
      if (input$subsetRegions == "All" && length(input$subsetRegions) == 1) {
        return(unique(regionsSelectedx()))
      } else if (is.null(input$subsetRegions)){
        return(unique(regionsSelectedx())[1:4])
      } else{
        return(input$subsetRegions)
      }
    })

    #Bookmark modal
    observeEvent(input$button_subset_regions, {
      showModal(
        modalDialog(
          size = "s",
          easyClose = TRUE,
          footer = NULL,
          pickerInput(
            inputId = "subsetRegions",
            label = "Select Regions to Compare",
            choices = unique(dataMapx()$subRegion),
            selected = unique(regionsSelectedx())[1:4],
            multiple = TRUE,
            options = list(
              `actions-box` = TRUE,
              `deselect-all-text` = "None",
              `select-all-text` = "All",
              `none-selected-text` = "None Selected"
            ))
        )
      )
    })

    # Reactive Reference Scenario Select
    scenarioRefSelectedx <- reactive({
      input$scenarioRefSelected
    })

    # Reactive Regions Select based on inputs
    regionsSelectedx <- reactive({
      if (input$regionsSelected == "All" && length(input$regionsSelected) == 1) {
        return(unique(data()$subRegion))
      } else {
        return(input$regionsSelected)
      }
    })

    # Reactive Params based on inputs
    paramsSelectedx <- reactive({
      if (any(input$paramsSelected == "Chosen Mix") &&
          length(input$paramsSelected) == 1) {
        paramsCheck <- unique(data()$param)[unique(data()$param) %in%
                                              argus::constants()$chosenMix]
        if (length(paramsCheck) >= 1) {
          paramsCheck
        } else{
          unique(data()$param)
        }
      }else{
        input$paramsSelected
      }
    })

    # Reactive Scenarios based on inputs
    scenariosSelectedx <- reactive({
      if (input$scenariosSelected == "All" && length(input$scenariosSelected) > 0) {
        return(unique(dataSum()$scenario))
      } else{
        return(input$scenariosSelected)
      }
    })

    #focusMapParamSelected helper function
    focusMapScenariox <- reactive({
      if(!is.null(input$focusMapScenarioSelected)){
        return(input$focusMapScenarioSelected)
      }else{
        return(unique(dataMapx()$scenario)[1])
      }
    })

    # Focus maps Inputs
    # Scenario Select
    output$selectFocusMapScenario = renderUI({
      pickerInput(
        inputId = "focusMapScenarioSelected",
        label = "Scenario",
        choices = unique(dataMapx()$scenario),
        selected =unique(dataMapx()$scenario)[1],
        multiple = FALSE)
    })

    #sfocusMapParamSelected helper function
    focusMapParamSelectedx <- reactive({
      if(!is.null(input$focusMapParamSelected)){
        return(input$focusMapParamSelected)
      }else{
        return(unique(dataMapx()$param)[1])
      }
    })

    # Parameters Select
    output$selectFocusMapParam = renderUI({
      pickerInput(
        inputId = "focusMapParamSelected",
        label = "Parameter",
        choices =  unique(dataMapx()$param),
        selected = focusMapParamSelectedx(),
        multiple = FALSE)
    })

    selectFocusMapYearx <-  function(){
     if (is.null(isolate(input$focusMapYearSelected))){
        return(sort(unique(dataMapx()$x))[round(length(sort(unique(dataMapx()$x)))/2)])
      } else{
        return(isolate(input$focusMapYearSelected))
      }
    }

    # Select Years for Map
    output$selectFocusMapYear = renderUI({
      sliderInput(inputId = "focusMapYearSelected",
                  label ="Year",
                  min = min(data()$x),
                  max = max(data()$x), step = 5,
                  value=selectFocusMapYearx(),
                  sep="",
                  animate =T)
    })

  } # Select Reactive Inputs

  #...........................
  # Subsetting Data for Outputs
  #...........................

  if(T){ # Subsetting Data for Outputs

    dataSumx <- reactive({
      # Aggregate across classes
      tblAggsums <- data() %>%
        dplyr::filter(subRegion %in% regionsSelectedx()) %>%
        dplyr::filter(scenario %in% scenariosSelectedx(),
                      param %in% paramsSelectedx()) %>%
        dplyr::mutate(scenario = as.character(scenario)) %>%
        dplyr::filter(aggregate == "sum") %>%
        dplyr::select(scenario, param, x, value) %>%
        dplyr::group_by_at(dplyr::vars(-value)) %>%
        dplyr::summarize_at(c("value"), list( ~ sum(.)))
      tblAggmeans <- data() %>%
        dplyr::filter(subRegion %in% regionsSelectedx()) %>%
        dplyr::filter(scenario %in% scenariosSelectedx(),
                      param %in% paramsSelectedx()) %>%
        dplyr::select(-class) %>%
        dplyr::mutate(scenario = as.character(scenario)) %>%
        dplyr::filter(aggregate == "mean") %>%
        dplyr::select(scenario, param, x, value) %>%
        dplyr::group_by_at(dplyr::vars(-value)) %>%
        dplyr::summarize_at(c("value"), list( ~ mean(.)))

      dplyr::bind_rows(tblAggsums, tblAggmeans) %>% dplyr::ungroup()
    })

    # Data for Bar Chart
    dataChartx <- reactive({

        # Aggregate across classes
        tblAggsums <- data() %>%
          dplyr::filter(
            scenario %in% input$scenariosSelected,
            param %in% paramsSelectedx(),
            subRegion %in% regionsSelectedx()
          ) %>%
          dplyr::mutate(scenario = as.character(scenario)) %>%
          dplyr::filter(aggregate == "sum") %>%
          dplyr::select(scenario, param, class, x, value) %>%
          dplyr::group_by_at(dplyr::vars(-value)) %>%
          dplyr::summarize_at(c("value"), list( ~ sum(.)))

        tblAggmeans <- data() %>%
          dplyr::filter(
            scenario %in% input$scenariosSelected,
            param %in% paramsSelectedx(),
            subRegion %in% regionsSelectedx()
          ) %>%
          dplyr::mutate(scenario = as.character(scenario)) %>%
          dplyr::filter(aggregate == "mean") %>%
          dplyr::select(scenario, param, class, x, value) %>%
          dplyr::group_by_at(dplyr::vars(-value)) %>%
          dplyr::summarize_at(c("value"), list( ~ mean(.)))


        dplyr::bind_rows(tblAggsums, tblAggmeans) %>% dplyr::ungroup()

    })

    # Data Bar Chart Absolute Diff
    dataDiffAbsx <- reactive({
      diffText <- " Diff Abs"

      if (is.null(input$scenarioRefSelected)) {
        print(paste("No reference scenario provided", sep = ""))
        print(paste(
          "Using ",
          unique(dataChartx()$scenario)[1],
          " as reference",
          sep = ""
        ))
        scenRef_i = unique(dataChartx()$scenario)[1]
      } else{
        if (!input$scenarioRefSelected %in% unique(dataChartx()$scenario)) {
          print(paste(
            "scenario ",
            input$scenarioRefSelected,
            " not in scenarios",
            sep = ""
          ))
          print(paste(
            "Using ",
            unique(dataChartx()$scenario)[1],
            " as reference",
            sep = ""
          ))
          scenRef_i = unique(dataChartx()$scenario)[1]
        } else{
          scenRef_i <- input$scenarioRefSelected
          print(scenRef_i)
        }
      } # Check if Ref Scenario Chosen

      # Calculate Diff Values
      tbl_pd <- dataChartx() %>%
        dplyr::filter(scenario == scenRef_i)

      for (k in unique(dataChartx()$scenario)[unique(dataChartx()$scenario) !=
                                              scenRef_i]) {

        tbl_temp <- dataChartx() %>%
          dplyr::filter(scenario %in% c(scenRef_i, k))  %>%
          dplyr::filter(!(is.na(class) & value==0))%>%
          dplyr::mutate(class=if_else(is.na(class),"NA",class))

        tbl_temp <- tbl_temp %>%
          tidyr::spread(scenario, value)

        tbl_temp[is.na(tbl_temp)] <- 0

        tbl_temp <- tbl_temp %>%
          dplyr::mutate(!!paste(k, diffText, sep = "") := get(k) - get(scenRef_i)) %>%
          dplyr::select(-dplyr::one_of(c(k, scenRef_i)))
        tbl_temp <- tbl_temp %>%
          tidyr::gather(key = scenario, value = value, -c(names(tbl_temp)[!names(tbl_temp) %in% paste(k, diffText, sep = "")]))
        tbl_pd <- dplyr::bind_rows(tbl_pd, tbl_temp)

      }

      tbl_pd <- tbl_pd %>%
        dplyr::mutate(scenario = factor(scenario,
                                        levels = c(scenRef_i,
                                                   unique(
                                                     tbl_pd$scenario
                                                   )[unique(tbl_pd$scenario) != scenRef_i])))
      tbl_pd
    })

    # Data Chart Percent Diff
    dataPrcntAbsx <- reactive({
      diffText <- " Prcent Abs"

      if (is.null(input$scenarioRefSelected)) {
        print(paste("No reference scenario provided", sep = ""))
        print(paste(
          "Using ",
          unique(dataChartx()$scenario)[1],
          " as reference",
          sep = ""
        ))
        scenRef_i = unique(dataChartx()$scenario)[1]
      } else{
        if (!input$scenarioRefSelected %in% unique(dataChartx()$scenario)) {
          print(paste(
            "scenario ",
            input$scenarioRefSelected,
            " not in scenarios",
            sep = ""
          ))
          print(paste(
            "Using ",
            unique(dataChartx()$scenario)[1],
            " as reference",
            sep = ""
          ))
          scenRef_i = unique(dataChartx()$scenario)[1]
        } else{
          scenRef_i <- input$scenarioRefSelected
        }
      } # Check if Ref Scenario Chosen

      # Calculate Diff Values
      tbl_pd <- dataChartx() %>%
        dplyr::filter(scenario == scenRef_i)

      for (k in unique(dataChartx()$scenario)[unique(dataChartx()$scenario) !=
                                              scenRef_i]) {

        tbl_temp <- dataChartx() %>%
          dplyr::filter(scenario %in% c(scenRef_i, k))  %>%
          dplyr::filter(!(is.na(class) & value==0))%>%
          dplyr::mutate(class=if_else(is.na(class),"NA",class))


        tbl_temp <- tbl_temp %>%
          tidyr::spread(scenario, value)

        tbl_temp[is.na(tbl_temp)] <- 0

        #Important Code

        tbl_temp <- tbl_temp %>%
          dplyr::mutate(!!paste(k, diffText, sep = "") := 100*((get(k)/get(scenRef_i))-1)) %>%
          dplyr::select(-dplyr::one_of(c(k, scenRef_i)))
        tbl_temp <- tbl_temp %>%
          tidyr::gather(key = scenario, value = value, -c(names(tbl_temp)[!names(tbl_temp) %in% paste(k, diffText, sep = "")]))
        tbl_pd <- dplyr::bind_rows(tbl_pd, tbl_temp)
      }

      tbl_pd <- tbl_pd %>%
        dplyr::mutate(scenario = factor(scenario,
                                        levels = c(scenRef_i,
                                                   unique(
                                                     tbl_pd$scenario
                                                   )[unique(tbl_pd$scenario) != scenRef_i])))
      tbl_pd
    })


    # Map Data

    dataMapx <- reactive({

          # Aggregate across classes
          tblAggsums <- data() %>%
            dplyr::filter(subRegion %in% regionsSelectedx()) %>%
            dplyr::filter(scenario %in% input$scenariosSelected,
                          param %in% paramsSelectedx()) %>%
            dplyr::mutate(subRegion = gsub("-","_",subRegion)) %>%
            dplyr::mutate(scenario = as.character(scenario)) %>%
            dplyr::filter(aggregate == "sum") %>%
            dplyr::select(scenario, param, subRegion, x, value) %>%
            dplyr::group_by_at(dplyr::vars(-value)) %>%
            dplyr::summarize_at(c("value"), list( ~ sum(.)))

          tblAggmeans <- data() %>%
            dplyr::filter(subRegion %in% regionsSelectedx()) %>%
            dplyr::filter(scenario %in% input$scenariosSelected,
                          param %in% paramsSelectedx()) %>%
            dplyr::mutate(subRegion = gsub("-","_",subRegion)) %>%
            dplyr::select(-class) %>%
            dplyr::mutate(scenario = as.character(scenario)) %>%
            dplyr::filter(aggregate == "mean") %>%
            dplyr::select(scenario, param, subRegion, x, value) %>%
            dplyr::group_by_at(dplyr::vars(-value)) %>%
            dplyr::summarize_at(c("value"), list( ~ mean(.)))

        dplyr::bind_rows(tblAggsums, tblAggmeans) %>% dplyr::ungroup()

    })



  } # Subsetting Data For Outputs

  } # Read in Inputs

  #...........................
  # Outputs
  #...........................

  if(T){ # Outputs

  #...........................
  # Plotting Outputs
  #...........................

  #...........................
  # Focus Page
  #...........................

    if(T){ # Focus Page

  output$focusMap <- renderLeaflet({

    # Read in Raw Data
    dataMapFocus_raw <-
        dataMapx() %>%
          dplyr::ungroup() %>%
          dplyr::select(x,param,scenario,subRegion,value) %>%
          filter(param == focusMapParamSelectedx(),
                 scenario == input$focusMapScenarioSelected,
                 x == input$focusMapYearSelected) %>%
            dplyr::left_join(rmap::mapping_gcambasins,by="subRegion") %>%
            dplyr::mutate(subRegion=dplyr::case_when(!is.na(subRegionMap)~subRegionMap,
                                                     TRUE~subRegion)) %>%
            dplyr::select(-subRegionMap) %>%
          dplyr::filter(subRegion!="South_Pacific_Islands")

      if(length(dataMapFocus_raw$x)==0){
        my_title <- tags$p(tags$style("p {color: black; font-size:22px}"),tags$b("There is no data for this year"))

        mapFocus <- leaflet() %>%
        # setView(lat = initial_lat, lng = initial_lng, zoom = initial_zoom) %>%
          addTiles()%>%
          addControl(my_title, position = "topleft" )
        return(mapFocus)
      }

    mapdf <- rmap::map_find(dataMapFocus_raw);

    # Prepare for Polygons
    mapdf <- mapdf[mapdf$subRegion %in% dataMapFocus_raw$subRegion,]; mapdf
    mapdf <- mapdf %>%
      left_join(dataMapFocus_raw %>%
                  dplyr::select(subRegion,value)) %>%
      filter(subRegion %in% unique(dataMapFocus_raw$subRegion)); mapdf

    # Create legends and color scales
    bins <- unique(argus::breaks(dataMapFocus_raw,breaks=7)[[1]]);
    pal <- colorBin(grDevices::colorRampPalette(RColorBrewer::brewer.pal(min(9,length(bins)), "YlOrRd"))(length(bins)),
                    domain = dataMapFocus_raw$value, bins = bins)

    # Plot polygons on Leaflet
      labels <- sprintf(
        "<strong>%s</strong><br/>%g",
        mapdf$subRegion, mapdf$value
      ) %>% lapply(htmltools::HTML)

      if(length(bins)>1){

        bbox_shape <- sf::st_bbox(mapdf)

        lat_min = bbox_shape[["xmin"]]
        lat_max = bbox_shape[["xmax"]]
        lng_min = bbox_shape[["ymin"]]
        lng_max = bbox_shape[["ymax"]]

        initial_lat = (lat_max + lat_min )/2
        initial_lng = (lng_max + lng_min)/2
        initial_zoom = 2

      mapFocus <- leaflet() %>%
        setView(lat = initial_lat, lng = initial_lng, zoom = initial_zoom) %>%
        addTiles() %>%
        addPolygons(data=mapdf,
                    group=~unique(name),
                    fillColor = ~pal(value),
                    fillOpacity = 0.5,
                    opacity = 0.5,
                    stroke = TRUE,
                    weight = 0.5,
                    label = labels,
                    labelOptions = labelOptions(
                      style = list("font-weight" = "normal", padding = "3px 8px"),
                      textsize = "15px",
                      direction = "auto")
                    ) %>%
        addLegend(pal = pal,
                values = mapdf$value,
                opacity = 0.6,
                title = NULL,
                position = "bottomright")}

      if(length(bins)==1){
        mapFocus <- leaflet() %>%
          addTiles() %>%
          addPolygons(data=mapdf,
                      group=~unique(name),
                      fillColor = "red",
                      fillOpacity = 0.5,
                      opacity = 0.5,
                      stroke = TRUE,
                      weight = 0.5,
                      label = labels,
                      labelOptions = labelOptions(
                        style = list("font-weight" = "normal", padding = "3px 8px"),
                        textsize = "15px",
                        direction = "auto")
          ) %>%
          addLegend(colors = "red",
                    labels = bins,
                    opacity = 0.6,
                    title = NULL,
                    position = "bottomright")
      }


    mapFocus

    })

  output$focusChartSum <- renderPlotly({

    #ggplotly()
    (ggplot2::ggplot(dataSumx() %>%
                       dplyr::select(scenario, value, param, x)%>%
                       dplyr::filter(param == focusMapParamSelectedx()),
                     aes(x=x,y=value,
                         group=scenario,
                         color=scenario))+
       geom_line(size=1.25) +
       ggplottheme +
       geom_line() +
       geom_point() +
       xlab(NULL) + ylab(NULL) +
       ggtitle(paste0(focusMapParamSelectedx())) +
       theme(legend.position="bottom",
             legend.title = element_blank(),
             legend.margin=margin(t =0, r = 0, b = 0, l =0, "pt"),
             plot.margin=margin(t =0, r = 0, b = 0, l =0,"pt"),
             text=element_text(size=12),
             aspect.ratio = NULL,
             plot.title = element_text(size =10)))%>%
      ggplotly(tooltip = c("x","value"))%>%
      config(displayModeBar = FALSE) %>%
      layout(legend = list(orientation = "h", x=0,y=-0.2),
             hovermode = "x")

  })

  output$focusChartBar <- renderPlotly({

    dataChartPlot <- dataChartx() %>%
      dplyr::filter(!(is.na(class) & value==0))%>%
      dplyr::mutate(class=if_else(is.na(class),"NA",class))%>%
      dplyr::select(scenario, value, param, class, x)%>%
      dplyr::filter(param == focusMapParamSelectedx(),
                    scenario == input$focusMapScenarioSelected)

    # Check Color Palettes
    palAdd <- rep(c("firebrick3","dodgerblue3","forestgreen","black","darkgoldenrod3","darkorchid3","gray50", "darkturquoise"),10000)

    missNames <- unique(dataChartPlot$class)[!unique(dataChartPlot$class) %in%
                                               names(jgcricolors::jgcricol()$pal_all)]
    if (length(missNames) > 0) {
      palAdd <- palAdd[1:length(missNames)]
      names(palAdd) <- missNames
      palCharts <- c(jgcricolors::jgcricol()$pal_all, palAdd)
    } else{
      palCharts <- jgcricolors::jgcricol()$pal_all
    }

    #ggplotly()
    (ggplot2::ggplot(dataChartPlot,
                     aes(x=x,y=value,
                         group=scenario,
                         fill=class))+
       ggplottheme +
       ggtitle(paste0(input$focusMapScenarioSelected)) +
       scale_fill_manual(breaks=names(palCharts),values=palCharts) +
       scale_y_continuous(position = "left")+
       geom_bar(position="stack", stat="identity") +
       theme(legend.position="bottom",
              strip.text.y = element_blank(),
              legend.title = element_blank(),
              legend.margin=margin(t =0, r = 0, b = 0, l =0, "pt"),
              legend.key.height=unit(0, "cm"),
              text = element_text(size = 12),
              plot.margin=margin(t =0, r = 0, b = 0, l =0,"pt"),
              plot.title = element_text(size =10)) +
      ylab(NULL) + xlab(NULL))%>%
      ggplotly(tooltip = c("class","x","value"))%>%
      config(displayModeBar = FALSE) %>%
      layout(showlegend = TRUE, legend = list(font = list(size = 10)))%>%
      layout(legend = list(orientation = "h", x=0,y=-0.2))

  })


    } # Focus Page

  #...........................
  # Summary Plot
  #...........................

    if(T){ # Summary Plot

      output$summary <- renderPlot({
        argus::summaryPlot(aspectratio = NULL,
                           textsize = 17.5,
                           dataSumx = dataSumx(),
                           ggplottheme=ggplottheme)
      },
      height=function(){
        if (length(unique(dataChartx()$param))>3){
          if(length(unique(dataChartx()$param))%%3==0){
            multiplier = length(unique(dataChartx()$param))%/%3
          } else {
            multiplier = (length(unique(dataChartx()$param))%/%3)+1
          }
          return(multiplier*400)
        }else{
          return("auto")
        }
      }
      )

      output$downloadPlotSum <- downloadHandler(
        filename = "charts_summary.png",
        content = function(filename) {
          shiny::withProgress(
            message = paste0("Downloading charts_summary.png"),
            value = 0,
            {
              shiny::incProgress(1/10)
              Sys.sleep(1)
              shiny::incProgress(5/10)
              ggsave(
                filename,
                plot=argus::summaryPlot(aspectratio = 0.75,
                                        textsize = 10,
                                        dataSumx = dataSumx(),
                                        ggplottheme=ggplottheme),
                #max(13,min(13,1.25*length(unique(dataChartx()$param)))),
                height = argus::exportHeight(3, 49, length(unique(dataChartx()$param)), 3),
                width=argus::exportWidth(10, length(unique(dataChartx()$param)), 3),
                units="in"
              )
            }
          )
        })

    } # Summary Plot

  #...........................
  # Summary Plot Compare Regions
  #...........................

    if(T){# Summary Plot Compare Regions

  output$summaryReg <- renderPlot({
    argus::summaryPlotReg(dataMapx = dataMapx(),
                           ggplottheme = ggplottheme,
                           subsetRegionsx = subsetRegionsx(),
                           textsize = 15)
  },
  height=function(){300*length(unique(dataMapx()$param))}#,
  #width=function(){max(400,300*length(subsetRegionsx())+100)}
  )

  output$downloadPlotSumReg <- downloadHandler(
    filename = "charts_summary_region.png",
    content = function(filename) {
      shiny::withProgress(
        message = paste0("Downloading charts_summary_region.png"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          ggsave(filename,plot=summaryPlotReg(dataMapx = dataMapx(),
                                              ggplottheme = ggplottheme,
                                              subsetRegionsx = subsetRegionsx(),
                                              textsize = 10),
                 height = argus::exportHeight(1, 49, length(unique(dataMapx()$param)), 3),
                 width = argus::exportWidth(49, length(unique(subsetRegionsx())), 2)+3,
                 units = "in")
        }
      )
    })

    } # Summary Plot Compare Regions

  #...........................
  # Bar Charts
  #...........................

    if(T){ # Bar Charts

    #...........................
    # Pick Type of Chart
    #...........................

  observeEvent(input$absChart, {
    rv$absChart = 1;
    rv$percDiffChart = 0;
    rv$absDiffChart = 0;
  })

  observeEvent(input$percDiffChart, {
    rv$absChart = 0;
    rv$percDiffChart = 1;
    rv$absDiffChart = 0;
  })

  observeEvent(input$absDiffChart, {
    rv$absChart = 0;
    rv$percDiffChart = 0;
    rv$absDiffChart = 1;
  })


  #...........................
  # Chart Plot Abs
  #...........................

  output$plotAbs <- renderPlot({
    argus::plotAbs(dataChartPlot = dataChartx(),
                   ggplottheme=ggplottheme,
                   scenarioRefSelected = input$scenarioRefSelected,
                   textsize = 15)
  },
  height=function(){400*length(unique(dataChartx()$param))}#,
  #width=function(){500*length(unique(data()$scenario))}
  )

  output$downloadPlotChart <- downloadHandler(
    file = "charts_bar.png",
    content = function(file) {
      shiny::withProgress(
        message = paste0("Downloading charts_bar.png"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          ggsave(file,plot=argus::plotAbs(dataChartx(), ggplottheme=ggplottheme,input$scenarioRefSelected),
                 width=argus::exportWidth(49, length(unique(dataChartx()$param)), 4),
                 height=argus::exportHeight(1, 49, length(unique(dataChartx()$param)), 4)+2,
                 unit = "in"
          )
        }
      )
    })

  #...........................
  # Chart Plot Abs Diff
  #...........................

  output$plotDiff <- renderPlot({
    argus::plotDiffAbs(dataChartPlot=dataDiffAbsx(),
                       ggplottheme=ggplottheme,
                       scenarioRefSelected = input$scenarioRefSelected,
                       textsize = 15)
  },
 height=function(){400*length(unique(dataChartx()$param))}#,
 #width=function(){500*length(unique(data()$scenario))}
  )

   output$downloadChartDiffAbs <- downloadHandler(
    file = "charts_bar_diff_absolute.png",
    content = function(file) {
      # foodweb(where=environment())
      ggsave(file,plot=argus::plotDiffAbs(dataDiffAbsx(), ggplottheme=ggplottheme, input$scenarioRefSelected),
             width=argus::exportWidth(49, length(unique(dataChartx()$param)), 4),
             height=argus::exportHeight(1, 49, length(unique(dataChartx()$param)), 4)+2,
             unit = "in"
      )
      # exportHeight<-function(chartsperrow, max_height_in, numelement, lenperchart){
      # max(10,min(45,5*length(unique(dataChartx()$param)))),units="in")
    })

  output$plotPerc <- renderPlot({
    argus::plotDiffPrcnt(dataChartPlot = dataPrcntAbsx(),
                         ggplottheme=ggplottheme,
                         scenarioRefSelected = input$scenarioRefSelected,
                         textsize = 15)
  },
  height=function(){400*length(unique(dataChartx()$param))}#,
  #width=function(){500*length(unique(data()$scenario))}
  )

  output$downloadChartDiffPrcnt <- downloadHandler(
    file = "charts_bar_diff_percent.png",
    content = function(file) {
      shiny::withProgress(
        message = paste0("Downloading charts_bar_diff_percent.png"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          ggsave(file,plot=argus::plotDiffPrcnt(dataPrcntAbsx(), ggplottheme=ggplottheme, input$scenarioRefSelected),
                 width=argus::exportWidth(49, length(unique(dataChartx()$param)), 4),
                 height=argus::exportHeight(1, 49, length(unique(dataChartx()$param)), 4)+2,
                 unit = "in"
          )
        }
      )
      # exportHeight<-function(chartsperrow, max_height_in, numelement, lenperchart){
      # max(10,min(45,5*length(unique(dataChartx()$param)))),units="in")
    })

    } # Bar Charts

  #...........................
  # Maps
  #...........................

    if(T){ # Maps

      #...........................
      # Map Plot Abs
      #...........................

      output$mapAbs <- renderPlot({


        print("==============")
        print(paste0(unique(dataMapx()$param)))

        withProgress(message = 'Rendering map...', value = 0, {
        argus::plotMap(mapData = dataMapx(),
                       legendType = input$legendType,
                       mapX = input$mapYear,
                       diff=NULL)
        })

      },
      height=function(){400*length(unique((dataMapx() %>% dplyr::filter(x == input$mapYear))$param))}
      )

      # Download
      output$downloadMap <- downloadHandler(
        file = "maps.png",
        content = function(file) {
          shiny::withProgress(
            message = paste0("Downloading maps.png"),
            value = 0,
            {
              shiny::incProgress(1/10)
              Sys.sleep(1)
              shiny::incProgress(5/10)
              ggsave(
                file,
                plot=argus::plotMap(mapData = dataMapx(),
                                    legendType = input$legendType,
                                    mapX = input$mapYear,
                                    textsize = 10),
                height = argus::exportHeight(3, 49, length(unique(dataMapx()$param)), 10),
                width=argus::exportWidth(10, length(unique(data()$scenario)), 10),
                units="in"
              )
            }
          )
        })


      #...........................
      # Map Plot Diff Abs
      #...........................

      output$mapDiffAbs <- renderPlot({

        withProgress(message = 'Rendering map...', value = 0, {
        argus::plotMap(mapData = dataMapx(),
                       legendType = input$legendType,
                       mapX = input$mapYear,
                       scenRef = input$scenarioRefSelected ,
                       diff="absolute")
        })

      },
      height=function(){400*length(unique((dataMapx() %>% dplyr::filter(x == input$mapYear))$param))}
      )

      # Download
      output$downloadMapDiffAbs <- downloadHandler(
        file = "maps_diff_absolute.png",
        content = function(file) {
          shiny::withProgress(
            message = paste0("Downloading maps_diff_absolute.png"),
            value = 0,
            {
              shiny::incProgress(1/10)
              Sys.sleep(1)
              shiny::incProgress(5/10)
              ggsave(
                file,
                plot=argus::plotMap(mapData = dataMapx(),
                                    legendType = input$legendType,
                                    mapX = input$mapYear,
                                    scenRef = input$scenarioRefSelected ,
                                    diff="absolute",
                                    textsize = 10),
                height = argus::exportHeight(3, 49, length(unique(dataMapx()$param)), 10),
                width=argus::exportWidth(10, length(unique(data()$scenario)), 10),
                units="in"
              )
            }
          )
        })


      #...........................
      # Map Plot Diff Percent
      #...........................


     output$mapDiffPrcnt <- renderPlot({

       withProgress(message = 'Rendering map...', value = 0, {
       argus::plotMap(mapData = dataMapx(),
                      legendType = input$legendType,
                      mapX = input$mapYear,
                      scenRef = input$scenarioRefSelected ,
                      diff="percent")
       })

     },
     height=function(){400*length(unique((dataMapx() %>% dplyr::filter(x == input$mapYear))$param))}
     )



  # Download
  output$downloadMapDiffPrcnt <- downloadHandler(
    file = "maps_diff_percent.png",
    content = function(file) {
      shiny::withProgress(
        message = paste0("Downloading maps_diff_percent.png"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          ggsave(
            file,
            plot=argus::plotMap(mapData = dataMapx(),
                                legendType = input$legendType,
                                mapX = input$mapYear,
                                scenRef = input$scenarioRefSelected ,
                                diff="percent",
                                textsize = 10),
            height = argus::exportHeight(3, 49, length(unique(dataMapx()$param)), 10),
            width=argus::exportWidth(10, length(unique(data()$scenario)), 10),
            units="in"
          )
        }
      )
    })

    } # Maps



  #...........................
  # Data Table
  #...........................

  if(T) { # Data Table

  output$table <- renderDT(
    # Point to reactive values
    data() %>% dplyr::select(-aggregate),
    filter = "top"
  )

  output$downloadTable <- downloadHandler(
    file = "table.csv",
    content = function(file) {
      shiny::withProgress(
        message = paste0("Downloading table.csv"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          write.csv(data() , file)
        }
      )
    })

  } # Data Table

  #...........................
  # Download All
  #...........................
  output$downloadAll <- downloadHandler(
    file = "all.zip",
    content = function(file) {
      tmpdir <- tempdir()
      setwd(tempdir())
      dataMapx <- dataMapx()
      if(is.null(input$mapYear)){
        max((((dataMapx$x %>% table() %>%
           as.data.frame()) %>%
          dplyr::filter(Freq==max(Freq)))$.) %>% as.vector) ->
          mapX
        } else {
          mapX<-input$mapYear}
      fs <- c("charts_summary.png",
              "charts_summary_region.png",
              "charts_bar.png",
              "charts_bar_diff_absolute.png",
              "charts_bar_diff_percent.png",
              paste0("maps_",mapX,".png"),
              paste0("maps_diff_absolute_",mapX,".png"),
              paste0("maps_diff_percent_",mapX,".png"),
              "table.csv"
              )
      shiny::withProgress(
        message = paste0("Downloading charts_summary.png"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          ggsave(
            "charts_summary.png",
            plot=argus::summaryPlot(aspectratio = 0.75,
                                    dataSumx = dataSumx(),
                                    ggplottheme=ggplottheme,
                                    textsize=10),
            #max(13,min(13,1.25*length(unique(dataChartx()$param)))),
            height = argus::exportHeight(3, 49, length(unique(dataChartx()$param)), 3),
            width=argus::exportWidth(10, length(unique(dataChartx()$param)), 3),
            units="in"
          )
        }
      )
      shiny::withProgress(
        message = paste0("Downloading charts_summary_region.png"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          ggsave("charts_summary_region.png",plot=summaryPlotReg(dataMapx = dataMapx(),
                                                                 ggplottheme = ggplottheme,
                                                                 subsetRegionsx = subsetRegionsx(),
                                                                 textsize=10),
                   height = argus::exportHeight(1, 49, length(unique(dataMapx()$param)), 3),
                   width = argus::exportWidth(49, length(unique(subsetRegionsx())), 2)+3,
                   units = "in")
        }
      )
      shiny::withProgress(
        message = paste0("Downloading charts_bar.png"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          ggsave("charts_bar.png",plot=argus::plotAbs(dataChartPlot=dataChartx(),
                                                      ggplottheme=ggplottheme,
                                                      scenarioRefSelected=input$scenarioRefSelected,
                                                      textsize=10),
                 width=argus::exportWidth(49, length(unique(dataChartx()$param)), 4),
                 height=argus::exportHeight(1, 49, length(unique(dataChartx()$param)), 4)+2,
                 unit = "in"
          )
        }
      )
      shiny::withProgress(
        message = paste0("Downloading charts_bar_diff_absolute.png"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          ggsave("charts_bar_diff_absolute.png",plot=argus::plotDiffAbs(dataChartPlot=dataDiffAbsx(),
                                                                        ggplottheme=ggplottheme,
                                                                        scenarioRefSelected=input$scenarioRefSelected,
                                                                        textsize=10),
                 width=argus::exportWidth(49, length(unique(dataChartx()$param)), 4),
                 height=argus::exportHeight(1, 49, length(unique(dataChartx()$param)), 4)+2,
                 unit = "in"
          )
        }
      )
      shiny::withProgress(
        message = paste0("Downloading charts_bar_diff_percent.png"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          ggsave("charts_bar_diff_percent.png",plot=argus::plotDiffPrcnt(dataChartPlot=dataPrcntAbsx(),
                                                                         ggplottheme=ggplottheme,
                                                                         scenarioRefSelected=input$scenarioRefSelected,
                                                                         textsize = 10),
                 width=argus::exportWidth(49, length(unique(dataChartx()$param)), 4),
                 height=argus::exportHeight(1, 49, length(unique(dataChartx()$param)), 4)+2,
                 unit = "in"
          )
        }
      )
      shiny::withProgress(
        message = paste0("Downloading maps.png"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          print(dataMapx$param%>%unique())
          ggsave(
            paste0("maps_",mapX,".png"),
            plot=argus::plotMap(mapData = dataMapx,
                                legendType = input$legendType,
                                mapX = mapX,
                                textsize = 10),
            height = argus::exportHeight(3, 49, length(unique(dataMapx()$param)), 10),
            width=argus::exportWidth(10, length(unique(data()$scenario)), 10),
            units="in"
          )
        }
      )
      shiny::withProgress(
        message = paste0("Downloading maps_diff_absolute.png"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          ggsave(
            paste0("maps_diff_absolute_",mapX,".png"),
            plot=argus::plotMap(mapData = dataMapx,
                                legendType = input$legendType,
                                mapX = mapX,
                                scenRef = input$scenarioRefSelected ,
                                diff="absolute",
                                textsize=10),
            height = argus::exportHeight(3, 49, length(unique(dataMapx()$param)), 10),
            width=argus::exportWidth(10, length(unique(data()$scenario)), 10),
            units="in"
          )
        }
      )
      shiny::withProgress(
        message = paste0("Downloading maps_diff_percent.png"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          ggsave(
            paste0("maps_diff_percent_",mapX,".png"),
            plot=argus::plotMap(mapData = dataMapx,
                                legendType = input$legendType,
                                mapX = mapX,
                                scenRef = input$scenarioRefSelected ,
                                diff="percent",
                                textsize = 10),
            height = argus::exportHeight(3, 49, length(unique(dataMapx()$param)), 10),
            width=argus::exportWidth(10, length(unique(data()$scenario)), 10),
            units="in"
          )
        }
      )
      shiny::withProgress(
        message = paste0("Downloading table.csv"),
        value = 0,
        {
          shiny::incProgress(1/10)
          Sys.sleep(1)
          shiny::incProgress(5/10)
          write.csv(data(), "table.csv")
        }
      )
      zip::zip(zipfile=file, files=fs)
    }
  )

  } # Outputs

} # Close Server

