
export const getDocs = async() =>{

    const response = await fetch("http://10.0.2.2:3000/");
    return await response.json();
}
 
export const createDoc = async(data) => {
    const response = await fetch("http://192.168.0.73:3000/create", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          price: data.price,
          usedIn: data.usedIn,
          amntInStock: data.amntInStock,
          usedWeek: data.usedWeek
        }),
      });
    return await response.json();    
}  

export const deleteDoc = async(id) => {
  const response = await fetch(`http://192.168.0.73:3000/delete/${id}`, {
    method: "DELETE"
  });
  return await response.json();
}

export const updateDoc = async(data) => {
  const response = await fetch("http://192.168.0.73:3000/update", {
    method: "PATCH",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export const incDecDoc = async(data) => {
  console.log(data)
  const response = await fetch("http://10.0.2.2:3000/incDec", {
    method: "PATCH",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: data.id,
      x: data.x,
      y: data.y,
    }),
  });
  return await response.json();
}

export const newSale = async(data) => {
    
  const response = await fetch("http://192.168.0.73:3000/createSale", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: data.items,
          total: data.total,
          dateTime: new Date(),
          weather: await getWeather()
        }),
      });
    return await response.json(); 
}

//get weather data
const getWeather = async() => {
  let response = await fetch("http://api.weatherapi.com/v1/current.json?key=9a35dba962844328897163858231705&q=EH12QN&aqi=no");
  return response.json();
}

//10.0.2.2 (for local android emulator)
//192.168.0.58 (running on dev windows pc for connected physical device on the same network)
//94.173.240.211 (running on dev windows pc for connected physical device outside the network)

//192.168.0.73 (server on rasp pi)