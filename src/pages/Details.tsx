import {  useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import PaymentModal from '../components/PaymentModel'
import CardSlot from '../components/CardSlot';
import Popup from '../components/Popup';
import { makePayment } from '../util/makePayment';
import { CardContext } from '../context/cardContext';
import 'react-toastify/dist/ReactToastify.css'


const Details = () => {
  const [paymentModal, setPaymentModal] = useState<boolean>(false)
  const [singleItem, setSingleItem] = useState(
    { carnumber: "", bookingid: 1, available: true, cartiming: "" }
  );
  const { boxes, removeFromSlot } = useContext(CardContext)
  const navigate = useNavigate()

  //toggle payment model
  const handlePayment = () => {
    setPaymentModal(prev => !prev);
  }

  //handle payment
  const payment = async () => {
    const res = await makePayment(singleItem);

    if (res) {
      removeFromSlot(singleItem.bookingid);
      toast.success("Payment Successfull.")
    } else {
      toast.error("Payment Failed.")
    }
    handlePayment();
  }

  useEffect(() => {
    if (boxes.length === 0) {
      toast.error('Please enter the parking space first.')
      navigate('/');
    }
  })
  
  return (
    <div>
      <Popup />
      {paymentModal && (
        <PaymentModal
          isOpen={paymentModal}
          toggleModal={handlePayment}
          car={singleItem}
          payment = {payment}
        />
      )}
      {boxes.map((car: any) => <CardSlot
        key={car.bookingid}
        details={car}
        setSingleItem={setSingleItem}
        handlePayment={handlePayment}
      />)}
    </div>
  )
}

export default Details