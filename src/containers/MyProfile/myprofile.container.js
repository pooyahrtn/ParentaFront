import Container from '../../utils/StoreContainer';
import { State, Image } from './myprofile.types';
import { timeout } from '../../utils/timeout';

export default class MyProfileContainer extends Container<State> {
    state: State = {
        completeProfileStep: 0,
        name: '',
        birthDay: new Date('1995/04/16'),
        sex: '',
        images: [],
    }

    goToNextStep = () => {
        const { completeProfileStep } = this.state;
        return this.setState({
            completeProfileStep: completeProfileStep + 1,
        }, true);
    }

    _setCurrentStep = (nextStep: number) => this.setState({
        completeProfileStep: nextStep,
    }, true);

    setName = (name) => {
        this.setState({
            name,
        }, true);
    }

    setSex = sex => this.setState({
        sex
    }, true);

    setBirthDay = (birthDay) => {
        // console.warn(birthDay)
        this.setState({ birthDay }, true);
    };

    onMainImageSelect = async (image) => {
        const { images } = this.state;
        await this.setState({
            images: [...images, {
                path: image,
                priority: 1,
            }]
        }, true);
    }

    addPhoto = async (image: Image) => {
        const { images } = this.state;
        const priority = images.length;
        const cachedImage = {
            path: image,
            priority,
            loading: true,
            uuid: String(Math.random())
        };
        await this.setState({
            images: [...images, cachedImage]
        }, true);
        return this.uploadPhoto(cachedImage);
    }

    uploadPhoto = async (image: Image) => {
        await timeout(3000);
        const { images } = this.state;

        const modifiedImages = images.map((item) => {
            if (item.uuid === image.uuid) {
                return {
                    ...item,
                    uuid: String(Math.random()),
                    loading: false,
                };
            }
            return item;
        });
        return this.setState({
            images: [...modifiedImages],
        }, true);
    }

    deletePhoto = async (image: Image) => {
        const { images } = this.state;
        const modifiedImage = images.filter(item => item.uuid !== image.uuid);
        return this.setState({
            images: [...modifiedImage],
        }, true);
    }

    toPublic = () => {
        const { name, images, birthDay } = this.state;
        const age = new Date().getFullYear() - new Date(birthDay).getFullYear();
        return {
            name,
            images: images.map(image => ({ main: image.path })),
            distance: 0,
            age,
        };
    }
}
