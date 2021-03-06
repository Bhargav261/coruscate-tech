import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { NavLink } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <NavLink className="nav-link" aria-current="page" to={`/`}>
                    <ListItem button >
                        <ListItemText primary='Home' />
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            <List>
                <NavLink className="nav-link" aria-current="page" to={`/authorDetails/total_likes`}>
                    <ListItem button >
                        <ListItemText primary='Top 10 Liked Posts' />
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            <List>
                <NavLink className="nav-link" aria-current="page" to={`/authorDetails/total_comments`}>
                    <ListItem button >
                        <ListItemText primary='Top 10 Comment Posts' />
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
        </div>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor} >
                    <Button onClick={toggleDrawer(anchor, true)}><div className="text-xl"><i class="fa fa-bars" aria-hidden="true"></i></div></Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
