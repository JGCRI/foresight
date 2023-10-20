// getParam is a filtering fucntion that removes all entries
// in a dataset without the specified param. Two inputs are given,
// the dataset to modify and the param to filter by. The modified
// dataset is returned.
export const getParam = (data, param) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
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
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
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
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        if(data.at(i).region === region) {
            reducedData.push(data.at(i));
        }
    }
    return reducedData;
}

export const getScenerio = (data, scenario) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        if(data.at(i).scenario === scenario) {
            reducedData.push(data.at(i));
        }
    }
    return reducedData;
}

export const filterDateRange = (data, start, end) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        if(data.at(i).x >= start && data.at(i).x <= end) {
            reducedData.push(data.at(i));
        }
    }
    return reducedData;
}

export const getLargestChoropleth = (data) => {
    var ans = 0;
    for(var i = 0; i < data.length; i++) {
        if(ans < data.at(i).value)
            ans = data.at(i).value;
    }
    return ans;
}

export const getSmallestChoropleth = (data) => {
    var ans = data.at(0).value;
    for(var i = 0; i < data.length; i++) {
        if(ans > data.at(i).value)
            ans = data.at(i).value;
    }
    return ans;
}

export const getChoroplethValue = (data, id) => {
    var ans = 0;
    for(var i = 0; i < data.length; i++) {
        if(id === data.at(i).id)
            ans = data.at(i).value;
    }
    return ans;
}
// mergeRegions aggregates data by summing all data with the same date.
// This results in an output where regions are merged and data is only
// sorted by date. This is useful for charts like the line chart where
// it is helpful to merge regions.
export const mergeRegions = (data) => {
    var reducedData = [];
    var flag;
    for(var i = 0; i < data.length; i++) {
        flag = 0;
        for(var j = 0; j < reducedData.length; j++) {
            if(data.at(i).region === reducedData.at(j).region) {
                reducedData.at(j).value = parseFloat(reducedData.at(j).value) + parseFloat(data.at(i).value);
                flag = 1;
            }
        }
        if(flag === 0)
            reducedData.push(data.at(i));
    }
    reducedData.sort((a,b) => a.x - b.x);
    return reducedData;
}

export const reduceRegion = (data, region) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
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
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        if(data.at(i).x === year.toString() ) {
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
    var reducedData = [];
    var flag;
    for(var i = 0; i < data.length; i++) {
        flag = 0;
        for(var j = 0; j < reducedData.length; j++) {
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
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        if(data.at(i).class === subcat) {
            reducedData.push(data.at(i));
        }   
    }
    reducedData.sort((a,b) => a.x - b.x);
    return reducedData;
}

// filterRegion creates a list of all regions for the
// data given. This data does not be in the form of an already
// param filtered array.
export const filterRegion = (data) => {
    var reducedData = [];
    var flag;
    data.sort((a,b) => b.value - a.value);
    data = data.slice(0, 10);
    data.sort((a,b) => a.value - b.value);
    for(var i = 0; i < data.length; i++) {
        flag = 0;
        for(var j = 0; j < reducedData.length; j++) {
            if(data.at(i).region === reducedData[j]) {
                flag = 1;
            }
        }
        if(flag === 0)
            reducedData.push(data.at(i).region);
    }
    return reducedData;
}

export const getNoSubcatChoropleth = (data) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        reducedData.push({
            id: data.at(i).region,
            value: parseFloat(data.at(i).value)
        });   
    }
    return reducedData;
}

export const getBarTotal = (data, param, scenarios) => {
    var ans = [];
    for(var i = 0; i < scenarios.length; i++) {
        ans.push({
            id: scenarios.at(i).title,
            data: getBarHorizontal(data, param)
        })
    }
    return ans;
}

export const getBarHorizontal = (data, dataAgg, scenerio, param, year) => {
    var output = [];
    var barData = getDates(getScenerio(getParam(data, param), scenerio), year);
    var aggregates = getDates(getScenerio(getParam(dataAgg, param), scenerio), year);
    var subcatList = filterSubcat(barData);
    var countryList = filterRegion(aggregates);
    for(var i = 0; i < countryList.length; i++) {
        var countryData = getRegion(barData, countryList[i], year);
        var obj = {
            "country": countryList[i]
        }
        for(var j = 0; j < subcatList.length; j++) {
            obj[subcatList[j]] = parseFloat(getSubcat(countryData, subcatList.at(j)).at(0).value);
        }
        output.push(obj);  
    }
    console.log("!", output)
    return output
}

export const lineGraphReduce = (data, param, scenerios, region, subcat) => {
    console.log(data);
    var output = []
    for (var i = 0; i < scenerios.length; i++) {
        var obj = {
            "id": scenerios.at(i).title,
            "data": getLineGraphReduce(data),
        }
        output.push(obj);
    }
    console.log(output)
    return output
}

export const getLineGraphReduce = (data) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        reducedData.push({
            "x": parseFloat(data.at(i).x),
            "y": data.at(i).value,
        });
    }
    return reducedData;
}

export const choroplethReduce = (data, scenario, param, year) => {
    var final = getDates(getScenerio(getParam(data, param), scenario), year);
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
    return getScenerio(data, scenario);
};