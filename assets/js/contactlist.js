let departmentList = null;
let contactList = null;
let data = null;

const loadAPI = () => {
    $('body').toggleClass('loading');
    $.getJSON( "http://167.172.52.246:1337/contact-lists", function( data ) {
        departmentList = data;
    }).done(()=>{
        $.getJSON( "http://167.172.52.246:1337/dpartment-contact-lists", function( data ) {
            contactList = data;
        }).done(()=>{
            contructData(departmentList, contactList);
            populateSelect();
            $('body').toggleClass('loading');
        });
    });
    
}

const contructData = (department, contactList) => {
   let retVal = [];

   if (department && department.length>0) {
       department.forEach(dep => {

            if (contactList && contactList.length) {
                let contactItems = [];
                contactList.forEach(contact => {
                    if (contact.department.Tag === dep.Tag) {
                        contactItems.push({
                            'name': contact.name,
                            'mobile': contact.mobile || "",
                            'email' : contact.emailAddress || ""
                        }); 
                    }
                });

                let newContact = {'departmentName' : dep.departmentName,
                                  'otherInfo' : dep.otherInfo || "",
                                  'contactList' : contactItems};
                retVal.push(newContact);                  
            }
       });
   }
   data = retVal;

}


function populateSelect() {

var ele = document.getElementById('sel');
        for (var i = 0; i < data.length; i++) {
            ele.innerHTML = ele.innerHTML +
                '<option value="' + data[i]['departmentName'] + '">' + data[i]['departmentName'] + '</option>';
}


}

var activities = document.getElementById("sel");

const generateTemplate = (item, sec) => {
    let template = "<div class='col-lg-4 col-md-4 wow fadeInRight' data-wow-delay='" + sec + "'>" +
    "<div style='min-height:50px; background: rgba(0,0,0,0.2); margin-top:12px; margin-bottom:12px; color:white; padding:15px'>" +
    "<p style='font-size:16px; color:white; font-weight:800'>" + item.name + "</p>"
    
    let contact = "";
    if (item.mobile) {
        contact += "رقم الواتس اب : " + item.mobile + "<br>";
    }
    if (item.email) {
        contact += "البريد الالكتروني : <a style='font-weight:800; color:white' href='mailto:" + item.email + "'/>" + item.email + "</a>";
    }
    
    template += "<p style='color:white; margin-top:5px'>" + contact + "</p>" +
                "</div></div>";

    return template;
}

activities.addEventListener("change", function(e) {
    
    let innerHtm = "";
    if(e.target.value) {
        data.forEach( (el,index) => {
            if (el.departmentName === e.target.value) {
                let element = document.getElementById("contents");
                element.style.display="block";
                element.classList.add("wow");
                element.classList.add("fadeInUp")
                element.setAttribute("data-wow-delay",".2s");
                
                document.getElementById("depName").innerHTML = el.departmentName;
                document.getElementById("otherInfo").innerHTML = el.otherInfo;
                let sec = "0." + index + "s";
                const contactList = el.contactList;
                if (contactList && contactList.length>0) {
                    contactList.forEach(item => {
                        innerHtm += generateTemplate(item, sec);
                    });
                }
                
                document.getElementById("contactDetails").innerHTML = innerHtm;
            }
        }) 
    }
});



window.onload = loadAPI();