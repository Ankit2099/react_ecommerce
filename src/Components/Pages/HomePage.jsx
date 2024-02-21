import React, {useEffect, useState} from 'react'
import './home.css'
// import { LoggedIn } from '../../utilities/auth'




export default function HomePage() {

  const [products, setProducts] = useState([]);
  const Base_url = 'http://127.0.0.1:8000'

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/get_product',{
    method: "GET",
    headers :  {
      "content-type" : 'application/json'
    },
  }).then((res) => res.json())
  .then((data) => {
      console.log(data);
      setProducts(data)
  }).catch(error => console.error('Error fetching products:', error));
  }, []);
  
  // This is a memoized version of the products array to prevent unnecessary re-renders if the data doesn't change
  
  return (
    
    <div className='container1'>      
      <h1>Available Product</h1>
      <div className='products-grid'>
        {products.length > 0 ? (
        products.map((product, index) => (
        <div key={index} className='product-item'> {/* Assuming your product objects have an 'id' property */}
          <img src={`${Base_url}${product.image}`} alt={product.product_name} />
          <h3>{product.product_name}</h3>
          {/* <p>{product.description}</p> */}
          <p>Price: ${product.price}</p>
        </div>
    ))
  ) : (
      <p>No products available</p>
    )}
    
      </div>
    </div>
  )
}

// {products.length > 0 ? (
//   products.map((product, index) => (
//     <div key={index}> {/* Assuming your product objects have an 'id' property */}
//       <h3>{product.product_name}</h3>
//       <p>{product.description}</p>
//       <p>Price: ${product.price}</p>
//       <img src={product.image} alt={product.product_name} />
//     </div>
//   ))
// ) : (
//   <p>No products available</p>
// )}




// export default function HomePage() {

//   const isLoggedIn = useMemo(() => LoggedIn(), []);
//   return (
    
//     <div>
      
//       {isLoggedIn && (
//         <p>This is Home Page</p>
        
//       )}
      
//     </div>
//   )
// }
