import axios from "axios";
import { Sizeprops, sizeStyles } from "./iconStyles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Bin = (props: Sizeprops) => {
  const deleteContent = async () => {
    try {
      const config: Record<string, unknown> = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        data: {
          contentId: props.contentId,
        },
      };
      await axios.delete(
        "https://secondbrain-5u8x.onrender.com/api/v1/content",
        config
      );

      toast.success("Content deleted successfully");
    } catch (e: unknown) {
      console.log(e);

      toast.warning("Failed to delete content");
    }
  };
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`${sizeStyles.get(
          props.size
        )} transition-all duration-300 ease-in-out hover:scale-110 active:scale-105 hover:cursor-pointer`}
        onClick={deleteContent}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </>
  );
};
