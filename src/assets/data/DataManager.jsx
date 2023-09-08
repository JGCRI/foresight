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
        if(data.at(i).subcat === subcat) {
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
            if(data.at(i).x === reducedData.at(j).x) {
                reducedData.at(j).value = parseFloat(reducedData.at(j).value) + parseFloat(data.at(i).value);
                flag = 1;
            }
        }
        if(flag === 0)
            reducedData.push(data.at(i));
    }
    return reducedData;
}

// mergeDates aggregates data by summing all data with the same region.
// This results in an output where dates are merged and data is only
// sorted by region. This is useful for charts like the bar chart where
// dates are disregarded. 
//
// NOTE: Expect this function to change as date range functionality is added.
export const mergeDates = (data) => {
    var reducedData = [];
    var flag;
    for(var i = 0; i < data.length; i++) {
        flag = 0;
        for(var j = 0; j < reducedData.length; j++) {
            if(data.at(i).region === reducedData.at(j).region) {
                reducedData.at(j).value = (parseFloat(reducedData.at(j).value) + parseFloat(data.at(i).value))/2;
                flag = 1;
            }
        }
        if(flag === 0)
            reducedData.push(data.at(i));
    }
    return reducedData;
}

// mergeSubcat aggregates data by summing all data with the same parameter and date.
// This results in an output where subcategory values are summed.
//
// NOTE: This function may have unexpected results if params
// have not been previously filtered.
export const mergeSubcat = (data) => {
    var reducedData = [];
    var flag;
    for(var i = 0; i < data.length; i++) {
        flag = 0;
        for(var j = 0; j < reducedData.length; j++) {
            if(data.at(i).region === reducedData.at(j).region && data.at(i).x === reducedData.at(j).x) {
                reducedData.at(j).value = (parseFloat(reducedData.at(j).value) + parseFloat(data.at(i).value))/2;
                flag = 1;
            }
        }
        if(flag === 0) {
            data.at(i).class1 = "Aggregate of Subcategories";
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
            if(data.at(i).class1 === reducedData[j]) {
                flag = 1;
            }
        }
        if(flag === 0)
            reducedData.push(data.at(i).class1);
    }
    return reducedData;
}

// filterRegion creates a list of all regions for the
// data given. This data does not be in the form of an already
// param filtered array.
export const filterRegion = (data) => {
    var reducedData = [];
    var flag;
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

export const getNoSubcatLine = (data) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        reducedData.push({
            "x": parseFloat(data.at(i).x),
            "y": parseFloat(data.at(i).value)
        });   
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

export const getBarHorizontal = (data, param) => {
    var output = [];
    var barData = getParam(data, param);
    var subcatList = filterSubcat(barData);
    var countryList = filterRegion(barData);
    for(var i = 0; i < countryList.length; i++) {
        var countryData = getRegion(barData, countryList[i]);
        var obj = {
            "country": countryList[i]
        }
        for(var j = 0; j < subcatList.length; j++) {
            obj[subcatList[j]] = parseFloat(mergeDates(getSubcat(countryData)).at(0).value);
        }
        output.push(obj);   
    }
    return output;
}

export const lineGraphReduce = (data, param) => {
    var final = getParam(data, param);
    if(final.at(0).class1 === "class1") //No subclasses
        final = getNoSubcatLine(mergeRegions(final));
    else
        final = getNoSubcatLine(mergeRegions(mergeSubcat(final)));

    return final;
}

export const choroplethReduce = (data, param) => {
    var final = getParam(data, param);
    if(final.at(0).class1 === "class1") //No subclasses
        final = getNoSubcatChoropleth(mergeDates(final));
    else 
        final = getNoSubcatChoropleth(mergeDates(mergeSubcat(final)));
    return final;
}