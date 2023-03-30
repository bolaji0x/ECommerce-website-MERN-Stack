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
    { id: 1, label: 'add product', url: 'add-product' },
    { id: 2, label: 'product list', url: 'all-products' },
    { id: 3, label: 'categories', url: 'categories' },
    { id: 4, label: 'brands', url: 'brands' }]
  },
  {
    id: 3,
    page: 'orders',
    icon: <BiCartAlt />,
    slinks: [
    { id: 1, label: 'orders', url: 'orders' },
    { id: 2, label: 'order list', url: 'order-list' }]
  },
  {
    id: 4,
    page: 'customers',
    icon: <BiUser />,
    slinks: [
    { id: 1, label: 'customer', url: 'customers' },
    { id: 2, label: 'customer list', url: '' }]
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
