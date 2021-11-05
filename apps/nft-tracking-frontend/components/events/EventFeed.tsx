import React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';

import useFetchUserEvents from '../../hooks/useFetchUserEvents';
import { RequestState } from '../../types/http';

import LoadingIcon from '../common/LoadingIcon';
import useGetUserEvents from '../../hooks/useGetUserEvents';
import dataGridStyles from '../styles/dataGrid';
import ListHeader from '../common/ListHeader';
import { EventTypes } from '@parsiq-nft-tracking/api-interfaces';

const useStyles = makeStyles(dataGridStyles);

function EventFeed() {
  const classes = useStyles();
  const requestState = useFetchUserEvents();
  const addresses = useGetUserEvents();
  const rows: GridRowsProp = addresses;
  const columns: GridColDef[] = [
    {
      field: 'col1',
      headerName: 'From Address',
      align: 'center',
      width: 300,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      valueGetter: (item) => {
        return item.row.address;
      },
    },
    {
      field: 'col2',
      headerName: 'To Address',
      align: 'center',
      width: 300,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      valueGetter: (item) => {
        return item.row.toAddress;
      },
    },
    {
      field: 'col3',
      headerName: 'Code Address',
      align: 'center',
      width: 300,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      valueGetter: (item) => {
        return item.row.codeAddress;
      },
    },
    {
      field: 'col4',
      headerName: 'Transaction Hash',
      align: 'center',
      width: 300,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      valueGetter: (item) => {
        return item.row.transactionHash;
      },
    },
    {
      field: 'col5',
      headerName: 'Event Type',
      align: 'center',
      width: 300,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      valueGetter: (item) => {
        return item.row.eventType === EventTypes.NEWLY_MINTED_TOKEN
          ? 'Minted Token'
          : 'Token Transfer';
      },
    },
  ];
  return (
    <>
      {requestState === RequestState.RESOLVED && (
        <>
          <ListHeader>
            <div className="title">Events</div>
          </ListHeader>
          <div style={{ height: '80vh', width: 1500, margin: '3rem auto' }}>
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
    </>
  );
}

export default EventFeed;
