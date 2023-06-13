import React from 'react';

import Styled from './image_gallery.module.css';

import ImageGalleryItem from 'components/Image-gallery-item/ImageGalleryItem';
import PropTypes from 'prop-types';



const ImageGallery = ({ images, onModalOpen }) => {


    return (
        <div>
            <ul className={Styled.ImageGallery}>
                <ImageGalleryItem data={images} openModal={onModalOpen} />
            </ul>
        </div>
    )
}


ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onModalOpen: PropTypes.func.isRequired,
}

export default ImageGallery