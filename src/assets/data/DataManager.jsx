// getParam is a filtering fucntion that removes all entries
// in a dataset without the specified param. Two inputs are given,
// the dataset to modify and the param to filter by. The modified
// dataset is returned.
export const getParam = (data, param) => {
    let reducedData = [];
    for(let i = 0; i < data.length; i++) {
        if(data.at(i).param === param) {
            reducedData.push(data.at(i));
        }
    }
    return reducedData;
}

// getSubcat filters a dataset by subcategory. Two inputs are given,
// the dataset to modify and the subcat to filter by. The modified
// dataset is returned.

export const getSubcat = (data, subcat) => {
    let reducedData = [];
    for(let i = 0; i < data.length; i++) {
        if(data.at(i).class === subcat) {
            reducedData.push(data.at(i));
        }
    }
    return reducedData;
}

// getRegion filters a dataset by region. Two inputs are given,
// the dataset to modify and the region to filter by. The modified
// dataset is returned.
export const getRegion = (data, region) => {
    let reducedData = [];
    for(let i = 0; i < data.length; i++) {
        if(data.at(i).region === region) {
            reducedData.push(data.at(i));
        }
    }
    return reducedData;
}

// getRegion filters a dataset by scenerio. Two inputs are given,
// the dataset to modify and the scenerio to filter by. The modified
// dataset is returned.
export const getScenerio = (data, scenario) => {
    let reducedData = [];
    for(let i = 0; i < data.length; i++) {
        if(data.at(i).scenario === scenario) {
            reducedData.push(data.at(i));
        }
    }
    return reducedData;
}

//Gets the units of a parameter for dashboard display
export const getUnits = (data, param) => {
    for(let i = 0; i < data.length; i++) {
        if(data.at(i).param === param) {
            return data.at(i).units;
        }
    }
    return "";
}
// filterDateRange filters a dataset between two provided dates. Three inputs
// are given, the dataset to modify and the dates to filter by. This is used for guages.
export const filterDateRange = (data, start, end) => {
    let reducedData = [];
    for(let i = 0; i < data.length; i++) {
        if(data.at(i).x >= start && data.at(i).x <= end) {
            reducedData.push(data.at(i));
        }
    }
    return reducedData;
}

// isValidDate takes in a year and determines if it is a valid date for the parameter in the dataset.
// This is uesed in DashboardDate to grey out dates not available in the dataset.

export const isValidDate = (data, date) => {
    for(let i = 0; i < data.length; i++) {
        if(data.at(i).x === date)
            return true;
    }
    return false;
}

//Returns the first date in the Dataset. Used for default dateranges in the dashboard.
export const getFirstDate = (data) => {
    for(let i = 0; i < data.length; i++) {
        return new Date(data.at(i).x);
    }
    return new Date(0);
}

//Returns the last date in the Dataset. Used for default dateranges in the dashboard.
export const getLastDate = (data) => {
    for(let i = data.length - 1; i >= 0; i--) {
        return new Date(data.at(i).x);
    }
    return new Date(0);
}

export const getDataDate = (data, scenerio, param, date) => {
    for(let i = 0; i < data.length; i++) {
        let row = data.at(i);
        if(row.x === parseInt(date) && row.scenario === scenerio && row.param === param)
            return row.value;
    }
    return 0;
}

// Gets the percentage for guages
export const getGuage = (data, scenerio, param, start, end) => {
    let initial = getDataDate(data, scenerio, param, start);
    if(initial !== 0)
        return Math.round((getDataDate(data, scenerio, param, end) - initial)/initial);
    return 0; 
}

// Gets value selected for display\
export const getDataset = (data, dataaggr, dataaggs, dataaggrs, date, region, subcat) => {
    if(subcat === ""){
        if(region === "")
            return dataaggrs;
        return dataaggs;
    }
    if(region === "")
        return dataaggr;
    return data;
}

export const getDataPoint = (datad, dataaggr, dataaggs, dataaggrs, date, region, subcat, scenario) => {
    let data = getDataset(datad, dataaggr, dataaggs, dataaggrs, date, region, subcat);
    for(let i = 0; i < data.length; i++) {
        let row = data.at(i);
        if(row.x === date && row.scenario === scenario && (region === "" || row.region === region) && (subcat === "" || row.subcat === subcat))
            return row.value;
    }
    return "0"
}
// getLargestChoropleth gets the largest value from a dataset to calculate the shading
// for the Choropleth map. Takes in an already choropleth formated dataset.
export const getLargestChoropleth = (data) => {
    let ans = 0;
    for(let i = 0; i < data.length; i++) {
        if(ans < data.at(i).value)
            ans = data.at(i).value;
    }
    return ans;
}

// getSmallestChoropleth gets the smallest value from a dataset to calculate the shading
// for the Choropleth map. Takes in an already choropleth formated dataset.
export const getSmallestChoropleth = (data) => {
    let ans = 0;
    if(data.length !== 0) {
        ans = data.at(0).value;
        for(let i = 0; i < data.length; i++) {
            if(ans > data.at(i).value)
                ans = data.at(i).value;
        }
    }
    return ans;
}

// getChoroplethValue gets the value for a choropleth region with the id given by id.
export const getChoroplethValue = (data, id) => {
    let ans = 0;
    for(let i = 0; i < data.length; i++) {
        if(id === data.at(i).id)
            ans = data.at(i).value;
    }
    return ans;
}

export const reduceRegion = (data, region) => {
    let reducedData = [];
    for(let i = 0; i < data.length; i++) {
        if(data.at(i).region === region) {
            reducedData.push(data.at(i));
        }   
    }
    reducedData.sort((a,b) => a.x - b.x);
    return reducedData;
}

// getDates aggregates data by summing all data with the same region.
// This results in an output where dates are merged and data is only
// sorted by region. This is useful for charts like the bar chart where
// dates are disregarded. 
//
// NOTE: Expect this function to change as date range functionality is added.
export const getDates = (data, year) => {
    let reducedData = [];
    for(let i = 0; i < data.length; i++) {
        if(data.at(i).x.toString() === year.toString() ) {
            reducedData.push(data.at(i));
        }   
    }
    return reducedData;
}

// filterSubcat creates a list of all subcategories for the
// data given. This data should be in the form of an already
// param filtered array.
//
// NOTE: This function may have unexpected results if params
// have not been previously filtered.
export const filterSubcat = (data) => {
    let reducedData = [];
    let flag;
    for(let i = 0; i < data.length; i++) {
        flag = 0;
        for(let j = 0; j < reducedData.length; j++) {
            if(data.at(i).class === reducedData[j]) {
                flag = 1;
            }
        }
        if(flag === 0)
            reducedData.push(data.at(i).class);
    }
    return reducedData;
}

export const reduceSubcat = (data, subcat) => {
    let reducedData = [];
    for(let i = 0; i < data.length; i++) {
        if(data.at(i).class === subcat) {
            reducedData.push(data.at(i));
        }   
    }
    reducedData.sort((a,b) => a.x - b.x);
    return reducedData;
}

export const getRegions = (countries, data) => {
    return data.filter(item => countries.includes(item.region));
}
// filterRegion creates a list of all regions for the
// data given. This data does not be in the form of an already
// param filtered array.
export const filterRegion = (data) => {
    let reducedData = [];
    let flag;
    //
    data.sort((a,b) => b.value - a.value);
    data = data.slice(0, 10);
    data.sort((a,b) => a.value - b.value);
    for(let i = 0; i < data.length; i++) {
        flag = 0;
        for(let j = 0; j < reducedData.length; j++) {
            if(data.at(i).region === reducedData[j]) {
                flag = 1;
            }
        }
        if(flag === 0)
            reducedData.push(data.at(i).region);
    }
    return reducedData;
}

export const listRegions = (data) => {
    return Array.from(new Set(data.map(item => item.region)));
}

export const getNoSubcatChoropleth = (data) => {
    let reducedData = [];
    for(let i = 0; i < data.length; i++) {
        reducedData.push({
            id: data.at(i).region,
            value: data.at(i).value
        });   
    }
    return reducedData;
}

export const getBarTotal = (data, param, scenarios) => {
    let ans = [];
    for(let i = 0; i < scenarios.length; i++) {
        ans.push({
            id: scenarios.at(i).title,
            data: getBarHorizontal(data, param)
        })
    }
    return ans;
}

export const getBarHorizontal = (countries, data, dataAgg, scenerio, param, year) => {
    console.log()
    let output = [];
    let barData = getDates(getScenerio(data, scenerio), year);
    let aggregates = getDates(getScenerio(dataAgg, scenerio), year);
    let subcatList = filterSubcat(barData);
    subcatList.sort()
    //console.log("SCENERIOS:", subcatList);
    let countryList = filterRegion(getRegions(countries, aggregates));
    for(let i = 0; i < countryList.length; i++) {
        let countryData = getRegion(barData, countryList[i], year);
        let obj = {
            "country": countryList[i]
        };
        for(let j = 0; j < subcatList.length; j++) {
            if(getSubcat(countryData, subcatList.at(j)).length > 0)
                obj[subcatList[j]] = parseFloat(getSubcat(countryData, subcatList.at(j)).at(0).value);
            else 
                obj[subcatList[j]] = 0;
        }
        output.push(obj);  
    }
    return output
}

export const lineGraphReduce = (data, param, scenerios, region, subcat, start, end) => {
    let output = []
    for (let i = 0; i < scenerios.length; i++) {
        let obj = {
            "id": scenerios.at(i).title,
            "data": getLineGraphReduce(getScenerio(data, scenerios.at(i).title)),
        }
        output.push(obj);
    }
    return output
}

export const getLineGraphReduce = (data) => {
    let reducedData = [];
    for(let i = 0; i < data.length; i++) {
        reducedData.push({
            "x": parseFloat(data.at(i).x),
            "y": data.at(i).value,
        });
    }
    return reducedData;
}

export const choroplethReduce = (data, scenario, param, year) => {
    let final = getDates(getScenerio(data, scenario), year);
    return getNoSubcatChoropleth(final);
}

export const processData = (aggNone, aggReg, aggSub, aggRegSub, scenario, param, region, subcat) => {
    let data = [];
    if(region === "Global") {
        if(subcat === "Aggregate of Subsectors") {  //Agg Subcat agg Region
            data = getParam(aggRegSub, param);
        }
        else  //Agg Region no agg Subcat
            data = getSubcat(getParam(aggReg, param), subcat);
    }
    else if(subcat === "Aggregate of Subsectors") { //Agg Subcat no agg Region
        data = getRegion(getParam(aggSub, param), region);
    }
    else
        data = getSubcat(getRegion(getParam(aggNone, param), region), subcat);
    return data;
};