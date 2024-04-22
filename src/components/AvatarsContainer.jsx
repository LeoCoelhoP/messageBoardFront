import { useState } from 'react';
import PropTypes from 'prop-types';

import '../assets/css/avatarsContainer.css';

import { SIGN_UP_FORM } from '../data/UIMessages/SignUpPage';

export default function AvatarsContainer({
	imagesAmount = 6,
	imagePath = './avatars/avatar00',
	imagesFormat = '.png',
	className,
	setSignupData,
}) {
	const images = new Array(imagesAmount).fill(imagePath);

	const [selected, setSelected] = useState(null);
	function handleSelect(e) {
		//Remove previous selection
		if (selected) selected.classList.remove('selected');
		//Add current selection
		const selection = e.target;
		selection.classList.add('selected');
		setSelected(selection);
		setSignupData((state) => {
			return { ...state, avatarID: `00${selection.dataset.img}` };
		});
	}
	return (
		<div className={`${className} avatars`}>
			<p className='avatars-title'>{SIGN_UP_FORM.avatarContainerLabel}</p>
			<div>
				{images.map((imagePath, index) => (
					<img
						src={`${imagePath}${index}${imagesFormat}`}
						key={index}
						onClick={(e) => handleSelect(e)}
						data-img={index}
					/>
				))}
			</div>
		</div>
	);
}

AvatarsContainer.propTypes = {
	imagesAmount: PropTypes.number,
	imagePath: PropTypes.string,
	imagesFormat: PropTypes.string,
	className: PropTypes.string,
	setSignupData: PropTypes.func,
};
