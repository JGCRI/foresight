import { getDates, getScenerio, filterSubcat } from '../assets/data/DataManager';

export const pal_green = ["#FFFFE5","#F7FCB9","#D9F0A3","#ADDD8E","#78C679","#41AB5D","#238443","#006837","#004529","#003300"]

export const getBarColors = (data, scenerio, year) => {
    let subcatList = filterSubcat(getDates(getScenerio(data, scenerio), year));
    let colors = [];
    subcatList.forEach((param) => colors.push(getColor(param)));
    return colors;
}

const getColor = (param) => {
    let color = "";
    switch(param.toLowerCase()) {
        case "biomass":
            color = "#006314"
            break;
        case "biomass css":
            color = "#88c892"
            break;
        case "coal":
            color = "#333333"
            break;
        case "coal css":
            color = "#666666"
            break;
        case "gas":
            color = "#00bfff"
            break;
        case "gas css":
            color = "#97ffff"
            break;
        case "geothermal":
            color = "#ad449c"
            break;
        case "grid_storage":
            color = "#a8a8a8"
            break;
        case "hydro":
            color = "#3d86f9"
            break;
        case "hydrogen":
            color = "#eecbad"
            break;
        case "nuclear":
            color = "#ef8e27"
            break;
        case "refined liquids":
            color = "#d01c2a"
            break;
        case "oil":
            color = "#d01c2a"
            break;
        case "oil css":
            color = "#f7988f"
            break;
        case "energy reduction":
            color = "#bebebe"
            break;
        case "rooftop pv":
            color = "#eee9bf"
            break;
        case "solar":
            color = "#fdfa28"
            break;
        case "wind":
            color = "#fdd67b"
            break;
        case "battery":
            color = "#92a75d"
            break;
        case "chp":
            color = "#507fab"
            break;
        case "agriculture":
            color = "#a2cd5a"
            break;
        case "electricity":
            color = "#e6e6fa"
            break;
        case "industry":
            color = "#cef4d1"
            break;
        case "livestock":
            color = "#eeb422"
            break;
        case "mining":
            color = "#bfbfbf"
            break;
        case "municipal":
            color = "#1e90ff"
            break;
        case "corn":
            color = "#cdad00"
            break;
        case "fibercrop":
            color = "#8b7500"
            break;
        case "fodder":
            color = "#698b69"
            break;
        case "forest":
            color = "#006400"
            break;
        case "grass":
            color = "#caff70"
            break;
        case "misccorp":
            color = "#8b4500"
            break;
        case "oilcrop":
            color = "#333333"
            break;
        case "other":
            color = "#b3b3b3"
            break;
        case "palmfruit":
            color = "#cd2626"
            break;
        case "pasture":
            color = "#ffc125"
            break;
        case "rice":
            color = "#5cacee"
            break;
        case "roottuber":
            color = "#9370db"
            break;
        case "shrub":
            color = "#8470ff"
            break;
        case "sugarcrop":
            color = "#eeee00"
            break;
        case "urban":
            color = "#ee6363"
            break;
        case "wheat":
            color = "#deb887"
            break;
        default:
            color = "#b3b3b3";
            break;
    }
    return color;
}