
/* eslint-disable import/prefer-default-export */

export type Image = {
    uuid: String,
    path: String,
    priority: Number,
    loading: Boolean,
}

export type State = {
    completeProfileStep: number,
    name: string,
    birthDay: Date,
    sex: 'm' | 'f' | 'u',
    images: Image[],
};

type Select = {
    value: String,
    label: String
}

export type SelectField = {
    data: Select[],
    withNoAnswer: Boolean,
}
