"use client";
import { useState } from "react";

import { sendEmail } from "@/lib/sendEmail";
import ToastNotification from "../toaster/ToastNotification";

const useContactForm = () => {
  let initialFormData = { senderName: "", senderEmail: "", contactMessage: "" };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await sendEmail(formData);
      setFormData(initialFormData);
      let type = !!res.error ? "error" : "success";
      let message = !!res.error ? res.error : "Your form has been submitted successfully!";
      ToastNotification({ type, message });
    } catch (error) {
      ToastNotification({ type: "error", message: "Oops! Couldn't send email. Please try again" });
      setFormData(initialFormData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, isSubmitting, handleChange, handleSubmit };
};

export default useContactForm;
