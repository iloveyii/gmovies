import { IMAGELOADER_READ_SUCCESS, IMAGELOADER_READ_FAIL } from '../types/Imageloader';
import _ from 'lodash';

const initState = [];

const isImageAccessible = (imgObject) => {
    const image = new Image();
    image.src = imgObject.url;
    if(! image.complete) {
        return false;
    }
    if(image.naturalWidth === 0) {
        return false;
    }
    return true;
};
const getImageUrlAndLabel = (imageString) => {
    let value = imageString.trim();
    let url;
    let label;
    if(value.indexOf(' ') !== -1)  {
        url = value.substr(0, value.indexOf(' '));
        label = _.startCase(value.substr(value.indexOf(' ')+1));
    } else {
        url = value;
        label = 'NA';
    }

    return {
        url,
        label
    }
};

const ImageloaderReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case IMAGELOADER_READ_SUCCESS:
            console.log('Inside Image loader Reducer', action.payload);
            const imagesArray = action.payload.images.split(/\n/);
            console.log('Inside Image loader Reducer imagesArray ', imagesArray);
            let validImages = [];
            imagesArray.forEach((imageString, i)=>{
                const imageObject = getImageUrlAndLabel(imageString);
                console.log('Inside foreach', i, imageObject);
                const accessible = isImageAccessible(imageObject);
                console.log('Inside foreach is accessible', i, accessible);
                if(accessible) {
                    validImages.push(imageObject);
                }
            });

            const images = _.uniqBy(validImages, 'url');
            return images;

        case IMAGELOADER_READ_FAIL:
            console.log('Inside failed Image loader Reducer', action.payload.err);
            return action.payload.err;

        default:
            return state;
    }
};

export default ImageloaderReducer;
