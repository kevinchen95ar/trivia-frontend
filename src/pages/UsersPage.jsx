import React, { useEffect, useContext, useState } from "react";
import { LayoutContextProvider } from "./../context/LayoutContext";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Card, Grid, Typography } from "@mui/material";
import { rows as hardCodeRows } from "../hardcode/UsersRowsHardcode";
import EditIcon from "@mui/icons-material/Edit";
import CustomizedDialog from "../components/dialog/Dialog";
import EditUser from "../components/EditUser";

export default function UsersPage() {
  const { setHeaderTitle } = useContext(LayoutContextProvider);

  const [pageSize, setPageSize] = useState(10);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [reload, setReload] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    setHeaderTitle("Usuarios");
  }, [setHeaderTitle]);

  useEffect(() => {
    if (reload) {
      //cambiar el hardcode por la llamada a un get de usuarios
      setRows(hardCodeRows);
      setReload(false);
    }
  }, [reload]);

  const onEdit = (id) => {
    rows.map((row) => (row.id === id ? setUser(row) : ""));
    setEditDialogOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "username", headerName: "Nombre de usuario", flex: 1 },
    {
      field: "rol",
      headerName: "Rol",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      sortable: false,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={() => onEdit(params.id)}
          label="Edit"
        />,
      ],
    },
  ];

  const showColumns = {
    id: false,
    username: true,
    rol: true,
  };

  return (
    <Grid>
      <Card
        style={{
          height: 600,
          minHeight: 400,
          width: "100%",
          minWidth: 400,
          padding: "20px 5px",
          margin: "0 auto",
        }}
      >
        <Grid marginLeft={2}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Tabla de usuarios
          </Typography>
        </Grid>
        <Grid style={{ height: 530, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 50, 100]}
            columnVisibilityModel={showColumns}
          />
        </Grid>
      </Card>

      <CustomizedDialog
        setDialogOpen={setEditDialogOpen}
        dialogOpen={editDialogOpen}
        modalTitle={"Edición de usuario"}
      >
        <EditUser setDialogOpen={setEditDialogOpen} setReload={setReload} userData={user} setUserData={setUser}></EditUser>
      </CustomizedDialog>
    </Grid>
  );
}
