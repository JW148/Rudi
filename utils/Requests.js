export const getDocs = async() =>{
    const response = await fetch("http://10.0.2.2:3000/");
    return await response.json();
}
 
export const createDoc = async() => {
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

export const deleteDoc = async(id) => {
  const response = await fetch(`http://10.0.2.2:3000/delete/${id}`, {
    method: "DELETE"
  });
  return await response.json();
}

export const updateDoc = async(data) => {
  const response = await fetch("http://10.0.2.2:3000/update", {
    method: "PATCH",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}