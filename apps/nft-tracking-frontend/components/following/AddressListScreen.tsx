import React, { useContext } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';

import useFetchUserAddresses from '../../hooks/useFetchUserAddresses';
import { RequestState } from '../../types/http';

import AddressListHeader from './AddressListHeader';
import HomeScreen from '../common/HomeScreen';
import LoadingIcon from '../common/LoadingIcon';
import useGetUserAddresses from '../../hooks/useGetUserAddresses';

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
  const requestState = useFetchUserAddresses();
  const addresses = useGetUserAddresses();
  const rows: GridRowsProp = addresses;
  const columns: GridColDef[] = [
    {
      field: 'col1',
      headerName: 'Address',
      align: 'center',
      width: 400,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      valueGetter: (item) => {
        return item.row.address;
      },
    },
    {
      field: 'col2',
      headerName: 'Name',
      align: 'center',
      width: 400,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      valueGetter: (item) => {
        return item.row.name;
      },
    },
  ];
  return (
    <HomeScreen>
      {requestState === RequestState.RESOLVED && (
        <>
          <AddressListHeader />
          <div style={{ height: '80vh', width: 800, margin: '3rem auto' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              className={classes.root}
              showColumnRightBorder={false}
            />
          </div>
        </>
      )}
      {requestState === RequestState.LOADING && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            width: 800,
            margin: '3rem auto',
          }}
        >
          <LoadingIcon size="5x" />
        </div>
      )}
    </HomeScreen>
  );
}
