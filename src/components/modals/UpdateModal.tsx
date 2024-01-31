import * as React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import Input from "../input";
import { axiosInstance } from "../../config/url";
import { toast } from "react-toastify";
import { useLocation} from "react-router-dom";
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
  id: string;
  handleClose: () => void;
}

const UpdateModal: React.FC<CreateProps> = ({ open, handleClose, id }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const _name = queryParams.get("name");
  const _description = queryParams.get("description");
  const _quantity = queryParams.get("quantity");


  const [loading, setloading] = React.useState(false)
  const [name, setname] = React.useState(_name ?? "");
  const [description, setdescription] = React.useState(_description ?? "");
  const [quantity, setquantity] = React.useState(_quantity ?? "");

  React.useEffect(() => {
    // Update the state when the query parameters change
    setname(_name ?? "");
    setdescription(_description ?? "");
    setquantity(_quantity ?? "");
  }, [_name, _description, _quantity]);

  const handleSubmit = async () => {
    try {
      setloading(true)
      const res = await axiosInstance.patch(`/assessment/${id}`, {
        name,
        description,
        quantity,
      });
      toast.success("successfully updated ");
      handleClose();
      console.log(res);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error((error as any).message);
      console.log(error);
    }finally{
      setloading(false)
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
            Update Assessment
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
             {loading ? <Loader/> : "submit"}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateModal;
