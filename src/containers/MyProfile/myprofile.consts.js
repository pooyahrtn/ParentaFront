import { SelectField } from './myprofile.types';

const CompleteProfileStates = {
    name: 0,
    birthDay: 1,
    sex: 2,
    pictures: 3,
};


const Sex: SelectField = {
    data: [
        {
            value: 'm',
            label: 'مرد'
        },
        {
            value: 'f',
            label: 'زن'
        }
    ],
    withNoAnswer: false,
};


export default {
    CompleteProfileStates,
    Sex,
};
