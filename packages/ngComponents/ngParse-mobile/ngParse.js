// (function () {
  
//   'use strict';

// Extend JSON Stringfy JS Function
// SAMPLE: JSON.stringify(obj, stringifyJsFunctions)
function stringifyJsFunctions(key, value) {
    if (typeof value === "function") {
        let valueString = value.toString()
        let body = valueString.slice(valueString.indexOf("{") + 1, valueString.lastIndexOf("}")).replace(/\\n/gi, '')
        let arguments = valueString.slice(valueString.indexOf("(") + 1, valueString.indexOf(")"))
        return JSON.stringify({ function: { arguments: arguments, body: body } })
    }
    return value;
}

// Extend JSON Parse JS Function
// SAMPLE: JSON.parse(obj, parseJsFunctions)
function parseJsFunctions(key, value) {
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
function jsonStringify(obj) {
    return JSON.stringify(obj, stringifyJsFunctions)
}

// Convert JSON String TO JSON Object
function jsonParse(obj) {
    return JSON.parse(obj, parseJsFunctions)
}

// })();