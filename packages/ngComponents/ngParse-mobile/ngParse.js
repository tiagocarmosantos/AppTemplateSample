// (function () {
  
//   'use strict';

// Extend JSON Stringfy JS Function
// SAMPLE: JSON.stringify(obj, stringifyJsFunction)
function stringifyJsFunction(key, value) {
    if (typeof value === "function") {
        let valueString = value.toString()
        let body = valueString.slice(valueString.indexOf("{") + 1, valueString.lastIndexOf("}")).replace(/\\n/gi, '')
        let arguments = valueString.slice(valueString.indexOf("(") + 1, valueString.indexOf(")"))
        return JSON.stringify({ function: { arguments: arguments, body: body } })
    }
    return value;
}

// Extend JSON Parse JS Function
// SAMPLE: JSON.parse(obj, parseJsFunction)
function parseJsFunction(key, value) {
    if (!!value && value.toString().includes('function')) {
        let dataFunction = JSON.parse(value).function
        let body = dataFunction.body
        let arguments = dataFunction.arguments
        return new Function(arguments, body)
    }
    return value
}

// Convert JSON Object TO JSON String
// Include atributtes with JS Functions
function stringifyJSON(obj) {
    return JSON.stringify(obj, stringifyJsFunction)
}

// Convert JSON String TO JSON Object
// Retrieve atributtes with JS Functions
function parseJSON(obj) {
    return JSON.parse(obj, parseJsFunction)
}

// })();