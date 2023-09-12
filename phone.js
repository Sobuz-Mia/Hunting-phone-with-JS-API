const phoneLoad = async (searchText = 'apple') => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
  // console.log(phones);
};

const displayPhones = (p) => {

    const phoneContainer = document.getElementById('phone-container');
    // clear old container
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(p.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // slice array
    phones = p.slice(0,12);

     phones.forEach((phone) => {
        // console.log(phone.slug);
     const phoneCard = document.createElement("div");
     phoneCard.classList = `card bg-gray-100 shadow-xl`;
     phoneCard.innerHTML = `
         <figure><img src="${phone.image}" alt="" class="py-5" /></figure>
         <div class="card-body">
             <h2 class="card-title text-black">${phone.phone_name}</h2>
             <p>If a dog chews shoes whose shoes does he choose?</p>
             <div class="card-actions justify-center">
                 <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary">Show Details</button>
             </div>
         </div>
     `;
    phoneContainer.appendChild(phoneCard);
        troggleLoadingSpinner(false);
    });
};



// search hadler function
const handleSearch = () =>{
    troggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    phoneLoad(searchValue);
}

// loading Spinner 

const troggleLoadingSpinner = (isLoading) =>{
    const loadingSpinnerContainer = document.getElementById('loading-container');
    if(isLoading){
        loadingSpinnerContainer.classList.remove('hidden');
    }
    else{
        loadingSpinnerContainer.classList.add('hidden');
    }
}

const showDetailsHandler = async id =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();

    // console.log(data.data);
    showDetails(data.data);
}
const showDetails = (phone) =>{
    console.log(phone);
    // const getTitle = document.getElementById('title');
    // getTitle.innerText = phone.name;
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = ` 
        <img class ="mx-auto" src = "${phone.image}">
        <p class = "text-3xl font-bold my-3"> ${phone?.name}</p>
        <p> <span class = "text-2xl font-medium text-blue-400">Storage:</span> ${phone?.mainFeatures?.storage}</p>
        <p> <span class = "text-2xl font-medium text-blue-400">Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>
        <p> <span class = "text-2xl font-medium text-blue-400">Chipset:</span> ${phone?.mainFeatures?.chipSet}</p>
        <p> <span class = "text-2xl font-medium text-blue-400">Memory:</span> ${phone?.mainFeatures?.memory}</p>
        <p> <span class = "text-2xl font-medium text-blue-400">Slug:</span> ${phone?.slug}</p>
        <p> <span class = "text-2xl font-medium text-blue-400">Release Date:</span> ${phone?.releaseDate}</p>
        <p> <span class = "text-2xl font-medium text-blue-400">Brand:</span> ${phone?.brand}</p>
        <p> <span class = "text-2xl font-medium text-blue-400">GPS:</span> ${phone?.others?.GPS}</p>
    `
    my_modal.showModal();
}
phoneLoad();