import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ChatIcon from '@mui/icons-material/Chat';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFriend } from '../actions/friendActions';
import { useNavigate } from 'react-router-dom';
import { getMessage } from '../actions/chatActions';



const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'chat', label: 'Chat', minWidth: 100 },
  {
    id: 'deleted',
    label: 'Delete',
    minWidth: 100,
    
  },
];

function createData(name, chat, deleted) {
  
  return { name, chat, deleted};
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


    // if the user signs up or signs up 
    const user = useSelector(state => state.user.user);
    const userUp = useSelector(state => state.userUp.user);

    let mainuser = user != null ? user : userUp;


    const contacts = useSelector(state => state.friends.contacts);


    function handledelete(friend) {
      dispatch(deleteFriend(mainuser.email, friend)).then(() => {
        navigate('/friends');
        // Do something after the action is successful

      }).catch(error => {
        // Do something if the action fails
      });
    }

    function handlechat(friend) {
      
      dispatch(getMessage(mainuser.email, friend)).then(() => {
        navigate('/chat');
        // Do something after the action is successful

      }).catch(error => {
        // Do something if the action fails
      });
    }





  const rows = contacts.map(contact => createData(
    contact,
     <ListItemButton onClick={handlechat.bind(this,contact)} >
     < ChatIcon /></ListItemButton> 
     , 
     <ListItemButton onClick={handledelete.bind(this,contact)}>< DeleteIcon /></ListItemButton>
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