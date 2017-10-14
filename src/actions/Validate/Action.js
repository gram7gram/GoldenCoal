import trans from '../../translator'

export default (model, changes, ignoreChanges = false) => {

    const validator = {
        total: 0,
        messages: []
    }

    if (ignoreChanges || changes.firstName) {
        if (!model.firstName) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_firstName'))
            )
        }
    }

    if (ignoreChanges || changes.lastName) {
        if (!model.lastName) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_lastName'))
            )
        }
    }

    if (ignoreChanges || changes.middleName) {
        if (!model.middleName) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_middleName'))
            )
        }
    }

    if (ignoreChanges || changes.phone) {
        if (!model.phone) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_phone'))
            )
        }
    }

    if (ignoreChanges || changes.email) {
        if (!model.email) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_email'))
            )
        }
    }

    if (ignoreChanges || changes.legalName) {
        if (!model.legalName) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_legalName'))
            )
        }
    }

    if (ignoreChanges || changes.company) {
        if (!model.company) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_company'))
            )
        }
    }

    if (ignoreChanges || changes.pharmacyType) {
        if (!model.pharmacyType) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_pharmacyType'))
            )
        }
    }

    if (ignoreChanges || changes.pharmacyName) {
        if (!model.pharmacyName) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_pharmacyName'))
            )
        }
    }

    if (ignoreChanges || changes.pharmacyNumber) {
        if (!model.pharmacyNumber) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_pharmacyNumber'))
            )
        }
    }

    if (ignoreChanges || changes.position) {
        if (!model.position) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_position'))
            )
        }
    }

    if (ignoreChanges || changes.region) {
        if (!model.region) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_region'))
            )
        }
    }

    if (ignoreChanges || changes.city) {
        if (!model.city) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_city'))
            )
        }
    }

    if (ignoreChanges || changes.address) {
        if (!model.address) {
            ++validator.total
            validator.messages.push(
                trans('validation_field_is_required')
                    .replace('__NAME__', trans('field_address'))
            )
        }
    }


    return validator
}