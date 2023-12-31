import axios from 'axios';
import _ from 'lodash';

const axi =  axios.create({
  baseURL: `http://localhost:3003`
});

const bannerAPI = {
  getAll: (query) => axi.get(`/api/v1/banner?${query}`),
}

const seasonalCategoryAPI = {
  getAll: (query) => axi.get(`/api/v1/seasonal-category?${query}`),
}

const blogAPI = {
  getAll: (query) => axi.get(`/api/v1/blog?${query}`),
}

const categoryAPI = {
  getAll: (query) => axi.get(`/api/v1/category?${query}`)
}

const businessInfoAPI = {
  getOne: () => axi.get(`/api/v1/business-info`)
}

const partnerAPI = {
  getAll: (query) => axi.get(`/api/v1/partner?${query}`)
}

const productAPI = {
  getAll: (query) => axi.get(`/api/v1/product?statusArray[]=active&statusArray[]=hot&statusArray[]=new&${query}`),
  getBySlug: (slug) => axi.get(`/api/v1/product/${slug}`)
}

const orderAPI = {
  create: (payload, token) => axi.post('/api/v1/order', payload, {
    headers: _.omitBy({
      authorization: token
    }, _.isNil)
  }),
  getAll: (queryParams, token) => axi.get(`/api/v1/order?${queryParams}`, {
    headers: {
      authorization: token
    }
  })
}

const customerAPI = {
  register: (payload) => axi.post('/api/v1/user/register', payload),
  login: (payload) => axi.post('/api/v1/user/login', payload),
  getInfo: (token) => axi.get('/api/v1/user/info', {
    headers: {
      authorization: token
    }
  }),
  update: (payload, token) => axi.patch('/api/v1/user', payload, {
    headers: {
      authorization: token
    }
  }),
  forgotPassword: (email) => axi.post('/api/v1/user/forgot-password', {email, changeNewPasswordIpn: 'http://127.0.0.1:3000/cap-nhat-mat-khau'}),
  updatePassword: (payload) => axi.patch('/api/v1/user/password', payload)
}

const newsAPI = {
  getAll: (queryParams) => axi.get(`/api/v1/blog?${queryParams}`),
  getById: (id) => axi.get(`/api/v1/blog/${id}`)
}

const contactAPI = {
  contact: (payload) => axi.post('/api/v1/contact', payload)
}

const ratingAPI = {
  getByOrder: (orderId) => axi.get(`/api/v1/rating/order/${orderId}`),
  getByProduct: (productId) => axi.get(`/api/v1/rating/product/${productId}`),
  update: (id, payload, token) => axi.patch(`/api/v1/rating/${id}`, payload, {
    headers: {
      authorization: token
    }
  })
}

export {
  ratingAPI,
  bannerAPI,
  seasonalCategoryAPI,
  blogAPI,
  categoryAPI,
  businessInfoAPI,
  partnerAPI,
  orderAPI,
  productAPI,
  customerAPI,
  newsAPI,
  contactAPI
};
