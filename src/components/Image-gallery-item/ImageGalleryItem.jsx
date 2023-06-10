import React from 'react';
import PropTypes from 'prop-types';
import Styled from './image_gallery_item.module.css';

const ImageGalleryItem = ({ data, openModal }) => {
 
  return data.map(({id, webformatURL, largeImageURL, tags}) => (
      <li className={Styled.ImageGalleryItem} key={id} onClick={() => openModal({ largeImageURL, tags })} >
        <img src={webformatURL} className={Styled.ImageGalleryItem_image} alt={tags}  />
      </li>
    ));
}


ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem