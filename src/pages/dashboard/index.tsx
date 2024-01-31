import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Layout from "../../components/layout";
import UpdateModal from "../../components/modals/UpdateModal";
import DeleteModal from "../../components/modals/DeleteModal";
import { axiosInstance } from "../../config/url";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { UserAdd } from "iconsax-react";
import reload from "../../assets/refresh.svg";

interface RowData {
  _id: string; // Adjust the type based on the actual type of _id
  // Add other properties if there are more fields in your row data
}

interface ActionColumnProps {
  field: string;
  headerName: string;
  width: number;
  renderCell: (params: { row: RowData }) => JSX.Element;
}

interface Assessment {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Dashboard = () => {
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 204,
      editable: true,
      headerAlign: "center",
    },
    {
      field: "description",
      headerName: "Description",
      width: 204,
      editable: true,
      headerAlign: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 204,
      editable: true,
      headerAlign: "center",
    },
  ];
  const navigate = useNavigate();

  const actionColumn: Array<GridColDef & ActionColumnProps> = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="flex gap-6 justify-end">
            <div
              onClick={() => handleOpenUpdate(params.row)}
              className="bg-green text-xs border border-green text-white rounded-md py-2 px-4 cursor-pointer"
            >
              Update
            </div>

            <div
              className="bg-white text-xs border border-green text-green rounded-md py-2 px-4 cursor-pointer"
              onClick={() => handleOpenDelete(params.row)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const [data, setdata] = React.useState([]);
  const [refresh, setrefresh] = React.useState(false);

  const [selectedId, setSelectedId] = React.useState("");

  const [updateModal, setupdateModal] = React.useState(false);
  const handleOpenUpdate = (rowData: Assessment) => {
    const queryParams = `?id=${rowData._id}&name=${rowData.name}&description=${rowData.description}&quantity=${rowData.quantity}`;
    navigate({
      pathname: "/",
      search: queryParams,
    });
    setSelectedId(rowData._id);
    setupdateModal(true);
  };
  const handleCloseUpdate = () => {
    navigate("/");
    setupdateModal(false);
  };

  const [deleteModal, setdeleteModal] = React.useState(false);

  const handleOpenDelete = (rowData: Assessment) => {
    setSelectedId(rowData._id);
    setdeleteModal(true);
  };
  const handleCloseDelete = () => setdeleteModal(false);

  React.useEffect(() => {
    const getdata = async () => {
      try {
        const { data } = await axiosInstance.get("/assessment");
        setdata(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, [updateModal, deleteModal, refresh]);

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const storedJsonString = localStorage.getItem("user");
    if (storedJsonString !== null) {
      const userDetails = JSON.parse(storedJsonString);
      setUser(userDetails);
    } else {
      checkUser();
    }
  }, []);

  const checkUser = () => {
    if (!user) {
      console.log("calls");
      navigate("/login");
      toast.error("Please login");
    }
  };

  const handleRefresh = () => {
    setrefresh(!refresh);
  };

  return (
    <Layout>
      <Box sx={{ height: 400, width: "100%", position: "relative" }}>
        <DataGrid
          sx={{
            background: "#fff",
            "& .MuiDataGrid-cell": {
              alignItems: "center",
              justifyContent: "center",
            },
          }}
          rows={data}
          columns={columns.concat(actionColumn)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          getRowId={(row) => row._id}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
        <div
          className="absolute bottom-4 left-4 cursor-pointer flex gap-1 items-center"
          onClick={handleRefresh}
        >
          <img src={reload} alt="" />
          <p>Refresh</p>
        </div>
      </Box>
      <UpdateModal
        open={updateModal}
        handleClose={handleCloseUpdate}
        id={selectedId}
      />
      <DeleteModal
        open={deleteModal}
        handleClose={handleCloseDelete}
        id={selectedId}
      />
    </Layout>
  );
};

export default Dashboard;
