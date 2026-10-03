fetch("../data/companypolicy.json")
    .then(response => {
        console.log(response.url);
        console.log(response.status);
        return response.text();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log("Error:", error);
    });
fetch("../data/companypolicy.json")
     .then(response => response.json())
    .then(data => {
        for (let index = 0; index < data.length; index++) {

            document.getElementById("policies-container").innerHTML += `
            
                <div class="policy-card">

                    <div class="policy-top">
                        <span class="policy-id">#${data[index].id}</span>
                        <span class="status">${data[index].status}</span>
                    </div>

                    <div class="policy-icon">
                        <i class="fa-solid fa-building-shield"></i>
                    </div>

                    <h3>${data[index].title}</h3>

                    <span class="category">
                        ${data[index].category}
                    </span>

                    <p>
                        ${data[index].description}
                    </p>



                </div>
            `;
        }
        
    })

   
    .catch(error => {
        console.log("Error:", error);
    });



    // let edit=document.getElementById("edit")
    // edit.addEventListener("click",function(){
    //     document.getElementById

    // })
