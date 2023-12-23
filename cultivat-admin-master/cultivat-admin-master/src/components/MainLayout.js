import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  MdMenu,
  MdStars,
  MdFilterList,
  MdShoppingCart,
  MdAddShoppingCart,
  MdOutlineDashboard,
  MdManageAccounts,
  MdOutlineShoppingCart,
  MdOutlineAddBusiness,
  MdOutlineEditNotifications,
  MdOutlineLocalOffer,
  MdEmail,
} from "react-icons/md";
import { FaUserTie, FaImages, FaUserTag } from "react-icons/fa";
import { RxDotFilled, RxDotsHorizontal } from "react-icons/rx";
import { GrCatalogOption, GrUserManager } from "react-icons/gr";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
        style={{ overflowY: "auto" }}
      >
        <div className="logo">
          <h2 className="text-dark text-center">
            <span className="sn-logo">C</span>
            <span className="lg-logo">CULTIVAT</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <MdOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              icon: collapsed ? <RxDotsHorizontal /> : null,
              label: "Orders Management",
              isHeading: true,
            },
            {
              key: "order",
              icon: <MdOutlineShoppingCart className="fs-4" />,
              label: "Orders",
              children: [
                {
                  key: "all-orders",
                  icon: <RxDotFilled />,
                  label: "All Orders",
                },
                {
                  key: "pending",
                  icon: <RxDotFilled />,
                  label: "Pending",
                },
                {
                  key: "confirmed",
                  icon: <RxDotFilled />,
                  label: "Confirmed",
                },
                {
                  icon: <RxDotFilled />,
                  key: "delivered",
                  label: "Delivered",
                },
                {
                  icon: <RxDotFilled />,
                  key: "out-for-delivery",
                  label: "Out for Delivery",
                },
                {
                  icon: <RxDotFilled />,
                  key: "canceled",
                  label: "Canceled",
                },
              ],
            },
            {
              icon: collapsed ? <RxDotsHorizontal /> : null,
              label: "Products Management",
              isHeading: true,
            },
            {
              key: "products",
              icon: <MdAddShoppingCart className="fs-3" />,
              label: "Add Products",
            },
            {
              icon: <MdOutlineAddBusiness className="fs-3" />,
              key: "in_house_products",
              label: "In House products",
              children: [
                {
                  key: "products-lists",
                  icon: <RxDotFilled className="fs-3" />,
                  label: "Products Lists",
                },
                {
                  key: "new-products",
                  icon: <RxDotFilled className="fs-3" />,
                  label: "Add New Products",
                },
              ],
            },
            {
              icon: <FaUserTag className="fs-3" />,
              key: "seller-products",
              label: "Seller Products",
              children: [
                {
                  key: "new-products-requests",
                  icon: <RxDotFilled className="fs-3" />,
                  label: "New Products Requests",
                },
                {
                  key: "product-updated-requests",
                  icon: <RxDotFilled className="fs-3" />,
                  label: "Product Updated Requests",
                },
                {
                  key: "approved-products",
                  icon: <RxDotFilled className="fs-3" />,
                  label: "Approved Products",
                },
                {
                  key: "declined-products",
                  icon: <RxDotFilled className="fs-3" />,
                  label: "Declined Products",
                },
              ],
            },
            {
              icon: <MdStars className="fs-3" />,
              key: "brands",
              label: "Brands",
              children: [
                {
                  key: "add-brand",
                  label: "Add Brand",
                  icon: <RxDotFilled className="fs-3" />,
                },
                {
                  key: "list",
                  label: "List",
                  icon: <RxDotFilled className="fs-3" />,
                },
              ],
            },
            {
              icon: <MdFilterList className="fs-3" />,
              key: "category-setup",
              label: "Category Setup",
              children: [
                {
                  key: "category",
                  label: "Category",
                  icon: <RxDotFilled className="fs-3" />,
                },
                {
                  key: "sub-category",
                  label: "Sub Category",
                  icon: <RxDotFilled className="fs-3" />,
                },
              ],
            },
            {
              icon: <GrCatalogOption className="fs-3" />,
              key: "product-attribute",
              label: "Product Attribute",
            },
            {
              icon: collapsed ? <RxDotsHorizontal /> : null,
              label: "Users Management",
              isHeading: true,
            },
            {
              key: "users",
              icon: <MdManageAccounts />,
              label: "Users",
            },
            {
              key: "sellers",
              icon: <GrUserManager />,
              label: "Sellers",
            },
            {
              key: "employees",
              icon: <FaUserTie />,
              label: "Employees",
            },
            {
              icon: collapsed ? <RxDotsHorizontal /> : null,
              label: "Promotional Management",
              isHeading: true,
            },
            {
              key: "banners",
              icon: <FaImages />,
              label: "Banners",
            },
            {
              key: "offers_deals",
              icon: <MdOutlineLocalOffer />,
              label: "Offers & Deals",
            },
            {
              key: "notification",
              icon: <MdOutlineEditNotifications />,
              label: "Notification",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background d-flex justify-content-between ps-3 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={<MdMenu className="text-center" />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "35px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="d-flex gap-1 align-items-center">
              <div className="position-relative d-flex align-items-center">
                <MdEmail type="Email" style={{ fontSize: "1.5em" }} />
                <span className="position-relative badge bg-warning round-circle p-1">
                  2
                </span>
              </div>
              <div className="position-relative d-flex align-items-center">
                <MdShoppingCart type="Orders" style={{ fontSize: "1.5em" }} />
                <span className="position-relative badge bg-warning round-circle p-1">
                  2
                </span>
              </div>
            </div>
            <div
              className={`user-profile d-flex gap-5 align-items-center pr-3 ${
                detailsVisible ? "details-visible" : ""
              }`}
            >
              <div className="pr-2 text-left">
                <h5 className="mb-0">Sai Kumar</h5>
                <p className="mb-0">sai@admin.com</p>
              </div>
              <div onClick={toggleDetails} className="profile-img">
                <img
                  height={35}
                  width={35}
                  src="https://randomuser.me/api/portraits/men/69.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
            overflow: "initial",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
