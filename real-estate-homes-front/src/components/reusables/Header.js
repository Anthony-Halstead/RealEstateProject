import React from 'react';
import '../../css/pages/header.css'
import '../../css/reusables/positions.css'
import { useNavigate } from 'react-router-dom';
function Header(props) {


    
  const navigator = useNavigate()
  const signOut = () => {
    localStorage.removeItem("userId")
    props.setUser({
      id: undefined,
      userName: "",
      password: "",
      isAdmin: false

    })
    navigator("/")
  }



  const renderHeader = () => {
    if (props.user.id !== undefined&&props.user.isAdmin===true) {

    return (
        <div className='header-container'>
            <div className='third-width '>
                <a href="/"> <img className='third-width' src="https://www.bing.com/images/search?view=detailV2&ccid=Bc48kWIc&id=78AEAFD09804BE5788A47427700C99D5689BDC0E&thid=OIP.Bc48kWIchvLsDpCAVgyIDAHaC6&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.05ce3c91621c86f2ec0e9080560c880c%3frik%3dDtybaNWZDHAndA%26riu%3dhttp%253a%252f%252fblog.aqarat4u.com%252fwp-content%252fuploads%252f2016%252f09%252fBeware-of-fake-real-estate-agents-in-Nigeria.png%26ehk%3d%252fa2oDbyst1VbhtMClfXaKqPONoTiQWxAbG%252fXDv9Nr8A%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=200&expw=508&q=funny+fake+real-estate+sign+images&simid=608010543171129691&FORM=IRPRST&ck=E46525F9321DC52D8CF7B18BD8F2AADC&selectedIndex=162" /></a>
            </div>
            <div className='third-width'>
                <a href="/">
                    <div className='header-link'>HOME</div>
                </a>
            </div>
            <div className='third-width'>
                <a href="/Buy">
                    <div className='header-link'>BUY</div>
                </a>
            </div>
            <div className='third-width'>
                <a href="/Admin">
                    <div className='header-link'>ADMIN</div>
                </a>
            </div>
            <div className='third-width' onClick={signOut}>Sign Out</div>
        </div>
    )
    }else if(props.user.id !== undefined&&props.user.isAdmin===false){
        return (
            <div className='header-container'>
            <div className='third-width '>
                <a href="/"> <img className='third-width' src="https://www.bing.com/images/search?view=detailV2&ccid=Bc48kWIc&id=78AEAFD09804BE5788A47427700C99D5689BDC0E&thid=OIP.Bc48kWIchvLsDpCAVgyIDAHaC6&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.05ce3c91621c86f2ec0e9080560c880c%3frik%3dDtybaNWZDHAndA%26riu%3dhttp%253a%252f%252fblog.aqarat4u.com%252fwp-content%252fuploads%252f2016%252f09%252fBeware-of-fake-real-estate-agents-in-Nigeria.png%26ehk%3d%252fa2oDbyst1VbhtMClfXaKqPONoTiQWxAbG%252fXDv9Nr8A%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=200&expw=508&q=funny+fake+real-estate+sign+images&simid=608010543171129691&FORM=IRPRST&ck=E46525F9321DC52D8CF7B18BD8F2AADC&selectedIndex=162" /></a>
            </div>
            <div className='third-width'>
                <a href="/">
                    <div className='header-link'>HOME</div>
                </a>
            </div>
            <div className='third-width'>
                <a href="/Buy">
                    <div className='header-link'>BUY</div>
                </a>
            </div>
            <div className='third-width' onClick={signOut}>Sign Out</div>
        </div>
        )

    } else {
        return (
            <div className='header-container'>
            <div className='third-width '>
                <a href="/"> <img className='third-width' src="https://www.bing.com/images/search?view=detailV2&ccid=Bc48kWIc&id=78AEAFD09804BE5788A47427700C99D5689BDC0E&thid=OIP.Bc48kWIchvLsDpCAVgyIDAHaC6&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.05ce3c91621c86f2ec0e9080560c880c%3frik%3dDtybaNWZDHAndA%26riu%3dhttp%253a%252f%252fblog.aqarat4u.com%252fwp-content%252fuploads%252f2016%252f09%252fBeware-of-fake-real-estate-agents-in-Nigeria.png%26ehk%3d%252fa2oDbyst1VbhtMClfXaKqPONoTiQWxAbG%252fXDv9Nr8A%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=200&expw=508&q=funny+fake+real-estate+sign+images&simid=608010543171129691&FORM=IRPRST&ck=E46525F9321DC52D8CF7B18BD8F2AADC&selectedIndex=162" /></a>
            </div>
            <div className='third-width'>
                <a href="/">
                    <div className='header-link'>HOME</div>
                </a>
            </div>
            <div className='third-width'>
                <a href="/SignIn">
                    <div className='header-link'>SIGN-IN</div>
                </a>
            </div>
            <div className='third-width'>
                <a href="/SignUp">
                    <div className='header-link'>SIGN-UP</div>
                </a>
            </div>
        </div>
        )

    }
    
}
return(
    renderHeader()
)
}
export default Header;