import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  cardsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    '&>div': {
      margin: '10px 20px',
      flex: 1,
    },
    '&>:last-child': {
      marginRight: '0',
    },
    '&>:first-child': {
      marginLeft: '0',
    },
  },
  card: {
    boxShadow: 'none',
    border: `1px solid #ccc`,
  },
});

export default useStyles;
