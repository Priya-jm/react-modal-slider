import { Backdrop, makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
  backdrop: {
    zIndex: 100,
  },
  progress: {
    display: 'flex',
    margin: 'auto',
  },
})

const Loader = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Backdrop open={true} className={classes.backdrop}>
      <CircularProgress
        color='primary'
        size={50}
        thickness={4}
        className={classes.progress}
      />
    </Backdrop>
  );
};
export default Loader;
