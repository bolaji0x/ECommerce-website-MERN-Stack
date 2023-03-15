import React from 'react';
import { BiBarChart, BiBox, BiCartAlt, BiCommentDots, BiGlobe, BiPaint, BiPurchaseTagAlt, BiSidebar, BiUser, BiWallet} from "react-icons/bi";

const sublinks = [
  {
    id: 1,
    page: 'Dashboard',
    icon: <BiSidebar />,
    slinks: []

  },
  {
    id: 2,
    page: 'products',
    icon: <BiBox />,
    slinks: [
    { label: 'add product', url: 'add-product' },
    { label: 'product list', url: 'products' },
    { label: 'categories', url: 'categories' },
    { label: 'brands', url: 'brands' }]
  },
  {
    id: 3,
    page: 'orders',
    icon: <BiCartAlt />,
    slinks: [
    { label: 'orders', url: 'orders' },
    { label: 'order list', url: 'order-list' }]
  },
  {
    id: 4,
    page: 'customers',
    icon: <BiUser />,
    slinks: [
    { label: 'customer', url: 'customers' },
    { label: 'customer list', url: '' }]
  },
  {
    id: 5,
    page: 'statistics',
    icon: <BiBarChart />,
    slinks: []
  },
  {
    id: 6,
    page: 'reviews',
    icon: <BiCommentDots />,
    slinks: []
  },
  {
    id: 7,
    page: 'transactions',
    icon: <BiWallet />,
    slinks: []
  },
  {
    id: 8,
    page: 'sellers',
    icon: <BiGlobe />,
    slinks: []
  },
  {
    id: 9,
    page: 'hot offers',
    icon: <BiPurchaseTagAlt />,
    slinks: []
  },
  {
    id: 10,
    page: 'appearance',
    icon: <BiPaint />,
    slinks: []
  },
  {
    id: 11,
    page: 'settings',
    icon: <BiBarChart />,
    slinks: []
  }
    
];
export default sublinks
