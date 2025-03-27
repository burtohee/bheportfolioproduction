export const name_validation = {
    name: 'name',
    label: 'name',
    type: 'text',
    id: 'name',
    placeholder: 'your name ...',
    autoComplete: 'username',
    className: '',

    validation: {
        required: {
            value: true,
            message: 'required',
        },
        maxLength: {
            value: 30,
            message: '30 characters max',
        },
    },
};

export const email_validation = {
    name: 'email',
    label: 'email address',
    type: 'email',
    id: 'email',
    placeholder: 'your email address ...',
    autoComplete: 'email',
    className: '',

    validation: {
        required: {
            value: true,
            message: 'required',
        },
        pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'not valid',
        },
    },
};

export const desc_validation = {
    name: 'description',
    label: 'description',
    multiline: true,
    id: 'description',
    placeholder: 'write description ...',
    className: '',

    validation: {
        required: {
            value: true,
            message: 'required',
        },
        maxLength: {
            value: 200,
            message: '200 characters max',
        },
    },
};
