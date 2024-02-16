import { useEffect, useState } from "react";

export const useCountNumber = ({
	numberMin = 0,
	numberMax = 0,
	timeInterval = 20,
}: {
	numberMin: number;
	numberMax: number;
	timeInterval?: number;
}) => {
	const [countPoint, setCountPoint] = useState(0);

	const [maxNumber, setMaxNumber] = useState(numberMax);

	const [minNumber, setMinNumber] = useState(numberMin);

	// useEffect(() => {
	//   return () => clearInterval(interval as NodeJS.Timeout);
	// }, []);

	useEffect(() => {
		setCountPoint(minNumber);
	}, [minNumber]);

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (minNumber > maxNumber) {
			setMinNumber(0);
		}

		if (maxNumber === 0) {
			return;
		}

		interval = setInterval(() => {
			setCountPoint((prev) => {
				if (prev >= maxNumber) {
					clearInterval(interval as NodeJS.Timeout);
					setMinNumber(prev);

					return prev;
				}
				return prev + 1;
			});
		}, timeInterval);

		return () => {
			clearInterval(interval as NodeJS.Timeout);
		};
	}, [maxNumber, minNumber, timeInterval]);

	return {
		countPoint,
		minNumber,
		setMaxNumber,
		setMinNumber,
	};
};
