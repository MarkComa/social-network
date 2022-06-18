import React from "react";
import { NavLink } from "react-router-dom";

//Пустой абсолютно не наполненый и не стилизованый блок (взятый из старой верстки в будующем наполнится)

const Dashboard = () => {
	return (
		<div>
			<div>
				<h1>Overview</h1>
				<div>
					<button>
						<img
							src='assets/images/search.svg'
							alt='icon: search'
						/>
					</button>
					<button>
						<img
							src='assets/images/bell.svg'
							alt='icon: notification'
						/>
					</button>
					<div>
						<NavLink to='/'>
							<img src='assets/images/avatar.png' alt='avatar' />
						</NavLink>
						<button>
							<span>Zoia M.</span>
							<img
								src='assets/images/arrow-down.svg'
								alt='icon:arrow'
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
