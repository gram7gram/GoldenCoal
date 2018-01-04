import trans from '../../translator'
import emailValidator from 'email-validator'

export default (model, changes, ignoreChanges = false) => {

    const validator = {
        total: 0,
        field: {},
        messages: []
    }

    if (ignoreChanges || changes.firstName) {
        if (!model.firstName || !model.firstName.trim()) {
            ++validator.total
            validator.field.firstName = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_firstName'))
            )
        }
    }

    if (ignoreChanges || changes.lastName) {
        if (!model.lastName || !model.lastName.trim()) {
            ++validator.total
            validator.field.lastName = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_lastName'))
            )
        }
    }

    if (ignoreChanges || changes.email) {
        if (!model.email) {
            ++validator.total
            validator.field.email = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_email'))
            )
        } else if (!emailValidator.validate(model.email)) {
            ++validator.total
            validator.field.email = true
            validator.messages.push(
                trans('validation_invalid_email')
            )
        }
    }

    if (ignoreChanges || changes.legalName) {
        if (!model.legalName || !model.legalName.trim()) {
            ++validator.total
            validator.field.legalName = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_legalName'))
            )
        }
    }

    if (ignoreChanges || changes.pharmacyName) {
        if (!model.pharmacy.name || !model.pharmacy.name.trim()) {
            ++validator.total
            validator.field.pharmacyName = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_pharmacyName'))
            )
        }
    }

    if (ignoreChanges || changes.pharmacyEdrpou) {
        if (!model.pharmacy.edrpou) {
            ++validator.total
            validator.field.pharmacyName = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_pharmacyEdrpou'))
            )
        } else if (model.pharmacy.edrpou.trim().length < 8) {
            ++validator.total
            validator.field.pharmacyName = true
            validator.messages.push(
                trans('validation_field_is_invalid')
                    .replace('__NAME__', trans('field_pharmacyEdrpou'))
            )
        }
    }

    if (ignoreChanges || changes.position) {
        if (!model.position || !model.position.id) {
            ++validator.total
            validator.field.position = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_position'))
            )
        }
    }

    if (ignoreChanges || changes.region) {
        if (!model.address.region || !model.address.region.id) {
            ++validator.total
            validator.field.region = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_region'))
            )
        }
    }

    if (ignoreChanges || changes.city) {
        if (model.address.region) {
            if (model.address.region.type !== 'city') {
                if (!model.address.city || !model.address.city.trim()) {
                    ++validator.total
                    validator.field.city = true
                    validator.messages.push(
                        trans('validation_field_is_required')
                            .replace('__NAME__', trans('field_city'))
                    )
                }
            }
        } else {
            if (!model.address.city || !model.address.city.trim()) {
                ++validator.total
                validator.field.city = true
                validator.messages.push(
                    trans('validation_field_is_required')
                        .replace('__NAME__', trans('field_city'))
                )
            }
        }

    }

    if (ignoreChanges || changes.street) {
        if (!model.address.street || !model.address.street.trim()) {
            ++validator.total
            validator.field.street = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_street'))
            )
        }
    }

    if (ignoreChanges) {
        if (!model.isConfirmed) {
            ++validator.total
            validator.field.isConfirmed = true
        }
    }

    return validator
}