export const getData = async() =>{
    const response = await fetch("http://10.0.2.2:3000/");
    return await response.json();
}

export const create = async() => {
    console.log("here")
    const response = await fetch("http://10.0.2.2:3000/create", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstParam: 'yourValue',
          secondParam: 'yourOtherValue',
        }),
      });
    return await response.json();    
} 