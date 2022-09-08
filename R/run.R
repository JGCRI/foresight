#' run
#'
#' Function to launch Shiny Application.
#'
#' @export run
#'
#' @return Shiny application object
#'
#' @examples \dontrun{
#' library(foresight)
#' argus::run()
#' }
#'
#' @import shiny

run <- function() {
  shiny::runApp(system.file('app', package='foresight'))
}
