export const getProductsFromCategory=(productsArray,category)=>{
    // return products list
    if(!productsArray || productsArray.length===0 || !category){
        return []
    }else{
        let result = productsArray.filter((item)=>item.category===category)
        return result
    }

}

export const truncate=(str,len)=>{
    return str.slice(0,len) + "..."
}

export function splitArray(array, part) {
    var tmp = [];
    for(var i = 0; i < array.length; i += part) {
        tmp.push(array.slice(i, i + part));
    }
    return tmp;
}

export const extractAllSubCats=(categories)=>{
    let subcat = []
    for (let index = 0; index < categories.length; index++) {
        let subcatArr = categories[index].subCategories
       for (let j = 0; j < subcatArr.length; j++) {
        subcat.push(subcatArr[j])
        
       }
    }

    return subcat
}

export function findComponentHeight(layout){
    const {x, y, width, height} = layout;
    return height
  }


export const prepareSearchDataWithSortAndFilters=(filtered,data,searchInputValue,realData)=>{
    let finalData = [...data]
    let realDataCopy = [...realData]
   
    if(filtered.sortBy){
        if(filtered.sortBy == 'Price Low'){
            finalData.sort((a,b)=>{
                if(a.price<b.price){ return -1 }
                if(a.price>b.price){return 1}
                return 0
            })
        }
        if(filtered.sortBy == 'Price High'){
           
            finalData = finalData.sort((a,b)=>{
                if(a.price>b.price){ return -1 }
                if(a.price<b.price){return 1}
                return 0
            })
        }
        if(filtered.sortBy == 'None'){
           finalData = realDataCopy
        }
    }

    if(filtered.category){
        if(filtered.category=='All'){
            finalData = [...data]
        }else{
            finalData = data.filter((item)=>item.subCategory===filtered.category)
        }
    }
    if(filtered.priceRange){
        finalData = finalData.filter((item)=>item.price<=filtered.priceRange)
    }
    
    
    return finalData.length>0 ? finalData.filter((item)=> ((item.name).toLowerCase()).includes(searchInputValue.toLowerCase())  ) : []
}


export const isProductInCart = (prod, data) => {
    let filtered = data.filter(
      (item) => item.product.name === prod.name
    );
    if (filtered.length > 0) {
      return true;
    } else {
      return false;
    }
  };



export  const isProductDelivered=(currentStatus)=>{
    let delivered = currentStatus.filter((item)=>item.state=='delivered')
    return delivered.length>0
    
  }