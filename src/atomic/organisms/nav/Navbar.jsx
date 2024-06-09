import logo from "../../../assets/Container 86.png"
import "../../pages/auth/auth.scss"

const Navbar = () => {
  return (
    <nav style={{display:"flex", justifyContent:"space-between",alignItems:"center" ,padding:"10px 30px", height:"47px", borderBottom:"1px solid #171A1F"}}>
       <img src={logo} alt=""/>
       <button style={{width:"98px", height:"36px", background:"#6D31ED", borderRadius:"4px", fontSize:"14px"}} className="btn">Log out</button>
       
    </nav>
  )
}

export default Navbar