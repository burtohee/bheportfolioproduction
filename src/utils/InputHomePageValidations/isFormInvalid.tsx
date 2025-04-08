import { FieldErrors, FieldValues } from 'react-hook-form';

export const isFormInvalid = (err: FieldErrors<FieldValues> | null) => {
    if (!err) return true;

    return Object.keys(err).length > 0 ? true : false;
};
