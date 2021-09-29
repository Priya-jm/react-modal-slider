import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
  Chip,
} from '@material-ui/core';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LOGIN, DASHBOARD } from '../constants/routes';
import { TOKEN } from '../constants/text';
import { logout } from '../services/Api/authuser';
import { removeItemFromLocalStorage } from '../utils/localstorage';
import logo from '../assets/logo.svg';
import logout_pic from '../assets/logout_pic.png';
import log_in from '../assets/log_in.png';
import HomeIcon from '@material-ui/icons/Home';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../reducers/loaderSlice';
import { checkIfAccesstokenIsValid } from '../utils';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: '67px',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: '200px',
    padding: '16px 27px',
    margin: '0px 20px 0px -35px',
  },
  profile: {
    height: '25px',
  },
}));

type HeaderProps = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  companyLogoUrl: string;
  userStatus: string;
};

const Header: React.FC<HeaderProps> = (props): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const { isLoggedIn, setLoggedIn } = props;
  const isSignUp = location.pathname === '/signup';

  const handleLogout = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    try {
      dispatch(showLoading());
      await logout();
    } catch (err) {
      console.log(err);
    } finally {
      removeItemFromLocalStorage(TOKEN);
      setLoggedIn(false);
      dispatch(hideLoading());
      history.push(LOGIN);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar} color='default'>
        <Toolbar>
          <div color='inherit' aria-label='menu' onClick={()=> isLoggedIn ? history.push(DASHBOARD) : history.push(LOGIN)}>
            <img src={logo} alt='truefi' className={classes.logo}></img>
          </div>
          <Typography variant='h6' className={classes.title}></Typography>
          {isLoggedIn && checkIfAccesstokenIsValid() ? (
            <div>
              <Tooltip title='User Status'>
                <Button>
                  <Chip
                    label={`${
                      props.userStatus.charAt(0).toUpperCase() +
                      props.userStatus.slice(1)
                    }`}
                    className={`${props.userStatus} chip`}
                  />
                </Button>
              </Tooltip>
              <Tooltip title='Company Logo'>
                <Button>
                  <Avatar src={props.companyLogoUrl} alt='Company Logo' />
                </Button>
              </Tooltip>
              <Tooltip title='Dashboard'>
                <Button
                  name='profile'
                  color='inherit'
                  onClick={(e) => history.push(DASHBOARD)}>
                  <HomeIcon />
                </Button>
              </Tooltip>
              <Tooltip title='Logout'>
                <Button name='logout' color='inherit' onClick={handleLogout}>
                  <img
                    src={logout_pic}
                    className={classes.profile}
                    alt='Logout'
                  />
                </Button>
              </Tooltip>
            </div>
          ) : (
            <div>
              {isSignUp && (
                <Tooltip title='Login'>
                  <Button
                    name='login'
                    color='inherit'
                    onClick={() => {
                      history.push(LOGIN);
                    }}>
                    <img src={log_in} className={classes.profile} alt='Login' />
                  </Button>
                </Tooltip>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
