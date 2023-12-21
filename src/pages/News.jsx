import React, { useState, useEffect } from 'react'

import { newsAPI } from '../api/api';
import Helmet from '../components/Helmet'
import ReactPaginate from 'react-paginate'
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from '@mui/material';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import NewsCard from '../components/NewsCard';

const News = () => {

    const [news, setNews] = useState([])

    const [pageCount, setPageCount] = useState(0)

    const [activePage, setActivePage] = useState(1)


    useEffect(() => {
        async function getNews() {
            try {
                const queryPage = `page=${activePage}&perPage=8`
                const response = await newsAPI.getAll(queryPage);
                setPageCount(response.data.totalPage)
                setNews(response.data.data)

            } catch (error) {
                console.log(error)
            }
        }
        getNews()
    }, [])

    const handlePageClick = (event) => {
        setActivePage(event.selected + 1);
    };
    
    return (
        <Helmet title="Tin tức">
            <Container>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h3>Tin tức</h3>
                                <div className="breadcrumb__links">
                                    <Link to="/">Trang chủ</Link>
                                    <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                                    <span>Tin tức</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="catalog">
                <div className="catalog__content">
                    <div className="row">
                    {
                                    news.map((item) => (
                                        <NewsCard
                                            key={item.id}
                                            item={item}
                                        />
                                    ))
                                }                
                        <ReactPaginate
                            className="pagination"
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={1}
                            pageCount={pageCount? pageCount: 0}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                        />
                    </div>
                </div>
            </div>      
            </Container> 
        </Helmet>
    )
}

export default News
