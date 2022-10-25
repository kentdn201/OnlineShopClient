import { Layout } from "antd";

const { Footer } = Layout;

const FooterAsset = () => {
  return (
    <Footer
      style={{
        width: "auto",
        height: "240px",
        lineHeight: "240px",
        padding: "24px 64px",
        fontSize: 24,
        textAlign: "center"

      }}
    >
        Đây là footer
    </Footer>
  );
};

export default FooterAsset;
