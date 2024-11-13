import { getScenerio, filterSubcat } from './DataManager';
import colorData from '../../components/GcamColors.json';

export const pal_green = ["#FFFFE5","#F7FCB9","#D9F0A3","#ADDD8E","#78C679","#41AB5D","#238443","#006837","#004529","#003300"]

export const getBarColors = (data, scenerio, year) => {
    let counter = 0;
    let subcatList = filterSubcat(getScenerio(data, scenerio));
    let colors = [];
    //console.log("!!!!!", data, subcatList);
    subcatList.forEach((param) => colors.push(getColorJson(param, counter++)));
    return colors;
}

export const getColorsFromPalette = (palette) => {
    let colors = [];
    switch(palette.toLowerCase()) {
        case "pal_16":
            colors = colorData.pal_16;
            break;
        case "pal_spectral":
            colors = colorData.pal_spectral;
            break;
        case "pal_basic":
            colors = colorData.pal_basic;
            break;
        case "pal_hot":
            colors = colorData.pal_hot;
            break;
        case "pal_wet":
            colors = colorData.pal_wet;
            break;
        case "pal_green":
            colors = colorData.pal_green;
            break;
        case "pal_div_wet":
            colors = colorData.pal_div_wet;
            break;
        case "pal_div_BlRd":
            colors = colorData.pal_div_BlRd;
            break;
        case "pal_div_RdBl":
            colors = colorData.pal_div_RdBl;
            break;
        case "pal_div_BrGn":
            colors = colorData.pal_div_BrGn;
            break;
        case "pal_div_GnBr":
            colors = colorData.pal_div_GnBr;
            break;
        case "pal_div_RdBlu":
            colors = colorData.pal_div_RdBlu;
            break;
        case "pal_div_BluRd":
            colors = colorData.pal_div_BluRd;
            break;
        case "pal_all":
            colors = colorData.pal_all;
            break;
        default:
            colors = colorData.pal_16;
            break;
    }
    return colors;
}

const getColorJson = (param, counter) => {
    param = param.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
    let color = "";
    Object.keys(colorData.pal_all).forEach((key) => {
        if( key === param) {
            color = colorData.pal_all[key];
        }
    });
    if (color === "") {
        color = colorData.pal_16[counter%16];
    }
    return color ;
}