import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { axiosInstance } from "../../config/url";
import Loader from "../../utils/Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 532,
  height: 240,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface CreateProps {
  open: boolean;
  id:string;
  handleClose: () => void;
}

const DeleteModal: React.FC<CreateProps> = ({ open, handleClose , id}) => {

  const [loading, setloading] = React.useState(false);

  const handleDelete = async() =>{
    setloading(true)
    try {
      const res = await axiosInstance.delete(`/assessment/${id}`);
      toast.success("successfully deleted ");
      handleClose();
      console.log(res);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any).message);
      console.log(error);
    }finally{
      setloading(false)
    }
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col justify-between h-full">
            <h4 className="text-2xl font-bold text-green text-left ">
              Delete Waste Category
            </h4>

            <div>
              <p className="text-[16px] font-medium text-gray">
                Are you sure you want to delete this waste categoty?
              </p>
            </div>

            <div className="flex items-start justify-end  gap-5">
              <button onClick={handleClose} className="text-sm text-green border border-green py-2 px-10 rounded-lg">
                Cancel
              </button>
              <button onClick={handleDelete} className="text-sm text-white bg-red-600 py-2 px-10  rounded-lg">
                {loading ? <Loader/> : "Delete"}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
