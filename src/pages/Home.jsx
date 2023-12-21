import React, { useEffect, useState } from "react";

import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import Section from "../components/Section";
import ProductCard from "../components/ProductCard";
import { SectionTitle } from "../components/Section";
import { SectionBody } from "../components/Section";

import { Carousel, Container, Row } from 'react-bootstrap';
import Grid from '../components/Grid'
import PolicyCard from '../components/PolicyCard';

import { bannerAPI, seasonalCategoryAPI, blogAPI, categoryAPI } from "../api/api";
import NewsCard from "../components/NewsCard";

const Home = () => {
    const [banners, setBanners] = useState([]);
    const [seasonalCategories, setSeasonalCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function initialValues() {
        try {
            const inititalValueResponses = await Promise.all([
                bannerAPI.getAll(),
                seasonalCategoryAPI.getAll(),
                blogAPI.getAll(),
                categoryAPI.getAll()
            ]);
            console.log(initialValues[3])
            setBanners(inititalValueResponses[0].data.data);
            setSeasonalCategories(inititalValueResponses[1].data.data);
            setBlogs(inititalValueResponses[2].data.data);
            setCategories(inititalValueResponses[3].data.data);

        } catch (error) {
            console.log(error);
        }
        }

        initialValues();
    }, []);

    return (
        <Helmet title="Trang chủ">
        {/* hero slider */}
        <HeroSlider data={banners} control={true} auto={false} timeOut={5000} style={{height: '50em'}} />
        {/* end hero slider */}

        {/* policy section */}
        <Container>
            <Section>
                <SectionBody>
                    <Grid col={3} mdCol={2} smCol={1} gap={20}>
                        {
                            categories.map((item, index) => (
                                <PolicyCard name={item.name} icon={item.image.path} />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>

            {
                seasonalCategories.map(
                    seasonalCategory => (
                        <Section style={{borderRadius: '10px', padding: '10px', backgroundColor: '#ffffff'}}>
                            <SectionTitle >
                                <Carousel indicators={false}>
                                    {
                                        seasonalCategory.images.map(
                                            image => (
                                                <Carousel.Item id={image._id}>
                                                    <img
                                                    className="d-block w-100 carousel-item"
                                                    src={image.path}
                                                    alt={image.name}
                                                    />
                                                </Carousel.Item>
                                            )
                                        )
                                    }
                                 </Carousel>
                            </SectionTitle>
                            <SectionBody style={{ marginTop: '5px', borderRadius: '10px'}}>
                                <Grid col={5} mdCol={3} smCol={2} gap={20}>
                                {seasonalCategory.productIds.map((item) => (
                                    <ProductCard key={item._id} item={item}/>
                                ))}
                                </Grid>
                            </SectionBody>
                        </Section>
                    )
                )
            }
            <Section style={{borderRadius: '10px', padding: '10px', backgroundColor: '#ffffff'}}>
                <SectionTitle>
                    <h1 style={{textAlign: 'center'}}>Bài viết</h1>
                </SectionTitle>
                <SectionBody>
                    <Row>
                        {
                            blogs.map((item) => (
                                <NewsCard
                                    key={item._id}
                                    item={item}
                                />
                            ))
                        }
                    </Row>
                </SectionBody>
            </Section>
        </Container>
        </Helmet>
    );
};

export default Home;
