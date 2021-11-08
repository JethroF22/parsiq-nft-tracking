const dataGridStyles = {
  root: {
    border: 0,
    fontSize: '1.8rem',
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
    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: '1.3rem',
    },
    '& .MuiDataGrid-cell': {
      flexGrow: '1 !important',
      fontSize: '1.3rem',
    },
    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
      display: 'none',
    },
    '& .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel, & .MuiTablePagination-input':
      {
        fontSize: '1.2rem',
      },
  },
};

export default dataGridStyles;
