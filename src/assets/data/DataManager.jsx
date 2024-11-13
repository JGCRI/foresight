// getParam is a filtering fucntion that removes all entries
// in a dataset without the specified param. Two inputs are given,
// the dataset to modify and the param to filter by. The modified
// dataset is returned.
export const getParam = (data, param) => data.filter(item => item.param === param);

// getSubcat filters a dataset by subcategory. Two inputs are given,
// the dataset to modify and the subcat to filter by. The modified
// dataset is returned.
export const getSubcat = (data, subcat) => data.filter(item => item.class === subcat);

// getRegion filters a dataset by region. Two inputs are given,
// the dataset to modify and the region to filter by. The modified
// dataset is returned.
export const getRegion = (data, region) => data.filter(item => item.region === region);

// getRegion filters a dataset by scenerio. Two inputs are given,
// the dataset to modify and the scenerio to filter by. The modified
// dataset is returned.
export const getScenerio = (data, scenario) => data.filter(item => item.scenario === scenario);

//Same as above but for two scenerios. Useful for visualizations.
export const getScenerios = (data, scenario1, scenario2) => data.filter(item => item.scenario === scenario1 || item.scenario === scenario2).sort((a, b) => a.x - b.x);

//Gets the units of a parameter for dashboard display
export const getUnits = (data, param) => {
    const item = data.find(item => item.param === param);
    if (item) {
        return item.units;
    }
    return "";
};


// isValidDate takes in a year and determines if it is a valid date for the parameter in the dataset.
// This is used in DashboardDate to grey out dates not available in the dataset and to determine if
// the URL is valid.
export const isValidParam = (data, param) => data.some(item => item.param === param);

export const isValidParams = (data, params) => data.some(item => params.includes(item.param));

export const isValidFromObject = (list, objectList) => list.every(scenario => objectList.some(scenarioObj => scenarioObj.title === scenario));


export const getFirstParam = (data) => (data[0]?.param || "ERROR: NO PARAMETERS");

// isValidDate takes in a year and determines if it is a valid date for the parameter in the dataset.
// This is used in DashboardDate to grey out dates not available in the dataset and to determine if
// the URL is valid.
export const isValidDate = (data, date) => data.some(item => item.x.toString() === date.toString());


// filterDateRange filters a dataset between two provided dates. Three inputs
// are given, the dataset to modify and the dates to filter by. This is used for guages.
export const filterDateRange = (data, start, end) => data.filter(item => item.x.toString() >= start.toString() && item.x.toString() <= end.toString());

//Returns the first date in the Dataset. Used for default dateranges in the dashboard.
export const getFirstDate = (data) => new Date(parseInt(data[0]?.x) || 0);

//Returns the last date in the Dataset. Used for default dateranges in the dashboard.
export const getLastDate = (data) => new Date(parseInt(data[data.length - 1]?.x) || 0);

export const getDataDate = (data, scenario, param, date) => {
    const item = data.find(row => row.x.toString() === date.toString() && row.scenario === scenario && row.param === param);
    return item ? parseInt(item.value) : 0;
};

//Given an object array, return the units given the matching title. For store guages.
export const findUnitsByTitle = (objectsArray, titleToFind) => {
    const foundObject = objectsArray.find(obj => obj.title === titleToFind);
    return foundObject ? foundObject.units : "ERROR";
};

//Finds the closest date to the selected date in the dataset if there is no index with the specified date.
export const findClosestDate = (data, targetDate) => {
    if(data.length === 0) return -1; 
    const closest = data.reduce((prev, curr) => {
        return (Math.abs(parseInt(curr.x) - targetDate) < Math.abs(parseInt(prev.x) - targetDate)) ? curr : prev;
    });
    return closest ? closest.x : -1
};

export const dateInAllParams = (data, params, date) => {
    params.forEach((param) => {
        if(data.filter(item => item.param === param && item.x === date).length === 0)
            return false;
    })
    return true;
}

export const findClosestDateAllParamsAbove = (data, params, targetDate) => {
    if(data.length === 0) return -1; 
    //console.log(data, params);
    let firstParamData = data.filter(item => item.param === params[0]);
    const closest = firstParamData.reduce((prev, curr) => {
        return (Math.abs(parseInt(curr.x) - targetDate) < Math.abs(parseInt(prev.x) - targetDate) && dateInAllParams(data, params, curr.x)) ? curr : prev;
    });
    return closest ? closest.x : -1
};

export const findClosestDateAllParamsBelow = (data, params, targetDate) => {
    let date = -Infinity;
    params.forEach((param) => {date = Math.max(date, findClosestDate(data.filter(item => item.param === param), targetDate))});
    return date;
};

// Gets the percentage for guages
export const getGuage = (data, scenario, param, start, end) => {
    //console.log(data, scenario, param);
    if (data.length === 0) return -1; // Check for invalid data.
    const reducedData = data.filter(row => row.scenario === scenario && row.param === param);
    //console.log(reducedData);
    if (reducedData.length === 0) return -1; // Check to make sure the parameter exists.
    const startData = getDataDate(reducedData, scenario, param, findClosestDate(reducedData, start));
    const endData = getDataDate(reducedData, scenario, param, findClosestDate(reducedData, end));
    const change = startData !== 0 ? (((endData - startData) / startData) * 100) : -1;
    //console.log("START: " + start, "END: " + end, "REV START: " + findClosestDate(reducedData, start), "REV END: " + findClosestDate(reducedData, end));
    //console.log("START DATA: " + startData, "END DATA: " + endData);
    //console.log("MATH DATA: " + change);
    return Math.round(change);
};

// Gets value selected for display
export const getDataset = (data, dataaggr, dataaggs, dataaggrs, date, region, subcat) => {
    return subcat === "" ? (region === "" ? dataaggrs : dataaggs) : (region === "" ? dataaggr : data);
};

// Gets the individual value from the dtat given the date, region, subcat, and scenerio.
export const getDataPoint = (datad, dataaggr, dataaggs, dataaggrs, date, region, subcat, scenario) => {
    let data = getDataset(datad, dataaggr, dataaggs, dataaggrs, date, region, subcat);
    let item = data.find(row => row.x === date && row.scenario === scenario && (region === "" || row.region === region) && (subcat === "" || row.subcat === subcat));
    return item ? item.value : "0";
};

// getLargestChoropleth gets the largest value from a dataset to calculate the shading
// for the Choropleth map. Takes in an already choropleth formated dataset.
export const getLargestChoropleth = (data) => data.reduce((max, item) => Math.max(max, item.value), 0);

// getSmallestChoropleth gets the smallest value from a dataset to calculate the shading
// for the Choropleth map. Takes in an already choropleth formated dataset.
export const getSmallestChoropleth = (data) => {
    if(data.length > 0 && Object.hasOwn(data[0], "value"))
        return data.reduce((min, item) => Math.min(min, (item.value) ? (item.value) : (-1)), data[0].value);
    return -1;
};

// getChoroplethValue gets the value for a choropleth region with the id given by id.
export const getChoroplethValue = (data, id) => {
    //console.log(data, id);
    const item = data.find(item => item.id === id);
    return item ? item.value : 0;
};

export const reduceRegion = (data, region) => {
    data.filter(item => item.region === region).sort((a, b) => a.x - b.x);
};

// filterSubcat creates a list of all subcategories for the
// data given. This data should be in the form of an already
// param filtered array.
//
// NOTE: This function may have unexpected results if params
// have not been previously filtered.
export const filterSubcat = (data) => {
    const reducedData = [...new Set(data.map(item => item.class))];
    reducedData.sort();
    return reducedData;
};

export const reduceSubcat = (data, subcat) => {
    const reducedData = data.filter(item => item.class === subcat);
    reducedData.sort((a, b) => a.x - b.x);
    return reducedData;
};

export const getRegions = (countries, data) => {
    return data.filter(item => countries.includes(item.region));
};

export const getRegionsSorted = (countries, data) => {
    let newdata = data.filter(item => countries.includes(item.region));
    newdata.sort((a, b) => a.value - b.value);
    return [...new Set(newdata.map(item => item.region))];
};
// filterRegion creates a list of all regions for the
// data given. This data does not be in the form of an already
// param filtered array.
export const filterRegion = (data) => {
    data.sort((a, b) => b.value - a.value);
    data = data.slice(0, 10);
    data.sort((a, b) => a.value - b.value);
    const reducedData = [...new Set(data.map(item => item.region))];
    return reducedData;
};

export const listRegions = (data) => {
    return Array.from(new Set(data.map(item => item.region)));
};

export const getBasinAggregate = (data, basinAggregate) => {
    if(basinAggregate === 'BasinRegion' || !data || !data.at(0) || !data.at(0).region || !data.at(0).region.split('|')) return data;
    if(basinAggregate === 'Region') return(data.reduce((acc, item) => {
        const region = item.region.split('|')[0];
        let regionObj = item.class ? acc.find(obj => obj.region === region && obj.class === item.class && obj.scenario === item.scenario) : acc.find(obj => obj.region === region && obj.scenario === item.scenario);
        if (!regionObj) {
            regionObj = { ...item, region: region, value: 0 };
            acc.push(regionObj);
        }
        regionObj.value += item.value;
        return acc;
    }, []));
    if(basinAggregate === 'Basin') return(data.reduce((acc, item) => {
        const basin = item.region.split('|')[1];
        let basinObj = item.class ? acc.find(obj => obj.region === basin && obj.class === item.class && obj.scenario === item.scenario) : acc.find(obj => obj.region === basin && obj.scenario === item.scenario);
        if (!basinObj) {
            basinObj = { ...item, region: basin, value: 0 };
            acc.push(basinObj);
        }
        basinObj.value += item.value;
        return acc;
    }, []));
    if(basinAggregate === 'Global') return(data.reduce((acc, item) => {
        let foundClass = acc.find(obj => obj.class === item.class && obj.scenario === item.scenario);
        if (!foundClass || !acc || acc.length < 1) {
            let dataObj = { ...item, region: 'global', value: 0 };
            acc.push(dataObj);
        }
        else
            acc.at(0).value += item.value;
        return acc;
    }, []));
    return data;
}

export const getNoSubcatChoropleth = (data) => {
    //console.log("!!! LOAD CHOROPLETH");
    let reducedData = [];
    for (let i = 0; i < data.length; i++) {
        reducedData.push({
            id: data.at(i).region,
            value: data.at(i).value
        });
    }
    return reducedData;
};

export const getBarTotal = (data, param, scenarios) => {
    let ans = [];
    for (let i = 0; i < scenarios.length; i++) {
        ans.push({
            id: scenarios.at(i).title,
            data: getBarHorizontal(data, param)
        })
    }
    return ans;
};

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
};

export const lineGraphReduce = (data, param, scenarios, subcat) => {
    data.sort((a, b) => a.x - b.x);
    let scenarioSet = [...scenarios.values()];
    //console.log(scenarioSet)
    return Array.from(scenarioSet).map((scenario) => ({
        id: scenario.title,
        data: getLineGraphReduce(getScenerio(data, scenario.title), param, subcat)
    }))
};

export const getLineGraphReduce = (data, param, subcat) => {
    if (param === "landAlloc" && subcat === "Aggregate of Subsectors") {
        return data.map((item) => ({
            x: parseFloat(item.x),
            y: parseInt(item.value)
        }));
    }
    return data.map((item) => ({
        x: parseFloat(item.x),
        y: item.value
    }));
};

export const choroplethReduce = (data, scenario, basinAggregation) => getNoSubcatChoropleth(getBasinAggregate(getScenerio(data, scenario), basinAggregation));