import React from 'react'
import Layout from '../hocs/Layout'
import { connect } from 'react-redux';
import {
  get_products_by_arrival,
  get_products_by_sold,

} from '../redux/actions/products';
import { useEffect } from "react";
import Banner from '../components/home/Banner';
import ProductsArrival from '../components/home/ProductsArrival';
import ProductsSold from '../components/home/ProductsSold';
import { get_categories } from '../redux/actions/categories'

const Home = ({
  get_products_by_arrival,
  get_products_by_sold,
  products_arrival,
  products_sold,
  get_categories,
  categories
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);

    get_products_by_arrival();
    get_products_by_sold();
    get_categories();
  }, []);

  return (
    <Layout>
      <Banner/>
      <ProductsArrival data={products_arrival}/>
      <ProductsSold data={products_sold}/>

    </Layout>

  )
}

const mapStateToProps = state => ({
  products_arrival: state.Products.products_arrival,
  products_sold: state.Products.products_sold,
  categories: state.Categories.categories,
})

export default connect(mapStateToProps, {
  get_products_by_arrival,
  get_products_by_sold,
  get_categories,
})(Home)