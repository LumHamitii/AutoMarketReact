import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from 'axios';
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
      
      </div>
      <Footer />
    </div>
  );
};

export default App;
