import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          'content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      response = await response.json();

      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      // Handle the fetch error, e.g., set state to an empty array
      setFoodItem([]);
      setFoodCat([]);
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain!important" }}>
        <div className="carousel-inner" id="carsoul">

          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900x700?burger" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>

          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700?pastry" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900x700?barbeque" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
        </div>

        <div className="carsoul-caption" style={{ zIndex: "10" }}>
          <form className="d-flex flex-column align-items-center mt-3">
            <div className="d-flex">
              <input className="form-control me-2 mb-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} style={{ width: "450px" }} />
              {/* <button className="btn btn-outline-success text-black bg-success" type="submit">Search</button> */}
            </div>
          </form>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className='container mt-4' >
        {foodCat.length !== 0 &&
          foodCat.map(({ _id, CategoryName }) => (
            <div key={_id}>
              <h3 className="mt-4 mb-3" style={{ fontWeight: 'bold' }}>{CategoryName}</h3>
              <div className="row row-cols-1 row-cols-md-3 g-4">
              {foodItem.length !== 0 &&
  foodItem
    .filter((item) => (item.CategoryName === CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
    .map(filterItems => {
      console.log("filterItems:", filterItems); // Add this line
      return (
        <div key={filterItems._id} className='row row-cols-1 row-cols-md-3 g-4'>
          <div key={filterItems._id} className="col">
            {/* Pass filterItems as foodItem prop */}
            <Card foodItem={filterItems} options={filterItems.options[0]} />
          </div>
        </div>
      );
    })
}
              </div>
              <hr />
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
}
