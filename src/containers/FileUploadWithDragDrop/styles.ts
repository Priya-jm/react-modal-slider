import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  imageUploadContainer: {
    border: '1px solid #c7c6c6',
    textAlign: 'center',
    minHeight: '150px',
    height: 'auto',
  },
  extensionText: { 
    textAlign: 'left', 
    fontSize: '0.9em', 
  },
  textOpacity : {
    opacity: '0.6' 
  }
});

export default useStyles;
