import React, { useState, useEffect } from "react";
import axios from "axios";
import { compareObj, getCookie, setCookie, copyToClipboard } from "../utils";
import Cookies from "js-cookie";

const Home = () => {
	const [inputVal, setInputVal] = useState(0);

	/* The `useEffect` hook is used to make an HTTP GET request to "http://ip-api.com/json" to get the user's
	IP address and location information. */
	useEffect(() => {
		axios
			.get("http://ip-api.com/json")
			.then((res) => {
				if (getCookie("userData")) {
					let isDataSetEqual = compareObj(res.data, getCookie("userData"));

					if (!isDataSetEqual) {
						setCookie("userData", res.data);
					}
				} else {
					setCookie("userData", res.data);
				}
			})
			.catch((err) => console.log(err));

		return () => {
			let allCookies = getCookie() || {};
			const cookieString = Object.keys(allCookies)
				.map((cookieName) => `${cookieName}=${allCookies[cookieName]}`)
				.join("; ");
			let payload = {};
			// axios
			// 	.post(
			// 		"http://localhost:3000/",
			// 		{
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 				Cookie: cookieString,
			// 			},
			// 		},
			// 		payload
			// 	)
			// 	.then((res) => console.log(res))
			// 	.catch((err) => console.log(err));
		};
	}, []);

	/**
	 * The function `handleTrackingActions` tracks user interactions and updates the interaction details
	 * accordingly, including incrementing or decrementing a value and copying text to the clipboard.
	 */
	const handleTrackingActions = (act) => {
		let interactionDetails = getCookie("userIntraction");
		if (act === "incr") {
			interactionDetails = {
				...interactionDetails,
				isIncrement: true,
			};
			setInputVal((inputVal) => Number(inputVal) + 1);
		}
		if (act === "decr") {
			if (inputVal > 0) {
				interactionDetails = {
					...interactionDetails,
					isDecrement: true,
				};
				setInputVal((inputVal) => Number(inputVal) - 1);
			}
		}
		if (act === "copy") {
			interactionDetails = {
				...interactionDetails,
				isCopied: true,
			};

			copyToClipboard(inputVal);
		}

		setCookie("userIntraction", interactionDetails);
	};

	/**
	 * The function `handleServer` sends a POST request to a server at "http://localhost:3000/" with the
	 * cookies included in the request headers.
	 */
	const handleServer = () => {
		let allCookies = Cookies.get();
		const cookieString = Object.keys(allCookies)
			.map((cookieName) => `${cookieName}=${allCookies[cookieName]}`)
			.join("; ");
		axios
			.post("http://localhost:3000/", {
				headers: {
					"Content-Type": "application/json",
					Cookie: cookieString,
				},
			})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<div className="homepage">
			<img
				src="https://static.technians.com/wp-content/uploads/2021/09/main-logo.webp"
				alt=""
				className="logo"
			/>
			<h1 className="text_center">Welcome To User Tracking Task </h1>
			<p className="text_center">
				Implement user tracking by creating cookies with essential user details
				on the first visit, tracking user interactions, and updating the cookie
				data. Additionally, set up server communication to send user cookie
				data.
			</p>
			<div className="text_center">
				<button
					id="countIncrease"
					onClick={() => {
						handleTrackingActions("incr");
					}}
				>
					+
				</button>
				<input
					type="number"
					className="input_box"
					id="countInput"
					onChange={(e) => setInputVal(e.target.value)}
					value={inputVal}
				/>
				<button
					id="countDecrease"
					onClick={() => {
						handleTrackingActions("decr");
					}}
				>
					-
				</button>
			</div>
			<div className="flexbox">
				<button
					id="copyValue"
					className="copy_btn"
					onClick={() => handleTrackingActions("copy")}
				>
					Copy To Clipboard
				</button>
				<button
					id="submit"
					className="submit_btn"
					onClick={() => handleServer()}
				>
					Send to server
				</button>
			</div>
		</div>
	);
};

export default Home;
