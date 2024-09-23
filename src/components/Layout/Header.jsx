// Header.js
import React, { useEffect, useState } from "react";
// import { json, useNavigate } from "react-router-dom";
import "./Header.css";
import {
  Dropdown,
  Input,
  Layout,
  Switch,
  Modal,
  Select,
  Avatar,
  Badge,
  notification,
} from "antd";
import {
  AppstoreOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { UserOutlined } from "@ant-design/icons";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationModal from "../notification/NotificationModal";
import DashboardOptionModal from "../dashboardOptionModal/DashboardOptionModal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import { useAuth } from "../../context/auth/AuthProvider";
// import { ajaxCallNotifcation, getModuleId } from "../../services/api";
import secureLocalStorage from "react-secure-storage";
// import { handleApiResponse, handleResponse } from "../../utility/utils";

const { Header } = Layout;
dayjs.extend(relativeTime);

const HeaderComponent = ({ updateMenuItems }) => {
  // const { logout, user } = useAuth();

  const headerText = window.localStorage.getItem("headerText");
  const title = headerText ? headerText.toLocaleUpperCase() : null;
  const displayName = secureLocalStorage.getItem("displayName");

  //console.log(headerText)

  // const navigate = useNavigate();

  const getCurrentDate = () => {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // const handleLogout = () => {

  //     secureLocalStorage.removeItem('accessToken')

  //     logout()
  //         .then((response) => {
  //             // Additional logic after logout if needed
  //             // console.log(response);
  //             // Redirect or perform other actions after logout
  //             navigate('/login');
  //         })
  //         .catch((error) => {
  //             // Handle logout error
  //             console.error('Logout Error:', error);
  //         });
  // };

  const getInitials = (name) => {
    if (!name) return "";
    const initials = name.match(/\b\w/g) || [];
    return initials.join("").toUpperCase();
  };

  //--------------------profile modal start ---------------------------------//
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const showProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
  };
  // const handleProfileOk = () => {
  //   setIsProfileModalOpen(false);
  // };
  const handleProfileCancel = () => {
    setIsProfileModalOpen(false);
  };

  // profile modal start
  const ProfileModal = () => {
    return (
      <Modal
        mask={false}
        className="profile_modal"
        open={isProfileModalOpen}
        closable={false}
        footer={null}
        // onOk={handleProfileOk}
        onCancel={handleProfileCancel}
      >
        <div className="profile_card_content">
          <div className="user_info position-relative">
            <EditOutlinedIcon
              style={{ position: "absolute", top: 10, right: 10 }}
            />
            <div className="user_name">{displayName}</div>
            {/* <p className="user_role">{user.RoleName}</p> */}
            <p className="login_time">Last Login : {getCurrentDate()} </p>
          </div>
          <div className="change_password d-flex align-items-center gap-2">
            <div
              className="lock_icon"
              style={{ background: "#E6EEFD", padding: 4, borderRadius: 8 }}
            >
              <LockOutlinedIcon style={{ color: "#63637D" }} />
            </div>
            <div className="text_change_pass common_style">Change Password</div>
          </div>
          {/* <div className="settings border-bottom">
            <div className="setting_wrap">
              <div
                className="settings_icon"
                style={{ background: "#E6EEFD", padding: 4, borderRadius: 8 }}
              >
                <SettingsIcon style={{ color: "#63637D" }} />
              </div>
              <div className="text_setting common_style">Settings</div>
            </div>
            <div className="select_dashboard">
              <label className="select_dash_label">
                Select Defoult dashboard
              </label>
              <Select
                size="large"
                defaultValue="Admin Panel"
                style={{
                  width: "100%",
                }}
              >
                <Select.Option value="Admin Panel">Admin Panel</Select.Option>
                <Select.Option value="Vulnerability Management">
                  Vulnerability Management
                </Select.Option>
                <Select.Option value="Security & Compliance">
                  Security & Compliance
                </Select.Option>
                <Select.Option value="Cloud Security Posture Management">
                  Cloud Security Posture Management
                </Select.Option>
                <Select.Option value="Template Builder">
                  Template Builder
                </Select.Option>
                <Select.Option value="Cyber Insurance">
                  Cyber Insurance
                </Select.Option>
                <Select.Option value="Exception Management">
                  Exception Management
                </Select.Option>
                <Select.Option value="Third Party Risk Management">
                  Third Party Risk Management
                </Select.Option>
              </Select>
            </div>
          </div> */}
          <div className="help d-flex align-items-center gap-2">
            <div
              className="help_icon"
              style={{ background: "#E6EEFD", padding: 4, borderRadius: 8 }}
            >
              <HelpOutlineIcon style={{ color: "#63637D" }} />
            </div>
            <div className="text_change_pass common_style">Help</div>
          </div>
          <div className="log_out d-flex align-items-center gap-2">
            <a href="/login" className="text-decoration-none">
              <button className="logout_btn" onClick={handleLogout}>
                <LogoutIcon style={{ color: "#63637D" }} />
                <span className="common_style">Logout</span>
              </button>
            </a>
          </div>
        </div>
      </Modal>
    );
  };
  // profile modal end

  //--------------------notification modal ---------------------------------//
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationState, setNotificationState] = useState({
    notificationCount: 0,
    notifications: [],
  });

  const showNotificationModal = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };
  const handleNotifiCancel = () => {
    setIsNotificationOpen(false);
  };
  //--------------------notification modal end ---------------------------------//

  // -------dashboard options modal start--------
  const [openDashboardOptions, setOpenDashboardOptions] = useState(false);
  const showDashboardOption = () => {
    setOpenDashboardOptions(true);
  };
  const onCloseDashboardOption = () => {
    setOpenDashboardOptions(false);
  };
  // -------dashboard options modal end--------

  // const fetchNotifications = async () => {
  //     try {

  //         setNotificationState({
  //             notificationCount: 0,
  //             notifications: []
  //         });
  //         // Fetch Module ID
  //         const response = await getModuleId();
  //         const responseJson = handleApiResponse(response)

  //         let moduleId = '';
  //         if (responseJson.success) {
  //             moduleId = responseJson.data;
  //         }

  //         // Prepare form data
  //         const formData = new FormData();
  //         formData.append("Action", 4);
  //         formData.append("ModuleId", moduleId);

  //         // Fetch notifications
  //         const notificationResponse = await ajaxCallNotifcation(formData);
  //         // Process notificationResponse as needed

  //         let apiReponse = handleApiResponse(notificationResponse);

  //         if (apiReponse.success) {

  //             let data = apiReponse.data;

  //             let notificationsCount = data.Table1.length;

  //             const notificationsWithTimeAgo = data.Table1.map(notification => {
  //                 // Convert the 'createdat' property to a Date object
  //                 const createdAtDate = new Date(notification.createdat);
  //                 // Use dayjs to get the time ago format
  //                 const timeAgo = dayjs(createdAtDate).fromNow();
  //                 // Return the notification object with the 'timeAgo' property added
  //                 return {
  //                     ...notification,
  //                     timeAgo: timeAgo // or simply 'timeAgo' if the property name is same
  //                 };
  //             });

  //             setNotificationState({
  //                 notificationCount: notificationsCount,
  //                 notifications: notificationsWithTimeAgo
  //             });

  //         }

  //     } catch (error) {
  //         console.error('Error fetching notifications:', error);
  //     }
  // };

  useEffect(() => {
    //fetchNotifications()
  }, []);

  return (
    <Header
      className="xbitz_header"
      style={{ background: "#fff", padding: "0 20px", height: 60 }}
    >
      <div className="header_wrapper">
        <div className="dashboard_name_title">{title}</div>
        <div className="header_right_panel">
          <Input
            style={{ borderRadius: 10 }}
            prefix={<SearchOutlined />}
            width={200}
            placeholder="Search here"
          />

          <div className="position-relative">
            <AppstoreOutlined
              onClick={showDashboardOption}
              style={{ fontSize: 24, color: "#63637D" }}
            />
            <DashboardOptionModal
              className="dashboard_option_modal"
              openDashboardOptions={openDashboardOptions}
              onCloseDashboardOption={onCloseDashboardOption}
              updateMenuItems={updateMenuItems}
            />
          </div>

          <div className="position-relative">
            <Badge count={notificationState.notificationCount}>
              <BellOutlined
                onClick={showNotificationModal}
                style={{ fontSize: 24, color: "#63637D" }}
              />
            </Badge>
            <NotificationModal
              showNotificationModal={showNotificationModal}
              isNotificationOpen={isNotificationOpen}
              handleNotifiCancel={handleNotifiCancel}
              className="notification_modal"
              notificationJsonData={notificationState.notifications}
              // shown={showModal}
              // close={() => setShowModal(false)}
            />
          </div>
          <div className="support_icon" style={{ height: "75px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <mask
                id="mask0_971_20322"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="32"
                height="32"
              >
                <rect width="32" height="32" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_971_20322)">
                <path
                  d="M14.667 28V25.3333H25.3337V15.8667C25.3337 13.2667 24.4281 11.0611 22.617 9.25C20.8059 7.43889 18.6003 6.53333 16.0003 6.53333C13.4003 6.53333 11.1948 7.43889 9.38366 9.25C7.57255 11.0611 6.66699 13.2667 6.66699 15.8667V24H5.33366C4.60033 24 3.97255 23.7389 3.45033 23.2167C2.9281 22.6944 2.66699 22.0667 2.66699 21.3333V18.6667C2.66699 18.2 2.78366 17.7611 3.01699 17.35C3.25033 16.9389 3.5781 16.6111 4.00033 16.3667L4.10033 14.6C4.2781 13.0889 4.71699 11.6889 5.41699 10.4C6.11699 9.11111 6.99477 7.98889 8.05032 7.03333C9.10588 6.07778 10.317 5.33333 11.6837 4.8C13.0503 4.26667 14.4892 4 16.0003 4C17.5114 4 18.9448 4.26667 20.3003 4.8C21.6559 5.33333 22.867 6.07222 23.9337 7.01667C25.0003 7.96111 25.8781 9.07778 26.567 10.3667C27.2559 11.6556 27.7003 13.0556 27.9003 14.5667L28.0003 16.3C28.4225 16.5 28.7503 16.8 28.9837 17.2C29.217 17.6 29.3337 18.0222 29.3337 18.4667V21.5333C29.3337 21.9778 29.217 22.4 28.9837 22.8C28.7503 23.2 28.4225 23.5 28.0003 23.7V25.3333C28.0003 26.0667 27.7392 26.6944 27.217 27.2167C26.6948 27.7389 26.067 28 25.3337 28H14.667ZM12.0003 18.6667C11.6225 18.6667 11.3059 18.5389 11.0503 18.2833C10.7948 18.0278 10.667 17.7111 10.667 17.3333C10.667 16.9556 10.7948 16.6389 11.0503 16.3833C11.3059 16.1278 11.6225 16 12.0003 16C12.3781 16 12.6948 16.1278 12.9503 16.3833C13.2059 16.6389 13.3337 16.9556 13.3337 17.3333C13.3337 17.7111 13.2059 18.0278 12.9503 18.2833C12.6948 18.5389 12.3781 18.6667 12.0003 18.6667ZM20.0003 18.6667C19.6225 18.6667 19.3059 18.5389 19.0503 18.2833C18.7948 18.0278 18.667 17.7111 18.667 17.3333C18.667 16.9556 18.7948 16.6389 19.0503 16.3833C19.3059 16.1278 19.6225 16 20.0003 16C20.3781 16 20.6948 16.1278 20.9503 16.3833C21.2059 16.6389 21.3337 16.9556 21.3337 17.3333C21.3337 17.7111 21.2059 18.0278 20.9503 18.2833C20.6948 18.5389 20.3781 18.6667 20.0003 18.6667ZM8.03366 16.6C7.8781 14.2444 8.58921 12.2222 10.167 10.5333C11.7448 8.84444 13.7114 8 16.067 8C18.0448 8 19.7837 8.62778 21.2837 9.88333C22.7837 11.1389 23.6892 12.7444 24.0003 14.7C21.9781 14.6778 20.117 14.1333 18.417 13.0667C16.717 12 15.4114 10.5556 14.5003 8.73333C14.1448 10.5111 13.3948 12.0944 12.2503 13.4833C11.1059 14.8722 9.70033 15.9111 8.03366 16.6Z"
                  fill="#63637D"
                />
              </g>
            </svg>
          </div>

          <div onClick={showProfileModal} className="profile_img_div">
            <Avatar size="default" style={{ cursor: "pointer" }}>
              {getInitials(displayName)}
            </Avatar>
          </div>
          <ProfileModal />
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
