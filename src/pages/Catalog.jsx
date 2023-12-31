import React, { useState, useEffect, useRef } from 'react'

import { partnerAPI, categoryAPI, productAPI, bannerAPI } from '../api/api';
import Helmet from '../components/Helmet'
import CheckBox from '../components/CheckBox'
import InfinityList from '../components/InfinityList'
import ReactPaginate from 'react-paginate'
import { Button, Container } from 'react-bootstrap';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import useQuery from '../hooks/useQuery';
import { useHistory } from 'react-router';
import _ from 'lodash';
import { useLocation } from "react-router-dom";
import HeroSlider from '../components/HeroSlider';

const Catalog = () => {
    const history = useHistory();
    const searchTerm = useQuery().get("tu-khoa")
    const selectedCategory = useQuery().get('loai-san-pham');
    const location = useLocation

    const removeQueryParam = () => {
        const { pathname } = location;
        const newSearch = new URLSearchParams();
        history.push({
          pathname: pathname,
          search: newSearch.toString()
        });
    }    
    

    const initFilter = {
        categories: [],
        partners: [],
        fromPrice: null,
        toPrice: null
    }


    const [products, setProducts] = useState([])

    const [filter, setFilter] = useState(initFilter)

    const [categories, setCategories] = useState([])

    const [partners, setPartners] = useState([])

    const [banners, setBanners] = useState([]);

    const [pageCount, setPageCount] = useState(0)

    const [activePage, setActivePage] = useState(1)

    const [fromPrice, setFormPrice] = useState(null);

    const [toPrice, setToPrice] = useState(null);

    const [selectedRangePrice, setSelectedRangePrice] = useState('0');

    useEffect(() => {
            const tempSelectedCategory = selectedCategory?.replace('-', ' ');
            const foundCategory = categories.find(item => item.name === tempSelectedCategory)
            if(foundCategory){
                setFilter(
                    {
                        categories: [foundCategory._id],
                        partners: []
                    }
                )
            }
            
        
    },[selectedCategory, categories])

    useEffect(() => {
        async function initialData() {
            try {
                const response = await Promise.all([
                    categoryAPI.getAll(),
                    partnerAPI.getAll(),
                    bannerAPI.getAll()
                ]);
            setCategories(response[0].data.data)
            setPartners(response[1].data.data)
            setBanners(response[2].data.data);
            } catch (error) {
                console.log(error)
            }
        }
        initialData()
    }, [])

    useEffect(() => {
        async function getProducts() {
            try {
                let queryParams = Object.values(
                        _.omitBy(filter, _.isNil)
                    ).reduce(
                    (result, item, index) => {
                        switch(index) {
                            case 0: {
                                result += item.reduce((r, cate) => `${r}categoryIds[]=${cate}&`, '');
                                break;
                            }

                            case 1: {
                                result += item.reduce((r, partner) => `${r}partnerIds[]=${partner}&`, '');
                                break;
                            }

                            case 2: {
                                result += `fromPrice=${item}&`;
                                break;
                            }

                            case 3: {
                                result += `toPrice=${item}&`;
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        return result;
                    }, ``
                );

                if(searchTerm && queryParams === '') queryParams += `name=${searchTerm}&`;

                if(fromPrice) queryParams += `fromPrice=${fromPrice}&`
                if(toPrice) queryParams += `toPrice=${toPrice}&`

                const response = await productAPI.getAll(`${queryParams}perPage=8&page=${activePage}`);
                setPageCount(response.data.totalPage)
                setProducts(response.data.data)

            } catch (error) {
                alert(error)
            }
        }
        getProducts()
    }, [filter,activePage, searchTerm, fromPrice, toPrice])

    const handlePageClick = (event) => {
        setActivePage(event.selected + 1);
    };
    
    const filterPartnerSelect = (checked, item) => {
        if (checked) {
            setFilter({ ...filter, partners: [...filter.partners, item._id] })
        } else {
            const newPartners = filter.partners.filter(e => e !== item._id)
            setFilter({ ...filter, partners: newPartners })
        }
    }

    const filterCategoySelect = (checked, item) => {
        if (checked) {
            setFilter({ ...filter, categories: [...filter.categories, item._id] })
        } else {
            const newCategories = filter.categories.filter(e => e !== item._id)
            setFilter({ ...filter, categories: newCategories })
        }
    }


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const clearFilter = () => {setFilter(initFilter); removeQueryParam()}

    const filterRef = useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active')

    useEffect(() => {
        switch(selectedRangePrice){
            case '1': {
                setFormPrice(0);
                setToPrice(1000000);
                break;
            }
            case '2': {
                setFormPrice(1000000);
                setToPrice(5000000);
                break;
            }
            case '3': {
                setFormPrice(5000000);
                setToPrice(10000000);
                break;
            }
            case "4": {
                setFormPrice(10000000);
                setToPrice(null);
                break;
            }
            default: {
                break;
            }
        }
    }, [selectedRangePrice])

    return (
        <Helmet title="Sản phẩm">
            <Container>
            <section className="breadcrumb-option" style={{paddingTop: '10px', paddingBottom: '0px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                        <HeroSlider data={banners} control={false} auto={false} timeOut={5000} style={{height: '20em'}} />
                    </div>
                </div>
                </div>
            </section>
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                categories.map((item) => (
                                    <div key={item._id} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.name}
                                            onChange={(input) => filterCategoySelect(input.checked, item)}
                                            checked={filter.categories.includes(item._id)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Hãng
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                partners.map((item) => (
                                    <div key={item._id} className="catalog__filter__widget__content__item">
                                        <CheckBox
                                            label={item.name}
                                            onChange={(input) => filterPartnerSelect(input.checked, item)}
                                            checked={filter.partners.includes(item._id)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            Mức giá
                        </div>
                        <div className="catalog__filter__widget__content">
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={selectedRangePrice}
                                    onChange={(e) => setSelectedRangePrice(e.target.value)}
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="0đ - 1.000.000đ" />
                                    <FormControlLabel value="2" control={<Radio />} label="1.000.000đ - 5.000.000đ" />
                                    <FormControlLabel value="3" control={<Radio />} label="5.000.000đ - 10.000.000đ" />
                                    <FormControlLabel value="4" control={<Radio />} label="Trên 10.000.000đ" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <InfinityList
                        products={products}                     
                    />
                    {
                        products.length > 0 &&
                        <ReactPaginate
                        className="pagination"
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={8}
                        pageCount={pageCount? pageCount: 0}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                    />
                    }                 
                   
                </div>
            </div>      
     
            </Container> 
        </Helmet>
    )
}

export default Catalog
