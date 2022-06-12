import React from 'react'
import logo from '../../images/logo3.jpg'
import branches from '../../images/branches.jpg'

function Contactus() {
  return (
    <>
      <div className='container text-center'>
      <h1>History</h1>
      <div className="aboutRes bg-light p-3 m-3">
        <div className="row">
            <img src={logo} className='logo2 pb-5 col-12' alt="" />
        </div>
          <div className="col-12">
            <p>The famous TastyNest brand has its origins in a small Canteen and a Café in a cinema theatre called Paradise in Secunderabad in the Year 1953.
                A small 100-seater restaurant started serving typical Hyderabadi cuisine like Biryani etc. from early Sixties. The Café also used to sell general food items to the people as a one-stop Food Store.
                In 1978, Mr A Hemati took complete charge of the Restaurant from his Father & Uncle and set about renovating the Restaurant to suit the changing social trends and the evolving food habits of people in India.
                In 1983 an Air-cooled multi-cuisine Restaurant called Paradise Persis Family Restaurant and the highly popular Paradise Takeaway came up at Secunderabad.</p>
          </div>
        </div>

      <h1>Branches</h1>
      <div className="branches p-3 bg-light">
        <p>Paradise expanded its operations by moving into Bengaluru, Chennai, Visakhapatnam, Vijayawada and Gurugram besides expanding its presence in Hyderabad. More outlets are being planned in the above cities and an aggressive nationwide expansion plan including a foray into international markets is also underway.</p>
          <ul className='branch list'>
            <li>Jubilee Hills</li>
            <li>Panjagutta</li>
            <li>Kphb</li>
            <li>Bangara Hills</li>
          </ul>
          <div className="row">
            <img src={branches} alt="" className='col-12'/>
          </div>
      </div>

      <h1>Values</h1>
      <div className="values p-3 bg-light">
        <div>
          <h3>Honesty</h3>
          <p>We believe in building trust with our guests, employees and partners by conducting our business transparently and ethically.</p>
        </div>
        <div>
          <h3>Hard Work</h3>
          <p>We believe there are no shortcuts to success. We work hard as a team to delight our guests which will in turn ensure our continued success.</p>
        </div>
        <div>
          <h3>Hospitality</h3>
          <p>For us, a guest is equivalent to God and we shall always extend him the greatest welcome and warmest service.</p>
        </div>
        <div>
          <h3>Hygenic</h3>
          <p>Food is sacred. It is therefore our duty to keep our cuisine pure by following the most stringent hygiene standards in preparing and serving it.Paradise is a socially responsible institution. We always strive to minimize energy usage, resource waste and environmental pollution. As responsible corporate citizens, we support several social causes and endeavor to create a lasting impact through our CSR initiatives. Hitec City</p>
        </div>
      </div>

      <h1>Future Plans</h1>
      <div className="plans p-3 bg-light">
        <p>Paradise has several successful Outlets in Hyderabad, Bengaluru, Chennai, Visakhapatnam, Vijaywada and Gurugram. We have a clear blueprint for future growth not only in existing cities, but also in new cities including New Delhi, Pune, Kolkata, Guntur and Warangal. We are also exploring new Restaurants in multiple formats to meet the evolving needs of the new generation.</p>
      </div>
    </div>
    </>
  )
}

export default Contactus