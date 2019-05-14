import ImagePicker from 'react-native-image-crop-picker';

export default function openCropPicker() {
    return ImagePicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        mediaType: 'photo',
    });
}
