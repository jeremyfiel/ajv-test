const fs = require('fs-extra')
const Ajv = require("ajv-draft-04");
const ajvJson4Schema = require("./schemas/json-schema-draft-04.json");
const oai3Schema = require('./schemas/oai_schema_v3.0.json')


let _ajvOptions = {
  strict: false,
  //strictSchema: true,
  //strictTypes: true,
  verbose: true,
  allErrors: true,
  formats: {
    "uri-reference": true,
    date: true,
    email: true,
    regex: true,
    url: true,
    uri: true,
  },
};

let _draft4Validator = null;
let _openApiValidator = null;
let results;

try {
    const spec = fs.readJSONSync("./schemas/openapi-swagger_v1.json")  << add the schema file name here

  if (_draft4Validator == null) {

    let ajv = new Ajv(_ajvOptions);
    _draft4Validator = ajv.compile(ajvJson4Schema);
  }

  let valid = _draft4Validator(spec);

  console.log(
    (results = {
      valid: valid,
      error: _draft4Validator.errors,
    })
  );
} catch (err) {
  console.error(
    (results = {
      valid: false,
      error: err,
    })
  );
}

// try {
//   const spec = fs.readJSONSync("./schemas/openapi-swagger_v1.json")
//   if (_openApiValidator == null) {
//     let ajv = new Ajv(_ajvOptions);
//     ajv.addMetaSchema(oai3Schema)
//     _openApiValidator = ajv.compile(oai3Schema)
//   }

//   let valid = _openApiValidator(spec)

//   console.log(results = {
//     valid: valid,
//     error: _openApiValidator.errors,
//   })
// } catch (err) {
//   console.error(results = {
//     valid: false,
//     error: err.message,
//   })
// }
