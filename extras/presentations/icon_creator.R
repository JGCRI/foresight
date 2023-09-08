# Icons from : https://www.veryicon.com/icons/business/chart-style/sankey.html

# Load the circlize package
library(circlize)
library(Cairo)

set.seed(999)
mat <- matrix(sample(100, 6), 2, 3)
rownames(mat) <- paste0("S", 1:2)
colnames(mat) <- paste0("E", 1:3)

df <- data.frame(from = rep(rownames(mat), times = ncol(mat)),
                 to = rep(colnames(mat), each = nrow(mat)),
                 value = as.vector(mat),
                 stringsAsFactors = FALSE)

grid.col <- "black"

circos.par(gap.after = c("S1" = 5, "S2" = 15, "S3" = 35, "E1" = 25, "E2" = 25,
                         "E3" = 15, "E4" = 5, "E5" = 5, "E6" = 15))

# Set all colors to black and remove text
png(file = "icons/icon_chord.png", width = 800, height = 800, bg="transparent")
chordDiagram(mat, big.gap = 30, grid.col = grid.col, transparency = 0, annotationTrack = NULL)
dev.off()
