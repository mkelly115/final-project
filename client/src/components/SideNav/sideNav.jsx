import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function SideNav() {
  const [state, setState] = React.useState({
    left: true, // Set left drawer to be open by default
  });

  const toggleDrawer = (open) => () => {
    setState({ ...state, left: open });
  };

  const arrowIcon = state.left ? <ArrowBackIcon /> : <ArrowForwardIcon />;
  const arrowPosition = state.left ? { left: 250 } : { left: 0 };

  return (
    <div>
      <div
        onClick={toggleDrawer(!state.left)}
        style={{
          cursor: 'pointer',
          position: 'absolute',
          transition: 'left 0.3s ease-in-out',
          ...arrowPosition,
        }}
      >
        {arrowIcon}
      </div>
      <Drawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer(false)}
        ModalProps={{ 
          BackdropProps: { invisible: true }, 
        }}
      >
        <Box
          sx={{
            width: 250,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#455a64',
            color: 'white'
          }}
          role="presentation"
          onKeyDown={toggleDrawer(false)}
        >
          <Box px={2} py={1}>
            <strong>PROJECT THREE CORP</strong>
          </Box>
          <List>
            {['Organization Overview', 'My Team Dashboard', 'My Projects'].map((text, index) => (
              <React.Fragment key={text}>
                {index !== 0 && <div style={{ borderTop: '1px solid white', margin: '16px 0' }} />}
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}