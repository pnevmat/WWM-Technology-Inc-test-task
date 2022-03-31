import React from 'react';
import {Loader} from '@progress/kendo-react-indicators';

export default function LoaderSpinner() {
	return (
		<div
			style={{
				color: '#24cca7',
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}>
			<Loader size="small" type="infinite-spinner" />
		</div>
	);
}
