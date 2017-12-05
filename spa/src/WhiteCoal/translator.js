export const LOCALE = 'ua'

const translator = {
    ua: {
        contact_field_name: 'Ваше імʼя...',
        contact_field_email: 'Ваш email...',
        contact_field_content: 'Ваше питання...',
        register_step_1: 'Особисті дані',
        register_step_2: 'Місце роботи',
        register_step_3: 'Розташування',
        validation_invalid_email: 'Електронна пошта не відповідає стандарту',
        validation_field_is_required: 'Поле "__NAME__" обовʼязкове',
        validation_generic_title: 'У формі присутні помилки. Будь ласка, перевірте дані.',
        field_lastName: 'Прізвище',
        field_firstName: 'Імʼя',
        field_middleName: 'По-батькові',
        field_phone: 'Особистий номер телефону',
        field_email: 'Особиста електронна пошта',
        field_email_notice: 'Для отримання унікальних Акційних кодів',
        field_legalName: 'Назва юридичної особи',
        field_pharmacyType: 'Тип установи',
        field_pharmacyName: 'Назва аптеки',
        field_pharmacyNumber: 'Номер аптеки',
        field_pharmacyEdrpou: 'ЄДРПОУ/ІНН',
        field_position: 'Посада',
        field_region: 'Область',
        field_city: 'Назва населеного пункту',
        field_street: 'Повна робоча адреса (без назви населеного пункту)',
        participation_search_btn: 'Пошук',
        participation_search_placeholder: 'ЄДРПОУ аптеки...',
        participation_edrpou: 'ЄДРПОУ',
        participation_region: 'Регіон',
        participation_name: 'Назва',
        participation_city: 'Населений пункт',
        participation_address: 'Адреса',
        participation_count: 'Кількість',
        participation_loading: 'Завантаження...',
        participation_no_items_title: 'Учасників не знайдено',
        participation_no_items_footer: 'Спробуйте змінити пошуковий запит',
        participation_notice: 'Якщо Ваша аптека відсутня у Реєстрі, це означає, що за підсумками періоду Акції умови Акції не були виконані.'
    }
}

export default (field, locale = LOCALE) => {
    if (translator[locale] !== undefined) {
        if (translator[locale][field] !== undefined) {
            return translator[locale][field]
        }
    }

    return field;
}