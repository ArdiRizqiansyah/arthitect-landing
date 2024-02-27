/* eslint-disable react/prop-types */

'use client';

import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function DeleteModal({ 
        openModal, 
        setOpenModal,
        title = "Apakah Anda yakin ingin menghapus data ini?",
        onDelete,
    }) {
  return (
    <>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {title}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={onDelete}>
                Hapus
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Batal
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteModal;