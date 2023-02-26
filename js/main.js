const phoneHunter = (id)=> {
    document.getElementById('spinner').classList.remove('d-none');
    const searchField = document.getElementById('search-input');
    const searchFieldArea = searchField.value;
    searchField.value = '';
    const search = id || searchFieldArea;
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhone(data.data))
    .catch(error => console.log(error))
}

const displayPhone = (allPhone)=>{
    //console.log(allPhone.length);
    if(allPhone.length === 0){
        document.getElementById('phone-found').classList.remove('d-none');
    }
    else{
        document.getElementById('phone-found').classList.add('d-none');
    }
    const phoneContainer = document.getElementById('card-container');
    phoneContainer.textContent = '';
    allPhone.slice(0,12).forEach(phone=>{
        //console.log(phone);
        const {image,phone_name,brand,slug} = phone;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card p-5 rounded-3 bg-warning">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Name : ${phone_name}</h5>
                <h5 class="card-title">Brand : ${brand}</h5>
                <p class="card-text">Slug : ${slug}</p>
                <button onclick="buttonLoadData('${slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal"data-bs-target="#modal-id">
                Details 
                </button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(div);
    });
    document.getElementById('spinner').classList.add('d-none');
};

const buttonLoadData = (data)=>{
    const url = `https://openapi.programming-hero.com/api/phone/${data}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneData(data.data))
    .catch(error => console.log(error))
};
const displayPhoneData = (data) =>{
    //console.log(data.mainFeatures.sensors);
    const {name,brand,image,mainFeatures} = data;
    const {sensors} = mainFeatures;
    document.getElementById('modal-title').innerText = name;
    const modalBody = document.getElementById('modal-content');
    modalBody.innerHTML = `
       <p>Brand : ${brand}</p>
       <p>Sensors : ${sensors[0]}</p>
       <img src="${image}" alt="">
    `;
}
phoneHunter('iphone');