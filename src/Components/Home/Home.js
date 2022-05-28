import React from 'react'
import logo2 from '../../images/logo2.jpg'

function Home() {
  return (
    <div className='home'>
      <div className="home_bg">
        <div className="container-fluid">
          {/* welcome image */}
            <div className='row logoBack'>
              <img className='col-12 col-md-10 p-5 d-block mx-auto' src={logo2} alt="Restarant Logo2" />
            </div>
            {/* some text about  */}
            <div className="text p-3">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla ipsum officia aliquam enim dicta exercitationem necessitatibus ratione quo expedita ducimus molestiae recusandae, unde magni! Eaque, molestias! Dolores itaque vero facere dolorum tempora natus necessitatibus sequi quam a minima recusandae harum, molestiae consequatur obcaecati corporis animi ab ducimus nesciunt esse est asperiores alias sint ea. Autem nostrum, distinctio vel sed pariatur modi quo magnam quaerat totam esse, ullam fugiat dolore sit dolorem eligendi culpa consectetur maiores sunt enim asperiores illum tempora aspernatur beatae nihil? Blanditiis voluptas dolores pariatur possimus necessitatibus ducimus laudantium voluptatibus, doloribus magnam natus fugit odit accusantium esse officiis.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Home