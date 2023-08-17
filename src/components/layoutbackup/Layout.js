import React, { useState, Fragment } from "react";
import {
    Route,
    Switch,
    withRouter,
    Link
} from "react-router-dom";

import { Menu, Layout, Badge, Avatar, Button } from "antd";
import "antd/dist/antd.css";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    TeamOutlined,
    HistoryOutlined,
    MailOutlined,
    MessageOutlined,
    SearchOutlined,
    SettingOutlined,
    PoweroffOutlined,
    LineChartOutlined,
    DiffOutlined,
    PlusSquareOutlined,
    ShoppingCartOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import Flag from '../../images/flag.png';
import Logo from '../../images/logo.png';
import LogoS from '../../images/logoS.png';
import FooterImage from '../../images/footer-image.png';
import Strips from '../../images/icons/strips.png';
import { GetUserInfo } from '../../../src/Services/GetUserInfo';

import {
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";

// styles
import './style.css';



// pages
import Dashboard from "../../pages/dashboard/Dashboard";
import ChangePassword from "../../pages/changePassword/ChangePassword";
import Profile from "../../pages/profile/Profile";
import Messages from "../../pages/messages/Messages";
import History from "../../pages/history/History";
//import Relatives from "../../pages/relatives/Relatives";
//import Prescription from "../../pages/prescription/Prescription";
import Settings from "../../pages/settings/Setttings";


// context

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function PageLayout(props) {

    const [collapse, setCollapse] = useState({ show: false });
    const toggleCollapsed = () => {
        setCollapse({
            show: !collapse.show
        })
    }

    var layoutState = useLayoutState();
    var layoutDispatch = useLayoutDispatch();
    var userDispatch = useUserDispatch();
    const userdata = JSON.parse(GetUserInfo()).user;

    const rightContent = [
        <Menu key="user" mode="horizontal" className="header-user">
            <SubMenu
                title={
                    <Fragment>
                        <Avatar icon={<UserOutlined />} src={userdata.userPhotoPath ? '.' + userdata.userPhotoPath : ''} />
                    </Fragment>
                }
            >
                <Menu.Item key="SignOut"><Link to="/app/profile"> Profile</Link> </Menu.Item>

                <Menu.Item key="SignOut"><Link to="/app/changepassword">Change Password</Link> </Menu.Item>

                <Menu.Item key="SignOut" onClick={() => signOut(userDispatch, props.history)}>
                    Sign out
                </Menu.Item>
            </SubMenu>
        </Menu>,
        <Avatar className="header-flag" shape="square" src={Flag} />,
        <SearchOutlined className="header-search" />

    ]
     


    return (

        <>
            <Layout className="main">
                <Sider theme="light" style={{ boxShadow: "3px 0px 4px rgba(190, 190, 190, 0.25)" }} collapsedWidth="60" width="248" trigger={null} collapsible collapsed={collapse.show} >
                    <div className="left-side-bar">
                        <div className="profile">
                            {!collapse.show ?
                                <img className="logo" alt="logo" src={Logo} /> : <img className="logoS" alt="logo" src={LogoS} />
                               }
                            <div className="profile-image">
                                {!collapse.show ?
                                    <Avatar icon={<UserOutlined />} src={userdata.userPhotoPath ? "." + userdata.userPhotoPath : ''} size={110} />
                                    : <Avatar icon={<UserOutlined />} src={userdata.userPhotoPath ? "." + userdata.userPhotoPath : ''} size={52} />}
                                
                                <span className="profile-name">{!userdata.lastName ? "" : userdata.lastName + ' '} { userdata.firstName} </span>
                                <span className="profile-button">
                                    <span><SettingOutlined /></span>
                                    <span><MailOutlined /></span>
                                    <span title="Sign Out" onClick={() => signOut(userDispatch, props.history)}><PoweroffOutlined /></span>
                                </span>
                            </div>
                        </div>
                        <Menu className="sidbar-menu" theme="light" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" icon={<LineChartOutlined />}><Link to="/app/dashboard">Summary</Link></Menu.Item>
                            <Menu.Item key="2" icon={<MessageOutlined />}><Link to="/app/messages">Messages</Link></Menu.Item>
                            <Menu.Item key="3" icon={<HistoryOutlined />}><Link to="/app/history">History</Link></Menu.Item>
                           
                            <Menu.Item key="5" icon={<DiffOutlined />}><Link to="/app/prescription">Prescription</Link></Menu.Item>
                            <Menu.Item key="6" icon={<SettingOutlined />}><Link to="/app/settings">Settings</Link></Menu.Item>
                        </Menu>
                        <Button title="Manual Reading" className="manual-reading" icon={<PlusSquareOutlined />} size="large" >
                            {!collapse.show ? "Manual Reading" : ""}
                        </Button>
                        <Button title="Order Strips" className="order-strips" icon={<img src={Strips} alt="strips" />} size="large" >

                            {!collapse.show ? "Order Strips" : ""}
                        </Button>
                        <div className="location">
                        {!collapse.show ?<>
                            <div className="location-icon">
                                 <EnvironmentOutlined />
                            </div>
                            <div className="location-content">
                                <span className="location-devliver"> Deliver to:</span>
                                <span className="location-name">{userdata.lastName} { userdata.firstName}</span>
                                <span className="location-address">Fort lauderdale - 333319</span> 
                            </div>
                            </> :
                            <div className="location-icon">
                                <EnvironmentOutlined />
                            </div>
                            }
                        </div>
                        <div className="left-side-footer">
                        <div className="left-side-footer-content">
                            <img alt="footerimage" src={FooterImage} />
                            <Button title="Order Now" className="order-now" size="small" >
                                {!collapse.show ? "Order Now" : <ShoppingCartOutlined />}
                            </Button>
                            <span className="footer-content">
                                {!collapse.show ? "FiggHealth aims at improving the living standard of chronic health patients by introducing them to all innovative technology." :
                                    "FiggHealth"
                                }
                            </span>
                        </div>
                       
                    </div>
                    </div>
                    <div className="left-side-footer">
                        <div className="footer-copyright">{!collapse.show ? "© Copyright 2023 FiggHealth" : "©"}</div>
                    </div>
                </Sider>
                <Layout className="site-layout">
                    <Header className="header-bar" style={{ padding: 0, backgroundColor: "#324370", height: 60 }}>
                        {React.createElement(collapse.show ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggleCollapsed,
                        })}
                        <Badge className="header-msg" dot color="#EF5350" offset={[2, 17]}><MailOutlined /></Badge>
                        <Badge className="header-msg" dot color="#EF5350" offset={[2, 17]}><MessageOutlined /></Badge>
                        <div className="right-container">{rightContent}</div>
                    </Header>
                    <Content className="layout-content">
                        <Switch>
                            <Route path="/app/dashboard" component={Dashboard} />
                            <Route path="/app/profile" component={Profile}/>
                            <Route path="/app/changepassword" component={ChangePassword}/>                            
                            <Route path="/app/messages" component={Messages}/>
                            <Route path="/app/history" component={History}/>
                           {/* <Route path="/app/relatives" component={Relatives}/>*/}
                           {/* <Route path="/app/prescription" component={Prescription}/>*/}
                            <Route path="/app/settings" component={Settings}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </>

    );
}

export default withRouter(PageLayout);
