import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';

import useFetchUserAddresses from '../../hooks/useFetchUserAddresses';
import { RequestState } from '../../types/http';

import AddressListHeader from './AddressListHeader';
import HomeScreen from '../common/HomeScreen';
import LoadingIcon from '../common/LoadingIcon';
import useGetUserAddresses from '../../hooks/useGetUserAddresses';
import dataGridStyles from '../styles/dataGrid';

const useStyles = makeStyles(dataGridStyles);

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
