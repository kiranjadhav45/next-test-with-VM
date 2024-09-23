'use client'
// import 'antd/dist/antd.css'; // This should still work, but if not, use below
// import 'antd/dist/antd.min.css'; // Try this if the above fails

import React, { useEffect, useReducer, useState } from 'react';
import { Card, Col, Row } from 'antd';

const page = () =>
    (
    <div style={{ background: '#ccc', height: '100vh' }}>
        {<Row gutter={16} style={{ maxWidth: '1000px', margin: 'auto', paddingTop: '200px' }}>
            <Col span={8}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Card title" bordered={false}>
                    Card content
                </Card>
            </Col>
        </Row>}
    </div>
);
export default page;