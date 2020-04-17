import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

const Row = (
    {
        userID,
        username,
        email,
        registrationDate,
        lastLoginDate,
        isActive,
        selected,
        onChange,
    }
) => {
    return(
        <TableRow
            hover
            onClick={onChange}
        >
            <TableCell>
                
                <Checkbox
                    onChange={onChange}
                    checked={!!selected}
                />
            </TableCell>
            <TableCell>
                {userID}
            </TableCell>
            <TableCell>
                {username}
            </TableCell>
            <TableCell>
                {email}
            </TableCell>
            <TableCell>
                {(new Date(registrationDate)).toDateString()}
            </TableCell>
            <TableCell>
                {(new Date(lastLoginDate)).toDateString()}
            </TableCell>
            <TableCell>
                {isActive ? 'Active':'Blocked'}
            </TableCell>
        </TableRow>
)}

export default Row;