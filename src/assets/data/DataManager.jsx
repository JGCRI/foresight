export const getParam = (data, param) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        if(data.at(i).param === param) {
            reducedData.push(data.at(i));
        }
    }
    return reducedData;
}

export const getSubcat = (data, subcat) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        if(data.at(i).subcat === subcat) {
            reducedData.push(data.at(i));
        }
    }
    return reducedData;
}

export const getRegion = (data, region) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        if(data.at(i).region === region) {
            reducedData.push(data.at(i));
        }
    }
    return reducedData;
}

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
            console.log(mergeDates(getSubcat(countryData)).at(0).value);
        }
        output.push(obj);   
    }
    return output;
}

export const lineGraphReduce = (data, param) => {
    var final = getParam(data, param);
    if(final.at(0).class1 === "class1") { //No subclasses
        final = getNoSubcatLine(mergeRegions(final));
    }
    return final;
}

export const choroplethReduce = (data, param) => {
    var final = getParam(data, param);
    if(final.at(0).class1 === "class1") { //No subclasses
        final = getNoSubcatChoropleth(mergeDates(final));
    }
    console.log(final);
    return final;
}