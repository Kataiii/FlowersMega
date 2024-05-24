import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routing/Router';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
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
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	</ConfigProvider>
);