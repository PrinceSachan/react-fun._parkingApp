import { useState } from 'react';
import { calculateTime, calculateAmount } from "../util/calculate";

//mui imports
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography
} from "@mui/material";

const PaymentModal: React.FC<any> = (
    { isOpen, toggleModal, car, payment }
) => {
    const [disable, setDisable] = useState<boolean>(false)

    return (
        <Dialog open={isOpen} onClose={toggleModal}>
            <DialogTitle>Payment</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    For parking exit please pay below 
                    mention amount for car number <b>{ car.carnumber }</b>
                </DialogContentText>
                <Typography gutterBottom>
                    {calculateTime(car)}
                </Typography>
                <TextField
                    label="Amount"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ readOnly: true }}
                    variant="outlined"
                    value={calculateAmount(car) + " $"}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    type='submit'
                    disabled={disable}
                    onClick={() => {
                        payment()
                        setDisable(true)
                    }}
                    variant="outlined"
                >
                    Pay
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PaymentModal;