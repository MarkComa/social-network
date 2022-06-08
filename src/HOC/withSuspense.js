import React, { Suspense } from "react";
import Preloader from "../components/preloader";

export const withSuspense = (Component) => {
	return (props) => {
		return <Suspense fallback={<Preloader isFetching='true' />}>
			<Component {...props} />
		</Suspense>;
	};
};
