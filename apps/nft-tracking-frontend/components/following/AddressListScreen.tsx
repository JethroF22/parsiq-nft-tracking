import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';

import HomeScreen from '../common/HomeScreen';
import AddressListHeader from './AddressListHeader';

const useStyles = makeStyles({
  root: {
    border: 0,
    fontSize: '1.5rem',
    '& .MuiDataGrid-virtualScroller': {
      overflow: 'auto',
    },
    '& .MuiDataGrid-columnsContainer': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      borderBottom: ' 1px solid rgba(224, 224, 224, 1)',
    },
    '& .MuiDataGrid-cell': {
      flexGrow: '1 !important',
    },
    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
      display: 'none',
    },
    '& .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel, & .MuiTablePagination-input':
      {
        fontSize: '1.2rem',
      },
  },
});

export default function AddressListScreen() {
  const classes = useStyles();
  const rows: GridRowsProp = [
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
    { id: 1, col1: '12345678', col2: 'Address 1' },
    { id: 2, col1: '12345678', col2: 'Address 2' },
  ];
  const columns: GridColDef[] = [
    {
      field: 'col1',
      headerName: 'Address',
      align: 'center',
      width: 400,
      headerAlign: 'center',
      headerClassName: 'grid-header',
    },
    {
      field: 'col2',
      headerName: 'Name',
      align: 'center',
      width: 400,
      headerAlign: 'center',
      headerClassName: 'grid-header',
    },
  ];
  return (
    <HomeScreen>
      <AddressListHeader />
      <div style={{ height: '80vh', width: 800, margin: '3rem auto' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          className={classes.root}
          showColumnRightBorder={false}
        />
      </div>
    </HomeScreen>
  );
}
