// utils/handlePayload.js

/**
 * Creates a FormData object from an object
 * @param {object} obj
 * @param {FormData} form
 * @param {string} namespace
 * @returns {FormData}
 */
function createFormDataFromObject(obj, form = null, namespace = "") {
  let formData = form || new FormData();

  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      let formKey = namespace ? `${namespace}[${property}]` : property;

      if (
        typeof obj[property] === "object" &&
        obj[property] !== null &&
        !("uri" in obj[property])
      ) {
        createFormDataFromObject(obj[property], formData, formKey);
      } else {
        let value = obj[property];

        if (typeof value === "boolean") {
          value = value ? 1 : 0;
        }

        formData.append(formKey, value);
      }
    }
  }

  return formData;
}

/**
 * Returns a payload and a boolean indicating if it has files
 * @param {object} payload
 * @returns {payload: FormData | object, hasFiles: boolean}
 */
function handlePayload(payload) {
  let hasFiles = false;

  function checkForFiles(value) {
    if (value && typeof value === "object" && "uri" in value) {
      hasFiles = true;
      return;
    } else if (Array.isArray(value)) {
      for (const item of value) {
        checkForFiles(item);
        if (hasFiles) break;
      }
    } else if (typeof value === "object" && value !== null) {
      for (const key in value) {
        checkForFiles(value[key]);
        if (hasFiles) break;
      }
    }
  }

  checkForFiles(payload);

  if (hasFiles) {
    const formData = createFormDataFromObject(payload);

    return {
      payload: formData,
      hasFiles,
    };
  } else {
    return { payload, hasFiles };
  }
}

export default handlePayload;
