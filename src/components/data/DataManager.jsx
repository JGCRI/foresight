import { getColorsFromPalette } from "./GcamColors";
import { BAR_COUNTRIES } from "./Scenarios";

/**
 * Filters a dataset by the specified parameter.
 * 
 * @param {object[]} data - The dataset to filter.
 * @param {string} param - The parameter to filter by.
 * @returns {object[]} The filtered dataset.
 */
export const getParam = (data, param) => data.filter(item => item.param === param);

/**
 * Filters a dataset by the specified subcategory.
 * 
 * @param {object[]} data - The dataset to filter.
 * @param {string} subcat - The subcategory to filter by.
 * @returns {object[]} The filtered dataset.
 */
export const getSubcat = (data, subcat) => data.filter(item => item.class === subcat);

/**
 * Filters a dataset by the specified region.
 * 
 * @param {object[]} data - The dataset to filter.
 * @param {string} region - The region to filter by.
 * @returns {object[]} The filtered dataset.
 */
export const getRegion = (data, region) => data.filter(item => item.region === region);

/**
 * Filters a dataset by the specified scenario.
 * 
 * @param {object[]} data - The dataset to filter.
 * @param {string} scenario - The scenario to filter by.
 * @returns {object[]} The filtered dataset.
 */
export const getScenerio = (data, scenario) => data.filter(item => item.scenario === scenario);

/**
 * Filters a dataset by two specified scenarios.
 * 
 * @param {object[]} data - The dataset to filter.
 * @param {string} scenario1 - The first scenario to filter by.
 * @param {string} scenario2 - The second scenario to filter by.
 * @returns {object[]} The filtered dataset sorted by date.
 */
export const getScenerios = (data, scenario1, scenario2) => data.filter(item => item.scenario === scenario1 || item.scenario === scenario2).sort((a, b) => a.x - b.x);

/**
 * Returns the sums of the positive values of a dataset given a scenario.
 * 
 * @param {object[]} data - The dataset to filter.
 * @param {string} scenario - The parameter to filter by.
 * @returns {object[]} The filtered dataset.
 */
export const getDataPosSum = (data, scenario) => getScenerio(data, scenario).reduce((sum, obj) => {
    return obj.value > 0 ? sum + obj.value : sum;
  }, 0);

/**
 * Gets the units of a parameter for dashboard display.
 * 
 * @param {object[]} data - The dataset to search.
 * @param {string} param - The parameter to find units for.
 * @returns {string} The units of the parameter.
 */
export const getUnits = (data, param) => {
    const item = data.find(item => item.param === param);
    if (item) {
        return item.units;
    }
    return "";
}


/**
 * Checks if a parameter is valid in the dataset.
 * 
 * @param {object[]} data - The dataset to check.
 * @param {string} param - The parameter to check.
 * @returns {boolean} True if the parameter is valid, false otherwise.
 */
export const isValidParam = (data, param) => data.some(item => item.param === param);

/**
 * Checks if multiple parameters are valid in the dataset.
 * 
 * @param {object[]} data - The dataset to check.
 * @param {string[]} params - The parameters to check.
 * @returns {boolean} True if the parameters are valid, false otherwise.
 */
export const isValidParams = (data, params) => data.some(item => params.includes(item.param));

/**
 * Checks if a list of scenarios is valid in the dataset.
 * 
 * @param {object[]} list - The list of scenarios to check.
 * @param {object[]} objectList - The list of valid scenario objects.
 * @returns {boolean} True if all scenarios are valid, false otherwise.
 */
export const isValidFromObject = (list, objectList) => list.every(scenario => objectList.some(scenarioObj => scenarioObj.title === scenario));

/**
 * Gets the first parameter in the dataset.
 * 
 * @param {object[]} data - The dataset to search.
 * @returns {string} The first parameter or an error message.
 */
export const getFirstParam = (data) => (data[0]?.param || "ERROR: NO PARAMETERS");

/**
 * Checks if a date is valid for the parameter in the dataset.
 * 
 * @param {object[]} data - The dataset to check.
 * @param {number} date - The date to check.
 * @returns {boolean} True if the date is valid, false otherwise.
 */
export const isValidDate = (data, date) => data.some(item => Number(item.x) === date);


/**
 * Filters a dataset between two provided dates.
 * 
 * @param {object[]} data - The dataset to filter.
 * @param {number} start - The start date.
 * @param {number} end - The end date.
 * @returns {Object[]} The filtered dataset.
 */
export const filterDateRange = (data, start, end) => data.filter(item => item.x >= start && item.x <= end);

/**
 * Returns the first date in the dataset.
 * 
 * @param {object[]} data - The dataset to search.
 * @returns {Date} The first date.
 */
export const getFirstDate = (data) => new Date(Number(data[0]?.x || 0));

/**
 * Returns the last date in the dataset.
 * 
 * @param {object[]} data - The dataset to search.
 * @returns {Date} The last date.
 */
export const getLastDate = (data) => new Date(Number(data[data.length - 1]?.x || 0));

/**
 * Gets the data value for a specific scenario, parameter, and date.
 * 
 * @param {object[]} data - The dataset to search.
 * @param {string} scenario - The scenario to search for.
 * @param {string} param - The parameter to search for.
 * @param {number} date - The date to search for.
 * @returns {number} The data value.
 */
export const getDataDate = (data, scenario, param, date) => {
    const item = data.find(row => Number(row.x) === parseInt(date) && row.scenario === scenario && row.param === param);
    return item ? item.value : 0;
}

/**
 * Finds the units by title in an object array.
 * 
 * @param {object[]} objectsArray - The array of objects to search.
 * @param {string} titleToFind - The title to search for.
 * @returns {string} The units or an error message.
 */
export const findUnitsByTitle = (objectsArray, titleToFind) => {
    if(!Array.isArray(objectsArray)) return "Loading...";
    const foundObject = objectsArray.find(obj => obj.title === titleToFind);
    //console.log(foundObject)
    return foundObject ? foundObject.units : "Loading...";
}

/**
 * Checks if a date is present in all parameters in the dataset.
 * 
 * @param {object[]} data - The dataset to check.
 * @param {object[]} params - The parameters to check.
 * @param {number} date - The date to check.
 * @returns {boolean} True if the date is present in all parameters, false otherwise.
 */
export const dateInAllParams = (data, params, date) => {
    params.forEach((param) => {
        if (data.filter(item => item.param === param && Number(item.x) === date).length === 0)
            return false;
    })
    return true;
}

/**
 * Finds the closest date to the target date in the dataset for all parameters.
 * 
 * @param {object[]} data - The dataset to search.
 * @param {object[]} params - The parameters to search.
 * @param {number} targetDate - The target date.
 * @returns {number} The closest date.
 */
export const findClosestDateAllParamsAbove = (data, params, targetDate) => {
    if (data.length === 0) return -1;
    //console.log(data, params);
    let firstParamData = data.filter(item => item.param === params[0]);
    const closest = firstParamData.reduce((prev, curr) => {
        return (Math.abs(Number(curr.x) - targetDate) < Math.abs(Number(prev.x) - targetDate) && dateInAllParams(data, params, Number(curr.x))) ? curr : prev;
    });
    return closest ? closest.x : -1
};

/**
 * Finds the closest date to the target date in the dataset.
 * 
 * @param {object[]} data - The dataset to search.
 * @param {number} targetDate - The target date.
 * @returns {number} The closest date.
 */
export const findClosestDate = (data, targetDate) => {
    if (!Array.isArray(data)) return -1;
    const closest = data.reduce((prev, curr) => {
        return (Math.abs(Number(curr.x) - targetDate) < Math.abs(Number(prev.x) - targetDate)) ? curr : prev;
    });
    return closest ? closest.x : -1
}

/**
 * Gets the percentage change for gauges.
 * 
 * @param {object[]} data - The dataset to search.
 * @param {string} scenario - The scenario to search for.
 * @param {string} param - The parameter to search for.
 * @param {number} start - The start date.
 * @param {number} end - The end date.
 * @returns {number} The percentage change.
 */
export const getGuage = (data, scenario, param, start, end) => {
    //console.log(data, scenario, param);
    if (data.length === 0) return -1; // Check for invalid data.
    const reducedData = data.filter(row => row.scenario === scenario && row.param === param);
    if (reducedData.length === 0) return -1; // Check to make sure the parameter exists.
    const startData = getDataDate(reducedData, scenario, param, findClosestDate(reducedData, Number(start)));
    const endData = getDataDate(reducedData, scenario, param, findClosestDate(reducedData, Number(end)));
    const change = startData !== 0 ? (((endData - startData) / startData) * 100) : -1;
    //console.log("START: " + start, "END: " + end, "REV START: " + findClosestDate(reducedData, start), "REV END: " + findClosestDate(reducedData, end));
    //console.log("START DATA: " + startData, "END DATA: " + endData);
    //console.log("MATH DATA: " + change);
    return Math.round(change);
}

/**
 * Gets the most aggregated dataset for a specific date, region, and subcategory.
 * 
 * @param {object[]} data - Unaggregated Dataset.
 * @param {object[]} dataaggr - Aggregated dataset by region.
 * @param {object[]} dataaggs - Aggregated dataset by subcategory.
 * @param {object[]} dataaggrs - Aggregated dataset by region and subcategory.
 * @param {string} date - The date to search for.
 * @param {string} region - The region to search for.
 * @param {string} subcat - The subcategory to search for.
 * @returns {Object[]} The dataset.
 */
export const getDataset = (data, dataaggr, dataaggs, dataaggrs, date, region, subcat) => {
    return subcat === "" ? (region === "" ? dataaggrs : dataaggs) : (region === "" ? dataaggr : data);
}

/**
 * Gets the individual data point for a specific date, region, subcategory, and scenario.
 * 
 * @param {object[]} datad - Unaggregated Dataset.
 * @param {object[]} dataaggr - Aggregated dataset by region.
 * @param {object[]} dataaggs - Aggregated dataset by subcategory.
 * @param {object[]} dataaggrs - Aggregated dataset by region and subcategory.
 * @param {number} date - The date to search for.
 * @param {string} region - The region to search for.
 * @param {string} subcat - The subcategory to search for.
 * @param {string} scenario - The scenario to search for.
 * @returns {number} The data value.
 */
export const getDataPoint = (datad, dataaggr, dataaggs, dataaggrs, date, region, subcat, scenario) => {
    let data = getDataset(datad, dataaggr, dataaggs, dataaggrs, date, region, subcat);
    let item = data.find(row => Number(row.x) === Number(date) && row.scenario === scenario && (region === "" || row.region === region) && (subcat === "" || row.subcat === subcat));
    return item ? item.value : "0";
}

/**
 * Gets the largest value from a dataset for choropleth shading.
 * 
 * @param {object[]} data - The dataset to search.
 * @returns {number} The largest value.
 */
export const getLargestChoropleth = (data) => data.reduce((max, item) => Math.max(max, item.value), 0);

/**
 * Gets the smallest value from a dataset for choropleth shading.
 * 
 * @param {object[]} data - The dataset to search.
 * @returns {number} The smallest value.
 */
export const getSmallestChoropleth = (data) => data.reduce((min, item) => Math.min(min, item.value), data[0].value);

/**
 * Gets the value for a choropleth region with the specified ID.
 * 
 * @param {object[]} data - The dataset to search.
 * @param {string} id - The ID of the region.
 * @returns {number} The value of the region.
 */
export const getChoroplethValue = (data, id) => {
    const item = data.find(item => item.id === id);
    return item ? item.value : 0;
}

/**
 * Reduces the dataset by region and sorts it by the 'x' property.
 * 
 * @param {object[]} data - The dataset to reduce.
 * @param {string} region - The region to filter by.
 */
export const reduceRegion = (data, region) => {
    data.filter(item => item.region === region).sort((a, b) => a.x - b.x);
}

/**
 * Creates a list of all subcategories for the dataset.
 * 
 * @param {object[]} data - The dataset to filter.
 * @returns {Object[]} The list of subcategories.
 */
export const filterSubcat = (data) => {
    const reducedData = [...new Set(data.map(item => item.class))];
    reducedData.sort();
    return reducedData;
}

/**
 * Reduces the dataset by subcategory and sorts it by date.
 * 
 * @param {object[]} data - The dataset to reduce.
 * @param {string} subcat - The subcategory to filter by.
 * @returns {Object[]} The reduced dataset.
 */
export const reduceSubcat = (data, subcat) => {
    const reducedData = data.filter(item => item.class === subcat);
    reducedData.sort((a, b) => a.x - b.x);
    return reducedData;
}

/**
 * Filters the dataset by a list of countries.
 * 
 * @param {string[]} countries - The list of countries to filter by.
 * @param {object[]} data - The dataset to filter.
 * @returns {Object[]} The filtered dataset.
 */
export const getRegions = (countries, data) => {
    return data.filter(item => countries.includes(item.region));
}

/**
 * Filters and sorts the dataset by a list of countries.
 * 
 * @param {string[]} countries - The list of countries to filter by.
 * @param {object[]} data - The dataset to filter.
 * @returns {Object[]} The sorted list of regions.
 */
export const getRegionsSorted = (countries, data) => {
    let newdata = data.filter(item => countries.includes(item.region));
    newdata.sort((a, b) => a.value - b.value);
    return [...new Set(newdata.map(item => item.region))];
}

/**
 * Creates a list of the top x regions for the dataset where x is set by BAR_COUNTRIES in Scenarios.
 * 
 * @param {object[]} data - The dataset to filter.
 * @returns {Object[]} The list of regions.
 */
export const filterRegion = (data) => {
    data.sort((a, b) => b.value - a.value);
    data = data.slice(0, BAR_COUNTRIES);
    data.sort((a, b) => a.value - b.value);
    const reducedData = [...new Set(data.map(item => item.region))];
    return reducedData;
}

/**
 * Lists all regions in the dataset.
 * 
 * @param {object[]} data - The dataset to filter.
 * @returns {Object[]} The list of regions.
 */
export const listRegions = (data) => {
    return Array.from(new Set(data.map(item => item.region)));
}

/**
 * Gets the color values for a choropleth.
 * 
 * @param {string} color - The color palette.
 * @param {number} number - The color number.
 * @param {number} n - The total number of colors.
 * @returns {string} The color value.
 */
function getColorValues(color, number, n) {
    const colors = getColorsFromPalette(color);
    return colors[Math.floor(((Object.keys(colors).length - 1) / n) * (n - number))];
}

/**
 * Gets the scale values for a choropleth.
 * 
 * @param {string} choroplethColorPalette - The color palette.
 * @param {string} choroplethInterpolation - The interpolation method.
 * @param {number} divisions - The number of divisions.
 * @param {number} value - The value to scale.
 * @param {number} placement - The placement in the dataset.
 * @param {number} dataLength - The length of the dataset.
 * @param {boolean} negative - Whether the dataset is comprised solely of negative values.
 * @returns {string} The color value.
 */
function getScaleValuesTest(choroplethColorPalette, choroplethInterpolation, divisions, value, placement, dataLength, negative) {
    let bracket = 0;
    switch (choroplethInterpolation) {
        case "VALUE - LINEAR":
            bracket = Math.round((1 - value) * (divisions - 1));
            break;
        case "VALUE - LOG":
            bracket = divisions - Math.round(divisions * (-1 * Math.exp(-5 * (value)) + 1));
            break;
        case "VALUE - CUBIC":
            bracket = Math.round(((1 - value) ** 3) * (divisions - 1));
            break;
        case "DATA - EQUAL":
            bracket = Math.round((placement / dataLength) * divisions);
            break;
        case "DATA - SIGMOID":
            bracket = Math.round(divisions / (1 + Math.exp(-10 * (placement / dataLength) + 5)));
            break;
        default:
            bracket = divisions - Math.round(divisions * (-1 * Math.exp(-5 * (value)) + 1));
            break;
    }
    if (negative)
        bracket = divisions - bracket;
    return getColorValues(choroplethColorPalette, Math.min(Math.abs(bracket), divisions), divisions);
}

/**
 * Gets the relative data value for a country.
 * 
 * @param {number} countryValue - The value for the country.
 * @param {object[]} data - The dataset to compare.
 * @returns {number} The relative data value.
 */
function getRelativeDataValue(countryValue, data) {
    if (data.length === 0) return -1;
    if (data.length === 1) return 1;
    return (countryValue - getSmallestChoropleth(data)) / (getLargestChoropleth(data) - getSmallestChoropleth(data))
}

/**
 * Gets the rank of a country in the dataset.
 * 
 * @param {object[]} data - The dataset to search.
 * @param {string} country - The country to find.
 * @returns {number} The rank of the country.
 */
function getRank(data, country) {
    let dataCopy = structuredClone(data)
    dataCopy.sort((a, b) => b.value - a.value);
    const index = dataCopy.findIndex(item => item.region === country);
    //console.log(index);
    return index !== -1 ? index + 1 : -1;
}

/**
 * Gets the color for a data value in a choropleth.
 * 
 * @param {string} choroplethColorPalette - The color palette.
 * @param {string} choroplethInterpolation - The interpolation method.
 * @param {number} divisions - The number of divisions.
 * @param {number} value - The data value.
 * @param {object[]} data - The dataset to compare.
 * @param {string} country - The country to find.
 * @returns {string} The color value.
 */
function getDataColor(choroplethColorPalette, choroplethInterpolation, divisions, value, data, country) {
    return value ? getScaleValuesTest(choroplethColorPalette, choroplethInterpolation, 
        divisions, getRelativeDataValue(value, data), getRank(data, country), 
        Object.keys(data).length, Math.max(...(data.map(obj => obj.value))) < 0) : "#333333";
}

/**
 * Reduces the dataset for choropleth visualization.
 * 
 * @param {string} choroplethColorPalette - The color palette.
 * @param {string} choroplethInterpolation - The interpolation method.
 * @param {number} divisions - The number of divisions.
 * @param {object[]} data - The dataset to reduce.
 * @param {string} scenario - The scenario to filter by.
 * @returns {Object[]} The reduced dataset.
 */
export const choroplethReduce = (choroplethColorPalette, choroplethInterpolation, divisions, data, scenario) => {
    //console.log(data)
    const reducedData = getScenerio(data, scenario).map(item => ({
        id: item.region,
        value: item.value,
        color: getDataColor(choroplethColorPalette, choroplethInterpolation, divisions, item.value, data, item.region)
    }));
    return reducedData;
};

/**
 * Gets the total bar data for the specified parameters and scenarios.
 * 
 * @param {object[]} data - The dataset to search.
 * @param {string} param - The parameter to search for.
 * @param {object[]} scenarios - The list of scenarios.
 * @returns {Object[]} The total bar data.
 */
export const getBarTotal = (data, param, scenarios) => {
    let ans = [];
    for (let i = 0; i < scenarios.length; i++) {
        ans.push({
            id: scenarios.at(i).title,
            data: getBarHorizontal(data, param)
        })
    }
    return ans;
}

/**
 * Gets the horizontal bar data for the specified countries and scenario.
 * 
 * @param {object[]} countries - The list of countries.
 * @param {object[]} data - The dataset to search.
 * @param {string} scenario - The scenario to search for.
 * @returns {object[]} The horizontal bar data.
 */
export const getBarHorizontal = (countries, data, scenerio) => {
    let output = [];
    let barData = getScenerio(data, scenerio);
    let subcatList = filterSubcat(barData);
    subcatList.sort((a, b) => a.toLowerCase() - b.toLowerCase());
    //console.log(subcatList);
    for (let i = 0; i < countries.length; i++) {
        let countryData = getRegion(barData, countries[i]);
        let obj = {
            "country": countries[i]
        };
        for (let j = 0; j < subcatList.length; j++) {
            if (getSubcat(countryData, subcatList.at(j)).length > 0)
                obj[subcatList[j]] = parseFloat(getSubcat(countryData, subcatList.at(j)).at(0).value);
            else
                obj[subcatList[j]] = 0;
        }
        output.push(obj);
    }
    return output
}

/**
 * Gets the global horizontal bar data for the specified  scenario.
 * 
 * @param {object[]} data - The dataset to search.
 * @param {string} scenario - The scenario to search for.
 * @returns {object[]} The horizontal bar data.
 */
export const getGlobalBarHorizontal = (data, scenerio) => {
    let output = [];
    let barData = getScenerio(data, scenerio);
    let subcatList = filterSubcat(barData);
    subcatList.sort((a, b) => a.toLowerCase() - b.toLowerCase());
    let obj = {
        "country": "Global"
    };
    for (let j = 0; j < subcatList.length; j++) {
        obj[subcatList[j]] = parseFloat(getSubcat(barData, subcatList.at(j)).at(0).value);
    }
    output.push(obj);
    return output
}

/**
 * Creates the dataset needed for line graph visualization.
 * 
 * @param {object[]} data - The dataset to reduce.
 * @param {string} param - The parameter to filter by.
 * @param {object[]} scenarios - The list of scenarios.
 * @param {string} subcat - The subcategory to filter by.
 * @returns {object[]} The reduced dataset.
 */
export const lineGraphReduce = (data, param, scenarios, subcat) =>
    scenarios.map(scenario => ({
        id: scenario.title,
        data: getLineGraphReduce(getScenerio(data, scenario.title), param, subcat)
    }));

/**
 * Reduces the dataset to the format required for the line graph.
 * 
 * @param {object[]} data - The dataset to reduce.
 * @param {string} param - The parameter to filter by.
 * @param {string} subcat - The subcategory to filter by.
 * @returns {object[]} The reduced dataset in line graph format.
 */
export const getLineGraphReduce = (data, param, subcat) => {
    if (param === "landAlloc" && subcat === "") {
        return data.map(item => ({
            x: parseFloat(item.x),
            y: parseInt(item.value)
        }));
    }
    return data.map(item => ({
        x: parseFloat(item.x),
        y: item.value
    }));
}