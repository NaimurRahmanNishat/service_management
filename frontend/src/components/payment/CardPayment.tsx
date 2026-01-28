// frontend/src/components/payment/CardPayment.tsx

import PaymentCard from "../../pages/payment/PaymentCard";


const CardPayment = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="border border-gray-300 rounded-lg p-6">
        <PaymentCard/>
      </div>
    </div>
  )
}

export default CardPayment;