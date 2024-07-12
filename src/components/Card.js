import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
  console.log("Card props:", props);
  let dispatch = useDispatchCart();
  let data = useCart();
  const options = props.options;
  const priceOptions = Object.keys(options);
  let priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
  
    const priceValue = parseInt(options[size]) || 0; // Ensure it's a valid number
    const finalPrice = qty * priceValue;
  
    if (food !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }
  
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice, // Use the calculated price
      qty: qty,
      size: size
    });
    console.log(data);
  };
  

  const priceValue = parseInt(options[size]) || 0; // Use 0 if options[size] is not a valid number
  const finalPrice = qty * priceValue;  

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
          <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "160px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title"  >{props.foodItem.name}</h5>
            <div className='container w-100'>
              <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select className="m-2 h-100  bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
              <div className='d-inline h-100 fs-5'>
                ₹{finalPrice}/-
              </div>
            </div>
            <hr></hr>
            <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
