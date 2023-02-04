import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EntryModal from './EntryModal';
import { getCategory } from '../utils/categories';
import { Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Fragment } from 'react';
import { Box } from '@mui/material';

// Table component that displays entries on home screen

export default function EntryTable({ entries }) {

   // Content for drop-down boxes 

   // Styled element for dropdown button
   const ExpandMore = styled((props) => {
      const { expand, ...other } = props;
      return <IconButton {...other} />;
    })
      (({ expand }) => ({
      transform: expand ? 'rotate(0deg)' : 'rotate(180deg)',
      marginLeft: 'auto',
    }));

    // array of booleans for which boxes are collapsed with useState()
    const [entriesCollapsed, setEntriesCollapsed] = useState([]);

    // handles changing whether boxes are collapsed or not
    const ExpandHelper = (entry) => {
      entry.collapsed = !entry.collapsed;
      const index = entries.indexOf(entry);
      let newArr = [...entriesCollapsed];
      newArr[index] = entry.collapsed;
      setEntriesCollapsed(newArr);
    }
   
   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
               <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Link</TableCell>
                  <TableCell align="right">User</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Share</TableCell>
                  <TableCell align="right">Open</TableCell>
                  <TableCell align='right'>Description</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {entries.map((entry) => (
                  <Fragment>
                  {/* uses a fragment to also map into collapsed elements */}
                  <TableRow
                     key={entry.id}
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                     <TableCell component="th" scope="row">
                        {entry.name}
                     </TableCell>
                     <TableCell align="right"><Link href={entry.link}>{entry.link}</Link></TableCell>
                     <TableCell align="right">{entry.user}</TableCell>
                     <TableCell align="right">{getCategory(entry.category).name}</TableCell>
                     {/* sets twitter link for each entry */}
                     <TableCell align="right"><a href={ "http://twitter.com/intent/tweet?text=Check out this website for climate good!&url=" + entry.link + "" }><button>Tweet</button></a></TableCell>
                     <TableCell sx={{ "padding-top": 0, "padding-bottom": 0 }} align="right">
                        <EntryModal entry={entry} type="edit" />
                     </TableCell>
                     <TableCell align="right">
                        {/* expanding element icon */}
                        <ExpandMore
                           expand={entry.collapsed}
                           onClick={() => ExpandHelper(entry)}
                           aria-expanded={entry.collapsed}
                           aria-label="show more">
                           <ExpandMoreIcon />
                        </ExpandMore>
                     </TableCell>
                  </TableRow>
                  {/* row which expands and displays description */}
                  <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={!entry.collapsed} timeout="auto" unmountOnExit>
                      <Box sx={{ border: 35, borderRight: 40, borderLeft: 40, borderColor: "#F3F2F2", backgroundColor: "#F3F2F2" }}>
                        <span style={{'font-weight': 'bold'}}>Description:</span> {entry.description}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
                </Fragment>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
