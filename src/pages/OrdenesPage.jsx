import React, {useContext, useEffect} from 'react'
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Title from '../components/Title';
import { LayoutContextProvider } from './../context/LayoutContext';


// DATOS HARDCODEADOS
function createData(id, product, quantity, details, subtotal) {
  return { id, product, quantity, details, subtotal };
}

const rows = [
  createData(
    0,
    "Sandwich",
    "3",
    "1 x Jamon y queso, 1 x Atun, 1 x Pollo",
    312.44
  ),
  createData(
    1,
    "Chaja",
    "2",
    "2 x Chaja",
    866.99
  ),
  createData(
    2,
    "Factura",
    "5",
    "3 x Medialuna Dulce, 2 x Medialuna salada",
    100.81
  ),
  createData(
    3,
    "Pan",
    "2",
    "2kg de pan",
    654.39
  ),
];

export default function OrdenesPage() {
  const {setHeaderTitle} = useContext(LayoutContextProvider);

  useEffect(() => {
    setHeaderTitle("Ordenes");
  }, [setHeaderTitle]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <React.Fragment>
            <Title>Tabla de pedido</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Detalles</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.product}</TableCell>
                    <TableCell>{row.quantity}</TableCell>
                    <TableCell>{row.details}</TableCell>
                    <TableCell align="right">{`$${row.subtotal}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </React.Fragment>
        </Paper>
      </Grid>
    </Grid>
  );
}
