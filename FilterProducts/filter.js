(function Filter() {
    fetch("http://127.0.0.1:5500/JSON/Keyboards.json")
        .then(res => res.json())
        .then(data => {
            let productsContainer = document.querySelector('.products')
            let categorysContainer = document.querySelector('.cats')
            let not_found = document.querySelector('.not_found');

            function  DisplayProducts(filteredProducts){

                filteredProducts.length === 0 ? not_found.classList.add('block') :not_found.classList.remove('block') 

                productsContainer.innerHTML = filteredProducts.map(prod =>
                    `<div class="product">
                        <div class="prod_img">
                            <img src=${prod.img}>
                        </div>
                        <a href=${prod.source} target="__blank" class="prod_name">${prod.name}</a>
                        <span class="prod_cat">${prod.category}</span>
                        <h3 class="prod_price"> <sup><small>₹</small></sup>&nbsp; ${prod.price} &nbsp; <sup><small>00</small></sup> </h3>
                        <div class="like_btn"><i class="fa-regular fa-heart like"></i></div>
                    </div>`
                ).join('')

                favProduct()

            }

            function favProduct(){

                let likes = document.querySelectorAll('.like')

                likes.forEach(like =>{
                    like.addEventListener('click',(e)=>{
                        if(e.target.classList.contains('fa-solid')){
                            e.target.classList.remove('fa-solid')
                            e.target.classList.remove('red')
                            e.target.classList.add('fa-regular')
                        }
                        else{
                            e.target.classList.add('fa-solid')
                            e.target.classList.add('fa-spinner')
                            e.target.classList.remove('fa-regular')
                            e.target.classList.remove('fa-heart')
                            setTimeout(() => {
                                e.target.classList.remove('fa-spinner')
                                e.target.classList.add('fa-heart')
                                e.target.classList.add('red')
                            }, 500);
                        }
                    })
                })

            }


            function DisplayCategorys(products){

                let categories = products.map(prod => prod.category)
                categorysContainer.innerHTML =  categories.filter((cat,ind) => categories.indexOf(cat) == ind).map(cat =>
                    `<div class="cat"><span><i class="fa-regular fa-circle-check mx-1"></i></span>${cat}</div>`
                ).join('')

                SelectCategory()

            }
            
            let selectedCats = []
            let search = document.querySelector('.search input');

            function SelectCategory(){
                let allcats = document.querySelectorAll('.cat');
                
                allcats.forEach(cat =>{
                    cat.addEventListener('click',(e) =>{
                        search.value = ""
                        
                        e.target.classList.toggle('selected')

                        if(selectedCats.includes(e.target.textContent)){
                            selectedCats = selectedCats.filter(Scat => Scat !== e.target.textContent)
                        }
                        else{
                            selectedCats.push(e.target.textContent)
                        }
                        selectedCats.length > 0 ? DisplayProducts(data.filter(prod => selectedCats.includes(prod.category))) : DisplayProducts(data)

                    })

                })
            }


            search.addEventListener('keyup',(e) =>{
                if(e.target.value != ""){

                    let items = selectedCats.length > 0 ? data.filter(prod => selectedCats.includes(prod.category)) : data
                    DisplayProducts(items.filter(prod => prod.name.toLowerCase().includes(e.target.value.toLowerCase())))
                }
                else{
                    
                    selectedCats.length > 0 ? DisplayProducts(data.filter(prod => selectedCats.includes(prod.category))) : DisplayProducts(data)
                }
            })

            DisplayProducts(data);
            DisplayCategorys(data)
            
        })
})()