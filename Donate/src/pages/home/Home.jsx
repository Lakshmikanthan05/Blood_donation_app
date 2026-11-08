import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='conta'>
      <div className='section_1'>
        <h2 className='head'>DONATE</h2>
        <h1 className='head1'>YOUR BLOOD</h1>
        <p className='sen'>You don't have to be a doctor to save life</p>
        <p className='sen'>Just Donate Blood</p>
        <p className='sen'>It's safe. It's simple. It saves life.</p>
        <button onClick={()=> navigate("/login")} className='start'>Join Us</button>
      </div>
      <div className='section2'>
        <div className='num'>
          <h1 className='n'>3540+</h1>
          <p>Donated Registered</p>
        </div>
        <div className='num'>
          <h1 className='n'>10987+</h1>
          <p>Lives Saved</p>
        </div>
        <div className='num'>
          <h1 className='n'>7809+</h1>
          <p>Blood Requests Fulfilled</p>
        </div>
      </div>

      <div className='section3'>
        <h1>Feedback from donors</h1>
        <div className='feed'>
          <div className='sub1'>
            <p>“I donate every 3 months. It’s the least I can do to help someone in need. Everyone should experience this joy.”</p>
            <p>— Divya R., Software Engineer, Coimbatore</p>
          </div>
          <div className='sub1'>
            <p>“Donating blood was quick and painless. Knowing that my small act could save someone’s life gave me a sense of purpose.”</p>
            <p>— Rajesh M., College Student, Chennai</p>
          </div>
          <div className='sub1'>
            <p>f“My father needed O- blood during surgery. Thanks to this platform, we found a donor in 15 minutes. Forever grateful!”</p>
            <p>— Preethi S., Madurai</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
