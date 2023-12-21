
import Helmet from '../components/Helmet'

import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import { aboutCompanyAPI } from '../api/api';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

function About() {

  const {id} = useParams();

  const [about, setAbout] = useState(null);

  useEffect(
    () => {
      
      async function getAboutById(){
        try {
          const res = await aboutCompanyAPI.getById(id);
          setAbout(res.data);
        } catch (error) {
          alert(error);
        }
      }
      if(id)
        getAboutById()
    },[id]
  )
  return (
    about ?
    <Helmet title={about.title}>
      <Container>
        <section class="shop-details">
          <div class="product__details__title">
            <div class="row">
                <div class="col-lg-12">
                    <div class="product__details__breadcrumb">
                        <Link to="/">Trang chủ</Link>
                        <FontAwesomeIcon icon={faAngleRight} className="faAngleRight" />
                        <span>{about.title}</span>
                    </div>
                </div>
            </div>
          </div>
        </section>
        <section class="blog-hero spad">
          <div class="row d-flex justify-content-center">
              <div class="col-lg-9 text-center">
                  <div class="blog__hero__text">
                      <h2>{about.title}</h2>
                  </div>
              </div>
          </div>
        </section>
        <section class="blog-details spad">
          <div class="row d-flex justify-content-center">
              <div class="col-lg-10">
                  <div class="blog__details__content">
                      <div class="blog__details__share">
                      </div>
                      <div class="blog__details__text">
                          <p dangerouslySetInnerHTML={{ __html: about.content }} ></p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      </Container>
    </Helmet>
    : <div className="loading-screen"></div>
)
}

export default About;
