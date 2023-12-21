
import Helmet from '../components/Helmet'

import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import { newsAPI } from '../api/api';
import { Container } from 'react-bootstrap';
import NewsCardDetail from '../components/NewsCardDetail';


function NewsDetail() {

  const {id} = useParams();

  const [news, setNews] = useState(null);

  useEffect(
    () => {
      
      async function getNewsById(){
        try {
          const res = await newsAPI.getById(id);
          setNews(res.data);
        } catch (error) {
          alert(error);
        }
      }
      if(id)
        getNewsById()
    },[id]
  )
  return (
    news ?
    <NewsCardDetail
        key={news._id}
        item={news}
    />    
    : <div className="loading-screen"></div>
)
}

export default NewsDetail;
