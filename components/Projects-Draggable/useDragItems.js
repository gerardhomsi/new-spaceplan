import { useMemo, useEffect } from "react";
import debounce from "lodash/debounce";
import axios from "axios";

const useDragItems = (setProjectOrder) => {
  const debouncedHandleReorder = useMemo(() => {
    const handleReorder = async (newOrder) => {
      try {
        const newOrderIds = newOrder.map((project) => project._id);
        const response = await axios.put("/api/projects", { newOrder: newOrderIds });
        if (response.data && response.data.success) setProjectOrder(newOrder);
        else console.error("Error updating project order:", response.data ? response.data.error : "Unknown error");
      } catch (error) {
        console.error("Error updating project order:", error);
      }
    };

    return debounce((newOrder) => handleReorder(newOrder), 1000);
  }, [setProjectOrder]);

  useEffect(() => {
    return () => debouncedHandleReorder.cancel();
  }, [debouncedHandleReorder]);

  return debouncedHandleReorder;
};

export default useDragItems;
