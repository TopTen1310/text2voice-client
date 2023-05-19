export default function requiredFieldValidation(value, message) {
    let validationMessage
    if (!value) {
        validationMessage = message || 'Required'
    }
    return validationMessage
}
