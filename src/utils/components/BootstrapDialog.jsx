import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';

const BootstrapDialog = styled(Dialog)(({ theme,maxWidth }) => ({
    '& .MuiPaper-root': {
      width: "100%",
      maxWidth: `${maxWidth}px!important`
    },
    '& .MuDialogContent-root': {
      padding: theme.spacing(8),
  
  
    },
    '& .MuDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

export default BootstrapDialog