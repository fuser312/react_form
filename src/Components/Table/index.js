import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    table: {
        maxWidth: 650,
    },
});

// function createData(name, phonenumber, gender ) {
//     return { name, phonenumber, gender };
// }

//const rows = [
    // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // createData('Eclair', 262, 16.0, 24, 6.0),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
//];

export default function SimpleTable(props) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Customer Id</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">Phone Number</TableCell>
                        <TableCell align="right">Remove</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((item,index) => (
                        <TableRow key={index}>
                            <TableCell align="right">{item.customerID}</TableCell>
                            <TableCell align="right">{item.customerName}</TableCell>
                            <TableCell align="right">{item.gender}</TableCell>
                            <TableCell align="right">{item.customerPhoneNumber}</TableCell>
                            <TableCell align="right"><button name='Delete'onClick={()=>console.log(item.customerID)}> <DeleteIcon /> </button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// export  SimpleTable;