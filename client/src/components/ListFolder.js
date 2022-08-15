import { TableBody, TableCell, TableRow } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder';
import { Link } from 'react-router-dom';


export const ListFolder = (props) => {
    return (
        <TableBody>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
                <Link to={`/mydrive?folderid=${props.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <TableCell component="th" scope="row" style={{ fontSize: '12px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <FolderIcon style={{ width: '20px', marginLeft: '9px', color: '#ffcd3c' }} />
                        <p style={{ marginLeft: '9px' }}>{props.name}</p>
                    </TableCell>
                </Link>
                <TableCell align="right" style={{ fontSize: '12px' }}>-</TableCell>
                <TableCell align="right" style={{ fontSize: '12px' }}>Folder</TableCell>
                <TableCell align="right" style={{ fontSize: '12px' }}> </TableCell>
            </TableRow>
        </TableBody >
    )
}