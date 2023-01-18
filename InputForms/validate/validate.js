export const validate = (values) => {
    const errors = {};

    if (values.name !== undefined) {
        if (values.name === '') {
            errors.name = 'Obligatoire';
        }
    }
    if (values.email !== undefined) {
        if (values.email === '') {
            errors.email = 'Obligatoire';
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Mauvaise adresse mail';
        }
    }
    if (values.phoneNumber !== undefined) {
        if (values.phoneNumber === '') {
            errors.phoneNumber = 'Obligatoire';
        }
        if (
            !/^[\+]?[(]?[0-9]{1,3}[)]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,13}$/im.test(
                values.phoneNumber
            )
        ) {
            errors.phoneNumber = 'Mauvais numéro de téléphone';
        }
    }
    return errors;
};

// !/^\d[\d\(\)\ -]{3,25}\d$/i OLD PHONE VALIDATION
