function convertQueryToMap(query){
    if(query == ""){
        return {};
    }
    
    let result;

    if(query.includes("&")){
        let retVal = {};
        result = query.split("&").reduce( (retVal, currentPair) => {
            let parsedPair = currentPair.split("=")
                                        .map(pair => decodeURIComponent(pair));

            parsedPair[0].split(".").reduce( (obj, key, currentIndex, array) => 
            {
                if(!(key in obj)){
                    if(currentIndex == array.length-1){
                        obj[key] = parsedPair[1];
                    }else{
                        obj[key] = {};
                    }
                }
                obj = obj[key];
                return obj;
            }, retVal);
            
            return retVal;
        }, retVal);

    }else{
        result = [query].reduce( (resultingObj, currentPair) => {
            let parsedPair = currentPair.split("=")
                                        .map(pair => decodeURIComponent(pair));
            resultingObj[parsedPair[0]] = parsedPair[1];
            return resultingObj;
        }, {});
    }

    return result;
}

let prettyPrint = string => JSON.stringify(string, null, 2)

var handleEmptyStringResult = convertQueryToMap("");
console.log("Criteria 1: ")
console.log(prettyPrint(handleEmptyStringResult));

var handleURIEncodingResult = convertQueryToMap("a=a%26b%3Dc%3F");
console.log("Criteria 2:\n")
console.log(prettyPrint(handleURIEncodingResult, null, 2));

var handleBasicNestedComponents = convertQueryToMap("user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue");
console.log("Criteria 3:")
console.log(prettyPrint(handleBasicNestedComponents, null, 2));