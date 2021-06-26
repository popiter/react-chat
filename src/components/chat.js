import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase";
import {Loader} from "./index";

const Chat = () => {
	const [message, setMessage] = useState({
		name: '',
		text: ''
	});
	const [errorMessage, setErrorMessage] = useState('');
	const {firestore} = useContext(Context);
	const [messages, loading] = useCollectionData(
		firestore.collection('messages').orderBy('date')
	)

	/**
	 * Обновление State(message) по значению и имени текстового поля
	 * @param event параметр event от инпута
	 */
	const changeHandler = event => {
		setMessage({...message, [event.target.name]: event.target.value})
		setErrorMessage('')
	}

	/**
	 * Отправка сообщений на сервер в коллекцию messages используя firestore.collection
	 */
	const sendMessage = () => {
		if (message.name.length && message.text.length) {
			firestore.collection('messages').add({
				text: message.text,
				name: message.name,
				date: firebase.firestore.FieldValue.serverTimestamp()
			})
			setMessage( {
				name: '',
				text: ''
			})
		} else {
			setErrorMessage('Заполните поля')
		}
	}

	if (loading) {
		return <Loader/>
	}

	return (
		<div className='chat'>
			<div className="massage">
				{!messages.length ? <h3 className='no-massage'>Сообщений еще нет</h3> :
					messages.map((item) => {
					return (
						<div key={item.date} className='item_massage'>
							<p>Имя: {item.name}</p>
							<p>Сообщение: {item.text}</p>
						</div>
					)
				})}
			</div>

			<h2 className='title'>Отправить сообщение</h2>
			<input
				type="text"
				name='name'
				placeholder='Введите свое имя'
				className='input'
				value={message.name}
				onChange={changeHandler}
			/>
			<input
				type="text"
				name='text'
				placeholder="Введите сообщение"
				className='input'
				value={message.text}
				onChange={changeHandler}
			/>
			<button
				onClick={sendMessage}
				className={`button ${!errorMessage.length ? 'margin-bottom' : null}`}
			>
				Отправить
			</button>
			{errorMessage.length ? <p className='error-text'>{errorMessage}</p> : null}

		</div>
	);
};

export default Chat;