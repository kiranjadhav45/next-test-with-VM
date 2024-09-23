"use client";
import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Layout, Carousel, message } from "antd";
import "./Login.css";

// import { useAuth } from '../../context/auth/AuthProvider';

const login = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append("UserName", username);
    formData.append("Password", password);

    const response = await fetch("https://localhost:7018/API/Account/Login", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      console.error("Login Failed");
      return response;
    }

    const responseData = await response.json();
    if (responseData.Jsonresponse.Result) {
      const data = JSON.parse(responseData.Jsonresponse.Response);
      setUser({
        ...user,
        accessToken: data.accessToken,
        Id: data.UserId,
        DisplayName: data.DisplayName,
        Email: data.Email,
        RoleName: data.RoleName,
      });

      secureLocalStorage.setItem("accessToken", data.accessToken);
      secureLocalStorage.setItem("displayName", data.DisplayName);
      setAccessToken(data.accessToken);
    } else {
      console.error("Login Failed:", responseData.Jsonresponse.Message);
      // Throw an error so that it's caught in the try-catch block in onFinish
      throw new Error(responseData.Jsonresponse.Message);
    }

    return response;
  } catch (error) {
    console.error("Login Failed:", error.message);
    throw error; // Propagate the error for handling in the component
  }
};

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  // const { login } = useAuth();
  const settings = {
    dots: {
      className: "custom_dots_btn",
    },
  };

  const [messageApi, contextHolder] = message.useMessage();

  async function onFinish(values) {
    // console.log('Received values:', values);
    setSubmitting(true);

    try {
      // Call the login function from AuthProvider
      var response = await login(values.username, values.password);

      if (response.status === 200) {
        // Redirect back to the originally requested private route
        const redirectPath = location.state?.from || "/common/dashboard";
        navigate(redirectPath, { replace: true });
      } else if (response.status === 401) {
        messageApi.error("Login failed Incorrect username or password.", 10);
      } else {
        messageApi.error("Something went wrong.", 10);
      }
    } catch (error) {
      messageApi.error("Something went wrong.", 10);
      // Handle errors
      console.error("Login Failed:", error.message);
    } finally {
      console.log("API CALL FINISHED");
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="login_page_wrapper">
        {/* {contextHolder} */}
        <Row>
          <Col
            className="d-none d-md-block"
            xs={24}
            sm={24}
            md={24}
            xl={12}
            lg={12}
          >
            <div className="left_content_wrapper">
              <div className="content_container">
                <div className="caousel_wrapper">
                  <Carousel autoplay {...settings}>
                    <div className="carousel_slider text-light">
                      <div className="text_wrapper mb-3">
                        <div className="header_text">
                          Attack Surface Management
                        </div>
                        <div className="description_text">
                          Your attack surface is all the hardware, software,
                          SaaS, and cloud assets that are accessible from the
                          Internet that process or store your data. Think of it
                          as the total number of attack vectors cybercriminals
                          could use to manipulate a network or system to extract
                          data. Your attack surface includes:
                        </div>
                      </div>
                      <video width="100%" controls muted>
                        <source src="/videos/F-ASM.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <ul className="mb-2">
                        <li>
                          Known assets: Inventoried and managed assets such as
                          your corporate website, servers, and the dependencies
                          running on them.
                        </li>
                        <li>
                          Unknown assets: Such as Shadow IT or orphaned IT
                          infrastructure that was stood up outside of the
                          purview of your security team such as forgotten
                          development websites or marketing sites.
                        </li>
                      </ul>
                      <div className="mb-3">
                        Your attack surface is all the hardware, software, SaaS
                        & cloud assets that are accessible from the internet
                        that process your store data.
                      </div>
                      <a
                        href="https://www.securenexus.io/asm.html"
                        target="_blank"
                      >
                        <button className="know_more">Know More</button>
                      </a>
                    </div>
                    <div className="carousel_slider text-light">
                      <div className="text_wrapper mb-3">
                        <div className="header_text">
                          Software Composition Analysis
                        </div>
                        <div className="description_text">
                          SecureNexus SCA empowers organizations of all sizes to
                          gain complete control over the open-source and
                          third-party components within their codebase. Our
                          advanced solution provides automated analysis and
                          insightful reporting, allowing you to identify and
                          address vulnerabilities before they can be exploited
                          by attackers.
                        </div>
                      </div>
                      <video width="100%" controls muted>
                        <source src="/videos/SCA.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <ul className="mb-2">
                        <li>
                          Vulnerability Detection: Proactively identify and
                          address security risks within your open-source
                          dependencies.
                        </li>
                        <li>
                          License Compliance Assurance: Ensure your software
                          adheres to the licensing regulations and avoid
                          accidental non-compliance.
                        </li>
                        <li>
                          Outdated Components Alerts: Receive early warnings
                          about outdated or end-of-life components in your
                          codebase.
                        </li>
                      </ul>
                      <div className="mb-3">
                        This proactive approach to code security ensures youre
                        building applications with confidence and mitigating
                        risks associated with external dependencies.
                      </div>
                    </div>
                    <div className="carousel_slider text-light">
                      <div className="text_wrapper mb-3">
                        <div className="header_text">
                          Cloud Security Posture Management
                        </div>
                        <div className="description_text">
                          Continuously monitor your cloud environment, identify
                          misconfigurations, and proactively address threats
                          before they can compromise your security.
                        </div>
                      </div>
                      <video width="100%" controls muted>
                        <source src="/videos/CSPM.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <ul className="mb-2">
                        <li>Accelerate Cloud Adoption with Confidence</li>
                        <li>Improve Cloud Security Posture</li>
                        <li>Reduce Cloud Security Costs</li>
                        <li>Simplify Compliance Management</li>
                      </ul>
                      <div className="mb-3">
                        This proactive approach ensures your cloud environment
                        remains secure, compliant, and optimized for
                        performance.
                      </div>
                      <a
                        href="https://www.securenexus.io/cspm.html"
                        target="_blank"
                      >
                        <button className="know_more">Know More</button>
                      </a>
                    </div>
                    <div className="carousel_slider text-light">
                      <div className="text_wrapper mb-3">
                        <div className="header_text">
                          Third Party Risk Management (TPRM)
                        </div>
                        <div className="description_text">
                          <ul>
                            <li>Vet Vendors. Manage Risks. Build Trust</li>
                            <li>
                              Streamline vendor onboarding, automate risk
                              assessments, and gain real-time insights to ensure
                              youre working with reliable partners.
                            </li>
                            <li>
                              Build trust with secure and transparent supply
                              chain.
                            </li>
                          </ul>
                        </div>
                      </div>
                      <video width="100%" controls muted>
                        <source src="/videos/TPRM.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <a
                        href="https://www.securenexus.io/tprm.html"
                        target="_blank"
                      >
                        <button className="know_more">Know More</button>
                      </a>
                    </div>
                    <div className="carousel_slider text-light">
                      <div className="text_wrapper mb-3">
                        <div className="header_text">
                          Vulnerability Management
                        </div>
                        <div className="description_text">
                          <ul>
                            <li>
                              Centralized vulnerability management to track
                              vulnerabilities across the organization.
                            </li>
                            <li>360 degree view of vulnerabilities.</li>
                            <li>
                              Single dashboard and tracker for streamlined
                              management.
                            </li>
                          </ul>
                        </div>
                      </div>
                      <video width="100%" controls muted>
                        <source src="/videos/VM.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <a
                        href="https://www.securenexus.io/vm.html"
                        target="_blank"
                      >
                        <button className="know_more">Know More</button>
                      </a>
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} xl={12} lg={12}>
            <div className="login_container">
              <div className="login_container_card">
                <div className="login_content_wrap">
                  <div className="logo text-center"></div>
                  <div className="header_des text-center">
                    <div className="title">LOGIN</div>
                    <div className="des">
                      Hey, Enter your details to get login to your account
                    </div>
                  </div>
                  <div className="login_form_content">
                    <Form layout="vertical" onFinish={onFinish}>
                      <Form.Item
                        name="username"
                        label="User Name"
                        style={{ marginBottom: 18 }}
                      >
                        <Input size="large" placeholder="Enter User ID" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        label="Password"
                        style={{ marginBottom: 18 }}
                      >
                        <Input
                          size="large"
                          type="password"
                          placeholder="Enter Password"
                        />
                      </Form.Item>
                      <Form.Item
                        className="text-end"
                        style={{ marginBottom: 0 }}
                      >
                        <a className="login_form_forgot" href="#">
                          Forgot password
                        </a>
                      </Form.Item>

                      <Form.Item style={{ marginBottom: 18 }}>
                        <Button
                          block
                          size="large"
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          loading={submitting}
                        >
                          Log in
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
