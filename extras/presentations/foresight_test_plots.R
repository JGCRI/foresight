# Create example data for the line chart
years <- seq(2015, 2100, by = 5)
y1 <- rnorm(length(years), mean = 10, sd = 2)
y2 <- rnorm(length(years), mean = 15, sd = 3)

# Set up the plot with a dark theme
library(ggplot2)
p <- ggplot() +
  geom_line(aes(x = years, y = y1, color = "Scenario X")) +
  geom_line(aes(x = years, y = y2, color = "Scenario Y")) +
  scale_color_manual(values = c("Scenario X" = "red", "Scenario Y" = "blue")) +
  xlab("Year") +
  ylab("Runoff (mm)") +
  labs(title = NULL, color = NULL) +
  theme(plot.background = element_rect(fill = "black", color = NA),
        panel.background = element_rect(fill = "black", color = NA),
        plot.title = element_text(hjust = 0.5, color = "white"),
        axis.text = element_text(color = "white"),
        axis.title = element_text(color = "white"),
        legend.position = "top",
        legend.direction = "horizontal",
        legend.box = "horizontal",
        legend.box.just = "left",
        legend.margin = margin(t = -10, l = 0, b = 0, r = 0),
        legend.background = element_rect(fill = "black", color = NA),
        legend.text = element_text(color = "white"))

# Remove the gray background boxes from the legend symbols
p + guides(color = guide_legend(override.aes = list(fill = "white", alpha = 0.5)))

# Save the plot as a PNG file with a black background
ggsave("line_chart.png", plot = p, dpi = 300, width = 6, height = 4, units = "in")



# Bar chart
library(ggplot2)

# Create sample data
# Create sample data
df <- data.frame(Country = rep(c("USA", "China", "India", "Canada", "Mexico", "Brazil", "Australia", "Russia", "Japan", "France"), each = 8),
                 Scenario = rep(rep(c("Scenario X", "Scenario Y"), each = 4), 10),
                 Category = rep(c("Category 1", "Category 2", "Category 3", "Category 4"), 20),
                 Runoff = c(10, 20, 30, 40, 15, 25, 35, 45,
                            20, 30, 40, 50, 25, 35, 45, 55,
                            30, 40, 50, 60, 35, 45, 55, 65,
                            40, 50, 60, 70, 45, 55, 65, 75,
                            25, 35, 45, 55, 30, 40, 50, 60,
                            35, 45, 55, 65, 40, 50, 60, 70,
                            30, 40, 50, 60, 35, 45, 55, 65,
                            45, 55, 65, 75, 50, 60, 70, 80,
                            35, 45, 55, 65, 40, 50, 60, 70,
                            50, 60, 70, 80, 55, 65, 75, 85,
                            40, 50, 60, 70, 45, 55, 65, 75,
                            60, 70, 80, 90, 65, 75, 85, 95,
                            45, 55, 65, 75, 50, 60, 70, 80,
                            70, 80, 90, 100, 75, 85, 95, 105,
                            50, 60, 70, 80, 55, 65, 75, 85,
                            75, 85, 95, 105, 80, 90, 100, 110,
                            55, 65, 75, 85, 60, 70, 80, 90,
                            80, 90, 100, 110, 85, 95, 105, 115,
                            60, 70, 80, 90, 65, 75, 85, 95,
                            90, 100, 110, 120, 95, 105, 115, 125))


# Define colors for each category
colors <- c("#a6cee3", "#b2df8a", "#fb9a99", "#fdbf6f")

# Create the plot
ggplot(df, aes(x = Runoff, y = Country, fill = Category)) +
  geom_bar(stat = "identity", position = "stack", alpha = 0.5) +
  facet_wrap(~ Scenario, ncol = 2, scales = "free_y") +
  scale_fill_manual(values = colors) +
  labs(x = "Yield (ton)", y = NULL) +
  theme_dark() +
  theme(plot.background = element_rect(fill = "black", color = NA),
        panel.background = element_rect(fill = "black", color = NA),
        legend.position = "top",
        legend.title = element_blank(),
        legend.background = element_rect(fill = "transparent"),
        legend.key = element_blank(),
        axis.line.y = element_blank(),
        axis.text.y = element_text(color = "white"),
        axis.ticks.y = element_blank(),
        strip.background = element_rect(fill = "black"),
        strip.text = element_text(color = "white"),
        legend.text = element_text(color = "white"))

# Save the plot as a PNG file with a black background
ggsave("stacked_bar_chart.png", dpi = 300, width = 6, height = 4, units = "in", bg = "black")
