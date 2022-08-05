import { createContext, useState, useCallback } from 'react';

const createEmptySlots = (TOTAL_SPACES: number) => {
    const cardata = Array(TOTAL_SPACES)
        .fill(0)
        .map((_, index) => 
            Object({
                carnumber: "",
                bookingid: index,
                available: true,
                cartiming: ""
            })
        );
    return cardata;
}

export const CardContext = createContext<any>({});

const CardContextProvider = (props: any) => {
    const [cardNumber, setCardNumber] = useState<number>(0)
    const [RcValue, setRcValue] = useState<string>("");
    const [date, setDate] = useState<Date | null>(new Date());
    const [boxes, setBoxes] = useState(createEmptySlots(0))
    const [freeSlots, setFreeSlots] = useState(cardNumber)

    //return total free space
    const countFreeSlots = useCallback(() => {
        const freeSlots = boxes.filter(slot => slot.available).length;

        setFreeSlots(freeSlots);
        return freeSlots;
    }, [boxes]);

    //return a random free slot id
    const getRandomId = () => Math.floor(Math.random() * countFreeSlots());

    //return free slot id
    const getFreeSpaceId = () => {
        const freeSpace = boxes.filter(
            (val) => val.available === true
        );
        return freeSpace[getRandomId()].bookingid
    }
    
    const createSlots = (slot: number) => {
        const newBoxes = createEmptySlots(slot);
        setBoxes(newBoxes);
        setFreeSlots(slot)
    }
    
    const bookSlot = (carRc: string, datetime: Date) => {
        if (freeSlots === 0) {
            return
        }

        let carDetails = {
            carnumber: carRc,
            bookingid: getFreeSpaceId(),
            available: false,
            cartiming: datetime,
        };
        const box = [...boxes];
        box[carDetails.bookingid] = carDetails;
        setBoxes(box);
        setFreeSlots(slot => slot - 1);
    }
    
    const removeFromSlot = (bookingid: number) => {
        const newSlots = [...boxes];
        const slot = newSlots[bookingid]
        slot.available = true;
        slot.carnumber = "";
        slot.cartiming= "";
        setBoxes(newSlots);
        setFreeSlots(slot => slot + 1)

    }

    return (
        <CardContext.Provider value={{
            space: [cardNumber, setCardNumber],
            createSlots,
            bookSlot,
            boxes,
            car_num: [RcValue, setRcValue],
            arrival_time: [date, setDate],
            freeSlots,
            countFreeSlots,
            removeFromSlot,
        }}>
            {props.children}
        </CardContext.Provider>
    )
}

export default CardContextProvider;