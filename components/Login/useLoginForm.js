import { Login } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const response = await Login(formData);
      if (!!response.error) {
        setError(response.error);
      } else {
        router.push("/projects");
      }
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, error, handleFormSubmit };
};

// import { Login } from "@/lib/actions";

// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export const useLoginForm = () => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   async function handleFormSubmit(event) {
//     event.preventDefault();
//     setIsLoading(true);
//     try {
//       const formData = new FormData(event.currentTarget);
//       const response = await Login(formData);
//       if (!!response.error) {
//         setError(response.error);
//       } else {
//         // Login successful! (No redirect here)
//         console.log("Login successful!"); // Optional: Show success message
//       }
//     } catch (e) {
//       console.error(e);
//       setError("An unexpected error occurred.");
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return { isLoading, error, handleFormSubmit };
// };
