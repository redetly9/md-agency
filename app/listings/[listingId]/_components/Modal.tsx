import React, { useState } from "react";

// @ts-ignore
const Modal = ({ isOpen, openModal, closeModal, onCreateReservation }) => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    itemId: "",
  });


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    onCreateReservation(formData)
    closeModal();
  };
  return (
    <div className="flex items-center justify-center">

      {/* Модальное окно */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            {/* Заголовок */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Заявка
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Имя
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 border-2 border-blue-500 focus:border-blue-500 text-lg p-3"
                    required
                  />
                </div>

                {/* Фамилия */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Фамилия
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 border-2 border-blue-500 focus:border-blue-500 text-lg p-3"
                    required
                  />
                </div>

                {/* Телефон */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-lg font-medium text-gray-700"
                  >
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 border-2 border-blue-500 focus:border-blue-500 text-lg p-3"
                    required
                  />
                </div>
              </div>

              {/* Кнопки */}
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md mr-3 hover:bg-gray-400 text-lg w-full"
                >
                  Отменить
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 text-lg w-full"
                >
                  Подать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
