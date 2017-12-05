import trans from '../../translator'
import emailValidator from 'email-validator'

export default (model, changes, ignoreChanges = false) => {

    const validator = {
        total: 0,
        field: {},
        messages: []
    }

    if (ignoreChanges || changes.firstName) {
        if (!model.firstName) {
            ++validator.total
            validator.field.firstName = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_firstName'))
            )
        }
    }

    if (ignoreChanges || changes.lastName) {
        if (!model.lastName) {
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
        if (!model.legalName) {
            ++validator.total
            validator.field.legalName = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_legalName'))
            )
        }
    }

    if (ignoreChanges || changes.pharmacyType) {
        if (!model.pharmacy.type || !model.pharmacy.type.cid) {
            ++validator.total
            validator.field.pharmacyType = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_pharmacyType'))
            )
        }
    }

    if (ignoreChanges || changes.pharmacyName) {
        if (!model.pharmacy.name) {
            ++validator.total
            validator.field.pharmacyName = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_pharmacyName'))
            )
        }
    }

    if (ignoreChanges || changes.pharmacyNumber) {
        if (!model.pharmacy.number) {
            ++validator.total
            validator.field.pharmacyNumber = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_pharmacyNumber'))
            )
        }
    }

    if (ignoreChanges || changes.position) {
        if (!model.position || !model.position.cid) {
            ++validator.total
            validator.field.position = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_position'))
            )
        }
    }

    if (ignoreChanges || changes.region) {
        if (!model.address.region) {
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
                if (!model.address.city) {
                    ++validator.total
                    validator.field.city = true
                    validator.messages.push(
                        trans('validation_field_is_required')
                            .replace('__NAME__', trans('field_city'))
                    )
                }
            }
        } else {
            if (!model.address.city) {
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
        if (!model.address.street) {
            ++validator.total
            validator.field.street = true
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_address'))
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