import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';

const TblStructure = ({ data, columns, columnsID , onDelete}) => {
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [sort, setSort] = useState([]);

  const handleTableChange = (type, { page, sizePerPage, sortField, sortOrder }) => {
    if (type === 'pagination') {
      setPage(page);
      setSizePerPage(sizePerPage);
    } else if (type === 'sort') {
      setSort([{ dataField: sortField, order: sortOrder }]);
    }
  };

  const renderActionsColumn = () => {
    return [
      {
        dataField: 'actions',
        text: 'Actions',
        headerStyle: {
          backgroundColor: 'black',
          color: 'white',
          width:'20%',
          paddingTop: '15px',
          paddingBottom: '11px',
          textAlign: 'center',
        },
        formatter: (cell, row) => (
          <div className="text-center">
            <MDBBtn color='danger' outline onClick={() => onDelete(row.cartItem.cartid)}><MDBIcon className='ms-1' icon='trash' size='sm' /></MDBBtn>{' '}
          </div>
        ),
      },
    ];
  };

  const columnsWithActions = [...columns.map((col, index) => ({
    dataField: columnsID[index],
    text: col,
    sort: true,
    headerStyle: {
      backgroundColor: 'black',
      color: 'white',
      paddingTop: '15px',
      paddingBottom: '11px',
      textAlign: 'center',
    },
    style: { textAlign: 'center' , paddingTop:'16px' },
  })), ...renderActionsColumn()];

  const options = {
    page: page,
    sizePerPage: sizePerPage,
    onPageChange: handleTableChange,
    onSizePerPageChange: handleTableChange,
  };

  return (
    <div className='mt-4'>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={data}
        columns={columnsWithActions}
        striped
        hover
        condensed
        pagination={paginationFactory(options)}
        onTableChange={handleTableChange}
      />
    </div>
  );
};

export default TblStructure;