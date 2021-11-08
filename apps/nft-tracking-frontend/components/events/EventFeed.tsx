import React, { useState } from 'react';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridSortModel,
} from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';

import useFetchUserEvents from '../../hooks/useFetchUserEvents';
import useGetUserEvents from '../../hooks/useGetUserEvents';
import useSubscribeToEvents from '../../hooks/useSubscribeToEvents';

import { RequestState } from '../../types/http';

import NoRowsOverlay from './NoRowsOverlay';
import dataGridStyles from '../styles/dataGrid';
import ListHeader from '../common/ListHeader';

const useStyles = makeStyles(dataGridStyles);

function EventFeed() {
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: 'blockTimestamp',
      sort: 'desc',
    },
  ]);
  const classes = useStyles();
  useSubscribeToEvents();
  const requestState = useFetchUserEvents();
  const events = useGetUserEvents();
  const rows: GridRowsProp = events;
  const columns: GridColDef[] = [
    {
      field: 'address',
      headerName: 'From Address',
      align: 'center',
      width: 375,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      valueGetter: (item) => {
        return item.row.address;
      },
    },
    {
      field: 'toAddress',
      headerName: 'To Address',
      align: 'center',
      width: 375,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      valueGetter: (item) => {
        return item.row.toAddress;
      },
    },
    {
      field: 'codeAddress',
      headerName: 'Code Address',
      align: 'center',
      width: 375,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      valueGetter: (item) => {
        return item.row.codeAddress;
      },
    },
    {
      field: 'blockTimestamp',
      headerName: 'Block Timestamp',
      align: 'center',
      width: 375,
      headerAlign: 'center',
      headerClassName: 'grid-header',
      valueGetter: (item) => {
        return dayjs(item.row.blockTimestamp * 1000).format(
          'ddd, MMM D, YYYY h:mm A'
        );
      },
    },
  ];
  return (
    <>
      <>
        <ListHeader>
          <div className="title">Events</div>
        </ListHeader>
        <div style={{ height: '80vh', width: 1500, margin: '3rem auto' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            className={classes.root}
            loading={requestState === RequestState.LOADING}
            showColumnRightBorder={false}
            components={{
              NoRowsOverlay: NoRowsOverlay,
            }}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
          />
        </div>
      </>
    </>
  );
}

export default EventFeed;
