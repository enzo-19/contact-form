import React from 'react'
import { FaMapMarkedAlt, FaEnvelope, FaPhoneAlt, FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';

const Info = () => {
  return (
    <div className='info'>
      <h2>Let's get in touch</h2>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit sunt illum labore facilis culpa neque necessitatibus delectus asperiores.</p>

      <ul className="info-contact">
        <li><FaMapMarkedAlt className='icon'/>221b Baker Street, London</li>
        <li><FaEnvelope className='icon'/>email@info.com</li>
        <li><FaPhoneAlt className='icon'/>123 4567 890</li>
      </ul>
      <div>
        <h3>Follow us</h3>
        <ul className="info-social">
          <li><a href="#/" ><FaFacebookSquare className='icon'/></a></li>
          <li><a href="#/"><FaInstagram className='icon'/></a></li>
          <li><a href="#/"><FaTwitter className='icon'/></a></li>
        </ul>
      </div>
    </div>
  )
}

export default Info