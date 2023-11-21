let userForm=document.getElementById("registrationForm");
const retrieveEntries=()=>{
    let entries=localStorage.getItem("user-entries");
    if(entries){
        entries=JSON.parse(entries);
    }else{
        entries=[];

    }
    return entries;
}
let userEntries=retrieveEntries();
const displayEntries=()=>{
    const entries=retrieveEntries();
    const tableEntries=entries.localeCompare((entry)=>{
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordCell = `<td>${entry.password}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const acceptTermsCell = `<td>${entry.acceptedTermsAndconditions ? true : false}</td>`;

        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table><tr><th>Name</th><th>Email</th><th>Password</th><th>Dob</th><th>Accepted terms? </th></tr>${tableEntries}</table>`;
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}
const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
const saveUserForm=(event) =>{
    event.preventDefault();
    const name=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const dob=document.getElementById("dob").value;
    const acceptedTermsAndconditions=document.getElementById("acceptTerms").checked;
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }
    const entry={
        name,
        email,
        password,
        dob,
        acceptedTermsAndconditions
    };
    userEntries.push(entry);
    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    displayEntries();
}
userForm.addEventListener("submit",saveUserForm);
displayEntries();