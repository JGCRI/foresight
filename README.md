<!-- badges: start -->
[![build](https://github.com/JGCRI/foresight/actions/workflows/build.yml/badge.svg)](https://github.com/JGCRI/foresight/actions/workflows/build.yml)
[![docs](https://github.com/JGCRI/foresight/actions/workflows/docs.yaml/badge.svg?branch=main)](https://github.com/JGCRI/foresight/actions/workflows/docs.yaml)
[![test_coverage](https://github.com/JGCRI/foresight/actions/workflows/test_coverage.yml/badge.svg?branch=main)](https://github.com/JGCRI/foresight/actions/workflows/test_coverage.yml)
[![codecov](https://codecov.io/gh/JGCRI/foresight/branch/dev/graph/badge.svg?token=NDE0ZK7OHN)](https://codecov.io/gh/JGCRI/foresight)
<!-- badges: end -->

<br>
  
<!-- ------------------------>
<!-- ------------------------>
# <a name="Introduction"></a>Introduction
<!-- ------------------------>
<!-- ------------------------>

`foresight` is an R Shiny App to interactively visualize data across scenarios, parameters, and regions. It can accomodate data inputs of the user's choice,
including the options to read a URL, upload a .csv file, or use GCAM data. Features of the application include selecting which scenarios will run, 
choosing the relevant parameters for individual cases, and selecting the geographic regions of interest. The designated parameters can be viewed as 
line graphs plotted over time, weighted bar graphs showing makeup breakdown within each bar, maps showing values by country, or as output tables. 
All results can be downloaded onto a local machine, or the user can obtain a bookmark to save their work.

For more detailed information on using foresight, click the green **User Guide** button below. 
To launch foresight in your browser, click the blue **Launch App** button.

<br>

<p align="center">
<a href="https://jgcri.github.io/foresight/articles/vignette_argus.html" target="_blank"><img src="https://github.com/JGCRI/jgcricolors/blob/main/vignettes/button_user_guide.PNG?raw=true" alt="https://jgcri.github.io/foresight/articles/vignette_argus.html" height="60"/></a>
<img src="https://github.com/JGCRI/jgcricolors/blob/main/vignettes/button_divider.PNG?raw=true" height="40"/>
<a href="http://ec2-3-21-37-120.us-east-2.compute.amazonaws.com/foresight/inst/app/" target="_blank"><img src="https://github.com/JGCRI/jgcricolors/blob/main/vignettes/button_launch_app.PNG?raw=true" alt="https://jgcri.shinyapps.io/foresight/" height="60"/></a>
</p>


<!-- ------------------------>
<!-- ------------------------>
# <a name="Citation"></a>Citation
<!-- ------------------------>
<!-- ------------------------>

To be added


<!-- ------------------------>
<!-- ------------------------>
# <a name="foresight Offline"></a>foresight Offline
<!-- ------------------------>
<!-- ------------------------>

If users want to use foresight locally on their machines they can install the software as follows:

1. Download and install:
    - R (https://www.r-project.org/)
    - R studio (https://www.rstudio.com/)  
    
2. Open R studio:

```
install.packages("devtools")
devtools::install_github("JGCRI/rgcam")
devtools::install_github("JGCRI/rmap")
devtools::install_github("JGCRI/jgcricolors")
devtools::install_github("JGCRI/gcamextractor")
devtools::install_github("JGCRI/foresight")
library(foresight)
foresight::run()
```
Additional steps for UBUNTU from a terminal
```
sudo add-apt-repository ppa:ubuntugis/ppa
sudo apt-get update
sudo apt-get install libudunits2-dev libgdal-dev libgeos-dev libproj-dev libmagick++-dev
```

Additional steps for MACOSX from a terminal
```
brew install pkg-config
brew install gdal
brew install imagemagick@6
```


  
