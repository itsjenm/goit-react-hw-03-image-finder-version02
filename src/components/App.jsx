import { useEffect, useState } from "react";
import ImageGallery from "./Image-gallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./Modal/Modal";
import fetchImages from "services/image.api";
import Button from "./Button/Button";


export const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const [images, setImages] = useState([]); 
  const [page, setPage] = useState(1); 
  const [showBtn, setShowBtn] = useState(false);
  // eslint-disable-next-line
  const [totalHits, setTotalHits] = useState(1);
  
  

  useEffect(() => {
    //needed to not fetch if there is no search
    if(searchQuery === '') {
        return;
    }

    const fetchImagesData = async () => {
    
      try {

        const response = await fetchImages(searchQuery, page);
        const { totalHits, hits} = response;
        console.log(response)
    
        if (totalHits > 0) {
          toast.success(`Hooray! We found ${totalHits} images of ${searchQuery}.`);
          setTotalHits(totalHits);
          setImages(prevImages => [...prevImages, ...hits]);
          setShowBtn(page < Math.ceil(totalHits / 12))
    
        } else {
          toast.error('Sorry, there are no images matching your search query. Please try again.')
        }

    } catch (error) {
        console.error('Error fetching images:', error);
        toast.error('Sorry, there was an error fetching the images. Please try again.')
    }
}

    //changed this to fetch images after load more button
   fetchImagesData() 

    
}, [searchQuery, page]);


  function handleSubmit(query) {
    // console.log(query);
    setSearchQuery(query);
    setImages([]);
    setPage(1);
    setShowBtn(false);
  }

  const handleLoadMore = (event) => {
    event.preventDefault();
    setPage((prevPage) => prevPage + 1);
  }


  const toggleModal = data => {
    setShowModal(!showModal);

    if(!showModal) {
      const {largeImageURL, tags} = data;
      setSrc(largeImageURL);
      setAlt(tags);
    }
  };


  return (
    <>
    <section>
    <Searchbar onSubmit={handleSubmit} />
    {/* why does it need to be in a section?  */}
    
      <ImageGallery images={images} onModalOpen={toggleModal} />
      
      {showModal && (
        <Modal onModalClose={toggleModal}>
          <img src={src} alt={alt} />
        </Modal>
      )}
    <ToastContainer autoClose={3000} theme="colored" />
      {showBtn && (
        <Button text={'Load more'} buttonClick={handleLoadMore} />
      )}
    </section>
    </>
  );
};

