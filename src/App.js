import './App.scss';
import {Chat} from "./components";

function App () {
	return (
		<div className="App">
			<div className='navbar'><p>Чат</p></div>
			<div className="container">
				<Chat/>
			</div>
		</div>
	);
}

export default App;
