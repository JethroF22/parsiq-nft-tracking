import React from 'react';
import { GridOverlay } from '@mui/x-data-grid';
import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        flexDirection: 'column',
        '& .ant-empty-img-1': {
          fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
        },
        '& .ant-empty-img-2': {
          fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
        },
        '& .ant-empty-img-3': {
          fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
        },
        '& .ant-empty-img-4': {
          fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
        },
        '& .ant-empty-img-5': {
          fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
          fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
        },
      },
      label: {
        marginTop: theme.spacing(1),
        fontSize: 24,
      },
    }),
  { defaultTheme }
);

function NoRowsOverlay() {
  const classes = useStyles();
  return (
    <GridOverlay className={classes.root}>
      <div className={classes.label}>No Events To Display</div>
    </GridOverlay>
  );
}

export default NoRowsOverlay;
