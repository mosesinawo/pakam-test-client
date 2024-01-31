import * as React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import Input from "../input";
import { axiosInstance } from "../../config/url";
import { toast } from "react-toastify";
import Loader from "../../utils/Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1015,
  height: 483,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface CreateProps {
  open: boolean;
  handleClose: () => void;
}

const CreateModal: React.FC<CreateProps> = ({ open, handleClose }) => {
  const [loading, setloading] = React.useState(false);
  const [name, setname] = React.useState("");
  const [description, setdescription] = React.useState("");
  const [quantity, setquantity] = React.useState("");

  const handleSubmit = async () => {
    try {
      setloading(true);
      const res = await axiosInstance.post("/assessment", {
        name,
        description,
        quantity,
      });
      toast.success("Successfully created");
      console.log(res);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any).message);
      console.log(error);
    } finally {
      setloading(false);
      handleClose();
      setname("");
      setdescription("");
      setquantity("");
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 className="text-2xl font-bold text-black text-left mb-4">
            Create Assessment
          </h4>

          <div className="flex items-start justify-start flex-col mt-12">
            <div className="flex flex-wrap items-center justify-between w-full">
              <Input
                textLabel="Full Name"
                placeholder="David Pakurumo"
                hasEye={false}
                value={name}
                setValue={setname}
              />
              <Input
                textLabel="Description"
                placeholder="Description"
                hasEye={false}
                value={description}
                setValue={setdescription}
              />
            </div>
            <div className="mt-5">
              <Input
                textLabel="Quantity"
                placeholder="Quantity"
                hasEye={false}
                value={quantity}
                setValue={setquantity}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="text-sm text-white bg-green bg-gradient-to-b from-#008300 to-green py-2 px-10 mt-[70px] rounded-lg"
            >
              {loading ? <Loader /> : "submit"}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateModal;
