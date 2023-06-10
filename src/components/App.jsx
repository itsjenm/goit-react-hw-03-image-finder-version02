import { useState } from "react";
import ImageGallery from "./Image-gallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modal from "./Modal/Modal";

export const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');

  function handleSubmit(query) {
    // console.log(query);
    if (query === '') {
      return toast.info('Input a search query.')
    }

    if (query === searchQuery) {
      return toast.info('Input new search query.')
    }

    setSearchQuery(query)
    setPage(page)
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
    <Searchbar onSubmit={handleSubmit} />
    {/* why does it need to be in a section?  */}
    <section>
      <ImageGallery searchQuery={searchQuery} onModalOpen={toggleModal} />
    </section>
    {showModal && (
      <Modal onModalClose={toggleModal}>
        <img src={src} alt={alt} />
      </Modal>
    )}
    <ToastContainer autoClose={3000} theme="colored" />
    </>
  );
};

