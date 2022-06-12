import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

function App() {

  
  window.addEventListener("scroll", function(){
    const upToTop = document.querySelector("a.bottom_to_top");
     upToTop.classList.toggle("active", window.scrollY > 0)
  });

  return (
    <>
      {/* Header */}
      <div className="header">
        <Header />
      </div>

      {/* Footer */}
      <div className="footer">
        <Footer />
      </div>

       {/* buttom to move top */}
       <div className="up_totop_btn">
          <a href="#" className="bottom_to_top">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="bi bi-chevron-up text-white" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
            </svg>
          </a>
        </div>
      
    </>
  );
}

export default App;
