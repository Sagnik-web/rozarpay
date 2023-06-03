import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {

  

  const Payment = async ()=>{

    const {data} = await axios.get('http://localhost:5000/payment')
    console.log(data)

    const _DEV_=document.domain === 'localhost';
    var options = {
      key: _DEV_ ? 'rzp_test_PumJ5rfAu4DWEu':null, // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      name: "Donation",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "1234567890"
      },
      notes: {
          address: "Razorpay Corporate Office"
      },
      theme: {
          color: "#3399cc"
      }
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={() =>Payment()}
        >
          Pay $50
        </a>
      </header>
    </div>
  );
}

export default App;
