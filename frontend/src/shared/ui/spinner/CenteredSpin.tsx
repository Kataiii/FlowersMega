import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';

const antIcon = <LoadingOutlined style={{ fontSize: 48, color: 'var(--primary-color)' }} spin />;

const Container = styled.div`
    position: 'relative', 
    width: '100%',
    height: '100%',
`

const SpinnerContainer = styled.div`
      display: 'flex';
      justify-content: 'center';
      align-items: 'center';
      position: 'fixed';
      top: 0;
      left: 0;
      width: '100%';
      height: '100%';
      background-color: 'rgba(255, 255, 255, 0.8)';
      z-index: 9999;
`

const CenteredSpin = () => {
    return (
        <Container>
            <SpinnerContainer>
                <Spin indicator={antIcon} size="large" />
            </SpinnerContainer>
        </Container>
    );
};



export default CenteredSpin;
