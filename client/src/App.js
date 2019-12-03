import React from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => {
	const [ token, setToken ] = React.useState(false);

	return (
		<Router>
			<Switch>
				<Route exact path="/" render={() => <Join setToken={() => setToken(true)} />} />
				<Route
					path="/chat"
					render={() => (token ? <Chat setToken={() => setToken(false)} /> : <Redirect to="/" />)}
				/>
			</Switch>
		</Router>
	);
};

export default App;
