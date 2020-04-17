import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Row from './row';

function generateRow({
    id,
    username,
    email,
    registrationDate,
    lastLoginDate,
    isActive,
    selected,
    onChange,
}) {
    return (
        <Row 
            key={id}
            userID={id}
            username={username}
            email={email}
            registrationDate={registrationDate}
            lastLoginDate={lastLoginDate}
            isActive={isActive}
            selected={selected} 
            onChange={onChange}
        />
    );
}

const UserTable = (
    {
        users,
        selectedUsers,
        onBlock,
        onUnblock,
        onDelete,
        toggleSelect,
        allSelect,
        toggleAllSelect,
    }
) => {
    return (
        <Container maxWidth='md'>
            <ButtonGroup fullWidth>
                <Button onClick={onBlock}>Block</Button>
                <Button onClick={onUnblock}>Unblock</Button>
                <Button onClick={onDelete}>Delete</Button>
            </ButtonGroup>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                checked={allSelect}
                                onChange={toggleAllSelect}
                            />
                        </TableCell>
                        <TableCell>
                            ID
                        </TableCell>
                        <TableCell>
                            Username
                        </TableCell>
                        <TableCell>
                            Email
                        </TableCell>
                        <TableCell>
                            Registration date
                        </TableCell>
                        <TableCell>
                            Last login date
                        </TableCell>
                        <TableCell>
                            Status
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((element)=> {
                        return generateRow({
                            selected: selectedUsers[element.id], 
                            onChange: () => {
                                toggleSelect(element.id)
                            },
                            ...element})
                    })}
                </TableBody>
            </Table>
        </Container>
    )
}

export default UserTable;