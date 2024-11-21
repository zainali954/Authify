import validator from "validator";
import apiError from "../utils/apiError.js";

const validateFields = (fields) => {
    let errors = [];

    fields.forEach(field => {

        if (!field.value || typeof field.value !== 'string' || field.value.trim() === "") {
            errors.push(`Field ${field.type} is required`);
        }

        if (field.value && field.type === "email" && !validator.isEmail(field.value)) {
            errors.push(`Invalid format for ${field.type}`);
        }
    });

    // If there are any errors, throw them all together
    if (errors.length > 0) {
        throw new apiError(400, errors.join(", "));
    }
};

export default validateFields;
