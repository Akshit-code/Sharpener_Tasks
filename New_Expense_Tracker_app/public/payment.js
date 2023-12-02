async function buyPremiumFunction() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/payment/createOrder', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        const responseData = await response.json();
        console.log(responseData);
        const options = {
            key: responseData.razorPayId, 
            amount: responseData.amount,
            currency: responseData.currency,
            order_id: responseData.id,
            handler: async function (response) {
                console.log(response);
                if (response.razorpay_payment_id) {
                    // Payment successful
                    alert('Payment Successful!');
                    console.log("After Payment: ", response);
                    await addOrder(response, responseData.amount);
                }
            },
            theme: {
                color: '#3399cc'
            },
            retry: false
        };

        const rzp = new Razorpay(options);
        rzp.open();
        rzp.on('payment.failed', function(response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        
    } catch (error) {
        console.error(error);
        // Handle errors here
    }
}

async function addOrder(response, amount) {
    const token = localStorage.getItem('token');
    try {
        const x = await fetch(`http://localhost:3000/payment/addOrder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                amount: amount,
                response: response
            })
        });

        if (!x.ok) {
            const errorData = await x.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        const responseData = await x.json();
        console.log('AddOrder: ', responseData);
    } catch (error) {
        console.error('Error in addOrder:', error);
        // Handle errors in addOrder here
    }
}

