import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import { themeSettings } from '../lib/settings';

const renderItem = item => (
	<div className="image-gallery-image">
		<NavLink to={item.path || ''}>
			<img src={item.original} alt={item.title} />
			<div
				className="caption"
				style={{ color: themeSettings.home_slider_color || '#fff' }}
			>
				<div className="caption-title">{item.title}</div>
				<div className="caption-description">{item.description}</div>
			</div>
		</NavLink>
	</div>
);

const HomeSlider = ({ images }) => {
	if (images && images.length > 0) {
		const items = images.map(item => ({
			original: `/assets/images/${item.image}`,
			title: item.title,
			description: item.description,
			path: item.path || '',
			button: item.button
		}));

		return (
			<section className="section" style={{ padding: 0 }}>
				<div className="home-slider">
					<ImageGallery
						items={items}
						lazyLoad
						showThumbnails={true}
						infinite={true}
						autoPlay={true}
						slideInterval={5000}
						showNav={themeSettings.home_gallery_shownav === true}
						showBullets={images.length > 1}
						showPlayButton={false}
						showFullscreenButton={false}
						slideOnThumbnailHover={true}
						renderItem={renderItem}
					/>
				</div>
			</section>
		);
	}
	return null;
};

HomeSlider.propTypes = {
	images: PropTypes.arrayOf(PropTypes.shape({}))
};

HomeSlider.defaultProps = {
	images: null
};

export default HomeSlider;
