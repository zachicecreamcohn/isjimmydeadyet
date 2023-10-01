// Next.js API route support: https://nextjs.org/docs/api-routes/introduction



async function getDeadStatus() {
  const response = fetch("https://api.api-ninjas.com/v1/celebrity?name=Jimmy%20Carter", {
    "method": "GET",
    "headers": {
      "X-Api-Key": "HJK5YfO6dOCO+r/WLXK9Bw==W6Mfg0oTP0Xx3YCD" //TODO: move to env
    }
  })
  
  const data = await (await response).json();


  let returnData = {
    is_dead: !data[0]["is_alive"],
    age: data[0]["age"]
  }

  if (returnData.is_dead) {
    returnData["death_date"] = data[0]["death"];
  }


  // check if his birthday is today
    const today = new Date();
  const dateParts = data[0]["birthday"].split('-').map(part => parseInt(part, 10));
  const birthDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);  // Adjust the month

  returnData["is_birthday"] = (today.getDate() === birthDate.getDate()) &&
      (today.getMonth() === birthDate.getMonth());
  return returnData;
}
export default async function handler(req, res) {
  const data = await getDeadStatus();
  res.status(200).json(data );
}
