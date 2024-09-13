import { Login } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFormSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      setError("");
      const formData = new FormData(event.currentTarget);
      const response = await Login(formData);
      if (response.success) {
        localStorage.setItem("auth_token", process.env.NEXT_PUBLIC_AUTH_TOKEN);
        console.log("123123123122");
        router.push("/projects");
      } else setError(response.message);

      setIsLoading(false);
    } catch (e) {
      console.log("gerar", e);
    }
  }
  return { isLoading, error, handleFormSubmit };
};
