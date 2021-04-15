import React, {useState} from 'react'
import { Link} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { sideMenuData } from '../../services/sideMenuData';
import CloseIcon from '@material-ui/icons/Close';
import './SideMenu.css';
import LogoIcon from '../../images/Gold5.jpg'


const SideMenu = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar)

    return (
        <>
        <nav className='nav-menu active'>
        <ul className="nav-menu-items">
			<li>
			<img src={LogoIcon} alt='khairkhan.mn' height='60' />
			</li>
			<li><span className="nav-icon">KHAIRKHAN.MN</span></li>   		
			{sideMenuData.map((val, key) => {
				return (
					<li key={key} className="nav-text">
						<Link to={val.path}>
							{val.icon}
							<span>{val.title}</span>
						</Link>                            
					</li>
				);
			})}
		</ul>    
        </nav>
        </>
    )
}

export default SideMenu;
