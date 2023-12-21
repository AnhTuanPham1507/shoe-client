import React from 'react'
import PropTypes from 'prop-types'

import Helmet from '../components/Helmet'
import {formatDateString} from '../utils/formatDate'
import { Link } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const NewsCardDetail = props => {
    const {item} = props

    return (
        item ?
        <Helmet title={item.title}>
            <section className="breadcrumb-option">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb__text">
                                    <h3>Bài viết</h3>
                                    <div className="breadcrumb__links">
                                        <Link to="/">Trang chủ</Link>
                                        <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                        <span>Bài viết</span>
                                        <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                        <span>{item.title}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <section class="blog-hero spad" style={{
                backgroundImage: `url("${item.image.path}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
                }}>
                <div class="container" >
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-9 text-center">
                            <div class="blog__hero__text">
                                <h2 style={{color: 'red'}}>{item.title}</h2>
                                <ul>
                                    <li><strong>Đăng ngày: {formatDateString(item.createdAt)}</strong></li>
                                    <li ><strong>Tác giả: {item.authorName}</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="blog-details spad">
                <div class="container">
                    <div class="row d-flex justify-content-center">
                        <div class="col-lg-8">
                            <div class="blog__details__content">
                                <div class="blog__details__share">
                                </div>
                                <div class="blog__details__text">
                                    <p dangerouslySetInnerHTML={{ __html: item.content }} ></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
        : <div>loading</div>
    )
}

NewsCardDetail.propTypes = {
    item: PropTypes.object,
}

export default NewsCardDetail
