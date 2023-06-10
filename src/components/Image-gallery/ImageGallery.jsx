import React, { useEffect, useState } from 'react';
import fetchImages from 'services/image.api';
import Styled from './image_gallery.module.css';
import { toast } from 'react-toastify';
import ImageGalleryItem from 'components/Image-gallery-item/ImageGalleryItem';
// import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const ImageGallery = ({ searchQuery, onModalOpen }) => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [status, setStatus] = useState('idle');
    const [totalHits, setTotalHits] = useState(1);

    //setting pagination

    const handleLoadMore = (event) => {
        event.preventDefault();
        // console.log(page)
        setPage((prevPage) => prevPage + 1)
        // console.log(currentPage)
        setCurrentPage(page)
        console.log(currentPage)
        // setPage(page + 1)
        
    }

    useEffect(() => {
        const fetchImagesData = async () => {
            setStatus('pending');

        try {
            const response = await fetchImages(searchQuery, page);
            const { totalHits, hits} = response;
        
            if (totalHits > 0) {
                toast.success(`Hooray! We found ${totalHits} images of ${searchQuery}.`);
                setTotalHits(totalHits);
                setImages(prevImages => [...prevImages, ...hits]);
                setStatus('resolved');
            } else {
                setStatus('rejected');
                toast.error('Sorry, there are no images matching your search query. Please try again.')
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setStatus('rejected');
            toast.error('Sorry, there was an error fetching the images. Please try again.')
        }
    }

        if(searchQuery !== '') {
            setTotalHits(1);
            setImages([]);
            fetchImagesData();
        }

    }, [searchQuery, page]);



    if (status === 'pending') {
        return (
            <div>
                <ul className={Styled.ImageGallery}>
                    <ImageGalleryItem data={images} openModal={onModalOpen}/>
                </ul>
            </div>
        )
    }
    
    if (images.length === totalHits || images.length > totalHits) {
        return (
            <div>
                <ul className={Styled.ImageGallery}>
                    <ImageGalleryItem data={images} openModal={onModalOpen}/>
                </ul>
            </div>
        )
    }

    if (status === 'resolved') {
        return (
            <div className={Styled.Button_container}>
                <ul className={Styled.ImageGallery} >
                    <ImageGalleryItem data={images} openModal={onModalOpen} />
                </ul>
                <Button text={'Load more'} buttonClick={handleLoadMore} />
            </div>
        )
    }
  return null
}


ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onModalOpen: PropTypes.func.isRequired,
}

export default ImageGallery