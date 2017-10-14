export const LOCALE = 'ua'

const translator = {
    ua: {
        validation_field_is_required: 'Поле "__NAME__" обовʼязкове',
        validation_generic_title: 'У формі присутні помилки. Будь ласка, перевірте дані.',
        field_lastName: 'Прізвище',
        field_firstName: 'Імʼя',
        field_middleName: 'По-батькові',
        field_phone: 'Особистий номер телефону',
        field_email: 'Особиста електронна пошта',
        field_email_notice: 'Для отримання унікальних Акційних кодів',
        field_legalName: 'Назва юридичної установи',
        field_company: 'Місце роботи',
        field_pharmacyType: 'Тип установи',
        field_pharmacyName: 'Назва аптеки',
        field_pharmacyNumber: 'Номер аптеки',
        field_position: 'Посада',
        field_region: 'Область',
        field_city: 'Назва населеного пункту',
        field_address: 'Повна робоча адреса (без назви населеного пункту)',
    }
}

export default (field, locale = LOCALE) => {
    if (translator[LOCALE] !== undefined) {
        if (translator[LOCALE][field] !== undefined) {
            return translator[LOCALE][field]
        }
    }

    return field;
}