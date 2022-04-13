import React from 'react';

import styles from './PageNotFound.module.css';

export default function PageNotFound() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.headerMessage}>oops!</div>
				<div className={styles.errorContainer}>
					<span className={styles.errorNumber}>404</span>
					<span className={styles.errorText}>this page does not exist</span>
				</div>
			</div>
		</div>
	);
}
