export const getParam = (data, param) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        if(data.at(i).param === param) {
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
        if(flag == 0)
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
        if(flag == 0)
            reducedData.push(data.at(i));
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