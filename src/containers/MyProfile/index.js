import MyProfileContainer from './myprofile.container';
import MyProfileTypes from './myprofile.types';
import MyProfileConsts from './myprofile.consts';

const instance = new MyProfileContainer({
    storeName: 'MyProfileContainer',
});

export default {
    instance,
    MyProfileTypes,
    MyProfileContainer,
    MyProfileConsts
};
