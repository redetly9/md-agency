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
          <div className="bg-white rounded-lg shadow-none max-w-lg w-full p-6">
            {/* Заголовок */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-ink">
                Заявка
              </h2>
              <button
                onClick={closeModal}
                className="text-ink-2 hover:text-ink"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block font-medium text-ink-2"
                  >
                    Имя
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-2 block w-full border-line rounded-md shadow-none focus:ring-brand/30 border-2 border-brand-light focus:border-brand-light p-3"
                    required
                  />
                </div>

                {/* Фамилия */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block font-medium text-ink-2"
                  >
                    Фамилия
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-2 block w-full border-line rounded-md shadow-none focus:ring-brand/30 border-2 border-brand-light focus:border-brand-light p-3"
                    required
                  />
                </div>

                {/* Телефон */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block font-medium text-ink-2"
                  >
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 block w-full border-line rounded-md shadow-none focus:ring-brand/30 border-2 border-brand-light focus:border-brand-light p-3"
                    required
                  />
                </div>
              </div>

              {/* Кнопки */}
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-slate-200 text-ink-2 px-6 py-3 rounded-md mr-3 hover:bg-gray-400 text-lg w-full"
                >
                  Отменить
                </button>
                <button
                  type="submit"
                  className="bg-brand text-ink px-6 py-3 rounded-md hover:bg-brand-dark text-lg w-full"
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
