import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './routing/Router';
import { ConfigProvider, Spin } from 'antd';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { createGlobalStyle, styled } from 'styled-components';

const RootContainer = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  }

  :root {
    --main-bg-color: #F5EFF5;
    --primary-bg-color: #FF749F;
    --primary-bg-color-hover: #FF558A;
    --secondary-bg-color: #6bc778;
    --secondary-bg-color-hover: #5cad68;
    --block-bg-color: #FFFFFF;
    --block-bg-color-hover: #eeeeee;
    --primary-text-color: #FFFFFF;
    --secondary-text-color: #1A2030;
    --text-modal: #8B8B8B;
    --unactive-text-color: #B7B7B7;
    --primary-review-text: #861C82;
    --secondary-review-text: #9C789B;
    --city-active: #FFDCE7;
    --city-active-hover: #f093b0;
    --error: #ff4d4f;
    --extra-pice: #9D0000;
    --extra-price-all: #F71258;
}

  div::-webkit-scrollbar {}

  div::-webkit-scrollbar-track {
    background: #F5EFF5;
    border-radius: 8px;
  }

  div::-webkit-scrollbar-thumb {
    background-color: #FF749F;
    border-radius: 8px;
  }

  div::-webkit-scrollbar-thumb:hover {
    background: #FF558A;

  }

  div::-webkit-scrollbar {
    height: 9px;
    width: 5px;
  }

  .customSizedUpload .ant-upload {
    width: 150px !important;
    height: 155px !important;
  }

  textarea::-webkit-scrollbar-thumb {
    background-color: #FF749F !important;
    border-radius: 8px !important;
  }

  textarea::-webkit-scrollbar-thumb:hover {
    background: #FF558A;
  }

  textarea::-webkit-scrollbar-track {
    background: #F5EFF5;
    border-radius: 8px;
  }

  .inputModal:disabled {
    background-color: white !important;
    color: black;
  }

  .inputModal::-webkit-scrollbar-thumb {
    background-color: #FF749F !important;
    border-radius: 8px !important;
  }

  textarea::-webkit-scrollbar-thumb:hover ::-webkit-scrollbar-thumb {
    background-color: #FF749F !important;
    border-radius: 8px !important;
  }
`;

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<>
		<RootContainer/>
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#FF749F",
					colorPrimaryActive: "#FF558A",
					colorPrimaryHover: "#FF558A"
				},
				components: {
					Input:{
						activeBorderColor: "#FF558A",
						hoverBorderColor: "#FF558A",
						colorBorder: "#FF749F",
						fontFamily: "Inter"
					}
				}
			}}>
			<Provider store={store}>
				<PersistGate persistor={persistor} loading={<Spin></Spin>}>
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</ConfigProvider>
	</>
);
