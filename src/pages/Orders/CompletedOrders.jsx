import { View } from 'react-native'
import React from 'react'
import { VStack,Text, ScrollView } from 'native-base'
import OrderRow from '../../components/orders/OrderRow'
import NotFound from '../NotFoundPage/NotFound'
import { useSelector } from 'react-redux'
import { getOrdersFromState } from '../../redux/slices/cartSlice'
import { useState } from 'react'
import { useEffect } from 'react'
import { isProductDelivered } from '../../utils/commonUtils'

const CompletedOrders = () => {
  const allOrders = useSelector(getOrdersFromState)
  
  const [available,setAvailable] = useState(false)

  useEffect(()=>{
    if(allOrders.status=="finished"){
      let ordersData = (allOrders.data && allOrders.data.orders && allOrders.data.orders.length>0) ? allOrders.data.orders : []
      ordersData.forEach(element => {
        if(isProductDelivered(element.status)){

          setAvailable(isProductDelivered(element.status))
        }

      });
    }
  },[allOrders.status])
 
  return (
    <VStack  >
        <ScrollView showsVerticalScrollIndicator={false} >

{allOrders.data && allOrders.data.orders && allOrders.data.orders.length > 0 && available ? allOrders.data.orders.map((item)=>
{
  
  return isProductDelivered(item.status) && item.products && item.products.map((prod)=>
      
  <OrderRow id={prod._id} product={prod} isCompleted={true} />
  )
}
):<NotFound title="You don't have an order yet"  desc="You don't have a completed orders at this time" />}
  </ScrollView>
    </VStack>
  )
}

export default CompletedOrders