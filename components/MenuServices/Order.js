import { useState } from "react";
import { useAuth } from '../../context/AuthContext.js';



export default function Order({userCart}) {
    const {getToken} = useAuth()
    const [file, setFile] = useState(null);
    let cart = userCart.map(product => product.id)
    let prices = userCart.map(product => product.price); // extract an array of prices
    let total = prices.reduce((acc, cur) => acc + cur, 0); // sum up the prices

    function imgChange(id, img) {
        if(id === 41) {
            return "/upload.png"
          } 
          return img.slice(10)
    }
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }
    async function handleSignUp() {
        console.log(cart)
        // Send a POST request to the /api/register route with the user's information
        const response = await fetch('/api/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + await getToken(),
          }, 
          body: JSON.stringify({
            data: cart
          }),
        });
        
        if(!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json();
         cart = []
        console.log(data)
        alert('Order Created')
        return data
      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
          console.error('No file selected');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await fetch('/api/services/upload', {
                method: 'POST',
                  headers: {
                      'Content-Type': 'multipart/form-data boundary=${formData._boundary}',
                      'Authorization': "Bearer " + await getToken(),
                  }, 
                body: formData
            });
            const data = await response.json();
            console.log('File uploaded successfully:', data);
            } catch (error) {
            console.error('Error uploading file:', error);
            }
      };
    return (
        <section className="h-100" >
            <div className="container h-100 py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-10">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                    <div>
                        <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!" className="text-body">price <i
                            className="fas fa-angle-down mt-1"></i></a></p>
                    </div>
                    </div>

        {userCart.map((cart) => (
            <div className="card rounded-3 mb-4">
                <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-2">
                            <img
                            src={imgChange(cart.id, cart.img)}
                            className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                            
                        </div>

                        <div className="col-md-0 col-lg-3 col-xl-3 text-start">
                            <p className="lead fw-normal mb-2">{cart.title}</p>
                            <p><span className="text-muted">{cart.service}</span></p>
                        </div>

                        <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="file-input">Select a file:</label>
                                    <input
                                    id="file-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    />
                                </div>
                                <button type="submit">Upload</button>
                                </form>
                        </div>

                        <div className="col-md-4 col-lg-2 col-xl-2 offset-lg-1 text-end">
                            <h5 className="mb-0">${cart.price}.00</h5>
                        </div>

                        <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                            <a href="#!" className="text-danger"><i className="fas fa-trash fa-lg"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        ))}
       
        <div className="card">
          <div className="card-body">
            <h5 className="mb-0 bold text-end">Est. Total ${total}.00</h5>
            <button type="btn" className="btn btn-block" onClick={handleSignUp}>Submit Order</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

    )
}