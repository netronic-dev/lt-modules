export const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length < 2) {
        errors.name = 'The name must have at least 2 characters';
    }

    if (!values.phone) {
        errors.phone = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.agreement) {
        errors.agreement = 'Required';
    }
    return errors;
};
