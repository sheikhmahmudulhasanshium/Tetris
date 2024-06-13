import Image from "next/image";
import Logo from "../../public/logo.png"
const Header = () => {
    return (  
        <div className="flex justify-center items-center ">
            <Image  src={Logo} alt="logo" height={100} width={100}/>
        </div>
    );
}
 
export default Header;