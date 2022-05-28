import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'

function App() {
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
      
    </>
  );
}

export default App;
