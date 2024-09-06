import React from 'react';
import { selectFeaturedCampsite } from '../features/campsites/campsitesSlice';
import { selectFeaturedPromotion } from '../features/promotions/promotionsSlice';
import { selectFeaturedPartner } from '../features/partners/partnersSlice';

const DisplayList = () => {
    const featuredCampsite = selectFeaturedCampsite();
    const featuredPromotion = selectFeaturedPromotion();
    const featuredPartner = selectFeaturedPartner();

    return (
        <div>
            <div>
                <h3>Featured Campsite</h3>
                <p>{featuredCampsite.name}</p>
                <p>{featuredCampsite.description}</p>
            </div>

            <div>
                <h3>Featured Promotion</h3>
                <p>{featuredPromotion.name}</p>
                <p>{featuredPromotion.description}</p>
            </div>

            <div>
                <h3>Featured Partner</h3>
                <p>{featuredPartner.name}</p>
                <p>{featuredPartner.description}</p>
            </div>
        </div>
    );
};

export default DisplayList;
