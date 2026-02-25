import React from 'react'
import GoogleMapReact from "google-map-react"

export default function GoogleMap() {
	const defaultProps = {
		center: {
			lat: 10.99835602,
			lng: 77.01502627
		},
		zoom: 2
	}
	return (
		// Important! Always set the container height explicitly
		<div style={{ width: '65%', marginTop: '15px', height: '250px' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: "" }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			>
			</GoogleMapReact>
		</div>
	);
}
