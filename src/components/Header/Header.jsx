import React from 'react'
import Navbar from '../Navbar/Navbar'
import SearchForm from '../SearchForm/SearchForm'
import './Header.css'
//import Book from '../BookList/Book'
import BookList from '../BookList/BookList'

const Header = () => {
  return (
    <div className='holder'>
      <header className="header">
        <Navbar/>
        <div className="header-content flex flex-c text-center text-white">
          <h2 className="header-title text-capitalize">
            Find the book of choice.
          </h2>
          <br />
          <p className="header-text fs-18 fw-3">
            But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. 
          </p>
          <SearchForm/>
        </div>
        <BookList/>
      </header>
      
    </div>
  )
}

export default Header
