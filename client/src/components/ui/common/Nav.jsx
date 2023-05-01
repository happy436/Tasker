import React from 'react'

function Nav() {
    return (
        <nav>
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<a
							className="nav-link disabled"
							/* href="#" */
							aria-disabled="true"
						>
							Profile
						</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link disabled"
							/* href="#" */
							aria-disabled="true"
						>
							Projects
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link active" /* href="#" */>Board</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link disabled"
							/* href="#" */
							aria-disabled="true"
						>
							Settings
						</a>
					</li>
				</ul>
			</nav>
    )
}

export default Nav
