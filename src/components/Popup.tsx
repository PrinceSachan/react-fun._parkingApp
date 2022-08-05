import { useState, useContext } from 'react';
import { CardContext } from '../context/cardContext';
import { toast } from 'react-toastify';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

//mui imports
import { 
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';



const Popup = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [carRc, setCarRc] = useState<string>('')
  const [datetime, setDatetime] = useState(new Date())
  
  const { boxes, bookSlot, freeSlots } = useContext(CardContext)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // const disableFutureDate = (current)=> {
  //   return current.isBefore(datetime)
  // }

  const toggleModal = () => {
    setOpen(p => !p)
    setCarRc("")
  };

  const bookTheSlot = () => {

    var isMatch = boxes.some((car: any) => {
      return car.carnumber === carRc
    });

    if (isMatch) {
      toast.error("Already Registered.");
      return;
    }

    bookSlot(carRc, datetime);
    setTimeout(() => {
      toggleModal();
    }, 100);
    toast.success("Successfully Registered.")
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (freeSlots === 0) {
      toast.error("Parking is Full.");
      return;
    }
    bookTheSlot()
  }

  return (
    <div>
      <Button variant="contained" onClick={toggleModal}>
        Book your slot
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={toggleModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          New Car Registration
        </DialogTitle>
        <DialogContent>
          <hr />
        </DialogContent>
        <Box component='form' onSubmit={onSubmit}>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>     
              <DateTimePicker
                label="Car Arrival Date & Time"
                maxDateTime={new Date()}
                value={datetime}
                onChange={(newValue) => {
                  setDatetime(newValue as Date)
                }}
                renderInput={(params) => <TextField
                  {...params}
                  // disabled={true}
                  required={true}
                  onKeyDown={(e: any) => {
                    e.preventDefault()
                  }}
                />}
              />   
            </LocalizationProvider>
          </DialogContent>
          <DialogContent>
            <TextField
              fullWidth
              label="Enter RC Number"
              type="string"
              variant='outlined'
              autoComplete='off'
              value={carRc}
              onChange={(e) => setCarRc(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              type='submit'
              disabled={!carRc}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Button variant="contained" sx={{ m: 2 }} >Total Spaces: {boxes.length}</Button>
      <Button variant="contained" >Availabel Spaces: {freeSlots}</Button>
    </div>
  );
}

export default Popup;