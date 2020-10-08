import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid';

import MaterialTable, { MTableToolbar } from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';

import numberToTime from '../util/numberToTime';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';

import { encryptAndStore, decryptFromStore } from '../util/crypt';

const iconColor = '#00a7e3';

const tableIcons = {
  Add: forwardRef((props, ref) => (
    <AddBox {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  Check: forwardRef((props, ref) => (
    <Check {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  Clear: forwardRef((props, ref) => (
    <Clear {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  Export: forwardRef((props, ref) => (
    <SaveAlt {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  Filter: forwardRef((props, ref) => (
    <FilterList {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  FirstPage: forwardRef((props, ref) => (
    <FirstPage {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  LastPage: forwardRef((props, ref) => (
    <LastPage {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  NextPage: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  ResetSearch: forwardRef((props, ref) => (
    <Clear {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  Search: forwardRef((props, ref) => (
    <Search {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  SortArrow: forwardRef((props, ref) => (
    <ArrowDownward {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  ThirdStateCheck: forwardRef((props, ref) => (
    <Remove {...props} ref={ref} style={{ fill: iconColor }} />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <ViewColumn {...props} ref={ref} style={{ fill: iconColor }} />
  )),
};

let init = false;

const Table = (props) => {
  const columns = [
    { title: 'id', field: 'id', hidden: true },
    {
      title: 'Status',
      field: 'status',
      editable: 'never',
    },
    { title: 'Aufgabe', field: 'task' },
    { title: 'Dauer', field: 'duration', editable: 'never' },
    { title: 'Startzeit', field: 'startTime', hidden: true },
    { title: 'Endzeit', field: 'endTime', hidden: true },
  ];

  const initialData = {
    id: uuidv4(),
    status: 'standby',
    task: 'Programmiere die Todo-Liste',
    duration: '',
    startTime: 1,
    endTime: 2,
  };

  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (init) {
      try {
        //localStorage.setItem(storageKey, JSON.stringify(data));
        encryptAndStore(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [data]);

  useEffect(() => {
    try {
      init = true;
      //setData([initialData, ...JSON.parse(localStorage.getItem(storageKey))]);
      //const storage = JSON.parse(localStorage.getItem(storageKey));
      const storage = decryptFromStore();
      if (storage) {
        setData(storage);
      } else {
        setData([initialData]);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];

    if (newData.task === '') {
      errorList.push('Bitte Aufgabe eingeben');
    }

    if (errorList.length < 1) {
      try {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve();
        setIserror(false);
        setErrorMessages([]);
      } catch (error) {
        setErrorMessages(['Update failed! Server error']);
        setIserror(true);
        resolve();
      }
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.task === '') {
      errorList.push('Bitte Aufgabe eingeben');
    }

    if (errorList.length < 1) {
      //no error
      try {
        newData.id = uuidv4();
        newData.startTime = 0;
        newData.endTime = 0;
        newData.duration = '';
        newData.status = 'standby';

        let dataToAdd = [...data];
        dataToAdd.push(newData);
        setData(dataToAdd);
        resolve();
        setErrorMessages([]);
        setIserror(false);
      } catch (error) {
        setErrorMessages(['Cannot add data. Server error!']);
        setIserror(true);
        resolve();
      }
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    try {
      const dataDelete = [...data];
      const index = oldData.tableData.id;
      dataDelete.splice(index, 1);
      setData([...dataDelete]);
      resolve();
    } catch (error) {
      setErrorMessages(['Delete failed! Server error']);
      setIserror(true);
      resolve();
    }
  };

  const handleRowClick = (rowData, resolve) => {
    try {
      const dataUpdate = [...data];
      const index = rowData.tableData.id;
      if (String(dataUpdate[index].status).trim().toLowerCase() === 'standby') {
        //Todo active
        dataUpdate[index].status = 'active';
        dataUpdate[index].startTime = Date.now();
      } else if (
        String(dataUpdate[index].status).trim().toLowerCase() === 'active'
      ) {
        //Todo done
        dataUpdate[index].status = 'done';
        dataUpdate[index].endTime = Date.now();
        dataUpdate[index].duration = numberToTime(
          dataUpdate[index].endTime - dataUpdate[index].startTime
        );
      } else if (
        String(dataUpdate[index].status).trim().toLowerCase() === 'done'
      ) {
        //Todo standby
        dataUpdate[index].status = 'standby';
        dataUpdate[index].duration = '';
      }
      setData([...dataUpdate]);
      resolve();
      setIserror(false);
      setErrorMessages([]);
    } catch (error) {
      setErrorMessages(['Update failed! Server error']);
      setIserror(true);
      resolve();
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <div>
          {iserror && (
            <Alert severity="error">
              {errorMessages.map((msg, i) => {
                return <div key={i}>{msg}</div>;
              })}
            </Alert>
          )}
        </div>
        <MaterialTable
          className="Table"
          title=""
          components={{
            Toolbar: (props) => (
              <div style={{ backgroundColor: '#0a192b' }}>
                <MTableToolbar {...props} />
              </div>
            ),
          }}
          columns={columns}
          data={data}
          icons={tableIcons}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                handleRowAdd(newData, resolve);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                handleRowDelete(oldData, resolve);
              }),
          }}
          options={{
            paging: false,
            actionsColumnIndex: -1,
            rowStyle: (rowData) => ({
              backgroundColor:
                rowData.tableData.id === selectedRow ? '#1c1d33' : '#0a192b',
              color: '#FFF',
            }),
            headerStyle: {
              backgroundColor: '#00a7e3',
              color: '#FFF',
            },
            searchFieldStyle: {
              color: '#FFF',
            },
          }}
          onRowClick={(event, rowData) => {
            setSelectedRow(rowData.tableData.id);
            new Promise((resolve) => {
              handleRowClick(rowData, resolve);
            });
          }}
        />
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};
export default Table;
