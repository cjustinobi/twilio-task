import { ModalContext } from "@/contexts/ModalContext"
import { useContext } from "react";

const FormModal = () => {
const { showModal, toggleModal } = useContext(ModalContext)
  return (
  
    <div className={`fixed ${showModal ? '' : 'hidden'} inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal`}>

    <form className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
      <div className=" mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          id="message"
          name="message"
          placeholder="Your Message"
          rows="4"
          required
        ></textarea>
      </div>

      <div className="mb-6">
        <button
          id="ok-btn"
          onClick={toggleModal}
          className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          OK
        </button>
      
      </div>
    </form>


  </div>
  )
}

export default FormModal