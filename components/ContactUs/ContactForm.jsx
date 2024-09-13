"use client";

import { FaSpinner } from "react-icons/fa";
import useContactForm from "./useContactUs";

const ContactForm = () => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useContactForm();

  const inputClasses = "h-14 px-4 mb-3 rounded-lg transition-all bg-gray-200 placeholder-[#032e83]";
  const formClasses = "mt-10 flex flex-col w-2/3 sm:w-1/2 lg:w-2/5 normal-case";
  const textareaClasses = "h-52 my-3 rounded-lg border p-4 transition-all bg-gray-200 placeholder-[#032e83]";
  const buttonClasses = "max-w-sm whitespace-nowrap transition my-6 text-center py-2 px-10 hover:px-2 border-r-2 border-r-[#cd9a41] border-l-2 border-l-[#cd9a41] hover:border-2 hover:border-[#cd9a41] rounded mx-auto";
  const disabledButtonClass = "max-w-sm text-center py-2 px-10 transition cursor-not-allowed border-2 border-red-500 bg-gray-600 rounded mx-auto";

  return (
    <form className={formClasses} onSubmit={handleSubmit}>
      <input className={inputClasses} name="senderName" type="string" required maxLength={50} placeholder="Full Name" value={formData.senderName} onChange={handleChange} />
      <input className={inputClasses} name="senderEmail" type="email" required maxLength={500} placeholder="Your email" value={formData.senderEmail} onChange={handleChange} />
      <textarea className={textareaClasses} name="contactMessage" placeholder="Your message" required maxLength={5000} value={formData.contactMessage} onChange={handleChange} />
      <button type="submit" className={` ${!isSubmitting ? buttonClasses : disabledButtonClass}`} disabled={isSubmitting}>
        {isSubmitting ? (
          <div className="flex justify-center items-center">
            <span>Sending</span> <FaSpinner className="animate-spin ml-2" /> {/* Spinning circle icon */}
          </div>
        ) : (
          "--- Submit ---"
        )}
      </button>
    </form>
  );
};

export default ContactForm;
