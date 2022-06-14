// @global
import React, { FC, useState } from "react";
// @ant-d
import { Button, Modal, Space, Spin, Tabs, message, Image } from "antd";

// constants
const { TabPane } = Tabs;
const attributes = ["red", "blue", "black"];

// types
interface ISurpriseProps {
  changeTab: (key: React.SetStateAction<string>) => void;
}

// styles
const imageStyle = {
  paddingTop: "5px",
};

const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  minHeight: "550px",
};

// helper jsx components
const Loader = () => (
  <Space size="large" style={loaderStyle}>
    <Spin size="large" />
    <Spin />
    <Spin size="large" />
  </Space>
);

const Surprise = ({ changeTab }: ISurpriseProps) => {
  return (
    <Button type="primary" onClick={() => changeTab("attribute")}>
      Surprise Me
    </Button>
  );
};

const ProductPage: FC = () => {
  // states
  const [activeTab, setActiveTab] = useState<string>("product");
  const [modalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // random attribute
  const color = attributes[Math.floor(Math.random() * attributes.length)];

  // helper functions
  const changeTab = (key: React.SetStateAction<string>) => {
    setLoading(true);
    setActiveTab(key);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };


  // helper jsx components
  const Notification = () => {
    setSelectedColor(color);
    message.success(`${color.toUpperCase()} has been selected`, 3).then(() => {   
      const parent =   window.top
      if (parent) {
        parent.location.href = "http://localhost:3333/";
      }
    });
  };

  const Select = () => {
    return (
      <Button
        type="primary"
        onClick={Notification}
        hidden={selectedColor === null ? false : true}
      >
        Select Me
      </Button>
    );
  };

  // selected product/attribute
  const selectedImage = `./images/${selectedColor}.png`;

  return (
    <>
      <Modal
        visible={modalVisible}
        title="Product Page"
        footer={
          !loading ? (
            activeTab === "product" ? (
              <Surprise changeTab={changeTab} />
            ) : (
              <Select />
            )
          ) : null
        }
      >
        {" "}
        {loading ? (
          <Loader />
        ) : (
          <Tabs
            tabBarStyle={{ color: "var(--textWhite)", marginBottom: 0 }}
            activeKey={activeTab}
            onChange={changeTab}
            centered
          >
            <TabPane tab="Product" key="product" disabled>
              <Image src="./images/black.png" style={imageStyle} />
            </TabPane>
            <TabPane tab="Attribute" key="attribute" disabled>
              {selectedColor != null ? (
                <Image src={selectedImage} style={imageStyle} />
              ) : (
                <h1
                  style={{
                    paddingTop: "5px",
                    textAlign: "center",
                    textTransform: "capitalize",
                  }}
                >
                  {" "}
                  {color}
                </h1>
              )}
            </TabPane>
          </Tabs>
        )}
      </Modal>
    </>
  );
};

export default ProductPage;
