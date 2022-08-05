import React, { useState, useContext } from 'react';
import { CardContext } from '../context/cardContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

//mui imports
import {
    Box, Card, CardActions, CardContent, Button, TextField, Typography
} from '@mui/material';

const Home = () => {
    const [slots, setSlots] = useState<number | string>('')
    const { createSlots } = useContext(CardContext)
    const navigate = useNavigate()

    const handleChange = (event: any) => {
        const num = event.target.value;
        setSlots(num);
    }

    const create = (e: React.FormEvent) => {
        e.preventDefault()

        const slot_number = Number(slots);

        if (slots > 0) {
            createSlots(slot_number);
            navigate('/details')
        } else {
            toast.error("Please enter a vaild number");
        }
    }
    
    return (
        <div>
            <Box 
                component="form"
                onSubmit={create}
                sx={{
                    maxWidth: 400,
                    margin: 2,
                    mx: 'auto'
            }}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h6'>Enter the parking space</Typography>
                        <CardActions sx={{ display: 'block' }}>
                            <TextField
                                type='number'
                                fullWidth
                                margin="dense"
                                variant='outlined'
                                label='Enter the require parking space'
                                onChange={handleChange}
                                value={slots}
                            />
                            <Button
                                sx={{ mt: 2 }}
                                variant="contained"
                                disabled={!slots.toString().trim().length}
                                type='submit'
                            >
                                Book
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Box>
      </div>
  )
}

export default Home

