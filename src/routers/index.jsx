import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Customers from '../pages/customers'
import Orders from '../pages/orders'
import Layouts from '../layouts'
import CustomersDetails from '../pages/customers/info/Info'
import OrderDetails from '../pages/orders/info/Info'


const Routers = () => {
  return (
    <Routes>
        <Route element={<Layouts />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/customers/details' element={<CustomersDetails />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/orders/details' element={<OrderDetails />} />
        </Route>

      {/* <Route element={<AuthProtectRoutes />}>
          <Route path='/' element={<Login />} />
      </Route> */}

    </Routes>
  )
}

export default Routers