import React, { useState } from "react";

const Form = ({ isOpen, onClose, onSubmit }: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { message: string; date: string }) => void;
}) => {
  const [formData, setFormData] = useState({ message: "", date: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name == "message") {
      value = value.trimStart()
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ message: "", date: "" });
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="sm:w-[500px] w-[100%]">
      <h2 className="text-2xl font-semibold mb-4 text-black">Add  New Message</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 bg-purple-200">
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 bg-purple-200 text-black"
            placeholder="Enter your message"
          />
        </div>
        <div className="mb-4 bg-purple-200">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 bg-purple-200 text-black "
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-800 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
