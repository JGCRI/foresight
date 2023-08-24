export const getParam = (data, param) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        if(data.at(i).param === param)
            reducedData.push(data.at(i));
    }
    return reducedData;
}

export const mergeDates = (data) => {
    var reducedData = data;
    for(var i = 0; i < data.length; i++) {
        for(var j = 0; j < i; j++) {
            if(data.at(i).x === data.at(j).x) {
                data.at(i).y += data.at(j).y
                reducedData.pop(i);
            }
        }
    }
    return reducedData;
}

export const getNoSubcatParam = (data, param) => {
    var reducedData = [];
    for(var i = 0; i < data.length; i++) {
        if(data.at(i).param === param)
            reducedData.push({
                "x": data.at(i).x,
                "y": data.at(i).value
            });
    }
    return reducedData;
}

export const lineGraphReduce = (data, param) => {
    var final = []
    if(data.at(0).class1 === "class1") { //No subclasses
        var reducedData = getNoSubcatParam(data, param);
        final = mergeDates(reducedData);
    }
    return final;
}

const roundToData = (num) => {
    return(Math.floor(num / 5) * 5)
}