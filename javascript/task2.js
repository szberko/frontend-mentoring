function convertQueryToMap(query){
    let result = {};

    if(query.includes("&")){
        let initialValue = {};
        result = query.split("&").reduce( (outerAggregator, currentPair) => {
            let parsedPair = currentPair.split("=")
                                        .map(decodeURI);

            parsedPair[0].split(".").reduce( (innerAgregator, key, currentIndex, array) => {
                if(!(key in innerAgregator)){
                    // If we are at the end of the path set the field to it's actual value
                    if(currentIndex == array.length-1){
                        innerAgregator[key] = parsedPair[1];
                    }
                    // If we are NOT at the end of the path create a new empty object
                    else{
                        innerAgregator[key] = {};
                    }
                }
                // Nest the newly created object into the outer object
                innerAgregator = innerAgregator[key];
                return innerAgregator;
            }, outerAggregator);
            
            return outerAggregator;
        }, initialValue);

    }else{
        result = [query].reduce( (resultingObj, currentPair) => {
            let parsedPair = currentPair.split("=")
                                        .map(decodeURI);
            resultingObj[parsedPair[0]] = parsedPair[1];
            return resultingObj;
        }, {});
    }

    return result;
}

let decodeURI = uri => decodeURIComponent(uri);
let prettyPrint = string => JSON.stringify(string, null, 2);

var handleEmptyStringResult = convertQueryToMap("");
console.log("Criteria 1: ")
console.log(prettyPrint(handleEmptyStringResult));

var handleURIEncodingResult = convertQueryToMap("a=a%26b%3Dc%3F");
console.log("Criteria 2:\n")
console.log(prettyPrint(handleURIEncodingResult, null, 2));

var handleBasicNestedComponents = convertQueryToMap("user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue");
console.log("Criteria 3:")
console.log(prettyPrint(handleBasicNestedComponents, null, 2));