import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { declineRequest } from '../../actions/requests/DeclineReqAction';
import { acceptRequest} from '../../actions/requests/AccReqActions';



const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'reason', label: 'Reason', minWidth: 170 },
  { id: 'chat', label: 'Chat', minWidth: 100 },
  {
    id: 'deleted',
    label: 'Delete',
    minWidth: 100,
    
  },
];

function createData(name, reason, chat, deleted) {
  
  return { name,reason, chat, deleted};
}



export default function StickyHeadTable() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  

    const requests = useSelector(state => state.requests.requests);


    function handledelete(request) {
      dispatch(declineRequest(request.sender, request.recipient)).then(() => {
        navigate('/acceptrequest');
        // Do something after the action is successful

      }).catch(error => {
        // Do something if the action fails
      });
    }

    function handlerequest(request) {
      
      dispatch(acceptRequest( request.sender, request.recipient)).then(() => {
        navigate('/acceptrequest');
        // Do something after the action is successful

      }).catch(error => {
        // Do something if the action fails
      });
    }


  const rows = requests.map(request => createData(
    request.sender,request.reason,
     <ListItemButton onClick={handlerequest.bind(this,request)} >
     < CheckCircleIcon key={Math.random()} /></ListItemButton> 
     , 
     <ListItemButton onClick={handledelete.bind(this,request)}>< DeleteIcon key={Math.random()} /></ListItemButton>
     ));


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} >
                          {value}
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