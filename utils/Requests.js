export const getData = async() =>{
    const response = await fetch("http://10.0.2.2:3000/getData");
    return await response.json();
}