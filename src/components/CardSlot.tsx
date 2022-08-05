//mui imports
import {
  Card, CardContent, Typography, Button
} from '@mui/material';


const CardSlot = (props: any) => {
  const isAvailable = props.details.available;
  return (
    <div>
      <Button disabled={isAvailable}
        onClick={() => {
          if (!isAvailable) {
            props.handlePayment();

            props.setSingleItem(props.details)
          }
        }}
      >
          <Card sx={{ 
            backgroundColor: props.details.available ? "green" : "red",
            alignItems: 'center',
            width: 400,
          }}>
            <CardContent>
              <Typography variant="h6">{props.details.available ? "Available" : "Booked"}</Typography>
              <Typography variant="h6">PSA - {props.details.bookingid}</Typography>
            </CardContent>
          </Card>
      </Button>
    </div>
  )
}

export default CardSlot;