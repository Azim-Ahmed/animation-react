import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { Typography, IconButton, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
    deleteNodeDataToTheTable,
    editableNodeDataToTheTable,
    editNodeDataToTheTable
} from '../../redux/actions';
const useStyles = makeStyles({
    table: {
        width: '100%',
    },
    container: {
        maxHeight: 450,
        '& .MuiTableCell-root': {
            padding: 20
        }
    },
    table__row: {
        boxShadow: '2px 2px 1px gray',
        margin: '10px'
    },
    edit_delete_button_style: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    edit_icon_button: {
        color: '#005ae5',
        marginLeft: '10px'
    },
    removeButtonStyle: {
        color: "red"
    }

});

export default function NodeTable(props) {
    const classes = useStyles();
    //redux
    const dispatch = useDispatch()
    const handleDeleteItem = (id) => {
        dispatch(deleteNodeDataToTheTable(id))
    }
    const handleEditItem = (id) => {
        dispatch(editableNodeDataToTheTable(true))
        dispatch(editNodeDataToTheTable(id))
    }

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table stickyHeader aria-label="sticky table" className={classes.table} size="small" >
                <TableHead>
                    <TableRow>
                        <TableCell>Source</TableCell>
                        <TableCell align="right">Input</TableCell>
                        <TableCell align="right">Step*</TableCell>
                        <TableCell align="right">Output</TableCell>
                        <TableCell align="right">Destination</TableCell>
                        <TableCell align="right">Purpose</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row) => (
                        <TableRow className={classes.table__row} key={row.source}>
                            <TableCell component="th" scope="row">
                                {row.source}
                            </TableCell>
                            <TableCell align="right">{row.input}</TableCell>
                            <TableCell align="right">{row.step}</TableCell>
                            <TableCell align="right">{row.output}</TableCell>
                            <TableCell align="right">{row.destination}</TableCell>
                            <TableCell align="right">{row.purpose}</TableCell>
                            <TableCell align="right">
                                <Box className={classes.edit_delete_button_style}>
                                    <Typography color="primary" variant="body1">FEEDBACK</Typography>
                                    <IconButton
                                        onClick={() => handleEditItem(row.id)}
                                        aria-label="edit"
                                    >
                                        <EditIcon
                                            className={classes.edit_icon_button} />
                                    </IconButton>
                                </Box>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton
                                    onClick={() => handleDeleteItem(row.id)}
                                    aria-label="delete"
                                >
                                    <RemoveCircleIcon className={classes.removeButtonStyle} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
