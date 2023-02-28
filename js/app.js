const loadAllProducts = async() =>{
    const url = `https://fakestoreapi.com/products`;
   const res = await fetch(url);
   const data = await res.json();
   return data;
//    displayAllProduct(data.slice(0, 10))
}

const setAllMenu = async() =>{
    const data = await loadAllProducts();
    // console.log(data);

    const uniqueItem = [];

    data.forEach(product => {
        // console.log(product.category );
        const menu = document.getElementById('all-menu');
       

        // condition
        if(uniqueItem.indexOf(product.category) === -1 ){
            uniqueItem.push(product.category);
            const li = document.createElement('li');
            li.innerHTML =`
            <a> ${product.category}</a>
            `;
            menu.appendChild(li);
          }
    });
}

setAllMenu()



// search-field on event handler
const searchField = document.getElementById('search-field');

searchField.addEventListener('keypress', async(event)=>{
    // console.log(event.key);
    // condition
    if(event.key === 'Enter'){
        const searchValue = searchField.value;
        const allProducts = await loadAllProducts();

        const foundProducts = allProducts.filter(product => product.category.includes(searchValue));
        console.log(foundProducts);

        // single product forEach method
       const container = document.getElementById('product-container');
             container.innerHTML = '';

        foundProducts.forEach(element => {
            const {title, price, image,category,description} = element;
            console.log(element);
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card w-full bg-base-100 shadow-xl">
                <figure class="px-10 pt-10">
                    <img src="${image}" alt="Shoes" class="rounded-xl h-60 w-full" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${category}</h2>
                    <p>${title.slice(0,10)}</p>
                    <div class="card-actions">
                    <label onclick="showDetails('${image}', '${price}', '${description}' )" for="my-modal" class="btn btn-primary">Show Details</label>
                    </div>
                </div>
                </div>
            `;
            container.appendChild(div);

        });
        
    }
})

const showDetails = (image, price, description) =>{
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
     <div>
     <img src="${image}" class='rounded-xl h-60 w-full' alt="">
     </div>
     <h4>Price:$ ${price}</h4>
     <p>Description:${description}</p>
    `;
}

