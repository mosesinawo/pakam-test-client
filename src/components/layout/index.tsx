import React, { ReactNode } from "react";
import CreateModal from "../modals/CreateModal";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [createModal, setcreateModal] = React.useState(false);
  const handlecreateModal = () => setcreateModal(true);
  const handleClose = () => setcreateModal(false);

  return (
    <div className="flex">
      <aside className="bg-green hidden md:block md:w-[248px] h-screen"></aside>
      <main className="w-[100%] bg-[#F7F7F4] h-screen p-8">
        <h4 className="text-2xl font-bold text-black text-left mb-4">
          Assessment
        </h4>
        <div className="flex justify-end ">
          <button
            onClick={handlecreateModal}
            className="text-sm text-white bg-green bg-gradient-to-b from-#008300 to-green py-2 px-10 mt-6 rounded-lg text-right mb-10"
          >
            Create
          </button>
        </div>
        {children}
      </main>
      <CreateModal open={createModal} handleClose={handleClose} />
    </div>
  );
};

export default Layout;
