
import React, { useEffect, useState } from 'react';
import { ratingAPI } from '../api/api';
import StarRatings from 'react-star-ratings';

function RatingView(props) {
    const [rating, setRating] = useState([]);
    const [totalStar, setTotalStar] = useState(5);
    const [statisticRating, setStatisticRating] = useState({
        "oneStar": 0,
        "twoStar": 0,
        "threeStar": 0,
        "fourStar": 0,
        "fiveStar": 0,
    });
    const { product } = props
        
    useEffect(() => {
        const getRatingData = async () => {
            try {
                const getRatingRes = await ratingAPI.getByProduct(product._id);
                setRating(getRatingRes.data.data);
            } catch (error) {
                console.log(error);
            }
        }

        if(product) getRatingData();
    }, [product])
    
    useEffect(() => {
        const tempStatisticRating = {
            "oneStar": 0,
            "twoStar": 0,
            "threeStar": 0,
            "fourStar": 0,
            "fiveStar": 0,
        };
        let tempTotalStar = 0;
        if(rating && rating.length > 0) {
            rating.forEach(
                item => {
                    switch(item.ratingStar){
                        case 1: {
                            tempStatisticRating.oneStar += 1;
                            break;
                        }
                        case 2:{
                            tempStatisticRating.twoStar += 1;
                            break;
                        }
                        case 3:{
                            tempStatisticRating.threeStar += 1;
                            break;
                        }
                        case 4:{
                            tempStatisticRating.fourStar += 1;
                            break;
                        }
                        case 5:{
                            tempStatisticRating.fiveStar += 1;
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                    tempTotalStar += item.ratingStar;
                }
            )
            setTotalStar(Math.ceil(tempTotalStar/rating.length))
            setStatisticRating(tempStatisticRating);
        }
    }, [rating])
    return (
        <div class="row">
            <div class="col-md-8 course-details-content">
            <div class="course-details-card mt--40">
                <div class="course-content">
                <h5 class="mb--20">Đánh giá</h5>
                <div class="row row--30">
                    <div class="col-lg-4">
                    <div class="rating-box">
                        <div class="rating-number">{totalStar}.0</div>
                        <div class="rating">
                            <StarRatings
                                rating={totalStar}
                                starRatedColor="#fa8c16"
                                numberOfStars={totalStar}
                                name='rating'
                                starDimension="25px"
                                starSpacing="5px"
                                isSelectable={false}
                            />
                        </div>
                        <span>{rating.length} đánh giá</span> 
                        </div>
                    </div>
                    <div class="col-lg-8">
                    <div class="review-wrapper">
                        <div class="single-progress-bar">
                        <div class="rating-text"> 5 <i class="bx bx-star" style={{color: 'rgb(250 140 22)'}} aria-hidden="true"></i> </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width: `${statisticRating.fiveStar/rating.length * 100}%`}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                            <span class="rating-value">{statisticRating.fiveStar}</span> </div>
                        <div class="single-progress-bar">
                        <div class="rating-text"> 4 <i class="bx bx-star" style={{color: 'rgb(250 140 22)'}} aria-hidden="true"></i> </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width: `${statisticRating.fourStar/rating.length * 100}%`}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <span class="rating-value">{statisticRating.fourStar}</span> </div>
                        <div class="single-progress-bar">
                        <div class="rating-text"> 3 <i class="bx bx-star" style={{color: 'rgb(250 140 22)'}} aria-hidden="true"></i> </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width: `${statisticRating.threeStar/rating.length * 100}%`}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <span class="rating-value">{statisticRating.threeStar}</span> </div>
                        <div class="single-progress-bar">
                        <div class="rating-text"> 2 <i class="bx bx-star" style={{color: 'rgb(250 140 22)'}} aria-hidden="true"></i> </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width: `${statisticRating.twoStar/rating.length * 100}%`}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <span class="rating-value">{statisticRating.twoStar}</span> </div>
                        <div class="single-progress-bar">
                        <div class="rating-text"> 1 <i class="bx bx-star" style={{color: 'rgb(250 140 22)'}} aria-hidden="true"></i> </div>
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style={{width: `${statisticRating.oneStar/rating.length * 100}%`}} aria-valuenow="0" aria-valuemin="80" aria-valuemax="100"></div>
                        </div>
                        <span class="rating-value">{statisticRating.oneStar}</span> </div>
                    </div>
                    </div>
                </div>
                <div class="comment-wrapper pt--40">
                    {
                        rating.map(item => (
                            <div class="edu-comment">
                            <div class="thumbnail"> <img src="https://www.computerhope.com/jargon/g/guest-user.png" alt="Comment Images" /> </div>
                            <div class="comment-content">
                                <div class="comment-top">
                                {/* <h6 class="title">HTML CSS Tutorials</h6> */}
                                <div class="rating">
                                    <StarRatings
                                        rating={item.ratingStar}
                                        starRatedColor="#fa8c16"
                                        numberOfStars={item.ratingStar}
                                        name='rating'
                                        starDimension="25px"
                                        starSpacing="5px"
                                        isSelectable={false}
                                    />
                                </div>
                                </div>
                                <p style={{marginTop: '0.5em'}}>{item.content}</p>
                            </div>
                            </div>
                        ))
                    }
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default RatingView;