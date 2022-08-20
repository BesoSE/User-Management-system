import Meta from "./Meta"
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {

    return (
      <>
        <Meta title="User management"/>
    <Navbar />
    
      {children}
    
     <Footer />
 
      
   </>
    )
}

export default Layout
