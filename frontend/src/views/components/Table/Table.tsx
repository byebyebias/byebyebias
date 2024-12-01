import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './Table.css'

interface Column {
  id: 'transaction_id' | 'transaction_amount' | 'transaction_date' | 'sender_id' |
       'sender_zip_code' | 'sender_race' | 'sender_age' | 'sender_gender' |
       'receiver_id' | 'receiver_zip_code' | 'receiver_race' | 'receiver_age' |
       'receiver_gender' | 'predicted_fraud' | 'is_fraud';
  label: string;
  minWidth?: 150;
  align?: 'right';
  format?: (value: number) => string;
  required?: boolean;
}

const columns: readonly Column[] = [
    { id: 'transaction_id', label: 'transaction_id' },
    { id: 'transaction_amount', label: 'transaction_amount', align: 'right' },
    { id: 'transaction_date', label: 'transaction_date' },
    { id: 'sender_id', label: 'sender_id' },
    { id: 'sender_zip_code', label: 'sender_zip_code' },
    { id: 'sender_race', label: 'sender_race' },
    { id: 'sender_age', label: 'sender_age', align: 'right' },
    { id: 'sender_gender', label: 'sender_gender' },
    { id: 'receiver_id', label: 'receiver_id' },
    { id: 'receiver_zip_code', label: 'receiver_zip_code' },
    { id: 'receiver_race', label: 'receiver_race' },
    { id: 'receiver_age', label: 'receiver_age', align: 'right' },
    { id: 'receiver_gender', label: 'receiver_gender' },
    { id: 'predicted_fraud', label: 'predicted_fraud' },
    { id: 'is_fraud', label: 'is_fraud' },
];

interface Data {
    transaction_id: string,
    transaction_amount: number,
    transaction_date: string,
    sender_id: number,
    sender_zip_code: number,
    sender_race: string,
    sender_age: number,
    sender_gender: string,
    receiver_id: string,
    receiver_zip_code: number,
    receiver_race: string,
    receiver_age: number,
    receiver_gender: string,
    predicted_fraud: number,
    is_fraud: number
}

function createData(
    transaction_id: string,
    transaction_amount: number,
    transaction_date: string,
    sender_id: number,
    sender_zip_code: number,
    sender_race: string,
    sender_age: number,
    sender_gender: string,
    receiver_id: string,
    receiver_zip_code: number,
    receiver_race: string,
    receiver_age: number,
    receiver_gender: string,
    predicted_fraud: number,
    is_fraud: number
  ): Data {
    return {
      transaction_id,
      transaction_amount,
      transaction_date,
      sender_id,
      sender_zip_code,
      sender_race,
      sender_age,
      sender_gender,
      receiver_id,
      receiver_zip_code,
      receiver_race,
      receiver_age,
      receiver_gender,
      predicted_fraud,
      is_fraud,
    };
}

const rows = [
  createData('TX_0_1', 6087.48, '2023-07-07 13:59:48.275141', 0, 56126, 'Black', 39, 'Male', 'Rec_8564', 93889, 'Hispanic', 52, 'Female', 0, 1),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // Add state for selected rows if you need selection functionality
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Add handler for row selection if needed
  const handleRowSelect = (transactionId: string) => {
    setSelectedRows(prev => 
      prev.includes(transactionId) 
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} className="paper-container">
      <TableContainer sx={{ maxHeight: 440, }} className="table-container">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.transaction_id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}