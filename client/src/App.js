import React from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Join from './pages/Join/Join';
import Chat from './pages/Chat/Chat';

const App = () => {
	const [ token, setToken ] = React.useState(false);

	React.useEffect(() => {
		if (localStorage.getItem('__key')) {
			setToken(true);
		}
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path="/" render={() => <Join setToken={() => setToken(true)} />} />
				<Route
					path="/chat"
					render={() => (token ? <Chat token={token} setToken={setToken} /> : <Redirect to="/" />)}
				/>
				<Redirect to="/" />
			</Switch>
		</Router>
	);
};

export default App;
